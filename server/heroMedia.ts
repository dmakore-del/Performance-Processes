import type { Express } from "express";
import { Client } from "@replit/object-storage";
import { mkdir, rename, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

// Only these public, versioned films can be served. Never expose bucket paths
// supplied by visitors: the bucket may also contain private client documents.
const HERO_FILES = new Set([
  "hero-services-2026-10.mp4",
  "hero-services-2026-10.webm",
]);

type Downloader = (objectName: string, destination: string) => Promise<void>;

export function registerHeroMedia(
  app: Express,
  options: { download?: Downloader; cacheDirectory?: string; prewarm?: boolean } = {},
) {
  let client: Client | undefined;
  const download: Downloader = options.download ?? (async (objectName, destination) => {
    const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
    if (!bucketId) throw new Error("Public hero storage bucket is not configured");
    client ??= new Client({ bucketId });
    const result = await client.downloadToFilename(objectName, destination);
    if (!result.ok) throw new Error("Public hero download failed");
  });
  const cacheDirectory = options.cacheDirectory ?? join(tmpdir(), "performance-processes-hero");
  const downloads = new Map<string, Promise<string>>();

  function localFile(filename: string): Promise<string> {
    const existing = downloads.get(filename);
    if (existing) return existing;
    const pending = (async () => {
      await mkdir(cacheDirectory, { recursive: true });
      const destination = join(cacheDirectory, filename);
      const partial = `${destination}.part`;
      try {
        await download(`public/${filename}`, partial);
        await rename(partial, destination);
        return destination;
      } catch (error) {
        await rm(partial, { force: true });
        throw error;
      }
    })().catch((error) => {
      downloads.delete(filename);
      throw error;
    });
    downloads.set(filename, pending);
    return pending;
  }

  app.get("/media/:filename", async (req, res, next) => {
    const filename = req.params.filename;
    if (!HERO_FILES.has(filename)) {
      return res.status(404).end();
    }
    try {
      const path = await localFile(filename);
      // sendFile supplies byte-range, HEAD and conditional-request support.
      res.setHeader("X-Content-Type-Options", "nosniff");
      return res.sendFile(path, {
        maxAge: "1y",
        immutable: true,
        dotfiles: "deny",
      }, (error) => {
        if (!error) return;
        downloads.delete(filename);
        next(error);
      });
    } catch {
      console.error("Public hero video is unavailable from App Storage");
      return res.status(503).setHeader("Retry-After", "30").end();
    }
  });

  if (options.prewarm !== false) {
    HERO_FILES.forEach((filename) => {
      void localFile(filename).catch(() => {
        console.error(`Could not prewarm public hero video: ${filename}`);
      });
    });
  }
}
