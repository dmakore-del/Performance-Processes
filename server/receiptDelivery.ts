import { and, eq, inArray, isNull, lt, or, sql } from "drizzle-orm";
import { paymentReceipts } from "@shared/schema";
import { db } from "./db";
import { sendReceiptEmail } from "./emailService";

const CLAIM_TIMEOUT_MS = 10 * 60 * 1000;

function formattedAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}

export async function attemptReceiptDelivery(receiptId: number): Promise<"sent" | "failed" | "skipped"> {
  const now = new Date();
  const staleBefore = new Date(now.getTime() - CLAIM_TIMEOUT_MS);
  // Moving the row to `sending` is the claim: competing workers can no longer
  // claim it, and a crashed worker becomes eligible after the lease expires.
  const [receipt] = await db.update(paymentReceipts).set({
    emailStatus: "sending",
    deliveryClaimedAt: now,
    deliveryAttempts: sql`${paymentReceipts.deliveryAttempts} + 1`,
  }).where(and(
    eq(paymentReceipts.id, receiptId),
    or(inArray(paymentReceipts.emailStatus, ["pending", "failed"]), and(eq(paymentReceipts.emailStatus, "sending"), lt(paymentReceipts.deliveryClaimedAt, staleBefore))),
    or(isNull(paymentReceipts.nextDeliveryAttemptAt), lt(paymentReceipts.nextDeliveryAttemptAt, now)),
  )).returning();
  if (!receipt) return "skipped";

  if (!receipt.customerEmail) {
    await db.update(paymentReceipts).set({ emailStatus: "not_available", deliveryClaimedAt: null })
      .where(eq(paymentReceipts.id, receipt.id));
    return "skipped";
  }
  try {
    await sendReceiptEmail({
      to: receipt.customerEmail, customerName: receipt.customerName || "Valued Customer",
      serviceName: receipt.serviceDescription, amount: formattedAmount(receipt.amountCents, receipt.currency),
      receiptPdfBuffer: Buffer.from(receipt.pdfContent, "base64"), receiptNumber: receipt.receiptNumber,
      isSubscription: receipt.recurring,
    });
    await db.update(paymentReceipts).set({
      emailStatus: "sent", emailSentAt: new Date(), emailError: null,
      nextDeliveryAttemptAt: null, deliveryClaimedAt: null,
    }).where(eq(paymentReceipts.id, receipt.id));
    return "sent";
  } catch (error: any) {
    const attempts = receipt.deliveryAttempts;
    const delayMs = Math.min(24 * 60 * 60 * 1000, 60 * 1000 * 2 ** Math.min(attempts - 1, 10));
    await db.update(paymentReceipts).set({
      emailStatus: "failed", emailError: String(error?.message || error).slice(0, 2000),
      nextDeliveryAttemptAt: new Date(Date.now() + delayMs), deliveryClaimedAt: null,
    }).where(eq(paymentReceipts.id, receipt.id));
    console.error(`Receipt ${receipt.receiptNumber} email attempt ${attempts} failed:`, error);
    return "failed";
  }
}

// Imported separately so application startup can keep scheduling concerns out
// of webhook request handling.
export function startReceiptDeliveryScheduler() {
  const run = async () => {
    try {
      const now = new Date();
      const staleBefore = new Date(now.getTime() - CLAIM_TIMEOUT_MS);
      const due = await db.select({ id: paymentReceipts.id }).from(paymentReceipts).where(and(
        or(inArray(paymentReceipts.emailStatus, ["pending", "failed"]), and(eq(paymentReceipts.emailStatus, "sending"), lt(paymentReceipts.deliveryClaimedAt, staleBefore))),
        or(isNull(paymentReceipts.nextDeliveryAttemptAt), lt(paymentReceipts.nextDeliveryAttemptAt, now)),
      )).limit(20);
      await Promise.all(due.map(({ id }) => attemptReceiptDelivery(id)));
    } catch (error) {
      console.error("Receipt delivery scheduler error:", error);
    }
  };
  void run();
  return setInterval(() => void run(), 60 * 1000);
}