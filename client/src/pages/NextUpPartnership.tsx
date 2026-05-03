import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Sparkles,
  Percent,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react";

const NEXTUP_URL = "https://nextupcan.ca/get-involved";
const BOOKINGS_URL =
  "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function NextUpPartnership() {
  const eligibility = [
    "Canadian-owned business or registered organization",
    "Founder or majority owner aged 18,29",
    "Connected to NextUp Canada (member, alumni, or referral)",
    "Ready to invest in growth, systems, or marketing",
  ];

  const discountApplies = [
    "Website packages (Starter, Business, and Conversion)",
    "Marketing services (Starter, Social, Campaign, Growth Engine)",
    "CRM setup and lead tracking systems",
    "Business system audits and Foundation Sprints",
    "Training and implementation programs",
    "Monthly support retainers",
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Verify your NextUp connection",
      description:
        "Confirm you're a NextUp Canada member, alumni, or referral. We'll quickly verify with the NextUp team.",
    },
    {
      step: "02",
      title: "Book a discovery call",
      description:
        "Tell us about your business, your goals, and what you'd like to invest in. No pressure, just clarity.",
    },
    {
      step: "03",
      title: "Receive your 40% partner pricing",
      description:
        "Once verified, every applicable service is offered at 40% off our published rates.",
    },
  ];

  const stats = [
    { label: "Discount", value: "40% off", icon: <Percent size={20} /> },
    { label: "Eligible Founders", value: "Ages 18,29", icon: <Users size={20} /> },
    { label: "Coverage", value: "Canada-wide", icon: <MapPin size={20} /> },
    { label: "Availability", value: "Year-round", icon: <Calendar size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <SEOHead
        title="NextUp Canada Partnership , 40% Off for Young Canadian Founders"
        description="Performance Processes partners with NextUp Canada to support youth-owned businesses with a 40% discount on websites, marketing, CRM, training, and ongoing growth support."
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
          subtitle="Supporting the next generation of Canadian founders with 40% off our productized services for youth-owned businesses."
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
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 text-accent">
                    {s.icon}
                  </div>
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
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Sparkles className="text-accent" size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary">
                  Why we partner with NextUp
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                NextUp Canada champions young Canadian entrepreneurs through community,
                programming, and resources that help them launch and grow real businesses.
                Performance Processes shares that mission. Through this partnership, every
                NextUp-connected founder under 30 gets a meaningful discount on the same
                websites, marketing, CRM, and systems work we deliver to enterprise clients.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The goal is simple: remove cost as a barrier so the next generation of
                Canadian founders can build the structure, presence, and growth engine
                their business deserves.
              </p>
              <a
                href={NEXTUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-primary transition-colors"
                data-testid="link-nextup-external"
              >
                Visit NextUp Canada
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" data-testid="section-eligibility">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-border" data-testid="card-eligibility">
                <h3 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
                  <CheckCircle2 className="text-accent" size={22} />
                  Who qualifies
                </h3>
                <ul className="space-y-3">
                  {eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-3" data-testid={`eligibility-${i}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span className="text-sm text-primary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-border" data-testid="card-coverage">
                <h3 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
                  <Percent className="text-accent" size={22} />
                  What the 40% applies to
                </h3>
                <ul className="space-y-3">
                  {discountApplies.map((item, i) => (
                    <li key={i} className="flex items-start gap-3" data-testid={`coverage-${i}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span className="text-sm text-primary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
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
                  Three quick steps to claim your NextUp partner pricing.
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
            <Sparkles className="text-accent mx-auto mb-4" size={32} />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              Ready to claim your NextUp discount?
            </h2>
            <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
              Book a no-pressure discovery call. We'll verify your NextUp connection and
              walk you through how the 40% partner pricing applies to the services you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={BOOKINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm"
                data-testid="button-book-call"
              >
                Book a Discovery Call
                <ArrowRight size={16} />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm"
                data-testid="button-view-services"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
