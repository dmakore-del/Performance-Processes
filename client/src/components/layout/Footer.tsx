import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import logoImg from "@/assets/logo.png";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white pt-0 pb-12 border-t border-border">
      <div className="bg-primary py-6 overflow-hidden mb-24">
        <div className="mb-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Our Partners</span>
        </div>
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 mx-8">
                <span className="text-white/90 font-heading font-extrabold text-lg tracking-wide">NextUp Canada</span>
                <span className="text-accent text-xl">&#x2022;</span>
                <span className="text-white/90 font-heading font-extrabold text-lg tracking-wide">TrueNorth Property & Facilities</span>
                <span className="text-accent text-xl">&#x2022;</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-20">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center" data-testid="link-logo">
                <img src={logoImg} alt="Performance Processes" className="h-14 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
            <a href="https://www.linkedin.com/company/performance-processes/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors" data-testid="link-linkedin">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.expertise")}</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/services" className="hover:text-accent transition-colors">Strategic Planning</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Business Assessment</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Leadership Training</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Operational Efficiency</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.quickLinks")}</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/about" className="hover:text-accent transition-colors cursor-pointer">{t("nav.about")}</Link></li>
              <li><Link href="/approach" className="hover:text-accent transition-colors cursor-pointer">{t("nav.approach")}</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors cursor-pointer">{t("nav.contact")}</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition-colors cursor-pointer">Careers</Link></li>
              <li><Link href="/news" className="hover:text-accent transition-colors cursor-pointer">Industry News</Link></li>
              <li><Link href="/portal" className="hover:text-accent transition-colors cursor-pointer">Client Portal</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.contact")}</h3>
            <div className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <p>contact@performanceprocesses.com</p>
              <p>+1 (647) 400-4744</p>
              <p>Toronto, Ontario</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-8 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center lg:text-left">
          <p>© {new Date().getFullYear()} {t("footer.rights")}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
            <Link href="/legal" className="hover:text-accent transition-colors">{t("footer.privacy")}</Link>
            <Link href="/sitemap" className="hover:text-accent transition-colors">{t("footer.sitemap")}</Link>
            <Link href="/accessibility" className="hover:text-accent transition-colors">{t("footer.accessibility")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
