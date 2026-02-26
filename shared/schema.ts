import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, boolean, integer, date } from "drizzle-orm/pg-core";
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
  accountType: z.enum(["client", "staff"]).default("client"),
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
  startDate: text("start_date").notNull(),
  currentPhase: text("current_phase").notNull(),
  status: text("status").notNull().default("active"),
  completionPercent: integer("completion_percent").notNull().default(0),
  nextSession: text("next_session"),
  nextSessionDate: text("next_session_date"),
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
  status: text("status").notNull().default("unpaid"),
  description: text("description"),
  stripeSessionId: text("stripe_session_id"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
});

export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

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
