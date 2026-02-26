# replit.md

## Overview

Performance Processes is a professional business consulting firm website built as a full-stack TypeScript application. Founded in 2026 by Danai Makore (contact@performanceprocesses.com). The site helps organizations bridge the gap between vision and execution by offering strategic consulting services. It includes a public-facing marketing site (Home, About, Services, Approach, Contact, Careers, News, Insights, Legal, Accessibility, Sitemap) and a fully functional client portal with dashboard, roadmap, documents, meetings, action tracking, performance metrics, messaging, resources, billing, and admin user management. The site supports English/French bilingual content. All content is authentic with no fabricated testimonials, fake case studies, or inflated statistics.

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
  - `POST /api/contact` — validates and stores contact form submissions
  - `POST /api/apply` — handles job applications with resume upload (multer)
  - `GET /api/stripe/key` — returns Stripe publishable key
  - `GET /api/products` — lists active Stripe products with prices
  - `POST /api/checkout` — creates Stripe checkout session (auto-detects one-time vs subscription)
  - `POST /api/stripe/webhook` — Stripe webhook (registered before express.json() for raw body)
  - `GET /api/news` — fetches live business news from Google News RSS feed (rss-parser)
  - `POST /api/sponsor-checkout` — creates Stripe checkout for pro-bono sponsorship tiers
  - `POST /api/test-receipt` — dev-only: sends a test receipt email
  - Auth routes: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `POST /api/auth/2fa/*`
  - Portal routes (behind `requireAuth`): GET/POST/PATCH/DELETE for engagements, milestones, documents, actions, meetings, messages, kpis, invoices, contracts, resources
  - Admin routes (behind `requireAdmin`): GET/PATCH for user management
- **Build**: Custom build script (`script/build.ts`) using esbuild for the server and Vite for the client. Production output goes to `dist/` with server as `dist/index.cjs` and client assets in `dist/public/`
- **Dev Server**: Vite dev server is integrated as middleware in Express during development (`server/vite.ts`), with HMR support. Production serves static files from `dist/public/`

### Authentication & Authorization
- **Auth System**: Passport.js with local strategy, bcryptjs for password hashing
- **Sessions**: express-session with connect-pg-simple for PostgreSQL session storage. `user_sessions` table created programmatically in `setupAuth`
- **2FA**: TOTP-based two-factor authentication using `otplib` (dynamic import). QR code generation via `qrcode` library
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
All portal pages use live API data via custom hooks:
- **Dashboard** (`/portal`): Engagement overview with stats
- **Roadmap** (`/portal/roadmap`): Milestones grouped by phase with progress tracking
- **Documents** (`/portal/documents`): Files grouped by folder with type icons
- **Actions** (`/portal/actions`): CRUD action tracker with status cycling, priority badges
- **Meetings** (`/portal/meetings`): Upcoming/completed meetings with scheduling dialog
- **Messages** (`/portal/messages`): Channel-based messaging with send functionality
- **Performance** (`/portal/performance`): KPI dashboard with visual charts
- **Resources** (`/portal/resources`): Resource library with category filtering
- **Billing** (`/portal/billing`): Invoices and contracts with status tracking
- **Admin Users** (`/portal/admin/users`): User management (admin-only) with approve/suspend/role changes

### Key Design Decisions
1. **Shared schema directory** (`shared/`): Drizzle schema and Zod validation schemas are shared between frontend and backend
2. **Role-based access control**: Three tiers (client, staff, admin) with middleware enforcement
3. **Staff approval workflow**: Staff accounts require admin approval before access
4. **Single-page app with server-side fallback**: All unmatched routes fall through to `index.html`
5. **Video backgrounds**: Hero sections use a background video with gradient overlays
6. **Portal data hooks**: `usePortalEngagement()` and `usePortalData()` in `client/src/hooks/use-portal.ts` for consistent data fetching

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL`. Uses `pg` driver with `connect-pg-simple` for session storage
- **Passport.js**: Authentication with local strategy
- **bcryptjs**: Password hashing
- **otplib**: TOTP 2FA (dynamic import required)
- **qrcode**: QR code generation for 2FA setup
- **Microsoft Outlook Bookings**: External link for consultation scheduling
- **Google Fonts**: Inter and Plus Jakarta Sans loaded via CDN
- **Stripe**: Payment processing via Replit Stripe connector with receipt emails
- **Email (SMTP)**: Nodemailer with Microsoft 365/Outlook SMTP for receipt emails
- **PDFKit**: Branded receipt PDF generation
- **FAQ Chatbot**: Client-side keyword-matching chatbot rendered globally
