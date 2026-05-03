import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  Megaphone,
  Database,
  Settings,
  GraduationCap,
  RefreshCw,
  Package,
  Calendar,
  CreditCard,
  Heart,
} from "lucide-react";
import { OFFERS, CATEGORY_META, type OfferCategory } from "@shared/offers";
import { useToast } from "@/hooks/use-toast";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CATEGORY_ORDER: OfferCategory[] = ["website", "marketing", "crm", "systems", "training", "support"];

const CATEGORY_ICONS: Record<OfferCategory, ReactNode> = {
  website: <Globe className="text-accent" size={28} />,
  marketing: <Megaphone className="text-accent" size={28} />,
  crm: <Database className="text-accent" size={28} />,
  systems: <Settings className="text-accent" size={28} />,
  training: <GraduationCap className="text-accent" size={28} />,
  support: <RefreshCw className="text-accent" size={28} />,
  bundle: <Package className="text-accent" size={28} />,
};

export default function Services() {
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "success") {
      toast({ title: "Payment successful", description: "Thank you. We will be in touch shortly to get started." });
      window.history.replaceState({}, "", "/services");
    } else if (payment === "cancelled") {
      toast({ title: "Payment cancelled", description: "Your payment was not completed.", variant: "destructive" });
      window.history.replaceState({}, "", "/services");
    }
  }, []);

  const bundles = OFFERS.filter((o) => o.category === "bundle");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <SEOHead
        title="Services and Pricing | Performance Processes"
        description="Productized websites, marketing, CRM, business systems, training, and ongoing growth support for small and emerging businesses. Clear prices, secure checkout."
        path="/services"
      />
      <Navbar />

      <main className="flex-grow">
        <PageHero
          title={<>Productized services. <span className="text-accent">Clear prices.</span></>}
          subtitle="We help professionals, nonprofits, startups, and small businesses build the websites, marketing systems, and business support they need to grow."
        />

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {CATEGORY_ORDER.map((cat) => (
                <a
                  key={cat}
                  href={`#cat-${cat}`}
                  className="group p-4 rounded-2xl border border-border bg-white hover:border-accent hover:shadow-md transition-all flex flex-col items-center text-center gap-2"
                  data-testid={`link-category-${cat}`}
                >
                  {CATEGORY_ICONS[cat]}
                  <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                    {CATEGORY_META[cat].label}
                  </span>
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-xs text-muted-foreground">
              <CreditCard size={14} className="text-accent" />
              <span className="font-semibold">Every service can be paid for online.</span>
              <span>We accept credit card, debit, and PayPal via secure Stripe checkout.</span>
            </div>
          </div>
        </section>

        {bundles.length > 0 && (
          <section id="cat-bundle" className="py-20 bg-primary text-white" data-testid="section-bundles">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mb-12">
                <p className="text-xs font-black uppercase tracking-[0.3em] mb-3 text-accent">Popular Packages</p>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-3 text-white">
                  Pre-built bundles, ready to launch.
                </h2>
                <p className="text-base md:text-lg text-white/70">
                  The fastest way to get a complete setup. Each bundle combines our most-requested services at a packaged price.
                </p>
              </div>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {bundles.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} returnPage="/services" />
                ))}
              </div>
            </div>
          </section>
        )}

        {CATEGORY_ORDER.map((cat, idx) => {
          const offers = OFFERS.filter((o) => o.category === cat);
          if (offers.length === 0) return null;
          const meta = CATEGORY_META[cat];
          const isAlt = idx % 2 === 1;
          return (
            <section
              key={cat}
              id={`cat-${cat}`}
              className={`py-20 ${isAlt ? "bg-white" : "bg-[#F8FAFC]"}`}
              data-testid={`section-${cat}`}
            >
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl mb-12 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      {CATEGORY_ICONS[cat]}
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">Category {idx + 1}</p>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary">
                    {meta.label}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground">
                    {meta.description}
                  </p>
                </div>
                <div
                  className={`grid gap-6 ${
                    offers.length === 1
                      ? "max-w-md"
                      : offers.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {offers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} returnPage="/services" />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="py-20 bg-white border-t" data-testid="section-framework">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs font-black uppercase tracking-[0.3em] mb-3 text-accent">Strategic Framework</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Our services are growth infrastructure.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you start with a website, a marketing package, a CRM setup, or a business system audit,
                each offer is built to work together as one growth infrastructure, helping your business attract
                leads, convert customers, and operate with more structure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F8FAFC]" data-testid="section-nextup">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-accent/5 via-white to-accent/10 rounded-3xl border-2 border-accent/20 overflow-hidden shadow-lg">
              <div className="p-10 md:p-14">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Heart className="text-accent" size={26} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary">
                    NextUp Canada Partnership
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  Canadian founders aged 18 to 29 connected to NextUp Canada receive 40% off every productized service on this page.
                </p>
                <Link href="/nextup-partnership">
                  <Button className="rounded-full bg-accent text-white hover:bg-primary h-12 px-8 font-bold uppercase tracking-wider text-sm">
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-white" data-testid="section-final-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">
                Ready to take the next step?
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Book a strategy call to talk through fit, or pick a package and check out today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider w-full sm:w-auto" data-testid="button-book-strategy-call">
                    <Calendar size={16} className="mr-2" />
                    Book a Strategy Call
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider w-full sm:w-auto" data-testid="button-contact">
                    Contact Us
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
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
