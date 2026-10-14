import type { Express } from "express";
import { createHmac, timingSafeEqual } from "crypto";
import { pool } from "./db";
import { getUncachableOutlookClient } from "./outlook";
import { insertDiscoveryInvitation } from "./intakeService";

const PUBLIC_ORIGIN = "https://performanceprocesses.com";
const BOOKING_MAILBOX = "performanceprocesses1@performanceprocesses.com";
const AUTOMATION_KEY = "discovery_booking_scan_started_at";

function clientState() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured");
  return createHmac("sha256", secret).update("performance-processes-discovery-booking").digest("base64url");
}

function equalState(value: unknown) {
  if (typeof value !== "string") return false;
  const expected = Buffer.from(clientState());
  const actual = Buffer.from(value);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function isDiscoveryBooking(event: any) {
  const organizer = String(event.organizer?.emailAddress?.address || "").toLowerCase();
  const subject = String(event.subject || "");
  return event.isOrganizer === true
    && !event.isCancelled
    && organizer === BOOKING_MAILBOX
    && /discovery|consultation|strategy conversation/i.test(subject);
}

async function scanBookings() {
  const client = await getUncachableOutlookClient();
  const state = await pool.query(`SELECT value FROM intake_automation_state WHERE key=$1`, [AUTOMATION_KEY]);
  if (!state.rowCount) {
    await pool.query(`INSERT INTO intake_automation_state (key,value) VALUES ($1,$2) ON CONFLICT(key) DO NOTHING`, [AUTOMATION_KEY,new Date().toISOString()]);
    return;
  }
  const startedAt = state.rows[0].value;
  const now = new Date();
  const end = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const events: any[] = [];
  let page: any = await client.api("/me/calendarView").query({
    startDateTime: now.toISOString(),
    endDateTime: end.toISOString(),
    $top: 100,
    $select: "id,subject,start,createdDateTime,isOrganizer,isCancelled,organizer,attendees",
  }).header('Prefer', 'outlook.timezone="UTC"').get();
  for (let pages=0; page && pages<20; pages++) {
    events.push(...(page.value || []));
    if (!page["@odata.nextLink"]) break;
    page = await client.api(page["@odata.nextLink"]).get();
  }

  for (const event of events) {
    if (!isDiscoveryBooking(event) || !event.createdDateTime || new Date(event.createdDateTime) < new Date(startedAt)) continue;
    const start = String(event.start?.dateTime || "");
    const preciseStart = start.replace(/\.(\d{3})\d+(?=Z|[+-]|$)/, ".$1");
    const callAt = new Date(/[zZ]$|[+-]\d\d:\d\d$/.test(preciseStart) ? preciseStart : `${preciseStart}Z`);
    if (!Number.isFinite(callAt.getTime())) continue;
    for (const attendee of event.attendees || []) {
      const email = String(attendee.emailAddress?.address || "").trim().toLowerCase();
      if (!email || !email.includes("@") || email.endsWith("@performanceprocesses.com") || attendee.status?.response === "declined") continue;
      await insertDiscoveryInvitation({
        outlookEventId: event.id,
        email,
        name: String(attendee.emailAddress?.name || "").slice(0,120),
        callAt,
      });
    }
  }
  await pool.query(
    `UPDATE intake_automation_state SET value=$2,updated_at=now() WHERE key=$1`,
    [AUTOMATION_KEY,now.toISOString()],
  );
}

async function maintainSubscription() {
  const client = await getUncachableOutlookClient();
  const notificationUrl = `${PUBLIC_ORIGIN}/api/intake/bookings/notifications`;
  const existing = await client.api("/subscriptions").get();
  const active = (existing.value || []).find((item: any) =>
    item.resource?.toLowerCase() === "me/events"
    && item.notificationUrl === notificationUrl
    && item.clientState === clientState()
  );
  const expirationDateTime = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString();
  if (active?.id) {
    await client.api(`/subscriptions/${active.id}`).patch({ expirationDateTime });
    return;
  }
  await client.api("/subscriptions").post({
    changeType: "created,updated,deleted",
    notificationUrl,
    lifecycleNotificationUrl: notificationUrl,
    resource: "me/events",
    expirationDateTime,
    clientState: clientState(),
  });
}

export function registerBookingNotificationRoute(app: Express) {
  app.post("/api/intake/bookings/notifications", async (req, res) => {
    const challenge = req.query.validationToken;
    if (typeof challenge === "string") return res.status(200).type("text/plain").send(challenge);
    const notifications = [...(req.body?.value || []), ...(req.body?.lifecycleEvent ? [req.body] : [])];
    if (!notifications.length || notifications.some((item: any) => !equalState(item.clientState))) {
      return res.status(401).end();
    }
    res.status(202).end();
    void scanBookings().catch(() => console.error("Outlook booking intake sync failed; scheduled retry will run."));
    if (notifications.some((item: any) => item.lifecycleEvent)) {
      void maintainSubscription().catch(() => console.error("Outlook booking notification renewal failed."));
    }
  });
}

export function startBookingAutomation() {
  if (process.env.NODE_ENV !== "production") return;
  let scanning = false;
  let renewing = false;
  const scan = async () => {
    if (scanning) return;
    scanning = true;
    try { await scanBookings(); }
    catch { console.error("Outlook booking intake sync failed; scheduled retry will run."); }
    finally { scanning = false; }
  };
  const renew = async () => {
    if (renewing) return;
    renewing = true;
    try { await maintainSubscription(); }
    catch { console.error("Outlook booking notification setup or renewal failed; calendar polling remains enabled."); }
    finally { renewing = false; }
  };
  void scan();
  void renew();
  const scanTimer = setInterval(scan, 5 * 60 * 1000);
  const renewalTimer = setInterval(renew, 24 * 60 * 60 * 1000);
  scanTimer.unref();
  renewalTimer.unref();
}
