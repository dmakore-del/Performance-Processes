import { Link, useLocation } from "wouter";
import { Menu, X, Search, ChevronDown, UserCircle, CalendarCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import logoImg from "@/assets/logo.png";


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceLinks = [
    { label: language === "en" ? "Management Consulting" : "Consultation en gestion", href: "/consulting", desc: language === "en" ? "Strategy, operations & growth" : "Stratégie, opérations et croissance" },
    { label: language === "en" ? "Recruiting & Headhunting" : "Recrutement et chasse de têtes", href: "/recruiting", desc: language === "en" ? "Talent acquisition & placement" : "Acquisition de talents et placement" },
    { label: "Playbooks", href: "/playbooks", desc: language === "en" ? "Templates, tools & frameworks" : "Modèles, outils et cadres" },
  ];

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: "Insights", href: "/insights" },
  ];

  const isServicesActive = ["/consulting", "/recruiting", "/playbooks", "/services"].includes(location);

  return (
    <header className="w-full bg-white z-[60] sticky top-0 shadow-sm">
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

      <div className="container mx-auto px-4 md:px-6 lg:px-10 flex h-20 lg:h-[88px] items-center justify-between">
        <Link href="/" className="flex items-center shrink-0 mr-auto" data-testid="link-logo">
            <img src={logoImg} alt="Performance Processes" className="h-[52px] lg:h-[60px] w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.slice(0, 1).map((link) => (
            <Link key={link.label} href={link.href}
                className={cn(
                  "text-[14px] font-bold text-primary hover:text-accent transition-all px-4 py-2 rounded-full",
                  location === link.href ? "bg-secondary text-accent" : "hover:bg-secondary"
                )}
                data-testid={`link-nav-${link.href.replace(/\//g, '') || 'home'}`}
              >
                {link.label}
            </Link>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              onMouseEnter={() => setServicesOpen(true)}
              className={cn(
                "text-[14px] font-bold text-primary hover:text-accent transition-all px-4 py-2 rounded-full flex items-center gap-1",
                isServicesActive ? "bg-secondary text-accent" : "hover:bg-secondary"
              )}
              data-testid="link-nav-services"
            >
              {language === "en" ? "Services" : "Services"}
              <ChevronDown size={14} className={cn("transition-transform", servicesOpen ? "rotate-180" : "")} />
            </button>
            {servicesOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-white rounded-2xl shadow-xl border border-border/50 p-3 z-50"
                onMouseLeave={() => setServicesOpen(false)}
              >
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all",
                      location === link.href ? "bg-accent/5 text-accent" : "hover:bg-secondary"
                    )}
                    onClick={() => setServicesOpen(false)}
                    data-testid={`link-nav-${link.href.replace(/\//g, '')}`}
                  >
                    <span className="text-sm font-bold">{link.label}</span>
                    <span className="text-xs text-muted-foreground">{link.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link key={link.label} href={link.href}
                className={cn(
                  "text-[14px] font-bold text-primary hover:text-accent transition-all px-4 py-2 rounded-full",
                  location === link.href ? "bg-secondary text-accent" : "hover:bg-secondary"
                )}
                data-testid={`link-nav-${link.href.replace(/\//g, '') || 'home'}`}
              >
                {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button 
            className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block"
            onClick={() => {
              const query = window.prompt(language === "en" ? "Search Performance Processes..." : "Rechercher sur Performance Processes...");
              if (query) {
                window.location.href = `/consulting?q=${encodeURIComponent(query)}`;
              }
            }}
            data-testid="button-search"
          >
            <Search size={20} className="text-primary" />
          </button>
          <Link href="/portal" className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block" data-testid="link-portal-signin">
            <UserCircle size={20} className="text-primary" />
          </Link>
          <Link href="/free-audit" className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-primary transition-all font-bold px-6 h-11 uppercase tracking-wider text-xs" data-testid="link-free-audit-nav">
              <CalendarCheck size={15} />
              {language === "en" ? "Free Audit" : "Audit gratuit"}
          </Link>
          <button
            className="lg:hidden p-2 text-primary hover:bg-secondary rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-white z-[100] flex flex-col animate-in fade-in slide-in-from-right duration-300">
          <div className="p-4 flex justify-between items-center border-b h-20">
             <div className="flex items-center">
               <img src={logoImg} alt="Performance Processes" className="h-12 w-auto" />
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors"><X size={32} /></button>
          </div>
          <div className="flex flex-col p-8 gap-4 overflow-y-auto pb-24">
            <Link href="/"
                className={cn(
                  "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
                  location === "/" ? "text-accent border-accent" : "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-nav-home"
              >
                {t("nav.home")}
                <ChevronDown size={24} className="-rotate-90" />
            </Link>

            <div className="border-b border-border pb-2">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">
                {language === "en" ? "Services" : "Services"}
              </div>
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href}
                    className={cn(
                      "text-lg font-bold py-3 px-1 flex justify-between items-center",
                      location === link.href ? "text-accent" : "text-primary"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${link.href.replace(/\//g, '')}`}
                  >
                    {link.label}
                    <ChevronDown size={20} className="-rotate-90" />
                </Link>
              ))}
            </div>

            <Link href="/about"
                className={cn(
                  "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
                  location === "/about" ? "text-accent border-accent" : "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-nav-about"
              >
                {t("nav.about")}
                <ChevronDown size={24} className="-rotate-90" />
            </Link>
            <Link href="/insights"
                className={cn(
                  "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
                  location === "/insights" ? "text-accent border-accent" : "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-nav-insights"
              >
                Insights
                <ChevronDown size={24} className="-rotate-90" />
            </Link>
            <Link href="/contact"
                className={cn(
                  "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
                  location === "/contact" ? "text-accent border-accent" : "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-nav-contact"
              >
                {t("nav.contact")}
                <ChevronDown size={24} className="-rotate-90" />
            </Link>
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

            <div className="flex gap-4 pt-2 border-b border-border pb-4">
              <button onClick={() => {setLanguage("en"); setIsMobileMenuOpen(false);}} className={cn("font-bold", language === "en" ? "text-accent underline" : "text-primary")}>EN</button>
              <span className="text-primary">|</span>
              <button onClick={() => {setLanguage("fr"); setIsMobileMenuOpen(false);}} className={cn("font-bold", language === "fr" ? "text-accent underline" : "text-primary")}>FR</button>
            </div>

            <Link href="/free-audit" className="w-full flex items-center justify-center gap-3 rounded-full bg-accent text-white py-5 text-lg font-bold uppercase tracking-widest mt-4 shadow-lg shadow-accent/20" onClick={() => setIsMobileMenuOpen(false)} data-testid="link-free-audit-mobile">
                <CalendarCheck size={20} />
                {language === "en" ? "Free Audit" : "Audit gratuit"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
