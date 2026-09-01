import { paymentReceipts } from "@shared/schema";
import { db } from "./db";
import { getStripeSync, getUncachableStripeClient } from "./stripeClient";
import { generateReceiptPDF } from "./receiptGenerator";
import { generatePlaybookPDF, sendPlaybookDeliveryEmail, isPlaybookProduct } from "./playbookDelivery";
import { storage } from "./storage";
import { attemptReceiptDelivery } from "./receiptDelivery";

const processedPlaybookDeliveries = new Set<string>();

function receiptNumber(identifier: string) {
  return `PP-${identifier.replace(/[^a-zA-Z0-9]/g, "").slice(-16).toUpperCase()}`;
}

function normalizePaymentMethod(details: any): string | null {
  if (!details?.type) return null;
  if (details.type === "paypal") return "PayPal";
  if (details.type === "card") {
    const funding = details.card?.funding;
    return funding === "debit" ? "Debit card" : funding === "credit" ? "Credit card" : "Card";
  }
  return String(details.type).replace(/_/g, " ");
}

async function successfulPaymentMethod(stripe: any, paymentIntentId?: string | null): Promise<string | null> {
  if (!paymentIntentId) return null;
  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId, { expand: ["latest_charge"] });
    let charge = intent.latest_charge;
    if (typeof charge === "string") charge = await stripe.charges.retrieve(charge);
    return normalizePaymentMethod((charge as any)?.payment_method_details);
  } catch (error) {
    // Receipt creation must not fail because Stripe's charge expansion changed.
    console.error(`Could not determine payment method for ${paymentIntentId}:`, error);
    return null;
  }
}

async function persistAndDeliverReceipt(input: {
  eventId: string; sessionId?: string | null; paymentId?: string | null; invoiceId?: string | null;
  email?: string | null; name?: string | null; service: string; subtotal: number; amount: number;
  currency: string; recurring: boolean; paidAt: Date; method?: string | null; interval?: string;
}) {
  const number = receiptNumber(input.invoiceId || input.sessionId || input.paymentId || input.eventId);
  const pdf = await generateReceiptPDF({
    receiptNumber: number,
    date: input.paidAt.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }),
    customerName: input.name || "Valued Customer",
    customerEmail: input.email || "Not provided",
    serviceName: input.service,
    amount: input.amount,
    currency: input.currency,
    isSubscription: input.recurring,
    interval: input.interval,
  });

  // The database uniqueness constraints, not process memory, make webhook replay safe.
  const [receipt] = await db.insert(paymentReceipts).values({
    stripeEventId: input.eventId,
    stripeSessionId: input.sessionId || null,
    stripePaymentId: input.paymentId || null,
    stripeInvoiceId: input.invoiceId || null,
    receiptNumber: number,
    customerEmail: input.email || null,
    customerName: input.name || null,
    serviceDescription: input.service,
    subtotalCents: input.subtotal,
    amountCents: input.amount,
    currency: input.currency.toLowerCase(),
    paymentStatus: "paid",
    paymentMethod: input.method || null,
    recurring: input.recurring,
    paidAt: input.paidAt,
    pdfContent: pdf.toString("base64"),
    emailStatus: input.email ? "pending" : "not_available",
  }).onConflictDoNothing().returning();

  if (receipt && input.email) await attemptReceiptDelivery(receipt.id);
}

async function handleCheckoutCompleted(event: any) {
  const session = event.data.object;
  // Subscription charges are receipted from invoice.paid, including the first charge.
  if (session.payment_status !== "paid" || session.mode === "subscription") return;
  const stripe = await getUncachableStripeClient();
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { expand: ["data.price", "data.price.product"] });
  const first = lineItems.data[0];
  const service = lineItems.data.map((item: any) => item.description).filter(Boolean).join("; ")
    || session.metadata?.serviceName || "Performance Processes service";
  await persistAndDeliverReceipt({
    eventId: event.id, sessionId: session.id, paymentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    email: session.customer_details?.email || session.customer_email, name: session.customer_details?.name,
    service, subtotal: session.amount_subtotal ?? first?.amount_subtotal ?? session.amount_total ?? 0,
    amount: session.amount_total ?? first?.amount_total ?? 0, currency: session.currency || "cad",
    recurring: false, paidAt: new Date((session.created || Math.floor(Date.now() / 1000)) * 1000),
    method: await successfulPaymentMethod(stripe, typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id),
  });

  if (session.metadata?.invoiceId) {
    await storage.updateInvoice(Number(session.metadata.invoiceId), { status: "paid", paidAt: new Date() } as any);
  }
  await deliverPlaybooks(session, lineItems.data);
}

async function deliverPlaybooks(session: any, items: any[]) {
  const email = session.customer_details?.email || session.customer_email;
  if (session.metadata?.source !== "playbooks" || !email || processedPlaybookDeliveries.has(session.id)) return;
  try {
    const playbooks = await Promise.all(items.filter((item: any) => {
      const product = item.price?.product;
      return product?.metadata?.category === "playbook" && isPlaybookProduct(item.description || product.name || "");
    }).map(async (item: any) => ({ name: item.description || item.price.product.name, pdf: await generatePlaybookPDF(item.description || item.price.product.name, session.customer_details?.name || "Customer") })));
    if (playbooks.length) {
      await sendPlaybookDeliveryEmail({ to: email, customerName: session.customer_details?.name || "Customer", playbookNames: playbooks.map(p => p.name), pdfBuffers: playbooks.map(p => p.pdf) });
      processedPlaybookDeliveries.add(session.id);
    }
  } catch (error) { console.error("Playbook delivery failed:", error); }
}

async function handleInvoicePaid(event: any) {
  const invoice = event.data.object;
  if (invoice.status !== "paid") return;
  const stripe = await getUncachableStripeClient();
  const lineItems = invoice.lines?.data || (await stripe.invoices.retrieve(invoice.id, { expand: ["lines.data.price.product"] })).lines.data;
  const service = lineItems.map((item: any) => item.description).filter(Boolean).join("; ") || "Performance Processes subscription";
  const invoicePayment = invoice.payment_intent || invoice.payments?.data?.[0]?.payment?.payment_intent;
  const paymentId = typeof invoicePayment === "string" ? invoicePayment : invoicePayment?.id;
  await persistAndDeliverReceipt({
    eventId: event.id, invoiceId: invoice.id, paymentId,
    email: invoice.customer_email, name: invoice.customer_name,
    service, subtotal: invoice.subtotal ?? invoice.amount_paid ?? 0, amount: invoice.amount_paid ?? 0,
    currency: invoice.currency || "cad", recurring: true,
    paidAt: new Date((invoice.status_transitions?.paid_at || invoice.created || Math.floor(Date.now() / 1000)) * 1000),
    method: await successfulPaymentMethod(stripe, paymentId),
    interval: lineItems[0]?.price?.recurring?.interval,
  });
}

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) throw new Error("STRIPE WEBHOOK ERROR: Payload must be a Buffer.");
    const event: any = await (await getStripeSync()).processWebhook(payload, signature);
    if (event?.type === "checkout.session.completed" || event?.type === "checkout.session.async_payment_succeeded") await handleCheckoutCompleted(event);
    if (event?.type === "checkout.session.async_payment_failed") {
      console.warn(`Stripe async payment failed for Checkout session ${event.data.object?.id || "unknown"}; no fulfillment performed.`);
    }
    if (event?.type === "invoice.paid") await handleInvoicePaid(event);
  }
}