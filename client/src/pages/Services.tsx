import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Strategic Planning & Alignment",
      description: "We help leaders clarify their vision and translate it into actionable strategic roadmaps that ensure every level of the organization is pulling in the same direction.",
      features: ["Vision & Mission Clarification", "Strategic Roadmap Design", "Goal Setting (OKR/KPI)", "Resource Alignment"]
    },
    {
      title: "Organizational Assessment",
      description: "A comprehensive deep-dive into your current structures, processes, and culture to identify hidden inefficiencies and areas for high-impact growth.",
      features: ["Performance Audit", "Structural Analysis", "Cultural Assessment", "Efficiency Benchmarking"]
    },
    {
      title: "Performance Management Design",
      description: "Moving beyond traditional reviews to dynamic systems that connect daily execution with high-level strategic outcomes.",
      features: ["Execution Tracking", "Feedback Loop Design", "Incentive Alignment", "Outcome Mapping"]
    },
    {
      title: "Leadership Development",
      description: "Strengthening the core capability of your leaders to navigate complexity, lead through change, and inspire high-performing teams.",
      features: ["Executive Coaching", "Leadership Workshops", "Succession Planning", "Competency Frameworks"]
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 bg-[#2e2e2e] text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="inline-block bg-accent text-primary font-bold text-xs uppercase tracking-[0.2em] px-3 py-1 mb-8">
              Expertise
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase italic leading-none mb-8">
              Our <br />
              <span className="text-accent">Services.</span>
            </h1>
            <p className="text-xl max-w-2xl text-gray-300 font-medium leading-relaxed">
              Tailored consulting solutions to help your organization reach its full potential.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, i) => (
              <div key={i} className="p-12 border border-border group hover:border-accent transition-all duration-500 flex flex-col justify-between ey-yellow-underline pb-12">
                <div>
                  <h2 className="text-3xl font-black uppercase italic mb-6 group-hover:text-accent transition-colors">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                        <div className="w-1.5 h-1.5 bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="rounded-full bg-primary text-white hover:bg-accent hover:text-primary transition-all font-bold px-8 h-12 mt-12 w-fit"
                  onClick={() => window.location.href = 'mailto:contact@performanceprocesses.com?subject=Service Inquiry: ' + service.title}
                >
                  Discuss project <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
