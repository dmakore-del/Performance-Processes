import { Link } from "wouter";
import { ArrowRight, Mail, BookOpen } from "lucide-react";
import { Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import logoImg from "@/assets/logo.png";

function LeadMagnetSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "You're subscribed!",
      description: "Check your inbox for the Performance Management Playbook.",
    });
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-16 md:py-20" data-testid="section-lead-magnet">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-6">
            <BookOpen className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Subscribe to Leadership Insights
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Get actionable frameworks, performance management tips, and exclusive resources delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                required
                data-testid="input-lead-magnet-email"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shrink-0"
              data-testid="button-lead-magnet-subscribe"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <>
      <LeadMagnetSection />
      <footer className="bg-white pt-0 pb-12 border-t border-border">
        <div className="bg-primary/5 py-5 overflow-hidden mb-20">
          <div className="mb-3 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/50">Our Partners</span>
          </div>
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-16 mx-8">
                  <span className="text-muted-foreground/60 font-heading font-bold text-sm tracking-wide">NextUp Canada</span>
                  <span className="text-muted-foreground/30 text-lg">&#x2022;</span>
                  <span className="text-muted-foreground/60 font-heading font-bold text-sm tracking-wide">TrueNorth Property & Facilities</span>
                  <span className="text-muted-foreground/30 text-lg">&#x2022;</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-16 mb-20">
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center" data-testid="link-logo">
                  <img src={logoImg} alt="Performance Processes" className="h-14 w-auto" />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {t("footer.description")}
              </p>
              <div className="flex items-center gap-5">
                <a href="https://www.linkedin.com/company/performance-processes/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors" data-testid="link-linkedin">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/performanceprocesses" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors" data-testid="link-instagram">
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.expertise")}</h3>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-muted-foreground">
                <li><Link href="/services" className="hover:text-accent transition-colors">Executive Advisory</Link></li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Small Business Growth</Link></li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Performance Coaching</Link></li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Programs & Tools</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.quickLinks")}</h3>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-muted-foreground">
                <li><Link href="/about" className="hover:text-accent transition-colors cursor-pointer">{t("nav.about")}</Link></li>
                <li><Link href="/approach" className="hover:text-accent transition-colors cursor-pointer">{t("nav.approach")}</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors cursor-pointer">{t("nav.contact")}</Link></li>
                <li><Link href="/careers" className="hover:text-accent transition-colors cursor-pointer">Careers</Link></li>
                <li><Link href="/insights" className="hover:text-accent transition-colors cursor-pointer">Insights</Link></li>
                <li><Link href="/portal" className="hover:text-accent transition-colors cursor-pointer">Client Portal</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.contact")}</h3>
              <div className="flex flex-col gap-3.5 text-sm font-medium text-muted-foreground">
                <p>contact@performanceprocesses.com</p>
                <p>+1 (905) 823-1324</p>
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
    </>
  );
}
