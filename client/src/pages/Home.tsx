import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Search, Globe } from "lucide-react";
import heroImg from "@/assets/images/pwc-style-hero.jpg";

export default function Home() {
  const featuredInsights = [
    { title: "Building trust in the age of AI", category: "Trust", color: "bg-accent" },
    { title: "The 2026 CEO Survey: Performance Redefined", category: "Strategy", color: "bg-black" },
    { title: "Scaling impact through process optimization", category: "Execution", color: "bg-gray-200 text-black" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* Top Bar - PwC Style Mini Nav */}
        <div className="bg-white border-b hidden md:block">
          <div className="container mx-auto px-4 md:px-8 h-10 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent">Global</a>
              <a href="#" className="hover:text-accent">Services</a>
              <a href="#" className="hover:text-accent">Industries</a>
            </div>
            <div className="flex gap-6 items-center">
              <span className="flex items-center gap-1"><Globe size={12} /> EN</span>
              <Search size={14} className="cursor-pointer hover:text-accent" />
            </div>
          </div>
        </div>

        {/* Hero Section - PwC Split Style */}
        <section className="relative flex flex-col md:flex-row min-h-[600px] border-b">
          <div className="md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-white">
            <div className="w-16 h-2 bg-accent mb-12"></div>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-[1.1] mb-8 text-black uppercase italic">
              Strategy <br />
              <span className="text-accent">Simplified.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed">
              We help organizations align strategic direction with measurable execution through a collaborative, results-focused approach.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="rounded-none bg-black hover:bg-accent text-white font-bold uppercase tracking-widest text-xs px-10 h-14 transition-all">
                Explore our impact
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative bg-gray-100">
            <img 
              src={heroImg} 
              alt="Professional Strategy" 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </section>

        {/* Featured Grid - PwC Card Style */}
        <section className="grid grid-cols-1 md:grid-cols-3">
          {featuredInsights.map((insight, i) => (
            <div key={i} className={`p-12 md:p-16 flex flex-col justify-between min-h-[400px] pwc-grid-border group cursor-pointer ${insight.color === 'bg-black' ? 'bg-black text-white' : insight.color === 'bg-accent' ? 'bg-accent text-white' : 'bg-white text-black'}`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest mb-4 block opacity-80">{insight.category}</span>
                <h2 className="text-3xl font-heading font-bold leading-tight group-hover:underline underline-offset-8 decoration-2">{insight.title}</h2>
              </div>
              <div className="flex items-center justify-between mt-12">
                <span className="text-xs font-bold uppercase tracking-widest">Read more</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </section>

        {/* Content Section - PwC Typography Focus */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-black mb-12 uppercase italic leading-none">
                Performance is <br />
                <span className="text-accent">a process.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="text-xl font-medium leading-relaxed mb-6">
                    Our collaborative approach ensures sustainable improvements that drive clarity, accountability, and long-term impact.
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We assist with strategic planning, organizational assessment, and governance guidance to ensure operational readiness as organizations grow.
                  </p>
                  <Button variant="outline" className="rounded-none border-black text-black hover:bg-black hover:text-white font-bold uppercase tracking-widest text-xs px-8 h-12">
                    About Performance Processes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Showcase - PwC Minimalist List */}
        <section className="border-y border-border">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {['Strategy', 'Execution', 'Leadership', 'Compliance'].map((item, i) => (
              <div key={i} className="p-12 pwc-grid-border flex flex-col justify-between group hover:bg-accent hover:text-white transition-all duration-300 min-h-[250px] cursor-pointer">
                <h3 className="text-2xl font-heading font-bold uppercase italic tracking-tighter">{item}</h3>
                <ChevronRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}