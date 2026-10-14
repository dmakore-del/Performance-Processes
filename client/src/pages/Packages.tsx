import { useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OfferCarousel } from "@/components/OfferCarousel";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { OFFERS, getLocalizedCategoryMeta, type OfferCategory } from "@shared/offers";
import packageImage from "@/assets/generated/strategy-whiteboard.png";

type CatalogGroup = OfferCategory | "marketing-crm";
const CATEGORY_ORDER: CatalogGroup[] = ["packages", "website", "systems", "marketing-crm", "hr-recruiting", "support", "bundle"];

export default function Packages() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const [active, setActive] = useState<CatalogGroup>("packages");
  const launchOffers = useMemo(() => OFFERS.filter((offer) => offer.category === "packages").slice(0, 3), []);
  const visibleCategories = [active];

  return (
    <div className="min-h-[100dvh] bg-background">
      <SEOHead
        title={fr ? "Forfaits et services | Performance Processes" : "Business packages and services | Performance Processes"}
        description={fr ? "Explorez tous nos forfaits à prix clairs en dollars canadiens et commencez en ligne." : "Explore every service and package with clear Canadian-dollar pricing and start online."}
        path="/packages"
      />
      <Navbar />
      <main>
         <section className="bg-secondary px-5 py-12 md:py-16">
           <div className="mx-auto grid max-w-[1160px] gap-8 md:grid-cols-[1.1fr_.9fr] md:items-center">
            <div><h1 className="text-display max-w-4xl text-5xl leading-[.96] md:text-7xl">
              {fr ? "Construisez l’entreprise dont vous avez besoin maintenant." : "Build the business you need now."}
            </h1>
             <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {fr ? "Des fondations au soutien mensuel, chaque offre est définie, tarifée en CAD et prête à être achetée en ligne." : "From first foundations to monthly support, every offer is defined, priced in CAD, and ready to buy online."}
            </p></div><img src={packageImage} alt="" className="h-64 w-full object-cover md:h-80"/>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20">
          <div className="flex flex-col gap-5 border-b border-primary/15 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-display text-4xl md:text-5xl">{fr ? "Les forfaits de lancement" : "Launch packages"}</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">{fr ? "Un investissement unique pour passer de l’idée à une entreprise prête à fonctionner." : "One-time investments to move from idea to a business ready to operate."}</p>
          </div>
          <OfferCarousel offers={launchOffers} returnPage="/packages" />

           <div className="mt-10 flex flex-col justify-between gap-4 border-t border-primary/15 pt-6 sm:flex-row sm:items-center">
             <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{fr ? "Vous cherchez du soutien mensuel ou de l’aide pour trouver du financement? Consultez nos services et conditions." : "Looking for ongoing monthly support or help finding funding? Explore the service options and terms."}</p>
             <Link href="/funding-retainers" className="shrink-0 border-b border-primary pb-1 text-sm">{fr ? "Financement et mandats mensuels" : "Funding and retainer services"} <span aria-hidden="true">↗</span></Link>
           </div>

           <details className="mt-20 overflow-x-auto">
             <summary className="cursor-pointer text-display text-4xl">{fr ? "Comparer les trois forfaits" : "Compare the three packages"}</summary>
            <table className="mt-8 w-full min-w-[760px] border-collapse text-left text-sm">
              <thead><tr className="border-b border-primary"><th className="p-4">{fr ? "Ce que vous recevez" : "What you receive"}</th>{launchOffers.map((offer) => <th key={offer.id} className="p-4">{offer.name}</th>)}</tr></thead>
              <tbody>
                {(fr ? [
                  ["Orientation de formation", "Incluse", "Incluse", "Incluse"],
                  ["Systèmes d’entreprise", "Essentiels", "Essentiels", "Élargis"],
                  ["Site professionnel", "Non inclus", "Départ", "Élargi"],
                  ["Soutien au lancement", "Non inclus", "Inclus", "Après lancement"],
                ] : [
                  ["Formation guidance", "Included", "Included", "Included"],
                  ["Business systems", "Essential", "Essential", "Expanded"],
                  ["Professional website", "Not included", "Starter", "Expanded"],
                  ["Launch support", "Not included", "Included", "After launch"],
                ]).map((row) => <tr key={row[0]} className="border-b border-primary/15">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={`p-4 ${index === 0 ? "font-semibold" : ""}`}>{cell}</td>)}</tr>)}
              </tbody>
            </table>
           </details>
        </section>

        <section id="package-categories" className="border-y border-primary/10 bg-secondary px-5 py-16 text-primary">
          <div className="mx-auto max-w-[1160px]">
            <h2 className="text-display max-w-3xl text-5xl">{fr ? "Choisissez la prochaine pièce à mettre en place." : "Choose the next piece to put in place."}</h2>
            <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
               {CATEGORY_ORDER.map((category) => {
                const meta = category === "marketing-crm" ? { label: fr ? "Marketing / CRM" : "Marketing / CRM" } : getLocalizedCategoryMeta(category, language);
                  return <button type="button" key={category} onClick={() => setActive(category)} className={`shrink-0 border px-4 py-3 text-sm ${active === category ? "border-accent bg-accent text-primary" : "border-primary/20 bg-background hover:border-accent"}`}>{meta.label}</button>;
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-16">
          <aside className="mb-16 border-l-2 border-accent bg-secondary px-6 py-6 md:px-8">
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <p className="leading-7 text-muted-foreground">{fr ? "Les frais indiqués pour les services de formation d’entreprise sont les frais de service de Performance Processes. Les frais de dépôt, recherches de nom et autres débours gouvernementaux sont distincts et payables en plus lorsqu’ils s’appliquent." : "Prices shown for Business Formation services are Performance Processes service fees. Government filing fees, name searches, and other government disbursements are separate and payable in addition where applicable."}</p>
              <p className="leading-7 text-muted-foreground">{fr ? "Performance Processes offre du soutien administratif à l’incorporation et une orientation générale; nous ne fournissons pas de conseils juridiques, fiscaux ou comptables." : "Performance Processes provides administrative incorporation support and general guidance; we do not provide legal, tax, or accounting advice."}</p>
            </div>
          </aside>
          <div className="space-y-20">
            {visibleCategories.map((category) => {
              const offers = category === "marketing-crm"
                ? OFFERS.filter((offer) => offer.category === "marketing" || offer.category === "crm")
                : OFFERS.filter((offer) => offer.category === category);
              const meta = category === "marketing-crm"
                ? { label: fr ? "Marketing / CRM" : "Marketing / CRM", description: fr ? "Donnez une structure à votre marketing et gardez chaque prospect visible et suivi." : "Give your marketing structure and keep every lead visible and followed up." }
                : getLocalizedCategoryMeta(category, language);
              return <div key={category} id={category}>
                <div className="mb-8 max-w-2xl"><h2 className="text-display text-4xl">{meta.label}</h2><p className="mt-3 leading-7 text-muted-foreground">{meta.description}</p></div>
                <OfferCarousel offers={offers} returnPage="/packages" />
              </div>;
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}