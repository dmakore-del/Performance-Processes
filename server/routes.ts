import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertEngagementSchema, insertMilestoneSchema, insertDocumentSchema, insertActionItemSchema, insertMeetingSchema, insertMessageSchema, insertResourceSchema, insertInvoiceSchema, insertContractSchema, insertPerformanceKpiSchema, insertGrantApplicationSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { requireAuth, requireAdmin } from "./auth";

const uploadsDir = path.join(process.cwd(), "uploads", "resumes");
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
  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid form data", errors: parsed.error.flatten() });
      }
      const submission = await storage.createContactSubmission(parsed.data);

      const { notifyContactForm } = await import('./emailNotifications');
      notifyContactForm({ name: parsed.data.name, email: parsed.data.email, message: parsed.data.message }).catch(err => console.error("Contact notification failed:", err));

      const { sendContactConfirmation } = await import('./leadNurtureEmails');
      sendContactConfirmation(parsed.data.email, parsed.data.name).catch(err => console.error("Contact confirmation email failed:", err));

      return res.status(201).json({ message: "Message sent successfully", id: submission.id });
    } catch (error) {
      console.error("Contact form error:", error);
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

      const stripe = await getUncachableStripeClient();

      const price = await stripe.prices.retrieve(priceId);
      const isRecurring = !!price.recurring;

      const baseUrl = process.env.REPLIT_DOMAINS
        ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
        : `${req.protocol}://${req.get('host')}`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: isRecurring ? 'subscription' : 'payment',
        success_url: `${baseUrl}/services?payment=success`,
        cancel_url: `${baseUrl}/services?payment=cancelled`,
        metadata: {
          serviceName: serviceName || '',
        },
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Checkout error:", error);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  app.get("/api/news", async (_req, res) => {
    try {
      const Parser = (await import("rss-parser")).default;
      const parser = new Parser({
        customFields: {
          item: [['media:content', 'media']],
        },
      });
      const feed = await parser.parseURL(
        "https://news.google.com/rss/search?q=business+consulting+management+strategy&hl=en-CA&gl=CA&ceid=CA:en"
      );
      const articles = (feed.items || []).slice(0, 20).map((item: any) => ({
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        source: item.creator || item.source?.name || "",
        snippet: item.contentSnippet || item.content || "",
      }));
      res.json({ articles });
    } catch (error) {
      console.error("News fetch error:", error);
      res.status(500).json({ message: "Failed to fetch news", articles: [] });
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

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
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

      res.json({ url: session.url });
    } catch (error) {
      console.error("Sponsor checkout error:", error);
      res.status(500).json({ message: "Failed to create sponsorship checkout" });
    }
  });

  app.post("/api/test-receipt", async (req, res) => {
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

  app.patch("/api/admin/users/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!["active", "pending_approval", "suspended"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const user = await storage.updateUser(req.params.id, { status });
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
      const user = await storage.updateUser(req.params.id, { role });
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

  app.post("/api/grant-applications", async (req, res) => {
    try {
      const parsed = insertGrantApplicationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid application data", errors: parsed.error.errors });
      }
      const application = await storage.createGrantApplication(parsed.data);

      try {
        const { notifyContactForm } = await import('./emailNotifications');
        await notifyContactForm({
          name: parsed.data.fullName,
          email: parsed.data.email,
          message: `[WOMEN'S PERFORMANCE GRANT APPLICATION]\n\nFocus Area: ${parsed.data.focusArea}\nOccupation: ${parsed.data.occupation}\nIndustry: ${parsed.data.industry}\nCity: ${parsed.data.city}, ${parsed.data.province}\nYears Experience: ${parsed.data.yearsExperience}\nGoals: ${parsed.data.goals}\nChallenges: ${parsed.data.challenges}\n\nLog in to the admin portal to review the full application.`
        });
      } catch (emailErr) {
        console.error("Grant notification email failed:", emailErr);
      }

      try {
        const { sendGrantConfirmation } = await import('./leadNurtureEmails');
        await sendGrantConfirmation(parsed.data.email, parsed.data.fullName, parsed.data.focusArea);
      } catch (confirmErr) {
        console.error("Grant confirmation email failed:", confirmErr);
      }

      res.status(201).json(application);
    } catch (error) {
      console.error("Grant application error:", error);
      res.status(500).json({ message: "Failed to submit grant application" });
    }
  });

  app.get("/api/admin/grant-applications", requireAdmin, async (_req, res) => {
    try {
      const applications = await storage.getGrantApplications();
      res.json(applications);
    } catch (error) {
      console.error("Admin grant applications error:", error);
      res.status(500).json({ message: "Failed to fetch grant applications" });
    }
  });

  app.patch("/api/admin/grant-applications/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status || !["new", "reviewing", "shortlisted", "accepted", "declined"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const application = await storage.updateGrantApplicationStatus(id, status);
      res.json(application);
    } catch (error) {
      console.error("Grant status update error:", error);
      res.status(500).json({ message: "Failed to update grant application status" });
    }
  });

  // ==================== PORTAL API ROUTES ====================
  app.use("/api/portal", requireAuth);

  const requireStaffOrAdmin = (req: any, res: any, next: any) => {
    const user = req.user as any;
    if (!user || (user.role !== "staff" && user.role !== "admin")) {
      return res.status(403).json({ message: "Staff or admin access required" });
    }
    next();
  };

  // Engagements - filtered by user role
  app.get("/api/portal/engagements", async (req, res) => {
    try {
      const user = req.user as any;
      const data = await storage.getEngagementsForUser(user.id, user.role);
      res.json(data);
    } catch (error) {
      console.error("Engagements error:", error);
      res.status(500).json({ message: "Failed to fetch engagements" });
    }
  });

  app.get("/api/portal/engagements/:id", async (req, res) => {
    try {
      const engagement = await storage.getEngagement(Number(req.params.id));
      if (!engagement) return res.status(404).json({ message: "Engagement not found" });
      res.json(engagement);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch engagement" });
    }
  });

  app.get("/api/portal/engagements/:id/participants", async (req, res) => {
    try {
      const engagement = await storage.getEngagement(Number(req.params.id));
      if (!engagement) return res.status(404).json({ message: "Engagement not found" });
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
      const parsed = insertEngagementSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const engagement = await storage.createEngagement(parsed.data);
      res.status(201).json(engagement);
    } catch (error) {
      res.status(500).json({ message: "Failed to create engagement" });
    }
  });

  app.patch("/api/portal/engagements/:id", requireStaffOrAdmin, async (req, res) => {
    try {
      const engagement = await storage.updateEngagement(Number(req.params.id), req.body);
      res.json(engagement);
    } catch (error) {
      res.status(500).json({ message: "Failed to update engagement" });
    }
  });

  // Milestones
  app.get("/api/portal/engagements/:engagementId/milestones", async (req, res) => {
    try {
      const data = await storage.getMilestones(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch milestones" });
    }
  });

  app.post("/api/portal/milestones", requireStaffOrAdmin, async (req, res) => {
    try {
      const parsed = insertMilestoneSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const milestone = await storage.createMilestone(parsed.data);
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({ message: "Failed to create milestone" });
    }
  });

  app.patch("/api/portal/milestones/:id", requireStaffOrAdmin, async (req, res) => {
    try {
      const milestone = await storage.updateMilestone(Number(req.params.id), req.body);
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

  app.post("/api/portal/documents/upload", documentUpload.single("file"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "File is required" });
      const user = req.user as any;
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

  app.get("/api/portal/documents/:id/download", async (req, res) => {
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

  app.delete("/api/portal/documents/:id", async (req, res) => {
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

  app.post("/api/portal/actions", requireStaffOrAdmin, async (req, res) => {
    try {
      const parsed = insertActionItemSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const item = await storage.createActionItem(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to create action item" });
    }
  });

  app.patch("/api/portal/actions/:id", requireStaffOrAdmin, async (req, res) => {
    try {
      const item = await storage.updateActionItem(Number(req.params.id), req.body);
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to update action item" });
    }
  });

  app.delete("/api/portal/actions/:id", requireStaffOrAdmin, async (req, res) => {
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

  app.post("/api/portal/meetings", requireStaffOrAdmin, async (req, res) => {
    try {
      const parsed = insertMeetingSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const meeting = await storage.createMeeting(parsed.data);
      res.status(201).json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to create meeting" });
    }
  });

  app.patch("/api/portal/meetings/:id", requireStaffOrAdmin, async (req, res) => {
    try {
      const meeting = await storage.updateMeeting(Number(req.params.id), req.body);
      res.json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to update meeting" });
    }
  });

  // Messages - private between sender and recipient
  app.get("/api/portal/engagements/:engagementId/messages", async (req, res) => {
    try {
      const user = req.user as any;
      const data = await storage.getMessages(Number(req.params.engagementId), user.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/portal/messages", async (req, res) => {
    try {
      const user = req.user as any;
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
  app.get("/api/portal/engagements/:engagementId/invoices", async (req, res) => {
    try {
      const data = await storage.getInvoices(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.post("/api/portal/invoices", requireStaffOrAdmin, async (req, res) => {
    try {
      const parsed = insertInvoiceSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const invoice = await storage.createInvoice(parsed.data);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  app.patch("/api/portal/invoices/:id", requireAdmin, async (req, res) => {
    try {
      const invoice = await storage.updateInvoice(Number(req.params.id), req.body);
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Failed to update invoice" });
    }
  });

  app.post("/api/portal/invoices/:id/pay", async (req, res) => {
    try {
      const invoice = await storage.getInvoice(Number(req.params.id));
      if (!invoice) return res.status(404).json({ message: "Invoice not found" });
      if (invoice.status === "paid") return res.status(400).json({ message: "Invoice already paid" });

      const stripe = await getUncachableStripeClient();
      const amountCents = invoice.amountCents || Math.round(parseFloat(invoice.amount.replace(/[^0-9.]/g, "")) * 100);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
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
        success_url: `${req.headers.origin || req.protocol + "://" + req.get("host")}/portal/billing?payment=success&invoice=${invoice.id}`,
        cancel_url: `${req.headers.origin || req.protocol + "://" + req.get("host")}/portal/billing?payment=cancelled`,
        metadata: { invoiceId: String(invoice.id) },
      });

      await storage.updateInvoice(invoice.id, { stripeSessionId: session.id } as any);
      res.json({ url: session.url });
    } catch (error) {
      console.error("Payment error:", error);
      res.status(500).json({ message: "Failed to create payment session" });
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

  app.post("/api/portal/contracts", requireStaffOrAdmin, contractUpload.single("file"), async (req, res) => {
    try {
      const body = { ...req.body };
      if (req.file) {
        body.documentUrl = `/api/portal/contracts/file/${req.file.filename}`;
      }
      const parsed = insertContractSchema.safeParse(body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const contract = await storage.createContract(parsed.data);
      res.status(201).json(contract);
    } catch (error) {
      res.status(500).json({ message: "Failed to create contract" });
    }
  });

  app.get("/api/portal/contracts/file/:filename", requireAuth, (req, res) => {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(contractsDir, filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found" });
    res.sendFile(filePath);
  });

  app.post("/api/portal/contracts/:id/sign", async (req, res) => {
    try {
      const user = req.user as any;
      const contract = await storage.getContract(Number(req.params.id));
      if (!contract) return res.status(404).json({ message: "Contract not found" });
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

  app.post("/api/portal/kpis", requireStaffOrAdmin, async (req, res) => {
    try {
      const parsed = insertPerformanceKpiSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const kpi = await storage.createPerformanceKpi(parsed.data);
      res.status(201).json(kpi);
    } catch (error) {
      res.status(500).json({ message: "Failed to create KPI" });
    }
  });

  app.patch("/api/portal/kpis/:id", requireStaffOrAdmin, async (req, res) => {
    try {
      const kpi = await storage.updatePerformanceKpi(Number(req.params.id), req.body);
      res.json(kpi);
    } catch (error) {
      res.status(500).json({ message: "Failed to update KPI" });
    }
  });

  app.delete("/api/portal/kpis/:id", requireStaffOrAdmin, async (req, res) => {
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
      const lead = await storage.updateLead(Number(req.params.id), req.body);
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
      const staffUsers = allUsers.filter(u => u.role === "staff" || u.role === "admin");
      res.json(staffUsers.map(u => ({ id: u.id, fullName: u.fullName, email: u.email, role: u.role })));
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch staff users" });
    }
  });

  // Stripe webhook for payment confirmation
  app.post("/api/stripe/webhook/invoice-paid", async (req, res) => {
    try {
      const { type, data } = req.body;
      if (type === "checkout.session.completed" && data?.object?.metadata?.invoiceId) {
        const invoiceId = Number(data.object.metadata.invoiceId);
        await storage.updateInvoice(invoiceId, {
          status: "paid",
          paidAt: new Date(),
        } as any);
      }
      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ message: "Webhook processing failed" });
    }
  });

  return httpServer;
}
