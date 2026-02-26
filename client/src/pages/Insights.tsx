import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Filter, Mail, BookOpen, TrendingUp, Users, Shield, Lightbulb, BarChart3, Target } from "lucide-react";
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
    title: "Trust: The new performance metric",
    date: "FEB 2026",
    cat: "Culture",
    excerpt: "In an era of remote work and decentralized teams, trust has emerged as the single most important performance indicator. Organizations that measure and cultivate trust see 2.5x higher engagement scores and significantly reduced turnover rates.",
    image: analyticsImg,
    featured: true,
  },
  {
    title: "The 2026 CEO Survey Results",
    date: "JAN 2026",
    cat: "Strategy",
    excerpt: "Our annual survey of 200+ Canadian CEOs reveals shifting priorities: digital transformation leads for the third consecutive year, but talent retention has surged to second place, overtaking cost optimization.",
    image: strategyImg,
  },
  {
    title: "Scaling leadership in automated environments",
    date: "DEC 2025",
    cat: "Leadership",
    excerpt: "As automation reshapes operational landscapes, leadership must evolve beyond traditional management. This insight explores how successful leaders are adapting their approach to guide hybrid human-AI teams effectively.",
    image: leadershipImg,
  },
  {
    title: "Governance as a growth driver",
    date: "NOV 2025",
    cat: "Governance",
    excerpt: "Contrary to the perception that governance slows organizations down, our research shows that well-designed governance frameworks accelerate growth by reducing decision bottlenecks and enabling faster risk-adjusted decisions.",
  },
  {
    title: "The impact of process optimization on scale",
    date: "OCT 2025",
    cat: "Execution",
    excerpt: "Process optimization isn't just about efficiency—it's about creating the operational foundation for scalable growth. We examine how three organizations used process redesign to achieve 3x revenue growth without proportional headcount increases.",
    image: growthChartImg,
  },
  {
    title: "Alignment: The invisible competitive advantage",
    date: "SEP 2025",
    cat: "Strategy",
    excerpt: "Strategic alignment between departments, teams, and individual contributors is the invisible force that separates high-performing organizations from the rest. Learn the five pillars of organizational alignment.",
  },
  {
    title: "Digital transformation beyond technology",
    date: "AUG 2025",
    cat: "Digital",
    excerpt: "Successful digital transformation is 70% people and culture, 30% technology. We outline a human-centered framework for digital change that addresses the real barriers to adoption and sustainable transformation.",
    image: collaborationImg,
  },
  {
    title: "Building resilient organizational culture",
    date: "JUL 2025",
    cat: "Culture",
    excerpt: "Resilient cultures don't happen by accident. They're built through intentional leadership practices, reinforced values, and systems that support psychological safety. Here's how leading organizations are doing it.",
  },
  {
    title: "KPI frameworks that actually drive performance",
    date: "JUN 2025",
    cat: "Execution",
    excerpt: "Most KPI systems measure activity, not impact. We present a performance measurement framework that connects individual metrics to strategic outcomes, ensuring every measurement drives meaningful progress.",
    image: trainingImg,
  },
  {
    title: "The future of nonprofit governance",
    date: "MAY 2025",
    cat: "Governance",
    excerpt: "Nonprofit boards face unique governance challenges in 2025. From increasing regulatory demands to donor expectations for transparency, we explore how forward-thinking nonprofits are modernizing their governance practices.",
  },
  {
    title: "Leading through uncertainty: A strategic playbook",
    date: "APR 2025",
    cat: "Leadership",
    excerpt: "Uncertainty is the new normal for organizational leaders. This playbook offers practical strategies for making decisive moves when the path forward isn't clear, drawn from interviews with 50+ senior executives.",
  },
  {
    title: "Data-driven decision making for mid-market firms",
    date: "MAR 2025",
    cat: "Digital",
    excerpt: "Mid-market organizations often lack the data infrastructure of large enterprises. We outline an affordable, phased approach to building data capabilities that deliver actionable insights without massive upfront investment.",
  },
  {
    title: "Change management: Why 70% of initiatives fail",
    date: "FEB 2025",
    cat: "Strategy",
    excerpt: "The statistics on change management failure haven't improved in decades. We analyze the root causes and present a revised approach that addresses the human dimensions most change programs overlook.",
  },
  {
    title: "Team performance optimization in hybrid workplaces",
    date: "JAN 2025",
    cat: "Culture",
    excerpt: "Hybrid work is here to stay, but most organizations are still managing hybrid teams with pre-pandemic playbooks. Discover the five shifts high-performing hybrid teams have made to maintain collaboration and output.",
  },
  {
    title: "Strategic planning in volatile markets",
    date: "DEC 2024",
    cat: "Strategy",
    excerpt: "Traditional 5-year strategic plans are obsolete in today's volatile markets. We introduce an adaptive strategic planning model that balances long-term vision with the agility to respond to rapid market shifts.",
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

  const featuredInsight = insights[0];
  const filteredInsights = activeCategory === "All"
    ? insights.slice(1)
    : insights.filter(i => i.cat === activeCategory);

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
                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest cursor-pointer hover:text-accent transition-colors group">
                  <BookOpen size={16} />
                  <span>Read Full Insight</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 border-b sticky top-0 bg-white z-10" data-testid="section-category-filters">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 flex-wrap">
              <Filter size={16} className="text-gray-400 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-black text-white"
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

        <section className="grid grid-cols-1 md:grid-cols-2" data-testid="section-insights-grid">
          {filteredInsights.map((insight, i) => (
            <div
              key={i}
              className="p-12 md:p-16 pwc-grid-border group cursor-pointer hover:bg-black hover:text-white transition-all duration-500 min-h-[350px] flex flex-col justify-between"
              data-testid={`card-insight-${i}`}
            >
              <div>
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
                <div className="flex justify-between items-center mb-6">
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:text-accent">
                    {categoryIcons[insight.cat]}
                    {insight.cat}
                  </span>
                  <span className="text-[10px] font-bold opacity-40">{insight.date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold uppercase italic leading-tight group-hover:translate-x-4 transition-transform duration-500 mb-4">
                  {insight.title}
                </h2>
                <p className="text-sm leading-relaxed opacity-70 group-hover:opacity-90 transition-opacity" data-testid={`text-excerpt-${i}`}>
                  {insight.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest mt-8">
                <span>View Insight</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
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

        <section className="py-24 bg-black text-white" data-testid="section-subscribe">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <Mail size={40} className="mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold uppercase italic mb-4" data-testid="text-subscribe-title">
              Subscribe to Our Insights
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Get our latest research, frameworks, and strategic perspectives delivered directly to your inbox. No spam—just actionable insights for organizational leaders.
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
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-accent transition-colors"
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
            <p className="text-gray-600 text-xs mt-4">Monthly digest. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
