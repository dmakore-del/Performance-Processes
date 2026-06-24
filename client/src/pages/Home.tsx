import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SEOHead } from "@/components/SEOHead";
import { OfferCard } from "@/components/OfferCard";
import { getOffersByCategory } from "@shared/offers";

import heroBgisImg from "@/assets/generated/hero-bgis.png";
import cityAerialImg from "@assets/generated/city-aerial-new.png";
import teamMovingForwardImg from "@assets/generated/team-moving-forward.png";

const BOOKINGS_URL =
  "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CAPABILITIES = [
  {
    label: "01",
    title: "Websites",
    desc: "Editorial design and conversion-ready build for brands that want to be taken seriously.",
    href: "/services#cat-website",
  },
  {
    label: "02",
    title: "Marketing Systems",
    desc: "Brand, content, and lifecycle marketing built into a system that compounds, not random posts.",
    href: "/services#cat-marketing",
  },
  {
    label: "03",
    title: "CRM & Lead Tracking",
    desc: "Pipelines and structured follow-up so every lead is accounted for.",
    href: "/services#cat-crm",
  },
  {
    label: "04",
    title: "Business Systems",
    desc: "Audits, KPIs, SOPs, and the operating rhythms that keep a company running without you.",
    href: "/services#cat-systems",
  },
  {
    label: "05",
    title: "People & Recruiting",
    desc: "Hiring strategy, recruitment systems, and HR foundations for growing teams.",
    href: "/services#cat-hr-recruiting",
  },
];

const PROCESS = [
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
];

const PACKAGES = getOffersByCategory("packages");

export default function Home() {
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
            HERO, full-bleed grayscale video, delicate serif headline
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
              poster={heroBgisImg}
              {...{ "webkit-playsinline": "true" } as any}
              className="w-full h-full object-cover"
            >
              <source src="/assets/videos/hero-atrium.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
          </div>

          <div className="container mx-auto px-6 md:px-8 pt-32 pb-24 relative z-10">
            <div className="max-w-3xl animate-fade-in-up">
              <p
                className="text-[11px] uppercase tracking-[0.4em] text-white/60 mb-10"
                data-testid="text-hero-eyebrow"
              >
                Growth Infrastructure Studio
              </p>
              <h1
                className="text-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] mb-8"
                data-testid="text-hero-title"
              >
                We build the systems that help small businesses{" "}
                <span className="text-display-italic text-accent">scale</span>.
              </h1>
              <p
                className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-12 font-light"
                data-testid="text-hero-subtitle"
              >
                Websites, marketing, CRM, and operations, designed, built, and
                installed as one system, with the hands-on support to make it
                stick.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center bg-white text-primary hover:bg-accent hover:text-white h-14 px-9 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                  data-testid="link-hero-services"
                >
                  Explore our work
                </Link>
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white/35 text-white hover:bg-white/10 h-14 px-9 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                  data-testid="link-hero-book"
                >
                  Book a strategy call
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
                Our point of view
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h2
                className="text-display text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.12] max-w-5xl"
                data-testid="text-manifesto-headline"
              >
                Most firms sell hours. We{" "}
                <span className="text-display-italic text-accent">install</span>{" "}
                infrastructure that keeps working long after the engagement ends.
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 mt-20 max-w-5xl">
              {[
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
              ].map((p, i) => (
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
                  What we do
                </p>
                <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
                  Five practices, one growth engine.
                </h2>
                <p className="text-muted-foreground leading-relaxed font-light max-w-sm mb-8">
                  Each capability stands on its own, and works better as part of
                  the whole.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-xs uppercase tracking-[0.2em] font-semibold"
                  data-testid="link-capabilities-all"
                >
                  View all services <span aria-hidden="true">→</span>
                </Link>
              </AnimateOnScroll>

              <div className="lg:col-span-8">
                {CAPABILITIES.map((c, i) => (
                  <AnimateOnScroll key={i} animation="fade-up" delay={i * 70}>
                    <Link
                      href={c.href}
                      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 md:gap-8 py-7 border-t border-border last:border-b hover:bg-background transition-colors"
                      data-testid={`link-capability-${i}`}
                    >
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {c.label}
                      </span>
                      <span>
                        <span className="block text-display text-primary text-2xl md:text-3xl group-hover:text-accent transition-colors">
                          {c.title}
                        </span>
                        <span className="block text-sm text-muted-foreground leading-relaxed font-light mt-1.5 max-w-lg">
                          {c.desc}
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
            IMAGE BAND, full-bleed grayscale
        ———————————————————————————————————————————————————————————— */}
        <section className="relative h-[42vh] md:h-[60vh] overflow-hidden bg-primary" data-testid="section-image-band">
          <img
            src={cityAerialImg}
            alt="Modern architecture"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-primary/30" />
        </section>

        {/* ——————————————————————————————————————————————————————————
            PACKAGES, buyable productized systems
        ———————————————————————————————————————————————————————————— */}
        <section className="py-24 md:py-32 bg-background" data-testid="section-packages">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-3xl mb-16">
              <AnimateOnScroll>
                <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-8">
                  Headline packages
                </p>
                <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                  Buy a complete{" "}
                  <span className="text-display-italic text-accent">system</span>,
                  not just hours.
                </h2>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Four productized packages, each solving a full business outcome.
                  Pay online by card, debit, or PayPal, and we get started.
                </p>
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
                See the full catalog <span aria-hidden="true">→</span>
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
                How we help
              </p>
              <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                A clear path from chaos to{" "}
                <span className="text-display-italic text-accent">systems</span>.
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {PROCESS.map((s, i) => (
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
                Ready to install the{" "}
                <span className="text-display-italic text-accent">infrastructure</span>{" "}
                your business needs to scale?
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
                  Book a strategy call
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center border border-white/35 text-white hover:bg-white/10 h-14 px-10 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                  data-testid="link-cta-services"
                >
                  Explore our services
                </Link>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="relative z-10 border-t border-white/15">
            <div className="container mx-auto px-6 md:px-8 py-5 flex items-center justify-between text-white/50 text-[11px] uppercase tracking-[0.3em]">
              <span>Performance Processes</span>
              <span className="hidden md:inline">Toronto · Ontario · Canada</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
