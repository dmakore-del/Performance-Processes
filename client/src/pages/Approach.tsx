import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Approach() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 border-b bg-black text-white italic">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase leading-none mb-8">
              Our <br />
              <span className="text-accent">Approach.</span>
            </h1>
            <p className="text-xl max-w-2xl text-gray-400 font-medium leading-relaxed">
              Collaborative, results-focused, and designed for sustainable impact.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Collaborative", desc: "We work as partners, not just consultants, ensuring that solutions are built with your team's buy-in." },
              { title: "Strategic", desc: "Every action is tied to your long-term vision and measurable strategic goals." },
              { title: "Sustainable", desc: "We build systems and capabilities that last long after our engagement ends." }
            ].map((item, i) => (
              <div key={i} className="p-12 border border-border flex flex-col justify-between min-h-[300px] hover:bg-accent hover:text-white transition-all duration-300">
                <h3 className="text-2xl font-heading font-black uppercase italic leading-tight">{item.title}</h3>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80 mt-8">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
