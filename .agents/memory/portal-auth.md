---
name: Portal authenticator verification
description: Version-sensitive authenticator semantics that affect portal security.
---

Treat otplib v13 verification as asynchronous and check the returned result's `valid` field explicitly.

**Why:** Unlike older boolean-style APIs, this version returns a Promise of a result object. Testing the Promise or object for truthiness can accept an invalid authentication code.

**How to apply:** When changing two-factor authentication or upgrading the dependency, verify both a valid code and an invalid six-digit code; keep full authentication pending until verification succeeds.
