import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, TrendingUp, Users, Target, Quote } from "lucide-react";
import founderImage from "@/assets/361F67D6-F008-4A69-949F-3AACE4190827_1771613037768.PNG";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white border-b py-20 lg:py-32">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
              About <span className="text-accent italic">Performance Processes</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a professional business consulting firm dedicated to helping organizations bridge the gap between vision and execution.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white border-b">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-8">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10 italic border-l-4 border-accent pl-8">
                  "To empower organizations to reach their full potential by aligning strategic direction with measurable performance systems."
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We support leaders in clarifying strategic direction, strengthening leadership capability, and optimizing performance systems that connect goals with execution. Our collaborative, results-focused approach ensures sustainable performance improvements that drive clarity, accountability, and long-term impact.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Founded", val: "2026", icon: <Target className="text-accent" /> },
                  { label: "Expert Consultants", val: "3+", icon: <Users className="text-accent" /> },
                  { label: "Projects Completed", val: "10+", icon: <CheckCircle2 className="text-accent" /> },
                  { label: "Client ROI", val: "15x", icon: <TrendingUp className="text-accent" /> }
                ].map((s, i) => (
                  <div key={i} className="bg-[#F8FAFC] p-8 rounded-2xl border border-border flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">{s.icon}</div>
                    <div className="text-3xl font-black text-primary mb-1">{s.val}</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Founder Section */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-2/5 relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent/20 rounded-2xl -z-10 translate-x-4 translate-y-4"></div>
                <img 
                  src={founderImage} 
                  alt="Danai Makore - Founder of Performance Processes" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl border border-border hidden md:block max-w-[280px]">
                  <Quote className="text-accent mb-4" size={32} fill="currentColor" fillOpacity={0.1} />
                  <p className="text-primary font-bold italic text-lg leading-tight mb-2">
                    "To help people build organizations that truly change lives."
                  </p>
                  <p className="text-accent font-black text-[10px] uppercase tracking-widest">— Danai Makore</p>
                </div>
              </div>
              <div className="lg:w-3/5">
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  Meet the Founder
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-8 leading-tight">
                  Danai <span className="text-accent italic">Makore</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Danai Makore is a people-centered leader, strategist, and consultant whose work spans nonprofit leadership, financial services, and mental health advocacy.
                  </p>
                  <p>
                    With academic training in Psychology and Human Resource Management and a deep commitment to equity, access, and sustainable impact, Danai founded Performance Processes to help visionaries, entrepreneurs, and organizations transform meaningful ideas into strong, lasting institutions.
                  </p>
                  <p>
                    Her approach blends human insight with practical systems, guiding clients from business formation and strategic development to performance management and long-term growth.
                  </p>
                  <p className="font-medium text-primary italic">
                    Grounded in purpose and driven by results, Danai’s mission is simple, “to help people build organizations that truly change lives.”
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-border shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-sm font-bold text-primary">Strategist</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-border shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-sm font-bold text-primary">Leader</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-border shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-sm font-bold text-primary">Consultant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
