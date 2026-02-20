import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import { Link } from "wouter";
import heroImg from "@/assets/images/ey-style-hero.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* EY Style Hero Section */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden bg-[#2e2e2e]">
          <div className="absolute inset-0 opacity-40">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/assets/videos/hero-background.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 py-24">
            <div className="max-w-3xl text-white">
              <div className="inline-block bg-accent text-primary font-bold text-xs uppercase tracking-[0.2em] px-3 py-1 mb-8">
                Consulting Services
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-black mb-8 leading-[1.05] tracking-tight">
                Aligning Strategy <br />
                <span className="text-accent italic">With Impact.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-2xl font-medium">
                We help leaders bridge the gap between vision and execution to drive long-term value.
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <Link href="/services">
                  <Button className="rounded-full bg-accent text-primary hover:bg-white transition-all font-bold px-10 py-7 text-lg uppercase tracking-wider">
                    Our Services
                  </Button>
                </Link>
                <button className="flex items-center gap-3 font-bold text-white hover:text-accent transition-colors">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <Play size={20} fill="currentColor" />
                  </div>
                  Watch our story
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* EY Style Featured Grid */}
        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Strategic Planning & Alignment", cat: "Strategy", img: "https://images.unsplash.com/photo-1454165833767-027508659d41?auto=format&fit=crop&q=80&w=800" },
              { title: "Performance Management Design", cat: "Optimization", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
              { title: "Leadership Development", cat: "People", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" }
            ].map((card, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 bg-accent text-primary px-4 py-2 font-bold text-[10px] uppercase tracking-widest">{card.cat}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors flex justify-between items-start">
                  {card.title}
                  <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                </h3>
                <p className="text-muted-foreground leading-relaxed">Helping organizations clarify direction and strengthen leadership capability.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="bg-secondary py-24 border-y">
          <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
               <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight ey-yellow-underline pb-4">
                 How Performance Processes <br />
                 is redefining growth.
               </h2>
               <p className="text-xl text-muted-foreground mb-8 leading-relaxed italic">
                 "Our collaborative, results-focused approach ensures sustainable performance improvements that drive clarity and accountability."
               </p>
               <Button className="rounded-full bg-primary text-white hover:bg-accent hover:text-primary transition-all font-bold px-10 h-14">
                 Our Approach
               </Button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-8">
              {[
                { stat: "95%", label: "Strategic Alignment" },
                { stat: "120+", label: "Projects Completed" },
                { stat: "24/7", label: "Governance Support" },
                { stat: "15+", label: "Years Excellence" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 border-l-4 border-accent shadow-sm">
                  <div className="text-4xl font-black text-primary mb-2 italic">{stat.stat}</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EY Minimalist Footer CTA */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
             <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight uppercase italic italic">
               Ready to start your <br /> 
               <span className="text-accent underline decoration-8 underline-offset-8">transformation?</span>
             </h2>
             <Link href="/contact">
               <Button className="rounded-full bg-primary text-white hover:bg-accent hover:text-primary transition-all font-bold px-16 h-16 text-lg">
                 Get in touch
               </Button>
             </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
