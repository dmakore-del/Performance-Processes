import bcrypt from "bcryptjs";
import crypto from "crypto";
import { storage } from "./storage";
import { registerSchema, loginSchema } from "@shared/schema";
import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";

let otplib: any;
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

export function setupAuth(app: Express) {
  app.use(
    session({
      store: new PgSession({
        pool: pool,
        tableName: "user_sessions",
        createTableIfMissing: true,
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

      const { email, password, companyName, fullName } = parsed.data;

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(409).json({ message: "An account with this email already exists" });
      }

      const existingCompany = await storage.getUserByCompanyName(companyName);
      if (existingCompany) {
        return res.status(409).json({ message: "An account for this organization already exists. Only one account is allowed per organization." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const otp = await getOtpLib();
      const twoFactorSecret = otp.generateSecret();

      const user = await storage.createUser({
        username: email,
        email,
        password: hashedPassword,
        companyName,
        fullName,
      });

      await storage.updateUser(user.id, { twoFactorSecret });

      req.session.userId = user.id;

      const otpauthUrl = otp.generateURI({
        secret: twoFactorSecret,
        issuer: "Performance Processes",
        account: email,
      });

      return res.status(201).json({
        message: "Account created. Please set up two-factor authentication.",
        user: sanitizeUser(user),
        twoFactorSetup: {
          secret: twoFactorSecret,
          otpauthUrl,
        },
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
      const user = await storage.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (user.twoFactorEnabled) {
        req.session.pendingTwoFactor = user.id;
        return res.json({ requiresTwoFactor: true, message: "Please enter your 2FA code" });
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

      const user = await storage.getUser(userId);
      if (!user || !user.twoFactorSecret) {
        return res.status(401).json({ message: "Invalid session" });
      }

      const otp = await getOtpLib();
      const isValid = otp.verify({ secret: user.twoFactorSecret, token: code });
      if (!isValid) {
        return res.status(401).json({ message: "Invalid 2FA code" });
      }

      if (req.session.pendingTwoFactor) {
        delete req.session.pendingTwoFactor;
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
      if (!user) return res.status(401).json({ message: "User not found" });

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
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email is required" });

      const user = await storage.getUserByEmail(email);

      if (user) {
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000);

        await storage.updateUser(user.id, { resetToken, resetTokenExpiry });

        console.log(`Password reset requested for ${email}. Reset token: ${resetToken}`);
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

      const user = await storage.getUserByResetToken(token);
      if (!user || !user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await storage.updateUser(user.id, {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      });

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
      if (!user) {
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

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
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
    twoFactorEnabled: user.twoFactorEnabled,
    createdAt: user.createdAt,
  };
}
