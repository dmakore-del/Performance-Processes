import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Filter, Mail, BookOpen, TrendingUp, Users, Shield, Lightbulb, BarChart3, Target, X } from "lucide-react";
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

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [email, setEmail] = useState("");
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);

  const featuredInsight = insights[0];
  const filteredInsights = activeCategory === "All"
    ? insights.slice(1)
    : insights.filter(i => i.cat === activeCategory);

  const openInsight = selectedInsight !== null ? insights.find(i => i.id === selectedInsight) ?? null : null;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 border-b">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-5xl md:text-7xl font-heading font-black uppercase italic leading-none mb-6" data-testid="text-insights-title">
              Latest <br />
              <span className="text-accent">Insights.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl" data-testid="text-insights-subtitle">
              Perspectives, research, and practical frameworks from our consulting practice to help your organization perform at its best.
            </p>
          </div>
        </section>

        <section className="py-16 border-b bg-gray-50" data-testid="section-featured-insight">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
                <img
                  src={featuredInsight.image}
                  alt={featuredInsight.title}
                  className="w-full h-full object-cover"
                  data-testid="img-featured-insight"
                />
                <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded">
                  Featured
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent" data-testid="text-featured-cat">{featuredInsight.cat}</span>
                  <span className="text-[10px] font-bold text-gray-400">{featuredInsight.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold uppercase italic leading-tight mb-6" data-testid="text-featured-title">
                  {featuredInsight.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8" data-testid="text-featured-excerpt">
                  {featuredInsight.excerpt}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedInsight(featuredInsight.id)}
                  className="flex items-center gap-4 text-xs font-black uppercase tracking-widest cursor-pointer hover:text-accent transition-colors group"
                  data-testid="button-read-featured"
                >
                  <BookOpen size={16} />
                  <span>Read Full Insight</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 border-b sticky top-20 bg-white z-10" data-testid="section-category-filters">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 flex-wrap">
              <Filter size={16} className="text-gray-400 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  data-testid={`button-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12" data-testid="section-insights-grid">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredInsights.map((insight, i) => {
                return (
                  <button
                    type="button"
                    key={insight.id}
                    onClick={() => setSelectedInsight(insight.id)}
                    className="bg-[#F8FAFC] rounded-2xl border border-border p-8 md:p-10 group cursor-pointer hover:shadow-xl hover:border-accent/30 transition-all duration-300 flex flex-col text-left"
                    data-testid={`card-insight-${i}`}
                  >
                    {insight.image && (
                      <div className="mb-6 overflow-hidden rounded-lg aspect-[16/9]">
                        <img
                          src={insight.image}
                          alt={insight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          data-testid={`img-insight-${i}`}
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                        {categoryIcons[insight.cat]}
                        {insight.cat}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground">{insight.date}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-heading font-extrabold text-primary leading-tight group-hover:text-accent transition-colors mb-4">
                      {insight.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow" data-testid={`text-excerpt-${i}`}>
                      {insight.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest mt-6 text-primary group-hover:text-accent transition-colors">
                      <span>Read Full Insight</span>
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {filteredInsights.length === 0 && (
          <section className="py-24 text-center" data-testid="section-no-results">
            <p className="text-gray-400 text-lg">No insights found in the <span className="font-bold">{activeCategory}</span> category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-accent font-bold text-sm uppercase tracking-wider hover:underline"
              data-testid="button-clear-filter"
            >
              View All Insights
            </button>
          </section>
        )}

        <section className="py-24 bg-primary text-white" data-testid="section-subscribe">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <Mail size={40} className="mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold uppercase italic mb-4" data-testid="text-subscribe-title">
              Subscribe to Our Insights
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Get our latest research, frameworks, and strategic perspectives delivered directly to your inbox. No spam, just actionable insights for organizational leaders.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                required
                data-testid="input-subscribe-email"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-accent text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-accent/90 transition-colors whitespace-nowrap"
                data-testid="button-subscribe"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white/30 text-xs mt-4">Monthly digest. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>
      <Footer />

      {openInsight && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 md:p-8" onClick={() => setSelectedInsight(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 md:my-16 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedInsight(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
              data-testid="button-close-insight"
            >
              <X size={20} />
            </button>

            {openInsight.image && (
              <div className="w-full aspect-[16/8] overflow-hidden rounded-t-2xl">
                <img src={openInsight.image} alt={openInsight.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                  {categoryIcons[openInsight.cat]}
                  {openInsight.cat}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">{openInsight.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary leading-tight mb-6">
                {openInsight.title}
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {openInsight.body.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
