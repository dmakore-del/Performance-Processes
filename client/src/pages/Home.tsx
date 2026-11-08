import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import advisoryTeamImage from "@assets/stock_photography/advisory-team.jpg";
import experiencedTeamImage from "@assets/stock_photography/experienced-team.jpg";
import financialPlanningImage from "@assets/stock_photography/financial-planning.jpg";
import webDevelopmentTeamImage from "@assets/image_search/web-digital-6804068.jpg";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";
const SHOWREEL_VIDEO = "/media/hero-services-2026-10.mp4";
const SHOWREEL_SCENE_SECONDS = 7.6;
const CLIENTS = [
  { name: "Vibes Lounge", href: "https://vibeslounge.ca" },
  { name: "Maison Sparkle Living", href: "https://maisonsparkleliving.com" },
  { name: "NextUp Canada", href: "https://nextupcan.ca" },
  { name: "TrueNorth Property & Facilities", href: "https://truenorthpf.ca" },
  { name: "OGB Supreme Records", href: "https://ogbsupremerecords.com" },
];
const SHOWREEL_SCENES = [
  {
    label: ["Formation et conseil", "Business formation & advisory"],
    description: ["Une conseillère dirige une réunion sur la création et la planification d’entreprise avec une équipe diversifiée.", "A business adviser leads a diverse team through company formation and business planning."],
  },
  {
    label: ["Sites web et systèmes d’entreprise", "Websites & business systems"],
    description: ["Une conseillère et ses collègues examinent des outils numériques sur un ordinateur portable.", "An adviser and colleagues review digital business tools together on a laptop."],
  },
  {
    label: ["Subventions et financement", "Grants & financing"],
    description: ["Une conseillère examine des projections financières et des documents de financement avec des clients.", "An adviser reviews financial projections and funding documents with clients."],
  },
] as const;
const SERVICE_IMAGES = [
  { src: advisoryTeamImage, alt: "Business advisers collaborating around a work table" },
  { src: experiencedTeamImage, alt: "Experienced professionals discussing business priorities" },
  { src: webDevelopmentTeamImage, alt: "Web developers working at computers in a shared technology office" },
  { src: financialPlanningImage, alt: "Financial planning documents, cash, a calculator, and a laptop being reviewed at a desk" },
] as const;

function HomeShowreel({ french }: { french: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [autoplayAllowed] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [userStarted, setUserStarted] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const shouldPlay = autoplayAllowed || userStarted;
  const scene = SHOWREEL_SCENES[sceneIndex];
  const languageIndex = french ? 0 : 1;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlay) return;

    video.muted = true;
    video.defaultMuted = true;
    void video.play().catch(() => setPlaybackBlocked(true));
  }, [shouldPlay]);

  const startVideo = () => {
    setUserStarted(true);
    if (videoFailed) {
      setVideoFailed(false);
      videoRef.current?.load();
    }
    void videoRef.current?.play().catch(() => setPlaybackBlocked(true));
  };

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
        onPlaying={() => setPlaybackBlocked(false)}
        onError={() => setVideoFailed(true)}
        aria-label={scene.description[languageIndex]}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/media/hero-services-2026-10.webm" type="video/webm" />
        <source src={SHOWREEL_VIDEO} type="video/mp4" />
      </video>
      {(!shouldPlay || playbackBlocked || videoFailed) && (
        <button
          type="button"
          onClick={startVideo}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-accent hover:text-primary"
        >
          {videoFailed
            ? (french ? "Vidéo indisponible — réessayer" : "Video unavailable — retry")
            : (french ? "Lire la vidéo sans son" : "Play the muted video")}
        </button>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-primary/10" />
      <div className="pointer-events-none absolute inset-0 border border-background/20" />
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
   const servicesHeading = fr ? "Nos services" : "Our services";
   const processHeading = fr ? "Notre processus" : "How we work";
   return <div className="min-h-[100dvh] bg-background"><SEOHead title={fr ? "Soutien à l’incorporation et sites web | Performance Processes" : "Business Setup, Incorporation Support & Websites | Performance Processes"} description={t.intro} path="/"/><Navbar/><main>
        <section className="relative overflow-hidden border-b border-border bg-background"><div className="container relative mx-auto grid max-w-7xl items-center gap-5 px-4 py-6 sm:gap-7 sm:px-5 sm:py-9 md:px-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-14 lg:py-14"><div className="contents lg:block"><h1 className="text-display order-2 max-w-3xl text-[3rem] leading-[.9] sm:text-6xl md:text-7xl lg:text-[5.7rem]">{fr ? "Lancer votre entreprise avec confiance." : "Build your business with confidence."}</h1><div className="order-3 mt-1 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-2 lg:mt-8"><Link href="/contact" className="bg-accent px-6 py-3.5 text-sm text-primary transition hover:bg-primary hover:text-primary-foreground sm:px-7 sm:py-4">{fr ? "Réserver une consultation" : "Book a Consultation"}</Link><a href="#services" className="border-b border-primary pb-2 text-sm text-primary transition hover:border-accent hover:text-accent">{t.explore}</a></div><p className="order-5 mt-0 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:order-none lg:mt-6">{t.intro}</p><p className="order-6 mt-0 text-xs leading-5 text-muted-foreground lg:order-none lg:mt-5">{fr ? "Toronto, Ontario · Au service des entrepreneurs canadiens" : "Toronto, Ontario · Supporting Canadian founders"}</p></div><div className="order-4 lg:order-none"><HomeShowreel french={fr}/></div></div></section>
     <section className="border-b border-border bg-secondary"><div className="container mx-auto grid max-w-7xl grid-cols-2 px-5 lg:grid-cols-4 md:px-8">{(fr ? ["Établissement", "Conseil", "Développement web", "Présence numérique"] : ["Business Setup", "Advisory", "Web Development", "Digital Presence"]).map((item, index) => <div key={item} className={`${index === 0 ? "bg-accent/25" : ""} border-r border-border py-5 pr-4 text-xs font-semibold uppercase tracking-[.08em] text-primary first:border-l first:pl-4 md:py-6 md:pl-6 md:first:pl-0`}>{item}</div>)}</div></section>
         <section className="border-y border-border py-20 md:py-24"><div className="container mx-auto max-w-6xl px-5 md:px-8"><div className="max-w-4xl"><h2 className="text-display text-4xl leading-tight md:text-6xl">{t.problem}</h2><p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{t.problemText}</p><Link href="/about" className="mt-7 inline-block border-b border-primary pb-1 text-sm">{fr ? "Découvrir notre approche" : "Get to know our approach"}</Link></div></div></section>
         <section id="services" className="bg-card py-20 text-primary sm:py-24 md:py-28">
           <div className="container mx-auto max-w-7xl px-5 md:px-8">
             <h2 className="text-display max-w-3xl text-4xl leading-[1.04] sm:text-5xl md:text-6xl">{servicesHeading}</h2>
             <div className="mt-9 grid gap-x-8 gap-y-12 border-t border-primary/15 pt-9 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
               {services.map(([title,desc,href], index)=>(
                 <Link key={href} href={href} className="group block min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                   <div className="aspect-[3/2] overflow-hidden bg-secondary">
                     <img src={SERVICE_IMAGES[index].src} alt={SERVICE_IMAGES[index].alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"/>
                   </div>
                   <div className="mt-5 grid gap-2 sm:grid-cols-[.9fr_1fr] sm:gap-5">
                     <h3 className="text-display text-2xl leading-tight md:text-3xl">{title}</h3>
                     <p className="text-sm leading-6 text-muted-foreground">{desc}</p>
                   </div>
                   <span className="mt-4 inline-block border-b border-primary pb-1 text-xs font-medium transition-colors group-hover:border-accent group-hover:text-accent">{fr ? "Découvrir le service" : "Explore service"}</span>
                 </Link>
               ))}
             </div>
           </div>
         </section>
       <section className="bg-secondary py-20 md:py-24"><div className="container mx-auto max-w-6xl px-5 md:px-8"><h2 className="text-display max-w-3xl text-4xl md:text-6xl">{processHeading}</h2><div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map(([title,desc])=><div key={title} className="border-t border-primary/30 pt-5"><h3 className="text-display text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p></div>)}</div></div></section>
       <section className="border-y border-border py-20 md:py-24"><div className="container mx-auto max-w-6xl px-5 md:px-8"><h2 className="text-display text-4xl md:text-5xl">{fr ? "Nos clients à l’honneur." : "Client Spotlight"}</h2><div className="mt-8 grid overflow-hidden border border-primary/15 bg-primary/15 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">{CLIENTS.map((client)=><a key={client.href} href={client.href} target="_blank" rel="noreferrer" aria-label={`${fr ? "Visiter le site de" : "Visit"} ${client.name}`} className="group flex min-h-36 flex-col justify-between bg-background p-6 transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"><span className="text-display text-xl leading-snug text-primary">{client.name}</span><span className="mt-6 text-xs text-muted-foreground">{fr ? "Visiter le site" : "Visit website"}</span></a>)}</div></div></section>
         <section className="border-y border-border py-20 md:py-24"><div className="container mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1fr_auto] md:items-end md:px-8"><div className="max-w-3xl"><h2 className="text-display text-4xl md:text-5xl">{t.proof}</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">{t.proofText}</p></div><Link href="/results" className="inline-block border-b border-primary pb-2 text-sm">{t.view}</Link></div></section>
         <section className="bg-primary px-5 py-16 text-primary-foreground md:py-20"><div className="container mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end md:px-8"><h2 className="text-display max-w-3xl text-4xl md:text-6xl">{t.cta}</h2><div className="flex flex-col items-start gap-4"><a href={BOOKINGS_URL} target="_blank" rel="noreferrer" className="inline-block bg-accent px-7 py-4 text-sm text-primary transition hover:bg-background">{t.book}</a><Link href="/contact" className="text-sm underline underline-offset-4">{fr ? "Envoyez-nous un message" : "Send us a message"}</Link></div></div></section>
  </main><Footer/></div>;
}