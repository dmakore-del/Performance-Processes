import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  ShieldCheck,
  Search,
  Target,
  Settings,
  BarChart3,
  Building2,
  Heart,
  Landmark,
  Briefcase,
  Cpu,
  GraduationCap,
  Factory,
  HandshakeIcon,
  Award,
  Star,
  Quote,
  Lightbulb,
  Rocket,
  BookOpen,
  Calendar,
  Tag,
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import teamMeeting1 from "@assets/stock_images/team_meeting_1.jpg";
import strategyImg from "@assets/stock_images/strategy.jpg";
import growthChartImg from "@assets/stock_images/growth_chart.jpg";
import entrepreneurImg from "@assets/stock_images/entrepreneur.jpg";
import analyticsImg from "@assets/stock_images/analytics.jpg";

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { value: "6+", label: "Service Categories", icon: <Building2 size={24} /> },
    { value: "End-to-End", label: "Consulting Support", icon: <Star size={24} /> },
    { value: "Measurable", label: "Results-Driven Approach", icon: <TrendingUp size={24} /> },
    { value: "8+", label: "Industries Served", icon: <Briefcase size={24} /> },
  ];

  const serviceHighlights = [
    {
      image: teamMeeting1,
      industry: "Strategic Planning & Alignment",
      description: "We help organizations define clear strategic direction, align leadership teams, and translate vision into measurable priorities with structured roadmaps and KPI frameworks.",
      outcomes: "Clear strategic roadmap, aligned leadership, measurable KPIs, and a shared vision that drives daily decision-making across every level of the organization.",
    },
    {
      image: strategyImg,
      industry: "Performance Management Systems",
      description: "We design and implement end-to-end performance management systems that connect goals with accountability, ensuring every team member understands how their work drives organizational success.",
      outcomes: "Comprehensive performance frameworks, balanced scorecards, role-based accountability structures, and reporting dashboards that keep your team on track.",
    },
    {
      image: growthChartImg,
      industry: "Governance & Process Improvement",
      description: "We build governance frameworks and streamline operational processes to eliminate inefficiencies, strengthen compliance, and create the structural foundation for sustainable growth.",
      outcomes: "Governance frameworks, SOPs, workflow optimization, compliance systems, and change management support for smooth organizational transitions.",
    },
    {
      image: entrepreneurImg,
      industry: "Business Registration & Setup",
      description: "We guide entrepreneurs and new ventures through the full business registration process, from incorporation and licensing to compliance setup, so you can launch with confidence and a solid legal foundation.",
      outcomes: "Complete business registration, incorporation filings, licensing guidance, compliance checklists, and a ready-to-operate organizational structure from day one.",
    },
    {
      image: analyticsImg,
      industry: "Website Design & Development",
      description: "We build professional, high-performing websites that reflect your brand and drive results, from sleek landing pages to full-featured business sites with integrated booking, payments, and analytics.",
      outcomes: "Custom-designed website, mobile-responsive layout, SEO optimization, integrated booking and payment systems, and ongoing support to keep your digital presence sharp.",
    },
  ];

  const processSteps = [
    { icon: <Search size={28} />, title: "Discovery", description: "We listen, assess, and understand your unique challenges through comprehensive intake and analysis." },
    { icon: <Target size={28} />, title: "Strategy", description: "We co-create a tailored roadmap aligned to your goals, capacity, and desired outcomes." },
    { icon: <Settings size={28} />, title: "Implementation", description: "We execute with precision, building systems, frameworks, and capabilities within your organization." },
    { icon: <BarChart3 size={28} />, title: "Optimization", description: "We monitor, refine, and sustain performance through ongoing advisory and continuous improvement." },
  ];

  const industries = [
    { icon: <Landmark size={24} />, name: "Government" },
    { icon: <Heart size={24} />, name: "Nonprofit" },
    { icon: <Building2 size={24} />, name: "Healthcare" },
    { icon: <Briefcase size={24} />, name: "Financial Services" },
    { icon: <Cpu size={24} />, name: "Technology" },
    { icon: <GraduationCap size={24} />, name: "Education" },
    { icon: <Factory size={24} />, name: "Manufacturing" },
    { icon: <HandshakeIcon size={24} />, name: "Professional Services" },
  ];

  const insights = [
    { title: "5 Signs Your Organization Needs a Strategic Reset", category: "Strategy", date: "January 15, 2026", excerpt: "Discover the warning signs that indicate your organization's strategy may be misaligned with market realities and internal capabilities." },
    { title: "Building a Culture of Accountability Without Micromanaging", category: "Leadership", date: "January 8, 2026", excerpt: "Learn how to foster ownership and accountability across teams while empowering leaders at every level to drive results." },
    { title: "The ROI of Governance: Why Structure Drives Growth", category: "Governance", date: "December 20, 2025", excerpt: "Explore how strong governance frameworks create the foundation for sustainable scaling and stakeholder confidence." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* BDC Style Hero */}
        <section className="bg-white border-b overflow-hidden relative min-h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20"
            >
              <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 md:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                <TrendingUp size={14} /> Business Consulting
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
                {t("hero.title")} <br />
                <span className="text-accent underline decoration-accent/30 underline-offset-8">{t("hero.titleAccent")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-primary text-white hover:bg-accent h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all cursor-pointer">
                    {t("hero.ctaPrimary")}
                  </Button>
                </a>
                <Link href="/services">
                  <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all">
                    {t("hero.ctaSecondary")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
               <img
                 src="/assets/images/bdc-style-hero.jpg"
                 alt="Business Consulting"
                 className="rounded-2xl shadow-2xl relative z-10 w-full h-auto object-cover grayscale-0"
               />
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 border border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary italic leading-none">Results</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Driven Approach</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers / Stats Banner */}
        <section className="bg-primary py-16" data-testid="section-stats-banner">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center" data-testid={`stat-item-${i}`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-accent mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-2">{stat.value}</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BDC Style Services Grid */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Performance systems for people and businesses
              </h2>
              <p className="text-lg text-muted-foreground">
                From individuals building better habits to enterprises transforming operations — we help you hit your goals, stay accountable, and grow consistently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Enterprise Consulting", desc: "Strategic engagements, systems implementation, and executive advisory for companies and leadership teams ready for transformation.", icon: <Briefcase className="text-accent" /> },
                { title: "Small Business Growth", desc: "Monthly programs with strategy sessions, KPI dashboards, accountability check-ins, and process improvement for teams of 1–20.", icon: <Rocket className="text-accent" /> },
                { title: "Personal Performance Coaching", desc: "Monthly coaching, productivity systems, goal planning, and habit building for professionals, freelancers, and entrepreneurs.", icon: <GraduationCap className="text-accent" /> },
                { title: "Tools & Programs", desc: "Self-serve performance planners, 90-day programs, and template toolkits you can use at your own pace — starting at $49.", icon: <BookOpen className="text-accent" /> },
                { title: "Business Registration", desc: "We handle the full incorporation process, from entity structuring and government filings to compliance setup and governance documents.", icon: <Building2 className="text-accent" /> },
                { title: "Website & Digital Presence", desc: "Professional, performance-driven websites with integrated booking, payments, and analytics to amplify your brand and attract clients.", icon: <Search className="text-accent" /> }
              ].map((s, i) => (
                <Link key={i} href={`/services`}>
                  <div className="block h-full">
                    <div className="bg-white p-10 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[320px] h-full">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                          {s.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">{s.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                      <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                        Learn more <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section className="py-24 bg-white border-y" data-testid="section-service-highlights">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                <Award size={14} /> What We Deliver
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Expertise that drives real outcomes
              </h2>
              <p className="text-lg text-muted-foreground">
                Our consulting engagements are designed to produce tangible, lasting improvements across strategy, performance, and operations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {serviceHighlights.map((item, i) => (
                <div key={i} className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300" data-testid={`service-highlight-card-${i}`}>
                  <div className="h-52 overflow-hidden">
                    <img src={item.image} alt={item.industry} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-accent mb-3">{item.industry}</div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                    <h3 className="text-lg font-bold text-primary mb-3">Key Outcomes</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.outcomes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work / Process Overview */}
        <section className="py-24 bg-[#F8FAFC]" data-testid="section-process-overview">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                <Lightbulb size={14} /> Our Process
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                How we work with you
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven four-phase approach that ensures clarity, alignment, and measurable results at every stage of our engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {processSteps.map((step, i) => (
                <div key={i} className="relative" data-testid={`process-step-${i}`}>
                  <div className="bg-white rounded-2xl p-8 border border-border text-center hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                      {step.icon}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Step {i + 1}</div>
                    <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight size={20} className="text-accent" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/approach">
                <Button className="rounded-full bg-primary text-white hover:bg-accent h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all" data-testid="button-learn-approach">
                  Learn more about our approach <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-24 bg-white border-y" data-testid="section-industries">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Industries we serve
              </h2>
              <p className="text-lg text-muted-foreground">
                Our consultants bring deep expertise across a diverse range of sectors, enabling us to deliver context-specific solutions that drive real impact.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industries.map((industry, i) => (
                <div key={i} className="bg-[#F8FAFC] rounded-2xl p-8 text-center border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300 group cursor-pointer" data-testid={`industry-card-${i}`}>
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    {industry.icon}
                  </div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wide">{industry.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted Partners & Certifications */}
        <section className="py-20 bg-[#F8FAFC]" data-testid="section-trust-badges">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-4">
              Trusted by organizations across Canada
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              We are proud to partner with forward-thinking organizations committed to performance, accountability, and sustainable growth.
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {["ISO 9001 Aligned", "Diversity & Inclusion Committed", "Data Privacy Compliant"].map((badge, i) => (
                <div key={i} className="flex items-center gap-3 bg-white px-6 py-4 rounded-full border border-border shadow-sm" data-testid={`trust-badge-${i}`}>
                  <ShieldCheck size={20} className="text-accent" />
                  <span className="text-sm font-bold text-primary">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Insights / Blog Preview */}
        <section className="py-24 bg-white border-t" data-testid="section-latest-insights">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                  <BookOpen size={14} /> Insights
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                  Latest thinking & insights
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Stay ahead with expert perspectives on strategy, leadership, and organizational performance.
                </p>
              </div>
              <Link href="/insights">
                <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5 h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all mt-6 md:mt-0" data-testid="button-view-all-insights">
                  View all insights <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((insight, i) => (
                <Link key={i} href="/insights">
                  <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col" data-testid={`insight-preview-card-${i}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                        <Tag size={10} /> {insight.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar size={10} /> {insight.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{insight.excerpt}</p>
                    <div className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                      Read more <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - BDC Style */}
        <section className="py-24 bg-white border-y">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-8 leading-tight">
                  Expert advice to propel <br /> your business forward
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold italic">01</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Practical Solutions</h4>
                      <p className="text-muted-foreground">We focus on actionable advice that delivers immediate and measurable results for your organization.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold italic">02</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Industry Expertise</h4>
                      <p className="text-muted-foreground">Our consultants bring years of experience across various sectors to help you navigate specific challenges.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold italic">03</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Sustainable Impact</h4>
                      <p className="text-muted-foreground">We build capabilities within your team to ensure that improvements are maintained long-term.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 bg-secondary p-12 lg:p-16 rounded-3xl text-center">
                 <h3 className="text-2xl md:text-3xl font-bold mb-8 text-primary uppercase italic">Ready to take the next step?</h3>
                 <p className="text-lg text-muted-foreground mb-10">Our consultants are ready to discuss your business needs and help you find the right solution.</p>
                 <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
                   <Button className="rounded-full bg-accent text-white hover:bg-primary h-16 px-12 text-lg font-bold uppercase tracking-widest transition-all">
                     Book a consultation
                   </Button>
                 </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}