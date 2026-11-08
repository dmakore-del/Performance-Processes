/**
 * DEVELOPMENT ONLY. Tests isolated enquiries without delivering email or booking meetings.
 * Test leads are removed in finally.
 */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { pool } from "../server/db";
import { inquirySchema, attributionSchema } from "../shared/acquisition";
import { confirmAcquisitionBooking, cancelAcquisitionBooking } from "../server/acquisition";
import { bookingHref } from "../client/src/lib/acquisition";

if (process.env.NODE_ENV === "production") throw new Error("Development-only check");
const base = `https://${process.env.REPLIT_DEV_DOMAIN}`;
const email = `acquisition-${randomUUID()}@example.invalid`;
const requestId = randomUUID();
const input = { requestId, fullName: "Enquiry Test", email, customerType: "launch", businessStage: "idea",
  serviceInterest: "Complete Business Launch", projectDescription: "An isolated launch enquiry for automated verification.",
  firstTouch: { source: "search", campaign: "launch-check" }, latestTouch: { source: "direct" } };
let checks = 0;
async function request(method: string, path: string, body: unknown, expected: number) {
  const response = await fetch(`${base}${path}`, { method, headers: { "Content-Type": "application/json", Origin: base }, ...(body ? { body: JSON.stringify(body) } : {}) });
  const result = await response.json();
  assert.equal(response.status, expected, `${method} ${path}: ${JSON.stringify(result)}`); checks++;
  return result;
}
try {
  assert.equal(inquirySchema.parse(input).marketingConsent, false); checks++;
  assert.equal(inquirySchema.safeParse({ ...input, contactMethod: "phone" }).success, false); checks++;
  assert.equal(attributionSchema.safeParse({ source: "person@example.com" }).success, false); checks++;
  assert.equal(new URLSearchParams(bookingHref("growth", "website-digital-presence").split("?")[1]).get("service"), "Website & Digital Presence"); checks++;
  await request("GET", "/api/health", null, 200);
  await request("POST", "/api/leads", { ...input, email: "invalid" }, 400);
  await request("POST", "/api/leads", { ...input, marketingConsent: "yes" }, 400);
  const saved = await request("POST", "/api/leads", input, 201);
  assert.equal(saved.bookingConfirmed, false); checks++;
  await request("POST", "/api/leads", { ...input, latestTouch: { source: "social" }, marketingConsent: true }, 200);
  await request("POST", "/api/leads", { ...input, requestId: randomUUID() }, 200);
  let rows = await pool.query("SELECT * FROM leads WHERE contact_email=$1", [email]);
  assert.equal(rows.rowCount, 1); assert.equal(rows.rows[0].status, "new");
  assert.equal(rows.rows[0].acquisition.marketingConsent, false);
  assert.equal(rows.rows[0].acquisition.firstTouch.source, "search");
  assert.equal(rows.rows[0].acquisition.notificationStatus, "pending"); checks += 5;
  const event = { email, eventId: randomUUID(), createdAt: new Date(Date.now() + 1000).toISOString(), meetingAt: new Date(Date.now() + 86_400_000) };
  await confirmAcquisitionBooking(event);
  await confirmAcquisitionBooking(event);
  rows = await pool.query("SELECT * FROM leads WHERE contact_email=$1", [email]);
  assert.equal(rows.rows[0].status, "meeting_booked");
  assert.equal(rows.rows[0].acquisition.bookingStatus, "confirmed"); checks += 2;
  await cancelAcquisitionBooking(event.eventId);
  rows = await pool.query("SELECT * FROM leads WHERE contact_email=$1", [email]);
  assert.equal(rows.rows[0].status, "contacted");
  assert.equal(rows.rows[0].acquisition.bookingStatus, "cancelled"); checks += 2;
  await request("GET", "/api/admin/acquisition-summary", null, 401);
  const rejected = await fetch(`${base}/api/leads`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://untrusted.invalid" }, body: JSON.stringify(input) });
  assert.equal(rejected.status, 403); checks++;
  for (const path of ["/grow-your-business", "/our-work", "/resources", "/book-consultation", "/resources/startup-checklist", "/resources/business-readiness", "/resources/grants-financing-readiness", "/resources/business-launch-checklist.html", "/resources/digital-readiness-checklist.html"]) {
    const response = await fetch(`${base}${path}`); assert.equal(response.status, 200, path); checks++;
    if (path.endsWith(".html")) assert.match(await response.text(), /href="\/resources\//);
  }
  console.log(`Acquisition checks passed: ${checks}. No email or calendar event was created.`);
} finally {
  await pool.query("DELETE FROM leads WHERE contact_email=$1", [email]);
  await pool.end();
}
