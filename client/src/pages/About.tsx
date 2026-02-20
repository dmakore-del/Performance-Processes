import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, TrendingUp, Users, Target } from "lucide-react";

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
              We are a registered business consulting firm dedicated to helping organizations bridge the gap between vision and execution.
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
                  { label: "Founded", val: "2010", icon: <Target className="text-accent" /> },
                  { label: "Expert Consultants", val: "15+", icon: <Users className="text-accent" /> },
                  { label: "Projects Completed", val: "250+", icon: <CheckCircle2 className="text-accent" /> },
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
      </main>
      <Footer />
    </div>
  );
}
