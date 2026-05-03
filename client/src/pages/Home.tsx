import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  ArrowDown,
  X as XIcon,
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/use-language";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";
import { SEOHead } from "@/components/SEOHead";

import communityCollaborationImg from "@assets/generated/community-collaboration.png";
import handsPartnershipImg from "@assets/generated/hands-together-partnership.png";
import communityWorkspaceImg from "@assets/generated/community-workspace.png";
import mentorshipConnectionImg from "@assets/generated/mentorship-connection.png";
import communityNetworkImg from "@assets/generated/community-network-abstract.png";
import empoweredOwnerImg from "@assets/generated/empowered-business-owner.png";
import communityTownhallImg from "@assets/generated/community-townhall.png";
import milestoneImg from "@assets/generated/milestone-celebration.png";
import growthSeedlingImg from "@assets/generated/growth-seedling.png";
import teamMovingForwardImg from "@assets/generated/team-moving-forward.png";
import heroAbstractImg from "@assets/generated/hero-abstract-new.png";
import geoPatternImg from "@assets/generated/geo-pattern-new.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function Home() {
  const { t, language } = useLanguage();

  const systemComponents = [
    {
      title: "Websites & Digital Presence",
      desc: "Professional websites that build trust and turn visitors into clients. From $1,500.",
      href: "/services",
    },
    {
      title: "Brand Identity",
      desc: "Logos, visual identity, and brand systems that make small businesses look credible from day one.",
      href: "/services",
    },
    {
      title: "Marketing Systems",
      desc: "Marketing strategy, content, and campaigns that bring in steady leads without the guesswork.",
      href: "/services",
    },
    {
      title: "Process & Operations",
      desc: "Simple operating systems, SOPs, and workflows so your business runs smoothly as it grows.",
      href: "/services",
    },
    {
      title: "Custom Software",
      desc: "Lightweight tools, dashboards, and web applications tailored to how your business actually works.",
      href: "/services",
    },
    {
      title: "Playbooks & Templates",
      desc: "Self-serve guides and templates for owners who want to do it themselves with proven frameworks.",
      href: "/playbooks",
    },
  ];

  const phases = [
    {
      step: "01",
      label: "Discover",
      image: communityTownhallImg,
      items: [
        "Free intro strategy call",
        "Understand your goals and audience",
        "Audit your current presence",
        "Recommend the right package",
        "Clear quote and timeline",
      ],
    },
    {
      step: "02",
      label: "Build",
      image: communityWorkspaceImg,
      items: [
        "Brand, website, or marketing build",
        "Set up tools and tracking",
        "Document processes and SOPs",
        "Launch campaigns or content",
        "Train you and your team",
      ],
    },
    {
      step: "03",
      label: "Grow",
      image: milestoneImg,
      items: [
        "Ongoing marketing or retainer support",
        "Iterate based on real results",
        "Add new pages, features, or campaigns",
        "Refine systems as you scale",
        "Advisory whenever you need it",
      ],
    },
  ];

  const beforeItems = [
    "Outdated or DIY website",
    "No clear brand or messaging",
    "Marketing that feels random",
    "Manual, scattered processes",
    "Spending too much time in the weeds",
  ];

  const afterItems = [
    "Professional website you're proud of",
    "Clear brand and consistent messaging",
    "Marketing that brings in steady leads",
    "Documented processes and tools",
    "More time to actually run the business",
  ];

  const insights = [
    {
      title: "Why Growth Feels Hard (And What Actually Helps)",
      category: "Strategy",
      date: "January 15, 2026",
      excerpt: "The biggest challenge in business isn't strategy, it's trying to scale without the right infrastructure. Here's why growing companies need systems, not just ambition.",
    },
    {
      title: "Building Systems That Set You Free",
      category: "Growth",
      date: "January 8, 2026",
      excerpt: "The right systems don't add complexity, they remove it. How our clients went from overwhelmed to in control, and how you can too.",
    },
    {
      title: "Your People Are Your Strategy",
      category: "Leadership",
      date: "December 20, 2025",
      excerpt: "Behind every successful organization is a team that feels valued, heard, and empowered. Here's how to build that culture from the inside out.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <SEOHead
        title="Performance Processes | Websites, Marketing & Business Support for Small and Emerging Businesses"
        description="Productized websites, brand identity, marketing systems, and operations support for professionals, nonprofits, startups, and small businesses. Transparent pricing, fast turnarounds."
        path="/"
      />
      <Navbar />

      <main className="flex-grow">

        <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-primary" data-testid="section-hero">
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
            <div className="absolute inset-0 bg-primary/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />
          </div>
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-2xl lg:max-w-[55%]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="text-hero-title">
                Websites, marketing systems, and business support for <span className="text-accent">small and emerging businesses.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                We help professionals, nonprofits, startups, and small businesses build the online presence, marketing structure, and systems they need to grow.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105"
                  data-testid="link-hero-services"
                >
                  Browse Our Services
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300"
                  data-testid="link-hero-book"
                >
                  Book a Strategy Call
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
        </section>

        <section className="py-8 bg-white border-b" data-testid="section-trusted-by">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 shrink-0">
                Trusted By
              </span>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors" data-testid="logo-nextup">
                  <span className="text-sm font-bold tracking-wide">NextUp Canada</span>
                </div>
                <div className="w-px h-6 bg-border hidden md:block"></div>
                <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors" data-testid="logo-truenorth">
                  <span className="text-sm font-bold tracking-wide">TrueNorth Property & Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-unified-offer">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <GradientOrb className="w-80 h-80 bg-accent/5 -bottom-40 -left-40" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Our Approach</p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  Productized services built for small businesses.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Most agencies are built for big budgets and long timelines. We package what small and emerging businesses actually need — websites, brand, marketing, and operations — at clear prices with realistic turnarounds.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Pick a package, get on a quick call, and we'll get to work. No bloated retainers, no surprise invoices, no jargon.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                    <img src={teamMovingForwardImg} alt="Productized services for small businesses" className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <FloatingShape className="w-20 h-20 -top-5 -right-5 z-[-1]" variant="square" />
                  <FloatingShape className="w-12 h-12 -bottom-3 right-10 z-[-1]" variant="ring" />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border max-w-[220px] hidden md:block animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    <p className="text-sm font-bold text-primary mb-1">Clear Packages</p>
                    <p className="text-xs text-muted-foreground">Transparent pricing, fixed scope, real turnaround times.</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll className="text-center mb-14">
              <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-4">What We Help With</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Six service areas, all sized and priced for small and emerging businesses.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {systemComponents.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 80}>
                  <Link href={item.href} className="block h-full group" data-testid={`link-system-${i}`}>
                    <div className="relative p-7 rounded-2xl border border-border bg-white hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 overflow-hidden h-full" data-testid={`system-card-${i}`}>
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent/0 group-hover:bg-accent transition-all duration-300" />
                      <h4 className="text-base font-bold text-primary mb-1.5 group-hover:text-accent transition-colors">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-28 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-how-it-works">
          <FloatingShape className="w-24 h-24 top-20 -left-8" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">How It Works</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                A simple way to work together
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From a free strategy call to a launched website or marketing system, here's how it goes.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
              <div className="hidden lg:block absolute top-[140px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-0" />
              {phases.map((phase, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
                  <div className="relative z-10 group" data-testid={`phase-${i}`}>
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <img src={phase.image} alt={phase.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/10" />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white text-sm font-black shadow-lg shadow-accent/30">
                        {phase.step}
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <p className="text-white text-xl font-bold">Phase {i + 1}: {phase.label}</p>
                      </div>
                    </div>
                    <ul className="space-y-3 px-1">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span className="text-sm text-muted-foreground font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll className="text-center mt-16">
              <a
                href={BOOKINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105"
                data-testid="link-how-it-works-cta"
              >
                Book a Strategy Call
              </a>
            </AnimateOnScroll>
          </div>
        </section>

        <section className="py-28 bg-primary relative overflow-hidden" data-testid="section-transformation">
          <div className="absolute inset-0">
            <img src={handsPartnershipImg} alt="" className="w-full h-full object-cover opacity-10 animate-ken-burns" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.12),transparent_60%)]" />
          <FloatingShape className="w-16 h-16 top-20 right-[15%]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-32 left-[10%]" variant="dot" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">The Transformation</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
                The difference you'll feel
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                A polished brand, a website that actually works, and marketing you don't have to babysit — without enterprise-level bills.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimateOnScroll animation="fade-left">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8" data-testid="card-before">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <XIcon size={20} className="text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Before</h3>
                  </div>
                  <ul className="space-y-4">
                    {beforeItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-3" data-testid={`before-item-${i}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        <span className="text-white/70 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="bg-accent/10 backdrop-blur-sm rounded-2xl border border-accent/20 p-8" data-testid="card-after">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-bold text-white">After</h3>
                  </div>
                  <ul className="space-y-4">
                    {afterItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-3" data-testid={`after-item-${i}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-white/90 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll className="mt-16">
              <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
                <div data-testid="stat-confidence">
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">97%</p>
                  <p className="text-white/50 text-sm">Feel more confident</p>
                </div>
                <div data-testid="stat-industries">
                  <p className="text-4xl md:text-5xl font-extrabold text-accent mb-2">6+</p>
                  <p className="text-white/50 text-sm">Industries served</p>
                </div>
                <div data-testid="stat-impact">
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">∞</p>
                  <p className="text-white/50 text-sm">Lasting impact</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section className="relative py-24 overflow-hidden" data-testid="section-mid-cta">
          <div className="absolute inset-0">
            <img src={communityWorkspaceImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-white mb-4">
              Not sure which service is right for you?
            </h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto text-lg">
              Hop on a free 30-minute strategy call. We'll talk through where you are, what you actually need, and which package (if any) makes sense.
            </p>
            <a
              href={BOOKINGS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105"
              data-testid="link-mid-cta-book"
            >
              Book a Strategy Call
            </a>
          </div>
        </section>

        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-solutions">
          <FloatingShape className="w-20 h-20 top-32 right-10" variant="ring" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-32 right-20" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Ways to Work With Us</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Different budgets. Different starting points.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you want done-for-you, do-it-yourself, or something in between, there's a way in that fits your stage and budget.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  image: communityTownhallImg,
                  title: "Playbooks",
                  desc: "Self-serve templates and guides for owners who want to do the work themselves.",
                  label: "From $149",
                  cta: "Browse Playbooks",
                  href: "/playbooks",
                },
                {
                  image: communityCollaborationImg,
                  title: "Training",
                  desc: "Workshops and short programs to upskill you or your team on the basics that matter most.",
                  label: "From $99",
                  cta: "Explore Training",
                  href: "/training",
                },
                {
                  image: communityWorkspaceImg,
                  title: "Service Packages",
                  desc: "Done-for-you websites, brand, marketing, and operations builds with fixed pricing.",
                  label: "From $1,500",
                  cta: "Browse Services",
                  href: "/services",
                },
                {
                  image: milestoneImg,
                  title: "NextUp Partnership",
                  desc: "40% off our service packages for Canadian founders aged 18–29 through NextUp Canada.",
                  label: "Youth-owned businesses",
                  cta: "Check Eligibility",
                  href: "/nextup-partnership",
                },
              ].map((s, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <Link href={s.href} className="block h-full group" data-testid={`link-solution-${i}`}>
                    <div className="relative rounded-2xl overflow-hidden h-full min-h-[300px] shadow-lg" data-testid={`solution-card-${i}`}>
                      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10 group-hover:from-primary/95 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{s.label}</p>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                        <p className="text-white/70 text-xs leading-relaxed mb-3">{s.desc}</p>
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-transform">
                          {s.cta} <ArrowRight size={14} className="ml-2" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-playbooks">
          <GeometricAccent className="top-10 -left-10 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">DIY Playbooks</p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  Playbooks built from real client work
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Not ready to hire us yet? Start with a playbook. Each one is a no-fluff guide we built from delivering the same work for our clients — now packaged so you can do it yourself at a fraction of the cost.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    "Step-by-step templates and checklists",
                    "Written for non-technical small business owners",
                    "Covers websites, brand, marketing, and ops",
                    "Lifetime access to updates",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-muted-foreground font-medium">{text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/playbooks"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white hover:bg-accent h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg"
                  data-testid="link-explore-playbooks"
                >
                  Browse Playbooks
                </Link>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Website Playbooks", desc: "Site planning templates, copy frameworks, launch checklists, and conversion guides for small business sites." },
                    { title: "Brand Playbooks", desc: "Naming exercises, brand voice guides, logo briefs, and visual identity worksheets." },
                    { title: "Marketing Playbooks", desc: "Content plans, social media calendars, email funnels, and lead generation templates." },
                    { title: "Operations Playbooks", desc: "SOP templates, simple process maps, hiring checklists, and tools to keep your business organized." },
                  ].map((pb, i) => (
                    <Link href="/playbooks" key={i} className="block group" data-testid={`link-playbook-card-${i}`}>
                      <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-xl hover:border-accent/20 transition-all duration-300 h-full">
                        <h4 className="text-sm font-bold text-primary mb-2 group-hover:text-accent transition-colors">{pb.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{pb.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-insights">
          <GeometricAccent className="top-10 right-20 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-2">
                  Latest Insights
                </h2>
              </div>
              <Link href="/insights" className="inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all mt-6 md:mt-0 group" data-testid="link-view-all-insights">
                View all insights
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
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                            {insight.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {insight.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-4 group-hover:text-accent transition-colors line-clamp-2">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3">{insight.excerpt}</p>
                        <div className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                          Read more <ArrowRight size={14} className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#F8FAFC] border-t" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll animation="fade-scale">
              <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto">
                <div className="absolute inset-0">
                  <img src={communityCollaborationImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
                </div>
                <FloatingShape className="w-14 h-14 top-10 right-10 z-[5]" variant="ring" />
                <div className="relative z-10 p-12 lg:p-20 max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                    Ready to give your business a real foundation?
                  </h2>
                  <p className="text-lg text-white/70 mb-12">
                    Whether it's a new website, a fresh brand, or marketing that finally works, we'll help you pick the right starting point. The first conversation is free.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={BOOKINGS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105"
                      data-testid="link-cta-book"
                    >
                      Book a Strategy Call
                    </a>
                    <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-cta-solutions">
                      Browse Services
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
