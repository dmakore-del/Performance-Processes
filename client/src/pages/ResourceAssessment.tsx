import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import type { AssessmentKind } from "@shared/resource-assessments";

type Bilingual = readonly [string, string];
const startupPhases: { key: string; title: Bilingual; items: Bilingual[] }[] = [
  { key: "phase1", title: ["Phase 1 · Define the opportunity", "Phase 1 · Définir l’occasion"], items: [
    ["Write one sentence explaining your product or service and the customer problem it solves.", "Décrivez en une phrase votre offre et le problème client qu’elle résout."],
    ["Describe your ideal customer, where they look for solutions, and how they currently buy.", "Décrivez votre clientèle idéale, où elle cherche des solutions et comment elle achète."],
    ["Research comparable businesses, competing offers, and market positioning.", "Recherchez les entreprises comparables, les offres concurrentes et votre positionnement."],
    ["Estimate initial pricing, delivery costs, and gross margin.", "Estimez les prix de départ, les coûts de livraison et la marge brute."],
    ["Create a first-year sales and expense forecast using conservative assumptions.", "Préparez des prévisions de ventes et de dépenses pour la première année selon des hypothèses prudentes."],
  ]},
  { key: "phase2", title: ["Phase 2 · Registration and legal requirements", "Phase 2 · Enregistrement et exigences légales"], items: [
    ["Compare common business structures; consult a legal or tax professional where needed.", "Comparez les structures courantes et consultez un professionnel juridique ou fiscal au besoin."],
    ["Check business name and registration requirements through official Ontario and federal resources.", "Vérifiez le nom et l’enregistrement auprès des ressources officielles de l’Ontario et du Canada."],
    ["Determine whether municipal, provincial, or federal permits and licences apply.", "Déterminez les permis et licences municipaux, provinciaux ou fédéraux requis."],
    ["Review tax registration, sales tax, payroll, and recordkeeping obligations.", "Vérifiez les obligations d’inscription fiscale, de taxe de vente, de paie et de tenue de registres."],
    ["Investigate insurance, contracts, and industry-specific requirements.", "Examinez les assurances, contrats et exigences propres à votre secteur."],
    ["If hiring, review employment standards, workplace safety, and payroll obligations.", "Si vous embauchez, vérifiez les normes d’emploi, la sécurité au travail et les obligations de paie."],
  ]},
  { key: "phase3", title: ["Phase 3 · Finances and administration", "Phase 3 · Finances et administration"], items: [
    ["Separate business and personal finances as appropriate to your structure.", "Séparez les finances personnelles et professionnelles selon votre structure."],
    ["Choose a bookkeeping method and document-retention routine.", "Choisissez une méthode de tenue de livres et de conservation des documents."],
    ["Prepare invoice, estimate, and receipt templates.", "Préparez des modèles de factures, devis et reçus."],
    ["Set a process for tracking expenses, taxes, receivables, and cash flow.", "Établissez un suivi des dépenses, taxes, comptes clients et flux de trésorerie."],
    ["Create a secure folder structure for contracts, business records, and client information.", "Créez une structure de dossiers sécurisée pour les contrats, registres et renseignements clients."],
  ]},
  { key: "phase4", title: ["Phase 4 · Customer experience", "Phase 4 · Expérience client"], items: [
    ["Define how customers enquire, book, purchase, or request a quotation.", "Définissez comment les clients demandent des renseignements, réservent, achètent ou demandent un devis."],
    ["Create a standard response process and reasonable follow-up timelines.", "Établissez un processus de réponse et des délais de suivi raisonnables."],
    ["Document the steps for consistent product or service delivery.", "Documentez les étapes pour livrer régulièrement vos produits ou services."],
    ["Prepare appropriate terms, privacy information, and customer communications.", "Préparez les conditions, renseignements de confidentialité et communications clients nécessaires."],
    ["Test the full customer experience from enquiry to payment or delivery.", "Testez le parcours complet, de la demande au paiement ou à la livraison."],
  ]},
  { key: "phase5", title: ["Phase 5 · Digital presence", "Phase 5 · Présence numérique"], items: [
    ["Select and register an appropriate domain name.", "Choisissez et enregistrez un nom de domaine adapté."],
    ["Set up professional business email and protect accounts with multifactor authentication.", "Configurez un courriel professionnel et protégez les comptes avec l’authentification multifacteur."],
    ["Prepare clear service descriptions, target customers, and contact information.", "Préparez des descriptions claires des services, de la clientèle et des coordonnées."],
    ["Build a mobile-friendly website with working forms and clear next steps.", "Créez un site adapté aux téléphones avec des formulaires fonctionnels et des prochaines étapes claires."],
    ["Create accurate business listings and service-area details.", "Créez des fiches d’entreprise exactes avec vos zones de service."],
    ["Set up basic, privacy-aware analytics to monitor enquiries.", "Configurez des statistiques de base respectueuses de la vie privée pour suivre les demandes."],
  ]},
  { key: "phase6", title: ["Phase 6 · The first 90 days", "Phase 6 · Les 90 premiers jours"], items: [
    ["Choose two or three realistic customer-acquisition channels.", "Choisissez deux ou trois moyens réalistes d’acquérir des clients."],
    ["Identify referral partners and networking opportunities.", "Repérez des partenaires de recommandation et occasions de réseautage."],
    ["Prepare a short company introduction and service description.", "Préparez une courte présentation de l’entreprise et de ses services."],
    ["Create a weekly follow-up routine that complies with marketing laws.", "Établissez un suivi hebdomadaire conforme aux règles sur le marketing."],
    ["Review leads, conversion, cash flow, and customer feedback monthly.", "Examinez chaque mois les demandes, conversions, flux de trésorerie et commentaires clients."],
  ]},
];
const readinessAreas: Bilingual[] = [
  ["Clear positioning — Can a new visitor tell what you do, who you serve, and why choose you?", "Positionnement clair — Un visiteur comprend-il votre offre, votre clientèle et votre différence?"],
  ["Website navigation — Can customers quickly find services, contact details, and next steps?", "Navigation — Les clients trouvent-ils facilement services, coordonnées et prochaines étapes?"],
  ["Mobile usability — Do pages, buttons, menus, and forms work reliably on a phone?", "Utilisation mobile — Pages, boutons, menus et formulaires fonctionnent-ils bien sur téléphone?"],
  ["Trust and proof — Is business information accurate, with genuine evidence of completed work?", "Confiance et preuves — Les informations sont-elles exactes et les preuves de travail authentiques?"],
  ["Enquiry capture — Do enquiries reach the right person reliably?", "Réception des demandes — Les demandes rejoignent-elles la bonne personne?"],
  ["Follow-up ownership — Does each enquiry have an owner, next action, and response deadline?", "Suivi — Chaque demande a-t-elle un responsable, une action et un délai?"],
  ["Booking experience — Can prospects schedule with clear confirmations?", "Réservation — Les clients potentiels peuvent-ils réserver et recevoir une confirmation claire?"],
  ["Repeatable workflows — Can a teammate follow important processes consistently?", "Processus reproductibles — Un collègue peut-il suivre les processus importants?"],
  ["Data and tool organization — Is customer information accurate, secure, and access-controlled?", "Organisation — Les renseignements clients sont-ils exacts, sécurisés et à accès contrôlé?"],
  ["Business measurement — Do you track enquiries through meetings, proposals, and paying clients?", "Mesure — Suivez-vous les demandes jusqu’aux rendez-vous, propositions et ventes?"],
];
const fundingUses: Bilingual[] = [
  ["Working capital", "Fonds de roulement"], ["Equipment or technology", "Équipement ou technologie"],
  ["Staff or training", "Personnel ou formation"], ["Facility or accessibility", "Installations ou accessibilité"],
  ["Marketing or digital adoption", "Marketing ou adoption numérique"], ["Other", "Autre"],
];
const fundingServices: Bilingual[] = [
  ["Funding opportunity search and eligibility assessment", "Recherche de possibilités de financement et examen de l’admissibilité"],
  ["Standard grant application preparation", "Préparation d’une demande de subvention standard"],
  ["Business financing application assistance", "Accompagnement pour une demande de financement d’entreprise"],
  ["Complex grant or financing application", "Demande complexe de subvention ou de financement"],
  ["Business plan or substantial plan update", "Plan d’affaires ou mise à jour importante"],
  ["Cash-flow forecast and financial projections", "Prévisions de trésorerie et projections financières"],
  ["Post-award reporting, claims, or lender follow-up", "Rapports après l’octroi, réclamations ou suivi auprès d’un prêteur"],
  ["Funding readiness review", "Examen de préparation au financement"],
];
const formTitles: Record<AssessmentKind, Bilingual> = {
  startup: ["Ontario Business Startup Checklist", "Liste de préparation au démarrage d’une entreprise en Ontario"],
  readiness: ["Business Growth Readiness Checklist", "Liste de préparation à la croissance de l’entreprise"],
  funding: ["Grant & Financing Readiness Assessment", "Évaluation de préparation aux subventions et au financement"],
};
const input = "mt-2 min-h-12 w-full border border-primary/20 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const choices = (fr: boolean, options: [string, string, string][]) => options.map(([value, en, french]) => <option key={value} value={value}>{fr ? french : en}</option>);

export function ResourceAssessment({ kind }: { kind: AssessmentKind }) {
  const { language } = useLanguage();
  const fr = language === "fr";
  const [sent, setSent] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const label = (en: string, french: string) => fr ? french : en;
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: Record<string, unknown> = { requestId: crypto.randomUUID(), kind, language };
    if (kind === "startup") for (let i = 1; i <= 6; i++) values[`phase${i}`] = [];
    if (kind === "funding") { values.useOfFunds = []; values.servicesOfInterest = []; }
    Array.from(data.entries()).forEach(([key, value]) => {
      if (key === "requestId") return;
      if (key.startsWith("items_") || key === "useOfFunds") {
        const field = key.startsWith("items_") ? key.slice(6) : key;
        values[field] = data.getAll(key).filter((item) => typeof item === "string" && item.length > 0);
      } else if (!key.startsWith("items_")) values[key] = String(value);
    });
    if (data.get("website")) { setPending(false); return; }
    try {
      const response = await fetch("/api/resource-assessments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || label("Please review your answers and try again.", "Vérifiez vos réponses et réessayez."));
      setSent(result.message);
      form.reset();
    } catch (caught) { setError(caught instanceof Error ? caught.message : label("The form could not be sent. Please retry.", "Le formulaire n’a pas pu être envoyé. Veuillez réessayer.")); }
    finally { setPending(false); }
  };
  const title = formTitles[kind][fr ? 1 : 0];
  const titleEN = formTitles[kind][0];
  return <div className="min-h-[100dvh] bg-background">
    <SEOHead title={`${titleEN} | Performance Processes`} description={titleEN} path={`/resources/${kind === "startup" ? "startup-checklist" : kind === "readiness" ? "business-readiness" : "grants-financing-readiness"}`} />
    <Navbar />
    <main className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-20">
      <h1 className="text-display text-4xl leading-tight sm:text-5xl md:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{kind === "startup"
        ? label("Work through six phases and note any questions for research or professional advice. Requirements vary. This planning resource is not a substitute for current government instructions.", "Parcourez six phases et notez les questions à vérifier ou à poser à un professionnel. Les exigences varient. Ce guide ne remplace pas les directives gouvernementales à jour.")
        : kind === "readiness"
          ? label("For each area, choose a status, then identify three priorities, one two-week improvement, and a larger scoped change. Reassess after 30 days.", "Pour chaque domaine, choisissez un état, puis définissez trois priorités, une amélioration à réaliser en deux semaines et une amélioration plus importante. Réévaluez dans 30 jours.")
          : label("Prepare a funding conversation by describing your business, project, and supporting records you may have available. Do not upload or enter bank account numbers, passwords, tax identifiers, credit-card information, or confidential financial documents.", "Préparez la discussion sur le financement en décrivant votre entreprise, votre projet et les documents disponibles. Ne téléversez et ne saisissez aucun numéro de compte bancaire, mot de passe, identifiant fiscal, numéro de carte ni document financier confidentiel.")}</p>
      {kind === "funding" && <p className="mt-4 border-l-2 border-accent px-4 py-3 text-sm leading-6">{label("This assessment is an expression of interest, not an authorization to perform paid work or an application submission. Eligibility, approval, and financing terms are determined by the funder or lender. Proposed services, scope, and fees are discussed separately and agreed in writing before work begins.", "Cette évaluation exprime un intérêt; elle n’autorise pas des travaux payants et ne constitue pas une demande de financement. Le bailleur ou prêteur détermine l’admissibilité, l’approbation et les conditions. Les services, la portée et les honoraires sont discutés séparément et convenus par écrit avant le début du travail.")}</p>}
      {sent ? <section className="mt-10 border border-primary/15 bg-secondary p-7" aria-live="polite"><h2 className="text-display text-3xl">{label("Your completed form is saved.", "Votre formulaire rempli est enregistré.")}</h2><p className="mt-4 leading-7">{sent}</p></section> :
      <form className="mt-10 space-y-9" onSubmit={submit}>
        <section className="grid gap-5 border-b border-primary/15 pb-8 md:grid-cols-2">
          <label className="text-sm">{label("Full name", "Nom complet")} *<input name="fullName" autoComplete="name" required minLength={2} maxLength={120} className={input}/></label>
          <label className="text-sm">{label("Email", "Courriel")} *<input name="email" type="email" autoComplete="email" required maxLength={254} className={input}/></label>
          <label className="text-sm">{label("Business name (optional)", "Nom de l’entreprise (facultatif)")}<input name="businessName" autoComplete="organization" maxLength={180} className={input}/></label>
        </section>
        <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
        {kind === "startup" && <>
          {startupPhases.map((phase) => <fieldset key={phase.key} className="border-b border-primary/15 pb-7">
            <legend className="text-display mb-4 text-2xl">{phase.title[fr ? 1 : 0]}</legend>
            <div className="space-y-2">{phase.items.map(([en, french], index) => <label key={index} className="flex gap-3 py-1 text-sm leading-6"><input type="checkbox" name={`items_${phase.key}`} value={`${phase.key}-${index + 1}`} className="mt-1 size-4 accent-primary"/><span>{fr ? french : en}</span></label>)}</div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">{label("Phase output", "Résultat de la phase")}: {fr
              ? ["Résumé du concept et budget préliminaire.", "Liste vérifiée des enregistrements, permis, échéances et décisions professionnelles.", "Processus d’administration financière et de tenue de dossiers.", "Parcours client simple et répétable.", "Présence numérique crédible pour rejoindre les clients.", "Plan d’action de 90 jours avec responsables et jalons mesurables."][Number(phase.key.slice(-1)) - 1]
              : ["One-page business concept summary and preliminary budget.", "Verified list of registrations, permits, deadlines, and professional decisions.", "Basic financial administration and recordkeeping process.", "A simple, repeatable customer journey.", "A credible digital presence for customer discovery and contact.", "A focused 90-day action plan with owners and measurable milestones."][Number(phase.key.slice(-1)) - 1]}</p>
          </fieldset>)}
          <section className="grid gap-5 md:grid-cols-2">
            <label className="text-sm">{label("Most urgent requirement", "Besoin le plus urgent")}<textarea name="urgentRequirement" rows={3} maxLength={1000} className={input}/></label>
            <label className="text-sm">{label("Next decision to research", "Prochaine décision à étudier")}<textarea name="nextDecision" rows={3} maxLength={1000} className={input}/></label>
            <label className="text-sm">{label("Target launch milestone", "Jalon de lancement visé")}<input name="targetMilestone" maxLength={200} className={input}/></label>
            <label className="text-sm">{label("Professional adviser or authority to consult", "Professionnel ou autorité à consulter")}<input name="adviserToConsult" maxLength={300} className={input}/></label>
          </section>
          <p className="text-xs leading-6 text-muted-foreground">{label("Confirm current rules with official government and regulatory sources. General information only; not legal, tax, accounting, or funding advice.", "Vérifiez les exigences auprès des autorités officielles. Renseignements généraux seulement; aucun conseil juridique, fiscal, comptable ou financier.")}</p>
        </>}
        {kind === "readiness" && <>
          {readinessAreas.map(([en, french], index) => <fieldset key={index} className="grid gap-3 border-b border-primary/15 pb-5 sm:grid-cols-[1fr_240px] sm:items-center">
            <legend className="sr-only">{fr ? french : en}</legend>
            <p className="text-sm leading-6">{fr ? french : en}</p>
            <select name={`status${index + 1}`} required defaultValue="" className={input}>
              <option value="" disabled>{label("Choose status", "Choisir un état")}</option>
              {choices(fr, [["working","Working well","Fonctionne bien"],["attention","Needs attention","À améliorer"],["na","Not applicable","Sans objet"]])}
            </select>
          </fieldset>)}
          <section className="space-y-5 border-b border-primary/15 pb-7">
            <h2 className="text-display text-3xl">{label("Prioritize your next improvements", "Prioriser les prochaines améliorations")}</h2>
            {[1,2,3].map((n) => <div key={n} className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">{label(`Priority ${n}`, `Priorité ${n}`)} *<input name={`priority${n}`} required minLength={2} maxLength={300} className={input}/></label>
              <label className="text-sm">{label("Why it matters", "Pourquoi est-ce important?")} *<input name={`why${n}`} required minLength={2} maxLength={500} className={input}/></label>
            </div>)}
          </section>
          <section className="grid gap-5 md:grid-cols-2">
            <label className="text-sm">{label("Two-week quick win", "Amélioration réalisable en deux semaines")} *<textarea name="quickWin" required minLength={2} maxLength={500} rows={2} className={input}/></label>
            <label className="text-sm">{label("Owner", "Responsable")}<input name="quickWinOwner" maxLength={120} className={input}/></label>
            <label className="text-sm">{label("Target date", "Échéance")}<input name="quickWinDate" type="date" className={input}/></label>
            <label className="text-sm">{label("Larger scoped improvement", "Amélioration plus importante à définir")} *<textarea name="largerChange" required minLength={2} maxLength={500} rows={2} className={input}/></label>
            <label className="text-sm">{label("Owner", "Responsable")}<input name="largerOwner" maxLength={120} className={input}/></label>
            <label className="text-sm">{label("Target date", "Échéance")}<input name="largerDate" type="date" className={input}/></label>
            <label className="text-sm">{label("Reassess after 30 days", "Date de réévaluation (dans 30 jours)")}<input name="reassessDate" type="date" className={input}/></label>
          </section>
        </>}
        {kind === "funding" && <section className="space-y-6">
          <h2 className="text-display text-3xl">{label("About the business and project", "À propos de l’entreprise et du projet")}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm">{label("Legal business name", "Raison sociale")} *<input name="legalEntityName" required minLength={2} maxLength={180} className={input}/></label>
            <label className="text-sm">{label("City or municipality in Canada", "Ville ou municipalité au Canada")} *<input name="municipality" required minLength={2} maxLength={100} className={input}/></label>
            <label className="text-sm">{label("Business sector", "Secteur d’activité")} *<input name="sector" required minLength={2} maxLength={120} className={input}/></label>
            <label className="text-sm">{label("Business stage", "Étape de l’entreprise")} *<select name="businessStage" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["pre-revenue","Not yet generating revenue","Pas encore de revenus"],["operating-under-2","Operating under 2 years","En activité depuis moins de 2 ans"],["operating-2-plus","Operating 2 or more years","En activité depuis 2 ans ou plus"],["nonprofit","Non-profit organization","Organisme sans but lucratif"],["other","Other","Autre"]])}</select></label>
            <label className="text-sm">{label("Years operating (optional)", "Années d’activité (facultatif)")}<input name="yearsOperating" maxLength={40} className={input}/></label>
            <label className="text-sm">{label("Funding pathway", "Type de financement recherché")} *<select name="fundingType" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["grant","Grant funding","Subvention"],["financing","Business financing","Financement d’entreprise"],["both","Both","Les deux"],["unsure","Not sure yet","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Have you identified a program or lender?", "Avez-vous repéré un programme ou prêteur?")} *<select name="opportunityKnown" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["yes","Yes","Oui"],["researching","Researching","Recherche en cours"],["no","No","Non"]])}</select></label>
            <label className="text-sm">{label("Program or lender name, if known", "Nom du programme ou prêteur, si connu")}<input name="programOrLender" maxLength={180} className={input}/></label>
            <label className="text-sm">{label("Known application deadline", "Échéance connue")}<input name="applicationDeadline" type="date" className={input}/></label>
          </div>
          <label className="block text-sm">{label("Describe the project and the business need it addresses", "Décrivez le projet et le besoin de l’entreprise")} *<textarea name="projectDescription" required minLength={20} maxLength={2000} rows={4} className={input}/></label>
          <fieldset className="space-y-3"><legend className="text-sm font-medium">{label("What would funding support?", "Qu’est-ce que le financement soutiendrait?")}</legend>{fundingUses.map(([en, french]) => <label key={en} className="flex gap-3 text-sm"><input type="checkbox" name="useOfFunds" value={fr ? french : en} className="size-4 accent-primary"/>{fr ? french : en}</label>)}</fieldset>
          <fieldset className="space-y-3"><legend className="text-sm font-medium">{label("Which support would you like to discuss? Select all that apply.", "Quels services souhaitez-vous discuter? Choisissez toutes les options pertinentes.")}</legend>{fundingServices.map(([en, french]) => <label key={en} className="flex gap-3 text-sm leading-6"><input type="checkbox" name="servicesOfInterest" value={fr ? french : en} className="mt-1 size-4 accent-primary"/>{fr ? french : en}</label>)}</fieldset>
          <h2 className="text-display pt-3 text-3xl">{label("Readiness and supporting records", "Préparation et documents justificatifs")}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm">{label("Business registration", "Enregistrement de l’entreprise")} *<select name="registrations" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["complete","Complete","Terminé"],["in-progress","In progress","En cours"],["not-sure","Not sure","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Business plan", "Plan d’affaires")} *<select name="businessPlan" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["ready","Available and current","Disponible et à jour"],["needs-update","Needs an update","À mettre à jour"],["not-available","Not available","Non disponible"],["not-sure","Not sure","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Cash-flow projections", "Prévisions de trésorerie")} *<select name="cashflowProjections" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["ready","Available and current","Disponible et à jour"],["needs-update","Needs an update","À mettre à jour"],["not-available","Not available","Non disponible"],["not-sure","Not sure","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Project budget", "Budget du projet")} *<select name="projectBudget" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["ready","Available and current","Disponible et à jour"],["needs-update","Needs an update","À mettre à jour"],["not-available","Not available","Non disponible"],["not-sure","Not sure","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Bookkeeping records", "Registres comptables")} *<select name="bookkeepingRecords" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["organized","Organized","Organisés"],["some-records","Some records available","Certains documents disponibles"],["not-sure","Not sure","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Financial statements / tax records available to share securely if requested?", "États financiers ou documents fiscaux disponibles à transmettre de façon sécurisée sur demande?")} *<select name="financialRecordsAvailable" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["yes","Yes","Oui"],["partial","Partly","En partie"],["no","No","Non"],["not-sure","Not sure","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Have the business owners authorized exploring this funding?", "Les propriétaires autorisent-ils l’étude de ce financement?")} *<select name="ownerAuthorization" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["yes","Yes","Oui"],["needs-discussion","Needs discussion","À discuter"],["not-sure","Not sure","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Previous applications or awards relevant to this project?", "Des demandes ou subventions précédentes liées au projet?")} *<select name="priorApplications" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["yes","Yes","Oui"],["no","No","Non"],["not-sure","Not sure","À déterminer"]])}</select></label>
            <label className="text-sm">{label("Other funding or business debt relevant to disclose?", "Autres financements ou dettes à déclarer?")} *<select name="otherFundingOrDebt" required defaultValue="" className={input}><option value="" disabled>{label("Select", "Choisir")}</option>{choices(fr,[["yes","Yes","Oui"],["no","No","Non"],["not-sure","Not sure","À déterminer"]])}</select></label>
          </div>
          <label className="block text-sm">{label("Timing, constraints, or matching-funding considerations (optional)", "Échéancier, contraintes ou contribution de contrepartie (facultatif)")}<textarea name="timingAndConstraints" maxLength={1200} rows={3} className={input}/></label>
          <label className="block text-sm">{label("What would you like to clarify in a funding-readiness conversation?", "Que souhaitez-vous clarifier lors d’une discussion sur la préparation au financement?")}<textarea name="nextQuestion" maxLength={1000} rows={3} className={input}/></label>
        </section>}
        <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required className="mt-1 size-4 accent-primary"/><span>{label("I understand this is a preliminary self-assessment, not a funding application or authorization to start paid services.", "Je comprends qu’il s’agit d’une autoévaluation préliminaire, et non d’une demande de financement ni d’une autorisation de commencer des services payants.")}</span></label>
        {error && <p role="alert" className="border-l-2 border-red-700 px-4 py-2 text-sm">{error}</p>}
        <button disabled={pending} className="min-h-12 bg-primary px-7 py-3 text-sm text-primary-foreground disabled:opacity-60">{pending ? label("Saving…", "Enregistrement…") : label("Submit and email my completed PDF", "Envoyer et recevoir mon formulaire rempli en PDF")}</button>
        <p className="text-xs leading-6 text-muted-foreground">{label("A completed PDF will be emailed to you and contact@performanceprocesses.com. Your response will be held only to deliver those copies and removed within 30 days after successful delivery. Do not enter banking passwords, account numbers, government IDs, or upload confidential records.", "Un PDF rempli sera envoyé à vous et à contact@performanceprocesses.com. Vos réponses seront conservées uniquement pour envoyer les copies, puis supprimées dans les 30 jours suivant l’envoi réussi. N’indiquez aucun mot de passe bancaire, numéro de compte, identifiant gouvernemental et ne téléversez aucun document confidentiel.")}</p>
      </form>}
    </main>
    <Footer />
  </div>;
}
