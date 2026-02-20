import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* BDC Style Hero */}
        <section className="bg-white border-b overflow-hidden relative min-h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-20"
            >
              <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 md:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                <TrendingUp size={14} /> Business Consulting
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
                {t("hero.title")} <br />
                <span className="text-accent underline decoration-accent/30 underline-offset-8">{t("hero.titleAccent")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="rounded-full bg-primary text-white hover:bg-accent h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all">
                    {t("hero.ctaPrimary")}
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all">
                    {t("hero.ctaSecondary")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
               <img 
                 src="/assets/images/bdc-style-hero.jpg" 
                 alt="Business Consulting" 
                 className="rounded-2xl shadow-2xl relative z-10 w-full h-auto object-cover grayscale-0"
               />
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 border border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary italic leading-none">95%</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Client Satisfaction</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* BDC Style Services Grid */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                Consulting solutions for every stage of your journey
              </h2>
              <p className="text-lg text-muted-foreground">
                Our experts work with you to solve your most pressing business challenges and capture new opportunities for growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Strategic Planning & Alignment", desc: "Define your vision and build a roadmap to reach your goals.", icon: <TrendingUp className="text-accent" /> },
                { title: "Organizational Assessment", desc: "Identify inefficiencies and optimize your internal structures.", icon: <Users className="text-accent" /> },
                { title: "Leadership Development", desc: "Empower your team with the skills to lead through change.", icon: <ShieldCheck className="text-accent" /> },
                { title: "Process Improvement", desc: "Streamline operations to boost productivity and reduce costs.", icon: <CheckCircle2 className="text-accent" /> },
                { title: "Performance Management", desc: "Implement systems that drive accountability and results.", icon: <TrendingUp className="text-accent" /> },
                { title: "Governance Guidance", desc: "Ensure compliance and build a foundation for sustainable growth.", icon: <ShieldCheck className="text-accent" /> }
              ].map((s, i) => (
                <Link key={i} href={`/services`}>
                  <a className="block h-full">
                    <div className="bg-white p-10 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[320px] h-full">
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
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - BDC Style */}
        <section className="py-24 bg-white border-y">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-8 leading-tight">
                  Expert advice to propel <br /> your business forward
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold italic">01</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Practical Solutions</h4>
                      <p className="text-muted-foreground">We focus on actionable advice that delivers immediate and measurable results for your organization.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold italic">02</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Industry Expertise</h4>
                      <p className="text-muted-foreground">Our consultants bring years of experience across various sectors to help you navigate specific challenges.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold italic">03</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Sustainable Impact</h4>
                      <p className="text-muted-foreground">We build capabilities within your team to ensure that improvements are maintained long-term.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 bg-secondary p-12 lg:p-16 rounded-3xl text-center">
                 <h3 className="text-2xl md:text-3xl font-bold mb-8 text-primary uppercase italic">Ready to take the next step?</h3>
                 <p className="text-lg text-muted-foreground mb-10">Our consultants are ready to discuss your business needs and help you find the right solution.</p>
                 <Link href="/contact">
                   <Button className="rounded-full bg-accent text-white hover:bg-primary h-16 px-12 text-lg font-bold uppercase tracking-widest transition-all">
                     Request a call back
                   </Button>
                 </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}