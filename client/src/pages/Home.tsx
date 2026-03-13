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
  ClipboardCheck,
  Zap,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/use-language";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";

import teamAlignmentImg from "@assets/generated/team-alignment.png";
import actionPlanningImg from "@assets/generated/action-planning.png";
import measurableProgressImg from "@assets/generated/measurable-progress.png";
import lastingSystemsImg from "@assets/generated/lasting-systems.png";
import enterpriseLeadershipImg from "@assets/generated/enterprise-leadership.png";
import smallBusinessOwnerImg from "@assets/generated/small-business-owner-new.png";
import professionalDevelopmentImg from "@assets/generated/professional-development.png";
import assessmentPhaseImg from "@assets/generated/assessment-phase.png";
import teamCollaborationImg from "@assets/generated/team-collaboration.png";
import buildingSystemsImg from "@assets/generated/building-systems.png";
import growthImprovementImg from "@assets/generated/growth-improvement.png";
import executiveAdvisoryImg from "@assets/generated/executive-advisory.png";
import businessCoachingImg from "@assets/generated/business-coaching.png";
import personalCoachingImg from "@assets/generated/personal-coaching.png";
import programsToolkitImg from "@assets/generated/programs-toolkit.png";
import hrPeopleStrategyImg from "@assets/generated/hr-people-strategy.png";

import heroAbstractImg from "@assets/generated/hero-abstract-new.png";
import teamStrategyImg from "@assets/generated/team-strategy-new.png";
import analyticsDashboardImg from "@assets/generated/analytics-dashboard-new.png";
import leadershipPresentationImg from "@assets/generated/leadership-presentation-new.png";
import processFlowImg from "@assets/generated/process-flow-new.png";
import cityAerialImg from "@assets/generated/city-aerial-new.png";
import strategyWhiteboardImg from "@assets/generated/strategy-whiteboard-new.png";
import smallBizOwnerImg from "@assets/generated/small-business-owner-new.png";
import geoPatternImg from "@assets/generated/geo-pattern-new.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const subtitles = [
  { start: 0, end: 2, text: "The organizations that thrive aren't the ones with the best strategy on paper..." },
  { start: 2, end: 4.5, text: "They're the ones that build accountability into every layer of their culture." },
  { start: 4.5, end: 6, text: "That's where real transformation begins." },
];

function VideoWithSubtitles() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSub, setCurrentSub] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      const t = video.currentTime;
      const match = subtitles.find(s => t >= s.start && t < s.end);
      setCurrentSub(match?.text || "");
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div className="relative">
      <video ref={videoRef} src="/ted-talk-speaker.mp4" autoPlay muted loop playsInline className="w-full h-auto object-cover aspect-[4/3]" data-testid="video-measurable-results" />
      {currentSub && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-end pointer-events-none">
          <div className="bg-black/75 backdrop-blur-sm text-white text-sm md:text-base font-medium px-5 py-2.5 rounded-lg text-right max-w-[65%] leading-snug">
            {currentSub}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { t, language } = useLanguage();

  const outcomes = [
    {
      icon: <Zap size={24} />,
      image: teamAlignmentImg,
      title: language === "en" ? "Improve Workflow Efficiency" : "Améliorez l'efficacité des flux de travail",
      desc: language === "en"
        ? "Whether you are a solo professional or leading a team, we identify bottlenecks and design processes that eliminate wasted effort."
        : "Que vous soyez un professionnel solo ou à la tête d'une équipe, nous identifions les goulots d'étranglement et concevons des processus efficaces.",
    },
    {
      icon: <Users size={24} />,
      image: actionPlanningImg,
      title: language === "en" ? "Strengthen Leadership & Accountability" : "Renforcez le leadership et la responsabilité",
      desc: language === "en"
        ? "Build accountability structures and leadership systems that turn plans into consistent execution."
        : "Construisez des structures de responsabilité et des systèmes de leadership qui transforment les plans en exécution cohérente.",
    },
    {
      icon: <BarChart3 size={24} />,
      image: measurableProgressImg,
      title: language === "en" ? "See Measurable Progress" : "Voyez des progrès mesurables",
      desc: language === "en"
        ? "No guesswork. Track real performance improvements with clear KPIs, productivity metrics, and regular check-ins."
        : "Pas de devinettes. Suivez de vrais progrès avec des KPI clairs, des métriques de productivité et des suivis réguliers.",
    },
    {
      icon: <Settings size={24} />,
      image: lastingSystemsImg,
      title: language === "en" ? "Build Systems That Scale" : "Construisez des systèmes évolutifs",
      desc: language === "en"
        ? "We don't create dependency. You walk away with processes and tools you can run on your own — whether you are a team of one or one hundred."
        : "Nous ne créons pas de dépendance. Vous repartez avec des processus que vous pouvez gérer seul — que vous soyez un professionnel solo ou une équipe de cent.",
    },
  ];

  const whoWeHelp = [
    {
      image: professionalDevelopmentImg,
      title: language === "en" ? "Independent Professionals" : "Professionnels indépendants",
      desc: language === "en"
        ? "Lawyers, accountants, consultants, and advisors looking to structure their work, improve productivity, and build systems that reduce overwhelm."
        : "Avocats, comptables, consultants et conseillers cherchant à structurer leur travail, améliorer leur productivité et réduire la surcharge.",
    },
    {
      image: smallBusinessOwnerImg,
      title: language === "en" ? "Small & Growing Businesses" : "Petites et moyennes entreprises",
      desc: language === "en"
        ? "Founders, CEOs, and business owners who need operational structure, people management systems, and accountability to scale effectively."
        : "Fondateurs, PDG et propriétaires d'entreprise qui ont besoin de structure opérationnelle, de gestion des personnes et de responsabilité pour croître efficacement.",
    },
    {
      image: enterpriseLeadershipImg,
      title: language === "en" ? "Corporate & Enterprise Teams" : "Équipes corporatives et entreprises",
      desc: language === "en"
        ? "Leaders and managers seeking strategic planning, performance management, and governance to align teams and improve operational efficiency."
        : "Dirigeants et gestionnaires cherchant la planification stratégique, la gestion de la performance et la gouvernance pour aligner les équipes.",
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
      image: hrPeopleStrategyImg,
      title: language === "en" ? "Recruiting & Staffing" : "Recrutement et dotation",
      desc: language === "en"
        ? "We help companies find and hire the right talent — and help professionals get recruited into the right roles."
        : "Nous aidons les entreprises à recruter les bons talents — et les professionnels à se faire recruter dans les bons postes.",
    },
    {
      image: businessCoachingImg,
      title: language === "en" ? "Small Business Growth" : "Croissance PME",
      desc: language === "en"
        ? "A dedicated strategy partner to help you prioritize, plan, and build structure as you grow."
        : "Un partenaire stratégique dédié pour vous aider à prioriser, planifier et structurer votre croissance.",
    },
    {
      image: personalCoachingImg,
      title: language === "en" ? "Coaching & Development" : "Coaching et développement",
      desc: language === "en"
        ? "Personal performance coaching, leadership development, and people management skills for professionals ready to level up."
        : "Coaching de performance, développement du leadership et compétences en gestion des personnes pour les professionnels.",
    },
    {
      image: programsToolkitImg,
      title: language === "en" ? "Programs & Toolkits" : "Programmes et outils",
      desc: language === "en"
        ? "Self-paced programs, planners, hiring templates, and HR frameworks you can implement on your own."
        : "Programmes, planificateurs, modèles d'embauche et cadres RH que vous pouvez mettre en œuvre par vous-même.",
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
        {/* Hero — EY-style split with large featured image + floating accents */}
        <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-primary" data-testid="section-hero">
          <div className="absolute inset-0 z-0">
            <img src={heroAbstractImg} alt="" className="w-full h-full object-cover opacity-20 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/98 to-primary/70" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full hidden lg:block z-[1]">
            <img src={teamStrategyImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
          <GradientOrb className="w-96 h-96 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-16 h-16 top-[20%] right-[10%] z-[3]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-[30%] right-[35%] z-[3]" variant="dot" />
          <GeometricAccent className="bottom-[15%] right-[5%] text-white z-[2]" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-2xl lg:max-w-[55%]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <ClipboardCheck size={14} />
                {language === "en" ? "Management Consulting" : "Conseil en gestion"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="text-hero-title">
                {language === "en" ? (
                  <>Improve Your Processes. Strengthen Your Leadership. <span className="text-accent">Elevate Performance.</span></>
                ) : (
                  <>Améliorez vos processus. Renforcez votre leadership. <span className="text-accent">Élevez la performance.</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                {language === "en"
                  ? "We help professionals and organizations improve performance through better processes, leadership systems, and people management."
                  : "Nous aidons les professionnels et les organisations à améliorer leur performance grâce à de meilleurs processus, systèmes de leadership et gestion des personnes."}
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <Link href="/free-audit" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-hero-audit">
                  <ClipboardCheck size={16} />
                  {language === "en" ? "Get a Free Audit" : "Obtenez un audit gratuit"}
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-hero-services">
                  {t("hero.ctaSecondary")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
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

        {/* What We Help You Achieve — EY-style editorial split */}
        <section className="py-32 bg-white relative overflow-hidden" data-testid="section-outcomes">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <GradientOrb className="w-80 h-80 bg-accent/5 -bottom-40 -left-40" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "What You Get" : "Ce que vous obtenez"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  {language === "en" ? "What we help you achieve" : "Ce que nous vous aidons à accomplir"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  {language === "en"
                    ? "Whether you lead a team of 5 or 500, the challenge is the same: turning strategy into action. Here is how we help."
                    : "Que vous dirigiez une équipe de 5 ou 500 personnes, le défi est le même : transformer la stratégie en action. Voici comment nous aidons."}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { val: "4x", label: language === "en" ? "Faster execution" : "Exécution plus rapide" },
                    { val: "100%", label: language === "en" ? "Teams aligned" : "Équipes alignées" },
                    { val: "4", label: language === "en" ? "Phase approach" : "Phases structurées" },
                    { val: "24/7", label: language === "en" ? "Portal access" : "Accès portail" },
                  ].map((stat, i) => (
                    <div key={i} className="text-left" data-testid={`stat-hero-${i}`}>
                      <p className="text-3xl md:text-4xl font-extrabold text-accent mb-1">{stat.val}</p>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                    <VideoWithSubtitles />
                  </div>
                  <FloatingShape className="w-20 h-20 -top-5 -right-5 z-[-1]" variant="square" />
                  <FloatingShape className="w-12 h-12 -bottom-3 right-10 z-[-1]" variant="ring" />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-border max-w-[240px] hidden md:block animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <BarChart3 size={20} className="text-accent" />
                      </div>
                      <p className="text-sm font-bold text-primary">{language === "en" ? "Measurable Results" : "Résultats mesurables"}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{language === "en" ? "Track progress with clear KPIs and dashboards" : "Suivez les progrès avec des KPI clairs"}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {outcomes.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="relative flex gap-6 p-8 rounded-2xl border border-border bg-white hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 group overflow-hidden h-full" data-testid={`outcome-card-${i}`}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent/0 group-hover:bg-accent transition-all duration-300" />
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Work With — EY-style full-bleed cards */}
        <section className="py-32 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-who-we-help">
          <FloatingShape className="w-24 h-24 top-20 -left-8" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
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
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whoWeHelp.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
                  <div className="group cursor-pointer" data-testid={`who-card-${i}`}>
                    <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/3]">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent group-hover:from-primary/90 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed px-1">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

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

        {/* Mid-Page CTA — EY-style full-bleed image CTA */}
        <section className="relative py-28 overflow-hidden" data-testid="section-mid-cta">
          <div className="absolute inset-0">
            <img src={cityAerialImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-white mb-4">
              {language === "en" ? "Not sure where to start?" : "Vous ne savez pas par où commencer ?"}
            </h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto text-lg">
              {language === "en"
                ? "Get a free Process & People Management Audit. We'll identify operational and leadership inefficiencies in just 20 minutes."
                : "Obtenez un audit gratuit de vos processus et de gestion des personnes. Nous identifierons les inefficacités en seulement 20 minutes."}
            </p>
            <Link href="/free-audit" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-mid-cta-audit">
              <ClipboardCheck size={16} />
              {language === "en" ? "Get Your Free Audit" : "Obtenez votre audit gratuit"}
            </Link>
          </div>
        </section>

        {/* Our Approach — EY-style timeline with large imagery */}
        <section id="framework" className="py-32 bg-white relative overflow-hidden" data-testid="section-framework">
          <GeometricAccent className="-left-10 top-40 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <AnimateOnScroll animation="fade-left">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img src={strategyWhiteboardImg} alt="Strategy planning" className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <FloatingShape className="w-24 h-24 -top-4 -right-4 z-[-1]" variant="square" />
                  <FloatingShape className="w-32 h-32 -bottom-4 -left-4 z-[-1]" variant="ring" />
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "How We Work" : "Comment nous travaillons"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  {language === "en" ? "Our four-phase approach" : "Notre approche en quatre phases"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  {language === "en"
                    ? "We follow a structured process that takes you from where you are today to where you want to be, with clear milestones along the way."
                    : "Nous suivons un processus structuré qui vous mène de votre situation actuelle à vos objectifs, avec des jalons clairs en cours de route."}
                </p>
                <Link href="/approach" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors group" data-testid="link-learn-approach">
                  {language === "en" ? "Explore our methodology" : "Découvrir notre méthodologie"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimateOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative max-w-6xl mx-auto">
              <div className="hidden lg:block absolute top-[100px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-0" />
              {frameworkSteps.map((step, i) => (
                <div key={i} className="relative z-10" data-testid={`framework-step-${i}`}>
                  <div className="mx-2 h-full flex flex-col items-center group">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white text-sm font-black shadow-lg shadow-accent/30">
                        {step.step}
                      </div>
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">{step.label}</p>
                      <h3 className="text-base font-bold text-primary mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < frameworkSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-[50px] -right-1 transform z-20">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-sm">
                        <ChevronRight size={12} className="text-accent" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services — EY-style editorial grid with large imagery */}
        <section className="py-32 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-services">
          <FloatingShape className="w-20 h-20 top-32 right-10" variant="ring" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-32 right-20" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "What We Offer" : "Ce que nous offrons"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Find the right level of support" : "Trouvez le bon niveau de soutien"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "From operational strategy and leadership systems to recruiting, staffing, and career placement — we help companies hire the right talent and professionals land the right roles."
                  : "De la stratégie opérationnelle et des systèmes de leadership au recrutement, à la dotation et au placement de carrière — nous aidons les entreprises à recruter et les professionnels à se faire recruter."}
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
              {services.slice(0, 3).map((s, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
                  <Link href="/services" className="block h-full group" data-testid={`link-service-${i}`}>
                    <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] shadow-lg" data-testid={`service-card-${i}`}>
                      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10 group-hover:from-primary/95 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">{s.desc}</p>
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-transform">
                          {language === "en" ? "Learn more" : "En savoir plus"} <ArrowRight size={14} className="ml-2" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.slice(3).map((s, i) => (
                <AnimateOnScroll key={i + 3} animation="fade-up" delay={(i + 3) * 100}>
                  <Link href="/services" className="block h-full group" data-testid={`link-service-${i + 3}`}>
                    <div className="relative rounded-2xl overflow-hidden h-full min-h-[350px] shadow-lg" data-testid={`service-card-${i + 3}`}>
                      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10 group-hover:from-primary/95 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">{s.desc}</p>
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-transform">
                          {language === "en" ? "Learn more" : "En savoir plus"} <ArrowRight size={14} className="ml-2" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Results — EY-style bold stats with editorial image */}
        <section className="py-32 bg-primary relative overflow-hidden" data-testid="section-results">
          <div className="absolute inset-0">
            <img src={processFlowImg} alt="" className="w-full h-full object-cover opacity-10 animate-ken-burns" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.12),transparent_60%)]" />
          <FloatingShape className="w-16 h-16 top-20 right-[15%]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-32 left-[10%]" variant="dot" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "The Outcomes" : "Les résultats"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
                  {language === "en" ? "What working with us looks like" : "Ce à quoi ressemble le travail avec nous"}
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-10">
                  {language === "en"
                    ? "Our clients do not pay for consulting hours. They invest in outcomes. Here is what you can expect."
                    : "Nos clients n'achètent pas des heures de conseil. Ils investissent dans des résultats. Voici ce à quoi vous pouvez vous attendre."}
                </p>

                <div className="grid grid-cols-3 gap-8 mb-10">
                  <div data-testid="stat-alignment">
                    <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">100%</p>
                    <p className="text-white/50 text-sm">{language === "en" ? "Teams aligned" : "Équipes alignées"}</p>
                  </div>
                  <div data-testid="stat-execution">
                    <p className="text-4xl md:text-5xl font-extrabold text-accent mb-2">4</p>
                    <p className="text-white/50 text-sm">{language === "en" ? "Phase approach" : "Phases"}</p>
                  </div>
                  <div data-testid="stat-sustainable">
                    <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">∞</p>
                    <p className="text-white/50 text-sm">{language === "en" ? "Lasting systems" : "Systèmes durables"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    language === "en" ? "Teams executing on the same priorities" : "Des équipes exécutant les mêmes priorités",
                    language === "en" ? "Clear KPIs everyone can track" : "Des KPI clairs que tous peuvent suivre",
                    language === "en" ? "Leadership that communicates effectively" : "Un leadership qui communique efficacement",
                    language === "en" ? "Processes that reduce daily firefighting" : "Des processus qui réduisent la gestion de crise quotidienne",
                    language === "en" ? "Decisions backed by data, not guesswork" : "Des décisions basées sur les données, pas sur l'intuition",
                    language === "en" ? "Growth without adding unnecessary complexity" : "De la croissance sans complexité inutile",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 py-2" data-testid={`result-item-${i}`}>
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      <span className="text-white/80 text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200} className="relative hidden lg:block">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                  <img src={analyticsDashboardImg} alt="Performance analytics" className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <FloatingShape className="w-28 h-28 -top-6 -right-6 z-[-1]" variant="square" />
                <FloatingShape className="w-20 h-20 -bottom-6 -left-6 z-[-1]" variant="ring" />
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Insights */}
        <section className="py-32 bg-white relative overflow-hidden" data-testid="section-insights">
          <GeometricAccent className="top-10 right-20 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "From Our Practice" : "De notre pratique"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-2">
                  {language === "en" ? "Latest Insights" : "Dernières perspectives"}
                </h2>
              </div>
              <Link href="/insights" className="inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all mt-6 md:mt-0 group" data-testid="link-view-all-insights">
                {language === "en" ? "View all insights" : "Voir toutes les perspectives"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((insight, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
                  <Link href="/insights" className="block h-full" data-testid={`link-insight-${i}`}>
                    <div className="bg-white rounded-2xl border border-border hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 cursor-pointer group h-full flex flex-col overflow-hidden" data-testid={`insight-card-${i}`}>
                      <div className="h-48 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30">
                          <img src={geoPatternImg} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <span className="relative z-10 text-5xl font-extrabold text-primary/10 group-hover:text-accent/20 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                            <Tag size={10} /> {insight.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar size={10} /> {insight.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-4 group-hover:text-accent transition-colors line-clamp-2">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3">{insight.excerpt}</p>
                        <div className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                          {language === "en" ? "Read more" : "Lire la suite"} <ArrowRight size={14} className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA — EY-style with featured image */}
        <section className="py-32 bg-[#F8FAFC] border-t" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll animation="fade-scale">
              <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto">
                <div className="absolute inset-0">
                  <img src={smallBizOwnerImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
                </div>
                <FloatingShape className="w-14 h-14 top-10 right-10 z-[5]" variant="ring" />
                <div className="relative z-10 p-12 lg:p-20 max-w-2xl">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6">
                    {language === "en" ? "Let's Talk" : "Parlons-en"}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                    {language === "en"
                      ? "Ready to build something that works?"
                      : "Prêt à construire quelque chose qui fonctionne ?"}
                  </h2>
                  <p className="text-lg text-white/70 mb-12">
                    {language === "en"
                      ? "Whether you are leading a team, growing a business, or leveling up your own performance, the first step is a conversation. Let's figure out the right path forward, together."
                      : "Que vous dirigiez une équipe, développiez une entreprise ou amélioriez votre propre performance, la première étape est une conversation. Trouvons ensemble la bonne voie à suivre."}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/free-audit" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-cta-audit">
                      <ClipboardCheck size={16} />
                      {language === "en" ? "Get a Free Audit" : "Obtenez un audit gratuit"}
                    </Link>
                    <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-cta-services">
                      {language === "en" ? "Explore services" : "Découvrir les services"}
                      <ArrowRight size={16} />
                    </Link>
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