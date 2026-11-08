import type { Express } from "express";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import fs from "node:fs";
import path from "node:path";
import { pool } from "./db";
import { resourceAssessmentSchema, type AssessmentKind, type ResourceAssessmentInput } from "@shared/resource-assessments";

const titles: Record<AssessmentKind, { en: string; fr: string }> = {
  startup: { en: "Ontario Business Startup Checklist", fr: "Liste de préparation au démarrage d’une entreprise en Ontario" },
  readiness: { en: "Business Growth Readiness Checklist", fr: "Liste de préparation à la croissance de l’entreprise" },
  funding: { en: "Grant & Financing Readiness Assessment", fr: "Évaluation de préparation aux subventions et au financement" },
};
const phaseTitles = {
  phase1: ["Define the opportunity", "Définir l’occasion"],
  phase2: ["Research registration and legal requirements", "Rechercher les exigences d’enregistrement et légales"],
  phase3: ["Organize finances and administration", "Organiser les finances et l’administration"],
  phase4: ["Prepare the customer experience", "Préparer l’expérience client"],
  phase5: ["Establish your digital presence", "Établir votre présence numérique"],
  phase6: ["Plan the first 90 days", "Planifier les 90 premiers jours"],
};
const readinessQuestions = [
  ["Clear positioning", "Positionnement clair", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Can a new visitor quickly tell what you do, who you serve, and why they should choose your business?", "Un nouveau visiteur comprend-il rapidement votre offre, votre clientèle et ce qui distingue votre entreprise?"],
  ["Website navigation", "Navigation du site", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Can a customer find your services, contact details, and next step without searching several pages?", "Un client peut-il trouver vos services, coordonnées et prochaine étape sans parcourir plusieurs pages?"],
  ["Mobile usability", "Utilisation mobile", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Do your pages, buttons, menus, and forms work reliably on a phone?", "Vos pages, boutons, menus et formulaires fonctionnent-ils bien sur téléphone?"],
  ["Trust and proof", "Confiance et preuves", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Does the site provide accurate business details, clear service information, and genuine proof of completed work?", "Le site présente-t-il des renseignements exacts, des services clairs et des preuves authentiques du travail accompli?"],
  ["Enquiry capture", "Réception des demandes", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Do website and other enquiries reliably reach the right person?", "Les demandes du site et des autres canaux rejoignent-elles la bonne personne?"],
  ["Follow-up ownership", "Responsabilité du suivi", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Is each new enquiry assigned an owner, next action, and response deadline?", "Chaque demande a-t-elle un responsable, une prochaine action et un délai de réponse?"],
  ["Booking experience", "Expérience de réservation", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Can qualified prospects arrange a consultation with clear confirmations?", "Les clients potentiels peuvent-ils réserver une consultation et recevoir des confirmations claires?"],
  ["Repeatable workflows", "Processus reproductibles", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Are key processes documented so another team member could follow them?", "Les processus essentiels sont-ils assez documentés pour qu’un collègue puisse les suivre?"],
  ["Data and tool organization", "Organisation des données et outils", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Is customer information secure, accurate, and stored with controlled access?", "Les renseignements clients sont-ils sécurisés, exacts et conservés avec des accès contrôlés?"],
  ["Business measurement", "Mesure de l’entreprise", "Working well", "Fonctionne bien", "Needs attention", "À améliorer", "Do you know how many enquiries become meetings, proposals, and paying clients?", "Savez-vous combien de demandes deviennent des rendez-vous, propositions et clients payants?"],
];
const startupItems: Record<string, [string, string][]> = {
  phase1: [
    ["Write a one-sentence explanation of the product or service and customer problem it solves.", "Décrivez en une phrase le produit ou service et le problème client qu’il résout."],
    ["Describe your ideal customer, where they look for solutions, and how they currently buy.", "Décrivez votre clientèle idéale, où elle cherche des solutions et comment elle achète."],
    ["Research comparable businesses, competing offers, and market positioning.", "Recherchez les entreprises comparables, les offres concurrentes et le positionnement."],
    ["Estimate initial pricing, delivery costs, and gross margin.", "Estimez les prix de départ, les coûts de livraison et la marge brute."],
    ["Create a simple first-year sales and expense forecast with conservative assumptions.", "Préparez des prévisions de ventes et de dépenses prudentes pour la première année."],
  ],
  phase2: [
    ["Compare common business structures and consult legal or tax professionals where needed.", "Comparez les structures courantes et consultez des professionnels juridiques ou fiscaux au besoin."],
    ["Check business name and registration requirements through official Ontario and federal resources.", "Vérifiez le nom et l’enregistrement auprès des ressources officielles de l’Ontario et du Canada."],
    ["Determine whether municipal, provincial, or federal permits or licences apply.", "Déterminez les permis ou licences municipaux, provinciaux ou fédéraux requis."],
    ["Review tax registration, sales tax, payroll, and recordkeeping obligations.", "Vérifiez les obligations d’inscription fiscale, de taxe de vente, de paie et de tenue de registres."],
    ["Investigate insurance, contracts, and industry-specific compliance requirements.", "Examinez les assurances, contrats et exigences propres à votre secteur."],
    ["If hiring, review employment standards, workplace safety, and payroll obligations.", "Si vous embauchez, vérifiez les normes d’emploi, la sécurité et les obligations de paie."],
  ],
  phase3: [
    ["Separate business and personal finances as appropriate to your structure.", "Séparez les finances personnelles et professionnelles selon votre structure."],
    ["Choose a bookkeeping method and establish document retention.", "Choisissez une méthode de tenue de livres et de conservation des documents."],
    ["Prepare invoice, estimate, and receipt templates.", "Préparez des modèles de factures, devis et reçus."],
    ["Track expenses, taxes, receivables, and cash flow.", "Suivez les dépenses, taxes, comptes clients et flux de trésorerie."],
    ["Create secure folders for contracts, business records, and client information.", "Créez des dossiers sécurisés pour les contrats, registres et renseignements clients."],
  ],
  phase4: [
    ["Define how customers enquire, book, purchase, or request a quotation.", "Définissez comment les clients demandent des renseignements, réservent, achètent ou demandent un devis."],
    ["Create a standard response process and reasonable follow-up timelines.", "Établissez un processus de réponse et des délais de suivi raisonnables."],
    ["Document delivery steps so products or services are consistent.", "Documentez les étapes de livraison pour assurer la constance des produits ou services."],
    ["Prepare appropriate terms, privacy information, and customer communications.", "Préparez les conditions, renseignements sur la confidentialité et communications clients."],
    ["Test the full customer experience from enquiry to payment or delivery.", "Testez le parcours client complet, de la demande au paiement ou à la livraison."],
  ],
  phase5: [
    ["Select and register an appropriate domain name.", "Choisissez et enregistrez un nom de domaine adapté."],
    ["Set up professional email and protect accounts with multifactor authentication.", "Configurez un courriel professionnel et protégez les comptes par authentification multifacteur."],
    ["Prepare clear service descriptions, target customers, and contact information.", "Préparez des descriptions claires des services, de la clientèle et des coordonnées."],
    ["Build a mobile-friendly website with working forms and clear calls to action.", "Créez un site adapté aux téléphones avec des formulaires et appels à l’action fonctionnels."],
    ["Create accurate business listings and service-area details.", "Créez des fiches d’entreprise exactes et indiquez les zones de service."],
    ["Set up privacy-aware basic analytics to monitor enquiries.", "Configurez des statistiques de base respectueuses de la vie privée pour suivre les demandes."],
  ],
  phase6: [
    ["Choose two or three realistic customer-acquisition channels.", "Choisissez deux ou trois moyens réalistes d’acquérir des clients."],
    ["Identify referral partners and networking opportunities.", "Repérez des partenaires de recommandation et occasions de réseautage."],
    ["Prepare a short company introduction and service description.", "Préparez une courte présentation de l’entreprise et de ses services."],
    ["Create a weekly prospect and customer follow-up routine that complies with marketing laws.", "Établissez un suivi hebdomadaire conforme aux règles sur le marketing."],
    ["Review leads, conversion, cash flow, and customer feedback monthly.", "Examinez chaque mois les demandes, conversions, flux de trésorerie et commentaires clients."],
  ],
};
function pdfText(value: string) {
  return value.replace(/[^\u0000-\u00ff\u2010-\u203a\u20ac]/g, " ");
}

function humanize(key: string, fr: boolean) {
  const overrides: Record<string, string[]> = {
    legalEntityName: ["Legal business name", "Raison sociale"],
    municipality: ["City or municipality", "Ville ou municipalité"],
    businessStage: ["Business stage", "Étape de l’entreprise"],
    fundingType: ["Funding pathway", "Type de financement recherché"],
    opportunityKnown: ["Opportunity or lender identified", "Programme ou prêteur repéré"],
    programOrLender: ["Program or lender", "Programme ou prêteur"],
    applicationDeadline: ["Known deadline", "Échéance connue"],
    projectDescription: ["Project description", "Description du projet"],
    useOfFunds: ["Proposed use of funds", "Utilisation prévue des fonds"],
    registrations: ["Business registration status", "État de l’enregistrement"],
    businessPlan: ["Business plan availability", "Disponibilité du plan d’affaires"],
    cashflowProjections: ["Cash-flow forecast availability", "Disponibilité des prévisions de trésorerie"],
    projectBudget: ["Project budget availability", "Disponibilité du budget du projet"],
    bookkeepingRecords: ["Bookkeeping records", "Registres comptables"],
    financialRecordsAvailable: ["Financial records availability", "Disponibilité des documents financiers"],
    ownerAuthorization: ["Owner authorization to explore funding", "Autorisation des propriétaires à étudier le financement"],
    priorApplications: ["Previous funding applications", "Demandes de financement précédentes"],
    otherFundingOrDebt: ["Other funding or debt to disclose to a program", "Autres financements ou dettes à déclarer"],
    timingAndConstraints: ["Timing or constraints", "Échéancier ou contraintes"],
    nextQuestion: ["Question for the funding conversation", "Question à discuter au sujet du financement"],
    urgentRequirement: ["Most urgent requirement", "Besoin le plus urgent"],
    nextDecision: ["Next decision to research", "Prochaine décision à étudier"],
    targetMilestone: ["Target launch milestone", "Jalon de lancement visé"],
    adviserToConsult: ["Professional adviser or authority to consult", "Professionnel ou autorité à consulter"],
    quickWin: ["Two-week improvement", "Amélioration à réaliser en deux semaines"],
    largerChange: ["Larger scoped improvement", "Amélioration plus importante à définir"],
    quickWinOwner: ["Quick-win owner", "Responsable de l’amélioration rapide"],
    quickWinDate: ["Quick-win target date", "Échéance de l’amélioration rapide"],
    largerOwner: ["Larger-improvement owner", "Responsable de l’amélioration importante"],
    largerDate: ["Larger-improvement target date", "Échéance de l’amélioration importante"],
    reassessDate: ["Reassessment date", "Date de réévaluation"],
  };
  if (overrides[key]) return overrides[key][fr ? 1 : 0];
  const priority = key.match(/^(priority|why)([123])$/);
  if (priority) return `${fr ? (priority[1] === "why" ? "Pourquoi c’est important" : "Priorité") : (priority[1] === "why" ? "Why it matters" : "Priority")} ${priority[2]}`;
  const status = key.match(/^status(\d+)$/);
  if (status) {
    const row = readinessQuestions[Number(status[1]) - 1];
    return `${status[1]}. ${row?.[fr ? 1 : 0] || "Readiness area"} — ${fr ? "État" : "Status"}`;
  }
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
function displayValue(key: string, raw: string, fr: boolean) {
  const lists: Record<string, string[][]> = {
    businessStage: [["pre-revenue","Pre-revenue"],["operating-under-2","Operating under 2 years"],["operating-2-plus","Operating 2 or more years"],["nonprofit","Non-profit"],["other","Other"]],
    fundingType: [["grant","Grant"],["financing","Business financing"],["both","Both"],["unsure","Not sure yet"]],
    opportunityKnown: [["yes","Identified"],["researching","Researching"],["no","Not identified"]],
    registrations: [["complete","Complete"],["in-progress","In progress"],["not-sure","Not sure"]],
    businessPlan: [["ready","Available and current"],["needs-update","Needs an update"],["not-available","Not available"],["not-sure","Not sure"]],
    cashflowProjections: [["ready","Available and current"],["needs-update","Needs an update"],["not-available","Not available"],["not-sure","Not sure"]],
    projectBudget: [["ready","Available and current"],["needs-update","Needs an update"],["not-available","Not available"],["not-sure","Not sure"]],
    bookkeepingRecords: [["organized","Organized"],["some-records","Some records available"],["not-sure","Not sure"]],
    financialRecordsAvailable: [["yes","Available to share securely if requested"],["partial","Partially available"],["no","Not available"],["not-sure","Not sure"]],
    ownerAuthorization: [["yes","Yes"],["needs-discussion","Needs discussion"],["not-sure","Not sure"]],
    priorApplications: [["yes","Yes"],["no","No"],["not-sure","Not sure"]],
    otherFundingOrDebt: [["yes","Yes"],["no","No"],["not-sure","Not sure"]],
  };
  const dictionary = lists[key];
  if (dictionary) {
    const labels: Record<string, string> = fr ? {
      "Pre-revenue": "Avant les revenus", "Operating under 2 years": "En activité depuis moins de 2 ans",
      "Operating 2 or more years": "En activité depuis 2 ans ou plus", "Non-profit": "Organisme sans but lucratif",
      "Other": "Autre", "Grant": "Subvention", "Business financing": "Financement d’entreprise",
      "Both": "Les deux", "Not sure yet": "À déterminer", "Identified": "Repéré",
      "Researching": "Recherche en cours", "Not identified": "Non repéré", "Complete": "Terminé",
      "In progress": "En cours", "Not sure": "À déterminer", "Available and current": "Disponible et à jour",
      "Needs an update": "À mettre à jour", "Not available": "Non disponible",
      "Organized": "Organisés", "Some records available": "Certains documents disponibles",
      "Available to share securely if requested": "Peut être transmis de façon sécurisée sur demande",
      "Partially available": "Partiellement disponible", "Yes": "Oui", "No": "Non",
      "Needs discussion": "À discuter",
    } : {};
    const english = dictionary.find(([value]) => value === raw)?.[1];
    if (english) return labels[english] || english;
  }
  if (key.startsWith("status")) {
    const yes = raw === "working" ? (fr ? "Fonctionne bien" : "Working well")
      : raw === "attention" ? (fr ? "À améliorer" : "Needs attention")
      : (fr ? "Sans objet" : "Not applicable");
    return yes;
  }
  if (["phase1","phase2","phase3","phase4","phase5","phase6","useOfFunds"].includes(key)) {
    const translated: Record<string,string> = fr ? {
      "Working capital": "Fonds de roulement", "Equipment or technology": "Équipement ou technologie",
      "Staff or training": "Personnel ou formation", "Facility or accessibility": "Installations ou accessibilité",
      "Marketing or digital adoption": "Marketing ou adoption numérique", "Other": "Autre",
    } : {};
    return translated[raw] || raw;
  }
  return raw;
}

export async function makePdf(input: ResourceAssessmentInput): Promise<Buffer> {
  const fr = input.language === "fr";
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "LETTER", margin: 56, bufferPages: true, info: { Title: titles[input.kind][fr ? "fr" : "en"], Author: "Performance Processes Soleria Inc." } });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("error", reject);
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.fillColor("#161616").font("Helvetica-Bold").fontSize(11).text("PERFORMANCE PROCESSES");
    doc.moveDown(0.4).fillColor("#b76378").rect(56, doc.y, 72, 2).fill();
    const logoPath = path.join(process.cwd(), "client", "src", "assets", "logo.png");
    if (fs.existsSync(logoPath)) {
      try { doc.image(logoPath, 464, 45, { fit: [90, 48], align: "right" }); } catch { /* Wordmark below remains branded. */ }
    }
    doc.moveDown(0.9).fillColor("#171717").font("Times-Roman").fontSize(24).text(titles[input.kind][fr ? "fr" : "en"]);
    doc.moveDown(0.6).font("Helvetica").fontSize(10).fillColor("#555555")
      .text(`${fr ? "Préparé pour" : "Prepared for"}: ${pdfText(input.fullName)}`)
      .text(`${fr ? "Entreprise" : "Business"}: ${pdfText(input.businessName || "—")}`)
      .text(`${fr ? "Courriel" : "Email"}: ${pdfText(input.email)}`)
      .text(`${fr ? "Date" : "Date"}: ${new Date().toLocaleDateString(fr ? "fr-CA" : "en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Toronto" })}`);
    doc.moveDown(1).fillColor("#171717").font("Helvetica").fontSize(10);
    if (input.kind === "startup") {
      for (let i = 1; i <= 6; i++) {
        const key = `phase${i}` as keyof typeof phaseTitles;
        doc.moveDown(0.6).font("Helvetica-Bold").fontSize(13).text(phaseTitles[key][fr ? 1 : 0]);
        const selectedItems = input[key];
        const selected = Array.isArray(selectedItems) ? selectedItems : [];
        startupItems[key].forEach(([en, french], itemIndex) => {
          const question = fr ? french : en;
          const isChecked = selected.includes(`${key}-${itemIndex + 1}`);
          doc.moveDown(0.25).font("Helvetica").fontSize(9).text(`${isChecked ? "[x]" : "[ ]"}  ${pdfText(question)}`, { indent: 8 });
        });
      }
    } else if (input.kind === "readiness") {
      doc.moveDown(0.6).font("Helvetica-Bold").fontSize(13).text(fr ? "État des dix domaines" : "Status across ten areas");
      readinessQuestions.forEach((row, index) => {
        const status = input[`status${index + 1}` as keyof typeof input] as string;
        doc.moveDown(0.25).font("Helvetica").fontSize(10).text(`${index + 1}. ${row[fr ? 1 : 0]}: ${row[fr ? 7 : 6]}`);
        doc.font("Helvetica-Bold").fontSize(9.5).text(`${fr ? "État" : "Status"}: ${pdfText(displayValue(`status${index + 1}`, status, fr))}`);
        const action = (fr ? [
          "Réécrire le titre d’accueil et l’introduction des services.",
          "Simplifier le menu et créer une page pour chaque service.",
          "Tester l’ensemble du parcours sur au moins deux formats mobiles.",
          "Utiliser des informations exactes et des exemples approuvés.",
          "Tester les formulaires et alerter en cas d’échec.",
          "Désigner une personne responsable et un délai de suivi.",
          "Faciliter la réservation et les confirmations.",
          "Documenter un processus fréquent et ses étapes.",
          "Vérifier les accès, doublons et pratiques de conservation.",
          "Suivre chaque mois les demandes, rendez-vous, propositions et clients.",
        ] : [
          "Rewrite the homepage headline and service introduction in plain customer language.",
          "Simplify the menu and give each core service a clear destination page.",
          "Test the complete enquiry journey on at least two mobile screen sizes.",
          "Add approved examples and truthful service information.",
          "Test every form and alert the team to failed submissions.",
          "Assign each enquiry to an owner and set a response deadline.",
          "Make scheduling and confirmations straightforward.",
          "Document a frequent workflow and remove unnecessary steps.",
          "Review access permissions, duplicates, and retention practices.",
          "Review a monthly funnel report and record enquiry sources.",
        ])[index];
        doc.fontSize(8.5).fillColor("#666666").text(`${fr ? "Piste d’action" : "Suggested action"}: ${action}`, { indent: 14 }).fillColor("#171717");
      });
    } else {
      doc.moveDown(0.6).font("Helvetica-Bold").fontSize(13).text(fr ? "Préparation et contexte du projet" : "Readiness and project context");
      doc.moveDown(0.3).font("Helvetica").fontSize(9.5)
        .text(fr
          ? "Cette évaluation prépare une discussion sur la recherche d’occasions, l’admissibilité, la préparation des demandes et le financement. Aucun document bancaire ou numéro de compte n’est demandé ici."
          : "This assessment prepares a discussion about opportunity research, eligibility, application readiness, and funding. It does not request bank statements or account numbers here.");
    }
    for (const [key, value] of Object.entries(input)) {
      if (["requestId","kind","fullName","email","businessName","language","phase1","phase2","phase3","phase4","phase5","phase6"].includes(key)) continue;
      if (input.kind === "startup" && key.startsWith("phase")) continue;
      if (input.kind === "readiness" && (key.startsWith("status") || key === "kind")) continue;
      if (Array.isArray(value)) {
        if (!value.length) continue;
        const label = humanize(key, fr);
        const localized = value.map((item) => displayValue(key, item, fr));
        if (input.kind === "startup" && key.startsWith("phase")) continue;
        if (input.kind === "readiness" && key.startsWith("priority")) continue;
        if (input.kind === "funding" || key === "useOfFunds" || key === "servicesOfInterest") {
          doc.moveDown(0.35).font("Helvetica-Bold").fontSize(9.5).text(label);
          localized.forEach((item) => doc.font("Helvetica").fontSize(9.5).text(`- ${pdfText(item)}`, { indent: 10 }));
        }
        continue;
      }
      if (typeof value !== "string" || !value.trim()) continue;
      const label = humanize(key, fr);
      doc.moveDown(0.4).font("Helvetica-Bold").fontSize(9.5).fillColor("#252525").text(label, { continued: false });
      doc.font("Helvetica").fontSize(9.5).fillColor("#555555").text(pdfText(displayValue(key, value, fr)), { width: 500 });
      doc.fillColor("#171717");
    }
    doc.moveDown(1).font("Helvetica-Bold").fontSize(10).fillColor("#b76378").text(fr ? "Prochaines étapes" : "Next steps");
    doc.moveDown(0.25).font("Helvetica").fontSize(9)
      .fillColor("#555555").text(fr
        ? "Cette autoévaluation sert à préparer une discussion; elle ne confirme pas l’admissibilité, l’approbation, le financement ni les résultats. Les critères varient selon les bailleurs de fonds et les prêteurs. Toute prestation fera l’objet d’une portée et d’honoraires convenus par écrit avant le début du travail."
        : "This self-assessment prepares a conversation; it does not confirm eligibility, approval, funding, or results. Requirements vary by funder and lender. Any service scope and fees will be agreed in writing before work begins.");
    const range = doc.bufferedPageRange();
    for (let page = range.start; page < range.start + range.count; page++) {
      doc.switchToPage(page);
      const bottom = doc.page.height - 35;
      doc.font("Helvetica").fontSize(8).fillColor("#777777")
        .text(`Performance Processes Soleria Inc.  ·  contact@performanceprocesses.com  ·  ${page + 1}/${range.count}`, 56, bottom, { width: 500, align: "center" });
    }
    doc.end();
  });
}

let deliveryRunning = false;
export function startResourceAssessmentDelivery() {
  // Development previews can deliver real enquiries too. The independent test
  // process uses NODE_ENV=test and never sends test records to live mailboxes.
  if (process.env.NODE_ENV === "test") return;
  const deliver = async () => {
    if (deliveryRunning) return;
    deliveryRunning = true;
    try {
      const claimed = await pool.query(`UPDATE resource_assessment_submissions SET next_attempt_at=now()+interval '5 minutes'
        WHERE id IN (SELECT id FROM resource_assessment_submissions
          WHERE (NOT admin_notified OR NOT client_notified) AND coalesce(next_attempt_at,'epoch')<=now()
          ORDER BY created_at LIMIT 5 FOR UPDATE SKIP LOCKED) RETURNING *`);
      await pool.query("DELETE FROM resource_assessment_submissions WHERE admin_notified AND client_notified AND created_at<now()-interval '30 days'");
      if (!claimed.rowCount) return;
      const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASS: pass, SMTP_FROM_EMAIL: from } = process.env;
      if (!host || !user || !pass || !from) throw new Error("Assessment email is not configured.");
      const port = Number(process.env.SMTP_PORT || 587);
      const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
      for (const row of claimed.rows) {
        try {
          const parsed = resourceAssessmentSchema.safeParse({ ...row.answers, requestId: row.id, kind: row.kind, fullName: row.full_name, email: row.email, businessName: row.business_name, language: row.language });
          if (!parsed.success) throw new Error("A saved assessment did not pass validation.");
          const assessment = parsed.data;
          const pdf = await makePdf(assessment);
          const french = assessment.language === "fr";
          const filename = `${assessment.kind}-readiness-${row.id.slice(0,8)}.pdf`;
          const subject = titles[assessment.kind][french ? "fr" : "en"];
          const text = french
            ? `Bonjour ${assessment.fullName},\n\nVous trouverez en pièce jointe une copie remplie de votre formulaire. Votre réponse est aussi transmise à notre équipe à contact@performanceprocesses.com.\n\nCette évaluation prépare une discussion; elle ne confirme pas l’admissibilité ou le financement.\n\nPerformance Processes`
            : `Hello ${assessment.fullName},\n\nAttached is a completed copy of your form. Your response has also been sent to our team at contact@performanceprocesses.com.\n\nThis assessment prepares a conversation; it does not confirm eligibility or funding.\n\nPerformance Processes`;
          const attachments = [{ filename, content: pdf, contentType: "application/pdf" as const }];
          if (!row.admin_notified) {
            await transporter.sendMail({ from, to: "contact@performanceprocesses.com", replyTo: assessment.email, subject: `New ${subject} submission`, text: `A website assessment has been submitted.\nName: ${assessment.fullName}\nBusiness: ${assessment.businessName || "—"}\nEmail: ${assessment.email}\nForm: ${titles[assessment.kind][french ? "fr" : "en"]}\n\nA completed copy is attached.`, attachments });
            await pool.query("UPDATE resource_assessment_submissions SET admin_notified=true WHERE id=$1", [row.id]);
          }
          if (!row.client_notified) {
            await transporter.sendMail({ from, to: assessment.email, replyTo: "contact@performanceprocesses.com", subject, text, attachments });
            await pool.query("UPDATE resource_assessment_submissions SET client_notified=true WHERE id=$1", [row.id]);
          }
        } catch {
          await pool.query("UPDATE resource_assessment_submissions SET attempts=attempts+1,next_attempt_at=now()+interval '5 minutes' WHERE id=$1", [row.id]);
          console.error("A resource assessment email is queued for retry.");
        }
      }
    } catch { console.error("Resource assessment delivery unavailable; saved submissions remain queued."); }
    finally { deliveryRunning = false; }
  };
  void deliver();
  const timer = setInterval(deliver, 60_000);
  timer.unref();
}

export function registerResourceAssessmentRoutes(app: Express) {
  const rateLimits = new Map<string, { count: number; reset: number }>();
  app.post("/api/resource-assessments", async (req, res) => {
    if (req.headers.origin && req.headers.origin !== `${req.protocol}://${req.get("host")}`) return res.status(403).json({ message: "Please submit this form from our website." });
    const now = Date.now();
    const ip = req.ip || "unknown";
    if (rateLimits.size > 1000) rateLimits.forEach((entry, key) => { if (entry.reset < now) rateLimits.delete(key); });
    const bucket = rateLimits.get(ip);
    if (!bucket || bucket.reset < now) rateLimits.set(ip, { count: 1, reset: now + 15 * 60_000 });
    else bucket.count++;
    if (rateLimits.get(ip)!.count > 10) return res.status(429).json({ message: "Too many submissions. Please try again later." });
    if (typeof req.body?.website === "string" && req.body.website.trim()) return res.status(202).json({
      received: true, message: req.body?.language === "fr"
        ? "Votre formulaire est enregistré. Les copies PDF sont en cours d’envoi aux deux adresses courriel."
        : "Your form is saved. Completed PDF copies are being sent to both email addresses.",
    });
    const parsed = resourceAssessmentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0]?.message || "Please review your answers." });
    const input: ResourceAssessmentInput = parsed.data;
    try {
      await pool.query(
        `INSERT INTO resource_assessment_submissions (id,kind,full_name,email,business_name,language,answers)
         VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb) ON CONFLICT (id) DO NOTHING`,
        [input.requestId, input.kind, input.fullName, input.email, input.businessName, input.language,
          JSON.stringify(Object.fromEntries(Object.entries(input).filter(([key]) => !["requestId","kind","fullName","email","businessName","language"].includes(key))))],
      );
      res.status(202).json({ received: true, message: input.language === "fr"
        ? "Votre formulaire est enregistré. Les copies PDF sont en cours d’envoi aux deux adresses courriel."
        : "Your form is saved. Completed PDF copies are being sent to both email addresses." });
    } catch {
      res.status(503).json({ message: input.language === "fr" ? "Le formulaire n’a pas pu être enregistré. Veuillez réessayer." : "We could not save the form. Please try again." });
    }
  });
}
