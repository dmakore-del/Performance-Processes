import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface CaseStudyPlaceholder {
  industry: string;
  system: string;
  challenge: string;
  metrics: { label: string }[];
}

const CASE_STUDIES: CaseStudyPlaceholder[] = [
  {
    industry: "Property & Facilities",
    system: "Operations System",
    challenge: "Documenting workflows and building the SOPs and KPI tracking needed to run consistently across a growing team.",
    metrics: [
      { label: "Result coming soon" },
      { label: "Result coming soon" },
    ],
  },
  {
    industry: "Production & Media",
    system: "Growth System",
    challenge: "Installing a website, CRM, and follow-up workflow so no inbound lead falls through the cracks.",
    metrics: [
      { label: "Result coming soon" },
      { label: "Result coming soon" },
    ],
  },
  {
    industry: "Home Services",
    system: "Team Performance System",
    challenge: "Building hiring systems, onboarding, and a performance structure to support a scaling team.",
    metrics: [
      { label: "Result coming soon" },
      { label: "Result coming soon" },
    ],
  },
  {
    industry: "Nonprofit",
    system: "Ongoing Performance Support",
    challenge: "Providing continuous strategy, KPI review, and optimization to keep systems improving month over month.",
    metrics: [
      { label: "Result coming soon" },
      { label: "Result coming soon" },
    ],
  },
];

export default function Results() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead
        title="Results & Case Studies | Performance Processes"
        description="Real outcomes from the systems we build for small and emerging businesses. Case studies and client results from Performance Processes."
        path="/results"
      />
      <Navbar />

      <main className="flex-grow">
        <PageHero
          title={<>Results that <span className="text-accent">compound.</span></>}
          subtitle="Real outcomes from the systems we build and run for small and emerging businesses. We publish only authentic client results, these case studies are being prepared with our partners."
        />

        {/* Notice banner, clearly labelled placeholders */}
        <section className="py-6 bg-accent/10 border-b border-accent/20" data-testid="section-results-notice">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-center gap-3 text-center">
              <p className="text-sm font-semibold text-primary">
                Case studies coming soon, we publish only verified, authentic client results.
              </p>
            </div>
          </div>
        </section>

        {/* Case study placeholders */}
        <section className="py-20 bg-[#FAFAFA]" data-testid="section-case-studies">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-3">Case Studies</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-3">
                The systems behind the outcomes
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Each engagement leaves behind infrastructure our clients keep. Detailed results from these projects will be published here as they are finalized with our partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((cs, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div
                    className="relative flex flex-col h-full rounded-2xl border border-border bg-white p-8"
                    data-testid={`card-case-study-${i}`}
                  >
                    <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-[0.2em] bg-secondary text-muted-foreground px-3 py-1 rounded-full">
                      Coming soon
                    </span>
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-accent mb-2">
                      {cs.industry}
                    </p>
                    <h3 className="text-xl font-extrabold text-primary mb-1.5" data-testid={`text-case-system-${i}`}>
                      {cs.system}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{cs.challenge}</p>

                    <div className="mt-auto grid grid-cols-2 gap-4 border-t border-border pt-6">
                      {cs.metrics.map((m, j) => (
                        <div key={j} data-testid={`metric-case-${i}-${j}`}>
                          <div className="text-2xl font-black text-primary/20">·</div>
                          <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials placeholder */}
        <section className="py-20 bg-white border-t" data-testid="section-testimonials">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-3">In Their Words</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-3">
                Client stories, in progress
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                We're gathering quotes and results directly from the businesses we work with. Verified testimonials will appear here.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex flex-col h-full rounded-2xl border border-dashed border-border bg-[#FAFAFA] p-8"
                  data-testid={`card-testimonial-placeholder-${i}`}
                >
                  <span aria-hidden="true" className="text-4xl font-serif text-accent/30 leading-none mb-4 block">&ldquo;</span>
                  <p className="text-sm text-muted-foreground/70 italic leading-relaxed mb-6">
                    "A verified client testimonial will be published here once confirmed with our partner."
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-border" />
                    <div>
                      <div className="h-3 w-24 bg-border rounded mb-1.5" />
                      <div className="h-2.5 w-16 bg-border/60 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-white" data-testid="section-results-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">
                Want results like these?
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Book a strategy call to talk through your goals, or explore the packages we build and install.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider w-full sm:w-auto" data-testid="button-results-book">
                    Book a Strategy Call
                  </Button>
                </a>
                <Link href="/services">
                  <Button variant="outline" className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider w-full sm:w-auto" data-testid="button-results-services">
                    Explore Packages
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
