import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

import communityCollaborationImg from "@assets/generated/community-collaboration.png";
import communityWorkspaceImg from "@assets/generated/community-workspace.png";
import communityTownhallImg from "@assets/generated/community-townhall.png";
import milestoneImg from "@assets/generated/milestone-celebration.png";
import teamMovingForwardImg from "@assets/generated/team-moving-forward.png";
import communityNetworkImg from "@assets/generated/community-network-abstract.png";
import empoweredOwnerImg from "@assets/generated/empowered-business-owner.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CONTENT = {
  en: {
    hero: {
      titleA: "One system.",
      titleB: "Multiple ways in.",
      subtitle: "Whether you're a solo professional, a growing small business, or a scaling organization, we meet you where you are, with the level of support you need.",
      exploreServices: "Explore Our Services",
      seeAllOptions: "See All Options",
    },
    system: {
      eyebrow: "The System",
      heading: "Five integrated systems, one growth engine",
      para: "Everything your business needs to scale, integrated and delivered as one unified system across every tier of engagement.",
      components: [
        { name: "Talent Acquisition System", desc: "Build the team structure required to scale, finding and placing the right people in the right roles." },
        { name: "People & Performance System", desc: "Performance systems that improve execution, from onboarding to reviews to accountability." },
        { name: "Demand Generation System", desc: "Systems that attract and convert customers through strategy, content, and campaigns." },
        { name: "Conversion System", desc: "Digital infrastructure that turns visitors into leads and leads into clients." },
        { name: "Execution Systems", desc: "Practical tools, templates, and frameworks that codify your operations for repeatable success." },
      ],
      allCombinedTitle: "All Systems Combined",
      allCombinedDesc: "Available across every tier, from playbooks to full builds",
    },
    ladder: {
      eyebrow: "Your Growth Path",
      heading: "Start where you are. Scale from there.",
      para: "Every tier uses the same proven system. Choose the level of support that fits your stage, and upgrade as you grow.",
      steps: [
        { label: "Start", tier: "Playbooks" },
        { label: "Learn", tier: "Training Programs" },
        { label: "Grow", tier: "Guided Implementation" },
        { label: "Scale", tier: "Full System Build" },
      ],
      chain: ["Self-paced", "Structured training", "Hands-on support", "Ongoing partnership"],
    },
    ways: {
      eyebrow: "Ways to Work With Us",
      heading: "Choose the right level for your business",
      para: "One system, four ways to access it. From self-guided playbooks to structured training to full-scale implementation, every tier delivers the same proven methodology.",
      bestForLabel: "Best for",
      includedLabel: "What's included",
      includedModularLabel: "What's included (modular)",
      exampleSystemsLabel: "Example systems",
      exampleProgramsLabel: "Example programs",
      examplePackagesLabel: "Example packages",
    },
    tierPlaybooks: {
      badge: "Tier 1: Entry Level",
      title: "Playbooks",
      desc: "Self-guided systems to implement structure, hiring, marketing, and execution on your own.",
      meta2: "Self-paced",
      bestFor: "Professionals, consultants, coaches, solo operators, early-stage small businesses, and budget-conscious nonprofits",
      included: ["Templates and frameworks", "SOP structures", "KPI systems", "Funnel and website structures", "Hiring systems", "Implementation guides"],
      examples: [
        { name: "Hiring System", price: "$199" },
        { name: "Performance Management System", price: "$279" },
        { name: "Operations Blueprint", price: "$199" },
      ],
      cta: "Request a Playbook",
    },
    tierTraining: {
      badge: "Tier 2: Training",
      title: "Training Programs",
      desc: "Practical training programs that help leaders and teams implement real systems for growth, execution, and performance.",
      meta2: "1 session to 8 weeks",
      bestFor: "Small businesses, nonprofits, professionals, small teams, and founder-led organizations looking for guided learning with practical application",
      included: ["Live virtual training sessions", "Cohort-based implementation programs", "Team workshops (in-person or virtual)", "Templates and implementation tools", "System-specific curriculum", "Post-training action plans"],
      examples: [
        { name: "Business System Foundations", price: "$199+" },
        { name: "Hiring & Team Systems", price: "$299+" },
        { name: "Growth Systems Training", price: "$299+" },
      ],
      cta: "Inquire About Training",
    },
    tierGuided: {
      flag: "Most Flexible",
      badge: "Tier 3: Mid-Tier",
      title: "Guided Implementation",
      desc: "Hands-on support to install key systems without a full-scale engagement. We work alongside you to get it right.",
      meta2: "2 to 8 weeks",
      bestFor: "Small businesses ($500K to $5M), funded or scaling nonprofits, and professionals ready to invest in structured implementation",
      included: ["Foundation sprint (org structure, KPIs)", "Hiring system setup", "Website conversion improvements", "Funnel and CRM setup", "Basic playbook creation", "Process fixes and optimization"],
      examples: [
        { name: "Foundation Sprint", desc: "Org structure + KPI system", price: "$3K to $6K", time: "2 to 4 weeks" },
        { name: "Growth Engine Sprint", desc: "Website + funnel + CRM", price: "$5K to $10K", time: "4 to 8 weeks" },
        { name: "Hiring System Setup", desc: "Hiring process + scorecards + onboarding", price: "$2K to $5K", time: "2 to 4 weeks" },
      ],
      cta: "Explore Guided Implementation",
    },
    tierFull: {
      badge: "Tier 4: Scale",
      title: "Full System Build",
      desc: "Complete design, build, and ongoing operation of your business systems. We become your infrastructure partner.",
      meta2: "2 weeks to ongoing",
      bestFor: "Growing businesses ($1M+), larger nonprofits, and established teams ready for comprehensive infrastructure",
      phases: [
        { label: "Phase 1: Foundation", desc: "Org structure, KPI systems, process design, strategy and roadmap", price: "$5,000 to $15,000", time: "2 to 4 weeks" },
        { label: "Phase 2: Build", desc: "Recruiting, HR systems, website, marketing funnel, CRM, playbooks", price: "$15,000 to $50,000+", time: "6 to 12 weeks" },
        { label: "Phase 3: Run", desc: "KPI tracking, execution support, marketing optimization, process refinement", price: "$4,000 to $12,000/mo", time: "Ongoing" },
      ],
      cta: "Book a Strategy Call",
    },
    phases: {
      eyebrow: "Full System Build: How We Deliver",
      heading: "Three phases to scalable growth",
      para: "Every full engagement follows a structured path: design, implement, optimize. Each phase builds on the last to create infrastructure that compounds.",
      foundation: {
        eyebrow: "Phase 1",
        title: "Foundation",
        desc: "Design the business for scale. We audit your current state and build the blueprint for growth.",
        items: ["Business audit", "Org structure design", "Role definition", "KPI and performance system design", "Process mapping", "Playbook creation", "Marketing strategy and customer journey"],
        time: "2 to 4 weeks",
      },
      build: {
        eyebrow: "Phase 2",
        title: "Build",
        desc: "Implement people, systems, and growth infrastructure. This is where the system comes to life.",
        peopleLabel: "People & Operations",
        peopleItems: ["Talent acquisition and placement", "People & performance system setup", "Performance management implementation"],
        demandLabel: "Demand Generation & Conversion",
        demandItems: ["Conversion system design and development", "Landing pages and funnel architecture", "Demand generation system setup", "CRM and lead tracking", "Analytics and dashboards"],
        time: "6 to 12 weeks",
      },
      run: {
        eyebrow: "Phase 3",
        title: "Run",
        desc: "Ongoing execution, optimization, and scaling. We stay embedded in your operations to keep the system running and improving.",
        items: ["KPI tracking and reporting", "Weekly and monthly performance reviews", "Ongoing talent acquisition support", "Process and operations optimization", "Demand generation optimization", "Funnel and conversion improvements", "Digital infrastructure optimization", "Strategic advisory"],
        time: "Ongoing (minimum 3 to 6 months)",
      },
    },
    flagship: {
      badge: "Flagship Offer",
      title: "90-Day Growth Infrastructure Build",
      desc: "A structured engagement combining Foundation + Build into one accelerated implementation. In 90 days, we design your growth blueprint and build the infrastructure to execute it.",
      items: ["Complete strategy and system design", "Recruiting priorities and team building", "Website and marketing infrastructure setup", "Operational systems and playbooks", "Performance tracking and KPI frameworks"],
      meta1: "~90 days",
      cta: "Book a Strategy Call",
      cardLabel: "days to full growth infrastructure",
    },
    who: {
      eyebrow: "Find Your Fit",
      heading: "Who this is for",
      para: "We serve multiple audiences through one unified system. Here's where you fit and the best way to start.",
      bestFitLabel: "Best fit",
      investmentLabel: "Expected investment",
      cards: [
        {
          audience: "Professionals",
          desc: "Consultants, coaches, solo operators looking to build structured systems for their practice.",
          bestFit: "Playbooks, Training, or Guided Implementation",
          cta: "Explore Our Services",
        },
        {
          audience: "Small Businesses",
          desc: "Early to mid-stage companies ($500K to $5M) ready to install repeatable systems for growth.",
          bestFit: "Training, Guided Implementation, or Full System",
          cta: "Explore Our Services",
        },
        {
          audience: "Nonprofits",
          desc: "Mission-driven organizations that need structure, hiring systems, and operational clarity without enterprise budgets.",
          bestFit: "Playbooks, Training, or Guided Implementation",
          cta: "Request a Quote",
        },
        {
          audience: "Growing Organizations",
          desc: "Established businesses ($1M+) and larger nonprofits ready for comprehensive infrastructure design and implementation.",
          bestFit: "Training Workshops, Guided Implementation, or Full System Build",
          cta: "Book a Strategy Call",
        },
      ],
    },
    finalCta: {
      heading: "Ready to build the infrastructure your business needs?",
      para: "Whether you're starting with a playbook, joining a training program, exploring guided implementation, or ready for a full system build, the next step is simple.",
      services: "Explore Our Services",
      quote: "Request a Quote",
      book: "Book a Strategy Call",
    },
  },
  fr: {
    hero: {
      titleA: "Un seul système.",
      titleB: "Plusieurs façons d'y accéder.",
      subtitle: "Que vous soyez un professionnel indépendant, une petite entreprise en croissance ou une organisation en expansion, nous vous rencontrons là où vous êtes, avec le niveau d'accompagnement dont vous avez besoin.",
      exploreServices: "Découvrir nos services",
      seeAllOptions: "Voir toutes les options",
    },
    system: {
      eyebrow: "Le système",
      heading: "Cinq systèmes intégrés, un moteur de croissance",
      para: "Tout ce dont votre entreprise a besoin pour croître, intégré et livré comme un système unifié à chaque niveau d'engagement.",
      components: [
        { name: "Système d'acquisition de talents", desc: "Bâtir la structure d'équipe nécessaire à la croissance, en trouvant et en plaçant les bonnes personnes aux bons postes." },
        { name: "Système de gestion des personnes et de la performance", desc: "Des systèmes de performance qui améliorent l'exécution, de l'intégration aux évaluations et à la responsabilisation." },
        { name: "Système de génération de la demande", desc: "Des systèmes qui attirent et convertissent les clients grâce à la stratégie, au contenu et aux campagnes." },
        { name: "Système de conversion", desc: "Une infrastructure numérique qui transforme les visiteurs en prospects et les prospects en clients." },
        { name: "Systèmes d'exécution", desc: "Des outils, modèles et cadres pratiques qui codifient vos opérations pour un succès reproductible." },
      ],
      allCombinedTitle: "Tous les systèmes combinés",
      allCombinedDesc: "Disponibles à chaque niveau, des playbooks aux implémentations complètes",
    },
    ladder: {
      eyebrow: "Votre parcours de croissance",
      heading: "Commencez là où vous êtes. Progressez à partir de là.",
      para: "Chaque niveau utilise le même système éprouvé. Choisissez le niveau d'accompagnement adapté à votre stade, et évoluez au fur et à mesure de votre croissance.",
      steps: [
        { label: "Démarrer", tier: "Playbooks" },
        { label: "Apprendre", tier: "Programmes de formation" },
        { label: "Croître", tier: "Implémentation accompagnée" },
        { label: "Développer", tier: "Construction complète de systèmes" },
      ],
      chain: ["À votre rythme", "Formation structurée", "Soutien pratique", "Partenariat continu"],
    },
    ways: {
      eyebrow: "Façons de travailler avec nous",
      heading: "Choisissez le bon niveau pour votre entreprise",
      para: "Un seul système, quatre façons d'y accéder. Des playbooks autonomes à la formation structurée jusqu'à l'implémentation à grande échelle, chaque niveau offre la même méthodologie éprouvée.",
      bestForLabel: "Idéal pour",
      includedLabel: "Ce qui est inclus",
      includedModularLabel: "Ce qui est inclus (modulaire)",
      exampleSystemsLabel: "Exemples de systèmes",
      exampleProgramsLabel: "Exemples de programmes",
      examplePackagesLabel: "Exemples de forfaits",
    },
    tierPlaybooks: {
      badge: "Niveau 1 : Entrée de gamme",
      title: "Playbooks",
      desc: "Des systèmes autonomes pour mettre en place structure, recrutement, marketing et exécution par vous-même.",
      meta2: "À votre rythme",
      bestFor: "Professionnels, consultants, coachs, opérateurs indépendants, petites entreprises en démarrage et organismes sans but lucratif soucieux de leur budget",
      included: ["Modèles et cadres", "Structures de procédures normalisées", "Systèmes d'indicateurs de performance", "Structures de tunnels et de sites web", "Systèmes de recrutement", "Guides d'implémentation"],
      examples: [
        { name: "Système de recrutement", price: "$199" },
        { name: "Système de gestion de la performance", price: "$279" },
        { name: "Plan directeur des opérations", price: "$199" },
      ],
      cta: "Demander un playbook",
    },
    tierTraining: {
      badge: "Niveau 2 : Formation",
      title: "Programmes de formation",
      desc: "Des programmes de formation pratiques qui aident les dirigeants et les équipes à mettre en place de véritables systèmes de croissance, d'exécution et de performance.",
      meta2: "1 séance à 8 semaines",
      bestFor: "Petites entreprises, organismes sans but lucratif, professionnels, petites équipes et organisations dirigées par leur fondateur recherchant un apprentissage encadré avec une application pratique",
      included: ["Séances de formation virtuelles en direct", "Programmes d'implémentation en cohorte", "Ateliers d'équipe (en personne ou virtuels)", "Modèles et outils d'implémentation", "Programme adapté à chaque système", "Plans d'action après la formation"],
      examples: [
        { name: "Fondations des systèmes d'affaires", price: "$199+" },
        { name: "Systèmes de recrutement et d'équipe", price: "$299+" },
        { name: "Formation aux systèmes de croissance", price: "$299+" },
      ],
      cta: "S'informer sur la formation",
    },
    tierGuided: {
      flag: "Le plus flexible",
      badge: "Niveau 3 : Intermédiaire",
      title: "Implémentation accompagnée",
      desc: "Un soutien pratique pour installer les systèmes clés sans engagement à grande échelle. Nous travaillons à vos côtés pour bien faire les choses.",
      meta2: "2 à 8 semaines",
      bestFor: "Petites entreprises (500 000 $ à 5 M$), organismes sans but lucratif financés ou en croissance, et professionnels prêts à investir dans une implémentation structurée",
      included: ["Sprint de fondation (structure organisationnelle, indicateurs)", "Mise en place du système de recrutement", "Améliorations de la conversion du site web", "Configuration du tunnel et du CRM", "Création de playbook de base", "Corrections et optimisation des processus"],
      examples: [
        { name: "Sprint de fondation", desc: "Structure organisationnelle + système d'indicateurs", price: "$3K to $6K", time: "2 à 4 semaines" },
        { name: "Sprint moteur de croissance", desc: "Site web + tunnel + CRM", price: "$5K to $10K", time: "4 à 8 semaines" },
        { name: "Mise en place du système de recrutement", desc: "Processus de recrutement + grilles d'évaluation + intégration", price: "$2K to $5K", time: "2 à 4 semaines" },
      ],
      cta: "Découvrir l'implémentation accompagnée",
    },
    tierFull: {
      badge: "Niveau 4 : Expansion",
      title: "Construction complète de systèmes",
      desc: "Conception, construction et exploitation continue complètes de vos systèmes d'affaires. Nous devenons votre partenaire d'infrastructure.",
      meta2: "2 semaines à en continu",
      bestFor: "Entreprises en croissance (1 M$ et plus), plus grands organismes sans but lucratif et équipes établies prêtes pour une infrastructure complète",
      phases: [
        { label: "Phase 1 : Fondation", desc: "Structure organisationnelle, systèmes d'indicateurs, conception des processus, stratégie et feuille de route", price: "$5,000 to $15,000", time: "2 à 4 semaines" },
        { label: "Phase 2 : Construction", desc: "Recrutement, systèmes RH, site web, tunnel marketing, CRM, playbooks", price: "$15,000 to $50,000+", time: "6 à 12 semaines" },
        { label: "Phase 3 : Exploitation", desc: "Suivi des indicateurs, soutien à l'exécution, optimisation marketing, raffinement des processus", price: "$4,000 to $12,000/mo", time: "En continu" },
      ],
      cta: "Réserver un appel stratégique",
    },
    phases: {
      eyebrow: "Construction complète de systèmes : notre livraison",
      heading: "Trois phases vers une croissance évolutive",
      para: "Chaque engagement complet suit un parcours structuré : concevoir, implémenter, optimiser. Chaque phase s'appuie sur la précédente pour créer une infrastructure qui se renforce dans le temps.",
      foundation: {
        eyebrow: "Phase 1",
        title: "Fondation",
        desc: "Concevoir l'entreprise pour la croissance. Nous évaluons votre situation actuelle et bâtissons le plan directeur de croissance.",
        items: ["Audit d'entreprise", "Conception de la structure organisationnelle", "Définition des rôles", "Conception du système d'indicateurs et de performance", "Cartographie des processus", "Création de playbooks", "Stratégie marketing et parcours client"],
        time: "2 à 4 semaines",
      },
      build: {
        eyebrow: "Phase 2",
        title: "Construction",
        desc: "Implémenter les personnes, les systèmes et l'infrastructure de croissance. C'est là que le système prend vie.",
        peopleLabel: "Personnes et opérations",
        peopleItems: ["Acquisition et placement des talents", "Mise en place du système de gestion des personnes et de la performance", "Implémentation de la gestion de la performance"],
        demandLabel: "Génération de la demande et conversion",
        demandItems: ["Conception et développement du système de conversion", "Pages d'atterrissage et architecture de tunnel", "Mise en place du système de génération de la demande", "CRM et suivi des prospects", "Analytique et tableaux de bord"],
        time: "6 à 12 semaines",
      },
      run: {
        eyebrow: "Phase 3",
        title: "Exploitation",
        desc: "Exécution, optimisation et mise à l'échelle en continu. Nous restons intégrés à vos opérations pour que le système continue de fonctionner et de s'améliorer.",
        items: ["Suivi et production de rapports sur les indicateurs", "Revues de performance hebdomadaires et mensuelles", "Soutien continu à l'acquisition de talents", "Optimisation des processus et des opérations", "Optimisation de la génération de la demande", "Améliorations du tunnel et de la conversion", "Optimisation de l'infrastructure numérique", "Conseil stratégique"],
        time: "En continu (minimum de 3 à 6 mois)",
      },
    },
    flagship: {
      badge: "Offre phare",
      title: "Construction d'infrastructure de croissance en 90 jours",
      desc: "Un engagement structuré combinant Fondation et Construction en une seule implémentation accélérée. En 90 jours, nous concevons votre plan directeur de croissance et bâtissons l'infrastructure pour l'exécuter.",
      items: ["Conception complète de la stratégie et du système", "Priorités de recrutement et constitution d'équipe", "Mise en place de l'infrastructure web et marketing", "Systèmes opérationnels et playbooks", "Suivi de la performance et cadres d'indicateurs"],
      meta1: "~90 jours",
      cta: "Réserver un appel stratégique",
      cardLabel: "jours vers une infrastructure de croissance complète",
    },
    who: {
      eyebrow: "Trouvez votre profil",
      heading: "À qui cela s'adresse",
      para: "Nous servons plusieurs clientèles grâce à un système unifié. Voici où vous vous situez et la meilleure façon de commencer.",
      bestFitLabel: "Meilleure option",
      investmentLabel: "Investissement prévu",
      cards: [
        {
          audience: "Professionnels",
          desc: "Consultants, coachs et opérateurs indépendants souhaitant bâtir des systèmes structurés pour leur pratique.",
          bestFit: "Playbooks, Formation ou Implémentation accompagnée",
          cta: "Découvrir nos services",
        },
        {
          audience: "Petites entreprises",
          desc: "Entreprises en démarrage ou en croissance (500 000 $ à 5 M$) prêtes à installer des systèmes reproductibles pour croître.",
          bestFit: "Formation, Implémentation accompagnée ou Système complet",
          cta: "Découvrir nos services",
        },
        {
          audience: "Organismes sans but lucratif",
          desc: "Organisations à vocation sociale qui ont besoin de structure, de systèmes de recrutement et de clarté opérationnelle sans budgets d'entreprise.",
          bestFit: "Playbooks, Formation ou Implémentation accompagnée",
          cta: "Demander une soumission",
        },
        {
          audience: "Organisations en croissance",
          desc: "Entreprises établies (1 M$ et plus) et plus grands organismes sans but lucratif prêts pour la conception et l'implémentation d'une infrastructure complète.",
          bestFit: "Ateliers de formation, Implémentation accompagnée ou Construction complète de systèmes",
          cta: "Réserver un appel stratégique",
        },
      ],
    },
    finalCta: {
      heading: "Prêt à bâtir l'infrastructure dont votre entreprise a besoin ?",
      para: "Que vous commenciez par un playbook, participiez à un programme de formation, exploriez l'implémentation accompagnée ou soyez prêt pour une construction complète de systèmes, la prochaine étape est simple.",
      services: "Découvrir nos services",
      quote: "Demander une soumission",
      book: "Réserver un appel stratégique",
    },
  },
};

export default function Solutions() {
  const { language } = useLanguage();
  const c = CONTENT[language];

  const systemComponents = c.system.components;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans overflow-x-hidden">
      <SEOHead
        title="Growth Infrastructure System | Performance Processes"
        description="One system, multiple access levels. From self-guided playbooks to guided implementation to full system builds. We design, build, and run the systems businesses need to scale."
        path="/solutions"
      />
      <Navbar />

      <main className="flex-grow">

        <section className="relative min-h-[650px] lg:min-h-[750px] flex items-center overflow-hidden bg-primary" data-testid="section-solutions-hero">
          <div className="absolute inset-0 z-0">
            <img src={communityNetworkImg} alt="" className="w-full h-full object-cover opacity-15 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/98 to-primary/80" />
          </div>
          <GradientOrb className="w-96 h-96 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-16 h-16 top-[20%] right-[10%] z-[3]" variant="ring" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.15s" }} data-testid="text-solutions-hero-title">
                {c.hero.titleA} <span className="text-accent">{c.hero.titleB}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                {c.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                <Link href="/#capabilities" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-accent hover:text-white h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl" data-testid="link-solutions-hero-services">

                  {c.hero.exploreServices}
                </Link>
                <a href="#ways-to-work" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-solutions-hero-tiers">
                  {c.hero.seeAllOptions}
                  <span aria-hidden="true">&#9662;</span>
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
        </section>

        <section className="py-24 bg-white relative overflow-hidden" data-testid="section-system-components">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">{c.system.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                {c.system.heading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c.system.para}
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {systemComponents.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 80}>
                  <div className="relative p-7 rounded-2xl border border-border bg-white hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 h-full group" data-testid={`system-component-${i}`}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent/0 group-hover:bg-accent transition-all duration-300 rounded-l-2xl" />
                    <h3 className="text-base font-bold text-primary mb-2 group-hover:text-accent transition-colors">{item.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
              <AnimateOnScroll animation="fade-up" delay={5 * 80}>
                <div className="relative p-7 rounded-2xl border-2 border-dashed border-accent/30 bg-accent/5 flex flex-col items-center justify-center text-center h-full group hover:border-accent/50 transition-all" data-testid="system-component-cta">
                  <p className="text-sm font-bold text-primary mb-1">{c.system.allCombinedTitle}</p>
                  <p className="text-xs text-muted-foreground">{c.system.allCombinedDesc}</p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#FAFAFA] relative overflow-hidden" data-testid="section-value-ladder">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">{c.ladder.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                {c.ladder.heading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c.ladder.para}
              </p>
            </AnimateOnScroll>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0 relative">
                <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-zinc-500 via-zinc-500 via-accent to-primary z-0" />

                {[
                  { label: c.ladder.steps[0].label, tier: c.ladder.steps[0].tier, price: "$149 to $999", color: "bg-zinc-700", ring: "ring-zinc-200" },
                  { label: c.ladder.steps[1].label, tier: c.ladder.steps[1].tier, price: "$99 to $10,000", color: "bg-zinc-700", ring: "ring-zinc-200" },
                  { label: c.ladder.steps[2].label, tier: c.ladder.steps[2].tier, price: "$2,000 to $10,000", color: "bg-accent", ring: "ring-zinc-200" },
                  { label: c.ladder.steps[3].label, tier: c.ladder.steps[3].tier, price: "$5,000 to $50,000+", color: "bg-primary", ring: "ring-zinc-200" },
                ].map((step, i) => (
                  <AnimateOnScroll key={i} animation="fade-up" delay={i * 120}>
                    <div className="flex flex-col items-center relative z-10 py-6">
                      <div className={`w-14 h-14 rounded-full ${step.color} text-white flex items-center justify-center text-base font-extrabold shadow-lg ring-4 ${step.ring} mb-3`}>
                        {i + 1}
                      </div>
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-1">{step.label}</p>
                      <p className="text-base font-bold text-primary mb-1">{step.tier}</p>
                      <p className="text-sm text-muted-foreground font-medium">{step.price}</p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>

              <AnimateOnScroll className="text-center mt-8">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>{c.ladder.chain[0]}</span>
                  <span className="text-accent/40">→</span>
                  <span>{c.ladder.chain[1]}</span>
                  <span className="text-accent/40">→</span>
                  <span>{c.ladder.chain[2]}</span>
                  <span className="text-accent/40">→</span>
                  <span>{c.ladder.chain[3]}</span>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="ways-to-work" className="py-28 bg-white relative overflow-hidden" data-testid="section-ways-to-work">
          <FloatingShape className="w-24 h-24 top-20 -left-8" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">{c.ways.eyebrow}</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {c.ways.heading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c.ways.para}
              </p>
            </AnimateOnScroll>

            <div className="space-y-16 max-w-6xl mx-auto">

              <AnimateOnScroll animation="fade-up">
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="tier-playbooks">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 relative">
                      <div className="h-full min-h-[280px] bg-gradient-to-br from-zinc-700 to-zinc-800 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">

                          {c.tierPlaybooks.badge}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3">{c.tierPlaybooks.title}</h3>
                        <p className="text-white/80 leading-relaxed mb-4">{c.tierPlaybooks.desc}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-white/70">

                            <span className="font-bold text-white">$149 to $999</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">

                            <span className="font-bold text-white">{c.tierPlaybooks.meta2}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">{c.ways.bestForLabel}</p>
                        <p className="text-sm text-muted-foreground">{c.tierPlaybooks.bestFor}</p>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{c.ways.includedLabel}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {c.tierPlaybooks.included.map((item, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{c.ways.exampleSystemsLabel}</p>
                        <div className="flex flex-wrap gap-3">
                          {c.tierPlaybooks.examples.map((ex, j) => (
                            <div key={j} className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-100 rounded-full px-4 py-2 text-sm">
                              <span className="font-semibold text-primary">{ex.name}</span>
                              <span className="text-zinc-800 font-bold">{ex.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-700 text-white hover:bg-zinc-800 h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-tier-playbooks">

                        {c.tierPlaybooks.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={100}>
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="tier-training">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 relative">
                      <div className="h-full min-h-[280px] bg-gradient-to-br from-zinc-700 to-zinc-900 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">

                          {c.tierTraining.badge}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3">{c.tierTraining.title}</h3>
                        <p className="text-white/80 leading-relaxed mb-4">{c.tierTraining.desc}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-white/70">

                            <span className="font-bold text-white">$99 to $10,000</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">

                            <span className="font-bold text-white">{c.tierTraining.meta2}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">{c.ways.bestForLabel}</p>
                        <p className="text-sm text-muted-foreground">{c.tierTraining.bestFor}</p>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{c.ways.includedLabel}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {c.tierTraining.included.map((item, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{c.ways.exampleProgramsLabel}</p>
                        <div className="flex flex-wrap gap-3">
                          {c.tierTraining.examples.map((ex, j) => (
                            <div key={j} className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-100 rounded-full px-4 py-2 text-sm">
                              <span className="font-semibold text-primary">{ex.name}</span>
                              <span className="text-zinc-800 font-bold">{ex.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-700 text-white hover:bg-zinc-800 h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-tier-training">

                        {c.tierTraining.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={200}>
                <div className="bg-white rounded-3xl border-2 border-accent/30 shadow-xl overflow-hidden relative" data-testid="tier-guided">
                  <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">{c.tierGuided.flag}</div>
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 relative">
                      <div className="h-full min-h-[280px] bg-gradient-to-br from-accent to-zinc-900 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">

                          {c.tierGuided.badge}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3">{c.tierGuided.title}</h3>
                        <p className="text-white/80 leading-relaxed mb-4">{c.tierGuided.desc}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-white/70">

                            <span className="font-bold text-white">$2,000 to $10,000</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">

                            <span className="font-bold text-white">{c.tierGuided.meta2}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">{c.ways.bestForLabel}</p>
                        <p className="text-sm text-muted-foreground">{c.tierGuided.bestFor}</p>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{c.ways.includedModularLabel}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {c.tierGuided.included.map((item, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{c.ways.examplePackagesLabel}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {c.tierGuided.examples.map((pkg, j) => (
                            <div key={j} className="bg-zinc-100 border border-zinc-100 rounded-xl p-4">
                              <h4 className="text-sm font-bold text-primary mb-1">{pkg.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{pkg.desc}</p>
                              <p className="text-sm font-bold text-accent">{pkg.price}</p>
                              <p className="text-xs text-muted-foreground">{pkg.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-primary h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-tier-guided">

                        {c.tierGuided.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={300}>
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="tier-full-build">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 relative">
                      <div className="h-full min-h-[280px] bg-gradient-to-br from-primary to-zinc-950 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">

                          {c.tierFull.badge}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3">{c.tierFull.title}</h3>
                        <p className="text-white/80 leading-relaxed mb-4">{c.tierFull.desc}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-white/70">

                            <span className="font-bold text-white">$5,000 to $50,000+</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">

                            <span className="font-bold text-white">{c.tierFull.meta2}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">{c.ways.bestForLabel}</p>
                        <p className="text-sm text-muted-foreground">{c.tierFull.bestFor}</p>
                      </div>
                      <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {c.tierFull.phases.map((ph, j) => (
                            <div key={j} className="bg-zinc-100 rounded-xl p-4 border border-zinc-100">
                              <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">{ph.label}</p>
                              <p className="text-sm text-muted-foreground mb-3">{ph.desc}</p>
                              <p className="text-sm font-bold text-primary">{ph.price}</p>
                              <p className="text-xs text-muted-foreground">{ph.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white hover:bg-accent h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-tier-full-build">

                        {c.tierFull.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="phases" className="py-28 bg-[#FAFAFA] relative overflow-hidden" data-testid="section-phases">
          <FloatingShape className="w-24 h-24 top-20 -left-8" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">{c.phases.eyebrow}</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {c.phases.heading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c.phases.para}
              </p>
            </AnimateOnScroll>

            <div className="space-y-16 max-w-6xl mx-auto">

              <AnimateOnScroll animation="fade-up">
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="phase-foundation">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto">
                      <img src={communityTownhallImg} alt="Foundation phase" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">{c.phases.foundation.eyebrow}</p>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3">{c.phases.foundation.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{c.phases.foundation.desc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {c.phases.foundation.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                            <span className="text-sm text-muted-foreground font-medium">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">

                          <span className="font-semibold text-primary">{c.phases.foundation.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">

                          <span className="font-semibold text-primary">$5,000 to $15,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={150}>
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="phase-build">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">{c.phases.build.eyebrow}</p>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3">{c.phases.build.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{c.phases.build.desc}</p>

                      <div className="mb-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{c.phases.build.peopleLabel}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {c.phases.build.peopleItems.map((item, j) => (
                            <div key={j} className="flex items-start gap-2.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                              <span className="text-sm text-muted-foreground font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{c.phases.build.demandLabel}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {c.phases.build.demandItems.map((item, j) => (
                            <div key={j} className="flex items-start gap-2.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                              <span className="text-sm text-muted-foreground font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">

                          <span className="font-semibold text-primary">{c.phases.build.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">

                          <span className="font-semibold text-primary">$15,000 to $50,000+</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-[16/10] lg:aspect-auto order-1 lg:order-2">
                      <img src={communityWorkspaceImg} alt="Build phase" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={300}>
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="phase-run">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto">
                      <img src={milestoneImg} alt="Run phase" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">{c.phases.run.eyebrow}</p>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3">{c.phases.run.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{c.phases.run.desc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {c.phases.run.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                            <span className="text-sm text-muted-foreground font-medium">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">

                          <span className="font-semibold text-primary">{c.phases.run.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">

                          <span className="font-semibold text-primary">$4,000 to $12,000/month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-primary relative overflow-hidden" data-testid="section-flagship">
          <div className="absolute inset-0">
            <img src={teamMovingForwardImg} alt="" className="w-full h-full object-cover opacity-10 animate-ken-burns" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(214,30,110,0.16),transparent_60%)]" />
          <FloatingShape className="w-16 h-16 top-20 right-[15%]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-32 left-[10%]" variant="dot" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateOnScroll animation="fade-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">

                  {c.flagship.badge}
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                  {c.flagship.title}
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  {c.flagship.desc}
                </p>

                <div className="space-y-4 mb-10">
                  {c.flagship.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-white/80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-2">

                    <span className="text-white font-bold">{c.flagship.meta1}</span>
                  </div>
                  <div className="flex items-center gap-2">

                    <span className="text-white font-bold">$20,000 to $50,000</span>
                  </div>
                </div>

                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-flagship-book">

                  {c.flagship.cta}
                </a>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-right" delay={200} className="hidden lg:block">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                    <img src={empoweredOwnerImg} alt="90-Day Growth Infrastructure Build" className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <FloatingShape className="w-28 h-28 -top-6 -right-6 z-[-1]" variant="square" />
                  <FloatingShape className="w-20 h-20 -bottom-6 -left-6 z-[-1]" variant="ring" />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border max-w-[200px] animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    <p className="text-2xl font-extrabold text-accent mb-1">90</p>
                    <p className="text-xs text-muted-foreground font-bold">{c.flagship.cardLabel}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-who-this-is-for">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">{c.who.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                {c.who.heading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c.who.para}
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  audience: c.who.cards[0].audience,
                  desc: c.who.cards[0].desc,
                  bestFit: c.who.cards[0].bestFit,
                  investment: "$99 to $10,000",
                  cta: c.who.cards[0].cta,
                  ctaLink: "/#capabilities",
                  color: "from-zinc-700 to-zinc-800",
                },
                {
                  audience: c.who.cards[1].audience,
                  desc: c.who.cards[1].desc,
                  bestFit: c.who.cards[1].bestFit,
                  investment: "$99 to $50,000+",
                  cta: c.who.cards[1].cta,
                  ctaLink: "/#capabilities",
                  color: "from-accent to-zinc-900",
                },
                {
                  audience: c.who.cards[2].audience,
                  desc: c.who.cards[2].desc,
                  bestFit: c.who.cards[2].bestFit,
                  investment: "$99 to $10,000",
                  cta: c.who.cards[2].cta,
                  ctaLink: "/contact",
                  color: "from-green-500 to-green-600",
                },
                {
                  audience: c.who.cards[3].audience,
                  desc: c.who.cards[3].desc,
                  bestFit: c.who.cards[3].bestFit,
                  investment: "$2,000 to $50,000+",
                  cta: c.who.cards[3].cta,
                  ctaLink: BOOKINGS_URL,
                  color: "from-primary to-zinc-950",
                  isExternal: true,
                },
              ].map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-300 h-full flex flex-col" data-testid={`audience-card-${i}`}>
                    <div className={`p-6 bg-gradient-to-br ${item.color} rounded-t-2xl`}>
                      <h3 className="text-xl font-bold text-white">{item.audience}</h3>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                      <div className="mb-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1">{c.who.bestFitLabel}</p>
                        <p className="text-sm font-semibold text-primary">{item.bestFit}</p>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1">{c.who.investmentLabel}</p>
                        <p className="text-sm font-semibold text-accent">{item.investment}</p>
                      </div>
                      <div className="mt-auto">
                        {item.isExternal ? (
                          <a href={item.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors" data-testid={`link-audience-cta-${i}`}>
                            {item.cta}
                            <span aria-hidden="true">&rsaquo;</span>
                          </a>
                        ) : (
                          <Link href={item.ctaLink} className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors" data-testid={`link-audience-cta-${i}`}>
                            {item.cta}
                            <span aria-hidden="true">&rsaquo;</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#FAFAFA] border-t" data-testid="section-solutions-cta">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll animation="fade-scale">
              <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto">
                <div className="absolute inset-0">
                  <img src={communityCollaborationImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
                </div>
                <FloatingShape className="w-14 h-14 top-10 right-10 z-[5]" variant="ring" />
                <div className="relative z-10 p-12 lg:p-20 max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                    {c.finalCta.heading}
                  </h2>
                  <p className="text-lg text-white/70 mb-12">
                    {c.finalCta.para}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/#capabilities" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-accent hover:text-white h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl" data-testid="link-solutions-cta-services">
    
                      {c.finalCta.services}
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-700 text-white hover:bg-zinc-800 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl" data-testid="link-solutions-cta-contact">

                      {c.finalCta.quote}
                    </Link>
                    <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-solutions-cta-book">
    
                      {c.finalCta.book}
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
