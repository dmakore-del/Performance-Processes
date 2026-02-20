import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 bg-[#2e2e2e] text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="inline-block bg-accent text-primary font-bold text-xs uppercase tracking-[0.2em] px-3 py-1 mb-8">
              Perspective
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase italic leading-none mb-8">
              About <br />
              <span className="text-accent">Us.</span>
            </h1>
            <p className="text-xl max-w-2xl text-gray-300 font-medium leading-relaxed">
              Redefining how organizations align strategy with execution for sustainable growth.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-black uppercase italic mb-12 ey-yellow-underline pb-4 inline-block">The Performance Processes Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <p className="text-xl font-medium leading-relaxed italic">
                Performance Processes is a registered business consulting firm born from a simple observation: most strategic plans fail not because of poor vision, but because of poor alignment.
              </p>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  We support leaders in clarifying strategic direction, strengthening leadership capability, and optimizing performance systems that connect goals with execution.
                </p>
                <p>
                  Our collaborative, results-focused approach ensures sustainable performance improvements that drive clarity, accountability, and long-term impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary border-y">
           <div className="container mx-auto px-4 md:px-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: "Our Mission", desc: "To empower organizations to reach their full potential through strategic alignment and leadership excellence." },
                 { title: "Our Vision", desc: "To be the premier partner for organizations navigating complex transformations." },
                 { title: "Our Values", desc: "Integrity, collaboration, and a relentless focus on delivering measurable value." }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-12 border border-border">
                   <h3 className="text-2xl font-black uppercase italic mb-6 text-primary">{item.title}</h3>
                   <p className="text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                 </div>
               ))}
             </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
