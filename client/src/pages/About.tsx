import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ArrowRight } from "lucide-react";
import founderImage from "@/assets/founder.png";
import seanImage from "@/assets/ChatGPT_Image_Feb_20,_2026,_04_07_16_PM_1771621735605.png";
import collaborationImg from "@assets/generated/collaboration.png";
import trainingImg from "@assets/generated/training.png";
import teamStrategyImg from "@assets/generated/team-strategy-new.png";
import cityAerialImg from "@assets/generated/city-aerial-new.png";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function About() {
  const { t } = useLanguage();

  const timelineItems = [
    { year: "2023", title: "Performance Processes Founded", description: "Danai Makore launches Performance Processes with a vision to help small businesses install the systems they need to grow with confidence." },
    { year: "2024", title: "Service Portfolio Launch", description: "Launching foundational services across websites, marketing, and business systems for professionals and emerging businesses." },
    { year: "2024–2025", title: "Building Multi-Sector Experience", description: "Working with founders, nonprofits, and small businesses across Canada to design and operate growth infrastructure." },
    { year: "2025", title: "Productized Growth Infrastructure", description: "Reorienting around six productized practices: Web, Marketing, CRM, Business Systems, Training, and Ongoing Support — installed as one integrated system." },
    { year: "2026", title: "Core Team Assembled", description: "Sean Ogbonnaya joins as Director of Business Development, bringing expertise in relationship development and strategic advisory." },
    { year: "2026+", title: "NextUp Canada Partnership", description: "Partnering with NextUp Canada to make our productized growth infrastructure accessible to youth-owned businesses across the country." },
  ];

  const values = [
    {
      title: "Integrity",
      description: "We operate with unwavering honesty and transparency.",
      practice: "Every recommendation is grounded in what's truly best for our clients, not what generates the most revenue.",
    },
    {
      title: "Excellence",
      description: "We pursue the highest standards in everything we do.",
      practice: "From research and analysis to the clarity of our deliverables, we hold ourselves to the same bar we set for clients.",
    },
    {
      title: "Collaboration",
      description: "We work alongside our clients, not above them.",
      practice: "We combine our expertise with your organizational knowledge to create strategies that genuinely fit your context.",
    },
    {
      title: "Innovation",
      description: "We continuously evolve our methodologies.",
      practice: "Embracing new frameworks, technologies, and approaches to keep our clients ahead of the curve.",
    },
    {
      title: "Impact",
      description: "Every engagement must produce measurable results.",
      practice: "We track outcomes with clear KPIs and success metrics, because sustainable change requires proof.",
    },
    {
      title: "Accountability",
      description: "We hold ourselves to the same standards we set.",
      practice: "We track our commitments, take ownership of results, and course-correct when needed.",
    },
  ];

  const industries = [
    { name: "Professional Services" },
    { name: "Small & Growing Businesses" },
    { name: "Nonprofits & Social Enterprises" },
    { name: "Trades & Local Services" },
    { name: "Health, Wellness & Coaching" },
    { name: "Creators & Personal Brands" },
  ];

  const credentials = [
    { label: "Psychology", detail: "Academic Training" },
    { label: "HR Management", detail: "Academic Training" },
    { label: "Small Business Systems", detail: "Sector Expertise" },
    { label: "Marketing & CRM", detail: "Sector Expertise" },
    { label: "Training & Coaching", detail: "Service Area" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <SEOHead title="About Us, Our Story & Mission" description="Performance Processes is a growth infrastructure studio founded by Danai Makore in 2023. We install websites, marketing, CRM, business systems, training, and ongoing support as one integrated system for professionals, nonprofits, and small businesses." path="/about" />
      <Navbar />
      <main className="flex-grow">

        <section className="relative min-h-[550px] lg:min-h-[700px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40"
              poster={teamStrategyImg}
            >
              <source src="/assets/videos/team-collab.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/5 h-full hidden lg:block z-[1]">
            <img src={cityAerialImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          </div>
          <GradientOrb className="w-80 h-80 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-14 h-14 top-[25%] right-[12%] z-[3]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-[25%] right-[30%] z-[3]" variant="dot" />
          <GeometricAccent className="bottom-[10%] right-[5%] text-white z-[2]" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-3xl lg:max-w-[55%]">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-accent mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }} data-testid="text-hero-label">
                Who We Are
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="text-hero-title">
                A growth infrastructure studio for <span className="text-accent">businesses ready to scale</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                Performance Processes was founded on a simple belief: small businesses, nonprofits, and growing teams deserve partners who don't just advise — they design, build, and run the systems that move the business forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="button-hero-book">
                    Book a Discovery Call
                </a>
                <Link href="/services" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="button-hero-services">
                    Explore Our Services <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-b" data-testid="section-trust-strip">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {industries.map((ind, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 80}>
                  <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#F8FAFC] border border-border/50 hover:border-accent/30 hover:shadow-sm transition-all hover:scale-105 duration-300" data-testid={`industry-${i}`}>
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs font-bold text-primary text-center leading-tight">{ind.name}</span>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-white border-b relative overflow-hidden" data-testid="section-founder">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-36 -left-36" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <AnimateOnScroll animation="fade-left" className="lg:w-2/5 relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent/20 rounded-2xl -z-10 translate-x-4 translate-y-4"></div>
                <img
                  src={founderImage}
                  alt="Danai Makore - Principal Consultant at Performance Processes"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                  data-testid="img-founder"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl border border-border hidden md:block max-w-[280px]">
                  <span className="text-accent text-4xl font-serif mb-4 block leading-none">"</span>
                  <p className="text-primary font-bold italic text-lg leading-tight mb-2">
                    "To help people build organizations
                    that truly change lives."
                  </p>
                  <p className="text-accent font-black text-[10px] uppercase tracking-widest">, Danai Makore</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200} className="lg:w-3/5">
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  Meet Our Founder
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4 leading-tight">
                  Danai <span className="text-accent italic">Makore</span>
                </h2>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                  Founder & Principal
                </p>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-[640px]">
                  <p>
                    Danai Makore is a builder, strategist, and
                    operator whose work spans website design,
                    marketing, CRM, and business systems for
                    professionals, nonprofits, and growing businesses.
                  </p>
                  <p>
                    With academic training in Psychology and
                    Human Resource Management, and currently
                    pursuing a Masters of Science in Management
                    Practice at York University, Danai brings a deep
                    commitment to equity, access, and sustainable
                    impact. She founded Performance Processes
                    to install the growth infrastructure small
                    businesses need to scale with confidence.
                  </p>
                  <p>
                    Her approach blends human insight with
                    practical execution — designing the website,
                    setting up the CRM, launching the marketing,
                    and training the team that will run it all
                    long after the engagement ends.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {credentials.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl border border-border shadow-sm" data-testid={`credential-${i}`}>
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-xs font-bold text-primary">{c.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4 items-center">
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-primary h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent/20" data-testid="button-schedule-consultation">
                      Schedule Consultation
                  </a>
                  <a href="https://danaimakore.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all" data-testid="button-learn-founder">
                      Learn More About Danai
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-gradient-to-b from-[#F8FAFC] to-white border-b relative overflow-hidden" data-testid="section-philosophy">
          <FloatingShape className="w-20 h-20 top-16 -left-6" variant="ring" />
          <FloatingShape className="w-10 h-10 bottom-20 right-16" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-8">
                Our Philosophy
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary mb-8 leading-tight">
                One growth system for<br />
                <span className="text-accent italic">every stage of business</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-16">
                Whether you're a professional building your first website,
                a nonprofit launching a campaign, or a small business
                installing CRM, training, and ongoing support — we
                integrate the six practices most firms sell separately
                into one execution system designed for measurable growth.
              </p>
            </AnimateOnScroll>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  { label: "Founded", val: "2023" },
                  { label: "Service Practices", val: "6" },
                  { label: "Productized Offers", val: "20+" },
                  { label: "Industries Served", val: "6+" }
                ].map((s, i) => (
                  <AnimateOnScroll key={i} animation="fade-up" delay={i * 120}>
                    <div className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300" data-testid={`stat-card-${i}`}>
                      <div className="text-4xl font-black text-primary mb-2">{s.val}</div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{s.label}</div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden" data-testid="section-mission-cta">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(42,110,240,0.08)_0%,transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6 leading-tight">
                  "To install the growth infrastructure professionals, nonprofits, and small businesses need to scale — websites, marketing, CRM, business systems, training, and ongoing support, integrated as one."
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  We design, build, and run the systems other firms only advise on — across six integrated practices, delivered as productized engagements with clear scope, timelines, and outcomes.
                </p>
              </div>
              <div className="shrink-0">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="button-mission-cta">
                    Book a Discovery Call
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-white border-b border-border relative overflow-hidden">
          <FloatingShape className="w-16 h-16 top-20 right-20" variant="ring" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                Our Team
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Leadership
              </h2>
            </AnimateOnScroll>

            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start max-w-6xl mx-auto">
              <AnimateOnScroll animation="fade-left" className="lg:w-1/3">
                <div className="relative">
                  <div className="absolute top-4 -right-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                  <img
                    src={seanImage}
                    alt="Sean Ogbonnaya - Director of Business Development"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[3/4] hover:scale-[1.02] transition-transform duration-700"
                    data-testid="img-sean"
                  />
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200} className="lg:w-2/3">
                <h3 className="text-3xl font-heading font-extrabold text-primary mb-2">
                  Sean <span className="text-accent italic">Ogbonnaya</span>
                </h3>
                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                  Director of Business Development
                </div>

                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-[600px]">
                  <p>
                    Sean Ogbonnaya leads strategic growth initiatives
                    and builds lasting partnerships with small
                    businesses, nonprofits, and professionals
                    committed to building better systems.
                  </p>
                  <p>
                    With degrees in Computer Science and the
                    Creative Arts, and a strong background in
                    relationship development and strategic advisory,
                    Sean specializes in helping clients pick the right
                    starting point — whether that's a new website,
                    a CRM, or a full growth-infrastructure bundle.
                  </p>
                  <p className="font-medium text-primary italic border-l-4 border-accent pl-6 py-2 bg-gradient-to-r from-[#F8FAFC] to-transparent rounded-r-lg">
                    Passionate about matching clients with the right
                    productized offer — from a single-practice engagement
                    to a fully integrated growth-infrastructure build.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-4 items-center">
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-primary h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent/20" data-testid="button-schedule-sean">
                      Schedule Consultation
                  </a>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Relationship Development</span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Strategic Advisory</span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-gradient-to-b from-[#F8FAFC] to-white border-b relative overflow-hidden" data-testid="section-values">
          <GeometricAccent className="-left-10 top-32 text-primary" />
          <FloatingShape className="w-12 h-12 bottom-20 right-16" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                What Drives Us
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Our Core <span className="text-accent italic">Values</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide every decision we make
                and every relationship we build.
              </p>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 120}>
                  <div className="bg-gradient-to-br from-white via-white to-accent/5 p-8 rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg transition-all group hover:scale-[1.02] duration-300 h-full" data-testid={`value-card-${i}`}>
                    <h3 className="text-xl font-heading font-extrabold text-primary mb-2">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{value.description}</p>
                    <div className="pt-4 border-t border-border/60">
                      <p className="text-sm text-primary/70 leading-relaxed italic">{value.practice}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-white border-b relative overflow-hidden" data-testid="section-what-sets-us-apart">
          <GradientOrb className="w-72 h-72 bg-accent/5 -top-32 -right-32" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <AnimateOnScroll animation="fade-left">
                  <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                    Our Difference
                  </div>
                  <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                    What Sets Us <span className="text-accent italic">Apart</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
                    Most firms sell hours and slide decks. We install infrastructure that compounds — long after the engagement ends.
                  </p>
                  <div className="space-y-5">
                    {[
                      { title: "One Integrated System", desc: "Web, marketing, CRM, business systems, training, and ongoing support — built to work together, not stitched after the fact." },
                      { title: "Productized Engagements", desc: "Clear scope, fixed pricing, defined timelines. You always know what you're getting and when." },
                      { title: "We Build, We Don't Just Advise", desc: "We design, build, and operate the systems alongside your team — not just hand over recommendations." },
                      { title: "Built to Run Without Us", desc: "Every engagement leaves behind documented playbooks, dashboards, and trained operators you keep." },
                      { title: "Right-Sized for Small Business", desc: "Frameworks adapted for professionals, nonprofits, and growing teams — not bloated overhead built for someone else." },
                      { title: "Ongoing Support When You Need It", desc: "Optional monthly retainers keep your marketing, CRM, and systems running and improving over time." },
                    ].map((adv, i) => (
                      <div key={i} className="flex items-start gap-4 group" data-testid={`advantage-${i}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                        <div>
                          <h4 className="text-base font-bold text-primary mb-1">{adv.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fade-right" delay={200}>
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                    <img
                      src={collaborationImg}
                      alt="Team collaboration at Performance Processes"
                      className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3] hover:scale-[1.02] transition-transform duration-700"
                      data-testid="img-collaboration"
                    />
                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                            <span className="text-xs font-bold text-primary">Long-Term Focus</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                            <span className="text-xs font-bold text-primary">Trust-Based</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#F8FAFC] border-b relative overflow-hidden" data-testid="section-timeline">
          <FloatingShape className="w-14 h-14 top-20 right-10" variant="ring" />
          <GradientOrb className="w-64 h-64 bg-primary/3 -bottom-32 -left-32" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Our Story & <span className="text-accent italic">Milestones</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From a bold vision to a growing consultancy, here's
                how Performance Processes has evolved.
              </p>
            </AnimateOnScroll>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/20 -translate-x-1/2"></div>
              {timelineItems.map((item, i) => (
                <AnimateOnScroll key={i} animation={i % 2 === 0 ? "fade-left" : "fade-right"} delay={i * 150}>
                <div className={`relative flex items-start mb-14 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} data-testid={`timeline-item-${i}`}>
                  <div className="hidden md:block md:w-1/2"></div>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-accent flex items-center justify-center z-10 shadow-md">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-white p-7 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{item.year}</div>
                      <h3 className="text-xl font-heading font-extrabold text-primary mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-white border-b border-border relative overflow-hidden" data-testid="section-community">
          <GeometricAccent className="-right-10 top-20 text-accent" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <AnimateOnScroll animation="fade-left">
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  Giving Back
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  Community <span className="text-accent italic">Involvement</span>
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-[560px]">
                  <p>
                    We believe that business excellence and
                    community responsibility go hand in hand.
                    We use our expertise to create positive
                    change beyond the boardroom.
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  {[
                    { text: "Pro-bono consulting for emerging nonprofits and social enterprises" },
                    { text: "Mentorship programs connecting aspiring consultants with experienced leaders" },
                    { text: "Community workshops on leadership and organizational development" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                      <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-primary mb-5">Sponsor Pro-Bono Consulting</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-[480px]">
                    Your sponsorship directly funds consulting
                    engagements for nonprofits and social enterprises.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { tier: "supporter", name: "Supporter", price: "$150", desc: "1 hour of pro-bono consulting" },
                      { tier: "champion", name: "Champion", price: "$500", desc: "Half-day engagement" },
                      { tier: "catalyst", name: "Catalyst", price: "$1,500", desc: "Full consulting project" },
                    ].map((t) => (
                      <button
                        key={t.tier}
                        onClick={async () => {
                          try {
                            const res = await fetch("/api/sponsor-checkout", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ tier: t.tier }),
                            });
                            const data = await res.json();
                            if (data.url) {
                              window.location.href = data.url;
                            } else {
                              alert("Unable to start checkout. Please try again later.");
                            }
                          } catch (err) {
                            console.error("Sponsor checkout error:", err);
                            alert("Something went wrong. Please try again later.");
                          }
                        }}
                        className="bg-gradient-to-br from-white to-accent/5 p-6 rounded-2xl border-2 border-border hover:border-accent hover:shadow-lg transition-all text-center group cursor-pointer"
                        data-testid={`button-sponsor-${t.tier}`}
                      >
                        <div className="text-2xl font-black text-primary group-hover:text-accent transition-colors mb-1">{t.price}</div>
                        <div className="text-sm font-bold text-primary mb-1">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                  <img
                    src={trainingImg}
                    alt="Performance Processes community engagement and training"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3] hover:scale-[1.02] transition-transform duration-700"
                    data-testid="img-community"
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="bg-primary py-32 text-white relative overflow-hidden" data-testid="section-final-cta">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-50"
              poster={teamStrategyImg}
            >
              <source src="/assets/videos/cta-speaker.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-primary/95" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
          <FloatingShape className="w-20 h-20 top-16 left-16 opacity-20" variant="ring" />
          <FloatingShape className="w-12 h-12 bottom-20 right-24 opacity-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <AnimateOnScroll className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 leading-tight">
                Let's build something <span className="text-accent">meaningful</span> together
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
                Whether you need a new website, a CRM you'll actually use, or a full growth infrastructure installed end-to-end — we're ready to partner with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-14 text-lg font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-2xl hover:scale-105 w-full sm:w-auto" data-testid="button-final-cta">
                    Book a Discovery Call
                </a>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-16 px-12 text-lg font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="button-contact-cta">
                    Contact Us
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
