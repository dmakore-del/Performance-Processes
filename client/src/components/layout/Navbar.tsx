import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Insights", href: "#insights" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8 flex h-20 items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-3 group" data-testid="link-logo">
            <div className="h-10 w-10 bg-primary text-white flex items-center justify-center font-heading font-bold text-xl transition-transform group-hover:scale-105">
              PP
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-none tracking-tight text-foreground uppercase">
                Performance
              </span>
              <span className="font-heading font-medium text-sm leading-none tracking-widest text-muted-foreground uppercase mt-0.5">
                Processes
              </span>
            </div>
          </a>
        </Link>

        <div className="flex items-center gap-12">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:text-primary relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block h-6 w-[1px] bg-border mx-2"></div>

          <div className="hidden md:flex items-center">
            <Button 
              variant="default" 
              className="rounded-none bg-primary text-white hover:bg-accent transition-colors font-bold text-xs uppercase tracking-widest px-8 h-11 cursor-pointer" 
              data-testid="button-contact-desktop"
              onClick={() => window.location.href = 'mailto:contact@performanceprocesses.com'}
            >
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:bg-secondary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-white px-4 py-4 space-y-4 shadow-lg absolute w-full">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-base font-medium text-foreground py-2 border-b border-border/40"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
          <Button 
            className="w-full rounded-none bg-primary mt-4 cursor-pointer" 
            data-testid="button-contact-mobile"
            onClick={() => {
              window.location.href = 'mailto:contact@performanceprocesses.com';
              setIsMobileMenuOpen(false);
            }}
          >
            Contact Us
          </Button>
        </div>
      )}
    </header>
  );
}
