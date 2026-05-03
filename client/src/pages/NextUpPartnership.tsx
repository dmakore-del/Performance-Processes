import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";

const NEXTUP_URL = "https://nextupcan.ca/get-involved";
const PROMO_CODE = "NEXTPROCESSES";

export default function NextUpPartnership() {
  const eligibility = [
    "Canadian-owned business or registered organization",
    "Founder or majority owner aged 18 to 29",
    "Approved by NextUp Canada through their application process",
    "Ready to invest in a new website",
  ];

  const discountApplies = [
    "Starter Website Package",
    "Business Website Package",
    "Website Conversion Package",
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Apply on NextUp Canada's website",
      description:
        "Visit nextupcan.ca and submit your application. Anyone aged 18 to 29 who meets NextUp's eligibility criteria can apply, no membership required.",
    },
    {
      step: "02",
      title: "Receive your discount code from NextUp",
      description:
        "Once NextUp approves your application, they will issue you the discount code that unlocks 40% off our website services.",
    },
    {
      step: "03",
      title: "Apply the code at checkout",
      description: `Enter the code ${PROMO_CODE} on any website package on our Services page. The 40% discount is applied instantly at checkout.`,
    },
  ];

  const stats = [
    { label: "Discount", value: "40% off" },
    { label: "Eligible Founders", value: "Ages 18 to 29" },
    { label: "Applies to", value: "Website services" },
    { label: "Coverage", value: "Canada-wide" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <SEOHead
        title="NextUp Canada Partnership , 40% Off Website Services for Young Canadian Founders"
        description="Performance Processes partners with NextUp Canada to support youth-owned businesses with a 40% discount on our website services. Apply on NextUp's website to receive your discount code."
        path="/nextup-partnership"
      />
      <Navbar />
      <main className="flex-grow">
        <PageHero
          title={
            <>
              <span className="text-accent">NextUp</span> Canada Partnership
            </>
          }
          subtitle="40% off our website services for Canadian founders aged 18 to 29 approved through NextUp Canada."
        />

        <section className="py-16 bg-white" data-testid="section-stats">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-[#F8FAFC] rounded-2xl p-6 text-center border border-border"
                  data-testid={`stat-${i}`}
                >
                  <div className="text-2xl font-extrabold text-primary mb-1">{s.value}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" data-testid="section-overview">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-6">
                Why we partner with NextUp
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                NextUp Canada champions young Canadian entrepreneurs through community,
                programming, and resources that help them launch and grow real businesses.
                Performance Processes shares that mission. Through this partnership, every
                NextUp-approved founder under 30 gets 40% off our website services, the same
                websites we deliver to enterprise clients.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The goal is simple: remove cost as a barrier so the next generation of
                Canadian founders can launch with a professional website that helps their
                business grow.
              </p>
              <a
                href={NEXTUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-primary transition-colors"
                data-testid="link-nextup-external"
              >
                Apply on NextUp Canada
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" data-testid="section-eligibility">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-border" data-testid="card-eligibility">
                <h3 className="text-xl font-bold text-primary mb-5">Who qualifies</h3>
                <ul className="space-y-3">
                  {eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-3" data-testid={`eligibility-${i}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span className="text-sm text-primary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
                  NextUp Canada has no formal membership. Anyone meeting the eligibility
                  criteria can apply directly on their website.
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-border" data-testid="card-coverage">
                <h3 className="text-xl font-bold text-primary mb-5">What the 40% applies to</h3>
                <ul className="space-y-3">
                  {discountApplies.map((item, i) => (
                    <li key={i} className="flex items-start gap-3" data-testid={`coverage-${i}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span className="text-sm text-primary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
                  The discount applies to website services only. Marketing, CRM, systems,
                  training, and support services are not eligible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" data-testid="section-how-it-works">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                  How it works
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Three steps to claim your 40% discount on a website package.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {howItWorks.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-7 border border-border hover:shadow-md hover:border-accent/30 transition-all"
                    data-testid={`step-${i}`}
                  >
                    <div className="text-4xl font-black text-accent/30 mb-3">{step.step}</div>
                    <h3 className="text-lg font-heading font-extrabold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              Ready to claim your NextUp discount?
            </h2>
            <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
              Start by applying on NextUp Canada. Once approved, use code{" "}
              <span className="font-bold text-accent">{PROMO_CODE}</span> at checkout to
              receive 40% off any website package.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={NEXTUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm"
                data-testid="button-apply-nextup"
              >
                Apply on NextUp Canada
                <ExternalLink size={16} />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm"
                data-testid="button-view-services"
              >
                Browse Website Services
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
