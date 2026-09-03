---
name: Portal localization audit
description: Protected portal localization needs static checks in addition to dictionary parity.
---

The protected portal uses a shared translator that intentionally falls back to English for unknown keys. Release checks must therefore verify dictionary parity, literal translator keys, protected route coverage, and translated loading, empty, error, and mutation paths.

**Why:** A fallback keeps the UI functional while silently shipping untranslated French portal copy, and this project does not currently have a browser test runner.

**How to apply:** Extend the dependency-free portal locale audit when adding a protected route or a new user-facing state; keep server values and API payloads language-neutral.