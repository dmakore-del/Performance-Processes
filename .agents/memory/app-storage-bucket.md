---
name: App Storage bucket selection
description: Explicit bucket configuration when default-bucket discovery is unavailable.
---

Use an explicit App Storage bucket ID instead of relying on automatic default-bucket selection for this project.

**Why:** Default-bucket discovery continued to return an empty bucket name after the user confirmed creating a bucket. Repeating the same default lookup does not resolve missing configuration.

**How to apply:** Read the non-secret bucket identifier from shared configuration and pass it to the storage client. If unavailable, request the Bucket ID from App Storage Settings; do not request credentials or invent a bucket identifier.
