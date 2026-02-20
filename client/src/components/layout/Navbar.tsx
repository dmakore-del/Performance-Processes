import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { title: "Strategic Planning", href: "/services", description: "Aligning organizational goals with execution." },
    { title: "Leadership Development", href: "/services", description: "Strengthening capability at all levels." },
    { title: "Performance Management", href: "/services", description: "Designing systems for measurable impact." },
    { title: "Process Improvement", href: "/services", description: "Optimizing operations for scale." },
  ];

  const insights = [
    { title: "Case Studies", href: "/insights", description: "Real results from our collaborative approach." },
    { title: "Whitepapers", href: "/insights", description: "Deep dives into performance optimization." },
    { title: "Industry News", href: "/insights", description: "Staying ahead of strategic trends." },
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

        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-[13px] font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:text-primary px-2">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {services.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block select-none space-y-1 rounded-none p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-accent-foreground focus:bg-secondary focus:text-accent-foreground"
                            >
                              <div className="text-sm font-bold leading-none uppercase tracking-tight">{item.title}</div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="#approach" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent text-[13px] font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:text-primary px-4")}>
                    Approach
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-[13px] font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:text-primary px-2">
                    Insights
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {insights.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block select-none space-y-1 rounded-none p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-accent-foreground focus:bg-secondary focus:text-accent-foreground"
                            >
                              <div className="text-sm font-bold leading-none uppercase tracking-tight">{item.title}</div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="#about" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent text-[13px] font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:text-primary px-4")}>
                    About
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden md:block h-6 w-[1px] bg-border"></div>

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
          <div className="space-y-1">
            <div className="px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Services</div>
            {services.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="block text-sm font-bold uppercase tracking-tight text-foreground px-4 py-3 hover:bg-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
          </div>
          
          <a
            href="#approach"
            className="block text-sm font-bold uppercase tracking-tight text-foreground px-2 py-3 border-t border-border/40"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Approach
          </a>

          <div className="space-y-1">
            <div className="px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Insights</div>
            {insights.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="block text-sm font-bold uppercase tracking-tight text-foreground px-4 py-3 hover:bg-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
          </div>

          <a
            href="#about"
            className="block text-sm font-bold uppercase tracking-tight text-foreground px-2 py-3 border-t border-border/40"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>

          <Button 
            className="w-full rounded-none bg-primary mt-4 cursor-pointer py-6 font-bold uppercase tracking-widest text-xs" 
            data-testid="button-contact-mobile"
            onClick={() => {
              window.location.href = 'mailto:contact@performanceprocesses.com';
              setIsMobileMenuOpen(false);
            }}
          >
            Get in Touch
          </Button>
        </div>
      )}
    </header>
  );
}
