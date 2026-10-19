import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { createServer } from "node:http";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { registerHeroMedia } from "./heroMedia";

test("public hero media supports ranges, HEAD, caching and a strict allowlist", async () => {
  const directory = await mkdtemp(join(tmpdir(), "hero-route-test-"));
  const app = express();
  let downloads = 0;
  registerHeroMedia(app, {
    cacheDirectory: directory,
    prewarm: false,
    download: async (name, destination) => {
      assert.equal(name, "public/hero-services-2026-10.mp4");
      downloads++;
      await writeFile(destination, "0123456789abcdef");
    },
  });
  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as { port: number };
  const url = `http://127.0.0.1:${address.port}/media/`;
  try {
    const range = await fetch(`${url}hero-services-2026-10.mp4`, { headers: { Range: "bytes=0-3" } });
    assert.equal(range.status, 206);
    assert.equal(range.headers.get("content-range"), "bytes 0-3/16");
    assert.equal(range.headers.get("content-type"), "video/mp4");
    assert.equal(await range.text(), "0123");
    const head = await fetch(`${url}hero-services-2026-10.mp4`, { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal(head.headers.get("content-length"), "16");
    assert.match(head.headers.get("cache-control")!, /immutable/);
    assert.equal(downloads, 1);
    assert.equal((await fetch(`${url}private-client-file.pdf`)).status, 404);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await rm(directory, { recursive: true, force: true });
  }
});

test("a storage failure returns 503 and can be retried", async () => {
  const directory = await mkdtemp(join(tmpdir(), "hero-retry-test-"));
  const app = express();
  let attempts = 0;
  registerHeroMedia(app, {
    cacheDirectory: directory,
    prewarm: false,
    download: async (_name, destination) => {
      if (++attempts === 1) throw new Error("temporary storage failure");
      await writeFile(destination, "video");
    },
  });
  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as { port: number };
  const url = `http://127.0.0.1:${address.port}/media/hero-services-2026-10.webm`;
  try {
    assert.equal((await fetch(url)).status, 503);
    const retried = await fetch(url);
    assert.equal(retried.status, 200);
    assert.equal(await retried.text(), "video");
    assert.equal(attempts, 2);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await rm(directory, { recursive: true, force: true });
  }
});
