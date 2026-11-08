import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import { CLIENTS } from "@/data/clients";

export default function OurWork() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const content = fr ? {
    title: "Des entreprises réelles, des relations de travail durables.",
    intro: "Chaque entreprise a ses priorités. Voici comment notre accompagnement en lancement, présence numérique et opérations s’est traduit dans le travail réalisé avec nos clients.",
    clients: "Entreprises clientes",
    note: "Découvrez leur activité et les solutions mises en place avec Performance Processes.",
    startTitle: "Chaque entreprise a un point de départ différent.",
    startText: "La prochaine étape peut concerner la mise en place, le site Web ou les opérations. Nous commençons par comprendre votre contexte.",
    launch: "Parler de démarrage",
    growth: "Parler de croissance",
    visit: "Visiter le site",
    work: "Accompagnement réalisé",
  } : {
    title: "Real businesses, working relationships.",
    intro: "Every business has different priorities. Here is how our support with launches, digital presence and operations took shape in the work we delivered for clients.",
    clients: "Client businesses",
    note: "Learn what each business does and what we put in place together.",
    startTitle: "Every business has a different starting point.",
    startText: "Your next step may involve setup, a website, or operations. We begin by understanding your context.",
    launch: "Discuss a launch",
    growth: "Discuss growth",
    visit: "Visit website",
    work: "Work delivered",
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <SEOHead title={fr ? "Notre travail | Performance Processes" : "Our Work | Performance Processes"} description={content.intro} path="/our-work" />
      <Navbar />
      <main>
        <section className="border-b border-primary/15 bg-secondary px-5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl md:px-3">
            <p className="eyebrow mb-5 text-muted-foreground">{fr ? "Performance Processes · Toronto, Ontario" : "Performance Processes · Toronto, Ontario"}</p>
            <h1 className="text-display max-w-4xl text-5xl leading-[.98] sm:text-6xl md:text-7xl">{content.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{content.intro}</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-col justify-between gap-4 border-b border-primary/15 pb-6 sm:flex-row sm:items-end">
            <h2 className="text-display text-4xl md:text-5xl">{content.clients}</h2>
            <p className="max-w-lg text-sm leading-6 text-muted-foreground">{content.note}</p>
          </div>
          <div className="mt-14 divide-y divide-primary/15 border-t border-primary/15">
            {CLIENTS.map((client, index) => (
              <article key={client.href} className={`client-work-row client-work-row--${index + 1}`}>
                <div className={`client-work-logo ${client.logoClass}`}>
                  <img src={client.logo} alt="" loading="eager" />
                </div>
                <div className="client-work-copy">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                    <h3 className="text-display text-3xl leading-tight sm:text-4xl">{client.name}</h3>
                    <span className="eyebrow text-muted-foreground">{content.work}</span>
                  </div>
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {fr ? client.description.fr : client.description.en}
                  </p>
                  <a href={client.href} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-primary pb-1 text-sm font-medium transition-colors hover:border-accent hover:text-muted-foreground">
                    {content.visit}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-accent px-5 py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end md:px-3">
            <div><h2 className="text-display max-w-3xl text-4xl md:text-5xl">{content.startTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7">{content.startText}</p></div>
            <div className="flex flex-wrap gap-3"><Link href="/start-a-business" className="bg-primary px-5 py-4 text-sm text-primary-foreground">{content.launch}</Link><Link href="/grow-your-business" className="border border-primary/40 px-5 py-4 text-sm">{content.growth}</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
