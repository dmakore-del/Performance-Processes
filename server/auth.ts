import bcrypt from "bcryptjs";
import crypto from "crypto";
import { storage } from "./storage";
import { registerSchema, loginSchema } from "@shared/schema";
import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { z } from "zod";
import { sendPasswordResetEmail } from "./emailNotifications";

let otplib: any;
const authAttempts = new Map<string, { count: number; blockedUntil: number; expiresAt: number }>();

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

      const { password, companyName, fullName } = parsed.data;
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
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (user.status === "pending_approval") {
        return res.status(403).json({ message: "Your account is pending admin approval. You will be notified once approved." });
      }

      if (user.status === "suspended") {
        return res.status(403).json({ message: "Your account has been suspended. Please contact support." });
      }

      clearFailures(key);
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
      const key = attemptKey(req, "two-factor");
      if (isBlocked(key)) return res.status(429).json({ message: "Too many attempts. Please try again later." });
      const userId = req.session.pendingTwoFactor || req.session.userId;

      if (!userId) {
        return res.status(401).json({ message: "No pending authentication" });
      }

      const user = await storage.getUser(userId);
      if (!user || user.status !== "active" || !user.twoFactorSecret) {
        return res.status(401).json({ message: "Invalid session" });
      }
      if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
        recordFailure(key);
        return res.status(400).json({ message: "Enter a six-digit authentication code" });
      }

      const otp = await getOtpLib();
      const verification = await otp.verify({ secret: user.twoFactorSecret, token: code });
      if (!verification.valid) {
        recordFailure(key);
        return res.status(401).json({ message: "Invalid 2FA code" });
      }

      clearFailures(key);
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
      const parsedEmail = z.string().email().safeParse(req.body?.email);
      const email = parsedEmail.success ? parsedEmail.data.trim().toLowerCase() : "";
      const rateKey = attemptKey(req, "password-reset");
      if (isBlocked(rateKey)) return res.json({ message: "If an account exists with that email, a password reset link has been sent." });
      recordFailure(rateKey);
      if (!email) {
        return res.json({ message: "If an account exists with that email, a password reset link has been sent." });
      }

      const user = await storage.getUserByEmail(email);

      if (user && user.status === "active") {
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000);
        const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

        await storage.updateUser(user.id, { resetToken: tokenHash, resetTokenExpiry });
        const resetUrl = `https://portal.performanceprocesses.com/portal/forgot-password?token=${encodeURIComponent(resetToken)}`;
        try {
          await sendPasswordResetEmail(email, resetUrl);
        } catch (error: any) {
          console.error("Password reset email delivery failed.", error?.code || "delivery_failed");
        }
      }

      return res.json({ message: "If an account exists with that email, a password reset link has been sent." });
    } catch (error) {
      console.error("Forgot password error:", error);
      return res.status(500).json({ message: "Failed to process request" });
    }
  });

  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      if (!token || !password) {
        return res.status(400).json({ message: "Token and new password are required" });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }

      const tokenHash = crypto.createHash("sha256").update(String(token)).digest("hex");
      const user = await storage.getUserByResetToken(tokenHash);
      if (!user || !user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await storage.updateUser(user.id, {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      });
      await pool.query(`DELETE FROM "user_sessions" WHERE sess->>'userId'=$1`, [user.id]);

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
        req.session.destroy(() => {});
        return res.status(401).json({ message: "User not found" });
      }

      return res.json({ user: sanitizeUser(user) });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
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
    return res.status(401).json({ message: "User not found" });
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
