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
- Baked-in media: the old hero background video had **pink network nodes burned in**; the homepage hero now uses a generated navy still (`client/src/assets/generated/hero-bgis.png`). The warm-toned clips (`hero-bg.mp4`, `hero-background.mp4`, `team-collab.mp4`, `cta-speaker.mp4`) were **deleted** in June 2026. The only videos left in `client/public/assets/videos/` are generated navy/azure abstract loops: `systems-network.mp4` (glowing node network — used in Home unified-offer 4/3 + About hero) and `navy-particles.mp4` (blue particle streaks — used in Home + About closing CTA backgrounds). To add new video, generate navy/azure abstract clips, not warm footage.
- Accent-on-white contrast is ~4.58:1 (passes AA normal text but with little margin) — keep accent text bold/large.
