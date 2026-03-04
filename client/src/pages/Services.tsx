import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, Settings, BarChart3, Globe, CreditCard, Loader2, RefreshCw, ClipboardList, Search, Briefcase, Wrench, Rocket, BookOpen, UserCheck, Lightbulb, Calendar, Shield, Star, Zap, Package, GraduationCap, Heart, Sparkles, Award } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/layout/PageHero";

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [payingProduct, setPayingProduct] = useState<string | null>(null);
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
      window.history.replaceState({}, "", "/services");
    } else if (payment === "cancelled") {
      toast({
        title: language === "en" ? "Payment cancelled" : "Paiement annulé",
        description: language === "en" ? "Your payment was not completed." : "Votre paiement n'a pas été complété.",
        variant: "destructive",
      });
      window.history.replaceState({}, "", "/services");
    }
  }, []);

  const { data: productsData } = useQuery({
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
    const product = productsData.data.find((p: any) => p.product_name === productName);
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
      title: language === "en" ? "Define the Goal" : "Définir l'objectif",
      desc: language === "en" ? "Get crystal clear on what success looks like for you, your team, or your business." : "Soyez parfaitement clair sur ce à quoi ressemble le succès pour vous, votre équipe ou votre entreprise.",
      icon: <Target className="text-accent" size={28} />,
    },
    {
      step: "02",
      title: language === "en" ? "Build the System" : "Construire le système",
      desc: language === "en" ? "Create practical structures, processes, and habits that support consistent execution." : "Créer des structures, processus et habitudes pratiques qui soutiennent une exécution cohérente.",
      icon: <Settings className="text-accent" size={28} />,
    },
    {
      step: "03",
      title: language === "en" ? "Track Performance" : "Suivre la performance",
      desc: language === "en" ? "Monitor progress with clear KPIs, dashboards, and regular check-ins." : "Suivre les progrès avec des KPI clairs, des tableaux de bord et des points de contrôle réguliers.",
      icon: <BarChart3 className="text-accent" size={28} />,
    },
    {
      step: "04",
      title: language === "en" ? "Improve Continuously" : "Améliorer en continu",
      desc: language === "en" ? "Adapt, refine, and grow — because performance is a journey, not a destination." : "S'adapter, affiner et grandir — car la performance est un voyage, pas une destination.",
      icon: <TrendingUp className="text-accent" size={28} />,
    },
  ];

  const serviceTiers = {
    enterprise: {
      label: language === "en" ? "Enterprise" : "Entreprise",
      tagline: language === "en" ? "For companies, leadership teams & scaling organizations" : "Pour les entreprises, les équipes de direction et les organisations en croissance",
      icon: <Briefcase className="text-accent" size={24} />,
      services: [
        {
          title: language === "en" ? "Discovery & Assessment" : "Découverte et évaluation",
          investment: "$750 – $1,500",
          investmentNote: language === "en" ? "(Mandatory first step, fee can be credited toward full engagement)" : "(Première étape obligatoire, les frais peuvent être crédités vers un engagement complet)",
          desc: language === "en"
            ? "Every successful engagement begins with clarity. Our Discovery Phase ensures we understand your organization before proposing solutions."
            : "Chaque engagement réussi commence par la clarté. Notre phase de découverte garantit que nous comprenons votre organisation avant de proposer des solutions.",
          learnMore: language === "en"
            ? "Before recommending any strategy or system, we invest time in understanding your organization's current state, challenges, and goals. The Discovery Phase is a structured intake process designed to align expectations, define scope, and build a clear roadmap.\n\nDiscovery fees can be credited toward your full engagement, so you never pay twice for this essential first step."
            : "Avant de recommander toute stratégie ou système, nous investissons du temps pour comprendre l'état actuel, les défis et les objectifs de votre organisation. La phase de découverte est un processus d'accueil structuré conçu pour aligner les attentes, définir la portée et construire une feuille de route claire.",
          idealFor: language === "en" ? "Any organization beginning a new consulting engagement or exploring how we can help." : "Toute organisation commençant un nouvel engagement de conseil ou explorant comment nous pouvons aider.",
          icon: <Search className="text-accent" />,
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
            ? "Outcome-focused engagements that align your strategy, leadership, and performance systems for measurable results."
            : "Des engagements axés sur les résultats qui alignent votre stratégie, votre leadership et vos systèmes de performance.",
          learnMore: language === "en"
            ? "Rather than selling hours, we sell outcomes. Our Strategic Engagement model is designed for organizations that need focused, time-bound support to address critical strategic challenges.\n\nThis model covers strategic planning, performance framework design, organizational alignment, and leadership development, all delivered within a structured 6–12 week timeline with clear milestones and deliverables."
            : "Plutôt que de vendre des heures, nous vendons des résultats. Notre modèle d'engagement stratégique est conçu pour les organisations qui ont besoin d'un soutien ciblé et limité dans le temps.",
          idealFor: language === "en" ? "Organizations preparing for growth, restructuring, or transformation that need strategic clarity and alignment." : "Organisations se préparant à la croissance, à la restructuration ou à la transformation.",
          icon: <TrendingUp className="text-accent" />,
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
            ? "End-to-end design and implementation of performance management systems, governance frameworks, and process redesign."
            : "Conception et mise en œuvre de bout en bout des systèmes de gestion de la performance et de la refonte des processus.",
          learnMore: language === "en"
            ? "Strategy without systems is just aspiration. Our Systems & Implementation engagements build the operational infrastructure your organization needs to execute consistently and scale effectively.\n\nWe design and implement full performance management systems, governance frameworks, and process architectures, turning strategic vision into measurable, repeatable operational excellence."
            : "La stratégie sans systèmes n'est qu'une aspiration. Nous construisons l'infrastructure opérationnelle dont votre organisation a besoin pour exécuter de manière cohérente et évoluer efficacement.",
          idealFor: language === "en" ? "Organizations ready to build or overhaul their operational systems, governance structures, or performance infrastructure." : "Organisations prêtes à construire ou à refondre leurs systèmes opérationnels.",
          icon: <Wrench className="text-accent" />,
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
            ? "Ongoing executive-level advisory for organizations that need consistent strategic guidance and leadership coaching."
            : "Conseil exécutif continu pour les organisations qui ont besoin d'un accompagnement stratégique constant.",
          learnMore: language === "en"
            ? "Growth doesn't stop after a project ends. Our Executive Advisory Retainer provides dedicated, senior-level guidance on a monthly basis, including strategy sessions, performance oversight, ongoing advisory, and leadership coaching.\n\nThis model is designed for organizations that want a trusted strategic partner without the cost of a full-time executive hire."
            : "La croissance ne s'arrête pas à la fin d'un projet. Notre mandat de conseil exécutif fournit un accompagnement dédié de niveau supérieur sur une base mensuelle.",
          idealFor: language === "en" ? "Organizations seeking consistent access to senior strategic guidance, performance oversight, and leadership coaching." : "Organisations cherchant un accès constant à des conseils stratégiques de haut niveau.",
          icon: <Briefcase className="text-accent" />,
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
            ? "We handle the complexities of business registration so you can focus on building your vision."
            : "Nous gérons les complexités de l'enregistrement d'entreprise pour que vous puissiez vous concentrer sur votre vision.",
          learnMore: language === "en"
            ? "Starting a business involves more than just an idea, it requires proper legal structure, registration, and compliance. We guide you through the entire process, from choosing the right business structure to completing all government filings.\n\nOur team ensures your business is set up correctly from day one."
            : "Démarrer une entreprise implique plus qu'une simple idée. Nous vous guidons tout au long du processus.",
          idealFor: language === "en" ? "Entrepreneurs, startups, and organizations establishing a new legal entity or restructuring an existing one." : "Entrepreneurs, startups et organisations établissant une nouvelle entité juridique.",
          icon: <ClipboardList className="text-accent" />,
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
          investment: language === "en" ? "From $1,200" : "À partir de 1 200 $",
          desc: language === "en"
            ? "Build a strong digital presence that attracts and converts clients."
            : "Créez une forte présence numérique qui attire et convertit les clients.",
          learnMore: language === "en"
            ? "Your digital presence is often the first impression. We build performance-driven websites and execute targeted marketing strategies that align with your business goals."
            : "Votre présence numérique est souvent la première impression. Nous créons des sites Web axés sur la performance.",
          idealFor: language === "en" ? "Organizations seeking to establish or upgrade their digital presence and drive growth." : "Organisations cherchant à établir ou à améliorer leur présence numérique.",
          icon: <Globe className="text-accent" />,
          pricingTiers: [
            {
              name: language === "en" ? "Basic Website" : "Site Web de base",
              price: "$1,200",
              subtitle: language === "en" ? "Ideal for small businesses, personal portfolios, nonprofits, and simple informational sites." : "Idéal pour les petites entreprises et portfolios personnels.",
              features: language === "en"
                ? ["Up to 5 pages", "Responsive design (mobile + desktop)", "Contact form", "Basic SEO setup", "CMS (optional)"]
                : ["Jusqu'à 5 pages", "Design responsive", "Formulaire de contact", "SEO de base", "CMS (optionnel)"],
              stripeProductName: "Basic Website"
            },
            {
              name: language === "en" ? "Standard Business Website" : "Site Web standard",
              price: "$3,000",
              subtitle: language === "en" ? "Perfect for established organizations that need a stronger online presence." : "Parfait pour les organisations établies.",
              features: language === "en"
                ? ["6–12 pages", "Custom page layouts", "Brand-aligned visuals", "Blog or resource section", "Basic performance optimization", "CMS with editor training"]
                : ["6 à 12 pages", "Mises en page personnalisées", "Visuels de marque", "Section blog", "Optimisation de base", "CMS avec formation"],
              stripeProductName: "Standard Business Website"
            },
            {
              name: language === "en" ? "Advanced / Growth Website" : "Site Web avancé",
              price: "$6,000",
              subtitle: language === "en" ? "For organizations needing advanced functionality and strategic design." : "Pour les organisations ayant besoin de fonctionnalités avancées.",
              features: language === "en"
                ? ["12–20+ pages", "Custom UX/UI design", "Client portals or gated content", "Newsletter integration", "Analytics setup", "Lead capture systems"]
                : ["12 à 20+ pages", "Design UX/UI personnalisé", "Portails clients", "Intégration newsletter", "Analyses", "Capture de leads"],
              stripeProductName: "Advanced / Growth Website"
            },
            {
              name: language === "en" ? "Premium / Enterprise Website" : "Site Web premium",
              price: "$12,000",
              subtitle: language === "en" ? "For high-impact brands, nonprofits with large programs, or businesses with complex needs." : "Pour les marques à fort impact et les entreprises complexes.",
              features: language === "en"
                ? ["Fully custom design", "Multi-language support", "Advanced integrations (CRM, donations, payments, AI tools)", "API connections", "Ongoing support & maintenance"]
                : ["Design entièrement personnalisé", "Support multilingue", "Intégrations avancées", "Connexions API", "Support continu"],
              stripeProductName: "Premium / Enterprise Website"
            },
            {
              name: language === "en" ? "Ongoing Management" : "Gestion continue",
              price: "$780/mo",
              subtitle: language === "en" ? "Monthly website management, updates, security, and ongoing development support." : "Gestion mensuelle du site Web et soutien continu.",
              features: language === "en"
                ? ["Monthly content updates", "Security monitoring & patches", "Performance optimization", "Ongoing development & enhancements", "Priority support", "Monthly analytics reports"]
                : ["Mises à jour mensuelles", "Sécurité", "Optimisation", "Développement continu", "Support prioritaire", "Rapports d'analyse mensuels"],
              stripeProductName: "Ongoing Website Management",
              isMonthly: true
            }
          ]
        }
      ]
    },
    business: {
      label: language === "en" ? "Small Business" : "Petite entreprise",
      tagline: language === "en" ? "For small businesses, startups, founders & small teams (1–20 people)" : "Pour les petites entreprises, startups, fondateurs et petites équipes (1–20 personnes)",
      icon: <Rocket className="text-accent" size={24} />,
      services: [
        {
          title: language === "en" ? "Small Business Growth System" : "Système de croissance pour petites entreprises",
          investment: "$500 – $1,500/mo",
          investmentNote: language === "en" ? "(Monthly program, 3-month minimum)" : "(Programme mensuel, minimum 3 mois)",
          desc: language === "en"
            ? "A structured monthly program that gives your small business clearer priorities, consistent execution, and measurable progress."
            : "Un programme mensuel structuré qui donne à votre petite entreprise des priorités plus claires, une exécution cohérente et des progrès mesurables.",
          learnMore: language === "en"
            ? "Running a small business means wearing a hundred hats. Our Small Business Growth System takes the guesswork out of growth by giving you a monthly strategy session, a weekly KPI dashboard, regular accountability check-ins, and practical process improvement guidance.\n\nYou'll walk away each month with clearer priorities, a consistent execution rhythm, and measurable progress toward your goals."
            : "Diriger une petite entreprise signifie porter cent casquettes. Notre système de croissance élimine les incertitudes en vous offrant des sessions stratégiques mensuelles, un tableau de bord KPI hebdomadaire et des suivis de responsabilité réguliers.",
          idealFor: language === "en" ? "Small businesses, startups, and founders who want structure, accountability, and consistent growth." : "Petites entreprises, startups et fondateurs qui veulent de la structure, de la responsabilité et une croissance cohérente.",
          icon: <Rocket className="text-accent" />,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$500/mo",
              subtitle: language === "en" ? "Core growth support with monthly strategy and basic accountability." : "Soutien de base à la croissance avec stratégie mensuelle et responsabilité.",
              features: language === "en"
                ? ["Monthly strategy session (60 min)", "Goal setting framework", "Basic KPI dashboard", "Email support between sessions", "Monthly progress review"]
                : ["Session stratégique mensuelle (60 min)", "Cadre de définition d'objectifs", "Tableau de bord KPI de base", "Support par e-mail", "Revue mensuelle des progrès"],
              isMonthly: true,
              contactOnly: true
            },
            {
              name: "Standard",
              price: "$1,000/mo",
              subtitle: language === "en" ? "Full growth system with weekly tracking, process guidance, and priority support." : "Système de croissance complet avec suivi hebdomadaire et conseils en processus.",
              features: language === "en"
                ? ["Everything in Essentials", "Weekly KPI dashboard review", "Bi-weekly accountability check-ins", "Process improvement guidance", "Team alignment support", "Priority email & phone support"]
                : ["Tout dans Essentiel", "Revue hebdomadaire du tableau de bord KPI", "Suivis bimensuels de responsabilité", "Conseils en amélioration des processus", "Soutien à l'alignement d'équipe", "Support prioritaire"],
              isMonthly: true,
              contactOnly: true
            },
            {
              name: "Premium",
              price: "$1,500/mo",
              subtitle: language === "en" ? "Comprehensive support with hands-on implementation and dedicated consulting." : "Soutien complet avec mise en œuvre pratique et conseil dédié.",
              features: language === "en"
                ? ["Everything in Standard", "Weekly strategy calls", "Hands-on process implementation", "Custom reporting dashboards", "Team training sessions", "On-demand consulting access", "Quarterly strategic review"]
                : ["Tout dans Standard", "Appels stratégiques hebdomadaires", "Mise en œuvre pratique", "Tableaux de bord personnalisés", "Formation d'équipe", "Accès conseil à la demande", "Revue stratégique trimestrielle"],
              isMonthly: true,
              contactOnly: true
            }
          ]
        },
        {
          title: language === "en" ? "Business Foundations Package" : "Forfait fondations d'entreprise",
          investment: "$2,500 – $5,000",
          desc: language === "en"
            ? "A one-time engagement to set up your business systems, processes, and accountability structures from scratch."
            : "Un engagement unique pour mettre en place vos systèmes d'affaires, processus et structures de responsabilité.",
          learnMore: language === "en"
            ? "Not ready for a monthly retainer? Our Business Foundations Package is a one-time engagement designed to give your small business the systems and structures it needs to operate more efficiently.\n\nWe'll work with you to define your goals, map your key processes, set up KPI tracking, and create accountability structures that your team can maintain independently."
            : "Pas prêt pour un mandat mensuel ? Notre forfait fondations est un engagement unique conçu pour donner à votre entreprise les systèmes et structures nécessaires.",
          idealFor: language === "en" ? "Small businesses that need a solid foundation but aren't ready for ongoing consulting." : "Petites entreprises qui ont besoin d'une base solide sans conseil continu.",
          icon: <Settings className="text-accent" />,
          pricingTiers: [
            {
              name: language === "en" ? "Starter" : "Démarrage",
              price: "$2,500",
              subtitle: language === "en" ? "Essential business setup with goal framework and basic process mapping." : "Configuration essentielle avec cadre d'objectifs et cartographie de base.",
              features: language === "en"
                ? ["Business goal framework", "Key process mapping (up to 3)", "Basic KPI dashboard setup", "Role clarity document", "90-day action plan"]
                : ["Cadre d'objectifs d'entreprise", "Cartographie des processus clés (jusqu'à 3)", "Tableau de bord KPI de base", "Document de clarté des rôles", "Plan d'action de 90 jours"],
              contactOnly: true
            },
            {
              name: language === "en" ? "Complete" : "Complet",
              price: "$5,000",
              subtitle: language === "en" ? "Full business systems setup with SOPs, team alignment, and implementation support." : "Configuration complète des systèmes avec procédures et soutien à la mise en œuvre.",
              features: language === "en"
                ? ["Everything in Starter", "Full process documentation (SOPs)", "Team alignment workshop", "Performance review framework", "Accountability system setup", "Implementation support (2 weeks)", "Follow-up review session"]
                : ["Tout dans Démarrage", "Documentation complète des processus", "Atelier d'alignement d'équipe", "Cadre d'examen de performance", "Système de responsabilité", "Soutien à la mise en œuvre (2 semaines)", "Session de suivi"],
              contactOnly: true
            }
          ]
        }
      ]
    },
    professional: {
      label: language === "en" ? "Professional" : "Professionnel",
      tagline: language === "en" ? "For professionals, freelancers, entrepreneurs & career growth" : "Pour les professionnels, freelancers, entrepreneurs et croissance de carrière",
      icon: <UserCheck className="text-accent" size={24} />,
      services: [
        {
          title: language === "en" ? "Personal Performance Coaching" : "Coaching de performance personnelle",
          investment: "$100 – $500/mo",
          investmentNote: language === "en" ? "(Monthly coaching program)" : "(Programme de coaching mensuel)",
          desc: language === "en"
            ? "Build systems that help you perform better every day — whether you're growing a career, scaling a business, or leveling up your leadership."
            : "Construisez des systèmes qui vous aident à mieux performer chaque jour — que vous développiez votre carrière ou votre leadership.",
          learnMore: language === "en"
            ? "Performance isn't just for organizations — it's personal. Our Personal Performance Coaching program gives you a monthly coaching session, weekly accountability, productivity systems, goal planning, and habit building support.\n\nWhether you're focused on career advancement, business growth, time management, or leadership development, we'll help you build the systems that make your week easier and your progress measurable."
            : "La performance n'est pas que pour les organisations — c'est personnel. Notre programme de coaching vous donne des sessions mensuelles, de la responsabilité hebdomadaire et des systèmes de productivité.",
          idealFor: language === "en" ? "Professionals, freelancers, and entrepreneurs who want structured coaching to accelerate their growth." : "Professionnels, freelancers et entrepreneurs qui veulent un coaching structuré.",
          icon: <UserCheck className="text-accent" />,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$100/mo",
              subtitle: language === "en" ? "Monthly coaching with goal setting and basic accountability." : "Coaching mensuel avec définition d'objectifs et responsabilité de base.",
              features: language === "en"
                ? ["Monthly coaching session (45 min)", "Goal planning framework", "Weekly accountability check-in (async)", "Progress tracking template", "Email support"]
                : ["Session de coaching mensuelle (45 min)", "Cadre de planification d'objectifs", "Suivi de responsabilité hebdomadaire", "Modèle de suivi des progrès", "Support par e-mail"],
              isMonthly: true,
              contactOnly: true
            },
            {
              name: "Standard",
              price: "$250/mo",
              subtitle: language === "en" ? "Bi-weekly coaching with productivity systems and habit building." : "Coaching bimensuel avec systèmes de productivité et construction d'habitudes.",
              features: language === "en"
                ? ["Everything in Essentials", "Bi-weekly coaching sessions", "Productivity system design", "Habit building framework", "Time management strategies", "Priority support"]
                : ["Tout dans Essentiel", "Sessions bimensuelles", "Conception de systèmes de productivité", "Construction d'habitudes", "Stratégies de gestion du temps", "Support prioritaire"],
              isMonthly: true,
              contactOnly: true
            },
            {
              name: "Premium",
              price: "$500/mo",
              subtitle: language === "en" ? "Weekly sessions with comprehensive personal performance system and leadership development." : "Sessions hebdomadaires avec système de performance personnelle complet.",
              features: language === "en"
                ? ["Everything in Standard", "Weekly coaching sessions", "Complete personal performance system", "Leadership development focus", "Career strategy planning", "Personal KPI dashboard", "On-demand messaging support", "Quarterly strategic review"]
                : ["Tout dans Standard", "Sessions hebdomadaires", "Système de performance personnelle complet", "Développement du leadership", "Planification de carrière", "Tableau de bord KPI personnel", "Support messagerie", "Revue stratégique trimestrielle"],
              isMonthly: true,
              contactOnly: true
            }
          ]
        }
      ]
    },
    "self-serve": {
      label: language === "en" ? "Self-Serve" : "Libre-service",
      tagline: language === "en" ? "Tools, programs & templates for self-guided performance improvement" : "Outils, programmes et modèles pour l'amélioration autonome de la performance",
      icon: <Package className="text-accent" size={24} />,
      services: [
        {
          title: language === "en" ? "Performance Planner" : "Planificateur de performance",
          investment: "$49 – $99",
          desc: language === "en"
            ? "A guided goal system with yearly planning, weekly review templates, and a KPI tracker to keep you on track."
            : "Un système d'objectifs guidé avec planification annuelle, modèles de revue hebdomadaire et suivi de KPI.",
          learnMore: language === "en"
            ? "The Performance Planner is your personal roadmap to consistent results. It includes a yearly planning framework, weekly review templates, and a built-in KPI tracker that helps you stay focused on what matters most.\n\nDesigned for individuals and small teams who want structure without the cost of a consultant."
            : "Le planificateur de performance est votre feuille de route personnelle vers des résultats cohérents. Il comprend un cadre de planification annuelle et des modèles de revue hebdomadaire.",
          idealFor: language === "en" ? "Individuals and small teams who want a structured planning system they can use independently." : "Individus et petites équipes qui veulent un système de planification structuré.",
          icon: <BookOpen className="text-accent" />,
          pricingTiers: [
            {
              name: language === "en" ? "Digital" : "Numérique",
              price: "$49",
              subtitle: language === "en" ? "Digital download with templates and guides." : "Téléchargement numérique avec modèles et guides.",
              features: language === "en"
                ? ["Yearly planning framework", "Weekly review template", "Monthly reflection guide", "KPI tracker spreadsheet", "Goal setting worksheet"]
                : ["Cadre de planification annuelle", "Modèle de revue hebdomadaire", "Guide de réflexion mensuelle", "Feuille de suivi KPI", "Feuille de définition d'objectifs"],
              contactOnly: true
            },
            {
              name: "Premium",
              price: "$99",
              subtitle: language === "en" ? "Everything in Digital plus video walkthroughs and bonus resources." : "Tout dans Numérique plus vidéos explicatives et ressources bonus.",
              features: language === "en"
                ? ["Everything in Digital", "Video walkthrough guides", "Quarterly planning template", "Team accountability framework", "Priority email support (30 days)", "Bonus: habit tracker template"]
                : ["Tout dans Numérique", "Guides vidéo", "Modèle de planification trimestrielle", "Cadre de responsabilité d'équipe", "Support e-mail prioritaire (30 jours)", "Bonus: modèle de suivi d'habitudes"],
              contactOnly: true
            }
          ]
        },
        {
          title: language === "en" ? "90-Day Performance Program" : "Programme de performance de 90 jours",
          investment: "$297 – $997",
          desc: language === "en"
            ? "A structured growth program with a strategy framework, execution plan, and accountability system to transform your performance in 90 days."
            : "Un programme de croissance structuré avec un cadre stratégique, un plan d'exécution et un système de responsabilité.",
          learnMore: language === "en"
            ? "The 90-Day Performance Program is a self-guided transformation system designed to help you go from scattered to structured in just three months.\n\nYou'll get a proven strategy framework, a week-by-week execution plan, and a built-in accountability system that keeps you moving forward. It's the same methodology we use with enterprise clients, packaged for self-guided implementation."
            : "Le programme de performance de 90 jours est un système de transformation auto-guidé conçu pour vous aider à passer du désordre à la structure en trois mois.",
          idealFor: language === "en" ? "Professionals and entrepreneurs who want a structured transformation program they can follow at their own pace." : "Professionnels et entrepreneurs qui veulent un programme de transformation structuré.",
          icon: <Zap className="text-accent" />,
          pricingTiers: [
            {
              name: language === "en" ? "Self-Guided" : "Auto-guidé",
              price: "$297",
              subtitle: language === "en" ? "Complete program with templates, guides, and weekly action plans." : "Programme complet avec modèles, guides et plans d'action hebdomadaires.",
              features: language === "en"
                ? ["Strategy framework workbook", "12-week execution plan", "Weekly action templates", "Progress tracking system", "Accountability checklist", "Completion certificate"]
                : ["Cahier de stratégie", "Plan d'exécution de 12 semaines", "Modèles d'action hebdomadaires", "Système de suivi des progrès", "Liste de responsabilité", "Certificat de complétion"],
              contactOnly: true
            },
            {
              name: language === "en" ? "Guided" : "Guidé",
              price: "$997",
              subtitle: language === "en" ? "Full program with live group calls, coaching support, and peer accountability." : "Programme complet avec appels de groupe en direct et soutien coaching.",
              features: language === "en"
                ? ["Everything in Self-Guided", "3 live group coaching calls", "Private community access", "Peer accountability partner matching", "Direct coach Q&A support", "Bonus: personal KPI setup session"]
                : ["Tout dans Auto-guidé", "3 appels de coaching de groupe", "Accès communauté privée", "Jumelage de partenaires de responsabilité", "Support Q&R du coach", "Bonus: session de configuration KPI"],
              contactOnly: true
            }
          ]
        },
        {
          title: language === "en" ? "Performance Systems Toolkit" : "Boîte à outils de systèmes de performance",
          investment: "$49 – $199",
          desc: language === "en"
            ? "Ready-to-use templates for KPIs, weekly planning, team accountability, and strategy execution."
            : "Modèles prêts à l'emploi pour KPI, planification hebdomadaire, responsabilité d'équipe et exécution stratégique.",
          learnMore: language === "en"
            ? "Don't start from scratch. Our Performance Systems Toolkit gives you everything you need to build high-performing habits, manage your team, and execute your strategy.\n\nIncludes templates for KPI tracking, weekly planning, team accountability, strategy execution, meeting agendas, and more — all designed to be simple, practical, and immediately useful."
            : "Ne partez pas de zéro. Notre boîte à outils vous donne tout ce dont vous avez besoin pour construire des habitudes performantes et gérer votre équipe.",
          idealFor: language === "en" ? "Managers, team leads, and business owners who want practical tools without consulting engagement." : "Gestionnaires, chefs d'équipe et propriétaires d'entreprise qui veulent des outils pratiques.",
          icon: <Package className="text-accent" />,
          pricingTiers: [
            {
              name: language === "en" ? "Starter Kit" : "Kit de démarrage",
              price: "$49",
              subtitle: language === "en" ? "Essential templates for individual performance management." : "Modèles essentiels pour la gestion de performance individuelle.",
              features: language === "en"
                ? ["KPI tracking template", "Weekly planning sheet", "Goal setting framework", "Meeting agenda template", "Progress review guide"]
                : ["Modèle de suivi KPI", "Feuille de planification hebdomadaire", "Cadre de définition d'objectifs", "Modèle d'ordre du jour", "Guide de revue des progrès"],
              contactOnly: true
            },
            {
              name: language === "en" ? "Team Edition" : "Édition équipe",
              price: "$129",
              subtitle: language === "en" ? "Full team toolkit with accountability systems and performance frameworks." : "Boîte à outils d'équipe complète avec systèmes de responsabilité.",
              features: language === "en"
                ? ["Everything in Starter Kit", "Team accountability framework", "Performance review templates", "Strategy execution tracker", "Role clarity worksheet", "Team alignment guide"]
                : ["Tout dans Kit de démarrage", "Cadre de responsabilité d'équipe", "Modèles de revue de performance", "Suivi d'exécution stratégique", "Feuille de clarté des rôles", "Guide d'alignement d'équipe"],
              contactOnly: true
            },
            {
              name: language === "en" ? "Business Edition" : "Édition entreprise",
              price: "$199",
              subtitle: language === "en" ? "Complete business toolkit with governance, SOPs, and organizational frameworks." : "Boîte à outils complète avec gouvernance, procédures et cadres organisationnels.",
              features: language === "en"
                ? ["Everything in Team Edition", "SOP templates", "Governance framework guide", "Balanced scorecard template", "Change management checklist", "Board reporting template", "Onboarding framework"]
                : ["Tout dans Édition équipe", "Modèles de procédures", "Guide de gouvernance", "Modèle de tableau de bord prospectif", "Liste de gestion du changement", "Modèle de rapport au conseil", "Cadre d'intégration"],
              contactOnly: true
            }
          ]
        }
      ]
    }
  };

  const tabs: { key: typeof activeTab; label: string; icon: JSX.Element; priceRange: string }[] = [
    { key: "enterprise", label: serviceTiers.enterprise.label, icon: <Briefcase size={18} />, priceRange: "$750+" },
    { key: "business", label: serviceTiers.business.label, icon: <Rocket size={18} />, priceRange: "$500/mo+" },
    { key: "professional", label: serviceTiers.professional.label, icon: <UserCheck size={18} />, priceRange: "$100/mo+" },
    { key: "self-serve", label: serviceTiers["self-serve"].label, icon: <Package size={18} />, priceRange: "$49+" },
  ];

  const currentTier = serviceTiers[activeTab];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{language === "en" ? "Turn ambition into" : "Transformer l'ambition en"} <br /> <span className="text-accent">{language === "en" ? "consistent execution" : "exécution cohérente"}</span></>}
          subtitle={language === "en" 
            ? "Helping founders scale, professionals grow, teams execute, and organizations improve performance."
            : "Aider les fondateurs à grandir, les professionnels à évoluer, les équipes à exécuter et les organisations à améliorer leur performance."}
        />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "The Performance Process Method" : "La méthode Performance Process"}
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? "A simple system that works for everyone" : "Un système simple qui fonctionne pour tous"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {language === "en"
                  ? "Whether you're an individual, entrepreneur, team, or company — performance management works best when it includes planning, monitoring, development, and evaluation."
                  : "Que vous soyez un individu, un entrepreneur, une équipe ou une entreprise — la gestion de la performance fonctionne mieux avec la planification, le suivi, le développement et l'évaluation."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodSteps.map((step, i) => (
                <div key={i} className="relative text-center group" data-testid={`method-step-${i}`}>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <span className="text-accent group-hover:text-white transition-colors">{step.icon}</span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-2">{language === "en" ? "Step" : "Étape"} {step.step}</div>
                  <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  {i < methodSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8">
                      <ArrowRight className="text-accent/30" size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Our Services" : "Nos services"}
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? "Performance systems for every stage" : "Des systèmes de performance pour chaque étape"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                {language === "en"
                  ? "From self-serve tools to enterprise advisory — choose the level of support that fits where you are right now."
                  : "Des outils en libre-service au conseil d'entreprise — choisissez le niveau de soutien qui correspond à votre situation actuelle."}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white text-primary border border-border hover:border-accent/40 hover:shadow-md"
                  }`}
                  data-testid={`tab-${tab.key}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-accent/10 text-accent"}`}>{tab.priceRange}</span>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-border p-8 mb-8">
              <div className="flex items-center gap-3 mb-2">
                {currentTier.icon}
                <h3 className="text-xl font-bold text-primary">{currentTier.label}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-0">{currentTier.tagline}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTier.services.map((s: any, i: number) => (
                <div 
                  key={i} 
                  className="bg-white p-10 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[350px]"
                  onClick={() => setSelectedService(s)}
                  data-testid={`card-service-${activeTab}-${i}`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                      {s.icon}
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-3">{s.desc}</p>
                    <div className="text-accent font-bold text-lg mb-2">{s.investment}</div>
                  </div>
                  <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                    {language === "en" ? "Learn more" : "En savoir plus"} <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Performance Processes Collective" : "Collectif Performance Processes"}
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? "Join the community" : "Rejoignez la communauté"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                {language === "en"
                  ? "Get group coaching, accountability partners, templates, and training — at a fraction of the cost of private consulting."
                  : "Bénéficiez de coaching de groupe, de partenaires de responsabilité, de modèles et de formation — pour une fraction du coût du conseil privé."}
              </p>
            </div>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-10 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="text-accent" size={24} />
                    <h3 className="text-2xl font-bold">{language === "en" ? "Performance Processes Collective" : "Collectif Performance Processes"}</h3>
                  </div>
                  <div className="text-accent font-black text-3xl mb-4">$49 – $99<span className="text-lg font-normal text-white/70">/mo</span></div>
                  <ul className="space-y-3 mb-6">
                    {(language === "en"
                      ? ["Monthly group strategy call", "Accountability group & partner matching", "Templates and tools library", "Training sessions and workshops", "Private community access", "Member-only resources"]
                      : ["Appel stratégique de groupe mensuel", "Groupe de responsabilité et jumelage", "Bibliothèque de modèles et outils", "Sessions de formation et ateliers", "Accès communauté privée", "Ressources réservées aux membres"]
                    ).map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-12 px-8 font-bold uppercase tracking-wider text-xs" data-testid="button-join-collective">
                      {language === "en" ? "Join the Collective" : "Rejoindre le collectif"}
                    </Button>
                  </a>
                </div>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="font-bold text-accent mb-1">{language === "en" ? "Perfect for" : "Parfait pour"}</div>
                    <p className="text-white/80">{language === "en" ? "Entrepreneurs, consultants, freelancers, managers, small business owners, ambitious professionals" : "Entrepreneurs, consultants, freelancers, gestionnaires, propriétaires de petites entreprises, professionnels ambitieux"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" data-testid="section-womens-grant">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-accent/5 via-white to-accent/10 rounded-3xl border-2 border-accent/20 overflow-hidden shadow-lg">
                <div className="p-10 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Heart className="text-accent" size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                        {language === "en" ? "International Women's Month" : "Mois international de la femme"}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary">
                        {language === "en" ? "Women's Performance Grant" : "Bourse de performance pour les femmes"}
                      </h2>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {language === "en"
                      ? "Performance Processes is launching a Women's Performance Grant to support women who are building businesses, advancing their careers, or leading teams. The grant provides professional coaching and performance systems support to help recipients turn their goals into measurable results."
                      : "Performance Processes lance une bourse de performance pour les femmes afin de soutenir celles qui bâtissent des entreprises, font avancer leur carrière ou dirigent des équipes."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Star className="text-accent" size={16} />
                        {language === "en" ? "Grant Includes" : "La bourse comprend"}
                      </h4>
                      <ul className="space-y-2">
                        {[
                          language === "en" ? "3 months of Performance Coaching" : "3 mois de coaching de performance",
                          language === "en" ? "Performance Systems Setup" : "Configuration des systèmes de performance",
                          language === "en" ? "Monthly strategy sessions" : "Sessions stratégiques mensuelles",
                          language === "en" ? "Performance planning framework" : "Cadre de planification de performance",
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-primary">
                            <CheckCircle2 size={14} className="text-accent shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Target className="text-accent" size={16} />
                        {language === "en" ? "Focus Areas" : "Domaines d'intervention"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(language === "en"
                          ? ["Leadership Development", "Business Growth", "Career Advancement", "Productivity & Focus", "Strategic Goal Execution"]
                          : ["Développement du leadership", "Croissance des affaires", "Avancement professionnel", "Productivité et concentration", "Exécution stratégique"]
                        ).map((area, i) => (
                          <span key={i} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-accent/20 text-primary">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {[
                      { label: language === "en" ? "Recipients" : "Récipiendaires", value: "3" },
                      { label: language === "en" ? "Duration" : "Durée", value: language === "en" ? "3 months" : "3 mois" },
                      { label: language === "en" ? "Deadline" : "Date limite", value: language === "en" ? "March 31" : "31 mars" },
                      { label: language === "en" ? "Announced" : "Annoncé", value: language === "en" ? "Early April" : "Début avril" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-xl p-3 text-center border border-border">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-sm font-black text-accent">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link href="/womens-performance-grant">
                      <Button className="rounded-full bg-accent text-white hover:bg-primary h-12 px-8 font-bold uppercase tracking-wider text-xs shadow-lg shadow-accent/20 gap-2" data-testid="button-apply-grant">
                        <Sparkles size={16} />
                        {language === "en" ? "Apply for the Grant" : "Postuler pour la bourse"}
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {language === "en"
                        ? "Open to women entrepreneurs, professionals, and leaders."
                        : "Ouvert aux femmes entrepreneures, professionnelles et leaders."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl">
            {selectedService && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      {selectedService.icon}
                    </div>
                    <DialogTitle className="text-3xl font-heading font-extrabold text-primary">{selectedService.title}</DialogTitle>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 mb-6">
                    <div className="text-accent font-black text-2xl mb-1">
                      {language === "en" ? "Investment:" : "Investissement :"} {selectedService.investment}
                    </div>
                    {selectedService.investmentNote && (
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{selectedService.investmentNote}</div>
                    )}
                  </div>
                </DialogHeader>
                <div className="space-y-8 py-4">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                      {language === "en" ? "Overview" : "Aperçu"}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{selectedService.learnMore}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                      {language === "en" ? "Choose Your Package" : "Choisissez votre forfait"}
                    </h4>
                    <div className={`grid grid-cols-1 ${selectedService.pricingTiers.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : selectedService.pricingTiers.length >= 5 ? 'md:grid-cols-2 lg:grid-cols-3' : selectedService.pricingTiers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
                      {selectedService.pricingTiers.map((tier: any, idx: number) => (
                        <div key={idx} className={`bg-white border rounded-2xl p-6 flex flex-col hover:shadow-lg transition-all ${idx === 1 ? 'border-accent shadow-md ring-2 ring-accent/20' : 'border-border hover:border-accent/40'}`} data-testid={`pricing-tier-${idx}`}>
                          <div className="flex items-center gap-2 mb-2">
                            {idx === 1 && (
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                                {language === "en" ? "Most Popular" : "Le plus populaire"}
                              </span>
                            )}
                            {tier.isMonthly && (
                              <span className="text-[10px] font-black uppercase tracking-[0.15em] bg-accent/10 text-accent px-2 py-0.5 rounded-full flex items-center gap-1">
                                <RefreshCw size={10} /> {language === "en" ? "Monthly" : "Mensuel"}
                              </span>
                            )}
                          </div>
                          <h5 className="text-lg font-extrabold text-primary mb-1">{tier.name}</h5>
                          <div className="text-accent font-black text-xl mb-3">{tier.price}</div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-4">{tier.subtitle}</p>
                          <ul className="space-y-2 mb-6">
                            {tier.features.map((f: string, fi: number) => (
                              <li key={fi} className="flex items-start gap-2 text-sm text-primary">
                                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          {tier.contactOnly ? (
                            <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="mt-auto">
                              <Button
                                className={`w-full rounded-full h-10 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${idx === 1 ? 'bg-accent text-white hover:bg-primary' : 'bg-primary text-white hover:bg-accent'}`}
                                data-testid={`button-book-tier-${idx}`}
                              >
                                <Calendar size={14} /> {language === "en" ? "Book a Call" : "Réserver un appel"}
                              </Button>
                            </a>
                          ) : (
                            <Button
                              className={`mt-auto w-full rounded-full h-10 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${idx === 1 ? 'bg-accent text-white hover:bg-primary' : 'bg-primary text-white hover:bg-accent'}`}
                              onClick={() => handlePay(tier.stripeProductName)}
                              disabled={checkoutMutation.isPending && payingProduct === tier.stripeProductName}
                              data-testid={`button-pay-tier-${idx}`}
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
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-primary rounded-2xl text-white">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-70">
                      {language === "en" ? "Ideal For" : "Idéal pour"}
                    </h4>
                    <p className="font-bold italic text-lg leading-relaxed">{selectedService.idealFor}</p>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button 
                      className="rounded-full bg-accent text-white hover:bg-primary h-14 px-10 font-bold uppercase tracking-widest text-sm shadow-lg shadow-accent/20"
                      onClick={() => {
                        window.location.href = `mailto:contact@performanceprocesses.com?subject=Inquiry: ${selectedService.title}`;
                        setSelectedService(null);
                      }}
                      data-testid="button-inquire"
                    >
                      {language === "en" ? "Need help choosing? Contact us" : "Besoin d'aide pour choisir ? Contactez-nous"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <section className="bg-primary py-24 text-white">
          <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6 italic">
                {language === "en" ? "Not sure where to start?" : "Vous ne savez pas par où commencer ?"}
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed">
                {language === "en" 
                  ? "Whether you're a professional looking to level up, a founder building systems, or a company ready for transformation — we'll help you find the right fit."
                  : "Que vous soyez un professionnel cherchant à évoluer, un fondateur construisant des systèmes ou une entreprise prête pour la transformation — nous vous aiderons à trouver la bonne solution."}
              </p>
            </div>
            <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-12 text-lg font-bold uppercase tracking-widest transition-all" data-testid="button-book-consultation-cta">
                {language === "en" ? "Book a free consultation" : "Réservez une consultation gratuite"}
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
