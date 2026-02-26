import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/hooks/use-language";
import { PageHero } from "@/components/layout/PageHero";
import { Link } from "wouter";
import {
  Search,
  Target,
  Rocket,
  TrendingUp,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Clock,
  BarChart3,
  GitBranch,
  Users,
  Layers,
  Scale,
  Compass,
  Network,
  RefreshCw,
  ChevronRight,
  FileSearch,
  Lightbulb,
  Settings,
  BookOpen,
  ClipboardList,
  PieChart,
  Workflow,
  UserCheck,
  Repeat,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import consultingImg from "@assets/stock_images/consulting.jpg";
import strategyImg from "@assets/stock_images/strategy.jpg";

export default function Approach() {
  const { language } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: Search,
      title: language === "en" ? "Discovery & Assessment" : "Découverte et évaluation",
      desc: language === "en"
        ? "We start by understanding your unique challenges and auditing your current performance systems to identify gaps."
        : "Nous commençons par comprendre vos défis uniques et par auditer vos systèmes de performance actuels pour identifier les lacunes.",
      duration: "2–4 weeks",
      details: [
        "Every successful engagement begins with a deep understanding of where your organization stands today. Our Discovery & Assessment phase goes far beyond surface-level analysis — we immerse ourselves in your organizational culture, strategic objectives, operational processes, and leadership dynamics to build a comprehensive picture of your current state.",
        "During this phase, we conduct extensive stakeholder interviews across all levels of the organization, from senior leadership to front-line teams. These conversations reveal not only the formal structures and processes in place but also the informal dynamics, unspoken challenges, and latent opportunities that data alone cannot capture.",
        "We also perform a thorough audit of your existing performance management systems, governance frameworks, and strategic planning processes. This includes reviewing documentation, analyzing performance data, benchmarking against industry standards, and identifying both systemic gaps and quick-win opportunities.",
        "The output of this phase is a detailed Assessment Report that provides a clear, honest picture of your organization's strengths, weaknesses, and priority areas for improvement — serving as the foundation for everything that follows.",
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
      details: [
        "With a clear picture of your current state, we move into Strategic Alignment — the most critical phase for setting the trajectory of your transformation. This is where vision meets actionable planning, and where leadership teams come together around a unified strategic direction.",
        "We facilitate structured strategic planning workshops with your leadership team, using proven frameworks to clarify your mission, refine your vision, and define measurable strategic objectives. These sessions are designed to surface diverse perspectives, build consensus, and create genuine buy-in from the people who will drive change.",
        "A key part of this phase is developing your Strategic Communication Plan — ensuring that your refined strategic direction doesn't stay confined to the boardroom. We help you cascade strategy throughout the organization so that every team and individual understands how their work connects to broader organizational goals.",
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
      details: [
        "Sustainable performance improvement requires ongoing attention and refinement. Our Monitoring & Optimization phase ensures that the changes implemented in previous phases take root, deliver measurable results, and continue to evolve as your organization grows.",
        "We establish robust performance monitoring systems that give you real-time visibility into how your organization is performing against its strategic objectives. This includes setting up dashboards, reporting cadences, and feedback mechanisms that keep leadership informed and enable data-driven decision-making.",
        "Regular review sessions are a cornerstone of this phase. We work with your team to analyze performance data, celebrate successes, diagnose underperformance, and identify emerging opportunities. These sessions foster a culture of continuous improvement and ensure that strategic plans remain dynamic and responsive to changing conditions.",
        "As your organization matures in its performance practices, we help you move from reactive problem-solving to proactive optimization. This includes advanced techniques like predictive analytics, scenario planning, and capability forecasting — ensuring your organization is always prepared for what's next.",
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
      icon: Scale,
      title: "Balanced Scorecard",
      desc: "Translate strategy into measurable objectives across financial, customer, process, and learning perspectives for holistic performance tracking.",
    },
    {
      icon: Compass,
      title: "SWOT Analysis",
      desc: "Systematically evaluate organizational strengths, weaknesses, opportunities, and threats to inform strategic decision-making.",
    },
    {
      icon: BarChart3,
      title: "KPI Frameworks",
      desc: "Design and implement Key Performance Indicator systems that align individual and team performance with strategic objectives.",
    },
    {
      icon: Workflow,
      title: "Process Mapping",
      desc: "Visualize and optimize organizational workflows to eliminate inefficiencies, reduce waste, and improve service delivery.",
    },
    {
      icon: Network,
      title: "Stakeholder Analysis",
      desc: "Identify, prioritize, and engage key stakeholders to build support for change initiatives and ensure inclusive decision-making.",
    },
    {
      icon: RefreshCw,
      title: "Change Management Models",
      desc: "Apply proven change frameworks to guide organizations through transitions, minimize resistance, and accelerate adoption of new practices.",
    },
    {
      icon: PieChart,
      title: "Performance Dashboards",
      desc: "Create visual, real-time performance monitoring tools that give leadership instant insight into organizational health and progress.",
    },
    {
      icon: UserCheck,
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
      answer: "We work with organizations of all sizes, from growing startups with 20+ employees to large enterprises and government agencies with thousands of staff. Our methodology is scalable and adaptable — the core principles remain the same, but we customize our approach, tools, and level of engagement to match your organization's size, complexity, and maturity.",
    },
    {
      question: "How do you measure the ROI of your consulting services?",
      answer: "We establish clear, measurable KPIs at the start of every engagement, aligned to your strategic objectives. These may include financial metrics (revenue growth, cost reduction), operational metrics (efficiency gains, cycle time), people metrics (engagement scores, retention rates), and strategic metrics (goal achievement, market position). We track these throughout the engagement and provide a comprehensive impact report at its conclusion.",
    },
    {
      question: "What makes your approach different from other consulting firms?",
      answer: "Three things set us apart: First, we don't just deliver recommendations — we stay to implement them alongside your team. Second, our focus on building internal capability means your organization becomes self-sufficient, not dependent on consultants. Third, our methodology is grounded in real-world experience across multiple sectors, not academic theory alone. We measure our success by your results, not by the volume of our deliverables.",
    },
    {
      question: "Do you offer virtual or remote engagements?",
      answer: "Yes. While we believe in the value of in-person collaboration for key workshops and planning sessions, much of our work can be conducted effectively through virtual channels. We offer fully remote, hybrid, and on-site engagement models. Many clients find that a hybrid approach — with in-person sessions for strategic milestones and virtual check-ins for ongoing support — delivers the best results.",
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
      <Navbar />
      <main className="flex-grow">
        <PageHero
          title={<>{language === "en" ? "A collaborative," : "Une approche collaborative,"} <span className="text-accent italic">{language === "en" ? "results-focused" : "axée sur les résultats"}</span> {language === "en" ? "approach" : ""}</>}
          subtitle={language === "en"
            ? "Our methodology is designed to ensure sustainable performance improvements and maximum ROI."
            : "Notre méthodologie est conçue pour garantir des améliorations de performance durables et un ROI maximal."}
        />

        {/* Our Methodology Intro Section */}
        <section className="py-24 bg-white" data-testid="section-methodology-intro">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-accent font-semibold uppercase tracking-wider mb-4" data-testid="text-methodology-label">Our Methodology</p>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6 italic" data-testid="text-methodology-title">
                  Built on Experience, Driven by Results
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our approach to performance consulting isn't based on textbook theory — it's forged from years of hands-on experience working with organizations across the public, private, and nonprofit sectors. We've seen what works, what doesn't, and what makes the difference between a strategy that sits on a shelf and one that transforms an organization.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At the heart of our methodology is a simple belief: <strong className="text-primary">sustainable improvement comes from building internal capability, not creating dependency on external consultants.</strong> Every tool we introduce, every process we design, and every skill we teach is intended to strengthen your organization's ability to perform at its best — long after our engagement ends.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our four-phase approach provides a clear, structured path from assessment to optimization, while remaining flexible enough to adapt to the unique needs, pace, and culture of your organization.
                </p>
              </div>
              <div className="relative">
                <img
                  src={consultingImg}
                  alt="Performance consulting methodology"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                  data-testid="img-methodology"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-lg hidden md:block">
                  <p className="text-3xl font-extrabold italic">4 Phases</p>
                  <p className="text-sm opacity-80">Proven methodology</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expanded Steps Section */}
        <section className="py-24" data-testid="section-approach-steps">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-20">
              <p className="text-accent font-semibold uppercase tracking-wider mb-4">Our Process</p>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic" data-testid="text-process-title">
                Four Phases to Lasting Impact
              </h2>
            </div>

            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} data-testid={`step-${step.num}`}>
                    {/* Step Header */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        {/* Left: Number and Icon */}
                        <div className="bg-primary text-white p-8 lg:p-12 flex flex-col items-center justify-center lg:min-w-[200px]">
                          <span className="text-6xl lg:text-7xl font-black opacity-30 italic leading-none">{step.num}</span>
                          <Icon className="w-10 h-10 mt-4 text-accent" />
                          <div className="mt-4 bg-white/10 rounded-full px-4 py-1 text-sm">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {step.duration}
                          </div>
                        </div>

                        {/* Right: Content */}
                        <div className="p-8 lg:p-12 flex-1">
                          <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4 italic" data-testid={`text-step-title-${step.num}`}>
                            {step.title}
                          </h3>
                          <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                            {step.desc}
                          </p>

                          {/* Detailed paragraphs */}
                          <div className="space-y-4 mb-8">
                            {step.details.map((para, j) => (
                              <p key={j} className="text-muted-foreground leading-relaxed">
                                {para}
                              </p>
                            ))}
                          </div>

                          {/* Activities and Outcomes Grid */}
                          <div className="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-100">
                            <div>
                              <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
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
                            <div>
                              <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
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

                    {/* Connecting Arrow */}
                    {i < steps.length - 1 && (
                      <div className="flex justify-center py-4">
                        <div className="flex flex-col items-center text-accent">
                          <div className="w-0.5 h-8 bg-accent/30" />
                          <ArrowDown className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tools & Frameworks Section */}
        <section className="py-24 bg-white" data-testid="section-tools-frameworks">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <p className="text-accent font-semibold uppercase tracking-wider mb-4">Our Toolkit</p>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic mb-6" data-testid="text-tools-title">
                Tools & Frameworks We Use
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We leverage proven methodologies and industry-standard frameworks to deliver consistent, measurable results across every engagement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {toolsAndFrameworks.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={i}
                    className="bg-[#F8FAFC] rounded-xl p-8 border border-gray-100 hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
                    data-testid={`card-tool-${i}`}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{tool.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{tool.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What to Expect FAQ Section */}
        <section className="py-24" data-testid="section-faq">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-accent font-semibold uppercase tracking-wider mb-4">FAQ</p>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic mb-6" data-testid="text-faq-title">
                  What to Expect
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Common questions about our engagement process, methodology, and what it's like to work with Performance Processes.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
                {faqItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white rounded-xl border border-gray-100 px-6 shadow-sm"
                    data-testid={`faq-item-${i}`}
                  >
                    <AccordionTrigger className="text-lg font-semibold text-primary hover:text-accent py-6 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 md:order-1">
                <img
                  src={strategyImg}
                  alt="Strategic planning consultation"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                  data-testid="img-cta-strategy"
                />
              </div>
              <div className="order-1 md:order-2">
                <p className="text-accent font-semibold uppercase tracking-wider mb-4">Get Started</p>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary italic mb-6" data-testid="text-cta-title">
                  Ready to Begin Your Transformation?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Every high-performing organization started with a single decision — the decision to invest in their people, processes, and performance. Whether you're looking to refine your strategic direction, strengthen your leadership team, or build a culture of accountability and results, we're here to help.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Book a complimentary discovery call to discuss your organization's challenges and explore how our methodology can deliver measurable, sustainable results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <div
                      className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors cursor-pointer"
                      data-testid="button-cta-consultation"
                    >
                      Book a Consultation
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </Link>
                  <Link href="/services">
                    <div
                      className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors cursor-pointer"
                      data-testid="button-cta-services"
                    >
                      View Our Services
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}