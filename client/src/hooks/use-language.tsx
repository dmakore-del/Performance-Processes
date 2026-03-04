import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.approach": "Our Approach",
    "nav.contact": "Contact Us",
    "hero.title": "Turn Ambition Into",
    "hero.titleAccent": "Consistent Execution.",
    "hero.subtitle": "We help professionals, businesses, and organizations build the systems that turn goals into measurable, repeatable results.",
    "hero.ctaPrimary": "Explore services",
    "hero.ctaSecondary": "See the framework",
    "footer.description": "Performance Processes helps professionals, businesses, and organizations turn ambition into consistent execution.",
    "footer.expertise": "Our Expertise",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "Performance Processes Consulting",
    "footer.privacy": "Privacy & Terms",
    "footer.sitemap": "Sitemap",
    "footer.accessibility": "Accessibility",
    "common.learnMore": "Learn more"
  },
  fr: {
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.about": "À Propos",
    "nav.approach": "Notre Approche",
    "nav.contact": "Contactez-nous",
    "hero.title": "Transformer l'ambition en",
    "hero.titleAccent": "exécution cohérente.",
    "hero.subtitle": "Nous aidons les professionnels, les entreprises et les organisations à bâtir les systèmes qui transforment les objectifs en résultats mesurables et reproductibles.",
    "hero.ctaPrimary": "Découvrir les services",
    "hero.ctaSecondary": "Voir le cadre",
    "footer.description": "Performance Processes aide les professionnels, les entreprises et les organisations à transformer l'ambition en exécution cohérente.",
    "footer.expertise": "Notre Expertise",
    "footer.quickLinks": "Liens Rapides",
    "footer.contact": "Contact",
    "footer.rights": "Performance Processes Conseil",
    "footer.privacy": "Confidentialité et Conditions",
    "footer.sitemap": "Plan du site",
    "footer.accessibility": "Accessibilité",
    "common.learnMore": "En savoir plus"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "en" || saved === "fr") ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
