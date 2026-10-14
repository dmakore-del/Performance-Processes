import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";

import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/hooks/use-language";

const CONTENT = {
  en: {
    seoTitle: "Sitemap | Performance Processes",
    seoDescription: "Browse Performance Processes' Canadian business formation, setup, website, and digital-launch services.",
    heroTitle: <>Site<span className="text-accent">map</span></>,
    links: [
      { label: "Home", href: "/" },
       { label: "Start a Business", href: "/start-a-business" },
       { label: "Business Setup", href: "/business-setup" },
       { label: "Websites & Digital Presence", href: "/websites-digital" },
         { label: "Grants & Financing", href: "/grants-financing" },
       { label: "About Us", href: "/about" },
       { label: "Results", href: "/results" },
      { label: "Contact", href: "/contact" },
       { label: "NextUp Youth Partnership", href: "/nextup-partnership" },
      { label: "Privacy & Terms", href: "/legal" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  fr: {
    seoTitle: "Plan du site | Performance Processes",
    seoDescription: "Parcourez les services canadiens de formation, de mise en place, de sites web et de lancement numérique de Performance Processes.",
    heroTitle: <>Plan du <span className="text-accent">site</span></>,
    links: [
      { label: "Accueil", href: "/" },
       { label: "Démarrer une entreprise", href: "/start-a-business" },
       { label: "Mise en place", href: "/business-setup" },
       { label: "Sites web et présence numérique", href: "/websites-digital" },
         { label: "Subventions et financement", href: "/grants-financing" },
       { label: "À propos", href: "/about" },
       { label: "Résultats", href: "/results" },
      { label: "Contact", href: "/contact" },
       { label: "Partenariat jeunesse NextUp", href: "/nextup-partnership" },
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
      <SEOHead title={c.seoTitle} description={c.seoDescription} path="/sitemap" noindex />
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
