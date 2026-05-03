import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Calendar, MessageCircle } from "lucide-react";
import { OFFERS, CATEGORY_META, type OfferCategory } from "@shared/offers";
import { useToast } from "@/hooks/use-toast";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CATEGORY_ORDER: OfferCategory[] = ["bundle", "website", "marketing", "crm", "systems", "training", "support"];

export default function Pricing() {
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "success") {
      toast({ title: "Payment successful", description: "Thank you. We will be in touch shortly to get started." });
      window.history.replaceState({}, "", "/pricing");
    } else if (payment === "cancelled") {
      toast({ title: "Payment cancelled", description: "Your payment was not completed.", variant: "destructive" });
      window.history.replaceState({}, "", "/pricing");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <SEOHead
        title="Pricing | Performance Processes"
        description="Clear, productized pricing for websites, marketing, CRM, business systems, training, and ongoing growth support. Pay with card, debit, or PayPal."
        path="/pricing"
      />
      <Navbar />

      <main className="flex-grow">
        <PageHero
          title={<>Clear prices. <span className="text-accent">Simple next steps.</span></>}
          subtitle="Productized services for small and emerging businesses. Pick what you need, see what is included, and check out securely with credit card, debit, or PayPal."
        />

        <section className="py-10 bg-white border-b">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {CATEGORY_ORDER.map((cat) => (
                <a
                  key={cat}
                  href={`#cat-${cat}`}
                  className="text-xs md:text-sm font-bold uppercase tracking-wider text-primary px-4 py-2 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                  data-testid={`link-jump-${cat}`}
                >
                  {CATEGORY_META[cat].label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
              <CreditCard size={14} className="text-accent" />
              <span className="font-semibold">Secure checkout via Stripe.</span>
              <span>We accept credit card, debit, and PayPal.</span>
            </div>
          </div>
        </section>

        {CATEGORY_ORDER.map((cat) => {
          const offers = OFFERS.filter((o) => o.category === cat);
          if (offers.length === 0) return null;
          const meta = CATEGORY_META[cat];
          return (
            <section
              key={cat}
              id={`cat-${cat}`}
              className={`py-20 ${cat === "bundle" ? "bg-primary text-white" : "bg-[#F8FAFC]"}`}
              data-testid={`section-${cat}`}
            >
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl mb-12">
                  <p className={`text-xs font-black uppercase tracking-[0.3em] mb-3 ${cat === "bundle" ? "text-accent" : "text-accent"}`}>
                    {cat === "bundle" ? "Popular Packages" : "Category"}
                  </p>
                  <h2 className={`text-3xl md:text-4xl font-heading font-extrabold mb-3 ${cat === "bundle" ? "text-white" : "text-primary"}`}>
                    {meta.label}
                  </h2>
                  <p className={`text-base md:text-lg ${cat === "bundle" ? "text-white/70" : "text-muted-foreground"}`}>
                    {meta.description}
                  </p>
                </div>
                <div className={`grid gap-6 ${offers.length === 1 ? "max-w-md mx-auto" : offers.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                  {offers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} returnPage="/pricing" />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="py-24 bg-white border-t" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                Not sure where to start?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Book a strategy call and we will help you pick the right package, or take the assessment to get a recommendation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-primary h-14 px-10 font-bold text-sm uppercase tracking-wider w-full sm:w-auto" data-testid="button-book-call">
                    <Calendar size={16} className="mr-2" />
                    Book a Strategy Call
                  </Button>
                </a>
                <Link href="/assessment">
                  <Button variant="outline" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-14 px-10 font-bold text-sm uppercase tracking-wider w-full sm:w-auto" data-testid="button-take-assessment">
                    Take the Growth Assessment
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-2 border-border text-primary hover:bg-secondary h-14 px-10 font-bold text-sm uppercase tracking-wider w-full sm:w-auto" data-testid="button-contact">
                    <MessageCircle size={16} className="mr-2" />
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
