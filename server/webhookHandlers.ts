import { getStripeSync, getUncachableStripeClient } from './stripeClient';
import { generateReceiptPDF } from './receiptGenerator';
import { sendReceiptEmail } from './emailService';

const processedSessions = new Set<string>();

async function handleCheckoutCompleted(session: any) {
  if (processedSessions.has(session.id)) {
    console.log(`Receipt already sent for session ${session.id}, skipping duplicate`);
    return;
  }
  processedSessions.add(session.id);

  if (processedSessions.size > 1000) {
    const entries = Array.from(processedSessions);
    entries.slice(0, 500).forEach(id => processedSessions.delete(id));
  }

  try {
    const stripe = await getUncachableStripeClient();

    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || 'Valued Customer';
    const serviceName = session.metadata?.serviceName || 'Consulting Service';

    if (!customerEmail) {
      console.warn('No customer email found for session', session.id);
      return;
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price'],
    });
    const firstItem = lineItems.data[0];
    const amount = session.amount_total || firstItem?.amount_total || 0;
    const currency = session.currency || 'cad';
    const isSubscription = session.mode === 'subscription';

    let interval: string | undefined;
    if (isSubscription && firstItem?.price && typeof firstItem.price === 'object') {
      interval = (firstItem.price as any).recurring?.interval || undefined;
    }

    const itemDescription = firstItem?.description || serviceName;

    const receiptNumber = `PP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const date = new Date().toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedAmount = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);

    const pdfBuffer = await generateReceiptPDF({
      receiptNumber,
      date,
      customerName,
      customerEmail,
      serviceName: itemDescription,
      amount,
      currency,
      isSubscription,
      interval,
    });

    await sendReceiptEmail({
      to: customerEmail,
      customerName,
      serviceName: itemDescription,
      amount: formattedAmount,
      receiptPdfBuffer: pdfBuffer,
      receiptNumber,
      isSubscription,
    });

    const { notifyPaymentReceived } = await import('./emailNotifications');
    notifyPaymentReceived({
      customerName,
      customerEmail,
      serviceName: itemDescription,
      amount: formattedAmount,
      receiptNumber,
      isSubscription,
    }).catch(err => console.error("Payment notification to admin failed:", err));

    console.log(`Receipt ${receiptNumber} sent to ${customerEmail} for ${itemDescription}`);
  } catch (error) {
    console.error('Error processing receipt for checkout session:', error);
    processedSessions.delete(session.id);
  }
}

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
        'Received type: ' + typeof payload + '. ' +
        'This usually means express.json() parsed the body before reaching this handler. ' +
        'FIX: Ensure webhook route is registered BEFORE app.use(express.json()).'
      );
    }

    const sync = await getStripeSync();
    const event = await sync.processWebhook(payload, signature);

    if (event && event.type === 'checkout.session.completed') {
      await handleCheckoutCompleted(event.data.object);
    }
  }
}
