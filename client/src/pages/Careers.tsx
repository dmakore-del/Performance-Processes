import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/hooks/use-language";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Careers() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{language === "en" ? "Join Our" : "Rejoignez Notre"} <span className="text-accent italic">{language === "en" ? "Team" : "Équipe"}</span></>}
          subtitle={language === "en" 
            ? "Build a career aligning strategy with measurable impact."
            : "Construisez une carrière en alignant la stratégie sur un impact mesurable."}
        />
        
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-8">
            <div className="border-b border-border pb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                Open Role
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                Business Development Consultant
              </h2>
              <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Remote / Flexible</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent"></div> Commission-Based</span>
              </div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                We are seeking a results-driven Consultant to support business development and client acquisition efforts. This commission-based role is ideal for a motivated professional with strong networks, consultative selling skills, and a passion for helping organizations improve performance and strategic alignment.
              </p>
              <p>
                The Consultant will identify potential clients, initiate conversations with decision-makers, and represent our consulting services with professionalism and credibility. This role offers flexible engagement and uncapped earning potential based on successful client conversions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Key Responsibilities</h3>
              <ul className="space-y-3">
                {[
                  "Identify and engage prospective clients aligned with our service offerings",
                  "Build relationships with organizational leaders and decision-makers",
                  "Present consulting solutions tailored to client needs",
                  "Facilitate introductions and initial strategy discussions",
                  "Support proposal follow-up and deal progression",
                  "Maintain a pipeline of qualified leads"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Ideal Candidate Profile</h3>
              <ul className="space-y-3">
                {[
                  "Strong professional network within corporate, nonprofit, or SME sectors",
                  "Experience in consulting, advisory services, or business development",
                  "Excellent communication and relationship-building skills",
                  "Self-motivated and target-driven",
                  "High level of professionalism and integrity"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Compensation Structure</h3>
              <p className="text-muted-foreground leading-relaxed">
                This is a commission-based role with earnings tied directly to closed consulting engagements. Commission percentages are competitive and structured to reward performance and long-term client relationships.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">What We Offer</h3>
              <ul className="space-y-3">
                {[
                  "Flexible, remote engagement",
                  "High-value consulting services with strong market demand",
                  "Uncapped commission potential",
                  "Opportunity to align with a performance-focused consulting brand"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground italic mt-6 border-l-4 border-accent pl-4 py-2 bg-secondary/30">
                This role is well-suited for independent consultants, industry professionals, or business advisors looking to expand their income through strategic referrals and client acquisition.
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <Button 
                className="w-full md:w-auto rounded-full bg-accent text-white hover:bg-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-accent/20"
                onClick={() => window.location.href = "mailto:careers@performanceprocesses.com?subject=Application: Business Development Consultant"}
              >
                Apply for this role
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
