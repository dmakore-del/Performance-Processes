import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.approach"), href: "/approach" },
  ];

  return (
    <header className="w-full bg-white z-[60] sticky top-0 shadow-sm">
      {/* Top Utility Nav */}
      <div className="bg-[#1a1a1a] text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4 md:px-8 flex justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
          <a href="#" className="hover:text-accent transition-colors">Client Portal</a>
          <a href="#" className="hover:text-accent transition-colors">Resources</a>
          <a href="#" className="hover:text-accent transition-colors">Careers</a>
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
        <Link href="/">
          <a className="flex items-center gap-3" data-testid="link-logo">
            <div className="h-10 w-10 lg:h-12 lg:w-12 bg-primary flex items-center justify-center font-heading font-black text-xl lg:text-2xl text-accent italic rounded-lg">
              PP
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl lg:text-2xl leading-none tracking-tighter text-primary uppercase italic">
                Performance
              </span>
              <span className="font-heading font-bold text-[10px] leading-none tracking-[0.3em] text-accent uppercase mt-1">
                Processes
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <a
                className={cn(
                  "text-[14px] font-bold text-primary hover:text-accent transition-all px-4 py-2 rounded-full",
                  location === link.href ? "bg-secondary text-accent" : "hover:bg-secondary"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block">
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
             <div className="flex items-center gap-2">
               <div className="h-10 w-10 bg-primary flex items-center justify-center font-black text-accent italic text-xl rounded-lg">PP</div>
               <span className="font-black italic text-primary uppercase">Performance</span>
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors"><X size={32} /></button>
          </div>
          <div className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <a
                  className={cn(
                    "text-2xl font-bold py-4 border-b border-border flex justify-between items-center",
                    location === link.href ? "text-accent border-accent" : "text-primary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  <ChevronDown size={24} className="-rotate-90" />
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <Button className="w-full rounded-full bg-accent text-white py-8 text-lg font-bold uppercase tracking-widest mt-8 shadow-lg shadow-accent/20">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
