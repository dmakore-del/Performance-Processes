import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, boolean, integer, date, uniqueIndex, json, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  companyName: text("company_name").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("client"),
  status: text("status").notNull().default("active"),
  twoFactorSecret: text("two_factor_secret"),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Session storage is created by server/auth.ts and is included here so schema pushes
// never mistake the live authentication table for an orphaned table.
export const userSessions = pgTable("user_sessions", {
  sid: varchar("sid").primaryKey(),
  sess: json("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});

export const intakeInvitations = pgTable("intake_invitations", {
  id: varchar("id").primaryKey(),
  outlookEventId: text("outlook_event_id").notNull(),
  attendeeEmail: text("attendee_email").notNull(),
  attendeeName: text("attendee_name").notNull().default(""),
  organization: text("organization").notNull().default(""),
  callAt: timestamp("call_at", { withTimezone: true }).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  mailStatus: text("mail_status").notNull().default("pending"),
  attempts: integer("attempts").notNull().default(0),
  nextAttemptAt: timestamp("next_attempt_at", { withTimezone: true }).notNull().defaultNow(),
  lastError: text("last_error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  outlookAttendeeUnique: uniqueIndex("intake_invitation_event_attendee_uq").on(table.outlookEventId, table.attendeeEmail),
  retryIndex: index("intake_invitation_retry_idx").on(table.mailStatus, table.nextAttemptAt),
}));

export const intakeSubmissions = pgTable("intake_submissions", {
  id: varchar("id").primaryKey(),
  requestId: varchar("request_id").notNull().unique(),
  invitationId: varchar("invitation_id").unique(),
  kind: text("kind").notNull(),
  language: text("language").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization").notNull(),
  phone: text("phone").notNull().default(""),
  answers: jsonb("answers").notNull(),
  mailStatus: text("mail_status").notNull().default("pending"),
  attempts: integer("attempts").notNull().default(0),
  nextAttemptAt: timestamp("next_attempt_at", { withTimezone: true }).notNull().defaultNow(),
  lastError: text("last_error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  retryIndex: index("intake_submission_retry_idx").on(table.mailStatus, table.nextAttemptAt),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  companyName: true,
  fullName: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(2),
  fullName: z.string().min(2),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  linkedIn: text("linkedin"),
  coverLetter: text("cover_letter"),
  resumeFilename: text("resume_filename").notNull(),
  resumePath: text("resume_path").notNull(),
  position: text("position").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  createdAt: true,
});

export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;

export const engagements = pgTable("engagements", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  engagementType: text("engagement_type").notNull(),
  offerId: text("offer_id"),
  serviceCategory: text("service_category").default("business-setup"),
  startDate: text("start_date").notNull(),
  currentPhase: text("current_phase").notNull(),
  status: text("status").notNull().default("active"),
  completionPercent: integer("completion_percent").notNull().default(0),
  nextSession: text("next_session"),
  nextSessionDate: text("next_session_date"),
  retainerPlan: text("retainer_plan"),
  retainerAmountCents: integer("retainer_amount_cents").notNull().default(0),
  retainerInterval: text("retainer_interval").notNull().default("month"),
  retainerStatus: text("retainer_status").notNull().default("inactive"),
  retainerNextBillingDate: text("retainer_next_billing_date"),
  retainerStripeSubscriptionId: text("retainer_stripe_subscription_id"),
  assignedStaffId: text("assigned_staff_id"),
  clientUserId: text("client_user_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEngagementSchema = createInsertSchema(engagements).omit({
  id: true,
  createdAt: true,
});

export type InsertEngagement = z.infer<typeof insertEngagementSchema>;
export type Engagement = typeof engagements.$inferSelect;

export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  title: text("title").notNull(),
  phase: text("phase").notNull(),
  status: text("status").notNull().default("pending"),
  owner: text("owner"),
  dueDate: text("due_date"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
});

export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type Milestone = typeof milestones.$inferSelect;

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  name: text("name").notNull(),
  folder: text("folder").notNull(),
  fileType: text("file_type").notNull(),
  size: text("size").notNull(),
  version: text("version").notNull().default("v1.0"),
  filePath: text("file_path"),
  uploadedBy: text("uploaded_by"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadedAt: true,
});

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export const actionItems = pgTable("action_items", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  task: text("task").notNull(),
  owner: text("owner").notNull(),
  dueDate: text("due_date").notNull(),
  status: text("status").notNull().default("pending"),
  priority: text("priority").notNull().default("medium"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActionItemSchema = createInsertSchema(actionItems).omit({
  id: true,
  createdAt: true,
});

export type InsertActionItem = z.infer<typeof insertActionItemSchema>;
export type ActionItem = typeof actionItems.$inferSelect;

export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  title: text("title").notNull(),
  meetingDate: text("meeting_date").notNull(),
  meetingTime: text("meeting_time").notNull(),
  duration: text("duration"),
  meetingType: text("meeting_type").notNull().default("MS Teams"),
  platform: text("platform").notNull().default("teams"),
  meetingLink: text("meeting_link"),
  notes: text("notes"),
  status: text("status").notNull().default("upcoming"),
  agendaItems: text("agenda_items"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMeetingSchema = createInsertSchema(meetings).omit({
  id: true,
  createdAt: true,
});

export type InsertMeeting = z.infer<typeof insertMeetingSchema>;
export type Meeting = typeof meetings.$inferSelect;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  senderId: text("sender_id").notNull(),
  recipientId: text("recipient_id").notNull(),
  senderName: text("sender_name").notNull(),
  senderRole: text("sender_role").notNull().default("client"),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  sentAt: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  resourceType: text("resource_type").notNull(),
  category: text("category").notNull(),
  content: text("content"),
  fileUrl: text("file_url"),
  accessUrl: text("access_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  invoiceNumber: text("invoice_number").notNull(),
  issueDate: text("issue_date").notNull(),
  dueDate: text("due_date").notNull(),
  amount: text("amount").notNull(),
  amountCents: integer("amount_cents").notNull().default(0),
  currency: varchar("currency", { length: 3 }).notNull().default("cad"),
  status: text("status").notNull().default("unpaid"),
  description: text("description"),
  paymentType: text("payment_type").notNull().default("one_time"),
  stripeSessionId: text("stripe_session_id"),
  stripeInvoiceId: text("stripe_invoice_id"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
});

export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

// This is intentionally in the public schema (rather than Stripe's synced schema).
// It is our durable, immutable record of what was receipted and delivered.
export const paymentReceipts = pgTable("payment_receipts", {
  id: serial("id").primaryKey(),
  stripeEventId: text("stripe_event_id").notNull(),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentId: text("stripe_payment_id"),
  stripeInvoiceId: text("stripe_invoice_id"),
  receiptNumber: text("receipt_number").notNull(),
  customerEmail: text("customer_email"),
  customerName: text("customer_name"),
  serviceDescription: text("service_description").notNull(),
  subtotalCents: integer("subtotal_cents").notNull(),
  amountCents: integer("amount_cents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("cad"),
  paymentStatus: text("payment_status").notNull(),
  paymentMethod: text("payment_method"),
  recurring: boolean("recurring").notNull().default(false),
  paidAt: timestamp("paid_at"),
  // Base64 is used because this Drizzle version has no bytea column helper.
  // It remains private, database-backed receipt content and is decoded only by admin download.
  pdfContent: text("pdf_content").notNull(),
  emailStatus: text("email_status").notNull().default("pending"),
  emailError: text("email_error"),
  emailSentAt: timestamp("email_sent_at"),
  deliveryAttempts: integer("delivery_attempts").notNull().default(0),
  nextDeliveryAttemptAt: timestamp("next_delivery_attempt_at"),
  deliveryClaimedAt: timestamp("delivery_claimed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  uniqueIndex("payment_receipts_stripe_event_id_unique").on(table.stripeEventId),
  uniqueIndex("payment_receipts_receipt_number_unique").on(table.receiptNumber),
  uniqueIndex("payment_receipts_stripe_session_id_unique").on(table.stripeSessionId),
  uniqueIndex("payment_receipts_stripe_invoice_id_unique").on(table.stripeInvoiceId),
  uniqueIndex("payment_receipts_stripe_payment_id_unique").on(table.stripePaymentId),
]);

export type PaymentReceipt = typeof paymentReceipts.$inferSelect;

export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  title: text("title").notNull(),
  documentDate: text("document_date").notNull(),
  status: text("status").notNull().default("pending"),
  terms: text("terms"),
  documentUrl: text("document_url"),
  signedByUserId: text("signed_by_user_id"),
  signedByName: text("signed_by_name"),
  signedAt: timestamp("signed_at"),
  signatureData: text("signature_data"),
});

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
});

export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contracts.$inferSelect;

export const performanceKpis = pgTable("performance_kpis", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  name: text("name").notNull(),
  currentValue: text("current_value").notNull(),
  targetValue: text("target_value").notNull(),
  status: text("status").notNull().default("on-track"),
  period: text("period").notNull(),
  category: text("category"),
});

export const insertPerformanceKpiSchema = createInsertSchema(performanceKpis).omit({
  id: true,
});

export type InsertPerformanceKpi = z.infer<typeof insertPerformanceKpiSchema>;
export type PerformanceKpi = typeof performanceKpis.$inferSelect;

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  source: text("source").notNull().default("website"),
  status: text("status").notNull().default("new"),
  priority: text("priority").notNull().default("medium"),
  serviceInterest: text("service_interest"),
  estimatedValue: text("estimated_value"),
  notes: text("notes"),
  assignedToId: text("assigned_to_id"),
  assignedToName: text("assigned_to_name"),
  lastContactDate: text("last_contact_date"),
  nextFollowUpDate: text("next_follow_up_date"),
  createdById: text("created_by_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const grantApplications = pgTable("grant_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  province: text("province").notNull(),
  occupation: text("occupation").notNull(),
  companyOrOrg: text("company_or_org"),
  industry: text("industry").notNull(),
  yearsExperience: text("years_experience").notNull(),
  focusArea: text("focus_area").notNull(),
  currentRole: text("current_role").notNull(),
  teamSize: text("team_size"),
  goals: text("goals").notNull(),
  challenges: text("challenges").notNull(),
  hopeToAchieve: text("hope_to_achieve").notNull(),
  currentSystems: text("current_systems").notNull(),
  previousCoaching: text("previous_coaching").notNull(),
  commitment: text("commitment").notNull(),
  howHeard: text("how_heard").notNull(),
  additionalInfo: text("additional_info"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGrantApplicationSchema = createInsertSchema(grantApplications).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertGrantApplication = z.infer<typeof insertGrantApplicationSchema>;
export type GrantApplication = typeof grantApplications.$inferSelect;

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("website"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

export const scheduledEmails = pgTable("scheduled_emails", {
  id: serial("id").primaryKey(),
  recipientEmail: text("recipient_email").notNull(),
  recipientName: text("recipient_name").notNull(),
  emailType: text("email_type").notNull(),
  sequenceStep: integer("sequence_step").notNull().default(1),
  subject: text("subject").notNull(),
  status: text("status").notNull().default("pending"),
  sendAt: timestamp("send_at").notNull(),
  sentAt: timestamp("sent_at"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ScheduledEmail = typeof scheduledEmails.$inferSelect;

export const assessmentSubmissions = pgTable("assessment_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
  organizationName: text("organization_name"),
  organizationType: text("organization_type"),
  roleTitle: text("role_title"),
  totalScore: integer("total_score").notNull(),
  foundationScore: integer("foundation_score").notNull(),
  buildScore: integer("build_score").notNull(),
  runScore: integer("run_score").notNull(),
  scoreLabel: text("score_label").notNull(),
  recommendedPath: text("recommended_path").notNull(),
  answers: text("answers").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAssessmentSchema = createInsertSchema(assessmentSubmissions).omit({
  id: true,
  createdAt: true,
});

export type AssessmentSubmission = typeof assessmentSubmissions.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
