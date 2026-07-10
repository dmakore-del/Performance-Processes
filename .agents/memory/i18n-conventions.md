---
name: EN/FR i18n conventions
description: How bilingual content is structured on this site and the non-negotiable translation rules.
---

- Pattern: each public page holds a local `CONTENT = { en: {...}, fr: {...} }` object and reads `CONTENT[language]` from `useLanguage()`; catalog data is localized centrally in `shared/offers.ts` via `localizeOffer`/`getLocalized*` helpers with per-field EN fallback.
- **Why:** the site has no i18n library; keeping FR beside EN in the same file prevents drift and the fallback avoids blank UI when a translation is missing.
- **How to apply:** when adding any public page/section or new offer, add both EN and FR at the same time (Canadian French, vouvoiement, commas not em-dashes).
- Hard rules: client testimonial quotes stay verbatim English (authenticity, never fabricate/translate quotes; FR shows « Témoignages présentés dans leur langue d'origine »); SEOHead/JSON-LD stay English (single-language canonical URLs); Stripe checkout requests send only `offer.id`, never translated strings.
