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
  Layers,
  Rocket,
  Search,
  Briefcase,
  Globe,
  BookOpen,
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
      icon: <Users size={22} />,
      title: "Recruiting & Headhunting",
      desc: "Find and place the right people in the right roles to drive growth.",
      href: "/recruiting",
    },
    {
      icon: <Settings size={22} />,
      title: "HR Systems & Support",
      desc: "Build the people infrastructure that keeps your team aligned and performing.",
      href: "/recruiting",
    },
    {
      icon: <Target size={22} />,
      title: "Performance & Process Design",
      desc: "Define KPIs, accountability structures, and operating rhythms that scale.",
      href: "/consulting",
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Marketing Execution",
      desc: "Strategy, content, and campaigns that generate leads and build authority.",
      href: "/marketing",
    },
    {
      icon: <Globe size={22} />,
      title: "Website & Digital Presence",
      desc: "Professional websites and digital assets that convert visitors into clients.",
      href: "/marketing",
    },
    {
      icon: <BookOpen size={22} />,
      title: "Operational Playbooks",
      desc: "Practical tools, templates, and frameworks built from real execution.",
      href: "/playbooks",
    },
  ];

  const phases = [
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

  const beforeItems = [
    "Disorganized growth",
    "Hiring gaps and misaligned roles",
    "No clear systems or processes",
    "Inconsistent execution",
    "Weak accountability",
  ];

  const afterItems = [
    "Clear team structure",
    "Better hiring, faster onboarding",
    "Defined processes and playbooks",
    "Stronger, more consistent execution",
    "Scalable growth systems",
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
        title="Performance Processes | We Build and Run the Systems That Help Businesses Scale"
        description="From recruiting and HR to marketing, websites, and operational playbooks, Performance Processes installs the infrastructure growing companies need to scale with confidence."
        path="/"
      />
      <Navbar />

      <main className="flex-grow">

        <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-primary" data-testid="section-hero">
          <div className="absolute inset-0 z-0">
            <img src={communityNetworkImg} alt="" className="w-full h-full object-cover opacity-20 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/98 to-primary/70" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full hidden lg:block z-[1]">
            <img src={communityCollaborationImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
          <GradientOrb className="w-96 h-96 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-16 h-16 top-[20%] right-[10%] z-[3]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-[30%] right-[35%] z-[3]" variant="dot" />
          <GeometricAccent className="bottom-[15%] right-[5%] text-white z-[2]" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-2xl lg:max-w-[55%]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="text-hero-title">
                We build and run the systems that help your <span className="text-accent">business scale.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                From recruiting and HR to marketing, websites, and operational playbooks, we install the infrastructure growing companies need to scale with confidence.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105"
                  data-testid="link-hero-book"
                >
                  <Calendar size={16} />
                  Book a Strategy Call
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300"
                  data-testid="link-hero-how"
                >
                  See How It Works
                  <ArrowDown size={16} />
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

        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-unified-offer">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <GradientOrb className="w-80 h-80 bg-accent/5 -bottom-40 -left-40" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Our Approach</p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  More than services. A system for scale.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Most firms offer one piece of the puzzle. We integrate hiring, HR, marketing support, web presence, and playbooks into one execution system designed to help your business grow.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When you work with Performance Processes, you're not hiring a firm for a project. You're installing growth infrastructure that compounds over time.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                    <img src={teamMovingForwardImg} alt="Building growth infrastructure" className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <FloatingShape className="w-20 h-20 -top-5 -right-5 z-[-1]" variant="square" />
                  <FloatingShape className="w-12 h-12 -bottom-3 right-10 z-[-1]" variant="ring" />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border max-w-[220px] hidden md:block animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Layers size={20} className="text-accent" />
                      </div>
                      <p className="text-sm font-bold text-primary">One System</p>
                    </div>
                    <p className="text-xs text-muted-foreground">People, processes, and growth, integrated into one infrastructure</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll className="text-center mb-14">
              <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-4">Our Growth Infrastructure System</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Everything your business needs to scale, delivered as one integrated system.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {systemComponents.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 80}>
                  <Link href={item.href} className="block h-full group" data-testid={`link-system-${i}`}>
                    <div className="relative flex gap-5 p-7 rounded-2xl border border-border bg-white hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 overflow-hidden h-full" data-testid={`system-card-${i}`}>
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent/0 group-hover:bg-accent transition-all duration-300" />
                      <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-primary mb-1.5 group-hover:text-accent transition-colors">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
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
                Three phases to scalable growth
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We don't just advise. We build and run the infrastructure your business needs, one phase at a time.
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
                          <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
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
                <Calendar size={16} />
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
                Our clients don't just get better systems. They get clarity, confidence, and the infrastructure to grow without the chaos.
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
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">After</h3>
                  </div>
                  <ul className="space-y-4">
                    {afterItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-3" data-testid={`after-item-${i}`}>
                        <CheckCircle2 size={14} className="text-accent shrink-0" />
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
                <div data-testid="stat-clients">
                  <p className="text-4xl md:text-5xl font-extrabold text-accent mb-2">100+</p>
                  <p className="text-white/50 text-sm">Clients served</p>
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
              Wondering if this is right for your business?
            </h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto text-lg">
              Let's have an honest conversation about where you are, where you want to go, and whether our growth infrastructure can get you there.
            </p>
            <a
              href={BOOKINGS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105"
              data-testid="link-mid-cta-book"
            >
              <ClipboardCheck size={16} />
              Book a Strategy Call
            </a>
          </div>
        </section>

        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-solutions">
          <FloatingShape className="w-20 h-20 top-32 right-10" variant="ring" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-32 right-20" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Solutions</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Your growth, our infrastructure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each capability is part of one integrated system. Explore the areas where we install the infrastructure your business needs.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  image: handsPartnershipImg,
                  title: "Human Resources",
                  desc: "From talent acquisition and headhunting to HR systems, people strategy, and leadership development, we build the team infrastructure that drives growth.",
                  href: "/recruiting",
                },
                {
                  image: communityCollaborationImg,
                  title: "Management Consulting",
                  desc: "Strategic advisory, operational systems, performance frameworks, and executive coaching to help your organization scale with clarity and confidence.",
                  href: "/consulting",
                },
                {
                  image: empoweredOwnerImg,
                  title: "Marketing & Websites",
                  desc: "Professional websites, content marketing, brand identity, and digital campaigns that generate leads and build authority in your market.",
                  href: "/marketing",
                },
                {
                  image: growthSeedlingImg,
                  title: "Playbooks & Tools",
                  desc: "Practical, proven templates, frameworks, and toolkits built from real execution, designed to help you build better systems at your own pace.",
                  href: "/playbooks",
                },
              ].map((s, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 120}>
                  <Link href={s.href} className="block h-full group" data-testid={`link-solution-${i}`}>
                    <div className="relative rounded-2xl overflow-hidden h-full min-h-[320px] shadow-lg" data-testid={`solution-card-${i}`}>
                      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10 group-hover:from-primary/95 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">{s.desc}</p>
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-transform">
                          Explore <ArrowRight size={14} className="ml-2" />
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
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Playbooks</p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  Playbooks built from real execution
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Every playbook we sell was built from real client work. These are the same tools, templates, and frameworks we use inside our engagements, now available for teams that want to build better systems on their own.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    "Proven templates and frameworks",
                    "Built from proven consulting methodology",
                    "Supports lead generation and team enablement",
                    "Part of our integrated growth system",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      <span className="text-muted-foreground font-medium">{text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/playbooks"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white hover:bg-accent h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg"
                  data-testid="link-explore-playbooks"
                >
                  <BookOpen size={16} />
                  Browse Playbooks
                </Link>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <Briefcase size={20} />, title: "Foundations Playbook", desc: "Core business systems, roles, and process templates for companies in their early stage." },
                    { icon: <Settings size={20} />, title: "Operations Playbook", desc: "KPIs, accountability structures, and operating rhythms for scaling teams." },
                    { icon: <Users size={20} />, title: "People & HR Playbook", desc: "Hiring guides, onboarding frameworks, and performance review templates." },
                    { icon: <Rocket size={20} />, title: "Growth Playbook", desc: "Marketing plans, sales frameworks, and lead generation strategies." },
                  ].map((pb, i) => (
                    <Link href="/playbooks" key={i} className="block group" data-testid={`link-playbook-card-${i}`}>
                      <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-xl hover:border-accent/20 transition-all duration-300 h-full">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          {pb.icon}
                        </div>
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
                    Ready to build the systems your business needs to scale?
                  </h2>
                  <p className="text-lg text-white/70 mb-12">
                    Whether you need people, process, or growth infrastructure, the first step is a conversation. Let's figure out what your business needs and build it together.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={BOOKINGS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105"
                      data-testid="link-cta-book"
                    >
                      <Calendar size={16} />
                      Book a Strategy Call
                    </a>
                    <Link href="/consulting" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-cta-solutions">
                      Explore Solutions
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
