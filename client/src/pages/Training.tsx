import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";
import {
  ArrowRight, CheckCircle2, Calendar, Clock, DollarSign, Users, Target,
  BookOpen, Rocket, Layers, Zap, Briefcase, GraduationCap, ArrowDown,
  Building2, Heart, UserCheck, Monitor, UsersRound, LayoutGrid
} from "lucide-react";
import { Link } from "wouter";

import communityCollaborationImg from "@assets/generated/community-collaboration.png";
import communityWorkspaceImg from "@assets/generated/community-workspace.png";
import communityTownhallImg from "@assets/generated/community-townhall.png";
import communityNetworkImg from "@assets/generated/community-network-abstract.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const TRAINING_PROGRAMS = [
  {
    title: "Business System Foundations",
    category: "Foundation",
    categoryColor: "text-blue-600",
    categoryBg: "bg-blue-50",
    categoryBorder: "border-blue-200",
    focus: "Structure, roles, KPI systems, and process basics",
    audience: ["Professionals", "Small businesses", "Nonprofits"],
    pricing: "$199 to $999",
    timeframe: "Self-paced, workshop, or 2 to 4 week live format",
    formats: ["Self-paced", "Workshop", "Live virtual"],
    outcomes: [
      "Clear organizational structure and role definitions",
      "Documented KPIs aligned to business objectives",
      "Foundational process systems in place",
      "Leadership alignment on priorities",
    ],
  },
  {
    title: "Hiring and Team Systems Training",
    category: "Build",
    categoryColor: "text-purple-600",
    categoryBg: "bg-purple-50",
    categoryBorder: "border-purple-200",
    focus: "Role design, hiring process, candidate evaluation, onboarding, and accountability",
    audience: ["Small businesses", "Nonprofits", "Growing teams"],
    pricing: "$299 to $2,500",
    timeframe: "1 session to 4 weeks",
    formats: ["Workshop", "Live virtual", "Cohort-based"],
    outcomes: [
      "Structured hiring process with evaluation criteria",
      "Candidate scorecards and interview frameworks",
      "Onboarding system for new team members",
      "Accountability systems for team performance",
    ],
  },
  {
    title: "Execution and Performance Systems Training",
    category: "Run",
    categoryColor: "text-emerald-600",
    categoryBg: "bg-emerald-50",
    categoryBorder: "border-emerald-200",
    focus: "Weekly execution rhythm, KPI review, accountability, reporting, and performance management",
    audience: ["Small businesses", "Nonprofits", "Leadership teams"],
    pricing: "$299 to $2,500",
    timeframe: "2 to 6 weeks",
    formats: ["Live virtual", "Cohort-based"],
    outcomes: [
      "Weekly execution cadence with clear action tracking",
      "KPI review rhythms embedded in team operations",
      "Performance monitoring and reporting systems",
      "Continuous improvement practices",
    ],
  },
  {
    title: "Growth Systems Training",
    category: "Build",
    categoryColor: "text-purple-600",
    categoryBg: "bg-purple-50",
    categoryBorder: "border-purple-200",
    focus: "Website conversion, funnel structure, lead management, CRM basics, and marketing execution systems",
    audience: ["Professionals", "Small businesses", "Founder-led teams"],
    pricing: "$299 to $2,500",
    timeframe: "2 to 6 weeks",
    formats: ["Live virtual", "Cohort-based"],
    outcomes: [
      "Website optimized for lead capture and conversion",
      "Marketing funnel structure with clear stages",
      "CRM setup and lead tracking systems",
      "Demand generation execution framework",
    ],
  },
  {
    title: "Team Implementation Workshops",
    category: "Custom",
    categoryColor: "text-amber-600",
    categoryBg: "bg-amber-50",
    categoryBorder: "border-amber-200",
    focus: "Custom live training for organizations that want team-wide rollout of systems",
    audience: ["Nonprofits", "Small businesses", "Organizations with teams"],
    pricing: "$2,000 to $10,000",
    timeframe: "Half day, full day, or short multi-session engagement",
    formats: ["In-person workshop", "Virtual workshop", "Hybrid"],
    outcomes: [
      "Team-wide adoption of core business systems",
      "Shared language and frameworks across departments",
      "Implementation roadmap tailored to your organization",
      "Post-workshop tools and templates for continued application",
    ],
  },
];

const AUDIENCE_MAP = [
  { icon: <UserCheck size={22} />, audience: "Professionals", programs: ["Business System Foundations", "Growth Systems Training"], color: "from-blue-500 to-blue-600" },
  { icon: <Briefcase size={22} />, audience: "Small Businesses", programs: ["Hiring and Team Systems Training", "Execution and Performance Systems Training", "Growth Systems Training"], color: "from-accent to-pink-600" },
  { icon: <Heart size={22} />, audience: "Nonprofits", programs: ["Business System Foundations", "Hiring and Team Systems Training", "Team Implementation Workshops"], color: "from-green-500 to-green-600" },
  { icon: <Building2 size={22} />, audience: "Growing Teams & Organizations", programs: ["Execution and Performance Systems Training", "Team Implementation Workshops"], color: "from-primary to-blue-900" },
];

export default function Training() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <SEOHead
        title="Training Programs | Performance Processes"
        description="Practical system implementation training that helps leaders and teams implement real systems for growth, execution, and performance. Live virtual, cohort-based, and workshop formats."
        path="/training"
      />
      <Navbar />

      <main className="flex-grow">

        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-primary" data-testid="section-training-hero">
          <div className="absolute inset-0 z-0">
            <img src={communityNetworkImg} alt="" className="w-full h-full object-cover opacity-15 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/98 to-primary/80" />
          </div>
          <GradientOrb className="w-96 h-96 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-16 h-16 top-[20%] right-[10%] z-[3]" variant="ring" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-accent mb-6 animate-fade-in-up">System Implementation Training</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.15s" }} data-testid="text-training-hero-title">
                Practical training for <span className="text-accent">real systems.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-6 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                We provide practical training programs that help leaders and teams implement real systems for growth, execution, and performance.
              </p>
              <p className="text-base text-white/50 mb-12 max-w-xl animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
                Our training programs help organizations strengthen structure, improve execution, and build the systems required for sustainable growth.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                <a href="#programs" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-accent hover:text-white h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl" data-testid="link-training-hero-programs">
                  <GraduationCap size={16} />
                  Explore Programs
                </a>
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-training-hero-call">
                  <Calendar size={16} />
                  Book a Strategy Call
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
        </section>

        <section className="py-20 bg-white relative overflow-hidden" data-testid="section-training-positioning">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Not Generic Training</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Training designed for implementation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We do not offer generic business training. Every program is built around our Growth Infrastructure System and designed to help you implement real, working systems inside your organization.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: <Target size={24} />, title: "Foundation Training", desc: "Business structure, role clarity, KPI design, and planning systems", color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600" },
                { icon: <Layers size={24} />, title: "Build Training", desc: "Hiring systems, onboarding, website conversion, funnel setup, CRM use, and process implementation", color: "bg-purple-50 border-purple-200", iconColor: "text-purple-600" },
                { icon: <Rocket size={24} />, title: "Run Training", desc: "KPI review rhythms, accountability, execution management, performance systems, and optimization", color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600" },
              ].map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className={`${item.color} border rounded-2xl p-8 h-full`} data-testid={`training-category-${i}`}>
                    <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 ${item.iconColor}`}>
                      {item.icon}
                    </div>
                    <h3 className={`text-lg font-bold ${item.iconColor} mb-3`}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-training-formats">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Delivery Formats</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Choose the format that fits your team
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: <Monitor size={22} />, title: "Live Virtual Training", desc: "Interactive sessions led by our team, delivered remotely", price: "$99 to $499 per person" },
                { icon: <UsersRound size={22} />, title: "Cohort-Based Programs", desc: "Small group training over multiple weeks for deeper implementation", price: "$500 to $2,500 per participant" },
                { icon: <Users size={22} />, title: "Team Workshops", desc: "Custom training for your entire team, focused on your specific needs", price: "$2,000 to $10,000" },
                { icon: <LayoutGrid size={22} />, title: "Hybrid Format", desc: "Combination of live sessions, templates, and implementation tools", price: "Varies by program" },
              ].map((fmt, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 80}>
                  <div className="bg-white rounded-2xl border border-border p-6 h-full hover:shadow-lg hover:border-accent/20 transition-all duration-300" data-testid={`format-card-${i}`}>
                    <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                      {fmt.icon}
                    </div>
                    <h3 className="text-base font-bold text-primary mb-2">{fmt.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{fmt.desc}</p>
                    <p className="text-xs font-bold text-accent">{fmt.price}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="py-28 bg-white relative overflow-hidden" data-testid="section-training-programs">
          <FloatingShape className="w-24 h-24 top-20 -left-8" variant="ring" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Featured Programs</p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Training programs built from real systems
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each program is designed to help you implement proven systems, not learn abstract theory. Choose the program that matches your current priority.
              </p>
            </AnimateOnScroll>

            <div className="space-y-8 max-w-5xl mx-auto">
              {TRAINING_PROGRAMS.map((program, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 80}>
                  <div className="bg-white rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden" data-testid={`program-card-${i}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      <div className="p-8 lg:p-10 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full ${program.categoryBg} ${program.categoryBorder} border text-[11px] font-bold uppercase tracking-wider ${program.categoryColor}`}>
                            {program.category}
                          </span>
                          <div className="flex gap-2">
                            {program.formats.map((f, j) => (
                              <span key={j} className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary text-[10px] font-medium text-muted-foreground">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-3" data-testid={`text-program-title-${i}`}>{program.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-5">{program.focus}</p>
                        <div className="mb-5">
                          <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">What you will walk away with</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {program.outcomes.map((outcome, j) => (
                              <div key={j} className="flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-primary/60 mr-1 self-center">Best for:</p>
                          {program.audience.map((a, j) => (
                            <span key={j} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-xs font-medium text-primary">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`${program.categoryBg} p-8 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l ${program.categoryBorder}`}>
                        <div className="space-y-4 mb-6">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-primary/50 mb-1">Investment</p>
                            <p className={`text-lg font-bold ${program.categoryColor}`}>{program.pricing}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-primary/50 mb-1">Duration</p>
                            <p className="text-sm font-semibold text-primary">{program.timeframe}</p>
                          </div>
                        </div>
                        <a
                          href={BOOKINGS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-primary h-11 px-6 font-bold text-sm uppercase tracking-wider transition-all duration-300 w-full"
                          data-testid={`link-program-cta-${i}`}
                        >
                          <Calendar size={14} />
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-training-audience">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Find Your Fit</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Which training is right for you?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Find the programs that match your role and organization type.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {AUDIENCE_MAP.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-300 h-full flex flex-col" data-testid={`audience-training-${i}`}>
                    <div className={`p-6 bg-gradient-to-br ${item.color} rounded-t-2xl`}>
                      <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center mb-3">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.audience}</h3>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-3">Best fit programs</p>
                      <ul className="space-y-2.5 flex-1">
                        {item.programs.map((p, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{p}</span>
                          </li>
                        ))}
                      </ul>
                      <a href="#programs" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors mt-4" data-testid={`link-audience-training-${i}`}>
                        View Programs <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white relative overflow-hidden" data-testid="section-training-ladder">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Where Training Fits</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Training is part of our value ladder
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Training Programs sit between self-guided Playbooks and higher-touch consulting, giving you structured learning with practical application.
              </p>
            </AnimateOnScroll>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0 relative">
                <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 via-accent to-primary z-0" />
                {[
                  { label: "Start", tier: "Playbooks", desc: "Self-guided systems and tools", price: "$149 to $999", color: "bg-blue-500", ring: "ring-blue-200", href: "/playbooks" },
                  { label: "Learn", tier: "Training Programs", desc: "Practical training to implement key systems", price: "$99 to $10,000", color: "bg-purple-500", ring: "ring-purple-200", href: "/training" },
                  { label: "Grow", tier: "Guided Implementation", desc: "Hands-on support for focused system setup", price: "$2K to $10K", color: "bg-accent", ring: "ring-pink-200", href: "/solutions" },
                  { label: "Scale", tier: "Full System Build", desc: "Comprehensive design, build, and optimization", price: "$5K to $50K+", color: "bg-primary", ring: "ring-slate-200", href: "/solutions" },
                ].map((step, i) => (
                  <AnimateOnScroll key={i} animation="fade-up" delay={i * 120}>
                    <Link href={step.href} className="flex flex-col items-center relative z-10 py-6 group cursor-pointer">
                      <div className={`w-14 h-14 rounded-full ${step.color} text-white flex items-center justify-center text-base font-extrabold shadow-lg ring-4 ${step.ring} mb-3 group-hover:scale-110 transition-transform`}>
                        {i + 1}
                      </div>
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-1">{step.label}</p>
                      <p className="text-base font-bold text-primary mb-1 group-hover:text-accent transition-colors">{step.tier}</p>
                      <p className="text-xs text-muted-foreground text-center max-w-[160px] mb-1">{step.desc}</p>
                      <p className="text-xs font-semibold text-accent">{step.price}</p>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#F8FAFC] border-t" data-testid="section-training-cta">
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
                    Ready to build real systems with your team?
                  </h2>
                  <p className="text-lg text-white/70 mb-12">
                    Whether you need a focused workshop or a multi-week implementation program, we will help you find the right training for your organization.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-training-cta-book">
                      <Calendar size={16} />
                      Book a Strategy Call
                    </a>
                    <Link href="/playbooks" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-accent hover:text-white h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl" data-testid="link-training-cta-playbooks">
                      <BookOpen size={16} />
                      Explore Playbooks
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
