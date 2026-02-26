import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import logoImg from "@/assets/logo.png";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.approach"), href: "/approach" },
    { label: "Insights", href: "/insights" },
  ];

  return (
    <header className="w-full bg-white z-[60] sticky top-0 shadow-sm">
      {/* Top Utility Nav */}
      <div className="bg-[#1a1a1a] text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4 md:px-8 flex justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
          <Link href="/portal" className="hover:text-accent transition-colors cursor-pointer">Client Portal</Link>
          <Link href="/careers" className="hover:text-accent transition-colors cursor-pointer">Careers</Link>
          <div className="w-[1px] h-3 bg-gray-600"></div>
          <div className="flex gap-2">
            <button 
              onClick={() => setLanguage("en")} 
              className={cn("hover:text-accent transition-colors", language === "en" ? "text-accent underline" : "")}
            >
              EN
            </button>
            <span>|</span>
            <button 
              onClick={() => setLanguage("fr")} 
              className={cn("hover:text-accent transition-colors", language === "fr" ? "text-accent underline" : "")}
            >
              FR
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex h-20 lg:h-24 items-center justify-between">
        <Link href="/" className="flex items-center" data-testid="link-logo">
            <img src={logoImg} alt="Performance Processes" className="h-14 lg:h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}
                className={cn(
                  "text-[14px] font-bold text-primary hover:text-accent transition-all px-4 py-2 rounded-full",
                  location === link.href ? "bg-secondary text-accent" : "hover:bg-secondary"
                )}
              >
                {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block"
            onClick={() => {
              const query = window.prompt(language === "en" ? "Search Performance Processes..." : "Rechercher sur Performance Processes...");
              if (query) {
                window.location.href = `/services?q=${encodeURIComponent(query)}`;
              }
            }}
          >
            <Search size={20} className="text-primary" />
          </button>
          <Link href="/contact">
            <Button className="rounded-full bg-accent text-white hover:bg-primary transition-all font-bold px-8 h-12 uppercase tracking-wider text-xs hidden md:flex">
              {t("nav.contact")}
            </Button>
          </Link>
          <button
            className="lg:hidden p-2 text-primary hover:bg-secondary rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-white z-[100] flex flex-col animate-in fade-in slide-in-from-right duration-300">
          <div className="p-4 flex justify-between items-center border-b h-20">
             <div className="flex items-center">
               <img src={logoImg} alt="Performance Processes" className="h-12 w-auto" />
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors"><X size={32} /></button>
          </div>
          <div className="flex flex-col p-8 gap-6 overflow-y-auto pb-24">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                  className={cn(
                    "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
                    location === link.href ? "text-accent border-accent" : "text-primary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  <ChevronDown size={24} className="-rotate-90" />
              </Link>
            ))}
            
            <Link href="/portal"
                className={cn(
                  "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
                  location === "/portal" ? "text-accent border-accent" : "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Client Portal
                <ChevronDown size={24} className="-rotate-90" />
            </Link>
            <Link href="/careers"
                className={cn(
                  "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
                  location === "/careers" ? "text-accent border-accent" : "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
                <ChevronDown size={24} className="-rotate-90" />
            </Link>
            <div className="flex gap-4 pt-4 border-b border-border pb-4">
              <button onClick={() => {setLanguage("en"); setIsMobileMenuOpen(false);}} className={cn("font-bold", language === "en" ? "text-accent underline" : "text-primary")}>EN</button>
              <span className="text-primary">|</span>
              <button onClick={() => {setLanguage("fr"); setIsMobileMenuOpen(false);}} className={cn("font-bold", language === "fr" ? "text-accent underline" : "text-primary")}>FR</button>
            </div>

            <Link href="/contact">
              <Button className="w-full rounded-full bg-accent text-white py-8 text-lg font-bold uppercase tracking-widest mt-4 shadow-lg shadow-accent/20 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                {t("nav.contact")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
