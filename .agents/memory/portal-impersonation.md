---
name: Admin account impersonation
description: Security boundaries for administrator access to a user's portal view.
---

Admin “log in as user” sessions are limited to active client and staff accounts. Never allow impersonating another admin or a suspended/pending account. Regenerate the session on entry and exit, validate the original admin remains active, record start/end in a persistent audit table, and clearly display the target and admin identity with a return action. Clear browser query caches when switching identities.

**Why:** the user requested that the portal administrator can enter user accounts; the capability must not silently become an authentication or role-bypass path.

**How to apply:** preserve these checks when extending account management, session handling, or impersonation visibility.
