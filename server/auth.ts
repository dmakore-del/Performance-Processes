import bcrypt from "bcryptjs";
import crypto from "crypto";
import { storage } from "./storage";
import { registerSchema, loginSchema } from "@shared/schema";
import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { z } from "zod";
import { sendPasswordResetEmail, notifyPortalAccountLocked } from "./emailNotifications";

let otplib: any;
const authAttempts = new Map<string, { count: number; blockedUntil: number; expiresAt: number }>();
const AUTH_FAILURE_LIMIT = 5;

function attemptKey(req: Request, scope: string) {
  return `${req.ip || req.socket.remoteAddress || "unknown"}:${scope}`;
}

function isBlocked(key: string) {
  const entry = authAttempts.get(key);
  if (!entry) return false;
  if (entry.expiresAt <= Date.now()) {
    authAttempts.delete(key);
    return false;
  }
  return entry.blockedUntil > Date.now();
}

function recordFailure(key: string) {
  const existing = authAttempts.get(key);
  const entry = existing && existing.expiresAt > Date.now()
    ? existing
    : { count: 0, blockedUntil: 0, expiresAt: Date.now() + 15 * 60 * 1000 };
  entry.count += 1;
  if (entry.count >= 5) {
    entry.blockedUntil = Date.now() + 15 * 60 * 1000;
    entry.expiresAt = entry.blockedUntil;
    entry.count = 0;
  }
  authAttempts.set(key, entry);
  if (authAttempts.size > 10000) authAttempts.clear();
}

function clearFailures(key: string) {
  authAttempts.delete(key);
}

async function recordAccountAuthFailure(user: any, reason: string, req: Request) {
  const result = await pool.query(
    `UPDATE "users"
     SET "failed_auth_attempts" = "failed_auth_attempts" + 1,
         "status" = CASE WHEN "failed_auth_attempts" + 1 >= $2 THEN 'suspended' ELSE "status" END,
         "auth_locked_at" = CASE
           WHEN "failed_auth_attempts" + 1 >= $2 THEN COALESCE("auth_locked_at", NOW())
           ELSE "auth_locked_at"
         END
     WHERE "id" = $1 AND "status" IN ('active', 'pending_approval')
     RETURNING "failed_auth_attempts", "status", "auth_locked_at"`,
    [user.id, AUTH_FAILURE_LIMIT],
  );
  const updated = result.rows[0];
  if (updated?.status !== "suspended" || !updated.auth_locked_at) return false;

  try {
    await notifyPortalAccountLocked({
      email: user.email,
      fullName: user.fullName,
      reason,
      ipAddress: req.ip || req.socket.remoteAddress || "unavailable",
      lockedAt: new Date(updated.auth_locked_at),
    });
  } catch (error: any) {
    console.error("Portal account lock notification failed.", error?.code || "delivery_failed");
  }
  return true;
}

function regenerateSession(req: Request) {
  return new Promise<void>((resolve, reject) => {
    req.session.regenerate((error) => error ? reject(error) : resolve());
  });
}

async function getOtpLib() {
  if (!otplib) {
    otplib = await import("otplib");
  }
  return otplib;
}

declare module "express-session" {
  interface SessionData {
    userId?: string;
    pendingTwoFactor?: string;
    impersonatorId?: string;
    impersonationAuditId?: number;
  }
}

const PgSession = connectPgSimple(session);

export async function setupAuth(app: Express) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "user_sessions" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL,
      CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("sid")
    );
    CREATE INDEX IF NOT EXISTS "IDX_user_sessions_expire" ON "user_sessions" ("expire");
    CREATE TABLE IF NOT EXISTS "admin_impersonation_audit" (
      "id" serial PRIMARY KEY,
      "admin_user_id" varchar NOT NULL,
      "target_user_id" varchar NOT NULL,
      "ip_address" text NOT NULL,
      "user_agent" text NOT NULL DEFAULT '',
      "started_at" timestamptz NOT NULL DEFAULT NOW(),
      "ended_at" timestamptz
    );
    CREATE INDEX IF NOT EXISTS "admin_impersonation_admin_started_idx"
      ON "admin_impersonation_audit" ("admin_user_id", "started_at");
    CREATE INDEX IF NOT EXISTS "admin_impersonation_target_started_idx"
      ON "admin_impersonation_audit" ("target_user_id", "started_at");
  `);

  app.use(
    session({
      store: new PgSession({
        pool: pool,
        tableName: "user_sessions",
        createTableIfMissing: false,
      }),
      secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax",
      },
    })
  );

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid registration data", errors: parsed.error.flatten() });
      }

      const {
        password,
        companyName,
        fullName,
        contactPhone,
        businessLocation,
        businessWebsite,
        industry,
        businessStage,
        requestedServices,
        supportGoals,
      } = parsed.data;
      const email = parsed.data.email.trim().toLowerCase();

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(409).json({ message: "An account with this email already exists" });
      }

      const existingCompany = await storage.getUserByCompanyName(companyName);
      if (existingCompany) {
        return res.status(409).json({ message: "An account for this organization already exists. Only one account is allowed per organization." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await storage.createUser({
        username: email,
        email,
        password: hashedPassword,
        companyName,
        fullName,
        contactPhone,
        businessLocation,
        businessWebsite,
        industry,
        businessStage,
        requestedServices,
        supportGoals,
      });

      await storage.updateUser(user.id, { role: "client", status: "active" });
      await regenerateSession(req);
      req.session.userId = user.id;

      return res.status(201).json({
        message: "Account created successfully.",
        user: sanitizeUser({ ...user, role: "client", status: "active" }),
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Please provide a valid email and password" });
      }

      const { email, password } = parsed.data;
      const normalizedEmail = email.trim().toLowerCase();
      const key = attemptKey(req, `login:${normalizedEmail}`);
      if (isBlocked(key)) return res.status(429).json({ message: "Too many attempts. Please try again later." });
      const user = await storage.getUserByEmail(normalizedEmail);

      if (!user) {
        recordFailure(key);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        recordFailure(key);
        const locked = await recordAccountAuthFailure(user, "Portal sign-in", req);
        if (locked) {
          return res.status(423).json({ message: "This account is locked after five unsuccessful attempts. The admin team has been notified." });
        }
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (user.status === "pending_approval") {
        return res.status(403).json({ message: "Your account is pending admin approval. You will be notified once approved." });
      }

      if (user.status === "suspended") {
        if (user.authLockedAt) {
          return res.status(423).json({ message: "This account is locked after five unsuccessful attempts. The admin team has been notified." });
        }
        return res.status(403).json({ message: "Your account has been suspended. Please contact support." });
      }

      clearFailures(key);
      await storage.updateUser(user.id, { failedAuthAttempts: 0 });
      await regenerateSession(req);
      if (user.twoFactorEnabled) {
        req.session.pendingTwoFactor = user.id;
        return res.json({ requiresTwoFactor: true });
      }
      req.session.userId = user.id;
      return res.json({ user: sanitizeUser(user) });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/verify-2fa", async (req: Request, res: Response) => {
    try {
      const { code } = req.body;
      const userId = req.session.pendingTwoFactor || req.session.userId;

      if (!userId) {
        return res.status(401).json({ message: "No pending authentication" });
      }

      const key = attemptKey(req, `two-factor:${userId}`);
      if (isBlocked(key)) return res.status(429).json({ message: "Too many attempts. Please try again later." });

      const user = await storage.getUser(userId);
      if (!user || user.status !== "active" || !user.twoFactorSecret) {
        return res.status(401).json({ message: "Invalid session" });
      }
      if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
        recordFailure(key);
        const locked = await recordAccountAuthFailure(user, "Two-factor verification", req);
        if (locked) {
          return res.status(423).json({ message: "This account is locked after five unsuccessful attempts. The admin team has been notified." });
        }
        return res.status(400).json({ message: "Enter a six-digit authentication code" });
      }

      const otp = await getOtpLib();
      const verification = await otp.verify({ secret: user.twoFactorSecret, token: code });
      if (!verification.valid) {
        recordFailure(key);
        const locked = await recordAccountAuthFailure(user, "Two-factor verification", req);
        if (locked) {
          return res.status(423).json({ message: "This account is locked after five unsuccessful attempts. The admin team has been notified." });
        }
        return res.status(401).json({ message: "Invalid 2FA code" });
      }

      clearFailures(key);
      await storage.updateUser(user.id, { failedAuthAttempts: 0 });
      if (req.session.pendingTwoFactor) {
        if (user.status !== "active") return res.status(403).json({ message: "This account is not active." });
        await regenerateSession(req);
        req.session.userId = user.id;
      }

      if (!user.twoFactorEnabled) {
        await storage.updateUser(user.id, { twoFactorEnabled: true });
      }

      return res.json({ user: sanitizeUser({ ...user, twoFactorEnabled: true }) });
    } catch (error) {
      console.error("2FA verification error:", error);
      return res.status(500).json({ message: "Verification failed" });
    }
  });

  app.post("/api/auth/setup-2fa", async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ message: "Not authenticated" });

      const user = await storage.getUser(userId);
      if (!user || user.status !== "active") return res.status(401).json({ message: "User not found" });
      if (user.twoFactorEnabled) return res.status(400).json({ message: "Two-factor authentication is already enabled." });

      const otp = await getOtpLib();
      let secret = user.twoFactorSecret;
      if (!secret) {
        secret = otp.generateSecret();
        await storage.updateUser(user.id, { twoFactorSecret: secret });
      }

      const otpauthUrl = otp.generateURI({
        secret,
        issuer: "Performance Processes",
        account: user.email,
      });

      return res.json({ secret, otpauthUrl });
    } catch (error) {
      return res.status(500).json({ message: "Failed to setup 2FA" });
    }
  });

  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    try {
      const rawEmail = typeof req.body?.email === "string" ? req.body.email.trim() : "";
      const parsedEmail = z.string().email().safeParse(rawEmail);
      const email = parsedEmail.success ? parsedEmail.data.trim().toLowerCase() : "";
      const rateKey = attemptKey(req, "password-reset");
      if (isBlocked(rateKey)) return res.status(429).json({ message: "Too many reset code requests. Please wait 15 minutes and try again." });
      recordFailure(rateKey);
      if (!email) {
        return res.json({ message: "If an account exists with that email, a password reset code has been sent." });
      }

      const user = await storage.getUserByEmail(email);

      if (user && (user.status === "active" || user.status === "pending_approval")) {
        const resetCode = crypto.randomInt(0, 100_000_000).toString().padStart(8, "0");
        const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        const tokenHash = crypto.createHash("sha256").update(resetCode).digest("hex");

        await storage.updateUser(user.id, { resetToken: tokenHash, resetTokenExpiry });
        try {
          await sendPasswordResetEmail(email, resetCode);
        } catch (error: any) {
          await storage.updateUser(user.id, { resetToken: null, resetTokenExpiry: null });
          console.error("Password reset code delivery failed.", error?.code || "delivery_failed");
          return res.status(503).json({ message: "Unable to send a reset code right now. Please try again later." });
        }
      }

      return res.json({ message: "If an account exists with that email, a password reset code has been sent." });
    } catch (error) {
      console.error("Forgot password error:", error);
      return res.status(500).json({ message: "Failed to process request" });
    }
  });

  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    try {
      const { token, email: rawEmail, code: rawCode, password } = req.body || {};
      if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }

      // Continue to accept unexpired links already sent before the code-based flow.
      if (typeof token === "string" && !rawEmail && !rawCode) {
        const legacyRateKey = attemptKey(req, "password-reset-legacy");
        if (isBlocked(legacyRateKey)) return res.status(429).json({ message: "Too many attempts. Please try again later." });

        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        const legacyUser = await storage.getUserByResetToken(tokenHash);
        if (!legacyUser || legacyUser.status !== "active" || !legacyUser.resetTokenExpiry || new Date() > legacyUser.resetTokenExpiry) {
          recordFailure(legacyRateKey);
          return res.status(400).json({ message: "Invalid or expired reset link" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await storage.updateUser(legacyUser.id, {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
          failedAuthAttempts: 0,
        });
        await pool.query(`DELETE FROM "user_sessions" WHERE sess->>'userId'=$1`, [legacyUser.id]);
        clearFailures(legacyRateKey);
        return res.json({ message: "Password has been reset successfully" });
      }

      const parsedEmail = z.string().email().safeParse(typeof rawEmail === "string" ? rawEmail.trim() : rawEmail);
      if (!parsedEmail.success) {
        return res.status(400).json({ message: "Enter the email address that received the reset code." });
      }

      const email = parsedEmail.data.trim().toLowerCase();
      const rateKey = attemptKey(req, `password-reset-code:${email}`);
      if (isBlocked(rateKey)) return res.status(429).json({ message: "Too many attempts. Please request a new reset code later." });
      const user = await storage.getUserByEmail(email);
      if (typeof rawCode !== "string" || !/^\d{8}$/.test(rawCode)) {
        recordFailure(rateKey);
        if (user?.status === "active" || user?.status === "pending_approval") {
          const locked = await recordAccountAuthFailure(user, "Password reset code", req);
          if (locked) {
            return res.status(423).json({ message: "This account is locked after five unsuccessful attempts. The admin team has been notified." });
          }
        }
        return res.status(400).json({ message: "Enter the 8-digit reset code." });
      }

      const suppliedHash = crypto.createHash("sha256").update(rawCode).digest();
      const storedHash = user?.resetToken ? Buffer.from(user.resetToken, "hex") : Buffer.alloc(0);
      const validCode = !!user
        && (user.status === "active" || user.status === "pending_approval")
        && !!user.resetTokenExpiry
        && new Date() <= user.resetTokenExpiry
        && storedHash.length === suppliedHash.length
        && crypto.timingSafeEqual(storedHash, suppliedHash);

      if (!user || !validCode) {
        recordFailure(rateKey);
        if (user?.status === "active" || user?.status === "pending_approval") {
          const locked = await recordAccountAuthFailure(user, "Password reset code", req);
          if (locked) {
            return res.status(423).json({ message: "This account is locked after five unsuccessful attempts. The admin team has been notified." });
          }
        }
        if (user?.status === "suspended" && user.authLockedAt) {
          return res.status(423).json({ message: "This account is locked after five unsuccessful attempts. The admin team has been notified." });
        }
        return res.status(400).json({ message: "Invalid or expired reset code. Request a new code and try again." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await storage.updateUser(user.id, {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
        failedAuthAttempts: 0,
      });
      await pool.query(`DELETE FROM "user_sessions" WHERE sess->>'userId'=$1`, [user.id]);
      clearFailures(rateKey);

      return res.json({ message: "Password has been reset successfully" });
    } catch (error) {
      console.error("Reset password error:", error);
      return res.status(500).json({ message: "Failed to reset password" });
    }
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user || user.status !== "active") {
        if (req.session.impersonationAuditId) {
          await pool.query(
            `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW()
             WHERE "id" = $1 AND "ended_at" IS NULL`,
            [req.session.impersonationAuditId],
          );
        }
        req.session.destroy(() => {});
        return res.status(401).json({ message: "User not found" });
      }

      let impersonation: { adminFullName: string; adminEmail: string } | null = null;
      if (req.session.impersonatorId) {
        const admin = await storage.getUser(req.session.impersonatorId);
        if (admin?.status === "active" && admin.role === "admin") {
          impersonation = { adminFullName: admin.fullName, adminEmail: admin.email };
        } else {
          if (req.session.impersonationAuditId) {
            await pool.query(
              `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW()
               WHERE "id" = $1 AND "ended_at" IS NULL`,
              [req.session.impersonationAuditId],
            );
          }
          req.session.destroy(() => {});
          return res.status(401).json({ message: "Administrator session is no longer active" });
        }
      }
      return res.json({ user: sanitizeUser(user), impersonation });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.post("/api/auth/impersonate-user/:userId", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId || req.session.impersonatorId) {
        return res.status(403).json({ message: "Admin access required" });
      }
      const admin = await storage.getUser(req.session.userId);
      if (!admin || admin.status !== "active" || admin.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const target = await storage.getUser(String(req.params.userId));
      if (!target || target.status !== "active" || target.role === "admin") {
        return res.status(404).json({ message: "Active client or staff account not found" });
      }

      const audit = await pool.query(
        `INSERT INTO "admin_impersonation_audit" ("admin_user_id", "target_user_id", "ip_address", "user_agent")
         VALUES ($1, $2, $3, $4) RETURNING "id"`,
        [
          admin.id,
          target.id,
          req.ip || req.socket.remoteAddress || "unavailable",
          req.get("user-agent") || "",
        ],
      );
      const auditId = Number(audit.rows[0].id);

      try {
        await regenerateSession(req);
      } catch (error) {
        await pool.query(
          `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW() WHERE "id" = $1`,
          [auditId],
        );
        throw error;
      }
      req.session.userId = target.id;
      req.session.impersonatorId = admin.id;
      req.session.impersonationAuditId = auditId;
      req.session.save((error) => {
        if (error) {
          pool.query(
            `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW() WHERE "id" = $1`,
            [auditId],
          ).catch(() => {});
          req.session.destroy(() => {});
          return res.status(500).json({ message: "Failed to start user session" });
        }
        return res.json({ message: `Now viewing the portal as ${target.fullName}` });
      });
    } catch (error) {
      console.error("Admin impersonation start failed:", error);
      return res.status(500).json({ message: "Failed to start user session" });
    }
  });

  app.post("/api/auth/impersonate/stop", async (req: Request, res: Response) => {
    try {
      const adminId = req.session.impersonatorId;
      const auditId = req.session.impersonationAuditId;
      if (!adminId || !auditId) {
        return res.status(400).json({ message: "No user session is being impersonated" });
      }

      const admin = await storage.getUser(adminId);
      if (!admin || admin.status !== "active" || admin.role !== "admin") {
        await pool.query(
          `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW()
           WHERE "id" = $1 AND "ended_at" IS NULL`,
          [auditId],
        );
        req.session.destroy(() => {});
        res.clearCookie("connect.sid");
        return res.status(401).json({ message: "Administrator account is no longer active" });
      }

      await pool.query(
        `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW()
         WHERE "id" = $1 AND "admin_user_id" = $2 AND "ended_at" IS NULL`,
        [auditId, adminId],
      );
      await regenerateSession(req);
      req.session.userId = admin.id;
      req.session.save((error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to return to admin account" });
        }
        return res.json({ message: "Returned to admin account" });
      });
    } catch (error) {
      console.error("Admin impersonation stop failed:", error);
      return res.status(500).json({ message: "Failed to return to admin account" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    if (req.session.impersonationAuditId) {
      pool.query(
        `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW()
         WHERE "id" = $1 AND "ended_at" IS NULL`,
        [req.session.impersonationAuditId],
      ).catch((error) => console.error("Failed to close impersonation audit:", error));
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Logged out successfully" });
    });
  });
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const user = await storage.getUser(req.session.userId);
  if (!user || user.status !== "active") {
    if (req.session.impersonationAuditId) {
      await pool.query(
        `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW()
         WHERE "id" = $1 AND "ended_at" IS NULL`,
        [req.session.impersonationAuditId],
      );
    }
    return res.status(401).json({ message: "User not found" });
  }
  if (req.session.impersonatorId) {
    const admin = await storage.getUser(req.session.impersonatorId);
    if (!admin || admin.status !== "active" || admin.role !== "admin") {
      if (req.session.impersonationAuditId) {
        await pool.query(
          `UPDATE "admin_impersonation_audit" SET "ended_at" = NOW()
           WHERE "id" = $1 AND "ended_at" IS NULL`,
          [req.session.impersonationAuditId],
        );
      }
      req.session.destroy(() => {});
      return res.status(401).json({ message: "Administrator session is no longer active" });
    }
  }
  (req as any).user = sanitizeUser(user);
  next();
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const user = await storage.getUser(req.session.userId);
  if (!user || user.status !== "active" || user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

function sanitizeUser(user: any) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    companyName: user.companyName,
    role: user.role,
    status: user.status,
    twoFactorEnabled: user.twoFactorEnabled,
    createdAt: user.createdAt,
  };
}
