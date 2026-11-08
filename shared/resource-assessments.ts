import { z } from "zod";

const contact = {
  requestId: z.string().uuid(),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  businessName: z.string().trim().max(180).default(""),
  language: z.enum(["en", "fr"]).default("en"),
  website: z.string().max(200).default(""),
};
const selected = z.array(z.string().max(400)).max(50);
const startup = z.object({
  ...contact, kind: z.literal("startup"),
  phase1: selected, phase2: selected, phase3: selected, phase4: selected, phase5: selected, phase6: selected,
  urgentRequirement: z.string().trim().max(1000).default(""),
  nextDecision: z.string().trim().max(1000).default(""),
  targetMilestone: z.string().trim().max(200).default(""),
  adviserToConsult: z.string().trim().max(300).default(""),
}).strict();
const readiness = z.object({
  ...contact, kind: z.literal("readiness"),
  status1: z.enum(["working", "attention", "na"]), status2: z.enum(["working", "attention", "na"]),
  status3: z.enum(["working", "attention", "na"]), status4: z.enum(["working", "attention", "na"]),
  status5: z.enum(["working", "attention", "na"]), status6: z.enum(["working", "attention", "na"]),
  status7: z.enum(["working", "attention", "na"]), status8: z.enum(["working", "attention", "na"]),
  status9: z.enum(["working", "attention", "na"]), status10: z.enum(["working", "attention", "na"]),
  priority1: z.string().trim().min(2).max(300), why1: z.string().trim().min(2).max(500),
  priority2: z.string().trim().min(2).max(300), why2: z.string().trim().min(2).max(500),
  priority3: z.string().trim().min(2).max(300), why3: z.string().trim().min(2).max(500),
  quickWin: z.string().trim().min(2).max(500), quickWinOwner: z.string().trim().max(120).default(""),
  quickWinDate: z.string().trim().max(30).default(""),
  largerChange: z.string().trim().min(2).max(500), largerOwner: z.string().trim().max(120).default(""),
  largerDate: z.string().trim().max(30).default(""), reassessDate: z.string().trim().max(30).default(""),
}).strict();
const funding = z.object({
  ...contact, kind: z.literal("funding"),
  legalEntityName: z.string().trim().min(2).max(180),
  municipality: z.string().trim().min(2).max(100),
  sector: z.string().trim().min(2).max(120),
  businessStage: z.enum(["pre-revenue", "operating-under-2", "operating-2-plus", "nonprofit", "other"]),
  yearsOperating: z.string().trim().max(40).default(""),
  fundingType: z.enum(["grant", "financing", "both", "unsure"]),
  opportunityKnown: z.enum(["yes", "researching", "no"]),
  programOrLender: z.string().trim().max(180).default(""),
  applicationDeadline: z.string().trim().max(30).default(""),
  projectDescription: z.string().trim().min(20).max(2000),
  useOfFunds: selected,
  servicesOfInterest: selected,
  registrations: z.enum(["complete", "in-progress", "not-sure"]),
  businessPlan: z.enum(["ready", "needs-update", "not-available", "not-sure"]),
  cashflowProjections: z.enum(["ready", "needs-update", "not-available", "not-sure"]),
  projectBudget: z.enum(["ready", "needs-update", "not-available", "not-sure"]),
  bookkeepingRecords: z.enum(["organized", "some-records", "not-sure"]),
  financialRecordsAvailable: z.enum(["yes", "partial", "no", "not-sure"]),
  ownerAuthorization: z.enum(["yes", "needs-discussion", "not-sure"]),
  priorApplications: z.enum(["yes", "no", "not-sure"]),
  otherFundingOrDebt: z.enum(["yes", "no", "not-sure"]),
  timingAndConstraints: z.string().trim().max(1200).default(""),
  nextQuestion: z.string().trim().max(1000).default(""),
}).strict();

export const resourceAssessmentSchema = z.discriminatedUnion("kind", [startup, readiness, funding]);
export type ResourceAssessmentInput = z.infer<typeof resourceAssessmentSchema>;
export type AssessmentKind = ResourceAssessmentInput["kind"];
