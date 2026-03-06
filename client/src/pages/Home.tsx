import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Tag,
  ChevronRight,
  TrendingUp,
  Target,
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

import teamAlignmentImg from "@assets/stock_images/team_alignment.jpg";
import actionPlanningImg from "@assets/stock_images/action_planning.jpg";
import measurableProgressImg from "@assets/stock_images/measurable_progress.jpg";
import lastingSystemsImg from "@assets/stock_images/lasting_systems.jpg";
import enterpriseLeadershipImg from "@assets/stock_images/enterprise_leadership.jpg";
import smallBusinessOwnerImg from "@assets/stock_images/small_business_owner.jpg";
import professionalDevelopmentImg from "@assets/stock_images/professional_development.jpg";
import assessmentPhaseImg from "@assets/stock_images/assessment_phase.jpg";
import teamCollaborationImg from "@assets/stock_images/team_collaboration.jpg";
import buildingSystemsImg from "@assets/stock_images/building_systems.jpg";
import growthImprovementImg from "@assets/stock_images/growth_improvement.jpg";
import executiveAdvisoryImg from "@assets/stock_images/executive_advisory.jpg";
import businessCoachingImg from "@assets/stock_images/business_coaching.jpg";
import personalCoachingImg from "@assets/stock_images/personal_coaching.jpg";
import programsToolkitImg from "@assets/stock_images/programs_toolkit.jpg";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function Home() {
  const { t, language } = useLanguage();

  const outcomes = [
    {
      image: teamAlignmentImg,
      title: language === "en" ? "Get Your Team on the Same Page" : "Alignez votre équipe",
      desc: language === "en"
        ? "Stop miscommunication and misalignment. We help leadership teams get clear on direction so everyone pulls together."
        : "Arrêtez les malentendus et le désalignement. Nous aidons les équipes de direction à clarifier la direction.",
    },
    {
      image: actionPlanningImg,
      title: language === "en" ? "Turn Plans Into Action" : "Transformez les plans en action",
      desc: language === "en"
        ? "Great plans mean nothing without execution. We build the accountability structures that make things happen."
        : "Les bons plans ne valent rien sans exécution. Nous construisons les structures de responsabilité qui font bouger les choses.",
    },
    {
      image: measurableProgressImg,
      title: language === "en" ? "See Measurable Progress" : "Voyez des progrès mesurables",
      desc: language === "en"
        ? "No guesswork. Track real performance improvements with clear KPIs and regular check-ins."
        : "Pas de devinettes. Suivez de vrais progrès avec des KPI clairs et des suivis réguliers.",
    },
    {
      image: lastingSystemsImg,
      title: language === "en" ? "Build Systems That Last" : "Construisez des systèmes durables",
      desc: language === "en"
        ? "We don't create dependency. You walk away with processes and tools your team can run on their own."
        : "Nous ne créons pas de dépendance. Vous repartez avec des processus que votre équipe peut gérer seule.",
    },
  ];

  const whoWeHelp = [
    {
      image: enterpriseLeadershipImg,
      title: language === "en" ? "Enterprise & Leadership Teams" : "Entreprises et équipes de direction",
      desc: language === "en"
        ? "Strategic planning, performance management, and governance for organizations ready to operate at a higher level."
        : "Planification stratégique, gestion de la performance et gouvernance pour les organisations prêtes à fonctionner à un niveau supérieur.",
    },
    {
      image: smallBusinessOwnerImg,
      title: language === "en" ? "Small Business Owners & Founders" : "Propriétaires de PME et fondateurs",
      desc: language === "en"
        ? "Monthly strategy support, operational structure, and accountability systems to help you grow without the chaos."
        : "Soutien stratégique mensuel, structure opérationnelle et systèmes de responsabilité pour vous aider à grandir sans le chaos.",
    },
    {
      image: professionalDevelopmentImg,
      title: language === "en" ? "Professionals & Entrepreneurs" : "Professionnels et entrepreneurs",
      desc: language === "en"
        ? "Coaching, 90-day programs, and practical toolkits to sharpen your focus and take your career to the next level."
        : "Coaching, programmes de 90 jours et outils pratiques pour affiner votre concentration et passer au niveau supérieur.",
    },
  ];

  const frameworkSteps = [
    {
      step: "01",
      label: language === "en" ? "Assess" : "Évaluer",
      image: assessmentPhaseImg,
      title: language === "en" ? "Assess Where You Are" : "Évaluez votre situation",
      desc: language === "en"
        ? "We listen first. Through interviews, audits, and data review, we identify what is working, what is not, and where to focus."
        : "Nous écoutons d'abord. Par des entretiens, des audits et l'analyse des données, nous identifions ce qui fonctionne et ce qui ne fonctionne pas.",
    },
    {
      step: "02",
      label: language === "en" ? "Align" : "Aligner",
      image: teamCollaborationImg,
      title: language === "en" ? "Align Your Team" : "Alignez votre équipe",
      desc: language === "en"
        ? "We bring your leadership together around shared priorities, clear goals, and a strategy everyone understands."
        : "Nous rassemblons votre leadership autour de priorités communes, d'objectifs clairs et d'une stratégie que tous comprennent.",
    },
    {
      step: "03",
      label: language === "en" ? "Build" : "Construire",
      image: buildingSystemsImg,
      title: language === "en" ? "Build the Systems" : "Construisez les systèmes",
      desc: language === "en"
        ? "We design and implement the processes, tools, and training your team needs to execute consistently."
        : "Nous concevons et mettons en œuvre les processus, outils et formations dont votre équipe a besoin pour exécuter de manière cohérente.",
    },
    {
      step: "04",
      label: language === "en" ? "Grow" : "Croître",
      image: growthImprovementImg,
      title: language === "en" ? "Grow & Improve" : "Croître et s'améliorer",
      desc: language === "en"
        ? "We track what matters, refine what is not working, and help you build a culture of continuous improvement."
        : "Nous suivons ce qui compte, affinons ce qui ne fonctionne pas et vous aidons à bâtir une culture d'amélioration continue.",
    },
  ];

  const services = [
    {
      image: executiveAdvisoryImg,
      title: language === "en" ? "Executive Advisory" : "Conseil exécutif",
      desc: language === "en"
        ? "For leadership teams that need strategic planning, performance systems, and governance support."
        : "Pour les équipes de direction qui ont besoin de planification stratégique et de systèmes de performance.",
    },
    {
      image: businessCoachingImg,
      title: language === "en" ? "Small Business Growth System" : "Système de croissance PME",
      desc: language === "en"
        ? "A dedicated strategy partner to help you prioritize, plan, and build structure as you grow."
        : "Un partenaire stratégique dédié pour vous aider à prioriser, planifier et structurer votre croissance.",
    },
    {
      image: personalCoachingImg,
      title: language === "en" ? "Coaching & Development" : "Coaching et développement",
      desc: language === "en"
        ? "Personal performance coaching and structured programs for professionals ready to level up."
        : "Coaching de performance personnel et programmes structurés pour les professionnels prêts à progresser.",
    },
    {
      image: programsToolkitImg,
      title: language === "en" ? "Programs & Toolkits" : "Programmes et outils",
      desc: language === "en"
        ? "Self-paced 90-day programs, planners, and frameworks you can implement on your own."
        : "Programmes de 90 jours, planificateurs et cadres que vous pouvez mettre en œuvre par vous-même.",
    },
  ];

  const industries = [
    { label: language === "en" ? "Corporate" : "Entreprises" },
    { label: language === "en" ? "Nonprofit" : "OBNL" },
    { label: language === "en" ? "Government" : "Gouvernement" },
    { label: language === "en" ? "Startups & SMBs" : "Startups et PME" },
    { label: language === "en" ? "Education" : "Éducation" },
    { label: language === "en" ? "Professional Services" : "Services professionnels" },
  ];

  const insights = [
    {
      title: language === "en" ? "Why Most Strategy Fails" : "Pourquoi la plupart des stratégies échouent",
      category: language === "en" ? "Strategy" : "Stratégie",
      date: language === "en" ? "January 15, 2026" : "15 janvier 2026",
      excerpt: language === "en"
        ? "Strategy without systems is just aspiration. Learn why execution gaps kill good plans."
        : "La stratégie sans systèmes n'est qu'une aspiration. Découvrez pourquoi les lacunes d'exécution tuent les bons plans.",
    },
    {
      title: language === "en" ? "Systems vs. Motivation" : "Systèmes contre motivation",
      category: language === "en" ? "Performance" : "Performance",
      date: language === "en" ? "January 8, 2026" : "8 janvier 2026",
      excerpt: language === "en"
        ? "Motivation fades. Systems don't. How to build performance infrastructure that works without willpower."
        : "La motivation s'estompe. Les systèmes non. Comment construire une infrastructure de performance qui fonctionne sans volonté.",
    },
    {
      title: language === "en" ? "The Performance Process Framework" : "Le cadre Performance Process",
      category: language === "en" ? "Framework" : "Cadre",
      date: language === "en" ? "December 20, 2025" : "20 décembre 2025",
      excerpt: language === "en"
        ? "A four-step cycle for continuous improvement that works for individuals, teams, and organizations."
        : "Un cycle en quatre étapes pour l'amélioration continue qui fonctionne pour les individus, les équipes et les organisations.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative min-h-[650px] lg:min-h-[750px] flex items-center overflow-hidden bg-primary" data-testid="section-hero">
          <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-15">
              <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
          </div>
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08]" data-testid="text-hero-title">
                {language === "en" ? (
                  <>Build High-Performance Teams With <span className="text-accent">Better Management Systems</span></>
                ) : (
                  <>Bâtissez des équipes performantes avec <span className="text-accent">de meilleurs systèmes de gestion</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl" data-testid="text-hero-subtitle">
                {language === "en"
                  ? "We help leaders, business owners, and professionals build the systems that drive consistent execution, team alignment, and measurable growth."
                  : "Nous aidons les dirigeants, les propriétaires d'entreprise et les professionnels à bâtir les systèmes qui favorisent une exécution cohérente, l'alignement des équipes et une croissance mesurable."}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-hero-book">
                  <Calendar size={16} />
                  {t("hero.ctaPrimary")}
                </a>
                <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-hero-services">
                  {t("hero.ctaSecondary")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-8 bg-white border-b" data-testid="section-trusted-by">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 shrink-0">
                {language === "en" ? "Trusted By" : "Confiance de"}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors" data-testid="logo-nextup">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">NextUp Canada</span>
                </div>
                <div className="w-px h-6 bg-border hidden md:block"></div>
                <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors" data-testid="logo-truenorth">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">TrueNorth Property & Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Help You Achieve */}
        <section className="py-32 bg-white" data-testid="section-outcomes">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "What You Get" : "Ce que vous obtenez"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "What we help you achieve" : "Ce que nous vous aidons à accomplir"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Whether you lead a team of 5 or 500, the challenge is the same: turning strategy into action. Here is how we help."
                  : "Que vous dirigiez une équipe de 5 ou 500 personnes, le défi est le même : transformer la stratégie en action. Voici comment nous aidons."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {outcomes.map((item, i) => (
                <div key={i} className="flex gap-6 p-8 bg-gradient-to-br from-[#F8FAFC] to-white rounded-3xl border border-border hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 group" data-testid={`outcome-card-${i}`}>
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="py-32 bg-[#F8FAFC]" data-testid="section-who-we-help">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Who We Work With" : "Avec qui nous travaillons"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Built for leaders at every stage" : "Conçu pour les leaders à chaque étape"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "From solo founders to enterprise leadership teams, we meet you where you are and help you get where you want to go."
                  : "Des fondateurs solo aux équipes de direction, nous vous rencontrons là où vous êtes et vous aidons à atteindre vos objectifs."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {whoWeHelp.map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-white via-white to-accent/5 rounded-3xl border border-border text-center hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 group overflow-hidden" data-testid={`who-card-${i}`}>
                  <div className="w-full aspect-[16/9] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-10">
                    <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Industries strip */}
            <div className="mt-20 pt-16 border-t border-border/60">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-10">
                {language === "en" ? "Industries We Serve" : "Industries que nous desservons"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {industries.map((ind, i) => (
                  <div key={i} className="px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 text-primary/70" data-testid={`industry-${i}`}>
                    <span className="text-sm font-semibold">{ind.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="py-20 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 border-y border-accent/10" data-testid="section-mid-cta">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-4">
              {language === "en" ? "Not sure where to start?" : "Vous ne savez pas par où commencer ?"}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {language === "en"
                ? "Book a free strategy call. We will listen to your challenges and help you figure out the right next step."
                : "Réservez un appel stratégique gratuit. Nous écouterons vos défis et vous aiderons à trouver la prochaine étape."}
            </p>
            <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-accent/90 h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent/20" data-testid="link-mid-cta-book">
              <Calendar size={16} />
              {language === "en" ? "Book a Free Strategy Call" : "Réservez un appel stratégique gratuit"}
            </a>
          </div>
        </section>

        {/* Our Approach */}
        <section id="framework" className="py-32 bg-white" data-testid="section-framework">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "How We Work" : "Comment nous travaillons"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Our four-phase approach" : "Notre approche en quatre phases"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "We follow a structured process that takes you from where you are today to where you want to be, with clear milestones along the way."
                  : "Nous suivons un processus structuré qui vous mène de votre situation actuelle à vos objectifs, avec des jalons clairs en cours de route."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative max-w-6xl mx-auto">
              {frameworkSteps.map((step, i) => (
                <div key={i} className="relative" data-testid={`framework-step-${i}`}>
                  <div className="bg-gradient-to-b from-[#F8FAFC] to-white rounded-3xl border border-border text-center hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 h-full flex flex-col items-center group mx-2 overflow-hidden">
                    <div className="w-full aspect-[16/10] overflow-hidden relative">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 bg-accent text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-accent/30">
                        {language === "en" ? "Phase" : "Phase"} {step.step}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < frameworkSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-1 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                        <ChevronRight size={14} className="text-accent" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link href="/approach" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors" data-testid="link-learn-approach">
                {language === "en" ? "Learn more about our methodology" : "En savoir plus sur notre méthodologie"}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-32 bg-[#F8FAFC]" data-testid="section-services">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "What We Offer" : "Ce que nous offrons"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Find the right level of support" : "Trouvez le bon niveau de soutien"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Whether you need a strategic partner, a growth system, or coaching to sharpen your edge, we have a solution."
                  : "Que vous ayez besoin d'un partenaire stratégique, d'un système de croissance ou d'un coaching, nous avons une solution."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s, i) => (
                <Link key={i} href="/services" className="block h-full" data-testid={`link-service-${i}`}>
                  <div className="bg-gradient-to-b from-white to-[#FAFBFD] rounded-3xl border border-border hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 group cursor-pointer flex flex-col h-full min-h-[300px] overflow-hidden" data-testid={`service-card-${i}`}>
                    <div className="w-full aspect-[16/10] overflow-hidden">
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-primary mb-4 group-hover:text-accent transition-colors">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{s.desc}</p>
                      <div className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                        {language === "en" ? "Learn more" : "En savoir plus"} <ArrowRight size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-32 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden" data-testid="section-results">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "The Outcomes" : "Les résultats"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
                {language === "en" ? "What working with us looks like" : "Ce à quoi ressemble le travail avec nous"}
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                {language === "en"
                  ? "Our clients do not pay for consulting hours. They invest in outcomes. Here is what you can expect."
                  : "Nos clients n'achètent pas des heures de conseil. Ils investissent dans des résultats. Voici ce à quoi vous pouvez vous attendre."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/5 text-center overflow-hidden" data-testid="stat-alignment">
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <img src={teamCollaborationImg} alt="Team alignment" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="p-8">
                  <p className="text-4xl font-extrabold text-white mb-2">100%</p>
                  <p className="text-white/60 text-sm">
                    {language === "en" ? "Teams aligned on goals and priorities" : "Équipes alignées sur les objectifs et les priorités"}
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/5 text-center overflow-hidden" data-testid="stat-execution">
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <img src={assessmentPhaseImg} alt="Structured approach" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="p-8">
                  <p className="text-4xl font-extrabold text-white mb-2">4 Phases</p>
                  <p className="text-white/60 text-sm">
                    {language === "en" ? "Structured path from diagnosis to results" : "Chemin structuré du diagnostic aux résultats"}
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/5 text-center overflow-hidden" data-testid="stat-sustainable">
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <img src={growthImprovementImg} alt="Lasting systems" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="p-8">
                  <p className="text-4xl font-extrabold text-white mb-2">Lasting</p>
                  <p className="text-white/60 text-sm">
                    {language === "en" ? "Systems your team can run without us" : "Des systèmes que votre équipe peut gérer sans nous"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                language === "en" ? "Teams executing on the same priorities" : "Des équipes exécutant les mêmes priorités",
                language === "en" ? "Clear KPIs everyone can track" : "Des KPI clairs que tous peuvent suivre",
                language === "en" ? "Leadership that communicates effectively" : "Un leadership qui communique efficacement",
                language === "en" ? "Processes that reduce daily firefighting" : "Des processus qui réduisent la gestion de crise quotidienne",
                language === "en" ? "Decisions backed by data, not guesswork" : "Des décisions basées sur les données, pas sur l'intuition",
                language === "en" ? "Growth without adding unnecessary complexity" : "De la croissance sans complexité inutile",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/5" data-testid={`result-item-${i}`}>
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights */}
        <section className="py-32 bg-white" data-testid="section-insights">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "From Our Practice" : "De notre pratique"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-2">
                  {language === "en" ? "Latest Insights" : "Dernières perspectives"}
                </h2>
              </div>
              <Link href="/insights" className="inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all mt-6 md:mt-0" data-testid="link-view-all-insights">
                {language === "en" ? "View all insights" : "Voir toutes les perspectives"}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((insight, i) => (
                <Link key={i} href="/insights" className="block h-full" data-testid={`link-insight-${i}`}>
                  <div className="bg-gradient-to-b from-[#F8FAFC] to-white rounded-3xl p-8 border border-border hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 cursor-pointer group h-full flex flex-col" data-testid={`insight-card-${i}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                        <Tag size={10} /> {insight.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar size={10} /> {insight.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-4 group-hover:text-accent transition-colors line-clamp-2">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3">{insight.excerpt}</p>
                    <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                      {language === "en" ? "Read more" : "Lire la suite"} <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-[#F8FAFC] border-t" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-[2rem] p-12 lg:p-20 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_70%)]"></div>
              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6">
                  {language === "en" ? "Let's Talk" : "Parlons-en"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                  {language === "en"
                    ? "Ready to build something that works?"
                    : "Prêt à construire quelque chose qui fonctionne ?"}
                </h2>
                <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
                  {language === "en"
                    ? "Whether you are leading a team, growing a business, or leveling up your own performance, the first step is a conversation. Let's figure out the right path forward, together."
                    : "Que vous dirigiez une équipe, développiez une entreprise ou amélioriez votre propre performance, la première étape est une conversation. Trouvons ensemble la bonne voie à suivre."}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-cta-book">
                    <Calendar size={16} />
                    {language === "en" ? "Book a Free Strategy Call" : "Réservez un appel stratégique gratuit"}
                  </a>
                  <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-cta-services">
                    {language === "en" ? "Explore services" : "Découvrir les services"}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
