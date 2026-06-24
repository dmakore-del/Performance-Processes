import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import leadershipPresentationImg from "@assets/generated/leadership-presentation-new.png";
import teamStrategyImg from "@assets/generated/team-strategy-new.png";
import websiteDevelopmentImg from "@assets/generated/website-development.png";
import personalBrandImg from "@assets/generated/personal-brand.png";
import analyticsImg from "@assets/generated/analytics-dashboard-new.png";
import growthChartImg from "@assets/generated/growth-chart.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface PricingTier {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  stripeProductName: string;
  isMonthly?: boolean;
}

interface ServiceEntry {
  title: string;
  investment: string;
  investmentNote?: string;
  desc: string;
  benefits: string[];
  learnMore: string;
  idealFor: string;
  image: string;
  icon?: React.ReactNode;
  pricingTiers: PricingTier[];
}

interface StripeProduct {
  product_name: string;
  price_id: string;
}

export default function Marketing() {
  const [selectedService, setSelectedService] = useState<ServiceEntry | null>(null);
  const [payingProduct, setPayingProduct] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"enterprise" | "business" | "professional">("enterprise");
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
      window.history.replaceState({}, "", "/marketing");
    } else if (payment === "cancelled") {
      toast({
        title: language === "en" ? "Payment cancelled" : "Paiement annulé",
        description: language === "en" ? "Your payment was not completed." : "Votre paiement n'a pas été complété.",
        variant: "destructive",
      });
      window.history.replaceState({}, "", "/marketing");
    }
  }, []);

  const { data: productsData } = useQuery<{ data: StripeProduct[] }>({
    queryKey: ["/api/products"],
  });

  const checkoutMutation = useMutation({
    mutationFn: async ({ priceId, serviceName }: { priceId: string; serviceName: string }) => {
      const res = await apiRequest("POST", "/api/checkout", { priceId, serviceName, returnPage: "/marketing" });
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
      title: language === "en" ? "Discover" : "Découvrir",
      desc: language === "en" ? "We learn about your brand, your audience, and your goals to build a digital strategy that reflects who you really are." : "Nous découvrons votre marque, votre audience et vos objectifs pour construire une stratégie numérique qui vous reflète.",
      outcomes: language === "en" ? ["Brand & audience analysis", "Competitive landscape review", "Goal definition & alignment", "Strategy roadmap"] : ["Analyse de marque et audience", "Revue concurrentielle", "Définition des objectifs", "Feuille de route stratégique"],
      icon: <span aria-hidden="true" className="text-accent text-2xl font-black">01</span>,
      color: "from-zinc-700/10 to-zinc-800/5",
    },
    {
      step: "02",
      title: language === "en" ? "Design" : "Concevoir",
      desc: language === "en" ? "We craft your visual identity and digital assets with intention, every pixel and word designed to build trust and attract the right people." : "Nous créons votre identité visuelle et vos actifs numériques avec intention, chaque élément conçu pour bâtir la confiance.",
      outcomes: language === "en" ? ["Visual identity creation", "Website wireframing", "Content strategy", "User experience design"] : ["Création d'identité visuelle", "Maquettes de site", "Stratégie de contenu", "Design UX"],
      icon: <span aria-hidden="true" className="text-accent text-2xl font-black">02</span>,
      color: "from-accent/10 to-accent/5",
    },
    {
      step: "03",
      title: language === "en" ? "Build" : "Construire",
      desc: language === "en" ? "We develop your website and marketing assets with care, ensuring everything works seamlessly across devices and platforms." : "Nous développons votre site Web et vos actifs marketing avec soin, assurant un fonctionnement optimal sur tous les appareils.",
      outcomes: language === "en" ? ["Responsive website development", "SEO implementation", "Content creation", "Analytics integration"] : ["Développement Web responsive", "Implémentation SEO", "Création de contenu", "Intégration analytique"],
      icon: <span aria-hidden="true" className="text-accent text-2xl font-black">03</span>,
      color: "from-emerald-500/10 to-emerald-600/5",
    },
    {
      step: "04",
      title: language === "en" ? "Grow" : "Croître",
      desc: language === "en" ? "We launch, optimize, and support your digital presence so it keeps working for you long after the project is done." : "Nous lançons, optimisons et supportons votre présence numérique pour qu'elle continue à travailler pour vous.",
      outcomes: language === "en" ? ["Launch & quality assurance", "Performance monitoring", "Conversion optimization", "Ongoing support"] : ["Lancement et assurance qualité", "Suivi de performance", "Optimisation de conversion", "Support continu"],
      icon: <span aria-hidden="true" className="text-accent text-2xl font-black">04</span>,
      color: "from-zinc-700/10 to-zinc-800/5",
    },
  ];

  const serviceTiers = {
    enterprise: {
      label: language === "en" ? "Enterprise" : "Entreprise",
      tagline: language === "en" ? "For organizations that need a professional digital presence and strategic marketing infrastructure" : "Pour les organisations qui ont besoin d'une présence numérique professionnelle et d'une infrastructure marketing stratégique",
      icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span>,
      services: [
        {
          title: language === "en" ? "Website & Digital Presence" : "Site Web et présence numérique",
          investment: "$3,000 , $12,000",
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
          title: language === "en" ? "Content Marketing Strategy" : "Stratégie de marketing de contenu",
          investment: "$3,000 , $8,000",
          desc: language === "en"
            ? "Great content does more than fill a page, it positions you as a thought leader and drives the right people to your door. We build content strategies that work."
            : "Un excellent contenu fait plus que remplir une page, il vous positionne en leader d'opinion et attire les bonnes personnes vers vous.",
          benefits: language === "en"
            ? ["Content audit & gap analysis", "Editorial calendar development", "SEO-driven content planning", "Thought leadership positioning"]
            : ["Audit de contenu", "Calendrier éditorial", "Planification SEO", "Positionnement de leadership d'opinion"],
          learnMore: language === "en"
            ? "Content marketing is how modern businesses build trust, attract clients, and establish authority in their market. Our Content Marketing Strategy engagements give you a clear, actionable plan for creating content that resonates with your audience and drives measurable results.\n\nWe audit your existing content, identify gaps and opportunities, develop an editorial calendar, and create a distribution strategy that puts your expertise in front of the right people."
            : "Le marketing de contenu est la façon dont les entreprises modernes bâtissent la confiance et attirent des clients. Nous vous donnons un plan clair et actionnable.",
          idealFor: language === "en" ? "Organizations looking to build thought leadership, improve organic traffic, and create a sustainable content engine." : "Organisations cherchant à bâtir un leadership d'opinion et améliorer le trafic organique.",
          image: analyticsImg,
          pricingTiers: [
            {
              name: language === "en" ? "Foundation" : "Fondation",
              price: "$3,000",
              subtitle: language === "en" ? "Content audit with baseline strategy, editorial calendar, and keyword research." : "Audit de contenu avec stratégie de base et calendrier éditorial.",
              features: language === "en"
                ? ["Content audit and gap analysis", "Keyword and topic research", "3-month editorial calendar", "Content pillar framework", "Competitor content analysis", "Distribution channel recommendations"]
                : ["Audit de contenu", "Recherche de mots-clés", "Calendrier éditorial de 3 mois", "Cadre de piliers de contenu", "Analyse concurrentielle", "Recommandations de distribution"],
              stripeProductName: "Content Strategy - Foundation"
            },
            {
              name: "Standard",
              price: "$5,000",
              subtitle: language === "en" ? "Full content strategy with thought leadership positioning and 6-month plan." : "Stratégie de contenu complète avec positionnement et plan de 6 mois.",
              features: language === "en"
                ? ["Everything in Foundation", "6-month editorial calendar", "Thought leadership positioning", "Blog and article templates", "Social media content plan", "Email marketing integration", "Monthly content performance reviews"]
                : ["Tout dans Fondation", "Calendrier de 6 mois", "Positionnement d'opinion", "Modèles de blog", "Plan réseaux sociaux", "Intégration e-mail", "Revues mensuelles"],
              stripeProductName: "Content Strategy - Standard"
            },
            {
              name: "Premium",
              price: "$8,000",
              subtitle: language === "en" ? "Complete content marketing infrastructure with creation support and ongoing optimization." : "Infrastructure de marketing de contenu complète avec création et optimisation.",
              features: language === "en"
                ? ["Everything in Standard", "12-month content roadmap", "Content creation guidelines and templates", "Video content strategy", "Lead magnet development", "Conversion funnel design", "Quarterly strategy reviews", "3 months post-launch optimization support"]
                : ["Tout dans Standard", "Feuille de route de 12 mois", "Guides de création", "Stratégie vidéo", "Développement de lead magnets", "Design de tunnel de conversion", "Revues trimestrielles", "3 mois de support"],
              stripeProductName: "Content Strategy - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "Brand Identity & Positioning" : "Identité de marque et positionnement",
          investment: "$4,000 , $10,000",
          desc: language === "en"
            ? "Your brand is more than a logo, it's the feeling people get when they interact with your business. We help you define and express who you are with clarity and consistency."
            : "Votre marque est plus qu'un logo, c'est le sentiment que les gens ressentent lorsqu'ils interagissent avec votre entreprise. Nous vous aidons à vous exprimer avec clarté.",
          benefits: language === "en"
            ? ["Brand strategy & positioning", "Visual identity design", "Brand guidelines", "Messaging framework"]
            : ["Stratégie de marque", "Design d'identité visuelle", "Charte graphique", "Cadre de messagerie"],
          learnMore: language === "en"
            ? "A strong brand is the foundation of every successful marketing effort. Our Brand Identity & Positioning service helps you define who you are, what you stand for, and how you want to be perceived in the market.\n\nWe develop your brand strategy, create your visual identity (logo, colors, typography), build comprehensive brand guidelines, and craft a messaging framework that ensures consistency across every touchpoint."
            : "Une marque forte est le fondement de tout effort marketing réussi. Nous vous aidons à définir qui vous êtes et comment vous voulez être perçu.",
          idealFor: language === "en" ? "Organizations launching, rebranding, or needing consistent brand expression across all channels." : "Organisations en lancement, rebranding ou cherchant une expression de marque cohérente.",
          image: growthChartImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essential" : "Essentiel",
              price: "$4,000",
              subtitle: language === "en" ? "Core brand identity with logo, color palette, and basic guidelines." : "Identité de marque de base avec logo et charte graphique.",
              features: language === "en"
                ? ["Brand discovery workshop", "Logo design (3 concepts)", "Color palette and typography", "Basic brand guidelines", "Business card design", "Social media profile templates"]
                : ["Atelier de découverte de marque", "Conception de logo (3 concepts)", "Palette de couleurs et typographie", "Charte graphique de base", "Design de carte d'affaires", "Modèles de profils sociaux"],
              stripeProductName: "Brand Identity - Essential"
            },
            {
              name: "Standard",
              price: "$7,000",
              subtitle: language === "en" ? "Complete brand identity with messaging framework and marketing templates." : "Identité de marque complète avec cadre de messagerie.",
              features: language === "en"
                ? ["Everything in Essential", "Brand positioning statement", "Messaging framework", "Brand voice guidelines", "Presentation templates", "Email signature design", "Marketing collateral templates", "Social media brand kit"]
                : ["Tout dans Essentiel", "Positionnement de marque", "Cadre de messagerie", "Guide de voix de marque", "Modèles de présentation", "Signatures e-mail", "Modèles marketing", "Kit marque réseaux sociaux"],
              stripeProductName: "Brand Identity - Standard"
            },
            {
              name: "Premium",
              price: "$10,000",
              subtitle: language === "en" ? "Full brand system with strategy, visual identity, and implementation support." : "Système de marque complet avec stratégie et soutien à la mise en œuvre.",
              features: language === "en"
                ? ["Everything in Standard", "Comprehensive brand strategy", "Brand architecture design", "Full stationery suite", "Vehicle and signage design", "Brand launch strategy", "Internal brand training session", "90-day post-launch brand support"]
                : ["Tout dans Standard", "Stratégie de marque complète", "Architecture de marque", "Suite de papeterie", "Design signalétique", "Stratégie de lancement", "Formation interne", "Support de 90 jours"],
              stripeProductName: "Brand Identity - Premium"
            }
          ]
        }
      ]
    },
    business: {
      label: language === "en" ? "Small Business" : "Petite entreprise",
      tagline: language === "en" ? "For founders and small business owners who need a professional online presence without enterprise pricing" : "Pour les fondateurs et propriétaires de PME qui ont besoin d'une présence en ligne professionnelle sans prix d'entreprise",
      icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span>,
      services: [
        {
          title: language === "en" ? "Website & Digital Presence" : "Site Web et présence numérique",
          investment: "$1,500 , $5,000",
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
          title: language === "en" ? "Social Media & Digital Marketing" : "Réseaux sociaux et marketing numérique",
          investment: "$500 , $2,000/mo",
          investmentNote: language === "en" ? "(3-month minimum)" : "(Minimum 3 mois)",
          desc: language === "en"
            ? "Stop posting randomly and start building an audience that converts. We create and manage your social media presence so you can focus on running your business."
            : "Arrêtez de publier au hasard et construisez une audience qui convertit. Nous gérons votre présence sur les réseaux sociaux pour que vous puissiez vous concentrer sur votre entreprise.",
          benefits: language === "en"
            ? ["Social media strategy", "Content creation & scheduling", "Community engagement", "Monthly performance reports"]
            : ["Stratégie réseaux sociaux", "Création et planification de contenu", "Engagement communautaire", "Rapports mensuels"],
          learnMore: language === "en"
            ? "Most small businesses know they need social media, but don't have the time or expertise to do it well. Our Social Media & Digital Marketing service takes care of everything: strategy, content creation, scheduling, community management, and performance reporting.\n\nWe help you build an authentic online presence that attracts your ideal clients and supports your business goals."
            : "La plupart des PME savent qu'elles ont besoin des réseaux sociaux mais manquent de temps. Nous gérons tout pour vous.",
          idealFor: language === "en" ? "Small businesses and founders who want a professional, consistent social media presence without hiring in-house." : "PME et fondateurs qui veulent une présence sociale professionnelle.",
          image: analyticsImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$500/mo",
              subtitle: language === "en" ? "Core social media management for 1-2 platforms." : "Gestion de base des réseaux sociaux pour 1-2 plateformes.",
              features: language === "en"
                ? ["Social media strategy", "8 posts per month", "1-2 platform management", "Content calendar", "Basic analytics report", "Monthly strategy review"]
                : ["Stratégie réseaux sociaux", "8 publications par mois", "Gestion de 1-2 plateformes", "Calendrier de contenu", "Rapport analytique", "Revue stratégique mensuelle"],
              isMonthly: true,
              stripeProductName: "SB Social Media - Essentials"
            },
            {
              name: "Standard",
              price: "$1,200/mo",
              subtitle: language === "en" ? "Full social media management with content creation and engagement." : "Gestion complète avec création de contenu et engagement.",
              features: language === "en"
                ? ["Everything in Essentials", "16 posts per month", "3-4 platform management", "Custom graphics and visuals", "Community engagement management", "Competitor monitoring", "Bi-weekly strategy calls"]
                : ["Tout dans Essentiel", "16 publications par mois", "Gestion de 3-4 plateformes", "Graphismes personnalisés", "Gestion de communauté", "Veille concurrentielle", "Appels bimensuels"],
              isMonthly: true,
              stripeProductName: "SB Social Media - Standard"
            },
            {
              name: "Premium",
              price: "$2,000/mo",
              subtitle: language === "en" ? "Comprehensive digital marketing with paid ads, email marketing, and full reporting." : "Marketing numérique complet avec publicités et rapports.",
              features: language === "en"
                ? ["Everything in Standard", "24+ posts per month", "Paid ad management (ad spend separate)", "Email marketing campaigns", "Video content creation", "Lead generation campaigns", "Weekly strategy calls", "Comprehensive monthly reports"]
                : ["Tout dans Standard", "24+ publications par mois", "Gestion de publicités", "Campagnes e-mail", "Création vidéo", "Campagnes de génération de leads", "Appels hebdomadaires", "Rapports mensuels complets"],
              isMonthly: true,
              stripeProductName: "SB Social Media - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "Google Business & Local SEO" : "Google Business et SEO local",
          investment: "$500 , $1,500",
          desc: language === "en"
            ? "When people in your area search for what you do, you should be the first thing they find. We optimize your local presence so the right clients discover you."
            : "Quand les gens de votre région cherchent ce que vous faites, vous devriez être le premier résultat. Nous optimisons votre présence locale.",
          benefits: language === "en"
            ? ["Google Business Profile setup", "Local SEO optimization", "Review management strategy", "Citation building"]
            : ["Configuration Google Business", "Optimisation SEO local", "Stratégie de gestion des avis", "Construction de citations"],
          learnMore: language === "en"
            ? "For local businesses, Google is your storefront. Our Google Business & Local SEO service ensures you show up when potential customers search for your services in your area.\n\nWe set up and optimize your Google Business Profile, build local citations, develop a review strategy, and implement local SEO best practices so you rank higher in local searches."
            : "Pour les entreprises locales, Google est votre vitrine. Nous optimisons votre profil et votre SEO local pour que vous apparaissiez en premier.",
          idealFor: language === "en" ? "Local businesses, service providers, and brick-and-mortar businesses that rely on local customers finding them online." : "Entreprises locales et fournisseurs de services.",
          image: growthChartImg,
          pricingTiers: [
            {
              name: language === "en" ? "Setup" : "Configuration",
              price: "$500",
              subtitle: language === "en" ? "Google Business Profile creation and basic local SEO setup." : "Création de profil Google Business et configuration SEO locale.",
              features: language === "en"
                ? ["Google Business Profile setup", "Business description and categories", "Photo optimization", "Basic local keyword research", "Initial review strategy", "Setup verification"]
                : ["Configuration Google Business", "Description et catégories", "Optimisation des photos", "Recherche de mots-clés locaux", "Stratégie d'avis initiale", "Vérification"],
              stripeProductName: "Local SEO - Setup"
            },
            {
              name: "Standard",
              price: "$1,000",
              subtitle: language === "en" ? "Complete local SEO package with citations, reviews, and on-page optimization." : "Forfait SEO local complet avec citations et optimisation.",
              features: language === "en"
                ? ["Everything in Setup", "20+ citation submissions", "Review generation strategy", "On-page SEO optimization", "Local link building recommendations", "Monthly ranking report"]
                : ["Tout dans Configuration", "20+ soumissions de citations", "Stratégie de génération d'avis", "Optimisation SEO on-page", "Recommandations de liens locaux", "Rapport de classement mensuel"],
              stripeProductName: "Local SEO - Standard"
            },
            {
              name: "Premium",
              price: "$1,500",
              subtitle: language === "en" ? "Full local visibility package with ongoing optimization and competitor analysis." : "Forfait de visibilité locale complet avec optimisation continue.",
              features: language === "en"
                ? ["Everything in Standard", "50+ citation submissions", "Competitor local analysis", "Google Ads local campaign setup", "Schema markup implementation", "Quarterly strategy review", "60-day ongoing support"]
                : ["Tout dans Standard", "50+ citations", "Analyse concurrentielle", "Configuration Google Ads", "Balisage Schema", "Revue trimestrielle", "Support continu de 60 jours"],
              stripeProductName: "Local SEO - Premium"
            }
          ]
        }
      ]
    },
    professional: {
      label: language === "en" ? "Professional" : "Professionnel",
      tagline: language === "en" ? "For professionals ready to build their personal brand and attract opportunities" : "Pour les professionnels prêts à bâtir leur marque personnelle et attirer les opportunités",
      icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span>,
      services: [
        {
          title: language === "en" ? "Personal Brand Website" : "Site Web de marque personnelle",
          investment: "$1,000 , $3,000",
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
          title: language === "en" ? "LinkedIn & Personal Branding" : "LinkedIn et marque personnelle",
          investment: "$300 , $1,000",
          desc: language === "en"
            ? "Your LinkedIn profile is often the first place people check before doing business with you. We help you make that first impression count."
            : "Votre profil LinkedIn est souvent le premier endroit que les gens vérifient. Nous vous aidons à faire bonne impression.",
          benefits: language === "en"
            ? ["LinkedIn profile optimization", "Personal brand positioning", "Content strategy for LinkedIn", "Professional headshot guidance"]
            : ["Optimisation du profil LinkedIn", "Positionnement de marque personnelle", "Stratégie de contenu LinkedIn", "Guide de photo professionnelle"],
          learnMore: language === "en"
            ? "LinkedIn is where professionals build credibility, attract opportunities, and grow their network. Our LinkedIn & Personal Branding service helps you optimize your profile, develop a content strategy, and position yourself as a thought leader in your field.\n\nWhether you're looking for a new role, building a consulting practice, or establishing yourself as an expert, your online presence matters more than ever."
            : "LinkedIn est l'endroit où les professionnels construisent leur crédibilité. Nous vous aidons à optimiser votre profil et à vous positionner en leader.",
          idealFor: language === "en" ? "Professionals, consultants, and executives who want to leverage LinkedIn for career growth, networking, and business development." : "Professionnels et cadres qui veulent tirer parti de LinkedIn.",
          image: personalBrandImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essential" : "Essentiel",
              price: "$300",
              subtitle: language === "en" ? "LinkedIn profile audit and optimization with keyword strategy." : "Audit et optimisation de profil LinkedIn.",
              features: language === "en"
                ? ["LinkedIn profile audit", "Headline and summary rewrite", "Keyword optimization", "Experience section enhancement", "Skills and endorsement strategy", "Action plan for ongoing engagement"]
                : ["Audit de profil LinkedIn", "Réécriture du titre et résumé", "Optimisation des mots-clés", "Amélioration des expériences", "Stratégie de compétences", "Plan d'action"],
              stripeProductName: "LinkedIn Branding - Essential"
            },
            {
              name: "Standard",
              price: "$600",
              subtitle: language === "en" ? "Complete personal branding with content strategy and thought leadership plan." : "Marque personnelle complète avec stratégie de contenu.",
              features: language === "en"
                ? ["Everything in Essential", "Personal brand positioning", "LinkedIn content strategy (12-week plan)", "Post templates and content ideas", "Connection strategy", "Featured section optimization", "Professional bio writing"]
                : ["Tout dans Essentiel", "Positionnement de marque", "Stratégie de contenu LinkedIn", "Modèles de publications", "Stratégie de connexions", "Section en vedette", "Rédaction de bio"],
              stripeProductName: "LinkedIn Branding - Standard"
            },
            {
              name: "Premium",
              price: "$1,000",
              subtitle: language === "en" ? "Full personal brand package with LinkedIn, website copy, and ongoing coaching." : "Forfait complet avec LinkedIn, copie de site et coaching.",
              features: language === "en"
                ? ["Everything in Standard", "Website bio and about page copy", "Speaker or consulting bio", "Media kit and one-pager design", "LinkedIn article ghostwriting (2 articles)", "30-day coaching support", "Quarterly brand review session"]
                : ["Tout dans Standard", "Copie de site Web et page à propos", "Bio de conférencier", "Kit média et one-pager", "Rédaction d'articles LinkedIn (2)", "Coaching de 30 jours", "Revue trimestrielle"],
              stripeProductName: "LinkedIn Branding - Premium"
            }
          ]
        }
      ]
    }
  };

  const tabs: { key: typeof activeTab; label: string; sublabel: string; icon: React.ReactNode; priceRange: string }[] = [
    { key: "enterprise", label: serviceTiers.enterprise.label, sublabel: language === "en" ? "Digital & Brand" : "Numérique et marque", icon: null, priceRange: "$3,000+" },
    { key: "business", label: serviceTiers.business.label, sublabel: language === "en" ? "Web & Social" : "Web et social", icon: null, priceRange: "$500+" },
    { key: "professional", label: serviceTiers.professional.label, sublabel: language === "en" ? "Personal Brand" : "Marque personnelle", icon: null, priceRange: "$300+" },
  ];

  const currentTier = serviceTiers[activeTab];

  const resultStats = [
    { value: language === "en" ? "Enterprise" : "Entreprise", label: language === "en" ? "Digital & Brand" : "Numérique et marque", icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span> },
    { value: language === "en" ? "Small Business" : "PME", label: language === "en" ? "Web & Social" : "Web et social", icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span> },
    { value: language === "en" ? "Professional" : "Professionnel", label: language === "en" ? "Personal Brand" : "Marque personnelle", icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="Marketing & Websites, Digital Presence, Brand Building & Content Strategy" description="Professional website design, content marketing, brand identity, social media management, and digital marketing services for enterprises, small businesses, and professionals." path="/marketing" />
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
              <p className="text-xs font-black uppercase tracking-[0.35em] text-accent mb-6" data-testid="marketing-text-hero-label">
                {language === "en" ? "Marketing & Websites" : "Marketing et sites Web"}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08]" data-testid="marketing-text-hero-title">
                {language === "en" ? (
                  <>Digital presence that builds <span className="text-accent">trust</span> and drives results</>
                ) : (
                  <>Présence numérique qui bâtit la <span className="text-accent">confiance</span> et génère des résultats</>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl" data-testid="marketing-text-hero-subtitle">
                {language === "en"
                  ? "From professional websites and brand identity to content strategy and social media, we help you build a digital presence that attracts the right people and grows your business."
                  : "Des sites Web professionnels et de l'identité de marque à la stratégie de contenu et aux réseaux sociaux, nous vous aidons à bâtir une présence numérique qui attire les bonnes personnes."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="marketing-button-hero-book">
                    {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto"
                  onClick={() => document.getElementById('marketing-services-section')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="marketing-button-hero-explore"
                >
                  {language === "en" ? "Explore Services" : "Explorer les services"}
                  <span aria-hidden="true" className="ml-2">&#9662;</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-b" data-testid="marketing-section-results">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {resultStats.map((stat, i) => (
                <div key={i} className="text-center" data-testid={`marketing-stat-result-${i}`}>
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

        <section className="py-28 bg-white" data-testid="marketing-section-methodology">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                {language === "en" ? "Our Approach to Digital" : "Notre approche du numérique"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg mb-4">
                {language === "en"
                  ? "We don't just build websites, we build digital experiences that reflect your brand and drive real business results."
                  : "Nous ne construisons pas simplement des sites Web, nous créons des expériences numériques qui reflètent votre marque et génèrent des résultats concrets."}
              </p>
            </div>

            <div className="max-w-6xl mx-auto mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {methodSteps.map((step, i) => (
                  <div key={i} className="relative" data-testid={`marketing-method-step-${i}`}>
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
                            <span aria-hidden="true" className="text-accent shrink-0">·</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {i < methodSteps.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                        <span aria-hidden="true" className="text-accent/40 text-2xl">&rsaquo;</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-16">
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-primary text-white hover:bg-accent h-14 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" data-testid="marketing-button-methodology-cta">
                  {language === "en" ? "Let's Talk About Your Digital Presence" : "Parlons de votre présence numérique"}
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="marketing-services-section" className="py-28 bg-gradient-to-b from-[#FAFAFA] to-white" data-testid="marketing-section-services">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                {language === "en" ? "Marketing and website services built around your needs" : "Des services marketing et web adaptés à vos besoins"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
                {language === "en"
                  ? "Whether you're an enterprise building a complete digital strategy, a small business launching your first website, or a professional building your personal brand, we have the right solution for you."
                  : "Que vous soyez une entreprise construisant une stratégie numérique, une PME lançant son premier site ou un professionnel construisant sa marque, nous avons la bonne solution pour vous."}
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
                  data-testid={`marketing-tab-${tab.key}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span className="hidden sm:inline text-xs opacity-70">, {tab.sublabel}</span>
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
                  data-testid={`marketing-card-service-${activeTab}-${i}`}
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
                            <span aria-hidden="true" className="text-accent shrink-0">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="p-8 pt-4 mt-auto">
                    <div className="flex items-center text-sm font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-all duration-300">
                      {language === "en" ? "View pricing & details" : "Voir les prix et détails"} <span aria-hidden="true" className="ml-2">&rsaquo;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden" data-testid="marketing-section-mid-cta">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(214,30,110,0.08)_0%,transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6 leading-tight">
                {language === "en" ? "Ready to build a digital presence that works for you?" : "Prêt à bâtir une présence numérique qui travaille pour vous ?"}
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                {language === "en"
                  ? "Book a free discovery call to discuss your marketing goals and find the right solution for your business."
                  : "Réservez un appel découverte gratuit pour discuter de vos objectifs marketing et trouver la bonne solution."}
              </p>
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-12 text-base font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="marketing-button-mid-cta">
                  {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                </Button>
              </a>
            </div>
          </div>
        </section>

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
                                {language === "en" ? "Monthly" : "Mensuel"}
                              </span>
                            )}
                          </div>
                          <h5 className="text-lg font-extrabold text-primary mb-2">{tier.name}</h5>
                          <div className="text-accent font-black text-2xl mb-3">{tier.price}</div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-5">{tier.subtitle}</p>
                          <ul className="space-y-2 mb-6">
                            {tier.features.map((f: string, fi: number) => (
                              <li key={fi} className="flex items-start gap-2 text-sm text-primary">
                                <span aria-hidden="true" className="text-accent shrink-0">·</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className={`mt-auto w-full rounded-full h-10 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${idx === 1 ? 'bg-accent text-white hover:bg-primary' : 'bg-primary text-white hover:bg-accent'}`}
                            onClick={() => handlePay(tier.stripeProductName)}
                            disabled={checkoutMutation.isPending && payingProduct === tier.stripeProductName}
                            data-testid={`marketing-button-pay-tier-${idx}`}
                          >
                            {checkoutMutation.isPending && payingProduct === tier.stripeProductName ? (
                              <>{language === "en" ? "Processing..." : "Traitement..."}</>
                            ) : (
                              <>{tier.isMonthly
                                ? (language === "en" ? "Subscribe" : "S'abonner")
                                : (language === "en" ? "Select & Pay" : "Sélectionner et payer")
                              }</>
                            )}
                          </Button>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-semibold text-gray-600">Card</span>
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
                      data-testid="marketing-button-inquire"
                    >
                      {language === "en" ? "Need help choosing? Contact us" : "Besoin d'aide pour choisir ? Contactez-nous"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

      </main>
      <Footer />
    </div>
  );
}
