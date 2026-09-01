---
name: Stripe PayPal activation
description: Account-level PayPal availability and the intended checkout fallback behavior.
---

PayPal checkout is implemented through Stripe, but the connected Stripe account currently rejects PayPal because that payment method is not activated or eligible. Credit and debit card checkout remains available through the targeted fallback.

**Why:** Forcing PayPal while it is disabled causes Stripe to reject every Checkout Session, including otherwise valid card purchases.

**How to apply:** Keep the card-plus-PayPal first attempt and PayPal-specific card fallback. Treat PayPal activation as an external Stripe account setting, not a code defect; after activation, checkout will include PayPal without a code change.