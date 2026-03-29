import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { useState } from "react";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";
import {
  Search,
  Target,
  Rocket,
  TrendingUp,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Clock,
  ChevronDown,
  ClipboardList,
  Calendar,
} from "lucide-react";
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
      icon: Search,
      title: language === "en" ? "Discovery & Assessment" : "Découverte et évaluation",
      desc: language === "en"
        ? "We start by understanding your unique challenges and auditing your current performance systems to identify gaps."
        : "Nous commençons par comprendre vos défis uniques et par auditer vos systèmes de performance actuels pour identifier les lacunes.",
      duration: "2–4 weeks",
      color: "from-blue-500/15 to-blue-600/5",
      accentColor: "text-blue-600",
      bgAccent: "bg-blue-600",
      borderAccent: "border-blue-500/20",
      details: [
        "Every successful engagement begins with a deep understanding of where your organization stands today. Our Discovery & Assessment phase goes far beyond surface-level analysis, we immerse ourselves in your organizational culture, strategic objectives, operational processes, and leadership dynamics to build a comprehensive picture of your current state.",
        "During this phase, we conduct extensive stakeholder interviews across all levels of the organization, from senior leadership to front-line teams. These conversations reveal not only the formal structures and processes in place but also the informal dynamics, unspoken challenges, and latent opportunities that data alone cannot capture.",
        "We also perform a thorough audit of your existing performance management systems, governance frameworks, and strategic planning processes. This includes reviewing documentation, analyzing performance data, benchmarking against industry standards, and identifying both systemic gaps and quick-win opportunities.",
        "The output of this phase is a detailed Assessment Report that provides a clear, honest picture of your organization's strengths, weaknesses, and priority areas for improvement, serving as the foundation for everything that follows.",
      ],
      activities: [
        "Stakeholder interviews and focus groups",
        "Organizational culture and climate assessment",
        "Performance system and governance audit",
        "Data collection and benchmarking analysis",
        "Gap analysis and opportunity identification",
        "Comprehensive Assessment Report delivery",
      ],
      outcomes: [
        "Clear understanding of organizational strengths and gaps",
        "Prioritized list of improvement opportunities",
        "Stakeholder alignment on current-state challenges",
        "Data-driven foundation for strategic planning",
      ],
    },
    {
      num: "02",
      icon: Target,
      title: language === "en" ? "Strategic Alignment" : "Alignement stratégique",
      desc: language === "en"
        ? "We work with your leadership team to clarify strategic direction and ensure it's communicated effectively throughout the organization."
        : "Nous travaillons avec votre équipe de direction pour clarifier l'orientation stratégique et veiller à ce qu'elle soit communiquée efficacement dans toute l'organisation.",
      duration: "3–6 weeks",
      color: "from-emerald-500/15 to-emerald-600/5",
      accentColor: "text-emerald-600",
      bgAccent: "bg-emerald-600",
      borderAccent: "border-emerald-500/20",
      details: [
        "With a clear picture of your current state, we move into Strategic Alignment, the most critical phase for setting the trajectory of your transformation. This is where vision meets actionable planning, and where leadership teams come together around a unified strategic direction.",
        "We facilitate structured strategic planning workshops with your leadership team, using proven frameworks to clarify your mission, refine your vision, and define measurable strategic objectives. These sessions are designed to surface diverse perspectives, build consensus, and create genuine buy-in from the people who will drive change.",
        "A key part of this phase is developing your Strategic Communication Plan, ensuring that your refined strategic direction doesn't stay confined to the boardroom. We help you cascade strategy throughout the organization so that every team and individual understands how their work connects to broader organizational goals.",
        "We also work with you to design your performance measurement framework during this phase, identifying the Key Performance Indicators (KPIs) that will track progress and ensure accountability at every level of the organization.",
      ],
      activities: [
        "Leadership strategic planning workshops",
        "Mission, vision, and values refinement",
        "Strategic objective setting and prioritization",
        "KPI framework design and alignment",
        "Strategic communication planning",
        "Change readiness assessment",
      ],
      outcomes: [
        "Unified strategic direction with leadership buy-in",
        "Clearly defined and measurable strategic objectives",
        "KPI framework aligned to organizational goals",
        "Communication plan for organization-wide alignment",
      ],
    },
    {
      num: "03",
      icon: Rocket,
      title: language === "en" ? "Implementation & Training" : "Mise en œuvre et formation",
      desc: language === "en"
        ? "Our experts provide hands-on support to implement new systems and strengthen leadership capabilities."
        : "Nos experts fournissent un soutien concret pour mettre en œuvre de nouveaux systèmes et renforcer les capacités de leadership.",
      duration: "4–12 weeks",
      color: "from-amber-500/15 to-amber-600/5",
      accentColor: "text-amber-600",
      bgAccent: "bg-amber-600",
      borderAccent: "border-amber-500/20",
      details: [
        "Implementation is where strategy becomes reality. During this phase, we work shoulder-to-shoulder with your teams to put new systems, processes, and practices into action. Unlike firms that hand over a report and walk away, we stay deeply involved to ensure successful execution.",
        "We begin by developing a detailed Implementation Roadmap with clear milestones, responsibilities, and timelines. This roadmap is designed to be realistic and achievable, balancing the urgency for improvement with the practical realities of organizational capacity and change management.",
        "A major focus of this phase is building internal capability through targeted training and coaching programs. We deliver customized workshops on leadership development, performance management, strategic communication, and other areas identified during the assessment. Our goal is always to build your team's skills so that improvements are sustainable long after our engagement ends.",
        "Throughout implementation, we maintain close communication with your leadership team, providing regular progress updates, flagging risks early, and adapting our approach as needed. This agile, collaborative style ensures that implementation stays on track and delivers the intended results.",
      ],
      activities: [
        "Detailed implementation roadmap development",
        "System and process rollout support",
        "Leadership development workshops and coaching",
        "Performance management training programs",
        "Change management and communication support",
        "Regular progress reviews and course corrections",
      ],
      outcomes: [
        "New systems and processes successfully deployed",
        "Enhanced leadership capabilities across the organization",
        "Internal capacity built for sustainable improvement",
        "Documented progress against implementation milestones",
      ],
    },
    {
      num: "04",
      icon: TrendingUp,
      title: language === "en" ? "Monitoring & Optimization" : "Suivi et optimisation",
      desc: language === "en"
        ? "We establish continuous feedback loops and performance metrics to ensure long-term, sustainable impact."
        : "Nous établissons des boucles de rétroaction continue et des indicateurs de performance pour garantir un impact durable à long terme.",
      duration: "Ongoing",
      color: "from-violet-500/15 to-violet-600/5",
      accentColor: "text-violet-600",
      bgAccent: "bg-violet-600",
      borderAccent: "border-violet-500/20",
      details: [
        "Sustainable performance improvement requires ongoing attention and refinement. Our Monitoring & Optimization phase ensures that the changes implemented in previous phases take root, deliver measurable results, and continue to evolve as your organization grows.",
        "We establish robust performance monitoring systems that give you real-time visibility into how your organization is performing against its strategic objectives. This includes setting up dashboards, reporting cadences, and feedback mechanisms that keep leadership informed and enable data-driven decision-making.",
        "Regular review sessions are a cornerstone of this phase. We work with your team to analyze performance data, celebrate successes, diagnose underperformance, and identify emerging opportunities. These sessions foster a culture of continuous improvement and ensure that strategic plans remain dynamic and responsive to changing conditions.",
        "As your organization matures in its performance practices, we help you move from reactive problem-solving to proactive optimization. This includes advanced techniques like predictive analytics, scenario planning, and capability forecasting, ensuring your organization is always prepared for what's next.",
      ],
      activities: [
        "Performance dashboard setup and configuration",
        "Regular performance review facilitation",
        "Data analysis and trend identification",
        "Process optimization recommendations",
        "Continuous improvement coaching",
        "Long-term strategic refresh sessions",
      ],
      outcomes: [
        "Real-time performance visibility for leadership",
        "Culture of continuous improvement embedded",
        "Measurable ROI on consulting engagement",
        "Organization positioned for sustained growth",
      ],
    },
  ];

  const toolsAndFrameworks = [
    {
      image: balancedScorecardImg,
      title: "Balanced Scorecard",
      desc: "Translate strategy into measurable objectives across financial, customer, process, and learning perspectives for holistic performance tracking.",
    },
    {
      image: swotAnalysisImg,
      title: "SWOT Analysis",
      desc: "Systematically evaluate organizational strengths, weaknesses, opportunities, and threats to inform strategic decision-making.",
    },
    {
      image: kpiFrameworksImg,
      title: "KPI Frameworks",
      desc: "Design and implement Key Performance Indicator systems that align individual and team performance with strategic objectives.",
    },
    {
      image: processMappingImg,
      title: "Process Mapping",
      desc: "Visualize and optimize organizational workflows to eliminate inefficiencies, reduce waste, and improve service delivery.",
    },
    {
      image: stakeholderAnalysisImg,
      title: "Stakeholder Analysis",
      desc: "Identify, prioritize, and engage key stakeholders to build support for change initiatives and ensure inclusive decision-making.",
    },
    {
      image: changeManagementImg,
      title: "Change Management Models",
      desc: "Apply proven change frameworks to guide organizations through transitions, minimize resistance, and accelerate adoption of new practices.",
    },
    {
      image: performanceDashboardsImg,
      title: "Performance Dashboards",
      desc: "Create visual, real-time performance monitoring tools that give leadership instant insight into organizational health and progress.",
    },
    {
      image: leadershipCompetencyImg,
      title: "Leadership Competency Models",
      desc: "Define and develop the leadership capabilities needed to drive organizational performance and build a strong leadership pipeline.",
    },
  ];

  const faqItems = [
    {
      question: "How long does a typical engagement last?",
      answer: "Engagement length varies depending on scope and organizational complexity. A focused project (e.g., strategic planning facilitation) may take 4–8 weeks, while a comprehensive performance transformation can span 6–12 months. During our initial Discovery phase, we'll provide a detailed timeline tailored to your specific needs and objectives.",
    },
    {
      question: "What size of organization do you work with?",
      answer: "We work with organizations of all sizes, from growing startups with 20+ employees to large enterprises and government agencies with thousands of staff. Our methodology is scalable and adaptable, the core principles remain the same, but we customize our approach, tools, and level of engagement to match your organization's size, complexity, and maturity.",
    },
    {
      question: "How do you measure the ROI of your consulting services?",
      answer: "We establish clear, measurable KPIs at the start of every engagement, aligned to your strategic objectives. These may include financial metrics (revenue growth, cost reduction), operational metrics (efficiency gains, cycle time), people metrics (engagement scores, retention rates), and strategic metrics (goal achievement, market position). We track these throughout the engagement and provide a comprehensive impact report at its conclusion.",
    },
    {
      question: "What makes your approach different from other consulting firms?",
      answer: "Three things set us apart: First, we don't just deliver recommendations, we stay to implement them alongside your team. Second, our focus on building internal capability means your organization becomes self-sufficient, not dependent on consultants. Third, our methodology is grounded in real-world experience across multiple sectors, not academic theory alone. We measure our success by your results, not by the volume of our deliverables.",
    },
    {
      question: "Do you offer virtual or remote engagements?",
      answer: "Yes. While we believe in the value of in-person collaboration for key workshops and planning sessions, much of our work can be conducted effectively through virtual channels. We offer fully remote, hybrid, and on-site engagement models. Many clients find that a hybrid approach, with in-person sessions for strategic milestones and virtual check-ins for ongoing support, delivers the best results.",
    },
    {
      question: "What happens after the engagement ends?",
      answer: "Our goal is to leave your organization stronger and more capable than when we started. Before concluding an engagement, we ensure all systems, processes, and training materials are fully documented and handed over. We also offer optional ongoing retainer arrangements for clients who want continued advisory support, quarterly strategy reviews, or access to our team for ad-hoc consulting needs.",
    },
    {
      question: "How involved does our leadership team need to be?",
      answer: "Leadership involvement is critical to the success of any performance improvement initiative. We typically ask for active participation from senior leaders during key workshops, strategic planning sessions, and decision points. Day-to-day involvement can be managed through a designated project sponsor or steering committee. We design our engagement model to respect your leadership team's time while ensuring they remain connected to the process.",
    },
    {
      question: "Can you work alongside our existing consultants or internal teams?",
      answer: "Absolutely. We frequently collaborate with internal strategy teams, HR departments, IT groups, and other consulting firms. Our collaborative approach means we integrate seamlessly with your existing resources, complementing rather than duplicating efforts. We're focused on outcomes, not territory, and we're happy to work in whatever configuration delivers the best results for your organization.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <SEOHead title="Our Approach, Structured Consulting Methodology" description="Discover how Performance Processes delivers results through a structured 4-phase consulting methodology: Discovery, Strategy Design, Implementation, and Performance Review. Built for measurable outcomes." path="/approach" />
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
                  <>A collaborative, <span className="text-accent italic">results-focused</span> approach</>
                ) : (
                  <>Une approche collaborative, <span className="text-accent italic">axée sur les résultats</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                {language === "en"
                  ? "Our methodology is designed to drive sustainable improvements across operations, people management, and organizational performance."
                  : "Notre méthodologie est conçue pour favoriser des améliorations durables dans les opérations, la gestion des personnes et la performance organisationnelle."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="link-hero-book">
                    <Calendar size={18} />
                    {language === "en" ? "Book a Consultation" : "Réservez une consultation"}
                </a>
                <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="link-hero-services">
                    {language === "en" ? "Explore Services" : "Explorer les services"}
                    <ArrowRight size={18} />
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
                  Built on Experience, Driven by Results
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our approach to performance consulting isn't based on textbook theory, it's forged from years of hands-on experience working with organizations across the public, private, and nonprofit sectors. We've seen what works, what doesn't, and what makes the difference between a strategy that sits on a shelf and one that transforms an organization.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At the heart of our methodology is a simple belief: <strong className="text-primary">sustainable improvement comes from building internal capability, not creating dependency on external consultants.</strong> Every tool we introduce, every process we design, and every skill we teach is intended to strengthen your organization's ability to perform at its best, long after our engagement ends.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Our four-phase approach provides a clear, structured path from assessment to optimization, while remaining flexible enough to adapt to the unique needs, pace, and culture of your organization.
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

        <section className="py-32 bg-gradient-to-b from-[#F8FAFC] to-white relative overflow-hidden" data-testid="section-approach-steps">
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
                const Icon = step.icon;
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
                          <Icon className="w-9 h-9 mt-3 text-accent relative z-10" />
                          <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm relative z-10 flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
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
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
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
                                    <ClipboardList className="w-5 h-5 text-accent" />
                                    Key Activities
                                  </h4>
                                  <ul className="space-y-3">
                                    {step.activities.map((activity, j) => (
                                      <li key={j} className="flex items-start gap-3 text-muted-foreground">
                                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-gradient-to-br from-[#f0f4f8] to-white rounded-3xl p-7 border border-border/30">
                                  <h4 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-accent" />
                                    Expected Outcomes
                                  </h4>
                                  <ul className="space-y-3">
                                    {step.outcomes.map((outcome, j) => (
                                      <li key={j} className="flex items-start gap-3 text-muted-foreground">
                                        <ArrowRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
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
                        <div className="flex flex-col items-center text-accent">
                          <div className="w-px h-4 bg-gradient-to-b from-accent/30 to-accent/15" />
                          <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                            <ArrowDown className="w-3.5 h-3.5 text-accent" />
                          </div>
                          <div className="w-px h-4 bg-gradient-to-b from-accent/15 to-accent/5" />
                        </div>
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
                Tools & Frameworks We Use
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We leverage proven methodologies and industry-standard frameworks to deliver consistent, measurable results across every engagement.
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

        <section className="py-32 bg-gradient-to-b from-[#F8FAFC] to-white" data-testid="section-faq">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic mb-6" data-testid="text-faq-title">
                  What to Expect
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Common questions about our engagement process, methodology, and what it's like to work with Performance Processes.
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
                  Ready to Begin Your Transformation?
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  Every high-performing organization started with a single decision, the decision to invest in their people, processes, and performance. Whether you're looking to refine your strategic direction, strengthen your leadership team, or build a culture of accountability and results, we're here to help.
                </p>
                <p className="text-lg text-white/70 leading-relaxed mb-10">
                  Book a complimentary discovery call to discuss your organization's challenges and explore how our methodology can deliver measurable, sustainable results.
                </p>
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="link-cta-consultation">
                    <Calendar size={18} />
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
