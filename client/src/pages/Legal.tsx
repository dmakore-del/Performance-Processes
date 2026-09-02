import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/hooks/use-language";

const CONTENT = {
  en: {
    seoTitle: "Privacy Policy & Terms | Performance Processes",
    seoDescription: "Read how Performance Processes handles personal information and the terms that apply to our website and services.",
    heroTitle: <>Privacy & <span className="text-accent">Terms</span></>,
    privacyTitle: "Privacy Policy",
    privacyBody: "Performance Processes is committed to protecting your privacy. We collect and use personal data only as necessary to provide our consulting services and communicate with our clients. We do not sell your information to third parties.",
    termsTitle: "Terms of Service",
    termsBody: "By using our website and services, you agree to comply with our terms. Our consulting engagements are governed by specific service agreements that outline deliverables, timelines, and confidentiality.",
    dataTitle: "Data Protection",
    dataBody: "We implement industry-standard security measures to protect your data from unauthorized access or disclosure.",
  },
  fr: {
    seoTitle: "Confidentialité et conditions | Performance Processes",
    seoDescription: "Découvrez comment Performance Processes traite les renseignements personnels et les conditions applicables à son site et à ses services.",
    heroTitle: <>Confidentialité et <span className="text-accent">Conditions</span></>,
    privacyTitle: "Politique de confidentialité",
    privacyBody: "Performance Processes s'engage à protéger votre vie privée. Nous recueillons et utilisons vos données personnelles uniquement dans la mesure nécessaire pour offrir nos services de conseil et communiquer avec nos clients. Nous ne vendons pas vos renseignements à des tiers.",
    termsTitle: "Conditions d'utilisation",
    termsBody: "En utilisant notre site Web et nos services, vous acceptez de vous conformer à nos conditions. Nos mandats de conseil sont régis par des ententes de service spécifiques qui précisent les livrables, les échéanciers et la confidentialité.",
    dataTitle: "Protection des données",
    dataBody: "Nous mettons en œuvre des mesures de sécurité conformes aux normes de l'industrie afin de protéger vos données contre tout accès ou toute divulgation non autorisés.",
  },
};

export default function Legal() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title={c.seoTitle} description={c.seoDescription} path="/legal" />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={c.heroTitle}
        />
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">{c.privacyTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {c.privacyBody}
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">{c.termsTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {c.termsBody}
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">{c.dataTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {c.dataBody}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
