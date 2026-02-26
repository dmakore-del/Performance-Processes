import {
  type User, type InsertUser,
  type InsertContact, type ContactSubmission,
  type InsertJobApplication, type JobApplication,
  type Engagement, type InsertEngagement,
  type Milestone, type InsertMilestone,
  type Document, type InsertDocument,
  type ActionItem, type InsertActionItem,
  type Meeting, type InsertMeeting,
  type Message, type InsertMessage,
  type Resource, type InsertResource,
  type Invoice, type InsertInvoice,
  type Contract, type InsertContract,
  type PerformanceKpi, type InsertPerformanceKpi,
  users, contactSubmissions, jobApplications,
  engagements, milestones, documents, actionItems,
  meetings, messages, resources, invoices, contracts, performanceKpis
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByCompanyName(companyName: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  getUserByResetToken(token: string): Promise<User | undefined>;
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createJobApplication(data: InsertJobApplication): Promise<JobApplication>;

  getEngagements(): Promise<Engagement[]>;
  getEngagement(id: number): Promise<Engagement | undefined>;
  createEngagement(data: InsertEngagement): Promise<Engagement>;
  updateEngagement(id: number, data: Partial<InsertEngagement>): Promise<Engagement>;

  getMilestones(engagementId: number): Promise<Milestone[]>;
  createMilestone(data: InsertMilestone): Promise<Milestone>;
  updateMilestone(id: number, data: Partial<InsertMilestone>): Promise<Milestone>;

  getDocuments(engagementId: number): Promise<Document[]>;
  createDocument(data: InsertDocument): Promise<Document>;
  deleteDocument(id: number): Promise<void>;

  getActionItems(engagementId: number): Promise<ActionItem[]>;
  createActionItem(data: InsertActionItem): Promise<ActionItem>;
  updateActionItem(id: number, data: Partial<InsertActionItem>): Promise<ActionItem>;
  deleteActionItem(id: number): Promise<void>;

  getMeetings(engagementId: number): Promise<Meeting[]>;
  createMeeting(data: InsertMeeting): Promise<Meeting>;
  updateMeeting(id: number, data: Partial<InsertMeeting>): Promise<Meeting>;

  getMessages(engagementId: number, channel?: string): Promise<Message[]>;
  createMessage(data: InsertMessage): Promise<Message>;

  getResources(): Promise<Resource[]>;
  createResource(data: InsertResource): Promise<Resource>;

  getInvoices(engagementId: number): Promise<Invoice[]>;
  createInvoice(data: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, data: Partial<InsertInvoice>): Promise<Invoice>;

  getContracts(engagementId: number): Promise<Contract[]>;
  createContract(data: InsertContract): Promise<Contract>;
  updateContract(id: number, data: Partial<InsertContract>): Promise<Contract>;

  getPerformanceKpis(engagementId: number): Promise<PerformanceKpi[]>;
  createPerformanceKpi(data: InsertPerformanceKpi): Promise<PerformanceKpi>;
  updatePerformanceKpi(id: number, data: Partial<InsertPerformanceKpi>): Promise<PerformanceKpi>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByCompanyName(companyName: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.companyName, companyName));
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt));
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async getUserByResetToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.resetToken, token));
    return user;
  }

  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createJobApplication(data: InsertJobApplication): Promise<JobApplication> {
    const [application] = await db.insert(jobApplications).values(data).returning();
    return application;
  }

  async getEngagements(): Promise<Engagement[]> {
    return db.select().from(engagements).orderBy(desc(engagements.createdAt));
  }

  async getEngagement(id: number): Promise<Engagement | undefined> {
    const [engagement] = await db.select().from(engagements).where(eq(engagements.id, id));
    return engagement;
  }

  async createEngagement(data: InsertEngagement): Promise<Engagement> {
    const [engagement] = await db.insert(engagements).values(data).returning();
    return engagement;
  }

  async updateEngagement(id: number, data: Partial<InsertEngagement>): Promise<Engagement> {
    const [engagement] = await db.update(engagements).set(data).where(eq(engagements.id, id)).returning();
    return engagement;
  }

  async getMilestones(engagementId: number): Promise<Milestone[]> {
    return db.select().from(milestones).where(eq(milestones.engagementId, engagementId)).orderBy(asc(milestones.sortOrder));
  }

  async createMilestone(data: InsertMilestone): Promise<Milestone> {
    const [milestone] = await db.insert(milestones).values(data).returning();
    return milestone;
  }

  async updateMilestone(id: number, data: Partial<InsertMilestone>): Promise<Milestone> {
    const [milestone] = await db.update(milestones).set(data).where(eq(milestones.id, id)).returning();
    return milestone;
  }

  async getDocuments(engagementId: number): Promise<Document[]> {
    return db.select().from(documents).where(eq(documents.engagementId, engagementId)).orderBy(desc(documents.uploadedAt));
  }

  async createDocument(data: InsertDocument): Promise<Document> {
    const [document] = await db.insert(documents).values(data).returning();
    return document;
  }

  async deleteDocument(id: number): Promise<void> {
    await db.delete(documents).where(eq(documents.id, id));
  }

  async getActionItems(engagementId: number): Promise<ActionItem[]> {
    return db.select().from(actionItems).where(eq(actionItems.engagementId, engagementId)).orderBy(desc(actionItems.createdAt));
  }

  async createActionItem(data: InsertActionItem): Promise<ActionItem> {
    const [item] = await db.insert(actionItems).values(data).returning();
    return item;
  }

  async updateActionItem(id: number, data: Partial<InsertActionItem>): Promise<ActionItem> {
    const [item] = await db.update(actionItems).set(data).where(eq(actionItems.id, id)).returning();
    return item;
  }

  async deleteActionItem(id: number): Promise<void> {
    await db.delete(actionItems).where(eq(actionItems.id, id));
  }

  async getMeetings(engagementId: number): Promise<Meeting[]> {
    return db.select().from(meetings).where(eq(meetings.engagementId, engagementId)).orderBy(desc(meetings.createdAt));
  }

  async createMeeting(data: InsertMeeting): Promise<Meeting> {
    const [meeting] = await db.insert(meetings).values(data).returning();
    return meeting;
  }

  async updateMeeting(id: number, data: Partial<InsertMeeting>): Promise<Meeting> {
    const [meeting] = await db.update(meetings).set(data).where(eq(meetings.id, id)).returning();
    return meeting;
  }

  async getMessages(engagementId: number, channel?: string): Promise<Message[]> {
    if (channel) {
      return db.select().from(messages).where(and(eq(messages.engagementId, engagementId), eq(messages.channel, channel))).orderBy(asc(messages.sentAt));
    }
    return db.select().from(messages).where(eq(messages.engagementId, engagementId)).orderBy(asc(messages.sentAt));
  }

  async createMessage(data: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(data).returning();
    return message;
  }

  async getResources(): Promise<Resource[]> {
    return db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async createResource(data: InsertResource): Promise<Resource> {
    const [resource] = await db.insert(resources).values(data).returning();
    return resource;
  }

  async getInvoices(engagementId: number): Promise<Invoice[]> {
    return db.select().from(invoices).where(eq(invoices.engagementId, engagementId)).orderBy(desc(invoices.createdAt));
  }

  async createInvoice(data: InsertInvoice): Promise<Invoice> {
    const [invoice] = await db.insert(invoices).values(data).returning();
    return invoice;
  }

  async updateInvoice(id: number, data: Partial<InsertInvoice>): Promise<Invoice> {
    const [invoice] = await db.update(invoices).set(data).where(eq(invoices.id, id)).returning();
    return invoice;
  }

  async getContracts(engagementId: number): Promise<Contract[]> {
    return db.select().from(contracts).where(eq(contracts.engagementId, engagementId));
  }

  async createContract(data: InsertContract): Promise<Contract> {
    const [contract] = await db.insert(contracts).values(data).returning();
    return contract;
  }

  async updateContract(id: number, data: Partial<InsertContract>): Promise<Contract> {
    const [contract] = await db.update(contracts).set(data).where(eq(contracts.id, id)).returning();
    return contract;
  }

  async getPerformanceKpis(engagementId: number): Promise<PerformanceKpi[]> {
    return db.select().from(performanceKpis).where(eq(performanceKpis.engagementId, engagementId));
  }

  async createPerformanceKpi(data: InsertPerformanceKpi): Promise<PerformanceKpi> {
    const [kpi] = await db.insert(performanceKpis).values(data).returning();
    return kpi;
  }

  async updatePerformanceKpi(id: number, data: Partial<InsertPerformanceKpi>): Promise<PerformanceKpi> {
    const [kpi] = await db.update(performanceKpis).set(data).where(eq(performanceKpis.id, id)).returning();
    return kpi;
  }
}

export const storage = new DatabaseStorage();
