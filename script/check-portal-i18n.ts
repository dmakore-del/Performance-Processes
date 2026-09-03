import { readFileSync } from "node:fs";
import { join } from "node:path";
import { portalCopy, translatePortal } from "../client/src/lib/portal-i18n";

const root = process.cwd();
const portalFiles = [
  "client/src/components/layout/PortalLayout.tsx",
  "client/src/pages/portal/Dashboard.tsx",
  "client/src/pages/portal/Roadmap.tsx",
  "client/src/pages/portal/Documents.tsx",
  "client/src/pages/portal/Meetings.tsx",
  "client/src/pages/portal/Actions.tsx",
  "client/src/pages/portal/Performance.tsx",
  "client/src/pages/portal/Messages.tsx",
  "client/src/pages/portal/Resources.tsx",
  "client/src/pages/portal/Billing.tsx",
  "client/src/pages/portal/AdminUsers.tsx",
  "client/src/pages/portal/AdminSubmissions.tsx",
  "client/src/pages/portal/AdminReceipts.tsx",
  "client/src/pages/portal/AdminBilling.tsx",
  "client/src/pages/portal/Leads.tsx",
] as const;

const routes: Record<string, { file: string; states: RegExp[] }> = {
  "/portal": { file: "client/src/pages/portal/Dashboard.tsx", states: [/Loading/, /Error|isError|onError/, /No Active Engagement/] },
  "/portal/roadmap": { file: "client/src/pages/portal/Roadmap.tsx", states: [/Loading/, /Error|isError|onError/, /No .*milestone/i] },
  "/portal/documents": { file: "client/src/pages/portal/Documents.tsx", states: [/Loading/, /Error|isError|onError/, /No .*document/i] },
  "/portal/meetings": { file: "client/src/pages/portal/Meetings.tsx", states: [/Loading/, /Error|isError|onError/, /No .*meeting/i] },
  "/portal/actions": { file: "client/src/pages/portal/Actions.tsx", states: [/Loading/, /Error|isError|onError/, /No .*action/i] },
  "/portal/performance": { file: "client/src/pages/portal/Performance.tsx", states: [/Loading/, /Error|isError|onError/, /No .*?(KPI|performance|metric)/i] },
  "/portal/messages": { file: "client/src/pages/portal/Messages.tsx", states: [/Loading/, /Error|isError|onError/, /No .*message/i] },
  "/portal/resources": { file: "client/src/pages/portal/Resources.tsx", states: [/Loading/, /Error|isError|onError/, /No .*resource/i] },
  "/portal/billing": { file: "client/src/pages/portal/Billing.tsx", states: [/Loading/, /Error|isError|onError/, /No .*invoice/i] },
  "/portal/admin/users": { file: "client/src/pages/portal/AdminUsers.tsx", states: [/Loading/, /Error|isError|onError/, /No .*user/i] },
  "/portal/admin/submissions": { file: "client/src/pages/portal/AdminSubmissions.tsx", states: [/Loading/, /Error|isError|onError/, /No .*submission/i] },
  "/portal/admin/receipts": { file: "client/src/pages/portal/AdminReceipts.tsx", states: [/Loading/, /Error|isError|onError/, /No .*receipt/i] },
  "/portal/admin/billing": { file: "client/src/pages/portal/AdminBilling.tsx", states: [/Loading/, /Error|isError|onError/, /No .*invoice/i] },
  "/portal/leads": { file: "client/src/pages/portal/Leads.tsx", states: [/Loading/, /Error|isError|onError/, /No .*lead/i] },
};

const failures: string[] = [];
const report = (message: string) => failures.push(message);
const read = (file: string) => readFileSync(join(root, file), "utf8");

const dictionarySource = read("client/src/lib/portal-i18n.ts");
const localeKeys = (locale: "en" | "fr") => {
  const start = dictionarySource.indexOf(`  ${locale}: {`);
  const end = locale === "en" ? dictionarySource.indexOf("  fr: {") : dictionarySource.indexOf("\n  },\n } as const");
  return new Set(
    [...dictionarySource.slice(start, end).matchAll(/^\s+"((?:[^"\\]|\\.)+)":/gm)].map((match) => match[1]),
  );
};

const englishKeys = localeKeys("en");
const frenchKeys = localeKeys("fr");
for (const key of englishKeys) if (!frenchKeys.has(key)) report(`French dictionary is missing "${key}".`);
for (const key of frenchKeys) if (!englishKeys.has(key)) report(`English dictionary is missing "${key}".`);
if (englishKeys.size === 0 || frenchKeys.size === 0) report("Could not read both portal dictionaries.");
if (translatePortal("fr", "Overview") !== portalCopy.fr.Overview) report("Shared translator does not return the French dictionary value.");
if (translatePortal("en", "Overview") !== portalCopy.en.Overview) report("Shared translator does not return the English dictionary value.");
if (translatePortal("fr", "__missing_portal_key__") !== "__missing_portal_key__") report("Shared translator fallback is not explicit for missing keys.");

for (const [route, entry] of Object.entries(routes)) {
  const source = read(entry.file);
  if (!source.includes("usePortalI18n")) report(`${route}: does not use the shared portal translator.`);
  if (!/\bt\(\s*["'`]/.test(source)) report(`${route}: has no translated UI copy call.`);
  for (const state of entry.states) {
    if (!state.test(source)) report(`${route}: required state marker ${state} is missing.`);
  }
}

for (const file of portalFiles) {
  const source = read(file);
  const lineNumber = (index: number) => source.slice(0, index).split("\n").length;
  for (const match of source.matchAll(/\bt\(\s*["']([^"']+)["']\s*\)/g)) {
    if (!englishKeys.has(match[1])) report(`${file}:${lineNumber(match.index ?? 0)}: "${match[1]}" is not in the portal dictionary.`);
  }

  // These attributes are user-facing even when the control is rendered in a
  // rarely visited dialog or loading/error branch.
  for (const match of source.matchAll(/\b(placeholder|title|aria-label)="([^"]*[A-Za-z][^"]*)"/g)) {
    const value = match[2];
    if (!["0", "1", "PDF", "INV-001"].includes(value) && !value.startsWith("data-")) {
      report(`${file}:${lineNumber(match.index ?? 0)}: hardcoded ${match[1]} "${value}" should use t(...).`);
    }
  }

  for (const match of source.matchAll(/toast\(\s*\{[\s\S]*?\b(title|description):\s*["']([^"']+)["']/g)) {
    report(`${file}:${lineNumber(match.index ?? 0)}: toast ${match[1]} "${match[2]}" should use t(...).`);
  }
}

const languageSource = read("client/src/hooks/use-language.tsx");
if (!languageSource.includes("setLanguage")) report("Language context does not expose setLanguage.");
if (!languageSource.includes("localStorage")) report("Language context does not persist the selected language.");
if (!languageSource.includes('saved === "fr"') && !languageSource.includes("saved === 'fr'")) {
  report("Language context does not explicitly support French.");
}

if (failures.length) {
  console.error(`Portal locale audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Portal locale audit passed: ${Object.keys(routes).length} routes, ${englishKeys.size} synchronized keys.`);
}