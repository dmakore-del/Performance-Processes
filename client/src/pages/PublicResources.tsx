import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import { trackAcquisition } from "@/lib/acquisition";

export default function PublicResources() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const content = fr ? {
    title: "Des ressources pour avancer avec clarté.",
    intro: "Des listes de travail pour préparer les décisions liées au lancement d’une entreprise et à sa présence numérique.",
    launch: "Liste de vérification pour démarrer une entreprise",
    launchText: "Organisez les questions de structure, les premières étapes administratives, les besoins opérationnels et les éléments à clarifier avant le lancement.",
    digital: "Liste de vérification de préparation numérique",
    digitalText: "Passez en revue la clarté de votre site, les façons de vous joindre, les outils numériques et les étapes qui soutiennent l’expérience client.",
    download: "Télécharger la liste",
    sectionTitle: "Choisir votre prochaine étape",
    sectionText: "Si vous lancez une entreprise, nous pouvons clarifier le travail de mise en place. Si votre entreprise est déjà en activité, nous pouvons examiner votre présence numérique et vos processus.",
    launchCta: "Démarrer une entreprise",
    growthCta: "Améliorer une entreprise",
  } : {
    title: "Resources to help you move forward clearly.",
    intro: "Practical checklists for decisions involved in launching a business and building its digital presence.",
    launch: "Business launch checklist",
    launchText: "Organize questions about structure, early administrative steps, operating needs, and details to clarify before launch.",
    digital: "Digital readiness checklist",
    digitalText: "Review website clarity, ways to get in touch, digital tools, and the steps that support a customer experience.",
    download: "Download checklist",
    sectionTitle: "Choose a useful next step",
    sectionText: "If you are launching, we can clarify setup work. If your business is already operating, we can look at digital presence and processes.",
    launchCta: "Start a Business",
    growthCta: "Improve a Business",
  };
  const items = [
    { title: content.launch, text: content.launchText, href: "/resources/business-launch-checklist.html", resource: "business-launch", label: fr ? "Pour les fondateurs" : "For new founders", details: fr ? ["Structure et enregistrement", "Organisation du lancement", "Préparation opérationnelle"] : ["Structure and registration", "Launch organization", "Operating readiness"] },
    { title: content.digital, text: content.digitalText, href: "/resources/digital-readiness-checklist.html", resource: "digital-readiness", label: fr ? "Pour les entreprises en activité" : "For operating businesses", details: fr ? ["Site web et contenu", "Demandes et parcours client", "Outils numériques"] : ["Website and content", "Enquiries and customer journey", "Digital tools"] },
  ];

  return (
    <div className="min-h-[100dvh] bg-background">
      <SEOHead title={fr ? "Ressources pour entrepreneurs | Performance Processes" : "Business Resources & Checklists | Performance Processes"} description={content.intro} path="/resources" />
      <Navbar />
      <main>
        <section className="border-b border-primary/15 bg-secondary px-5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl md:px-3"><h1 className="text-display max-w-4xl text-5xl leading-[.98] sm:text-6xl md:text-7xl">{content.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{content.intro}</p></div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            {items.map((item) => <article key={item.resource} className="flex min-h-[410px] flex-col border border-primary/15">
              <div className="border-b border-primary/15 bg-[#f7eeee] p-6 sm:p-9">
                <p className="eyebrow text-muted-foreground">{item.label}</p>
                <div className="mt-8 max-w-md border-l border-primary/25 pl-5">
                  <p className="text-display text-3xl leading-tight">{item.title}</p>
                  <div className="mt-6 space-y-2">{item.details.map((detail) => <p key={detail} className="text-sm leading-6 text-muted-foreground">{detail}</p>)}</div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-9">
                <p className="max-w-lg text-sm leading-7 text-muted-foreground">{item.text}</p>
                <a href={item.href} download onClick={() => trackAcquisition("download_resource", { resource: item.resource })} className="w-fit bg-primary px-5 py-4 text-sm text-primary-foreground transition-colors hover:bg-accent hover:text-primary">{content.download}</a>
              </div>
            </article>)}
          </div>
        </section>
        <section className="bg-primary px-5 py-16 text-primary-foreground md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end md:px-3"><div><h2 className="text-display max-w-3xl text-4xl md:text-5xl">{content.sectionTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-primary-foreground/75">{content.sectionText}</p></div><div className="flex flex-wrap gap-3"><Link href="/start-a-business" className="bg-accent px-5 py-4 text-sm text-primary">{content.launchCta}</Link><Link href="/grow-your-business" className="border border-primary-foreground/45 px-5 py-4 text-sm text-primary-foreground">{content.growthCta}</Link></div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
