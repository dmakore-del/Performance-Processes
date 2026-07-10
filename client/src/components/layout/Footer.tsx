import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import logoImg from "@/assets/logo.png";
import { WhatsAppIcon, LinkedInIcon, InstagramIcon } from "@/components/icons/SocialIcons";

function LeadMagnetSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (emailAddr: string) => {
      const res = await apiRequest("POST", "/api/subscribe", { email: emailAddr, source: "footer-lead-magnet" });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "You're subscribed!",
        description: "Check your inbox for a welcome email with leadership insights and resources.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate(email);
  };

  return (
    <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-16 md:py-20" data-testid="section-lead-magnet">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Newsletter</div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Subscribe to Leadership Insights
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Get actionable frameworks, performance management tips, and exclusive resources delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                required
                data-testid="input-lead-magnet-email"
              />
            </div>
            <button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shrink-0 disabled:opacity-60"
              data-testid="button-lead-magnet-subscribe"
            >
              {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <>
      <LeadMagnetSection />
      <footer className="bg-white pt-20 pb-12 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-16 mb-20">
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center" data-testid="link-logo">
                  <img src={logoImg} alt="Performance Processes" className="no-grayscale h-14 w-auto" />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {t("footer.description")}
              </p>
              <div className="flex items-center gap-4">
                <a href="https://wa.me/14374254844" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground hover:text-accent transition-colors" data-testid="link-whatsapp">
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/company/performance-processes/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent transition-colors" data-testid="link-linkedin">
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/performanceprocesses" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-accent transition-colors" data-testid="link-instagram">
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{language === "en" ? "Services" : "Services"}</h3>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-muted-foreground">
                <li><a href="/services#cat-packages" className="hover:text-accent transition-colors font-semibold text-primary">Headline Packages</a></li>
                <li><Link href="/services/website-services" className="hover:text-accent transition-colors">Website Services</Link></li>
                <li><Link href="/services/marketing-services" className="hover:text-accent transition-colors">Marketing Services</Link></li>
                <li><Link href="/services/crm-lead-tracking" className="hover:text-accent transition-colors">CRM & Lead Tracking</Link></li>
                <li><Link href="/services/business-systems" className="hover:text-accent transition-colors">Business Systems</Link></li>
                <li><Link href="/services/hr-recruiting" className="hover:text-accent transition-colors">HR & Recruiting</Link></li>
                <li><Link href="/services/growth-support" className="hover:text-accent transition-colors">Ongoing Growth Support</Link></li>
                <li><Link href="/services" className="hover:text-accent transition-colors">All Packages & Services</Link></li>
                <li><Link href="/results" className="hover:text-accent transition-colors">Results & Case Studies</Link></li>
                <li><Link href="/nextup-partnership" className="hover:text-accent transition-colors">NextUp Youth Partnership</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.quickLinks")}</h3>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-muted-foreground">
                <li><Link href="/about" className="hover:text-accent transition-colors cursor-pointer">{t("nav.about")}</Link></li>
                <li><Link href="/approach" className="hover:text-accent transition-colors cursor-pointer">{t("nav.approach")}</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors cursor-pointer">{t("nav.contact")}</Link></li>
                <li><Link href="/careers" className="hover:text-accent transition-colors cursor-pointer">Careers</Link></li>
                <li><Link href="/nextup-partnership" className="hover:text-accent transition-colors cursor-pointer text-primary font-semibold">{language === "en" ? "NextUp Partnership" : "Partenariat NextUp"}</Link></li>
                <li><Link href="/portal" className="hover:text-accent transition-colors cursor-pointer">Client Portal</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-primary text-sm font-bold uppercase tracking-[0.1em]">{t("footer.contact")}</h3>
              <div className="flex flex-col gap-3.5 text-sm font-medium text-muted-foreground">
                <a href="mailto:contact@performanceprocesses.com" className="hover:text-accent transition-colors" data-testid="link-email">contact@performanceprocesses.com</a>
                <a href="tel:+14374254844" className="hover:text-accent transition-colors" data-testid="link-phone">+1 (437) 425-4844</a>
                <a href="https://wa.me/14374254844" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent transition-colors" data-testid="link-whatsapp-text">
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
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
