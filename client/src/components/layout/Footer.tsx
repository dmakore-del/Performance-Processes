import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import logoImg from "@/assets/logo.png";

export function Footer() {
  const { language } = useLanguage();
  const fr = language === "fr";
  return <footer className="bg-primary text-primary-foreground"><div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
    <div className="grid gap-12 md:grid-cols-[1.7fr_1fr_1fr]">
      <div><img src={logoImg} alt="Performance Processes" className="no-grayscale h-14"/><p className="mt-7 max-w-sm text-sm leading-7 text-primary-foreground/70">{fr ? "Votre partenaire concret pour établir, organiser et lancer une entreprise professionnelle au Canada." : "Your practical partner for establishing, organizing, and launching a professional business in Canada."}</p></div>
      <div><h2 className="font-mono text-[10px] tracking-[.12em] text-accent">{fr ? "Parcours" : "Journeys"}</h2><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/75"><Link href="/start-a-business">{fr ? "Démarrer une entreprise" : "Start a Business"}</Link><Link href="/business-setup">{fr ? "Mise en place" : "Business Setup"}</Link><Link href="/websites-digital">{fr ? "Sites web et numérique" : "Websites & Digital"}</Link><Link href="/packages">{fr ? "Forfaits" : "Packages"}</Link></div></div>
      <div><h2 className="font-mono text-[10px] tracking-[.12em] text-accent">{fr ? "Parlons-en" : "Let’s talk"}</h2><p className="mt-5 text-sm leading-7 text-primary-foreground/75">Toronto, Ontario<br/><a className="hover:text-accent" href="mailto:contact@performanceprocesses.com">contact@performanceprocesses.com</a><br/>+1 (437) 425-4844</p><Link href="/contact" className="mt-5 inline-block border-b border-accent pb-1 text-xs font-medium tracking-[.08em] text-accent">{fr ? "Commencer ici" : "Start here"}</Link></div>
    </div>
    <div className="mt-10 border-t border-primary-foreground/15 pt-6"><Link href="/nextup-partnership" className="text-xs font-bold uppercase tracking-[.12em] text-accent">{fr ? "Soutenir le travail communautaire de NextUp" : "Support NextUp community work"}</Link></div>
    <div className="mt-4 border-t border-primary-foreground/15 pt-6 text-[10px] leading-5 text-primary-foreground/50">© {new Date().getFullYear()} Performance Processes. {fr ? "Soutien à l’incorporation et orientation générale seulement; nous ne fournissons pas de conseils juridiques, fiscaux ou comptables." : "Incorporation support and general business guidance only; we do not provide legal, tax, or accounting advice."} <Link href="/legal" className="ml-2 underline">{fr ? "Mentions légales" : "Legal"}</Link></div>
  </div></footer>;
}