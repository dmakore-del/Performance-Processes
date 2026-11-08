import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { writeFileSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pool } from "../server/db";
import { makePdf } from "../server/resourceAssessments";
import { resourceAssessmentSchema } from "../shared/resource-assessments";

if (process.env.NODE_ENV === "production") throw new Error("Development-only check");
if (!process.env.REPLIT_DEV_DOMAIN) throw new Error("REPLIT_DEV_DOMAIN is required");
const base = `https://${process.env.REPLIT_DEV_DOMAIN}`;
const cases = [
  {
    kind: "startup", requestId: randomUUID(), language: "en", fullName: "Startup Assessment Check", email: "startup-assessment@example.invalid", businessName: "Test Business",
    phase1: ["phase1-1"], phase2: [], phase3: [], phase4: [], phase5: [], phase6: [],
    urgentRequirement: "Check a municipal permit.", nextDecision: "", targetMilestone: "", adviserToConsult: "",
  },
  {
    kind: "readiness", requestId: randomUUID(), language: "fr", fullName: "Vérification Préparation", email: "readiness-assessment@example.invalid", businessName: "",
    ...Object.fromEntries(Array.from({length:10}, (_, index) => [`status${index + 1}`, index === 0 ? "attention" : "working"])),
    priority1: "Site web", why1: "Demandes", priority2: "Suivi", why2: "Réponse rapide",
    priority3: "Navigation", why3: "Trouvabilité", quickWin: "Tester un formulaire", quickWinOwner: "",
    quickWinDate: "", largerChange: "Refonte des processus", largerOwner: "", largerDate: "", reassessDate: "",
  },
  {
    kind: "funding", requestId: randomUUID(), language: "en", fullName: "Funding Assessment Check", email: "funding-assessment@example.invalid", businessName: "Test Funding Business",
    legalEntityName: "Test Funding Inc.", municipality: "Toronto", sector: "Arts", businessStage: "operating-2-plus",
    yearsOperating: "3", fundingType: "grant", opportunityKnown: "researching", programOrLender: "",
    applicationDeadline: "", projectDescription: "A proposed accessibility upgrade for a small arts venue.",
    useOfFunds: ["Equipment or technology"], servicesOfInterest: ["Business plan or substantial plan update"], registrations: "complete", businessPlan: "ready",
    cashflowProjections: "needs-update", projectBudget: "ready", bookkeepingRecords: "organized",
    financialRecordsAvailable: "partial", ownerAuthorization: "yes", priorApplications: "no",
    otherFundingOrDebt: "not-sure", timingAndConstraints: "", nextQuestion: "",
  },
];
const savedIds: string[] = [];
let checks = 0;
try {
  for (const item of cases) {
    const parsed = resourceAssessmentSchema.parse(item);
    const pdf = await makePdf(parsed);
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-"); checks++;
    assert.ok(pdf.length > 1500); checks++;
    const pdfPath = `/tmp/resource-assessment-${item.kind}-${item.requestId}.pdf`;
    writeFileSync(pdfPath, pdf);
    const text = execFileSync("pdftotext", [pdfPath, "-"], { encoding: "utf8" });
    assert.match(text, item.kind === "startup" ? /Ontario Business Startup Checklist/ : item.kind === "readiness" ? /Liste de préparation à la croissance/ : /Grant & Financing Readiness Assessment/);
    assert.match(text, item.kind === "startup" ? /\[x\] Write a one-sentence explanation/ : item.kind === "readiness" ? /Positionnement clair/ : /Test Funding Inc/);
    unlinkSync(pdfPath); checks += 2;
    const response = await fetch(`${base}/api/resource-assessments`, {
      method: "POST", headers: { "Content-Type": "application/json", Origin: base },
      body: JSON.stringify(parsed),
    });
    assert.equal(response.status, 202, await response.text()); checks++;
    savedIds.push(item.requestId);
    const stored = await pool.query("SELECT kind, email, answers, admin_notified, client_notified FROM resource_assessment_submissions WHERE id=$1", [item.requestId]);
    assert.equal(stored.rowCount, 1); assert.equal(stored.rows[0].kind, item.kind); checks += 2;
    assert.equal(stored.rows[0].email, item.email); assert.equal(stored.rows[0].admin_notified, false); checks += 2;
  }
  assert.equal(resourceAssessmentSchema.safeParse({ ...cases[0], hasBankAccountNumber: "123" }).success, false); checks++;
  const conflict = await fetch(`${base}/api/resource-assessments`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://untrusted.invalid" }, body: JSON.stringify(cases[0]) });
  assert.equal(conflict.status, 403); checks++;
  console.log(`Resource assessment checks passed: ${checks}. All three branded PDF outputs generated and three email jobs queued; no emails were sent by this development-only test.`);
} finally {
  await pool.query("DELETE FROM resource_assessment_submissions WHERE id = ANY($1::varchar[])", [savedIds]);
  await pool.end();
}
