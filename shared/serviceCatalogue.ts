import type { Offer } from "./offers";

// Publicly approved modular services. Amounts are CAD cents.
type Entry = [string, string, string, number, string, string, ("starting" | "monthly" | "sop" | "workflow")?];
const groups: { id: string; title: string; titleFr: string; category: Offer["category"]; entries: Entry[] }[] = [
  { id: "formation", title: "Business formation & startup", titleFr: "Formation et démarrage d’entreprise", category: "systems", entries: [
    ["registration-support", "Business registration and formation support", "Soutien à l’enregistrement et à la formation", 349, "Administrative preparation and submission support for one business registration. Government fees are separate.", "Préparation administrative et soutien au dépôt d’un enregistrement. Les frais gouvernementaux sont distincts."],
    ["incorporation-support", "Incorporation coordination and setup support", "Coordination et soutien à l’incorporation", 649, "Coordination and administrative filing support for one incorporation. Legal advice and government fees are separate.", "Coordination et soutien administratif pour une incorporation. Conseils juridiques et frais gouvernementaux distincts."],
    ["name-search", "Business name search and availability review", "Recherche et vérification du nom d’entreprise", 99, "Review of your proposed business name and available search results, with a written summary.", "Examen du nom proposé et des résultats de recherche disponibles, avec résumé écrit."],
    ["cra-account-setup", "Business number and CRA account setup assistance", "Aide au numéro d’entreprise et aux comptes ARC", 149, "Administrative assistance preparing your business number and applicable CRA account setup information.", "Aide administrative à la préparation des renseignements pour le numéro d’entreprise et les comptes ARC applicables."],
    ["licensing-research", "Business licensing and permit research", "Recherche de permis et licences", 249, "Research summary of potentially applicable licences and permits for one business activity and location.", "Résumé des licences et permis potentiellement applicables à une activité et à un emplacement."],
    ["startup-action-plan", "Startup consultation and action plan", "Consultation de démarrage et plan d’action", 199, "One startup consultation with a written, prioritized action plan.", "Une consultation de démarrage avec un plan d’action écrit et priorisé."],
    ["startup-business-plan", "Startup business plan", "Plan d’affaires de démarrage", 899, "A startup plan covering your offer, target customers, operating approach and launch priorities.", "Un plan de démarrage couvrant l’offre, la clientèle cible, les opérations et les priorités de lancement."],
  ] },
  { id: "strategy", title: "Business strategy & growth", titleFr: "Stratégie et croissance", category: "systems", entries: [
    ["business-health", "Business health assessment", "Évaluation de la santé de l’entreprise", 299, "Review of business priorities, current challenges and improvement opportunities, with a written assessment.", "Examen des priorités, défis et possibilités d’amélioration, avec évaluation écrite."],
    ["business-model", "Business model development", "Développement du modèle d’affaires", 499, "A documented business model covering customers, value proposition, revenue streams and key costs.", "Un modèle documenté couvrant la clientèle, la proposition de valeur, les revenus et les principaux coûts."],
    ["comprehensive-business-plan", "Comprehensive business plan", "Plan d’affaires complet", 1499, "A detailed business plan addressing strategy, market positioning, operations and implementation.", "Un plan détaillé couvrant la stratégie, le positionnement, les opérations et la mise en œuvre."],
    ["strategic-growth-plan", "Strategic growth plan", "Plan stratégique de croissance", 999, "A growth roadmap with prioritized initiatives, milestones and measures of progress.", "Une feuille de route de croissance avec initiatives, jalons et mesures de progression."],
    ["market-analysis", "Market and competitor analysis", "Analyse du marché et de la concurrence", 499, "Research summary of your target market, competitors and positioning opportunities.", "Résumé de recherche sur le marché cible, la concurrence et les possibilités de positionnement."],
    ["expansion-feasibility", "Business expansion feasibility assessment", "Évaluation de faisabilité d’expansion", 799, "Assessment of one expansion concept, key assumptions, risks and operational requirements.", "Évaluation d’un projet d’expansion, des hypothèses, des risques et des exigences opérationnelles."],
    ["contract-readiness", "Contract readiness assessment", "Évaluation de préparation aux contrats", 499, "Review of administrative and operational readiness to pursue client or supplier contracts, not legal advice.", "Examen de la préparation administrative et opérationnelle aux contrats, sans conseil juridique."],
  ] },
  { id: "operations", title: "Operational improvement", titleFr: "Amélioration des opérations", category: "systems", entries: [
    ["process-assessment", "Business process assessment", "Évaluation des processus", 399, "Review of a priority business process with findings and practical recommendations.", "Examen d’un processus prioritaire avec constats et recommandations pratiques."],
    ["sop-development", "Standard operating procedure (SOP) development", "Rédaction de procédure opérationnelle", 199, "Documentation of one standard operating procedure based on your current workflow.", "Documentation d’une procédure opérationnelle selon votre fonctionnement actuel.", "sop"],
    ["workflow-mapping", "Workflow mapping and documentation", "Cartographie et documentation de flux", 299, "Mapping and documentation of one business workflow, including key handoffs.", "Cartographie et documentation d’un flux de travail, y compris les principaux transferts.", "workflow"],
    ["efficiency-audit", "Operational efficiency audit", "Audit d’efficacité opérationnelle", 799, "An operational review with identified bottlenecks and prioritized improvement recommendations.", "Un examen opérationnel des blocages et des recommandations d’amélioration priorisées."],
    ["employee-onboarding", "Employee onboarding process development", "Développement de l’accueil des employés", 499, "A documented employee onboarding process and practical onboarding checklist.", "Un processus d’accueil documenté et une liste de vérification pratique."],
    ["crm-setup", "CRM setup and configuration", "Configuration du CRM", 599, "Initial configuration of one CRM pipeline and core contact fields. Software fees are separate.", "Configuration initiale d’un pipeline CRM et des champs de contact essentiels. Logiciel facturé séparément."],
    ["kpi-dashboard", "KPI dashboard development", "Développement d’un tableau de bord", 399, "A dashboard for agreed business indicators using your available data sources.", "Un tableau de bord des indicateurs convenus selon les données disponibles."],
  ] },
  { id: "digital", title: "Marketing & digital services", titleFr: "Marketing et services numériques", category: "marketing", entries: [
    ["website-development", "Basic website design and development · 4 pages", "Conception et développement de site web de base · 4 pages", 1499, "A responsive website with up to four pages, designed around your core business information and contact journey. Additional features or scope are quoted separately.", "Un site adaptatif de quatre pages au maximum, conçu autour des renseignements essentiels de l’entreprise et du parcours de contact. Toute fonction ou portée supplémentaire est facturée séparément."],
    ["website-development-medium", "Medium-complexity website · 6 pages", "Site web de complexité moyenne · 6 pages", 2899, "A responsive six-page website for a business that needs a more developed content structure. Integrations or custom features beyond the agreed scope are quoted separately.", "Un site adaptatif de six pages pour une entreprise ayant besoin d’une structure de contenu plus développée. Les intégrations ou fonctions sur mesure hors portée sont facturées séparément."],
    ["website-development-robust", "Robust website · up to 15 pages", "Site web avancé · jusqu’à 15 pages", 7389, "A robust responsive website with up to 15 pages. Final content, functionality and integrations are confirmed in the agreed project scope before work begins.", "Un site adaptatif avancé comptant jusqu’à 15 pages. Le contenu, les fonctionnalités et les intégrations sont confirmés dans la portée convenue avant le début du projet."],
    ["marketing-strategy", "Marketing strategy development", "Développement de stratégie marketing", 599, "A marketing strategy covering audience, messaging, channels and implementation priorities.", "Une stratégie couvrant le public, les messages, les canaux et les priorités."],
    ["brand-starter", "Brand identity starter package", "Identité de marque de départ", 499, "A starter visual identity direction and basic brand usage guidance.", "Une orientation visuelle de départ et des conseils de base d’utilisation de la marque."],
    ["website-maintenance", "Website maintenance", "Maintenance de site web", 149, "Starting monthly maintenance for one website. Update frequency and supported changes are confirmed before service starts; additional development is separate.", "Maintenance mensuelle initiale d’un site. Fréquence et modifications couvertes confirmées avant le début; développement supplémentaire distinct.", "monthly"],
    ["social-strategy", "Social media strategy", "Stratégie de réseaux sociaux", 349, "A documented social media strategy with channel priorities and content themes.", "Une stratégie documentée avec canaux prioritaires et thèmes de contenu."],
    ["social-management", "Social media management", "Gestion des réseaux sociaux", 499, "Starting monthly social media support. Channels and posting volume are agreed before service starts; advertising spend is separate.", "Soutien mensuel initial. Canaux et volume de publications convenus avant le début; dépenses publicitaires distinctes.", "monthly"],
    ["email-setup", "Email marketing setup", "Configuration du marketing courriel", 399, "Initial setup of one email marketing platform, an audience list and a reusable email template. Software fees are separate.", "Configuration initiale d’une plateforme, d’une liste et d’un modèle réutilisable. Logiciel facturé séparément."],
    ["email-management", "Email campaign management", "Gestion des campagnes courriel", 299, "Starting monthly email campaign support. Campaign volume and audience scope are confirmed before service starts; platform fees are separate.", "Soutien mensuel initial aux campagnes. Volume et public convenus avant le début; plateforme facturée séparément.", "monthly"],
    ["google-business", "Google Business Profile setup", "Configuration de la fiche Google Business", 199, "Setup assistance for one eligible Google Business Profile. Google controls verification and approval.", "Aide à la configuration d’une fiche admissible. Google contrôle la vérification et l’approbation."],
  ] },
  { id: "funding", title: "Funding & financial readiness", titleFr: "Financement et préparation financière", category: "systems", entries: [
    ["funding-readiness", "Funding readiness assessment", "Évaluation de préparation au financement", 299, "Review of your funding objectives, business information and document readiness, with recommendations.", "Examen des objectifs, des renseignements et des documents, avec recommandations."],
    ["grant-research", "Grant opportunity research", "Recherche de subventions", 249, "Research summary of potentially suitable grant opportunities and eligibility considerations. No funding guarantee.", "Résumé des occasions potentielles et des critères d’admissibilité. Aucune garantie de financement."],
    ["grant-preparation", "Grant application preparation support", "Soutien à la préparation de demande de subvention", 599, "Starting preparation support for one application. Complexity, required documents and deliverables are agreed before work begins. Funder decisions remain independent.", "Soutien initial pour une demande. Complexité, documents et livrables convenus avant les travaux. Décision indépendante du bailleur de fonds.", "starting"],
    ["financing-application", "Business financing application support", "Soutien aux demandes de financement", 699, "Starting preparation support for one financing application. Lender requirements and deliverables are agreed before work begins. Approval is not guaranteed.", "Soutien initial pour une demande. Exigences du prêteur et livrables convenus avant les travaux. Aucune garantie d’approbation.", "starting"],
    ["financial-projections", "Financial projections development", "Développement de projections financières", 499, "Business financial projections and cash-flow forecast based on client-provided assumptions, not accounting advice.", "Projections et prévisions de trésorerie selon les hypothèses du client, sans conseil comptable."],
    ["pitch-deck", "Investor or lender pitch deck", "Présentation pour investisseurs ou prêteurs", 599, "A pitch presentation covering your business, market, funding need and supporting financial narrative.", "Une présentation couvrant l’entreprise, le marché, le besoin de financement et les éléments financiers."],
  ] },
];

export const SERVICE_GROUPS = groups.map(({ id, title, titleFr, entries }) => ({
  id, title, titleFr, offerIds: entries.map(([id]) => id),
}));

export const SERVICE_CATALOGUE: Offer[] = groups.flatMap(group => group.entries.map(
  ([id, name, , dollars, description, , mode]) => ({
    id, name, description, price: dollars * 100,
    priceLabel: `${mode === "starting" || mode === "monthly" ? "From " : ""}$${dollars.toLocaleString("en-CA")}${mode === "monthly" ? "/month" : mode === "sop" ? " per SOP" : mode === "workflow" ? " per workflow" : ""}`,
    category: id.startsWith("website-development") || id === "website-maintenance" ? "website" : group.category,
    bestFor: group.title, includes: [description],
    isMonthly: mode === "monthly",
    isStartingPrice: mode === "starting" || mode === "monthly",
  }),
));

export const SERVICE_TRANSLATIONS = Object.fromEntries(groups.flatMap(group => group.entries.map(
  ([id, , name, dollars, , description, mode]) => [id, {
    name, description, bestFor: group.titleFr, includes: [description],
    priceLabel: `${mode === "starting" || mode === "monthly" ? "À partir de " : ""}${dollars.toLocaleString("fr-CA")} $${mode === "monthly" ? "/mois" : mode === "sop" ? " par procédure" : mode === "workflow" ? " par flux" : ""}`,
  }],
)));
