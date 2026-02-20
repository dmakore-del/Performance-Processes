import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

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
              {t("footer.description")}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.expertise")}</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/services"><a className="hover:text-accent transition-colors">Strategic Planning</a></Link></li>
              <li><Link href="/services"><a className="hover:text-accent transition-colors">Business Assessment</a></Link></li>
              <li><Link href="/services"><a className="hover:text-accent transition-colors">Leadership Training</a></Link></li>
              <li><Link href="/services"><a className="hover:text-accent transition-colors">Operational Efficiency</a></Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.quickLinks")}</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/about"><span className="hover:text-accent transition-colors cursor-pointer">{t("nav.about")}</span></Link></li>
              <li><Link href="/approach"><span className="hover:text-accent transition-colors cursor-pointer">{t("nav.approach")}</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-accent transition-colors cursor-pointer">{t("nav.contact")}</span></Link></li>
              <li><Link href="/careers"><span className="hover:text-accent transition-colors cursor-pointer">Careers</span></Link></li>
              <li><Link href="/portal"><span className="hover:text-accent transition-colors cursor-pointer">Client Portal</span></Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.contact")}</h3>
            <div className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <p>contact@performanceprocesses.com</p>
              <p>Toronto, Ontario</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-8 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center lg:text-left">
          <p>© {new Date().getFullYear()} {t("footer.rights")}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
            <Link href="/legal"><a className="hover:text-accent transition-colors">{t("footer.privacy")}</a></Link>
            <Link href="/sitemap"><a className="hover:text-accent transition-colors">{t("footer.sitemap")}</a></Link>
            <Link href="/accessibility"><a className="hover:text-accent transition-colors">{t("footer.accessibility")}</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
