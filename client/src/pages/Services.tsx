import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import { OFFERS, CATEGORY_META, type OfferCategory } from "@shared/offers";
import { useToast } from "@/hooks/use-toast";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CATEGORY_ORDER: OfferCategory[] = ["website", "marketing", "crm", "systems", "hr-recruiting", "support"];

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

  const packages = OFFERS.filter((o) => o.category === "packages");
  const bundles = OFFERS.filter((o) => o.category === "bundle");

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <SEOHead
        title="Services and Pricing | Performance Processes"
        description="Productized websites, marketing, CRM, business systems, and ongoing growth support for small and emerging businesses. Clear prices, secure checkout."
        path="/services"
      />
      <Navbar />

      <main className="flex-grow">
        <PageHero
          title={<>Buy a complete <span className="text-display-italic text-accent">system</span>.</>}
          subtitle="Start with one of our four headline packages, or browse the full catalog of websites, marketing, CRM, business systems, and ongoing support, clear prices, secure checkout."
        />

        {packages.length > 0 && (
          <section id="cat-packages" className="py-24 bg-background border-b border-border" data-testid="section-packages">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mb-14">
                <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">Headline Packages</p>
                <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">
                  Four systems, four complete outcomes.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                  Each package solves a full business problem and installs infrastructure you keep. The detailed à-la-carte catalog is below.
                </p>
              </div>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {packages.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} returnPage="/services" />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 bg-secondary/40 border-b border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border [&>*:nth-child(7)]:lg:col-start-2">
              {CATEGORY_ORDER.map((cat) => (
                <a
                  key={cat}
                  href={`#cat-${cat}`}
                  className="group px-4 py-6 bg-background hover:bg-primary transition-colors text-center"
                  data-testid={`link-category-${cat}`}
                >
                  <span className="text-xs uppercase tracking-[0.12em] text-primary group-hover:text-white transition-colors leading-tight">
                    {CATEGORY_META[cat].label}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-center mt-8 text-xs text-muted-foreground font-light">
              Every service can be paid for online, credit card, debit, and PayPal via secure Stripe checkout.
            </p>
          </div>
        </section>

        {bundles.length > 0 && (
          <section id="cat-bundle" className="py-24 bg-primary text-white" data-testid="section-bundles">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mb-14">
                <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-white/50">Popular Packages</p>
                <h2 className="text-display text-4xl md:text-5xl mb-5 text-white">
                  Pre-built bundles, ready to launch.
                </h2>
                <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
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
              className={`py-24 ${isAlt ? "bg-background" : "bg-secondary/40"}`}
              data-testid={`section-${cat}`}
            >
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl mb-14 flex flex-col gap-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">{`0${idx + 1}`}</p>
                  <h2 className="text-display text-4xl md:text-5xl text-primary">
                    {meta.label}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
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

        <section className="py-24 bg-background border-t border-border" data-testid="section-framework">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">Strategic Framework</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary mb-7">
                Our services are growth infrastructure.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                Whether you start with a website, a marketing package, a CRM setup, or a business system audit,
                each offer is built to work together as one growth infrastructure, helping your business attract
                leads, convert customers, and operate with more structure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/40" data-testid="section-nextup">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-background border border-border">
              <div className="p-10 md:p-14 border-l-2 border-accent">
                <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">Partnership</p>
                <h2 className="text-display text-3xl md:text-4xl text-primary mb-6">
                  NextUp Canada Partnership
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-3xl font-light">
                  Canadian founders aged 18 to 29 approved by NextUp Canada receive 40% off our website services. Apply on NextUp Canada's website to receive your discount code, then enter it at checkout on any website package.
                </p>
                <p className="text-sm text-muted-foreground mb-8 max-w-3xl font-light">
                  Code: <span className="font-mono text-primary">NEXTPROCESSES</span> &middot; Applies to website services only.
                </p>
                <Link href="/nextup-partnership">
                  <Button className="rounded-none bg-primary text-white hover:bg-accent h-12 px-8 font-semibold uppercase tracking-[0.2em] text-xs">
                    Learn More
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
                    Book a Strategy Call
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider w-full sm:w-auto" data-testid="button-contact">
                    Contact Us
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
