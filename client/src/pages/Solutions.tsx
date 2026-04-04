import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Target,
  Globe,
  BookOpen,
  Rocket,
  Layers,
  Zap,
  Briefcase,
  Megaphone,
  ArrowDown,
  Building2,
  Heart,
  UserCheck,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

import communityCollaborationImg from "@assets/generated/community-collaboration.png";
import communityWorkspaceImg from "@assets/generated/community-workspace.png";
import communityTownhallImg from "@assets/generated/community-townhall.png";
import milestoneImg from "@assets/generated/milestone-celebration.png";
import teamMovingForwardImg from "@assets/generated/team-moving-forward.png";
import communityNetworkImg from "@assets/generated/community-network-abstract.png";
import empoweredOwnerImg from "@assets/generated/empowered-business-owner.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function Solutions() {
  const { language } = useLanguage();

  const systemComponents = [
    { name: "Talent Acquisition System", icon: <Users size={20} />, desc: "Build the team structure required to scale, finding and placing the right people in the right roles." },
    { name: "People & Performance System", icon: <Target size={20} />, desc: "Performance systems that improve execution, from onboarding to reviews to accountability." },
    { name: "Demand Generation System", icon: <Megaphone size={20} />, desc: "Systems that attract and convert customers through strategy, content, and campaigns." },
    { name: "Conversion System", icon: <Globe size={20} />, desc: "Digital infrastructure that turns visitors into leads and leads into clients." },
    { name: "Execution Systems", icon: <BookOpen size={20} />, desc: "Practical tools, templates, and frameworks that codify your operations for repeatable success." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <SEOHead
        title="Growth Infrastructure System | Performance Processes"
        description="One system, multiple access levels. From self-guided playbooks to guided implementation to full system builds. We design, build, and run the systems businesses need to scale."
        path="/solutions"
      />
      <Navbar />

      <main className="flex-grow">

        <section className="relative min-h-[650px] lg:min-h-[750px] flex items-center overflow-hidden bg-primary" data-testid="section-solutions-hero">
          <div className="absolute inset-0 z-0">
            <img src={communityNetworkImg} alt="" className="w-full h-full object-cover opacity-15 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/98 to-primary/80" />
          </div>
          <GradientOrb className="w-96 h-96 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-16 h-16 top-[20%] right-[10%] z-[3]" variant="ring" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-accent mb-6 animate-fade-in-up">Growth Infrastructure System</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.15s" }} data-testid="text-solutions-hero-title">
                One system. <span className="text-accent">Multiple ways in.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                Whether you're a solo professional, a growing small business, or a scaling organization, our Growth Infrastructure System meets you where you are, with the level of support you need.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                <Link href="/playbooks" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-accent hover:text-white h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl" data-testid="link-solutions-hero-playbooks">
                  <BookOpen size={16} />
                  Start with a Playbook
                </Link>
                <a href="#ways-to-work" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-solutions-hero-tiers">
                  See All Options
                  <ArrowDown size={16} />
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
        </section>

        <section className="py-24 bg-white relative overflow-hidden" data-testid="section-system-components">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">The System</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Five integrated systems, one growth engine
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Everything your business needs to scale, integrated and delivered as one unified system across every tier of engagement.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {systemComponents.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 80}>
                  <div className="relative p-7 rounded-2xl border border-border bg-white hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 h-full group" data-testid={`system-component-${i}`}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent/0 group-hover:bg-accent transition-all duration-300 rounded-l-2xl" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-base font-bold text-primary group-hover:text-accent transition-colors">{item.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
              <AnimateOnScroll animation="fade-up" delay={5 * 80}>
                <div className="relative p-7 rounded-2xl border-2 border-dashed border-accent/30 bg-accent/5 flex flex-col items-center justify-center text-center h-full group hover:border-accent/50 transition-all" data-testid="system-component-cta">
                  <Layers size={28} className="text-accent mb-3" />
                  <p className="text-sm font-bold text-primary mb-1">All Systems Combined</p>
                  <p className="text-xs text-muted-foreground">Available across every tier, from playbooks to full builds</p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-value-ladder">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Your Growth Path</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Start where you are. Scale from there.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every tier uses the same proven system. Choose the level of support that fits your stage, and upgrade as you grow.
              </p>
            </AnimateOnScroll>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 relative">
                <div className="hidden md:block absolute top-1/2 left-[17%] right-[17%] h-[2px] bg-gradient-to-r from-blue-400 via-accent to-primary z-0" />

                {[
                  { label: "Start", tier: "Playbooks", price: "$149 – $999", color: "bg-blue-500", ring: "ring-blue-200" },
                  { label: "Grow", tier: "Guided Implementation", price: "$2,000 – $10,000", color: "bg-accent", ring: "ring-pink-200" },
                  { label: "Scale", tier: "Full System Build", price: "$5,000 – $50,000+", color: "bg-primary", ring: "ring-slate-200" },
                ].map((step, i) => (
                  <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
                    <div className="flex flex-col items-center relative z-10 py-6">
                      <div className={`w-16 h-16 rounded-full ${step.color} text-white flex items-center justify-center text-lg font-extrabold shadow-lg ring-4 ${step.ring} mb-4`}>
                        {i + 1}
                      </div>
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-1">{step.label}</p>
                      <p className="text-lg font-bold text-primary mb-1">{step.tier}</p>
                      <p className="text-sm text-muted-foreground font-medium">{step.price}</p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>

              <AnimateOnScroll className="text-center mt-8">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>Self-paced</span>
                  <ChevronRight size={14} />
                  <span>2 to 8 weeks</span>
                  <ChevronRight size={14} />
                  <span>Ongoing partnership</span>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="ways-to-work" className="py-28 bg-white relative overflow-hidden" data-testid="section-ways-to-work">
          <FloatingShape className="w-24 h-24 top-20 -left-8" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Ways to Work With Us</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Choose the right level for your business
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                One system, three ways to access it. From self-guided playbooks to full-scale implementation, every tier delivers the same proven methodology.
              </p>
            </AnimateOnScroll>

            <div className="space-y-16 max-w-6xl mx-auto">

              <AnimateOnScroll animation="fade-up">
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="tier-playbooks">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 relative">
                      <div className="h-full min-h-[280px] bg-gradient-to-br from-blue-500 to-blue-600 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">
                          <BookOpen size={12} />
                          Tier 1: Entry Level
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3">Playbooks</h3>
                        <p className="text-white/80 leading-relaxed mb-4">Self-guided systems to implement structure, hiring, marketing, and execution on your own.</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <DollarSign size={14} className="text-white" />
                            <span className="font-bold text-white">$149 to $999</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Clock size={14} className="text-white" />
                            <span className="font-bold text-white">Self-paced</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">Best for</p>
                        <p className="text-sm text-muted-foreground">Professionals, consultants, coaches, solo operators, early-stage small businesses, and budget-conscious nonprofits</p>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">What's included</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {["Templates and frameworks", "SOP structures", "KPI systems", "Funnel and website structures", "Hiring systems", "Implementation guides"].map((item, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">Example systems</p>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { name: "Hiring System", price: "$199" },
                            { name: "Performance Management System", price: "$279" },
                            { name: "Operations Blueprint", price: "$199" },
                          ].map((ex, j) => (
                            <div key={j} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 text-sm">
                              <span className="font-semibold text-primary">{ex.name}</span>
                              <span className="text-blue-600 font-bold">{ex.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link href="/playbooks" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-tier-playbooks">
                        <BookOpen size={16} />
                        Start with a Playbook
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={150}>
                <div className="bg-white rounded-3xl border-2 border-accent/30 shadow-xl overflow-hidden relative" data-testid="tier-guided">
                  <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">Most Flexible</div>
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 relative">
                      <div className="h-full min-h-[280px] bg-gradient-to-br from-accent to-pink-600 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">
                          <Wrench size={12} />
                          Tier 2: Mid-Tier
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3">Guided Implementation</h3>
                        <p className="text-white/80 leading-relaxed mb-4">Hands-on support to install key systems without a full-scale engagement. We work alongside you to get it right.</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <DollarSign size={14} className="text-white" />
                            <span className="font-bold text-white">$2,000 to $10,000</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Clock size={14} className="text-white" />
                            <span className="font-bold text-white">2 to 8 weeks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">Best for</p>
                        <p className="text-sm text-muted-foreground">Small businesses ($500K to $5M), funded or scaling nonprofits, and professionals ready to invest in structured implementation</p>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">What's included (modular)</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {["Foundation sprint (org structure, KPIs)", "Hiring system setup", "Website conversion improvements", "Funnel and CRM setup", "Basic playbook creation", "Process fixes and optimization"].map((item, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">Example packages</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { name: "Foundation Sprint", desc: "Org structure + KPI system", price: "$3K to $6K", time: "2 to 4 weeks" },
                            { name: "Growth Engine Sprint", desc: "Website + funnel + CRM", price: "$5K to $10K", time: "4 to 8 weeks" },
                            { name: "Hiring System Setup", desc: "Hiring process + scorecards + onboarding", price: "$2K to $5K", time: "2 to 4 weeks" },
                          ].map((pkg, j) => (
                            <div key={j} className="bg-pink-50 border border-pink-100 rounded-xl p-4">
                              <h4 className="text-sm font-bold text-primary mb-1">{pkg.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{pkg.desc}</p>
                              <p className="text-sm font-bold text-accent">{pkg.price}</p>
                              <p className="text-xs text-muted-foreground">{pkg.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-primary h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-tier-guided">
                        <Calendar size={16} />
                        Explore Guided Implementation
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={300}>
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="tier-full-build">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 relative">
                      <div className="h-full min-h-[280px] bg-gradient-to-br from-primary to-blue-900 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">
                          <Rocket size={12} />
                          Tier 3: Premium
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3">Full System Build</h3>
                        <p className="text-white/80 leading-relaxed mb-4">Complete design, build, and ongoing operation of your business systems. We become your infrastructure partner.</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <DollarSign size={14} className="text-white" />
                            <span className="font-bold text-white">$5,000 to $50,000+</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Clock size={14} className="text-white" />
                            <span className="font-bold text-white">2 weeks to ongoing</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">Best for</p>
                        <p className="text-sm text-muted-foreground">Growing businesses ($1M+), larger nonprofits, and established teams ready for comprehensive infrastructure</p>
                      </div>
                      <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Phase 1: Foundation</p>
                            <p className="text-sm text-muted-foreground mb-3">Org structure, KPI systems, process design, strategy and roadmap</p>
                            <p className="text-sm font-bold text-primary">$5,000 to $15,000</p>
                            <p className="text-xs text-muted-foreground">2 to 4 weeks</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Phase 2: Build</p>
                            <p className="text-sm text-muted-foreground mb-3">Recruiting, HR systems, website, marketing funnel, CRM, playbooks</p>
                            <p className="text-sm font-bold text-primary">$15,000 to $50,000+</p>
                            <p className="text-xs text-muted-foreground">6 to 12 weeks</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Phase 3: Run</p>
                            <p className="text-sm text-muted-foreground mb-3">KPI tracking, execution support, marketing optimization, process refinement</p>
                            <p className="text-sm font-bold text-primary">$4,000 to $12,000/mo</p>
                            <p className="text-xs text-muted-foreground">Ongoing</p>
                          </div>
                        </div>
                      </div>
                      <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white hover:bg-accent h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-tier-full-build">
                        <Calendar size={16} />
                        Book a Strategy Call
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="phases" className="py-28 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-phases">
          <FloatingShape className="w-24 h-24 top-20 -left-8" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Full System Build: How We Deliver</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Three phases to scalable growth
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every full engagement follows a structured path: design, implement, optimize. Each phase builds on the last to create infrastructure that compounds.
              </p>
            </AnimateOnScroll>

            <div className="space-y-16 max-w-6xl mx-auto">

              <AnimateOnScroll animation="fade-up">
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="phase-foundation">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto">
                      <img src={communityTownhallImg} alt="Foundation phase" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                      <div className="absolute top-5 left-5 w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white text-sm font-black shadow-lg shadow-accent/30">01</div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">Phase 1</p>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3">Foundation</h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Design the business for scale. We audit your current state and build the blueprint for growth.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {[
                          "Business audit",
                          "Org structure design",
                          "Role definition",
                          "KPI and performance system design",
                          "Process mapping",
                          "Playbook creation",
                          "Marketing strategy and customer journey",
                        ].map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground font-medium">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={14} className="text-accent" />
                          <span className="font-semibold text-primary">2 to 4 weeks</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign size={14} className="text-accent" />
                          <span className="font-semibold text-primary">$5,000 to $15,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={150}>
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="phase-build">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">Phase 2</p>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3">Build</h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Implement people, systems, and growth infrastructure. This is where the system comes to life.</p>

                      <div className="mb-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">People & Operations</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            "Talent acquisition and placement",
                            "People & performance system setup",
                            "Performance management implementation",
                          ].map((item, j) => (
                            <div key={j} className="flex items-start gap-2.5">
                              <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">Demand Generation & Conversion</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            "Conversion system design and development",
                            "Landing pages and funnel architecture",
                            "Demand generation system setup",
                            "CRM and lead tracking",
                            "Analytics and dashboards",
                          ].map((item, j) => (
                            <div key={j} className="flex items-start gap-2.5">
                              <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={14} className="text-accent" />
                          <span className="font-semibold text-primary">6 to 12 weeks</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign size={14} className="text-accent" />
                          <span className="font-semibold text-primary">$15,000 to $50,000+</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-[16/10] lg:aspect-auto order-1 lg:order-2">
                      <img src={communityWorkspaceImg} alt="Build phase" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                      <div className="absolute top-5 right-5 w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white text-sm font-black shadow-lg shadow-accent/30">02</div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={300}>
                <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden" data-testid="phase-run">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto">
                      <img src={milestoneImg} alt="Run phase" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                      <div className="absolute top-5 left-5 w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white text-sm font-black shadow-lg shadow-accent/30">03</div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">Phase 3</p>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3">Run</h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Ongoing execution, optimization, and scaling. We stay embedded in your operations to keep the system running and improving.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {[
                          "KPI tracking and reporting",
                          "Weekly and monthly performance reviews",
                          "Ongoing talent acquisition support",
                          "Process and operations optimization",
                          "Demand generation optimization",
                          "Funnel and conversion improvements",
                          "Digital infrastructure optimization",
                          "Strategic advisory",
                        ].map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground font-medium">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={14} className="text-accent" />
                          <span className="font-semibold text-primary">Ongoing (minimum 3 to 6 months)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign size={14} className="text-accent" />
                          <span className="font-semibold text-primary">$4,000 to $12,000/month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-primary relative overflow-hidden" data-testid="section-flagship">
          <div className="absolute inset-0">
            <img src={teamMovingForwardImg} alt="" className="w-full h-full object-cover opacity-10 animate-ken-burns" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.15),transparent_60%)]" />
          <FloatingShape className="w-16 h-16 top-20 right-[15%]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-32 left-[10%]" variant="dot" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateOnScroll animation="fade-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  <Zap size={14} />
                  Flagship Offer
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                  90-Day Growth Infrastructure Build
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  A structured engagement combining Foundation + Build into one accelerated implementation. In 90 days, we design your growth blueprint and build the infrastructure to execute it.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "Complete strategy and system design",
                    "Recruiting priorities and team building",
                    "Website and marketing infrastructure setup",
                    "Operational systems and playbooks",
                    "Performance tracking and KPI frameworks",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      <span className="text-white/80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-accent" />
                    <span className="text-white font-bold">~90 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-accent" />
                    <span className="text-white font-bold">$20,000 to $50,000</span>
                  </div>
                </div>

                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-flagship-book">
                  <Calendar size={16} />
                  Book a Strategy Call
                </a>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-right" delay={200} className="hidden lg:block">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                    <img src={empoweredOwnerImg} alt="90-Day Growth Infrastructure Build" className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <FloatingShape className="w-28 h-28 -top-6 -right-6 z-[-1]" variant="square" />
                  <FloatingShape className="w-20 h-20 -bottom-6 -left-6 z-[-1]" variant="ring" />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border max-w-[200px] animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    <p className="text-2xl font-extrabold text-accent mb-1">90</p>
                    <p className="text-xs text-muted-foreground font-bold">days to full growth infrastructure</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-who-this-is-for">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Find Your Fit</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Who this is for
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We serve multiple audiences through one unified system. Here's where you fit and the best way to start.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: <UserCheck size={24} />,
                  audience: "Professionals",
                  desc: "Consultants, coaches, solo operators looking to build structured systems for their practice.",
                  bestFit: "Playbooks or Guided Implementation",
                  investment: "$149 to $10,000",
                  cta: "Start with a Playbook",
                  ctaLink: "/playbooks",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: <Briefcase size={24} />,
                  audience: "Small Businesses",
                  desc: "Early to mid-stage companies ($500K to $5M) ready to install repeatable systems for growth.",
                  bestFit: "Guided Implementation or Full System",
                  investment: "$2,000 to $50,000+",
                  cta: "Explore Guided Implementation",
                  ctaLink: BOOKINGS_URL,
                  color: "from-accent to-pink-600",
                  isExternal: true,
                },
                {
                  icon: <Heart size={24} />,
                  audience: "Nonprofits",
                  desc: "Mission-driven organizations that need structure, hiring systems, and operational clarity without enterprise budgets.",
                  bestFit: "Playbooks or Guided Implementation",
                  investment: "$149 to $10,000",
                  cta: "Start with a Playbook",
                  ctaLink: "/playbooks",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: <Building2 size={24} />,
                  audience: "Growing Organizations",
                  desc: "Established businesses ($1M+) and larger nonprofits ready for comprehensive infrastructure design and implementation.",
                  bestFit: "Full System Build",
                  investment: "$5,000 to $50,000+",
                  cta: "Book a Strategy Call",
                  ctaLink: BOOKINGS_URL,
                  color: "from-primary to-blue-900",
                  isExternal: true,
                },
              ].map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-300 h-full flex flex-col" data-testid={`audience-card-${i}`}>
                    <div className={`p-6 bg-gradient-to-br ${item.color} rounded-t-2xl`}>
                      <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.audience}</h3>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                      <div className="mb-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1">Best fit</p>
                        <p className="text-sm font-semibold text-primary">{item.bestFit}</p>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1">Expected investment</p>
                        <p className="text-sm font-semibold text-accent">{item.investment}</p>
                      </div>
                      <div className="mt-auto">
                        {item.isExternal ? (
                          <a href={item.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors" data-testid={`link-audience-cta-${i}`}>
                            {item.cta}
                            <ArrowRight size={14} />
                          </a>
                        ) : (
                          <Link href={item.ctaLink} className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors" data-testid={`link-audience-cta-${i}`}>
                            {item.cta}
                            <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#F8FAFC] border-t" data-testid="section-solutions-cta">
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
                    Ready to build the infrastructure your business needs?
                  </h2>
                  <p className="text-lg text-white/70 mb-12">
                    Whether you're starting with a playbook, exploring guided implementation, or ready for a full system build, the next step is simple.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/playbooks" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-accent hover:text-white h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl" data-testid="link-solutions-cta-playbooks">
                      <BookOpen size={16} />
                      Start with a Playbook
                    </Link>
                    <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-solutions-cta-book">
                      <Calendar size={16} />
                      Book a Strategy Call
                    </a>
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
