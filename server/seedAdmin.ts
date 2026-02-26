import bcrypt from "bcryptjs";
import { storage } from "./storage";

export async function seedAdminAccount() {
  const adminEmail = "contact@performanceprocesses.com";
  
  const existing = await storage.getUserByEmail(adminEmail);
  if (existing) {
    console.log("Admin account already exists");
    return;
  }

  const otp = await import("otplib");
  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "PPAdmin2026!";
  const hashedPassword = await bcrypt.hash(defaultPassword, 12);
  const twoFactorSecret = otp.generateSecret();

  const admin = await storage.createUser({
    username: adminEmail,
    email: adminEmail,
    password: hashedPassword,
    companyName: "Performance Processes",
    fullName: "Performance Processes Admin",
  });

  await storage.updateUser(admin.id, {
    role: "admin",
    twoFactorSecret,
    twoFactorEnabled: false,
  });

  console.log("Admin account created successfully:");
  console.log(`  Email: ${adminEmail}`);
  console.log(`  2FA Secret: ${twoFactorSecret}`);
  console.log("  Please set up 2FA on first login.");
}
