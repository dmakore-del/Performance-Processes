import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import { OFFERS, CATEGORY_META, CATEGORY_NARRATIVE, LANDING_PAGES, type ServiceCategory } from "@shared/offers";
import { useToast } from "@/hooks/use-toast";
import geoPatternImg from "@assets/generated/geo-pattern-new.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CATEGORY_ORDER: ServiceCategory[] = ["website", "marketing", "crm", "systems", "hr-recruiting", "support"];

const HOW_WE_WORK = [
  {
    step: "01",
    title: "Discovery and Consultation",
    description: "A conversation about your goals, your constraints, and where growth is getting stuck. No pitch, just clarity on whether we can help.",
  },
  {
    step: "02",
    title: "Business Assessment",
    description: "We review how your business attracts, converts, and delivers today, and identify the gaps costing you time, money, or momentum.",
  },
  {
    step: "03",
    title: "Strategy and Proposal",
    description: "You receive a clear recommendation, the services that fit, what they cost, and the outcomes you should expect from each.",
  },
  {
    step: "04",
    title: "Implementation and Ongoing Support",
    description: "We build, install, and hand over working systems, then stay available to measure, refine, and improve them over time.",
  },
];

const INDUSTRIES = [
  "Property and facilities management",
  "Non-profit and community organizations",
  "Immigration and professional services",
  "Small and emerging businesses across Canada",
];

const WHY_CHOOSE = [
  {
    title: "Strategic",
    description: "We don't sell one-off deliverables. Every service installs part of a larger growth infrastructure, so each investment compounds instead of sitting in isolation.",
  },
  {
    title: "Customized",
    description: "Systems are built around how your business actually operates, your workflows, your team, and your clients, not forced into a generic template.",
  },
  {
    title: "Results-driven",
    description: "Every engagement is tied to outcomes you can see: more leads, faster follow-up, cleaner operations, and KPIs that tell you what's working.",
  },
];

const CASE_RESULT = {
  client: "TrueNorth Property & Facilities",
  system: "Operations System",
  challenge:
    "Manual processes and disconnected systems were creating inefficiencies in employee management, client communications, and operational reporting as the organization expanded.",
  solution:
    "We designed and developed a custom Client Portal and Human Resource Management system tailored to their workflows, centralizing records, automating administration, and giving management real-time insight.",
  result:
    "The organization now operates with greater efficiency, improved information accessibility, and stronger operational control, with leadership focused on strategic growth rather than administrative overhead.",
};

const TESTIMONIALS = [
  {
    text: "Performance Processes played a key role in helping us bring our digital vision to life. Their team developed a modern, user-friendly website that effectively communicates our mission and engages youth, donors, and community partners.",
    org: "NextUp Foundation for Canadian Youth",
    author: "Leadership Team",
  },
  {
    text: "Their ability to understand our operational requirements and translate them into practical, efficient digital solutions was exceptional. The systems they delivered have streamlined workflows, improved information accessibility, and enhanced overall organizational efficiency.",
    org: "TrueNorth Property & Facilities",
    author: "Management Team",
  },
  {
    text: "Working with Performance Processes on our process mapping initiative provided tremendous value to our organization. They helped us clearly document, analyze, and optimize our key operational processes, giving us greater visibility into how work flows across the business.",
    org: "Ubuntu Immigration",
    author: "Leadership Team",
  },
];

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
        title="Services That Improve Performance and Accelerate Growth | Performance Processes"
        description="Websites, marketing systems, CRM, business systems, HR, and ongoing growth support that improve performance, increase profitability, and accelerate growth. Clear prices, secure checkout, Toronto-based."
        path="/services"
      />
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary overflow-hidden relative min-h-[460px] lg:min-h-[560px] flex items-center" data-testid="section-services-hero">
          <div className="absolute inset-0 z-0">
            <img src={geoPatternImg} alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-20 lg:py-28 text-center max-w-4xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-7 leading-[1.08]">
              Solutions That Improve Performance, Increase Profitability, and{" "}
              <span className="text-display-italic text-accent">Accelerate</span> Growth
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
              Performance Processes helps organizations streamline operations, adopt modern technology,
              improve decision-making, and build scalable systems, so growth becomes structured instead of stressful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-hero-book-consultation">
                  Book a Consultation
                </Button>
              </a>
              <a href="#cat-packages">
                <Button variant="outline" className="rounded-none border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-hero-explore-services">
                  Explore Our Services
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Jump to category */}
        <section className="py-12 bg-secondary/40 border-b border-border">
          <div className="container mx-auto px-4 md:px-8">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground text-center">Jump to a Category</p>
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

        {/* Headline packages */}
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

        {/* Bundles */}
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

        {/* Category sections with outcome narratives */}
        {CATEGORY_ORDER.map((cat, idx) => {
          const offers = OFFERS.filter((o) => o.category === cat);
          if (offers.length === 0) return null;
          const meta = CATEGORY_META[cat];
          const narrative = CATEGORY_NARRATIVE[cat];
          const isAlt = idx % 2 === 1;
          return (
            <section
              key={cat}
              id={`cat-${cat}`}
              className={`py-24 ${isAlt ? "bg-background" : "bg-secondary/40"}`}
              data-testid={`section-${cat}`}
            >
              <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
                  <div className="lg:col-span-6 flex flex-col gap-4">
                    <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">{`0${idx + 1}`}</p>
                    <h2 className="text-display text-4xl md:text-5xl text-primary">
                      {meta.label}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                      {meta.description}
                    </p>
                    <div className="mt-2">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{narrative.eyebrow}</p>
                      <p className="text-sm md:text-base text-primary font-light leading-relaxed" data-testid={`text-problem-${cat}`}>
                        {narrative.problem}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">What you gain</p>
                    <ul className="space-y-3 mb-8">
                      {narrative.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 border-t border-border pt-3" data-testid={`text-benefit-${cat}-${i}`}>
                          <span aria-hidden="true" className="text-accent leading-relaxed shrink-0">·</span>
                          <span className="text-sm text-primary font-light leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <Link
                        href={`/services/${LANDING_PAGES[cat].slug}`}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-accent hover:text-primary transition-colors underline underline-offset-4 decoration-accent/40 hover:decoration-primary"
                        data-testid={`link-learn-more-${cat}`}
                      >
                        Learn More
                      </Link>
                      <a
                        href={BOOKINGS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
                        data-testid={`link-consult-${cat}`}
                      >
                        Talk to an Expert
                      </a>
                      <Link
                        href="/contact"
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
                        data-testid={`link-proposal-${cat}`}
                      >
                        Request a Proposal
                      </Link>
                    </div>
                  </div>
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

        {/* Why choose */}
        <section className="py-24 bg-primary text-white" data-testid="section-why-choose">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-white/50">Why Performance Processes</p>
              <h2 className="text-display text-4xl md:text-5xl mb-5 text-white">
                Built to deliver outcomes, not deliverables.
              </h2>
              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                Founded in 2023 and based in Toronto, Performance Processes builds and installs the websites,
                systems, and processes that small and emerging businesses run on.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 border border-white/15">
              {WHY_CHOOSE.map((item, i) => (
                <div key={i} className="bg-primary p-8 md:p-10" data-testid={`card-why-${i}`}>
                  <div className="w-8 h-px bg-accent mb-6" />
                  <h3 className="text-display text-2xl text-white mb-4">{item.title}</h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client results */}
        <section className="py-24 bg-background border-b border-border" data-testid="section-client-results">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">Client Results</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">
                Real work, real outcomes.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                {CASE_RESULT.client}
                <span className="mx-2 text-border">·</span>
                <span className="text-accent">{CASE_RESULT.system}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border mb-10">
              <div className="bg-background p-8 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Client Challenge</p>
                <p className="text-sm text-primary font-light leading-relaxed" data-testid="text-case-challenge">{CASE_RESULT.challenge}</p>
              </div>
              <div className="bg-background p-8 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Our Solution</p>
                <p className="text-sm text-primary font-light leading-relaxed" data-testid="text-case-solution">{CASE_RESULT.solution}</p>
              </div>
              <div className="bg-background p-8 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Measurable Result</p>
                <p className="text-sm text-primary font-light leading-relaxed" data-testid="text-case-result">{CASE_RESULT.result}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border mb-10">
              {TESTIMONIALS.map((t, i) => (
                <figure key={i} className="bg-background p-8 md:p-10 flex flex-col h-full" data-testid={`card-testimonial-${i}`}>
                  <span aria-hidden="true" className="text-display text-4xl text-accent/50 leading-none mb-4 block">&ldquo;</span>
                  <blockquote className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-grow" data-testid={`text-testimonial-quote-${i}`}>
                    {t.text}
                  </blockquote>
                  <figcaption className="mt-auto border-t border-border pt-5">
                    <div className="w-8 h-px bg-accent mb-3" />
                    <p className="text-sm font-semibold text-primary" data-testid={`text-testimonial-org-${i}`}>{t.org}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.author}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/results"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
                data-testid="link-all-results"
              >
                See All Results and Testimonials
              </Link>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="py-24 bg-secondary/40" data-testid="section-how-we-work">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">How We Work</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">
                A clear path from conversation to results.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
              {HOW_WE_WORK.map((step, i) => (
                <div key={i} className="bg-background p-8 md:p-10" data-testid={`card-step-${i}`}>
                  <div className="text-display numeral-outline text-5xl text-primary/30 mb-6">{step.step}</div>
                  <h3 className="text-display text-xl text-primary mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none bg-primary text-white hover:bg-accent h-12 px-8 font-semibold text-xs uppercase tracking-[0.2em]" data-testid="button-how-schedule">
                  Schedule a Free Consultation
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-24 bg-background border-b border-border" data-testid="section-industries">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">Industries We Serve</p>
                <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">
                  Sectors we know first-hand.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                  We work where we have delivered real results, and our productized model fits any
                  small or emerging business that needs structure to grow.
                </p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
                <ul>
                  {INDUSTRIES.map((industry, i) => (
                    <li key={i} className="border-t border-border last:border-b py-5 flex items-baseline gap-4" data-testid={`text-industry-${i}`}>
                      <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground shrink-0">{`0${i + 1}`}</span>
                      <span className="text-lg md:text-xl text-primary font-light">{industry}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NextUp partnership */}
        <section className="py-24 bg-secondary/40" data-testid="section-nextup">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-background border border-border">
              <div className="p-10 md:p-14 border-l-2 border-accent">
                <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">Partnership</p>
                <h2 className="text-display text-3xl md:text-4xl text-primary mb-6">
                  NextUp Foundation for Canadian Youth Partnership
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-3xl font-light">
                  Anyone currently enrolled in a NextUp Foundation for Canadian Youth program, or who has donated $500 or more to the foundation in the past year, receives 40% off our website services. Verification is coordinated by Performance Processes and the NextUp Foundation. Once confirmed, enter your code at checkout on any website package.
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

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white" data-testid="section-final-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display text-4xl md:text-5xl mb-6 text-white">
                Ready to take the next step?
              </h2>
              <p className="text-lg text-white/70 mb-10 font-light">
                Schedule a free consultation to talk through fit, request a proposal, or pick a package and check out today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-none bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-book-strategy-call">
                    Schedule a Free Consultation
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-none border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-contact">
                    Request a Proposal
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
