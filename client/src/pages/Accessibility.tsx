import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/hooks/use-language";

const CONTENT = {
  en: {
    heroTitle: <>Accessi<span className="text-accent">bility</span></>,
    commitmentTitle: "Our Commitment",
    commitmentBody: "Performance Processes is committed to making our website and services accessible to everyone, including individuals with disabilities. We are continuously working to improve the user experience for everyone and applying the relevant accessibility standards.",
    conformanceTitle: "Conformance Status",
    conformanceBody: "The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. We strive to maintain WCAG 2.1 Level AA compliance.",
    feedbackTitle: "Feedback",
    feedbackBody: "We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers by contacting us at contact@performanceprocesses.com.",
  },
  fr: {
    heroTitle: <>Accessi<span className="text-accent">bilité</span></>,
    commitmentTitle: "Notre engagement",
    commitmentBody: "Performance Processes s'engage à rendre son site Web et ses services accessibles à tous, y compris aux personnes en situation de handicap. Nous travaillons continuellement à améliorer l'expérience utilisateur pour tous et à appliquer les normes d'accessibilité pertinentes.",
    conformanceTitle: "État de conformité",
    conformanceBody: "Les Règles pour l'accessibilité des contenus Web (WCAG) définissent les exigences permettant aux concepteurs et aux développeurs d'améliorer l'accessibilité pour les personnes en situation de handicap. Nous nous efforçons de respecter la conformité WCAG 2.1 niveau AA.",
    feedbackTitle: "Commentaires",
    feedbackBody: "Vos commentaires sur l'accessibilité de notre site Web sont les bienvenus. Veuillez nous signaler tout obstacle à l'accessibilité en nous écrivant à contact@performanceprocesses.com.",
  },
};

export default function Accessibility() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="Accessibility Statement" description="Performance Processes is committed to digital accessibility. Learn about our accessibility practices and how we ensure our website is usable for everyone." path="/accessibility" />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={c.heroTitle}
        />
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">{c.commitmentTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {c.commitmentBody}
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">{c.conformanceTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {c.conformanceBody}
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">{c.feedbackTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {c.feedbackBody}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
