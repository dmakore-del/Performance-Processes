import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Approach() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white border-b py-20 lg:py-32">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
              A collaborative, <span className="text-accent italic">results-focused</span> approach
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our methodology is designed to ensure sustainable performance improvements and maximum ROI.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="space-y-24">
              {[
                { 
                  num: "01", 
                  title: "Discovery & Assessment", 
                  desc: "We start by understanding your unique challenges and auditing your current performance systems to identify gaps." 
                },
                { 
                  num: "02", 
                  title: "Strategic Alignment", 
                  desc: "We work with your leadership team to clarify strategic direction and ensure it's communicated effectively throughout the organization." 
                },
                { 
                  num: "03", 
                  title: "Implementation & Training", 
                  desc: "Our experts provide hands-on support to implement new systems and strengthen leadership capabilities." 
                },
                { 
                  num: "04", 
                  title: "Monitoring & Optimization", 
                  desc: "We establish continuous feedback loops and performance metrics to ensure long-term, sustainable impact." 
                }
              ].map((step, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
                  <div className="text-8xl font-black text-accent/20 leading-none italic">{step.num}</div>
                  <div className="md:pt-4">
                    <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6 italic">{step.title}</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">{step.desc}</p>
                  </div>
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
