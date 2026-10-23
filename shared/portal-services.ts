/** Public service names, delivery phases and optional reporting suggestions.
 * Templates are suggestions, never measured client results.
 */
export const PORTAL_SERVICES = [
  { id: "business-formation", name: "Business Formation", fr: "Création d’entreprise", phases: ["Business structure & name review", "Registration & incorporation", "Business number & records", "Handover"],
    kpis: [{ name: "Registration requirements completed", unit: "%", direction: "increase" }, { name: "Days to incorporation", unit: "days", direction: "decrease" }] },
  { id: "business-setup", name: "Business Setup", fr: "Mise en place d’entreprise", phases: ["Business readiness review", "Systems & administrative setup", "Workflow implementation", "Launch readiness"],
    kpis: [{ name: "Business systems implemented", unit: "systems", direction: "increase" }, { name: "Administrative time per week", unit: "hours", direction: "decrease" }] },
  { id: "consulting-advisory", name: "Business Consulting & Advisory", fr: "Conseil et accompagnement", phases: ["Business health check", "Recommendations & priorities", "Implementation support", "Results review"],
    kpis: [{ name: "Priority actions completed", unit: "%", direction: "increase" }, { name: "Monthly revenue", unit: "CAD", direction: "increase" }] },
  { id: "websites-digital", name: "Websites & Digital", fr: "Sites web et présence numérique", phases: ["Discovery & website requirements", "Design & content", "Development & integrations", "Testing & launch", "Post-launch review"],
    kpis: [{ name: "Monthly website enquiries", unit: "enquiries", direction: "increase" }, { name: "Website conversion rate", unit: "%", direction: "increase" }, { name: "Monthly website visitors", unit: "visitors", direction: "increase" }, { name: "Page load time", unit: "seconds", direction: "decrease" }] },
  { id: "grant-support", name: "Grant Research & Applications", fr: "Recherche de subventions et demandes", phases: ["Funding readiness assessment", "Opportunity research & eligibility", "Application & supporting documents", "Submission", "Funder follow-up"],
    kpis: [{ name: "Eligible funding opportunities identified", unit: "opportunities", direction: "increase" }, { name: "Grant applications submitted", unit: "applications", direction: "increase" }, { name: "Grant funding approved", unit: "CAD", direction: "increase" }] },
  { id: "financing-support", name: "Business Financing", fr: "Financement d’entreprise", phases: ["Financing assessment", "Lender fit & documentation", "Application preparation", "Submission & lender review", "Decision & next steps"],
    kpis: [{ name: "Financing applications submitted", unit: "applications", direction: "increase" }, { name: "Financing approved", unit: "CAD", direction: "increase" }, { name: "Financing readiness requirements completed", unit: "%", direction: "increase" }] },
  { id: "business-planning", name: "Business Plans & Financial Projections", fr: "Plans d’affaires et prévisions financières", phases: ["Business & financial discovery", "Business plan development", "Financial projections & cash flow", "Review & final delivery"],
    kpis: [{ name: "Plan deliverables completed", unit: "%", direction: "increase" }, { name: "Cash-flow forecast coverage", unit: "months", direction: "increase" }, { name: "Forecast variance", unit: "%", direction: "decrease" }] },
  { id: "ongoing-support", name: "Ongoing Business Support", fr: "Soutien continu aux entreprises", phases: ["Monthly priorities", "Delivery & advisory support", "Progress review", "Next-period planning"],
    kpis: [{ name: "Monthly support priorities completed", unit: "%", direction: "increase" }, { name: "Recurring tasks automated", unit: "tasks", direction: "increase" }] },
] as const;

export function getPortalService(category?: string | null) {
  return PORTAL_SERVICES.find(s => s.id === category);
}

export function serviceName(engagement: { serviceCategory?: string | null; engagementType: string }, language = "en") {
  const service = getPortalService(engagement.serviceCategory);
  return service ? (language === "fr" ? service.fr : service.name) : engagement.engagementType;
}

export function kpiChange(baseline: string | null | undefined, current: string, direction: string) {
  if (baseline == null || baseline.trim() === "" || current.trim() === "") return null;
  const before = Number(baseline), after = Number(current);
  if (!Number.isFinite(before) || !Number.isFinite(after)) return null;
  const difference = after - before;
  return { difference, improved: direction === "decrease" ? difference < 0 : difference > 0, percent: before === 0 ? null : difference / Math.abs(before) * 100 };
}
