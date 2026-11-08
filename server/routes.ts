import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertEngagementSchema, insertMilestoneSchema, insertDocumentSchema, insertActionItemSchema, insertMeetingSchema, insertMessageSchema, insertResourceSchema, insertInvoiceSchema, insertContractSchema, insertPerformanceKpiSchema, paymentReceipts } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { db, pool } from "./db";
import { sql, desc, ilike, or } from "drizzle-orm";
import { requireAuth, requireAdmin } from "./auth";
import { attemptReceiptDelivery } from "./receiptDelivery";
import { ensureIntakeStorage, registerIntakeRoutes, startIntakeMailQueue } from "./intakeService";
import { registerBookingNotificationRoute, startBookingAutomation } from "./bookingAutomation";
import { registerAcquisitionRoutes, startAcquisitionNotifications } from "./acquisition";
import { registerResourceAssessmentRoutes, startResourceAssessmentDelivery } from "./resourceAssessments";
import { getPortalService } from "@shared/portal-services";
import { milestones as milestoneTable } from "@shared/schema";
import { z } from "zod";
import { invoiceWriteSchema, invoicePatchSchema, invoicePaymentError, invoiceAmount, kpiWriteSchema, kpiPatchSchema } from "./portalValidation";
import { registerFundingRoutes } from "./fundingRoutes";
import { isFundingService } from "@shared/funding";
import { users as userTable, engagements as engagementTable, fundingCharges as fundingChargeTable } from "@shared/schema";
import { eq } from "drizzle-orm";

const uploadsDir = path.join(process.cwd(), "uploads", "resumes");
const contactSubmissionAttempts = new Map<string, number[]>();
const CONTACT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX_SUBMISSIONS = 5;
let lastContactRateLimitCleanup = 0;

const CHECKOUT_PAYMENT_METHODS: Array<"card" | "paypal"> = ["card", "paypal"];
const CARD_ONLY_PAYMENT_METHODS: Array<"card"> = ["card"];

function isPayPalAvailabilityError(error: any): boolean {
  const message = String(error?.message || "");
  const code = String(error?.code || "");
  // Only fall back when Stripe has rejected PayPal itself.  Other validation,
  // network, or account errors must remain visible to the caller.
  return /paypal/i.test(message) && (
    /not (activated|enabled|available|supported)|unavailable|invalid/i.test(message) ||
    /payment_method_(unactivated|unsupported|invalid)/i.test(code)
  );
}

async function createCheckoutSession(stripe: any, params: Record<string, any>) {
  try {
    const session = await stripe.checkout.sessions.create({
      ...params,
      payment_method_types: CHECKOUT_PAYMENT_METHODS,
    });
    return { session, paymentMethods: CHECKOUT_PAYMENT_METHODS };
  } catch (error) {
    if (!isPayPalAvailabilityError(error)) throw error;
    // Stripe rejected the first request before creating a Checkout Session.
    // Retrying once with identical params and card only keeps debit/card live.
    const session = await stripe.checkout.sessions.create({
      ...params,
      payment_method_types: CARD_ONLY_PAYMENT_METHODS,
    });
    return { session, paymentMethods: CARD_ONLY_PAYMENT_METHODS };
  }
}

function checkoutErrorMessage(error: any): string {
  const details = String(error?.message || error || "");
  if (/paypal/i.test(details)) {
    return "PayPal is unavailable for this Stripe account. Credit and debit card checkout remains available.";
  }
  return "Unable to create checkout. Please try again or contact support.";
}

function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" ? value.trim().length > 0 : value != null;
}

function isContactSubmissionRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - CONTACT_RATE_LIMIT_WINDOW_MS;

  if (now - lastContactRateLimitCleanup > 60 * 1000) {
    contactSubmissionAttempts.forEach((attempts: number[], address: string) => {
      const recentAttempts = attempts.filter((attempt: number) => attempt > windowStart);
      if (recentAttempts.length === 0) {
        contactSubmissionAttempts.delete(address);
      } else {
        contactSubmissionAttempts.set(address, recentAttempts);
      }
    });
    lastContactRateLimitCleanup = now;
  }

  const attempts = (contactSubmissionAttempts.get(ip) ?? []).filter((attempt) => attempt > windowStart);
  if (attempts.length >= CONTACT_RATE_LIMIT_MAX_SUBMISSIONS) {
    contactSubmissionAttempts.set(ip, attempts);
    return true;
  }

  attempts.push(now);
  contactSubmissionAttempts.set(ip, attempts);
  return false;
}

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const resumeStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: resumeStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await ensureIntakeStorage();
  registerIntakeRoutes(app);
  registerBookingNotificationRoute(app);
  registerAcquisitionRoutes(app);
  registerResourceAssessmentRoutes(app);
  startIntakeMailQueue();
  startBookingAutomation();
  startAcquisitionNotifications();
  startResourceAssessmentDelivery();

  app.post("/api/contact", async (req, res) => {
    try {
      if (isHoneypotFilled(req.body?.website)) {
        return res.status(201).json({ message: "Message sent successfully" });
      }

      const ip = req.ip || req.socket.remoteAddress || "unknown";
      if (isContactSubmissionRateLimited(ip)) {
        return res.status(429).json({ message: "Too many contact form submissions. Please try again in 15 minutes." });
      }

      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid form data", errors: parsed.error.flatten() });
      }
      const submission = await storage.createContactSubmission(parsed.data);

      const { notifyContactForm } = await import('./emailNotifications');
      notifyContactForm({ name: parsed.data.name, email: parsed.data.email, message: parsed.data.message }).catch(() => console.error("Contact notification failed"));

      const { sendContactConfirmation } = await import('./leadNurtureEmails');
      sendContactConfirmation(parsed.data.email, parsed.data.name).catch(() => console.error("Contact confirmation email failed"));

      return res.status(201).json({ message: "Message sent successfully", id: submission.id });
    } catch (error) {
      console.error("Contact form error");
      return res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.post("/api/audit-checklist", async (req, res) => {
    try {
      const { fullName, email, company, role } = req.body;
      if (!fullName || !email || typeof email !== 'string' || typeof fullName !== 'string') {
        return res.status(400).json({ message: "Name and email are required" });
      }
      const trimmedEmail = email.toLowerCase().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return res.status(400).json({ message: "Please provide a valid email address" });
      }

      await db.execute(sql`
        INSERT INTO leads (company_name, contact_name, contact_email, source, status, service_interest, notes)
        VALUES (
          ${company || 'Not provided'},
          ${fullName.trim()},
          ${trimmedEmail},
          'audit-checklist',
          'new',
          'Free Process & People Management Audit',
          ${'Role: ' + (role || 'Not specified') + ' | Downloaded audit checklist'}
        )
      `);

      const { notifyContactForm } = await import('./emailNotifications');
      notifyContactForm({
        name: fullName.trim(),
        email: trimmedEmail,
        message: `New audit checklist download:\nCompany: ${company || 'Not provided'}\nRole: ${role || 'Not specified'}\n\nThis lead downloaded the Process & People Management Audit Checklist. Follow up to schedule the free audit consultation.`
      }).catch(err => console.error("Audit notification email failed:", err));

      const { sendAuditChecklistEmail } = await import('./leadNurtureEmails');
      sendAuditChecklistEmail(trimmedEmail, fullName.trim()).catch(err => console.error("Checklist delivery email failed:", err));

      const { scheduleNurtureSequence } = await import('./emailScheduler');
      scheduleNurtureSequence(trimmedEmail, fullName.trim());

      return res.status(201).json({ message: "Checklist request received", success: true });
    } catch (error) {
      console.error("Audit checklist error:", error);
      return res.status(500).json({ message: "Failed to process request" });
    }
  });

  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email, source } = req.body;
      if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ message: "Email is required" });
      }
      const trimmedEmail = email.toLowerCase().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return res.status(400).json({ message: "Please provide a valid email address" });
      }

      const { subscribers } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");

      const existing = await db.select().from(subscribers).where(eq(subscribers.email, trimmedEmail));
      if (existing.length > 0) {
        return res.status(200).json({ message: "Already subscribed", success: true });
      }

      await db.insert(subscribers).values({
        email: trimmedEmail,
        source: source || 'website',
      });

      const { sendSubscriberWelcome } = await import('./leadNurtureEmails');
      sendSubscriberWelcome(trimmedEmail).catch(err => console.error("Subscriber welcome email failed:", err));

      const { notifyContactForm } = await import('./emailNotifications');
      notifyContactForm({
        name: 'New Subscriber',
        email: trimmedEmail,
        message: `New newsletter subscription from the website.\nSource: ${source || 'footer lead magnet'}`
      }).catch(err => console.error("Subscriber admin notification failed:", err));

      return res.status(201).json({ message: "Subscribed successfully", success: true });
    } catch (error) {
      console.error("Subscription error:", error);
      return res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  app.post("/api/apply", upload.single("resume"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Resume file is required" });
      }

      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        linkedIn: req.body.linkedIn || undefined,
        coverLetter: req.body.coverLetter || undefined,
        resumeFilename: req.file.originalname,
        resumePath: req.file.path,
        position: req.body.position,
      };

      const { insertJobApplicationSchema } = await import("@shared/schema");
      const parsed = insertJobApplicationSchema.safeParse(data);
      if (!parsed.success) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Invalid application data", errors: parsed.error.flatten() });
      }

      const application = await storage.createJobApplication(parsed.data);

      const { notifyJobApplication } = await import('./emailNotifications');
      notifyJobApplication({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        linkedIn: data.linkedIn,
        coverLetter: data.coverLetter,
        resumeFilename: data.resumeFilename,
      }).catch(err => console.error("Job application notification failed:", err));

      const { sendJobApplicationConfirmation } = await import('./leadNurtureEmails');
      sendJobApplicationConfirmation(data.email, data.firstName, data.lastName, data.position).catch(err => console.error("Job confirmation email failed:", err));

      return res.status(201).json({ message: "Application submitted successfully", id: application.id });
    } catch (error) {
      console.error("Job application error:", error);
      if (req.file) {
        try { fs.unlinkSync(req.file.path); } catch {}
      }
      return res.status(500).json({ message: "Failed to submit application" });
    }
  });

  app.get("/api/stripe/key", async (_req, res) => {
    try {
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (error) {
      console.error("Error getting Stripe key:", error);
      res.status(500).json({ message: "Failed to get payment configuration" });
    }
  });

  app.get("/api/products", async (_req, res) => {
    try {
      const result = await db.execute(
        sql`
          SELECT 
            p.id as product_id,
            p.name as product_name,
            p.description as product_description,
            p.metadata as product_metadata,
            pr.id as price_id,
            pr.unit_amount,
            pr.currency
          FROM stripe.products p
          JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
          WHERE p.active = true
          ORDER BY pr.unit_amount ASC
        `
      );

      const dbData: any[] = result.rows || [];
      const dbProductNames = new Set(dbData.map((r: any) => r.product_name));

      const stripe = await getUncachableStripeClient();
      const products = await stripe.products.list({ active: true, limit: 100 });
      const prices = await stripe.prices.list({ active: true, limit: 100 });

      const apiData = products.data.flatMap((product) => {
        if (dbProductNames.has(product.name)) return [];
        const productPrices = prices.data.filter((p) => p.product === product.id);
        return productPrices.map((price) => ({
          product_id: product.id,
          product_name: product.name,
          product_description: product.description,
          product_metadata: product.metadata,
          price_id: price.id,
          unit_amount: price.unit_amount,
          currency: price.currency,
        }));
      });

      if (apiData.length > 0) {
        console.log(`Supplemented ${apiData.length} product(s) from Stripe API not yet in synced DB`);
      }

      const data = [...dbData, ...apiData].sort((a: any, b: any) => (a.unit_amount || 0) - (b.unit_amount || 0));
      res.json({ data });
    } catch (error) {
      console.error("Error listing products:", error);
      res.status(500).json({ message: "Failed to list products" });
    }
  });

  app.post("/api/checkout", async (req, res) => {
    try {
      const { priceId, serviceName } = req.body;

      if (!priceId) {
        return res.status(400).json({ message: "Price ID is required" });
      }

      const allowedReturnPages = ["/", "/consulting", "/recruiting", "/playbooks", "/services", "/marketing", "/solutions", "/pricing"];
      const returnPage = allowedReturnPages.includes(req.body.returnPage) ? req.body.returnPage : "/";

      const stripe = await getUncachableStripeClient();

      const price = await stripe.prices.retrieve(priceId);
      if (price.currency.toLowerCase() !== "cad") {
        return res.status(400).json({ message: "This offer is not configured in CAD. Please select a CAD price." });
      }
      const isRecurring = !!price.recurring;

      const baseUrl = process.env.REPLIT_DOMAINS
        ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
        : `${req.protocol}://${req.get('host')}`;

      const { session, paymentMethods } = await createCheckoutSession(stripe, {
        line_items: [{ price: priceId, quantity: 1 }],
        mode: isRecurring ? 'subscription' : 'payment',
        success_url: `${baseUrl}${returnPage}?payment=success`,
        cancel_url: `${baseUrl}${returnPage}?payment=cancelled`,
        metadata: {
          serviceName: serviceName || '',
        },
      });

      res.json({ url: session.url, paymentMethods });
    } catch (error) {
      console.error("Checkout error:", error);
      res.status(500).json({ message: checkoutErrorMessage(error) });
    }
  });

  app.post("/api/cart-checkout", async (req, res) => {
    try {
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Cart items are required" });
      }

      if (items.length > 20) {
        return res.status(400).json({ message: "Too many items in cart" });
      }

      for (const item of items) {
        if (!item.priceId || typeof item.priceId !== 'string') {
          return res.status(400).json({ message: "Each item must have a valid priceId" });
        }
        const qty = Number(item.quantity);
        if (!Number.isInteger(qty) || qty < 1 || qty > 10) {
          return res.status(400).json({ message: "Quantity must be an integer between 1 and 10" });
        }
      }

      const stripe = await getUncachableStripeClient();

      for (const item of items) {
        const price = await stripe.prices.retrieve(item.priceId, { expand: ['product'] });
        if (price.currency.toLowerCase() !== "cad") {
          return res.status(400).json({ message: `Product ${item.priceId} is not configured in CAD.` });
        }
        const product = typeof price.product === 'object' ? price.product : null;
        if (!product || !('metadata' in product) || product.metadata?.category !== 'playbook') {
          return res.status(400).json({ message: `Invalid product: ${item.priceId}` });
        }
      }

      const baseUrl = process.env.REPLIT_DOMAINS
        ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
        : `${req.protocol}://${req.get('host')}`;

      const line_items = items.map((item: { priceId: string; quantity: number }) => ({
        price: item.priceId,
        quantity: item.quantity,
      }));

      const { session, paymentMethods } = await createCheckoutSession(stripe, {
        line_items,
        mode: 'payment',
        success_url: `${baseUrl}/playbooks?payment=success`,
        cancel_url: `${baseUrl}/playbooks?payment=cancelled`,
        metadata: {
          source: 'playbooks',
        },
      });

      res.json({ url: session.url, paymentMethods });
    } catch (error) {
      console.error("Cart checkout error:", error);
      res.status(500).json({ message: checkoutErrorMessage(error) });
    }
  });

  app.post("/api/instant-checkout", async (req, res) => {
    try {
      const { OFFERS: OFFER_CATALOG } = await import("@shared/offers");
      const { offerId, mode, returnPage, promoCode } = req.body || {};

      if (!offerId || typeof offerId !== "string") {
        return res.status(400).json({ message: "offerId is required" });
      }

      const offer = OFFER_CATALOG.find((o) => o.id === offerId);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }

      if (offer.isRange || offer.price <= 0) {
        return res.status(400).json({ message: "This offer requires a custom quote." });
      }

      const useTeam = mode === "team" && offer.perTeamPrice && offer.perTeamPrice > 0;
      const baseAmount = useTeam ? offer.perTeamPrice! : offer.price;

      const NEXTUP_CODE = "NEXTPROCESSES";
      const NEXTUP_DISCOUNT_PCT = 40;
      const normalizedCode = typeof promoCode === "string" ? promoCode.trim().toUpperCase() : "";
      let appliedCode: string | null = null;
      let unitAmount = baseAmount;
      let displayName = useTeam ? `${offer.name} (Team)` : offer.name;

      if (normalizedCode) {
        if (normalizedCode !== NEXTUP_CODE) {
          return res.status(400).json({ message: "Invalid discount code." });
        }
        if (offer.category !== "website") {
          return res.status(400).json({ message: "The NEXTPROCESSES code applies to website services only." });
        }
        unitAmount = Math.round(baseAmount * (100 - NEXTUP_DISCOUNT_PCT) / 100);
        displayName = `${displayName} , NextUp 40% off`;
        appliedCode = NEXTUP_CODE;
      }

      const { LANDING_PAGES } = await import("@shared/offers");
      const landingReturnPages = Object.values(LANDING_PAGES).map((l) => `/services/${l.slug}`);
      const allowedReturnPages = ["/", "/services", "/pricing", "/playbooks", "/solutions", ...landingReturnPages];
      const safeReturn = allowedReturnPages.includes(returnPage) ? returnPage : "/";

      const trustedDomain = process.env.REPLIT_DOMAINS?.split(",")[0]?.trim();
      let baseUrl: string;
      if (trustedDomain) {
        baseUrl = `https://${trustedDomain}`;
      } else if (process.env.NODE_ENV !== "production") {
        baseUrl = `${req.protocol}://${req.get("host")}`;
      } else {
        console.error("Instant checkout refused: REPLIT_DOMAINS is not configured in production");
        return res.status(500).json({ message: "Checkout is temporarily unavailable. Please try again shortly." });
      }

      const stripe = await getUncachableStripeClient();

      const { session, paymentMethods } = await createCheckoutSession(stripe, {
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: displayName,
                description: offer.description,
              },
              unit_amount: unitAmount,
              ...(offer.isMonthly ? { recurring: { interval: "month" as const } } : {}),
            },
            quantity: 1,
          },
        ],
        mode: offer.isMonthly ? "subscription" : "payment",
        success_url: `${baseUrl}${safeReturn}?payment=success`,
        cancel_url: `${baseUrl}${safeReturn}?payment=cancelled`,
        metadata: {
          offerId: offer.id,
          offerName: offer.name,
          mode: useTeam ? "team" : "standard",
          category: offer.category,
          promoCode: appliedCode || "",
        },
      });

      res.json({ url: session.url, paymentMethods });
    } catch (error: any) {
      console.error("Instant checkout error:", error?.message || error);
      res.status(500).json({ message: checkoutErrorMessage(error) });
    }
  });

  app.post("/api/sponsor-checkout", async (req, res) => {
    try {
      const { tier } = req.body;
      const tiers: Record<string, { name: string; amount: number; description: string }> = {
        supporter: { name: "Supporter", amount: 15000, description: "Sponsor 1 hour of pro-bono consulting" },
        champion: { name: "Champion", amount: 50000, description: "Sponsor a half-day pro-bono engagement" },
        catalyst: { name: "Catalyst", amount: 150000, description: "Sponsor a full pro-bono consulting project" },
      };

      const selected = tiers[tier];
      if (!selected) {
        return res.status(400).json({ message: "Invalid sponsorship tier" });
      }

      const stripe = await getUncachableStripeClient();
      const baseUrl = process.env.REPLIT_DOMAINS
        ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
        : `${req.protocol}://${req.get('host')}`;

      const { session, paymentMethods } = await createCheckoutSession(stripe, {
        line_items: [{
          price_data: {
            currency: 'cad',
            product_data: {
              name: `Pro-Bono Sponsorship: ${selected.name}`,
              description: selected.description,
            },
            unit_amount: selected.amount,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${baseUrl}/about?sponsor=success`,
        cancel_url: `${baseUrl}/about?sponsor=cancelled`,
        metadata: {
          type: 'pro-bono-sponsorship',
          tier: tier,
        },
      });

      res.json({ url: session.url, paymentMethods });
    } catch (error) {
      console.error("Sponsor checkout error:", error);
      res.status(500).json({ message: checkoutErrorMessage(error) });
    }
  });

  app.post("/api/test-receipt", requireAdmin, async (req, res) => {
    if (process.env.REPLIT_DEPLOYMENT === '1') {
      return res.status(404).json({ message: "Not found" });
    }

    try {
      const { email, name } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const { generateReceiptPDF } = await import("./receiptGenerator");
      const { sendReceiptEmail } = await import("./emailService");

      const receiptNumber = `PP-TEST-${Date.now().toString(36).toUpperCase()}`;
      const date = new Date().toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const pdfBuffer = await generateReceiptPDF({
        receiptNumber,
        date,
        customerName: name || "Test Customer",
        customerEmail: email,
        serviceName: "Strategic Planning - Standard Package",
        amount: 450000,
        currency: "cad",
        isSubscription: false,
      });

      await sendReceiptEmail({
        to: email,
        customerName: name || "Test Customer",
        serviceName: "Strategic Planning - Standard Package",
        amount: "$4,500.00",
        receiptPdfBuffer: pdfBuffer,
        receiptNumber,
        isSubscription: false,
      });

      return res.json({ message: "Test receipt sent", receiptNumber });
    } catch (error: any) {
      console.error("Test receipt error:", error);
      return res.status(500).json({ message: "Failed to send test receipt", error: error.message });
    }
  });

  // ==================== ADMIN API ROUTES ====================
  app.get("/api/admin/users", requireAdmin, async (_req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const sanitized = allUsers.map(u => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        companyName: u.companyName,
        contactPhone: u.contactPhone,
        businessLocation: u.businessLocation,
        businessWebsite: u.businessWebsite,
        industry: u.industry,
        businessStage: u.businessStage,
        requestedServices: u.requestedServices,
        supportGoals: u.supportGoals,
        role: u.role,
        status: u.status,
        twoFactorEnabled: u.twoFactorEnabled,
        createdAt: u.createdAt,
      }));
      res.json(sanitized);
    } catch (error) {
      console.error("Admin users error:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.patch("/api/admin/users/:id/profile", requireAdmin, async (req, res) => {
    const parsed = z.object({
      fullName: z.string().trim().min(2).max(120),
      companyName: z.string().trim().min(2).max(160),
      contactPhone: z.string().trim().max(40),
      businessLocation: z.string().trim().max(180),
      businessWebsite: z.string().trim().max(300).refine((s) => s === "" || (/^https?:\/\//i.test(s) && z.string().url().safeParse(s).success)),
      industry: z.string().trim().max(120),
      supportGoals: z.string().trim().max(1200),
    }).strict().partial().safeParse(req.body);
    if (!parsed.success || !Object.keys(parsed.data || {}).length) return res.status(400).json({ message: "Enter valid profile details." });
    try {
      const current = await storage.getUser(String(req.params.id));
      if (!current) return res.status(404).json({ message: "User not found." });
      if (parsed.data.companyName && parsed.data.companyName !== current.companyName) {
        const duplicate = await storage.getUserByCompanyName(parsed.data.companyName);
        if (duplicate && duplicate.id !== current.id) return res.status(409).json({ message: "An account already uses this organization name." });
      }
      const saved = await db.transaction(async (tx) => {
        const [updated] = await tx.update(userTable).set(parsed.data).where(eq(userTable.id, current.id)).returning();
        if (parsed.data.companyName) await tx.update(engagementTable).set({ clientName: parsed.data.companyName }).where(eq(engagementTable.clientUserId, current.id));
        return updated;
      });
      return res.json({ id: saved.id, fullName: saved.fullName, companyName: saved.companyName });
    } catch {
      return res.status(500).json({ message: "Unable to update this profile." });
    }
  });

  app.patch("/api/admin/users/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!["active", "pending_approval", "suspended"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      if (String(req.params.id) === req.session.userId && status !== "active") return res.status(400).json({ message: "You cannot suspend your own administrator account." });
      const user = await storage.updateUser(String(req.params.id), status === "active"
        ? { status, failedAuthAttempts: 0, authLockedAt: null }
        : { status });
      res.json({ id: user.id, status: user.status, fullName: user.fullName });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user status" });
    }
  });

  app.patch("/api/admin/users/:id/role", requireAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      if (!["client", "staff", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      if (String(req.params.id) === req.session.userId && role !== "admin") return res.status(400).json({ message: "You cannot remove your own administrator access." });
      const user = await storage.updateUser(String(req.params.id), { role });
      res.json({ id: user.id, role: user.role, fullName: user.fullName });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  app.get("/api/admin/contacts", requireAdmin, async (_req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Admin contacts error:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.get("/api/admin/applications", requireAdmin, async (_req, res) => {
    try {
      const applications = await storage.getJobApplications();
      res.json(applications);
    } catch (error) {
      console.error("Admin applications error:", error);
      res.status(500).json({ message: "Failed to fetch job applications" });
    }
  });

  app.get("/api/admin/grant-applications", requireAdmin, async (_req, res) => {
    try {
      res.json(await storage.getGrantApplications());
    } catch (error) {
      console.error("Admin grant applications error:", error);
      res.status(500).json({ message: "Failed to fetch funding submissions" });
    }
  });

  app.patch("/api/admin/grant-applications/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ message: "Invalid submission id" });
      const allowedStatuses = new Set(["new", "reviewing", "contacted", "scheduled", "accepted", "declined"]);
      const status = req.body?.status;
      if (typeof status !== "string" || !allowedStatuses.has(status)) {
        return res.status(400).json({ message: "Invalid funding submission status" });
      }
      res.json(await storage.updateGrantApplicationStatus(id, status));
    } catch (error) {
      console.error("Admin grant application status update failed:", error);
      res.status(500).json({ message: "Failed to update funding submission" });
    }
  });

  // Receipt contents and customer contact information are never returned in this ledger response.
  app.get("/api/admin/receipts", requireAdmin, async (req, res) => {
    try {
      const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 120) : "";
      const where = search ? or(
        ilike(paymentReceipts.receiptNumber, `%${search}%`),
        ilike(paymentReceipts.customerEmail, `%${search}%`),
        ilike(paymentReceipts.customerName, `%${search}%`),
        ilike(paymentReceipts.serviceDescription, `%${search}%`),
      ) : undefined;
      const rows = await db.select({
        id: paymentReceipts.id, receiptNumber: paymentReceipts.receiptNumber,
        customerEmail: paymentReceipts.customerEmail, customerName: paymentReceipts.customerName,
        serviceDescription: paymentReceipts.serviceDescription, subtotalCents: paymentReceipts.subtotalCents,
        amountCents: paymentReceipts.amountCents, currency: paymentReceipts.currency,
        paymentStatus: paymentReceipts.paymentStatus, paymentMethod: paymentReceipts.paymentMethod,
        recurring: paymentReceipts.recurring, paidAt: paymentReceipts.paidAt,
        emailStatus: paymentReceipts.emailStatus, emailSentAt: paymentReceipts.emailSentAt,
        deliveryAttempts: paymentReceipts.deliveryAttempts, nextDeliveryAttemptAt: paymentReceipts.nextDeliveryAttemptAt,
        createdAt: paymentReceipts.createdAt,
      }).from(paymentReceipts).where(where).orderBy(desc(paymentReceipts.paidAt)).limit(250);
      res.set("Cache-Control", "private, no-store").json(rows);
    } catch (error) {
      console.error("Admin receipts error:", error);
      res.status(500).json({ message: "Failed to fetch receipt ledger" });
    }
  });

  app.post("/api/admin/receipts/:id/resend", requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ message: "Invalid receipt id" });
    try {
      const [receipt] = await db.select({
        id: paymentReceipts.id, customerEmail: paymentReceipts.customerEmail, emailStatus: paymentReceipts.emailStatus,
      }).from(paymentReceipts).where(sql`${paymentReceipts.id} = ${id}`);
      if (!receipt) return res.status(404).json({ message: "Receipt not found" });
      if (!receipt.customerEmail) return res.status(400).json({ message: "This receipt has no customer email address." });
      if (receipt.emailStatus === "sending") return res.status(409).json({ message: "Receipt delivery is already in progress." });
      if (receipt.emailStatus !== "failed") return res.status(400).json({ message: "Only failed receipt deliveries can be resent manually." });
      await db.update(paymentReceipts).set({
        emailStatus: "pending", emailError: null, nextDeliveryAttemptAt: new Date(), deliveryClaimedAt: null,
      }).where(sql`${paymentReceipts.id} = ${id}`);
      // Claim and send immediately when possible; scheduler remains the durable fallback.
      const result = await attemptReceiptDelivery(id);
      res.status(result === "sent" ? 200 : 202).json({ status: result });
    } catch (error) {
      console.error("Receipt resend error:", error);
      res.status(500).json({ message: "Failed to queue receipt resend" });
    }
  });

  app.get("/api/admin/receipts/:id/pdf", requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ message: "Invalid receipt id" });
    try {
      const [receipt] = await db.select({
        receiptNumber: paymentReceipts.receiptNumber, pdfContent: paymentReceipts.pdfContent,
      }).from(paymentReceipts).where(sql`${paymentReceipts.id} = ${id}`);
      if (!receipt) return res.status(404).json({ message: "Receipt not found" });
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${receipt.receiptNumber.replace(/[^A-Za-z0-9-]/g, "")}.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      }).send(Buffer.from(receipt.pdfContent, "base64"));
    } catch (error) {
      console.error("Receipt download error:", error);
      res.status(500).json({ message: "Failed to download receipt" });
    }
  });

  // ==================== PORTAL API ROUTES ====================
  app.use("/api/portal", requireAuth);
  registerFundingRoutes(app);

  const requireStaffOrAdmin = (req: any, res: any, next: any) => {
    const user = (req as any).user;
    if (!user || (user.role !== "staff" && user.role !== "admin")) {
      return res.status(403).json({ message: "Staff or admin access required" });
    }
    next();
  };

  const getAccessibleEngagement = async (req: any, res: any, idValue: string | number) => {
    const id = Number(idValue);
    if (!Number.isSafeInteger(id) || id < 1) {
      res.status(400).json({ message: "Invalid engagement id" });
      return null;
    }
    const engagement = await storage.getEngagement(id);
    if (!engagement) {
      res.status(404).json({ message: "Engagement not found" });
      return null;
    }
    const user = req.user;
    const allowed = user?.role === "admin"
      || (user?.role === "staff" && engagement.assignedStaffId === user.id)
      || (user?.role === "client" && engagement.clientUserId === user.id);
    if (!allowed) {
      res.status(403).json({ message: "You do not have access to this engagement" });
      return null;
    }
    return engagement;
  };

  app.use("/api/portal/engagements/:engagementId", async (req: any, res, next) => {
    try {
      const engagement = await getAccessibleEngagement(req, res, req.params.engagementId);
      if (!engagement) return;
      req.portalEngagement = engagement;
      next();
    } catch {
      res.status(500).json({ message: "Unable to verify engagement access" });
    }
  });

  const requireBodyEngagement = async (req: any, res: any, next: any) => {
    try {
      const engagement = await getAccessibleEngagement(req, res, req.body?.engagementId);
      if (!engagement) {
        if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return;
      }
      req.portalEngagement = engagement;
      next();
    } catch {
      if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      res.status(500).json({ message: "Unable to verify engagement access" });
    }
  };

  const requireRecordEngagement = (query: string) => async (req: any, res: any, next: any) => {
    try {
      const recordId = Number(req.params.id);
      if (!Number.isSafeInteger(recordId) || recordId < 1) {
        return res.status(400).json({ message: "Invalid record id" });
      }
      const result = await pool.query(query, [recordId]);
      const engagementId = result.rows[0]?.engagement_id;
      if (!engagementId) return res.status(404).json({ message: "Record not found" });
      const engagement = await getAccessibleEngagement(req, res, engagementId);
      if (!engagement) return;
      req.portalEngagement = engagement;
      next();
    } catch {
      res.status(500).json({ message: "Unable to verify record access" });
    }
  };

  // Engagements - filtered by user role
  app.get("/api/portal/engagements", async (req, res) => {
    try {
      const user = (req as any).user;
      const data = await storage.getEngagementsForUser(user.id, user.role);
      res.json(data);
    } catch (error) {
      console.error("Engagements error:", error);
      res.status(500).json({ message: "Failed to fetch engagements" });
    }
  });

  app.get("/api/portal/engagements/:id", async (req, res) => {
    try {
      const engagement = await getAccessibleEngagement(req, res, req.params.id);
      if (!engagement) return;
      res.json(engagement);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch engagement" });
    }
  });

  app.get("/api/portal/engagements/:id/participants", async (req, res) => {
    try {
      const engagement = await getAccessibleEngagement(req, res, req.params.id);
      if (!engagement) return;
      const participants: { id: string; fullName: string; role: string }[] = [];
      if (engagement.clientUserId) {
        const client = await storage.getUser(engagement.clientUserId);
        if (client) participants.push({ id: client.id, fullName: client.fullName, role: client.role });
      }
      if (engagement.assignedStaffId) {
        const staff = await storage.getUser(engagement.assignedStaffId);
        if (staff) participants.push({ id: staff.id, fullName: staff.fullName, role: staff.role });
      }
      const allUsers = await storage.getAllUsers();
      const admins = allUsers.filter(u => u.role === "admin" && !participants.find(p => p.id === u.id));
      for (const admin of admins) {
        participants.push({ id: admin.id, fullName: admin.fullName, role: admin.role });
      }
      res.json(participants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch participants" });
    }
  });

  app.post("/api/portal/engagements", requireAdmin, async (req, res) => {
    try {
      const parsed = insertEngagementSchema.extend({
        completionPercent: z.number().int().min(0).max(100).optional(),
        clientName: z.string().trim().min(1),
        engagementType: z.string().trim().min(1),
        currentPhase: z.string().trim().min(1),
        clientUserId: z.string().min(1),
      }).safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const client = await storage.getUser(parsed.data.clientUserId);
      if (!client || client.role !== "client" || client.status !== "active") return res.status(400).json({ message: "Select an active client account for this service." });
      if (isFundingService(parsed.data.serviceCategory) && parsed.data.retainerAmountCents) return res.status(400).json({ message: "Funding services use approved service orders, not automatic monthly retainers." });
      if (parsed.data.assignedStaffId) {
        const staff = await storage.getUser(parsed.data.assignedStaffId);
        if (!staff || !["staff", "admin"].includes(staff.role) || staff.status !== "active") return res.status(400).json({ message: "Select an active team member." });
      }
      const engagement = await storage.createEngagement({ ...parsed.data, clientName: client.companyName, assignedStaffId: parsed.data.assignedStaffId || null });
      res.status(201).json(engagement);
    } catch (error) {
      res.status(500).json({ message: "Failed to create engagement" });
    }
  });

  app.patch("/api/portal/engagements/:id", requireStaffOrAdmin, async (req, res) => {
    try {
      const current = await getAccessibleEngagement(req, res, req.params.id);
      if (!current) return;
      const user = (req as any).user;
      const updates = { ...req.body };
      if (user.role !== "admin") {
        const allowed = new Set(["status", "currentPhase", "completionPercent", "nextSession", "nextSessionDate"]);
        if (Object.keys(updates).some((key) => !allowed.has(key))) {
          return res.status(403).json({ message: "Only administrators can change engagement ownership or billing details." });
        }
      }
      const parsed = insertEngagementSchema.extend({
        completionPercent: z.number().int().min(0).max(100),
      }).partial().safeParse(updates);
      if (!parsed.success) return res.status(400).json({ message: "Invalid engagement data", errors: parsed.error.flatten() });
      if (isFundingService(parsed.data.serviceCategory ?? current.serviceCategory) && (parsed.data.retainerAmountCents ?? current.retainerAmountCents)) {
        return res.status(400).json({ message: "Funding services use approved service orders, not automatic monthly retainers. Clear the recurring amount before saving." });
      }
      if (Object.prototype.hasOwnProperty.call(parsed.data, "clientUserId") && parsed.data.clientUserId !== current.clientUserId) {
        return res.status(400).json({ message: "Services with client records cannot be moved to another account. Assign a new service instead." });
      }
      if (parsed.data.assignedStaffId) {
        const staff = await storage.getUser(parsed.data.assignedStaffId);
        if (!staff || !["staff", "admin"].includes(staff.role) || staff.status !== "active") return res.status(400).json({ message: "Select an active team member." });
      }
      const existingPlan = await storage.getMilestones(current.id);
      if (parsed.data.serviceCategory && parsed.data.serviceCategory !== current.serviceCategory) {
        const results = await storage.getPerformanceKpis(current.id);
        const fundingRecords = await pool.query("SELECT 1 FROM funding_orders WHERE engagement_id=$1 LIMIT 1", [current.id]);
        if (fundingRecords.rowCount) return res.status(409).json({ message: "This service has funding orders. Assign a new service rather than relabeling its approved work and charges." });
        if (existingPlan.length || results.length) return res.status(409).json({ message: "This service has delivery or reporting records. Assign a new service rather than relabeling existing client results." });
      }
      if (current.clientUserId) {
        const client = await storage.getUser(current.clientUserId);
        if (client) parsed.data.clientName = client.companyName;
      }
      if (existingPlan.length) {
        parsed.data.completionPercent = Math.round(existingPlan.filter(item => item.status === "completed").length / existingPlan.length * 100);
        parsed.data.currentPhase = [...existingPlan].sort((a, b) => a.sortOrder - b.sortOrder).find(item => item.status !== "completed")?.phase || "Completed";
      }
      const engagement = await storage.updateEngagement(current.id, parsed.data);
      res.json(engagement);
    } catch (error) {
      res.status(500).json({ message: "Failed to update engagement" });
    }
  });

  app.post("/api/portal/engagements/:id/service-plan", requireStaffOrAdmin, async (req, res) => {
    try {
      const engagement = await getAccessibleEngagement(req, res, req.params.id);
      if (!engagement) return;
      const service = getPortalService(engagement.serviceCategory);
      if (!service) return res.status(400).json({ message: "Assign a recognised service before creating its delivery plan." });
      const created = await db.transaction(async tx => {
        await tx.execute(sql`SELECT id FROM engagements WHERE id = ${engagement.id} FOR UPDATE`);
        const existing = await tx.select({ id: milestoneTable.id }).from(milestoneTable).where(sql`${milestoneTable.engagementId} = ${engagement.id}`);
        if (existing.length) return null;
        return tx.insert(milestoneTable).values(service.phases.map((phase, index) => ({
          engagementId: engagement.id, title: phase, phase, status: "pending", sortOrder: index,
        }))).returning();
      });
      if (!created) return res.status(409).json({ message: "This service already has a delivery plan. Edit its existing milestones instead." });
      await storage.updateEngagement(engagement.id, { completionPercent: 0, currentPhase: service.phases[0] });
      res.status(201).json(created);
    } catch {
      res.status(500).json({ message: "Failed to create service delivery plan" });
    }
  });

  const refreshServiceProgress = async (engagementId: number) => {
    const items = await storage.getMilestones(engagementId);
    if (!items.length) return;
    const completed = items.filter(item => item.status === "completed").length;
    const next = [...items].sort((a, b) => a.sortOrder - b.sortOrder).find(item => item.status !== "completed");
    await storage.updateEngagement(engagementId, {
      completionPercent: Math.round(completed / items.length * 100),
      currentPhase: next?.phase || "Completed",
    });
  };

  // Milestones
  app.get("/api/portal/engagements/:engagementId/milestones", async (req, res) => {
    try {
      const data = await storage.getMilestones(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch milestones" });
    }
  });

  app.post("/api/portal/milestones", requireStaffOrAdmin, requireBodyEngagement, async (req, res) => {
    try {
      const parsed = insertMilestoneSchema.extend({
        title: z.string().trim().min(1).max(300),
        phase: z.string().trim().min(1).max(300),
        status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
      }).safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const milestone = await storage.createMilestone(parsed.data);
      await refreshServiceProgress(parsed.data.engagementId);
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({ message: "Failed to create milestone" });
    }
  });

  app.patch("/api/portal/milestones/:id", requireStaffOrAdmin, requireRecordEngagement("SELECT engagement_id FROM milestones WHERE id=$1"), async (req, res) => {
    try {
      const parsed = insertMilestoneSchema.omit({ engagementId: true }).extend({
        title: z.string().trim().min(1).max(300),
        phase: z.string().trim().min(1).max(300),
        status: z.enum(["pending", "in-progress", "completed"]),
      }).partial().safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid milestone data" });
      const milestone = await storage.updateMilestone(Number(req.params.id), parsed.data);
      await refreshServiceProgress(milestone.engagementId);
      res.json(milestone);
    } catch (error) {
      res.status(500).json({ message: "Failed to update milestone" });
    }
  });

  // Documents
  const documentsDir = path.join(process.cwd(), "uploads", "documents");
  if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir, { recursive: true });
  }

  const documentStorage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, documentsDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const documentUpload = multer({
    storage: documentStorage,
    limits: { fileSize: 25 * 1024 * 1024 },
  });

  app.get("/api/portal/engagements/:engagementId/documents", async (req, res) => {
    try {
      const data = await storage.getDocuments(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.post("/api/portal/documents/upload", documentUpload.single("file"), requireBodyEngagement, async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "File is required" });
      const user = (req as any).user;
      const ext = path.extname(req.file.originalname).replace(".", "").toLowerCase();
      const sizeBytes = req.file.size;
      const sizeStr = sizeBytes > 1024 * 1024
        ? `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
        : `${(sizeBytes / 1024).toFixed(0)} KB`;

      const doc = await storage.createDocument({
        engagementId: Number(req.body.engagementId),
        name: req.file.originalname,
        folder: req.body.folder || "General",
        fileType: ext,
        size: sizeStr,
        version: "v1.0",
        filePath: req.file.path,
        uploadedBy: user.id,
      });
      res.status(201).json(doc);
    } catch (error) {
      if (req.file) try { fs.unlinkSync(req.file.path); } catch {}
      res.status(500).json({ message: "Failed to upload document" });
    }
  });

  app.get("/api/portal/documents/:id/download", requireRecordEngagement("SELECT engagement_id FROM documents WHERE id=$1"), async (req, res) => {
    try {
      const doc = await storage.getDocument(Number(req.params.id));
      if (!doc) return res.status(404).json({ message: "Document not found" });
      if (!doc.filePath || !fs.existsSync(doc.filePath)) {
        return res.status(404).json({ message: "File not found on disk" });
      }
      res.download(doc.filePath, doc.name);
    } catch (error) {
      res.status(500).json({ message: "Failed to download document" });
    }
  });

  app.delete("/api/portal/documents/:id", requireRecordEngagement("SELECT engagement_id FROM documents WHERE id=$1"), async (req, res) => {
    try {
      const doc = await storage.getDocument(Number(req.params.id));
      if (doc?.filePath && fs.existsSync(doc.filePath)) {
        fs.unlinkSync(doc.filePath);
      }
      await storage.deleteDocument(Number(req.params.id));
      res.json({ message: "Document deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete document" });
    }
  });

  // Action Items
  app.get("/api/portal/engagements/:engagementId/actions", async (req, res) => {
    try {
      const data = await storage.getActionItems(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch action items" });
    }
  });

  app.post("/api/portal/actions", requireStaffOrAdmin, requireBodyEngagement, async (req, res) => {
    try {
      const parsed = insertActionItemSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const item = await storage.createActionItem(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to create action item" });
    }
  });

  app.patch("/api/portal/actions/:id", requireStaffOrAdmin, requireRecordEngagement("SELECT engagement_id FROM action_items WHERE id=$1"), async (req, res) => {
    try {
      const { engagementId: _engagementId, ...updates } = req.body;
      const item = await storage.updateActionItem(Number(req.params.id), updates);
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to update action item" });
    }
  });

  app.delete("/api/portal/actions/:id", requireStaffOrAdmin, requireRecordEngagement("SELECT engagement_id FROM action_items WHERE id=$1"), async (req, res) => {
    try {
      await storage.deleteActionItem(Number(req.params.id));
      res.json({ message: "Action item deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete action item" });
    }
  });

  // MS Bookings calendar sync - filters events by user role and email
  app.get("/api/portal/bookings", async (req, res) => {
    try {
      const user = (req as any).user;
      if (!user) return res.status(401).json({ message: "Not authenticated" });

      const { getBookingsCalendarEvents } = await import("./outlook");
      const events = await getBookingsCalendarEvents();

      if (user.role === "admin" || user.role === "staff") {
        res.json(events);
      } else {
        const userEmail = user.email?.toLowerCase();
        const filtered = events.filter((event: any) =>
          event.attendees?.some((a: any) => a.email?.toLowerCase() === userEmail)
        );
        res.json(filtered);
      }
    } catch (error: any) {
      console.error("Failed to fetch bookings:", error.message);
      res.status(500).json({ message: "Calendar sync unavailable", error: error.message });
    }
  });

  // Meetings
  app.get("/api/portal/engagements/:engagementId/meetings", async (req, res) => {
    try {
      const data = await storage.getMeetings(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  });

  app.post("/api/portal/meetings", requireStaffOrAdmin, requireBodyEngagement, async (req, res) => {
    try {
      const parsed = insertMeetingSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const meeting = await storage.createMeeting(parsed.data);
      res.status(201).json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to create meeting" });
    }
  });

  app.patch("/api/portal/meetings/:id", requireStaffOrAdmin, requireRecordEngagement("SELECT engagement_id FROM meetings WHERE id=$1"), async (req, res) => {
    try {
      const { engagementId: _engagementId, ...updates } = req.body;
      const meeting = await storage.updateMeeting(Number(req.params.id), updates);
      res.json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to update meeting" });
    }
  });

  // Messages - private between sender and recipient
  app.get("/api/portal/engagements/:engagementId/messages", async (req, res) => {
    try {
      const user = (req as any).user;
      const data = await storage.getMessages(Number(req.params.engagementId), user.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/portal/messages", requireBodyEngagement, async (req, res) => {
    try {
      const user = (req as any).user;
      const engagement = (req as any).portalEngagement;
      const administrators = (await storage.getAllUsers())
        .filter((candidate) => candidate.role === "admin" && candidate.status === "active")
        .map((candidate) => candidate.id);
      const participantIds = [engagement.clientUserId, engagement.assignedStaffId, ...administrators].filter(Boolean);
      if (!participantIds.includes(user.id) || !participantIds.includes(req.body?.recipientId)) {
        return res.status(403).json({ message: "Messages are limited to participants in this engagement." });
      }
      const messageData = {
        ...req.body,
        senderId: user.id,
        senderName: user.fullName,
        senderRole: user.role,
      };
      const parsed = insertMessageSchema.safeParse(messageData);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const message = await storage.createMessage(parsed.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Resources
  const resourcesDir = path.join(process.cwd(), "uploads", "resources");
  if (!fs.existsSync(resourcesDir)) {
    fs.mkdirSync(resourcesDir, { recursive: true });
  }

  const resourceStorage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, resourcesDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const resourceUpload = multer({
    storage: resourceStorage,
    limits: { fileSize: 25 * 1024 * 1024 },
  });

  app.get("/api/portal/resources", async (_req, res) => {
    try {
      const data = await storage.getResources();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.post("/api/portal/resources", requireStaffOrAdmin, resourceUpload.single("file"), async (req, res) => {
    try {
      const body = { ...req.body };
      if (req.file) {
        body.fileUrl = `/api/portal/resources/file/${req.file.filename}`;
      }
      const parsed = insertResourceSchema.safeParse(body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const resource = await storage.createResource(parsed.data);
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to create resource" });
    }
  });

  app.get("/api/portal/resources/file/:filename", (req, res) => {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(resourcesDir, filename);
    if (!filePath.startsWith(resourcesDir) || !fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    res.download(filePath);
  });

  // Invoices
  app.get("/api/portal/receipts", requireAuth, async (req, res) => {
    try {
      const email = String((req as any).user?.email || "").trim().toLowerCase();
      const rows = await db.select({
        id: paymentReceipts.id,
        receiptNumber: paymentReceipts.receiptNumber,
        serviceDescription: paymentReceipts.serviceDescription,
        amountCents: paymentReceipts.amountCents,
        currency: paymentReceipts.currency,
        paymentStatus: paymentReceipts.paymentStatus,
        paymentMethod: paymentReceipts.paymentMethod,
        paidAt: paymentReceipts.paidAt,
      }).from(paymentReceipts)
        .where(sql`lower(coalesce(${paymentReceipts.customerEmail}, '')) = ${email}`)
        .orderBy(desc(paymentReceipts.paidAt))
        .limit(250);
      res.set("Cache-Control", "private, no-store").json(rows);
    } catch (error) {
      console.error("Client receipts error:", error);
      res.status(500).json({ message: "Failed to fetch receipts" });
    }
  });

  app.get("/api/portal/receipts/:id/pdf", requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ message: "Invalid receipt id" });
    try {
      const email = String((req as any).user?.email || "").trim().toLowerCase();
      const [receipt] = await db.select({
        receiptNumber: paymentReceipts.receiptNumber,
        pdfContent: paymentReceipts.pdfContent,
      }).from(paymentReceipts).where(sql`
        ${paymentReceipts.id} = ${id}
        AND lower(coalesce(${paymentReceipts.customerEmail}, '')) = ${email}
      `);
      if (!receipt) return res.status(404).json({ message: "Receipt not found" });
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${receipt.receiptNumber.replace(/[^A-Za-z0-9-]/g, "")}.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      }).send(Buffer.from(receipt.pdfContent, "base64"));
    } catch (error) {
      console.error("Client receipt download error:", error);
      res.status(500).json({ message: "Failed to download receipt" });
    }
  });

  app.get("/api/portal/engagements/:engagementId/invoices", async (req, res) => {
    try {
      const engagement = await getAccessibleEngagement(req, res, req.params.engagementId);
      if (!engagement) return;
      const data = await storage.getInvoices(engagement.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.post("/api/portal/invoices", requireStaffOrAdmin, requireBodyEngagement, async (req, res) => {
    try {
      const parsed = invoiceWriteSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const engagement = await getAccessibleEngagement(req, res, parsed.data.engagementId);
      if (!engagement) return;
      const paymentError = invoicePaymentError(parsed.data, (req as any).user.role);
      if (paymentError) return res.status(400).json({ message: paymentError });
      if (isFundingService(engagement.serviceCategory) && parsed.data.status !== "paid") return res.status(400).json({ message: "Request funding payments through the client's approved funding service orders." });
      const invoice = await storage.createInvoice({
        ...parsed.data,
        amount: invoiceAmount(parsed.data.amountCents, parsed.data.currency),
        stripeSessionId: null,
        stripeInvoiceId: null,
        paidAt: parsed.data.status === "paid" ? parsed.data.paidAt! : null,
      });
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  app.patch("/api/portal/invoices/:id", requireAdmin, async (req, res) => {
    try {
      const invoiceId = Number(req.params.id);
      if (!Number.isSafeInteger(invoiceId) || invoiceId < 1) return res.status(400).json({ message: "Invalid invoice id" });
      const existing = await storage.getInvoice(invoiceId);
      if (!existing) return res.status(404).json({ message: "Invoice not found" });
      const linked = await pool.query("SELECT id FROM funding_charges WHERE invoice_id=$1", [invoiceId]);
      if (linked.rowCount && Object.keys(req.body).some((key) => !["status", "paidAt"].includes(key))) return res.status(409).json({ message: "Approved funding charges cannot be repriced. Use the authorized service-order record." });
      const parsed = invoicePatchSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid invoice data", errors: parsed.error.flatten() });
      const merged = { ...existing, ...parsed.data };
      const paymentError = invoicePaymentError(merged, "admin");
      if (paymentError) return res.status(400).json({ message: paymentError });
      const invoice = await storage.updateInvoice(invoiceId, {
        ...parsed.data, amount: invoiceAmount(merged.amountCents, merged.currency),
        paidAt: merged.status === "paid" ? merged.paidAt : null,
      });
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Failed to update invoice" });
    }
  });

  app.post("/api/portal/invoices/:id/pay", requireRecordEngagement("SELECT engagement_id FROM invoices WHERE id=$1"), async (req, res) => {
    try {
      const invoice = await storage.getInvoice(Number(req.params.id));
      if (!invoice) return res.status(404).json({ message: "Invoice not found" });
      const engagement = await getAccessibleEngagement(req, res, invoice.engagementId);
      if (!engagement) return;
      if (invoice.status === "paid") return res.status(400).json({ message: "Invoice already paid" });
      if (invoice.status === "void") return res.status(400).json({ message: "This invoice is void and cannot be paid." });

      const stripe = await getUncachableStripeClient();
      const amountCents = invoice.amountCents || Math.round(parseFloat(invoice.amount.replace(/[^0-9.]/g, "")) * 100);

      const { session, paymentMethods } = await createCheckoutSession(stripe, {
        line_items: [{
          price_data: {
            currency: "cad",
            product_data: {
              name: `Invoice ${invoice.invoiceNumber}`,
              description: invoice.description || "Performance Processes Consulting",
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        }],
        mode: "payment",
        customer_email: (req as any).user?.email,
        success_url: `${req.headers.origin || req.protocol + "://" + req.get("host")}/portal/payments?payment=success&invoice=${invoice.id}`,
        cancel_url: `${req.headers.origin || req.protocol + "://" + req.get("host")}/portal/payments?payment=cancelled`,
        metadata: { invoiceId: String(invoice.id) },
      });

      await storage.updateInvoice(invoice.id, { stripeSessionId: session.id } as any);
      res.json({ url: session.url, paymentMethods });
    } catch (error) {
      console.error("Payment error:", error);
      res.status(500).json({ message: checkoutErrorMessage(error) });
    }
  });

  app.post("/api/portal/engagements/:engagementId/retainer/checkout", async (req, res) => {
    try {
      const engagement = await getAccessibleEngagement(req, res, req.params.engagementId);
      if (!engagement) return;
      if (isFundingService(engagement.serviceCategory)) return res.status(400).json({ message: "Funding services have no automatic recurring charges. Use approved service-order invoices." });
      if (!engagement.retainerAmountCents || engagement.retainerAmountCents < 1) {
        return res.status(400).json({ message: "No monthly retainer is configured for this engagement" });
      }
      if (engagement.retainerStatus === "paused") {
        return res.status(400).json({ message: "This retainer is currently paused. Please contact your consultant." });
      }
      const stripe = await getUncachableStripeClient();
      const origin = req.headers.origin || `${req.protocol}://${req.get("host")}`;
      const { session, paymentMethods } = await createCheckoutSession(stripe, {
        line_items: [{
          price_data: {
            currency: "cad",
            product_data: {
              name: engagement.retainerPlan || "Performance Processes monthly retainer",
              description: "Monthly Performance Processes support",
            },
            unit_amount: engagement.retainerAmountCents,
            recurring: { interval: engagement.retainerInterval || "month" },
          },
          quantity: 1,
        }],
        mode: "subscription",
        customer_email: (req as any).user?.email,
        success_url: `${origin}/portal/payments?payment=success&retainer=1`,
        cancel_url: `${origin}/portal/payments?payment=cancelled`,
        metadata: { type: "retainer", engagementId: String(engagement.id) },
        subscription_data: { metadata: { type: "retainer", engagementId: String(engagement.id) } },
      });
      await storage.updateEngagement(engagement.id, { retainerStatus: "checkout_pending" });
      res.json({ url: session.url, paymentMethods });
    } catch (error) {
      console.error("Retainer checkout error:", error);
      res.status(500).json({ message: checkoutErrorMessage(error) });
    }
  });

  app.get("/api/admin/billing", requireAdmin, async (_req, res) => {
    try {
      const charges = await db.select({ invoiceId: fundingChargeTable.invoiceId }).from(fundingChargeTable);
      res.json({
        engagements: await storage.getEngagements(),
        invoices: await storage.getAllInvoices(),
        fundingInvoiceIds: charges.map((charge) => charge.invoiceId),
      });
    } catch (error) {
      console.error("Admin billing error:", error);
      res.status(500).json({ message: "Failed to load billing workspace" });
    }
  });

  // Contracts
  app.get("/api/portal/engagements/:engagementId/contracts", async (req, res) => {
    try {
      const data = await storage.getContracts(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contracts" });
    }
  });

  const contractsDir = path.join(process.cwd(), "uploads", "contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }
  const contractStorage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, contractsDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  const contractUpload = multer({ storage: contractStorage, limits: { fileSize: 25 * 1024 * 1024 } });

  app.post("/api/portal/contracts", requireStaffOrAdmin, contractUpload.single("file"), requireBodyEngagement, async (req, res) => {
    try {
      const body = { ...req.body };
      if (req.file) {
        body.documentUrl = `/api/portal/contracts/file/${req.file.filename}`;
      }
      const parsed = insertContractSchema.safeParse(body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const contract = await storage.createContract({
        ...parsed.data,
        status: "pending",
        signedByUserId: null,
        signedByName: null,
        signedAt: null,
        signatureData: null,
      });
      res.status(201).json(contract);
    } catch (error) {
      res.status(500).json({ message: "Failed to create contract" });
    }
  });

  app.get("/api/portal/contracts/file/:filename", async (req: any, res) => {
    const filename = path.basename(String(req.params.filename));
    const filePath = path.join(contractsDir, filename);
    const result = await pool.query(`SELECT engagement_id FROM contracts WHERE document_url=$1`, [`/api/portal/contracts/file/${filename}`]);
    if (!result.rows[0]) return res.status(404).json({ message: "Contract not found" });
    const engagement = await getAccessibleEngagement(req, res, result.rows[0].engagement_id);
    if (!engagement) return;
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found" });
    res.sendFile(filePath);
  });

  app.post("/api/portal/contracts/:id/sign", requireRecordEngagement("SELECT engagement_id FROM contracts WHERE id=$1"), async (req, res) => {
    try {
      const user = (req as any).user;
      const contract = await storage.getContract(Number(req.params.id));
      if (!contract) return res.status(404).json({ message: "Contract not found" });
      if (user.role !== "client") return res.status(403).json({ message: "Only the client can sign this agreement." });
      if (contract.status === "signed") return res.status(400).json({ message: "Contract already signed" });

      const { signatureData } = req.body;
      if (!signatureData) return res.status(400).json({ message: "Signature is required" });

      const updated = await storage.updateContract(contract.id, {
        status: "signed",
        signedByUserId: user.id,
        signedByName: user.fullName,
        signedAt: new Date(),
        signatureData,
      } as any);

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to sign contract" });
    }
  });

  // Performance KPIs
  app.get("/api/portal/engagements/:engagementId/kpis", async (req, res) => {
    try {
      const data = await storage.getPerformanceKpis(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch KPIs" });
    }
  });

  app.post("/api/portal/kpis", requireStaffOrAdmin, requireBodyEngagement, async (req, res) => {
    try {
      const parsed = kpiWriteSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const engagement = (req as any).portalEngagement;
      const kpi = await storage.createPerformanceKpi({ ...parsed.data, category: engagement.serviceCategory || parsed.data.category });
      res.status(201).json(kpi);
    } catch (error) {
      res.status(500).json({ message: "Failed to create KPI" });
    }
  });

  app.patch("/api/portal/kpis/:id", requireStaffOrAdmin, requireRecordEngagement("SELECT engagement_id FROM performance_kpis WHERE id=$1"), async (req, res) => {
    try {
      const parsed = kpiPatchSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid reporting data", errors: parsed.error.flatten() });
      const kpi = await storage.updatePerformanceKpi(Number(req.params.id), parsed.data);
      res.json(kpi);
    } catch (error) {
      res.status(500).json({ message: "Failed to update KPI" });
    }
  });

  app.delete("/api/portal/kpis/:id", requireStaffOrAdmin, requireRecordEngagement("SELECT engagement_id FROM performance_kpis WHERE id=$1"), async (req, res) => {
    try {
      await storage.deletePerformanceKpi(Number(req.params.id));
      res.json({ message: "KPI deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete KPI" });
    }
  });

  app.get("/api/portal/leads", requireStaffOrAdmin, async (req: any, res) => {
    try {
      const user = req.user;
      if (user.role === "admin") {
        const allLeads = await storage.getLeads();
        res.json(allLeads);
      } else {
        const staffLeads = await storage.getLeadsForStaff(user.id);
        res.json(staffLeads);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.post("/api/portal/leads", requireAdmin, async (req: any, res) => {
    try {
      const lead = await storage.createLead({ ...req.body, createdById: req.user.id });
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  app.patch("/api/portal/leads/:id", requireStaffOrAdmin, async (req, res) => {
    try {
      const user = (req as any).user;
      const id = Number(req.params.id);
      if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ message: "Invalid lead id" });
      const current = await storage.getLead(id);
      if (!current) return res.status(404).json({ message: "Lead not found" });

      let updates = req.body;
      if ("acquisition" in (updates || {}) || "inquiryRequestId" in (updates || {})) return res.status(400).json({ message: "Enquiry consent and booking verification are read-only." });
      if (updates?.status === "meeting_booked" && current.acquisition?.bookingStatus !== "confirmed") return res.status(400).json({ message: "A meeting must be verified by Outlook before it can be marked booked." });
      if (user.role !== "admin") {
        if (current.assignedToId !== user.id) return res.status(403).json({ message: "This lead is not assigned to you." });
        const allowed = new Set(["status", "priority", "notes", "lastContactDate", "nextFollowUpDate"]);
        if (Object.keys(req.body || {}).some((key) => !allowed.has(key))) {
          return res.status(403).json({ message: "Staff can update only the lead status, priority, notes, and follow-up dates." });
        }
        updates = Object.fromEntries(Object.entries(req.body || {}).filter(([key]) => allowed.has(key)));
      }
      const lead = await storage.updateLead(id, updates);
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  app.delete("/api/portal/leads/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteLead(Number(req.params.id));
      res.json({ message: "Lead deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });

  app.get("/api/portal/staff-users", requireStaffOrAdmin, async (_req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const staffUsers = allUsers.filter(u => (u.role === "staff" || u.role === "admin") && u.status === "active");
      res.json(staffUsers.map(u => ({ id: u.id, fullName: u.fullName, email: u.email, role: u.role })));
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch staff users" });
    }
  });

  app.post("/api/assessment", async (req, res) => {
    try {
      const { firstName, email, organizationName, organizationType, roleTitle,
        totalScore, foundationScore, buildScore, runScore, scoreLabel, recommendedPath, answers } = req.body;
      if (!firstName || !email || typeof email !== 'string' || typeof firstName !== 'string') {
        return res.status(400).json({ message: "Name and email are required" });
      }
      const trimmedEmail = email.toLowerCase().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return res.status(400).json({ message: "Please provide a valid email address" });
      }
      if (typeof totalScore !== 'number' || typeof foundationScore !== 'number' ||
          typeof buildScore !== 'number' || typeof runScore !== 'number') {
        return res.status(400).json({ message: "Score data is required" });
      }

      const submission = await storage.createAssessmentSubmission({
        firstName: firstName.trim(),
        email: trimmedEmail,
        organizationName: organizationName?.trim() || null,
        organizationType: organizationType?.trim() || null,
        roleTitle: roleTitle?.trim() || null,
        totalScore,
        foundationScore,
        buildScore,
        runScore,
        scoreLabel: scoreLabel || 'Unknown',
        recommendedPath: recommendedPath || 'playbooks',
        answers: typeof answers === 'string' ? answers : JSON.stringify(answers || {}),
      });

      await db.execute(sql`
        INSERT INTO leads (company_name, contact_name, contact_email, source, status, service_interest, notes)
        VALUES (
          ${organizationName?.trim() || 'Not provided'},
          ${firstName.trim()},
          ${trimmedEmail},
          'growth-assessment',
          'new',
          ${recommendedPath === 'full-build' ? 'Full System Build' : recommendedPath === 'guided' ? 'Guided Implementation' : 'Playbooks'},
          ${'Score: ' + totalScore + '/100 (' + scoreLabel + ') | Foundation: ' + foundationScore + ' | Build: ' + buildScore + ' | Run: ' + runScore + (roleTitle ? ' | Role: ' + roleTitle : '') + (organizationType ? ' | Type: ' + organizationType : '')}
        )
      `);

      const { generateAssessmentPDF } = await import('./assessmentPdfGenerator');
      const pdfBuffer = await generateAssessmentPDF({
        firstName: firstName.trim(),
        email: trimmedEmail,
        organizationName: organizationName?.trim(),
        organizationType: organizationType?.trim(),
        roleTitle: roleTitle?.trim(),
        totalScore,
        foundationScore,
        buildScore,
        runScore,
        scoreLabel,
        recommendedPath,
        submittedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      });

      const { notifyContactForm } = await import('./emailNotifications');
      notifyContactForm({
        name: firstName.trim(),
        email: trimmedEmail,
        message: `New Growth Infrastructure Assessment completed:\n\nScore: ${totalScore}/100 (${scoreLabel})\nFoundation: ${foundationScore}% | Build: ${buildScore}% | Run: ${runScore}%\nRecommended Path: ${recommendedPath}\nOrganization: ${organizationName || 'Not provided'}\nType: ${organizationType || 'Not specified'}\nRole: ${roleTitle || 'Not specified'}\n\nPDF report attached separately.`
      }).catch(err => console.error("Assessment admin notification failed:", err));

      try {
        const { sendAssessmentConfirmation, sendAssessmentAdminPdf } = await import('./assessmentEmails');
        sendAssessmentConfirmation(trimmedEmail, firstName.trim(), totalScore, scoreLabel)
          .catch(err => console.error("Assessment confirmation email failed:", err));
        sendAssessmentAdminPdf(firstName.trim(), trimmedEmail, totalScore, scoreLabel, recommendedPath, pdfBuffer)
          .catch(err => console.error("Assessment admin PDF email failed:", err));
      } catch (err) {
        console.error("Assessment email module error:", err);
      }

      return res.status(201).json({ message: "Assessment submitted successfully", success: true, id: submission.id });
    } catch (error) {
      console.error("Assessment submission error:", error);
      return res.status(500).json({ message: "Failed to process assessment" });
    }
  });

  app.get("/api/admin/assessments", requireAdmin, async (_req, res) => {
    try {
      const submissions = await storage.getAssessmentSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  return httpServer;
}
