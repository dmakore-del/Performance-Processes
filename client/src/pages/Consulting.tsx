import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Users, Target, Settings, BarChart3, CreditCard, Loader2, RefreshCw, Search, Briefcase, Rocket, UserCheck, Calendar, Package, Heart, ArrowDown, Phone } from "lucide-react";
import { Link } from "wouter";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import leadershipPresentationImg from "@assets/generated/leadership-presentation-new.png";
import teamStrategyImg from "@assets/generated/team-strategy-new.png";
import consultingAdvisoryImg from "@assets/generated/consulting-advisory.png";
import strategicPlanningImg from "@assets/generated/strategic-planning.png";
import systemsImplementationImg from "@assets/generated/systems-implementation.png";
import executiveAdvisoryImg from "@assets/generated/executive-advisory.png";
import businessRegistrationImg from "@assets/generated/business-registration.png";
import websiteDevelopmentImg from "@assets/generated/website-development.png";
import processAuditImg from "@assets/generated/process-audit.png";
import workshopTrainingImg from "@assets/generated/workshop-training.png";
import fractionalConsultantImg from "@assets/generated/fractional-consultant.png";
import businessCoachingImg from "@assets/generated/business-coaching.png";
import businessFoundationsImg from "@assets/generated/business-foundations.png";
import personalCoachingImg from "@assets/generated/personal-coaching.png";
import personalBrandImg from "@assets/generated/personal-brand.png";
import performanceMgmtImg from "@assets/generated/performance-mgmt.png";
import orgAssessmentImg from "@assets/generated/org-assessment.png";
import hrPeopleStrategyImg from "@assets/generated/hr-people-strategy.png";
import talentDevelopmentImg from "@assets/generated/talent-development.png";
import peopleOperationsImg from "@assets/generated/people-operations.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface PricingTier {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  stripeProductName: string;
}

interface ServiceEntry {
  title: string;
  investment: string;
  investmentNote: string;
  desc: string;
  benefits: string[];
  learnMore: string;
  idealFor: string;
  image: string;
  pricingTiers: PricingTier[];
}

interface StripeProduct {
  product_name: string;
  price_id: string;
}

export default function Consulting() {
  const [selectedService, setSelectedService] = useState<ServiceEntry | null>(null);
  const [payingProduct, setPayingProduct] = useState<string | null>(null);
  const [collectiveOpen, setCollectiveOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"enterprise" | "business" | "professional" | "self-serve">("enterprise");
  const { t, language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "success") {
      toast({
        title: language === "en" ? "Payment successful!" : "Paiement réussi !",
        description: language === "en" ? "Thank you for your purchase. We'll be in touch shortly." : "Merci pour votre achat. Nous vous contacterons bientôt.",
      });
      window.history.replaceState({}, "", "/consulting");
    } else if (payment === "cancelled") {
      toast({
        title: language === "en" ? "Payment cancelled" : "Paiement annulé",
        description: language === "en" ? "Your payment was not completed." : "Votre paiement n'a pas été complété.",
        variant: "destructive",
      });
      window.history.replaceState({}, "", "/consulting");
    }
  }, []);

  const { data: productsData } = useQuery<{ data: StripeProduct[] }>({
    queryKey: ["/api/products"],
  });

  const checkoutMutation = useMutation({
    mutationFn: async ({ priceId, serviceName }: { priceId: string; serviceName: string }) => {
      const res = await apiRequest("POST", "/api/checkout", { priceId, serviceName });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      setPayingProduct(null);
      toast({
        title: language === "en" ? "Payment error" : "Erreur de paiement",
        description: language === "en" ? "Unable to start checkout. Please try again." : "Impossible de démarrer le paiement. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const handlePay = (productName: string) => {
    if (!productsData?.data) {
      toast({
        title: language === "en" ? "Loading..." : "Chargement...",
        description: language === "en" ? "Payment options are still loading. Please try again in a moment." : "Les options de paiement sont en cours de chargement. Veuillez réessayer dans un instant.",
        variant: "destructive",
      });
      return;
    }
    const product = productsData.data.find((p: StripeProduct) => p.product_name === productName);
    if (product) {
      setPayingProduct(productName);
      checkoutMutation.mutate({ priceId: product.price_id, serviceName: productName });
    } else {
      toast({
        title: language === "en" ? "Service unavailable" : "Service indisponible",
        description: language === "en" ? "This payment option is temporarily unavailable. Please try again shortly or contact us." : "Cette option de paiement est temporairement indisponible. Veuillez réessayer ou nous contacter.",
        variant: "destructive",
      });
    }
  };

  const methodSteps = [
    {
      step: "01",
      title: language === "en" ? "Listen" : "Écouter",
      desc: language === "en" ? "We start by understanding your world, your goals, your challenges, and what matters most to you and your people." : "Nous commençons par comprendre votre réalité, vos objectifs, vos défis et ce qui compte le plus pour vous.",
      outcomes: language === "en" ? ["Deep-dive discovery", "Understanding your vision", "People & culture review", "Stakeholder conversations"] : ["Découverte approfondie", "Comprendre votre vision", "Revue des personnes et de la culture", "Conversations avec les parties prenantes"],
      icon: <Search className="text-accent" size={28} />,
      color: "from-blue-500/10 to-blue-600/5",
    },
    {
      step: "02",
      title: language === "en" ? "Align" : "Aligner",
      desc: language === "en" ? "Together, we define what success looks like for you, and make sure everyone is moving in the same direction." : "Ensemble, nous définissons ce que le succès signifie pour vous, et veillons à ce que tout le monde avance dans la même direction.",
      outcomes: language === "en" ? ["Shared vision & clarity", "Team buy-in", "Clear success picture", "Prioritized goals"] : ["Vision et clarté partagées", "Adhésion de l'équipe", "Image claire du succès", "Objectifs priorisés"],
      icon: <Target className="text-accent" size={28} />,
      color: "from-accent/10 to-accent/5",
    },
    {
      step: "03",
      title: language === "en" ? "Build Together" : "Construire ensemble",
      desc: language === "en" ? "We work alongside you, not from the sidelines, to build the systems, habits, and infrastructure that make progress stick." : "Nous travaillons à vos côtés, pas en retrait, pour bâtir les systèmes et habitudes qui ancrent le progrès.",
      outcomes: language === "en" ? ["Practical systems that work", "People-first processes", "Habits that last", "Real accountability"] : ["Systèmes pratiques qui fonctionnent", "Processus axés sur les personnes", "Habitudes durables", "Responsabilité réelle"],
      icon: <Settings className="text-accent" size={28} />,
      color: "from-emerald-500/10 to-emerald-600/5",
    },
    {
      step: "04",
      title: language === "en" ? "Grow & Evolve" : "Grandir et évoluer",
      desc: language === "en" ? "We celebrate your wins, learn from what's working, and keep evolving with you as your needs change." : "Nous célébrons vos réussites, apprenons de ce qui fonctionne et continuons à évoluer avec vous.",
      outcomes: language === "en" ? ["Visible progress", "Regular check-ins", "Evolving support", "Lasting momentum"] : ["Progrès visibles", "Points de contact réguliers", "Soutien évolutif", "Élan durable"],
      icon: <BarChart3 className="text-accent" size={28} />,
      color: "from-purple-500/10 to-purple-600/5",
    },
  ];

  const serviceTiers = {
    enterprise: {
      label: language === "en" ? "Enterprise" : "Entreprise",
      tagline: language === "en" ? "For leadership teams ready to build lasting systems and a culture of shared success" : "Pour les équipes de direction prêtes à bâtir des systèmes durables et une culture de réussite partagée",
      icon: <Briefcase className="text-accent" size={24} />,
      services: [
        {
          title: language === "en" ? "Discovery & Assessment" : "Découverte et évaluation",
          investment: "$750 – $1,500",
          investmentNote: language === "en" ? "(Mandatory first step, fee can be credited toward full engagement)" : "(Première étape obligatoire, les frais peuvent être crédités vers un engagement complet)",
          desc: language === "en"
            ? "Before we propose anything, we listen. The Discovery Phase is about truly understanding your organization, your people, your goals, and what success means to you."
            : "Avant de proposer quoi que ce soit, nous écoutons. La phase de découverte consiste à comprendre votre organisation, vos gens, vos objectifs et ce que le succès signifie pour vous.",
          benefits: language === "en"
            ? ["Organizational intake & needs assessment", "Stakeholder alignment", "Scope definition & roadmap", "Fee credited toward full engagement"]
            : ["Évaluation des besoins organisationnels", "Alignement des parties prenantes", "Définition de la portée", "Frais crédités vers l'engagement complet"],
          learnMore: language === "en"
            ? "Before recommending any strategy or system, we invest time in understanding your organization's current state, challenges, and goals. The Discovery Phase is a structured intake process designed to align expectations, define scope, and build a clear roadmap.\n\nDiscovery fees can be credited toward your full engagement, so you never pay twice for this essential first step."
            : "Avant de recommander toute stratégie ou système, nous investissons du temps pour comprendre l'état actuel, les défis et les objectifs de votre organisation.",
          idealFor: language === "en" ? "Any organization beginning a new consulting engagement or exploring how we can help." : "Toute organisation commençant un nouvel engagement de conseil ou explorant comment nous pouvons aider.",
          image: consultingAdvisoryImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$750",
              subtitle: language === "en" ? "Focused intake session with needs assessment and initial scope definition." : "Session d'accueil ciblée avec évaluation des besoins et définition initiale de la portée.",
              features: language === "en"
                ? ["Organizational intake session", "Needs assessment", "Scope definition", "Summary findings document"]
                : ["Session d'accueil organisationnel", "Évaluation des besoins", "Définition de la portée", "Document de synthèse des conclusions"],
              stripeProductName: "Discovery Phase - Essentials"
            },
            {
              name: "Standard",
              price: "$1,500",
              subtitle: language === "en" ? "Comprehensive discovery with stakeholder interviews, detailed assessment, and full proposal roadmap." : "Découverte complète avec entretiens des parties prenantes, évaluation détaillée et feuille de route de proposition complète.",
              features: language === "en"
                ? ["Everything in Essentials", "Stakeholder interviews", "Detailed organizational assessment", "Full proposal roadmap", "Engagement plan with milestones"]
                : ["Tout dans Essentiel", "Entretiens avec les parties prenantes", "Évaluation organisationnelle détaillée", "Feuille de route de proposition complète", "Plan d'engagement avec jalons"],
              stripeProductName: "Discovery Phase - Standard"
            }
          ]
        },
        {
          title: language === "en" ? "Strategy & Alignment" : "Stratégie et alignement",
          investment: "$5,000 – $15,000",
          investmentNote: language === "en" ? "(6–12 week engagement)" : "(Engagement de 6 à 12 semaines)",
          desc: language === "en"
            ? "Get your whole team rowing in the same direction. We help you clarify your vision, align your leadership, and create a roadmap everyone believes in."
            : "Faites avancer toute votre équipe dans la même direction. Nous clarifions votre vision et créons une feuille de route à laquelle tous adhèrent.",
          benefits: language === "en"
            ? ["Strategic planning & vision refinement", "KPI & success metric design", "Leadership alignment workshops", "1–3 year strategic roadmap"]
            : ["Planification stratégique", "Conception de KPI", "Ateliers d'alignement", "Feuille de route stratégique"],
          learnMore: language === "en"
            ? "Rather than selling hours, we sell outcomes. Our Strategic Engagement model is designed for organizations that need focused, time-bound support to address critical strategic challenges.\n\nThis model covers strategic planning, performance framework design, organizational alignment, and leadership development, all delivered within a structured 6–12 week timeline with clear milestones and deliverables."
            : "Plutôt que de vendre des heures, nous vendons des résultats.",
          idealFor: language === "en" ? "Organizations preparing for growth, restructuring, or transformation that need strategic clarity and alignment." : "Organisations se préparant à la croissance, à la restructuration ou à la transformation.",
          image: strategicPlanningImg,
          pricingTiers: [
            {
              name: language === "en" ? "Foundation" : "Fondation",
              price: "$5,000",
              subtitle: language === "en" ? "Focused strategic engagement covering planning fundamentals and initial alignment." : "Engagement stratégique ciblé couvrant les fondamentaux de la planification et l'alignement initial.",
              features: language === "en"
                ? ["Strategic planning sessions", "Vision and mission refinement", "Basic environmental analysis", "Strategic objective development", "Summary roadmap"]
                : ["Sessions de planification stratégique", "Affinement de la vision et de la mission", "Analyse environnementale de base", "Développement d'objectifs stratégiques", "Feuille de route de synthèse"],
              stripeProductName: "Strategic Engagement - Foundation"
            },
            {
              name: "Standard",
              price: "$10,000",
              subtitle: language === "en" ? "Full strategic engagement with KPI design, stakeholder alignment, and performance framework." : "Engagement stratégique complet avec conception de KPI et cadre de performance.",
              features: language === "en"
                ? ["Everything in Foundation", "Stakeholder analysis and alignment", "KPI and success metric design", "Performance framework development", "Leadership alignment workshops", "1-year strategic roadmap"]
                : ["Tout dans Fondation", "Analyse et alignement des parties prenantes", "Conception de KPI", "Développement du cadre de performance", "Ateliers d'alignement", "Feuille de route d'un an"],
              stripeProductName: "Strategic Engagement - Standard"
            },
            {
              name: language === "en" ? "Comprehensive" : "Complet",
              price: "$15,000",
              subtitle: language === "en" ? "Complete strategic transformation with deep-dive analysis, leadership coaching, and ongoing support." : "Transformation stratégique complète avec analyse approfondie et soutien continu.",
              features: language === "en"
                ? ["Everything in Standard", "Environmental and stakeholder deep-dive", "Leadership development sessions", "Organizational alignment framework", "3-year strategic roadmap", "Quarterly review sessions", "Implementation support"]
                : ["Tout dans Standard", "Analyse approfondie", "Sessions de développement du leadership", "Cadre d'alignement organisationnel", "Feuille de route de 3 ans", "Sessions de révision trimestrielles", "Soutien à la mise en œuvre"],
              stripeProductName: "Strategic Engagement - Comprehensive"
            }
          ]
        },
        {
          title: language === "en" ? "Systems & Implementation" : "Systèmes et mise en œuvre",
          investment: "$8,000 – $25,000",
          desc: language === "en"
            ? "Turn your strategy into something your team can actually execute, with systems, structures, and processes that make consistency the default."
            : "Transformez votre stratégie en quelque chose que votre équipe peut exécuter, avec des systèmes et processus qui font de la cohérence la norme.",
          benefits: language === "en"
            ? ["Performance management systems", "Governance & SOP frameworks", "Process optimization", "Implementation support & training"]
            : ["Systèmes de gestion de la performance", "Cadres de gouvernance", "Optimisation des processus", "Soutien à la mise en œuvre"],
          learnMore: language === "en"
            ? "Strategy without systems is just aspiration. Our Systems & Implementation engagements build the operational infrastructure your organization needs to execute consistently and scale effectively.\n\nWe design and implement full performance management systems, governance frameworks, and process architectures, turning strategic vision into measurable, repeatable operational excellence."
            : "La stratégie sans systèmes n'est qu'une aspiration.",
          idealFor: language === "en" ? "Organizations ready to build or overhaul their operational systems, governance structures, or performance infrastructure." : "Organisations prêtes à construire ou à refondre leurs systèmes opérationnels.",
          image: systemsImplementationImg,
          pricingTiers: [
            {
              name: language === "en" ? "Foundation" : "Fondation",
              price: "$8,000",
              subtitle: language === "en" ? "Core systems design with KPI frameworks, process mapping, and accountability structures." : "Conception de systèmes de base avec cadres de KPI et structures de responsabilité.",
              features: language === "en"
                ? ["KPI framework development", "Process mapping and documentation", "Role-based accountability structures", "Performance review templates", "Key findings report"]
                : ["Développement d'un cadre de KPI", "Cartographie et documentation des processus", "Structures de responsabilité", "Modèles d'examen des performances", "Rapport des conclusions"],
              stripeProductName: "Systems & Implementation - Foundation"
            },
            {
              name: "Standard",
              price: "$15,000",
              subtitle: language === "en" ? "Full system design with governance frameworks, SOP development, and balanced scorecard." : "Conception complète avec cadres de gouvernance et tableau de bord prospectif.",
              features: language === "en"
                ? ["Everything in Foundation", "Governance framework design", "SOP development", "Balanced scorecard design", "Role clarity frameworks", "Change management integration", "Implementation roadmap"]
                : ["Tout dans Fondation", "Conception du cadre de gouvernance", "Développement des procédures", "Tableau de bord prospectif", "Cadres de clarté des rôles", "Gestion du changement", "Feuille de route"],
              stripeProductName: "Systems & Implementation - Standard"
            },
            {
              name: "Enterprise",
              price: "$25,000",
              subtitle: language === "en" ? "Complete systems overhaul with full implementation, dashboards, and ongoing support." : "Refonte complète des systèmes avec mise en œuvre complète et soutien continu.",
              features: language === "en"
                ? ["Everything in Standard", "Full performance management system", "Reporting dashboards", "Process redesign and optimization", "Full implementation support", "Stakeholder engagement sessions", "Ongoing guidance and review sessions", "Executive coaching integration"]
                : ["Tout dans Standard", "Système complet de gestion", "Tableaux de bord", "Optimisation des processus", "Soutien complet", "Sessions parties prenantes", "Accompagnement continu", "Coaching exécutif"],
              stripeProductName: "Systems & Implementation - Enterprise"
            }
          ]
        },
        {
          title: language === "en" ? "Executive Advisory Retainer" : "Mandat de conseil exécutif",
          investment: "$2,500 – $7,500/mo",
          investmentNote: language === "en" ? "(Monthly retainer, 3-month minimum)" : "(Mandat mensuel, minimum 3 mois)",
          desc: language === "en"
            ? "A trusted strategic partner by your side, monthly guidance, leadership coaching, and someone who understands your business as well as you do."
            : "Un partenaire stratégique de confiance à vos côtés, accompagnement mensuel, coaching de leadership et quelqu'un qui comprend votre entreprise aussi bien que vous.",
          benefits: language === "en"
            ? ["Dedicated senior consultant", "Strategy & operations sessions", "Performance oversight & reporting", "Leadership coaching & development"]
            : ["Consultant senior dédié", "Sessions stratégiques", "Suivi de la performance", "Coaching de leadership"],
          learnMore: language === "en"
            ? "Growth doesn't stop after a project ends. Our Executive Advisory Retainer provides dedicated, senior-level guidance on a monthly basis, including strategy sessions, performance oversight, ongoing advisory, and leadership coaching.\n\nThis model is designed for organizations that want a trusted strategic partner without the cost of a full-time executive hire."
            : "La croissance ne s'arrête pas à la fin d'un projet.",
          idealFor: language === "en" ? "Organizations seeking consistent access to senior strategic guidance, performance oversight, and leadership coaching." : "Organisations cherchant un accès constant à des conseils stratégiques de haut niveau.",
          image: executiveAdvisoryImg,
          pricingTiers: [
            {
              name: "Standard",
              price: "$2,500/mo",
              subtitle: language === "en" ? "Monthly strategy sessions with performance oversight and ongoing advisory." : "Sessions stratégiques mensuelles avec suivi de la performance.",
              features: language === "en"
                ? ["Monthly strategy session", "Performance oversight and reporting", "Ongoing advisory support", "Email and phone access", "Quarterly progress review"]
                : ["Session stratégique mensuelle", "Suivi et rapport de performance", "Soutien consultatif continu", "Accès par e-mail et téléphone", "Examen trimestriel"],
              stripeProductName: "Executive Advisory - Standard",
              isMonthly: true
            },
            {
              name: "Premium",
              price: "$5,000/mo",
              subtitle: language === "en" ? "Bi-weekly sessions with leadership coaching, team alignment, and hands-on project support." : "Sessions bimensuelles avec coaching de leadership et soutien aux projets.",
              features: language === "en"
                ? ["Everything in Standard", "Bi-weekly strategy sessions", "Leadership coaching", "Team alignment support", "Process improvement guidance", "Priority support"]
                : ["Tout dans Standard", "Sessions bimensuelles", "Coaching de leadership", "Soutien à l'alignement", "Amélioration des processus", "Support prioritaire"],
              stripeProductName: "Executive Advisory - Premium",
              isMonthly: true
            },
            {
              name: language === "en" ? "Executive" : "Exécutif",
              price: "$7,500/mo",
              subtitle: language === "en" ? "Weekly strategic sessions with dedicated senior consultant, full advisory, and leadership development." : "Sessions stratégiques hebdomadaires avec consultant senior dédié.",
              features: language === "en"
                ? ["Everything in Premium", "Weekly strategy and operations sessions", "Dedicated senior consultant", "Full project management support", "Executive coaching and development", "Performance dashboards", "On-site support available", "24/7 priority access"]
                : ["Tout dans Premium", "Sessions hebdomadaires", "Consultant senior dédié", "Gestion de projet complète", "Coaching exécutif", "Tableaux de bord", "Support sur site", "Accès 24/7"],
              stripeProductName: "Executive Advisory - Executive",
              isMonthly: true
            }
          ]
        },
        {
          title: language === "en" ? "Business Registration" : "Enregistrement d'entreprise",
          investment: "$3,500 – $8,500",
          desc: language === "en"
            ? "Starting something new is exciting, and complicated. We handle the legal and administrative setup so you can focus on bringing your vision to life."
            : "Démarrer quelque chose de nouveau est passionnant, et compliqué. Nous gérons la paperasse pour que vous puissiez donner vie à votre vision.",
          benefits: language === "en"
            ? ["Structure consultation & name search", "Articles of incorporation filing", "Tax & compliance registration", "Governance document setup"]
            : ["Consultation structurelle", "Dépôt des statuts", "Inscription fiscale", "Documents de gouvernance"],
          learnMore: language === "en"
            ? "Starting a business involves more than just an idea, it requires proper legal structure, registration, and compliance. We guide you through the entire process, from choosing the right business structure to completing all government filings.\n\nOur team ensures your business is set up correctly from day one."
            : "Démarrer une entreprise implique plus qu'une simple idée.",
          idealFor: language === "en" ? "Entrepreneurs, startups, and organizations establishing a new legal entity or restructuring an existing one." : "Entrepreneurs, startups et organisations établissant une nouvelle entité juridique.",
          image: businessRegistrationImg,
          pricingTiers: [
            {
              name: language === "en" ? "Starter" : "Démarrage",
              price: "$3,500",
              subtitle: language === "en" ? "Sole proprietorship or basic incorporation with name search and registration filing." : "Entreprise individuelle ou incorporation de base.",
              features: language === "en"
                ? ["Business structure consultation", "Name search and reservation", "Articles of incorporation filing", "Certificate of incorporation", "Initial registered agent setup"]
                : ["Consultation structure d'entreprise", "Recherche et réservation de nom", "Dépôt des statuts", "Certificat de constitution", "Agent enregistré"],
              stripeProductName: "Business Registration - Starter"
            },
            {
              name: "Standard",
              price: "$5,500",
              subtitle: language === "en" ? "Full incorporation with corporate records, tax registration, and business number applications." : "Incorporation complète avec registres corporatifs et inscription fiscale.",
              features: language === "en"
                ? ["Everything in Starter", "Corporate records book setup", "CRA business number application", "HST/GST registration", "Initial corporate by-laws", "Organizational resolutions"]
                : ["Tout dans Démarrage", "Registres corporatifs", "Numéro d'entreprise ARC", "Inscription TPS/TVH", "Règlements administratifs", "Résolutions organisationnelles"],
              stripeProductName: "Business Registration - Standard"
            },
            {
              name: language === "en" ? "Comprehensive" : "Complet",
              price: "$8,500",
              subtitle: language === "en" ? "Complete setup with governance documents, shareholder agreements, and compliance framework." : "Configuration complète avec documents de gouvernance et conventions d'actionnaires.",
              features: language === "en"
                ? ["Everything in Standard", "Shareholder agreement drafting", "Governance framework setup", "Compliance checklist and calendar", "Provincial and federal registrations", "Post-incorporation advisory session", "90-day support period"]
                : ["Tout dans Standard", "Convention d'actionnaires", "Cadre de gouvernance", "Conformité", "Enregistrements provinciaux et fédéraux", "Session post-incorporation", "Soutien de 90 jours"],
              stripeProductName: "Business Registration - Comprehensive"
            }
          ]
        },
        {
          title: language === "en" ? "Website & Digital Presence" : "Site Web et présence numérique",
          investment: "$3,000 – $12,000",
          desc: language === "en"
            ? "Your online presence should reflect who you really are. We build websites that tell your story, build trust, and turn visitors into clients who believe in what you do."
            : "Votre présence en ligne doit refléter qui vous êtes vraiment. Nous construisons des sites qui racontent votre histoire et transforment les visiteurs en clients.",
          benefits: language === "en"
            ? ["Professional website design", "SEO & content strategy", "Brand identity setup", "Analytics & conversion tracking"]
            : ["Conception de site Web professionnel", "SEO et stratégie de contenu", "Identité de marque", "Analytique et suivi"],
          learnMore: language === "en"
            ? "Your website is often the first impression potential clients have of your business. We design and build professional, conversion-focused websites that communicate your value proposition clearly.\n\nOur digital presence packages include website design, SEO setup, content strategy, and analytics integration to help you attract and convert the right clients."
            : "Votre site Web est souvent la première impression. Nous concevons des sites professionnels axés sur la conversion.",
          idealFor: language === "en" ? "Businesses and professionals who need a professional web presence that converts visitors into clients." : "Entreprises et professionnels qui ont besoin d'une présence Web professionnelle.",
          image: websiteDevelopmentImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essential" : "Essentiel",
              price: "$3,000",
              subtitle: language === "en" ? "Professional single-page or multi-section website with responsive design." : "Site Web professionnel à page unique avec design responsive.",
              features: language === "en"
                ? ["Professional website design", "Mobile responsive", "Contact form integration", "Basic SEO setup", "Google Analytics setup", "1 round of revisions"]
                : ["Conception de site Web professionnel", "Responsive mobile", "Formulaire de contact", "SEO de base", "Google Analytics", "1 série de révisions"],
              stripeProductName: "Standard Business Website"
            },
            {
              name: "Standard",
              price: "$6,000",
              subtitle: language === "en" ? "Multi-page website with content strategy, advanced SEO, and brand alignment." : "Site Web multi-pages avec stratégie de contenu et SEO avancé.",
              features: language === "en"
                ? ["Everything in Essential", "Up to 8 custom pages", "Content strategy and copywriting", "Advanced SEO optimization", "Social media integration", "Email newsletter setup", "2 rounds of revisions"]
                : ["Tout dans Essentiel", "Jusqu'à 8 pages personnalisées", "Stratégie de contenu", "SEO avancé", "Intégration réseaux sociaux", "Newsletter par e-mail", "2 séries de révisions"],
              stripeProductName: "Advanced / Growth Website"
            },
            {
              name: "Premium",
              price: "$12,000",
              subtitle: language === "en" ? "Full digital presence with custom website, brand identity, content marketing, and analytics." : "Présence numérique complète avec site personnalisé et marketing de contenu.",
              features: language === "en"
                ? ["Everything in Standard", "Custom web application features", "Full brand identity package", "Content marketing strategy", "Conversion optimization", "Performance dashboard", "3 months post-launch support", "Priority support"]
                : ["Tout dans Standard", "Fonctionnalités web personnalisées", "Identité de marque complète", "Stratégie de marketing de contenu", "Optimisation de la conversion", "Tableau de bord", "3 mois de support", "Support prioritaire"],
              stripeProductName: "Premium / Enterprise Website"
            }
          ]
        },
        {
          title: language === "en" ? "Process Audit" : "Audit de processus",
          investment: "$1,000 – $3,000",
          desc: language === "en"
            ? "Something isn't working, but you can't pinpoint exactly what. We help you see clearly, find the friction, and leave with a practical roadmap to fix it."
            : "Quelque chose ne fonctionne pas, mais vous ne savez pas exactement quoi. Nous vous aidons à voir clairement et à repartir avec un plan concret.",
          benefits: language === "en"
            ? ["Workflow mapping & analysis", "Bottleneck identification", "Automation opportunity assessment", "30–60 day improvement roadmap"]
            : ["Cartographie et analyse des flux", "Identification des goulots", "Évaluation des opportunités d'automatisation", "Feuille de route de 30 à 60 jours"],
          learnMore: language === "en"
            ? "Not sure where to start? The Process Audit is a low-commitment first step that gives your organization immediate clarity on what is working, what is not, and where the biggest improvement opportunities lie.\n\nWe map your existing workflows, identify bottlenecks and redundancies, evaluate automation opportunities, and deliver a practical 30–60 day improvement roadmap you can act on immediately. Most audit clients convert into larger engagements because the findings create urgency and clarity."
            : "Pas sûr de par où commencer ? L'audit de processus est une première étape accessible qui donne à votre organisation une clarté immédiate sur ce qui fonctionne et ce qui doit être amélioré.",
          idealFor: language === "en" ? "Organizations experiencing operational friction, scaling challenges, or poor process visibility that want a quick, actionable assessment." : "Organisations confrontées à des frictions opérationnelles ou à des défis de mise à l'échelle.",
          image: processAuditImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$1,000",
              subtitle: language === "en" ? "Focused audit of 1-2 core workflows with bottleneck analysis and recommendations." : "Audit ciblé de 1 à 2 flux de travail avec analyse et recommandations.",
              features: language === "en"
                ? ["1–2 core workflow mapping", "Bottleneck identification", "Quick-win recommendations", "Summary findings report", "30-day action plan"]
                : ["Cartographie de 1-2 flux", "Identification des goulots", "Recommandations rapides", "Rapport de synthèse", "Plan d'action de 30 jours"],
              stripeProductName: "Process Audit - Essentials"
            },
            {
              name: "Standard",
              price: "$2,000",
              subtitle: language === "en" ? "Comprehensive audit across multiple workflows with stakeholder interviews and automation review." : "Audit complet avec entretiens et évaluation de l'automatisation.",
              features: language === "en"
                ? ["Everything in Essentials", "Full operational workflow audit", "Stakeholder interviews", "Automation opportunity assessment", "Prioritized improvement matrix", "60-day roadmap"]
                : ["Tout dans Essentiel", "Audit complet des flux", "Entretiens parties prenantes", "Évaluation automatisation", "Matrice d'amélioration", "Feuille de route de 60 jours"],
              stripeProductName: "Process Audit - Standard"
            },
            {
              name: language === "en" ? "Comprehensive" : "Complet",
              price: "$3,000",
              subtitle: language === "en" ? "End-to-end process audit with detailed documentation, cost analysis, and implementation guidance." : "Audit complet avec documentation détaillée et analyse des coûts.",
              features: language === "en"
                ? ["Everything in Standard", "Cross-departmental process mapping", "Cost and efficiency analysis", "Technology stack review", "Detailed documentation package", "Implementation guidance session", "90-day transformation roadmap"]
                : ["Tout dans Standard", "Cartographie inter-départementale", "Analyse des coûts et efficacité", "Revue technologique", "Documentation détaillée", "Session de guidance", "Feuille de route de 90 jours"],
              stripeProductName: "Process Audit - Comprehensive"
            }
          ]
        },
        {
          title: language === "en" ? "Operational Efficiency Workshop" : "Atelier d'efficacité opérationnelle",
          investment: "$2,500 – $5,000",
          desc: language === "en"
            ? "Get your leadership team in a room, aligned on what needs to change, and walking out with a concrete plan everyone owns. That's what this workshop delivers."
            : "Réunissez votre équipe de direction, alignez-vous sur ce qui doit changer, et repartez avec un plan concret que tout le monde porte. C'est ce que cet atelier offre.",
          benefits: language === "en"
            ? ["Operational inefficiency diagnosis", "Leadership alignment on priorities", "Process improvement roadmap", "Team action planning"]
            : ["Diagnostic des inefficacités", "Alignement du leadership", "Feuille de route d'amélioration", "Planification d'action d'équipe"],
          learnMore: language === "en"
            ? "Sometimes your team knows things are not working but cannot agree on what to fix first. The Operational Efficiency Workshop brings your leadership team into a structured session designed to surface operational friction, align on priorities, and leave with a concrete action plan.\n\nHalf-day workshops focus on diagnosing key inefficiencies and defining quick wins. Full-day workshops include deeper analysis, cross-functional alignment exercises, and a complete process improvement roadmap with ownership and timelines."
            : "Parfois votre équipe sait que les choses ne fonctionnent pas mais ne peut pas s'entendre sur quoi corriger en premier. L'atelier apporte une approche structurée.",
          idealFor: language === "en" ? "Leadership teams that need alignment on operational priorities, or organizations preparing for growth, restructuring, or process improvement initiatives." : "Équipes de direction qui ont besoin d'alignement sur les priorités opérationnelles.",
          image: workshopTrainingImg,
          pricingTiers: [
            {
              name: language === "en" ? "Half-Day" : "Demi-journée",
              price: "$2,500",
              subtitle: language === "en" ? "Focused 4-hour session on diagnosing inefficiencies and defining quick wins." : "Session ciblée de 4 heures pour diagnostiquer les inefficacités.",
              features: language === "en"
                ? ["4-hour facilitated workshop", "Current-state operational assessment", "Quick-win identification", "Priority alignment exercise", "Summary action plan", "Up to 8 participants"]
                : ["Atelier facilité de 4 heures", "Évaluation opérationnelle", "Identification de gains rapides", "Exercice d'alignement", "Plan d'action de synthèse", "Jusqu'à 8 participants"],
              stripeProductName: "Efficiency Workshop - Half-Day"
            },
            {
              name: language === "en" ? "Full-Day" : "Journée complète",
              price: "$5,000",
              subtitle: language === "en" ? "Comprehensive 8-hour session with deep analysis, cross-functional alignment, and detailed roadmap." : "Session complète de 8 heures avec analyse approfondie et feuille de route détaillée.",
              features: language === "en"
                ? ["Everything in Half-Day", "8-hour comprehensive workshop", "Cross-functional alignment exercises", "Detailed process mapping", "Complete improvement roadmap", "Ownership and timeline assignments", "Up to 15 participants", "30-day follow-up session"]
                : ["Tout dans Demi-journée", "Atelier complet de 8 heures", "Exercices d'alignement interfonctionnel", "Cartographie détaillée", "Feuille de route complète", "Assignation des responsabilités", "Jusqu'à 15 participants", "Session de suivi de 30 jours"],
              stripeProductName: "Efficiency Workshop - Full-Day"
            }
          ]
        },
        {
          title: language === "en" ? "Fractional Process Consultant" : "Consultant en processus fractionné",
          investment: "$3,000 – $10,000/mo",
          investmentNote: language === "en" ? "(Monthly retainer, 3-month minimum)" : "(Mandat mensuel, minimum 3 mois)",
          desc: language === "en"
            ? "Think of it as having a trusted operations partner on your team, someone who rolls up their sleeves, builds real systems, and helps your business run the way you always knew it could."
            : "Pensez à un partenaire opérationnel de confiance dans votre équipe, quelqu'un qui retrousse ses manches et aide votre entreprise à fonctionner comme vous l'avez toujours voulu.",
          benefits: language === "en"
            ? ["Dedicated process consultant", "Systems implementation support", "Ongoing process optimization", "Operational performance reporting"]
            : ["Consultant en processus dédié", "Implantation de systèmes", "Optimisation continue", "Rapports de performance"],
          learnMore: language === "en"
            ? "You need operational expertise but are not ready for a full-time hire. The Fractional Process Consultant model gives you a dedicated senior consultant who embeds into your team on a monthly basis to design, implement, and optimize your operational systems.\n\nThis is not advisory from a distance, your consultant works alongside your team to build real infrastructure: process documentation, systems implementation, performance tracking, and continuous improvement. Think of it as a hands-on operations partner who helps you build the systems your business needs to scale."
            : "Vous avez besoin d'expertise opérationnelle mais n'êtes pas prêt pour un employé à temps plein. Le modèle fractionné vous donne un consultant senior dédié.",
          idealFor: language === "en" ? "Growing companies that need hands-on operational support to build scalable systems, implement process improvements, and drive operational excellence." : "Entreprises en croissance qui ont besoin d'un soutien opérationnel pratique.",
          image: fractionalConsultantImg,
          pricingTiers: [
            {
              name: language === "en" ? "Core" : "Essentiel",
              price: "$3,000/mo",
              subtitle: language === "en" ? "Part-time process consultant with monthly systems work and optimization." : "Consultant à temps partiel avec travail mensuel sur les systèmes.",
              features: language === "en"
                ? ["Part-time consultant allocation", "Process documentation and mapping", "Monthly systems implementation", "Operational improvement tracking", "Monthly progress report", "Email and phone support"]
                : ["Allocation consultant à temps partiel", "Documentation de processus", "Implantation mensuelle", "Suivi des améliorations", "Rapport mensuel", "Support par e-mail et téléphone"],
              isMonthly: true,
              stripeProductName: "Fractional Consultant - Core"
            },
            {
              name: "Standard",
              price: "$6,000/mo",
              subtitle: language === "en" ? "Dedicated consultant with weekly sessions, full systems build-out, and team training." : "Consultant dédié avec sessions hebdomadaires et formation d'équipe.",
              features: language === "en"
                ? ["Everything in Core", "Weekly strategy and operations sessions", "Full systems design and implementation", "Team training and onboarding", "SOP development", "Performance dashboards", "Bi-weekly progress reviews"]
                : ["Tout dans Essentiel", "Sessions hebdomadaires", "Conception et implantation complète", "Formation d'équipe", "Développement de procédures", "Tableaux de bord", "Revues bimensuelles"],
              isMonthly: true,
              stripeProductName: "Fractional Consultant - Standard"
            },
            {
              name: "Premium",
              price: "$10,000/mo",
              subtitle: language === "en" ? "Senior consultant with full operational integration, cross-department optimization, and executive reporting." : "Consultant senior avec intégration opérationnelle complète.",
              features: language === "en"
                ? ["Everything in Standard", "Senior consultant dedication", "Cross-department process optimization", "Automation implementation support", "Executive reporting and dashboards", "Change management guidance", "On-site availability", "Priority and on-demand support"]
                : ["Tout dans Standard", "Consultant senior dédié", "Optimisation inter-départementale", "Automatisation", "Rapports exécutifs", "Gestion du changement", "Disponibilité sur site", "Support prioritaire"],
              isMonthly: true,
              stripeProductName: "Fractional Consultant - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "HR & People Strategy" : "Stratégie RH et gestion des personnes",
          investment: "$5,000 – $15,000",
          investmentNote: language === "en" ? "(6–12 week engagement)" : "(Engagement de 6 à 12 semaines)",
          desc: language === "en"
            ? "Your people are the heart of your business. We help you create the systems, policies, and culture that attract great talent and make them want to stay."
            : "Vos gens sont le cœur de votre entreprise. Nous créons les systèmes, politiques et la culture qui attirent les meilleurs talents et les fidélisent.",
          benefits: language === "en"
            ? ["HR policy & framework design", "Performance management systems", "Employee engagement strategy", "Workforce planning & org design"]
            : ["Conception de politiques RH", "Systèmes de gestion de la performance", "Stratégie d'engagement des employés", "Planification de la main-d'œuvre"],
          learnMore: language === "en"
            ? "People are your most valuable asset, but without the right systems, even great talent underperforms. Our HR & People Strategy engagements help you design and implement the frameworks, policies, and systems that attract, develop, and retain top talent.\n\nWe cover everything from HR policy development and performance review systems to employee engagement strategies, succession planning, and organizational design. Whether you're building HR from scratch or overhauling an existing function, we create people infrastructure that scales with your business."
            : "Les personnes sont votre atout le plus précieux. Nous vous aidons à concevoir et mettre en œuvre les cadres, politiques et systèmes qui attirent, développent et retiennent les meilleurs talents.",
          idealFor: language === "en" ? "Organizations building or restructuring their HR function, or leadership teams that need people systems to support growth." : "Organisations construisant ou restructurant leur fonction RH.",
          image: hrPeopleStrategyImg,
          pricingTiers: [
            {
              name: language === "en" ? "Foundation" : "Fondation",
              price: "$5,000",
              subtitle: language === "en" ? "Core HR framework with policies, role clarity, and performance review design." : "Cadre RH de base avec politiques et conception de revue de performance.",
              features: language === "en"
                ? ["HR policy framework", "Role and responsibility mapping", "Performance review system design", "Employee handbook template", "Compliance checklist"]
                : ["Cadre de politiques RH", "Cartographie des rôles", "Conception du système de revue", "Modèle de manuel employé", "Liste de conformité"],
              stripeProductName: "HR Strategy - Foundation"
            },
            {
              name: "Standard",
              price: "$10,000",
              subtitle: language === "en" ? "Full people strategy with engagement systems, compensation framework, and talent planning." : "Stratégie complète avec systèmes d'engagement et planification des talents.",
              features: language === "en"
                ? ["Everything in Foundation", "Employee engagement strategy", "Compensation and benefits framework", "Talent management roadmap", "Onboarding program design", "HR metrics and KPI dashboard", "Leadership development recommendations"]
                : ["Tout dans Fondation", "Stratégie d'engagement", "Cadre de rémunération", "Feuille de route de gestion des talents", "Programme d'intégration", "Tableau de bord RH", "Recommandations de développement du leadership"],
              stripeProductName: "HR Strategy - Standard"
            },
            {
              name: language === "en" ? "Comprehensive" : "Complet",
              price: "$15,000",
              subtitle: language === "en" ? "Complete people infrastructure with succession planning, organizational design, and implementation support." : "Infrastructure complète avec planification de la relève et conception organisationnelle.",
              features: language === "en"
                ? ["Everything in Standard", "Organizational design and restructuring", "Succession planning framework", "Culture assessment and strategy", "DEI strategy development", "Workforce planning model", "Full implementation support", "Quarterly review sessions"]
                : ["Tout dans Standard", "Conception organisationnelle", "Planification de la relève", "Évaluation de la culture", "Stratégie DEI", "Planification de la main-d'œuvre", "Soutien à la mise en œuvre", "Revues trimestrielles"],
              stripeProductName: "HR Strategy - Comprehensive"
            }
          ]
        },
        {
          title: language === "en" ? "Leadership & Talent Development" : "Développement du leadership et des talents",
          investment: "$5,000 – $20,000",
          desc: language === "en"
            ? "Invest in the people who will lead your organization tomorrow. We help you identify, develop, and retain the leaders who will carry your vision forward."
            : "Investissez dans ceux qui dirigeront votre organisation demain. Nous identifions, développons et retenons les leaders qui porteront votre vision.",
          benefits: language === "en"
            ? ["Leadership development programs", "High-potential talent identification", "Succession planning", "Management training design"]
            : ["Programmes de développement du leadership", "Identification des hauts potentiels", "Planification de la relève", "Conception de formation en gestion"],
          learnMore: language === "en"
            ? "Your organization's future depends on the leaders you develop today. Our Leadership & Talent Development engagements build structured programs that identify, develop, and retain your best people.\n\nFrom high-potential identification and competency frameworks to management training programs and succession planning, we help you create a leadership pipeline that ensures your organization is never dependent on a single person or team."
            : "L'avenir de votre organisation dépend des leaders que vous développez aujourd'hui. Nous construisons des programmes structurés pour identifier, développer et retenir vos meilleurs talents.",
          idealFor: language === "en" ? "Organizations investing in leadership capacity, facing succession gaps, or building management bench strength." : "Organisations investissant dans la capacité de leadership ou confrontées à des défis de relève.",
          image: talentDevelopmentImg,
          pricingTiers: [
            {
              name: language === "en" ? "Foundation" : "Fondation",
              price: "$5,000",
              subtitle: language === "en" ? "Leadership competency framework with talent assessment and development planning." : "Cadre de compétences en leadership avec évaluation des talents.",
              features: language === "en"
                ? ["Leadership competency framework", "Talent assessment methodology", "Individual development plan templates", "Management skills gap analysis", "Development roadmap", "Summary recommendations report"]
                : ["Cadre de compétences en leadership", "Méthodologie d'évaluation", "Modèles de plan de développement", "Analyse des écarts", "Feuille de route de développement", "Rapport de recommandations"],
              stripeProductName: "Talent Development - Foundation"
            },
            {
              name: "Standard",
              price: "$12,000",
              subtitle: language === "en" ? "Full talent development program with training design, coaching framework, and succession planning." : "Programme complet de développement avec formation, coaching et planification de la relève.",
              features: language === "en"
                ? ["Everything in Foundation", "Custom training program design", "Coaching framework and toolkit", "High-potential identification system", "Succession planning framework", "Mentorship program design", "Quarterly progress reviews"]
                : ["Tout dans Fondation", "Conception de programme de formation", "Cadre de coaching", "Système d'identification des hauts potentiels", "Planification de la relève", "Programme de mentorat", "Revues trimestrielles"],
              stripeProductName: "Talent Development - Standard"
            },
            {
              name: language === "en" ? "Enterprise" : "Entreprise",
              price: "$20,000",
              subtitle: language === "en" ? "Comprehensive leadership development with multi-level programs, 360 assessments, and ongoing support." : "Développement complet du leadership avec programmes multi-niveaux et évaluations 360.",
              features: language === "en"
                ? ["Everything in Standard", "Multi-level leadership programs", "360-degree assessment integration", "Executive coaching integration", "Leadership academy design", "Culture and engagement surveys", "Full implementation support", "6-month post-program support"]
                : ["Tout dans Standard", "Programmes multi-niveaux", "Évaluation 360 degrés", "Coaching exécutif", "Conception d'académie de leadership", "Sondages culture et engagement", "Soutien à la mise en œuvre", "Support de 6 mois"],
              stripeProductName: "Talent Development - Enterprise"
            }
          ]
        }
      ]
    },
    business: {
      label: language === "en" ? "Small Business" : "Petite entreprise",
      tagline: language === "en" ? "For founders and small business owners who want a real partner in their corner, not just advice from the sidelines" : "Pour les fondateurs et propriétaires de PME qui veulent un vrai partenaire à leurs côtés",
      icon: <Rocket className="text-accent" size={24} />,
      services: [
        {
          title: language === "en" ? "Small Business Growth System" : "Système de croissance pour petites entreprises",
          investment: "$500 – $1,500/mo",
          investmentNote: language === "en" ? "(3-month minimum)" : "(Minimum 3 mois)",
          desc: language === "en"
            ? "You don't have to figure it all out alone. Get a dedicated strategy partner who helps you prioritize, plan, and actually follow through, month after month."
            : "Vous n'avez pas à tout comprendre seul. Obtenez un partenaire stratégique qui vous aide à prioriser, planifier et exécuter, mois après mois.",
          benefits: language === "en"
            ? ["Strategic advising & planning", "Operational process support", "Accountability systems", "Monthly progress reviews"]
            : ["Conseil stratégique", "Soutien opérationnel", "Systèmes de responsabilité", "Revues mensuelles"],
          learnMore: language === "en"
            ? "Running a small business means wearing many hats. Our Small Business Growth System gives you a dedicated strategy partner who helps you prioritize, plan, and execute, so you stop spinning your wheels and start seeing real progress.\n\nThis monthly engagement includes strategic advising, operational process support, accountability systems, and regular check-ins to keep your business on track."
            : "Diriger une petite entreprise signifie porter plusieurs chapeaux. Notre système vous donne un partenaire stratégique dédié.",
          idealFor: language === "en" ? "Small business owners, founders, and entrepreneurs who want structured support to scale sustainably." : "Propriétaires de petites entreprises et fondateurs.",
          image: businessCoachingImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$500/mo",
              subtitle: language === "en" ? "Monthly advisory with strategy sessions and basic accountability." : "Conseil mensuel avec sessions stratégiques et responsabilité de base.",
              features: language === "en"
                ? ["Monthly strategy session", "Priority setting and planning", "Basic accountability check-ins", "Email support", "Progress tracking template"]
                : ["Session stratégique mensuelle", "Définition des priorités", "Points de contrôle de base", "Support par e-mail", "Modèle de suivi"],
              isMonthly: true,
              stripeProductName: "SB Growth System - Essentials"
            },
            {
              name: "Standard",
              price: "$1,000/mo",
              subtitle: language === "en" ? "Bi-weekly sessions with operational support and process development." : "Sessions bimensuelles avec soutien opérationnel.",
              features: language === "en"
                ? ["Everything in Essentials", "Bi-weekly strategy sessions", "Operational process development", "KPI tracking setup", "Team management guidance", "Priority phone support"]
                : ["Tout dans Essentiel", "Sessions bimensuelles", "Développement de processus", "Configuration des KPI", "Gestion d'équipe", "Support téléphonique prioritaire"],
              isMonthly: true,
              stripeProductName: "SB Growth System - Standard"
            },
            {
              name: "Premium",
              price: "$1,500/mo",
              subtitle: language === "en" ? "Weekly sessions with full business systems support and growth strategy." : "Sessions hebdomadaires avec soutien complet.",
              features: language === "en"
                ? ["Everything in Standard", "Weekly strategy sessions", "Full business systems review", "Growth strategy development", "Financial planning support", "Vendor and partner evaluation", "On-demand messaging support"]
                : ["Tout dans Standard", "Sessions hebdomadaires", "Revue complète des systèmes", "Stratégie de croissance", "Planification financière", "Évaluation des partenaires", "Support messagerie"],
              isMonthly: true,
              stripeProductName: "SB Growth System - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "Business Foundations Package" : "Forfait fondations d'entreprise",
          investment: "$2,500 – $5,000",
          desc: language === "en"
            ? "Starting a business is overwhelming. We help you lay a strong foundation from day one, structure, plans, processes, and a clear 90-day path forward."
            : "Démarrer une entreprise est accablant. Nous vous aidons à poser des fondations solides dès le premier jour, structure, plans et un parcours clair de 90 jours.",
          benefits: language === "en"
            ? ["Operational process design", "Role & accountability structures", "Business planning foundations", "Performance tracking setup"]
            : ["Conception des processus opérationnels", "Structures de responsabilité", "Fondations de planification", "Configuration du suivi"],
          learnMore: language === "en"
            ? "Before you can scale, you need structure. Our Business Foundations Package helps you build the operational and organizational systems that most small businesses skip, until they become urgent.\n\nThis one-time engagement gives you a solid operational foundation: documented processes, clear roles, financial tracking, and accountability systems."
            : "Avant de pouvoir évoluer, vous avez besoin de structure.",
          idealFor: language === "en" ? "Early-stage businesses, startups, and entrepreneurs who need foundational business systems built properly from day one." : "Entreprises en démarrage et startups.",
          image: businessFoundationsImg,
          pricingTiers: [
            {
              name: language === "en" ? "Core" : "Essentiel",
              price: "$2,500",
              subtitle: language === "en" ? "Essential business foundations with core processes and structure." : "Fondations essentielles avec processus de base.",
              features: language === "en"
                ? ["Business model review", "Core process documentation", "Role and responsibility mapping", "Basic financial tracking setup", "Operational checklist"]
                : ["Revue du modèle d'affaires", "Documentation des processus", "Cartographie des rôles", "Suivi financier de base", "Liste de contrôle opérationnelle"],
              stripeProductName: "Business Foundations - Core"
            },
            {
              name: "Standard",
              price: "$3,500",
              subtitle: language === "en" ? "Complete business setup with systems, planning, and team frameworks." : "Configuration complète avec systèmes et planification.",
              features: language === "en"
                ? ["Everything in Core", "Strategic business plan", "Full operational process design", "Team accountability framework", "KPI dashboard setup", "90-day execution roadmap"]
                : ["Tout dans Essentiel", "Plan d'affaires stratégique", "Conception opérationnelle complète", "Cadre de responsabilité", "Tableau de bord KPI", "Feuille de route de 90 jours"],
              stripeProductName: "Business Foundations - Standard"
            },
            {
              name: "Premium",
              price: "$5,000",
              subtitle: language === "en" ? "Full business foundation with governance, compliance, and growth strategy." : "Fondation complète avec gouvernance et stratégie de croissance.",
              features: language === "en"
                ? ["Everything in Standard", "Governance framework", "Compliance setup", "Growth strategy outline", "Vendor management framework", "Quarterly review template", "60-day post-engagement support"]
                : ["Tout dans Standard", "Cadre de gouvernance", "Configuration de la conformité", "Stratégie de croissance", "Gestion des fournisseurs", "Modèle de revue trimestrielle", "Support de 60 jours"],
              stripeProductName: "Business Foundations - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "Process Audit" : "Audit de processus",
          investment: "$500 – $1,500",
          desc: language === "en"
            ? "You know something's slowing you down, you just can't see exactly where. We map your workflows, spot the friction, and give you a plan to fix it fast."
            : "Vous savez que quelque chose vous ralentit, vous ne voyez juste pas exactement où. Nous cartographions vos flux et vous donnons un plan pour corriger rapidement.",
          benefits: language === "en"
            ? ["Core workflow mapping", "Bottleneck identification", "Quick-win recommendations", "30-day action plan"]
            : ["Cartographie des flux clés", "Identification des goulots", "Recommandations rapides", "Plan d'action de 30 jours"],
          learnMore: language === "en"
            ? "As a small business owner, you know something is not working but you cannot pinpoint exactly where the time and money are going. The Process Audit gives you a clear picture of your current operations and a practical action plan to fix what is slowing you down.\n\nWe map your key workflows, identify where things break down, and give you a prioritized list of improvements you can start implementing right away. Many of our small business clients see immediate time savings after this engagement."
            : "En tant que propriétaire de petite entreprise, vous savez que quelque chose ne fonctionne pas. L'audit de processus vous donne une image claire et un plan d'action pratique.",
          idealFor: language === "en" ? "Small business owners who feel stuck in day-to-day chaos and want a clear picture of what to fix first." : "Propriétaires de PME qui veulent savoir quoi corriger en premier.",
          image: processAuditImg,
          pricingTiers: [
            {
              name: language === "en" ? "Quick Scan" : "Analyse rapide",
              price: "$500",
              subtitle: language === "en" ? "Focused review of your top 1-2 pain points with actionable recommendations." : "Revue ciblée de vos 1-2 problèmes principaux avec recommandations.",
              features: language === "en"
                ? ["1–2 workflow review", "Pain point analysis", "Quick-win recommendations", "Summary report", "30-minute debrief call"]
                : ["Revue de 1-2 flux", "Analyse des problèmes", "Recommandations rapides", "Rapport de synthèse", "Appel de débriefing de 30 minutes"],
              stripeProductName: "SB Process Audit - Quick Scan"
            },
            {
              name: "Standard",
              price: "$1,000",
              subtitle: language === "en" ? "Full workflow audit across your core business operations." : "Audit complet de vos opérations principales.",
              features: language === "en"
                ? ["Everything in Quick Scan", "Full operational workflow audit", "Team input and feedback", "Prioritized improvement plan", "30-day action roadmap"]
                : ["Tout dans Analyse rapide", "Audit complet des opérations", "Retour d'équipe", "Plan d'amélioration priorisé", "Feuille de route de 30 jours"],
              stripeProductName: "SB Process Audit - Standard"
            },
            {
              name: language === "en" ? "Comprehensive" : "Complet",
              price: "$1,500",
              subtitle: language === "en" ? "Deep-dive audit with documentation, cost analysis, and implementation guidance." : "Audit approfondi avec documentation et analyse des coûts.",
              features: language === "en"
                ? ["Everything in Standard", "Process documentation", "Cost and time analysis", "Technology and tools review", "Implementation guidance session", "60-day follow-up check-in"]
                : ["Tout dans Standard", "Documentation des processus", "Analyse des coûts et du temps", "Revue des outils", "Session de guidance", "Suivi de 60 jours"],
              stripeProductName: "SB Process Audit - Comprehensive"
            }
          ]
        },
        {
          title: language === "en" ? "Operational Efficiency Workshop" : "Atelier d'efficacité opérationnelle",
          investment: "$1,500 – $3,000",
          desc: language === "en"
            ? "When your team knows things need to change but can't agree on where to start, this workshop gets everyone on the same page and walking out with a shared plan."
            : "Quand votre équipe sait que les choses doivent changer mais ne s'entend pas sur par où commencer, cet atelier aligne tout le monde sur un plan commun.",
          benefits: language === "en"
            ? ["Team alignment on priorities", "Operational bottleneck diagnosis", "Clear improvement roadmap", "Actionable next steps"]
            : ["Alignement de l'équipe", "Diagnostic des goulots", "Feuille de route claire", "Prochaines étapes concrètes"],
          learnMore: language === "en"
            ? "When everyone on your team knows things need to change but nobody agrees on where to start, this workshop gets everyone on the same page. We facilitate a structured session that surfaces your biggest operational challenges, aligns your team on priorities, and produces a concrete action plan.\n\nThe half-day format is ideal for small teams who need focus and direction. The full-day format adds deeper process mapping and role clarity exercises for teams going through growth or transition."
            : "Quand tout le monde sait que les choses doivent changer mais personne ne s'entend sur par où commencer, cet atelier aligne votre équipe.",
          idealFor: language === "en" ? "Small business teams that need to get aligned on priorities and walk away with a clear action plan." : "Équipes de PME qui doivent s'aligner et repartir avec un plan concret.",
          image: workshopTrainingImg,
          pricingTiers: [
            {
              name: language === "en" ? "Half-Day" : "Demi-journée",
              price: "$1,500",
              subtitle: language === "en" ? "Focused 3-hour session to diagnose issues and define priorities." : "Session ciblée de 3 heures pour diagnostiquer et prioriser.",
              features: language === "en"
                ? ["3-hour facilitated session", "Operational pain point mapping", "Priority alignment exercise", "Action plan with next steps", "Up to 6 participants"]
                : ["Session facilitée de 3 heures", "Cartographie des problèmes", "Exercice d'alignement", "Plan d'action", "Jusqu'à 6 participants"],
              stripeProductName: "SB Workshop - Half-Day"
            },
            {
              name: language === "en" ? "Full-Day" : "Journée complète",
              price: "$3,000",
              subtitle: language === "en" ? "Comprehensive working session with process mapping, role clarity, and detailed roadmap." : "Session de travail complète avec cartographie et feuille de route.",
              features: language === "en"
                ? ["Everything in Half-Day", "6-hour comprehensive session", "Process mapping exercises", "Role clarity and accountability design", "Detailed improvement roadmap", "Ownership assignments", "Up to 10 participants", "30-day follow-up call"]
                : ["Tout dans Demi-journée", "Session complète de 6 heures", "Exercices de cartographie", "Clarté des rôles", "Feuille de route détaillée", "Assignation des responsabilités", "Jusqu'à 10 participants", "Appel de suivi de 30 jours"],
              stripeProductName: "SB Workshop - Full-Day"
            }
          ]
        },
        {
          title: language === "en" ? "Website & Digital Presence" : "Site Web et présence numérique",
          investment: "$1,500 – $5,000",
          desc: language === "en"
            ? "Your website is often the first impression, make it count. We build clean, professional sites that tell your story and help the right clients find you."
            : "Votre site Web est souvent la première impression, faites qu'elle compte. Nous construisons des sites professionnels qui racontent votre histoire.",
          benefits: language === "en"
            ? ["Professional website design", "Mobile-friendly & fast", "SEO basics included", "Contact and lead capture"]
            : ["Conception professionnelle", "Mobile et rapide", "SEO de base inclus", "Capture de contacts"],
          learnMore: language === "en"
            ? "Your website is the first thing potential clients see. If it does not look professional, you lose trust before the conversation even starts. We build clean, conversion-focused websites designed specifically for small businesses, no bloated features, no enterprise pricing.\n\nEvery package includes mobile-responsive design, basic SEO, and a contact form so you can start capturing leads from day one."
            : "Votre site Web est la première chose que voient vos clients potentiels. Nous construisons des sites professionnels conçus pour les petites entreprises.",
          idealFor: language === "en" ? "Small businesses, startups, and founders who need a professional web presence that builds trust and generates leads." : "PME, startups et fondateurs qui ont besoin d'un site professionnel.",
          image: websiteDevelopmentImg,
          pricingTiers: [
            {
              name: language === "en" ? "Starter" : "Démarrage",
              price: "$1,500",
              subtitle: language === "en" ? "Clean single-page website with contact form and mobile-friendly design." : "Site Web à page unique avec formulaire de contact.",
              features: language === "en"
                ? ["Single-page website", "Mobile responsive design", "Contact form", "Basic SEO setup", "Google Analytics", "1 round of revisions"]
                : ["Site à page unique", "Design responsive", "Formulaire de contact", "SEO de base", "Google Analytics", "1 révision"],
              stripeProductName: "SB Website - Starter"
            },
            {
              name: "Standard",
              price: "$3,000",
              subtitle: language === "en" ? "Multi-page website with content strategy and lead capture." : "Site multi-pages avec stratégie de contenu.",
              features: language === "en"
                ? ["Everything in Starter", "Up to 5 custom pages", "Content strategy guidance", "Lead capture integration", "Social media links", "2 rounds of revisions"]
                : ["Tout dans Démarrage", "Jusqu'à 5 pages", "Stratégie de contenu", "Capture de prospects", "Réseaux sociaux", "2 révisions"],
              stripeProductName: "SB Website - Standard"
            },
            {
              name: "Premium",
              price: "$5,000",
              subtitle: language === "en" ? "Full digital presence with brand identity, content, and ongoing support." : "Présence numérique complète avec identité de marque et support.",
              features: language === "en"
                ? ["Everything in Standard", "Brand identity basics", "Blog or news section", "Email newsletter integration", "Conversion optimization", "3 months post-launch support"]
                : ["Tout dans Standard", "Identité de marque", "Section blog", "Newsletter par e-mail", "Optimisation de conversion", "3 mois de support"],
              stripeProductName: "SB Website - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "People Operations Setup" : "Mise en place des opérations RH",
          investment: "$2,000 – $5,000",
          desc: language === "en"
            ? "Your team deserves more than guesswork. We set up the HR essentials, clear policies, smooth onboarding, and fair reviews, so your people feel supported and valued."
            : "Votre équipe mérite mieux que l'improvisation. Nous mettons en place les essentiels RH pour que vos employés se sentent soutenus et valorisés.",
          benefits: language === "en"
            ? ["Employee policy handbook", "Onboarding process design", "Performance review framework", "Team management systems"]
            : ["Manuel de politiques", "Processus d'intégration", "Cadre de revue de performance", "Systèmes de gestion d'équipe"],
          learnMore: language === "en"
            ? "Most small businesses wing it when it comes to managing people, and it catches up with them. Unclear expectations, no onboarding process, inconsistent reviews, and reactive problem-solving create turnover, low morale, and legal risk.\n\nOur People Operations Setup gives you the essential HR infrastructure every growing business needs: clear policies, a structured onboarding process, a simple performance review system, and team management templates you can actually use. No corporate bloat, just what works."
            : "La plupart des PME improvisent la gestion des personnes. Nous vous donnons les fondations RH essentielles : politiques claires, intégration structurée et système de revue de performance simple.",
          idealFor: language === "en" ? "Small businesses with 3–25 employees who need professional HR foundations without the overhead of a full HR department." : "PME de 3 à 25 employés qui ont besoin de fondations RH professionnelles.",
          image: peopleOperationsImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$2,000",
              subtitle: language === "en" ? "Core HR policies and employee handbook for small teams." : "Politiques RH de base et manuel employé pour petites équipes.",
              features: language === "en"
                ? ["Employee policy handbook", "Core HR policies (5–8 policies)", "Simple onboarding checklist", "Role description templates", "Basic compliance guidance"]
                : ["Manuel de politiques", "Politiques RH de base (5-8)", "Liste d'intégration", "Modèles de description de rôle", "Guide de conformité de base"],
              stripeProductName: "People Ops - Essentials"
            },
            {
              name: "Standard",
              price: "$3,500",
              subtitle: language === "en" ? "Full people operations setup with onboarding, reviews, and team systems." : "Configuration complète des opérations RH avec intégration et revues.",
              features: language === "en"
                ? ["Everything in Essentials", "Structured onboarding program", "Performance review system", "Team accountability framework", "1-on-1 meeting templates", "Employee feedback process", "30-day follow-up session"]
                : ["Tout dans Essentiel", "Programme d'intégration structuré", "Système de revue de performance", "Cadre de responsabilité", "Modèles de rencontres 1-à-1", "Processus de rétroaction", "Session de suivi de 30 jours"],
              stripeProductName: "People Ops - Standard"
            },
            {
              name: "Premium",
              price: "$5,000",
              subtitle: language === "en" ? "Complete HR foundation with culture strategy, compensation framework, and ongoing support." : "Fondation RH complète avec stratégie de culture et cadre de rémunération.",
              features: language === "en"
                ? ["Everything in Standard", "Culture and values framework", "Compensation and benefits guide", "Employee development plan templates", "Conflict resolution process", "HR compliance audit", "60-day post-engagement support"]
                : ["Tout dans Standard", "Cadre de culture et valeurs", "Guide de rémunération", "Modèles de plan de développement", "Processus de résolution de conflits", "Audit de conformité RH", "Support de 60 jours"],
              stripeProductName: "People Ops - Premium"
            }
          ]
        }
      ]
    },
    professional: {
      label: language === "en" ? "Professional" : "Professionnel",
      tagline: language === "en" ? "For professionals ready to invest in themselves, build confidence, clarity, and a career you're proud of" : "Pour les professionnels prêts à investir en eux-mêmes, confiance, clarté et une carrière dont vous êtes fier",
      icon: <UserCheck className="text-accent" size={24} />,
      services: [
        {
          title: language === "en" ? "Personal Performance Coaching" : "Coaching de performance personnelle",
          investment: "$100 – $500/mo",
          desc: language === "en"
            ? "You don't need more advice, you need someone in your corner. Our coaching helps you gain clarity, build momentum, and become the professional you know you can be."
            : "Vous n'avez pas besoin de plus de conseils, vous avez besoin de quelqu'un à vos côtés. Notre coaching vous aide à gagner en clarté et devenir le professionnel que vous savez pouvoir être.",
          benefits: language === "en"
            ? ["Personal goal-setting framework", "Accountability & habit systems", "Productivity & time management", "Career strategy & growth planning"]
            : ["Cadre d'objectifs personnels", "Systèmes de responsabilité", "Productivité et gestion du temps", "Planification de carrière"],
          learnMore: language === "en"
            ? "Performance isn't just for organizations, it starts with you. Our Personal Performance Coaching helps ambitious professionals build the habits, systems, and accountability structures they need to consistently perform at their best.\n\nWhether you're a manager, entrepreneur, executive, or career professional, this coaching is designed to help you take control of your growth."
            : "La performance ne concerne pas que les organisations, elle commence par vous.",
          idealFor: language === "en" ? "Ambitious professionals, managers, entrepreneurs, and career-focused individuals who want structured personal performance coaching." : "Professionnels ambitieux et gestionnaires.",
          image: personalCoachingImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$100/mo",
              subtitle: language === "en" ? "Monthly coaching sessions with goal setting and basic accountability." : "Sessions de coaching mensuelles avec définition d'objectifs.",
              features: language === "en"
                ? ["Monthly coaching session", "Personal goal-setting framework", "Basic accountability system", "Email check-ins", "Monthly progress review"]
                : ["Session de coaching mensuelle", "Cadre d'objectifs personnels", "Système de responsabilité de base", "Points de contrôle par e-mail", "Revue mensuelle"],
              isMonthly: true,
              stripeProductName: "Personal Coaching - Essentials"
            },
            {
              name: "Standard",
              price: "$250/mo",
              subtitle: language === "en" ? "Bi-weekly sessions with productivity systems and habit building." : "Sessions bimensuelles avec systèmes de productivité.",
              features: language === "en"
                ? ["Everything in Essentials", "Bi-weekly coaching sessions", "Productivity system design", "Habit building framework", "Time management strategies", "Priority support"]
                : ["Tout dans Essentiel", "Sessions bimensuelles", "Conception de systèmes de productivité", "Construction d'habitudes", "Stratégies de gestion du temps", "Support prioritaire"],
              isMonthly: true,
              stripeProductName: "Personal Coaching - Standard"
            },
            {
              name: "Premium",
              price: "$500/mo",
              subtitle: language === "en" ? "Weekly sessions with comprehensive personal performance system and leadership development." : "Sessions hebdomadaires avec système de performance personnelle complet.",
              features: language === "en"
                ? ["Everything in Standard", "Weekly coaching sessions", "Complete personal performance system", "Leadership development focus", "Career strategy planning", "Personal KPI dashboard", "On-demand messaging support", "Quarterly strategic review"]
                : ["Tout dans Standard", "Sessions hebdomadaires", "Système de performance personnelle complet", "Développement du leadership", "Planification de carrière", "Tableau de bord KPI personnel", "Support messagerie", "Revue stratégique trimestrielle"],
              isMonthly: true,
              stripeProductName: "Personal Coaching - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "Personal Workflow Audit" : "Audit de flux de travail personnel",
          investment: "$250 – $750",
          desc: language === "en"
            ? "Feeling overwhelmed? We look at how you actually spend your time, find what's stealing your energy, and design a system that works for the way you think."
            : "Vous vous sentez débordé ? Nous examinons comment vous passez votre temps, trouvons ce qui vole votre énergie et concevons un système adapté à votre façon de penser.",
          benefits: language === "en"
            ? ["Time and task flow analysis", "Productivity bottleneck diagnosis", "Personalized system recommendations", "30-day improvement plan"]
            : ["Analyse du flux de travail", "Diagnostic de productivité", "Recommandations personnalisées", "Plan d'amélioration de 30 jours"],
          learnMore: language === "en"
            ? "You are busy, but are you productive? The Personal Workflow Audit looks at how you actually spend your time, where tasks fall through the cracks, and what systems (or lack of systems) are holding you back.\n\nYou will walk away with a clear picture of your current workflow, practical recommendations tailored to your role, and a 30-day plan to start working more effectively. This is ideal as a standalone engagement or as a first step before coaching."
            : "Vous êtes occupé, mais êtes-vous productif ? L'audit examine comment vous passez votre temps et ce qui vous freine.",
          idealFor: language === "en" ? "Professionals, managers, and entrepreneurs who feel overwhelmed and want a clear system for managing their work." : "Professionnels et entrepreneurs qui se sentent débordés.",
          image: processAuditImg,
          pricingTiers: [
            {
              name: language === "en" ? "Quick Scan" : "Analyse rapide",
              price: "$250",
              subtitle: language === "en" ? "Focused review of your top productivity challenges with practical fixes." : "Revue ciblée de vos défis de productivité avec solutions pratiques.",
              features: language === "en"
                ? ["60-minute deep-dive session", "Time and task flow analysis", "Top 3 quick-win recommendations", "Summary action plan"]
                : ["Session approfondie de 60 minutes", "Analyse du flux de travail", "3 recommandations rapides", "Plan d'action de synthèse"],
              stripeProductName: "Workflow Audit - Quick Scan"
            },
            {
              name: "Standard",
              price: "$500",
              subtitle: language === "en" ? "Full workflow audit with personalized productivity system design." : "Audit complet avec conception de système de productivité personnalisé.",
              features: language === "en"
                ? ["Everything in Quick Scan", "Full workflow and habits audit", "Personalized productivity system", "Tool and app recommendations", "30-day implementation plan", "Follow-up check-in call"]
                : ["Tout dans Analyse rapide", "Audit complet", "Système personnalisé", "Recommandations d'outils", "Plan de 30 jours", "Appel de suivi"],
              stripeProductName: "Workflow Audit - Standard"
            },
            {
              name: language === "en" ? "Comprehensive" : "Complet",
              price: "$750",
              subtitle: language === "en" ? "Deep-dive audit with full system setup, accountability design, and ongoing support." : "Audit approfondi avec mise en place complète et support continu.",
              features: language === "en"
                ? ["Everything in Standard", "Complete system setup assistance", "Accountability structure design", "Calendar and priority management", "60-day follow-up with adjustments", "Email support for 30 days"]
                : ["Tout dans Standard", "Aide à la mise en place complète", "Conception de la responsabilité", "Gestion du calendrier", "Suivi de 60 jours", "Support e-mail de 30 jours"],
              stripeProductName: "Workflow Audit - Comprehensive"
            }
          ]
        },
        {
          title: language === "en" ? "Performance Workshop" : "Atelier de performance",
          investment: "$500 – $1,500",
          desc: language === "en"
            ? "Sometimes you need to step back and reset. This workshop helps you get clear on what matters, what's holding you back, and what to do next."
            : "Parfois, vous avez besoin de prendre du recul. Cet atelier vous aide à clarifier ce qui compte, ce qui vous retient et quoi faire ensuite.",
          benefits: language === "en"
            ? ["Goal clarity and prioritization", "Personal performance diagnosis", "Custom action plan", "Accountability framework setup"]
            : ["Clarté des objectifs", "Diagnostic de performance", "Plan d'action personnalisé", "Cadre de responsabilité"],
          learnMore: language === "en"
            ? "Sometimes you need a reset. The Performance Workshop is a focused session designed for professionals who want to step back, get clear on their priorities, and build a plan they can actually follow through on.\n\nThe half-day format covers goal setting, performance diagnosis, and action planning. The full-day format adds deeper work on habits, systems, and accountability structures for lasting change."
            : "Parfois vous avez besoin d'un recul. L'atelier de performance est une session ciblée pour les professionnels qui veulent clarifier leurs priorités.",
          idealFor: language === "en" ? "Professionals at a crossroads, preparing for a career transition, or wanting to build better personal performance habits." : "Professionnels en transition ou cherchant à améliorer leurs habitudes de performance.",
          image: workshopTrainingImg,
          pricingTiers: [
            {
              name: language === "en" ? "Half-Day" : "Demi-journée",
              price: "$500",
              subtitle: language === "en" ? "Focused 2-hour session on goals, priorities, and personal action planning." : "Session ciblée de 2 heures sur les objectifs et le plan d'action.",
              features: language === "en"
                ? ["2-hour facilitated session", "Goal clarity and prioritization", "Performance gap diagnosis", "Personal action plan", "Follow-up summary document"]
                : ["Session facilitée de 2 heures", "Clarté des objectifs", "Diagnostic des écarts", "Plan d'action personnel", "Document de synthèse"],
              stripeProductName: "Performance Workshop - Half-Day"
            },
            {
              name: language === "en" ? "Full-Day" : "Journée complète",
              price: "$1,500",
              subtitle: language === "en" ? "Comprehensive session with habit design, systems setup, and accountability framework." : "Session complète avec conception d'habitudes et cadre de responsabilité.",
              features: language === "en"
                ? ["Everything in Half-Day", "4-hour comprehensive session", "Habit and routine design", "Personal systems setup", "Accountability framework", "KPI and progress tracking setup", "30-day follow-up call"]
                : ["Tout dans Demi-journée", "Session complète de 4 heures", "Conception d'habitudes", "Mise en place de systèmes", "Cadre de responsabilité", "Configuration du suivi", "Appel de suivi de 30 jours"],
              stripeProductName: "Performance Workshop - Full-Day"
            }
          ]
        },
        {
          title: language === "en" ? "Personal Brand Website" : "Site Web de marque personnelle",
          investment: "$1,000 – $3,000",
          desc: language === "en"
            ? "Show the world who you are and what you bring. We build personal websites that position you as the expert you are and help opportunities find you."
            : "Montrez au monde qui vous êtes. Nous construisons des sites personnels qui vous positionnent en tant qu'expert et aident les opportunités à vous trouver.",
          benefits: language === "en"
            ? ["Professional personal website", "Portfolio or services showcase", "Mobile-friendly design", "Contact and booking integration"]
            : ["Site personnel professionnel", "Portfolio ou vitrine", "Design mobile", "Intégration de contact et réservation"],
          learnMore: language === "en"
            ? "Whether you are a consultant, coach, freelancer, or professional building a personal brand, your website is your digital business card. We build clean, professional personal websites that position you as an expert and make it easy for opportunities to find you.\n\nEvery package includes mobile-responsive design, a portfolio or services section, and contact integration so people can reach you easily."
            : "Que vous soyez consultant, coach ou professionnel, votre site Web est votre carte de visite numérique. Nous construisons des sites personnels professionnels.",
          idealFor: language === "en" ? "Consultants, coaches, freelancers, and professionals who want a personal website that builds their brand and attracts clients." : "Consultants, coaches et professionnels indépendants.",
          image: personalBrandImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essential" : "Essentiel",
              price: "$1,000",
              subtitle: language === "en" ? "Clean single-page personal website with bio, services, and contact form." : "Site personnel à page unique avec bio et formulaire de contact.",
              features: language === "en"
                ? ["Single-page personal website", "Professional bio section", "Services or expertise showcase", "Contact form", "Mobile responsive", "Basic SEO"]
                : ["Site à page unique", "Section bio professionnelle", "Vitrine expertise", "Formulaire de contact", "Responsive mobile", "SEO de base"],
              stripeProductName: "Personal Website - Essential"
            },
            {
              name: "Standard",
              price: "$2,000",
              subtitle: language === "en" ? "Multi-page website with portfolio, testimonials, and booking integration." : "Site multi-pages avec portfolio et intégration de réservation.",
              features: language === "en"
                ? ["Everything in Essential", "Up to 4 pages", "Portfolio or case studies section", "Testimonials section", "Booking calendar integration", "Social media links", "1 round of revisions"]
                : ["Tout dans Essentiel", "Jusqu'à 4 pages", "Portfolio ou études de cas", "Témoignages", "Intégration calendrier", "Réseaux sociaux", "1 révision"],
              stripeProductName: "Personal Website - Standard"
            },
            {
              name: "Premium",
              price: "$3,000",
              subtitle: language === "en" ? "Full personal brand website with blog, newsletter, and content strategy." : "Site complet avec blog, newsletter et stratégie de contenu.",
              features: language === "en"
                ? ["Everything in Standard", "Blog or articles section", "Email newsletter setup", "Content strategy guidance", "Personal brand identity basics", "SEO optimization", "2 rounds of revisions", "60-day post-launch support"]
                : ["Tout dans Standard", "Section blog", "Newsletter par e-mail", "Stratégie de contenu", "Identité de marque", "Optimisation SEO", "2 révisions", "Support de 60 jours"],
              stripeProductName: "Personal Website - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "Leadership & People Management Coaching" : "Coaching en leadership et gestion des personnes",
          investment: "$200 – $750/mo",
          desc: language === "en"
            ? "Becoming a manager is one of the biggest career leaps, and most people get zero training for it. We help you lead with confidence, give feedback that lands, and build a team that trusts you."
            : "Devenir gestionnaire est l'un des plus grands sauts de carrière, et la plupart des gens n'ont aucune formation. Nous vous aidons à diriger avec confiance.",
          benefits: language === "en"
            ? ["Management confidence building", "Effective feedback techniques", "Hiring & interview skills", "Difficult conversation frameworks"]
            : ["Développement de la confiance en gestion", "Techniques de rétroaction efficace", "Compétences en embauche", "Cadres de conversations difficiles"],
          learnMore: language === "en"
            ? "Becoming a manager is one of the biggest career transitions, and most people get no training for it. Our Leadership & People Management Coaching helps you build the skills to hire effectively, manage your team with confidence, deliver constructive feedback, and navigate the tough conversations that come with leadership.\n\nWhether you are a first-time manager, a founder building your first team, or a professional preparing for a leadership role, this coaching gives you the practical tools and frameworks you need."
            : "Devenir gestionnaire est l'une des plus grandes transitions de carrière. Notre coaching vous aide à bâtir les compétences pour recruter, gérer votre équipe et donner de la rétroaction constructive.",
          idealFor: language === "en" ? "First-time managers, team leads, founders hiring their first employees, or professionals preparing for management roles." : "Nouveaux gestionnaires, fondateurs recrutant pour la première fois.",
          image: talentDevelopmentImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$200/mo",
              subtitle: language === "en" ? "Monthly coaching on core management skills and team leadership." : "Coaching mensuel sur les compétences de gestion de base.",
              features: language === "en"
                ? ["Monthly coaching session", "Management fundamentals framework", "Feedback delivery techniques", "Team communication strategies", "Email support between sessions"]
                : ["Session de coaching mensuelle", "Cadre de gestion fondamentale", "Techniques de rétroaction", "Stratégies de communication", "Support par e-mail"],
              isMonthly: true,
              stripeProductName: "Leadership Coaching - Essentials"
            },
            {
              name: "Standard",
              price: "$450/mo",
              subtitle: language === "en" ? "Bi-weekly coaching with hiring skills, difficult conversations, and team building." : "Coaching bimensuel avec compétences d'embauche et gestion des conversations difficiles.",
              features: language === "en"
                ? ["Everything in Essentials", "Bi-weekly coaching sessions", "Hiring and interview coaching", "Difficult conversation frameworks", "Team motivation strategies", "1-on-1 meeting templates", "Priority messaging support"]
                : ["Tout dans Essentiel", "Sessions bimensuelles", "Coaching d'embauche", "Gestion des conversations difficiles", "Stratégies de motivation", "Modèles de 1-à-1", "Support prioritaire"],
              isMonthly: true,
              stripeProductName: "Leadership Coaching - Standard"
            },
            {
              name: "Premium",
              price: "$750/mo",
              subtitle: language === "en" ? "Weekly coaching with comprehensive leadership development and performance management mastery." : "Coaching hebdomadaire avec développement du leadership et maîtrise de la gestion de la performance.",
              features: language === "en"
                ? ["Everything in Standard", "Weekly coaching sessions", "Performance management coaching", "Delegation and empowerment skills", "Conflict resolution techniques", "Career development planning", "On-demand messaging support", "Quarterly leadership assessment"]
                : ["Tout dans Standard", "Sessions hebdomadaires", "Coaching en gestion de la performance", "Compétences en délégation", "Techniques de résolution de conflits", "Planification de carrière", "Support à la demande", "Évaluation trimestrielle"],
              isMonthly: true,
              stripeProductName: "Leadership Coaching - Premium"
            }
          ]
        }
      ]
    },
    "self-serve": {
      label: language === "en" ? "Self-Serve" : "Libre-service",
      tagline: language === "en" ? "Practical tools and programs you can start using today, because growth shouldn't wait" : "Des outils et programmes pratiques que vous pouvez utiliser dès aujourd'hui, parce que la croissance n'attend pas",
      icon: <Package className="text-accent" size={24} />,
      services: [
        {
          title: language === "en" ? "Performance Planner" : "Planificateur de performance",
          investment: "$49 – $99",
          desc: language === "en"
            ? "Your personal roadmap to staying focused, organized, and on track, with planning frameworks and tracking tools that actually fit your life."
            : "Votre feuille de route personnelle pour rester concentré, organisé et sur la bonne voie, avec des outils qui s'adaptent à votre vie.",
          benefits: language === "en"
            ? ["Yearly planning framework", "Weekly review templates", "Built-in KPI tracker", "Goal setting worksheet"]
            : ["Cadre de planification annuelle", "Modèles de revue", "Suivi de KPI intégré", "Feuille d'objectifs"],
          learnMore: language === "en"
            ? "The Performance Planner is your personal roadmap to consistent results. It includes a yearly planning framework, weekly review templates, and a built-in KPI tracker that helps you stay focused on what matters most.\n\nDesigned for individuals and small teams who want structure without the cost of a consultant."
            : "Le planificateur de performance est votre feuille de route personnelle vers des résultats cohérents.",
          idealFor: language === "en" ? "Individuals and small teams who want a structured planning system they can use independently." : "Individus et petites équipes.",
          image: performanceMgmtImg,
          pricingTiers: [
            {
              name: language === "en" ? "Digital" : "Numérique",
              price: "$49",
              subtitle: language === "en" ? "Digital download with templates and guides." : "Téléchargement numérique avec modèles et guides.",
              features: language === "en"
                ? ["Yearly planning framework", "Weekly review template", "Monthly reflection guide", "KPI tracker spreadsheet", "Goal setting worksheet"]
                : ["Cadre de planification annuelle", "Modèle de revue hebdomadaire", "Guide de réflexion mensuelle", "Feuille de suivi KPI", "Feuille de définition d'objectifs"],
              stripeProductName: "Performance Planner - Digital"
            },
            {
              name: "Premium",
              price: "$99",
              subtitle: language === "en" ? "Everything in Digital plus video walkthroughs and bonus resources." : "Tout dans Numérique plus vidéos explicatives et ressources bonus.",
              features: language === "en"
                ? ["Everything in Digital", "Video walkthrough guides", "Quarterly planning template", "Team accountability framework", "Priority email support (30 days)", "Bonus: habit tracker template"]
                : ["Tout dans Numérique", "Guides vidéo", "Modèle de planification trimestrielle", "Cadre de responsabilité d'équipe", "Support e-mail prioritaire (30 jours)", "Bonus: modèle de suivi d'habitudes"],
              stripeProductName: "Performance Planner - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "90-Day Performance Program" : "Programme de performance de 90 jours",
          investment: "$297 – $997",
          desc: language === "en"
            ? "Ready for real change? This 90-day program gives you the framework, the plan, and the accountability to go from scattered to structured, at your own pace."
            : "Prêt pour un vrai changement ? Ce programme de 90 jours vous donne le cadre, le plan et la responsabilité pour passer du chaos à la structure, à votre rythme.",
          benefits: language === "en"
            ? ["Proven strategy framework", "12-week execution plan", "Built-in accountability system", "Progress tracking tools"]
            : ["Cadre stratégique éprouvé", "Plan d'exécution de 12 semaines", "Système de responsabilité", "Outils de suivi"],
          learnMore: language === "en"
            ? "The 90-Day Performance Program is a self-guided transformation system designed to help you go from scattered to structured in just three months.\n\nYou'll get a proven strategy framework, a week-by-week execution plan, and a built-in accountability system that keeps you moving forward."
            : "Le programme de performance de 90 jours est un système de transformation auto-guidé.",
          idealFor: language === "en" ? "Professionals and entrepreneurs who want a structured transformation program they can follow at their own pace." : "Professionnels et entrepreneurs.",
          image: consultingAdvisoryImg,
          pricingTiers: [
            {
              name: language === "en" ? "Self-Guided" : "Auto-guidé",
              price: "$297",
              subtitle: language === "en" ? "Complete program with templates, guides, and weekly action plans." : "Programme complet avec modèles et guides.",
              features: language === "en"
                ? ["Strategy framework workbook", "12-week execution plan", "Weekly action templates", "Progress tracking system", "Accountability checklist", "Completion certificate"]
                : ["Cahier de stratégie", "Plan d'exécution de 12 semaines", "Modèles d'action hebdomadaires", "Système de suivi des progrès", "Liste de responsabilité", "Certificat de complétion"],
              stripeProductName: "90-Day Program - Self-Guided"
            },
            {
              name: language === "en" ? "Guided" : "Guidé",
              price: "$997",
              subtitle: language === "en" ? "Full program with live group calls, coaching support, and peer accountability." : "Programme complet avec appels de groupe en direct.",
              features: language === "en"
                ? ["Everything in Self-Guided", "3 live group coaching calls", "Private community access", "Peer accountability partner matching", "Direct coach Q&A support", "Bonus: personal KPI setup session"]
                : ["Tout dans Auto-guidé", "3 appels de coaching de groupe", "Accès communauté privée", "Jumelage de partenaires de responsabilité", "Support Q&R du coach", "Bonus: session de configuration KPI"],
              stripeProductName: "90-Day Program - Guided"
            }
          ]
        },
        {
          title: language === "en" ? "Performance Systems Toolkit" : "Boîte à outils de systèmes de performance",
          investment: "$49 – $199",
          desc: language === "en"
            ? "Don't start from scratch. Grab the same planning, tracking, and accountability tools we use with our consulting clients, ready to use right now."
            : "Ne partez pas de zéro. Utilisez les mêmes outils de planification et de suivi que nous utilisons avec nos clients, prêts à l'emploi dès maintenant.",
          benefits: language === "en"
            ? ["KPI tracking templates", "Weekly planning sheets", "Team accountability frameworks", "Strategy execution tools"]
            : ["Modèles de suivi KPI", "Feuilles de planification", "Cadres de responsabilité", "Outils d'exécution"],
          learnMore: language === "en"
            ? "Don't start from scratch. Our Performance Systems Toolkit gives you everything you need to build high-performing habits, manage your team, and execute your strategy.\n\nIncludes templates for KPI tracking, weekly planning, team accountability, strategy execution, meeting agendas, and more."
            : "Ne partez pas de zéro. Notre boîte à outils vous donne tout ce dont vous avez besoin.",
          idealFor: language === "en" ? "Managers, team leads, and business owners who want practical tools without consulting engagement." : "Gestionnaires et chefs d'équipe.",
          image: orgAssessmentImg,
          pricingTiers: [
            {
              name: language === "en" ? "Starter Kit" : "Kit de démarrage",
              price: "$49",
              subtitle: language === "en" ? "Essential templates for individual performance management." : "Modèles essentiels pour la gestion individuelle.",
              features: language === "en"
                ? ["KPI tracking template", "Weekly planning sheet", "Goal setting framework", "Meeting agenda template", "Progress review guide"]
                : ["Modèle de suivi KPI", "Feuille de planification", "Cadre d'objectifs", "Modèle d'ordre du jour", "Guide de revue"],
              stripeProductName: "Systems Toolkit - Starter"
            },
            {
              name: language === "en" ? "Team Edition" : "Édition équipe",
              price: "$129",
              subtitle: language === "en" ? "Full team toolkit with accountability systems and performance frameworks." : "Boîte à outils d'équipe complète.",
              features: language === "en"
                ? ["Everything in Starter Kit", "Team accountability framework", "Performance review templates", "Strategy execution tracker", "Role clarity worksheet", "Team alignment guide"]
                : ["Tout dans Kit de démarrage", "Cadre de responsabilité d'équipe", "Modèles de revue de performance", "Suivi d'exécution stratégique", "Feuille de clarté des rôles", "Guide d'alignement d'équipe"],
              stripeProductName: "Systems Toolkit - Team"
            },
            {
              name: language === "en" ? "Business Edition" : "Édition entreprise",
              price: "$199",
              subtitle: language === "en" ? "Complete business toolkit with governance, SOPs, and organizational frameworks." : "Boîte à outils complète avec gouvernance et procédures.",
              features: language === "en"
                ? ["Everything in Team Edition", "SOP templates", "Governance framework guide", "Balanced scorecard template", "Change management checklist", "Board reporting template", "Onboarding framework"]
                : ["Tout dans Édition équipe", "Modèles de procédures", "Guide de gouvernance", "Modèle de tableau de bord prospectif", "Liste de gestion du changement", "Modèle de rapport au conseil", "Cadre d'intégration"],
              stripeProductName: "Systems Toolkit - Business"
            }
          ]
        }
      ]
    }
  };

  const tabs: { key: typeof activeTab; label: string; sublabel: string; icon: React.ReactNode; priceRange: string }[] = [
    { key: "enterprise", label: serviceTiers.enterprise.label, sublabel: language === "en" ? "Business Solutions" : "Solutions d'affaires", icon: <Briefcase size={18} />, priceRange: "$750+" },
    { key: "business", label: serviceTiers.business.label, sublabel: language === "en" ? "Growth & Advisory" : "Croissance et conseil", icon: <Rocket size={18} />, priceRange: "$500/mo+" },
    { key: "professional", label: serviceTiers.professional.label, sublabel: language === "en" ? "Coaching & Development" : "Coaching et développement", icon: <UserCheck size={18} />, priceRange: "$100/mo+" },
    { key: "self-serve", label: serviceTiers["self-serve"].label, sublabel: language === "en" ? "Tools & Programs" : "Outils et programmes", icon: <Package size={18} />, priceRange: "$49+" },
  ];

  const currentTier = serviceTiers[activeTab];

  const resultStats = [
    { value: language === "en" ? "Enterprise" : "Entreprise", label: language === "en" ? "Business Solutions" : "Solutions d'affaires", icon: <Briefcase size={20} className="text-accent" /> },
    { value: language === "en" ? "Small Business" : "PME", label: language === "en" ? "Growth & Advisory" : "Croissance et conseil", icon: <Rocket size={20} className="text-accent" /> },
    { value: language === "en" ? "Professional" : "Professionnel", label: language === "en" ? "Coaching & Development" : "Coaching et développement", icon: <UserCheck size={20} className="text-accent" /> },
    { value: language === "en" ? "Self-Serve" : "Libre-service", label: language === "en" ? "Tools & Programs" : "Outils et programmes", icon: <Package size={20} className="text-accent" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <SEOHead title="Management Consulting, Strategy, Operations, People & Performance" description="Expert management consulting services for enterprises, small businesses, and professionals. From strategic planning and systems implementation to leadership development and operational excellence." path="/consulting" />
      <Navbar />
      <main className="flex-grow">

        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img src={leadershipPresentationImg} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/5 h-full hidden lg:block z-[1]">
            <img src={teamStrategyImg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-accent mb-6" data-testid="consulting-text-hero-label">
                {language === "en" ? "Management Consulting" : "Conseil en gestion"}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08]" data-testid="consulting-text-hero-title">
                {language === "en" ? (
                  <>Strategy, operations, people & <span className="text-accent">performance</span></>
                ) : (
                  <>Stratégie, opérations, personnes et <span className="text-accent">performance</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl" data-testid="consulting-text-hero-subtitle">
                {language === "en"
                  ? "From enterprise strategy and systems implementation to small business growth and professional coaching, we help you build the infrastructure for lasting success."
                  : "De la stratégie d'entreprise et la mise en œuvre de systèmes à la croissance des PME et au coaching professionnel, nous vous aidons à bâtir l'infrastructure pour un succès durable."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="consulting-button-hero-book">
                    <Calendar size={18} className="mr-2" />
                    {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto"
                  onClick={() => document.getElementById('consulting-services-section')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="consulting-button-hero-explore"
                >
                  {language === "en" ? "Explore Services" : "Explorer les services"}
                  <ArrowDown size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-b" data-testid="consulting-section-results">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {resultStats.map((stat, i) => (
                <div key={i} className="text-center" data-testid={`consulting-stat-result-${i}`}>
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-extrabold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-white" data-testid="consulting-section-methodology">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                {language === "en" ? "A Partnership, Not a Process" : "Un partenariat, pas un processus"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg mb-4">
                {language === "en"
                  ? "Every engagement starts with listening and ends with lasting change. We don't just hand you a plan, we walk with you through every step."
                  : "Chaque engagement commence par l'écoute et se termine par un changement durable. Nous ne vous remettons pas simplement un plan, nous vous accompagnons à chaque étape."}
              </p>
            </div>

            <div className="max-w-6xl mx-auto mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {methodSteps.map((step, i) => (
                  <div key={i} className="relative" data-testid={`consulting-method-step-${i}`}>
                    <div className={`bg-gradient-to-br ${step.color} rounded-3xl p-8 h-full border border-border/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 group`}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                          {step.icon}
                        </div>
                        <span className="text-3xl font-extrabold text-accent/30">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-primary mb-3">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{step.desc}</p>
                      <ul className="space-y-2">
                        {step.outcomes.map((outcome, oi) => (
                          <li key={oi} className="flex items-center gap-2 text-sm text-primary/80">
                            <CheckCircle2 size={14} className="text-accent shrink-0" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {i < methodSteps.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                        <ArrowRight className="text-accent/40" size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-16">
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-primary text-white hover:bg-accent h-14 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" data-testid="consulting-button-methodology-cta">
                  <Phone size={16} className="mr-2" />
                  {language === "en" ? "Let's Talk About Your Journey" : "Parlons de votre parcours"}
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="consulting-services-section" className="py-28 bg-gradient-to-b from-[#F8FAFC] to-white" data-testid="consulting-section-services">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                {language === "en" ? "Consulting services built around where you are right now" : "Des services de conseil adaptés à là où vous en êtes maintenant"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
                {language === "en"
                  ? "No two journeys are the same. Whether you need enterprise strategy, hands-on small business support, personal coaching, or ready-to-use tools, there's a place for you here."
                  : "Chaque parcours est unique. Que vous ayez besoin de stratégie d'entreprise, de soutien pratique, de coaching personnel ou d'outils prêts à l'emploi, il y a une place pour vous ici."}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                      : "bg-white text-primary border border-border hover:border-accent/40 hover:shadow-md"
                  }`}
                  data-testid={`consulting-tab-${tab.key}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span className="hidden sm:inline text-xs opacity-70">— {tab.sublabel}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-accent/10 text-accent"}`}>{tab.priceRange}</span>
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl border border-border/50 p-8 md:p-10 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  {currentTier.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">{currentTier.label}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{currentTier.tagline}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTier.services.map((s: ServiceEntry, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-border/60 hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-500 group cursor-pointer flex flex-col overflow-hidden"
                  onClick={() => setSelectedService(s)}
                  data-testid={`consulting-card-service-${activeTab}-${i}`}
                >
                  <div className="p-8 pb-0 flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm shrink-0">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="inline-flex items-center bg-accent/5 border border-accent/10 rounded-full px-4 py-1.5 text-accent font-bold text-sm">
                        {s.investment}
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-primary group-hover:text-accent transition-colors leading-tight mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-6 line-clamp-2">{s.desc}</p>
                    {s.benefits && (
                      <ul className="space-y-2.5 mb-6">
                        {s.benefits.slice(0, 4).map((b: string, bi: number) => (
                          <li key={bi} className="flex items-start gap-2.5 text-sm text-primary/80">
                            <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="p-8 pt-4 mt-auto">
                    <div className="flex items-center text-sm font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-all duration-300">
                      {language === "en" ? "View pricing & details" : "Voir les prix et détails"} <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden" data-testid="consulting-section-mid-cta">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.08)_0%,transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6 leading-tight">
                {language === "en" ? "Need enterprise strategy, small business support, or professional coaching?" : "Besoin de stratégie d'entreprise, de soutien aux PME ou de coaching professionnel ?"}
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                {language === "en"
                  ? "Book a free discovery call to discuss your challenges and find the right consulting service for your situation."
                  : "Réservez un appel découverte gratuit pour discuter de vos défis et trouver le bon service de conseil pour votre situation."}
              </p>
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-12 text-base font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="consulting-button-mid-cta">
                  <Calendar size={18} className="mr-2" />
                  {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-28 bg-white" data-testid="consulting-section-collective">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                {language === "en" ? "Join the Collective" : "Rejoignez le Collectif"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
                {language === "en"
                  ? "Get group coaching, accountability partners, templates, and training, at a fraction of the cost of private consulting."
                  : "Bénéficiez de coaching de groupe, de partenaires de responsabilité, de modèles et de formation, pour une fraction du coût du conseil privé."}
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary via-primary/95 to-primary/85 rounded-3xl overflow-hidden shadow-xl shadow-primary/10">
                <div className="p-10 md:p-14">
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                          <Users className="text-accent" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{language === "en" ? "Performance Processes Collective" : "Collectif Performance Processes"}</h3>
                      </div>
                      <div className="text-accent font-black text-4xl mb-2">$49 – $99<span className="text-lg font-normal text-white/60">/mo</span></div>
                      <p className="text-white/60 text-sm mb-8">{language === "en" ? "Cancel anytime. No long-term commitment required." : "Annulez à tout moment."}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {(language === "en"
                          ? ["Monthly group strategy call", "Accountability partner matching", "Templates and tools library", "Training sessions & workshops", "Private community access", "Member-only resources"]
                          : ["Appel stratégique de groupe mensuel", "Jumelage de partenaires", "Bibliothèque de modèles et outils", "Sessions de formation et ateliers", "Accès communauté privée", "Ressources réservées aux membres"]
                        ).map((item, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm text-white/90">
                            <CheckCircle2 size={15} className="text-accent shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-12 px-8 font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:scale-105"
                        data-testid="consulting-button-join-collective"
                        onClick={() => setCollectiveOpen(true)}
                      >
                        {language === "en" ? "Join the Collective" : "Rejoindre le collectif"}
                      </Button>
                    </div>
                    <div className="md:w-64 flex flex-col gap-4">
                      <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <div className="font-bold text-accent mb-2 text-sm">{language === "en" ? "Perfect for" : "Parfait pour"}</div>
                        <ul className="space-y-1.5 text-white/80 text-xs">
                          {(language === "en"
                            ? ["Entrepreneurs", "Consultants", "Freelancers", "Managers", "Small business owners"]
                            : ["Entrepreneurs", "Consultants", "Freelancers", "Gestionnaires", "Propriétaires de PME"]
                          ).map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <div className="font-bold text-accent mb-2 text-sm">{language === "en" ? "What you get" : "Ce que vous obtenez"}</div>
                        <p className="text-white/70 text-xs leading-relaxed">
                          {language === "en"
                            ? "Structure, accountability, and community, everything you need to stay consistent and grow."
                            : "Structure, responsabilité et communauté, tout ce dont vous avez besoin pour rester cohérent et grandir."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#F8FAFC]" data-testid="consulting-section-womens-grant">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-accent/5 via-white to-accent/10 rounded-3xl border-2 border-accent/20 overflow-hidden shadow-lg">
                <div className="p-10 md:p-14">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Heart className="text-accent" size={26} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary">
                        {language === "en" ? "Women's Performance Grant" : "Bourse de performance pour les femmes"}
                      </h2>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                    {language === "en"
                      ? "We're offering 3 women-owned businesses a fully funded 3-month consulting engagement. If you're a woman founder building something meaningful, we want to support your growth."
                      : "Nous offrons à 3 entreprises dirigées par des femmes un engagement de conseil de 3 mois entièrement financé."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {(language === "en"
                      ? [{ label: "Recipients", value: "3 businesses" }, { label: "Program length", value: "3 months" }, { label: "Deadline", value: "March 31" }]
                      : [{ label: "Récipiendaires", value: "3 entreprises" }, { label: "Durée du programme", value: "3 mois" }, { label: "Date limite", value: "31 mars" }]
                    ).map((item, i) => (
                      <div key={i} className="bg-white rounded-2xl p-4 text-center border border-accent/10">
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                        <div className="text-lg font-extrabold text-primary">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <Link href="/womens-performance-grant">
                    <Button className="rounded-full bg-accent text-white hover:bg-primary h-12 px-8 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105" data-testid="consulting-button-grant-apply">
                      {language === "en" ? "Learn More & Apply" : "En savoir plus et postuler"} <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Dialog open={collectiveOpen} onOpenChange={setCollectiveOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">{language === "en" ? "Join the Collective" : "Rejoindre le collectif"}</DialogTitle>
              <DialogDescription>{language === "en" ? "Choose your membership level" : "Choisissez votre niveau d'adhésion"}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
              {[
                {
                  name: language === "en" ? "Essential" : "Essentiel",
                  price: "$49/mo",
                  features: language === "en"
                    ? ["Monthly group call", "Community access", "Template library", "Accountability partner"]
                    : ["Appel de groupe mensuel", "Accès communauté", "Bibliothèque de modèles", "Partenaire de responsabilité"],
                  stripeProductName: "Collective - Essential"
                },
                {
                  name: "Premium",
                  price: "$99/mo",
                  features: language === "en"
                    ? ["Everything in Essential", "Bi-weekly group calls", "Workshop access", "Priority support", "1-on-1 monthly check-in"]
                    : ["Tout dans Essentiel", "Appels bimensuels", "Accès aux ateliers", "Support prioritaire", "Check-in mensuel individuel"],
                  stripeProductName: "Collective - Premium"
                }
              ].map((tier, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border-2 ${idx === 1 ? "border-accent bg-accent/5" : "border-border"}`}>
                  <h4 className="text-lg font-bold text-primary mb-2">{tier.name}</h4>
                  <div className="text-3xl font-extrabold text-accent mb-4">{tier.price}</div>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-accent shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-full h-10 font-bold text-xs uppercase tracking-widest ${idx === 1 ? 'bg-accent text-white hover:bg-primary' : 'bg-primary text-white hover:bg-accent'}`}
                    onClick={() => handlePay(tier.stripeProductName)}
                    disabled={checkoutMutation.isPending && payingProduct === tier.stripeProductName}
                    data-testid={`consulting-button-collective-${idx}`}
                  >
                    {checkoutMutation.isPending && payingProduct === tier.stripeProductName ? (
                      <><Loader2 size={14} className="animate-spin mr-2" /> {language === "en" ? "Processing..." : "Traitement..."}</>
                    ) : (
                      <><CreditCard size={14} className="mr-2" /> {language === "en" ? "Subscribe" : "S'abonner"}</>
                    )}
                  </Button>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[10px] text-muted-foreground">Accepts</span>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-semibold text-gray-600"><CreditCard size={10} />Card</span>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#FFC43926] text-[9px] font-semibold text-[#003087]">PayPal</span>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-900 text-[9px] font-semibold text-white"> Pay</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedService && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                      {selectedService.icon}
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-heading font-extrabold text-primary">{selectedService.title}</DialogTitle>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-accent font-bold text-lg">{selectedService.investment}</span>
                        {selectedService.investmentNote && (
                          <span className="text-xs text-muted-foreground">{selectedService.investmentNote}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <DialogDescription className="text-base leading-relaxed whitespace-pre-line mt-4">
                    {selectedService.learnMore}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-8 space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-6">
                      {language === "en" ? "Pricing Options" : "Options de prix"}
                    </h4>
                    <div className={`grid gap-6 ${selectedService.pricingTiers.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
                      {selectedService.pricingTiers.map((tier: PricingTier, idx: number) => (
                        <div key={idx} className={`relative p-7 rounded-2xl border-2 flex flex-col ${idx === 1 ? "border-accent bg-accent/5 shadow-lg" : "border-border bg-white"}`}>
                          <div className="flex items-center gap-2 mb-3">
                            {idx === 1 && (
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-white px-3 py-1 rounded-full">
                                {language === "en" ? "Most Popular" : "Le plus populaire"}
                              </span>
                            )}
                            {tier.isMonthly && (
                              <span className="text-[10px] font-black uppercase tracking-[0.15em] bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                                <RefreshCw size={10} /> {language === "en" ? "Monthly" : "Mensuel"}
                              </span>
                            )}
                          </div>
                          <h5 className="text-lg font-extrabold text-primary mb-2">{tier.name}</h5>
                          <div className="text-accent font-black text-2xl mb-3">{tier.price}</div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-5">{tier.subtitle}</p>
                          <ul className="space-y-2 mb-6">
                            {tier.features.map((f: string, fi: number) => (
                              <li key={fi} className="flex items-start gap-2 text-sm text-primary">
                                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className={`mt-auto w-full rounded-full h-10 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${idx === 1 ? 'bg-accent text-white hover:bg-primary' : 'bg-primary text-white hover:bg-accent'}`}
                            onClick={() => handlePay(tier.stripeProductName)}
                            disabled={checkoutMutation.isPending && payingProduct === tier.stripeProductName}
                            data-testid={`consulting-button-pay-tier-${idx}`}
                          >
                            {checkoutMutation.isPending && payingProduct === tier.stripeProductName ? (
                              <><Loader2 size={14} className="animate-spin" /> {language === "en" ? "Processing..." : "Traitement..."}</>
                            ) : (
                              <><CreditCard size={14} /> {tier.isMonthly
                                ? (language === "en" ? "Subscribe" : "S'abonner")
                                : (language === "en" ? "Select & Pay" : "Sélectionner et payer")
                              }</>
                            )}
                          </Button>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-semibold text-gray-600"><CreditCard size={10} />Card</span>
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#FFC43926] text-[9px] font-semibold text-[#003087]">PayPal</span>
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-900 text-[9px] font-semibold text-white"> Pay</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 bg-gradient-to-r from-primary to-primary/90 rounded-3xl text-white">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-accent">
                      {language === "en" ? "Ideal For" : "Idéal pour"}
                    </h4>
                    <p className="font-bold italic text-lg leading-relaxed">{selectedService.idealFor}</p>
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button
                      className="rounded-full bg-accent text-white hover:bg-primary h-14 px-12 font-bold uppercase tracking-widest text-sm shadow-xl shadow-accent/20 transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        window.location.href = `mailto:contact@performanceprocesses.com?subject=Inquiry: ${selectedService.title}`;
                        setSelectedService(null);
                      }}
                      data-testid="consulting-button-inquire"
                    >
                      {language === "en" ? "Need help choosing? Contact us" : "Besoin d'aide pour choisir ? Contactez-nous"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-32 text-white relative overflow-hidden" data-testid="consulting-section-final-cta">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 leading-tight">
                {language === "en" ? "Not sure where to start?" : "Vous ne savez pas par où commencer ?"}
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
                {language === "en"
                  ? "Whether you're an enterprise, a growing business, or a professional looking to level up, we'll help you find the right consulting solution."
                  : "Que vous soyez une entreprise, une PME en croissance ou un professionnel cherchant à évoluer, nous vous aiderons à trouver la bonne solution de conseil."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-14 text-lg font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-2xl hover:scale-105 w-full sm:w-auto" data-testid="consulting-button-book-consultation-cta">
                    <Calendar size={20} className="mr-2" />
                    {language === "en" ? "Book a Free Consultation" : "Réservez une consultation gratuite"}
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-16 px-12 text-lg font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="consulting-button-contact-cta">
                    {language === "en" ? "Contact Us" : "Contactez-nous"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}