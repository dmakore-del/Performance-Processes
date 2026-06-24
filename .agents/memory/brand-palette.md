---
name: Brand palette & color migrations
description: How the brand palette is wired and where stray colors hide when recoloring
---

# Brand palette (currently: black & white + restrained pink accent)

The palette is **token-driven** in `client/src/index.css` `:root`: `--primary` (near-black `0 0% 9%`), `--background` white, `--foreground` near-black, `--accent` (logo pink `336 72% 48%`), `--ring`, plus secondary/muted/border grays. Changing `--accent` recolors almost every accent usage because components use `bg-accent`/`text-accent`/`hover:bg-accent` (~589 usages).

**Why:** The brand has flip-flopped: original navy+**pink** → migrated to navy+**azure blue** → (June 2026) reverted to **black & white with pink accent**, with the original **pink logo** restored at `client/src/assets/logo.png`. The single highest-impact lever is the `--accent` token plus `--primary`/`--background`/`--foreground`.

**How to apply — where tokens DON'T reach (check these whenever changing brand color):**
- Hardcoded `rgba(...)` radial-gradient glows in page files (`Home`, `Solutions`, `About`, `Consulting`, `Marketing`, `Recruiting`) and `components/layout/PortalLayout.tsx`. Historic values to grep for: old pink `rgba(236,72,153,...)` AND `rgba(236,72,121,...)` (two variants — grep `236,7`); azure `rgba(42,110,240,...)`; current pink glow `rgba(214,30,110,...)`.
- Tailwind **literal** color classes bypass tokens entirely. The azure era used `blue-*` and some `purple-*` (50/100/200/400/500/600/700/900) across portal pages + Solutions value-ladder gradients; these were bulk-converted to neutral `zinc-*` (kept B&W) via a `perl -pi` shade map. When recoloring, grep `(blue|purple|pink)-[0-9]` and `zinc-[0-9]` and decide neutral-vs-accent per spot — do NOT blanket-convert to pink or pink becomes too prominent.
- **To keep the site reading truly black-and-white:** all `<video>` are grayscaled via a global base-layer rule (`video { filter: grayscale(1); }`), and prominent hero/section `<img>` carry a `grayscale` class (Home hero/capability/phase imgs, About hero img). The hero still is `client/src/assets/generated/hero-bgis.png` (a navy skyline) — it only reads B&W because of that grayscale class. The two background videos (`systems-network.mp4`, `navy-particles.mp4`) are navy/azure source but appear monochrome via the global rule.
- **Keep pink restrained:** the request was "pink accent that isn't too prominent." Pink should appear only via the `--accent` token usages (active nav, primary CTA, one highlighted heading word per section, hovers, faint glows). Do not give pink to large filled surfaces or portal status badges — those stay black/gray.
- Accent-on-white contrast for pink `336 72% 48%` is ~4.7:1 (passes AA for normal text, thin margin) — keep accent text bold/large.
- The favicon (`client/public/favicon.png`) is a leftover "PP" monogram, not yet matched to the pink logo.
