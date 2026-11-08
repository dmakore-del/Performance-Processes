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
    privacyBody: "Performance Processes Soleria Inc. uses contact, appointment, discovery, business-health and funding-readiness information to respond to enquiries, prepare requested discussions, deliver agreed services and meet legal obligations. Do not send passwords, government identification numbers, bank-account details or confidential financial records through website forms. We do not sell personal information. Information is shared only with service providers needed to operate the site, email, booking and service delivery, with your consent, or where law requires it. We retain submissions only as long as needed for their purpose and related contractual or legal duties. To request access or correction, withdraw consent, or ask a privacy question, write to contact@performanceprocesses.com.",
    termsTitle: "Terms of Service",
    termsBody: "You must be at least 18 and use this site lawfully. Website information is general and is not legal, tax, accounting, lending or regulated financial advice. Funding eligibility, approvals and outcomes are decided by third parties and are not guaranteed. Paid work starts only after a written scope and any applicable service agreement are approved; the signed engagement documents govern scope, fees, confidentiality and deliverables. Website material is provided as available. These terms are governed by Ontario and applicable Canadian law, subject to rights that cannot be limited by law. The business operates as Performance Processes Soleria Inc.",
    dataTitle: "Data Protection",
    dataBody: "We use reasonable administrative and technical safeguards, limit internal access, and avoid requesting high-risk identity or banking details in these forms. No method of online transmission or storage can be guaranteed completely secure. Website and booking providers may process information under their own terms and privacy practices.",
  },
  fr: {
    seoTitle: "Confidentialité et conditions | Performance Processes",
    seoDescription: "Découvrez comment Performance Processes traite les renseignements personnels et les conditions applicables à son site et à ses services.",
    heroTitle: <>Confidentialité et <span className="text-accent">Conditions</span></>,
    privacyTitle: "Politique de confidentialité",
    privacyBody: "Performance Processes Soleria Inc. utilise les renseignements de contact, de rendez-vous, de découverte, de santé d’entreprise et de préparation au financement pour répondre aux demandes, préparer les discussions souhaitées, fournir les services convenus et respecter ses obligations légales. N’envoyez aucun mot de passe, numéro d’identité gouvernementale, renseignement bancaire ou document financier confidentiel dans les formulaires. Nous ne vendons pas les renseignements personnels. Ils sont communiqués uniquement aux fournisseurs nécessaires au site, au courriel, à la réservation et aux services, avec votre consentement ou lorsque la loi l’exige. Nous conservons les demandes le temps nécessaire à leur objectif et aux obligations contractuelles ou légales. Pour demander l’accès ou la correction, retirer votre consentement ou poser une question, écrivez à contact@performanceprocesses.com.",
    termsTitle: "Conditions d'utilisation",
    termsBody: "Vous devez avoir au moins 18 ans et utiliser ce site de façon licite. Le contenu du site est général et ne constitue pas un conseil juridique, fiscal, comptable, de prêt ou un conseil financier réglementé. Les organismes et prêteurs décident de l’admissibilité, de l’approbation et des résultats de financement, sans garantie. Les travaux payants commencent uniquement après l’approbation écrite d’une portée et, le cas échéant, d’une entente de service; les documents signés régissent la portée, les frais, la confidentialité et les livrables. Le contenu du site est fourni selon sa disponibilité. Les lois de l’Ontario et les lois canadiennes applicables régissent ces conditions, sous réserve des droits qui ne peuvent être limités par la loi. L’entreprise exerce ses activités sous le nom Performance Processes Soleria Inc.",
    dataTitle: "Protection des données",
    dataBody: "Nous appliquons des mesures administratives et techniques raisonnables, limitons l’accès interne et évitons de demander des renseignements d’identité ou bancaires à risque élevé dans ces formulaires. Aucun moyen de transmission ou de stockage en ligne n’est entièrement sécurisé. Les fournisseurs du site et des réservations peuvent traiter des renseignements selon leurs propres conditions et politiques de confidentialité.",
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
            <section id="privacy" className="space-y-4 scroll-mt-28">
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
