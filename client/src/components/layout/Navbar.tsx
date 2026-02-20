import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Approach", href: "/approach" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white z-[60] sticky top-0">
      {/* Top Utility Nav */}
      <div className="bg-[#2e2e2e] text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4 md:px-8 flex justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
          <a href="#" className="flex items-center gap-1 hover:text-accent"><Globe size={12} /> Canada | English</a>
          <a href="#" className="hover:text-accent">Login</a>
          <a href="#" className="hover:text-accent">Locations</a>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex h-24 items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 group" data-testid="link-logo">
            <div className="h-14 w-14 bg-black flex items-center justify-center font-heading font-black text-3xl text-accent italic relative overflow-hidden">
              <span className="relative z-10">PP</span>
              <div className="absolute top-0 right-0 w-4 h-4 bg-accent -mr-2 -mt-2 rotate-45"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-2xl leading-none tracking-tighter text-primary italic uppercase">
                Performance
              </span>
              <span className="font-heading font-bold text-[10px] leading-none tracking-[0.4em] text-muted-foreground uppercase mt-1">
                Processes Consulting
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <a
                className={cn(
                  "text-[14px] font-bold text-[#2e2e2e] hover:text-accent transition-colors py-2 flex items-center gap-1 group relative",
                  location === link.href && "after:absolute after:bottom-[-24px] after:left-0 after:w-full after:h-1 after:bg-accent"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block">
            <Search size={20} />
          </button>
          <Link href="/contact">
            <Button className="rounded-full bg-primary text-white hover:bg-accent hover:text-primary transition-all font-bold px-8 hidden md:flex">
              Contact us
            </Button>
          </Link>
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-white z-[100] flex flex-col animate-in fade-in slide-in-from-top duration-300">
          <div className="p-4 flex justify-between items-center border-b">
             <div className="h-10 w-10 bg-black flex items-center justify-center font-black text-accent italic text-xl">PP</div>
             <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <a
                  className="text-2xl font-bold text-primary py-2 border-b border-border flex justify-between items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  <ChevronDown size={20} className="-rotate-90" />
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <Button className="w-full rounded-full bg-primary text-white py-6 text-lg mt-8">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
