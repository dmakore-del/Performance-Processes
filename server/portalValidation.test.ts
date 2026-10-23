import test from "node:test";
import assert from "node:assert/strict";
import { invoiceWriteSchema, invoicePatchSchema, invoicePaymentError, invoiceAmount, kpiWriteSchema, kpiPatchSchema } from "./portalValidation";
import { PORTAL_SERVICES, kpiChange } from "@shared/portal-services";

const invoice = { engagementId: 1, invoiceNumber: "PAST-100", issueDate: "2026-01-01", dueDate: "2026-01-10", amountCents: 50000 };

test("historical paid invoice accepts an actual date and computes consistent currency", () => {
  const data = invoiceWriteSchema.parse({ ...invoice, status: "paid", paidAt: "2026-01-03" });
  assert.ok(data.paidAt instanceof Date);
  assert.equal(invoicePaymentError(data, "admin", new Date("2026-02-01")), null);
  assert.equal(invoiceAmount(data.amountCents, data.currency), "$500.00");
});
test("staff cannot record a historical payment, and a paid date is mandatory", () => {
  assert.match(invoicePaymentError({ status: "paid", paidAt: new Date("2026-01-03") }, "staff")!, /administrators/);
  assert.match(invoicePaymentError({ status: "paid" }, "admin")!, /paid date/i);
});
test("invalid invoice dates, amounts and ownership reassignment are rejected or stripped", () => {
  assert.equal(invoiceWriteSchema.safeParse({ ...invoice, amountCents: -1 }).success, false);
  assert.equal(invoiceWriteSchema.safeParse({ ...invoice, issueDate: "2026-02-30" }).success, false);
  assert.match(invoicePaymentError({ status: "paid", issueDate: "2026-01-01", paidAt: new Date("2025-01-01") }, "admin")!, /precede/);
  assert.match(invoicePaymentError({ status: "paid", paidAt: new Date("2028-01-01") }, "admin", new Date("2026-01-01"))!, /future/);
  assert.equal("engagementId" in invoicePatchSchema.parse({ engagementId: 99 }), false);
  assert.equal("stripeSessionId" in invoiceWriteSchema.parse({ ...invoice, stripeSessionId: "invented" }), false);
});
test("each real service offers delivery phases and relevant measurement suggestions", () => {
  assert.equal(new Set(PORTAL_SERVICES.map(service => service.id)).size, PORTAL_SERVICES.length);
  for (const service of PORTAL_SERVICES) {
    assert.ok(service.phases.length >= 3);
    assert.ok(service.kpis.length >= 2);
  }
});
test("KPI values preserve real units, zero baselines and lower-is-better direction", () => {
  const data = kpiWriteSchema.parse({ engagementId: 1, name: "Load time", baselineValue: "5", currentValue: "2", targetValue: "1", unit: "seconds", direction: "decrease", period: "October 2026" });
  assert.equal(data.unit, "seconds");
  assert.deepEqual(kpiChange("5", "2", "decrease"), { difference: -3, improved: true, percent: -60 });
  assert.equal(kpiChange("0", "10", "increase")?.percent, null);
  assert.equal(kpiChange(null, "10", "increase"), null);
  assert.equal(kpiWriteSchema.safeParse({ ...data, currentValue: "not measured" }).success, false);
  assert.equal(kpiPatchSchema.safeParse({ direction: "anything" }).success, false);
  assert.equal("engagementId" in kpiPatchSchema.parse({ engagementId: 99, currentValue: "4" }), false);
});
