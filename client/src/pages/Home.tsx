import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";

import abstractBg from "@/assets/abstract-bg.png";
import teamCollab from "@/assets/team-collab.png";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* Wealthsimple-inspired Hero */}
        <section className="bg-white border-b overflow-hidden relative min-h-[85vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(224,17,95,0.05),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${abstractBg})` }}></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <TrendingUp size={12} /> Excellence in Strategy
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-primary mb-8 leading-[1.05] tracking-tight">
                {t("hero.title")} <br />
                <span className="text-accent italic relative">
                  {t("hero.titleAccent")}
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute bottom-2 left-0 h-3 bg-accent/10 -z-10"
                  ></motion.span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-xl font-medium">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/contact">
                  <Button className="rounded-full bg-primary text-white hover:bg-accent h-16 px-12 font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-primary/10 hover:shadow-accent/20">
                    {t("hero.ctaPrimary")}
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="ghost" className="rounded-full text-primary hover:bg-secondary h-16 px-10 font-bold text-sm uppercase tracking-widest transition-all">
                    {t("hero.ctaSecondary")} <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
               <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] bg-white p-2">
                 <img 
                   src={teamCollab} 
                   alt="Strategic Excellence" 
                   className="rounded-[2rem] w-full h-auto object-cover aspect-[4/3]"
                 />
               </div>
               {/* Floating card for depth */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-border flex items-center gap-5"
               >
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/30">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-primary italic leading-none tracking-tighter">95%</div>
                    <div className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em] mt-1">Satisfaction Rate</div>
                  </div>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Wealthsimple Style Services */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-8 tracking-tight">
                Designed for <span className="text-accent italic">impact</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                We combine human insight with rigorous systems to help you scale with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Strategic Alignment", desc: "Coordinating your team around a single, powerful vision.", icon: <TrendingUp className="text-accent" /> },
                { title: "Performance Design", desc: "Building the metrics and systems that drive accountability.", icon: <CheckCircle2 className="text-accent" /> },
                { title: "Leadership Growth", desc: "Equipping your executives with the clarity to lead.", icon: <Users className="text-accent" /> },
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-secondary/30 aspect-[4/5] rounded-[2rem] mb-8 overflow-hidden relative flex flex-col justify-end p-10 border border-transparent hover:border-accent/10 hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="mb-auto">
                       <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                         {s.icon}
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">{s.desc}</p>
                    <div className="mt-8 flex items-center text-xs font-black uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all">
                      Explore service <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </motion.div>
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
