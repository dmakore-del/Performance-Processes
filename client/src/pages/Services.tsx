import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import {
  OFFERS,
  LANDING_PAGES,
  getLocalizedCategoryMeta,
  type ServiceCategory,
} from "@shared/offers";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import geoPatternImg from "@assets/generated/geo-pattern-new.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const CATEGORY_ORDER: ServiceCategory[] = ["website", "marketing", "crm", "systems", "hr-recruiting", "support"];

const CONTENT = {
  en: {
    heroTitle1: "Solutions That Improve Performance, Increase Profitability, and",
    heroAccent: "Accelerate",
    heroTitle2: "Growth",
    heroSubtitle:
      "Performance Processes helps organizations streamline operations, adopt modern technology, improve decision-making, and build scalable systems, so growth becomes structured instead of stressful.",
    heroBook: "Book a Consultation",
    heroExplore: "Explore Our Services",
    packagesEyebrow: "Headline Packages",
    packagesTitle: "Four systems, four complete outcomes.",
    packagesBody:
      "Each package solves a full business problem and installs infrastructure you keep. Explore each service area below for the full detail.",
    directoryEyebrow: "Service Areas",
    directoryTitle: "Explore each service in depth.",
    directoryBody:
      "Every service area has its own dedicated page with what's included, pricing, answers to common questions, and secure online checkout.",
    directoryCta: "View Services",
    paymentNote: "Every service can be paid for online, credit card, debit, and PayPal via secure Stripe checkout.",
    bundlesEyebrow: "Popular Packages",
    bundlesTitle: "Pre-built bundles, ready to launch.",
    bundlesBody:
      "The fastest way to get a complete setup. Each bundle combines our most-requested services at a packaged price.",
    howEyebrow: "How We Work",
    howTitle: "A clear path from conversation to results.",
    howSchedule: "Schedule a Free Consultation",
    howSteps: [
      {
        step: "01",
        title: "Discovery and Consultation",
        description:
          "A conversation about your goals, your constraints, and where growth is getting stuck. No pitch, just clarity on whether we can help.",
      },
      {
        step: "02",
        title: "Business Assessment",
        description:
          "We review how your business attracts, converts, and delivers today, and identify the gaps costing you time, money, or momentum.",
      },
      {
        step: "03",
        title: "Strategy and Proposal",
        description:
          "You receive a clear recommendation, the services that fit, what they cost, and the outcomes you should expect from each.",
      },
      {
        step: "04",
        title: "Implementation and Ongoing Support",
        description:
          "We build, install, and hand over working systems, then stay available to measure, refine, and improve them over time.",
      },
    ],
    ctaTitle: "Ready to take the next step?",
    ctaBody: "Schedule a free consultation to talk through fit, request a proposal, or pick a package and check out today.",
    ctaBook: "Schedule a Free Consultation",
    ctaContact: "Request a Proposal",
    toastSuccessTitle: "Payment successful",
    toastSuccessBody: "Thank you. We will be in touch shortly to get started.",
    toastCancelTitle: "Payment cancelled",
    toastCancelBody: "Your payment was not completed.",
  },
  fr: {
    heroTitle1: "Des solutions qui améliorent la performance, augmentent la rentabilité et",
    heroAccent: "accélèrent",
    heroTitle2: "la croissance",
    heroSubtitle:
      "Performance Processes aide les organisations à simplifier leurs opérations, à adopter des technologies modernes, à améliorer la prise de décision et à bâtir des systèmes évolutifs, pour que la croissance devienne structurée plutôt que stressante.",
    heroBook: "Réserver une consultation",
    heroExplore: "Découvrir nos services",
    packagesEyebrow: "Forfaits vedettes",
    packagesTitle: "Quatre systèmes, quatre résultats complets.",
    packagesBody:
      "Chaque forfait résout un problème d'affaires complet et installe une infrastructure qui vous appartient. Explorez chaque domaine de service ci-dessous pour tous les détails.",
    directoryEyebrow: "Domaines de service",
    directoryTitle: "Explorez chaque service en profondeur.",
    directoryBody:
      "Chaque domaine de service possède sa propre page détaillée avec le contenu inclus, les prix, les réponses aux questions courantes et le paiement en ligne sécurisé.",
    directoryCta: "Voir les services",
    paymentNote: "Chaque service peut être payé en ligne, carte de crédit, débit et PayPal via le paiement sécurisé Stripe.",
    bundlesEyebrow: "Forfaits populaires",
    bundlesTitle: "Des ensembles prêts à lancer.",
    bundlesBody:
      "La façon la plus rapide d'obtenir une installation complète. Chaque ensemble combine nos services les plus demandés à un prix forfaitaire.",
    howEyebrow: "Notre façon de travailler",
    howTitle: "Un chemin clair, de la conversation aux résultats.",
    howSchedule: "Planifier une consultation gratuite",
    howSteps: [
      {
        step: "01",
        title: "Découverte et consultation",
        description:
          "Une conversation sur vos objectifs, vos contraintes et les points où la croissance bloque. Pas de discours de vente, seulement de la clarté sur notre capacité à vous aider.",
      },
      {
        step: "02",
        title: "Évaluation de l'entreprise",
        description:
          "Nous examinons comment votre entreprise attire, convertit et livre aujourd'hui, et identifions les lacunes qui vous coûtent du temps, de l'argent ou de l'élan.",
      },
      {
        step: "03",
        title: "Stratégie et proposition",
        description:
          "Vous recevez une recommandation claire, les services qui conviennent, leur coût et les résultats à attendre de chacun.",
      },
      {
        step: "04",
        title: "Mise en œuvre et soutien continu",
        description:
          "Nous construisons, installons et livrons des systèmes fonctionnels, puis restons disponibles pour mesurer, ajuster et les améliorer au fil du temps.",
      },
    ],
    ctaTitle: "Prêt à passer à l'étape suivante?",
    ctaBody: "Planifiez une consultation gratuite pour discuter de vos besoins, demandez une proposition, ou choisissez un forfait et payez dès aujourd'hui.",
    ctaBook: "Planifier une consultation gratuite",
    ctaContact: "Demander une proposition",
    toastSuccessTitle: "Paiement réussi",
    toastSuccessBody: "Merci. Nous vous contacterons sous peu pour commencer.",
    toastCancelTitle: "Paiement annulé",
    toastCancelBody: "Votre paiement n'a pas été complété.",
  },
};

export default function Services() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const c = CONTENT[language];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "success") {
      toast({ title: c.toastSuccessTitle, description: c.toastSuccessBody });
      window.history.replaceState({}, "", "/services");
    } else if (payment === "cancelled") {
      toast({ title: c.toastCancelTitle, description: c.toastCancelBody, variant: "destructive" });
      window.history.replaceState({}, "", "/services");
    }
  }, []);

  const packages = OFFERS.filter((o) => o.category === "packages");
  const bundles = OFFERS.filter((o) => o.category === "bundle");

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <SEOHead
        title="Services That Improve Performance and Accelerate Growth | Performance Processes"
        description="Websites, marketing systems, CRM, business systems, HR, and ongoing growth support that improve performance, increase profitability, and accelerate growth. Clear prices, secure checkout, Toronto-based."
        path="/services"
      />
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary overflow-hidden relative min-h-[460px] lg:min-h-[560px] flex items-center" data-testid="section-services-hero">
          <div className="absolute inset-0 z-0">
            <img src={geoPatternImg} alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-20 lg:py-28 text-center max-w-4xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-7 leading-[1.08]">
              {c.heroTitle1}{" "}
              <span className="text-display-italic text-accent">{c.heroAccent}</span> {c.heroTitle2}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
              {c.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-hero-book-consultation">
                  {c.heroBook}
                </Button>
              </a>
              <a href="#cat-packages">
                <Button variant="outline" className="rounded-none border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-hero-explore-services">
                  {c.heroExplore}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Headline packages */}
        {packages.length > 0 && (
          <section id="cat-packages" className="py-24 bg-background border-b border-border" data-testid="section-packages">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mb-14">
                <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">{c.packagesEyebrow}</p>
                <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">
                  {c.packagesTitle}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                  {c.packagesBody}
                </p>
              </div>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {packages.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} returnPage="/services" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Service area directory */}
        <section className="py-24 bg-secondary/40 border-b border-border" data-testid="section-service-directory">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">{c.directoryEyebrow}</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">
                {c.directoryTitle}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                {c.directoryBody}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {CATEGORY_ORDER.map((cat, idx) => {
                const meta = getLocalizedCategoryMeta(cat, language);
                return (
                  <Link
                    key={cat}
                    href={`/services/${LANDING_PAGES[cat].slug}`}
                    className="group bg-background p-8 md:p-10 flex flex-col hover:bg-primary transition-colors"
                    data-testid={`card-category-${cat}`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-white/50 transition-colors mb-6">{`0${idx + 1}`}</p>
                    <h3 className="text-display text-2xl text-primary group-hover:text-white transition-colors mb-4">
                      {meta.label}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors font-light leading-relaxed mb-8 flex-grow">
                      {meta.description}
                    </p>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent underline underline-offset-4 decoration-accent/40">
                      {c.directoryCta}
                    </span>
                  </Link>
                );
              })}
            </div>
            <p className="text-center mt-8 text-xs text-muted-foreground font-light">
              {c.paymentNote}
            </p>
          </div>
        </section>

        {/* Bundles */}
        {bundles.length > 0 && (
          <section id="cat-bundle" className="py-24 bg-primary text-white" data-testid="section-bundles">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mb-14">
                <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-white/50">{c.bundlesEyebrow}</p>
                <h2 className="text-display text-4xl md:text-5xl mb-5 text-white">
                  {c.bundlesTitle}
                </h2>
                <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                  {c.bundlesBody}
                </p>
              </div>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {bundles.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} returnPage="/services" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How we work */}
        <section className="py-24 bg-secondary/40" data-testid="section-how-we-work">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-14">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6 text-muted-foreground">{c.howEyebrow}</p>
              <h2 className="text-display text-4xl md:text-5xl text-primary mb-5">
                {c.howTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
              {c.howSteps.map((step, i) => (
                <div key={i} className="bg-background p-8 md:p-10" data-testid={`card-step-${i}`}>
                  <div className="text-display numeral-outline text-5xl text-primary/30 mb-6">{step.step}</div>
                  <h3 className="text-display text-xl text-primary mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none bg-primary text-white hover:bg-accent h-12 px-8 font-semibold text-xs uppercase tracking-[0.2em]" data-testid="button-how-schedule">
                  {c.howSchedule}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white" data-testid="section-final-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display text-4xl md:text-5xl mb-6 text-white">
                {c.ctaTitle}
              </h2>
              <p className="text-lg text-white/70 mb-10 font-light">
                {c.ctaBody}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-none bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-book-strategy-call">
                    {c.ctaBook}
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-none border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-10 font-semibold text-xs uppercase tracking-[0.2em] w-full sm:w-auto" data-testid="button-contact">
                    {c.ctaContact}
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
