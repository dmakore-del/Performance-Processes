import { useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SEOHead } from "@/components/SEOHead";
import { OfferCard } from "@/components/OfferCard";
import { getOffersByCategory } from "@shared/offers";
import { useLanguage } from "@/hooks/use-language";

import heroVideoPoster from "@assets/generated/hero-video-poster.png";
import cityAerialImg from "@assets/generated/city-aerial-new.png";
import teamCollabImg from "@assets/generated/team-collab-color.png";
import workspaceImg from "@assets/stock_images/workspace1.jpg";
import teamMovingForwardImg from "@assets/generated/team-moving-forward.png";

const BOOKINGS_URL =
  "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CONTENT = {
  en: {
    hero: {
      titlePrefix: "We build the systems that help small businesses ",
      titleAccent: "scale",
      titleSuffix: ".",
      subtitle:
        "Websites, marketing, CRM, and operations, designed, built, and installed as one system, with the hands-on support to make it stick.",
      exploreCta: "Explore our work",
      bookCta: "Book a strategy call",
    },
    manifesto: {
      eyebrow: "Our point of view",
      headlinePrefix: "Most firms sell hours. We ",
      headlineAccent: "install",
      headlineSuffix:
        " infrastructure that keeps working long after the engagement ends.",
      pillars: [
        {
          k: "One system",
          v: "People, marketing, web, CRM, and operations, integrated, not stitched together.",
        },
        {
          k: "Built to run",
          v: "We don't just advise. We design, build, and operate the systems alongside you.",
        },
        {
          k: "Compounds over time",
          v: "Every engagement leaves behind playbooks, pipelines, and infrastructure you keep.",
        },
      ],
    },
    capabilities: {
      eyebrow: "What we do",
      headline: "Five practices, one growth engine.",
      body: "Each capability stands on its own, and works better as part of the whole.",
      viewAll: "View all services",
      imageAlt: "Two professionals discussing ideas in a bright workspace",
      items: [
        {
          label: "01",
          title: "Websites",
          desc: "Editorial design and conversion-ready build for brands that want to be taken seriously.",
          href: "/services/website-services",
        },
        {
          label: "02",
          title: "Marketing Systems",
          desc: "Brand, content, and lifecycle marketing built into a system that compounds, not random posts.",
          href: "/services/marketing-services",
        },
        {
          label: "03",
          title: "CRM & Lead Tracking",
          desc: "Pipelines and structured follow-up so every lead is accounted for.",
          href: "/services/crm-lead-tracking",
        },
        {
          label: "04",
          title: "Business Systems",
          desc: "Audits, KPIs, SOPs, and the operating rhythms that keep a company running without you.",
          href: "/services/business-systems",
        },
        {
          label: "05",
          title: "People & Recruiting",
          desc: "Hiring strategy, recruitment systems, and HR foundations for growing teams.",
          href: "/services/hr-recruiting",
        },
      ],
    },
    imageBandAlt: "Modern architecture",
    packages: {
      eyebrow: "Headline packages",
      headlinePrefix: "Buy a complete ",
      headlineAccent: "system",
      headlineSuffix: ", not just hours.",
      body: "Four productized packages, each solving a full business outcome. Pay online by card, debit, or PayPal, and we get started.",
      imageAlt: "An entrepreneur working in a sunlit modern office",
      seeAll: "See the full catalog",
    },
    process: {
      eyebrow: "How we help",
      headlinePrefix: "A clear path from chaos to ",
      headlineAccent: "systems",
      headlineSuffix: ".",
      items: [
        {
          step: "01",
          title: "Assess",
          desc: "We audit where you are today, your systems, gaps, and biggest opportunities, and map the path forward.",
        },
        {
          step: "02",
          title: "Build",
          desc: "We design and build the systems you need: websites, marketing, CRM, hiring, SOPs, and KPIs.",
        },
        {
          step: "03",
          title: "Implement",
          desc: "We install the systems into your day-to-day, automate the busywork, and train your team to run them.",
        },
        {
          step: "04",
          title: "Improve",
          desc: "We track performance against clear KPIs and keep refining so the systems compound over time.",
        },
      ],
    },
    cta: {
      headlinePrefix: "Ready to install the ",
      headlineAccent: "infrastructure",
      headlineSuffix: " your business needs to scale?",
      bookCta: "Book a strategy call",
      servicesCta: "Explore our services",
      location: "Toronto · Ontario · Canada",
    },
  },
  fr: {
    hero: {
      titlePrefix: "Nous bâtissons les systèmes qui aident les petites entreprises à ",
      titleAccent: "croître",
      titleSuffix: ".",
      subtitle:
        "Sites web, marketing, CRM et opérations, conçus, bâtis et déployés comme un seul système, avec un accompagnement concret pour que tout tienne dans le temps.",
      exploreCta: "Découvrir nos réalisations",
      bookCta: "Réserver un appel stratégique",
    },
    manifesto: {
      eyebrow: "Notre point de vue",
      headlinePrefix: "La plupart des firmes vendent des heures. Nous ",
      headlineAccent: "installons",
      headlineSuffix:
        " une infrastructure qui continue de fonctionner longtemps après la fin du mandat.",
      pillars: [
        {
          k: "Un seul système",
          v: "Ressources humaines, marketing, web, CRM et opérations, intégrés, pas assemblés à la hâte.",
        },
        {
          k: "Conçu pour fonctionner",
          v: "Nous ne faisons pas que conseiller. Nous concevons, bâtissons et exploitons les systèmes à vos côtés.",
        },
        {
          k: "Des effets qui se cumulent",
          v: "Chaque mandat laisse derrière lui des guides, des pipelines et une infrastructure qui vous appartiennent.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Ce que nous faisons",
      headline: "Cinq pratiques, un seul moteur de croissance.",
      body: "Chaque capacité tient sur elle-même et donne encore plus de résultats lorsqu'elle s'intègre à l'ensemble.",
      viewAll: "Voir tous les services",
      imageAlt: "Deux professionnels échangeant des idées dans un espace de travail lumineux",
      items: [
        {
          label: "01",
          title: "Sites web",
          desc: "Design éditorial et conception axée sur la conversion pour les marques qui veulent être prises au sérieux.",
          href: "/services/website-services",
        },
        {
          label: "02",
          title: "Systèmes de marketing",
          desc: "Marque, contenu et marketing relationnel intégrés dans un système qui se cumule, pas des publications au hasard.",
          href: "/services/marketing-services",
        },
        {
          label: "03",
          title: "CRM et suivi des prospects",
          desc: "Des pipelines et un suivi structuré pour que chaque prospect soit pris en charge.",
          href: "/services/crm-lead-tracking",
        },
        {
          label: "04",
          title: "Systèmes d'affaires",
          desc: "Audits, indicateurs, procédures et rythmes d'exploitation qui font tourner l'entreprise sans vous.",
          href: "/services/business-systems",
        },
        {
          label: "05",
          title: "Ressources humaines et recrutement",
          desc: "Stratégie d'embauche, systèmes de recrutement et fondations RH pour les équipes en croissance.",
          href: "/services/hr-recruiting",
        },
      ],
    },
    imageBandAlt: "Architecture moderne",
    packages: {
      eyebrow: "Forfaits phares",
      headlinePrefix: "Achetez un ",
      headlineAccent: "système",
      headlineSuffix: " complet, pas seulement des heures.",
      body: "Quatre forfaits clés en main, chacun réglant un résultat d'affaires complet. Payez en ligne par carte, débit ou PayPal, et nous démarrons.",
      imageAlt: "Une entrepreneure au travail dans un bureau moderne baigné de lumière",
      seeAll: "Voir le catalogue complet",
    },
    process: {
      eyebrow: "Comment nous aidons",
      headlinePrefix: "Un chemin clair du chaos vers les ",
      headlineAccent: "systèmes",
      headlineSuffix: ".",
      items: [
        {
          step: "01",
          title: "Évaluer",
          desc: "Nous analysons votre situation actuelle, vos systèmes, vos lacunes et vos plus grandes occasions, puis nous traçons la voie à suivre.",
        },
        {
          step: "02",
          title: "Bâtir",
          desc: "Nous concevons et bâtissons les systèmes dont vous avez besoin : sites web, marketing, CRM, embauche, procédures et indicateurs.",
        },
        {
          step: "03",
          title: "Déployer",
          desc: "Nous installons les systèmes dans votre quotidien, automatisons les tâches répétitives et formons votre équipe à les faire fonctionner.",
        },
        {
          step: "04",
          title: "Améliorer",
          desc: "Nous suivons la performance selon des indicateurs clairs et continuons de peaufiner pour que les systèmes se cumulent avec le temps.",
        },
      ],
    },
    cta: {
      headlinePrefix: "Prêt à installer l'",
      headlineAccent: "infrastructure",
      headlineSuffix: " dont votre entreprise a besoin pour croître?",
      bookCta: "Réserver un appel stratégique",
      servicesCta: "Découvrir nos services",
      location: "Toronto · Ontario · Canada",
    },
  },
} as const;

const PACKAGES = getOffersByCategory("packages");

export default function Home() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    const onInteract = () => tryPlay();
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { once: true });
    window.addEventListener("scroll", onInteract, { once: true });
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden">
      <SEOHead
        title="Performance Processes | We Build the Systems That Help Businesses Scale"
        description="From recruiting and HR to marketing, websites, and operational playbooks, Performance Processes installs the infrastructure growing companies need to scale with confidence."
        path="/"
      />
      <Navbar />

      <main className="flex-grow">
        {/* ——————————————————————————————————————————————————————————
            HERO, full-bleed colour video, delicate serif headline
        ———————————————————————————————————————————————————————————— */}
        <section
          className="relative min-h-[90svh] flex items-center overflow-hidden bg-primary"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={heroVideoPoster}
              className="no-grayscale w-full h-full object-cover"
              data-testid="video-hero"
              ref={heroVideoRef}
              {...{ "webkit-playsinline": "true" } as any}
            >
              <source src="/assets/videos/hero-strategy-v2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/25" />
          </div>

          <div className="container mx-auto px-6 md:px-8 pt-32 pb-24 relative z-10">
            <div className="max-w-3xl animate-fade-in-up">
              <h1
                className="text-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] mb-8"
                data-testid="text-hero-title"
              >
                {c.hero.titlePrefix}
                <span className="text-display-italic text-accent">{c.hero.titleAccent}</span>{c.hero.titleSuffix}
              </h1>
              <p
                className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-12 font-light"
                data-testid="text-hero-subtitle"
              >
                {c.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center bg-white text-primary hover:bg-accent hover:text-white h-14 px-9 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                  data-testid="link-hero-services"
                >
                  {c.hero.exploreCta}
                </Link>
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white/35 text-white hover:bg-white/10 h-14 px-9 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                  data-testid="link-hero-book"
                >
                  {c.hero.bookCta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ——————————————————————————————————————————————————————————
            MANIFESTO, oversized editorial serif on white
        ———————————————————————————————————————————————————————————— */}
        <section className="py-28 md:py-40 bg-background" data-testid="section-manifesto">
          <div className="container mx-auto px-6 md:px-8">
            <AnimateOnScroll>
              <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-12">
                {c.manifesto.eyebrow}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h2
                className="text-display text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.12] max-w-5xl"
                data-testid="text-manifesto-headline"
              >
                {c.manifesto.headlinePrefix}
                <span className="text-display-italic text-accent">{c.manifesto.headlineAccent}</span>{c.manifesto.headlineSuffix}
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 mt-20 max-w-5xl">
              {c.manifesto.pillars.map((p, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div data-testid={`manifesto-pillar-${i}`} className="border-t border-border pt-6">
                    <p className="text-sm uppercase tracking-[0.18em] text-primary font-semibold mb-3">
                      {p.k}
                    </p>
                    <p className="text-[15px] text-muted-foreground leading-relaxed font-light">
                      {p.v}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ——————————————————————————————————————————————————————————
            CAPABILITIES, clean, scannable editorial list
        ———————————————————————————————————————————————————————————— */}
        <section
          className="py-24 md:py-32 bg-secondary/40 border-y border-border"
          data-testid="section-capabilities"
        >
          <div className="container mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <AnimateOnScroll className="lg:col-span-4">
                <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-8">
                  {c.capabilities.eyebrow}
                </p>
                <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
                  {c.capabilities.headline}
                </h2>
                <p className="text-muted-foreground leading-relaxed font-light max-w-sm mb-8">
                  {c.capabilities.body}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-xs uppercase tracking-[0.2em] font-semibold"
                  data-testid="link-capabilities-all"
                >
                  {c.capabilities.viewAll} <span aria-hidden="true">→</span>
                </Link>
                <div className="mt-12 aspect-[4/3] overflow-hidden">
                  <img
                    src={teamCollabImg}
                    alt={c.capabilities.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimateOnScroll>

              <div className="lg:col-span-8">
                {c.capabilities.items.map((cap, i) => (
                  <AnimateOnScroll key={i} animation="fade-up" delay={i * 70}>
                    <Link
                      href={cap.href}
                      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 md:gap-8 py-7 border-t border-border last:border-b hover:bg-background transition-colors"
                      data-testid={`link-capability-${i}`}
                    >
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {cap.label}
                      </span>
                      <span>
                        <span className="block text-display text-primary text-2xl md:text-3xl group-hover:text-accent transition-colors">
                          {cap.title}
                        </span>
                        <span className="block text-sm text-muted-foreground leading-relaxed font-light mt-1.5 max-w-lg">
                          {cap.desc}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-lg text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all"
                      >
                        →
                      </span>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——————————————————————————————————————————————————————————
            IMAGE BAND, full-bleed
        ———————————————————————————————————————————————————————————— */}
        <section className="relative h-[42vh] md:h-[60vh] overflow-hidden bg-primary" data-testid="section-image-band">
          <img
            src={cityAerialImg}
            alt={c.imageBandAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/15" />
        </section>

        {/* ——————————————————————————————————————————————————————————
            PACKAGES, buyable productized systems
        ———————————————————————————————————————————————————————————— */}
        <section className="py-24 md:py-32 bg-background" data-testid="section-packages">
          <div className="container mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
              <AnimateOnScroll>
                <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-8">
                  {c.packages.eyebrow}
                </p>
                <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                  {c.packages.headlinePrefix}
                  <span className="text-display-italic text-accent">{c.packages.headlineAccent}</span>{c.packages.headlineSuffix}
                </h2>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {c.packages.body}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={workspaceImg}
                    alt={c.packages.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimateOnScroll>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {PACKAGES.map((offer, i) => (
                <AnimateOnScroll key={offer.id} animation="fade-up" delay={i * 80}>
                  <OfferCard offer={offer} returnPage="/services" />
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll className="mt-14">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-xs uppercase tracking-[0.2em] font-semibold"
                data-testid="link-packages-all"
              >
                {c.packages.seeAll} <span aria-hidden="true">→</span>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ——————————————————————————————————————————————————————————
            PROCESS, how we help, four quiet steps
        ———————————————————————————————————————————————————————————— */}
        <section className="py-24 md:py-32 bg-secondary/40 border-y border-border" data-testid="section-process">
          <div className="container mx-auto px-6 md:px-8">
            <AnimateOnScroll className="max-w-3xl mb-16">
              <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-8">
                {c.process.eyebrow}
              </p>
              <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {c.process.headlinePrefix}
                <span className="text-display-italic text-accent">{c.process.headlineAccent}</span>{c.process.headlineSuffix}
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {c.process.items.map((s, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 90}>
                  <div data-testid={`process-step-${i}`} className="border-t border-primary/20 pt-6">
                    <p className="text-display text-primary/30 text-5xl mb-5">{s.step}</p>
                    <h3 className="text-display text-primary text-2xl mb-3">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      {s.desc}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ——————————————————————————————————————————————————————————
            CLOSING CTA, calm full-bleed
        ———————————————————————————————————————————————————————————— */}
        <section className="relative bg-primary overflow-hidden" data-testid="section-cta">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              {...{ "webkit-playsinline": "true" } as any}
              className="w-full h-full object-cover opacity-40"
              poster={teamMovingForwardImg}
            >
              <source src="/assets/videos/navy-particles.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/80 to-primary" />
          </div>
          <div className="container mx-auto px-6 md:px-8 relative z-10 py-28 md:py-40">
            <AnimateOnScroll>
              <h2
                className="text-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-10 max-w-4xl"
                data-testid="text-cta-headline"
              >
                {c.cta.headlinePrefix}
                <span className="text-display-italic text-accent">{c.cta.headlineAccent}</span>{c.cta.headlineSuffix}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-primary hover:bg-accent hover:text-white h-14 px-10 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                  data-testid="link-cta-book"
                >
                  {c.cta.bookCta}
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center border border-white/35 text-white hover:bg-white/10 h-14 px-10 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                  data-testid="link-cta-services"
                >
                  {c.cta.servicesCta}
                </Link>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="relative z-10 border-t border-white/15">
            <div className="container mx-auto px-6 md:px-8 py-5 flex items-center justify-between text-white/50 text-[11px] uppercase tracking-[0.3em]">
              <span>Performance Processes</span>
              <span className="hidden md:inline">{c.cta.location}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
