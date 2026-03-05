import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Target,
  Settings,
  BarChart3,
  Briefcase,
  GraduationCap,
  Rocket,
  BookOpen,
  Calendar,
  Tag,
  RefreshCw,
  Building2,
  Heart,
  Shield,
  Award,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function Home() {
  const { t, language } = useLanguage();

  const outcomes = [
    {
      icon: Target,
      title: language === "en" ? "Clear Leadership Alignment" : "Alignement clair du leadership",
      desc: language === "en"
        ? "Unify your leadership team around shared goals and strategic priorities."
        : "Unifiez votre équipe de direction autour d'objectifs communs et de priorités stratégiques.",
    },
    {
      icon: BarChart3,
      title: language === "en" ? "Stronger Strategy Execution" : "Exécution stratégique renforcée",
      desc: language === "en"
        ? "Turn plans into measurable action with accountability systems that work."
        : "Transformez les plans en actions mesurables avec des systèmes de responsabilité efficaces.",
    },
    {
      icon: TrendingUp,
      title: language === "en" ? "Improved Organizational Performance" : "Performance organisationnelle améliorée",
      desc: language === "en"
        ? "Drive consistent results through structured processes and data-driven decisions."
        : "Obtenez des résultats constants grâce à des processus structurés et des décisions basées sur les données.",
    },
    {
      icon: RefreshCw,
      title: language === "en" ? "Sustainable Accountability Systems" : "Systèmes de responsabilité durables",
      desc: language === "en"
        ? "Build internal capability that lasts long after the engagement ends."
        : "Développez des capacités internes qui perdurent bien après la fin de l'engagement.",
    },
  ];

  const whoWeHelp = [
    {
      icon: <Briefcase className="text-accent" size={32} />,
      title: language === "en" ? "Leaders & Organizations" : "Dirigeants et organisations",
      desc: language === "en"
        ? "Improve strategy, execution, and team performance."
        : "Améliorer la stratégie, l'exécution et la performance des équipes.",
    },
    {
      icon: <Rocket className="text-accent" size={32} />,
      title: language === "en" ? "Small Businesses" : "Petites entreprises",
      desc: language === "en"
        ? "Build structure, accountability, and growth systems."
        : "Bâtir la structure, la responsabilité et les systèmes de croissance.",
    },
    {
      icon: <GraduationCap className="text-accent" size={32} />,
      title: language === "en" ? "Professionals" : "Professionnels",
      desc: language === "en"
        ? "Improve focus, productivity, and career performance."
        : "Améliorer la concentration, la productivité et la performance de carrière.",
    },
  ];

  const frameworkSteps = [
    {
      step: "01",
      label: language === "en" ? "Diagnose" : "Diagnostiquer",
      icon: <Target size={28} />,
      title: language === "en" ? "Diagnose Challenges" : "Diagnostiquer les défis",
      desc: language === "en"
        ? "Assess your organization's current state, gaps, and opportunities through stakeholder interviews and data analysis."
        : "Évaluez l'état actuel de votre organisation, les lacunes et les opportunités grâce aux entretiens et à l'analyse des données.",
    },
    {
      step: "02",
      label: language === "en" ? "Align" : "Aligner",
      icon: <Users size={28} />,
      title: language === "en" ? "Align Leadership" : "Aligner le leadership",
      desc: language === "en"
        ? "Clarify strategic direction, build consensus, and ensure every level of the organization understands the priorities."
        : "Clarifiez la direction stratégique, construisez un consensus et assurez-vous que chaque niveau comprend les priorités.",
    },
    {
      step: "03",
      label: language === "en" ? "Implement" : "Mettre en œuvre",
      icon: <Settings size={28} />,
      title: language === "en" ? "Implement Processes" : "Mettre en œuvre les processus",
      desc: language === "en"
        ? "Deploy structured systems, train your teams, and build internal capability for sustainable improvement."
        : "Déployez des systèmes structurés, formez vos équipes et développez les capacités internes pour une amélioration durable.",
    },
    {
      step: "04",
      label: language === "en" ? "Measure" : "Mesurer",
      icon: <BarChart3 size={28} />,
      title: language === "en" ? "Measure Outcomes" : "Mesurer les résultats",
      desc: language === "en"
        ? "Track progress with clear KPIs, optimize continuously, and ensure measurable ROI on every initiative."
        : "Suivez les progrès avec des KPI clairs, optimisez en continu et assurez un ROI mesurable sur chaque initiative.",
    },
  ];

  const services = [
    {
      icon: <Briefcase className="text-accent" />,
      title: language === "en" ? "Executive Advisory" : "Conseil exécutif",
      desc: language === "en"
        ? "Strategic performance systems for leadership teams."
        : "Systèmes de performance stratégiques pour les équipes de direction.",
    },
    {
      icon: <Rocket className="text-accent" />,
      title: language === "en" ? "Small Business Performance Program" : "Programme de performance pour petites entreprises",
      desc: language === "en"
        ? "Structure and accountability for growing companies."
        : "Structure et responsabilité pour les entreprises en croissance.",
    },
    {
      icon: <GraduationCap className="text-accent" />,
      title: language === "en" ? "Personal Performance Coaching" : "Coaching de performance personnelle",
      desc: language === "en"
        ? "Build systems that improve daily performance."
        : "Construire des systèmes qui améliorent la performance quotidienne.",
    },
    {
      icon: <BookOpen className="text-accent" />,
      title: language === "en" ? "Programs & Tools" : "Programmes et outils",
      desc: language === "en"
        ? "Self-serve planners, toolkits, and 90-day programs."
        : "Planificateurs, boîtes à outils et programmes de 90 jours en libre-service.",
    },
  ];

  const industries = [
    { icon: Building2, label: language === "en" ? "Corporate" : "Entreprises" },
    { icon: Heart, label: language === "en" ? "Nonprofit" : "OBNL" },
    { icon: Shield, label: language === "en" ? "Government" : "Gouvernement" },
    { icon: Rocket, label: language === "en" ? "Startups" : "Startups" },
    { icon: GraduationCap, label: language === "en" ? "Education" : "Éducation" },
    { icon: Award, label: language === "en" ? "Professional Services" : "Services professionnels" },
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
        {/* Hero — Dark, Outcome-Focused */}
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
                  <>Improve Organizational Performance and <span className="text-accent">Strategic Alignment</span></>
                ) : (
                  <>Améliorez la performance organisationnelle et <span className="text-accent">l'alignement stratégique</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl" data-testid="text-hero-subtitle">
                {language === "en"
                  ? "We help leadership teams strengthen strategy execution, accountability, and measurable results across corporate, nonprofit, and mission-driven organizations."
                  : "Nous aidons les équipes de direction à renforcer l'exécution stratégique, la responsabilité et les résultats mesurables dans les organisations corporatives, à but non lucratif et à vocation sociale."}
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

        {/* What We Help Organizations Achieve */}
        <section className="py-32 bg-white" data-testid="section-outcomes">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Why Organizations Choose Us" : "Pourquoi les organisations nous choisissent"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "What we help organizations achieve" : "Ce que nous aidons les organisations à accomplir"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "We partner with leadership teams to solve the structural challenges that hold organizations back from reaching their potential."
                  : "Nous nous associons aux équipes de direction pour résoudre les défis structurels qui empêchent les organisations d'atteindre leur potentiel."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {outcomes.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-6 p-8 bg-gradient-to-br from-[#F8FAFC] to-white rounded-3xl border border-border hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 group" data-testid={`outcome-card-${i}`}>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-accent group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-32 bg-[#F8FAFC]" data-testid="section-who-we-help">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Who We Work With" : "Avec qui nous travaillons"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Performance systems for every level" : "Des systèmes de performance pour chaque niveau"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Supporting corporate, nonprofit, and mission-driven organizations of all sizes."
                  : "Accompagnement des organisations corporatives, à but non lucratif et à vocation sociale de toutes tailles."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {whoWeHelp.map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-white via-white to-accent/5 rounded-3xl p-12 border border-border text-center hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 group" data-testid={`who-card-${i}`}>
                  <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <span className="group-hover:text-white transition-colors">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Industries strip */}
            <div className="mt-20 pt-16 border-t border-border/60">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-10">
                {language === "en" ? "Industries We Serve" : "Industries que nous desservons"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {industries.map((ind, i) => {
                  const Icon = ind.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 text-primary/60" data-testid={`industry-${i}`}>
                      <Icon size={16} />
                      <span className="text-sm font-medium">{ind.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="py-20 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 border-y border-accent/10" data-testid="section-mid-cta">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-4">
              {language === "en" ? "Have organizational challenges you want to discuss?" : "Avez-vous des défis organisationnels à discuter ?"}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {language === "en"
                ? "Book a complimentary strategy session to explore how we can help."
                : "Réservez une session stratégique gratuite pour explorer comment nous pouvons vous aider."}
            </p>
            <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-accent/90 h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent/20" data-testid="link-mid-cta-book">
              <Calendar size={16} />
              {language === "en" ? "Discuss Your Challenges" : "Discutez de vos défis"}
            </a>
          </div>
        </section>

        {/* Our Approach — Framework Diagram */}
        <section id="framework" className="py-32 bg-white" data-testid="section-framework">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Our Approach" : "Notre approche"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Performance Improvement Model" : "Modèle d'amélioration de la performance"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "A proven four-phase methodology that moves organizations from assessment to measurable outcomes."
                  : "Une méthodologie éprouvée en quatre phases qui fait passer les organisations de l'évaluation aux résultats mesurables."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative max-w-6xl mx-auto">
              {frameworkSteps.map((step, i) => (
                <div key={i} className="relative" data-testid={`framework-step-${i}`}>
                  <div className="bg-gradient-to-b from-[#F8FAFC] to-white rounded-3xl p-10 border border-border text-center hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 h-full flex flex-col items-center group mx-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">
                      {language === "en" ? "Phase" : "Phase"} {step.step}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
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
                {language === "en" ? "Our Solutions" : "Nos solutions"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Choose your level of support" : "Choisissez votre niveau de soutien"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s, i) => (
                <Link key={i} href="/services" className="block h-full" data-testid={`link-service-${i}`}>
                  <div className="bg-gradient-to-b from-white to-[#FAFBFD] p-10 rounded-3xl border border-border hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 group cursor-pointer flex flex-col h-full min-h-[300px]" data-testid={`service-card-${i}`}>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      {s.icon}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-4 group-hover:text-accent transition-colors">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{s.desc}</p>
                    <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                      {language === "en" ? "Learn more" : "En savoir plus"} <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Results / Stats Section */}
        <section className="py-32 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden" data-testid="section-results">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Results That Matter" : "Des résultats qui comptent"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
                {language === "en" ? "What our systems deliver" : "Ce que nos systèmes produisent"}
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                {language === "en"
                  ? "Organizations invest in outcomes, not consulting hours. Here is what you can expect."
                  : "Les organisations investissent dans les résultats, pas dans les heures de conseil. Voici ce à quoi vous pouvez vous attendre."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/5 text-center" data-testid="stat-alignment">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-5">
                  <Users size={24} className="text-accent" />
                </div>
                <p className="text-4xl font-extrabold text-white mb-2">100%</p>
                <p className="text-white/60 text-sm">
                  {language === "en" ? "Leadership alignment on strategic direction" : "Alignement du leadership sur la direction stratégique"}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/5 text-center" data-testid="stat-execution">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-5">
                  <Target size={24} className="text-accent" />
                </div>
                <p className="text-4xl font-extrabold text-white mb-2">4-Phase</p>
                <p className="text-white/60 text-sm">
                  {language === "en" ? "Proven methodology from diagnosis to results" : "Méthodologie éprouvée du diagnostic aux résultats"}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/5 text-center" data-testid="stat-sustainable">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-5">
                  <TrendingUp size={24} className="text-accent" />
                </div>
                <p className="text-4xl font-extrabold text-white mb-2">Sustainable</p>
                <p className="text-white/60 text-sm">
                  {language === "en" ? "Internal capability that lasts beyond engagement" : "Capacité interne qui perdure au-delà de l'engagement"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                language === "en" ? "Consistent strategy execution across teams" : "Exécution stratégique cohérente entre les équipes",
                language === "en" ? "Clear KPIs and accountability at every level" : "KPI clairs et responsabilité à chaque niveau",
                language === "en" ? "Stronger leadership alignment and communication" : "Alignement et communication du leadership renforcés",
                language === "en" ? "Measurable performance improvements" : "Améliorations de performance mesurables",
                language === "en" ? "Reduced decision bottlenecks" : "Réduction des goulots d'étranglement décisionnels",
                language === "en" ? "Systems that drive growth without dependency" : "Des systèmes qui favorisent la croissance sans dépendance",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/5" data-testid={`result-item-${i}`}>
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights / Thought Leadership */}
        <section className="py-32 bg-white" data-testid="section-insights">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "Thought Leadership" : "Leadership éclairé"}
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

        {/* Final CTA — Strong Closing */}
        <section className="py-32 bg-[#F8FAFC] border-t" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-[2rem] p-12 lg:p-20 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_70%)]"></div>
              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6">
                  {language === "en" ? "Get Started" : "Commencez"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                  {language === "en"
                    ? "Ready to strengthen your organization's performance?"
                    : "Prêt à renforcer la performance de votre organisation ?"}
                </h2>
                <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
                  {language === "en"
                    ? "Book a complimentary strategy session to discuss your organizational challenges and explore how our methodology can deliver measurable, sustainable results."
                    : "Réservez une session stratégique gratuite pour discuter de vos défis organisationnels et explorer comment notre méthodologie peut produire des résultats mesurables et durables."}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-cta-book">
                    <Calendar size={16} />
                    {language === "en" ? "Schedule a Consultation" : "Planifier une consultation"}
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
