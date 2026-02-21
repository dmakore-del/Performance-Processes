# replit.md

## Overview

Performance Processes is a professional business consulting firm website built as a full-stack TypeScript application. The site helps organizations bridge the gap between vision and execution by offering strategic consulting services. It includes a public-facing marketing site (Home, About, Services, Approach, Contact, Careers, Legal, Accessibility, Sitemap) and a client portal with dashboard, roadmap, documents, meetings, action tracking, performance metrics, messaging, resources, and billing pages. The site supports English/French bilingual content.

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
- **API Structure**: RESTful API with routes registered in `server/routes.ts`. Currently one endpoint:
  - `POST /api/contact` — validates and stores contact form submissions
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
- **No external API services**: No third-party APIs (Stripe, OpenAI, etc.) are currently active, though dependencies exist in package.json for potential future use