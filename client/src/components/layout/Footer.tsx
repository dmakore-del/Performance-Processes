import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-20">
          <div className="flex flex-col gap-6">
            <Link href="/">
              <a className="flex items-center gap-3" data-testid="link-logo">
                <div className="h-10 w-10 bg-primary text-accent flex items-center justify-center font-heading font-black text-xl italic rounded-lg flex-shrink-0">
                  PP
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-heading font-black text-2xl tracking-tighter italic uppercase leading-none text-primary truncate">
                    Performance
                  </span>
                  <span className="font-heading font-bold text-[8px] leading-none tracking-[0.3em] text-accent uppercase mt-1">
                    Processes
                  </span>
                </div>
              </a>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Performance Processes is a professional business consulting firm dedicated to helping organizations bridge the gap between vision and execution.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">Our Expertise</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Strategic Planning</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Business Assessment</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Leadership Training</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Operational Efficiency</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">Support</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Resources</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Global Network</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">Newsletter</h3>
            <div className="flex flex-col gap-4">
              <p className="text-xs text-muted-foreground leading-normal">Stay updated with our latest insights.</p>
              <div className="flex gap-2">
                 <input className="bg-secondary border border-border rounded-lg px-4 py-3 text-xs flex-grow outline-none focus:border-accent min-w-0" placeholder="Email address" />
                 <button className="bg-primary text-white p-3 rounded-lg hover:bg-accent transition-colors flex-shrink-0">
                   <ArrowRight size={16} />
                 </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-8 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center lg:text-left">
          <p>© {new Date().getFullYear()} Performance Processes Consulting</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
            <Link href="/legal"><a className="hover:text-accent transition-colors">Privacy & Terms</a></Link>
            <Link href="/sitemap"><a className="hover:text-accent transition-colors">Sitemap</a></Link>
            <Link href="/accessibility"><a className="hover:text-accent transition-colors">Accessibility</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
