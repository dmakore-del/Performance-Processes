import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AcquisitionForm } from "@/components/AcquisitionForm";
import { useLanguage } from "@/hooks/use-language";

export default function BookConsultation() {
  const { language } = useLanguage();
  const fr = language === "fr";
  return <div className="bg-background"><SEOHead title={fr ? "Réserver une consultation | Performance Processes" : "Book a Business Consultation | Performance Processes"} description={fr ? "Décrivez votre projet de lancement ou de croissance, puis choisissez un horaire de découverte." : "Tell us about your business launch or growth project, then choose an available discovery-call time."} path="/book-consultation" /><Navbar /><main className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[.7fr_1.3fr] lg:py-20">
    <div><h1 className="text-display text-5xl leading-tight md:text-6xl">{fr ? "Parlons de votre entreprise." : "Let’s talk about your business."}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">{fr ? "Un appel découverte gratuit pour discuter de vos objectifs de lancement, de votre présence numérique, de vos systèmes ou de vos besoins de financement." : "A free discovery conversation about your launch plans, digital presence, business systems or funding needs."}</p><p className="mt-6 border-t border-border pt-6 text-sm leading-7 text-muted-foreground">{fr ? "Décrivez vos besoins ici. Choisissez ensuite un horaire dans Outlook. Une demande enregistrée ne constitue pas une réservation." : "Share your needs here. Next, choose an appointment in Outlook. Saving an enquiry is not a confirmed booking."}</p></div>
    <AcquisitionForm />
  </main><Footer /></div>;
}
