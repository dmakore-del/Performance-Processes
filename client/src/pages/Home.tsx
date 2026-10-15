import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Building2, Landmark, Monitor, Workflow } from "lucide-react";
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
const SERVICE_ICONS = [Building2, Workflow, Monitor, Landmark] as const;

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
    <div className="relative aspect-video w-full min-w-0 overflow-hidden bg-primary">
      <video
        ref={videoRef}
        muted
        autoPlay={shouldPlay}
        loop
        playsInline
        preload={shouldPlay ? "auto" : "none"}
        onTimeUpdate={(event) => updateScene(event.currentTarget)}
        onSeeked={(event) => updateScene(event.currentTarget)}
        aria-label={scene.description[languageIndex]}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/videos/performance-processes-showreel-v3.webm" type="video/webm" />
        <source src={SHOWREEL_VIDEO} type="video/mp4" />
      </video>
      {!shouldPlay && (
        <button
          type="button"
          onClick={() => setUserStarted(true)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-accent hover:text-primary"
        >
          {french ? "Lire la vidéo sans son" : "Play the muted video"}
        </button>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-primary/10" />
      <div className="pointer-events-none absolute inset-0 border border-background/20" />
      <div className="absolute right-5 top-5 hidden items-center gap-3 border border-background/40 bg-primary/45 px-4 py-3 text-primary-foreground backdrop-blur-sm sm:flex">
        <span className="h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
        <span className="eyebrow text-[9px] uppercase tracking-[.16em]">{french ? "Des idées en mouvement" : "Ideas in motion"}</span>
      </div>
      <p className="absolute bottom-5 left-5 border-l-2 border-accent bg-primary/95 px-4 py-3 text-sm font-semibold text-primary-foreground">
        {scene.label[languageIndex]}
      </p>
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const fr = language === "fr";
   const t = fr ? { title: "De l’idée au lancement d’entreprise.", intro: "Performance Processes aide les entrepreneurs à incorporer, établir et lancer leur entreprise avec la stratégie, les systèmes, le site web et le soutien numérique nécessaires, au même endroit.", start: "Démarrer mon entreprise", explore: "Explorer nos services", problem: "Démarrer une entreprise ne devrait pas être si compliqué.", problemText: "De l’incorporation aux systèmes, au site web et à la présence numérique, nous réunissons les pièces dans un processus clair et guidé.", services: "Des services pour faire avancer votre entreprise", process: "Une progression simple, pas une autre liste de choses à faire.", proof: "Du travail réel. Des résultats concrets.", proofText: "Découvrez comment nos partenaires ont amélioré leurs systèmes, leur présence numérique et leur façon de travailler.", view: "Voir nos projets", cta: "Prêt à transformer votre idée en véritable entreprise?", ctaText: "Nous vous aiderons à identifier le meilleur point de départ.", book: "Réserver une consultation", based: "Partenaire de lancement d’entreprise à Toronto", bridge: "Les bonnes décisions, dans le bon ordre.", bridgeText: "Lancer une entreprise implique plusieurs pièces qui doivent fonctionner ensemble. Nous vous aidons à voir ce qui compte maintenant, puis à le mettre en place sans perdre de vue la suite.", find: "Trouvez votre point de départ", note: "Pas besoin d’avoir tout compris avant la première conversation." } : { title: "From business idea to business launch.", intro: "Performance Processes helps entrepreneurs incorporate, establish, and professionally launch their businesses, with the strategy, systems, website, and digital support they need in one place.", start: "Start your business", explore: "Explore our services", problem: "Starting a business should not feel this complicated.", problemText: "From incorporation through systems, a website, and a digital presence, we bring the pieces together in one clear, guided process.", services: "Services for your next stage", process: "A simple progression, not another overwhelming to do list.", proof: "Real work. Practical outcomes.", proofText: "See how our partners have strengthened their systems, digital presence, and ways of working.", view: "View our work", cta: "Ready to turn your idea into a real business?", ctaText: "We will help you identify the best place to begin.", book: "Book your consultation", based: "Toronto-based business-building partner", bridge: "The right decisions, in the right order.", bridgeText: "Starting a business means several moving parts need to work together. We help you see what matters now, then put it in place without losing sight of what comes next.", find: "Find your starting point", note: "You do not need to have it all figured out before the first conversation." };
  const services = fr ? [["Formation d’entreprise", "Soutien à l’incorporation, à l’enregistrement et aux premières étapes.", "/start-a-business"], ["Mise en place", "Les outils, offres et flux de travail qui rendent votre entreprise réelle.", "/business-setup"], ["Sites web et numérique", "Une présence professionnelle prête pour les demandes et réservations.", "/websites-digital"], ["Subventions et financement", "Recherche de possibilités, préparation aux demandes et accompagnement au financement.", "/grants-financing"]] : [["Business Formation", "Incorporation support, registration guidance, and first steps.", "/start-a-business"], ["Business Setup", "The tools, offers, and workflows that make your business real.", "/business-setup"], ["Websites & Digital", "A professional presence ready for enquiries and bookings.", "/websites-digital"], ["Grants & Financing", "Opportunity research, application preparation, and business funding support.", "/grants-financing"]];
  const steps = fr ? [["Consulter", "Nous découvrons votre idée, votre étape et vos objectifs."], ["Établir", "Nous formalisons l’entreprise et ses priorités."], ["Bâtir", "Nous créons vos systèmes et vos fondations numériques."], ["Lancer", "Vous entrez sur le marché préparé et accompagné."]] : [["Consult", "We learn your idea, stage, and launch goals."], ["Establish", "We formalize the business and its priorities."], ["Build", "We create your systems and digital foundations."], ["Launch", "You enter the market prepared and supported."]];
   return <div className="min-h-[100dvh] bg-background"><SEOHead title={fr ? "Soutien à l’incorporation et sites web | Performance Processes" : "Business Setup, Incorporation Support & Websites | Performance Processes"} description={t.intro} path="/"/><Navbar/><main>
      <section className="relative overflow-hidden border-b border-border bg-background"><div className="pointer-events-none absolute -right-24 top-0 h-[34rem] w-[34rem] rounded-full border border-accent/50"/><div className="container relative mx-auto grid max-w-7xl items-center gap-5 px-4 py-6 sm:gap-7 sm:px-5 sm:py-9 md:px-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-14 lg:py-14"><div className="contents lg:block"><p className="eyebrow order-1 mb-0 text-muted-foreground lg:mb-5">{t.based}</p><h1 className="text-display order-2 max-w-3xl text-[3rem] leading-[.9] sm:text-6xl md:text-7xl lg:text-[5.7rem]">{fr ? "Lancer votre entreprise avec confiance." : "Build your business with confidence."}</h1><div className="order-3 mt-1 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-2 lg:mt-8"><Link href="/contact" className="bg-accent px-6 py-3.5 text-sm text-primary transition hover:bg-primary hover:text-primary-foreground sm:px-7 sm:py-4">{fr ? "Réserver une consultation" : "Book a Consultation"} <span aria-hidden="true">→</span></Link><a href="#services" className="border-b border-primary pb-2 text-sm text-primary transition hover:border-accent hover:text-accent">{t.explore} <span aria-hidden="true">↓</span></a></div><p className="order-5 mt-0 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:order-none lg:mt-6">{t.intro}</p><p className="order-6 mt-0 text-xs leading-5 text-muted-foreground lg:order-none lg:mt-5">{fr ? "Toronto, Ontario · Au service des entrepreneurs canadiens" : "Toronto, Ontario · Supporting Canadian founders"}</p></div><div className="order-4 lg:order-none"><HomeShowreel french={fr}/></div></div></section>
     <section className="border-b border-border bg-secondary"><div className="container mx-auto grid max-w-7xl grid-cols-2 px-5 lg:grid-cols-4 md:px-8">{(fr ? ["Établissement", "Conseil", "Développement web", "Présence numérique"] : ["Business Setup", "Advisory", "Web Development", "Digital Presence"]).map((item, index) => <div key={item} className={`${index === 0 ? "bg-accent/25" : ""} border-r border-border py-5 pr-4 text-xs font-semibold uppercase tracking-[.08em] text-primary first:border-l first:pl-4 md:py-6 md:pl-6 md:first:pl-0`}>{item}</div>)}</div></section>
       <section className="relative overflow-hidden py-24 md:py-32"><div aria-hidden="true" className="pp-grid absolute inset-y-0 right-0 hidden w-[35%] opacity-40 md:block"/><div className="container relative mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="max-w-3xl"><p className="eyebrow mb-5 text-muted-foreground">{fr ? "L’entreprise, en perspective" : "The bigger picture"}</p><h2 className="text-display text-4xl leading-tight md:text-6xl">{t.problem}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{t.problemText}</p></div><div className="border-l-2 border-accent bg-secondary px-7 py-8 lg:ml-8 lg:px-9"><p className="text-display text-3xl leading-tight md:text-4xl">{t.bridge}</p><p className="mt-5 text-sm leading-7 text-muted-foreground">{t.bridgeText}</p><Link href="/about" className="mt-7 inline-block border-b border-primary pb-1 text-sm">{fr ? "Découvrir notre approche" : "Get to know our approach"} <span aria-hidden="true">↗</span></Link></div></div></section>
       <section id="services" className="bg-card py-24 text-primary md:py-28"><div className="container mx-auto max-w-6xl px-5 md:px-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow mb-4 text-muted-foreground">{fr ? "Un soutien adapté à votre étape" : "Support for your stage"}</p><h2 className="text-display max-w-xl text-5xl md:text-6xl">{t.services}</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">{fr ? "Choisissez un point de départ. Nous relierons le reste à votre rythme." : "Choose a starting point. We’ll connect the rest at a pace that fits."}</p></div><div className="mt-12 border-t border-primary/20">{services.map(([title,desc,href], index)=>{const ServiceIcon=SERVICE_ICONS[index];return <Link key={href} href={href} className="group grid gap-3 border-b border-primary/20 py-7 md:grid-cols-[3.25rem_1fr_auto] md:items-center md:gap-x-5 md:gap-y-1 md:py-8 lg:grid-cols-[4rem_1fr_1.1fr_auto] lg:gap-4"><span aria-hidden="true" className="flex h-12 w-12 items-center justify-center border border-primary/20 text-accent md:col-start-1 md:row-span-2 lg:row-span-1"><ServiceIcon size={21} strokeWidth={1.5}/></span><h3 className="text-display text-3xl md:col-start-2 lg:row-start-1">{title}</h3><p className="text-sm leading-6 text-muted-foreground md:col-start-2 lg:col-start-3 lg:row-start-1">{desc}</p><span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-2 md:col-start-3 md:row-span-2 md:row-start-1 md:self-center lg:col-start-4 lg:row-span-1">↗</span></Link>})}</div></div></section>
      <section className="bg-secondary py-24 md:py-28"><div className="container mx-auto max-w-6xl px-5 md:px-8"><div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><p className="eyebrow mb-4 text-muted-foreground">{fr ? "De l’idée à l’action" : "From idea to action"}</p><h2 className="text-display max-w-3xl text-4xl md:text-6xl">{t.process}</h2></div><p className="max-w-lg text-sm leading-7 text-muted-foreground">{fr ? "Vous gardez une vue d’ensemble pendant que les priorités avancent une à une." : "Keep the full picture in view while the priorities move forward one at a time."}</p></div><div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map(([title,desc],index)=><div key={title} className="border-t border-primary/30 pt-5"><div aria-hidden="true" className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background"><span className="h-2 w-2 rounded-full bg-accent"/></div><h3 className="text-display text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p></div>)}</div></div></section>
      <section className="border-y border-border py-20 md:py-24"><div className="container mx-auto max-w-6xl px-5 md:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow text-muted-foreground">{fr ? "Organisations accompagnées" : "Organizations we’ve worked with"}</p><h2 className="text-display mt-3 text-4xl md:text-5xl">{fr ? "Nos clients à l’honneur." : "Client Spotlight"}</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">{fr ? "Découvrez quelques organisations qui ont confié à Performance Processes des projets d’affaires et numériques." : "Explore a few organizations that have worked with Performance Processes on business and digital projects."}</p></div><div className="mt-10 grid overflow-hidden border border-primary/15 bg-primary/15 sm:grid-cols-2 lg:grid-cols-4">{CLIENTS.map((client)=><a key={client.href} href={client.href} target="_blank" rel="noreferrer" aria-label={`${fr ? "Visiter le site de" : "Visit"} ${client.name}`} className="group flex min-h-36 flex-col justify-between bg-background p-6 transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"><span className="text-display text-xl leading-snug text-primary">{client.name}</span><span className="mt-6 flex items-center justify-between text-xs text-muted-foreground"><span>{fr ? "Visiter le site" : "Visit website"}</span><span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">↗</span></span></a>)}</div></div></section>
      <section className="border-y border-border py-20 md:py-24"><div className="container mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1fr_auto] md:items-end md:px-8"><div className="max-w-3xl"><p className="eyebrow mb-4 text-muted-foreground">{fr ? "Du travail réel. Des résultats concrets." : "Real work. Practical outcomes."}</p><h2 className="text-display text-4xl md:text-5xl">{t.proof}</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">{t.proofText}</p></div><Link href="/results" className="inline-block border-b border-primary pb-2 text-sm">{t.view} <span aria-hidden="true">↗</span></Link></div></section>
       <section className="bg-primary px-5 py-20 text-primary-foreground md:py-24"><div className="container mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><p className="eyebrow mb-5 text-primary-foreground/65">{fr ? "Votre prochaine étape commence ici" : "Your next step starts here"}</p><h2 className="text-display text-4xl md:text-6xl">{t.cta}</h2><p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">{t.ctaText}</p></div><div className="border border-primary-foreground/20 bg-primary-foreground/[.04] p-7 md:p-9"><p className="text-display text-2xl">{t.find}</p><p className="mt-3 text-sm leading-6 text-primary-foreground/70">{t.note}</p><a href={BOOKINGS_URL} target="_blank" rel="noreferrer" className="mt-7 inline-block bg-accent px-7 py-4 text-sm text-primary transition hover:bg-background">{t.book} <span aria-hidden="true">↗</span></a><p className="mt-4 text-xs text-primary-foreground/60">{fr ? "Ou" : "Or"} <Link href="/contact" className="underline underline-offset-4">{fr ? "envoyez-nous un message" : "send us a message"}</Link></p></div></div></section>
  </main><Footer/></div>;
}