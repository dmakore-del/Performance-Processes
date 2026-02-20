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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-6 flex h-20 items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2" data-testid="link-logo">
            {/* Minimalist Logo */}
            <div className="h-8 w-8 bg-primary text-white flex items-center justify-center font-heading font-bold text-lg leading-none">
              PP
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground hidden sm:inline-block">
              Performance Processes
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary corporate-link"
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="default" 
            className="rounded-none bg-primary text-white hover:bg-primary/90 font-medium px-6 cursor-pointer" 
            data-testid="button-contact-desktop"
            onClick={() => window.location.href = 'mailto:contact@performanceprocesses.com'}
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
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
