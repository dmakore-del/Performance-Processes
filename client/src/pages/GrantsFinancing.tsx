import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import ownerImage from "@assets/stock_photography/funding-analysis.jpg";
import fundingPathwayMap from "../assets/funding-pathway-map.svg";

const BOOKING_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";
const COPY = {
  en: {
    title: "Turn a promising project into a fundable plan.",
    description: "Grant research and business-financing application support for Canadian businesses and eligible organizations.",
    intro: "We help you understand which funding pathways may fit, prepare a clear project, and submit a stronger, well-supported application. Every opportunity is assessed against its published criteria. Funding decisions belong to the funder or lender.",
    book: "Book a discovery call",
    bookingNote: "After you book, we’ll email you a fillable preparation form so we can make the conversation useful.",
    seeProcess: "How the process works",
    processTitle: "A clear path from idea to application",
    stages: [
      ["Start with your goals", "On a discovery call, we learn about the organization, the project, timing and the outcome you’re working toward."],
      ["Check readiness and fit", "We review the basic eligibility signals, project stage, records available and any matching-fund or timing constraints."],
      ["Find relevant opportunities", "We research programs and financing options against the project, then share a preliminary shortlist for you to consider."],
      ["Build a complete application", "With your written approval, we organize the evidence, shape the project narrative, develop the budget and prepare the application for your review."],
      ["Submit and follow through", "We support submission and reasonable follow-up. You make the final funding decisions and approve what is submitted."],
    ],
    focusTitle: "Funding support built around the project",
    focusIntro: "The strongest funding requests connect a real organizational need to the funder’s criteria, a practical plan and credible evidence. We help bring those pieces together.",
    focus: [
      ["Project clarity", "Define the need, activities, milestones, intended beneficiaries and outcomes before choosing a program."],
      ["Program fit", "Compare grant, wage subsidy, rebate and financing pathways with published eligibility and use-of-funds rules."],
      ["Application readiness", "Identify documentation gaps early and organize information you provide into a consistent, reviewable package."],
    ],
    imageAlt: "Hands review business finance documents beside a calculator and laptop",
    teamAlt: "A diagram connects funding research, readiness, application preparation, submission, and follow-up",
    imageCaption: "Start with the work your organization needs to do.",
    shortlistTitle: "A shortlist before a commitment",
    shortlistBody: "Funding programmes change. We screen current criteria and timing, explain the fit and trade-offs, and share the opportunities that appear relevant. You choose whether to proceed with any one of them.",
    quoteTitle: "A scope you can review before paid work",
    quoteBody: "After the discovery call, we send a written email with the recommended next step, deliverables, timeline and engagement-specific costs. Nothing paid begins until you approve the scope in writing.",
    noGuarantee: "No consultant can guarantee a grant or loan. Each funder or lender makes the eligibility, assessment and approval decision. We provide application preparation and administrative support, not lending, legal, tax, accounting or regulated financial advice.",
    ready: "Already booked? Complete your preparation form",
    ctaBottom: "Let’s map the funding route for your project.",
    speak: "Talk through your funding goals",
    contact: "Ask us a question",
  },
  fr: {
    title: "Transformez un projet prometteur en plan finançable.",
    description: "Recherche de subventions et soutien aux demandes de financement commercial pour les entreprises canadiennes et les organismes admissibles.",
    intro: "Nous vous aidons à repérer les voies de financement pertinentes, à préparer un projet clair et à soumettre une demande solide et bien étayée. Chaque possibilité est comparée à ses critères publiés. La décision revient au bailleur de fonds ou au prêteur.",
    book: "Réserver un appel découverte",
    bookingNote: "Après la réservation, nous vous enverrons un formulaire de préparation à remplir afin de bien préparer l’échange.",
    seeProcess: "Comprendre le processus",
    processTitle: "Un parcours clair, de l’idée à la demande",
    stages: [
      ["Préciser vos objectifs", "Lors d’un appel découverte, nous discutons de votre organisation, du projet, de l’échéancier et des résultats visés."],
      ["Vérifier la préparation et la pertinence", "Nous examinons les critères d’admissibilité de base, l’étape du projet, les documents disponibles et les contraintes de mise de fonds ou de calendrier."],
      ["Repérer les possibilités pertinentes", "Nous comparons les programmes et options de financement au projet, puis partageons une présélection à examiner."],
      ["Préparer une demande complète", "Avec votre approbation écrite, nous organisons les pièces justificatives, structurons le projet, préparons le budget et rédigeons la demande pour votre révision."],
      ["Déposer et assurer le suivi", "Nous soutenons le dépôt et les suivis raisonnables. Vous prenez les décisions de financement et approuvez le contenu soumis."],
    ],
    focusTitle: "Un soutien centré sur le projet",
    focusIntro: "Une bonne demande relie un besoin réel aux critères du programme, à un plan réalisable et à des preuves crédibles. Nous vous aidons à réunir ces éléments.",
    focus: [
      ["Clarté du projet", "Définir le besoin, les activités, les jalons, les bénéficiaires visés et les résultats avant de choisir un programme."],
      ["Pertinence du programme", "Comparer subventions, subventions salariales, remises et financement aux critères publiés et aux utilisations permises."],
      ["Préparation de la demande", "Repérer tôt les documents manquants et organiser les renseignements fournis dans un dossier cohérent et facile à examiner."],
    ],
    imageAlt: "Des mains examinent des documents financiers à côté d’une calculatrice et d’un ordinateur portable",
    teamAlt: "Un schéma relie la recherche de financement, l’évaluation de l’admissibilité, la préparation, le dépôt et le suivi",
    imageCaption: "Commencez par les besoins concrets de votre organisation.",
    shortlistTitle: "Une présélection, avant tout engagement",
    shortlistBody: "Les programmes évoluent. Nous vérifions les critères et les échéances actuels, expliquons la pertinence et les compromis, puis présentons les possibilités pertinentes. Vous choisissez si vous souhaitez poursuivre.",
    quoteTitle: "Une portée à examiner avant tout travail payant",
    quoteBody: "Après l’appel découverte, nous envoyons par courriel la prochaine étape recommandée, les livrables, l’échéancier et les frais propres au mandat. Aucun travail payant ne commence sans votre approbation écrite.",
    noGuarantee: "Aucune personne-conseil ne peut garantir une subvention ou un prêt. Chaque bailleur de fonds ou prêteur décide de l’admissibilité, de l’évaluation et de l’approbation. Nous aidons à préparer les demandes et aux démarches administratives, sans prêter de fonds ni fournir de conseils juridiques, fiscaux, comptables ou financiers réglementés.",
    ready: "Votre appel est déjà réservé? Remplir le formulaire de préparation",
    ctaBottom: "Traçons ensemble le parcours de financement de votre projet.",
    speak: "Discuter de vos objectifs de financement",
    contact: "Nous poser une question",
  },
} as const;

function StageIcon({ index }: { index: number }) {
  const drawings = [
    <><circle cx="12" cy="12" r="7"/><path d="M12 8v4l3 2"/></>,
    <><path d="M4 6h16M4 12h10M4 18h7"/><path d="m16 16 2 2 4-5"/></>,
    <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4M8 10h5M10.5 7.5v5"/></>,
    <><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v6h5M10 14h6M10 18h6"/></>,
    <><path d="M4 12h13"/><path d="m12 6 6 6-6 6"/><circle cx="19" cy="12" r="2"/></>,
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-7 w-7">{drawings[index]}</svg>;
}

export default function GrantsFinancing() {
  const { language } = useLanguage();
  const c = COPY[language];
  const fr = language === "fr";
  return (
    <div className="min-h-screen bg-background text-primary">
      <SEOHead title={`${fr ? "Subventions et financement" : "Grants & Financing"} | Performance Processes`} description={c.description} path="/grants-financing" />
      <Navbar />
      <main>
        <section className="grid border-b border-primary/10 bg-secondary lg:min-h-[590px] lg:grid-cols-2">
          <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-5 py-16 md:px-10 lg:py-24">
            <h1 className="text-display max-w-2xl text-5xl leading-[.98] md:text-7xl">{c.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{c.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:bg-accent hover:text-primary">{c.book} <span aria-hidden="true">↗</span></a>
              <a href="#process" className="border-b border-primary pb-1 text-sm">{c.seeProcess} ↓</a>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">{c.bookingNote}</p>
          </div>
          <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
            <img src={ownerImage} alt={c.imageAlt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 max-w-xs border-l-2 border-accent bg-background/95 px-5 py-4 text-sm leading-6">{c.imageCaption}</div>
            <svg className="absolute right-6 top-6 h-24 w-24 text-white/90" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="1"/>
              <path d="M50 12v76M12 50h76M23 23l54 54M77 23 23 77" stroke="currentColor" strokeWidth=".7"/>
              <circle cx="50" cy="50" r="6" fill="#e8b7c4"/>
            </svg>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 md:py-28">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-display max-w-2xl text-4xl md:text-5xl">{c.processTitle}</h2>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="self-start border-b border-primary pb-1 text-sm md:self-end">{c.book} ↗</a>
          </div>
          <div className="relative grid gap-8 md:grid-cols-5 md:gap-5">
            <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-6 hidden border-t border-primary/20 md:block" />
            {c.stages.map(([title,description],index)=>(
              <article key={title} className="relative border-t border-primary/15 pt-5 md:border-0 md:pt-0">
                <div className="mb-5 flex h-12 w-12 items-center justify-center border border-primary/25 bg-background text-accent md:relative md:z-10"><StageIcon index={index}/></div>
                <h3 className="text-display text-2xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 border-l-2 border-accent bg-secondary px-6 py-5 text-sm leading-6">
            <span className="font-semibold">{c.shortlistTitle}.</span> {c.shortlistBody}
          </div>
        </section>

        <section className="grid border-y border-primary/10 bg-secondary lg:grid-cols-2">
          <div className="relative flex min-h-[360px] items-center justify-center p-6 md:p-10 lg:min-h-[560px]">
            <img src={fundingPathwayMap} alt={c.teamAlt} loading="lazy" className="h-full max-h-[480px] w-full object-contain" />
          </div>
          <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-5 py-16 md:px-10 lg:py-24">
            <h2 className="text-display text-4xl md:text-5xl">{c.focusTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{c.focusIntro}</p>
            <div className="mt-8 divide-y divide-primary/15 border-y border-primary/15">
              {c.focus.map(([title,description])=><article key={title} className="grid gap-2 py-5 sm:grid-cols-[.65fr_1fr] sm:gap-6">
                <h3 className="font-semibold">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </article>)}
            </div>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="mt-8 self-start border-b border-primary pb-1 text-sm">{c.book} ↗</a>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <h2 className="text-display text-4xl md:text-5xl">{c.quoteTitle}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{c.quoteBody}</p>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="mt-7 inline-block bg-accent px-6 py-4 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">{c.speak} ↗</a>
          </div>
          <div className="border-l border-primary/15 pl-6 md:pl-8">
            <p className="text-sm leading-7 text-muted-foreground">{c.noGuarantee}</p>
            <Link href="/intake?kind=funding" className="mt-7 inline-block border-b border-primary pb-1 text-sm">{c.ready}</Link>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{c.bookingNote}</p>
          </div>
        </section>

        <section className="bg-primary px-5 py-16 text-primary-foreground md:py-20">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <h2 className="text-display max-w-2xl text-4xl md:text-5xl">{c.ctaBottom}</h2>
            <div className="flex flex-wrap gap-6">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="bg-accent px-6 py-4 text-sm font-medium text-primary hover:bg-background">{c.book} ↗</a>
              <Link href="/contact" className="self-center border-b border-primary-foreground/70 pb-1 text-sm">{c.contact}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
