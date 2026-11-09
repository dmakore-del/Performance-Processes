import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OfferCard } from "@/components/OfferCard";
import { CheckoutReturnNotice } from "@/components/CheckoutReturnNotice";
import { useLanguage } from "@/hooks/use-language";
import { SERVICE_CATALOGUE, SERVICE_GROUPS } from "@shared/serviceCatalogue";
import { localizeOffer } from "@shared/offers";

export default function ServicesCatalogue() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const [query, setQuery] = useState("");
  const localizedOffers = useMemo(
    () => SERVICE_CATALOGUE.map((offer) => localizeOffer(offer, language)),
    [language],
  );
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const groups = SERVICE_GROUPS.map((group) => {
    const offers = group.offerIds
      .map((id) => localizedOffers.find((offer) => offer.id === id))
      .filter((offer): offer is (typeof localizedOffers)[number] => Boolean(offer))
      .filter((offer) => !normalizedQuery || [
        offer.name, offer.description, offer.bestFor, ...offer.includes,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery)));
    return { ...group, offers };
  }).filter((group) => group.offers.length > 0);

  return (
    <div className="min-h-[100dvh] bg-background text-primary">
      <SEOHead
        title={fr ? "Services et tarifs | Performance Processes" : "Services & Pricing | Performance Processes"}
        description={fr
          ? "Parcourez les services à la carte de Performance Processes pour le lancement, la stratégie, les opérations, le numérique et le financement au Canada."
          : "Browse itemized Performance Processes services for business launch, strategy, operations, digital work, and funding across Canada."}
        path="/services"
      />
      <Navbar />
      <main>
        <section className="border-b border-primary/10 bg-secondary">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="eyebrow mb-5 text-muted-foreground">{fr ? "Catalogue de services · Canada" : "Service catalogue · Canada"}</p>
              <h1 className="text-display max-w-4xl text-5xl leading-[.98] md:text-7xl">
                {fr ? "Choisissez le service dont votre entreprise a besoin." : "Choose the work your business needs."}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
                {fr
                  ? "Des services distincts, des livrables définis et un prix affiché pour chaque prochaine étape."
                  : "Distinct services, defined deliverables, and a clear price beside every next step."}
              </p>
            </div>
            <div className="border-l-2 border-accent pl-6">
              <p className="text-sm leading-7 text-muted-foreground">
                {fr
                  ? "Tous les prix sont en dollars canadiens, avant les taxes applicables et les frais de tiers. Les prix de départ couvrent la portée de base indiquée; après examen, tout travail supplémentaire fait l’objet d’un devis distinct."
                  : "All prices are in Canadian dollars, before applicable taxes and third-party fees. Starting prices cover the stated base scope; after review, additional work is quoted separately."}
              </p>
              <p className="mt-3 text-sm font-medium">
                {fr
                  ? "Le soutien au financement utilise des frais fixes, sans pourcentage des fonds obtenus."
                  : "Funding support uses fixed fees, with no percentage of funds obtained."}
              </p>
            </div>
          </div>
        </section>

        <CheckoutReturnNotice french={fr} />

        <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="flex flex-col gap-6 border-b border-primary/15 pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-muted-foreground">{fr ? "Parcourir par besoin" : "Browse by need"}</p>
              <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2" aria-label={fr ? "Catégories de services" : "Service categories"}>
                {SERVICE_GROUPS.map((group) => (
                  <a key={group.id} href={`#${group.id}`} className="border-b border-primary/30 py-1 text-sm transition-colors hover:border-accent">
                    {fr ? group.titleFr : group.title}
                  </a>
                ))}
              </nav>
            </div>
            <label className="w-full max-w-md">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">{fr ? "Rechercher un service" : "Find a service"}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={fr ? "Ex. site web, CRM, subvention" : "For example, website, CRM, grant"}
                className="h-12 w-full border border-primary/20 bg-background px-4 text-sm outline-none transition focus:border-primary"
                aria-label={fr ? "Rechercher dans le catalogue" : "Search the catalogue"}
              />
            </label>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          {groups.length ? groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-28 border-b border-primary/15 py-12 md:py-16">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2 className="text-display text-4xl md:text-5xl">{fr ? group.titleFr : group.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {fr ? `${group.offers.length} services` : `${group.offers.length} services`}
                </p>
              </div>
              <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.offers.map((offer) => <OfferCard key={offer.id} offer={offer} returnPage="/services" />)}
              </div>
            </section>
          )) : (
            <div className="border border-dashed border-primary/25 bg-secondary px-6 py-12 text-center">
              <h2 className="text-display text-3xl">{fr ? "Aucun service trouvé" : "No services found"}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{fr ? "Essayez un autre terme." : "Try another search term."}</p>
              <button type="button" onClick={() => setQuery("")} className="mt-5 border-b border-primary pb-1 text-sm font-medium">
                {fr ? "Effacer la recherche" : "Clear search"}
              </button>
            </div>
          )}
        </div>

        <section className="bg-primary px-5 py-14 text-primary-foreground md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="eyebrow text-primary-foreground/60">{fr ? "Vous ne savez pas par où commencer?" : "Not sure where to begin?"}</p>
              <h2 className="text-display mt-3 max-w-3xl text-4xl md:text-5xl">{fr ? "Parlons de la prochaine étape utile." : "Let’s identify the useful next step."}</h2>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center bg-accent px-6 py-4 text-sm font-semibold text-primary transition-colors hover:bg-background">
              {fr ? "Parler avec notre équipe" : "Talk with our team"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
