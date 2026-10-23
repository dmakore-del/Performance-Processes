/**
 * Authenticated integration regression check for a running DEVELOPMENT preview.
 * Creates isolated temporary accounts and removes them and their records in finally.
 * Does not send mail, create a checkout, or modify existing client accounts.
 */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { pool } from "../server/db";

if (process.env.NODE_ENV === "production") throw new Error("Development-only test");
if (!process.env.REPLIT_DEV_DOMAIN) throw new Error("REPLIT_DEV_DOMAIN is required");
const base = `https://${process.env.REPLIT_DEV_DOMAIN}`;
const marker = `portal-check-${randomUUID()}`;
const ids: string[] = [];
const password = `Check-${randomUUID()}!`;
const cookies = new Map<string, string>();
let checks = 0;
async function request(role: string | null, method: string, path: string, body?: unknown, expected = 200) {
  const response = await fetch(`${base}${path}`, {
    method, headers: { "Content-Type": "application/json", ...(role ? { Cookie: cookies.get(role)! } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = await response.json();
  assert.equal(response.status, expected, `${method} ${path}: ${JSON.stringify(data)}`);
  checks++;
  return data;
}

try {
  const hash = await bcrypt.hash(password, 10);
  for (const role of ["admin", "staff", "client", "other"]) {
    const id = randomUUID();
    ids.push(id);
    const email = `${marker}-${role}@example.invalid`;
    await pool.query("INSERT INTO users (id,username,email,password,company_name,full_name,role,status) VALUES ($1,$2,$2,$3,$4,$5,$6,'active')", [id, email, hash, `${marker}-${role}`, "Portal Regression", role === "other" ? "client" : role]);
    const response = await fetch(`${base}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    assert.equal(response.status, 200, `fixture login ${role}`);
    const cookie = response.headers.get("set-cookie")?.split(";")[0];
    assert.ok(cookie, `fixture session ${role}`);
    cookies.set(role, cookie);
  }
  const service = await request("admin", "POST", "/api/portal/engagements", {
    clientName: "Must not override the real client", clientUserId: ids[2], assignedStaffId: ids[1],
    engagementType: "Websites & Digital", serviceCategory: "websites-digital",
    startDate: "2026-01-01", currentPhase: "Discovery", status: "active", completionPercent: 0,
  }, 201);
  assert.equal(service.clientName, `${marker}-client`);
  const second = await request("admin", "POST", "/api/portal/engagements", {
    clientName: `${marker}-client`, clientUserId: ids[2], engagementType: "Grant Research & Applications",
    serviceCategory: "grant-support", startDate: "2026-01-01", currentPhase: "Funding readiness assessment",
  }, 201);
  const ownServices = await request("client", "GET", "/api/portal/engagements");
  assert.equal(ownServices.length, 2);
  assert.ok(ownServices.some((s: any) => s.id === second.id));
  await request("other", "GET", `/api/portal/engagements/${service.id}/kpis`, undefined, 403);
  await request(null, "GET", `/api/portal/engagements/${service.id}/invoices`, undefined, 401);
  const plan = await request("admin", "POST", `/api/portal/engagements/${service.id}/service-plan`, {}, 201);
  assert.equal(plan.length, 5);
  await request("admin", "POST", `/api/portal/engagements/${service.id}/service-plan`, {}, 409);
  await request("client", "PATCH", `/api/portal/milestones/${plan[0].id}`, { status: "completed" }, 403);
  await request("staff", "PATCH", `/api/portal/milestones/${plan[0].id}`, { status: "completed" });
  const progress = await request("client", "GET", `/api/portal/engagements/${service.id}`);
  assert.equal(progress.completionPercent, 20);
  const reconciled = await request("admin", "PATCH", `/api/portal/engagements/${service.id}`, { completionPercent: 99 });
  assert.equal(reconciled.completionPercent, 20, "milestone delivery remains the source of completion");
  await request("admin", "PATCH", `/api/portal/engagements/${service.id}`, { serviceCategory: "grant-support" }, 409);
  await request("admin", "PATCH", `/api/portal/engagements/${service.id}`, { clientUserId: ids[3] }, 400);
  await request("admin", "PATCH", `/api/portal/engagements/${service.id}`, { clientUserId: null }, 400);
  const paidInvoice = {
    engagementId: service.id, invoiceNumber: `${marker}-PAID`, issueDate: "2026-01-01", dueDate: "2026-01-31",
    amountCents: 95000, currency: "cad", status: "paid", paidAt: "2026-01-15", description: "Historical website delivery invoice",
  };
  await request("staff", "POST", "/api/portal/invoices", paidInvoice, 400);
  await request("client", "POST", "/api/portal/invoices", paidInvoice, 403);
  await request("admin", "POST", "/api/portal/invoices", { ...paidInvoice, paidAt: null }, 400);
  const savedInvoice = await request("admin", "POST", "/api/portal/invoices", paidInvoice, 201);
  assert.equal(savedInvoice.status, "paid");
  assert.equal(savedInvoice.stripeSessionId, null);
  const ledger = await request("client", "GET", `/api/portal/engagements/${service.id}/invoices`);
  assert.equal(ledger[0].paidAt.slice(0, 10), "2026-01-15");
  const kpi = await request("staff", "POST", "/api/portal/kpis", {
    engagementId: service.id, name: "Website enquiries", baselineValue: "5", currentValue: "12", targetValue: "20",
    unit: "enquiries", direction: "increase", period: "October 2026", outcomeNotes: "Counted from the website enquiry inbox.",
  }, 201);
  await request("staff", "PATCH", `/api/portal/kpis/${kpi.id}`, { currentValue: "18", outcomeNotes: "Updated monthly enquiry count." });
  const reports = await request("client", "GET", `/api/portal/engagements/${service.id}/kpis`);
  assert.equal(reports[0].currentValue, "18");
  assert.equal(reports[0].baselineValue, "5");
  assert.equal(reports[0].unit, "enquiries");
  await request("client", "PATCH", `/api/portal/kpis/${kpi.id}`, { currentValue: "999" }, 403);
  await request("other", "GET", `/api/portal/engagements/${service.id}/invoices`, undefined, 403);
  const unassigned = await request("admin", "PATCH", `/api/portal/engagements/${service.id}`, { assignedStaffId: null });
  assert.equal(unassigned.assignedStaffId, null);
  await request("staff", "GET", `/api/portal/engagements/${service.id}/kpis`, undefined, 403);
  console.log(`Service portal integration passed: ${checks} authenticated API checks, two services, historical payment, delivery progress, KPI edit and account isolation.`);
} finally {
  await pool.query("DELETE FROM user_sessions WHERE sess->>'userId' = ANY($1::text[])", [ids]);
  for (const table of ["performance_kpis", "invoices", "milestones"]) {
    await pool.query(`DELETE FROM ${table} WHERE engagement_id IN (SELECT id FROM engagements WHERE client_user_id = ANY($1::text[]))`, [ids]);
  }
  await pool.query("DELETE FROM engagements WHERE client_user_id = ANY($1::text[])", [ids]);
  await pool.query("DELETE FROM users WHERE id = ANY($1::text[])", [ids]);
  await pool.end();
}
