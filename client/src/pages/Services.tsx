import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck, FileText, Settings, Info, Globe, CreditCard, Loader2, LifeBuoy, RefreshCw } from "lucide-react";
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
      title: language === "en" ? "Strategic Planning & Alignment" : "Planification et alignement stratégiques",
      investment: language === "en" ? "$7,500 – $25,000+" : "7 500 $ – 25 000 $+",
      investmentNote: language === "en" ? "(Based on 1–3 day workshops, stakeholder interviews, and roadmap development)" : "(Basé sur des ateliers de 1 à 3 jours, des entretiens avec les parties prenantes et l'élaboration d'une feuille de route)",
      desc: language === "en" 
        ? "We help organizations define clear strategic direction and translate vision into measurable priorities."
        : "Nous aidons les organisations à définir une orientation stratégique claire et à traduire la vision en priorités mesurables.",
      learnMore: language === "en"
        ? "Many strategies fail not because they lack ambition, but because they lack alignment and execution clarity.\n\nOur process ensures leadership alignment, defined success metrics, and a practical roadmap that connects goals to operational execution."
        : "De nombreuses stratégies échouent non pas par manque d'ambition, mais par manque d'alignement et de clarté d'exécution.\n\nNotre processus garantit l'alignement des dirigeants, des indicateurs de réussite définis et une feuille de route pratique qui relie les objectifs à l'exécution opérationnelle.",
      idealFor: language === "en" ? "Organizations preparing for growth, restructuring, funding, or transformation." : "Organisations se préparant à la croissance, à la restructuration, au financement ou à la transformation.",
      icon: <TrendingUp className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Essentials" : "Essentiel",
          price: "$7,500",
          subtitle: language === "en"
            ? "Half-day leadership workshop with vision refinement and basic strategic roadmap."
            : "Atelier de leadership d'une demi-journée avec affinement de la vision et feuille de route stratégique de base.",
          features: language === "en"
            ? ["Vision and mission refinement", "Basic environmental analysis", "Strategic objective development", "Half-day leadership workshop"]
            : ["Affinement de la vision et de la mission", "Analyse environnementale de base", "Développement d'objectifs stratégiques", "Atelier de leadership d'une demi-journée"],
          stripeProductName: "Strategic Planning - Essentials"
        },
        {
          name: "Standard",
          price: "$15,000",
          subtitle: language === "en"
            ? "Multi-day engagement with stakeholder analysis, KPI design, and 1-year roadmap."
            : "Engagement de plusieurs jours avec analyse des parties prenantes, conception de KPI et feuille de route d'un an.",
          features: language === "en"
            ? ["Everything in Essentials", "Stakeholder analysis", "KPI and success metric design", "1-year strategic roadmap", "Leadership alignment workshops"]
            : ["Tout dans Essentiel", "Analyse des parties prenantes", "Conception de KPI et d'indicateurs de réussite", "Feuille de route stratégique d'un an", "Ateliers d'alignement des dirigeants"],
          stripeProductName: "Strategic Planning - Standard"
        },
        {
          name: language === "en" ? "Comprehensive" : "Complet",
          price: "$25,000",
          subtitle: language === "en"
            ? "Full transformation package with leadership alignment workshops, 3-year roadmap, and ongoing support."
            : "Programme de transformation complet avec ateliers d'alignement des dirigeants, feuille de route de 3 ans et soutien continu.",
          features: language === "en"
            ? ["Everything in Standard", "3-year strategic roadmap", "Environmental and stakeholder deep-dive", "Ongoing implementation support", "Quarterly review sessions"]
            : ["Tout dans Standard", "Feuille de route stratégique de 3 ans", "Analyse approfondie de l'environnement et des parties prenantes", "Soutien continu à la mise en œuvre", "Sessions de révision trimestrielles"],
          stripeProductName: "Strategic Planning - Comprehensive"
        }
      ]
    },
    {
      title: language === "en" ? "Organizational Assessment" : "Évaluation organisationnelle",
      investment: language === "en" ? "$5,000 – $18,000+" : "5 000 $ – 18 000 $+",
      desc: language === "en" 
        ? "Before improvement comes clarity. Our organizational assessment identifies structural gaps and performance barriers."
        : "Avant l'amélioration vient la clarté. Notre évaluation organisationnelle identifie les lacunes structurelles et les obstacles à la performance.",
      learnMore: language === "en"
        ? "We provide a data-driven diagnostic that highlights what is working, what is misaligned, and where focused improvements will create measurable impact."
        : "Nous fournissons un diagnostic basé sur les données qui met en évidence ce qui fonctionne, ce qui est mal aligné et où des améliorations ciblées créeront un impact mesurable.",
      idealFor: language === "en" ? "Organizations experiencing performance stagnation, growth challenges, or internal inefficiencies." : "Organisations connaissant une stagnation des performances, des défis de croissance ou des inefficacités internes.",
      icon: <Users className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Focused" : "Ciblé",
          price: "$5,000",
          subtitle: language === "en"
            ? "Targeted assessment covering leadership interviews and structure review."
            : "Évaluation ciblée couvrant les entretiens avec les dirigeants et l'examen de la structure.",
          features: language === "en"
            ? ["Leadership interviews", "Organizational structure review", "Summary findings report"]
            : ["Entretiens avec les dirigeants", "Examen de la structure organisationnelle", "Rapport de synthèse des conclusions"],
          stripeProductName: "Organizational Assessment - Focused"
        },
        {
          name: "Standard",
          price: "$10,000",
          subtitle: language === "en"
            ? "Full assessment with culture, capability, and performance review."
            : "Évaluation complète avec examen de la culture, des capacités et des performances.",
          features: language === "en"
            ? ["Everything in Focused", "Culture and capability assessment", "Process and performance review", "Comprehensive findings report"]
            : ["Tout dans Ciblé", "Évaluation de la culture et des capacités", "Examen des processus et des performances", "Rapport complet de conclusions"],
          stripeProductName: "Organizational Assessment - Standard"
        },
        {
          name: language === "en" ? "Comprehensive" : "Complet",
          price: "$18,000",
          subtitle: language === "en"
            ? "Deep-dive with governance analysis, risk review, and comprehensive findings report."
            : "Analyse approfondie avec analyse de la gouvernance, examen des risques et rapport complet.",
          features: language === "en"
            ? ["Everything in Standard", "Risk and governance analysis", "Benchmarking analysis", "Strategic recommendations roadmap", "Executive presentation"]
            : ["Tout dans Standard", "Analyse des risques et de la gouvernance", "Analyse comparative", "Feuille de route de recommandations stratégiques", "Présentation exécutive"],
          stripeProductName: "Organizational Assessment - Comprehensive"
        }
      ]
    },
    {
      title: language === "en" ? "Performance Management Design" : "Conception de la gestion de la performance",
      investment: language === "en" ? "$6,000 – $20,000+" : "6 000 $ – 20 000 $+",
      desc: language === "en" 
        ? "We design performance systems that connect strategy to accountability."
        : "Nous concevons des systèmes de performance qui relient la stratégie à la responsabilité.",
      learnMore: language === "en"
        ? "Without measurable indicators and clear ownership, strategy remains theoretical. Our performance management frameworks create visibility, ownership, and structured review processes that drive results."
        : "Sans indicateurs mesurables et une appropriation claire, la stratégie reste théorique. Nos cadres de gestion de la performance créent de la visibilité, de l'appropriation et des processus d'examen structurés qui génèrent des résultats.",
      idealFor: language === "en" ? "Organizations seeking measurable performance, improved accountability, and strategic execution discipline." : "Organisations recherchant une performance mesurable, une responsabilité accrue et une discipline d'exécution stratégique.",
      icon: <Settings className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Foundation" : "Fondation",
          price: "$6,000",
          subtitle: language === "en"
            ? "KPI framework development and basic accountability structures."
            : "Développement d'un cadre de KPI et structures de responsabilité de base.",
          features: language === "en"
            ? ["KPI framework development", "Role-based accountability structures", "Basic performance review templates"]
            : ["Développement d'un cadre de KPI", "Structures de responsabilité basées sur les rôles", "Modèles de base d'examen des performances"],
          stripeProductName: "Performance Management - Foundation"
        },
        {
          name: "Standard",
          price: "$12,000",
          subtitle: language === "en"
            ? "Full system design with balanced scorecard, review templates, and role-based structures."
            : "Conception complète du système avec tableau de bord prospectif, modèles d'examen et structures basées sur les rôles.",
          features: language === "en"
            ? ["Everything in Foundation", "Balanced scorecard design", "Detailed performance review templates", "Team and departmental KPIs"]
            : ["Tout dans Fondation", "Conception d'un tableau de bord prospectif", "Modèles détaillés d'examen des performances", "KPI d'équipe et de département"],
          stripeProductName: "Performance Management - Standard"
        },
        {
          name: "Enterprise",
          price: "$20,000",
          subtitle: language === "en"
            ? "Complete package with reporting dashboards, implementation support, and ongoing guidance."
            : "Pack complet avec tableaux de bord de rapport, soutien à la mise en œuvre et accompagnement continu.",
          features: language === "en"
            ? ["Everything in Standard", "Reporting dashboards", "Full implementation support", "Ongoing guidance and review sessions", "Executive coaching integration"]
            : ["Tout dans Standard", "Tableaux de bord de rapport", "Soutien complet à la mise en œuvre", "Accompagnement et sessions de révision continues", "Intégration du coaching exécutif"],
          stripeProductName: "Performance Management - Enterprise"
        }
      ]
    },
    {
      title: language === "en" ? "Leadership Development" : "Développement du leadership",
      investment: language === "en" ? "$3,500 – $15,000+" : "3 500 $ – 15 000 $+",
      investmentNote: language === "en" ? "(Workshops and cohort programs) | Executive Coaching available" : "(Ateliers et programmes de cohorte) | Coaching exécutif disponible",
      desc: language === "en" 
        ? "Strong strategy requires strong leadership. We equip leaders with clarity and confidence."
        : "Une stratégie solide nécessite un leadership fort. Nous dotons les dirigeants de clarté et de confiance.",
      learnMore: language === "en"
        ? "Our leadership development programs focus on practical capability building, not theoretical training."
        : "Nos programmes de développement du leadership se concentrent sur le renforcement des capacités pratiques, et non sur une formation théorique.",
      idealFor: language === "en" ? "Growing organizations, new leadership teams, or leaders navigating change." : "Organisations en croissance, nouvelles équipes de direction ou dirigeants naviguant dans le changement.",
      icon: <ShieldCheck className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Workshop" : "Atelier",
          price: "$3,500",
          subtitle: language === "en"
            ? "Single-day leadership workshop with competency assessment."
            : "Atelier de leadership d'une journée avec évaluation des compétences.",
          features: language === "en"
            ? ["Leadership competency assessment", "Full-day workshop", "Action plan development"]
            : ["Évaluation des compétences de leadership", "Atelier d'une journée complète", "Développement d'un plan d'action"],
          stripeProductName: "Leadership Development - Workshop"
        },
        {
          name: language === "en" ? "Program" : "Programme",
          price: "$8,000",
          subtitle: language === "en"
            ? "Multi-session program with team alignment and management workshops."
            : "Programme multi-sessions avec alignement d'équipe et ateliers de gestion.",
          features: language === "en"
            ? ["Everything in Workshop", "Executive and management workshops", "Team alignment sessions", "Accountability training"]
            : ["Tout dans Atelier", "Ateliers pour cadres et gestionnaires", "Sessions d'alignement d'équipe", "Formation à la responsabilité"],
          stripeProductName: "Leadership Development - Program"
        },
        {
          name: language === "en" ? "Executive" : "Exécutif",
          price: "$15,000",
          subtitle: language === "en"
            ? "Full coaching program with one-on-one executive coaching and accountability training."
            : "Programme complet de coaching avec coaching exécutif individuel et formation à la responsabilité.",
          features: language === "en"
            ? ["Everything in Program", "One-on-one executive coaching", "Personalized development plan", "Monthly progress reviews", "Extended support period"]
            : ["Tout dans Programme", "Coaching exécutif individuel", "Plan de développement personnalisé", "Révisions mensuelles de progrès", "Période de soutien prolongée"],
          stripeProductName: "Leadership Development - Executive"
        }
      ]
    },
    {
      title: language === "en" ? "Process Improvement" : "Amélioration des processus",
      investment: language === "en" ? "$4,000 – $15,000+" : "4 000 $ – 15 000 $+",
      desc: language === "en" 
        ? "Scalable organizations require documented, efficient processes."
        : "Les organisations évolutives nécessitent des processus documentés et efficaces.",
      learnMore: language === "en"
        ? "We help streamline operations, eliminate inefficiencies, and create structured systems that support consistency and growth."
        : "Nous aidons à simplifier les opérations, à éliminer les inefficacités et à créer des systèmes structurés qui favorisent la cohérence et la croissance.",
      idealFor: language === "en" ? "Organizations preparing to scale or improve operational consistency." : "Organisations se préparant à passer à l'échelle ou à améliorer la cohérence opérationnelle.",
      icon: <FileText className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Essentials" : "Essentiel",
          price: "$4,000",
          subtitle: language === "en"
            ? "Process mapping sessions and basic workflow analysis."
            : "Sessions de cartographie des processus et analyse de base des flux de travail.",
          features: language === "en"
            ? ["Process mapping sessions", "Basic workflow analysis", "Key findings report"]
            : ["Sessions de cartographie des processus", "Analyse de base des flux de travail", "Rapport des principales conclusions"],
          stripeProductName: "Process Improvement - Essentials"
        },
        {
          name: "Standard",
          price: "$8,000",
          subtitle: language === "en"
            ? "Full workflow analysis with SOP development and role clarity frameworks."
            : "Analyse complète des flux de travail avec développement de procédures et cadres de clarté des rôles.",
          features: language === "en"
            ? ["Everything in Essentials", "SOP development", "Role clarity frameworks", "Detailed workflow documentation"]
            : ["Tout dans Essentiel", "Développement de procédures opérationnelles normalisées", "Cadres de clarté des rôles", "Documentation détaillée des flux de travail"],
          stripeProductName: "Process Improvement - Standard"
        },
        {
          name: language === "en" ? "Comprehensive" : "Complet",
          price: "$15,000",
          subtitle: language === "en"
            ? "Complete systems overhaul with operational efficiency recommendations and implementation."
            : "Refonte complète des systèmes avec recommandations d'efficacité opérationnelle et mise en œuvre.",
          features: language === "en"
            ? ["Everything in Standard", "Operational efficiency recommendations", "Implementation support", "Change management integration", "Follow-up reviews"]
            : ["Tout dans Standard", "Recommandations d'efficacité opérationnelle", "Soutien à la mise en œuvre", "Intégration de la gestion du changement", "Révisions de suivi"],
          stripeProductName: "Process Improvement - Comprehensive"
        }
      ]
    },
    {
      title: language === "en" ? "Change Management Support" : "Soutien à la gestion du changement",
      investment: language === "en" ? "$5,000 – $20,000+" : "5 000 $ – 20 000 $+",
      desc: language === "en" 
        ? "Change fails when people are not aligned. We support organizations through transitions."
        : "Le changement échoue lorsque les personnes ne sont pas alignées. Nous soutenons les organisations à travers les transitions.",
      learnMore: language === "en"
        ? "We support organizations through transitions with structured change frameworks that prioritize communication, stakeholder engagement, and adoption."
        : "Nous soutenons les organisations dans leurs transitions grâce à des cadres de changement structurés qui privilégient la communication, l'engagement des parties prenantes et l'adoption.",
      idealFor: language === "en" ? "Organizations undergoing restructuring, digital transformation, or strategic shifts." : "Organisations subissant une restructuration, une transformation numérique ou des changements stratégiques.",
      icon: <CheckCircle2 className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Foundation" : "Fondation",
          price: "$5,000",
          subtitle: language === "en"
            ? "Change readiness assessment and stakeholder mapping."
            : "Évaluation de l'état de préparation au changement et cartographie des parties prenantes.",
          features: language === "en"
            ? ["Change readiness assessment", "Stakeholder mapping", "Initial change strategy outline"]
            : ["Évaluation de l'état de préparation au changement", "Cartographie des parties prenantes", "Esquisse initiale de la stratégie de changement"],
          stripeProductName: "Change Management - Foundation"
        },
        {
          name: "Standard",
          price: "$12,000",
          subtitle: language === "en"
            ? "Full change strategy design with communication plan and stakeholder engagement."
            : "Conception complète de la stratégie de changement avec plan de communication et engagement des parties prenantes.",
          features: language === "en"
            ? ["Everything in Foundation", "Change strategy design", "Communication plan development", "Stakeholder engagement sessions"]
            : ["Tout dans Fondation", "Conception de la stratégie de changement", "Développement du plan de communication", "Sessions d'engagement des parties prenantes"],
          stripeProductName: "Change Management - Standard"
        },
        {
          name: "Enterprise",
          price: "$20,000",
          subtitle: language === "en"
            ? "Complete implementation with coaching, adoption tracking, and ongoing support."
            : "Mise en œuvre complète avec coaching, suivi de l'adoption et soutien continu.",
          features: language === "en"
            ? ["Everything in Standard", "Implementation coaching", "Adoption tracking and metrics", "Ongoing support and reviews", "Leadership change coaching"]
            : ["Tout dans Standard", "Coaching de mise en œuvre", "Suivi et métriques d'adoption", "Soutien et révisions continues", "Coaching de changement pour les dirigeants"],
          stripeProductName: "Change Management - Enterprise"
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
    },
    {
      title: language === "en" ? "Ongoing Business Support" : "Soutien continu aux entreprises",
      investment: language === "en" ? "$650 – $7,680/mo" : "650 $ – 7 680 $/mois",
      investmentNote: language === "en" ? "(Monthly retainer plans)" : "(Plans de rétention mensuels)",
      desc: language === "en"
        ? "Continuous expert support to keep your organization performing at its best."
        : "Un soutien expert continu pour que votre organisation fonctionne au mieux.",
      learnMore: language === "en"
        ? "Growth doesn't stop after a project ends. Our ongoing support plans provide dedicated consulting hours, strategic check-ins, and hands-on assistance to help you maintain momentum, adapt to change, and continuously improve.\n\nWhether you need a few hours of expert guidance each month or a full embedded support team, we have a plan to match your needs."
        : "La croissance ne s'arrête pas à la fin d'un projet. Nos plans de soutien continu offrent des heures de consultation dédiées, des vérifications stratégiques et une assistance pratique pour vous aider à maintenir l'élan, à vous adapter au changement et à vous améliorer continuellement.\n\nQue vous ayez besoin de quelques heures de conseils d'experts chaque mois ou d'une équipe de soutien intégrée complète, nous avons un plan adapté à vos besoins.",
      idealFor: language === "en" ? "Organizations that want consistent access to expert guidance without the cost of full-time hires." : "Organisations qui souhaitent un accès constant à des conseils d'experts sans le coût d'embauches à temps plein.",
      icon: <LifeBuoy className="text-accent" />,
      pricingTiers: [
        {
          name: language === "en" ? "Essential Support" : "Soutien essentiel",
          price: "$650/mo",
          subtitle: language === "en"
            ? "Ideal for small businesses needing periodic expert guidance and check-ins."
            : "Idéal pour les petites entreprises ayant besoin de conseils d'experts périodiques.",
          features: language === "en"
            ? ["5 consulting hours per month", "Monthly strategic check-in call", "Email support (48h response)", "Quarterly progress review"]
            : ["5 heures de consultation par mois", "Appel de vérification stratégique mensuel", "Support par e-mail (réponse en 48h)", "Examen trimestriel des progrès"],
          stripeProductName: "Business Support - Essential",
          isMonthly: true
        },
        {
          name: language === "en" ? "Professional Support" : "Soutien professionnel",
          price: "$2,880/mo",
          subtitle: language === "en"
            ? "For growing organizations that need regular hands-on consulting and project support."
            : "Pour les organisations en croissance qui ont besoin de conseils pratiques réguliers et d'un soutien de projet.",
          features: language === "en"
            ? ["15 consulting hours per month", "Bi-weekly strategy sessions", "Priority email & phone support", "Process improvement guidance", "Performance tracking support", "Monthly executive briefing"]
            : ["15 heures de consultation par mois", "Sessions stratégiques bimensuelles", "Support prioritaire par e-mail et téléphone", "Conseils en amélioration des processus", "Soutien au suivi des performances", "Briefing exécutif mensuel"],
          stripeProductName: "Business Support - Professional",
          isMonthly: true
        },
        {
          name: language === "en" ? "Enterprise Support" : "Soutien entreprise",
          price: "$7,680/mo",
          subtitle: language === "en"
            ? "Full embedded support for organizations undergoing transformation or rapid growth."
            : "Soutien intégré complet pour les organisations en transformation ou en croissance rapide.",
          features: language === "en"
            ? ["40 consulting hours per month", "Weekly strategy and operations sessions", "Dedicated senior consultant", "On-site support available", "Full project management support", "Real-time performance dashboards", "Leadership coaching included", "24/7 priority support"]
            : ["40 heures de consultation par mois", "Sessions stratégiques et opérationnelles hebdomadaires", "Consultant senior dédié", "Support sur site disponible", "Soutien complet en gestion de projet", "Tableaux de bord de performance en temps réel", "Coaching de leadership inclus", "Support prioritaire 24/7"],
          stripeProductName: "Business Support - Enterprise",
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
                  ? "Book a free 30-minute discovery call with one of our expert consultants to discuss your goals and how we can help."
                  : "Réservez un appel de découverte gratuit de 30 minutes avec l'un de nos consultants experts pour discuter de vos objectifs et de la façon dont nous pouvons vous aider."}
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
