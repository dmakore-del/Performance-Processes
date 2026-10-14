import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { useState } from "react";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import consultingImg from "@assets/generated/consulting.png";
import strategyImg from "@assets/generated/strategy.png";
import strategyWhiteboardImg from "@assets/generated/strategy-whiteboard-new.png";
import processFlowImg from "@assets/generated/process-flow-new.png";
import balancedScorecardImg from "@assets/generated/balanced-scorecard.png";
import swotAnalysisImg from "@assets/generated/swot-analysis.png";
import kpiFrameworksImg from "@assets/generated/kpi-frameworks.png";
import processMappingImg from "@assets/generated/process-mapping.png";
import stakeholderAnalysisImg from "@assets/generated/stakeholder-analysis.png";
import changeManagementImg from "@assets/generated/change-management.png";
import performanceDashboardsImg from "@assets/generated/performance-dashboards.png";
import leadershipCompetencyImg from "@assets/generated/leadership-competency.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function Approach() {
  const { language } = useLanguage();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const steps = [
    {
      num: "01",
      title: language === "en" ? "Discover" : "Découvrir",
      desc: language === "en"
        ? "We start by understanding your business, audience, and growth goals, and audit the systems you already have in place."
        : "Nous commençons par comprendre votre entreprise, votre audience et vos objectifs de croissance, et nous auditons les systèmes déjà en place.",
      duration: language === "en" ? "1 to 2 weeks" : "1 à 2 semaines",
      color: "from-zinc-700/15 to-zinc-800/5",
      accentColor: "text-zinc-800",
      bgAccent: "bg-zinc-800",
      borderAccent: "border-zinc-700/20",
      details: language === "en" ? [
        "Every engagement starts with a clear-eyed look at where your business is today. We learn how you sell, who you sell to, what's working, and where the friction lives, across your website, marketing, CRM, and back-office systems.",
        "We talk to you, your team, and where useful, your customers. We review your current site, marketing channels, CRM (if any), and the day-to-day processes that keep the business running.",
        "The output of Discover is a short, honest map of your current state and a prioritized list of what to install first to unlock the biggest wins.",
      ] : [
        "Chaque mandat commence par un regard lucide sur la situation actuelle de votre entreprise. Nous apprenons comment vous vendez, à qui vous vendez, ce qui fonctionne et où se trouvent les frictions, à travers votre site web, votre marketing, votre CRM et vos systèmes administratifs.",
        "Nous discutons avec vous, votre équipe et, lorsque c'est utile, vos clients. Nous examinons votre site actuel, vos canaux marketing, votre CRM (le cas échéant) et les processus quotidiens qui font fonctionner l'entreprise.",
        "Le résultat de la phase Découvrir est une carte courte et honnête de votre état actuel et une liste priorisée de ce qu'il faut installer en premier pour débloquer les gains les plus importants.",
      ],
      activities: language === "en" ? [
        "Founder & team interviews",
        "Website, brand, and marketing audit",
        "CRM and lead-flow review",
        "Business systems and SOP review",
        "Audience and offer clarity check",
        "Prioritized roadmap and quote",
      ] : [
        "Entretiens avec le fondateur et l'équipe",
        "Audit du site web, de la marque et du marketing",
        "Examen du CRM et du flux de prospects",
        "Examen des systèmes d'affaires et des procédures",
        "Vérification de la clarté de l'audience et de l'offre",
        "Feuille de route priorisée et devis",
      ],
      outcomes: language === "en" ? [
        "Clear picture of what's working and what isn't",
        "Prioritized list of growth-infrastructure gaps",
        "Right-sized scope and budget recommendation",
        "A confident starting point, no guesswork",
      ] : [
        "Un portrait clair de ce qui fonctionne et de ce qui ne fonctionne pas",
        "Une liste priorisée des lacunes de l'infrastructure de croissance",
        "Une recommandation de portée et de budget adaptée",
        "Un point de départ confiant, sans conjectures",
      ],
    },
    {
      num: "02",
      title: language === "en" ? "Design & Plan" : "Conception et planification",
      desc: language === "en"
        ? "We design the website, marketing engine, CRM workflows, and operating playbooks your business will run on."
        : "Nous concevons le site web, le moteur marketing, les flux CRM et les manuels d'exploitation sur lesquels votre entreprise fonctionnera.",
      duration: language === "en" ? "2 to 4 weeks" : "2 à 4 semaines",
      color: "from-emerald-500/15 to-emerald-600/5",
      accentColor: "text-emerald-600",
      bgAccent: "bg-emerald-600",
      borderAccent: "border-emerald-500/20",
      details: language === "en" ? [
        "With the picture clear, we design the system. That means site architecture and key page layouts, the marketing channels and campaigns we'll launch with, the CRM pipeline that will track every lead, and the SOPs your team will actually use.",
        "We work in tight cycles with you, quick approvals, no surprises. You see structure and copy before anything is built so the heavy build phase moves fast.",
        "By the end of Design & Plan you have a documented blueprint: what's being built, by when, by whom, and what success looks like.",
      ] : [
        "Une fois le portrait clair, nous concevons le système. Cela comprend l'architecture du site et la mise en page des pages clés, les canaux marketing et les campagnes de lancement, le pipeline CRM qui suivra chaque prospect et les procédures que votre équipe utilisera réellement.",
        "Nous travaillons en cycles serrés avec vous, des approbations rapides, sans surprise. Vous voyez la structure et le contenu avant que quoi que ce soit ne soit construit, afin que la phase de construction avance rapidement.",
        "À la fin de la phase Conception et planification, vous disposez d'un plan documenté : ce qui sera construit, quand, par qui, et à quoi ressemble le succès.",
      ],
      activities: language === "en" ? [
        "Sitemap, wireframes, and brand direction",
        "Marketing campaign and content plan",
        "CRM pipeline and lead-flow design",
        "SOPs and operating playbooks drafted",
        "KPI and reporting framework agreed",
        "Implementation roadmap signed off",
      ] : [
        "Plan du site, maquettes et direction de marque",
        "Plan de campagne marketing et de contenu",
        "Conception du pipeline CRM et du flux de prospects",
        "Rédaction des procédures et manuels d'exploitation",
        "Cadre d'indicateurs et de reporting convenu",
        "Feuille de route de mise en œuvre approuvée",
      ],
      outcomes: language === "en" ? [
        "Approved blueprint for the full system",
        "Clear KPIs and definition of done",
        "Aligned timeline across every workstream",
        "Confidence before a single thing is built",
      ] : [
        "Un plan approuvé pour l'ensemble du système",
        "Des indicateurs clairs et une définition du « terminé »",
        "Un échéancier aligné sur tous les chantiers",
        "La confiance avant même que quoi que ce soit ne soit construit",
      ],
    },
    {
      num: "03",
      title: language === "en" ? "Build & Install" : "Construire et installer",
      desc: language === "en"
        ? "We build the website, set up the CRM, launch the marketing engine, and train your team to run it."
        : "Nous construisons le site web, configurons le CRM, lançons le moteur marketing et formons votre équipe à l'exploiter.",
      duration: language === "en" ? "4 to 12 weeks" : "4 à 12 semaines",
      color: "from-amber-500/15 to-amber-600/5",
      accentColor: "text-amber-600",
      bgAccent: "bg-amber-600",
      borderAccent: "border-amber-500/20",
      details: language === "en" ? [
        "This is where the system goes from blueprint to live infrastructure. We build the website, configure the CRM, set up email and social channels, and write the playbooks your team will follow.",
        "We don't disappear and reappear with a finished product. You see progress weekly, and we train your team alongside the build so they own the system the moment it goes live.",
        "Build & Install ends with a launch, site live, CRM tracking real leads, first campaigns out, team trained, documentation handed over.",
      ] : [
        "C'est ici que le système passe du plan à une infrastructure en fonction. Nous construisons le site web, configurons le CRM, mettons en place les canaux courriel et sociaux et rédigeons les manuels que votre équipe suivra.",
        "Nous ne disparaissons pas pour réapparaître avec un produit fini. Vous voyez les progrès chaque semaine, et nous formons votre équipe pendant la construction afin qu'elle s'approprie le système dès sa mise en ligne.",
        "La phase Construire et installer se termine par un lancement : site en ligne, CRM qui suit de vrais prospects, premières campagnes lancées, équipe formée, documentation remise.",
      ],
      activities: language === "en" ? [
        "Website design, build, and launch",
        "CRM setup and lead automation",
        "Marketing channels and first campaigns",
        "SOPs and playbooks finalized",
        "Team training sessions and walkthroughs",
        "Launch checklist and go-live support",
      ] : [
        "Conception, construction et lancement du site web",
        "Configuration du CRM et automatisation des prospects",
        "Canaux marketing et premières campagnes",
        "Finalisation des procédures et des manuels",
        "Séances de formation et démonstrations pour l'équipe",
        "Liste de vérification de lancement et soutien à la mise en ligne",
      ],
      outcomes: language === "en" ? [
        "Live website, CRM, and marketing engine",
        "Team trained to run the day-to-day",
        "Documented playbooks you keep forever",
        "Real leads flowing through a real pipeline",
      ] : [
        "Un site web, un CRM et un moteur marketing en fonction",
        "Une équipe formée pour gérer le quotidien",
        "Des manuels documentés que vous conservez pour toujours",
        "De vrais prospects circulant dans un vrai pipeline",
      ],
    },
    {
      num: "04",
      title: language === "en" ? "Run & Optimize" : "Exploiter et optimiser",
      desc: language === "en"
        ? "Optional ongoing support keeps your marketing, CRM, and systems running and improving, month after month."
        : "Un soutien continu optionnel maintient votre marketing, votre CRM et vos systèmes opérationnels et en amélioration, mois après mois.",
      duration: language === "en" ? "Optional, monthly" : "Optionnel, mensuel",
      color: "from-violet-500/15 to-violet-600/5",
      accentColor: "text-violet-600",
      bgAccent: "bg-violet-600",
      borderAccent: "border-violet-500/20",
      details: language === "en" ? [
        "A great launch is the start, not the finish. Many clients keep us on a monthly retainer to run their marketing, manage the CRM, optimize the website, and refine the playbooks as the business grows.",
        "We track the KPIs we agreed in Design & Plan, share a monthly performance summary, and adjust the system based on real data, not guesses.",
        "When something new comes up, a new offer, a new market, a new hire, we already know your system and can move fast. If you'd rather run it in-house, we hand off cleanly and stay available for ad-hoc support.",
      ] : [
        "Un excellent lancement est le début, pas la fin. De nombreux clients nous gardent en mandat mensuel pour gérer leur marketing, administrer le CRM, optimiser le site web et affiner les manuels à mesure que l'entreprise grandit.",
        "Nous suivons les indicateurs convenus lors de la phase Conception et planification, partageons un sommaire de performance mensuel et ajustons le système selon des données réelles, pas des suppositions.",
        "Quand quelque chose de nouveau survient, une nouvelle offre, un nouveau marché, une nouvelle embauche, nous connaissons déjà votre système et pouvons agir rapidement. Si vous préférez le gérer à l'interne, nous effectuons un transfert soigné et restons disponibles pour un soutien ponctuel.",
      ],
      activities: language === "en" ? [
        "Monthly marketing execution",
        "CRM management and lead nurture",
        "Website updates and conversion tweaks",
        "Performance reporting and reviews",
        "New campaigns, content, and SOP updates",
        "Quarterly strategy refresh sessions",
      ] : [
        "Exécution marketing mensuelle",
        "Gestion du CRM et maturation des prospects",
        "Mises à jour du site et ajustements de conversion",
        "Rapports de performance et revues",
        "Nouvelles campagnes, contenu et mises à jour des procédures",
        "Séances trimestrielles de rafraîchissement stratégique",
      ],
      outcomes: language === "en" ? [
        "A growth engine that keeps producing",
        "Clear monthly visibility on what's working",
        "Compounding improvements over time",
        "Optional, no long-term lock-in",
      ] : [
        "Un moteur de croissance qui continue de produire",
        "Une visibilité mensuelle claire sur ce qui fonctionne",
        "Des améliorations qui se cumulent au fil du temps",
        "Optionnel, sans engagement à long terme",
      ],
    },
  ];

  const toolsAndFrameworks = language === "en" ? [
    {
      image: balancedScorecardImg,
      title: "Website & Brand System",
      desc: "Editorial design, fast performance, conversion-ready architecture, and a brand system your site, social, and sales materials all share.",
    },
    {
      image: swotAnalysisImg,
      title: "Marketing Engine",
      desc: "Email, social, and campaign infrastructure designed to fill the top of your pipeline and turn attention into qualified leads.",
    },
    {
      image: kpiFrameworksImg,
      title: "CRM & Lead Tracking",
      desc: "A right-sized CRM your team will actually use, pipelines, automations, and reporting so no lead falls through the cracks.",
    },
    {
      image: processMappingImg,
      title: "SOPs & Operating Playbooks",
      desc: "Documented playbooks for sales, marketing, and operations, so your business runs the same way whether or not you're in the room.",
    },
    {
      image: stakeholderAnalysisImg,
      title: "Training & Implementation",
      desc: "Workshops and one-on-one coaching so your team learns the system as it's built, and owns it the moment it goes live.",
    },
    {
      image: changeManagementImg,
      title: "Foundation Sprints",
      desc: "Short, focused engagements to define structure, roles, KPIs, and the basics that hold a small business together.",
    },
    {
      image: performanceDashboardsImg,
      title: "Performance Dashboards",
      desc: "Simple, monthly dashboards that show how the website, marketing, and CRM are performing against the KPIs we set together.",
    },
    {
      image: leadershipCompetencyImg,
      title: "Ongoing Support Retainers",
      desc: "Optional monthly retainers, marketing execution, CRM management, content, and continuous optimization, with no long-term lock-in.",
    },
  ] : [
    {
      image: balancedScorecardImg,
      title: "Système de site web et de marque",
      desc: "Design éditorial, performance rapide, architecture prête pour la conversion et un système de marque partagé par votre site, vos réseaux sociaux et vos supports de vente.",
    },
    {
      image: swotAnalysisImg,
      title: "Moteur marketing",
      desc: "Une infrastructure de courriel, de réseaux sociaux et de campagnes conçue pour alimenter le haut de votre pipeline et transformer l'attention en prospects qualifiés.",
    },
    {
      image: kpiFrameworksImg,
      title: "CRM et suivi des prospects",
      desc: "Un CRM adapté que votre équipe utilisera réellement : pipelines, automatisations et rapports pour qu'aucun prospect ne passe entre les mailles du filet.",
    },
    {
      image: processMappingImg,
      title: "Procédures et manuels d'exploitation",
      desc: "Des manuels documentés pour les ventes, le marketing et les opérations, afin que votre entreprise fonctionne de la même façon, que vous soyez présent ou non.",
    },
    {
      image: stakeholderAnalysisImg,
      title: "Formation et mise en œuvre",
      desc: "Des ateliers et du coaching individuel pour que votre équipe apprenne le système à mesure qu'il se construit et se l'approprie dès sa mise en ligne.",
    },
    {
      image: changeManagementImg,
      title: "Sprints de fondation",
      desc: "Des mandats courts et ciblés pour définir la structure, les rôles, les indicateurs et les bases qui font tenir une petite entreprise.",
    },
    {
      image: performanceDashboardsImg,
      title: "Tableaux de bord de performance",
      desc: "Des tableaux de bord mensuels simples qui montrent la performance du site web, du marketing et du CRM par rapport aux indicateurs fixés ensemble.",
    },
    {
      image: leadershipCompetencyImg,
      title: "Mandats de soutien continu",
      desc: "Des mandats mensuels optionnels : exécution marketing, gestion du CRM, contenu et optimisation continue, sans engagement à long terme.",
    },
  ];

  const faqItems = language === "en" ? [
    {
      question: "Which services do you actually offer?",
      answer: "Six integrated practices: Websites, Marketing, CRM & Lead Tracking, Business Systems, Training & Implementation, and Ongoing Support. You can buy any one as a standalone productized engagement, or combine several into a bundle that installs your full growth infrastructure end-to-end.",
    },
    {
      question: "How long does a typical engagement last?",
      answer: "It depends on the scope. A standalone website usually runs 4 to 8 weeks. A CRM setup is typically 2 to 4 weeks. A full growth infrastructure bundle, with web, marketing, CRM, systems, and training, usually runs 8 to 12 weeks from kickoff to launch. Ongoing support retainers are monthly and continue as long as they're useful.",
    },
    {
      question: "Who do you work with?",
      answer: "Professionals, nonprofits, and small-to-mid-sized businesses across Canada. Common fits include professional services, trades and local services, health and wellness practices, coaches and consultants, creators and personal brands, and growing nonprofits.",
    },
    {
      question: "Do you offer fixed pricing?",
      answer: "Yes. Almost everything we do is productized, a clearly defined scope, deliverables, timeline, and price you see before you commit. Bundles and ongoing retainers are also fixed-fee. The only thing we quote case-by-case is highly custom work that doesn't fit an existing offer.",
    },
    {
      question: "What makes your approach different?",
      answer: "Three things. First, we install one integrated system, web, marketing, CRM, systems, training, and support, instead of selling each piece separately. Second, we build and run it with you, not just hand over slide decks. Third, every engagement leaves behind documented playbooks and trained operators so the system runs without us.",
    },
    {
      question: "Do you work remote or in-person?",
      answer: "Most of our work runs remotely with structured weekly check-ins, which keeps timelines tight and budgets predictable. For workshops, training, and key strategy sessions, we travel where it matters. Hybrid is the most common setup.",
    },
    {
      question: "What happens after launch?",
      answer: "You keep everything we built, the website, the CRM configuration, the SOPs, the brand assets, the playbooks. From there you can run the system in-house, hand it off to your team, or keep us on as a monthly retainer to execute marketing, manage the CRM, and keep optimizing.",
    },
    {
      question: "How much of our team's time do you need?",
      answer: "Less than most firms. We design productized engagements to minimize the meetings tax, typically a weekly 30 to 45 minute working session, plus async approvals for design and copy. The exception is training, where we deliberately want your team in the room.",
    },
    {
      question: "Can you work alongside our existing tools or partners?",
      answer: "Yes. We meet you where you are. If you already have a CRM, an agency, or in-house marketing, we plug into what's working and replace only what isn't. We're focused on outcomes, not territory.",
    },
  ] : [
    {
      question: "Quels services offrez-vous réellement ?",
      answer: "Six pratiques intégrées : sites web, marketing, CRM et suivi des prospects, systèmes d'affaires, formation et mise en œuvre, et soutien continu. Vous pouvez acheter chacune comme un mandat autonome, ou en combiner plusieurs dans un forfait qui installe votre infrastructure de croissance complète de bout en bout.",
    },
    {
      question: "Combien de temps dure un mandat type ?",
      answer: "Cela dépend de la portée. Un site web autonome prend habituellement de 4 à 8 semaines. Une configuration CRM prend généralement de 2 à 4 semaines. Un forfait d'infrastructure de croissance complet (web + marketing + CRM + systèmes + formation) dure généralement de 8 à 12 semaines, du lancement à la mise en ligne. Les mandats de soutien continu sont mensuels et se poursuivent aussi longtemps qu'ils sont utiles.",
    },
    {
      question: "Avec qui travaillez-vous ?",
      answer: "Des professionnels, des organismes sans but lucratif et des petites et moyennes entreprises partout au Canada. Les profils fréquents incluent les services professionnels, les métiers et services locaux, les cabinets de santé et de mieux-être, les coachs et consultants, les créateurs et marques personnelles, ainsi que les OSBL en croissance.",
    },
    {
      question: "Offrez-vous des prix fixes ?",
      answer: "Oui. Presque tout ce que nous faisons est offert sous forme de produit : une portée, des livrables, un échéancier et un prix clairement définis que vous voyez avant de vous engager. Les forfaits et les mandats continus sont également à prix fixe. La seule chose que nous chiffrons au cas par cas est le travail très sur mesure qui ne correspond pas à une offre existante.",
    },
    {
      question: "Qu'est-ce qui rend votre approche différente ?",
      answer: "Trois choses. D'abord, nous installons un seul système intégré, web, marketing, CRM, systèmes, formation et soutien, au lieu de vendre chaque pièce séparément. Ensuite, nous le construisons et l'exploitons avec vous, sans nous limiter à remettre des présentations. Enfin, chaque mandat laisse derrière lui des manuels documentés et des opérateurs formés pour que le système fonctionne sans nous.",
    },
    {
      question: "Travaillez-vous à distance ou en personne ?",
      answer: "La majeure partie de notre travail se fait à distance avec des suivis hebdomadaires structurés, ce qui garde les échéanciers serrés et les budgets prévisibles. Pour les ateliers, la formation et les séances stratégiques clés, nous nous déplaçons là où cela compte. Le mode hybride est le plus courant.",
    },
    {
      question: "Que se passe-t-il après le lancement ?",
      answer: "Vous conservez tout ce que nous avons construit : le site web, la configuration du CRM, les procédures, les actifs de marque, les manuels. À partir de là, vous pouvez gérer le système à l'interne, le confier à votre équipe, ou nous garder en mandat mensuel pour exécuter le marketing, gérer le CRM et continuer d'optimiser.",
    },
    {
      question: "Combien de temps demandez-vous à notre équipe ?",
      answer: "Moins que la plupart des firmes. Nous concevons des mandats productisés pour réduire au minimum les réunions, généralement une séance de travail hebdomadaire de 30 à 45 minutes, plus des approbations asynchrones pour le design et le contenu. L'exception est la formation, où nous voulons délibérément votre équipe dans la salle.",
    },
    {
      question: "Pouvez-vous travailler avec nos outils ou partenaires existants ?",
      answer: "Oui. Nous vous rencontrons là où vous êtes. Si vous avez déjà un CRM, une agence ou un marketing à l'interne, nous nous branchons sur ce qui fonctionne et ne remplaçons que ce qui ne fonctionne pas. Nous sommes axés sur les résultats, pas sur le territoire.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="Our Approach, How We Install Growth Infrastructure" description="A structured four-phase method for installing growth infrastructure: Discover, Design & Plan, Build & Install, and Run & Optimize. Productized scope, fixed timelines, measurable outcomes." path="/approach" />
      <Navbar />
      <main className="flex-grow">

        <section className="relative min-h-[600px] lg:min-h-[750px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img src={processFlowImg} alt="" className="w-full h-full object-cover opacity-15 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/5 h-full hidden lg:block z-[1]">
            <img src={strategyWhiteboardImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          </div>
          <GradientOrb className="w-80 h-80 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-16 h-16 top-[20%] right-[10%] z-[3]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-[30%] right-[35%] z-[3]" variant="dot" />
          <GeometricAccent className="bottom-[12%] right-[5%] text-white z-[2]" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-3xl lg:max-w-[55%]">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="text-hero-title">
                {language === "en" ? (
                  <>How we install <span className="text-accent italic">growth infrastructure</span></>
                ) : (
                  <>Comment nous installons <span className="text-accent italic">l'infrastructure de croissance</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                {language === "en"
                  ? "A clear four-phase method for designing, building, and running the websites, marketing, CRM, and business systems your team will use every day."
                  : "Une méthode claire en quatre phases pour concevoir, construire et faire fonctionner les sites web, le marketing, le CRM et les systèmes d'affaires que votre équipe utilisera chaque jour."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="link-hero-book">
                    {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                </a>
                <Link href="/#capabilities" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="link-hero-services">
                    {language === "en" ? "Explore Services" : "Explorer les services"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white relative overflow-hidden" data-testid="section-methodology-intro">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-36 -left-36" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <AnimateOnScroll animation="fade-left">
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-8 italic" data-testid="text-methodology-title">
                  {language === "en" ? "Built to Build, Not Just Advise" : "Conçus pour construire, pas seulement conseiller"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {language === "en"
                    ? "Most firms hand over a strategy and walk away. We do the opposite, we install the website, set up the CRM, launch the marketing, write the playbooks, and train the team that will run it all."
                    : "La plupart des firmes remettent une stratégie puis s'en vont. Nous faisons le contraire : nous installons le site web, configurons le CRM, lançons le marketing, rédigeons les manuels et formons l'équipe qui gérera le tout."}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {language === "en" ? (
                    <>At the heart of our method is a simple belief: <strong className="text-primary">growth comes from systems people actually use, not slide decks they nod at.</strong> Every page we design, every CRM pipeline we configure, and every playbook we write is built so your team owns and runs it the day it ships.</>
                  ) : (
                    <>Au cœur de notre méthode se trouve une conviction simple : <strong className="text-primary">la croissance vient des systèmes que les gens utilisent réellement, pas des présentations qu'ils approuvent d'un signe de tête.</strong> Chaque page que nous concevons, chaque pipeline CRM que nous configurons et chaque manuel que nous rédigeons est bâti pour que votre équipe se l'approprie et l'exploite dès sa livraison.</>
                  )}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {language === "en"
                    ? "Our four-phase approach is the same whether you're buying one offer or installing the full growth infrastructure, Discover, Design & Plan, Build & Install, then Run & Optimize. Productized scope, fixed timelines, real outcomes."
                    : "Notre approche en quatre phases est la même que vous achetiez une seule offre ou que vous installiez l'infrastructure de croissance complète : Découvrir, Conception et planification, Construire et installer, puis Exploiter et optimiser. Portée productisée, échéanciers fixes, résultats réels."}
                </p>
                <div className="relative">
                  <img
                    src={consultingImg}
                    alt="Performance consulting methodology"
                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] hover:scale-[1.02] transition-transform duration-700"
                    data-testid="img-methodology"
                  />
                  <FloatingShape className="w-20 h-20 -top-4 -right-4 z-[-1]" variant="square" />
                  <FloatingShape className="w-14 h-14 -bottom-3 left-10 z-[-1]" variant="ring" />
                  <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-lg hidden md:block">
                    <p className="text-3xl font-extrabold italic">{language === "en" ? "4 Phases" : "4 phases"}</p>
                    <p className="text-sm opacity-80">{language === "en" ? "Proven methodology" : "Méthodologie éprouvée"}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-b from-[#FAFAFA] to-white relative overflow-hidden" data-testid="section-approach-steps">
          <FloatingShape className="w-20 h-20 top-24 -left-6" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic" data-testid="text-process-title">
                {language === "en" ? "Four Phases to Lasting Impact" : "Quatre phases vers un impact durable"}
              </h2>
            </AnimateOnScroll>

            <div className="space-y-5">
              {steps.map((step, i) => {
                const isExpanded = expandedStep === step.num;
                return (
                  <div key={i} data-testid={`step-${step.num}`}>
                    <div className="bg-white rounded-3xl shadow-md border border-gray-100/80 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col lg:flex-row">
                        <div className="bg-gradient-to-b from-primary to-primary/90 text-white p-8 lg:p-10 flex flex-col items-center justify-center lg:min-w-[200px] relative overflow-hidden">
                          <div className="absolute inset-0 opacity-10">
                            <div className={`absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-br ${step.color}`} />
                          </div>
                          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm relative z-10">
                            {step.duration}
                          </div>
                        </div>

                        <div className="p-8 lg:p-12 flex-1">
                          <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3 italic" data-testid={`text-step-title-${step.num}`}>
                            {step.title}
                          </h3>
                          <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                            {step.desc}
                          </p>

                          <button
                            onClick={() => setExpandedStep(isExpanded ? null : step.num)}
                            className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors duration-200 mb-2"
                            data-testid={`button-expand-step-${step.num}`}
                          >
                            {isExpanded ? (language === "en" ? "Show less" : "Afficher moins") : (language === "en" ? "Learn more about this phase" : "En savoir plus sur cette phase")}
                            <span aria-hidden="true" className={`transition-transform duration-300 inline-block ${isExpanded ? "rotate-180" : ""}`}>&#9662;</span>
                          </button>

                          <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                            <div className="overflow-hidden">
                              <div className="space-y-4 mb-10">
                                {step.details.map((para, j) => (
                                  <p key={j} className="text-muted-foreground leading-relaxed">
                                    {para}
                                  </p>
                                ))}
                              </div>

                              <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                <div className="bg-gradient-to-br from-[#f0f4f8] to-white rounded-3xl p-7 border border-border/30">
                                  <h4 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    {language === "en" ? "Key Activities" : "Activités clés"}
                                  </h4>
                                  <ul className="space-y-3">
                                    {step.activities.map((activity, j) => (
                                      <li key={j} className="flex items-start gap-3 text-muted-foreground">
                                        <span aria-hidden="true" className="text-accent flex-shrink-0">·</span>
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-gradient-to-br from-[#f0f4f8] to-white rounded-3xl p-7 border border-border/30">
                                  <h4 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    {language === "en" ? "Expected Outcomes" : "Résultats attendus"}
                                  </h4>
                                  <ul className="space-y-3">
                                    {step.outcomes.map((outcome, j) => (
                                      <li key={j} className="flex items-start gap-3 text-muted-foreground">
                                        <span aria-hidden="true" className="text-accent flex-shrink-0">&rsaquo;</span>
                                        <span>{outcome}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {i < steps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-px h-10 bg-gradient-to-b from-accent/30 to-accent/5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-32 bg-white relative overflow-hidden" data-testid="section-tools-frameworks">
          <GeometricAccent className="top-16 -left-10 text-primary" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-32 right-20" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic mb-6" data-testid="text-tools-title">
                {language === "en" ? "What We Build For You" : "Ce que nous construisons pour vous"}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {language === "en"
                  ? "Eight building blocks across our six practices. Mix and match into a single offer, or stack them into a full growth-infrastructure bundle."
                  : "Huit composantes réparties sur nos six pratiques. Combinez-les dans une seule offre, ou empilez-les dans un forfait d'infrastructure de croissance complet."}
              </p>
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {toolsAndFrameworks.map((tool, i) => {
                return (
                  <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                    <div
                      className="bg-gradient-to-br from-[#f0f4f8] to-white rounded-3xl border border-gray-100/60 hover:shadow-xl hover:border-accent/20 transition-all duration-300 group hover:-translate-y-1 overflow-hidden h-full"
                      data-testid={`card-tool-${i}`}
                    >
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
                        <img src={tool.image} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-8 pt-5">
                        <h3 className="text-xl font-bold text-primary mb-3">{tool.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{tool.desc}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-b from-[#FAFAFA] to-white" data-testid="section-faq">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic mb-6" data-testid="text-faq-title">
                  {language === "en" ? "Frequently Asked Questions" : "Foire aux questions"}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {language === "en"
                    ? "Common questions about our services, scope, pricing, and what it's like to work with Performance Processes."
                    : "Questions fréquentes sur nos services, notre portée, nos prix et ce que c'est de travailler avec Performance Processes."}
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
                {faqItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white rounded-3xl border border-gray-100/80 px-8 shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:shadow-lg data-[state=open]:border-accent/20"
                    data-testid={`faq-item-${i}`}
                  >
                    <AccordionTrigger className="text-lg font-semibold text-primary hover:text-accent py-7 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-7 text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="relative py-32 overflow-hidden" data-testid="section-cta">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
          <div className="absolute inset-0 opacity-10">
            <img src={processFlowImg} alt="" className="w-full h-full object-cover" />
          </div>
          <FloatingShape className="w-20 h-20 top-16 right-16 opacity-20" variant="ring" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <AnimateOnScroll animation="fade-left" className="order-2 md:order-1">
                <img
                  src={strategyImg}
                  alt="Strategic planning consultation"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] ring-1 ring-white/10 hover:scale-[1.02] transition-transform duration-700"
                  data-testid="img-cta-strategy"
                />
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200} className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white italic mb-8" data-testid="text-cta-title">
                  {language === "en" ? "Ready to install your growth infrastructure?" : "Prêt à installer votre infrastructure de croissance ?"}
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  {language === "en"
                    ? "Whether you need a single piece, a new website, a CRM, a marketing engine, or the full system installed end-to-end, we'll scope it clearly, build it cleanly, and train your team to run it."
                    : "Que vous ayez besoin d'un seul élément, un nouveau site web, un CRM, un moteur marketing, ou du système complet installé de bout en bout, nous définirons clairement la portée, construirons proprement et formerons votre équipe à l'exploiter."}
                </p>
                <p className="text-lg text-white/70 leading-relaxed mb-10">
                  {language === "en"
                    ? "Book a complimentary discovery call to talk through where your business is today and what to install first."
                    : "Réservez un appel de découverte gratuit pour discuter de la situation actuelle de votre entreprise et de ce qu'il faut installer en premier."}
                </p>
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="link-cta-consultation">
                    {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                </a>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
