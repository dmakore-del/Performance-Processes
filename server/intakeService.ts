import type { Express } from "express";
import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { pool } from "./db";
import { intakeSchema, type IntakeInput } from "@shared/intake";
import { sendIntakeInvitation, sendIntakeSubmission } from "./intakeEmails";
import { requireAdmin } from "./auth";

const INBOX = "contact@performanceprocesses.com";
const formAttempts = new Map<string, number[]>();
const rateWindow = 60 * 60 * 1000;

function sameOrigin(req: import("express").Request) {
  const origin = req.get("origin");
  if (!origin) return true;
  try {
    const supplied = new URL(origin);
    const current = new URL(`${req.protocol}://${req.get("host")}`);
    return supplied.origin === current.origin;
  } catch {
    return false;
  }
}

export async function ensureIntakeStorage() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS intake_invitations (
      id varchar PRIMARY KEY,
      outlook_event_id text NOT NULL,
      attendee_email text NOT NULL,
      attendee_name text NOT NULL DEFAULT '',
      organization text NOT NULL DEFAULT '',
      call_at timestamptz NOT NULL,
      expires_at timestamptz NOT NULL,
      completed_at timestamptz,
      mail_status text NOT NULL DEFAULT 'pending',
      attempts integer NOT NULL DEFAULT 0,
      next_attempt_at timestamptz NOT NULL DEFAULT now(),
      last_error text,
      created_at timestamptz NOT NULL DEFAULT now(),
      UNIQUE(outlook_event_id, attendee_email)
    );
    CREATE INDEX IF NOT EXISTS intake_invitation_retry_idx
      ON intake_invitations(mail_status, next_attempt_at);
    CREATE TABLE IF NOT EXISTS intake_submissions (
      id varchar PRIMARY KEY,
      request_id varchar NOT NULL UNIQUE,
      invitation_id varchar UNIQUE,
      kind text NOT NULL,
      language text NOT NULL,
      name text NOT NULL,
      email text NOT NULL,
      organization text NOT NULL,
      phone text NOT NULL DEFAULT '',
      answers jsonb NOT NULL,
      mail_status text NOT NULL DEFAULT 'pending',
      attempts integer NOT NULL DEFAULT 0,
      next_attempt_at timestamptz NOT NULL DEFAULT now(),
      last_error text,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS intake_submission_retry_idx
      ON intake_submissions(mail_status, next_attempt_at);
    CREATE TABLE IF NOT EXISTS intake_automation_state (
      key text PRIMARY KEY, value text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
    );
  `);
}

function makeToken(id: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured");
  const signature = createHmac("sha256", secret).update(`discovery-intake:${id}`).digest("base64url");
  return `${id}.${signature}`;
}

function tokenId(token: unknown): string | null {
  if (typeof token !== "string") return null;
  const [id, signature, extra] = token.split(".");
  if (!id || !signature || extra || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const expected = makeToken(id).split(".")[1];
  const actualBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expected);
  if (actualBytes.length !== expectedBytes.length || !timingSafeEqual(actualBytes, expectedBytes)) return null;
  return id;
}

function tooManyRequests(ip: string) {
  const now = Date.now();
  const recent = (formAttempts.get(ip) || []).filter((time) => now - time < rateWindow);
  if (recent.length >= 5) {
    formAttempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  formAttempts.set(ip, recent);
  if (formAttempts.size > 10000) {
    formAttempts.forEach((times, key) => {
      if (!times.some((time: number) => now - time < rateWindow)) formAttempts.delete(key);
    });
  }
  return false;
}

function nextRetry(attempts: number) {
  const delay = Math.min(6 * 60 * 60 * 1000, 5 * 60 * 1000 * 2 ** Math.min(attempts, 6));
  return new Date(Date.now() + delay);
}

async function sendQueuedMail() {
  const invites = await pool.query(
    `SELECT * FROM intake_invitations WHERE mail_status='pending' AND next_attempt_at<=now() AND expires_at>now() ORDER BY created_at LIMIT 10`
  );
  for (const row of invites.rows) {
    const claimed = await pool.query(
      `UPDATE intake_invitations SET mail_status='sending', attempts=attempts+1 WHERE id=$1 AND mail_status='pending' RETURNING *`,
      [row.id],
    );
    if (!claimed.rowCount) continue;
    const invitation = claimed.rows[0];
    try {
      await sendIntakeInvitation({
        id: invitation.id, email: invitation.attendee_email, name: invitation.attendee_name,
        organization: invitation.organization, callAt: invitation.call_at, token: makeToken(invitation.id),
      });
      await pool.query(`UPDATE intake_invitations SET mail_status='sent',last_error=NULL WHERE id=$1`, [invitation.id]);
    } catch (error: any) {
      const failed = invitation.attempts >= 10;
      await pool.query(
        `UPDATE intake_invitations SET mail_status=$2, next_attempt_at=$3, last_error=$4 WHERE id=$1`,
        [invitation.id, failed ? "failed" : "pending", nextRetry(invitation.attempts), String(error?.code || "delivery_failed").slice(0, 100)],
      );
      console.error("Discovery intake invitation email queued for retry.");
    }
  }

  const submissions = await pool.query(
    `SELECT * FROM intake_submissions WHERE mail_status='pending' AND next_attempt_at<=now() ORDER BY created_at LIMIT 10`
  );
  for (const row of submissions.rows) {
    const claimed = await pool.query(
      `UPDATE intake_submissions SET mail_status='sending', attempts=attempts+1 WHERE id=$1 AND mail_status='pending' RETURNING *`,
      [row.id],
    );
    if (!claimed.rowCount) continue;
    const submission = claimed.rows[0];
    try {
      const input = intakeSchema.parse({
        kind: submission.kind, language: submission.language, name: submission.name,
        email: submission.email, organization: submission.organization, phone: submission.phone,
        answers: submission.answers, consent: true, requestId: submission.request_id,
      });
      await sendIntakeSubmission(input);
      await pool.query(`UPDATE intake_submissions SET mail_status='sent',last_error=NULL WHERE id=$1`, [row.id]);
    } catch (error: any) {
      const failed = submission.attempts >= 10;
      await pool.query(
        `UPDATE intake_submissions SET mail_status=$2, next_attempt_at=$3, last_error=$4 WHERE id=$1`,
        [row.id, failed ? "failed" : "pending", nextRetry(submission.attempts), String(error?.code || "delivery_failed").slice(0, 100)],
      );
      console.error("Intake submission email queued for retry.");
    }
  }
  await pool.query(`DELETE FROM intake_submissions WHERE mail_status='sent' AND created_at < now() - interval '90 days'`);
  await pool.query(`DELETE FROM intake_invitations WHERE created_at < now() - interval '120 days'`);
}

export function registerIntakeRoutes(app: Express) {
  app.post("/api/intake/context", async (req, res) => {
    try {
      const id = tokenId(req.body?.token);
      if (!id) return res.status(400).json({ message: "This invitation link is invalid." });
      const result = await pool.query(
        `SELECT id,attendee_name,attendee_email,organization,call_at,expires_at,completed_at
         FROM intake_invitations WHERE id=$1`, [id],
      );
      const invitation = result.rows[0];
      if (!invitation || invitation.expires_at <= new Date()) return res.status(410).json({ message: "This preparation link has expired. Please contact us for help." });
      if (invitation.completed_at) return res.status(409).json({ message: "This preparation form has already been submitted." });
      return res.json({
        kind: "discovery", name: invitation.attendee_name, email: invitation.attendee_email,
        organization: invitation.organization, callAt: invitation.call_at,
      });
    } catch {
      return res.status(500).json({ message: "Unable to load this preparation form." });
    }
  });

  app.post("/api/intake/submit", async (req, res) => {
    if (typeof req.body?.website === "string" && req.body.website.trim()) return res.status(201).json({ received: true });
    if (tooManyRequests(req.ip || req.socket.remoteAddress || "unknown")) {
      return res.status(429).json({ message: "Too many submissions. Please wait before trying again." });
    }
    const parsed = intakeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Please check the required fields and try again.", errors: parsed.error.flatten() });
    const input: IntakeInput = parsed.data;
    const token = req.body.invitationToken;
    let invitation: any;
    if (token) {
      const id = tokenId(token);
      if (!id) return res.status(400).json({ message: "This invitation link is invalid." });
      const found = await pool.query(`SELECT * FROM intake_invitations WHERE id=$1`, [id]);
      invitation = found.rows[0];
      if (!invitation || invitation.expires_at <= new Date()) return res.status(410).json({ message: "This invitation link has expired or was already submitted." });
      if (invitation.completed_at) return res.status(409).json({ message: "This preparation form has already been submitted." });
      if (input.kind !== "discovery" || input.email.toLowerCase() !== invitation.attendee_email) return res.status(400).json({ message: "The form does not match this discovery invitation." });
    }

    const id = randomUUID();
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      if (invitation) {
        const locked = await client.query(`SELECT * FROM intake_invitations WHERE id=$1 FOR UPDATE`, [invitation.id]);
        if (!locked.rows[0] || locked.rows[0].completed_at || locked.rows[0].expires_at <= new Date()) {
          await client.query("ROLLBACK");
          return res.status(409).json({ message: "This invitation has already been submitted or has expired." });
        }
      }
      const inserted = await client.query(
        `INSERT INTO intake_submissions
         (id,request_id,invitation_id,kind,language,name,email,organization,phone,answers)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb)
         ON CONFLICT (request_id) DO NOTHING RETURNING id`,
        [id,input.requestId,invitation?.id || null,input.kind,input.language,input.name,input.email.toLowerCase(),input.organization,input.phone,JSON.stringify(input.answers)],
      );
      if (!inserted.rowCount) {
        const existing = await client.query(`SELECT email FROM intake_submissions WHERE request_id=$1`, [input.requestId]);
        await client.query("ROLLBACK");
        if (existing.rows[0]?.email !== input.email.toLowerCase()) return res.status(409).json({ message: "This request identifier has already been used." });
        return res.status(200).json({ received: true, emailStatus: "queued" });
      }
      if (invitation) await client.query(`UPDATE intake_invitations SET completed_at=now() WHERE id=$1`, [invitation.id]);
      await client.query("COMMIT");
    } catch (error: any) {
      await client.query("ROLLBACK");
      if (error?.code === "23505") return res.status(409).json({ message: "This discovery form has already been submitted." });
      console.error("Intake form database save failed.");
      return res.status(500).json({ message: "We could not save your form. Please try again." });
    } finally {
      client.release();
    }
    await sendQueuedMail();
    const status = await pool.query(`SELECT mail_status FROM intake_submissions WHERE id=$1`, [id]);
    return res.status(201).json({
      received: true,
      emailStatus: status.rows[0]?.mail_status === "sent" ? "sent" : "queued",
      message: status.rows[0]?.mail_status === "sent"
        ? "Your form was sent to our team."
        : `Your form is saved and queued for delivery. If you need an immediate response, email ${INBOX}.`,
    });
  });

  app.get("/api/admin/intake-submissions", requireAdmin, async (_req, res) => {
    try {
      const result = await pool.query(`SELECT id,kind,language,name,email,organization,answers,mail_status,created_at FROM intake_submissions ORDER BY created_at DESC LIMIT 200`);
      return res.json(result.rows);
    } catch {
      return res.status(500).json({ message: "Unable to load intake records." });
    }
  });

  app.post("/api/admin/intake-submissions/:id/retry", requireAdmin, async (req, res) => {
    await pool.query(
      `UPDATE intake_submissions SET mail_status='pending',next_attempt_at=now() WHERE id=$1 AND mail_status='pending'`,
      [req.params.id],
    );
    await sendQueuedMail();
    return res.json({ received: true });
  });
}

export function startIntakeMailQueue() {
  let busy = false;
  const run = async () => {
    if (busy) return;
    busy = true;
    try { await sendQueuedMail(); }
    catch { console.error("Intake email queue check failed; it will retry."); }
    finally { busy = false; }
  };
  void run();
  const timer = setInterval(run, 60_000);
  timer.unref();
}

export async function insertDiscoveryInvitation(input: {
  outlookEventId: string; email: string; name: string; callAt: Date;
}) {
  const id = randomUUID();
  const expiresAt = new Date(input.callAt.getTime() + 30 * 24 * 60 * 60 * 1000);
  await pool.query(
    `INSERT INTO intake_invitations (id,outlook_event_id,attendee_email,attendee_name,organization,call_at,expires_at)
     VALUES ($1,$2,$3,$4,'', $5,$6) ON CONFLICT(outlook_event_id,attendee_email) DO NOTHING`,
    [id,input.outlookEventId,input.email.toLowerCase(),input.name,input.callAt,expiresAt],
  );
}
