import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";

type Plan = [string, string, string[]];
const EN: Plan[] = [
  ["Business Foundation", "For formalizing and organizing a new business.", ["Initial business consultation", "Structure and incorporation guidance", "Registration support", "Startup checklist", "Essential administrative setup", "One follow-up consultation"]],
  ["Business Launch", "For a solid foundation and a professional digital presence.", ["Everything in Business Foundation", "Business model and pricing consultation", "Essential business systems", "Professional email setup", "Custom starter website", "Google Business Profile and foundational SEO"]],
  ["Complete Business Build", "For hands-on support from idea through launch.", ["Everything in Business Launch", "Expanded website and brand direction", "CRM or booking-system setup", "Payment and invoicing integration", "Operational workflows and templates", "Digital launch plan and post-launch support"]],
];
const FR: Plan[] = [
  ["Fondation d’entreprise", "Pour officialiser et organiser une nouvelle entreprise.", ["Consultation initiale", "Orientation sur la structure et l’incorporation", "Soutien à l’enregistrement", "Liste de démarrage", "Mise en place administrative essentielle", "Une consultation de suivi"]],
  ["Lancement d’entreprise", "Pour une fondation solide et une présence numérique professionnelle.", ["Tout ce qui est inclus dans Fondation", "Consultation sur le modèle et les prix", "Systèmes d’entreprise essentiels", "Courriel professionnel", "Site web de départ personnalisé", "Fiche Google et SEO de base"]],
  ["Construction complète", "Pour un accompagnement pratique de l’idée au lancement.", ["Tout ce qui est inclus dans Lancement", "Site élargi et orientation de marque", "CRM ou système de réservation", "Intégration paiement et facturation", "Flux de travail et modèles", "Plan de lancement et soutien après lancement"]],
];

export default function Packages() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const plans = fr ? FR : EN;
  return <div className="min-h-[100dvh] bg-background">
    <SEOHead title={fr ? "Forfaits de lancement d’entreprise | Performance Processes" : "Business Launch Packages | Performance Processes"} description={fr ? "Des forfaits clairs de formation, mise en place et lancement de sites web pour les entrepreneurs canadiens." : "Clear, customized business formation, setup, and website launch packages for Canadian entrepreneurs."} path="/packages" />
    <Navbar />
    <main>
      <section className="bg-secondary px-5 py-24"><div className="mx-auto max-w-[1100px] text-center"><p className="eyebrow">{fr ? "Des façons claires de commencer" : "Clear ways to begin"}</p><h1 className="text-display mt-6 text-5xl md:text-7xl">{fr ? "Construisez votre lancement selon vos besoins actuels." : "Build your launch around what you need now."}</h1><p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{fr ? "Chaque forfait commence par une conversation. La portée et l’investissement sont adaptés à votre étape et votre calendrier." : "Every package begins with a conversation. Scope and investment are tailored to your stage, priorities, and launch timeline."}</p></div></section>
      <section className="mx-auto max-w-[1240px] px-5 py-24"><div className="grid gap-5 lg:grid-cols-3">{plans.map(([name, desc, items], i) => <article key={name} className={`flex flex-col border p-8 ${i === 1 ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 bg-card"}`}><p className="font-mono text-xs">{`0${i + 1}`}</p><h2 className="text-display mt-8 text-3xl">{name}</h2><p className={`mt-4 min-h-14 leading-7 ${i === 1 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</p><ul className="mt-8 flex-1 border-t border-current/20">{items.map(x => <li key={x} className="border-b border-current/20 py-3 text-sm">{x}</li>)}</ul><Link href="/contact" className={`mt-8 px-5 py-4 text-center text-xs font-bold uppercase tracking-[.14em] ${i === 1 ? "bg-accent text-primary" : "bg-primary text-primary-foreground"}`}>{fr ? "Discuter de ce forfait" : "Talk through this package"}</Link></article>)}</div>
        <div className="mt-20 overflow-x-auto"><h2 className="text-display text-4xl">{fr ? "En bref" : "At a glance"}</h2><table className="mt-8 w-full min-w-[680px] border-collapse text-left text-sm"><thead><tr className="border-b border-primary"><th className="p-4">{fr ? "Ce que vous recevez" : "What you receive"}</th>{plans.map(([n]) => <th key={n} className="p-4">{n}</th>)}</tr></thead><tbody>{(fr ? [["Orientation de formation", "Incluse", "Incluse", "Incluse"], ["Systèmes d’entreprise", "Essentiels", "Essentiels", "Élargis"], ["Site professionnel", "—", "Départ", "Élargi"], ["Soutien au lancement", "—", "Inclus", "Après lancement"]] : [["Formation guidance", "Included", "Included", "Included"], ["Business systems", "Essential", "Essential", "Expanded"], ["Professional website", "—", "Starter", "Expanded"], ["Launch support", "—", "Included", "Post-launch"]]).map(row => <tr key={row[0]} className="border-b border-primary/15">{row.map((x, cellIndex) => <td key={`${row[0]}-${cellIndex}`} className="p-4">{x}</td>)}</tr>)}</tbody></table></div>
      </section>
    </main>
    <Footer />
  </div>;
}