import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { useState } from "react";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import consultingImg from "@assets/generated/consulting.png";
import strategyImg from "@assets/generated/strategy.png";
import strategyWhiteboardImg from "@assets/generated/strategy-whiteboard-new.png";
import processFlowImg from "@assets/generated/process-flow-new.png";
import balancedScorecardImg from "@assets/generated/balanced-scorecard.png";
import swotAnalysisImg from "@assets/generated/swot-analysis.png";
import kpiFrameworksImg from "@assets/generated/kpi-frameworks.png";
import processMappingImg from "@assets/generated/process-mapping.png";
import stakeholderAnalysisImg from "@assets/generated/stakeholder-analysis.png";
import changeManagementImg from "@assets/generated/change-management.png";
import performanceDashboardsImg from "@assets/generated/performance-dashboards.png";
import leadershipCompetencyImg from "@assets/generated/leadership-competency.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function Approach() {
  const { language } = useLanguage();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const steps = [
    {
      num: "01",
      title: language === "en" ? "Discover" : "Découvrir",
      desc: language === "en"
        ? "We start by understanding your business, audience, and growth goals, and audit the systems you already have in place."
        : "Nous commençons par comprendre votre entreprise, votre audience et vos objectifs de croissance, et nous auditons les systèmes déjà en place.",
      duration: "1–2 weeks",
      color: "from-zinc-700/15 to-zinc-800/5",
      accentColor: "text-zinc-800",
      bgAccent: "bg-zinc-800",
      borderAccent: "border-zinc-700/20",
      details: [
        "Every engagement starts with a clear-eyed look at where your business is today. We learn how you sell, who you sell to, what's working, and where the friction lives, across your website, marketing, CRM, and back-office systems.",
        "We talk to you, your team, and where useful, your customers. We review your current site, marketing channels, CRM (if any), and the day-to-day processes that keep the business running.",
        "The output of Discover is a short, honest map of your current state and a prioritized list of what to install first to unlock the biggest wins.",
      ],
      activities: [
        "Founder & team interviews",
        "Website, brand, and marketing audit",
        "CRM and lead-flow review",
        "Business systems and SOP review",
        "Audience and offer clarity check",
        "Prioritized roadmap and quote",
      ],
      outcomes: [
        "Clear picture of what's working and what isn't",
        "Prioritized list of growth-infrastructure gaps",
        "Right-sized scope and budget recommendation",
        "A confident starting point, no guesswork",
      ],
    },
    {
      num: "02",
      title: language === "en" ? "Design & Plan" : "Conception et planification",
      desc: language === "en"
        ? "We design the website, marketing engine, CRM workflows, and operating playbooks your business will run on."
        : "Nous concevons le site web, le moteur marketing, les flux CRM et les manuels d'exploitation sur lesquels votre entreprise fonctionnera.",
      duration: "2–4 weeks",
      color: "from-emerald-500/15 to-emerald-600/5",
      accentColor: "text-emerald-600",
      bgAccent: "bg-emerald-600",
      borderAccent: "border-emerald-500/20",
      details: [
        "With the picture clear, we design the system. That means site architecture and key page layouts, the marketing channels and campaigns we'll launch with, the CRM pipeline that will track every lead, and the SOPs your team will actually use.",
        "We work in tight cycles with you, quick approvals, no surprises. You see structure and copy before anything is built so the heavy build phase moves fast.",
        "By the end of Design & Plan you have a documented blueprint: what's being built, by when, by whom, and what success looks like.",
      ],
      activities: [
        "Sitemap, wireframes, and brand direction",
        "Marketing campaign and content plan",
        "CRM pipeline and lead-flow design",
        "SOPs and operating playbooks drafted",
        "KPI and reporting framework agreed",
        "Implementation roadmap signed off",
      ],
      outcomes: [
        "Approved blueprint for the full system",
        "Clear KPIs and definition of done",
        "Aligned timeline across every workstream",
        "Confidence before a single thing is built",
      ],
    },
    {
      num: "03",
      title: language === "en" ? "Build & Install" : "Construire et installer",
      desc: language === "en"
        ? "We build the website, set up the CRM, launch the marketing engine, and train your team to run it."
        : "Nous construisons le site web, configurons le CRM, lançons le moteur marketing et formons votre équipe à l'exploiter.",
      duration: "4–12 weeks",
      color: "from-amber-500/15 to-amber-600/5",
      accentColor: "text-amber-600",
      bgAccent: "bg-amber-600",
      borderAccent: "border-amber-500/20",
      details: [
        "This is where the system goes from blueprint to live infrastructure. We build the website, configure the CRM, set up email and social channels, and write the playbooks your team will follow.",
        "We don't disappear and reappear with a finished product. You see progress weekly, and we train your team alongside the build so they own the system the moment it goes live.",
        "Build & Install ends with a launch, site live, CRM tracking real leads, first campaigns out, team trained, documentation handed over.",
      ],
      activities: [
        "Website design, build, and launch",
        "CRM setup and lead automation",
        "Marketing channels and first campaigns",
        "SOPs and playbooks finalized",
        "Team training sessions and walkthroughs",
        "Launch checklist and go-live support",
      ],
      outcomes: [
        "Live website, CRM, and marketing engine",
        "Team trained to run the day-to-day",
        "Documented playbooks you keep forever",
        "Real leads flowing through a real pipeline",
      ],
    },
    {
      num: "04",
      title: language === "en" ? "Run & Optimize" : "Exploiter et optimiser",
      desc: language === "en"
        ? "Optional ongoing support keeps your marketing, CRM, and systems running and improving, month after month."
        : "Un soutien continu optionnel maintient votre marketing, votre CRM et vos systèmes opérationnels et en amélioration, mois après mois.",
      duration: "Optional, monthly",
      color: "from-violet-500/15 to-violet-600/5",
      accentColor: "text-violet-600",
      bgAccent: "bg-violet-600",
      borderAccent: "border-violet-500/20",
      details: [
        "A great launch is the start, not the finish. Many clients keep us on a monthly retainer to run their marketing, manage the CRM, optimize the website, and refine the playbooks as the business grows.",
        "We track the KPIs we agreed in Design & Plan, share a monthly performance summary, and adjust the system based on real data, not guesses.",
        "When something new comes up, a new offer, a new market, a new hire, we already know your system and can move fast. If you'd rather run it in-house, we hand off cleanly and stay available for ad-hoc support.",
      ],
      activities: [
        "Monthly marketing execution",
        "CRM management and lead nurture",
        "Website updates and conversion tweaks",
        "Performance reporting and reviews",
        "New campaigns, content, and SOP updates",
        "Quarterly strategy refresh sessions",
      ],
      outcomes: [
        "A growth engine that keeps producing",
        "Clear monthly visibility on what's working",
        "Compounding improvements over time",
        "Optional, no long-term lock-in",
      ],
    },
  ];

  const toolsAndFrameworks = [
    {
      image: balancedScorecardImg,
      title: "Website & Brand System",
      desc: "Editorial design, fast performance, conversion-ready architecture, and a brand system your site, social, and sales materials all share.",
    },
    {
      image: swotAnalysisImg,
      title: "Marketing Engine",
      desc: "Email, social, and campaign infrastructure designed to fill the top of your pipeline and turn attention into qualified leads.",
    },
    {
      image: kpiFrameworksImg,
      title: "CRM & Lead Tracking",
      desc: "A right-sized CRM your team will actually use, pipelines, automations, and reporting so no lead falls through the cracks.",
    },
    {
      image: processMappingImg,
      title: "SOPs & Operating Playbooks",
      desc: "Documented playbooks for sales, marketing, and operations, so your business runs the same way whether or not you're in the room.",
    },
    {
      image: stakeholderAnalysisImg,
      title: "Training & Implementation",
      desc: "Workshops and one-on-one coaching so your team learns the system as it's built, and owns it the moment it goes live.",
    },
    {
      image: changeManagementImg,
      title: "Foundation Sprints",
      desc: "Short, focused engagements to define structure, roles, KPIs, and the basics that hold a small business together.",
    },
    {
      image: performanceDashboardsImg,
      title: "Performance Dashboards",
      desc: "Simple, monthly dashboards that show how the website, marketing, and CRM are performing against the KPIs we set together.",
    },
    {
      image: leadershipCompetencyImg,
      title: "Ongoing Support Retainers",
      desc: "Optional monthly retainers, marketing execution, CRM management, content, and continuous optimization, with no long-term lock-in.",
    },
  ];

  const faqItems = [
    {
      question: "Which services do you actually offer?",
      answer: "Six integrated practices: Websites, Marketing, CRM & Lead Tracking, Business Systems, Training & Implementation, and Ongoing Support. You can buy any one as a standalone productized engagement, or combine several into a bundle that installs your full growth infrastructure end-to-end.",
    },
    {
      question: "How long does a typical engagement last?",
      answer: "It depends on the scope. A standalone website usually runs 4–8 weeks. A CRM setup is typically 2–4 weeks. A full growth-infrastructure bundle (web + marketing + CRM + systems + training) usually runs 8–12 weeks from kickoff to launch. Ongoing support retainers are monthly and continue as long as they're useful.",
    },
    {
      question: "Who do you work with?",
      answer: "Professionals, nonprofits, and small-to-mid-sized businesses across Canada. Common fits include professional services, trades and local services, health and wellness practices, coaches and consultants, creators and personal brands, and growing nonprofits.",
    },
    {
      question: "Do you offer fixed pricing?",
      answer: "Yes. Almost everything we do is productized, a clearly defined scope, deliverables, timeline, and price you see before you commit. Bundles and ongoing retainers are also fixed-fee. The only thing we quote case-by-case is highly custom work that doesn't fit an existing offer.",
    },
    {
      question: "What makes your approach different?",
      answer: "Three things. First, we install one integrated system, web, marketing, CRM, systems, training, and support, instead of selling each piece separately. Second, we build and run it with you, not just hand over slide decks. Third, every engagement leaves behind documented playbooks and trained operators so the system runs without us.",
    },
    {
      question: "Do you work remote or in-person?",
      answer: "Most of our work runs remotely with structured weekly check-ins, which keeps timelines tight and budgets predictable. For workshops, training, and key strategy sessions, we travel where it matters. Hybrid is the most common setup.",
    },
    {
      question: "What happens after launch?",
      answer: "You keep everything we built, the website, the CRM configuration, the SOPs, the brand assets, the playbooks. From there you can run the system in-house, hand it off to your team, or keep us on as a monthly retainer to execute marketing, manage the CRM, and keep optimizing.",
    },
    {
      question: "How much of our team's time do you need?",
      answer: "Less than most firms. We design productized engagements to minimize the meetings tax, typically a weekly 30–45 minute working session, plus async approvals for design and copy. The exception is training, where we deliberately want your team in the room.",
    },
    {
      question: "Can you work alongside our existing tools or partners?",
      answer: "Yes. We meet you where you are. If you already have a CRM, an agency, or in-house marketing, we plug into what's working and replace only what isn't. We're focused on outcomes, not territory.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="Our Approach, How We Install Growth Infrastructure" description="A structured four-phase method for installing growth infrastructure: Discover, Design & Plan, Build & Install, and Run & Optimize. Productized scope, fixed timelines, measurable outcomes." path="/approach" />
      <Navbar />
      <main className="flex-grow">

        <section className="relative min-h-[600px] lg:min-h-[750px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img src={processFlowImg} alt="" className="w-full h-full object-cover opacity-15 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/5 h-full hidden lg:block z-[1]">
            <img src={strategyWhiteboardImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          </div>
          <GradientOrb className="w-80 h-80 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-16 h-16 top-[20%] right-[10%] z-[3]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-[30%] right-[35%] z-[3]" variant="dot" />
          <GeometricAccent className="bottom-[12%] right-[5%] text-white z-[2]" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-3xl lg:max-w-[55%]">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-accent mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }} data-testid="text-hero-label">
                {language === "en" ? "Our Approach" : "Notre approche"}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="text-hero-title">
                {language === "en" ? (
                  <>How we install <span className="text-accent italic">growth infrastructure</span></>
                ) : (
                  <>Comment nous installons <span className="text-accent italic">l'infrastructure de croissance</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                {language === "en"
                  ? "A clear four-phase method for designing, building, and running the websites, marketing, CRM, and business systems your team will use every day."
                  : "Une méthode claire en quatre phases pour concevoir, construire et faire fonctionner les sites web, le marketing, le CRM et les systèmes d'affaires que votre équipe utilisera chaque jour."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="link-hero-book">
                    {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                </a>
                <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="link-hero-services">
                    {language === "en" ? "Explore Services" : "Explorer les services"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white relative overflow-hidden" data-testid="section-methodology-intro">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-36 -left-36" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <AnimateOnScroll animation="fade-left">
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-8 italic" data-testid="text-methodology-title">
                  Built to Build, Not Just Advise
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Most firms hand over a strategy and walk away. We do the opposite, we install the website, set up the CRM, launch the marketing, write the playbooks, and train the team that will run it all.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At the heart of our method is a simple belief: <strong className="text-primary">growth comes from systems people actually use, not slide decks they nod at.</strong> Every page we design, every CRM pipeline we configure, and every playbook we write is built so your team owns and runs it the day it ships.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Our four-phase approach is the same whether you're buying one offer or installing the full growth infrastructure, Discover, Design & Plan, Build & Install, then Run & Optimize. Productized scope, fixed timelines, real outcomes.
                </p>
                <div className="relative">
                  <img
                    src={consultingImg}
                    alt="Performance consulting methodology"
                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] hover:scale-[1.02] transition-transform duration-700"
                    data-testid="img-methodology"
                  />
                  <FloatingShape className="w-20 h-20 -top-4 -right-4 z-[-1]" variant="square" />
                  <FloatingShape className="w-14 h-14 -bottom-3 left-10 z-[-1]" variant="ring" />
                  <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-lg hidden md:block">
                    <p className="text-3xl font-extrabold italic">4 Phases</p>
                    <p className="text-sm opacity-80">Proven methodology</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-b from-[#FAFAFA] to-white relative overflow-hidden" data-testid="section-approach-steps">
          <FloatingShape className="w-20 h-20 top-24 -left-6" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic" data-testid="text-process-title">
                Four Phases to Lasting Impact
              </h2>
            </AnimateOnScroll>

            <div className="space-y-5">
              {steps.map((step, i) => {
                const isExpanded = expandedStep === step.num;
                return (
                  <div key={i} data-testid={`step-${step.num}`}>
                    <div className="bg-white rounded-3xl shadow-md border border-gray-100/80 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col lg:flex-row">
                        <div className="bg-gradient-to-b from-primary to-primary/90 text-white p-8 lg:p-10 flex flex-col items-center justify-center lg:min-w-[200px] relative overflow-hidden">
                          <div className="absolute inset-0 opacity-10">
                            <div className={`absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-br ${step.color}`} />
                          </div>
                          <span className="text-6xl lg:text-7xl font-black opacity-20 italic leading-none relative z-10">{step.num}</span>
                          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm relative z-10">
                            {step.duration}
                          </div>
                        </div>

                        <div className="p-8 lg:p-12 flex-1">
                          <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3 italic" data-testid={`text-step-title-${step.num}`}>
                            {step.title}
                          </h3>
                          <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                            {step.desc}
                          </p>

                          <button
                            onClick={() => setExpandedStep(isExpanded ? null : step.num)}
                            className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors duration-200 mb-2"
                            data-testid={`button-expand-step-${step.num}`}
                          >
                            {isExpanded ? "Show less" : "Learn more about this phase"}
                            <span aria-hidden="true" className={`transition-transform duration-300 inline-block ${isExpanded ? "rotate-180" : ""}`}>&#9662;</span>
                          </button>

                          <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                            <div className="overflow-hidden">
                              <div className="space-y-4 mb-10">
                                {step.details.map((para, j) => (
                                  <p key={j} className="text-muted-foreground leading-relaxed">
                                    {para}
                                  </p>
                                ))}
                              </div>

                              <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                <div className="bg-gradient-to-br from-[#f0f4f8] to-white rounded-3xl p-7 border border-border/30">
                                  <h4 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    Key Activities
                                  </h4>
                                  <ul className="space-y-3">
                                    {step.activities.map((activity, j) => (
                                      <li key={j} className="flex items-start gap-3 text-muted-foreground">
                                        <span aria-hidden="true" className="text-accent flex-shrink-0">·</span>
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-gradient-to-br from-[#f0f4f8] to-white rounded-3xl p-7 border border-border/30">
                                  <h4 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    Expected Outcomes
                                  </h4>
                                  <ul className="space-y-3">
                                    {step.outcomes.map((outcome, j) => (
                                      <li key={j} className="flex items-start gap-3 text-muted-foreground">
                                        <span aria-hidden="true" className="text-accent flex-shrink-0">&rsaquo;</span>
                                        <span>{outcome}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {i < steps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-px h-10 bg-gradient-to-b from-accent/30 to-accent/5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-32 bg-white relative overflow-hidden" data-testid="section-tools-frameworks">
          <GeometricAccent className="top-16 -left-10 text-primary" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-32 right-20" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic mb-6" data-testid="text-tools-title">
                What We Build For You
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Eight building blocks across our six practices. Mix and match into a single offer, or stack them into a full growth-infrastructure bundle.
              </p>
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {toolsAndFrameworks.map((tool, i) => {
                return (
                  <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                    <div
                      className="bg-gradient-to-br from-[#f0f4f8] to-white rounded-3xl border border-gray-100/60 hover:shadow-xl hover:border-accent/20 transition-all duration-300 group hover:-translate-y-1 overflow-hidden h-full"
                      data-testid={`card-tool-${i}`}
                    >
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
                        <img src={tool.image} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-8 pt-5">
                        <h3 className="text-xl font-bold text-primary mb-3">{tool.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{tool.desc}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-b from-[#FAFAFA] to-white" data-testid="section-faq">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic mb-6" data-testid="text-faq-title">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Common questions about our services, scope, pricing, and what it's like to work with Performance Processes.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
                {faqItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white rounded-3xl border border-gray-100/80 px-8 shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:shadow-lg data-[state=open]:border-accent/20"
                    data-testid={`faq-item-${i}`}
                  >
                    <AccordionTrigger className="text-lg font-semibold text-primary hover:text-accent py-7 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-7 text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="relative py-32 overflow-hidden" data-testid="section-cta">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
          <div className="absolute inset-0 opacity-10">
            <img src={processFlowImg} alt="" className="w-full h-full object-cover" />
          </div>
          <FloatingShape className="w-20 h-20 top-16 right-16 opacity-20" variant="ring" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <AnimateOnScroll animation="fade-left" className="order-2 md:order-1">
                <img
                  src={strategyImg}
                  alt="Strategic planning consultation"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] ring-1 ring-white/10 hover:scale-[1.02] transition-transform duration-700"
                  data-testid="img-cta-strategy"
                />
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200} className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white italic mb-8" data-testid="text-cta-title">
                  Ready to install your growth infrastructure?
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  Whether you need a single piece, a new website, a CRM, a marketing engine, or the full system installed end-to-end, we'll scope it clearly, build it cleanly, and train your team to run it.
                </p>
                <p className="text-lg text-white/70 leading-relaxed mb-10">
                  Book a complimentary discovery call to talk through where your business is today and what to install first.
                </p>
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="link-cta-consultation">
                    Book a Consultation
                </a>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
