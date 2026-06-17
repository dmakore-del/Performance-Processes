import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, UserCircle, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import logoImg from "@/assets/logo.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface NavDropdownItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavDropdownItem[];
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}

function DesktopDropdown({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  if (!item.children) {
    return (
      <Link
        href={item.href || "/"}
        className={cn(
          "text-[13px] font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors px-3 py-2",
          isActive ? "text-accent" : ""
        )}
        data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "text-[13px] font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors px-3 py-2 flex items-center gap-1",
          isActive ? "text-accent" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
        data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {item.label}
        <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
          <div className="bg-white rounded-none shadow-xl border border-gray-100 py-2 min-w-[230px] animate-in fade-in slide-in-from-top-2 duration-200">
            {item.children.map((child) => {
              const content = (
                <div className="px-5 py-2.5 hover:bg-secondary/60 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold text-primary hover:text-accent transition-colors">
                    {child.label}
                  </span>
                </div>
              );

              if (child.isExternal) {
                return (
                  <a
                    key={child.href}
                    href={child.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    data-testid={`link-dropdown-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {content}
                  </a>
                );
              }

              if (child.href.includes("#")) {
                return (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={() => setIsOpen(false)}
                    data-testid={`link-dropdown-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setIsOpen(false)}
                  data-testid={`link-dropdown-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({ item, location, onNavigate }: { item: NavItem; location: string; onNavigate: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href || "/"}
        className={cn(
          "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
          location === item.href ? "text-accent border-accent" : "text-primary"
        )}
        onClick={onNavigate}
        data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {item.label}
        <ChevronDown size={24} className="-rotate-90" />
      </Link>
    );
  }

  return (
    <div className="border-b border-border">
      <button
        className={cn(
          "w-full text-xl font-bold py-4 flex justify-between items-center text-primary"
        )}
        onClick={() => setIsOpen(!isOpen)}
        data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {item.label}
        <ChevronDown size={24} className={cn("transition-transform duration-200", isOpen ? "rotate-0" : "-rotate-90")} />
      </button>

      {isOpen && (
        <div className="pb-4 pl-4 flex flex-col gap-0 animate-in fade-in slide-in-from-top-1 duration-200">
          {item.children.map((child) => {
            const content = (
              <div className="px-3 py-3 rounded-lg hover:bg-secondary/60 transition-colors">
                <span className="text-base font-semibold text-primary">{child.label}</span>
              </div>
            );

            if (child.isExternal) {
              return (
                <a
                  key={child.href}
                  href={child.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  data-testid={`link-mobile-dropdown-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {content}
                </a>
              );
            }

            if (child.href.includes("#")) {
              return (
                <a
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  data-testid={`link-mobile-dropdown-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                data-testid={`link-mobile-dropdown-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {content}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems: NavItem[] = [
    {
      label: t("nav.home"),
      href: "/",
    },
    {
      label: language === "en" ? "Services" : "Services",
      children: [
        { label: language === "en" ? "All Services" : "Tous les services", href: "/services" },
        { label: language === "en" ? "Website Services" : "Services web", href: "/services#cat-website" },
        { label: language === "en" ? "Marketing Services" : "Services marketing", href: "/services#cat-marketing" },
        { label: language === "en" ? "CRM and Lead Tracking" : "CRM et suivi des prospects", href: "/services#cat-crm" },
        { label: language === "en" ? "Business Systems" : "Systèmes d'affaires", href: "/services#cat-systems" },
        { label: language === "en" ? "HR and Recruiting" : "RH et recrutement", href: "/services#cat-hr-recruiting" },
        { label: language === "en" ? "Ongoing Support" : "Soutien continu", href: "/services#cat-support" },
      ],
    },
    {
      label: t("nav.about"),
      children: [
        { label: language === "en" ? "About Us" : "À propos de nous", href: "/about" },
        { label: language === "en" ? "Our Approach" : "Notre approche", href: "/approach" },
      ],
    },
    {
      label: language === "en" ? "Engage" : "Engager",
      children: [
        { label: t("nav.contact"), href: "/contact" },
        { label: language === "en" ? "NextUp Youth Partnership" : "Partenariat jeunesse NextUp", href: "/nextup-partnership" },
        { label: language === "en" ? "Book a Strategy Call" : "Réserver un appel stratégique", href: BOOKINGS_URL, isExternal: true },
      ],
    },
  ];

  const isItemActive = (item: NavItem): boolean => {
    if (item.href) return location === item.href;
    if (item.children) {
      return item.children.some((child) => !child.isExternal && location === child.href);
    }
    return false;
  };

  return (
    <header className="w-full bg-white z-[60] sticky top-0 shadow-sm">
      <div className="bg-primary text-white py-2 hidden lg:block">
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
          {navItems.map((item) => (
            <DesktopDropdown key={item.label} item={item} isActive={isItemActive(item)} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/portal" className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block" data-testid="link-portal-signin">
            <UserCircle size={20} className="text-primary" />
          </Link>
          <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center justify-center rounded-none bg-accent text-white hover:bg-primary transition-all font-bold px-6 h-11 uppercase tracking-wider text-xs" data-testid="link-book-call-nav">
              {language === "en" ? "Book a Strategy Call" : "Réserver un appel"}
          </a>
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
          <div className="flex flex-col p-8 gap-1 overflow-y-auto pb-24">
            {navItems.map((item) => (
              <MobileAccordion
                key={item.label}
                item={item}
                location={location}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            ))}

            <Link
              href="/portal"
              className={cn(
                "text-xl font-bold py-4 border-b border-border flex justify-between items-center",
                location === "/portal" ? "text-accent border-accent" : "text-primary"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Client Portal
              <ChevronDown size={24} className="-rotate-90" />
            </Link>

            <div className="flex gap-4 pt-4 border-b border-border pb-4">
              <button onClick={() => {setLanguage("en"); setIsMobileMenuOpen(false);}} className={cn("font-bold", language === "en" ? "text-accent underline" : "text-primary")}>EN</button>
              <span className="text-primary">|</span>
              <button onClick={() => {setLanguage("fr"); setIsMobileMenuOpen(false);}} className={cn("font-bold", language === "fr" ? "text-accent underline" : "text-primary")}>FR</button>
            </div>

            <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center rounded-none bg-accent text-white py-5 text-lg font-bold uppercase tracking-widest mt-4" onClick={() => setIsMobileMenuOpen(false)} data-testid="link-book-call-mobile">
                {language === "en" ? "Book a Strategy Call" : "Réserver un appel stratégique"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
