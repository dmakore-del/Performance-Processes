import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { bookingHref, trackAcquisition } from "@/lib/acquisition";
import logoImg from "@/assets/logo.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage } = useLanguage();
  const fr = language === "fr";
  const copy = fr ? {
    home: "Accueil",
    launch: "Démarrer",
    growth: "Croissance",
    work: "Notre travail",
    about: "À propos",
    resources: "Ressources",
    grants: "Subventions et financement",
    book: "Réserver une consultation",
    portal: "Portail client",
    menu: "Menu",
    close: "Fermer",
  } : {
    home: "Home",
    launch: "Start a Business",
    growth: "Grow Your Business",
    work: "Our Work",
    about: "About",
    resources: "Resources",
    grants: "Grants & Financing",
    book: "Book a consultation",
    portal: "Client portal",
    menu: "Menu",
    close: "Close",
  };
  const links = [
    { label: copy.home, href: "/" },
    { label: copy.launch, href: "/start-a-business" },
    { label: copy.growth, href: "/grow-your-business" },
    { label: copy.work, href: "/our-work" },
    { label: copy.about, href: "/about" },
    { label: copy.resources, href: "/resources" },
    { label: copy.grants, href: "/grants-financing" },
  ];
  const active = (href: string) => href === "/" ? location === "/" : location === href || location.startsWith(`${href}/`);
  const languageControls = (
    <div className="flex items-center gap-2 font-mono text-[10px] tracking-wide" aria-label={fr ? "Choisir la langue" : "Choose language"}>
      <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"} className={language === "en" ? "underline underline-offset-4" : "text-primary/60"}>EN</button>
      <span className="text-primary/35">/</span>
      <button type="button" onClick={() => setLanguage("fr")} aria-pressed={language === "fr"} className={language === "fr" ? "underline underline-offset-4" : "text-primary/60"}>FR</button>
    </div>
  );
  return (
    <header className="sticky top-0 z-[60] border-b border-primary/10 bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-[1520px] items-center justify-between gap-5 px-5 lg:px-8">
        <Link href="/" aria-label="Performance Processes home" className="flex shrink-0 items-center">
          <img src={logoImg} alt="Performance Processes" className="h-10 w-auto sm:h-11" />
        </Link>
        <nav className="hidden items-center gap-x-4 gap-y-2 xl:flex 2xl:gap-x-5" aria-label={fr ? "Navigation principale" : "Main navigation"}>
          {links.map((item) => <Link key={item.href} href={item.href} className={`whitespace-nowrap border-b pb-1 text-[11px] font-medium tracking-[.015em] transition-colors hover:border-accent hover:text-primary ${active(item.href) ? "border-accent text-primary" : "border-transparent text-primary/70"}`}>{item.label}</Link>)}
        </nav>
        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          {languageControls}
          <Link href="/portal" className="whitespace-nowrap text-[11px] font-medium text-primary/75 transition-colors hover:text-primary">{copy.portal}</Link>
          <Link href={bookingHref()} onClick={() => trackAcquisition("booking_started")} className="whitespace-nowrap bg-primary px-4 py-3 text-[10px] font-semibold tracking-[.04em] text-primary-foreground transition-colors hover:bg-accent hover:text-primary">{copy.book}</Link>
        </div>
        <div className="flex items-center gap-4 xl:hidden">
          <div className="hidden sm:block">{languageControls}</div>
          <button type="button" onClick={() => setOpen((current) => !current)} className="text-[11px] font-bold uppercase tracking-[.1em] text-primary" aria-expanded={open} aria-controls="mobile-navigation">{open ? copy.close : copy.menu}</button>
        </div>
      </div>
      {open && <div id="mobile-navigation" className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-primary/10 bg-background px-5 py-5 xl:hidden">
        <nav className="flex flex-col" aria-label={fr ? "Navigation principale" : "Main navigation"}>
          {links.map((item) => <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className={`border-b border-primary/10 py-3.5 text-lg ${active(item.href) ? "text-primary" : "text-primary/75"}`}>{item.label}</Link>)}
          <Link onClick={() => setOpen(false)} href="/portal" className="border-b border-primary/10 py-3.5 text-lg text-primary/75">{copy.portal}</Link>
        </nav>
        <div className="mt-5 flex items-center justify-between sm:hidden">{languageControls}</div>
        <Link onClick={() => { setOpen(false); trackAcquisition("booking_started"); }} href={bookingHref()} className="mt-5 block bg-primary px-5 py-4 text-center text-sm font-semibold text-primary-foreground">{copy.book}</Link>
      </div>}
    </header>
  );
}
