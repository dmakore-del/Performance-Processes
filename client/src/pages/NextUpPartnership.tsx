import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

const NEXTUP_URL = "https://nextupcan.ca/get-involved";
const PROMO_CODE = "NEXTPROCESSES";

const CONTENT = {
  en: {
    seoTitle: "NextUp Partnership | 40% Off Website Services",
    seoDescription: "Eligible NextUp program participants and qualifying donors receive 40% off Performance Processes website services.",
    heroTitle: (
      <>
        <span className="text-accent">NextUp</span> Foundation Partnership
      </>
    ),
    heroSubtitle:
      "40% off our website services for anyone enrolled in a NextUp Foundation for Canadian Youth program, or who has donated $500 or more to the foundation in the past year.",
    eligibility: [
      "Currently enrolled in one of the NextUp Foundation for Canadian Youth's programs, and/or",
      "Donated $500 or more to the NextUp Foundation for Canadian Youth in the past year",
      "Canadian-owned business or registered organization",
    ],
    discountApplies: [
      "Starter Website Package",
      "Business Website Package",
      "Website Conversion Package",
    ],
    howItWorks: [
      {
        step: "01",
        title: "Confirm you qualify",
        description:
          "You're eligible if you're currently enrolled in a NextUp Foundation for Canadian Youth program, and/or you've donated $500 or more to the foundation in the past year.",
      },
      {
        step: "02",
        title: "We verify your eligibility",
        description:
          "Performance Processes and the NextUp Foundation for Canadian Youth coordinate to confirm your enrollment or donation. Reach out and we'll handle the verification with NextUp directly.",
      },
      {
        step: "03",
        title: "Apply your discount at checkout",
        description: `Once verified, enter the code ${PROMO_CODE} on any website package on our Services page. The 40% discount is applied instantly at checkout.`,
      },
    ],
    stats: [
      { label: "Discount", value: "40% off" },
      { label: "Eligible", value: "Members & donors" },
      { label: "Applies to", value: "Website services" },
      { label: "Coverage", value: "Canada-wide" },
    ],
    overviewHeading: "Why we partner with NextUp",
    overviewP1:
      "The NextUp Foundation for Canadian Youth champions young Canadian entrepreneurs through community, programming, and resources that help them launch and grow real businesses. Performance Processes shares that mission. Through this partnership, anyone currently enrolled in a NextUp program, or who has donated $500 or more to the foundation in the past year, gets 40% off our website services, the same websites we deliver to enterprise clients.",
    overviewP2:
      "The goal is simple: remove cost as a barrier so the next generation of Canadian founders can launch with a professional website that helps their business grow.",
    overviewLink: "Get involved with NextUp",
    eligibilityHeading: "Who qualifies",
    eligibilityNote:
      "Verification is coordinated by Performance Processes and the NextUp Foundation for Canadian Youth. Contact us and we'll confirm your eligibility directly with NextUp.",
    coverageHeading: "What the 40% applies to",
    coverageNote:
      "The discount applies to website services only. Marketing, CRM, systems, training, and support services are not eligible.",
    howHeading: "How it works",
    howIntro: "Three steps to claim your 40% discount on a website package.",
    ctaHeading: "Ready to claim your NextUp discount?",
    ctaBook: "Contact Us to Verify",
    ctaServices: "Browse Website Services",
  },
  fr: {
    seoTitle: "Partenariat NextUp | 40 % de rabais sur les sites web",
    seoDescription: "Les participants admissibles aux programmes NextUp et les donateurs admissibles bénéficient de 40 % de rabais sur nos services de sites web.",
    heroTitle: (
      <>
        Partenariat avec la <span className="text-accent">NextUp</span> Foundation
      </>
    ),
    heroSubtitle:
      "40 % de rabais sur nos services de conception de sites Web pour toute personne inscrite à un programme de la NextUp Foundation for Canadian Youth, ou ayant fait un don de 500 $ ou plus à la fondation au cours de la dernière année.",
    eligibility: [
      "Actuellement inscrit à l'un des programmes de la NextUp Foundation for Canadian Youth, et/ou",
      "Avoir fait un don de 500 $ ou plus à la NextUp Foundation for Canadian Youth au cours de la dernière année",
      "Entreprise à propriété canadienne ou organisation enregistrée",
    ],
    discountApplies: [
      "Forfait Site Web Essentiel",
      "Forfait Site Web Entreprise",
      "Forfait Refonte de Site Web",
    ],
    howItWorks: [
      {
        step: "01",
        title: "Confirmez votre admissibilité",
        description:
          "Vous êtes admissible si vous êtes actuellement inscrit à un programme de la NextUp Foundation for Canadian Youth, et/ou si vous avez fait un don de 500 $ ou plus à la fondation au cours de la dernière année.",
      },
      {
        step: "02",
        title: "Nous vérifions votre admissibilité",
        description:
          "Performance Processes et la NextUp Foundation for Canadian Youth se coordonnent pour confirmer votre inscription ou votre don. Contactez-nous et nous nous chargerons de la vérification directement avec NextUp.",
      },
      {
        step: "03",
        title: "Appliquez votre rabais au paiement",
        description: `Une fois votre admissibilité vérifiée, saisissez le code ${PROMO_CODE} sur n'importe quel forfait de site Web dans notre page Services. Le rabais de 40 % est appliqué instantanément au paiement.`,
      },
    ],
    stats: [
      { label: "Rabais", value: "40 % de rabais" },
      { label: "Admissibles", value: "Membres et donateurs" },
      { label: "S'applique à", value: "Services de sites Web" },
      { label: "Couverture", value: "Partout au Canada" },
    ],
    overviewHeading: "Pourquoi nous nous associons à NextUp",
    overviewP1:
      "La NextUp Foundation for Canadian Youth soutient les jeunes entrepreneurs canadiens grâce à une communauté, des programmes et des ressources qui les aident à lancer et à développer de véritables entreprises. Performance Processes partage cette mission. Grâce à ce partenariat, toute personne actuellement inscrite à un programme NextUp, ou ayant fait un don de 500 $ ou plus à la fondation au cours de la dernière année, bénéficie de 40 % de rabais sur nos services de sites Web, les mêmes sites que nous livrons à nos clients d'entreprise.",
    overviewP2:
      "L'objectif est simple : éliminer le coût comme obstacle afin que la prochaine génération de fondateurs canadiens puisse démarrer avec un site Web professionnel qui aide leur entreprise à croître.",
    overviewLink: "Impliquez-vous avec NextUp",
    eligibilityHeading: "Qui est admissible",
    eligibilityNote:
      "La vérification est coordonnée par Performance Processes et la NextUp Foundation for Canadian Youth. Contactez-nous et nous confirmerons votre admissibilité directement avec NextUp.",
    coverageHeading: "À quoi s'applique le 40 %",
    coverageNote:
      "Le rabais s'applique uniquement aux services de sites Web. Les services de marketing, de CRM, de systèmes, de formation et de soutien ne sont pas admissibles.",
    howHeading: "Comment ça fonctionne",
    howIntro: "Trois étapes pour obtenir votre rabais de 40 % sur un forfait de site Web.",
    ctaHeading: "Prêt à obtenir votre rabais NextUp ?",
    ctaBook: "Contactez-nous pour vérifier",
    ctaServices: "Parcourir les services de sites Web",
  },
};

export default function NextUpPartnership() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  const { eligibility, discountApplies, howItWorks, stats } = c;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead
        title={c.seoTitle}
        description={c.seoDescription}
        path="/nextup-partnership"
      />
      <Navbar />
      <main className="flex-grow">
        <PageHero
          title={c.heroTitle}
          subtitle={c.heroSubtitle}
        />

        <section className="py-16 bg-white" data-testid="section-stats">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-[#FAFAFA] rounded-2xl p-6 text-center border border-border"
                  data-testid={`stat-${i}`}
                >
                  <div className="text-2xl font-extrabold text-primary mb-1">{s.value}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" data-testid="section-overview">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-6">
                {c.overviewHeading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {c.overviewP1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {c.overviewP2}
              </p>
              <a
                href={NEXTUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-primary transition-colors"
                data-testid="link-nextup-external"
              >
                {c.overviewLink}
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" data-testid="section-eligibility">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-[#FAFAFA] rounded-2xl p-8 border border-border" data-testid="card-eligibility">
                <h3 className="text-xl font-bold text-primary mb-5">{c.eligibilityHeading}</h3>
                <ul className="space-y-3">
                  {eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-3" data-testid={`eligibility-${i}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span className="text-sm text-primary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
                  {c.eligibilityNote}
                </p>
              </div>

              <div className="bg-[#FAFAFA] rounded-2xl p-8 border border-border" data-testid="card-coverage">
                <h3 className="text-xl font-bold text-primary mb-5">{c.coverageHeading}</h3>
                <ul className="space-y-3">
                  {discountApplies.map((item, i) => (
                    <li key={i} className="flex items-start gap-3" data-testid={`coverage-${i}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span className="text-sm text-primary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
                  {c.coverageNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" data-testid="section-how-it-works">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                  {c.howHeading}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {c.howIntro}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {howItWorks.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-7 border border-border hover:shadow-md hover:border-accent/30 transition-all"
                    data-testid={`step-${i}`}
                  >
                    <div className="text-4xl font-black text-accent/30 mb-3">{step.step}</div>
                    <h3 className="text-lg font-heading font-extrabold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              {c.ctaHeading}
            </h2>
            <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
              {language === "fr" ? (
                <>
                  Si vous êtes inscrit à un programme de la NextUp Foundation for Canadian Youth, ou
                  si vous avez fait un don de 500 $ ou plus au cours de la dernière année, contactez-nous
                  pour vérifier votre admissibilité. Une fois confirmée, utilisez le code{" "}
                  <span className="font-bold text-accent">{PROMO_CODE}</span> au paiement pour
                  obtenir 40 % de rabais sur n'importe quel forfait de site Web.
                </>
              ) : (
                <>
                  If you're enrolled in a NextUp Foundation for Canadian Youth program, or have
                  donated $500 or more in the past year, contact us to verify your eligibility.
                  Once confirmed, use code{" "}
                  <span className="font-bold text-accent">{PROMO_CODE}</span> at checkout to
                  receive 40% off any website package.
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm"
                data-testid="button-verify-eligibility"
              >
                {c.ctaBook}
              </Link>
              <Link
                href="/#capabilities"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm"
                data-testid="button-view-services"
              >
                {c.ctaServices}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
