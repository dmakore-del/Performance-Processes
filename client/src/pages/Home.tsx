import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
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
  Zap,
  RefreshCw,
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

export default function Home() {
  const { t, language } = useLanguage();

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
      icon: <Target size={28} />,
      title: language === "en" ? "Define Goals" : "Définir les objectifs",
      desc: language === "en"
        ? "Get clear on what success looks like."
        : "Clarifier ce à quoi ressemble le succès.",
    },
    {
      step: "02",
      icon: <Settings size={28} />,
      title: language === "en" ? "Build Systems" : "Construire les systèmes",
      desc: language === "en"
        ? "Create structures that support consistent execution."
        : "Créer des structures qui soutiennent une exécution cohérente.",
    },
    {
      step: "03",
      icon: <BarChart3 size={28} />,
      title: language === "en" ? "Track Performance" : "Suivre la performance",
      desc: language === "en"
        ? "Monitor progress with clear KPIs and check-ins."
        : "Suivre les progrès avec des KPI clairs et des points de contrôle.",
    },
    {
      step: "04",
      icon: <RefreshCw size={28} />,
      title: language === "en" ? "Improve Results" : "Améliorer les résultats",
      desc: language === "en"
        ? "Adapt, refine, and grow continuously."
        : "S'adapter, affiner et croître en continu.",
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

  const results = [
    { text: language === "en" ? "Improve execution consistently" : "Améliorer l'exécution de manière cohérente" },
    { text: language === "en" ? "Align teams around priorities" : "Aligner les équipes autour des priorités" },
    { text: language === "en" ? "Track measurable progress" : "Suivre les progrès mesurables" },
    { text: language === "en" ? "Strengthen leadership performance" : "Renforcer la performance du leadership" },
    { text: language === "en" ? "Build systems that make your week easier" : "Construire des systèmes qui simplifient votre semaine" },
    { text: language === "en" ? "Grow your business consistently" : "Faire croître votre entreprise de manière cohérente" },
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
        {/* Hero — Clear & Impactful */}
        <section className="bg-white border-b overflow-hidden relative min-h-[650px] lg:min-h-[700px] flex items-center">
          <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20">
              <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-primary/5"></div>
          </div>
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-8" data-testid="badge-hero-tag">
                <Zap size={14} />
                {language === "en" ? "Performance Management Consulting" : "Conseil en gestion de la performance"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-primary mb-6 leading-[1.08]" data-testid="text-hero-title">
                {t("hero.title")} <br />
                <span className="text-accent">{t("hero.titleAccent")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-5 leading-relaxed max-w-2xl" data-testid="text-hero-subtitle">
                {t("hero.subtitle")}
              </p>
              <p className="text-sm text-muted-foreground/70 mb-10 max-w-xl" data-testid="text-hero-audience">
                {language === "en"
                  ? "For leaders, small businesses, entrepreneurs, and professionals ready to build systems that deliver results."
                  : "Pour les dirigeants, petites entreprises, entrepreneurs et professionnels prêts à bâtir des systèmes qui produisent des résultats."}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-accent/90 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-accent/25" data-testid="button-hero-book">
                    <Calendar size={16} className="mr-2" /> {t("hero.ctaPrimary")}
                  </Button>
                </a>
                <Link href="/services">
                  <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all" data-testid="button-hero-services">
                    {t("hero.ctaSecondary")} <ArrowRight size={16} className="ml-2" />
                  </Button>
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

        {/* Who This Is For */}
        <section className="py-28 bg-[#F8FAFC]" data-testid="section-who-we-help">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Who This Is For" : "Pour qui est-ce"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? "Performance systems for everyone" : "Des systèmes de performance pour tous"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {whoWeHelp.map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-white via-white to-accent/5 rounded-3xl p-12 border border-border text-center hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 group" data-testid={`who-card-${i}`}>
                  <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <span className="group-hover:text-white transition-colors">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Performance Processes Method */}
        <section id="framework" className="py-28 bg-white border-y" data-testid="section-framework">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "The Performance Process Method" : "La méthode Performance Process"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? "A continuous cycle of improvement" : "Un cycle continu d'amélioration"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4 mb-6"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Performance is built through systems, not willpower. Our four-step method works for individuals, teams, and organizations."
                  : "La performance se construit par des systèmes, pas par la volonté. Notre méthode en quatre étapes fonctionne pour les individus, les équipes et les organisations."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-16">
              {frameworkSteps.map((step, i) => (
                <div key={i} className="relative" data-testid={`framework-step-${i}`}>
                  <div className="bg-gradient-to-b from-[#F8FAFC] to-white rounded-3xl p-10 border border-border text-center hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 h-full flex flex-col items-center group">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {step.icon}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-3">{language === "en" ? "Step" : "Étape"} {step.step}</div>
                    <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {i < frameworkSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                        <ArrowRight size={14} className="text-accent" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 border border-accent/10 rounded-3xl p-10 text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <RefreshCw size={20} className="text-accent" />
                </div>
                <span className="text-sm font-bold text-primary uppercase tracking-wider">
                  {language === "en" ? "Continuous Cycle" : "Cycle continu"}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "This isn't a one-time engagement. It's an ongoing system of planning, monitoring, development, and evaluation."
                  : "Ce n'est pas un engagement unique. C'est un système continu de planification, suivi, développement et évaluation."}
              </p>
            </div>
          </div>
        </section>

        {/* Services — Simplified Cards */}
        <section className="py-28 bg-[#F8FAFC]" data-testid="section-services">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Our Solutions" : "Nos solutions"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? "Choose your level of support" : "Choisissez votre niveau de soutien"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s, i) => (
                <Link key={i} href="/services">
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

        {/* Results Section */}
        <section className="py-28 bg-gradient-to-br from-primary via-primary to-primary/90" data-testid="section-results">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Results" : "Résultats"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">
                {language === "en" ? "What you can expect" : "Ce à quoi vous pouvez vous attendre"}
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4 mb-6"></div>
              <p className="text-lg text-white/70">
                {language === "en"
                  ? "People buy outcomes, not consulting. Here's what our systems deliver."
                  : "On achète des résultats, pas du conseil. Voici ce que nos systèmes produisent."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {results.map((r, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:bg-white/15 transition-all duration-300" data-testid={`result-item-${i}`}>
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} className="text-accent" />
                  </div>
                  <span className="text-white font-medium">{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights / Thought Leadership */}
        <section className="py-28 bg-white" data-testid="section-insights">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "Thought Leadership" : "Leadership éclairé"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-2">
                  {language === "en" ? "Latest Insights" : "Dernières perspectives"}
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full mt-4"></div>
              </div>
              <Link href="/insights">
                <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all mt-6 md:mt-0" data-testid="button-view-all-insights">
                  {language === "en" ? "View all insights" : "Voir toutes les perspectives"} <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((insight, i) => (
                <Link key={i} href="/insights">
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
        <section className="py-28 bg-[#F8FAFC] border-t" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-[2rem] p-12 lg:p-20 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_70%)]"></div>
              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6">
                  {language === "en" ? "Ready to Begin?" : "Prêt à commencer ?"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                  {language === "en" ? "Start building better performance" : "Commencez à construire une meilleure performance"}
                </h2>
                <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
                  {language === "en"
                    ? "Whether you're a professional, founder, or leading an organization — we'll help you build the systems that turn ambition into results."
                    : "Que vous soyez un professionnel, un fondateur ou à la tête d'une organisation — nous vous aiderons à construire les systèmes qui transforment l'ambition en résultats."}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-accent/25 hover:scale-105" data-testid="button-cta-book">
                      {language === "en" ? "Book a consultation" : "Réserver une consultation"}
                    </Button>
                  </a>
                  <Link href="/services">
                    <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all" data-testid="button-cta-services">
                      {language === "en" ? "Explore services" : "Découvrir les services"} <ArrowRight size={16} className="ml-2" />
                    </Button>
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
