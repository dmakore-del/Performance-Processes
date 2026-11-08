import { z } from "zod";

export const BOOKING_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";
export const INQUIRY_SERVICES = [
  "Business Setup Essentials", "Complete Business Launch", "Website & Digital Presence",
  "Business Systems & Growth", "Grants & Financing", "Help me choose",
] as const;
const campaignValue = z.string().trim().max(100).regex(/^[a-zA-Z0-9 _./-]*$/, "Use campaign labels without personal information.");
export const attributionSchema = z.object({
  source: campaignValue.optional(), medium: campaignValue.optional(), campaign: campaignValue.optional(),
  content: campaignValue.optional(), term: campaignValue.optional(),
  landingPath: z.string().max(120).regex(/^\/[a-z0-9/-]*$/i).optional(),
  referrerHost: z.string().max(180).regex(/^[a-z0-9.-]*$/i).optional(),
}).strict();
export const inquirySchema = z.object({
  requestId: z.string().uuid(),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((s) => s.toLowerCase()),
  phone: z.string().trim().max(40).default(""),
  businessName: z.string().trim().max(180).default(""),
  customerType: z.enum(["launch", "growth"]),
  businessStage: z.enum(["idea", "pre-launch", "operating", "growing", "nonprofit"]),
  serviceInterest: z.enum(INQUIRY_SERVICES),
  projectDescription: z.string().trim().min(20).max(3000),
  contactMethod: z.enum(["email", "phone"]).default("email"),
  marketingConsent: z.boolean().default(false),
  analyticsConsent: z.boolean().default(false),
  language: z.enum(["en", "fr"]).default("en"),
  firstTouch: attributionSchema.default({}),
  latestTouch: attributionSchema.default({}),
  website: z.string().max(200).default(""),
}).strict().superRefine((value, context) => {
  if (value.contactMethod === "phone" && (value.phone.match(/\d/g) || []).length < 7) {
    context.addIssue({ code: "custom", path: ["phone"], message: "Enter a phone number or choose email." });
  }
});
export type InquiryInput = z.infer<typeof inquirySchema>;
export type Attribution = z.infer<typeof attributionSchema>;
export type AcquisitionDetails = Omit<InquiryInput, "requestId" | "fullName" | "email" | "phone" | "businessName" | "website"> & {
  consentVersion: string; receivedAt: string; notificationStatus: "pending" | "sent";
  adminNotified?: boolean; clientNotified?: boolean; mailAttempts?: number; nextMailAttemptAt?: string;
  bookingId?: string; bookedAt?: string; meetingAt?: string; bookingStatus?: "confirmed" | "cancelled";
};
