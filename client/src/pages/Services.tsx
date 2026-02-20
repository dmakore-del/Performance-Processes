import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck, FileText, Settings, Info } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      title: "Strategic Planning & Alignment",
      investment: "$7,500 – $25,000+",
      investmentNote: "(Based on 1–3 day workshops, stakeholder interviews, and roadmap development)",
      desc: "We help organizations define clear strategic direction and translate vision into measurable priorities.",
      learnMore: "Many strategies fail not because they lack ambition, but because they lack alignment and execution clarity.\n\nOur process ensures leadership alignment, defined success metrics, and a practical roadmap that connects goals to operational execution.",
      includes: [
        "Vision and mission refinement",
        "Environmental and stakeholder analysis",
        "Strategic objective development",
        "KPI and success metric design",
        "1–3 year strategic roadmap",
        "Leadership alignment workshops"
      ],
      idealFor: "Organizations preparing for growth, restructuring, funding, or transformation.",
      icon: <TrendingUp className="text-accent" />
    },
    {
      title: "Organizational Assessment",
      investment: "$5,000 – $18,000+",
      desc: "Before improvement comes clarity. Our organizational assessment identifies structural gaps and performance barriers.",
      learnMore: "We provide a data-driven diagnostic that highlights what is working, what is misaligned, and where focused improvements will create measurable impact.",
      includes: [
        "Leadership interviews",
        "Organizational structure review",
        "Culture and capability assessment",
        "Process and performance review",
        "Risk and governance analysis",
        "Comprehensive findings report with recommendations"
      ],
      idealFor: "Organizations experiencing performance stagnation, growth challenges, or internal inefficiencies.",
      icon: <Users className="text-accent" />
    },
    {
      title: "Performance Management Design",
      investment: "$6,000 – $20,000+",
      desc: "We design performance systems that connect strategy to accountability.",
      learnMore: "Without measurable indicators and clear ownership, strategy remains theoretical. Our performance management frameworks create visibility, ownership, and structured review processes that drive results.",
      includes: [
        "KPI framework development",
        "Balanced scorecard design",
        "Role-based accountability structures",
        "Performance review templates",
        "Reporting dashboards (conceptual design)",
        "Implementation support"
      ],
      idealFor: "Organizations seeking measurable performance, improved accountability, and strategic execution discipline.",
      icon: <Settings className="text-accent" />
    },
    {
      title: "Leadership Development",
      investment: "$3,500 – $15,000+",
      investmentNote: "(Workshops and cohort programs) | Executive Coaching: $1,500 – $3,500 per month",
      desc: "Strong strategy requires strong leadership. We equip leaders with clarity and confidence.",
      learnMore: "Our leadership development programs focus on practical capability building, not theoretical training.",
      includes: [
        "Leadership competency assessment",
        "Executive and management workshops",
        "Team alignment sessions",
        "One-on-one executive coaching",
        "Accountability and performance leadership training"
      ],
      idealFor: "Growing organizations, new leadership teams, or leaders navigating change.",
      icon: <ShieldCheck className="text-accent" />
    },
    {
      title: "Process Improvement & Documentation",
      investment: "$4,000 – $15,000+",
      desc: "Scalable organizations require documented, efficient processes.",
      learnMore: "We help streamline operations, eliminate inefficiencies, and create structured systems that support consistency and growth.",
      includes: [
        "Process mapping sessions",
        "Workflow analysis",
        "SOP (Standard Operating Procedure) development",
        "Role clarity frameworks",
        "Operational efficiency recommendations"
      ],
      idealFor: "Organizations preparing to scale or improve operational consistency.",
      icon: <FileText className="text-accent" />
    },
    {
      title: "Change Management Support",
      investment: "$5,000 – $20,000+",
      desc: "Change fails when people are not aligned. We support organizations through transitions.",
      learnMore: "We support organizations through transitions with structured change frameworks that prioritize communication, stakeholder engagement, and adoption.",
      includes: [
        "Change readiness assessment",
        "Change strategy design",
        "Stakeholder mapping",
        "Communication plan development",
        "Implementation coaching",
        "Adoption tracking metrics"
      ],
      idealFor: "Organizations undergoing restructuring, digital transformation, leadership transitions, or strategic shifts.",
      icon: <CheckCircle2 className="text-accent" />
    },
    {
      title: "Business Registration & Governance Guidance",
      investment: "$2,500 – $10,000+",
      desc: "We support organizations in establishing compliant, structured foundations.",
      learnMore: "Whether launching a new organization or strengthening governance structures, we provide practical guidance aligned with regulatory requirements.",
      includes: [
        "Business registration support",
        "Governance structure advisory",
        "Board framework design",
        "Policy development guidance",
        "Compliance roadmap"
      ],
      idealFor: "Startups, nonprofits, and growing organizations formalizing governance systems.",
      icon: <ShieldCheck className="text-accent" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white border-b py-20 lg:py-32">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
              Consulting services to <br />
              <span className="text-accent">propel your business</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We provide practical, hands-on support to help you solve your most pressing business challenges.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div 
                  key={i} 
                  className="bg-white p-10 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[350px]"
                  onClick={() => setSelectedService(s)}
                  data-testid={`card-service-${i}`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                      {s.icon}
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-4">{s.desc}</p>
                    <div className="text-accent font-bold text-lg mb-2">{s.investment}</div>
                  </div>
                  <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                    Learn more <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
            {selectedService && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      {selectedService.icon}
                    </div>
                    <DialogTitle className="text-3xl font-heading font-extrabold text-primary">{selectedService.title}</DialogTitle>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 mb-6">
                    <div className="text-accent font-black text-2xl mb-1">Investment: {selectedService.investment}</div>
                    {selectedService.investmentNote && (
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{selectedService.investmentNote}</div>
                    )}
                  </div>
                </DialogHeader>
                <div className="space-y-8 py-4">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Overview</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{selectedService.learnMore}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">What's Included</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedService.includes.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-bold text-primary bg-secondary/30 p-3 rounded-lg">
                          <CheckCircle2 size={16} className="text-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-primary rounded-2xl text-white">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-70">Ideal For</h4>
                    <p className="font-bold italic text-lg leading-relaxed">{selectedService.idealFor}</p>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button 
                      className="rounded-full bg-accent text-white hover:bg-primary h-14 px-12 font-bold uppercase tracking-widest text-sm shadow-lg shadow-accent/20"
                      onClick={() => {
                        window.location.href = `mailto:contact@performanceprocesses.com?subject=Inquiry: ${selectedService.title}`;
                        setSelectedService(null);
                      }}
                    >
                      Inquire about this service
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <section className="bg-primary py-24 text-white">
          <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6 italic">Not sure where to start?</h2>
              <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed">
                Book a free 30-minute discovery call with one of our expert consultants to discuss your goals and how we can help.
              </p>
            </div>
            <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-12 text-lg font-bold uppercase tracking-widest transition-all">
              Book your free call
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
