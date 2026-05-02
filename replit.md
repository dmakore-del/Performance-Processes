# replit.md

## Overview

Performance Processes is a professional management consulting firm website built as a full-stack TypeScript application. Founded in 2023 by Danai Makore (contact@performanceprocesses.com). The site helps organizations bridge the gap between vision and execution by offering management consulting services across four pillars: enterprise solutions (including HR & People Strategy, Recruitment Process Design, and Leadership & Talent Development), small business advisory (including People Operations Setup and Recruitment & Hiring Support), professional development (including Leadership & People Management Coaching and Interview & Career Readiness), and self-serve tools (including Hiring & People Management Toolkit). It includes a public-facing marketing site (Home, About, Services, Approach, Playbooks, Contact, Careers, News, Insights, Legal, Accessibility, Sitemap, Women's Performance Grant) and a fully functional client portal with dashboard, roadmap, documents, meetings, action tracking, performance metrics, messaging, resources, billing, leads tracker, and admin user management. The site supports English/French bilingual content. All content is authentic with no fabricated testimonials, fake case studies, or inflated statistics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side router) — not React Router
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin), with CSS variables for theming (navy/blue/pink accent palette inspired by BDC)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives. Components live in `client/src/components/ui/`. The component config is in `components.json` with aliases mapping `@/` to `client/src/`
- **State Management**: TanStack React Query for server state. No global client state library — local React state is used
- **Fonts**: Inter (body) and Plus Jakarta Sans (headings) via Google Fonts
- **Internationalization**: Custom `useLanguage` hook with a React Context provider supporting English and French translations stored in a simple key-value object
- **Path aliases**: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`

### Backend
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via `tsx` in development
- **API Structure**: RESTful API with routes registered in `server/routes.ts`. Endpoints:
  - `POST /api/contact` — validates and stores contact form submissions; sends Outlook notification to admin
  - `POST /api/apply` — handles job applications with resume upload (multer); sends Outlook notification to admin
  - `GET /api/stripe/key` — returns Stripe publishable key
  - `GET /api/products` — lists active Stripe products with prices
  - `POST /api/checkout` — creates Stripe checkout session (auto-detects one-time vs subscription)
  - `POST /api/cart-checkout` — creates Stripe checkout session for multi-item playbook cart (validates priceId belongs to playbook category, enforces quantity bounds 1-10)
  - `POST /api/stripe/webhook` — Stripe webhook (registered before express.json() for raw body); sends payment notification to admin via Outlook
  - `GET /api/news` — fetches live business news from Google News RSS feed (rss-parser)
  - `POST /api/sponsor-checkout` — creates Stripe checkout for pro-bono sponsorship tiers
  - `POST /api/test-receipt` — dev-only: sends a test receipt email
  - Auth routes: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `POST /api/auth/2fa/*`
  - Portal routes (behind `requireAuth`): GET/POST/PATCH/DELETE for engagements, milestones, documents, actions, meetings, messages, kpis, invoices, contracts, resources
  - Leads routes (behind `requireStaffOrAdmin`): GET/POST/PATCH/DELETE for leads, GET staff-users for assignment
  - Admin routes (behind `requireAdmin`): GET/PATCH for user management
- **Build**: Custom build script (`script/build.ts`) using esbuild for the server and Vite for the client. Production output goes to `dist/` with server as `dist/index.cjs` and client assets in `dist/public/`
- **Dev Server**: Vite dev server is integrated as middleware in Express during development (`server/vite.ts`), with HMR support. Production serves static files from `dist/public/`

### Authentication & Authorization
- **Email Nurture System**: Automated lead nurture funnel:
  - `server/leadNurtureEmails.ts` — All outbound email templates (audit checklist delivery w/ PDF attachment, nurture sequence emails 2-4, contact confirmation, grant confirmation, job application confirmation, subscriber welcome)
  - `server/emailScheduler.ts` — DB-backed scheduled email processor (checks every 5 min); `scheduleNurtureSequence()` queues 3 follow-up emails over 6 days after audit checklist download
  - `POST /api/subscribe` — Newsletter subscription endpoint; saves to `subscribers` table, sends welcome email, notifies admin
  - `POST /api/audit-checklist` — Now sends checklist PDF attachment to lead + schedules nurture emails 2-4
  - `POST /api/contact` — Now sends confirmation email to submitter
  - `POST /api/grant-applications` — Now sends confirmation email to applicant (fixed broken `server/email.ts` import)
  - `POST /api/apply` — Now sends confirmation email to applicant
  - DB tables: `subscribers` (email, source, status), `scheduled_emails` (recipient, type, step, subject, status, send_at, sent_at)

- **Auth System**: Passport.js with local strategy, bcryptjs for password hashing
- **Sessions**: express-session with connect-pg-simple for PostgreSQL session storage. `user_sessions` table created programmatically in `setupAuth`
- **2FA**: Removed — no 2FA setup or verification in login/register flows
- **Account Types**: Three roles — `client` (default, active on registration), `staff` (pending_approval on registration, requires admin approval), `admin` (seeded)
- **Account Status**: `active`, `pending_approval`, `suspended`. Login blocked for non-active accounts
- **Admin Seed**: Danai Makore (contact@performanceprocesses.com, PPAdmin2026!) seeded on startup via `server/seedAdmin.ts`
- **Middleware**: `requireAuth` for all portal routes, `requireAdmin` for admin-only routes

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema**: Defined in `shared/schema.ts` (shared between client and server):
  - `users` table: id (UUID), email, fullName, companyName, password, role, status, twoFactorSecret, twoFactorEnabled, createdAt
  - `user_sessions` table: created programmatically for connect-pg-simple
  - `contact_submissions` table: id (serial), name, email, message, read, created_at
  - Portal tables: engagements, milestones, documents, action_items, meetings, messages, performance_kpis, invoices, contracts, resources
  - Stripe tables: stripe_products, stripe_prices, stripe_customers, stripe_subscriptions, stripe_payment_intents
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Storage Layer**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class

### Portal Pages
All portal pages use live API data via custom hooks (`usePortalEngagement`, `usePortalData` in `client/src/hooks/use-portal.ts`):
- **Dashboard** (`/portal`): Engagement overview with stats; staff/admin see client name prominently; role-aware empty states; staff/admin can edit project status, phase, and completion percentage
- **Roadmap** (`/portal/roadmap`): Milestones grouped by phase with progress tracking; staff/admin can add, edit, and cycle milestone statuses
- **Documents** (`/portal/documents`): Files grouped by folder with type icons, real upload/download
- **Actions** (`/portal/actions`): CRUD action tracker with status cycling, priority badges; staff/admin can create/edit/delete
- **Meetings** (`/portal/meetings`): Synced with MS Bookings calendar via Outlook integration; "Schedule a Meeting" links to MS Bookings page
- **Messages** (`/portal/messages`): Private messaging between engagement participants
- **Performance** (`/portal/performance`): KPI dashboard with visual charts; staff/admin can add/delete KPIs
- **Resources** (`/portal/resources`): Resource library with category filtering, PDF upload, content display, external links; "Request a Resource" opens a contact form; improved content display in detail dialog
- **Billing** (`/portal/billing`): Invoices (Stripe payment) and contracts (canvas signature); staff/admin can create & send invoices; staff/admin can upload agreement documents (PDF/DOC) with contract creation
- **Admin Users** (`/portal/admin/users`): User management (admin-only) with approve/suspend/role changes and engagement creation
- **Admin Submissions** (`/portal/admin/submissions`): Filterable table views for Contact Submissions, Job Applications, and Grant Applications with search functionality

### Role-Based Portal Experience
- **Client sidebar**: Dashboard, Roadmap & Milestones, Deliverables & Docs, Meeting Hub, Action Tracker, Performance, Messages, Resource Library, Billing & Contracts
- **Staff sidebar**: Dashboard, Milestones, Documents, Meeting Hub, Action Items, KPIs & Metrics, Client Messages, Resources, Billing & Contracts — with engagement/client switcher dropdown
- **Admin sidebar**: Same as staff + User Management tab + Submissions tab
- **Engagement switcher**: Staff and admin see a client selector in the sidebar to switch between assigned engagements; state managed via `EngagementProvider` (React Context in `use-portal.ts`)
- The `usePortalEngagement` hook supports selecting a specific engagement; defaults to first engagement if none selected

### Solutions & Value Ladder
4-tier value ladder: Playbooks (Tier 1, self-paced frameworks via Stripe) → Training Programs (Tier 2, structured learning $99–$10,000) → Guided Implementation (Tier 3, consultant-led sprints) → Full System Build (Tier 4, end-to-end engagement). Routes redirect: /consulting, /recruiting, /marketing, /services all → /solutions.

### SEO
- **Per-page SEO**: `client/src/components/SEOHead.tsx` component dynamically sets `<title>`, `<meta description>`, `<canonical>`, Open Graph, and Twitter Card tags per page
- **Structured data**: JSON-LD in `client/index.html` — ManagementConsulting schema (business info, services catalog, founder, location) + WebSite schema with SearchAction
- **Sitemap**: `client/public/sitemap.xml` with all 12 public pages, priorities, and change frequencies
- **Robots.txt**: `client/public/robots.txt` — allows all crawlers, blocks `/portal/` and `/api/`, references sitemap
- **Geo-targeting**: Toronto, Ontario, Canada meta tags for local SEO
- **Keywords**: Management consulting, leadership development, organizational consulting, process optimization, etc.

### Key Design Decisions
1. **Shared schema directory** (`shared/`): Drizzle schema and Zod validation schemas are shared between frontend and backend
2. **Role-based access control**: Three tiers (client, staff, admin) with middleware enforcement
3. **Staff approval workflow**: Staff accounts require admin approval before access
4. **Engagement-centric architecture**: Admin assigns clients to staff via engagements; staff manage their assigned clients' milestones, actions, KPIs, etc.
5. **Single-page app with server-side fallback**: All unmatched routes fall through to `index.html`
6. **EY-inspired editorial heroes**: Hero sections use generated images with split layout (background + right-side panel + accent bar), replacing video backgrounds
7. **Portal data hooks**: `usePortalEngagement()` and `usePortalData()` in `client/src/hooks/use-portal.ts` for consistent data fetching

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL`. Uses `pg` driver with `connect-pg-simple` for session storage
- **Passport.js**: Authentication with local strategy
- **bcryptjs**: Password hashing
- **otplib**: TOTP 2FA (dynamic import required)
- **qrcode**: QR code generation for 2FA setup
- **Microsoft Outlook/Graph**: Outlook Replit integration (`server/outlook.ts`) for MS Bookings calendar sync via Microsoft Graph API; also external link for consultation scheduling
- **Google Fonts**: Inter and Plus Jakarta Sans loaded via CDN
- **Stripe**: Payment processing via Replit Stripe connector with receipt emails
- **Email (SMTP)**: Nodemailer with Microsoft 365/Outlook SMTP for receipt emails
- **PDFKit**: Branded receipt PDF generation and playbook content PDF delivery
- **Playbook Delivery**: `server/playbookDelivery.ts` — generates branded playbook content PDFs (cover page, table of contents, sections with tips/action items, CTA page) and sends delivery email with PDF attachments on purchase. Triggered by `checkout.session.completed` webhook when `session.metadata.source === 'playbooks'`. Uses product metadata (`category: 'playbook'`) for robust detection. Separate deduplication from receipt emails to allow independent retry on failure.
- **Assessment PDF**: `server/assessmentPdfGenerator.ts` — generates branded Growth Infrastructure Assessment results PDFs with score breakdowns and recommendations
- **Assessment Emails**: `server/assessmentEmails.ts` — sends confirmation to user and PDF report to admin on assessment completion
- **FAQ Chatbot**: Client-side keyword-matching chatbot rendered globally

### Public Pages
- **Home** (`/`): Marketing homepage with hero, system components, phases, transformation, ways to work with us (4 tiers: Playbooks, Training, Guided Implementation, Full System Build), playbooks, insights, CTA
- **Solutions** (`/solutions`): Growth Infrastructure System overview with 5 system components, 4-tier value ladder, 4 "Ways to Work With Us" tier cards (Playbooks, Training Programs, Guided Implementation, Full System Build), 3-phase delivery detail, flagship offer, audience segmentation
- **Playbooks** (`/playbooks`): Purchasable system frameworks with Stripe checkout, flagship editions, bundles, and training cross-sell
- **Training** (`/training`): System implementation training programs page with Foundation/Build/Run categories, 5 featured programs, audience segmentation, format options, and value ladder positioning
- **Assessment** (`/assessment`): Growth Infrastructure Assessment with 19 multi-step questions across Foundation/Build/Run categories, scoring logic, email capture, results page with CTA mapping, lead storage, admin PDF notification
- **About** (`/about`), **Approach** (`/approach`), **Contact** (`/contact`), **Careers** (`/careers`), **News** (`/news`), **Insights** (`/insights`), **Services** (`/services`), **Solutions** (`/solutions`), **Playbooks** (`/playbooks`), **Training** (`/training`), **Assessment** (`/assessment`), **NextUp Partnership** (`/nextup-partnership`), **Legal** (`/legal`), **Accessibility** (`/accessibility`), **Sitemap** (`/sitemap`)
