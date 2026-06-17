---
name: Brand palette & pink→blue migration
description: How the navy+blue brand palette is wired and where stray colors hide
---

# Brand palette (navy + blue, from logo)

The palette is **token-driven** in `client/src/index.css` `:root`: `--primary` (logo navy), `--accent` (logo blue `218 85% 54%`), `--ring`, plus background/border/muted. Changing `--accent` recolors almost the whole site because components use `bg-accent`/`text-accent`/`hover:bg-accent`.

**Why:** The site was rebranded off an old navy+**pink** palette. The single highest-impact lever is the `--accent` token.

**How to apply — where tokens DON'T reach (check these when changing brand color):**
- Hardcoded `rgba(...)` radial-gradient glows in page files (`Home`, `Solutions`, `About`, `Consulting`, `Marketing`, `Recruiting`) and `components/layout/PortalLayout.tsx`. The old pink appeared as **two different** values: `rgba(236,72,153,...)` AND `rgba(236,72,121,...)` — grep for `236,7` not just one. Blue equivalent used: `rgba(42,110,240,...)`.
- Tailwind literal classes like `pink-50/100/600`, `ring-pink-200` → use `blue-*`.
- Baked-in media: the old hero background video (`client/public/assets/videos/hero-bg.mp4`) had **pink network nodes burned in**. As of the June 2026 BGIS redesign the homepage hero no longer uses that video — it uses a generated navy still (`client/src/assets/generated/hero-bgis.png`). The pink video file still exists but is unused on Home; if reused elsewhere it must be masked (navy `mix-blend-color` overlay).
- Accent-on-white contrast is ~4.58:1 (passes AA normal text but with little margin) — keep accent text bold/large.
