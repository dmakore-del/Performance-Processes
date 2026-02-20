import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Approach() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 bg-[#2e2e2e] text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="inline-block bg-accent text-primary font-bold text-xs uppercase tracking-[0.2em] px-3 py-1 mb-8">
              Methodology
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase italic leading-none mb-8">
              Our <br />
              <span className="text-accent">Approach.</span>
            </h1>
            <p className="text-xl max-w-2xl text-gray-300 font-medium leading-relaxed">
              A collaborative, evidence-based methodology designed for high-stakes transformation.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
           <div className="space-y-24">
             {[
               { num: "01", title: "Discovery & Assessment", desc: "We begin by deep-diving into your current operations, culture, and strategic goals to understand the baseline." },
               { num: "02", title: "Collaborative Design", desc: "We work alongside your leadership team to build tailored strategies that have full organizational buy-in." },
               { num: "03", title: "Implementation Support", desc: "We don't just hand over a report; we stay involved to ensure that new systems and processes are correctly integrated." },
               { num: "04", title: "Measurement & Refinement", desc: "We track outcomes against KPIs and refine the approach to ensure long-term sustainability." }
             ].map((step, i) => (
               <div key={i} className="flex flex-col md:flex-row gap-12 items-start group">
                 <div className="text-8xl font-black text-gray-100 group-hover:text-accent transition-colors leading-none italic">{step.num}</div>
                 <div className="md:pt-4">
                   <h3 className="text-4xl font-black uppercase italic mb-6 ey-yellow-underline pb-2">{step.title}</h3>
                   <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">{step.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
