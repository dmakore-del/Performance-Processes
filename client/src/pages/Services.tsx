import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck, FileText, Settings } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Strategic Planning & Alignment",
      desc: "Define your long-term vision and ensure every department is pulling in the same direction.",
      icon: <TrendingUp className="text-accent" />
    },
    {
      title: "Organizational Assessment",
      desc: "Comprehensive deep-dives into your current structures to identify bottlenecks and growth areas.",
      icon: <Users className="text-accent" />
    },
    {
      title: "Performance Management Design",
      desc: "Systems that connect high-level goals with daily execution and accountability.",
      icon: <Settings className="text-accent" />
    },
    {
      title: "Leadership Development",
      desc: "Customized training and coaching to strengthen your management's core capabilities.",
      icon: <ShieldCheck className="text-accent" />
    },
    {
      title: "Process Improvement & Documentation",
      desc: "Standardize and optimize your workflows for consistent, high-quality results.",
      icon: <FileText className="text-accent" />
    },
    {
      title: "Change Management Support",
      desc: "Navigate complex transitions with minimal disruption and maximum team buy-in.",
      icon: <CheckCircle2 className="text-accent" />
    },
    {
      title: "Business Registration & Governance Guidance",
      desc: "Ensure legal compliance and operational readiness as your organization scales.",
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
                <div key={i} className="bg-white p-10 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                      {s.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                    Learn more <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
