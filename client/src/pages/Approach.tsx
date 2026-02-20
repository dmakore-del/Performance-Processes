import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/hooks/use-language";

export default function Approach() {
  const { language } = useLanguage();

  const steps = [
    { 
      num: "01", 
      title: language === "en" ? "Discovery & Assessment" : "Découverte et évaluation", 
      desc: language === "en" 
        ? "We start by understanding your unique challenges and auditing your current performance systems to identify gaps." 
        : "Nous commençons par comprendre vos défis uniques et par auditer vos systèmes de performance actuels pour identifier les lacunes."
    },
    { 
      num: "02", 
      title: language === "en" ? "Strategic Alignment" : "Alignement stratégique", 
      desc: language === "en" 
        ? "We work with your leadership team to clarify strategic direction and ensure it's communicated effectively throughout the organization." 
        : "Nous travaillons avec votre équipe de direction pour clarifier l'orientation stratégique et veiller à ce qu'elle soit communiquée efficacement dans toute l'organisation."
    },
    { 
      num: "03", 
      title: language === "en" ? "Implementation & Training" : "Mise en œuvre et formation", 
      desc: language === "en" 
        ? "Our experts provide hands-on support to implement new systems and strengthen leadership capabilities." 
        : "Nos experts fournissent un soutien concret pour mettre en œuvre de nouveaux systèmes et renforcer les capacités de leadership."
    },
    { 
      num: "04", 
      title: language === "en" ? "Monitoring & Optimization" : "Suivi et optimisation", 
      desc: language === "en" 
        ? "We establish continuous feedback loops and performance metrics to ensure long-term, sustainable impact." 
        : "Nous établissons des boucles de rétroaction continue et des indicateurs de performance pour garantir un impact durable à long terme."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white border-b py-20 lg:py-32">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
              {language === "en" ? "A collaborative," : "Une approche collaborative,"} <span className="text-accent italic">{language === "en" ? "results-focused" : "axée sur les résultats"}</span> {language === "en" ? "approach" : ""}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {language === "en" 
                ? "Our methodology is designed to ensure sustainable performance improvements and maximum ROI."
                : "Notre méthodologie est conçue pour garantir des améliorations de performance durables et un ROI maximal."}
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="space-y-24">
              {steps.map((step, i) => (
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
