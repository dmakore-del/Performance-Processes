import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { pool } from "../server/db";

const origin = `https://${process.env.REPLIT_DEV_DOMAIN}`;
const marker = `funding-check-${randomUUID()}`;
const password = `TestOnly!${randomUUID()}`;
const ids: string[] = [];
const cookies = new Map<string, string>();
let checks = 0;
async function call(who: string, method: string, path: string, body?: unknown, expected = 200) {
  const response = await fetch(origin + path, {
    method, headers: { "Content-Type": "application/json", ...(cookies.has(who) ? { Cookie: cookies.get(who)! } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const cookie = response.headers.get("set-cookie");
  if (cookie) cookies.set(who, cookie.split(";")[0]);
  const result = await response.json();
  assert.equal(response.status, expected, `${who} ${method} ${path}: ${JSON.stringify(result)}`);
  checks++;
  return result;
}
const date = new Date().toISOString().slice(0, 10);
const approval = { signerName: "Fixture Client", signerTitle: "Owner", legalBusinessName: `${marker} Client Inc.`, businessAddress: "123 Test Street, Toronto, Ontario", acceptTerms: true };
const grant = (scopeKey: string) => ({
  serviceKey: "standard-grant", scopeKey, scope: "Prepare a program application, organize supporting documents and provide two consolidated revision rounds.",
  funder: "Fixture funding authority", program: "Fixture program 2026", fundingKind: "grant",
  quantity: "1", unitFeeCents: 56000, hstBps: 1300, budgetCapCents: 56000, quoteReference: "Fixture written quotation", percentageFeePermitted: true,
});
try {
  const hashed = await bcrypt.hash(password, 4);
  for (const role of ["admin", "staff", "other"]) {
    const id = randomUUID(); ids.push(id);
    const email = `${marker}-${role}@example.invalid`;
    await pool.query("INSERT INTO users (id,username,email,password,company_name,full_name,role,status) VALUES ($1,$2,$2,$3,$4,$5,$6,'active')", [id, email, hashed, `${marker}-${role}`, "Fixture account", role === "other" ? "client" : role]);
    await call(role, "POST", "/api/auth/login", { email, password });
  }
  await call("anonymous", "POST", "/api/auth/register", { email: `${marker}@example.invalid`, password, companyName: marker, fullName: "Fixture Client" }, 400);
  const registration = await call("client", "POST", "/api/auth/register", {
    fullName: "Fixture Client", email: `${marker}@example.invalid`, password, companyName: marker,
    contactPhone: "4165550100", businessLocation: "Toronto, Ontario, Canada", businessWebsite: "https://example.invalid",
    industry: "Business services", businessStage: "growing", requestedServices: ["grant-support", "financing-support"],
    supportGoals: "Prepare a funding application for a new business expansion.", role: "admin",
  }, 201);
  const clientId = registration.user.id; ids.push(clientId);
  assert.equal(registration.user.role, "client");
  const userList = await call("admin", "GET", "/api/admin/users");
  const clientProfile = userList.find((u: any) => u.id === clientId);
  assert.equal(clientProfile.contactPhone, "4165550100");
  assert.deepEqual(clientProfile.requestedServices, ["grant-support", "financing-support"]);
  assert.equal("password" in clientProfile, false);
  await call("client", "GET", "/api/admin/users", undefined, 403);
  await call("client", "PATCH", `/api/admin/users/${clientId}/profile`, { industry: "Other" }, 403);
  await call("admin", "PATCH", `/api/admin/users/${clientId}/profile`, { role: "admin" }, 400);
  await call("admin", "PATCH", `/api/admin/users/${clientId}/profile`, { industry: "Updated industry" });
  await call("admin", "PATCH", `/api/admin/users/${ids[0]}/role`, { role: "client" }, 400);
  await call("admin", "PATCH", `/api/admin/users/${ids[0]}/status`, { status: "suspended" }, 400);
  await call("admin", "PATCH", `/api/admin/users/${ids[1]}/role`, { role: "client" });
  await call("admin", "PATCH", `/api/admin/users/${ids[1]}/role`, { role: "staff" });
  await call("admin", "PATCH", `/api/admin/users/${ids[2]}/status`, { status: "suspended" });
  await call("admin", "PATCH", `/api/admin/users/${ids[2]}/status`, { status: "active" });

  const engagement = await call("admin", "POST", "/api/portal/engagements", {
    clientName: marker, clientUserId: clientId, assignedStaffId: ids[1], engagementType: "Grant Research & Applications",
    serviceCategory: "grant-support", startDate: date, currentPhase: "Funding readiness assessment",
  }, 201);
  const ordersUrl = `/api/portal/engagements/${engagement.id}/funding-orders`;
  const order = await call("admin", "POST", ordersUrl, grant("scope-a"), 201);
  await call("admin", "PATCH", `/api/portal/engagements/${engagement.id}`, { serviceCategory: "websites-digital" }, 409);
  await call("staff", "POST", ordersUrl, grant("staff-attempt"), 403);
  await call("client", "POST", ordersUrl, grant("client-attempt"), 403);
  await call("other", "GET", ordersUrl, undefined, 403);
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/request-payment`, { stage: "authorization" }, 409);
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/approve`, approval, 403);
  await call("client", "POST", `/api/portal/funding-orders/${order.id}/approve`, { ...approval, acceptTerms: false }, 400);
  await call("admin", "POST", `/api/auth/impersonate-user/${clientId}`);
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/approve`, approval, 403);
  await call("admin", "POST", "/api/auth/impersonate/stop");
  await call("client", "POST", `/api/portal/funding-orders/${order.id}/approve`, approval);
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/withdraw`, undefined, 409);
  await call("admin", "POST", ordersUrl, { ...grant("scope-a"), serviceKey: "complex-application", unitFeeCents: 120000, budgetCapCents: 120000 }, 409);
  await call("admin", "POST", ordersUrl, { ...grant("scope-a"), serviceKey: "readiness", unitFeeCents: 17500 }, 409);
  const initial = await call("admin", "POST", `/api/portal/funding-orders/${order.id}/request-payment`, { stage: "authorization" }, 201);
  assert.equal(initial.invoice.amountCents, 31640);
  assert.equal(initial.invoice.paymentType, "one_time");
  assert.equal(initial.charge.hstAmountCents, 3640);
  assert.equal((Date.parse(initial.invoice.dueDate) - Date.parse(initial.invoice.issueDate)) / 86400000, 15);
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/request-payment`, { stage: "authorization" }, 409);
  await call("admin", "PATCH", `/api/portal/invoices/${initial.invoice.id}`, { amountCents: 1 }, 409);
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/request-payment`, { stage: "draft" }, 409);
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/delivery`, { type: "draft", reference: "Fixture draft document provided to client." });
  const final = await call("admin", "POST", `/api/portal/funding-orders/${order.id}/request-payment`, { stage: "draft" }, 201);
  assert.equal(final.invoice.amountCents, 31640);
  const success = { stage: "success", qualifyingFundsCents: 5000000, receivedDate: date, receiptReference: "fixture-bank-reference-a", evidenceReference: "Fixture actual disbursement evidence document", confirmQualifyingReceipt: true };
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/request-payment`, { ...success, confirmQualifyingReceipt: false }, 400);
  const successInvoice = await call("admin", "POST", `/api/portal/funding-orders/${order.id}/request-payment`, success, 201);
  assert.equal(successInvoice.invoice.amountCents, 339000);
  await call("admin", "POST", `/api/portal/funding-orders/${order.id}/request-payment`, success, 409);
  const second = await call("admin", "POST", ordersUrl, grant("scope-b"), 201);
  await call("client", "POST", `/api/portal/funding-orders/${second.id}/approve`, approval);
  await call("admin", "POST", `/api/portal/funding-orders/${second.id}/delivery`, { type: "draft", reference: "Fixture second application draft delivered." });
  await call("admin", "POST", `/api/portal/funding-orders/${second.id}/request-payment`, success, 409);
  const duplicates = await Promise.all([1, 2].map(async () => {
    const response = await fetch(`${origin}/api/portal/funding-orders/${second.id}/request-payment`, { method: "POST", headers: { Cookie: cookies.get("admin")!, "Content-Type": "application/json" }, body: JSON.stringify({ stage: "authorization" }) });
    await response.json(); return response.status;
  }));
  assert.deepEqual(duplicates.sort(), [201, 409]); checks += 2;
  const research = await call("admin", "POST", ordersUrl, { ...grant("unrelated-search"), serviceKey: "research", quantity: "2", unitFeeCents: 15000, budgetCapCents: 30000 }, 201);
  await call("client", "POST", `/api/portal/funding-orders/${research.id}/approve`, approval);
  await call("admin", "POST", `/api/portal/funding-orders/${research.id}/request-payment`, { stage: "delivery" }, 409);
  await call("admin", "POST", `/api/portal/funding-orders/${research.id}/delivery`, { type: "delivered", reference: "Fixture written opportunity summaries supplied." }, 400);
  await call("admin", "POST", `/api/portal/funding-orders/${research.id}/delivery`, { type: "delivered", reference: "Fixture one distinct suitable opportunity summary, eligibility and next steps.", actualQuantity: 1, suitableResearchConfirmed: true });
  const researchBill = await call("admin", "POST", `/api/portal/funding-orders/${research.id}/request-payment`, { stage: "delivery" }, 201);
  assert.equal(researchBill.invoice.amountCents, 16950, "Unused search allowance must not be invoiced");
  const hourly = await call("admin", "POST", ordersUrl, { ...grant("hourly-support"), serviceKey: "hourly-support", quantity: "2.5", unitFeeCents: 17500, budgetCapCents: 43750 }, 201);
  await call("client", "POST", `/api/portal/funding-orders/${hourly.id}/approve`, approval);
  const priorMonth = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() - 1, 1)).toISOString();
  // Backdate only this disposable fixture's authorization to exercise completed-month billing.
  await pool.query("UPDATE funding_orders SET approved_at=$1 WHERE id=$2", [priorMonth, hourly.id]);
  const hours = { stage: "hourly", hours: 1.25, period: priorMonth.slice(0, 7), evidenceReference: "Fixture approved support work already performed." };
  await call("admin", "POST", `/api/portal/funding-orders/${hourly.id}/request-payment`, { ...hours, hours: 0.1 }, 400);
  const supportBill = await call("admin", "POST", `/api/portal/funding-orders/${hourly.id}/request-payment`, hours, 201);
  assert.equal(supportBill.invoice.amountCents, 24719);
  await call("admin", "POST", `/api/portal/funding-orders/${hourly.id}/request-payment`, { ...hours, hours: 2 }, 409);
  await call("admin", "POST", `/api/portal/engagements/${engagement.id}/retainer/checkout`, undefined, 400);
  await call("admin", "PATCH", `/api/portal/engagements/${engagement.id}`, { retainerAmountCents: 10000 }, 400);
  await call("admin", "POST", "/api/portal/invoices", { engagementId: engagement.id, invoiceNumber: "BYPASS", issueDate: date, dueDate: date, amountCents: 10000, currency: "cad", status: "unpaid" }, 400);
  const clientOrders = await call("client", "GET", ordersUrl);
  assert.equal(clientOrders.find((o: any) => o.id === order.id).charges.length, 3);
  const clientInvoices = await call("client", "GET", `/api/portal/engagements/${engagement.id}/invoices`);
  assert.equal(clientInvoices.length, 6, "A duplicate receipt must roll back its invoice insert");
  const privateAgreement = await fetch(origin + "/api/portal/funding-agreement", { headers: { Cookie: cookies.get("client")! } });
  assert.equal(privateAgreement.status, 200);
  assert.match(privateAgreement.headers.get("content-type") || "", /application\/pdf/);
  assert.ok((await privateAgreement.arrayBuffer()).byteLength > 10000);
  assert.equal((await fetch(origin + "/api/portal/funding-agreement")).status, 401); checks += 2;
  console.log(`Funding/signup integration passed: ${checks} API checks. No Stripe calls, charges or client emails were made.`);
} finally {
  await pool.query("DELETE FROM user_sessions WHERE sess->>'userId'=ANY($1::text[]) OR sess->>'impersonatorId'=ANY($1::text[])", [ids]);
  await pool.query("DELETE FROM admin_impersonation_audit WHERE admin_user_id=ANY($1::text[]) OR target_user_id=ANY($1::text[])", [ids]);
  await pool.query("DELETE FROM funding_charges WHERE client_user_id=ANY($1::text[])", [ids]);
  await pool.query("DELETE FROM funding_orders WHERE engagement_id IN (SELECT id FROM engagements WHERE client_user_id=ANY($1::text[]))", [ids]);
  for (const table of ["invoices", "milestones", "performance_kpis"]) await pool.query(`DELETE FROM ${table} WHERE engagement_id IN (SELECT id FROM engagements WHERE client_user_id=ANY($1::text[]))`, [ids]);
  await pool.query("DELETE FROM engagements WHERE client_user_id=ANY($1::text[])", [ids]);
  await pool.query("DELETE FROM users WHERE id=ANY($1::text[])", [ids]);
  await pool.end();
}
