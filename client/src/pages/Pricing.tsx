import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AnimateOnScroll, FloatingShape, GradientOrb } from "@/components/ui/animate-on-scroll";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface Offer {
  name: string;
  price: string;
  bestFor: string;
  includes: string[];
  cta?: string;
  ctaHref?: string;
  featured?: boolean;
  stripeName?: string;
  stripeNameSecondary?: string;
  stripeSecondaryLabel?: string;
  stripePrimaryLabel?: string;
}

interface Category {
  id: string;
  label: string;
  title: string;
  intro: string;
  offers: Offer[];
}

const categories: Category[] = [
  {
    id: "websites",
    label: "Website Services",
    title: "Website Services",
    intro: "Professional websites built to inform, convert, and grow with your business.",
    offers: [
      {
        name: "Starter Website Package",
        stripeName: "Starter Website Package",
        price: "$1,500",
        bestFor: "Professionals, startups, and small businesses needing a simple online presence.",
        includes: [
          "Up to 5 pages",
          "Mobile responsive design",
          "Contact form",
          "Basic on-page SEO",
          "Homepage copy support",
          "Social media links",
          "Basic launch support",
        ],
      },
      {
        name: "Business Website Package",
        stripeName: "Business Website Package",
        price: "$2,500",
        bestFor: "Small businesses that need a stronger website to explain services and generate leads.",
        includes: [
          "Up to 8 pages",
          "Mobile responsive design",
          "Service pages",
          "Contact / lead form",
          "Basic SEO setup",
          "Google Business Profile integration",
          "Analytics setup",
          "Basic website copy support",
        ],
        featured: true,
      },
      {
        name: "Website Conversion Package",
        stripeName: "Website Conversion Package",
        price: "$3,500",
        bestFor: "Businesses that need a website designed to convert visitors into leads.",
        includes: [
          "Up to 10 pages",
          "Landing page",
          "Lead capture form",
          "Conversion-focused page structure",
          "Call-to-action strategy",
          "Basic SEO setup",
          "Analytics setup",
          "Website copy support",
          "Launch support",
        ],
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing Services",
    title: "Marketing Services",
    intro: "Marketing structure, campaigns, and lead generation built to fit your stage of growth.",
    offers: [
      {
        name: "Marketing Starter Package",
        stripeName: "Marketing Starter Package",
        price: "$1,500",
        bestFor: "Small businesses that need structure and clarity around their marketing.",
        includes: [
          "Marketing audit",
          "Offer positioning review",
          "Target audience clarification",
          "Basic content direction",
          "30-day marketing action plan",
          "Recommended channels and next steps",
        ],
      },
      {
        name: "Social Media Setup Package",
        stripeName: "Social Media Setup Package",
        price: "$1,200",
        bestFor: "Businesses that need a professional social media foundation.",
        includes: [
          "Profile review and optimization",
          "Bio / about copy",
          "Branded content direction",
          "Content pillars",
          "10 starter post ideas",
          "Basic posting plan",
        ],
      },
      {
        name: "Campaign Setup Package",
        stripeName: "Campaign Setup Package",
        price: "$2,500",
        bestFor: "Businesses preparing to launch a campaign or promote an offer.",
        includes: [
          "Campaign strategy",
          "Audience definition",
          "Campaign messaging",
          "Landing page recommendation",
          "Email or DM outreach copy",
          "30-day campaign plan",
          "KPI tracking recommendations",
        ],
      },
      {
        name: "Growth Engine Package",
        stripeName: "Growth Engine Package",
        price: "$5,000",
        bestFor: "Small businesses that need a complete basic lead generation setup.",
        includes: [
          "Marketing strategy",
          "Landing page or funnel structure",
          "Lead capture setup",
          "Basic CRM or lead tracking setup",
          "Campaign messaging",
          "30-day execution plan",
          "Analytics and tracking setup",
        ],
        featured: true,
      },
    ],
  },
  {
    id: "crm",
    label: "CRM & Lead Tracking",
    title: "CRM and Lead Tracking",
    intro: "Organize your leads, follow up consistently, and turn more conversations into customers.",
    offers: [
      {
        name: "CRM Starter Setup",
        stripeName: "CRM Starter Setup",
        price: "$1,500",
        bestFor: "Businesses that need to organize and track leads.",
        includes: [
          "Basic CRM setup",
          "Pipeline stages",
          "Contact fields",
          "Lead source tracking",
          "Follow-up reminders",
          "Simple reporting setup",
        ],
      },
      {
        name: "Lead Tracking & Follow-Up System",
        stripeName: "Lead Tracking & Follow-Up System",
        price: "$2,500",
        bestFor: "Businesses that need a more structured sales follow-up process.",
        includes: [
          "CRM setup",
          "Lead pipeline",
          "Follow-up workflow",
          "Email response templates",
          "Simple automation recommendations",
          "Reporting dashboard",
        ],
        featured: true,
      },
    ],
  },
  {
    id: "systems",
    label: "Business Systems & Playbooks",
    title: "Business Systems and Playbooks",
    intro: "Identify what's slowing you down and install the structure to grow.",
    offers: [
      {
        name: "Business System Audit",
        stripeName: "Business System Audit",
        price: "$750",
        bestFor: "Small businesses that need clarity on what is not working.",
        includes: [
          "Review of current structure",
          "Review of website, marketing, process, and execution gaps",
          "Summary report",
          "Priority recommendations",
          "Suggested next steps",
        ],
      },
      {
        name: "Foundation Sprint",
        stripeName: "Foundation Sprint",
        price: "$3,500",
        bestFor: "Businesses that need structure before scaling.",
        includes: [
          "Role clarity",
          "Basic org structure",
          "KPI recommendations",
          "Process gap review",
          "90-day action plan",
        ],
        featured: true,
      },
      {
        name: "Playbooks",
        price: "$149 – $299 each",
        bestFor: "Founders and teams who want self-paced, ready-to-implement playbooks.",
        includes: [
          "Hiring playbooks",
          "Website conversion playbooks",
          "Marketing playbooks",
          "KPI and performance playbooks",
          "SOP and process playbooks",
          "Bundles available from $399 to $999",
        ],
        cta: "View Playbooks",
        ctaHref: "/playbooks",
      },
    ],
  },
  {
    id: "training",
    label: "Training & Implementation",
    title: "Training and Implementation Support",
    intro: "Practical, structured training for individuals and teams ready to put systems to work.",
    offers: [
      {
        name: "Business System Foundations Training",
        stripeName: "Business System Foundations Training (Individual)",
        stripePrimaryLabel: "Buy Individual Seat",
        stripeNameSecondary: "Business System Foundations Training (Team)",
        stripeSecondaryLabel: "Buy Team License",
        price: "$499 / person · $2,000 / team",
        bestFor: "Teams new to structured business systems.",
        includes: [
          "Structure, roles, KPIs, and process basics",
          "Practical worksheets",
          "Implementation steps",
        ],
      },
      {
        name: "Website & Marketing Training",
        stripeName: "Website & Marketing Training (Individual)",
        stripePrimaryLabel: "Buy Individual Seat",
        stripeNameSecondary: "Website & Marketing Training (Team)",
        stripeSecondaryLabel: "Buy Team License",
        price: "$499 / person · $2,500 / team",
        bestFor: "Teams responsible for website, content, and lead generation.",
        includes: [
          "Website conversion basics",
          "Funnel structure",
          "Lead generation basics",
          "Content and campaign planning",
        ],
      },
      {
        name: "Execution & Performance Training",
        stripeName: "Execution & Performance Training (Individual)",
        stripePrimaryLabel: "Buy Individual Seat",
        stripeNameSecondary: "Execution & Performance Training (Team)",
        stripeSecondaryLabel: "Buy Team License",
        price: "$499 / person · $2,500 / team",
        bestFor: "Teams that need accountability rhythms and execution discipline.",
        includes: [
          "KPI tracking",
          "Accountability rhythms",
          "Weekly execution systems",
          "Performance review basics",
        ],
      },
      {
        name: "Team Implementation Workshop",
        price: "$3,500 – $7,500",
        bestFor: "Teams that want a custom, hands-on workshop with implementation support.",
        includes: [
          "Custom live workshop",
          "Team training",
          "Practical implementation support",
          "Templates and action plan",
        ],
        featured: true,
      },
    ],
  },
  {
    id: "ongoing",
    label: "Ongoing Growth Support",
    title: "Ongoing Growth Support",
    intro: "Monthly retainers that keep your marketing, lead generation, and systems moving.",
    offers: [
      {
        name: "Monthly Marketing Support",
        stripeName: "Monthly Marketing Support",
        stripePrimaryLabel: "Subscribe",
        price: "$1,500 / month",
        bestFor: "Businesses that need consistent marketing planning and execution support.",
        includes: [
          "Monthly marketing planning",
          "Content direction",
          "Campaign support",
          "Basic reporting",
          "Optimization recommendations",
        ],
      },
      {
        name: "Monthly Growth Support",
        stripeName: "Monthly Growth Support",
        stripePrimaryLabel: "Subscribe",
        price: "$2,500 / month",
        bestFor: "Businesses that want marketing and broader growth oversight.",
        includes: [
          "Marketing support",
          "Website improvement recommendations",
          "Lead tracking review",
          "KPI review",
          "Monthly strategy call",
        ],
        featured: true,
      },
      {
        name: "Growth Partner Retainer",
        stripeName: "Growth Partner Retainer",
        stripePrimaryLabel: "Subscribe",
        price: "$4,000 / month",
        bestFor: "Businesses that want a full growth partner across systems and execution.",
        includes: [
          "Marketing support",
          "CRM and lead tracking review",
          "Website optimization support",
          "KPI and performance review",
          "Process improvement support",
          "Monthly strategy and execution support",
        ],
      },
    ],
  },
];

interface Bundle {
  name: string;
  stripeName: string;
  price: string;
  desc: string;
  includes: string[];
  highlight?: boolean;
}

const bundles: Bundle[] = [
  {
    name: "Launch Package",
    stripeName: "Launch Package (Bundle)",
    price: "$3,000",
    desc: "Get online and visible quickly with a clean website and social presence.",
    includes: [
      "Starter Website Package",
      "Social Media Setup Package",
      "Basic launch support",
    ],
  },
  {
    name: "Growth Starter Package",
    stripeName: "Growth Starter Package (Bundle)",
    price: "$5,000",
    desc: "A stronger foundation: website, marketing structure, and lead organization.",
    includes: [
      "Business Website Package",
      "Marketing Starter Package",
      "CRM Starter Setup",
    ],
    highlight: true,
  },
  {
    name: "Growth Engine Package",
    stripeName: "Growth Engine Package (Bundle)",
    price: "$7,500",
    desc: "A complete lead generation engine: website, campaign, and follow-up system.",
    includes: [
      "Website Conversion Package",
      "Campaign Setup Package",
      "Lead Tracking & Follow-Up System",
    ],
  },
  {
    name: "Scale Support Package",
    stripeName: "Scale Support Package (Bundle)",
    price: "$10,000",
    desc: "Operational structure plus a full lead generation engine and implementation support.",
    includes: [
      "Foundation Sprint",
      "Growth Engine Package components",
      "30-day implementation support",
    ],
  },
];

interface ProductRow {
  product_name: string;
  price_id: string;
}

async function startCheckout(priceId: string, serviceName: string): Promise<string | null> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, serviceName, returnPage: "/pricing" }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url || null;
  } catch {
    return null;
  }
}

function OfferCard({
  offer,
  priceMap,
}: {
  offer: Offer;
  priceMap: Map<string, string>;
}) {
  const { toast } = useToast();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const slug = offer.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const primaryPriceId = offer.stripeName ? priceMap.get(offer.stripeName) : undefined;
  const secondaryPriceId = offer.stripeNameSecondary ? priceMap.get(offer.stripeNameSecondary) : undefined;

  const handleBuy = async (priceId: string, name: string, key: string) => {
    setLoadingKey(key);
    const url = await startCheckout(priceId, name);
    if (url) {
      window.location.href = url;
    } else {
      setLoadingKey(null);
      toast({
        title: "Checkout unavailable",
        description: "We couldn't start checkout. Please try again or book a strategy call.",
        variant: "destructive",
      });
    }
  };

  const baseBtn =
    "mt-3 inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 text-xs font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";
  const primaryClass =
    baseBtn + " " + (offer.featured ? "bg-accent text-white hover:bg-primary" : "bg-primary text-white hover:bg-accent");
  const secondaryClass =
    baseBtn + " border border-primary/20 text-primary hover:border-accent hover:text-accent";

  const renderFallback = () => {
    const cta = offer.cta || "Request This Package";
    const ctaHref = offer.ctaHref || "/contact";
    const isExternal = ctaHref.startsWith("http");
    const fallbackClass =
      "mt-3 inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 text-xs font-bold uppercase tracking-wider transition-all duration-300 " +
      (offer.featured
        ? "bg-accent text-white hover:bg-primary"
        : "border border-primary/20 text-primary hover:border-accent hover:text-accent");
    if (isExternal) {
      return (
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={fallbackClass}
          data-testid={`button-cta-${slug}`}
        >
          {cta}
          <ArrowRight size={14} />
        </a>
      );
    }
    return (
      <Link href={ctaHref} className={fallbackClass} data-testid={`button-cta-${slug}`}>
        {cta}
        <ArrowRight size={14} />
      </Link>
    );
  };

  return (
    <div
      className={
        "relative flex flex-col h-full rounded-2xl border bg-white p-7 transition-all duration-300 " +
        (offer.featured
          ? "border-accent/40 shadow-lg shadow-accent/5 hover:shadow-xl hover:shadow-accent/10"
          : "border-border hover:shadow-md hover:border-accent/30")
      }
      data-testid={`pricing-card-${slug}`}
    >
      {offer.featured && (
        <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-widest">
          Popular
        </div>
      )}
      <h3 className="text-lg font-heading font-extrabold text-primary mb-2">{offer.name}</h3>
      <div className="text-2xl font-black text-accent mb-3">{offer.price}</div>
      <p className="text-sm text-muted-foreground italic mb-5 leading-relaxed">{offer.bestFor}</p>
      <div className="flex-1 mb-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-3">Includes</p>
        <ul className="space-y-2">
          {offer.includes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-primary/80">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        {primaryPriceId ? (
          <button
            onClick={() => handleBuy(primaryPriceId, offer.stripeName!, "primary")}
            disabled={loadingKey !== null}
            className={primaryClass}
            data-testid={`button-buy-${slug}`}
          >
            {loadingKey === "primary" ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                {offer.stripePrimaryLabel || "Buy Now"}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        ) : (
          renderFallback()
        )}

        {secondaryPriceId && (
          <button
            onClick={() => handleBuy(secondaryPriceId, offer.stripeNameSecondary!, "secondary")}
            disabled={loadingKey !== null}
            className={secondaryClass}
            data-testid={`button-buy-secondary-${slug}`}
          >
            {loadingKey === "secondary" ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                {offer.stripeSecondaryLabel || "Buy Team Option"}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        )}

        {primaryPriceId && (
          <a
            href={BOOKINGS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[11px] font-bold uppercase tracking-wider text-primary/60 hover:text-accent transition-colors mt-1"
            data-testid={`link-talk-${slug}`}
          >
            Or book a strategy call
          </a>
        )}
      </div>
    </div>
  );
}

function BundleCard({
  bundle,
  priceMap,
}: {
  bundle: Bundle;
  priceMap: Map<string, string>;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const slug = bundle.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const priceId = priceMap.get(bundle.stripeName);

  const handleBuy = async () => {
    if (!priceId) return;
    setLoading(true);
    const url = await startCheckout(priceId, bundle.stripeName);
    if (url) {
      window.location.href = url;
    } else {
      setLoading(false);
      toast({
        title: "Checkout unavailable",
        description: "We couldn't start checkout. Please try again or book a strategy call.",
        variant: "destructive",
      });
    }
  };

  const buttonBase =
    "mt-6 inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 text-xs font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-60";
  const buttonClass =
    buttonBase +
    " " +
    (bundle.highlight
      ? "bg-accent text-white hover:bg-white hover:text-primary"
      : "bg-primary text-white hover:bg-accent");

  return (
    <div
      className={
        "relative flex flex-col h-full rounded-2xl p-7 transition-all duration-300 " +
        (bundle.highlight
          ? "bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02]"
          : "bg-[#F8FAFC] border border-border hover:shadow-md hover:border-accent/30")
      }
      data-testid={`bundle-card-${slug}`}
    >
      {bundle.highlight && (
        <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-widest">
          Most Popular
        </div>
      )}
      <h3 className={"text-lg font-heading font-extrabold mb-2 " + (bundle.highlight ? "text-white" : "text-primary")}>
        {bundle.name}
      </h3>
      <div className="text-3xl font-black mb-3 text-accent">{bundle.price}</div>
      <p className={"text-sm mb-5 leading-relaxed " + (bundle.highlight ? "text-white/75" : "text-muted-foreground")}>
        {bundle.desc}
      </p>
      <ul className="space-y-2 flex-1">
        {bundle.includes.map((item, i) => (
          <li
            key={i}
            className={"flex items-start gap-2 text-sm " + (bundle.highlight ? "text-white/85" : "text-primary/80")}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {priceId ? (
        <button
          onClick={handleBuy}
          disabled={loading}
          className={buttonClass}
          data-testid={`button-bundle-buy-${slug}`}
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <>
              Buy Bundle
              <ArrowRight size={14} />
            </>
          )}
        </button>
      ) : (
        <Link
          href="/contact"
          className={buttonClass}
          data-testid={`button-bundle-cta-${slug}`}
        >
          Request This Package
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { toast } = useToast();

  const { data: productsResponse } = useQuery<{ data: ProductRow[] }>({
    queryKey: ["/api/products"],
  });

  const priceMap = new Map<string, string>();
  (productsResponse?.data || []).forEach((p) => {
    if (p.product_name && p.price_id && !priceMap.has(p.product_name)) {
      priceMap.set(p.product_name, p.price_id);
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "success") {
      toast({
        title: "Payment received",
        description: "Thank you! We've emailed your receipt and will reach out to schedule kickoff.",
      });
      window.history.replaceState({}, "", "/pricing");
    } else if (payment === "cancelled") {
      toast({
        title: "Checkout cancelled",
        description: "No charge was made. You can pick back up any time.",
      });
      window.history.replaceState({}, "", "/pricing");
    }
  }, [toast]);

  const visibleCategories =
    activeCategory === "all" ? categories : categories.filter((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <SEOHead
        title="Services & Pricing | Performance Processes"
        description="Clear, productized website, marketing, CRM, training, and ongoing growth support for small and emerging businesses, with transparent pricing."
        path="/pricing"
      />
      <Navbar />

      <main className="flex-grow">
        <section className="relative bg-primary text-white overflow-hidden" data-testid="section-pricing-hero">
          <GradientOrb className="w-96 h-96 bg-accent/15 -top-20 -right-20" />
          <FloatingShape className="w-16 h-16 top-[30%] left-[10%]" variant="ring" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Services & Pricing</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-[1.08]" data-testid="text-pricing-hero-title">
                Clear services, transparent pricing,<br />
                <span className="text-accent">simple next steps.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/75 mb-8 leading-relaxed max-w-2xl">
                Websites, marketing, CRM and lead tracking, business systems, training, and ongoing support, productized for small and emerging businesses.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#offers"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-12 px-8 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  data-testid="button-view-pricing"
                >
                  Browse Services
                  <ArrowRight size={16} />
                </a>
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-12 px-8 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  data-testid="button-pricing-book"
                >
                  Book a Strategy Call
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
        </section>

        <section className="py-20 bg-white border-b" data-testid="section-bundles">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Popular Packages</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                Bundles built to deliver outcomes.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Save when you combine the services you need. Each package is designed around a clear next step in your growth.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {bundles.map((b, i) => (
                <AnimateOnScroll key={b.name} animation="fade-up" delay={i * 80}>
                  <BundleCard bundle={b} priceMap={priceMap} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section id="offers" className="py-20 bg-[#F8FAFC]" data-testid="section-categories">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">All Services</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                Productized services for every stage.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Filter by category to find the right fit. Every service includes a clear scope, price, and next step.
              </p>
            </AnimateOnScroll>

            <div className="flex flex-wrap justify-center gap-2 mb-14">
              <button
                onClick={() => setActiveCategory("all")}
                className={
                  "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all " +
                  (activeCategory === "all"
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-primary hover:border-accent hover:text-accent")
                }
                data-testid="filter-all"
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={
                    "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all " +
                    (activeCategory === c.id
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-primary hover:border-accent hover:text-accent")
                  }
                  data-testid={`filter-${c.id}`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="space-y-20">
              {visibleCategories.map((cat) => (
                <div key={cat.id} id={cat.id} data-testid={`category-${cat.id}`}>
                  <AnimateOnScroll className="max-w-3xl mb-10">
                    <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-3">
                      {cat.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{cat.intro}</p>
                  </AnimateOnScroll>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.offers.map((offer, i) => (
                      <AnimateOnScroll key={offer.name} animation="fade-up" delay={i * 80}>
                        <OfferCard offer={offer} priceMap={priceMap} />
                      </AnimateOnScroll>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white border-y" data-testid="section-framework">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">The Bigger Picture</p>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6 leading-tight">
                  Designed to work together as <span className="text-accent italic">growth infrastructure.</span>
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Our services are designed to work together as growth infrastructure. Whether you start with a website, a marketing package, a CRM setup, or a business system audit, each offer is built to help your business attract leads, convert customers, and operate with more structure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-white hover:bg-accent h-11 px-6 text-xs font-bold uppercase tracking-wider transition-all"
                    data-testid="button-explore-framework"
                  >
                    Explore the Framework
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/assessment"
                    className="inline-flex items-center rounded-full border border-primary/20 text-primary hover:border-accent hover:text-accent h-11 px-6 text-xs font-bold uppercase tracking-wider transition-all"
                    data-testid="button-take-assessment"
                  >
                    Take the Assessment
                  </Link>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={150}>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((c) => (
                    <a
                      key={c.id}
                      href={`#${c.id}`}
                      className="p-5 rounded-xl bg-[#F8FAFC] border border-border hover:border-accent hover:shadow-md transition-all"
                      data-testid={`link-framework-${c.id}`}
                    >
                      <p className="text-xs font-black uppercase tracking-wider text-accent mb-1">Layer</p>
                      <p className="text-sm font-bold text-primary">{c.label}</p>
                    </a>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-white relative overflow-hidden" data-testid="section-pricing-cta">
          <GradientOrb className="w-96 h-96 bg-accent/10 -bottom-20 -left-20" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6 leading-tight">
                Not sure where to start?
              </h2>
              <p className="text-lg text-white/75 mb-10 leading-relaxed">
                Book a 30-minute strategy call. We'll help you choose the right service, package, or starting point for your business.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={BOOKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30"
                  data-testid="button-final-book"
                >
                  Book a Strategy Call
                  <ArrowRight size={16} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  data-testid="button-final-contact"
                >
                  Send a Message
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
