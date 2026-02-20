import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";

export default function Insights() {
  const insights = [
    { title: "Trust: The new performance metric", date: "FEB 2026", cat: "TRUST" },
    { title: "The 2026 CEO Survey Results", date: "JAN 2026", cat: "STRATEGY" },
    { title: "Scaling leadership in automated environments", date: "DEC 2025", cat: "LEADERSHIP" },
    { title: "Governance as a growth driver", date: "NOV 2025", cat: "GOVERNANCE" },
    { title: "The impact of process optimization on scale", date: "OCT 2025", cat: "EXECUTION" },
    { title: "Alignment: The invisible competitive advantage", date: "SEP 2025", cat: "STRATEGY" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 border-b">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-5xl md:text-7xl font-heading font-black uppercase italic leading-none mb-12">
              Latest <br />
              <span className="text-accent">Insights.</span>
            </h1>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2">
          {insights.map((insight, i) => (
            <div key={i} className="p-12 md:p-16 pwc-grid-border group cursor-pointer hover:bg-black hover:text-white transition-all duration-500 min-h-[350px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:text-accent">{insight.cat}</span>
                  <span className="text-[10px] font-bold opacity-40">{insight.date}</span>
                </div>
                <h2 className="text-3xl font-heading font-extrabold uppercase italic leading-tight group-hover:translate-x-4 transition-transform duration-500">
                  {insight.title}
                </h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest mt-12">
                <span>View Insight</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
