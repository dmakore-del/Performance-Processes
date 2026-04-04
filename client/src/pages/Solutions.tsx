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
  Settings,
  Target,
  BarChart3,
  Globe,
  BookOpen,
  Rocket,
  Layers,
  TrendingUp,
  Zap,
  Search,
  Briefcase,
  LayoutDashboard,
  LineChart,
  Megaphone,
  FileText,
  ArrowDown,
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

import communityCollaborationImg from "@assets/generated/community-collaboration.png";
import handsPartnershipImg from "@assets/generated/hands-together-partnership.png";
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
    { old: "Recruiting", new: "Talent Acquisition System", icon: <Users size={20} />, desc: "We build the team structure required to scale, finding and placing the right people in the right roles." },
    { old: "HR", new: "People & Performance System", icon: <Target size={20} />, desc: "We implement performance systems that improve execution, from onboarding to reviews to accountability." },
    { old: "Marketing", new: "Demand Generation System", icon: <Megaphone size={20} />, desc: "We install systems that attract and convert customers through strategy, content, and campaigns." },
    { old: "Website building", new: "Conversion System", icon: <Globe size={20} />, desc: "We design and build digital infrastructure that turns visitors into leads and leads into clients." },
    { old: "Playbooks", new: "Execution Systems", icon: <BookOpen size={20} />, desc: "Practical tools, templates, and frameworks that codify your operations for repeatable success." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <SEOHead
        title="Growth Infrastructure System | Performance Processes"
        description="We design, build, and run the systems businesses need to scale. Our Growth Infrastructure System combines talent acquisition, people operations, marketing, digital infrastructure, and playbooks into one integrated model."
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
                We design, build, and run the systems your <span className="text-accent">business needs to scale.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                We don't sell individual services. We combine recruiting, HR, marketing, website infrastructure, and playbooks into one integrated model, so your business grows with structure, not chaos.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-solutions-hero-book">
                  <Calendar size={16} />
                  Book a Strategy Call
                </a>
                <a href="#phases" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-solutions-hero-phases">
                  See the 3 Phases
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
                Everything your business needs to scale, integrated and delivered as one unified system, not a menu of disconnected services.
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
                      <div>
                        <h3 className="text-base font-bold text-primary group-hover:text-accent transition-colors">{item.new}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
              <AnimateOnScroll animation="fade-up" delay={5 * 80}>
                <div className="relative p-7 rounded-2xl border-2 border-dashed border-accent/30 bg-accent/5 flex flex-col items-center justify-center text-center h-full group hover:border-accent/50 transition-all" data-testid="system-component-cta">
                  <Layers size={28} className="text-accent mb-3" />
                  <p className="text-sm font-bold text-primary mb-1">All Systems Combined</p>
                  <p className="text-xs text-muted-foreground">Delivered through our 3-phase engagement model below</p>
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
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">How We Deliver</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Three phases to scalable growth
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every engagement follows a structured path: design, implement, optimize. Each phase builds on the last to create infrastructure that compounds.
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
                            "Recruiting and headhunting",
                            "HR system setup",
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
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">Marketing & Website Infrastructure</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            "Website strategy, design, and development",
                            "Landing pages and funnel design",
                            "Marketing system setup",
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
                          "Ongoing recruiting support",
                          "Process optimization",
                          "Marketing optimization",
                          "Funnel improvements",
                          "Website optimization",
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

        <section className="py-28 bg-white relative overflow-hidden" data-testid="section-playbooks-products">
          <GeometricAccent className="top-10 -left-10 text-primary" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-32 right-20" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Execution Systems</p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  Playbooks built from real execution
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Every playbook we sell was built from real client engagements. These are the same tools and frameworks we use inside our Growth Infrastructure System, now available as standalone products.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    "Practical tools, templates, and execution guides",
                    "Built from proven consulting methodology",
                    "Part of our integrated growth system",
                    "Priced from $49 to $999",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      <span className="text-muted-foreground font-medium">{text}</span>
                    </div>
                  ))}
                </div>
                <Link href="/playbooks" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white hover:bg-accent h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg" data-testid="link-browse-playbooks">
                  <BookOpen size={16} />
                  Browse Playbooks
                </Link>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <Users size={20} />, title: "Hiring Playbooks", desc: "Job descriptions, interview scorecards, onboarding checklists, and candidate evaluation rubrics." },
                    { icon: <Target size={20} />, title: "Performance System Playbooks", desc: "KPI libraries, review cycle templates, feedback frameworks, and calibration guides." },
                    { icon: <Megaphone size={20} />, title: "Marketing Playbooks", desc: "Marketing plans, content strategies, funnel blueprints, and lead generation frameworks." },
                    { icon: <Settings size={20} />, title: "Operations & SOP Playbooks", desc: "SOP templates, process mapping guides, accountability trackers, and quality frameworks." },
                  ].map((pb, i) => (
                    <Link href="/playbooks" key={i} className="block group" data-testid={`link-playbook-category-${i}`}>
                      <div className="bg-[#F8FAFC] rounded-2xl border border-border p-6 hover:shadow-xl hover:border-accent/20 transition-all duration-300 h-full">
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
                    Whether you need the full Growth Infrastructure System or want to start with a focused phase, the first step is a strategy conversation. Let's figure out what your business needs.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-solutions-cta-book">
                      <Calendar size={16} />
                      Book a Strategy Call
                    </a>
                    <Link href="/playbooks" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-solutions-cta-playbooks">
                      Browse Playbooks
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
