import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, UserCircle, Calendar, BookOpen, GraduationCap, ClipboardCheck, Layers, ArrowRight, Users, Lightbulb, Newspaper, FileText, HeartHandshake, Phone, Compass } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import logoImg from "@/assets/logo.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface NavDropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
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
          "text-[14px] font-bold text-primary hover:text-accent transition-all px-4 py-2 rounded-full",
          isActive ? "bg-secondary text-accent" : "hover:bg-secondary"
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
          "text-[14px] font-bold text-primary hover:text-accent transition-all px-4 py-2 rounded-full flex items-center gap-1",
          isActive ? "bg-secondary text-accent" : "hover:bg-secondary"
        )}
        onClick={() => setIsOpen(!isOpen)}
        data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {item.label}
        <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[320px] animate-in fade-in slide-in-from-top-2 duration-200">
            {item.children.map((child) => {
              const content = (
                <div className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/60 transition-colors group cursor-pointer">
                  <div className="mt-0.5 text-accent group-hover:text-primary transition-colors shrink-0">
                    {child.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
                      {child.label}
                      {child.isExternal && <ArrowRight size={12} className="opacity-50" />}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {child.description}
                    </div>
                  </div>
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
        <div className="pb-4 pl-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
          {item.children.map((child) => {
            const content = (
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary/60 transition-colors">
                <div className="text-accent shrink-0">{child.icon}</div>
                <div>
                  <div className="text-base font-bold text-primary">{child.label}</div>
                  <div className="text-xs text-muted-foreground">{child.description}</div>
                </div>
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
      label: language === "en" ? "Solutions" : "Solutions",
      children: [
        {
          label: language === "en" ? "Solutions Overview" : "Aperçu des solutions",
          href: "/solutions",
          icon: <Layers size={18} />,
          description: language === "en" ? "Our Growth Infrastructure System and value ladder" : "Notre système d'infrastructure de croissance",
        },
        {
          label: "Playbooks",
          href: "/playbooks",
          icon: <BookOpen size={18} />,
          description: language === "en" ? "Self-paced system frameworks you can implement today" : "Cadres de systèmes auto-guidés",
        },
        {
          label: language === "en" ? "Training Programs" : "Programmes de formation",
          href: "/training",
          icon: <GraduationCap size={18} />,
          description: language === "en" ? "Structured learning for team implementation" : "Apprentissage structuré pour la mise en œuvre",
        },
        {
          label: language === "en" ? "Growth Assessment" : "Évaluation de croissance",
          href: "/assessment",
          icon: <ClipboardCheck size={18} />,
          description: language === "en" ? "Diagnose gaps in your growth infrastructure" : "Diagnostiquer les lacunes de votre infrastructure",
        },
      ],
    },
    {
      label: t("nav.about"),
      children: [
        {
          label: language === "en" ? "About Us" : "À propos de nous",
          href: "/about",
          icon: <Users size={18} />,
          description: language === "en" ? "Our story, team, and mission" : "Notre histoire, équipe et mission",
        },
        {
          label: language === "en" ? "Our Approach" : "Notre approche",
          href: "/approach",
          icon: <Compass size={18} />,
          description: language === "en" ? "How we build systems that drive results" : "Comment nous construisons des systèmes",
        },
        {
          label: language === "en" ? "Insights" : "Perspectives",
          href: "/insights",
          icon: <Lightbulb size={18} />,
          description: language === "en" ? "Articles, frameworks, and thinking" : "Articles, cadres et réflexions",
        },
        {
          label: language === "en" ? "News" : "Nouvelles",
          href: "/news",
          icon: <Newspaper size={18} />,
          description: language === "en" ? "Latest industry news and updates" : "Dernières nouvelles de l'industrie",
        },
      ],
    },
    {
      label: language === "en" ? "Engage" : "Engager",
      children: [
        {
          label: t("nav.contact"),
          href: "/contact",
          icon: <Phone size={18} />,
          description: language === "en" ? "Get in touch with our team" : "Contactez notre équipe",
        },
        {
          label: language === "en" ? "Free Growth Audit" : "Audit de croissance gratuit",
          href: "/free-audit",
          icon: <FileText size={18} />,
          description: language === "en" ? "Get a complimentary systems assessment" : "Obtenez une évaluation complémentaire",
        },
        {
          label: language === "en" ? "Women's Performance Grant" : "Bourse de performance féminine",
          href: "/womens-performance-grant",
          icon: <HeartHandshake size={18} />,
          description: language === "en" ? "Pro-bono consulting for women-led businesses" : "Conseil pro bono pour entreprises dirigées par des femmes",
        },
        {
          label: language === "en" ? "Book a Strategy Call" : "Réserver un appel stratégique",
          href: BOOKINGS_URL,
          icon: <Calendar size={18} />,
          description: language === "en" ? "Schedule a free consultation" : "Planifier une consultation gratuite",
          isExternal: true,
        },
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
          {navItems.map((item) => (
            <DesktopDropdown key={item.label} item={item} isActive={isItemActive(item)} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/portal" className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block" data-testid="link-portal-signin">
            <UserCircle size={20} className="text-primary" />
          </Link>
          <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-primary transition-all font-bold px-6 h-11 uppercase tracking-wider text-xs" data-testid="link-book-call-nav">
              <Calendar size={15} />
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

            <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 rounded-full bg-accent text-white py-5 text-lg font-bold uppercase tracking-widest mt-4 shadow-lg shadow-accent/20" onClick={() => setIsMobileMenuOpen(false)} data-testid="link-book-call-mobile">
                <Calendar size={20} />
                {language === "en" ? "Book a Strategy Call" : "Réserver un appel stratégique"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
