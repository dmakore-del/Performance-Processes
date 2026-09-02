import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface CaseStudy {
  industry: string;
  client: string;
  title: string;
  system: string;
  challenge: string;
  solution: string;
  results: string[];
  impact: string;
}

const CASE_STUDY_EN: CaseStudy = {
  industry: "Property & Facilities",
  client: "TrueNorth Property & Facilities",
  title: "Transforming Operations Through Custom Business Systems",
  system: "Operations System",
  challenge:
    "As the organization expanded its property management and facilities services, manual processes and disconnected systems were creating inefficiencies in employee management, client communications, and operational reporting. Leadership needed a centralized platform to improve visibility, accountability, and service delivery.",
  solution:
    "Performance Processes designed and developed a custom Client Portal and Human Resource Management (HRM) system tailored to the organization's workflows. The solution centralized employee records, automated administrative processes, streamlined client interactions, and provided management with real-time operational insights.",
  results: [
    "Improved efficiency through automation of key HR and administrative processes.",
    "Enhanced client experience with centralized access to service information and communications.",
    "Increased visibility into workforce and operational performance.",
    "Reduced reliance on spreadsheets and manual reporting.",
    "Established a scalable technology foundation to support future growth.",
  ],
  impact:
    "The organization now operates with greater efficiency, improved information accessibility, and stronger operational control, allowing leadership to focus on strategic growth rather than administrative overhead.",
};

const CASE_STUDY_FR: CaseStudy = {
  industry: "Immobilier et gestion d'installations",
  client: "TrueNorth Property & Facilities",
  title: "Transformer les opérations grâce à des systèmes d'affaires sur mesure",
  system: "Système d'exploitation",
  challenge:
    "À mesure que l'organisation développait ses services de gestion immobilière et d'installations, les processus manuels et les systèmes déconnectés créaient des inefficacités dans la gestion des employés, les communications avec les clients et la production de rapports opérationnels. La direction avait besoin d'une plateforme centralisée pour améliorer la visibilité, la responsabilisation et la prestation de services.",
  solution:
    "Performance Processes a conçu et développé un portail client et un système de gestion des ressources humaines (GRH) sur mesure, adaptés aux flux de travail de l'organisation. La solution a centralisé les dossiers des employés, automatisé les processus administratifs, simplifié les interactions avec les clients et fourni à la direction des données opérationnelles en temps réel.",
  results: [
    "Efficacité accrue grâce à l'automatisation des principaux processus RH et administratifs.",
    "Expérience client améliorée grâce à un accès centralisé à l'information et aux communications sur les services.",
    "Meilleure visibilité sur la performance de la main-d'œuvre et des opérations.",
    "Dépendance réduite aux feuilles de calcul et aux rapports manuels.",
    "Fondation technologique évolutive établie pour soutenir la croissance future.",
  ],
  impact:
    "L'organisation fonctionne désormais avec une plus grande efficacité, un meilleur accès à l'information et un contrôle opérationnel renforcé, ce qui permet à la direction de se concentrer sur la croissance stratégique plutôt que sur les tâches administratives.",
};

interface Testimonial {
  quote: string;
  author: string;
  org: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Performance Processes played a key role in helping us bring our digital vision to life. Their team developed a modern, user-friendly website that effectively communicates our mission and engages youth, donors, and community partners. Throughout the project, they demonstrated professionalism, responsiveness, and a deep understanding of our organizational needs. The end result exceeded our expectations and has significantly strengthened our online presence. We highly recommend Performance Processes to any organization seeking reliable and results-driven web development services.",
    author: "Leadership Team",
    org: "NextUp Foundation for Canadian Youth",
  },
  {
    quote:
      "Performance Processes partnered with us to design and develop both our Client Portal and Human Resource Management (HRM) systems. Their ability to understand our operational requirements and translate them into practical, efficient digital solutions was exceptional. The systems they delivered have streamlined workflows, improved information accessibility, and enhanced overall organizational efficiency. Their commitment to quality, communication, and continuous improvement made them a trusted technology partner throughout the project.",
    author: "Management Team",
    org: "TrueNorth Property & Facilities",
  },
  {
    quote:
      "Working with Performance Processes on our process mapping initiative provided tremendous value to our organization. They helped us clearly document, analyze, and optimize our key operational processes, giving us greater visibility into how work flows across the business. Their structured approach uncovered opportunities for efficiency, consistency, and improved client service. The resulting process framework has become an important foundation for our ongoing growth and operational excellence.",
    author: "Leadership Team",
    org: "Ubuntu Immigration",
  },
];

const CONTENT = {
  en: {
    heroTitle: <>Results that <span className="text-accent">compound.</span></>,
    heroSubtitle:
      "Real outcomes from the systems we build and run for small and emerging businesses, in the words of the partners we work with.",
    caseEyebrow: "Case Study",
    caseHeading: "The systems behind the outcomes",
    caseIntro:
      "Each engagement leaves behind infrastructure our clients keep. Here is one example of the work in action.",
    challengeLabel: "Challenge",
    solutionLabel: "Solution",
    resultsLabel: "Results",
    impactLabel: "Impact",
    testimonialsEyebrow: "In Their Words",
    testimonialsHeading: "What our partners say",
    testimonialsIntro: "Verified words from the organizations we have partnered with.",
    testimonialsNote: "",
    ctaHeading: "Want results like these?",
    ctaSubtitle:
      "Book a strategy call to talk through your goals, or explore the packages we build and install.",
    ctaBook: "Book a Strategy Call",
    ctaServices: "Explore Packages",
    caseStudy: CASE_STUDY_EN,
  },
  fr: {
    heroTitle: <>Des résultats qui <span className="text-accent">s'accumulent.</span></>,
    heroSubtitle:
      "De véritables résultats issus des systèmes que nous concevons et exploitons pour les petites entreprises et les entreprises émergentes, dans les mots des partenaires avec qui nous travaillons.",
    caseEyebrow: "Étude de cas",
    caseHeading: "Les systèmes derrière les résultats",
    caseIntro:
      "Chaque mandat laisse derrière lui une infrastructure que nos clients conservent. Voici un exemple du travail en action.",
    challengeLabel: "Défi",
    solutionLabel: "Solution",
    resultsLabel: "Résultats",
    impactLabel: "Impact",
    testimonialsEyebrow: "Dans leurs mots",
    testimonialsHeading: "Ce que disent nos partenaires",
    testimonialsIntro: "Des témoignages vérifiés des organisations avec qui nous avons collaboré.",
    testimonialsNote: "Témoignages présentés dans leur langue d'origine.",
    ctaHeading: "Vous voulez des résultats comme ceux-ci ?",
    ctaSubtitle:
      "Réservez un appel stratégique pour discuter de vos objectifs, ou explorez les forfaits que nous concevons et installons.",
    ctaBook: "Réserver un appel stratégique",
    ctaServices: "Explorer les forfaits",
    caseStudy: CASE_STUDY_FR,
  },
};

export default function Results() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  const CASE_STUDY = c.caseStudy;

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col font-sans">
      <SEOHead
        title="Results & Case Studies | Performance Processes"
        description="Real outcomes from the systems we build for small and emerging businesses. Case studies and client results from Performance Processes."
        path="/results"
      />
      <Navbar />

       <main className="flex-grow">
        <PageHero
          title={c.heroTitle}
          subtitle={c.heroSubtitle}
        />

        {/* Featured case study */}
         <section className="py-24 bg-background" data-testid="section-case-studies">
          <div className="container mx-auto px-4 md:px-8">
             <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-3">
                {c.caseHeading}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {c.caseIntro}
              </p>
            </div>

            <AnimateOnScroll animation="fade-up">
              <article
                 className="border border-border bg-card overflow-hidden"
                data-testid="card-case-study-truenorth"
              >
                <div className="p-8 md:p-12 border-b border-border">
                   <p className="text-sm font-medium text-accent mb-3">
                    {CASE_STUDY.industry}
                  </p>
                  <h3
                     className="text-display text-3xl text-primary mb-3"
                    data-testid="text-case-title"
                  >
                    {CASE_STUDY.title}
                  </h3>
                  <p className="text-sm font-semibold text-muted-foreground" data-testid="text-case-client">
                    {CASE_STUDY.client}
                    <span className="mx-2 text-border">·</span>
                    <span className="text-accent">{CASE_STUDY.system}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 md:p-12 md:border-r border-b md:border-b-0 border-border">
                     <h4 className="text-sm font-medium text-primary/60 mb-3">
                      {c.challengeLabel}
                     </h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid="text-case-challenge">
                      {CASE_STUDY.challenge}
                    </p>
                  </div>
                  <div className="p-8 md:p-12 border-b border-border">
                     <h4 className="text-sm font-medium text-primary/60 mb-3">
                      {c.solutionLabel}
                     </h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid="text-case-solution">
                      {CASE_STUDY.solution}
                    </p>
                  </div>
                </div>

                <div className="p-8 md:p-12 border-b border-border">
                   <h4 className="text-sm font-medium text-primary/60 mb-6">
                    {c.resultsLabel}
                   </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                    {CASE_STUDY.results.map((r, i) => (
                      <div
                        key={i}
                        className="flex gap-3 border-t border-border pt-4"
                        data-testid={`text-case-result-${i}`}
                      >
                        <span className="text-accent font-black leading-none" aria-hidden="true">·</span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 md:p-12 bg-secondary border-t border-accent">
                   <h4 className="text-sm font-medium text-primary mb-3">
                    {c.impactLabel}
                   </h4>
                  <p className="text-base md:text-lg leading-relaxed text-primary/80" data-testid="text-case-impact">
                    {CASE_STUDY.impact}
                  </p>
                </div>
              </article>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Testimonials */}
         <section className="py-24 bg-card border-t" data-testid="section-testimonials">
          <div className="container mx-auto px-4 md:px-8">
             <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-3">
                {c.testimonialsHeading}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {c.testimonialsIntro}
              </p>
              {language === "fr" && (
                <p className="text-sm text-muted-foreground italic mt-3">
                  &laquo;&nbsp;{c.testimonialsNote}&nbsp;&raquo;
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {TESTIMONIALS.map((t, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <figure
                     className="flex flex-col h-full border border-border bg-background p-8"
                    data-testid={`card-testimonial-${i}`}
                  >
                    <span aria-hidden="true" className="text-4xl font-serif text-accent/40 leading-none mb-4 block">
                      &ldquo;
                    </span>
                    <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow" data-testid={`text-testimonial-quote-${i}`}>
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-auto border-t border-border pt-5">
                      <div className="w-8 h-px bg-accent mb-3" />
                      <p className="text-sm font-bold text-primary" data-testid={`text-testimonial-org-${i}`}>
                        {t.org}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5" data-testid={`text-testimonial-author-${i}`}>{t.author}</p>
                    </figcaption>
                  </figure>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
         <section className="py-24 bg-secondary border-t border-primary/10" data-testid="section-results-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">
                {c.ctaHeading}
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                {c.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="bg-accent px-8 py-4 text-sm text-primary transition hover:bg-white" data-testid="button-results-book">
                   {c.ctaBook} <span aria-hidden="true">↗</span>
                 </a>
                 <Link href="/#capabilities" className="border border-primary/30 px-8 py-4 text-sm text-primary transition hover:border-accent hover:bg-accent" data-testid="button-results-services">
                   {c.ctaServices} <span aria-hidden="true">↗</span>
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
