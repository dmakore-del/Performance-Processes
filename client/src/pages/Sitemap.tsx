import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";

import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/hooks/use-language";

const CONTENT = {
  en: {
    heroTitle: <>Site<span className="text-accent">map</span></>,
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Website Services", href: "/services/website-services" },
      { label: "Marketing Services", href: "/services/marketing-services" },
      { label: "CRM & Lead Tracking", href: "/services/crm-lead-tracking" },
      { label: "Business Systems", href: "/services/business-systems" },
      { label: "HR & Recruiting", href: "/services/hr-recruiting" },
      { label: "Ongoing Growth Support", href: "/services/growth-support" },
      { label: "Solutions Framework", href: "/solutions" },
      { label: "NextUp Youth Partnership", href: "/nextup-partnership" },
      { label: "Our Approach", href: "/approach" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Client Portal", href: "/portal" },
      { label: "Privacy & Terms", href: "/legal" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  fr: {
    heroTitle: <>Plan du <span className="text-accent">site</span></>,
    links: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/about" },
      { label: "Services de site web", href: "/services/website-services" },
      { label: "Services de marketing", href: "/services/marketing-services" },
      { label: "CRM et suivi des prospects", href: "/services/crm-lead-tracking" },
      { label: "Systèmes d'affaires", href: "/services/business-systems" },
      { label: "RH et recrutement", href: "/services/hr-recruiting" },
      { label: "Soutien continu à la croissance", href: "/services/growth-support" },
      { label: "Cadre de solutions", href: "/solutions" },
      { label: "Partenariat jeunesse NextUp", href: "/nextup-partnership" },
      { label: "Notre approche", href: "/approach" },
      { label: "Contact", href: "/contact" },
      { label: "Carrières", href: "/careers" },
      { label: "Portail client", href: "/portal" },
      { label: "Confidentialité et conditions", href: "/legal" },
      { label: "Accessibilité", href: "/accessibility" },
    ],
  },
};

export default function Sitemap() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  const links = c.links;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="Sitemap" description="Navigate all pages on the Performance Processes website. Find services, solutions, career opportunities, and more." path="/sitemap" noindex />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={c.heroTitle}
        />
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary transition-colors border border-transparent hover:border-border group">
                      <span className="text-lg font-bold text-primary group-hover:text-accent transition-colors">{link.label}</span>
                      <span aria-hidden="true" className="text-xl leading-none text-muted-foreground group-hover:text-accent transition-colors">&rsaquo;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
