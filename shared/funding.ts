import { z } from "zod";

// These are internal service-order terms, never public website pricing.
export const FUNDING_AGREEMENT_VERSION = "grant-financing-2026-10-23";

/** Monthly actual-time invoices may be issued on month-end or for an earlier month. */
export function latestFundingBillingMonth(date = new Date()) {
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  return date.getUTCDate() === lastDay
    ? date.toISOString().slice(0, 7)
    : new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1)).toISOString().slice(0, 7);
}
export const FUNDING_SERVICES = [
  { id: "research", name: "Suitable opportunity research", fr: "Recherche d’occasions admissibles", feeCents: 15000, timing: "delivery", unit: "opportunity", includesReadiness: false, application: false },
  { id: "standard-grant", name: "Standard grant application", fr: "Demande de subvention standard", feeCents: 56000, timing: "split", unit: "application", includesReadiness: true, application: true },
  { id: "standard-financing", name: "Standard financing application", fr: "Demande de financement standard", feeCents: 40000, timing: "split", unit: "application", includesReadiness: false, application: true },
  { id: "complex-application", name: "Complex grant or financing application", fr: "Demande complexe de subvention ou financement", feeCents: null, timing: "split", unit: "application", includesReadiness: true, application: true },
  { id: "readiness", name: "Funding readiness review", fr: "Évaluation de la préparation au financement", feeCents: 17500, timing: "delivery", unit: "project", includesReadiness: false, application: false },
  { id: "business-plan", name: "Business plan or substantial update", fr: "Plan d’affaires ou mise à jour importante", feeCents: null, timing: "split", unit: "project", includesReadiness: true, application: false },
  { id: "projections", name: "Cash-flow forecast and financial projections", fr: "Prévisions de trésorerie et projections financières", feeCents: 49000, timing: "split", unit: "model", includesReadiness: true, application: false },
  { id: "hourly-support", name: "Post-award, lender and other support", fr: "Soutien après attribution, auprès du prêteur et autres", feeCents: 17500, timing: "hourly", unit: "hour", includesReadiness: false, application: false },
] as const;

export const fundingService = (id: string) => FUNDING_SERVICES.find((s) => s.id === id);
export const isFundingService = (category?: string | null) => category === "grant-support" || category === "financing-support";
export const money = (cents: number, language = "en") => new Intl.NumberFormat(language === "fr" ? "fr-CA" : "en-CA", { style: "currency", currency: "CAD" }).format(cents / 100);
export const withTax = (base: number, hstBps: number) => ({ base, tax: Math.round(base * hstBps / 10000), total: base + Math.round(base * hstBps / 10000) });
const calendarDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((s) => !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0, 10) === s, "Use a valid date.");
const optionalDate = calendarDate.or(z.literal("")).optional();

export const fundingOrderSchema = z.object({
  serviceKey: z.string().refine((s) => !!fundingService(s), "Choose a funding service."),
  scopeKey: z.string().trim().min(3).max(160).transform((s) => s.toLowerCase()),
  scope: z.string().trim().min(20).max(6000),
  funder: z.string().trim().max(200).default(""),
  program: z.string().trim().max(240).default(""),
  fundingKind: z.enum(["grant", "financing"]).default("grant"),
  quantity: z.string().refine((s) => Number.isFinite(Number(s)) && Number(s) > 0 && Number(s) <= 10000, "Enter a positive approved quantity."),
  unitFeeCents: z.number().int().positive().max(100000000),
  hstBps: z.number().int().min(0).max(1500).default(1300),
  budgetCapCents: z.number().int().positive().max(100000000),
  quoteReference: z.string().trim().min(3).max(300),
  recordsDue: optionalDate,
  draftDue: optionalDate,
  approvalDue: optionalDate,
  submissionDue: optionalDate,
  percentageFeePermitted: z.boolean().default(false),
}).superRefine((v, ctx) => {
  const service = fundingService(v.serviceKey);
  if (!service) return;
  const add = (path: string, message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
  const qty = Number(v.quantity);
  if (service.timing === "hourly" ? !Number.isInteger(qty * 4) : !Number.isInteger(qty)) add("quantity", "Hours must use 15-minute increments; other quantities must be whole units.");
  if (!["research", "hourly-support"].includes(service.id) && qty !== 1) add("quantity", "Create a separate order for each application, project or model.");
  if (service.feeCents != null && (service.id === "projections" ? v.unitFeeCents < service.feeCents : v.unitFeeCents !== service.feeCents)) add("unitFeeCents", "Use the agreement rate. Different rates require a separate signed amendment.");
  const total = Math.round(qty * v.unitFeeCents);
  if (total > v.budgetCapCents || total > 100000000) add("budgetCapCents", "The approved fee must fit the written budget cap.");
  if (service.application && (!v.funder || !v.program || !v.percentageFeePermitted)) add("funder", "Identify the funder/lender and program/intake, and confirm that the 6% fee is permitted.");
  if (service.id === "standard-grant" && v.fundingKind !== "grant") add("fundingKind", "Use grant funding for this service.");
  if (service.id === "standard-financing" && v.fundingKind !== "financing") add("fundingKind", "Use financing for this service.");
  const dates = [v.recordsDue, v.draftDue, v.approvalDue, v.submissionDue].filter(Boolean) as string[];
  if (dates.some((value, index) => index > 0 && value < dates[index - 1])) add("draftDue", "Delivery, review and submission dates must be in chronological order.");
});
export type FundingOrderInput = z.infer<typeof fundingOrderSchema>;

export const fundingApprovalSchema = z.object({
  signerName: z.string().trim().min(2).max(120),
  signerTitle: z.string().trim().min(2).max(120),
  legalBusinessName: z.string().trim().min(2).max(200),
  businessAddress: z.string().trim().min(10).max(500),
  acceptTerms: z.literal(true),
});
export const fundingDeliverySchema = z.object({
  type: z.enum(["draft", "delivered"]),
  reference: z.string().trim().min(10).max(1500),
  actualQuantity: z.number().int().positive().optional(),
  suitableResearchConfirmed: z.boolean().optional(),
});
export const fundingPaymentSchema = z.object({
  stage: z.enum(["authorization", "draft", "delivery", "hourly", "success"]),
  hours: z.number().positive().max(10000).optional(),
  period: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional(),
  qualifyingFundsCents: z.number().int().positive().max(1000000000).optional(),
  receiptReference: z.string().trim().min(3).max(200).transform((s) => s.toLowerCase()).optional(),
  receivedDate: calendarDate.optional(),
  evidenceReference: z.string().trim().min(10).max(1500).optional(),
  confirmQualifyingReceipt: z.boolean().optional(),
});
