import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck, FileText, Settings, Info } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";

import { PageHero } from "@/components/layout/PageHero";

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const { t, language } = useLanguage();

  const services = [
    {
      title: language === "en" ? "Strategic Planning & Alignment" : "Planification et alignement stratégiques",
      investment: language === "en" ? "$7,500 – $25,000+" : "7 500 $ – 25 000 $+",
      investmentNote: language === "en" ? "(Based on 1–3 day workshops, stakeholder interviews, and roadmap development)" : "(Basé sur des ateliers de 1 à 3 jours, des entretiens avec les parties prenantes et l'élaboration d'une feuille de route)",
      desc: language === "en" 
        ? "We help organizations define clear strategic direction and translate vision into measurable priorities."
        : "Nous aidons les organisations à définir une orientation stratégique claire et à traduire la vision en priorités mesurables.",
      learnMore: language === "en"
        ? "Many strategies fail not because they lack ambition, but because they lack alignment and execution clarity.\n\nOur process ensures leadership alignment, defined success metrics, and a practical roadmap that connects goals to operational execution."
        : "De nombreuses stratégies échouent non pas par manque d'ambition, mais par manque d'alignement et de clarté d'exécution.\n\nNotre processus garantit l'alignement des dirigeants, des indicateurs de réussite définis et une feuille de route pratique qui relie les objectifs à l'exécution opérationnelle.",
      includes: language === "en" 
        ? ["Vision and mission refinement", "Environmental and stakeholder analysis", "Strategic objective development", "KPI and success metric design", "1–3 year strategic roadmap", "Leadership alignment workshops"]
        : ["Affinement de la vision et de la mission", "Analyse de l'environnement et des parties prenantes", "Développement d'objectifs stratégiques", "Conception d'indicateurs de performance et de réussite", "Feuille de route stratégique de 1 à 3 ans", "Ateliers d'alignement des dirigeants"],
      idealFor: language === "en" ? "Organizations preparing for growth, restructuring, funding, or transformation." : "Organisations se préparant à la croissance, à la restructuration, au financement ou à la transformation.",
      icon: <TrendingUp className="text-accent" />
    },
    {
      title: language === "en" ? "Organizational Assessment" : "Évaluation organisationnelle",
      investment: language === "en" ? "$5,000 – $18,000+" : "5 000 $ – 18 000 $+",
      desc: language === "en" 
        ? "Before improvement comes clarity. Our organizational assessment identifies structural gaps and performance barriers."
        : "Avant l'amélioration vient la clarté. Notre évaluation organisationnelle identifie les lacunes structurelles et les obstacles à la performance.",
      learnMore: language === "en"
        ? "We provide a data-driven diagnostic that highlights what is working, what is misaligned, and where focused improvements will create measurable impact."
        : "Nous fournissons un diagnostic basé sur les données qui met en évidence ce qui fonctionne, ce qui est mal aligné et où des améliorations ciblées créeront un impact mesurable.",
      includes: language === "en"
        ? ["Leadership interviews", "Organizational structure review", "Culture and capability assessment", "Process and performance review", "Risk and governance analysis", "Comprehensive findings report"]
        : ["Entretiens avec les dirigeants", "Examen de la structure organisationnelle", "Évaluation de la culture et des capacités", "Examen des processus et des performances", "Analyse des risques et de la gouvernance", "Rapport complet de conclusions"],
      idealFor: language === "en" ? "Organizations experiencing performance stagnation, growth challenges, or internal inefficiencies." : "Organisations connaissant une stagnation des performances, des défis de croissance ou des inefficacités internes.",
      icon: <Users className="text-accent" />
    },
    {
      title: language === "en" ? "Performance Management Design" : "Conception de la gestion de la performance",
      investment: language === "en" ? "$6,000 – $20,000+" : "6 000 $ – 20 000 $+",
      desc: language === "en" 
        ? "We design performance systems that connect strategy to accountability."
        : "Nous concevons des systèmes de performance qui relient la stratégie à la responsabilité.",
      learnMore: language === "en"
        ? "Without measurable indicators and clear ownership, strategy remains theoretical. Our performance management frameworks create visibility, ownership, and structured review processes that drive results."
        : "Sans indicateurs mesurables et une appropriation claire, la stratégie reste théorique. Nos cadres de gestion de la performance créent de la visibilité, de l'appropriation et des processus d'examen structurés qui génèrent des résultats.",
      includes: language === "en"
        ? ["KPI framework development", "Balanced scorecard design", "Role-based accountability structures", "Performance review templates", "Reporting dashboards", "Implementation support"]
        : ["Développement d'un cadre d'indicateurs de performance", "Conception d'un tableau de bord prospectif", "Structures de responsabilité basées sur les rôles", "Modèles d'examen des performances", "Tableaux de bord de rapport", "Soutien à la mise en œuvre"],
      idealFor: language === "en" ? "Organizations seeking measurable performance, improved accountability, and strategic execution discipline." : "Organisations recherchant une performance mesurable, une responsabilité accrue et une discipline d'exécution stratégique.",
      icon: <Settings className="text-accent" />
    },
    {
      title: language === "en" ? "Leadership Development" : "Développement du leadership",
      investment: language === "en" ? "$3,500 – $15,000+" : "3 500 $ – 15 000 $+",
      investmentNote: language === "en" ? "(Workshops and cohort programs) | Executive Coaching available" : "(Ateliers et programmes de cohorte) | Coaching exécutif disponible",
      desc: language === "en" 
        ? "Strong strategy requires strong leadership. We equip leaders with clarity and confidence."
        : "Une stratégie solide nécessite un leadership fort. Nous dotons les dirigeants de clarté et de confiance.",
      learnMore: language === "en"
        ? "Our leadership development programs focus on practical capability building, not theoretical training."
        : "Nos programmes de développement du leadership se concentrent sur le renforcement des capacités pratiques, et non sur une formation théorique.",
      includes: language === "en"
        ? ["Leadership competency assessment", "Executive and management workshops", "Team alignment sessions", "One-on-one executive coaching", "Accountability training"]
        : ["Évaluation des compétences de leadership", "Ateliers pour cadres et gestionnaires", "Sessions d'alignement d'équipe", "Coaching exécutif individuel", "Formation à la responsabilité"],
      idealFor: language === "en" ? "Growing organizations, new leadership teams, or leaders navigating change." : "Organisations en croissance, nouvelles équipes de direction ou dirigeants naviguant dans le changement.",
      icon: <ShieldCheck className="text-accent" />
    },
    {
      title: language === "en" ? "Process Improvement" : "Amélioration des processus",
      investment: language === "en" ? "$4,000 – $15,000+" : "4 000 $ – 15 000 $+",
      desc: language === "en" 
        ? "Scalable organizations require documented, efficient processes."
        : "Les organisations évolutives nécessitent des processus documentés et efficaces.",
      learnMore: language === "en"
        ? "We help streamline operations, eliminate inefficiencies, and create structured systems that support consistency and growth."
        : "Nous aidons à simplifier les opérations, à éliminer les inefficacités et à créer des systèmes structurés qui favorisent la cohérence et la croissance.",
      includes: language === "en"
        ? ["Process mapping sessions", "Workflow analysis", "SOP development", "Role clarity frameworks", "Operational efficiency recommendations"]
        : ["Sessions de cartographie des processus", "Analyse des flux de travail", "Développement de procédures opérationnelles normalisées", "Cadres de clarté des rôles", "Recommandations d'efficacité opérationnelle"],
      idealFor: language === "en" ? "Organizations preparing to scale or improve operational consistency." : "Organisations se préparant à passer à l'échelle ou à améliorer la cohérence opérationnelle.",
      icon: <FileText className="text-accent" />
    },
    {
      title: language === "en" ? "Change Management Support" : "Soutien à la gestion du changement",
      investment: language === "en" ? "$5,000 – $20,000+" : "5 000 $ – 20 000 $+",
      desc: language === "en" 
        ? "Change fails when people are not aligned. We support organizations through transitions."
        : "Le changement échoue lorsque les personnes ne sont pas alignées. Nous soutenons les organisations à travers les transitions.",
      learnMore: language === "en"
        ? "We support organizations through transitions with structured change frameworks that prioritize communication, stakeholder engagement, and adoption."
        : "Nous soutenons les organisations dans leurs transitions grâce à des cadres de changement structurés qui privilégient la communication, l'engagement des parties prenantes et l'adoption.",
      includes: language === "en"
        ? ["Change readiness assessment", "Change strategy design", "Stakeholder mapping", "Communication plan development", "Implementation coaching"]
        : ["Évaluation de l'état de préparation au changement", "Conception d'une stratégie de changement", "Cartographie des parties prenantes", "Développement d'un plan de communication", "Coaching de mise en œuvre"],
      idealFor: language === "en" ? "Organizations undergoing restructuring, digital transformation, or strategic shifts." : "Organisations subissant une restructuration, une transformation numérique ou des changements stratégiques.",
      icon: <CheckCircle2 className="text-accent" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{language === "en" ? "Consulting services to" : "Services de conseil pour"} <br /> <span className="text-accent">{language === "en" ? "propel your business" : "propulser votre entreprise"}</span></>}
          subtitle={language === "en" 
            ? "We provide practical, hands-on support to help you solve your most pressing business challenges."
            : "Nous fournissons un soutien pratique et concret pour vous aider à résoudre vos défis commerciaux les plus pressants."}
        />

        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div 
                  key={i} 
                  className="bg-white p-10 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[350px]"
                  onClick={() => setSelectedService(s)}
                  data-testid={`card-service-${i}`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                      {s.icon}
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-3">{s.desc}</p>
                    <div className="text-accent font-bold text-lg mb-2">{s.investment}</div>
                  </div>
                  <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                    {language === "en" ? "Learn more" : "En savoir plus"} <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
            {selectedService && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      {selectedService.icon}
                    </div>
                    <DialogTitle className="text-3xl font-heading font-extrabold text-primary">{selectedService.title}</DialogTitle>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 mb-6">
                    <div className="text-accent font-black text-2xl mb-1">
                      {language === "en" ? "Investment:" : "Investissement :"} {selectedService.investment}
                    </div>
                    {selectedService.investmentNote && (
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{selectedService.investmentNote}</div>
                    )}
                  </div>
                </DialogHeader>
                <div className="space-y-8 py-4">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                      {language === "en" ? "Overview" : "Aperçu"}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{selectedService.learnMore}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                      {language === "en" ? "What's Included" : "Ce qui est inclus"}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedService.includes.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-bold text-primary bg-secondary/30 p-3 rounded-lg">
                          <CheckCircle2 size={16} className="text-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-primary rounded-2xl text-white">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-70">
                      {language === "en" ? "Ideal For" : "Idéal pour"}
                    </h4>
                    <p className="font-bold italic text-lg leading-relaxed">{selectedService.idealFor}</p>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button 
                      className="rounded-full bg-accent text-white hover:bg-primary h-14 px-12 font-bold uppercase tracking-widest text-sm shadow-lg shadow-accent/20"
                      onClick={() => {
                        window.location.href = `mailto:contact@performanceprocesses.com?subject=Inquiry: ${selectedService.title}`;
                        setSelectedService(null);
                      }}
                    >
                      {language === "en" ? "Inquire about this service" : "Se renseigner sur ce service"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <section className="bg-primary py-24 text-white">
          <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6 italic">
                {language === "en" ? "Not sure where to start?" : "Vous ne savez pas par où commencer ?"}
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed">
                {language === "en" 
                  ? "Book a free 30-minute discovery call with one of our expert consultants to discuss your goals and how we can help."
                  : "Réservez un appel de découverte gratuit de 30 minutes avec l'un de nos consultants experts pour discuter de vos objectifs et de la façon dont nous pouvons vous aider."}
              </p>
            </div>
            <Button className="rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-12 text-lg font-bold uppercase tracking-widest transition-all">
              {language === "en" ? "Book your free call" : "Réservez votre appel gratuit"}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
