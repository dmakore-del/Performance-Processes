# replit.md

## Overview

Performance Processes is a website-and-systems firm for small and emerging businesses, built as a full-stack TypeScript application. Founded in 2023 by Danai Makore (contact@performanceprocesses.com). The site is positioned around business outcomes: the homepage leads with "We Help Small Businesses Build Systems That Scale" and surfaces four buyable headline packages — Growth System ($2,500), Operations System ($5,000), Team Performance System ($3,500), and Ongoing Performance Support ($750/mo) — which live as the `packages` category at the top of `shared/offers.ts`. Beneath the packages, the site sells productized services across six categories — Website Services, Marketing Services, CRM and Lead Tracking, Business Systems and Playbooks, Training and Implementation Support, and Ongoing Growth Support — plus four "Popular Packages" bundles. The full catalog lives in `shared/offers.ts` and is rendered on `/services` (headline packages section first, then narrative + categories + bundles + pricing on each card). The homepage also has a "How We Help" 4-step section (Assess · Build · Implement & Automate · Measure & Improve) and a Headline Packages section. A `/results` page presents case studies/testimonials as clearly-labelled "coming soon" placeholders — no fabricated testimonials. The main nav is Home · Solutions (dropdown to package/service categories) · Results · About · Book a Strategy Call. Every productized offer can be paid for on-site by credit card, debit, or PayPal via Stripe Checkout (`POST /api/instant-checkout`, `payment_method_types` omitted so Stripe auto-enables all enabled methods from the dashboard). Range-priced offers route to `/contact` for a quote. The Growth Infrastructure System (Talent Acquisition, People & Performance, Demand Generation, Conversion, Execution) is positioned as the strategic framework underneath the productized services. The site includes a public marketing site, a fully functional client portal (dashboard, roadmap, documents, meetings, actions, KPIs, messaging, resources, billing, leads, admin), and bilingual EN/FR content. The dedicated `/pricing`, `/playbooks`, `/training`, and `/assessment` pages were retired in May 2026 — those routes now redirect to `/services` or `/contact` so existing inbound links don't break. All content is authentic with no fabricated testimonials.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side router) — not React Router
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin), with CSS variables for theming. Brand palette is **black & white with a restrained soft blush pink accent** (from the logo). In June 2026 the site was reverted from the navy+azure scheme to this monochrome+pink direction, and the accent was later **lightened to a soft blush pink (`--accent: 345 58% 62%`, `--ring` matches)** for a more refined high-end feel: `--primary` is near-black (`0 0% 9%`), `--background` white, `--foreground` near-black. The accent is used **sparingly** (active nav state, primary CTA, single highlighted heading words, hovers, faint glows). Palette is token-driven in `client/src/index.css`; changing `--accent` recolors the accent usages across the whole site. **In June 2026 the earlier grayscale/black-and-white media treatment was reversed (user feedback: the site felt "dull"):** the global `<video> { filter: grayscale }` base rule was removed and all `grayscale` classes were dropped, so photos and videos now render in **full vibrant colour**. The near-black/white text palette and restrained blush accent stay, but imagery is colourful and there is more of it. (See `.agents/memory/brand-palette.md` for stray-color gotchas, the blush AA-contrast caveat, and the mobile-safe video-autoplay convention.)
- **Icons**: Decorative icons were removed site-wide (June 2026) for a minimalist high-end look — there is **no `lucide-react` usage outside `client/src/components/ui/*`**. Decorative bullets/markers were replaced with typographic treatment (em-dash `—` list markers, `+`/rotate FAQ toggles, thin `bg-accent` rules, text "Show/Hide" password toggles, "Remove" text buttons). Only functional affordances inside shadcn `ui/*` primitives were kept (dialog close, select/dropdown chevrons, checkbox tick, calendar nav, toast close). Prefer typographic markers over icons when adding new UI.
- **Hero/section media**: The Home hero is now a **vibrant colour photo** (`attached_assets/generated/hero-color.png`, a diverse team in a bright modern office) rather than the old grayscale atrium video; the Home capabilities and packages sections carry colour images (`team-collab-color.png`, `workspace-color.png`), the full-bleed image band uses a colourful sunset skyscraper (`city-aerial-new.png`), and the closing CTA still uses an autoplaying video (`navy-particles.mp4`, now in colour). Other sections/pages still use autoplaying background videos in `client/public/assets/videos/` (e.g. About hero = `architecture-rise.mp4`, CTAs = `navy-particles.mp4`). Every `<video>` carries mobile/production-safe autoplay attributes: `autoPlay muted loop playsInline preload="auto"` plus the lowercase `webkit-playsinline` attr (applied via JSX spread, since React drops unknown camelCase attrs) so videos autoplay on phones/tablets/laptops in production.
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives. Components live in `client/src/components/ui/`. The component config is in `components.json` with aliases mapping `@/` to `client/src/`
- **State Management**: TanStack React Query for server state. No global client state library — local React state is used
- **Fonts**: A **delicate, high-end serif** direction (June 2026) — **Cormorant Garamond** for all headings/display (`--font-heading`, weights 300–600 + italics) and **Inter** for body/labels, via Google Fonts. Headings use `font-medium` (not bold); `.text-display` = Cormorant 500 (letter-spacing -0.005em, line-height 1.02) and `.text-display-italic` = Cormorant italic 400 (used for the single blush accent word per headline). The earlier Plus Jakarta Sans / Montserrat heading fonts were dropped.
- **Punctuation convention**: Prose uses **commas, not em-dashes** (`—`) as separators (user preference, June 2026). Decorative list bullets use a middot `·` (not em-dash). Avoid introducing ` — ` separators in copy; em-dashes remain only in code comments.
- **Logo**: The site logo (`client/src/assets/logo.png`) is the original **pink** brand mark — a pink hexagonal shield with three upward arrows above a black serif "PERFORMANCE PROCESSES" wordmark, on a white background. (It was restored in June 2026, replacing the navy+blue wordmark.) All placements import `@/assets/logo.png`, so the file is the single source of truth. The favicon (`client/public/favicon.png`) is still the older "PP" monogram and may be refreshed to match the pink mark later.
- **Visual Language**: In June 2026 the site was moved to a **BGIS (bgis.com) inspired corporate aesthetic** — flat surfaces with sharp/square corners (global `--radius` reduced to ~2px; `.bdc-card`/`.bdc-btn-primary` and homepage cards/buttons squared, heavy shadows removed), a plain **uppercase nav** (no pill backgrounds), and a restrained **full-bleed photographic hero** (a generated navy-toned city-skyline still at `client/src/assets/generated/hero-bgis.png`, NOT the old looping video) with a calm semibold heading and BGIS-style **pipe-bullet callout links** down the left. The BGIS layout/structure stays, but the palette was reverted (June 2026) to a near-black/white scheme **with a restrained pink accent**. Media was originally grayscaled, but that was later reversed (June 2026) so all photos/videos now render in **full colour** (see Styling note above). Earlier (May 2026) the homepage used an Omnicom-style editorial/video hero with a rotating verb; that was replaced by the BGIS hero. Key new utilities in `client/src/index.css`: `.text-display` and `.text-display-italic` (oversized tight Plus Jakarta Sans), `animate-word-rotate` (vertical word ticker), `animate-marquee-slow` / `animate-marquee-reverse` (continuous capability ticker), `.grain-overlay` (subtle SVG film grain), `.line-clip` + `animate-line-rise` (line-by-line headline reveal), `.numeral-outline` (outline step numerals), `.marquee-dot` (separator dot for marquee items). In June 2026 the homepage was slimmed to **6 sections** under a "Quiet Authority" direction (delicate Cormorant serif, blush used ~once/twice per page) and given **vibrant colour imagery** (after the site read as "dull"): (1) full-bleed **colour photo hero** (`hero-color.png`, serif headline, one blush italic word — the tacky "Growth Infrastructure Studio" eyebrow was removed), (2) manifesto type-block with 3 pillars, (3) **Capabilities** as a scannable hairline-divided list of 5 with a colour image in the intro column (Websites, Marketing Systems, CRM & Lead Tracking, Business Systems, People & Recruiting — each links to `/services#cat-*`), (4) full-bleed colour image band, (5) buyable **Packages** (`getOffersByCategory("packages")` + `OfferCard`) with a colour image beside the intro, (6) 4-step process, then a calm full-bleed closing CTA video (`navy-particles.mp4`). REMOVED from the old layout: trusted-by strip, fabricated stats, dark before/after, redundant phases, and the unified-offer video section. The Footer's fabricated "Our Partners" marquee was also removed. Inner pages keep the prior visual language for now.
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
  - `POST /api/checkout` — creates Stripe checkout session from a Stripe priceId (auto-detects one-time vs subscription)
  - `POST /api/instant-checkout` — creates a Stripe checkout session on-the-fly from the productized offer catalog in `shared/offers.ts` (validates `offerId`, supports `mode: 'team'` for per-person training, builds `price_data` with CAD currency, recurring monthly for support retainers). Used by the `/services` and `/pricing` pages so every productized offer is buyable without needing pre-created Stripe products. `payment_method_types` is intentionally omitted so Stripe Checkout auto-enables card, debit, PayPal, Apple Pay, and Google Pay based on dashboard configuration.
  - `POST /api/cart-checkout` — creates Stripe checkout session for multi-item playbook cart (validates priceId belongs to playbook category, enforces quantity bounds 1-10)
  - `POST /api/stripe/webhook` — Stripe webhook (registered before express.json() for raw body); sends payment notification to admin via Outlook
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
- **Google Fonts**: Cormorant Garamond (headings/display) and Inter (body) loaded via CDN
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
- **About** (`/about`), **Approach** (`/approach`), **Contact** (`/contact`), **Careers** (`/careers`), **Services** (`/services`), **Solutions** (`/solutions`), **Playbooks** (`/playbooks`), **Training** (`/training`), **Assessment** (`/assessment`), **NextUp Partnership** (`/nextup-partnership`), **Legal** (`/legal`), **Accessibility** (`/accessibility`), **Sitemap** (`/sitemap`)
