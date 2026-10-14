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
import recruitmentHiringImg from "@assets/generated/recruitment-hiring.png";
import hiringSupportImg from "@assets/generated/hiring-support.png";
import hrToolkitImg from "@assets/generated/hr-toolkit.png";
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

export default function Recruiting() {
  const [selectedService, setSelectedService] = useState<ServiceEntry | null>(null);
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
      window.history.replaceState({}, "", "/recruiting");
    } else if (payment === "cancelled") {
      toast({
        title: language === "en" ? "Payment cancelled" : "Paiement annulé",
        description: language === "en" ? "Your payment was not completed." : "Votre paiement n'a pas été complété.",
        variant: "destructive",
      });
      window.history.replaceState({}, "", "/recruiting");
    }
  }, []);

  const { data: productsData } = useQuery<{ data: StripeProduct[] }>({
    queryKey: ["/api/products"],
  });

  const checkoutMutation = useMutation({
    mutationFn: async ({ priceId, serviceName }: { priceId: string; serviceName: string }) => {
      const res = await apiRequest("POST", "/api/checkout", { priceId, serviceName, returnPage: "/recruiting" });
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
      title: language === "en" ? "Understand" : "Comprendre",
      desc: language === "en" ? "We start by deeply understanding your hiring needs, the role, the culture, and the kind of person who will truly thrive in your organization." : "Nous commençons par comprendre vos besoins en recrutement, le rôle, la culture et le type de personne qui s'épanouira dans votre organisation.",
      outcomes: language === "en" ? ["Role and culture analysis", "Hiring needs assessment", "Ideal candidate profiling", "Timeline and process planning"] : ["Analyse du rôle et de la culture", "Évaluation des besoins", "Profil du candidat idéal", "Planification du processus"],
      color: "from-zinc-700/10 to-zinc-800/5",
    },
    {
      title: language === "en" ? "Source" : "Rechercher",
      desc: language === "en" ? "We tap into our networks, databases, and sourcing strategies to find candidates you won't find on job boards, the hidden talent that makes the difference." : "Nous exploitons nos réseaux et stratégies de sourcing pour trouver des candidats introuvables sur les sites d'emploi.",
      outcomes: language === "en" ? ["Multi-channel sourcing", "Passive candidate outreach", "Network and referral activation", "Diverse talent pipelines"] : ["Sourcing multi-canaux", "Contact de candidats passifs", "Activation du réseau", "Pipelines diversifiés"],
      color: "from-accent/10 to-accent/5",
    },
    {
      title: language === "en" ? "Evaluate" : "Évaluer",
      desc: language === "en" ? "Every candidate goes through a structured evaluation, skills, experience, culture fit, and potential, so you only meet the best." : "Chaque candidat passe par une évaluation structurée, compétences, expérience, adéquation culturelle et potentiel.",
      outcomes: language === "en" ? ["Structured screening process", "Skills and competency assessment", "Culture fit evaluation", "Reference verification"] : ["Processus de présélection structuré", "Évaluation des compétences", "Adéquation culturelle", "Vérification des références"],
      color: "from-emerald-500/10 to-emerald-600/5",
    },
    {
      title: language === "en" ? "Place" : "Placer",
      desc: language === "en" ? "We don't just fill a seat, we help you make the right hire, negotiate the offer, and set your new team member up for success from day one." : "Nous ne remplissons pas simplement un poste, nous vous aidons à faire le bon choix, négocier l'offre et préparer votre nouveau collaborateur au succès.",
      outcomes: language === "en" ? ["Offer negotiation support", "Onboarding guidance", "Placement guarantee", "Post-hire follow-up"] : ["Soutien à la négociation", "Accompagnement à l'intégration", "Garantie de placement", "Suivi post-embauche"],
      color: "from-zinc-700/10 to-zinc-800/5",
    },
  ];

  const serviceTiers = {
    enterprise: {
      label: language === "en" ? "Enterprise" : "Entreprise",
      tagline: language === "en" ? "For organizations that need structured HR systems, talent acquisition partnerships, and people strategy" : "Pour les organisations qui ont besoin de systèmes RH structurés, de partenariats d'acquisition de talents et de stratégie humaine",
      icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span>,
      services: [
        {
          title: language === "en" ? "Recruitment Process Design" : "Conception du processus de recrutement",
          investment: "$3,000 , $10,000",
          desc: language === "en"
            ? "Stop hiring on gut feeling. We build you a system that helps you find the right people, faster, and set them up to succeed from day one."
            : "Arrêtez de recruter à l'instinct. Nous construisons un système qui vous aide à trouver les bonnes personnes plus vite et à les préparer au succès dès le premier jour.",
          benefits: language === "en"
            ? ["End-to-end hiring process design", "Job description frameworks", "Interview & scoring systems", "Onboarding program development"]
            : ["Conception du processus d'embauche", "Cadres de description de poste", "Systèmes d'entrevue et de notation", "Programme d'intégration"],
          learnMore: language === "en"
            ? "Bad hires are expensive, in time, money, and team morale. Our Recruitment Process Design service builds you a structured, scalable hiring system that takes the guesswork out of talent acquisition.\n\nWe design everything from job description templates and sourcing strategies to interview frameworks, candidate scoring systems, and onboarding programs. The result is a repeatable process that helps you consistently hire the right people, faster."
            : "Les mauvaises embauches coûtent cher. Nous construisons un système d'embauche structuré et évolutif qui élimine les conjectures du recrutement.",
          idealFor: language === "en" ? "Organizations experiencing hiring challenges, rapid growth, or high turnover that need a structured approach to recruitment." : "Organisations confrontées à des défis de recrutement ou à une croissance rapide.",
          image: recruitmentHiringImg,
          pricingTiers: [
            {
              name: language === "en" ? "Foundation" : "Fondation",
              price: "$3,000",
              subtitle: language === "en" ? "Core hiring process design with job frameworks and interview templates." : "Conception du processus d'embauche de base avec cadres et modèles.",
              features: language === "en"
                ? ["Hiring process audit", "Job description templates (up to 5 roles)", "Interview question framework", "Candidate scoring rubric", "Offer letter templates", "Process documentation"]
                : ["Audit du processus d'embauche", "Modèles de description (5 rôles)", "Cadre de questions d'entrevue", "Grille de notation", "Modèles de lettre d'offre", "Documentation du processus"],
              stripeProductName: "Recruitment Design - Foundation"
            },
            {
              name: "Standard",
              price: "$6,000",
              subtitle: language === "en" ? "Full recruitment system with sourcing strategy, employer branding, and onboarding design." : "Système de recrutement complet avec stratégie de sourcing et intégration.",
              features: language === "en"
                ? ["Everything in Foundation", "Talent sourcing strategy", "Employer brand positioning", "Structured interview training", "Onboarding program design (30/60/90 day)", "Recruitment metrics dashboard", "Hiring manager toolkit"]
                : ["Tout dans Fondation", "Stratégie de sourcing", "Positionnement de la marque employeur", "Formation aux entrevues", "Programme d'intégration 30/60/90", "Tableau de bord de recrutement", "Boîte à outils du gestionnaire"],
              stripeProductName: "Recruitment Design - Standard"
            },
            {
              name: language === "en" ? "Enterprise" : "Entreprise",
              price: "$10,000",
              subtitle: language === "en" ? "Complete talent acquisition infrastructure with ATS setup, DEI hiring strategy, and ongoing support." : "Infrastructure complète d'acquisition de talents avec stratégie DEI et soutien continu.",
              features: language === "en"
                ? ["Everything in Standard", "ATS selection and setup guidance", "DEI hiring strategy", "Campus and early talent program design", "Recruitment marketing strategy", "Compensation benchmarking", "Full implementation support", "90-day post-implementation review"]
                : ["Tout dans Standard", "Configuration ATS", "Stratégie DEI d'embauche", "Programme de talents émergents", "Marketing de recrutement", "Analyse comparative de rémunération", "Soutien à la mise en œuvre", "Revue post-implémentation de 90 jours"],
              stripeProductName: "Recruitment Design - Enterprise"
            }
          ]
        },
        {
          title: language === "en" ? "Talent Acquisition & Staffing" : "Acquisition de talents et dotation",
          investment: "$5,000 , $25,000",
          investmentNote: language === "en" ? "(Per placement or retainer model)" : "(Par placement ou mandat)",
          desc: language === "en"
            ? "Let us find the right people for your team. We handle the entire hiring process, sourcing, screening, and placing, so you can focus on what you do best."
            : "Laissez-nous trouver les bonnes personnes pour votre équipe. Nous gérons tout le processus de recrutement pour que vous puissiez vous concentrer sur ce que vous faites de mieux.",
          benefits: language === "en"
            ? ["End-to-end candidate sourcing", "Screening & shortlisting", "Interview coordination", "Offer negotiation & placement support"]
            : ["Sourcing de candidats complet", "Présélection et tri", "Coordination des entrevues", "Négociation et placement"],
          learnMore: language === "en"
            ? "Hiring the wrong person is costly, in time, money, and team morale. Our Talent Acquisition & Staffing service takes the burden of recruiting off your plate entirely. We handle everything from defining the role and sourcing candidates to screening, interviewing, and negotiating offers.\n\nWhether you need a single key hire or are scaling an entire team, we act as your dedicated recruiting partner. We combine our process expertise with deep candidate assessment to ensure you get the right person, not just a fast hire."
            : "Embaucher la mauvaise personne coûte cher. Notre service prend en charge tout le processus de recrutement pour vous.",
          idealFor: language === "en" ? "Organizations that need to hire quickly and effectively without the overhead of an internal recruiting team." : "Organisations qui doivent recruter rapidement et efficacement.",
          image: recruitmentHiringImg,
          pricingTiers: [
            {
              name: language === "en" ? "Single Placement" : "Placement unique",
              price: "$5,000",
              subtitle: language === "en" ? "End-to-end recruitment for a single role including sourcing, screening, and placement." : "Recrutement complet pour un seul poste.",
              features: language === "en"
                ? ["Role definition and job posting", "Candidate sourcing across platforms", "Resume screening and shortlisting", "Interview coordination", "Reference checks", "Offer support and negotiation guidance", "30-day placement guarantee"]
                : ["Définition du poste et affichage", "Sourcing sur toutes les plateformes", "Présélection des CV", "Coordination des entrevues", "Vérification des références", "Soutien à l'offre et négociation", "Garantie de placement de 30 jours"],
              stripeProductName: "Talent Acquisition - Single Placement"
            },
            {
              name: language === "en" ? "Multi-Hire" : "Recrutement multiple",
              price: "$12,000",
              subtitle: language === "en" ? "Recruitment for 2,5 roles with dedicated recruiter and talent pipeline development." : "Recrutement pour 2 à 5 postes avec recruteur dédié.",
              features: language === "en"
                ? ["Everything in Single Placement", "Dedicated recruiter assigned", "Recruitment for 2,5 roles", "Talent pipeline development", "Employer brand positioning", "Candidate experience management", "Bi-weekly progress reporting", "60-day placement guarantee"]
                : ["Tout dans Placement unique", "Recruteur dédié", "Recrutement pour 2-5 postes", "Développement du pipeline", "Marque employeur", "Gestion de l'expérience candidat", "Rapports bimensuels", "Garantie de 60 jours"],
              stripeProductName: "Talent Acquisition - Multi-Hire"
            },
            {
              name: language === "en" ? "Recruiting Retainer" : "Mandat de recrutement",
              price: "$25,000",
              subtitle: language === "en" ? "Ongoing recruiting partnership with dedicated team, executive search, and unlimited placements." : "Partenariat de recrutement continu avec équipe dédiée.",
              features: language === "en"
                ? ["Everything in Multi-Hire", "Dedicated recruiting team", "Unlimited role placements", "Executive and leadership searches", "Full ATS management", "Workforce planning integration", "Weekly strategy calls", "90-day placement guarantee", "Quarterly hiring strategy reviews"]
                : ["Tout dans Multi-Hire", "Équipe de recrutement dédiée", "Placements illimités", "Recherches de cadres", "Gestion ATS complète", "Planification de la main-d'œuvre", "Appels hebdomadaires", "Garantie de 90 jours", "Revues stratégiques trimestrielles"],
              stripeProductName: "Talent Acquisition - Recruiting Retainer"
            }
          ]
        },
        {
          title: language === "en" ? "HR & People Strategy" : "Stratégie RH et gestion des personnes",
          investment: "$5,000 , $15,000",
          investmentNote: language === "en" ? "(6,12 week engagement)" : "(Engagement de 6 à 12 semaines)",
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
          investment: "$5,000 , $20,000",
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
        },
        {
          title: language === "en" ? "HR Retainer, Large Corporations" : "Mandat RH, grandes entreprises",
          investment: "$5,000 , $15,000/mo",
          investmentNote: language === "en" ? "(6-month minimum)" : "(Minimum 6 mois)",
          desc: language === "en"
            ? "Get a dedicated HR strategy partner embedded in your organization. We provide ongoing people operations support, policy management, and strategic workforce planning."
            : "Obtenez un partenaire stratégique RH dédié intégré à votre organisation. Nous fournissons un soutien continu aux opérations humaines et à la planification de la main-d'œuvre.",
          benefits: language === "en"
            ? ["Dedicated HR strategy partner", "Ongoing policy and compliance management", "Workforce planning & analytics", "Leadership development support"]
            : ["Partenaire stratégique RH dédié", "Gestion de politiques et conformité", "Planification de la main-d'œuvre", "Soutien au développement du leadership"],
          learnMore: language === "en"
            ? "Large organizations need consistent, strategic HR guidance that goes beyond day-to-day administration. Our HR Retainer for Large Corporations provides a dedicated senior HR consultant who becomes a strategic partner in your organization.\n\nThis includes ongoing workforce planning, policy management, compliance oversight, leadership development support, employee relations guidance, and regular reporting on HR metrics. Think of it as having a fractional Chief People Officer who knows your organization inside out."
            : "Les grandes organisations ont besoin d'un accompagnement RH stratégique et cohérent. Notre mandat RH fournit un consultant senior dédié qui devient votre partenaire stratégique.",
          idealFor: language === "en" ? "Corporations with 100+ employees needing strategic HR partnership, compliance oversight, and ongoing people operations support." : "Entreprises de 100+ employés ayant besoin d'un partenariat RH stratégique.",
          image: hrPeopleStrategyImg,
          pricingTiers: [
            {
              name: language === "en" ? "Strategic" : "Stratégique",
              price: "$5,000/mo",
              subtitle: language === "en" ? "Monthly HR advisory with policy reviews, compliance support, and strategic workforce planning." : "Conseil RH mensuel avec revues de politiques et planification de la main-d'œuvre.",
              features: language === "en"
                ? ["Monthly HR strategy sessions", "Policy review and updates", "Compliance monitoring", "HR metrics dashboard", "Employee relations guidance", "Quarterly workforce planning review", "Email and phone support"]
                : ["Sessions stratégiques RH mensuelles", "Revue et mise à jour des politiques", "Suivi de la conformité", "Tableau de bord RH", "Guidance en relations employés", "Revue trimestrielle", "Support par e-mail et téléphone"],
              isMonthly: true,
              stripeProductName: "HR Retainer Corp - Strategic"
            },
            {
              name: "Standard",
              price: "$10,000/mo",
              subtitle: language === "en" ? "Bi-weekly engagement with leadership coaching, talent management, and organizational development." : "Engagement bimensuel avec coaching de leadership et développement organisationnel.",
              features: language === "en"
                ? ["Everything in Strategic", "Bi-weekly strategy sessions", "Leadership coaching and development", "Talent management oversight", "Performance management system support", "Organizational development consulting", "Change management guidance", "Priority support"]
                : ["Tout dans Stratégique", "Sessions bimensuelles", "Coaching de leadership", "Gestion des talents", "Soutien au système de performance", "Consultation en développement organisationnel", "Gestion du changement", "Support prioritaire"],
              isMonthly: true,
              stripeProductName: "HR Retainer Corp - Standard"
            },
            {
              name: "Premium",
              price: "$15,000/mo",
              subtitle: language === "en" ? "Dedicated fractional CPO with full HR strategy, implementation, and executive advisory." : "Directeur des ressources humaines fractionné avec stratégie RH complète.",
              features: language === "en"
                ? ["Everything in Standard", "Weekly strategy sessions", "Dedicated senior HR consultant", "Full HR transformation support", "Executive team advisory", "Board-ready HR reporting", "Culture and engagement programs", "Succession planning management", "DEI strategy implementation", "On-demand support"]
                : ["Tout dans Standard", "Sessions hebdomadaires", "Consultant senior dédié", "Transformation RH complète", "Conseil à l'équipe exécutive", "Rapports RH pour le conseil", "Programmes de culture", "Gestion de la relève", "Stratégie DEI", "Support à la demande"],
              isMonthly: true,
              stripeProductName: "HR Retainer Corp - Premium"
            }
          ]
        }
      ]
    },
    business: {
      label: language === "en" ? "Small Business" : "Petite entreprise",
      tagline: language === "en" ? "For founders and small business owners who need to hire right, build HR foundations, and manage their people with confidence" : "Pour les fondateurs et propriétaires de PME qui doivent recruter correctement, bâtir des fondations RH et gérer leur équipe avec confiance",
      icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span>,
      services: [
        {
          title: language === "en" ? "Recruitment & Hiring Support" : "Soutien au recrutement et à l'embauche",
          investment: "$1,000 , $3,000",
          desc: language === "en"
            ? "Hiring your first (or next) employee shouldn't feel like guesswork. We give you the tools, templates, and training to hire right the first time."
            : "Embaucher votre premier (ou prochain) employé ne devrait pas être du devin. Nous vous donnons les outils, modèles et la formation pour bien embaucher dès la première fois.",
          benefits: language === "en"
            ? ["Job description frameworks", "Interview & scoring systems", "Onboarding checklists", "Hiring process documentation"]
            : ["Cadres de description de poste", "Systèmes d'entrevue et de notation", "Listes d'intégration", "Documentation du processus"],
          learnMore: language === "en"
            ? "Hiring your first employees is one of the most important decisions you will make as a business owner. Our Recruitment & Hiring Support package gives you everything you need to run a professional, structured hiring process, without needing an HR department.\n\nYou get job description templates, interview question frameworks, candidate scoring rubrics, and onboarding checklists. We also include hands-on guidance so you feel confident making your next hire."
            : "Embaucher vos premiers employés est l'une des décisions les plus importantes. Notre forfait vous donne tout ce qu'il faut pour un processus de recrutement structuré.",
          idealFor: language === "en" ? "Small business owners and founders who are hiring for the first time or want to improve their existing hiring process." : "Propriétaires de PME qui embauchent pour la première fois ou veulent améliorer leur processus.",
          image: hiringSupportImg,
          pricingTiers: [
            {
              name: language === "en" ? "Starter" : "Démarrage",
              price: "$1,000",
              subtitle: language === "en" ? "Essential hiring tools with job templates and interview framework for 1,3 roles." : "Outils d'embauche essentiels avec modèles pour 1 à 3 rôles.",
              features: language === "en"
                ? ["Job description templates (up to 3 roles)", "Interview question guide", "Candidate scoring rubric", "Offer letter template", "New hire onboarding checklist"]
                : ["Modèles de description de poste (3 rôles)", "Guide de questions d'entrevue", "Grille de notation", "Modèle de lettre d'offre", "Liste d'intégration"],
              stripeProductName: "SB Hiring Support - Starter"
            },
            {
              name: "Standard",
              price: "$2,000",
              subtitle: language === "en" ? "Complete hiring system with sourcing strategy and structured onboarding." : "Système d'embauche complet avec stratégie de sourcing et intégration.",
              features: language === "en"
                ? ["Everything in Starter", "Job description templates (up to 6 roles)", "Talent sourcing strategy", "Structured interview training guide", "30/60/90 day onboarding plan", "Reference check framework", "Hiring process documentation"]
                : ["Tout dans Démarrage", "Modèles pour 6 rôles", "Stratégie de sourcing", "Guide de formation aux entrevues", "Plan d'intégration 30/60/90", "Cadre de vérification des références", "Documentation du processus"],
              stripeProductName: "SB Hiring Support - Standard"
            },
            {
              name: language === "en" ? "Comprehensive" : "Complet",
              price: "$3,000",
              subtitle: language === "en" ? "Full recruitment setup with employer branding, compensation guidance, and hands-on support." : "Configuration complète avec marque employeur et accompagnement.",
              features: language === "en"
                ? ["Everything in Standard", "Employer brand positioning basics", "Compensation benchmarking guidance", "Job posting optimization", "Candidate experience design", "Hiring manager coaching session", "60-day post-hire follow-up"]
                : ["Tout dans Standard", "Positionnement de marque employeur", "Guide de rémunération", "Optimisation des affichages", "Expérience candidat", "Session de coaching gestionnaire", "Suivi de 60 jours post-embauche"],
              stripeProductName: "SB Hiring Support - Comprehensive"
            }
          ]
        },
        {
          title: language === "en" ? "Recruiting & Staffing for Small Business" : "Recrutement et dotation pour PME",
          investment: "$2,000 , $5,000",
          investmentNote: language === "en" ? "(Per hire)" : "(Par embauche)",
          desc: language === "en"
            ? "You need to hire, but you're buried in everything else. Let us handle the recruiting so you can focus on running your business, we'll find the right person for you."
            : "Vous devez recruter, mais vous êtes submergé par tout le reste. Laissez-nous gérer le recrutement pendant que vous vous concentrez sur votre entreprise.",
          benefits: language === "en"
            ? ["Candidate sourcing & screening", "Interview setup & coordination", "Shortlist & recommendations", "Offer support & onboarding guidance"]
            : ["Sourcing et présélection", "Coordination des entrevues", "Liste restreinte et recommandations", "Soutien à l'offre et intégration"],
          learnMore: language === "en"
            ? "As a small business, you cannot afford to get hiring wrong, but you also cannot afford to spend weeks sorting through applications. Our Recruiting & Staffing service gives you a dedicated recruiting partner who handles the heavy lifting: writing job postings, sourcing candidates, screening resumes, and coordinating interviews.\n\nYou get a curated shortlist of qualified candidates, so you can focus on choosing the right person instead of drowning in applications. Every placement includes onboarding guidance to set your new hire up for success."
            : "En tant que PME, vous ne pouvez pas vous permettre de mal embaucher. Nous gérons tout le processus pour vous.",
          idealFor: language === "en" ? "Small business owners and founders who need to hire but don't have the time or expertise to manage the full recruiting process." : "Propriétaires de PME qui doivent recruter mais manquent de temps pour gérer le processus.",
          image: recruitmentHiringImg,
          pricingTiers: [
            {
              name: language === "en" ? "Single Hire" : "Embauche unique",
              price: "$2,000",
              subtitle: language === "en" ? "Full recruitment support for one role, sourcing, screening, and interview coordination." : "Recrutement complet pour un poste.",
              features: language === "en"
                ? ["Job posting creation", "Candidate sourcing", "Resume screening and shortlisting", "Interview scheduling", "Top 3,5 candidate shortlist", "Reference check guidance", "Offer letter review"]
                : ["Création de l'affichage", "Sourcing de candidats", "Présélection des CV", "Planification des entrevues", "Liste de 3 à 5 candidats", "Guide de vérification des références", "Revue de la lettre d'offre"],
              stripeProductName: "SB Recruiting - Single Hire"
            },
            {
              name: "Standard",
              price: "$3,500",
              subtitle: language === "en" ? "Enhanced recruiting with employer branding, structured interviews, and onboarding support." : "Recrutement amélioré avec marque employeur et soutien à l'intégration.",
              features: language === "en"
                ? ["Everything in Single Hire", "Employer brand positioning basics", "Structured interview guide and training", "Candidate experience management", "30/60/90 day onboarding plan", "Hiring process documentation", "30-day post-hire check-in"]
                : ["Tout dans Embauche unique", "Positionnement de marque employeur", "Guide d'entrevue structuré", "Gestion de l'expérience candidat", "Plan d'intégration 30/60/90", "Documentation du processus", "Suivi de 30 jours"],
              stripeProductName: "SB Recruiting - Standard"
            },
            {
              name: "Premium",
              price: "$5,000",
              subtitle: language === "en" ? "Priority recruiting with dedicated support, multiple candidates, and extended placement guarantee." : "Recrutement prioritaire avec soutien dédié et garantie prolongée.",
              features: language === "en"
                ? ["Everything in Standard", "Priority candidate sourcing", "Expanded candidate pipeline (8,10 candidates)", "Compensation benchmarking", "Dedicated recruiting support", "Hiring manager coaching", "60-day placement guarantee", "2 replacement candidates if needed"]
                : ["Tout dans Standard", "Sourcing prioritaire", "Pipeline élargi (8-10 candidats)", "Analyse comparative de rémunération", "Support dédié", "Coaching du gestionnaire", "Garantie de 60 jours", "2 remplacements si nécessaire"],
              stripeProductName: "SB Recruiting - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "People Operations Setup" : "Mise en place des opérations RH",
          investment: "$2,000 , $5,000",
          desc: language === "en"
            ? "Your team deserves more than guesswork. We set up the HR essentials, clear policies, smooth onboarding, and fair reviews, so your people feel supported and valued."
            : "Votre équipe mérite mieux que l'improvisation. Nous mettons en place les essentiels RH pour que vos employés se sentent soutenus et valorisés.",
          benefits: language === "en"
            ? ["Employee policy handbook", "Onboarding process design", "Performance review framework", "Team management systems"]
            : ["Manuel de politiques", "Processus d'intégration", "Cadre de revue de performance", "Systèmes de gestion d'équipe"],
          learnMore: language === "en"
            ? "Most small businesses wing it when it comes to managing people, and it catches up with them. Unclear expectations, no onboarding process, inconsistent reviews, and reactive problem-solving create turnover, low morale, and legal risk.\n\nOur People Operations Setup gives you the essential HR infrastructure every growing business needs: clear policies, a structured onboarding process, a simple performance review system, and team management templates you can actually use. No corporate bloat, just what works."
            : "La plupart des PME improvisent la gestion des personnes. Nous vous donnons les fondations RH essentielles : politiques claires, intégration structurée et système de revue de performance simple.",
          idealFor: language === "en" ? "Small businesses with 3,25 employees who need professional HR foundations without the overhead of a full HR department." : "PME de 3 à 25 employés qui ont besoin de fondations RH professionnelles.",
          image: peopleOperationsImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$2,000",
              subtitle: language === "en" ? "Core HR policies and employee handbook for small teams." : "Politiques RH de base et manuel employé pour petites équipes.",
              features: language === "en"
                ? ["Employee policy handbook", "Core HR policies (5,8 policies)", "Simple onboarding checklist", "Role description templates", "Basic compliance guidance"]
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
        },
        {
          title: language === "en" ? "HR Retainer, Small Business" : "Mandat RH, petites entreprises",
          investment: "$500 , $2,000/mo",
          investmentNote: language === "en" ? "(3-month minimum)" : "(Minimum 3 mois)",
          desc: language === "en"
            ? "You can't afford a full-time HR person, but you need one. Get a dedicated HR partner who handles the people side of your business so you can focus on growth."
            : "Vous ne pouvez pas vous permettre un responsable RH à temps plein, mais vous en avez besoin. Obtenez un partenaire RH dédié.",
          benefits: language === "en"
            ? ["Ongoing HR advisory support", "Hiring and onboarding guidance", "Employee relations support", "Policy updates and compliance"]
            : ["Soutien RH continu", "Guidance en recrutement et intégration", "Relations employés", "Mises à jour de politiques et conformité"],
          learnMore: language === "en"
            ? "Small businesses rarely have the budget for a dedicated HR professional, but they still face hiring decisions, employee issues, compliance questions, and policy needs. Our HR Retainer for Small Business gives you a dedicated HR partner who handles the people side of your business on an ongoing basis.\n\nThis monthly retainer includes hiring support, employee relations guidance, policy updates, compliance advice, and a resource you can call when people issues arise. It's like having your own HR department without the overhead."
            : "Les petites entreprises ont rarement le budget pour un professionnel RH dédié. Notre mandat RH vous donne un partenaire qui gère le côté humain de votre entreprise.",
          idealFor: language === "en" ? "Small businesses with 5,50 employees who need ongoing HR support without hiring a full-time HR professional." : "PME de 5 à 50 employés qui ont besoin de soutien RH continu.",
          image: hrPeopleStrategyImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essentials" : "Essentiel",
              price: "$500/mo",
              subtitle: language === "en" ? "Monthly HR advisory with email support and hiring guidance." : "Conseil RH mensuel avec support par e-mail et guidance en recrutement.",
              features: language === "en"
                ? ["Monthly HR advisory call", "Hiring guidance (up to 2 roles)", "Employee handbook maintenance", "Basic compliance reviews", "Policy question support via email", "Onboarding checklist updates"]
                : ["Appel de conseil RH mensuel", "Guidance en recrutement (2 rôles)", "Maintenance du manuel employé", "Revues de conformité", "Support par e-mail", "Mises à jour d'intégration"],
              isMonthly: true,
              stripeProductName: "HR Retainer SB - Essentials"
            },
            {
              name: "Standard",
              price: "$1,000/mo",
              subtitle: language === "en" ? "Bi-weekly HR support with employee relations, performance reviews, and hiring assistance." : "Soutien RH bimensuel avec relations employés et gestion de la performance.",
              features: language === "en"
                ? ["Everything in Essentials", "Bi-weekly advisory sessions", "Employee relations support", "Performance review management", "Hiring process support (up to 5 roles)", "Conflict resolution guidance", "Quarterly policy updates", "Priority phone support"]
                : ["Tout dans Essentiel", "Sessions bimensuelles", "Relations employés", "Gestion de revue de performance", "Soutien au recrutement (5 rôles)", "Résolution de conflits", "Mises à jour trimestrielles", "Support téléphonique"],
              isMonthly: true,
              stripeProductName: "HR Retainer SB - Standard"
            },
            {
              name: "Premium",
              price: "$2,000/mo",
              subtitle: language === "en" ? "Dedicated fractional HR manager with full people operations support." : "Gestionnaire RH fractionné dédié avec soutien complet aux opérations humaines.",
              features: language === "en"
                ? ["Everything in Standard", "Weekly advisory sessions", "Dedicated HR manager", "Full recruitment support", "Employee development programs", "Compensation and benefits guidance", "Culture and engagement initiatives", "On-demand support", "Team training facilitation"]
                : ["Tout dans Standard", "Sessions hebdomadaires", "Gestionnaire RH dédié", "Soutien complet au recrutement", "Programmes de développement", "Guidance en rémunération", "Initiatives de culture", "Support à la demande", "Animation de formation"],
              isMonthly: true,
              stripeProductName: "HR Retainer SB - Premium"
            }
          ]
        }
      ]
    },
    professional: {
      label: language === "en" ? "Professional" : "Professionnel",
      tagline: language === "en" ? "For professionals ready to lead with confidence, land the right role, and build the career they deserve" : "Pour les professionnels prêts à diriger avec confiance, décrocher le bon poste et bâtir la carrière qu'ils méritent",
      icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span>,
      services: [
        {
          title: language === "en" ? "Interview & Career Readiness" : "Préparation aux entrevues et à la carrière",
          investment: "$250 , $750",
          desc: language === "en"
            ? "Walk into your next interview with confidence. We help you prepare, tell your story, and show up as the candidate employers remember."
            : "Entrez dans votre prochaine entrevue avec confiance. Nous vous aidons à vous préparer, raconter votre histoire et marquer les esprits.",
          benefits: language === "en"
            ? ["Interview preparation coaching", "Personal brand development", "Resume and LinkedIn optimization", "Salary negotiation guidance"]
            : ["Coaching de préparation aux entrevues", "Développement de la marque personnelle", "Optimisation CV et LinkedIn", "Guidance de négociation salariale"],
          learnMore: language === "en"
            ? "Whether you are job hunting, preparing for a promotion interview, or transitioning to a new career, our Interview & Career Readiness program helps you show up with confidence.\n\nWe cover everything from resume and LinkedIn optimization to mock interviews, personal branding, and salary negotiation. You will walk away with a clear personal narrative, polished interview technique, and the confidence to pursue the opportunities you deserve."
            : "Que vous soyez en recherche d'emploi ou en préparation pour une promotion, notre programme vous aide à vous présenter avec confiance.",
          idealFor: language === "en" ? "Professionals preparing for interviews, career transitions, or seeking promotions who want structured preparation and coaching." : "Professionnels se préparant pour des entrevues ou des transitions de carrière.",
          image: hiringSupportImg,
          pricingTiers: [
            {
              name: language === "en" ? "Quick Prep" : "Préparation rapide",
              price: "$250",
              subtitle: language === "en" ? "Focused interview preparation session with personal narrative coaching." : "Session de préparation ciblée avec coaching de narration personnelle.",
              features: language === "en"
                ? ["60-minute coaching session", "Interview technique fundamentals", "Personal narrative development", "Top 10 question preparation", "Summary action plan"]
                : ["Session de coaching de 60 minutes", "Fondamentaux des techniques d'entrevue", "Développement du récit personnel", "Préparation de 10 questions", "Plan d'action de synthèse"],
              stripeProductName: "Career Readiness - Quick Prep"
            },
            {
              name: "Standard",
              price: "$500",
              subtitle: language === "en" ? "Full interview preparation with mock interviews, resume review, and personal branding." : "Préparation complète avec simulation d'entrevue et révision de CV.",
              features: language === "en"
                ? ["Everything in Quick Prep", "Resume and cover letter review", "LinkedIn profile optimization", "2 mock interview sessions", "Personalized feedback report", "Follow-up coaching call"]
                : ["Tout dans Préparation rapide", "Révision de CV et lettre", "Optimisation LinkedIn", "2 simulations d'entrevue", "Rapport de rétroaction", "Appel de suivi"],
              stripeProductName: "Career Readiness - Standard"
            },
            {
              name: language === "en" ? "Comprehensive" : "Complet",
              price: "$750",
              subtitle: language === "en" ? "Complete career readiness with negotiation coaching, personal branding, and ongoing support." : "Préparation complète avec coaching de négociation et soutien continu.",
              features: language === "en"
                ? ["Everything in Standard", "Salary negotiation coaching", "Personal brand strategy", "Executive presence coaching", "3 mock interview sessions", "Industry-specific preparation", "30-day follow-up support"]
                : ["Tout dans Standard", "Coaching de négociation salariale", "Stratégie de marque personnelle", "Coaching de présence", "3 simulations d'entrevue", "Préparation spécifique à l'industrie", "Suivi de 30 jours"],
              stripeProductName: "Career Readiness - Comprehensive"
            }
          ]
        },
        {
          title: language === "en" ? "Career Placement & Job Search Support" : "Placement de carrière et soutien à la recherche d'emploi",
          investment: "$500 , $2,000",
          desc: language === "en"
            ? "Job searching alone is exhausting. We put a recruiting professional in your corner, helping you apply, connect, and land the right role faster."
            : "Chercher un emploi seul est épuisant. Nous mettons un professionnel du recrutement à vos côtés, pour vous aider à postuler, réseauter et décrocher le bon poste plus vite.",
          benefits: language === "en"
            ? ["Resume & LinkedIn makeover", "Targeted job search strategy", "Employer introductions", "Application & follow-up management"]
            : ["Refonte CV et LinkedIn", "Stratégie de recherche ciblée", "Introductions auprès d'employeurs", "Gestion des candidatures et suivis"],
          learnMore: language === "en"
            ? "Job searching alone is exhausting and inefficient. Our Career Placement & Job Search Support puts a recruiting professional in your corner. We help you craft a compelling resume, optimize your LinkedIn presence, build a targeted job search strategy, and connect you with employers who are hiring.\n\nUnlike traditional career coaches who just give advice, we actively work alongside you, submitting applications, making introductions, and managing follow-ups. You focus on preparing for interviews while we focus on getting you in the door."
            : "Chercher un emploi seul est épuisant et inefficace. Notre service met un professionnel du recrutement à vos côtés pour vous aider à décrocher le bon poste.",
          idealFor: language === "en" ? "Professionals actively job searching, career changers, or anyone who wants dedicated support to find and land their next role faster." : "Professionnels en recherche d'emploi active ou en changement de carrière.",
          image: recruitmentHiringImg,
          pricingTiers: [
            {
              name: language === "en" ? "Job Search Starter" : "Démarrage recherche d'emploi",
              price: "$500",
              subtitle: language === "en" ? "Resume and LinkedIn optimization with a personalized job search strategy." : "Optimisation du CV et de LinkedIn avec stratégie de recherche personnalisée.",
              features: language === "en"
                ? ["Professional resume rewrite", "LinkedIn profile optimization", "Target role and industry analysis", "Job search strategy plan", "Application tracking template", "30-minute strategy call"]
                : ["Réécriture professionnelle du CV", "Optimisation du profil LinkedIn", "Analyse des rôles ciblés", "Plan de stratégie de recherche", "Modèle de suivi des candidatures", "Appel stratégique de 30 minutes"],
              stripeProductName: "Career Placement - Starter"
            },
            {
              name: "Standard",
              price: "$1,000",
              subtitle: language === "en" ? "Active job search support with employer outreach, application management, and interview prep." : "Soutien actif avec contacts employeurs et préparation aux entrevues.",
              features: language === "en"
                ? ["Everything in Job Search Starter", "Targeted job applications (up to 20)", "Employer and recruiter outreach", "Application follow-up management", "2 mock interview sessions", "Weekly check-in calls (4 weeks)", "Cover letter templates"]
                : ["Tout dans Démarrage", "Candidatures ciblées (jusqu'à 20)", "Contact avec les employeurs", "Gestion des suivis", "2 simulations d'entrevue", "Appels hebdomadaires (4 semaines)", "Modèles de lettre de motivation"],
              stripeProductName: "Career Placement - Standard"
            },
            {
              name: "Premium",
              price: "$2,000",
              subtitle: language === "en" ? "Full placement support with dedicated career partner, employer introductions, and negotiation coaching." : "Soutien complet avec partenaire dédié et introductions auprès d'employeurs.",
              features: language === "en"
                ? ["Everything in Standard", "Dedicated career partner", "Targeted employer introductions", "Expanded applications (up to 50)", "Salary and benefits negotiation coaching", "Personal brand strategy", "Executive presence coaching", "8-week active support", "Post-placement 30-day check-in"]
                : ["Tout dans Standard", "Partenaire de carrière dédié", "Introductions ciblées auprès d'employeurs", "Candidatures élargies (jusqu'à 50)", "Coaching de négociation salariale", "Stratégie de marque personnelle", "Coaching de présence", "Soutien actif de 8 semaines", "Suivi de 30 jours post-placement"],
              stripeProductName: "Career Placement - Premium"
            }
          ]
        },
        {
          title: language === "en" ? "Leadership & People Management Coaching" : "Coaching en leadership et gestion des personnes",
          investment: "$200 , $750/mo",
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
        },
        {
          title: language === "en" ? "HR Retainer, Non-Profits" : "Mandat RH, organismes à but non lucratif",
          investment: "$300 , $1,500/mo",
          investmentNote: language === "en" ? "(3-month minimum)" : "(Minimum 3 mois)",
          desc: language === "en"
            ? "Non-profits have unique people challenges, tight budgets, passionate teams, and complex compliance. We provide affordable, mission-aligned HR support that helps you focus on impact."
            : "Les OBNL ont des défis uniques en matière de personnel. Nous fournissons un soutien RH abordable et aligné sur votre mission.",
          benefits: language === "en"
            ? ["Non-profit HR advisory", "Volunteer management support", "Grant compliance HR guidance", "Board governance & HR alignment"]
            : ["Conseil RH pour OBNL", "Gestion des bénévoles", "Conformité des subventions", "Gouvernance et alignement RH"],
          learnMore: language === "en"
            ? "Non-profit organizations face unique HR challenges: managing both paid staff and volunteers, navigating grant compliance requirements, handling board governance, and doing it all on tight budgets. Our HR Retainer for Non-Profits provides dedicated, affordable HR support designed specifically for mission-driven organizations.\n\nThis retainer covers hiring guidance, volunteer management, policy development, compliance support, board-HR alignment, and employee relations. We understand the non-profit landscape and provide practical solutions that respect your budget while protecting your people and your mission."
            : "Les OBNL font face à des défis RH uniques. Notre mandat fournit un soutien RH dédié et abordable conçu pour les organisations à mission.",
          idealFor: language === "en" ? "Non-profit organizations, charities, and social enterprises that need dedicated HR support aligned with their mission and budget constraints." : "Organismes à but non lucratif et entreprises sociales.",
          image: hrPeopleStrategyImg,
          pricingTiers: [
            {
              name: language === "en" ? "Community" : "Communauté",
              price: "$300/mo",
              subtitle: language === "en" ? "Monthly HR advisory for small non-profits with basic compliance and volunteer guidance." : "Conseil RH mensuel pour petits OBNL.",
              features: language === "en"
                ? ["Monthly HR advisory call", "Basic policy development", "Volunteer management guidance", "Employment compliance basics", "Email support", "Non-profit best practices"]
                : ["Appel de conseil RH mensuel", "Développement de politiques de base", "Gestion des bénévoles", "Conformité d'emploi", "Support par e-mail", "Meilleures pratiques OBNL"],
              isMonthly: true,
              stripeProductName: "HR Retainer NP - Community"
            },
            {
              name: "Standard",
              price: "$750/mo",
              subtitle: language === "en" ? "Bi-weekly HR support with hiring, grant compliance, and staff development." : "Soutien RH bimensuel avec recrutement et conformité des subventions.",
              features: language === "en"
                ? ["Everything in Community", "Bi-weekly advisory sessions", "Hiring process support", "Grant compliance HR documentation", "Staff development planning", "Board-HR alignment guidance", "Conflict resolution support", "Priority phone support"]
                : ["Tout dans Communauté", "Sessions bimensuelles", "Soutien au recrutement", "Documentation RH de conformité", "Planification du développement", "Alignement conseil-RH", "Résolution de conflits", "Support téléphonique"],
              isMonthly: true,
              stripeProductName: "HR Retainer NP - Standard"
            },
            {
              name: "Premium",
              price: "$1,500/mo",
              subtitle: language === "en" ? "Dedicated HR partner for larger non-profits with full people operations support." : "Partenaire RH dédié pour grands OBNL.",
              features: language === "en"
                ? ["Everything in Standard", "Weekly advisory sessions", "Dedicated HR consultant", "Full recruitment support", "Compensation benchmarking for non-profits", "Employee engagement programs", "Volunteer program design", "Board reporting and governance support", "On-demand support"]
                : ["Tout dans Standard", "Sessions hebdomadaires", "Consultant RH dédié", "Soutien complet au recrutement", "Analyse comparative de rémunération", "Programmes d'engagement", "Conception de programme bénévole", "Rapports au conseil", "Support à la demande"],
              isMonthly: true,
              stripeProductName: "HR Retainer NP - Premium"
            }
          ]
        }
      ]
    },
    "self-serve": {
      label: language === "en" ? "Self-Serve" : "Libre-service",
      tagline: language === "en" ? "Practical hiring and career tools you can start using today, templates, guides, and frameworks for immediate impact" : "Outils pratiques de recrutement et de carrière que vous pouvez utiliser dès aujourd'hui",
      icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span>,
      services: [
        {
          title: language === "en" ? "Hiring & People Management Toolkit" : "Boîte à outils d'embauche et de gestion des personnes",
          investment: "$49 , $199",
          desc: language === "en"
            ? "Managing people shouldn't require an HR degree. Get practical, ready-to-use tools for hiring, onboarding, and managing your team, built for real managers, not corporate bureaucracies."
            : "Gérer des personnes ne devrait pas nécessiter un diplôme RH. Obtenez des outils pratiques pour recruter, intégrer et gérer votre équipe, conçus pour de vrais gestionnaires.",
          benefits: language === "en"
            ? ["Hiring process templates", "Onboarding checklists", "Performance review frameworks", "People management guides"]
            : ["Modèles de recrutement", "Listes d'intégration", "Cadres de revue de performance", "Guides de gestion des personnes"],
          learnMore: language === "en"
            ? "Managing people should not require an HR degree. This toolkit gives you everything you need to hire, onboard, manage, and develop your team, all in practical, ready-to-use templates.\n\nIncludes job description templates, interview scoring rubrics, onboarding checklists, performance review frameworks, 1-on-1 meeting templates, and feedback guides. Perfect for first-time managers, founders building teams, or small businesses without an HR department."
            : "Gérer des personnes ne devrait pas nécessiter un diplôme en RH. Cette boîte à outils vous donne tout ce dont vous avez besoin pour recruter, intégrer, gérer et développer votre équipe.",
          idealFor: language === "en" ? "Managers, team leads, founders, and small business owners who need professional HR tools they can implement immediately." : "Gestionnaires, chefs d'équipe et propriétaires de PME.",
          image: hrToolkitImg,
          pricingTiers: [
            {
              name: language === "en" ? "Starter Kit" : "Kit de démarrage",
              price: "$49",
              subtitle: language === "en" ? "Essential hiring and onboarding templates for individual managers." : "Modèles essentiels d'embauche et d'intégration.",
              features: language === "en"
                ? ["Job description templates (5 roles)", "Interview question guide", "Candidate scoring rubric", "New hire onboarding checklist", "First 30-day plan template"]
                : ["Modèles de description de poste (5 rôles)", "Guide de questions d'entrevue", "Grille de notation", "Liste d'intégration", "Plan des 30 premiers jours"],
              stripeProductName: "Hiring Toolkit - Starter"
            },
            {
              name: language === "en" ? "Manager Edition" : "Édition gestionnaire",
              price: "$129",
              subtitle: language === "en" ? "Complete people management toolkit with reviews, feedback, and team development." : "Boîte à outils complète pour gestionnaires.",
              features: language === "en"
                ? ["Everything in Starter Kit", "Performance review templates", "1-on-1 meeting framework", "Feedback delivery guide", "Team development plan template", "Difficult conversation scripts", "Employee recognition ideas"]
                : ["Tout dans Kit de démarrage", "Modèles de revue de performance", "Cadre de 1-à-1", "Guide de rétroaction", "Modèle de développement", "Scripts de conversation", "Idées de reconnaissance"],
              stripeProductName: "Hiring Toolkit - Manager"
            },
            {
              name: language === "en" ? "Business Edition" : "Édition entreprise",
              price: "$199",
              subtitle: language === "en" ? "Full HR toolkit with policies, compliance, and organizational frameworks." : "Boîte à outils RH complète avec politiques et conformité.",
              features: language === "en"
                ? ["Everything in Manager Edition", "Employee handbook template", "HR policy templates", "Compensation framework guide", "Exit interview template", "Employee satisfaction survey", "Compliance checklist", "Succession planning worksheet"]
                : ["Tout dans Édition gestionnaire", "Modèle de manuel employé", "Politiques RH", "Guide de rémunération", "Modèle d'entrevue de départ", "Sondage de satisfaction", "Liste de conformité", "Planification de la relève"],
              stripeProductName: "Hiring Toolkit - Business"
            }
          ]
        },
        {
          title: language === "en" ? "Job Search & Career Toolkit" : "Boîte à outils de recherche d'emploi et de carrière",
          investment: "$29 , $99",
          desc: language === "en"
            ? "Job searching without a system is overwhelming. This toolkit gives you everything you need to stay organized, present yourself well, and land interviews faster."
            : "Chercher un emploi sans système est accablant. Cette boîte à outils vous donne tout pour rester organisé, bien vous présenter et décrocher des entrevues plus vite.",
          benefits: language === "en"
            ? ["Professional resume templates", "Cover letter & email templates", "Interview preparation checklists", "Job application tracker"]
            : ["Modèles de CV professionnels", "Modèles de lettres et courriels", "Listes de préparation aux entrevues", "Suivi des candidatures"],
          learnMore: language === "en"
            ? "Job searching without a system is overwhelming. The Job Search & Career Toolkit gives you all the tools and templates you need to run an organized, professional job search.\n\nIncludes multiple resume templates, cover letter guides, interview preparation checklists, salary research frameworks, and a job application tracker that keeps everything in one place. Whether you are entering the workforce, changing careers, or pursuing your next opportunity, this toolkit helps you show up prepared and stay on track."
            : "Chercher un emploi sans système est accablant. Cette boîte à outils vous donne tout ce dont vous avez besoin pour une recherche d'emploi organisée et professionnelle.",
          idealFor: language === "en" ? "Job seekers, career changers, new graduates, and professionals who want a structured approach to their job search." : "Chercheurs d'emploi, nouveaux diplômés et professionnels en changement de carrière.",
          image: hiringSupportImg,
          pricingTiers: [
            {
              name: language === "en" ? "Essential" : "Essentiel",
              price: "$29",
              subtitle: language === "en" ? "Core job search templates including resume, cover letter, and application tracker." : "Modèles essentiels de recherche d'emploi.",
              features: language === "en"
                ? ["Professional resume template (3 formats)", "Cover letter template", "Job application tracker spreadsheet", "Interview preparation checklist", "Thank-you email templates"]
                : ["Modèle de CV (3 formats)", "Modèle de lettre de motivation", "Suivi des candidatures", "Liste de préparation aux entrevues", "Modèles de courriel de remerciement"],
              stripeProductName: "Career Toolkit - Essential"
            },
            {
              name: "Standard",
              price: "$59",
              subtitle: language === "en" ? "Complete toolkit with LinkedIn optimization guide, salary research, and networking templates." : "Boîte à outils complète avec guide LinkedIn et recherche salariale.",
              features: language === "en"
                ? ["Everything in Essential", "LinkedIn profile optimization guide", "Networking outreach templates", "Salary research framework", "Personal brand worksheet", "Video interview tips guide", "30-day job search action plan"]
                : ["Tout dans Essentiel", "Guide d'optimisation LinkedIn", "Modèles de réseautage", "Cadre de recherche salariale", "Feuille de marque personnelle", "Guide pour entrevues vidéo", "Plan d'action de 30 jours"],
              stripeProductName: "Career Toolkit - Standard"
            },
            {
              name: "Premium",
              price: "$99",
              subtitle: language === "en" ? "Full career toolkit with video walkthroughs, negotiation scripts, and career transition guide." : "Boîte à outils complète avec vidéos et guide de transition de carrière.",
              features: language === "en"
                ? ["Everything in Standard", "Video walkthrough for each template", "Salary negotiation scripts", "Career transition planning guide", "Executive resume template", "Portfolio presentation template", "60-day follow-up strategy", "Bonus: recruiter outreach scripts"]
                : ["Tout dans Standard", "Vidéo pour chaque modèle", "Scripts de négociation salariale", "Guide de transition de carrière", "Modèle CV exécutif", "Modèle de présentation portfolio", "Stratégie de suivi de 60 jours", "Bonus: scripts de contact recruteur"],
              stripeProductName: "Career Toolkit - Premium"
            }
          ]
        }
      ]
    }
  };

  const tabs: { key: typeof activeTab; label: string; sublabel: string; icon: React.ReactNode; priceRange: string }[] = [
    { key: "enterprise", label: serviceTiers.enterprise.label, sublabel: language === "en" ? "Recruiting & HR Strategy" : "Recrutement et stratégie RH", icon: null, priceRange: "$3,000+" },
    { key: "business", label: serviceTiers.business.label, sublabel: language === "en" ? "Hiring & People Ops" : "Embauche et opérations RH", icon: null, priceRange: "$500+" },
    { key: "professional", label: serviceTiers.professional.label, sublabel: language === "en" ? "Career & Leadership" : "Carrière et leadership", icon: null, priceRange: "$200+" },
    { key: "self-serve", label: serviceTiers["self-serve"].label, sublabel: language === "en" ? "HR & Career Tools" : "Outils RH et carrière", icon: null, priceRange: "$29+" },
  ];

  const currentTier = serviceTiers[activeTab];

  const resultStats = [
    { value: language === "en" ? "Enterprise" : "Entreprise", label: language === "en" ? "Recruiting & HR Strategy" : "Recrutement et stratégie RH", icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span> },
    { value: language === "en" ? "Small Business" : "PME", label: language === "en" ? "Hiring & People Ops" : "Embauche et opérations RH", icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span> },
    { value: language === "en" ? "Professional" : "Professionnel", label: language === "en" ? "Career & Leadership" : "Carrière et leadership", icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span> },
    { value: language === "en" ? "Self-Serve" : "Libre-service", label: language === "en" ? "HR & Career Tools" : "Outils RH et carrière", icon: <span aria-hidden="true" className="text-accent text-lg">&rsaquo;</span> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="Human Resources, Recruiting, Talent Development & People Strategy" description="From talent acquisition and HR strategy to leadership development, people operations, and career coaching, we help you build, manage, and grow the teams that power your success." path="/recruiting" />
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08]" data-testid="recruiting-text-hero-title">
                {language === "en" ? (
                  <>Build, manage, and grow the <span className="text-accent">people</span> who power your success</>
                ) : (
                  <>Bâtir, gérer et développer les <span className="text-accent">personnes</span> qui alimentent votre succès</>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl" data-testid="recruiting-text-hero-subtitle">
                {language === "en"
                  ? "From talent acquisition and people strategy to leadership development, HR retainers, and career coaching, we help you build the teams and systems that drive real results."
                  : "De l'acquisition de talents et de la stratégie humaine au développement du leadership, aux mandats RH et au coaching de carrière, nous vous aidons à bâtir les équipes et systèmes qui génèrent de vrais résultats."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="recruiting-button-hero-book">
                    {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto"
                  onClick={() => document.getElementById('recruiting-services-section')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="recruiting-button-hero-explore"
                >
                  {language === "en" ? "Explore Services" : "Explorer les services"}
                  <span aria-hidden="true" className="ml-2">&#9662;</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-b" data-testid="recruiting-section-results">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {resultStats.map((stat, i) => (
                <div key={i} className="text-center" data-testid={`recruiting-stat-result-${i}`}>
                  <div className="text-3xl font-extrabold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-white" data-testid="recruiting-section-methodology">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                {language === "en" ? "Our People-First Approach" : "Notre approche axée sur les personnes"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg mb-4">
                {language === "en"
                  ? "Whether we are finding you the right hire, building your HR infrastructure, or developing your leaders, every engagement starts with understanding your people and ends with lasting impact."
                  : "Que nous trouvions la bonne recrue, construisions votre infrastructure RH ou développions vos leaders, chaque engagement commence par la compréhension de vos gens et se termine par un impact durable."}
              </p>
            </div>

            <div className="max-w-6xl mx-auto mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {methodSteps.map((step, i) => (
                  <div key={i} className="relative" data-testid={`recruiting-method-step-${i}`}>
                    <div className={`bg-gradient-to-br ${step.color} rounded-3xl p-8 h-full border border-border/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 group`}>
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
                <Button className="rounded-full bg-primary text-white hover:bg-accent h-14 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" data-testid="recruiting-button-methodology-cta">
                  {language === "en" ? "Let's Talk About Your Hiring Needs" : "Parlons de vos besoins en recrutement"}
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="recruiting-services-section" className="py-28 bg-gradient-to-b from-[#FAFAFA] to-white" data-testid="recruiting-section-services">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                {language === "en" ? "HR and recruiting services built around your needs" : "Des services RH et de recrutement adaptés à vos besoins"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
                {language === "en"
                  ? "Whether you're an enterprise scaling your team, a small business making your first hire, or a professional looking for your next role, we have the right recruiting solution for you."
                  : "Que vous soyez une entreprise qui agrandit son équipe, une PME qui fait sa première embauche ou un professionnel cherchant son prochain poste, nous avons la bonne solution de recrutement pour vous."}
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
                  data-testid={`recruiting-tab-${tab.key}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span className="hidden sm:inline text-xs opacity-70">, {tab.sublabel}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-accent/10 text-accent"}`}>{tab.priceRange}</span>
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl border border-border/50 p-8 md:p-10 mb-10">
              <h3 className="text-2xl font-bold text-primary">{currentTier.label}</h3>
              <p className="text-muted-foreground text-sm mt-1">{currentTier.tagline}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTier.services.map((s: ServiceEntry, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-border/60 hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-500 group cursor-pointer flex flex-col overflow-hidden"
                  onClick={() => setSelectedService(s)}
                  data-testid={`recruiting-card-service-${activeTab}-${i}`}
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
                            <span className="text-accent shrink-0 mt-1 leading-none">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="p-8 pt-4 mt-auto">
                    <div className="flex items-center text-sm font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-all duration-300">
                      {language === "en" ? "View pricing & details" : "Voir les prix et détails"} <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden" data-testid="recruiting-section-mid-cta">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(214,30,110,0.08)_0%,transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6 leading-tight">
                {language === "en" ? "Need help finding the right talent or landing the right role?" : "Besoin d'aide pour trouver le bon talent ou décrocher le bon poste ?"}
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                {language === "en"
                  ? "Book a free discovery call to discuss your recruiting needs and find the right solution for your situation."
                  : "Réservez un appel découverte gratuit pour discuter de vos besoins en recrutement et trouver la bonne solution."}
              </p>
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-12 text-base font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="recruiting-button-mid-cta">
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
                  <div className="mb-3">
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
                                <span className="text-accent shrink-0 mt-1 leading-none">·</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className={`mt-auto w-full rounded-full h-10 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${idx === 1 ? 'bg-accent text-white hover:bg-primary' : 'bg-primary text-white hover:bg-accent'}`}
                            onClick={() => handlePay(tier.stripeProductName)}
                            disabled={checkoutMutation.isPending && payingProduct === tier.stripeProductName}
                            data-testid={`recruiting-button-pay-tier-${idx}`}
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
                      data-testid="recruiting-button-inquire"
                    >
                      {language === "en" ? "Need help choosing? Contact us" : "Besoin d'aide pour choisir ? Contactez-nous"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-32 text-white relative overflow-hidden" data-testid="recruiting-section-final-cta">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 leading-tight">
                {language === "en" ? "Ready to find the right people?" : "Prêt à trouver les bonnes personnes ?"}
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
                {language === "en"
                  ? "Whether you're hiring for your enterprise, growing your small business team, or looking for your next career move, we'll help you make the right connection."
                  : "Que vous recrutiez pour votre entreprise, agrandissiez votre équipe de PME ou cherchiez votre prochaine étape de carrière, nous vous aiderons à faire la bonne connexion."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-14 text-lg font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-2xl hover:scale-105 w-full sm:w-auto" data-testid="recruiting-button-book-consultation-cta">
                    {language === "en" ? "Book a Free Consultation" : "Réservez une consultation gratuite"}
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-16 px-12 text-lg font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="recruiting-button-contact-cta">
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
