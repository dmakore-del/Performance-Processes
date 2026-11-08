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
import { bookingHref, trackAcquisition } from "@/lib/acquisition";

const SHOWREEL_VIDEO = "/media/hero-services-2026-10.mp4";
const SHOWREEL_SCENE_SECONDS = 7.6;

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
  { src: webDevelopmentTeamImage, alt: "Web developers working at computers in a shared technology office" },
  { src: experiencedTeamImage, alt: "Experienced professionals discussing business priorities" },
  { src: financialPlanningImage, alt: "Financial planning documents and a calculator being reviewed at a desk" },
] as const;

const CLIENTS = [
  { name: "Vibes Lounge", href: "https://vibeslounge.ca" },
  { name: "Maison Sparkle Living", href: "https://maisonsparkleliving.com" },
  { name: "NextUp Canada", href: "https://nextupcan.ca" },
  { name: "TrueNorth Property & Facilities", href: "https://truenorthpf.ca" },
  { name: "OGB Supreme Records", href: "https://ogbsupremerecords.com" },
];

function HomeShowreel({ french }: { french: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [autoplayAllowed] = useState(() => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
    const nextScene = Math.min(Math.floor(video.currentTime / SHOWREEL_SCENE_SECONDS), SHOWREEL_SCENES.length - 1);
    setSceneIndex((current) => current === nextScene ? current : nextScene);
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-primary">
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
        <button type="button" onClick={startVideo} className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-accent hover:text-primary">
          {videoFailed ? (french ? "Vidéo indisponible, réessayer" : "Video unavailable, retry") : (french ? "Lire la vidéo sans son" : "Play the muted video")}
        </button>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-primary/10" />
      <p className="absolute bottom-5 left-5 border-l-2 border-accent bg-primary/95 px-4 py-3 text-sm font-semibold text-primary-foreground">{scene.label[languageIndex]}</p>
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const content = fr ? {
    eyebrow: "Performance Processes · Toronto, Ontario",
    title: "Start Strong. Operate Smarter. Grow With Confidence.",
    intro: "Nous aidons les entrepreneurs à lancer leur entreprise et accompagnons les entreprises établies dans l’amélioration de leurs sites web, systèmes numériques et processus.",
    start: "Démarrer une entreprise", grow: "Faire croître votre entreprise", consult: "Réserver une consultation",
    audienceTitle: "Un accompagnement adapté à votre étape",
    launchTitle: "Je démarre une entreprise", launchText: "Clarifiez les premières décisions, organisez votre mise en place et préparez une présence professionnelle pour vos clients.",
    growthTitle: "J’exploite déjà une entreprise", growthText: "Améliorez votre site web, simplifiez les tâches récurrentes et mettez en place des systèmes mieux adaptés à votre travail.",
    servicesTitle: "Des fondations solides, des outils qui fonctionnent ensemble",
    services: [
      ["Formation et mise en place", "Orientation pour l’enregistrement, l’organisation des exigences de démarrage et la préparation au lancement.", "/start-a-business"],
      ["Sites web et présence numérique", "Un site clair et professionnel qui présente vos services et facilite les demandes des clients.", "/websites-digital"],
      ["Systèmes et processus d’entreprise", "Des flux de travail plus clairs et des outils numériques pratiques pour les activités récurrentes.", "/grow-your-business"],
      ["Subventions et préparation au financement", "Recherche de possibilités, organisation des renseignements d’entreprise et préparation aux demandes.", "/grants-financing"],
    ],
    whyTitle: "Un partenaire de mise en œuvre, pas une liste de recommandations.",
    reasons: [
      ["Un accompagnement relié", "La mise en place, les outils numériques et les opérations sont considérés ensemble."],
      ["Des solutions pratiques", "Les prochaines étapes sont choisies selon vos priorités actuelles et votre contexte."],
      ["Des livrables clairs", "Le travail convenu et ses résultats sont définis avant le début du projet."],
      ["Un périmètre adapté", "Le soutien est ajusté à l’étape et aux besoins de votre entreprise."],
    ],
    processTitle: "Comment nous travaillons",
    process: [["Découvrir", "Comprendre votre entreprise, vos objectifs et vos défis."], ["Planifier", "Définir un périmètre, des livrables et des étapes pratiques."], ["Bâtir", "Mettre en œuvre les solutions convenues ensemble."], ["Lancer et améliorer", "Examiner le travail terminé et préparer la suite."]],
    workTitle: "Des entreprises que nous avons accompagnées",
    workText: "Consultez des liens vers les entreprises clientes approuvées. Nous n’attribuons pas de services ou de résultats non vérifiés.",
    workLink: "Découvrir notre travail",
    faqTitle: "Questions fréquentes",
    faqs: [
      ["Dois-je incorporer mon entreprise?", "Pas nécessairement. La structure appropriée dépend de votre situation, de vos activités et de vos objectifs. Nous pouvons clarifier les étapes administratives et les moments où un avis juridique ou fiscal est nécessaire."],
      ["Que comprend un projet?", "Le périmètre dépend de vos priorités et de la complexité du travail. Nous discutons des livrables et des honoraires proposés avant le début du projet."],
      ["Combien de temps faut-il?", "Les échéanciers varient selon les services, les décisions à prendre et les éléments que vous fournissez. Un échéancier réaliste est défini avec le périmètre."],
      ["Offrez-vous des subventions?", "Nous pouvons discuter de la recherche de financement et de la préparation de demandes selon le programme et votre situation. L’admissibilité et l’approbation relèvent des organismes de financement."],
    ],
    resourcesTitle: "Des outils utiles pour votre prochaine étape",
    resourceStartup: "Liste de vérification pour démarrer une entreprise",
    resourceDigital: "Liste de vérification de préparation numérique",
    resourceText: "Téléchargez des listes de travail pour organiser vos questions et prochaines étapes.",
    finalTitle: "Prêt à faire avancer votre entreprise?",
    finalText: "Parlons de votre étape actuelle et identifions le travail qui vous aidera à avancer.",
  } : {
    eyebrow: "Performance Processes · Toronto, Ontario",
    title: "Start Strong. Operate Smarter. Grow With Confidence.",
    intro: "We help entrepreneurs launch their businesses and support established businesses with better websites, digital systems, and processes.",
    start: "Start a Business", grow: "Grow Your Business", consult: "Book a consultation",
    audienceTitle: "Support for the stage you are in",
    launchTitle: "I’m starting a business", launchText: "Clarify early decisions, organize your setup, and prepare a professional presence for your first customers.",
    growthTitle: "I already run a business", growthText: "Improve your website, simplify recurring work, and put systems in place that better fit the way you operate.",
    servicesTitle: "Strong foundations, tools that work together",
    services: [
      ["Business Formation & Setup", "Registration guidance, organized startup requirements, and practical launch preparation.", "/start-a-business"],
      ["Websites & Digital Presence", "A clear, professional website that explains your services and makes customer enquiries easier.", "/websites-digital"],
      ["Business Systems & Processes", "Clearer workflows and practical digital tools for recurring business activities.", "/grow-your-business"],
      ["Grants & Funding Readiness", "Opportunity research, business information organization, and application-readiness support.", "/grants-financing"],
    ],
    whyTitle: "An implementation partner, not another list of recommendations.",
    reasons: [
      ["Connected support", "Business setup, digital tools, and operations are considered together."],
      ["Practical solutions", "Next steps reflect your current priorities and business context."],
      ["Clear deliverables", "The agreed work and its outputs are defined before a project begins."],
      ["A tailored scope", "Support is shaped around your business stage and needs."],
    ],
    processTitle: "How we work",
    process: [["Discover", "Understand your business, goals, and challenges."], ["Plan", "Define a practical scope, deliverables, and next steps."], ["Build", "Implement the solutions agreed together."], ["Launch & improve", "Review the completed work and prepare for what comes next."]],
    workTitle: "Businesses we have supported",
    workText: "Explore links to approved client businesses. We do not assign unverified services or outcomes.",
    workLink: "Explore our work",
    faqTitle: "Common questions",
    faqs: [
      ["Do I need to incorporate my business?", "Not necessarily. The right structure depends on your circumstances, activities, and goals. We can clarify administrative steps and when legal or tax advice may be needed."],
      ["What does a project include?", "Scope depends on your priorities and the complexity of the work. We discuss proposed deliverables and fees before work begins."],
      ["How long does the work take?", "Timing varies with the services, decisions, and materials involved. We set a realistic schedule as part of defining the scope."],
      ["Do you provide grants?", "We can discuss funding research and application-readiness support based on the program and your circumstances. Eligibility and approval are determined by funding organizations."],
    ],
    resourcesTitle: "Useful tools for your next step",
    resourceStartup: "Business launch checklist",
    resourceDigital: "Digital readiness checklist",
    resourceText: "Use these working checklists to organize questions and next steps.",
    finalTitle: "Ready to move your business forward?",
    finalText: "Tell us where you are now and identify the work that will help you move ahead.",
  };
  const resources = [
    { label: content.resourceStartup, href: "/resources/business-launch-checklist.html", key: "business-launch" },
    { label: content.resourceDigital, href: "/resources/digital-readiness-checklist.html", key: "digital-readiness" },
  ];
  return (
    <div className="min-h-[100dvh] bg-background">
      <SEOHead title={fr ? "Lancement et croissance d’entreprise | Performance Processes" : "Business Launch & Growth Solutions | Performance Processes"} description={content.intro} path="/" />
      <Navbar />
      <main>
        <section className="border-b border-border bg-background">
          <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-14 lg:py-20">
            <div>
              <h1 className="text-display max-w-3xl text-5xl leading-[.96] sm:text-6xl lg:text-[5.1rem]">{content.title}</h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{content.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/start-a-business" onClick={() => trackAcquisition("select_service", { customerType: "launch" })} className="bg-accent px-5 py-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{content.start}</Link>
                <Link href="/grow-your-business" onClick={() => trackAcquisition("select_service", { customerType: "growth" })} className="border border-primary/30 px-5 py-4 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">{content.grow}</Link>
              </div>
              <Link href={bookingHref()} onClick={() => trackAcquisition("booking_started")} className="mt-5 inline-block border-b border-primary pb-1 text-sm font-medium">{content.consult}</Link>
            </div>
            <HomeShowreel french={fr} />
          </div>
        </section>

        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="text-display max-w-3xl text-4xl md:text-5xl">{content.audienceTitle}</h2>
            <div className="mt-8 grid gap-px border border-primary/15 bg-primary/15 md:grid-cols-2">
              {[{ title: content.launchTitle, text: content.launchText, href: "/start-a-business", type: "launch" as const }, { title: content.growthTitle, text: content.growthText, href: "/grow-your-business", type: "growth" as const }].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => trackAcquisition("select_service", { customerType: item.type })} className="group flex min-h-56 flex-col justify-between bg-background p-7 transition-colors hover:bg-[#fbf2f3] sm:p-9">
                  <div><h3 className="text-display text-3xl sm:text-4xl">{item.title}</h3><p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">{item.text}</p></div>
                  <span className="mt-8 w-fit border-b border-primary pb-1 text-sm font-medium group-hover:border-accent">{item.type === "launch" ? content.start : content.grow}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="max-w-3xl"><h2 className="text-display text-4xl md:text-6xl">{content.servicesTitle}</h2></div>
            <div className="mt-10 grid gap-x-8 gap-y-12 border-t border-primary/15 pt-8 sm:grid-cols-2">
              {content.services.map(([title, description, href], index) => (
                <Link key={title} href={href} onClick={() => trackAcquisition("select_service", { customerType: index === 2 ? "growth" : "launch" })} className="group block">
                  <div className="aspect-[1.6] overflow-hidden bg-secondary"><img src={SERVICE_IMAGES[index].src} alt={SERVICE_IMAGES[index].alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" /></div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-[.95fr_1fr] sm:gap-5"><h3 className="text-display text-2xl leading-tight md:text-3xl">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{description}</p></div>
                  <span className="mt-4 inline-block border-b border-primary pb-1 text-xs font-medium">{fr ? "Explorer le service" : "Explore the service"}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-primary-foreground md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[.85fr_1.15fr]">
            <h2 className="text-display max-w-xl text-4xl leading-tight md:text-6xl">{content.whyTitle}</h2>
            <div className="grid gap-x-9 gap-y-8 sm:grid-cols-2">{content.reasons.map(([title, text]) => <div key={title} className="border-t border-primary-foreground/30 pt-4"><h3 className="text-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-primary-foreground/75">{text}</p></div>)}</div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="text-display text-4xl md:text-5xl">{content.processTitle}</h2>
            <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{content.process.map(([title, text]) => <div key={title} className="border-t border-primary/35 pt-5"><h3 className="text-display text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end"><div><h2 className="text-display text-4xl md:text-5xl">{content.workTitle}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{content.workText}</p></div><Link href="/our-work" className="w-fit border-b border-primary pb-1 text-sm">{content.workLink}</Link></div>
            <div className="mt-8 grid border-l border-t border-primary/15 sm:grid-cols-2 lg:grid-cols-5">{CLIENTS.map((client) => <a key={client.href} href={client.href} target="_blank" rel="noreferrer" className="flex min-h-32 flex-col justify-between border-b border-r border-primary/15 p-5 transition-colors hover:bg-secondary"><span className="text-display text-xl leading-snug">{client.name}</span><span className="mt-5 text-xs text-muted-foreground">{fr ? "Visiter le site" : "Visit website"}</span></a>)}</div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[.7fr_1.3fr]"><h2 className="text-display text-4xl md:text-5xl">{content.faqTitle}</h2><div className="border-t border-primary/20">{content.faqs.map(([question, answer]) => <details key={question} className="group border-b border-primary/20 py-5"><summary className="cursor-pointer list-none text-lg font-medium">{question}</summary><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{answer}</p></details>)}</div></div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
            <div><h2 className="text-display text-4xl md:text-5xl">{content.resourcesTitle}</h2><p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{content.resourceText}</p></div>
            <div className="border-t border-primary/20">{resources.map((resource) => <a key={resource.key} href={resource.href} download onClick={() => trackAcquisition("download_resource", { resource: resource.key })} className="flex flex-col justify-between gap-4 border-b border-primary/20 py-5 text-base font-medium transition-colors hover:text-accent sm:flex-row sm:items-center"><span>{resource.label}</span><span className="text-xs text-muted-foreground">{fr ? "Télécharger le document" : "Download checklist"}</span></a>)}</div>
          </div>
        </section>

        <section className="bg-accent px-5 py-16 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end md:px-3"><div><h2 className="text-display max-w-3xl text-4xl md:text-6xl">{content.finalTitle}</h2><p className="mt-5 max-w-xl text-sm leading-7">{content.finalText}</p></div><Link href={bookingHref()} onClick={() => trackAcquisition("booking_started")} className="w-fit bg-primary px-6 py-4 text-sm text-primary-foreground transition-colors hover:bg-background hover:text-primary">{content.consult}</Link></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
