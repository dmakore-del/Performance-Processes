import { z } from "zod";
import { insertInvoiceSchema, insertPerformanceKpiSchema } from "@shared/schema";

const day = z.string().date();
const numericText = z.string().trim().min(1).max(40).refine(value => Number.isFinite(Number(value)), "Enter a numeric measurement");

export const invoiceWriteSchema = insertInvoiceSchema.omit({
  stripeSessionId: true, stripeInvoiceId: true,
}).extend({
  invoiceNumber: z.string().trim().min(1).max(100),
  engagementId: z.number().int().positive(),
  amount: z.string().optional(),
  amountCents: z.number().int().positive().max(100_000_000),
  issueDate: day,
  dueDate: day,
  status: z.enum(["unpaid", "overdue", "paid", "void"]).default("unpaid"),
  currency: z.string().regex(/^[a-zA-Z]{3}$/).default("cad"),
  paidAt: z.coerce.date().nullable().optional(),
  description: z.string().max(2000).nullable().optional(),
  paymentType: z.enum(["one_time", "monthly_retainer"]).default("one_time"),
});

export const invoicePatchSchema = invoiceWriteSchema.omit({ engagementId: true }).partial();

/** Historical payments are ledger entries, not new checkout/payment events. */
export function invoicePaymentError(
  invoice: { status?: string; paidAt?: Date | null; issueDate?: string; dueDate?: string },
  role: string,
  now = new Date(),
): string | null {
  if (role !== "admin" && invoice.status !== "unpaid") return "Only administrators can record historical payments.";
  if (invoice.issueDate && invoice.dueDate && invoice.dueDate < invoice.issueDate) return "Due date cannot precede the issue date.";
  if (invoice.status === "paid") {
    if (!invoice.paidAt || !Number.isFinite(invoice.paidAt.getTime())) return "A paid date is required for a paid invoice.";
    if (invoice.paidAt > now) return "Paid date cannot be in the future.";
    if (invoice.issueDate && invoice.paidAt.toISOString().slice(0, 10) < invoice.issueDate) return "Paid date cannot precede the issue date.";
  }
  return null;
}

export function invoiceAmount(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: currency.toUpperCase() }).format(amountCents / 100);
}

export const kpiWriteSchema = insertPerformanceKpiSchema.extend({
  engagementId: z.number().int().positive(),
  name: z.string().trim().min(1).max(180),
  currentValue: numericText,
  targetValue: numericText,
  baselineValue: numericText.nullable().optional(),
  unit: z.string().trim().min(1).max(40).default("%"),
  direction: z.enum(["increase", "decrease"]).default("increase"),
  status: z.enum(["on-track", "needs-attention", "at-risk"]).default("on-track"),
  period: z.string().trim().min(1).max(100),
  outcomeNotes: z.string().trim().max(4000).nullable().optional(),
  category: z.string().max(100).nullable().optional(),
});

export const kpiPatchSchema = kpiWriteSchema.omit({ engagementId: true }).partial();
