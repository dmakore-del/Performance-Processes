import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, X as XIcon } from "lucide-react";
import { Link } from "wouter";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SEOHead } from "@/components/SEOHead";

import communityCollaborationImg from "@assets/generated/community-collaboration.png";
import communityWorkspaceImg from "@assets/generated/community-workspace.png";
import communityNetworkImg from "@assets/generated/community-network-abstract.png";
import communityTownhallImg from "@assets/generated/community-townhall.png";
import milestoneImg from "@assets/generated/milestone-celebration.png";
import teamMovingForwardImg from "@assets/generated/team-moving-forward.png";
import cityAerialImg from "@assets/generated/city-aerial-new.png";
import processFlowImg from "@assets/generated/process-flow-abstract.png";

const BOOKINGS_URL =
  "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CAPABILITIES = [
  {
    label: "01 — Web",
    title: "Websites that earn attention.",
    desc: "Editorial design, fast performance, and conversion-ready architecture for professionals, nonprofits, and growing brands.",
    image: cityAerialImg,
    href: "/services#cat-website",
  },
  {
    label: "02 — Marketing",
    title: "Demand systems, not random posts.",
    desc: "Brand, content, paid, and lifecycle marketing built into a system that compounds.",
    image: communityCollaborationImg,
    href: "/services#cat-marketing",
  },
  {
    label: "03 — CRM & Lead Tracking",
    title: "Every lead, accounted for.",
    desc: "CRM setup, pipeline tracking, and structured follow-up so nothing falls through the cracks.",
    image: processFlowImg,
    href: "/services#cat-crm",
  },
  {
    label: "04 — Business Systems",
    title: "The operating system underneath.",
    desc: "Audits, KPI tracking, SOPs, and operating rhythms — plus training and ongoing support to keep it running.",
    image: communityTownhallImg,
    href: "/services#cat-systems",
  },
  {
    label: "05 — HR & Recruiting",
    title: "The right people, hired the right way.",
    desc: "Hiring strategy, sourcing, recruitment systems, HR foundations, and career coaching for growing teams.",
    image: communityWorkspaceImg,
    href: "/services#cat-hr-recruiting",
  },
];

const PHASES = [
  {
    step: "01",
    label: "Foundation",
    image: communityTownhallImg,
    items: [
      "Define roles and responsibilities",
      "Build team structure",
      "Set up core processes",
      "Create operational playbooks",
      "Clarify KPIs and targets",
    ],
  },
  {
    step: "02",
    label: "Build",
    image: communityWorkspaceImg,
    items: [
      "Recruit key hires",
      "Implement HR and operating systems",
      "Support marketing execution",
      "Build or improve website assets",
      "Activate growth infrastructure",
    ],
  },
  {
    step: "03",
    label: "Run",
    image: milestoneImg,
    items: [
      "Ongoing optimization",
      "Performance tracking",
      "Hiring support as you scale",
      "Process refinement",
      "Strategic advisory and support",
    ],
  },
];

const BEFORE_ITEMS = [
  "Disorganized growth",
  "Hiring gaps and misaligned roles",
  "No clear systems or processes",
  "Inconsistent execution",
  "Weak accountability",
];

const AFTER_ITEMS = [
  "Clear team structure",
  "Better hiring, faster onboarding",
  "Defined processes and playbooks",
  "Stronger, more consistent execution",
  "Scalable growth systems",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <SEOHead
        title="Performance Processes | We Build and Run the Systems That Help Businesses Scale"
        description="From recruiting and HR to marketing, websites, and operational playbooks, Performance Processes installs the infrastructure growing companies need to scale with confidence."
        path="/"
      />
      <Navbar />

      <main className="flex-grow">
        {/* ————————————————————————————————————————————————————————————
            HERO — full-bleed cinematic video, editorial type, rotating verb
        —————————————————————————————————————————————————————————————— */}
        <section
          className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-primary"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster={communityNetworkImg}
            >
              <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary mix-blend-color" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/60 to-primary/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,hsl(var(--accent)/0.18),transparent_55%)]" />
          </div>

          {/* Top meta row */}
          <div className="absolute top-24 md:top-28 left-0 right-0 z-10 pointer-events-none">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between text-white/70 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold">
              <span data-testid="text-hero-meta-studio">A growth infrastructure studio</span>
            </div>
          </div>

          {/* Headline block */}
          <div className="container mx-auto px-4 md:px-8 pt-44 md:pt-48 pb-20 md:pb-28 relative z-10">
            <h1
              className="text-display text-white text-[12vw] md:text-[8vw] lg:text-[6.8vw] xl:text-[6.5rem] mb-12 max-w-[1400px]"
              data-testid="text-hero-title"
            >
              <span className="line-clip">
                <span className="animate-line-rise" style={{ animationDelay: "0.15s" }}>
                  We help businesses
                </span>
              </span>
              <span className="line-clip">
                <span className="animate-line-rise" style={{ animationDelay: "0.3s" }}>
                  <span className="text-display-italic text-accent">scale</span>{" "}
                  <span className="text-white/95">with the systems</span>
                </span>
              </span>
              <span className="line-clip">
                <span className="animate-line-rise" style={{ animationDelay: "0.45s" }}>
                  <span className="text-white/95">they need to grow.</span>
                </span>
              </span>
            </h1>

            <div
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-6xl animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <p
                className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
                data-testid="text-hero-subtitle"
              >
                Websites, marketing, CRM, business systems, training, and ongoing support — installed as one growth infrastructure for professionals, nonprofits, and small businesses.
              </p>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30"
                  data-testid="link-hero-services"
                >
                  Explore our services
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white hover:bg-white/10 h-14 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300"
                  data-testid="link-hero-book"
                >
                  Book a strategy call
                </a>
              </div>
            </div>
          </div>

          {/* Bottom rule */}
          <div className="relative z-10 border-t border-white/15">
            <div className="container mx-auto px-4 md:px-8 py-5 flex items-center justify-end text-white/60 text-[11px] uppercase tracking-[0.3em] font-bold">
              <span className="hidden md:inline">Performance Processes</span>
            </div>
          </div>
        </section>

        {/* ————————————————————————————————————————————————————————————
            TRUSTED BY — minimal clean strip
        —————————————————————————————————————————————————————————————— */}
        <section className="py-12 bg-white border-b border-border/60" data-testid="section-trusted-by">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/60 shrink-0">
                Trusted by
              </span>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                <span className="text-sm font-bold tracking-wide text-primary/70" data-testid="logo-nextup">
                  NextUp Canada
                </span>
                <span className="hidden md:block w-px h-6 bg-border" />
                <span className="text-sm font-bold tracking-wide text-primary/70" data-testid="logo-truenorth">
                  TrueNorth Property &amp; Facilities
                </span>
                <span className="hidden md:block w-px h-6 bg-border" />
                <span className="text-sm font-bold tracking-wide text-primary/70" data-testid="logo-ogb-productions">
                  OGB Productions
                </span>
                <span className="hidden md:block w-px h-6 bg-border" />
                <span className="text-sm font-bold tracking-wide text-primary/70" data-testid="logo-maison-sparkle-living">
                  Maison Sparkle Living
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ————————————————————————————————————————————————————————————
            MANIFESTO — oversized editorial type on white
        —————————————————————————————————————————————————————————————— */}
        <section className="relative py-32 md:py-44 bg-white overflow-hidden" data-testid="section-manifesto">
          <div className="container mx-auto px-4 md:px-8 relative">
            <AnimateOnScroll>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-10" data-testid="text-manifesto-eyebrow">
                Our point of view
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={120}>
              <h2
                className="text-display text-primary text-[10vw] md:text-[7vw] lg:text-[5.6vw] xl:text-[5.5rem] max-w-[1400px]"
                data-testid="text-manifesto-headline"
              >
                Most firms sell hours.{" "}
                <span className="text-display-italic text-accent">We install</span> infrastructure that compounds — long after the engagement ends.
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 max-w-6xl">
              {[
                {
                  k: "One system",
                  v: "People, marketing, web, CRM, and ops — integrated, not stitched together.",
                },
                {
                  k: "Built to run",
                  v: "We don't just advise. We design, build, and operate the systems with you.",
                },
                {
                  k: "Compounds over time",
                  v: "Every engagement leaves behind playbooks, pipelines, and infrastructure you keep.",
                },
              ].map((p, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div data-testid={`manifesto-pillar-${i}`}>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-3">{p.k}</p>
                    <p className="text-lg text-muted-foreground leading-relaxed">{p.v}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ————————————————————————————————————————————————————————————
            CAPABILITIES — asymmetric image-dominant grid
        —————————————————————————————————————————————————————————————— */}
        <section className="relative py-32 md:py-40 bg-[#0A1430] overflow-hidden" data-testid="section-capabilities">
          <div className="container mx-auto px-4 md:px-8 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <AnimateOnScroll>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-6">Capabilities</p>
                <h2 className="text-display text-white text-5xl md:text-6xl lg:text-7xl max-w-3xl">
                  Four practices.{" "}
                  <span className="text-display-italic text-accent">One</span> integrated growth engine.
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll delay={150}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors text-sm font-bold uppercase tracking-[0.2em] group"
                  data-testid="link-capabilities-all"
                >
                  All capabilities
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimateOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CAPABILITIES.map((c, i) => (
                <AnimateOnScroll
                  key={i}
                  animation="fade-up"
                  delay={i * 120}
                  className={i % 3 === 0 ? "md:row-span-1" : ""}
                >
                  <Link href={c.href} className="block group" data-testid={`link-capability-${i}`}>
                    <div
                      className={`relative overflow-hidden rounded-3xl ${
                        i === 0 || i === 3 ? "aspect-[16/11]" : "aspect-[16/10]"
                      }`}
                      data-testid={`capability-card-${i}`}
                    >
                      <img
                        src={c.image}
                        alt={c.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500" />

                      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
                          {c.label}
                        </span>
                        <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent transition-all">
                          <ArrowRight size={16} />
                        </span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 md:right-12">
                        <h3 className="text-display text-white text-3xl md:text-4xl lg:text-5xl mb-3">
                          {c.title}
                        </h3>
                        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ————————————————————————————————————————————————————————————
            STATS — editorial big numerals
        —————————————————————————————————————————————————————————————— */}
        <section className="relative py-28 bg-white overflow-hidden" data-testid="section-stats">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="max-w-3xl mb-16">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-6">By the numbers</p>
              <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl">
                The difference you{" "}
                <span className="text-display-italic text-accent">feel</span> when systems do the work.
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 border-t border-border pt-14">
              {[
                { n: "97%", l: "Of clients feel more confident in their operations" },
                { n: "6+", l: "Industries served across Canada" },
                { n: "3", l: "Phases — Foundation, Build, Run" },
                { n: "∞", l: "Lasting infrastructure that compounds" },
              ].map((s, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div data-testid={`stat-${i}`}>
                    <p className="text-display text-primary text-6xl md:text-7xl lg:text-8xl mb-4">
                      {s.n}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{s.l}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ————————————————————————————————————————————————————————————
            BEFORE / AFTER — kept content, refreshed visual
        —————————————————————————————————————————————————————————————— */}
        <section className="py-32 md:py-40 bg-primary relative overflow-hidden" data-testid="section-transformation">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <AnimateOnScroll className="max-w-3xl mb-16">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-6">The transformation</p>
              <h2 className="text-display text-white text-4xl md:text-5xl lg:text-6xl">
                From scattered to{" "}
                <span className="text-display-italic text-accent">scalable</span>.
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimateOnScroll animation="fade-left">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-10" data-testid="card-before">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <XIcon size={20} className="text-red-400" />
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-white">Before</h3>
                  </div>
                  <ul className="space-y-4">
                    {BEFORE_ITEMS.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg" data-testid={`before-item-${i}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        <span className="text-white/70 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-right" delay={150}>
                <div className="bg-accent/15 backdrop-blur-sm rounded-3xl border border-accent/30 p-10" data-testid="card-after">
                  <h3 className="text-2xl font-heading font-extrabold text-white mb-8">After</h3>
                  <ul className="space-y-4">
                    {AFTER_ITEMS.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg" data-testid={`after-item-${i}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-white/95 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* ————————————————————————————————————————————————————————————
            PROCESS — oversized step numerals + image-led
        —————————————————————————————————————————————————————————————— */}
        <section
          id="how-it-works"
          className="py-28 bg-[#F8FAFC] relative overflow-hidden"
          data-testid="section-how-it-works"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <AnimateOnScroll className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-6">Process</p>
                <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl">
                  Three phases to{" "}
                  <span className="text-display-italic text-accent">scalable</span> growth.
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll delay={120}>
                <p className="text-muted-foreground text-base max-w-md md:text-right">
                  We don't just advise. We build and run the infrastructure your business needs, one phase at a time.
                </p>
              </AnimateOnScroll>
            </div>

            <div className="space-y-6">
              {PHASES.map((phase, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white rounded-3xl p-6 lg:p-8 border border-border hover:border-accent/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                    data-testid={`phase-${i}`}
                  >
                    <div className="lg:col-span-2">
                      <p className="text-display numeral-outline text-primary text-7xl lg:text-8xl group-hover:text-accent group-hover:[--tw-text-opacity:1] transition-colors">
                        {phase.step}
                      </p>
                    </div>
                    <div className="lg:col-span-4 relative aspect-[16/10] rounded-2xl overflow-hidden">
                      <img
                        src={phase.image}
                        alt={phase.label}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                      <p className="absolute bottom-4 left-5 text-white text-sm font-black uppercase tracking-[0.25em]">
                        {phase.label}
                      </p>
                    </div>
                    <div className="lg:col-span-6">
                      <h3 className="text-display text-primary text-3xl lg:text-4xl mb-5">
                        {phase.label}
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                            <span className="text-sm text-muted-foreground font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll className="text-center mt-16">
              <a
                href={BOOKINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white hover:bg-accent h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl"
                data-testid="link-how-it-works-cta"
              >
                Book a strategy call
                <ArrowRight size={16} />
              </a>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ————————————————————————————————————————————————————————————
            UNIFIED OFFER — one system message
        —————————————————————————————————————————————————————————————— */}
        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-unified-offer">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-6">Our approach</p>
                <h2 className="text-display text-primary text-4xl md:text-5xl lg:text-6xl mb-8">
                  More than services.{" "}
                  <span className="text-display-italic text-accent">A system</span> for scale.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Most firms offer one piece of the puzzle. We integrate hiring, HR, marketing support, web presence, and playbooks into one execution system designed to help your business grow.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  When you work with Performance Processes, you're not hiring a firm for a project. You're installing growth infrastructure that compounds over time.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-bold uppercase tracking-[0.2em] group"
                  data-testid="link-explore-system"
                >
                  Explore the system
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-primary">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster={teamMovingForwardImg}
                  >
                    <source src="/assets/videos/team-collab.mp4" type="video/mp4" />
                  </video>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* ————————————————————————————————————————————————————————————
            CLOSING CTA — full-bleed editorial
        —————————————————————————————————————————————————————————————— */}
        <section className="relative bg-primary overflow-hidden" data-testid="section-cta">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60"
              poster={teamMovingForwardImg}
            >
              <source src="/assets/videos/cta-speaker.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary" />
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 py-32 md:py-44">
            <AnimateOnScroll>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8" data-testid="text-cta-eyebrow">
                Let's build something
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={120}>
              <h2
                className="text-display text-white text-[12vw] md:text-[8vw] lg:text-[6.5vw] xl:text-[7rem] mb-12 max-w-[1300px]"
                data-testid="text-cta-headline"
              >
                Ready to install the{" "}
                <span className="text-display-italic text-accent">infrastructure</span> your business needs to scale?
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={250}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-12 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105"
                  data-testid="link-cta-book"
                >
                  Book a strategy call
                  <ArrowRight size={18} />
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-16 px-12 font-bold text-sm uppercase tracking-wider transition-all duration-300"
                  data-testid="link-cta-services"
                >
                  Explore our services
                </Link>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="relative z-10 border-t border-white/15">
            <div className="container mx-auto px-4 md:px-8 py-5 flex items-center justify-between text-white/60 text-[11px] uppercase tracking-[0.3em] font-bold">
              <span>Performance Processes</span>
              <span className="hidden md:inline">Barrie · Ontario · Canada</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
