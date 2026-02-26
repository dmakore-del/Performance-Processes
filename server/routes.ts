import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertEngagementSchema, insertMilestoneSchema, insertDocumentSchema, insertActionItemSchema, insertMeetingSchema, insertMessageSchema, insertResourceSchema, insertInvoiceSchema, insertContractSchema, insertPerformanceKpiSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { requireAuth } from "./auth";

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
      return res.status(201).json({ message: "Message sent successfully", id: submission.id });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ message: "Failed to send message" });
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

  // ==================== PORTAL API ROUTES ====================
  app.use("/api/portal", requireAuth);

  // Engagements
  app.get("/api/portal/engagements", async (_req, res) => {
    try {
      const data = await storage.getEngagements();
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

  app.post("/api/portal/engagements", async (req, res) => {
    try {
      const parsed = insertEngagementSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const engagement = await storage.createEngagement(parsed.data);
      res.status(201).json(engagement);
    } catch (error) {
      res.status(500).json({ message: "Failed to create engagement" });
    }
  });

  app.patch("/api/portal/engagements/:id", async (req, res) => {
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

  app.post("/api/portal/milestones", async (req, res) => {
    try {
      const parsed = insertMilestoneSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const milestone = await storage.createMilestone(parsed.data);
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({ message: "Failed to create milestone" });
    }
  });

  app.patch("/api/portal/milestones/:id", async (req, res) => {
    try {
      const milestone = await storage.updateMilestone(Number(req.params.id), req.body);
      res.json(milestone);
    } catch (error) {
      res.status(500).json({ message: "Failed to update milestone" });
    }
  });

  // Documents
  app.get("/api/portal/engagements/:engagementId/documents", async (req, res) => {
    try {
      const data = await storage.getDocuments(Number(req.params.engagementId));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.post("/api/portal/documents", async (req, res) => {
    try {
      const parsed = insertDocumentSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const document = await storage.createDocument(parsed.data);
      res.status(201).json(document);
    } catch (error) {
      res.status(500).json({ message: "Failed to create document" });
    }
  });

  app.delete("/api/portal/documents/:id", async (req, res) => {
    try {
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

  app.post("/api/portal/actions", async (req, res) => {
    try {
      const parsed = insertActionItemSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const item = await storage.createActionItem(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to create action item" });
    }
  });

  app.patch("/api/portal/actions/:id", async (req, res) => {
    try {
      const item = await storage.updateActionItem(Number(req.params.id), req.body);
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to update action item" });
    }
  });

  app.delete("/api/portal/actions/:id", async (req, res) => {
    try {
      await storage.deleteActionItem(Number(req.params.id));
      res.json({ message: "Action item deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete action item" });
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

  app.post("/api/portal/meetings", async (req, res) => {
    try {
      const parsed = insertMeetingSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const meeting = await storage.createMeeting(parsed.data);
      res.status(201).json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to create meeting" });
    }
  });

  app.patch("/api/portal/meetings/:id", async (req, res) => {
    try {
      const meeting = await storage.updateMeeting(Number(req.params.id), req.body);
      res.json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to update meeting" });
    }
  });

  // Messages
  app.get("/api/portal/engagements/:engagementId/messages", async (req, res) => {
    try {
      const channel = req.query.channel as string | undefined;
      const data = await storage.getMessages(Number(req.params.engagementId), channel);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/portal/messages", async (req, res) => {
    try {
      const parsed = insertMessageSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const message = await storage.createMessage(parsed.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Resources
  app.get("/api/portal/resources", async (_req, res) => {
    try {
      const data = await storage.getResources();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.post("/api/portal/resources", async (req, res) => {
    try {
      const parsed = insertResourceSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const resource = await storage.createResource(parsed.data);
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to create resource" });
    }
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

  app.post("/api/portal/invoices", async (req, res) => {
    try {
      const parsed = insertInvoiceSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const invoice = await storage.createInvoice(parsed.data);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  app.patch("/api/portal/invoices/:id", async (req, res) => {
    try {
      const invoice = await storage.updateInvoice(Number(req.params.id), req.body);
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Failed to update invoice" });
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

  app.post("/api/portal/contracts", async (req, res) => {
    try {
      const parsed = insertContractSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const contract = await storage.createContract(parsed.data);
      res.status(201).json(contract);
    } catch (error) {
      res.status(500).json({ message: "Failed to create contract" });
    }
  });

  app.patch("/api/portal/contracts/:id", async (req, res) => {
    try {
      const contract = await storage.updateContract(Number(req.params.id), req.body);
      res.json(contract);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contract" });
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

  app.post("/api/portal/kpis", async (req, res) => {
    try {
      const parsed = insertPerformanceKpiSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      const kpi = await storage.createPerformanceKpi(parsed.data);
      res.status(201).json(kpi);
    } catch (error) {
      res.status(500).json({ message: "Failed to create KPI" });
    }
  });

  app.patch("/api/portal/kpis/:id", async (req, res) => {
    try {
      const kpi = await storage.updatePerformanceKpi(Number(req.params.id), req.body);
      res.json(kpi);
    } catch (error) {
      res.status(500).json({ message: "Failed to update KPI" });
    }
  });

  // Seed endpoint - creates demo data for a new engagement
  app.post("/api/portal/seed", async (_req, res) => {
    try {
      const existing = await storage.getEngagements();
      if (existing.length > 0) {
        return res.json({ message: "Data already seeded", engagementId: existing[0].id });
      }

      const engagement = await storage.createEngagement({
        clientName: "Acme Corp",
        engagementType: "Strategic",
        startDate: "Sep 1, 2026",
        currentPhase: "Strategic Design",
        status: "active",
        completionPercent: 32,
        nextSession: "Strategy Review Session",
        nextSessionDate: "Oct 12, 2026",
      });

      const eid = engagement.id;

      await Promise.all([
        storage.createMilestone({ engagementId: eid, title: "Kickoff Meeting", phase: "Discovery & Assessment", status: "completed", owner: "Danai Makore", dueDate: "Sep 5, 2026", sortOrder: 1 }),
        storage.createMilestone({ engagementId: eid, title: "Stakeholder Interviews", phase: "Discovery & Assessment", status: "completed", owner: "Consulting Team", dueDate: "Sep 15, 2026", sortOrder: 2 }),
        storage.createMilestone({ engagementId: eid, title: "Current State Analysis", phase: "Discovery & Assessment", status: "completed", owner: "Consulting Team", dueDate: "Sep 22, 2026", sortOrder: 3 }),
        storage.createMilestone({ engagementId: eid, title: "Assessment Report Presentation", phase: "Discovery & Assessment", status: "completed", owner: "Joint Team", dueDate: "Sep 30, 2026", sortOrder: 4 }),
        storage.createMilestone({ engagementId: eid, title: "Vision & Mission Workshop", phase: "Strategic Design", status: "completed", owner: "Danai Makore", dueDate: "Oct 3, 2026", sortOrder: 5 }),
        storage.createMilestone({ engagementId: eid, title: "Strategic Objectives Draft", phase: "Strategic Design", status: "in-progress", owner: "Consulting Team", dueDate: "Oct 14, 2026", sortOrder: 6 }),
        storage.createMilestone({ engagementId: eid, title: "KPI Framework Design", phase: "Strategic Design", status: "pending", owner: "Consulting Team", dueDate: "Oct 25, 2026", sortOrder: 7 }),
        storage.createMilestone({ engagementId: eid, title: "Phase 2 Sign-off", phase: "Strategic Design", status: "pending", owner: "Client Sponsor", dueDate: "Oct 31, 2026", sortOrder: 8 }),
        storage.createMilestone({ engagementId: eid, title: "Action Plan Development", phase: "Implementation Planning", status: "pending", owner: "Consulting Team", dueDate: "Nov 10, 2026", sortOrder: 9 }),
        storage.createMilestone({ engagementId: eid, title: "Resource Allocation", phase: "Implementation Planning", status: "pending", owner: "Joint Team", dueDate: "Nov 20, 2026", sortOrder: 10 }),
        storage.createMilestone({ engagementId: eid, title: "Change Management Strategy", phase: "Implementation Planning", status: "pending", owner: "Danai Makore", dueDate: "Nov 30, 2026", sortOrder: 11 }),
      ]);

      await Promise.all([
        storage.createDocument({ engagementId: eid, name: "Client_Intake_Form.pdf", folder: "Discovery Phase", fileType: "pdf", size: "245 KB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Needs_Assessment_Summary.pdf", folder: "Discovery Phase", fileType: "pdf", size: "1.8 MB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Scope_Document.pdf", folder: "Discovery Phase", fileType: "pdf", size: "890 KB", version: "v1.2" }),
        storage.createDocument({ engagementId: eid, name: "Proposal_Roadmap.pdf", folder: "Discovery Phase", fileType: "pdf", size: "2.1 MB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Strategic_Plan_Draft.docx", folder: "Strategic Engagement", fileType: "doc", size: "1.1 MB", version: "v0.9" }),
        storage.createDocument({ engagementId: eid, name: "KPI_Framework_Template.xlsx", folder: "Strategic Engagement", fileType: "xls", size: "850 KB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Alignment_Maps.pdf", folder: "Strategic Engagement", fileType: "pdf", size: "3.2 MB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Session_Notes_Oct3.pdf", folder: "Strategic Engagement", fileType: "pdf", size: "420 KB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Governance_Framework_Template.docx", folder: "Systems & Implementation", fileType: "doc", size: "1.5 MB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Performance_System_Doc.pdf", folder: "Systems & Implementation", fileType: "pdf", size: "2.8 MB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Process_Maps.pdf", folder: "Systems & Implementation", fileType: "pdf", size: "4.1 MB", version: "v1.0" }),
        storage.createDocument({ engagementId: eid, name: "Implementation_Roadmap.xlsx", folder: "Systems & Implementation", fileType: "xls", size: "1.2 MB", version: "v1.0" }),
      ]);

      await Promise.all([
        storage.createActionItem({ engagementId: eid, task: "Provide Q2 Financial Reports", owner: "Client Team", dueDate: "Oct 10, 2026", status: "overdue", priority: "high" }),
        storage.createActionItem({ engagementId: eid, task: "Review Strategic Objectives Draft", owner: "John Doe", dueDate: "Oct 14, 2026", status: "pending", priority: "high" }),
        storage.createActionItem({ engagementId: eid, task: "Schedule Team Alignment Session", owner: "Danai Makore", dueDate: "Oct 15, 2026", status: "in-progress", priority: "medium" }),
        storage.createActionItem({ engagementId: eid, task: "Finalize Governance Template", owner: "Consulting Team", dueDate: "Oct 20, 2026", status: "pending", priority: "low" }),
        storage.createActionItem({ engagementId: eid, task: "Complete Stakeholder Interviews", owner: "Consulting Team", dueDate: "Oct 5, 2026", status: "completed", priority: "high" }),
        storage.createActionItem({ engagementId: eid, task: "Submit Budget Approval Form", owner: "John Doe", dueDate: "Oct 18, 2026", status: "pending", priority: "medium" }),
        storage.createActionItem({ engagementId: eid, task: "Prepare Department Metrics Summary", owner: "Client Team", dueDate: "Oct 12, 2026", status: "in-progress", priority: "high" }),
      ]);

      await Promise.all([
        storage.createMeeting({ engagementId: eid, title: "Strategy Review Session", meetingDate: "Oct 12, 2026", meetingTime: "10:00 AM - 11:30 AM EST", meetingType: "Zoom", meetingLink: "https://zoom.us/j/123456789", status: "upcoming", agendaItems: "Review strategic objectives draft\nDiscuss KPI framework approach\nAlign on Phase 2 timeline" }),
        storage.createMeeting({ engagementId: eid, title: "Executive Coaching: CEO", meetingDate: "Oct 14, 2026", meetingTime: "2:00 PM - 3:00 PM EST", meetingType: "Zoom", meetingLink: "https://zoom.us/j/987654321", status: "upcoming", agendaItems: "Leadership alignment discussion\nChange management preparation" }),
        storage.createMeeting({ engagementId: eid, title: "Vision & Mission Workshop", meetingDate: "Oct 5, 2026", meetingTime: "9:00 AM - 12:00 PM EST", duration: "3 hours", meetingType: "In-Person", status: "completed", notes: "Established core vision and mission statements. Identified key strategic pillars. All stakeholders aligned on direction." }),
        storage.createMeeting({ engagementId: eid, title: "Assessment Findings Presentation", meetingDate: "Oct 2, 2026", meetingTime: "10:00 AM - 11:30 AM EST", duration: "1.5 hours", meetingType: "Zoom", status: "completed", notes: "Presented organizational assessment findings. Key gaps identified in governance and performance management. Client approved moving to strategic design phase." }),
        storage.createMeeting({ engagementId: eid, title: "Project Kickoff", meetingDate: "Sep 15, 2026", meetingTime: "1:00 PM - 2:00 PM EST", duration: "1 hour", meetingType: "Zoom", status: "completed", notes: "Introduced project scope and timeline. Established communication protocols and key contacts. Signed off on engagement terms." }),
      ]);

      await Promise.all([
        storage.createMessage({ engagementId: eid, channel: "project", senderName: "Danai Makore", senderRole: "consultant", content: "Hi team, I've just uploaded the initial draft of the Strategic Objectives document to the Deliverables folder. Please review before our session tomorrow." }),
        storage.createMessage({ engagementId: eid, channel: "project", senderName: "John Doe", senderRole: "client", content: "Thanks Danai. I will take a look this afternoon and add my comments directly to the document." }),
        storage.createMessage({ engagementId: eid, channel: "project", senderName: "Danai Makore", senderRole: "consultant", content: "Perfect. I've also added the updated KPI framework template to the Strategic Engagement folder. Let me know if you have questions." }),
        storage.createMessage({ engagementId: eid, channel: "direct", senderName: "Danai Makore", senderRole: "consultant", content: "Looking forward to our meeting on Thursday. Please have the Q2 financials ready if possible." }),
      ]);

      await Promise.all([
        storage.createResource({ title: "Leadership Communication Guide", description: "A comprehensive guide for effective leadership communication strategies and frameworks for organizational alignment.", resourceType: "PDF Guide", category: "Leadership" }),
        storage.createResource({ title: "Effective 1-on-1s Framework", description: "Template and structured approach for productive one-on-one meetings between managers and direct reports.", resourceType: "Template", category: "Leadership" }),
        storage.createResource({ title: "KPI Development Worksheet", description: "Step-by-step worksheet for developing meaningful and measurable key performance indicators.", resourceType: "Template", category: "Performance" }),
        storage.createResource({ title: "Governance Framework Template", description: "Comprehensive governance structure template for organizational decision-making and accountability.", resourceType: "Template", category: "Governance" }),
        storage.createResource({ title: "Annual Planning Checklist", description: "Complete checklist for strategic annual planning including stakeholder engagement, goal setting, and resource allocation.", resourceType: "Checklist", category: "Strategy" }),
        storage.createResource({ title: "Strategy Execution Toolkit", description: "Tools and frameworks for translating strategic plans into executable operational initiatives.", resourceType: "Toolkit", category: "Strategy" }),
        storage.createResource({ title: "Change Management Playbook", description: "Best practices and step-by-step processes for managing organizational change effectively.", resourceType: "PDF Guide", category: "Change Management" }),
        storage.createResource({ title: "Strategic Planning Worksheet", description: "Structured worksheet for facilitating strategic planning sessions with leadership teams.", resourceType: "Template", category: "Strategy" }),
        storage.createResource({ title: "Implementation Checklist", description: "Comprehensive checklist for ensuring successful implementation of strategic initiatives.", resourceType: "Checklist", category: "Execution" }),
        storage.createResource({ title: "Performance Dashboard Guide", description: "Guide for building and maintaining effective performance dashboards and reporting systems.", resourceType: "PDF Guide", category: "Performance" }),
      ]);

      await Promise.all([
        storage.createInvoice({ engagementId: eid, invoiceNumber: "INV-2026-042", issueDate: "Oct 1, 2026", dueDate: "Oct 15, 2026", amount: "$5,000.00", status: "unpaid", description: "Strategic Design Phase - October" }),
        storage.createInvoice({ engagementId: eid, invoiceNumber: "INV-2026-028", issueDate: "Sep 1, 2026", dueDate: "Sep 15, 2026", amount: "$7,500.00", status: "paid", description: "Discovery & Assessment Phase" }),
        storage.createInvoice({ engagementId: eid, invoiceNumber: "INV-2026-015", issueDate: "Aug 15, 2026", dueDate: "Aug 30, 2026", amount: "$2,500.00", status: "paid", description: "Engagement Setup & Onboarding" }),
      ]);

      await Promise.all([
        storage.createContract({ engagementId: eid, title: "Master Services Agreement", documentDate: "Aug 15, 2026", status: "signed" }),
        storage.createContract({ engagementId: eid, title: "Statement of Work - Phase 2", documentDate: "Sep 28, 2026", status: "pending" }),
        storage.createContract({ engagementId: eid, title: "Non-Disclosure Agreement", documentDate: "Aug 10, 2026", status: "signed" }),
      ]);

      await Promise.all([
        storage.createPerformanceKpi({ engagementId: eid, name: "Employee Engagement Score", currentValue: "78%", targetValue: "85%", status: "needs-attention", period: "Q3 2026", category: "People" }),
        storage.createPerformanceKpi({ engagementId: eid, name: "Operational Efficiency", currentValue: "92%", targetValue: "90%", status: "on-track", period: "Q3 2026", category: "Operations" }),
        storage.createPerformanceKpi({ engagementId: eid, name: "Leadership Bench Strength", currentValue: "65%", targetValue: "80%", status: "at-risk", period: "Q3 2026", category: "People" }),
        storage.createPerformanceKpi({ engagementId: eid, name: "Strategy Execution Rate", currentValue: "88%", targetValue: "95%", status: "on-track", period: "Q3 2026", category: "Strategy" }),
        storage.createPerformanceKpi({ engagementId: eid, name: "Customer Satisfaction Index", currentValue: "91%", targetValue: "90%", status: "on-track", period: "Q3 2026", category: "Customer" }),
        storage.createPerformanceKpi({ engagementId: eid, name: "Revenue Growth Rate", currentValue: "12%", targetValue: "15%", status: "needs-attention", period: "Q3 2026", category: "Financial" }),
      ]);

      res.status(201).json({ message: "Demo data seeded successfully", engagementId: eid });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ message: "Failed to seed data" });
    }
  });

  return httpServer;
}
