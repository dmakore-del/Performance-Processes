import type { Express, Request, Response } from "express";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { and, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db";
import { requireAdmin } from "./auth";
import { engagements, fundingOrders, fundingCharges, invoices } from "@shared/schema";
import { FUNDING_AGREEMENT_VERSION, fundingApprovalSchema, fundingDeliverySchema, fundingOrderSchema, fundingPaymentSchema, fundingService, isFundingService, latestFundingBillingMonth, money, withTax } from "@shared/funding";

class FundingError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
function route(handler: (req: Request, res: Response) => Promise<unknown>) {
  return async (req: Request, res: Response) => {
    try { await handler(req, res); }
    catch (error: any) {
      if (error instanceof z.ZodError) return res.status(400).json({ message: error.issues[0]?.message || "Invalid funding order data." });
      if (error instanceof FundingError) return res.status(error.status).json({ message: error.message });
      if (error?.code === "23505" || error?.cause?.code === "23505") return res.status(409).json({ message: "This payment stage or funding receipt has already been recorded. Do not bill it twice." });
      console.error("Funding workspace operation failed", error?.code || error?.message);
      return res.status(500).json({ message: "Unable to save the funding record. Please try again." });
    }
  };
}
const idValue = (id: unknown) => {
  const value = Number(id);
  if (!Number.isSafeInteger(value) || value < 1) throw new FundingError(400, "Invalid record id.");
  return value;
};
async function accessibleEngagement(req: Request, id: unknown) {
  const [engagement] = await db.select().from(engagements).where(eq(engagements.id, idValue(id)));
  if (!engagement) throw new FundingError(404, "Service not found.");
  const user = (req as any).user;
  if (user.role !== "admin" && !(user.role === "client" && engagement.clientUserId === user.id) && !(user.role === "staff" && engagement.assignedStaffId === user.id)) {
    throw new FundingError(403, "You do not have access to this service.");
  }
  if (!isFundingService(engagement.serviceCategory)) throw new FundingError(400, "Select a Grants & Financing service first.");
  if (!engagement.clientUserId) throw new FundingError(400, "Assign this service to an active client first.");
  return engagement;
}
async function accessibleOrder(req: Request) {
  const [order] = await db.select().from(fundingOrders).where(eq(fundingOrders.id, idValue(req.params.id)));
  if (!order) throw new FundingError(404, "Funding order not found.");
  const engagement = await accessibleEngagement(req, order.engagementId);
  return { order, engagement };
}
type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];
async function lockOrder(tx: Tx, id: number) {
  await tx.execute(sql`SELECT id FROM funding_orders WHERE id = ${id} FOR UPDATE`);
  const [order] = await tx.select().from(fundingOrders).where(eq(fundingOrders.id, id));
  if (!order) throw new FundingError(404, "Funding order not found.");
  return order;
}

// Mounted after the portal's requireAuth middleware. No public price endpoints.
export function registerFundingRoutes(app: Express) {
  app.get("/api/portal/funding-agreement", route(async (_req, res) => {
    res.set({ "Cache-Control": "private, no-store", "Content-Type": "application/pdf", "X-Content-Type-Options": "nosniff" });
    res.sendFile(resolve("server/assets", `${FUNDING_AGREEMENT_VERSION}.pdf`));
  }));

  app.get("/api/portal/engagements/:engagementId/funding-orders", route(async (req, res) => {
    const engagement = await accessibleEngagement(req, req.params.engagementId);
    const orders = await db.select().from(fundingOrders).where(eq(fundingOrders.engagementId, engagement.id));
    const charges = orders.length ? await db.select({ charge: fundingCharges, invoiceStatus: invoices.status, invoiceNumber: invoices.invoiceNumber })
      .from(fundingCharges).innerJoin(invoices, eq(fundingCharges.invoiceId, invoices.id))
      .where(inArray(fundingCharges.orderId, orders.map((o) => o.id))) : [];
    res.set("Cache-Control", "private, no-store").json(orders.map((order) => ({
      ...order, charges: charges.filter((c) => c.charge.orderId === order.id).map((c) => ({ ...c.charge, invoiceStatus: c.invoiceStatus, invoiceNumber: c.invoiceNumber })),
    })));
  }));

  app.post("/api/portal/engagements/:engagementId/funding-orders", requireAdmin, route(async (req, res) => {
    const engagement = await accessibleEngagement(req, req.params.engagementId);
    const data = fundingOrderSchema.parse(req.body);
    const service = fundingService(data.serviceKey)!;
    const order = await db.transaction(async (tx) => {
      // One lock per client also protects conflicts across grant/financing engagements.
      await tx.execute(sql`SELECT id FROM users WHERE id = ${engagement.clientUserId} FOR UPDATE`);
      const peers = await tx.select({ order: fundingOrders }).from(fundingOrders)
        .innerJoin(engagements, eq(fundingOrders.engagementId, engagements.id))
        .where(and(eq(engagements.clientUserId, engagement.clientUserId!), eq(fundingOrders.scopeKey, data.scopeKey)));
      for (const { order: peer } of peers) {
        if (["withdrawn", "declined"].includes(peer.status)) continue;
        const previous = fundingService(peer.serviceKey)!;
        if (previous.id === service.id || (previous.application && service.application)) throw new FundingError(409, "An order already covers this service/application scope. Standard and complex applications are alternatives. Use a separate reference only for genuinely separate work.");
        if ((service.includesReadiness && ["readiness", "research"].includes(previous.id)) || (previous.includesReadiness && ["readiness", "research"].includes(service.id))) {
          throw new FundingError(409, "This scope includes readiness and eligibility assessment. Do not add a duplicate fee. Withdraw an unapproved order or resolve any prior billed assessment before proceeding. Unrelated searches need a separate approved scope.");
        }
      }
      const [created] = await tx.insert(fundingOrders).values({
        ...data, engagementId: engagement.id, agreementVersion: FUNDING_AGREEMENT_VERSION,
        createdByUserId: (req as any).user.id,
      }).returning();
      return created;
    });
    res.status(201).json(order);
  }));

  app.post("/api/portal/funding-orders/:id/approve", route(async (req, res) => {
    const { order, engagement } = await accessibleOrder(req);
    const user = (req as any).user;
    if (user.role !== "client" || user.id !== engagement.clientUserId || req.session.impersonatorId) throw new FundingError(403, "The client must authorize their own service order. An administrator viewing as a client cannot approve fees.");
    const data = fundingApprovalSchema.parse(req.body);
    const updated = await db.transaction(async (tx) => {
      const current = await lockOrder(tx, order.id);
      if (current.status !== "proposed") throw new FundingError(409, "Only a proposed order can be authorized.");
      const [saved] = await tx.update(fundingOrders).set({
        status: "approved", approvedAt: new Date(), approvedByUserId: user.id,
        signerName: data.signerName, signerTitle: data.signerTitle,
        legalBusinessName: data.legalBusinessName, businessAddress: data.businessAddress,
      }).where(eq(fundingOrders.id, current.id)).returning();
      return saved;
    });
    res.json(updated);
  }));

  for (const action of ["decline", "withdraw"] as const) {
    app.post(`/api/portal/funding-orders/:id/${action}`, route(async (req, res) => {
      const { order, engagement } = await accessibleOrder(req);
      const user = (req as any).user;
      if (action === "withdraw" ? user.role !== "admin" : (user.role !== "client" || user.id !== engagement.clientUserId || req.session.impersonatorId)) throw new FundingError(403, "You cannot perform this action.");
      const saved = await db.transaction(async (tx) => {
        const current = await lockOrder(tx, order.id);
        if (current.status !== "proposed") throw new FundingError(409, "Authorized orders remain part of the record. Changes or cancellation require a separate written agreement.");
        const [updated] = await tx.update(fundingOrders).set({ status: action === "decline" ? "declined" : "withdrawn" }).where(eq(fundingOrders.id, order.id)).returning();
        return updated;
      });
      res.json(saved);
    }));
  }

  app.post("/api/portal/funding-orders/:id/delivery", requireAdmin, route(async (req, res) => {
    const { order } = await accessibleOrder(req);
    const data = fundingDeliverySchema.parse(req.body);
    const saved = await db.transaction(async (tx) => {
      const current = await lockOrder(tx, order.id);
      if (current.status !== "approved") throw new FundingError(409, "Written client authorization is required before work starts.");
      if (data.type === "draft" ? current.draftProvidedAt : current.deliveredAt) throw new FundingError(409, "This delivery event has already been recorded.");
      if (current.serviceKey === "research" && data.type === "delivered" && (!data.suitableResearchConfirmed || !data.actualQuantity || data.actualQuantity > Number(current.quantity))) {
        throw new FundingError(400, "Confirm the actual number of distinct suitable opportunities with written summaries, eligibility and next steps. Never bill raw listings, duplicates or the unused research cap.");
      }
      const [updated] = await tx.update(fundingOrders).set(data.type === "draft"
        ? { draftProvidedAt: new Date(), draftReference: data.reference }
        : { deliveredAt: new Date(), deliveryReference: data.reference, deliveredQuantity: current.serviceKey === "research" ? data.actualQuantity! : 1 }).where(eq(fundingOrders.id, order.id)).returning();
      return updated;
    });
    res.json(saved);
  }));

  app.post("/api/portal/funding-orders/:id/request-payment", requireAdmin, route(async (req, res) => {
    const { order, engagement } = await accessibleOrder(req);
    const data = fundingPaymentSchema.parse(req.body);
    const result = await db.transaction(async (tx) => {
      const current = await lockOrder(tx, order.id);
      if (current.status !== "approved" || !current.approvedAt) throw new FundingError(409, "Do not invoice until the client has approved scope, fee and budget in writing.");
      const service = fundingService(current.serviceKey)!;
      const past = await tx.select().from(fundingCharges).where(eq(fundingCharges.orderId, current.id));
      const subtotal = Math.round(Number(current.quantity) * current.unitFeeCents);
      let base = 0, stageKey: string = data.stage;
      const today = new Date().toISOString().slice(0, 10);
      if (data.stage === "success") {
        if (!service.application || !current.percentageFeePermitted || !(current.draftProvidedAt || current.deliveredAt)) throw new FundingError(409, "A covered, materially supported application and permitted success fee are required.");
        if (!data.confirmQualifyingReceipt || !data.qualifyingFundsCents || !data.receiptReference || !data.evidenceReference || !data.receivedDate) throw new FundingError(400, "Record the actual qualifying funds, received date, unique receipt reference and disbursement evidence.");
        if (data.receivedDate > today || data.receivedDate < current.approvedAt.toISOString().slice(0, 10)) throw new FundingError(400, "Funds must actually have been received after this order was authorized, not merely approved.");
        base = Math.round(data.qualifyingFundsCents * 6 / 100);
        stageKey = `success:${data.receiptReference}`;
      } else if (data.stage === "hourly") {
        if (service.timing !== "hourly" || !data.hours || !Number.isInteger(data.hours * 4) || !data.period || !data.evidenceReference) throw new FundingError(400, "Enter approved work in 15-minute increments, a billing month and work evidence.");
        if (data.period > today.slice(0, 7) || data.period < current.approvedAt.toISOString().slice(0, 7)) throw new FundingError(400, "The billing month must cover work already performed after authorization.");
        if (data.period > latestFundingBillingMonth()) throw new FundingError(409, "Hourly support is invoiced at month-end, for actual completed work only.");
        base = Math.round(data.hours * current.unitFeeCents);
        const priorHours = past.reduce((sum, c) => sum + Number(c.hours || 0), 0);
        if (priorHours + data.hours > Number(current.quantity) || past.reduce((sum, c) => sum + c.baseAmountCents, 0) + base > current.budgetCapCents) throw new FundingError(409, "This request would exceed the approved hours or budget cap. Obtain a new written authorization.");
        stageKey = `hourly:${data.period}`;
      } else if (data.stage === "delivery") {
        if (service.timing !== "delivery" || !current.deliveredAt || !current.deliveryReference) throw new FundingError(409, "Research/readiness is invoiced only when the authorized written summaries or checklist have been delivered.");
        base = current.serviceKey === "research" ? (current.deliveredQuantity || 0) * current.unitFeeCents : subtotal;
      } else {
        if (service.timing !== "split") throw new FundingError(400, "This service uses a different payment schedule.");
        if (data.stage === "draft" && !current.draftProvidedAt) throw new FundingError(409, "Record the actual draft delivery before requesting the remaining 50%.");
        if (data.stage === "draft" && !past.some((c) => c.stageKey === "authorization")) throw new FundingError(409, "Request the authorization instalment first.");
        base = data.stage === "authorization" ? Math.ceil(subtotal / 2) : subtotal - Math.ceil(subtotal / 2);
      }
      if (base < 1 || past.some((c) => c.stageKey === stageKey)) throw new FundingError(409, "This payment stage has already been requested or has no billable amount.");
      if (data.stage !== "success" && base > current.budgetCapCents) throw new FundingError(409, "This amount exceeds the approved cap.");
      const totals = withTax(base, current.hstBps);
      const due = new Date(`${today}T12:00:00.000Z`);
      due.setUTCDate(due.getUTCDate() + 15);
      const description = `${service.name} | ${current.scopeKey} | ${stageKey}. Fee ${money(base)} + HST ${current.hstBps / 100}% ${money(totals.tax)}.${data.stage === "success" ? ` 6% of qualifying funds actually received: ${money(data.qualifyingFundsCents!)} on ${data.receivedDate}. Receipt ${data.receiptReference}.` : ""}`;
      const [invoice] = await tx.insert(invoices).values({
        engagementId: engagement.id, invoiceNumber: `GF-${current.id}-${randomUUID().slice(0, 8).toUpperCase()}`,
        issueDate: today, dueDate: due.toISOString().slice(0, 10), amount: money(totals.total),
        amountCents: totals.total, currency: "cad", status: "unpaid", description, paymentType: "one_time",
      }).returning();
      const [charge] = await tx.insert(fundingCharges).values({
        orderId: current.id, engagementId: engagement.id, clientUserId: engagement.clientUserId!,
        invoiceId: invoice.id, stageKey, baseAmountCents: base, hstAmountCents: totals.tax,
        hours: data.stage === "hourly" ? String(data.hours) : null,
        qualifyingFundsCents: data.stage === "success" ? data.qualifyingFundsCents : null,
        receiptReference: data.stage === "success" ? data.receiptReference : null,
        receivedDate: data.stage === "success" ? data.receivedDate : null,
        evidenceReference: data.evidenceReference || null,
      }).returning();
      return { invoice, charge };
    });
    res.status(201).json(result);
  }));
}
