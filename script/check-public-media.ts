/** Exclusive placements on active public routes. Brand logos are intentionally shared. */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
const placements = [
  ["Home", "attached_assets/stock_photography/advisory-team.jpg"],
  ["Home", "attached_assets/stock_photography/experienced-team.jpg"],
  ["Home", "attached_assets/stock_photography/financial-planning.jpg"],
  ["Home", "attached_assets/image_search/web-digital-6804068.jpg"],
  ["Start a Business", "attached_assets/image_search/web-digital-7876895.jpg"],
  ["Grow Your Business", "attached_assets/image_search/web-digital-7698712.jpg"],
  ["Grow Your Business", "client/public/assets/videos/team-collab.mp4"],
  ["Business Setup", "attached_assets/stock_photography/inclusive-team.jpg"],
  ["Websites & Digital", "attached_assets/stock_photography/digital-development.jpg"],
  ["Grants & Financing", "attached_assets/stock_photography/funding-analysis.jpg"],
  ["Grants & Financing poster", "attached_assets/stock_photography/strategy-meeting.jpg"],
  ["Grants & Financing", "client/public/assets/videos/performance-processes-showreel-v3.mp4"],
  ["Contact", "attached_assets/stock_photography/client-consultation.jpg"],
  ["Careers", "attached_assets/stock_photography/workshop.jpg"],
  ["Careers", "attached_assets/stock_photography/wheelchair-inclusive-team.jpg"],
  ["NextUp Partnership", "attached_assets/stock_images/consulting.jpg"],
] as const;
const hashes = new Map<string,string>();
for (const [page,path] of placements) {
  const digest = createHash("sha256").update(readFileSync(path)).digest("hex");
  assert.ok(!hashes.has(digest), `${page}: duplicate content already assigned to ${hashes.get(digest)}`);
  hashes.set(digest, `${page} (${path})`);
}
const home = readFileSync("client/src/pages/Home.tsx", "utf8");
assert.match(home, /\/media\/hero-services-2026-10\.mp4/);
for (const page of ["CampaignLanding", "LaunchService", "GrantsFinancing", "Contact", "OurWork", "PublicResources"]) {
  const source = readFileSync(`client/src/pages/${page}.tsx`, "utf8");
  assert.doesNotMatch(source, /muslim-businesswoman\.jpg|business-owner\.jpg|\/media\/hero-services-2026-10/, `${page} must not reuse rejected/monochrome/hero media`);
}
console.log(`Public media checks passed: ${placements.length} distinct local assets; homepage-only hero reel; no rejected image in active service journeys.`);
