import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const categories = [
    { title: "Strategy", items: ["Strategic Planning", "Organizational Assessment", "Alignment Optimization"] },
    { title: "Execution", items: ["Performance Management", "Process Improvement", "Operational Readiness"] },
    { title: "Leadership", items: ["Leadership Development", "Executive Coaching", "Change Management"] },
    { title: "Governance", items: ["Business Registration", "Compliance Guidance", "Governance Structure"] }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 bg-black text-white italic">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase leading-none mb-8">
              Our <br />
              <span className="text-accent">Services.</span>
            </h1>
            <p className="text-xl max-w-2xl text-gray-400 font-medium leading-relaxed">
              We help leaders clarify strategic direction and strengthen leadership capability to drive long-term impact.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b">
          {categories.map((cat, i) => (
            <div key={i} className="p-12 pwc-grid-border min-h-[400px] flex flex-col justify-between group hover:bg-gray-50 transition-colors">
              <div>
                <h2 className="text-2xl font-heading font-black uppercase italic mb-8">{cat.title}</h2>
                <ul className="space-y-4">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-accent cursor-pointer flex items-center gap-2 group/item">
                      <div className="w-1 h-1 bg-accent scale-0 group-hover/item:scale-100 transition-transform"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                variant="link" 
                className="p-0 h-auto w-fit text-accent font-black uppercase tracking-widest text-xs mt-12 hover:no-underline flex items-center gap-2"
                onClick={() => window.location.href = 'mailto:contact@performanceprocesses.com?subject=Inquiry: ' + cat.title}
              >
                Inquire <ArrowRight size={14} />
              </Button>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
