import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";

const PAGE_COPY = {
  en: {
    seoTitle: "Grant, Financing & Retainer Services | Performance Processes",
    seoDescription: "Explore grant and business financing application support, transparent service fees, monthly retainer options, and public retainer terms.",
    title: "Funding support and ongoing business services.",
    intro: "Practical help researching funding opportunities, preparing applications, and keeping your business systems moving. Every funding engagement is scoped and approved before work begins.",
    fundingTitle: "Grant and financing support",
    fundingIntro: "We help Canadian businesses identify suitable funding opportunities and prepare grant or business financing applications. Funders and lenders make all eligibility, approval, and funding decisions.",
    feeLabel: "Service and billing unit",
    priceLabel: "Fee before applicable HST",
    fundingFees: [
      { name: "Grant opportunity research", price: "$150 per suitable opportunity", details: "A written summary of the program, published criteria, deadlines, permitted uses, required documents, preliminary eligibility considerations, and next steps. Only distinct, suitable opportunities within a written approved scope and budget are billable." },
      { name: "Standard grant application", price: "$560 per application", details: "Support for one program and intake, including readiness and eligibility assessment, application drafting, organization of supplied records, up to two consolidated revisions, submission support, and one reasonable clarification response." },
      { name: "Standard business financing application", price: "$400 per lender application", details: "Support for one lender and request, including readiness review, funding summary, organization of supplied documents, use-of-funds outline, application assistance, revisions, and submission support." },
      { name: "Complex grant or financing application", price: "Quoted in writing", details: "For applications that require extensive narratives, partners, multiyear planning, detailed financial models, technical documents, or substantial due diligence. Scope and fee are approved before work begins." },
      { name: "Funding readiness review", price: "$175 per business or project", details: "A consultation of up to 60 minutes, review of key supplied documents, and a written readiness checklist. Included where the approved application or project scope already includes this assessment." },
      { name: "Cash-flow forecast and financial projections", price: "$490 per model", details: "A typical 12-month cash-flow model with stated revenue and cost assumptions and a funding-use schedule. Forecasts are estimates based on information supplied by the client, not audited financial statements." },
      { name: "Business plans, post-award support, and other related work", price: "Quoted or approved hourly", details: "Business plans, plan updates, claims, reports, lender follow-up, pitches, and administration are scoped separately. Approved hourly support is $175 per hour, billed in 15-minute increments within the written budget cap." },
    ],
    successTitle: "A success fee applies to covered funding",
    successBody: "For each grant or financing application that we materially prepare, develop, coordinate, or submit under a written-approved service order, the success fee is 6% of qualifying grant funds or financing principal actually received. It is mandatory for covered applications, is additional to service fees, and is invoiced as funds are received, plus applicable HST.",
    successExample: "For example, 6% of $10,000 in qualifying funds received is $600 before applicable HST. Unused credit, conditional award notices, and funding unrelated to our work do not trigger the fee.",
    restrictions: "The fee applies only where permitted by applicable law and the relevant program or lender terms. If percentage-based compensation is prohibited, we will not proceed under that arrangement. We do not lend, approve funding, handle client proceeds, provide legal, tax, or accounting advice, or perform regulated brokerage or securities services.",
    authorizationTitle: "Nothing starts without your written approval",
    authorizationBody: "Before any research, application, or project begins, you receive a written scope identifying the opportunity or lender, deliverables, fee, quantity or budget cap, and timeline. We do not create automatic recurring charges for grant or financing services. You review and approve final applications and make all borrowing and funding decisions.",
    retainerTitle: "Monthly service-area retainers",
    retainerIntro: "Choose individual areas of ongoing support or combine them into the full-service retainer. These are service-area rates from the Master Services Retainer Agreement; separately listed monthly support offers on the Packages page have their own scope and pricing.",
    retainerGroups: [
      {
        title: "Website services",
        items: [
          { name: "Website Essentials", price: "$200 / month", details: ["Up to 2 hours of monthly updates", "Minor text and image edits, plugin and theme updates", "Backup verification, security monitoring, and email support within 48 hours"] },
          { name: "Website Growth", price: "$750 / month", details: ["Up to 6 hours of monthly updates", "Landing page creation and optimization", "SEO improvements, keyword research, speed optimization, and monthly analytics review"] },
          { name: "Website Premium", price: "$1,500 / month", details: ["Unlimited reasonable updates under fair-use guidelines", "New pages, custom development, and priority technical support", "Advanced SEO and technical optimization, plus monthly strategy and roadmap planning"] },
        ],
      },
      {
        title: "Marketing services",
        items: [
          { name: "Marketing Essentials", price: "$200 / month", details: ["Up to 2 hours of monthly marketing support", "One promotional graphic and one email review", "Marketing consultation and practical guidance"] },
          { name: "Marketing Growth", price: "$800 / month", details: ["Monthly marketing strategy and editorial planning", "Up to 8 custom graphics or social assets", "Email campaigns and automation, performance reporting, and insights"] },
          { name: "Marketing Premium", price: "$2,000 / month", details: ["Campaign management across channels", "Lead-generation funnels and landing pages", "Advanced analytics, attribution, ROI tracking, and dedicated creative and copy support"] },
        ],
      },
      {
        title: "Business operations and leadership",
        items: [
          { name: "CRM and Lead Tracking", price: "$1,200 / month", details: ["CRM platform setup and configuration", "Automations, workflows, notifications, dashboards, and pipeline views", "Lead scoring, tracking, and nurture sequences"] },
          { name: "Business Systems", price: "$2,500 / month", details: ["Process mapping and standard operating procedures", "Automation and integration across tools", "Ongoing systems health checks and optimization"] },
          { name: "HR and Recruiting", price: "$2,000 / month", details: ["Recruitment support and candidate sourcing", "Onboarding programs and HR documentation", "Advisory on talent strategy, culture, and performance management"] },
          { name: "Ongoing Growth Support", price: "$1,750 / month", details: ["Executive-level advisory and KPI reviews", "Accountability for key initiatives and goals", "Quarterly planning sessions and roadmap updates"] },
        ],
      },
    ],
    bundleName: "All Packages & Services",
    bundlePrice: "$7,500 / month",
    bundleDetails: "Comprehensive support across website, marketing, CRM, business systems, HR, and growth advisory, with priority scheduling and dedicated strategy sessions. Grant and financing services and fees are separate.",
    termsTitle: "Public summary of retainer terms",
    terms: [
      ["Monthly billing", "Retainers are billed monthly in advance on the first of each month. The selected payment method is charged on a recurring basis, and a detailed invoice and activity summary are provided each month."],
      ["No rollover", "Unused package hours, support time, and meeting slots do not roll over to the next month."],
      ["Additional work", "Work outside the selected scope is $175 per hour unless otherwise agreed in writing. We provide an estimate and obtain approval before starting."],
      ["Month-to-month and cancellation", "Retainers continue month to month. Either party may end the retainer with 15 business days' written notice. Fees for work completed before the end date remain payable."],
      ["Tax and final scope", "All listed fees are in Canadian dollars and exclude HST. Applicable taxes, included hours, deliverables, meeting cadence, and any agreed variations are confirmed in the signed retainer agreement."],
    ],
    note: "This page is a plain-language overview, not an agreement or authorization to begin work. The signed agreement and approved written service order control the final scope, fees, and terms.",
    cta: "Discuss your funding or support needs",
    contact: "Contact us",
    packages: "View current packages",
    notAdvice: "Funding eligibility and outcomes are determined by third parties. Our services are consulting and administrative assistance, not legal, tax, accounting, lending, or regulated financial advice.",
  },
  fr: {
    seoTitle: "Subventions, financement et soutien continu | Performance Processes",
    seoDescription: "Découvrez notre aide à la recherche de subventions, aux demandes de financement, les frais de service et les conditions publiques des mandats mensuels.",
    title: "Soutien au financement et services d’affaires continus.",
    intro: "Un accompagnement pratique pour rechercher des possibilités de financement, préparer des demandes et faire évoluer vos systèmes d’affaires. Chaque mandat de financement est défini et approuvé avant le début des travaux.",
    fundingTitle: "Soutien aux subventions et au financement",
    fundingIntro: "Nous aidons les entreprises canadiennes à repérer des possibilités de financement pertinentes et à préparer des demandes de subvention ou de financement commercial. Les organismes subventionnaires et prêteurs prennent toutes les décisions d’admissibilité, d’approbation et de financement.",
    feeLabel: "Service et unité de facturation",
    priceLabel: "Frais avant les taxes applicables",
    fundingFees: [
      { name: "Recherche de possibilités de subvention", price: "150 $ par possibilité pertinente", details: "Un résumé écrit du programme, des critères publiés, des échéances, des utilisations permises, des documents requis, des considérations préliminaires d’admissibilité et des prochaines étapes. Seules les possibilités distinctes et pertinentes prévues dans une portée et un budget approuvés par écrit sont facturées." },
      { name: "Demande de subvention standard", price: "560 $ par demande", details: "Soutien pour un programme et une période de dépôt, y compris l’évaluation de préparation et d’admissibilité, la rédaction, l’organisation des documents fournis, jusqu’à deux séries de révisions consolidées, le soutien au dépôt et une réponse raisonnable à une demande de précision." },
      { name: "Demande standard de financement commercial", price: "400 $ par demande de prêt", details: "Soutien pour un prêteur et une demande, y compris l’évaluation de préparation, le résumé du financement, l’organisation des documents fournis, l’utilisation prévue des fonds, l’aide à la demande, les révisions et le soutien au dépôt." },
      { name: "Demande complexe de subvention ou de financement", price: "Devis écrit", details: "Pour les demandes exigeant des récits détaillés, plusieurs partenaires, une planification pluriannuelle, des modèles financiers détaillés, des documents techniques ou une vérification approfondie. La portée et les frais sont approuvés avant le début des travaux." },
      { name: "Évaluation de préparation au financement", price: "175 $ par entreprise ou projet", details: "Une consultation d’au plus 60 minutes, l’examen des principaux documents fournis et une liste de préparation écrite. Incluse lorsque la portée approuvée d’une demande ou d’un projet comprend déjà cette évaluation." },
      { name: "Prévisions de trésorerie et projections financières", price: "490 $ par modèle", details: "Un modèle de trésorerie habituellement sur 12 mois, avec hypothèses de revenus et de coûts et calendrier d’utilisation des fonds. Les prévisions sont des estimations fondées sur les renseignements fournis par le client, et non des états financiers audités." },
      { name: "Plans d’affaires, soutien après l’octroi et autres travaux connexes", price: "Devis ou taux horaire approuvé", details: "Les plans d’affaires, mises à jour, réclamations, rapports, suivis auprès des prêteurs, présentations et tâches administratives sont définis séparément. Le soutien horaire approuvé est de 175 $ l’heure, facturé par tranches de 15 minutes dans la limite budgétaire approuvée par écrit." },
    ],
    successTitle: "Des frais de succès s’appliquent au financement couvert",
    successBody: "Pour chaque demande de subvention ou de financement que nous préparons, élaborons, coordonnons ou déposons de façon importante selon un bon de service approuvé par écrit, les frais de succès sont de 6 % des fonds de subvention admissibles ou du capital de financement réellement reçu. Ces frais sont obligatoires pour les demandes couvertes, s’ajoutent aux frais de service et sont facturés au fur et à mesure de la réception des fonds, plus les taxes applicables.",
    successExample: "Par exemple, 6 % de 10 000 $ de fonds admissibles reçus correspond à 600 $ avant les taxes applicables. Une marge de crédit inutilisée, un avis d’octroi conditionnel et un financement sans lien avec notre travail ne déclenchent pas ces frais.",
    restrictions: "Les frais s’appliquent uniquement lorsque la loi applicable et les conditions du programme ou du prêteur le permettent. Si une rémunération en pourcentage est interdite, nous ne procéderons pas selon cette entente. Nous ne prêtons pas de fonds, n’approuvons pas de financement, ne détenons pas les fonds des clients, ne fournissons pas de conseils juridiques, fiscaux ou comptables et n’exerçons pas d’activités réglementées de courtage ou de négociation de valeurs mobilières.",
    authorizationTitle: "Aucun travail ne commence sans votre approbation écrite",
    authorizationBody: "Avant toute recherche, demande ou tout projet, vous recevez une portée écrite précisant la possibilité ou le prêteur, les livrables, les frais, la quantité ou la limite budgétaire et l’échéancier. Les services de subvention et de financement ne créent aucuns frais récurrents automatiques. Vous examinez et approuvez les demandes finales et prenez toutes les décisions de financement et d’emprunt.",
    retainerTitle: "Mandats mensuels par secteur de service",
    retainerIntro: "Choisissez des secteurs de soutien continu ou combinez-les dans le mandat complet. Ces tarifs par secteur proviennent de l’Entente-cadre de services; les forfaits de soutien mensuel affichés séparément sur la page Forfaits ont leur propre portée et leurs propres prix.",
    retainerGroups: [
      {
        title: "Services de site web",
        items: [
          { name: "Essentiel web", price: "200 $ / mois", details: ["Jusqu’à 2 heures de mises à jour par mois", "Petites modifications de texte et d’images, mises à jour des extensions et du thème", "Vérification des sauvegardes, surveillance de sécurité et soutien par courriel sous 48 heures"] },
          { name: "Croissance web", price: "750 $ / mois", details: ["Jusqu’à 6 heures de mises à jour par mois", "Création et optimisation de pages de destination", "Améliorations SEO, recherche de mots-clés, vitesse et analyse mensuelle"] },
          { name: "Web premium", price: "1 500 $ / mois", details: ["Mises à jour raisonnables illimitées, selon une utilisation équitable", "Nouvelles pages, développement sur mesure et soutien technique prioritaire", "SEO avancé, optimisation technique, consultation stratégique et feuille de route mensuelles"] },
        ],
      },
      {
        title: "Services de marketing",
        items: [
          { name: "Essentiel marketing", price: "200 $ / mois", details: ["Jusqu’à 2 heures de soutien marketing par mois", "Un visuel promotionnel et une révision de courriel", "Consultation marketing et conseils pratiques"] },
          { name: "Croissance marketing", price: "800 $ / mois", details: ["Stratégie marketing et calendrier éditorial mensuels", "Jusqu’à 8 visuels ou contenus pour les réseaux sociaux", "Campagnes et automatisation par courriel, rapports et résultats"] },
          { name: "Marketing premium", price: "2 000 $ / mois", details: ["Gestion de campagnes sur plusieurs canaux", "Parcours de génération de prospects et pages de destination", "Analytique avancée, attribution, suivi du rendement et soutien créatif et rédactionnel dédié"] },
        ],
      },
      {
        title: "Opérations et leadership",
        items: [
          { name: "CRM et suivi des prospects", price: "1 200 $ / mois", details: ["Configuration d’une plateforme CRM", "Automatisations, flux de travail, notifications, tableaux de bord et pipelines", "Qualification, suivi et relance des prospects"] },
          { name: "Systèmes d’affaires", price: "2 500 $ / mois", details: ["Cartographie des processus et procédures opérationnelles", "Automatisation et intégration des outils", "Vérification continue et optimisation des systèmes"] },
          { name: "RH et recrutement", price: "2 000 $ / mois", details: ["Soutien au recrutement et recherche de candidats", "Programmes d’accueil et documentation RH", "Conseils sur la stratégie de talent, la culture et la gestion du rendement"] },
          { name: "Soutien continu à la croissance", price: "1 750 $ / mois", details: ["Conseil de niveau exécutif et révision des indicateurs", "Responsabilisation pour les initiatives et objectifs clés", "Planification trimestrielle et mise à jour de la feuille de route"] },
        ],
      },
    ],
    bundleName: "Tous les forfaits et services",
    bundlePrice: "7 500 $ / mois",
    bundleDetails: "Soutien complet pour le site web, le marketing, le CRM, les systèmes d’affaires, les RH et le conseil en croissance, avec planification prioritaire et séances stratégiques dédiées. Les services et frais de subvention et de financement sont distincts.",
    termsTitle: "Résumé public des conditions des mandats",
    terms: [
      ["Facturation mensuelle", "Les mandats sont facturés d’avance chaque mois, le premier jour du mois. Le mode de paiement choisi est débité de façon récurrente; une facture détaillée et un résumé des activités sont fournis chaque mois."],
      ["Aucun report", "Les heures, le temps de soutien et les rencontres non utilisés ne sont pas reportés au mois suivant."],
      ["Travaux supplémentaires", "Les travaux hors portée sont facturés 175 $ l’heure, sauf entente écrite différente. Une estimation est fournie et approuvée avant le début des travaux."],
      ["Mois par mois et résiliation", "Les mandats se poursuivent de mois en mois. Chaque partie peut y mettre fin avec un préavis écrit de 15 jours ouvrables. Les frais liés aux travaux réalisés avant la date de fin demeurent payables."],
      ["Taxes et portée finale", "Tous les frais indiqués sont en dollars canadiens et excluent la TVH. Les taxes applicables, les heures incluses, les livrables, la fréquence des rencontres et toute variation convenue sont précisés dans l’entente signée."],
    ],
    note: "Cette page est un résumé en langage clair, et non une entente ni une autorisation de commencer les travaux. L’entente signée et le bon de service approuvé déterminent la portée, les frais et les conditions définitifs.",
    cta: "Discuter de vos besoins de financement ou de soutien",
    contact: "Nous contacter",
    packages: "Voir les forfaits actuels",
    notAdvice: "L’admissibilité et les résultats du financement sont déterminés par des tiers. Nos services sont de l’accompagnement-conseil et de l’assistance administrative, et non des conseils juridiques, fiscaux, comptables, de prêt ou des conseils financiers réglementés.",
  },
} as const;

export default function FundingRetainers() {
  const { language } = useLanguage();
  const copy = PAGE_COPY[language];
  const fr = language === "fr";

  return (
    <div className="min-h-screen bg-background text-primary">
      <SEOHead title={copy.seoTitle} description={copy.seoDescription} path="/funding-retainers" />
      <Navbar />
      <main>
        <section className="border-b border-primary/10 bg-secondary px-5 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-display max-w-4xl text-5xl leading-[.98] md:text-7xl">{copy.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm">
              <a href="#funding" className="border-b border-primary pb-1">{fr ? "Subventions et financement" : "Grants and financing"} ↓</a>
              <a href="#retainers" className="border-b border-primary pb-1">{fr ? "Mandats mensuels et conditions" : "Monthly retainers and terms"} ↓</a>
            </div>
          </div>
        </section>

        <section id="funding" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-display text-4xl md:text-5xl">{copy.fundingTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{copy.fundingIntro}</p>
          </div>

          <div className="overflow-x-auto border-y border-primary/20">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-primary/20 text-xs uppercase tracking-[.12em] text-muted-foreground">
                  <th scope="col" className="py-4 pr-6 font-medium">{copy.feeLabel}</th>
                  <th scope="col" className="py-4 pr-6 font-medium">{copy.priceLabel}</th>
                  <th scope="col" className="py-4 font-medium">{fr ? "Portée" : "What’s included"}</th>
                </tr>
              </thead>
              <tbody>
                {copy.fundingFees.map((fee) => (
                  <tr key={fee.name} className="border-b border-primary/10 align-top last:border-0">
                    <th scope="row" className="w-[25%] py-5 pr-6 text-base font-semibold">{fee.name}</th>
                    <td className="w-[23%] py-5 pr-6 text-sm font-semibold text-accent">{fee.price}</td>
                    <td className="py-5 text-sm leading-6 text-muted-foreground">{fee.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 border-l-2 border-accent bg-secondary p-6 md:p-8">
            <h3 className="text-display text-3xl">{copy.successTitle}</h3>
            <p className="mt-4 max-w-4xl leading-7">{copy.successBody}</p>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">{copy.successExample}</p>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-muted-foreground">{copy.restrictions}</p>
          </div>

          <div className="mt-8 grid gap-8 border-t border-primary/15 pt-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">{copy.authorizationTitle}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{copy.authorizationBody}</p>
            </div>
            <p className="border-l border-primary/15 pl-5 text-sm leading-6 text-muted-foreground">{copy.notAdvice}</p>
          </div>
        </section>

        <section id="retainers" className="scroll-mt-24 border-y border-primary/10 bg-secondary px-5 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-display text-4xl md:text-5xl">{copy.retainerTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{copy.retainerIntro}</p>
            </div>

            <div className="mb-14 border-y border-primary/20 bg-background px-6 py-7 md:px-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <h3 className="text-display text-3xl">{copy.bundleName}</h3>
                  <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{copy.bundleDetails}</p>
                </div>
                <p className="shrink-0 text-xl font-semibold text-accent">{copy.bundlePrice}</p>
              </div>
            </div>

            <div className="space-y-16">
              {copy.retainerGroups.map((group) => (
                <section key={group.title}>
                  <h3 className="mb-6 border-b border-primary/20 pb-4 text-display text-3xl">{group.title}</h3>
                  <div className="divide-y divide-primary/15">
                    {group.items.map((item) => (
                      <article key={item.name} className="grid gap-4 py-6 md:grid-cols-[.7fr_.3fr_1.2fr] md:gap-8">
                        <h4 className="text-lg font-semibold">{item.name}</h4>
                        <p className="text-sm font-semibold text-accent">{item.price}</p>
                        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                          {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 border-t border-primary/20 pt-8">
              <h3 className="text-display text-3xl">{copy.termsTitle}</h3>
              <dl className="mt-6 divide-y divide-primary/15">
                {copy.terms.map(([term, details]) => (
                  <div key={term} className="grid gap-2 py-5 md:grid-cols-[.45fr_1fr] md:gap-8">
                    <dt className="font-semibold">{term}</dt>
                    <dd className="text-sm leading-6 text-muted-foreground">{details}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="max-w-4xl text-sm leading-6 text-muted-foreground">{copy.note}</p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/contact" className="bg-accent px-6 py-4 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">{copy.cta}</Link>
            <Link href="/packages" className="self-center border-b border-primary pb-1 text-sm">{copy.packages}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
