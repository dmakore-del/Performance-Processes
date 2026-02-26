import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck, FileText, Settings, Info, Globe, CreditCard, Loader2, LifeBuoy, RefreshCw, ClipboardList, Search, Briefcase, Wrench } from "lucide-react";
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

  const services = [
    {
      title: language === "en" ? "Discovery Phase" : "Phase de découverte",
      investment: "$750 – $1,500",
      investmentNote: language === "en" ? "(Mandatory first step — fee can be credited toward full engagement)" : "(Première étape obligatoire — les frais peuvent être crédités vers un engagement complet)",
      desc: language === "en"
        ? "Every successful engagement begins with clarity. Our Discovery Phase ensures we understand your organization before proposing solutions."
        : "Chaque engagement réussi commence par la clarté. Notre phase de découverte garantit que nous comprenons votre organisation avant de proposer des solutions.",
      learnMore: language === "en"
        ? "Before recommending any strategy or system, we invest time in understanding your organization's current state, challenges, and goals. The Discovery Phase is a structured intake process designed to align expectations, define scope, and build a clear roadmap.\n\nDiscovery fees can be credited toward your full engagement, so you never pay twice for this essential first step."
        : "Avant de recommander toute stratégie ou système, nous investissons du temps pour comprendre l'état actuel, les défis et les objectifs de votre organisation. La phase de découverte est un processus d'accueil structuré conçu pour aligner les attentes, définir la portée et construire une feuille de route claire.\n\nLes frais de découverte peuvent être crédités vers votre engagement complet, vous ne payez donc jamais deux fois pour cette première étape essentielle.",
      idealFor: language === "en" ? "Any organization beginning a new consulting engagement or exploring how we can help." : "Toute organisation commençant un nouvel engagement de conseil ou explorant comment nous pouvons aider.",
      icon: <Search className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Essentials" : "Essentiel",
          price: "$750",
          subtitle: language === "en"
            ? "Focused intake session with needs assessment and initial scope definition."
            : "Session d'accueil ciblée avec évaluation des besoins et définition initiale de la portée.",
          features: language === "en"
            ? ["Organizational intake session", "Needs assessment", "Scope definition", "Summary findings document"]
            : ["Session d'accueil organisationnel", "Évaluation des besoins", "Définition de la portée", "Document de synthèse des conclusions"],
          stripeProductName: "Discovery Phase - Essentials"
        },
        {
          name: "Standard",
          price: "$1,500",
          subtitle: language === "en"
            ? "Comprehensive discovery with stakeholder interviews, detailed assessment, and full proposal roadmap."
            : "Découverte complète avec entretiens des parties prenantes, évaluation détaillée et feuille de route de proposition complète.",
          features: language === "en"
            ? ["Everything in Essentials", "Stakeholder interviews", "Detailed organizational assessment", "Full proposal roadmap", "Engagement plan with milestones"]
            : ["Tout dans Essentiel", "Entretiens avec les parties prenantes", "Évaluation organisationnelle détaillée", "Feuille de route de proposition complète", "Plan d'engagement avec jalons"],
          stripeProductName: "Discovery Phase - Standard"
        }
      ]
    },
    {
      title: language === "en" ? "Strategic Engagement" : "Engagement stratégique",
      investment: "$5,000 – $15,000",
      investmentNote: language === "en" ? "(6–12 week engagement)" : "(Engagement de 6 à 12 semaines)",
      desc: language === "en"
        ? "Outcome-focused engagements that align your strategy, leadership, and performance systems for measurable results."
        : "Des engagements axés sur les résultats qui alignent votre stratégie, votre leadership et vos systèmes de performance pour des résultats mesurables.",
      learnMore: language === "en"
        ? "Rather than selling hours, we sell outcomes. Our Strategic Engagement model is designed for organizations that need focused, time-bound support to address critical strategic challenges.\n\nThis model covers strategic planning, performance framework design, organizational alignment, and leadership development — all delivered within a structured 6–12 week timeline with clear milestones and deliverables."
        : "Plutôt que de vendre des heures, nous vendons des résultats. Notre modèle d'engagement stratégique est conçu pour les organisations qui ont besoin d'un soutien ciblé et limité dans le temps pour relever des défis stratégiques critiques.\n\nCe modèle couvre la planification stratégique, la conception de cadres de performance, l'alignement organisationnel et le développement du leadership — le tout livré dans un délai structuré de 6 à 12 semaines avec des jalons et des livrables clairs.",
      idealFor: language === "en" ? "Organizations preparing for growth, restructuring, or transformation that need strategic clarity and alignment." : "Organisations se préparant à la croissance, à la restructuration ou à la transformation qui ont besoin de clarté et d'alignement stratégiques.",
      icon: <TrendingUp className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Foundation" : "Fondation",
          price: "$5,000",
          subtitle: language === "en"
            ? "Focused strategic engagement covering planning fundamentals and initial alignment."
            : "Engagement stratégique ciblé couvrant les fondamentaux de la planification et l'alignement initial.",
          features: language === "en"
            ? ["Strategic planning sessions", "Vision and mission refinement", "Basic environmental analysis", "Strategic objective development", "Summary roadmap"]
            : ["Sessions de planification stratégique", "Affinement de la vision et de la mission", "Analyse environnementale de base", "Développement d'objectifs stratégiques", "Feuille de route de synthèse"],
          stripeProductName: "Strategic Engagement - Foundation"
        },
        {
          name: "Standard",
          price: "$10,000",
          subtitle: language === "en"
            ? "Full strategic engagement with KPI design, stakeholder alignment, and performance framework."
            : "Engagement stratégique complet avec conception de KPI, alignement des parties prenantes et cadre de performance.",
          features: language === "en"
            ? ["Everything in Foundation", "Stakeholder analysis and alignment", "KPI and success metric design", "Performance framework development", "Leadership alignment workshops", "1-year strategic roadmap"]
            : ["Tout dans Fondation", "Analyse et alignement des parties prenantes", "Conception de KPI et d'indicateurs de réussite", "Développement du cadre de performance", "Ateliers d'alignement des dirigeants", "Feuille de route stratégique d'un an"],
          stripeProductName: "Strategic Engagement - Standard"
        },
        {
          name: language === "en" ? "Comprehensive" : "Complet",
          price: "$15,000",
          subtitle: language === "en"
            ? "Complete strategic transformation with deep-dive analysis, leadership coaching, and ongoing support."
            : "Transformation stratégique complète avec analyse approfondie, coaching de leadership et soutien continu.",
          features: language === "en"
            ? ["Everything in Standard", "Environmental and stakeholder deep-dive", "Leadership development sessions", "Organizational alignment framework", "3-year strategic roadmap", "Quarterly review sessions", "Implementation support"]
            : ["Tout dans Standard", "Analyse approfondie de l'environnement et des parties prenantes", "Sessions de développement du leadership", "Cadre d'alignement organisationnel", "Feuille de route stratégique de 3 ans", "Sessions de révision trimestrielles", "Soutien à la mise en œuvre"],
          stripeProductName: "Strategic Engagement - Comprehensive"
        }
      ]
    },
    {
      title: language === "en" ? "Systems & Implementation" : "Systèmes et mise en œuvre",
      investment: "$8,000 – $25,000",
      desc: language === "en"
        ? "End-to-end design and implementation of performance management systems, governance frameworks, and process redesign."
        : "Conception et mise en œuvre de bout en bout des systèmes de gestion de la performance, des cadres de gouvernance et de la refonte des processus.",
      learnMore: language === "en"
        ? "Strategy without systems is just aspiration. Our Systems & Implementation engagements build the operational infrastructure your organization needs to execute consistently and scale effectively.\n\nWe design and implement full performance management systems, governance frameworks, and process architectures — turning strategic vision into measurable, repeatable operational excellence."
        : "La stratégie sans systèmes n'est qu'une aspiration. Nos engagements de systèmes et de mise en œuvre construisent l'infrastructure opérationnelle dont votre organisation a besoin pour exécuter de manière cohérente et évoluer efficacement.\n\nNous concevons et mettons en œuvre des systèmes complets de gestion de la performance, des cadres de gouvernance et des architectures de processus — transformant la vision stratégique en excellence opérationnelle mesurable et reproductible.",
      idealFor: language === "en" ? "Organizations ready to build or overhaul their operational systems, governance structures, or performance infrastructure." : "Organisations prêtes à construire ou à refondre leurs systèmes opérationnels, structures de gouvernance ou infrastructure de performance.",
      icon: <Wrench className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Foundation" : "Fondation",
          price: "$8,000",
          subtitle: language === "en"
            ? "Core systems design with KPI frameworks, process mapping, and accountability structures."
            : "Conception de systèmes de base avec cadres de KPI, cartographie des processus et structures de responsabilité.",
          features: language === "en"
            ? ["KPI framework development", "Process mapping and documentation", "Role-based accountability structures", "Performance review templates", "Key findings report"]
            : ["Développement d'un cadre de KPI", "Cartographie et documentation des processus", "Structures de responsabilité basées sur les rôles", "Modèles d'examen des performances", "Rapport des principales conclusions"],
          stripeProductName: "Systems & Implementation - Foundation"
        },
        {
          name: "Standard",
          price: "$15,000",
          subtitle: language === "en"
            ? "Full system design with governance frameworks, SOP development, and balanced scorecard."
            : "Conception complète du système avec cadres de gouvernance, développement de procédures et tableau de bord prospectif.",
          features: language === "en"
            ? ["Everything in Foundation", "Governance framework design", "SOP development", "Balanced scorecard design", "Role clarity frameworks", "Change management integration", "Implementation roadmap"]
            : ["Tout dans Fondation", "Conception du cadre de gouvernance", "Développement des procédures opérationnelles normalisées", "Conception du tableau de bord prospectif", "Cadres de clarté des rôles", "Intégration de la gestion du changement", "Feuille de route de mise en œuvre"],
          stripeProductName: "Systems & Implementation - Standard"
        },
        {
          name: "Enterprise",
          price: "$25,000",
          subtitle: language === "en"
            ? "Complete systems overhaul with full implementation, dashboards, and ongoing support."
            : "Refonte complète des systèmes avec mise en œuvre complète, tableaux de bord et soutien continu.",
          features: language === "en"
            ? ["Everything in Standard", "Full performance management system", "Reporting dashboards", "Process redesign and optimization", "Full implementation support", "Stakeholder engagement sessions", "Ongoing guidance and review sessions", "Executive coaching integration"]
            : ["Tout dans Standard", "Système complet de gestion de la performance", "Tableaux de bord de rapport", "Refonte et optimisation des processus", "Soutien complet à la mise en œuvre", "Sessions d'engagement des parties prenantes", "Accompagnement et sessions de révision continues", "Intégration du coaching exécutif"],
          stripeProductName: "Systems & Implementation - Enterprise"
        }
      ]
    },
    {
      title: language === "en" ? "Executive Advisory Retainer" : "Mandat de conseil exécutif",
      investment: "$2,500 – $7,500/mo",
      investmentNote: language === "en" ? "(Monthly retainer — 3-month minimum)" : "(Mandat mensuel — minimum 3 mois)",
      desc: language === "en"
        ? "Ongoing executive-level advisory for organizations that need consistent strategic guidance and leadership coaching."
        : "Conseil exécutif continu pour les organisations qui ont besoin d'un accompagnement stratégique constant et d'un coaching de leadership.",
      learnMore: language === "en"
        ? "Growth doesn't stop after a project ends. Our Executive Advisory Retainer provides dedicated, senior-level guidance on a monthly basis — including strategy sessions, performance oversight, ongoing advisory, and leadership coaching.\n\nThis model is designed for organizations that want a trusted strategic partner without the cost of a full-time executive hire."
        : "La croissance ne s'arrête pas à la fin d'un projet. Notre mandat de conseil exécutif fournit un accompagnement dédié de niveau supérieur sur une base mensuelle — incluant des sessions stratégiques, un suivi de la performance, des conseils continus et du coaching de leadership.\n\nCe modèle est conçu pour les organisations qui veulent un partenaire stratégique de confiance sans le coût d'une embauche exécutive à temps plein.",
      idealFor: language === "en" ? "Organizations seeking consistent access to senior strategic guidance, performance oversight, and leadership coaching." : "Organisations cherchant un accès constant à des conseils stratégiques de haut niveau, un suivi de la performance et du coaching de leadership.",
      icon: <Briefcase className="text-accent" />,
      pricingTiers: [
        {
          name: "Standard",
          price: "$2,500/mo",
          subtitle: language === "en"
            ? "Monthly strategy sessions with performance oversight and ongoing advisory."
            : "Sessions stratégiques mensuelles avec suivi de la performance et conseils continus.",
          features: language === "en"
            ? ["Monthly strategy session", "Performance oversight and reporting", "Ongoing advisory support", "Email and phone access", "Quarterly progress review"]
            : ["Session stratégique mensuelle", "Suivi et rapport de performance", "Soutien consultatif continu", "Accès par e-mail et téléphone", "Examen trimestriel des progrès"],
          stripeProductName: "Executive Advisory - Standard",
          isMonthly: true
        },
        {
          name: "Premium",
          price: "$5,000/mo",
          subtitle: language === "en"
            ? "Bi-weekly sessions with leadership coaching, team alignment, and hands-on project support."
            : "Sessions bimensuelles avec coaching de leadership, alignement d'équipe et soutien pratique aux projets.",
          features: language === "en"
            ? ["Everything in Standard", "Bi-weekly strategy sessions", "Leadership coaching", "Team alignment support", "Process improvement guidance", "Priority support"]
            : ["Tout dans Standard", "Sessions stratégiques bimensuelles", "Coaching de leadership", "Soutien à l'alignement d'équipe", "Conseils en amélioration des processus", "Support prioritaire"],
          stripeProductName: "Executive Advisory - Premium",
          isMonthly: true
        },
        {
          name: language === "en" ? "Executive" : "Exécutif",
          price: "$7,500/mo",
          subtitle: language === "en"
            ? "Weekly strategic sessions with dedicated senior consultant, full advisory, and leadership development."
            : "Sessions stratégiques hebdomadaires avec consultant senior dédié, conseil complet et développement du leadership.",
          features: language === "en"
            ? ["Everything in Premium", "Weekly strategy and operations sessions", "Dedicated senior consultant", "Full project management support", "Executive coaching and development", "Performance dashboards", "On-site support available", "24/7 priority access"]
            : ["Tout dans Premium", "Sessions stratégiques et opérationnelles hebdomadaires", "Consultant senior dédié", "Soutien complet en gestion de projet", "Coaching et développement exécutif", "Tableaux de bord de performance", "Support sur site disponible", "Accès prioritaire 24/7"],
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
        : "Nous gérons les complexités de l'enregistrement d'entreprise pour que vous puissiez vous concentrer sur la réalisation de votre vision.",
      learnMore: language === "en"
        ? "Starting a business involves more than just an idea — it requires proper legal structure, registration, and compliance. We guide you through the entire process, from choosing the right business structure to completing all government filings and obtaining your business number.\n\nOur team ensures your business is set up correctly from day one, with all corporate records, tax registrations, and governance documents in place."
        : "Démarrer une entreprise implique plus qu'une simple idée — cela nécessite une structure juridique appropriée, un enregistrement et une conformité. Nous vous guidons tout au long du processus, du choix de la bonne structure d'entreprise à la réalisation de toutes les déclarations gouvernementales et à l'obtention de votre numéro d'entreprise.\n\nNotre équipe s'assure que votre entreprise est correctement configurée dès le premier jour, avec tous les registres corporatifs, les inscriptions fiscales et les documents de gouvernance en place.",
      idealFor: language === "en" ? "Entrepreneurs, startups, and organizations establishing a new legal entity or restructuring an existing one." : "Entrepreneurs, startups et organisations établissant une nouvelle entité juridique ou restructurant une entité existante.",
      icon: <ClipboardList className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Starter" : "Démarrage",
          price: "$3,500",
          subtitle: language === "en"
            ? "Sole proprietorship or basic incorporation with name search and registration filing."
            : "Entreprise individuelle ou incorporation de base avec recherche de nom et dépôt d'enregistrement.",
          features: language === "en"
            ? ["Business structure consultation", "Name search and reservation", "Articles of incorporation filing", "Certificate of incorporation", "Initial registered agent setup"]
            : ["Consultation sur la structure d'entreprise", "Recherche et réservation de nom", "Dépôt des statuts constitutifs", "Certificat de constitution", "Configuration initiale de l'agent enregistré"],
          stripeProductName: "Business Registration - Starter"
        },
        {
          name: "Standard",
          price: "$5,500",
          subtitle: language === "en"
            ? "Full incorporation with corporate records, tax registration, and business number applications."
            : "Incorporation complète avec registres corporatifs, inscription fiscale et demandes de numéro d'entreprise.",
          features: language === "en"
            ? ["Everything in Starter", "Corporate records book setup", "CRA business number application", "HST/GST registration", "Initial corporate by-laws", "Organizational resolutions"]
            : ["Tout dans Démarrage", "Configuration du livre des registres corporatifs", "Demande de numéro d'entreprise à l'ARC", "Inscription à la TPS/TVH", "Règlements administratifs initiaux", "Résolutions organisationnelles"],
          stripeProductName: "Business Registration - Standard"
        },
        {
          name: language === "en" ? "Comprehensive" : "Complet",
          price: "$8,500",
          subtitle: language === "en"
            ? "Complete setup with governance documents, shareholder agreements, and compliance framework."
            : "Configuration complète avec documents de gouvernance, conventions d'actionnaires et cadre de conformité.",
          features: language === "en"
            ? ["Everything in Standard", "Shareholder agreement drafting", "Governance framework setup", "Compliance checklist and calendar", "Provincial and federal registrations", "Post-incorporation advisory session", "90-day support period"]
            : ["Tout dans Standard", "Rédaction de la convention d'actionnaires", "Mise en place du cadre de gouvernance", "Liste de contrôle et calendrier de conformité", "Enregistrements provinciaux et fédéraux", "Session de conseil post-incorporation", "Période de soutien de 90 jours"],
          stripeProductName: "Business Registration - Comprehensive"
        }
      ]
    },
    {
      title: language === "en" ? "Website Building & Marketing" : "Création de sites Web et marketing",
      investment: language === "en" ? "From $1,200" : "À partir de 1 200 $",
      desc: language === "en"
        ? "Build a strong digital presence that attracts and converts clients."
        : "Créez une forte présence numérique qui attire et convertit les clients.",
      learnMore: language === "en"
        ? "Your digital presence is often the first impression. We build performance-driven websites and execute targeted marketing strategies that align with your business goals."
        : "Votre présence numérique est souvent la première impression. Nous créons des sites Web axés sur la performance et exécutons des stratégies de marketing ciblées alignées sur vos objectifs commerciaux.",
      idealFor: language === "en" ? "Organizations seeking to establish or upgrade their digital presence and drive growth." : "Organisations cherchant à établir ou à améliorer leur présence numérique et à stimuler la croissance.",
      icon: <Globe className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Basic Website" : "Site Web de base",
          price: "$1,200",
          subtitle: language === "en"
            ? "Ideal for small businesses, personal portfolios, nonprofits, and simple informational sites."
            : "Idéal pour les petites entreprises, les portfolios personnels, les organismes à but non lucratif et les sites d'information simples.",
          features: language === "en"
            ? ["Up to 5 pages", "Responsive design (mobile + desktop)", "Contact form", "Basic SEO setup", "CMS (optional)"]
            : ["Jusqu'à 5 pages", "Design responsive (mobile + bureau)", "Formulaire de contact", "Configuration SEO de base", "CMS (optionnel)"],
          stripeProductName: "Basic Website"
        },
        {
          name: language === "en" ? "Standard Business Website" : "Site Web d'entreprise standard",
          price: "$3,000",
          subtitle: language === "en"
            ? "Perfect for established organizations that need a stronger online presence."
            : "Parfait pour les organisations établies qui ont besoin d'une présence en ligne plus forte.",
          features: language === "en"
            ? ["6–12 pages", "Custom page layouts", "Brand-aligned visuals", "Blog or resource section", "Basic performance optimization", "CMS with editor training"]
            : ["6 à 12 pages", "Mises en page personnalisées", "Visuels alignés sur la marque", "Section blog ou ressources", "Optimisation de base des performances", "CMS avec formation éditeur"],
          stripeProductName: "Standard Business Website"
        },
        {
          name: language === "en" ? "Advanced / Growth Website" : "Site Web avancé / croissance",
          price: "$6,000",
          subtitle: language === "en"
            ? "For organizations needing advanced functionality and strategic design."
            : "Pour les organisations ayant besoin de fonctionnalités avancées et d'un design stratégique.",
          features: language === "en"
            ? ["12–20+ pages", "Custom UX/UI design", "Client portals or gated content", "Newsletter integration", "Analytics setup", "Lead capture systems"]
            : ["12 à 20+ pages", "Design UX/UI personnalisé", "Portails clients ou contenu protégé", "Intégration newsletter", "Configuration des analyses", "Systèmes de capture de leads"],
          stripeProductName: "Advanced / Growth Website"
        },
        {
          name: language === "en" ? "Premium / Enterprise Website" : "Site Web premium / entreprise",
          price: "$12,000",
          subtitle: language === "en"
            ? "For high-impact brands, nonprofits with large programs, or businesses with complex needs."
            : "Pour les marques à fort impact, les organismes à but non lucratif avec de grands programmes ou les entreprises aux besoins complexes.",
          features: language === "en"
            ? ["Fully custom design", "Multi-language support", "Advanced integrations (CRM, donations, payments, AI tools)", "API connections", "Ongoing support & maintenance"]
            : ["Design entièrement personnalisé", "Support multilingue", "Intégrations avancées (CRM, dons, paiements, outils IA)", "Connexions API", "Support et maintenance continus"],
          stripeProductName: "Premium / Enterprise Website"
        },
        {
          name: language === "en" ? "Ongoing Management" : "Gestion continue",
          price: "$780/mo",
          subtitle: language === "en"
            ? "Monthly website management, updates, security, and ongoing development support."
            : "Gestion mensuelle du site Web, mises à jour, sécurité et soutien continu au développement.",
          features: language === "en"
            ? ["Monthly content updates", "Security monitoring & patches", "Performance optimization", "Ongoing development & enhancements", "Priority support", "Monthly analytics reports"]
            : ["Mises à jour mensuelles du contenu", "Surveillance et correctifs de sécurité", "Optimisation des performances", "Développement et améliorations continus", "Support prioritaire", "Rapports d'analyse mensuels"],
          stripeProductName: "Ongoing Website Management",
          isMonthly: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{language === "en" ? "Consulting services to" : "Services de conseil pour"} <br /> <span className="text-accent">{language === "en" ? "propel your business" : "propulser votre entreprise"}</span></>}
          subtitle={language === "en" 
            ? "We provide practical, hands-on support to help you solve your most pressing business challenges."
            : "Nous fournissons un soutien pratique et concret pour vous aider à résoudre vos défis commerciaux les plus pressants."}
        />

        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div 
                  key={i} 
                  className="bg-white p-10 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[350px]"
                  onClick={() => setSelectedService(s)}
                  data-testid={`card-service-${i}`}
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
                    <div className={`grid grid-cols-1 ${selectedService.pricingTiers.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : selectedService.pricingTiers.length >= 5 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} gap-4`}>
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
                  ? "Every engagement begins with our Discovery Phase. Book a consultation to explore how we can help your organization achieve measurable results."
                  : "Chaque engagement commence par notre phase de découverte. Réservez une consultation pour explorer comment nous pouvons aider votre organisation à obtenir des résultats mesurables."}
              </p>
            </div>
            <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-12 text-lg font-bold uppercase tracking-widest transition-all" data-testid="button-book-consultation-cta">
                {language === "en" ? "Book a consultation" : "Réservez une consultation"}
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
