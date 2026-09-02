---
name: Session table schema guard
description: Why the authentication session table must remain visible to Drizzle schema management.
---

# Session table schema guard

The PostgreSQL table used by `connect-pg-simple` must be included in the Drizzle schema even though authentication creates it at startup.

**Why:** Drizzle treats tables absent from the schema as candidates for removal. A schema push can therefore present a destructive drop for the live session table and invalidate active logins.

**How to apply:** When changing the database schema, keep the session table definition aligned with the startup DDL and never force a push that proposes deleting it.