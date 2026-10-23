import { test } from "node:test";
import assert from "node:assert/strict";
import { fundingOrderSchema, fundingApprovalSchema, fundingPaymentSchema, latestFundingBillingMonth, withTax } from "../shared/funding";
import { registerSchema } from "../shared/schema";

const grant = {
  serviceKey: "standard-grant", scopeKey: "Program A 2026", scope: "Prepare one application and two consolidated revision rounds.",
  funder: "Example funder", program: "Program A intake", fundingKind: "grant", quantity: "1",
  unitFeeCents: 56000, hstBps: 1300, budgetCapCents: 56000, quoteReference: "Quotation A", percentageFeePermitted: true,
};
test("fixed fees, per-application limits, approved caps and permitted percentage fees are enforced", () => {
  assert.equal(fundingOrderSchema.parse(grant).scopeKey, "program a 2026");
  for (const change of [{ serviceKey: "unknown" }, { unitFeeCents: 1 }, { quantity: "2" }, { percentageFeePermitted: false }, { funder: "" }, { budgetCapCents: 50000 }]) {
    assert.equal(fundingOrderSchema.safeParse({ ...grant, ...change }).success, false);
  }
});
test("hourly caps use quarter hours and conflicting quote rates are never defaulted", () => {
  assert.equal(fundingOrderSchema.safeParse({ ...grant, serviceKey: "hourly-support", quantity: "1.25", unitFeeCents: 17500, budgetCapCents: 21875 }).success, true);
  assert.equal(fundingOrderSchema.safeParse({ ...grant, serviceKey: "hourly-support", quantity: "1.1", unitFeeCents: 17500 }).success, false);
  assert.equal(fundingOrderSchema.safeParse({ ...grant, serviceKey: "complex-application", unitFeeCents: undefined }).success, false);
  assert.equal(fundingOrderSchema.safeParse({ ...grant, serviceKey: "business-plan", unitFeeCents: undefined }).success, false);
});
test("HST is computed in cents and written authorization is explicit", () => {
  assert.deepEqual(withTax(28000, 1300), { base: 28000, tax: 3640, total: 31640 });
  assert.equal(fundingApprovalSchema.safeParse({ signerName: "Client", signerTitle: "Owner", legalBusinessName: "Client Ltd", businessAddress: "123 Test Street, Toronto", acceptTerms: false }).success, false);
});
test("invalid calendar dates and reversed service timelines are rejected", () => {
  assert.equal(fundingPaymentSchema.safeParse({ stage: "success", receivedDate: "2026-02-30" }).success, false);
  assert.equal(fundingOrderSchema.safeParse({ ...grant, recordsDue: "2026-11-10", draftDue: "2026-11-01" }).success, false);
});
test("hourly work is billed only at month-end or for a completed month", () => {
  assert.equal(latestFundingBillingMonth(new Date("2026-10-23T12:00:00Z")), "2026-09");
  assert.equal(latestFundingBillingMonth(new Date("2026-10-31T12:00:00Z")), "2026-10");
  assert.equal(latestFundingBillingMonth(new Date("2026-01-01T12:00:00Z")), "2025-12");
});
test("signup collects business context but does not accept invalid service interests or unsafe links", () => {
  const valid = {
    fullName: "Example Client", email: "client@example.invalid", password: "FixtureOnly!983",
    companyName: "Example client", contactPhone: "4165550100", businessLocation: "Toronto, Ontario, Canada",
    businessWebsite: "", industry: "", businessStage: "planning", requestedServices: ["not-sure-yet"], supportGoals: "Help prepare my business for launch.",
  };
  assert.equal(registerSchema.safeParse(valid).success, true);
  for (const change of [{ contactPhone: "" }, { supportGoals: "" }, { requestedServices: [] }, { requestedServices: ["not-sure-yet", "grant-support"] }, { requestedServices: ["invented"] }, { businessWebsite: "javascript:alert(1)" }]) {
    assert.equal(registerSchema.safeParse({ ...valid, ...change }).success, false);
  }
});
