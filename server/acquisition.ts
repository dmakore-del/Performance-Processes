import type { Express } from "express";
import { createHash } from "node:crypto";
import nodemailer from "nodemailer";
import { pool } from "./db";
import { requireAdmin } from "./auth";
import { BOOKING_URL, inquirySchema, type AcquisitionDetails } from "@shared/acquisition";

const attempts = new Map<string, { count: number; resetAt: number }>();
export function registerAcquisitionRoutes(app: Express) {
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.post("/api/leads", async (req, res) => {
    if (req.headers.origin && req.headers.origin !== `${req.protocol}://${req.get("host")}`) return res.status(403).json({ message: "Use the website form to submit your enquiry." });
    const ip = req.ip || "unknown";
    const now = Date.now();
    attempts.forEach((value, key) => { if (value.resetAt < now) attempts.delete(key); });
    const bucket = attempts.get(ip) || { count: 0, resetAt: now + 15 * 60_000 };
    bucket.count++; attempts.set(ip, bucket);
    if (bucket.count > 12) return res.status(429).json({ message: "Too many enquiries. Please try again in 15 minutes." });
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0]?.message || "Check your details." });
    const data = parsed.data;
    if (data.website) return res.status(202).json({ received: true, bookingConfirmed: false, schedulingUrl: BOOKING_URL });
    const connection = await pool.connect();
    try {
      await connection.query("BEGIN");
      const fingerprint = createHash("sha256").update([data.email, data.customerType, data.serviceInterest, data.projectDescription].join("|")).digest("hex");
      await connection.query("SELECT pg_advisory_xact_lock(hashtext($1))", [fingerprint]);
      const existing = await connection.query(
        `SELECT id,acquisition FROM leads WHERE inquiry_request_id=$1 OR
         (lower(contact_email)=$2 AND acquisition->>'customerType'=$3 AND service_interest=$4
          AND acquisition->>'projectDescription'=$5 AND created_at>now()-interval '24 hours')
         ORDER BY created_at DESC LIMIT 1`,
        [data.requestId, data.email, data.customerType, data.serviceInterest, data.projectDescription],
      );
      if (!existing.rowCount) {
        const acquisition: AcquisitionDetails = {
          customerType: data.customerType, businessStage: data.businessStage, serviceInterest: data.serviceInterest,
          projectDescription: data.projectDescription, contactMethod: data.contactMethod,
          marketingConsent: data.marketingConsent, analyticsConsent: data.analyticsConsent, language: data.language,
          firstTouch: data.firstTouch, latestTouch: data.latestTouch, consentVersion: "consultation-2026-11",
          receivedAt: new Date().toISOString(), notificationStatus: "pending",
        };
        await connection.query(
          `INSERT INTO leads (company_name,contact_name,contact_email,contact_phone,source,status,service_interest,notes,inquiry_request_id,acquisition)
           VALUES ($1,$2,$3,$4,$5,'new',$6,$7,$8,$9::jsonb)`,
          [data.businessName || data.fullName, data.fullName, data.email, data.phone,
            data.firstTouch.source || "website", data.serviceInterest, data.projectDescription, data.requestId, JSON.stringify(acquisition)],
        );
      } else {
        // Original attribution, message and consent remain immutable on duplicate/retry requests.
        await connection.query(`UPDATE leads SET acquisition=jsonb_set(acquisition,'{latestTouch}',$2::jsonb) WHERE id=$1`,
          [existing.rows[0].id, JSON.stringify(data.latestTouch)]);
      }
      await connection.query("COMMIT");
      res.status(existing.rowCount ? 200 : 201).json({ received: true, bookingConfirmed: false, schedulingUrl: BOOKING_URL });
    } catch {
      await connection.query("ROLLBACK");
      res.status(503).json({ message: "Your enquiry could not be saved. Please retry; no booking has been made." });
    } finally { connection.release(); }
  });
  app.get("/api/admin/acquisition-summary", requireAdmin, async (_req, res) => {
    try {
      const result = await pool.query(`SELECT acquisition->>'customerType' AS journey, source,
        count(*)::int AS enquiries, count(*) FILTER(WHERE acquisition->>'bookingStatus'='confirmed')::int AS booked,
        count(*) FILTER(WHERE status='proposal')::int AS proposals,
        count(*) FILTER(WHERE status='won')::int AS won,
        count(*) FILTER(WHERE acquisition->>'notificationStatus'='pending')::int AS pending_notifications
        FROM leads WHERE acquisition IS NOT NULL GROUP BY 1,2 ORDER BY 1,2`);
      res.json(result.rows);
    } catch { res.status(503).json({ message: "Unable to load acquisition reporting." }); }
  });
}

/** Called only from authenticated Microsoft Graph scans, never a browser booking button. */
export async function confirmAcquisitionBooking(input: { email: string; eventId: string; createdAt: string; meetingAt: Date }) {
  await pool.query(
    `UPDATE leads SET status=CASE WHEN status IN ('new','contacted','qualified') THEN 'meeting_booked' ELSE status END,
      acquisition=acquisition || jsonb_build_object('bookingId',$2::text,'bookedAt',now()::text,'meetingAt',$4::text,'bookingStatus','confirmed')
      WHERE id=(SELECT id FROM leads WHERE lower(contact_email)=$1 AND acquisition IS NOT NULL
        AND created_at<=$3::timestamptz AND created_at>=$3::timestamptz-interval '30 days'
        AND (acquisition->>'bookingId' IS NULL OR acquisition->>'bookingId'=$2) ORDER BY created_at DESC LIMIT 1)
      AND (acquisition->>'bookingId' IS DISTINCT FROM $2 OR acquisition->>'meetingAt' IS DISTINCT FROM $4
        OR acquisition->>'bookingStatus' IS DISTINCT FROM 'confirmed')`,
    [input.email.toLowerCase(), input.eventId, input.createdAt, input.meetingAt.toISOString()],
  );
}

export async function cancelAcquisitionBooking(eventId: string) {
  await pool.query(`UPDATE leads SET status=CASE WHEN status='meeting_booked' THEN 'contacted' ELSE status END,
    acquisition=acquisition || '{"bookingStatus":"cancelled"}'::jsonb
    WHERE acquisition->>'bookingId'=$1 AND acquisition->>'bookingStatus'='confirmed'`, [eventId]);
}

/** Durable per-recipient flags avoid losing enquiries during SMTP outages. */
export function startAcquisitionNotifications() {
  let running = false;
  const deliver = async () => {
    if (running) return;
    running = true;
    try {
      const jobs = await pool.query(`UPDATE leads SET acquisition=acquisition ||
        jsonb_build_object('nextMailAttemptAt',(now()+interval '5 minutes')::text)
        WHERE id IN (SELECT id FROM leads WHERE acquisition->>'notificationStatus'='pending'
          AND coalesce((acquisition->>'nextMailAttemptAt')::timestamptz,'epoch')<=now()
          ORDER BY created_at LIMIT 10 FOR UPDATE SKIP LOCKED) RETURNING *`);
      if (!jobs.rowCount) return;
      const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASS: pass, SMTP_FROM_EMAIL: from } = process.env;
      if (!host || !user || !pass || !from) throw new Error("Transactional email is not configured.");
      const port = Number(process.env.SMTP_PORT || 587);
      const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
      for (const lead of jobs.rows) {
        const a = lead.acquisition as AcquisitionDetails;
        try {
          if (!a.adminNotified) {
            await transport.sendMail({ from, to: "contact@performanceprocesses.com", replyTo: lead.contact_email,
              subject: `New ${a.customerType === "launch" ? "business launch" : "business growth"} enquiry`,
              text: `${lead.contact_name}\n${lead.contact_email}\n${lead.contact_phone || ""}\nBusiness: ${lead.company_name}\nStage: ${a.businessStage}\nService: ${lead.service_interest}\nPreferred contact: ${a.contactMethod}\nMarketing consent: ${a.marketingConsent ? "Yes" : "No"}\nSource: ${lead.source}\n\n${a.projectDescription}\n\nEnquiry saved. A meeting is NOT confirmed until Outlook verifies a booking.` });
            await pool.query(`UPDATE leads SET acquisition=acquisition || '{"adminNotified":true}'::jsonb WHERE id=$1`, [lead.id]);
          }
          if (!a.clientNotified) {
            const fr = a.language === "fr";
            await transport.sendMail({ from, to: lead.contact_email,
              subject: fr ? "Votre demande de consultation a été reçue" : "Your consultation enquiry has been received",
              text: fr
                ? `Bonjour ${lead.contact_name},\n\nVotre demande pour ${lead.service_interest} a été enregistrée. Choisissez un horaire dans notre calendrier :\n${BOOKING_URL}\n\nCeci n’est pas une confirmation de rendez-vous. Outlook vous enverra la confirmation et l’invitation après votre réservation.\n\nPerformance Processes\ncontact@performanceprocesses.com`
                : `Hello ${lead.contact_name},\n\nYour enquiry about ${lead.service_interest} has been saved. Select an available appointment in our calendar:\n${BOOKING_URL}\n\nThis is not an appointment confirmation. Outlook will send your meeting confirmation and calendar invitation after you book.\n\nPerformance Processes\ncontact@performanceprocesses.com` });
            await pool.query(`UPDATE leads SET acquisition=acquisition || '{"clientNotified":true}'::jsonb WHERE id=$1`, [lead.id]);
          }
          await pool.query(`UPDATE leads SET acquisition=acquisition || '{"notificationStatus":"sent"}'::jsonb WHERE id=$1`, [lead.id]);
        } catch {
          await pool.query(`UPDATE leads SET acquisition=acquisition || jsonb_build_object('mailAttempts',coalesce((acquisition->>'mailAttempts')::int,0)+1) WHERE id=$1`, [lead.id]);
          console.error("An enquiry notification is queued for retry.");
        }
      }
    } catch { console.error("Enquiry mail delivery unavailable; saved enquiries remain queued."); }
    finally { running = false; }
  };
  // Development never emails test enquiries; production drains the same persisted queue.
  if (process.env.NODE_ENV !== "production") return;
  void deliver();
  const timer = setInterval(deliver, 60_000); timer.unref();
}
