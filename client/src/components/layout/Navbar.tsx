import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
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
    <header className="w-full bg-white border-b sticky top-0 z-[60]">
      <div className="container mx-auto px-4 md:px-8 flex h-24 items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2" data-testid="link-logo">
            <div className="h-12 w-12 bg-black flex items-center justify-center font-heading font-black text-2xl text-white italic">
              PP
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl leading-none tracking-tighter text-black italic uppercase">
                Performance
              </span>
              <span className="font-heading font-bold text-xs leading-none tracking-[0.2em] text-accent uppercase mt-1">
                Processes
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <a
                className={cn(
                  "text-[13px] font-extrabold uppercase tracking-widest transition-colors py-2 relative group",
                  location === link.href ? "text-accent" : "text-black hover:text-accent"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 h-1 bg-accent transition-all group-hover:w-full",
                  location === link.href ? "w-full" : "w-0"
                )}></span>
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
             <Search size={20} className="text-black cursor-pointer hover:text-accent transition-colors" />
             <Link href="/contact">
               <Button 
                  variant="default" 
                  className="rounded-none bg-accent text-white hover:bg-black transition-all font-bold text-[11px] uppercase tracking-[0.2em] px-8 h-12"
                >
                  Contact
                </Button>
             </Link>
          </div>

          <button
            className="lg:hidden p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-24 bg-white z-50 flex flex-col p-8 animate-in slide-in-from-right">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <a
                className={cn(
                  "text-2xl font-black uppercase italic tracking-tighter py-4 border-b",
                  location === link.href ? "text-accent" : "text-black"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/contact">
            <Button 
              className="rounded-none bg-accent text-white mt-12 h-16 text-sm font-bold uppercase tracking-widest w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact us
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
