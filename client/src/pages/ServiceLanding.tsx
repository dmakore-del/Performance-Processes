import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import {
  getLandingBySlug,
  getOffersByCategory,
  CATEGORY_META,
  CATEGORY_NARRATIVE,
  LANDING_PAGES,
} from "@shared/offers";
import { useToast } from "@/hooks/use-toast";
import NotFound from "./not-found";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const TESTIMONIAL_EXCERPTS: Record<string, { text: string; author: string }> = {
  "NextUp Foundation for Canadian Youth": {
    text: "Performance Processes played a key role in helping us bring our digital vision to life. Their team developed a modern, user-friendly website that effectively communicates our mission and engages youth, donors, and community partners.",
    author: "Leadership Team",
  },
  "TrueNorth Property & Facilities": {
    text: "The systems they delivered have streamlined workflows, improved information accessibility, and enhanced overall organizational efficiency. Their commitment to quality, communication, and continuous improvement made them a trusted technology partner throughout the project.",
    author: "Management Team",
  },
  "Ubuntu Immigration": {
    text: "Working with Performance Processes on our process mapping initiative provided tremendous value to our organization. They helped us clearly document, analyze, and optimize our key operational processes, giving us greater visibility into how work flows across the business.",
    author: "Leadership Team",
  },
};

function HeadlineWithAccent({ headline, accentWord }: { headline: string; accentWord: string }) {
  const idx = headline.toLowerCase().indexOf(accentWord.toLowerCase());
  if (idx === -1) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, idx)}
      <span className="text-display-italic text-accent">{headline.slice(idx, idx + accentWord.length)}</span>
      {headline.slice(idx + accentWord.length)}
    </>
  );
}

export default function ServiceLanding() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug ?? "";
  const landing = getLandingBySlug(slug);
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!landing) return;
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get("payment");
    if (payment === "success") {
      toast({ title: "Payment successful", description: "Thank you. We will be in touch shortly to get started." });
      window.history.replaceState({}, "", `/services/${landing.slug}`);
    } else if (payment === "cancelled") {
      toast({ title: "Payment cancelled", description: "Your payment was not completed.", variant: "destructive" });
      window.history.replaceState({}, "", `/services/${landing.slug}`);
    }
  }, [landing?.slug]);

  useEffect(() => {
    setOpenFaq(null);
  }, [slug]);

  if (!landing) return <NotFound />;

  const meta = CATEGORY_META[landing.category];
  const narrative = CATEGORY_NARRATIVE[landing.category];
  const offers = getOffersByCategory(landing.category);
  const testimonial = landing.testimonialOrg ? TESTIMONIAL_EXCERPTS[landing.testimonialOrg] : undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <SEOHead title={landing.seoTitle} description={landing.seoDescription} path={`/services/${landing.slug}`} />
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary relative" data-testid="section-landing-hero">
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
          <div className="container mx-auto px-4 md:px-8 py-20 lg:py-28 max-w-4xl text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-white/50" data-testid="text-landing-eyebrow">
              {meta.label}
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-7 leading-[1.08]" data-testid="text-landing-headline">
              <HeadlineWithAccent headline={landing.headline} accentWord={landing.accentWord} />
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10" data-testid="text-landing-intro">
              {landing.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-landing-book">
                  Book a Consultation
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" className="rounded-none border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-landing-proposal">
                  Request a Proposal
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Problem + benefits */}
        <section className="py-24 bg-background border-b border-border" data-testid="section-landing-problem">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6">
                <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">{narrative.eyebrow}</p>
                <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">Sound familiar?</h2>
                <p className="text-base md:text-lg text-primary font-light leading-relaxed" data-testid="text-landing-problem">
                  {narrative.problem}
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">What you gain</p>
                <ul className="space-y-3">
                  {narrative.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 border-t border-border pt-3" data-testid={`text-landing-benefit-${i}`}>
                      <span aria-hidden="true" className="text-accent leading-relaxed shrink-0">·</span>
                      <span className="text-sm text-primary font-light leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-24 bg-secondary/40 border-b border-border" data-testid="section-landing-included">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">What's Included</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary">
                Everything you need, built and installed.
              </h2>
            </div>
            <ul className="max-w-3xl">
              {landing.included.map((item, i) => (
                <li key={i} className="border-t border-border last:border-b py-5 flex items-baseline gap-4" data-testid={`text-landing-included-${i}`}>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground shrink-0">{`0${i + 1}`}</span>
                  <span className="text-lg md:text-xl text-primary font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing / offers */}
        <section className="py-24 bg-background border-b border-border" data-testid="section-landing-offers">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">Packages and Pricing</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">
                Clear prices. Pay securely online.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                {meta.description} Every fixed-price service can be paid for online by credit card, debit, or PayPal via secure Stripe checkout.
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
                <OfferCard key={offer.id} offer={offer} returnPage={`/services/${landing.slug}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {testimonial && (
          <section className="py-24 bg-primary text-white" data-testid="section-landing-testimonial">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-8 text-white/50 text-center">In Their Words</p>
              <figure className="text-center">
                <span aria-hidden="true" className="text-display text-5xl text-accent/60 leading-none mb-6 block">&ldquo;</span>
                <blockquote className="text-xl md:text-2xl font-heading font-light leading-relaxed text-white/90 mb-8" data-testid="text-landing-testimonial">
                  {testimonial.text}
                </blockquote>
                <figcaption>
                  <div className="w-8 h-px bg-accent mb-4 mx-auto" />
                  <p className="text-sm font-semibold text-white" data-testid="text-landing-testimonial-org">{landing.testimonialOrg}</p>
                  <p className="text-xs text-white/60 mt-0.5">{testimonial.author}</p>
                </figcaption>
              </figure>
              <div className="text-center mt-10">
                <Link
                  href="/results"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:text-accent transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-accent"
                  data-testid="link-landing-results"
                >
                  See All Results and Testimonials
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-24 bg-secondary/40 border-b border-border" data-testid="section-landing-faq">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="mb-12">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">FAQ</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary">Common questions.</h2>
            </div>
            <div>
              {landing.faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} className="border-t border-border last:border-b">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                      aria-expanded={open}
                      data-testid={`button-faq-${i}`}
                    >
                      <span className="text-lg md:text-xl text-primary font-light group-hover:text-accent transition-colors">{faq.q}</span>
                      <span aria-hidden="true" className={`text-2xl text-muted-foreground shrink-0 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {open && (
                      <p className="pb-6 text-sm md:text-base text-muted-foreground font-light leading-relaxed" data-testid={`text-faq-answer-${i}`}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="py-24 bg-background border-b border-border" data-testid="section-landing-related">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">Related Services</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary">Often paired with.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border max-w-4xl">
              {landing.related.map((cat) => {
                const rel = LANDING_PAGES[cat];
                return (
                  <Link
                    key={cat}
                    href={`/services/${rel.slug}`}
                    className="group bg-background hover:bg-primary transition-colors p-8 md:p-10 block"
                    data-testid={`link-related-${cat}`}
                  >
                    <h3 className="text-display text-2xl text-primary group-hover:text-white transition-colors mb-3">
                      {CATEGORY_META[cat].label}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors font-light leading-relaxed">
                      {CATEGORY_META[cat].description}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-10">
              <Link
                href="/services"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
                data-testid="link-landing-all-services"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-24 bg-primary text-white" data-testid="section-landing-cta">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <h2 className="text-display text-4xl md:text-5xl mb-6 text-white">
              Ready to get started?
            </h2>
            <p className="text-lg text-white/70 mb-10 font-light">
              Book a free consultation to talk through your goals, or request a proposal and we will map out the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-landing-cta-book">
                  Book a Consultation
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" className="rounded-none border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-landing-cta-proposal">
                  Request a Proposal
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
