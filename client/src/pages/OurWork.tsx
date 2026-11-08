import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";

const CLIENTS = [
  { name: "Vibes Lounge", href: "https://vibeslounge.ca" },
  { name: "Maison Sparkle Living", href: "https://maisonsparkleliving.com" },
  { name: "NextUp Canada", href: "https://nextupcan.ca" },
  { name: "TrueNorth Property & Facilities", href: "https://truenorthpf.ca" },
  { name: "OGB Supreme Records", href: "https://ogbsupremerecords.com" },
];

export default function OurWork() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const content = fr ? {
    title: "Des entreprises réelles, des relations de travail durables.",
    intro: "Nous sommes heureux de mettre en lumière les entreprises que Performance Processes accompagne. Consultez leurs sites pour découvrir leur travail directement.",
    clients: "Entreprises clientes",
    note: "Découvrez les entreprises qui nous ont fait confiance.",
    startTitle: "Chaque entreprise a un point de départ différent.",
    startText: "La prochaine étape peut concerner la mise en place, le site web ou les opérations. Nous commençons par comprendre votre contexte.",
    launch: "Parler de démarrage",
    growth: "Parler de croissance",
  } : {
    title: "Real businesses, working relationships.",
    intro: "We are pleased to recognize businesses supported by Performance Processes. Visit their websites to learn about their work directly.",
    clients: "Client businesses",
    note: "Meet some of the businesses we have worked with.",
    startTitle: "Every business has a different starting point.",
    startText: "Your next step may involve setup, a website, or operations. We begin by understanding your context.",
    launch: "Discuss a launch",
    growth: "Discuss growth",
  };
  return (
    <div className="min-h-[100dvh] bg-background">
      <SEOHead title={fr ? "Notre travail | Performance Processes" : "Our Work | Performance Processes"} description={content.intro} path="/our-work" />
      <Navbar />
      <main>
        <section className="border-b border-primary/15 bg-secondary px-5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl md:px-3"><h1 className="text-display max-w-4xl text-5xl leading-[.98] sm:text-6xl md:text-7xl">{content.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{content.intro}</p></div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-col justify-between gap-4 border-b border-primary/15 pb-6 sm:flex-row sm:items-end"><h2 className="text-display text-4xl md:text-5xl">{content.clients}</h2><p className="max-w-lg text-sm leading-6 text-muted-foreground">{content.note}</p></div>
          <div className="mt-8 grid border-l border-t border-primary/15 sm:grid-cols-2 lg:grid-cols-3">{CLIENTS.map((client) => <a key={client.href} href={client.href} target="_blank" rel="noreferrer" className="flex min-h-48 flex-col justify-between border-b border-r border-primary/15 p-6 transition-colors hover:bg-secondary sm:p-8"><span className="text-display max-w-sm text-2xl leading-tight sm:text-3xl">{client.name}</span><span className="mt-8 text-xs text-muted-foreground">{fr ? "Visiter le site de l’entreprise" : "Visit business website"}</span></a>)}</div>
        </section>
        <section className="bg-accent px-5 py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end md:px-3"><div><h2 className="text-display max-w-3xl text-4xl md:text-5xl">{content.startTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7">{content.startText}</p></div><div className="flex flex-wrap gap-3"><Link href="/start-a-business" className="bg-primary px-5 py-4 text-sm text-primary-foreground">{content.launch}</Link><Link href="/grow-your-business" className="border border-primary/40 px-5 py-4 text-sm">{content.growth}</Link></div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
