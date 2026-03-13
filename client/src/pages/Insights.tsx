import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Filter, Mail, BookOpen, TrendingUp, Users, Shield, Lightbulb, BarChart3, Target, X, Sparkles, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import geoPatternImg from "@assets/generated/geo-pattern.png";
import strategyWhiteboardImg from "@assets/generated/strategy-whiteboard.png";
import analyticsImg from "@assets/stock_images/analytics.jpg";
import leadershipImg from "@assets/stock_images/leadership.jpg";
import strategyImg from "@assets/stock_images/strategy.jpg";
import collaborationImg from "@assets/stock_images/collaboration.jpg";
import growthChartImg from "@assets/stock_images/growth_chart.jpg";
import trainingImg from "@assets/stock_images/training.jpg";

const categories = ["All", "Strategy", "Leadership", "Governance", "Execution", "Digital", "Culture"] as const;

type Category = typeof categories[number];

const insights = [
  {
    id: 0,
    title: "Trust: The new performance metric",
    date: "FEB 2026",
    cat: "Culture",
    excerpt: "In an era of remote work and decentralized teams, trust has emerged as the single most important performance indicator. Organizations that measure and cultivate trust see 2.5x higher engagement scores and significantly reduced turnover rates.",
    body: "Trust is no longer a soft concept reserved for team-building exercises. It has become a measurable, actionable performance metric that directly impacts organizational outcomes.\n\nResearch consistently shows that high-trust organizations outperform their peers across every key metric: productivity, innovation, employee retention, and customer satisfaction. When employees trust their leaders and each other, they collaborate more effectively, take smarter risks, and commit more deeply to shared goals.\n\nSo how do you measure trust? Start with three dimensions: competence trust (do people believe their colleagues can deliver?), integrity trust (do people believe others will act ethically?), and benevolence trust (do people believe others care about their wellbeing?). Each can be assessed through targeted pulse surveys, behavioral observation, and 360-degree feedback.\n\nThe organizations seeing the greatest results are those that treat trust not as a nice-to-have, but as a strategic priority with dedicated resources, clear accountability, and regular measurement cycles.",
    image: analyticsImg,
    featured: true,
  },
  {
    id: 1,
    title: "The 2026 CEO Survey Results",
    date: "JAN 2026",
    cat: "Strategy",
    excerpt: "Our annual survey of 200+ Canadian CEOs reveals shifting priorities: digital transformation leads for the third consecutive year, but talent retention has surged to second place, overtaking cost optimization.",
    body: "The landscape of executive priorities is shifting faster than ever. Our 2026 survey of over 200 Canadian CEOs across sectors reveals that while digital transformation remains the top strategic priority for the third year running, the talent war has fundamentally changed the conversation.\n\nTalent retention has surged to second place, overtaking cost optimization for the first time in our survey's history. CEOs are recognizing that their most valuable asset isn't technology or capital, it's their people. Organizations that fail to invest in employee experience, development, and purpose will find themselves losing ground to competitors who do.\n\nOther notable findings include: 67% of CEOs plan to increase investment in AI and automation, 54% are prioritizing ESG initiatives driven by stakeholder pressure, and 41% are actively exploring new market entry strategies.\n\nThe message is clear: the most successful organizations in 2026 will be those that balance technological advancement with genuine investment in their workforce.",
    image: strategyImg,
  },
  {
    id: 2,
    title: "Scaling leadership in automated environments",
    date: "DEC 2025",
    cat: "Leadership",
    excerpt: "As automation reshapes operational landscapes, leadership must evolve beyond traditional management. This insight explores how successful leaders are adapting their approach to guide hybrid human-AI teams effectively.",
    body: "The rise of automation and AI isn't just changing what work gets done, it's fundamentally changing how leadership works. Leaders who once managed processes now need to manage the intersection of human creativity and machine efficiency.\n\nSuccessful leaders in automated environments share three common traits. First, they focus on uniquely human skills: empathy, creative problem-solving, ethical judgment, and relationship building. Second, they become translators, helping their teams understand how to work alongside automated systems rather than compete with them. Third, they invest heavily in continuous learning, both for themselves and their teams.\n\nThe shift from managing tasks to managing outcomes is perhaps the most significant change. In automated environments, leaders need to define what success looks like and trust that the combination of human judgment and automated execution will get there.\n\nOrganizations that develop these leadership capabilities now will have a significant competitive advantage as automation continues to reshape every industry.",
    image: leadershipImg,
  },
  {
    id: 3,
    title: "Governance as a growth driver",
    date: "NOV 2025",
    cat: "Governance",
    excerpt: "Contrary to the perception that governance slows organizations down, our research shows that well-designed governance frameworks accelerate growth by reducing decision bottlenecks and enabling faster risk-adjusted decisions.",
    body: "Governance has long been viewed as a necessary constraint, something organizations endure rather than embrace. But our research tells a different story. Organizations with robust, well-designed governance frameworks consistently outperform their less-governed peers in both growth rate and sustainability.\n\nThe key distinction is between governance that enables and governance that constrains. Enabling governance creates clear decision rights, transparent escalation paths, and standardized risk assessment processes. It doesn't slow decisions down, it speeds them up by removing ambiguity about who decides what and how.\n\nWe've identified four pillars of growth-enabling governance: clarity of roles and responsibilities, standardized decision-making frameworks, transparent reporting and accountability mechanisms, and adaptive policies that evolve with the organization.\n\nThe organizations seeing the best results are those that view governance not as a compliance exercise, but as a strategic enabler that builds the confidence and clarity needed for bold decision-making.",
  },
  {
    id: 4,
    title: "The impact of process optimization on scale",
    date: "OCT 2025",
    cat: "Execution",
    excerpt: "Process optimization isn't just about efficiency, it's about creating the operational foundation for scalable growth. We examine how organizations use process redesign to achieve significant revenue growth without proportional headcount increases.",
    body: "Every organization that has successfully scaled has one thing in common: they invested in process optimization before they needed it, not after. The most common scaling failure we see is organizations trying to grow on top of broken or informal processes.\n\nProcess optimization for scale requires a different mindset than traditional efficiency improvement. Instead of asking 'how do we do this faster?', the question becomes 'how do we design this so it works at 10x our current volume?'. This shift in thinking leads to fundamentally different design choices.\n\nKey principles include: standardize before you automate, document before you delegate, and measure before you optimize. Each principle builds on the last, creating a systematic approach to building scalable operations.\n\nThe organizations that get this right are able to grow revenue significantly without proportional increases in headcount, operational complexity, or customer service issues.",
    image: growthChartImg,
  },
  {
    id: 5,
    title: "Alignment: The invisible competitive advantage",
    date: "SEP 2025",
    cat: "Strategy",
    excerpt: "Strategic alignment between departments, teams, and individual contributors is the invisible force that separates high-performing organizations from the rest. Learn the five pillars of organizational alignment.",
    body: "Alignment is the invisible force multiplier that separates high-performing organizations from the rest. When every person in an organization understands how their work connects to the broader strategy, the entire system moves faster and more effectively.\n\nWe've identified five pillars of organizational alignment: strategic clarity (does everyone understand where we're going?), role alignment (does everyone understand their contribution?), resource alignment (are resources allocated to match priorities?), process alignment (do workflows support strategic objectives?), and cultural alignment (do behaviors and norms reinforce strategic goals?).\n\nMisalignment at any one of these levels creates friction that compounds over time. Teams work at cross-purposes, resources get wasted on low-priority activities, and cultural norms undermine strategic intent.\n\nThe good news is that alignment is measurable and improvable. Through structured assessment, targeted interventions, and consistent reinforcement, organizations can dramatically improve their alignment scores and, with them, their performance.",
  },
  {
    id: 6,
    title: "Digital transformation beyond technology",
    date: "AUG 2025",
    cat: "Digital",
    excerpt: "Successful digital transformation is 70% people and culture, 30% technology. We outline a human-centered framework for digital change that addresses the real barriers to adoption and sustainable transformation.",
    body: "The majority of digital transformation initiatives fail, and the reason is rarely technology. It's people. Organizations invest heavily in new systems and tools but underinvest in the human dimensions of change: skill development, mindset shifts, cultural adaptation, and leadership modeling.\n\nOur human-centered digital transformation framework addresses this gap by putting people at the center of every technology decision. It starts with understanding: what are the real pain points your people face? How do they actually work today? What are their fears and aspirations about technology?\n\nFrom there, the framework guides organizations through four phases: awareness (why change?), ability (can we change?), adoption (will we change?), and acceleration (how do we sustain change?). Each phase has specific interventions, measurement criteria, and leadership actions.\n\nOrganizations that follow this approach see dramatically higher adoption rates, faster time to value, and more sustainable transformation outcomes.",
    image: collaborationImg,
  },
  {
    id: 7,
    title: "Building resilient organizational culture",
    date: "JUL 2025",
    cat: "Culture",
    excerpt: "Resilient cultures don't happen by accident. They're built through intentional leadership practices, reinforced values, and systems that support psychological safety. Here's how leading organizations are doing it.",
    body: "Organizational resilience starts with culture. The organizations that bounce back fastest from disruption are those with deeply embedded cultural practices that support adaptability, learning, and mutual support.\n\nThree cultural elements consistently predict organizational resilience. First, psychological safety: do people feel safe raising concerns, admitting mistakes, and proposing unconventional ideas? Second, learning orientation: does the organization treat failures as learning opportunities or punish them? Third, connection: do people feel genuinely connected to their colleagues and to the organization's purpose?\n\nBuilding these elements requires sustained, intentional effort from leadership. It means modeling vulnerability, celebrating learning from failure, and creating regular opportunities for meaningful connection.\n\nThe investment pays off not just in crisis resilience, but in everyday performance. Organizations with resilient cultures see higher innovation rates, better employee retention, and stronger customer relationships.",
  },
  {
    id: 8,
    title: "KPI frameworks that actually drive performance",
    date: "JUN 2025",
    cat: "Execution",
    excerpt: "Most KPI systems measure activity, not impact. We present a performance measurement framework that connects individual metrics to strategic outcomes, ensuring every measurement drives meaningful progress.",
    body: "The problem with most KPI systems isn't that they lack metrics, it's that they measure the wrong things. Activity-based metrics (hours worked, tasks completed, meetings held) tell you nothing about whether the organization is actually moving toward its strategic goals.\n\nEffective KPI frameworks start with strategic outcomes and work backwards. What results matter most? What behaviors drive those results? What leading indicators predict those behaviors? This cascading approach ensures that every metric at every level of the organization connects directly to strategic priorities.\n\nWe recommend the 3-3-3 framework: three strategic KPIs that measure organizational health, three operational KPIs per department that measure execution effectiveness, and three individual KPIs per role that measure contribution to departmental goals.\n\nThe key is simplicity and alignment. When people can clearly see how their metrics connect to organizational success, they make better decisions, prioritize more effectively, and engage more deeply with their work.",
    image: trainingImg,
  },
  {
    id: 9,
    title: "The future of nonprofit governance",
    date: "MAY 2025",
    cat: "Governance",
    excerpt: "Nonprofit boards face unique governance challenges in 2025. From increasing regulatory demands to donor expectations for transparency, we explore how forward-thinking nonprofits are modernizing their governance practices.",
    body: "Nonprofit governance is at a crossroads. Boards are facing unprecedented demands for transparency, accountability, and strategic impact, while often operating with limited resources and volunteer leadership.\n\nThe most effective nonprofit boards we work with share several characteristics. They focus on strategy rather than operations, they maintain clear boundaries between board and management roles, they invest in board education and development, and they use data to inform their oversight.\n\nEmerging best practices include: implementing term limits and rotation to ensure fresh perspectives, establishing standing committees for key areas (finance, governance, programs), conducting annual board self-assessments, and creating structured onboarding programs for new directors.\n\nThe nonprofits that modernize their governance now will be better positioned to attract funding, retain talent, and deliver impact in an increasingly competitive and scrutinized sector.",
  },
  {
    id: 10,
    title: "Leading through uncertainty: A strategic playbook",
    date: "APR 2025",
    cat: "Leadership",
    excerpt: "Uncertainty is the new normal for organizational leaders. This playbook offers practical strategies for making decisive moves when the path forward isn't clear.",
    body: "Leaders today face a paradox: they're expected to provide certainty and direction in an environment that offers neither. The most effective leaders we work with have embraced a different approach, one that acknowledges uncertainty while still enabling decisive action.\n\nThe playbook starts with reframing uncertainty as information. What don't we know? What can we learn quickly? What decisions can we make now, and which should we defer? This triage approach prevents analysis paralysis while avoiding premature commitment.\n\nThree practical strategies stand out. First, scenario planning: develop two to three plausible futures and prepare responses for each. Second, decision sprints: make smaller, faster decisions rather than waiting for perfect information. Third, reversibility assessment: categorize decisions by how easily they can be reversed, and move quickly on reversible ones.\n\nThe goal isn't to eliminate uncertainty, it's to build the organizational muscle to act effectively despite it.",
  },
  {
    id: 11,
    title: "Data-driven decision making for mid-market firms",
    date: "MAR 2025",
    cat: "Digital",
    excerpt: "Mid-market organizations often lack the data infrastructure of large enterprises. We outline an affordable, phased approach to building data capabilities that deliver actionable insights without massive upfront investment.",
    body: "Mid-market firms face a unique challenge: they need data-driven insights to compete, but they lack the budgets and technical teams of larger enterprises. The good news is that effective data capability doesn't require enterprise-scale investment.\n\nOur phased approach starts with what you already have. Most organizations are sitting on valuable data in their CRM, financial systems, HR platforms, and customer service tools. The first step is connecting and cleaning this data, not buying new systems.\n\nPhase two focuses on building basic analytics capability: dashboards, trend analysis, and key metric tracking. Phase three introduces predictive analytics and more sophisticated analysis. Each phase builds on the last and delivers value independently.\n\nThe most important investment isn't technology, it's culture. Building a data-driven culture means teaching leaders to ask better questions, creating habits around data review, and rewarding evidence-based decision making over gut instinct.",
  },
  {
    id: 12,
    title: "Change management: Why 70% of initiatives fail",
    date: "FEB 2025",
    cat: "Strategy",
    excerpt: "The statistics on change management failure haven't improved in decades. We analyze the root causes and present a revised approach that addresses the human dimensions most change programs overlook.",
    body: "The 70% failure rate for change initiatives has remained stubbornly consistent for decades, despite enormous advances in change management methodology. Why? Because most change programs still treat change as a project rather than a journey.\n\nOur analysis of failed change initiatives reveals three consistent root causes. First, insufficient leadership commitment beyond the initial announcement. Second, failure to address the emotional and psychological dimensions of change. Third, premature declaration of victory before new behaviors are truly embedded.\n\nA revised approach addresses each of these. Leadership commitment must be visible, consistent, and sustained for the full duration of the change. Emotional support, including acknowledging loss, providing forums for concerns, and celebrating small wins, must be built into the change plan. And success criteria must focus on behavior change, not just system implementation.\n\nThe organizations that beat the 70% odds are those that treat change as fundamentally human, not fundamentally technical.",
  },
  {
    id: 13,
    title: "Team performance optimization in hybrid workplaces",
    date: "JAN 2025",
    cat: "Culture",
    excerpt: "Hybrid work is here to stay, but most organizations are still managing hybrid teams with pre-pandemic playbooks. Discover the five shifts high-performing hybrid teams have made to maintain collaboration and output.",
    body: "The hybrid work experiment is over, hybrid is now the norm. But most organizations are still struggling to make it work effectively. The teams that have cracked the code share five common shifts in how they operate.\n\nFirst, they've shifted from time-based to outcome-based management. Instead of tracking hours, they track deliverables. Second, they've invested in asynchronous communication, reducing meeting burden while improving information flow. Third, they've created intentional in-person moments for the activities that genuinely benefit from face-to-face interaction.\n\nFourth, they've redesigned their team rhythms to accommodate different work styles and time zones. And fifth, they've invested in digital collaboration tools and, critically, trained their teams to use them effectively.\n\nThe common thread is intentionality. High-performing hybrid teams don't let their work patterns happen by accident. They deliberately design how, when, and where work happens to optimize for both productivity and wellbeing.",
  },
  {
    id: 14,
    title: "Strategic planning in volatile markets",
    date: "DEC 2024",
    cat: "Strategy",
    excerpt: "Traditional 5-year strategic plans are obsolete in today's volatile markets. We introduce an adaptive strategic planning model that balances long-term vision with the agility to respond to rapid market shifts.",
    body: "The traditional 5-year strategic plan is a relic of a more predictable era. In today's volatile markets, organizations need strategic planning approaches that balance long-term direction with short-term adaptability.\n\nOur adaptive strategic planning model operates on three horizons. Horizon 1 (12 months) focuses on execution: concrete initiatives, clear metrics, and accountable owners. Horizon 2 (1-3 years) focuses on positioning: building capabilities, entering markets, and developing partnerships. Horizon 3 (3-5 years) focuses on vision: the aspirational future state that guides all shorter-term decisions.\n\nThe model includes quarterly strategy reviews where Horizon 1 plans are refreshed based on new information, Horizon 2 bets are evaluated and adjusted, and Horizon 3 assumptions are stress-tested against emerging trends.\n\nThis approach gives organizations the stability of strategic direction while maintaining the flexibility to pivot when circumstances change. It's not about planning less, it's about planning smarter.",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Strategy: <Target size={14} />,
  Leadership: <Users size={14} />,
  Governance: <Shield size={14} />,
  Execution: <BarChart3 size={14} />,
  Digital: <Lightbulb size={14} />,
  Culture: <TrendingUp size={14} />,
};

const categoryGradients: Record<string, string> = {
  Strategy: "from-blue-600/20 via-blue-500/10 to-indigo-600/15",
  Leadership: "from-amber-500/20 via-orange-400/10 to-amber-600/15",
  Governance: "from-emerald-600/20 via-teal-500/10 to-emerald-600/15",
  Execution: "from-violet-600/20 via-purple-500/10 to-violet-600/15",
  Digital: "from-cyan-500/20 via-sky-400/10 to-cyan-600/15",
  Culture: "from-rose-500/20 via-pink-400/10 to-rose-600/15",
};

const categoryLargeIcons: Record<string, React.ReactNode> = {
  Strategy: <Target size={40} />,
  Leadership: <Users size={40} />,
  Governance: <Shield size={40} />,
  Execution: <BarChart3 size={40} />,
  Digital: <Lightbulb size={40} />,
  Culture: <TrendingUp size={40} />,
};

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [email, setEmail] = useState("");
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (emailAddr: string) => {
      const res = await apiRequest("POST", "/api/subscribe", { email: emailAddr, source: "insights-page" });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "You're subscribed!", description: "Check your inbox for a welcome email with leadership insights." });
      setEmail("");
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    },
  });

  const featuredInsight = insights[0];
  const filteredInsights = activeCategory === "All"
    ? insights.slice(1)
    : insights.filter(i => i.cat === activeCategory);

  const openInsight = selectedInsight !== null ? insights.find(i => i.id === selectedInsight) ?? null : null;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img src={geoPatternImg} alt="" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/5 h-full hidden lg:block z-[1]">
            <img src={strategyWhiteboardImg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-accent mb-6" data-testid="text-insights-label">
                Research & Perspectives
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08]" data-testid="text-insights-title">
                Latest <span className="text-accent">Insights</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl" data-testid="text-insights-subtitle">
                Perspectives, research, and practical frameworks from our consulting practice to help your organization perform at its best.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-b from-slate-50 to-white" data-testid="section-featured-insight">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative overflow-hidden rounded-3xl aspect-[16/10] shadow-2xl group">
                <img
                  src={featuredInsight.image}
                  alt={featuredInsight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  data-testid="img-featured-insight"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-5 left-5 bg-accent text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg shadow-accent/30 flex items-center gap-2">
                  <Sparkles size={12} />
                  Featured
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-accent/5 text-[10px] font-black uppercase tracking-[0.3em] text-accent border border-accent/10" data-testid="text-featured-cat">
                    {categoryIcons[featuredInsight.cat]}
                    {featuredInsight.cat}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{featuredInsight.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary leading-tight mb-6" data-testid="text-featured-title">
                  {featuredInsight.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-10" data-testid="text-featured-excerpt">
                  {featuredInsight.excerpt}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedInsight(featuredInsight.id)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                  data-testid="button-read-featured"
                >
                  <BookOpen size={16} />
                  <span>Read Full Insight</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 border-y border-border/40 sticky top-20 bg-white/95 backdrop-blur-md z-10 shadow-sm" data-testid="section-category-filters">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mr-1">
                <Filter size={14} className="text-accent" />
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 hover:from-accent/10 hover:to-accent/5 hover:text-accent border border-transparent hover:border-accent/20"
                  }`}
                  data-testid={`button-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-b from-slate-50/50 to-white" data-testid="section-insights-grid">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredInsights.map((insight, i) => {
                return (
                  <button
                    type="button"
                    key={insight.id}
                    onClick={() => setSelectedInsight(insight.id)}
                    className="bg-white rounded-3xl border border-border/40 group cursor-pointer hover:shadow-2xl hover:border-accent/20 transition-all duration-500 flex flex-col text-left overflow-hidden hover:-translate-y-1"
                    data-testid={`card-insight-${i}`}
                  >
                    {insight.image ? (
                      <div className="overflow-hidden aspect-[16/9]">
                        <img
                          src={insight.image}
                          alt={insight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          data-testid={`img-insight-${i}`}
                        />
                      </div>
                    ) : (
                      <div className={`aspect-[16/9] bg-gradient-to-br ${categoryGradients[insight.cat] || "from-primary/5 via-accent/5 to-primary/10"} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
                        <div className="w-20 h-20 rounded-3xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/40 group-hover:scale-110 transition-transform duration-500">
                          <span className="text-primary/60 group-hover:text-accent transition-colors duration-300">
                            {categoryLargeIcons[insight.cat] || <BookOpen size={40} className="text-accent" />}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-5">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-accent/10 to-accent/5 text-[10px] font-black uppercase tracking-[0.2em] text-accent border border-accent/10">
                          {categoryIcons[insight.cat]}
                          {insight.cat}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{insight.date}</span>
                      </div>
                      <h2 className="text-lg md:text-xl font-heading font-extrabold text-primary leading-tight group-hover:text-accent transition-colors duration-300 mb-4">
                        {insight.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3" data-testid={`text-excerpt-${i}`}>
                        {insight.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest mt-6 pt-6 border-t border-border/30 text-primary group-hover:text-accent transition-colors duration-300">
                        <span>Read More</span>
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {filteredInsights.length === 0 && (
          <section className="py-32 text-center bg-gradient-to-b from-slate-50/50 to-white" data-testid="section-no-results">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-lg">No insights found in the <span className="font-bold text-primary">{activeCategory}</span> category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold text-sm uppercase tracking-wider rounded-full hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20"
              data-testid="button-clear-filter"
            >
              View All Insights
            </button>
          </section>
        )}

        <section className="relative py-32 overflow-hidden" data-testid="section-subscribe">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#0f2a4a] to-primary/90" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10">
              <Mail size={32} className="text-accent" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6" data-testid="text-subscribe-title">
              Subscribe to Our <span className="text-accent">Insights</span>
            </h2>
            <p className="text-white/60 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
              Get our latest research, frameworks, and strategic perspectives delivered directly to your inbox. No spam, just actionable insights for organizational leaders.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                subscribeMutation.mutate(email);
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 backdrop-blur-sm"
                required
                data-testid="input-subscribe-email"
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="px-10 py-4 bg-accent text-white font-bold uppercase tracking-wider text-sm rounded-full hover:bg-white hover:text-primary transition-all duration-300 whitespace-nowrap shadow-xl shadow-accent/30 hover:scale-105 disabled:opacity-60"
                data-testid="button-subscribe"
              >
                {subscribeMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Subscribe"}
              </button>
            </form>
            <p className="text-white/30 text-xs mt-8 uppercase tracking-wider">Monthly digest · Unsubscribe anytime</p>
          </div>
        </section>
      </main>
      <Footer />

      {openInsight && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4 md:p-8" onClick={() => setSelectedInsight(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-8 md:my-16 relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedInsight(null)}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/90 border border-border/50 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-lg"
              data-testid="button-close-insight"
            >
              <X size={20} />
            </button>

            {openInsight.image ? (
              <div className="w-full aspect-[16/8] overflow-hidden">
                <img src={openInsight.image} alt={openInsight.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-full aspect-[16/6] bg-gradient-to-br ${categoryGradients[openInsight.cat] || "from-primary/5 via-accent/5 to-primary/10"} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
                <div className="w-24 h-24 rounded-3xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/40">
                  <span className="text-primary/50">
                    {categoryLargeIcons[openInsight.cat] || <BookOpen size={40} className="text-accent" />}
                  </span>
                </div>
              </div>
            )}

            <div className="p-8 md:p-14">
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-[10px] font-black uppercase tracking-[0.2em] border border-accent/10">
                  {categoryIcons[openInsight.cat]}
                  {openInsight.cat}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{openInsight.date}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-primary leading-tight mb-10">
                {openInsight.title}
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-[1.85]">
                {openInsight.body.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 text-base md:text-lg">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
