import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import logoImg from "@/assets/logo.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage } = useLanguage();
  const copy = language === "en" ? {
    home: "Home", formation: "Start a Business", setup: "Business Setup", digital: "Websites & Digital", packages: "Packages", about: "About", contact: "Contact", book: "Book a consultation", portal: "Client portal"
  } : {
    home: "Accueil", formation: "Démarrer une entreprise", setup: "Mise en place", digital: "Sites web et numérique", packages: "Forfaits", about: "À propos", contact: "Contact", book: "Réserver une consultation", portal: "Portail client"
  };
  const links = [
    [copy.home, "/"], [copy.formation, "/start-a-business"], [copy.setup, "/business-setup"],
    [copy.digital, "/websites-digital"], [copy.packages, "/packages"], [copy.about, "/about"], [copy.contact, "/contact"],
  ];
  return <header className="sticky top-0 z-[60] border-b border-primary/10 bg-background/95 backdrop-blur">
    <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
      <Link href="/" className="flex items-center"><img src={logoImg} alt="Performance Processes" className="h-11 w-auto" /></Link>
      <nav className="hidden xl:flex items-center gap-5">
        {links.map(([label, href]) => <Link key={href} href={href} className={`border-b pb-1 text-[11px] font-medium tracking-[.03em] transition-colors hover:border-accent hover:text-accent ${location === href ? "border-accent text-primary" : "border-transparent text-primary/70"}`}>{label}</Link>)}
      </nav>
      <div className="hidden md:flex items-center gap-4">
        <div className="font-mono text-[10px]"><button onClick={() => setLanguage("en")} className={language === "en" ? "underline underline-offset-4" : ""}>EN</button><span className="px-1">/</span><button onClick={() => setLanguage("fr")} className={language === "fr" ? "underline underline-offset-4" : ""}>FR</button></div>
        <Link href="/portal" className="text-[11px] font-medium tracking-[.03em] hover:text-accent">{copy.portal}</Link>
        <a href={BOOKINGS_URL} target="_blank" rel="noreferrer" className="bg-primary px-5 py-3 text-[10px] font-semibold tracking-[.08em] text-primary-foreground transition-colors hover:bg-accent hover:text-primary">{copy.book}</a>
      </div>
      <button onClick={() => setOpen(!open)} className="xl:hidden text-[11px] font-bold uppercase tracking-[.14em] text-primary" aria-expanded={open}>{open ? (language === "fr" ? "Fermer" : "Close") : "Menu"}</button>
    </div>
    {open && <div className="xl:hidden border-t border-primary/10 bg-background px-5 py-6">
      <nav className="flex flex-col">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="border-b border-primary/10 py-4 text-xl font-heading text-primary">{label}</Link>)}</nav>
      <Link onClick={() => setOpen(false)} href="/portal" className="border-b border-primary/10 py-4 text-xl font-heading text-primary">{copy.portal}</Link>
      <div className="mt-6 flex gap-4"><button onClick={() => setLanguage("en")} className="font-mono text-xs">EN</button><button onClick={() => setLanguage("fr")} className="font-mono text-xs">FR</button></div>
      <a href={BOOKINGS_URL} target="_blank" rel="noreferrer" className="mt-6 block bg-primary px-5 py-4 text-center text-[11px] font-semibold tracking-[.08em] text-primary-foreground">{copy.book}</a>
    </div>}
  </header>;
}