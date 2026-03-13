import { db } from './db';
import { scheduledEmails } from '@shared/schema';
import { eq, lte, and } from 'drizzle-orm';
import {
  sendNurtureEmail2,
  sendNurtureEmail3,
  sendNurtureEmail4,
} from './leadNurtureEmails';

const EMAIL_HANDLERS: Record<string, (email: string, name: string) => Promise<void>> = {
  'nurture-2': sendNurtureEmail2,
  'nurture-3': sendNurtureEmail3,
  'nurture-4': sendNurtureEmail4,
};

async function processScheduledEmails(): Promise<void> {
  try {
    const now = new Date();
    const pendingEmails = await db
      .select()
      .from(scheduledEmails)
      .where(and(eq(scheduledEmails.status, 'pending'), lte(scheduledEmails.sendAt, now)));

    for (const email of pendingEmails) {
      try {
        const handler = EMAIL_HANDLERS[email.emailType];
        if (handler) {
          await handler(email.recipientEmail, email.recipientName);
          await db
            .update(scheduledEmails)
            .set({ status: 'sent', sentAt: new Date() })
            .where(eq(scheduledEmails.id, email.id));
          console.log(`Scheduled email sent: ${email.emailType} to ${email.recipientEmail}`);
        } else {
          console.error(`Unknown email type: ${email.emailType}`);
          await db
            .update(scheduledEmails)
            .set({ status: 'failed' })
            .where(eq(scheduledEmails.id, email.id));
        }
      } catch (err: any) {
        console.error(`Failed to send scheduled email ${email.id}:`, err?.message || err);
        await db
          .update(scheduledEmails)
          .set({ status: 'failed' })
          .where(eq(scheduledEmails.id, email.id));
      }
    }
  } catch (err: any) {
    console.error('Email scheduler error:', err?.message || err);
  }
}

export function scheduleNurtureSequence(recipientEmail: string, recipientName: string): void {
  const now = new Date();

  const emails = [
    { type: 'nurture-2', step: 2, subject: 'Why many professionals struggle with processes', daysDelay: 2 },
    { type: 'nurture-3', step: 3, subject: 'The hidden cost of inefficient processes', daysDelay: 4 },
    { type: 'nurture-4', step: 4, subject: 'What we will review in your free audit', daysDelay: 6 },
  ];

  for (const e of emails) {
    const sendAt = new Date(now.getTime() + e.daysDelay * 24 * 60 * 60 * 1000);
    db.insert(scheduledEmails)
      .values({
        recipientEmail,
        recipientName,
        emailType: e.type,
        sequenceStep: e.step,
        subject: e.subject,
        status: 'pending',
        sendAt,
      })
      .catch((err) => console.error(`Failed to schedule ${e.type}:`, err));
  }

  console.log(`Nurture sequence scheduled for ${recipientEmail}: 3 emails over 6 days`);
}

let schedulerInterval: ReturnType<typeof setInterval> | null = null;

export function startEmailScheduler(): void {
  if (schedulerInterval) return;
  schedulerInterval = setInterval(processScheduledEmails, 5 * 60 * 1000);
  processScheduledEmails();
  console.log('Email scheduler started (checks every 5 minutes)');
}

export function stopEmailScheduler(): void {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
}
