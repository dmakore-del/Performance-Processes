# replit.md

## Overview

Performance Processes is a professional business consulting firm website built as a full-stack TypeScript application. The site helps organizations bridge the gap between vision and execution by offering strategic consulting services. It includes a public-facing marketing site (Home, About, Services, Approach, Contact, Careers, News, Insights, Legal, Accessibility, Sitemap) and a client portal with dashboard, roadmap, documents, meetings, action tracking, performance metrics, messaging, resources, and billing pages. The site supports English/French bilingual content. The firm was founded in 2026, so all content is authentic with no fabricated testimonials, fake case studies, or inflated statistics.

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
  - `POST /api/sponsor-checkout` — creates Stripe checkout for pro-bono sponsorship tiers (supporter $150, champion $500, catalyst $1,500)
  - `POST /api/test-receipt` — dev-only: sends a test receipt email
- **Build**: Custom build script (`script/build.ts`) using esbuild for the server and Vite for the client. Production output goes to `dist/` with server as `dist/index.cjs` and client assets in `dist/public/`
- **Dev Server**: Vite dev server is integrated as middleware in Express during development (`server/vite.ts`), with HMR support. Production serves static files from `dist/public/`

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema**: Defined in `shared/schema.ts` (shared between client and server):
  - `users` table: `id` (UUID, auto-generated), `username`, `password`
  - `contact_submissions` table: `id` (serial), `name`, `email`, `message`, `read` (boolean), `created_at` (timestamp)
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Storage Layer**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class. This pattern allows swapping implementations if needed

### Key Design Decisions
1. **Shared schema directory** (`shared/`): The Drizzle schema and Zod validation schemas are shared between frontend and backend, ensuring type safety across the stack
2. **No authentication yet**: The `users` table exists in the schema but no auth routes or middleware are implemented. The portal pages exist as routes but lack access control
3. **Single-page app with server-side fallback**: All unmatched routes fall through to `index.html` for client-side routing
4. **Video backgrounds**: Hero sections use a background video (`/assets/videos/hero-bg.mp4`) with gradient overlays

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable. Uses `pg` (node-postgres) driver with `connect-pg-simple` for potential session storage
- **Microsoft Outlook Bookings**: External link for consultation scheduling (hardcoded URL to Outlook booking page)
- **Google Fonts**: Inter and Montserrat/Plus Jakarta Sans loaded via CDN
- **Replit-specific plugins**: 
  - `@replit/vite-plugin-runtime-error-modal` — runtime error overlay in development
  - `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` — development tools (conditionally loaded)
  - Custom `vite-plugin-meta-images` — updates OpenGraph meta tags with correct deployment URL
- **Stripe**: Payment processing via Replit Stripe connector. Products/prices synced to local DB via `stripe-replit-sync`. Supports one-time payments and monthly subscriptions
- **Email (SMTP)**: Nodemailer with SMTP credentials (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL) for sending PDF receipt emails on successful payment. Uses Microsoft 365/Outlook SMTP
- **PDF Generation**: PDFKit for generating branded receipt PDFs with company logo (`client/src/assets/logo.png`)
- **Receipt System**: On successful Stripe checkout (via webhook), generates a branded PDF receipt and emails it to the customer. Includes idempotency guard to prevent duplicate receipts on webhook retries. Test endpoint available in dev mode only (`POST /api/test-receipt`)
- **Services**: Outcome-based pricing framework with 6 service categories: Discovery Phase ($750–$1,500, mandatory first step), Strategic Engagement ($5,000–$15,000, 6–12 weeks), Systems & Implementation ($8,000–$25,000), Executive Advisory Retainer ($2,500–$7,500/month, 3-month minimum), Business Registration ($3,500–$8,500), and Website Building (from $1,200). Each has 2–5 pricing tiers with Stripe checkout integration
- **FAQ Chatbot**: Client-side keyword-matching chatbot (`client/src/components/Chatbot.tsx`) rendered globally via App.tsx. 20+ FAQ entries covering services, pricing, business registration, and contact info. Falls back to email link for unmatched queries