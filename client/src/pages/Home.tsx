import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";
const SHOWREEL_VIDEO = "/assets/videos/performance-processes-showreel-v3.mp4";
const SHOWREEL_SCENE_SECONDS = 3.65;
const CLIENTS = [
  { name: "Vibes Lounge", href: "https://vibeslounge.ca" },
  { name: "Maison Sparkle Living", href: "https://maisonsparkleliving.com" },
  { name: "NextUp Canada", href: "https://nextupcan.ca" },
  { name: "TrueNorth Property & Facilities", href: "https://truenorthpf.ca" },
];
const SHOWREEL_SCENES = [
  {
    label: ["Formation d’entreprise", "Business formation"],
    description: ["Une personne signe un document d’affaires.", "A person signs a business document."],
  },
  {
    label: ["Financement", "Funding support"],
    description: ["Des collègues examinent un ordinateur portable et des notes de projet ensemble.", "Colleagues review a laptop and project notes together."],
  },
  {
    label: ["Développement numérique", "Digital development"],
    description: ["Du code Python est affiché sur un écran d’ordinateur.", "Python code appears on a computer screen."],
  },
] as const;

function HomeShowreel({ french }: { french: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [autoplayAllowed] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [userStarted, setUserStarted] = useState(false);
  const shouldPlay = autoplayAllowed || userStarted;
  const scene = SHOWREEL_SCENES[sceneIndex];
  const languageIndex = french ? 0 : 1;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlay) return;

    video.muted = true;
    video.defaultMuted = true;
    void video.play().catch(() => undefined);
  }, [shouldPlay]);

  const updateScene = (video: HTMLVideoElement) => {
    const nextScene = Math.min(
      Math.floor(video.currentTime / SHOWREEL_SCENE_SECONDS),
      SHOWREEL_SCENES.length - 1,
    );
    setSceneIndex((current) => (current === nextScene ? current : nextScene));
  };

  return (
   <div className="relative aspect-video min-h-[240px] overflow-hidden bg-secondary md:min-h-[360px]">
      <video
        ref={videoRef}
        src={SHOWREEL_VIDEO}
        muted
        autoPlay={shouldPlay}
        loop
        playsInline
        preload={shouldPlay ? "auto" : "none"}
        onTimeUpdate={(event) => updateScene(event.currentTarget)}
        onSeeked={(event) => updateScene(event.currentTarget)}
        aria-label={scene.description[languageIndex]}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!shouldPlay && (
        <button
          type="button"
          onClick={() => setUserStarted(true)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-accent hover:text-primary"
        >
          {french ? "Lire la vidéo sans son" : "Play the muted video"}
        </button>
      )}
      <div className="pointer-events-none absolute inset-0 border border-primary/10" />
      <p className="absolute bottom-5 left-5 border-l-2 border-accent bg-primary/95 px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md">
        {scene.label[languageIndex]}
      </p>
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const t = fr ? { title: "De l’idée au lancement d’entreprise.", intro: "Performance Processes aide les entrepreneurs à incorporer, établir et lancer leur entreprise avec la stratégie, les systèmes, le site web et le soutien numérique nécessaires, au même endroit.", start: "Démarrer mon entreprise", explore: "Explorer nos services", problem: "Démarrer une entreprise ne devrait pas être si compliqué.", problemText: "De l’incorporation aux systèmes, au site web et à la présence numérique, nous réunissons les pièces dans un processus clair et guidé.", services: "Des services pour faire avancer votre entreprise", process: "Une progression simple, pas une autre liste de choses à faire.", proof: "Du travail réel. Des résultats concrets.", proofText: "Découvrez comment nos partenaires ont amélioré leurs systèmes, leur présence numérique et leur façon de travailler.", view: "Voir nos projets", cta: "Prêt à transformer votre idée en véritable entreprise?", ctaText: "Nous vous aiderons à identifier le meilleur point de départ.", book: "Réserver une consultation" } : { title: "From business idea to business launch.", intro: "Performance Processes helps entrepreneurs incorporate, establish, and professionally launch their businesses, with the strategy, systems, website, and digital support they need in one place.", start: "Start your business", explore: "Explore our services", problem: "Starting a business should not feel this complicated.", problemText: "From incorporation through systems, a website, and a digital presence, we bring the pieces together in one clear, guided process.", services: "Services for your next stage", process: "A simple progression, not another overwhelming to do list.", proof: "Real work. Practical outcomes.", proofText: "See how our partners have strengthened their systems, digital presence, and ways of working.", view: "View our work", cta: "Ready to turn your idea into a real business?", ctaText: "We will help you identify the best place to begin.", book: "Book your consultation" };
  const services = fr ? [["Formation d’entreprise", "Soutien à l’incorporation, à l’enregistrement et aux premières étapes.", "/start-a-business"], ["Mise en place", "Les outils, offres et flux de travail qui rendent votre entreprise réelle.", "/business-setup"], ["Sites web et numérique", "Une présence professionnelle prête pour les demandes et réservations.", "/websites-digital"], ["Subventions et financement", "Recherche de possibilités, préparation aux demandes et accompagnement au financement.", "/grants-financing"]] : [["Business Formation", "Incorporation support, registration guidance, and first steps.", "/start-a-business"], ["Business Setup", "The tools, offers, and workflows that make your business real.", "/business-setup"], ["Websites & Digital", "A professional presence ready for enquiries and bookings.", "/websites-digital"], ["Grants & Financing", "Opportunity research, application preparation, and business funding support.", "/grants-financing"]];
  const steps = fr ? [["Consulter", "Nous découvrons votre idée, votre étape et vos objectifs."], ["Établir", "Nous formalisons l’entreprise et ses priorités."], ["Bâtir", "Nous créons vos systèmes et vos fondations numériques."], ["Lancer", "Vous entrez sur le marché préparé et accompagné."]] : [["Consult", "We learn your idea, stage, and launch goals."], ["Establish", "We formalize the business and its priorities."], ["Build", "We create your systems and digital foundations."], ["Launch", "You enter the market prepared and supported."]];
  return <div className="min-h-[100dvh] bg-background"><SEOHead title={fr ? "Soutien à l’incorporation et sites web | Performance Processes" : "Business Setup, Incorporation Support & Websites | Performance Processes"} description={t.intro} path="/"/><Navbar/><main>
     <section className="border-b border-border bg-white"><div className="container mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 md:grid-cols-[.86fr_1.14fr] md:px-8 md:py-10 lg:gap-16"><div className="animate-fade-in-up"><h1 className="text-display max-w-3xl text-6xl leading-[.88] sm:text-7xl md:text-7xl">{fr ? "Lancer votre entreprise avec confiance." : "Build your business with confidence."}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{t.intro}</p><div className="mt-7 flex flex-wrap items-center gap-6"><Link href="/contact" className="bg-accent px-7 py-4 text-sm text-primary transition hover:bg-primary hover:text-primary-foreground">{fr ? "Réserver une consultation" : "Book a Consultation"} <span aria-hidden="true">→</span></Link><Link href="/business-setup" className="border-b border-primary pb-2 text-sm text-primary transition hover:border-accent hover:text-accent">{fr ? "Explorer les services" : "Explore Services"} <span aria-hidden="true">→</span></Link></div></div><HomeShowreel french={fr}/></div></section>
    <section className="border-b border-border bg-white"><div className="container mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-4 md:px-8">{(fr ? ["Établissement", "Conseil", "Développement web", "Présence numérique"] : ["Business Setup", "Advisory", "Web Development", "Digital Presence"]).map((item, index) => <div key={item} className={`${index === 0 ? "bg-accent/25" : ""} border-r border-border py-5 pr-4 text-xs font-semibold uppercase tracking-[.08em] text-primary first:border-l first:pl-4 md:py-6 md:pl-6 md:first:pl-0`}>{item}</div>)}</div></section>
     <section className="py-24 md:py-32"><div className="container mx-auto max-w-6xl px-5 md:px-8"><div className="max-w-3xl"><h2 className="text-display text-4xl leading-tight md:text-6xl">{t.problem}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{t.problemText}</p></div></div></section>
     <section id="services" className="bg-card py-28 text-primary"><div className="container mx-auto max-w-6xl px-5 md:px-8"><h2 className="text-display max-w-xl text-5xl md:text-6xl">{t.services}</h2><div className="mt-12 border-t border-primary/20">{services.map(([title,desc,href])=><Link key={href} href={href} className="group grid gap-3 border-b border-primary/20 py-8 md:grid-cols-[1fr_1.1fr_auto] md:items-center"><h3 className="text-display text-3xl">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{desc}</p><span className="text-2xl transition-transform group-hover:translate-x-2">↗</span></Link>)}</div></div></section>
     <section className="bg-secondary py-28"><div className="container mx-auto max-w-6xl px-5 md:px-8"><h2 className="text-display max-w-3xl text-4xl md:text-6xl">{t.process}</h2><div className="mt-14 grid gap-8 md:grid-cols-4">{steps.map(([title,desc])=><div key={title} className="border-t border-primary/30 pt-5"><h3 className="text-display mt-5 text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p></div>)}</div></div></section>
     <section className="border-y border-primary/10 py-20 md:py-24"><div className="container mx-auto max-w-6xl px-5 md:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[.2em] text-muted-foreground">{fr ? "Organisations accompagnées" : "Organizations we’ve worked with"}</p><h2 className="text-display mt-3 text-4xl md:text-5xl">{fr ? "Nos clients à l’honneur." : "Client Spotlight"}</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">{fr ? "Découvrez quelques organisations qui ont confié à Performance Processes des projets d’affaires et numériques." : "Explore a few organizations that have worked with Performance Processes on business and digital projects."}</p></div><div className="mt-10 grid overflow-hidden border border-primary/15 bg-primary/15 sm:grid-cols-2 lg:grid-cols-4">{CLIENTS.map((client)=><a key={client.href} href={client.href} target="_blank" rel="noreferrer" aria-label={`${fr ? "Visiter le site de" : "Visit"} ${client.name}`} className="group flex min-h-36 flex-col justify-between bg-background p-6 transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"><span className="text-display text-xl leading-snug text-primary">{client.name}</span><span className="mt-6 flex items-center justify-between text-xs text-muted-foreground"><span>{fr ? "Visiter le site" : "Visit website"}</span><span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">↗</span></span></a>)}</div></div></section>
     <section className="border-y border-border py-24 md:py-28"><div className="container mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1fr_auto] md:items-end md:px-8"><div className="max-w-3xl"><h2 className="text-display text-4xl md:text-5xl">{t.proof}</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">{t.proofText}</p></div><Link href="/results" className="inline-block border-b border-primary pb-2 text-sm">{t.view} <span aria-hidden="true">↗</span></Link></div></section>
     <section className="bg-secondary py-28"><div className="container mx-auto max-w-4xl px-5"><h2 className="text-display text-4xl md:text-6xl">{t.cta}</h2><p className="mt-6 max-w-xl text-lg text-muted-foreground">{t.ctaText}</p><a href={BOOKINGS_URL} target="_blank" rel="noreferrer" className="mt-10 inline-block bg-accent px-8 py-4 text-sm text-primary transition hover:bg-primary hover:text-primary-foreground">{t.book} <span aria-hidden="true">↗</span></a></div></section>
  </main><Footer/></div>;
}