import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import torontoSkyline from "@assets/generated/toronto-skyline.png";
import { WhatsAppIcon, LinkedInIcon, InstagramIcon } from "@/components/icons/SocialIcons";

const whyReachOutCards = {
  en: [
    {
      title: "New Engagement",
      description: "Looking to install a website, CRM, marketing engine, or full growth infrastructure? Let's scope it together.",
    },
    {
      title: "Existing Client Support",
      description: "Already working with us? Reach out for project updates, training requests, or to expand your monthly support.",
    },
    {
      title: "Partnership Inquiry",
      description: "Interested in partnering with Performance Processes? We're always open to strategic collaborations and referral partnerships.",
    },
    {
      title: "General Questions",
      description: "Have questions about our services, scope, pricing, or process? We're happy to help with no obligation.",
    },
  ],
  fr: [
    {
      title: "Nouveau mandat",
      description: "Vous souhaitez installer un site web, un CRM, un moteur marketing ou une infrastructure de croissance complète ? Définissons la portée ensemble.",
    },
    {
      title: "Soutien aux clients existants",
      description: "Vous travaillez déjà avec nous ? Contactez-nous pour des mises à jour de projet, des demandes de formation ou pour élargir votre soutien mensuel.",
    },
    {
      title: "Demande de partenariat",
      description: "Vous souhaitez vous associer à Performance Processes ? Nous sommes toujours ouverts aux collaborations stratégiques et aux partenariats de référencement.",
    },
    {
      title: "Questions générales",
      description: "Vous avez des questions sur nos services, notre portée, nos prix ou notre processus ? Nous sommes heureux de vous aider, sans obligation.",
    },
  ],
};

const faqItems = {
  en: [
    {
      question: "Which services do you offer?",
      answer: "Six integrated practices: Websites, Marketing, CRM & Lead Tracking, Business Systems, Training & Implementation, and Ongoing Support. Buy any one as a standalone productized offer, or combine several into a bundle that installs your full growth infrastructure end-to-end.",
    },
    {
      question: "How does a new engagement start?",
      answer: "Every engagement begins with a complimentary Discovery Call where we learn about your business, your goals, and what you already have in place. From there, we recommend a productized offer or bundle with clear scope, timeline, and price, usually within a few business days.",
    },
    {
      question: "How quickly will I receive a response?",
      answer: "We respond to all inquiries within 24 business hours. For urgent matters you can email or call directly during business hours.",
    },
    {
      question: "Is the Discovery Call really free?",
      answer: "Yes. The Discovery Call is complimentary, no commitment. We use it to understand your situation and recommend the right starting point, even if that turns out to be 'not us'.",
    },
    {
      question: "What should I prepare before reaching out?",
      answer: "A short note about your business, what you're trying to grow, and what you already have in place (website, CRM, marketing tools) is plenty. You don't need a brief, that's what the Discovery Call is for.",
    },
    {
      question: "Do you work with clients outside of Ontario?",
      answer: "Yes. We're based in Ontario but work with clients across Canada. Most of our work runs remotely with structured weekly check-ins, and we travel for workshops or training when it makes sense.",
    },
    {
      question: "Who do you typically work with?",
      answer: "Professionals, nonprofits, and small-to-mid-sized businesses, including professional services, trades and local businesses, health and wellness practices, coaches, creators, and growing nonprofits.",
    },
  ],
  fr: [
    {
      question: "Quels services offrez-vous ?",
      answer: "Six pratiques intégrées : sites web, marketing, CRM et suivi des prospects, systèmes d'affaires, formation et mise en œuvre, et soutien continu. Achetez chacune comme une offre autonome, ou combinez-en plusieurs dans un forfait qui installe votre infrastructure de croissance complète de bout en bout.",
    },
    {
      question: "Comment débute un nouveau mandat ?",
      answer: "Chaque mandat commence par un appel de découverte gratuit où nous apprenons à connaître votre entreprise, vos objectifs et ce que vous avez déjà en place. À partir de là, nous recommandons une offre productisée ou un forfait avec une portée, un échéancier et un prix clairs, généralement en quelques jours ouvrables.",
    },
    {
      question: "En combien de temps recevrai-je une réponse ?",
      answer: "Nous répondons à toutes les demandes dans les 24 heures ouvrables. Pour les urgences, vous pouvez nous écrire ou nous appeler directement pendant les heures d'ouverture.",
    },
    {
      question: "L'appel de découverte est-il vraiment gratuit ?",
      answer: "Oui. L'appel de découverte est gratuit, sans engagement. Nous l'utilisons pour comprendre votre situation et recommander le bon point de départ, même si cela signifie que nous ne sommes pas le bon choix.",
    },
    {
      question: "Que dois-je préparer avant de nous contacter ?",
      answer: "Une brève note sur votre entreprise, ce que vous cherchez à faire croître et ce que vous avez déjà en place (site web, CRM, outils marketing) suffit amplement. Vous n'avez pas besoin d'un cahier des charges, c'est justement le rôle de l'appel de découverte.",
    },
    {
      question: "Travaillez-vous avec des clients à l'extérieur de l'Ontario ?",
      answer: "Oui. Nous sommes basés en Ontario, mais nous travaillons avec des clients partout au Canada. La majeure partie de notre travail se fait à distance avec des suivis hebdomadaires structurés, et nous nous déplaçons pour des ateliers ou de la formation lorsque c'est pertinent.",
    },
    {
      question: "Avec qui travaillez-vous généralement ?",
      answer: "Des professionnels, des organismes sans but lucratif et des petites et moyennes entreprises, incluant les services professionnels, les métiers et commerces locaux, les cabinets de santé et de mieux-être, les coachs, les créateurs et les OSBL en croissance.",
    },
  ],
};

const nextSteps = {
  en: [
    {
      step: "1",
      title: "Response Within 24 Hours",
      description: "Our team reviews your inquiry and responds with next steps.",
    },
    {
      step: "2",
      title: "Discovery Call",
      description: "A complimentary 30-minute call to understand your goals and challenges.",
    },
    {
      step: "3",
      title: "Custom Proposal",
      description: "We develop a tailored engagement plan with clear deliverables and timeline.",
    },
    {
      step: "4",
      title: "Engagement Begins",
      description: "Once approved, we kick off your project with a structured onboarding process.",
    },
  ],
  fr: [
    {
      step: "1",
      title: "Réponse en moins de 24 heures",
      description: "Notre équipe examine votre demande et répond avec les prochaines étapes.",
    },
    {
      step: "2",
      title: "Appel de découverte",
      description: "Un appel gratuit de 30 minutes pour comprendre vos objectifs et vos défis.",
    },
    {
      step: "3",
      title: "Proposition sur mesure",
      description: "Nous élaborons un plan de mandat adapté avec des livrables et un échéancier clairs.",
    },
    {
      step: "4",
      title: "Début du mandat",
      description: "Une fois approuvé, nous lançons votre projet avec un processus d'intégration structuré.",
    },
  ],
};

export default function Contact() {
  const { language } = useLanguage();
  const whyCards = whyReachOutCards[language];
  const faqs = faqItems[language];
  const steps = nextSteps[language];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    },
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="Contact Us, Book a Discovery Call" description="Get in touch with Performance Processes. Book a free Discovery Call to scope a website, CRM, marketing engine, or full growth-infrastructure build for your business." path="/contact" />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{language === "en" ? "Get in" : "Restez en"} <span className="text-accent italic">{language === "en" ? "Touch" : "Contact"}</span></>}
          subtitle={language === "en" 
            ? "Ready to take your business to the next level? Our consultants are ready to help."
            : "Prêt à faire passer votre entreprise au niveau supérieur ? Nos consultants sont prêts à vous aider."}
        />

        <section className="bg-gradient-to-r from-primary via-primary to-primary/95 py-8" data-testid="section-trust-strip">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-white">
              <span className="font-bold text-sm uppercase tracking-wider">{language === "en" ? "Growth Infrastructure Studio" : "Studio d'infrastructure de croissance"}</span>
              <div className="hidden md:block w-px h-8 bg-white/15" />
              <span className="font-bold text-sm uppercase tracking-wider">{language === "en" ? "End-to-End Support" : "Soutien de bout en bout"}</span>
              <div className="hidden md:block w-px h-8 bg-white/15" />
              <span className="font-bold text-sm uppercase tracking-wider">{language === "en" ? "24hr Response Guarantee" : "Réponse garantie en 24 h"}</span>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" data-testid="section-why-reach-out">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-20">
              <span className="text-accent font-bold uppercase tracking-widest text-xs">{language === "en" ? "How Can We Help" : "Comment pouvons-nous aider"}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                {language === "en" ? "Why Reach Out" : "Pourquoi nous contacter"}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                {language === "en"
                  ? "Whether you're exploring a new engagement or have a quick question, we're here to help. Here are the most common reasons clients connect with us."
                  : "Que vous envisagiez un nouveau mandat ou que vous ayez une question rapide, nous sommes là pour vous aider. Voici les raisons les plus fréquentes pour lesquelles les clients nous contactent."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#FAFAFA] to-white rounded-2xl p-8 border border-border/60 hover:border-accent/30 hover:shadow-xl transition-all duration-300 group"
                  data-testid={`card-why-reach-out-${index}`}
                >
                  <h3 className="text-lg font-bold text-primary mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <h2 className="text-3xl font-heading font-extrabold text-primary mb-12 italic">
                  {language === "en" ? "Contact Information" : "Coordonnées"}
                </h2>
                <div className="space-y-10">
                  <div>
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">{language === "en" ? "Email Us" : "Écrivez-nous"}</h4>
                    <a href="mailto:contact@performanceprocesses.com" className="text-xl font-bold text-primary hover:text-accent transition-colors" data-testid="link-email-contact">contact@performanceprocesses.com</a>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">{language === "en" ? "Call Us" : "Appelez-nous"}</h4>
                    <a href="tel:+14374254844" className="text-xl font-bold text-primary hover:text-accent transition-colors" data-testid="link-phone-contact">+1 (437) 425-4844</a>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">WhatsApp</h4>
                    <a href="https://wa.me/14374254844" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xl font-bold text-primary hover:text-accent transition-colors" data-testid="link-whatsapp-contact">
                      <WhatsAppIcon className="h-5 w-5" />
                      +1 (437) 425-4844
                    </a>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">{language === "en" ? "Our Office" : "Notre bureau"}</h4>
                    <p className="text-xl font-bold text-primary">Toronto, Ontario</p>
                  </div>
                  <div data-testid="info-office-hours">
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">{language === "en" ? "Office Hours" : "Heures d'ouverture"}</h4>
                    <p className="text-lg font-bold text-primary">{language === "en" ? "Monday , Friday" : "Lundi au vendredi"}</p>
                    <p className="text-muted-foreground text-sm mt-1">{language === "en" ? "9:00 AM , 6:00 PM EST" : "9 h à 18 h HNE"}</p>
                    <p className="text-muted-foreground text-sm mt-1">{language === "en" ? "Weekend & evening appointments available by request" : "Rendez-vous en soirée et la fin de semaine sur demande"}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-4">{language === "en" ? "Follow Us" : "Suivez-nous"}</h4>
                    <div className="flex items-center gap-5">
                      <a href="https://wa.me/14374254844" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-primary hover:text-accent transition-colors" data-testid="link-whatsapp-social">
                        <WhatsAppIcon className="h-6 w-6" />
                      </a>
                      <a href="https://www.linkedin.com/company/performance-processes/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-primary hover:text-accent transition-colors" data-testid="link-linkedin-social">
                        <LinkedInIcon className="h-6 w-6" />
                      </a>
                      <a href="https://www.instagram.com/performanceprocesses" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary hover:text-accent transition-colors" data-testid="link-instagram-social">
                        <InstagramIcon className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-14 rounded-2xl overflow-hidden border border-border/60 shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="card-location">
                  <img
                    src={torontoSkyline}
                    alt="Toronto skyline"
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-8 bg-gradient-to-br from-white to-[#FAFAFA]">
                    <h4 className="font-bold text-primary text-lg mb-3">{language === "en" ? "Based in Toronto, Serving Globally" : "Basés à Toronto, au service du monde entier"}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {language === "en"
                        ? "Our headquarters is located in the heart of Toronto, Ontario, Canada's business capital. We serve clients across Canada and internationally through both in-person and virtual engagements."
                        : "Notre siège social est situé au cœur de Toronto, en Ontario, la capitale des affaires du Canada. Nous servons des clients partout au Canada et à l'international, en personne et à distance."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 lg:p-12 rounded-3xl border border-border/60 shadow-2xl">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                    <h3 className="text-2xl font-bold text-primary" data-testid="text-success-title">
                      {language === "en" ? "Message Sent!" : "Message envoyé !"}
                    </h3>
                    <p className="text-muted-foreground max-w-sm leading-relaxed">
                      {language === "en" 
                        ? "Thank you for reaching out. We'll get back to you within 24 hours."
                        : "Merci de nous avoir contacté. Nous vous répondrons dans les 24 heures."}
                    </p>
                    <Button 
                      onClick={() => setSubmitted(false)} 
                      variant="outline" 
                      className="rounded-full px-8 mt-4"
                      data-testid="button-send-another"
                    >
                      {language === "en" ? "Send Another Message" : "Envoyer un autre message"}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-2 text-primary uppercase italic">
                      {language === "en" ? "Send us a message" : "Envoyez-nous un message"}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-8">{language === "en" ? "Fill out the form below and we'll get back to you promptly." : "Remplissez le formulaire ci-dessous et nous vous répondrons rapidement."}</p>
                    {mutation.isError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium" data-testid="text-error">
                        {language === "en" ? "Something went wrong. Please try again." : "Une erreur s'est produite. Veuillez réessayer."}
                      </div>
                    )}
                    <form 
                      className="space-y-7"
                      onSubmit={(e) => {
                        e.preventDefault();
                        mutation.mutate({ name, email, message });
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                            {language === "en" ? "Name" : "Nom"}
                          </label>
                          <input 
                            className="w-full bg-[#FAFAFA] border border-border/60 rounded-xl px-6 py-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-medium transition-all duration-200" 
                            placeholder={language === "en" ? "Your name" : "Votre nom"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            data-testid="input-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                          <input 
                            type="email"
                            className="w-full bg-[#FAFAFA] border border-border/60 rounded-xl px-6 py-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-medium transition-all duration-200" 
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            data-testid="input-email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                          {language === "en" ? "How can we help?" : "Comment pouvons-nous vous aider ?"}
                        </label>
                        <textarea 
                          className="w-full bg-[#FAFAFA] border border-border/60 rounded-xl px-6 py-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-medium h-40 resize-none transition-all duration-200" 
                          placeholder={language === "en" ? "Tell us about your project..." : "Parlez-nous de votre projet..."}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          data-testid="input-message"
                        />
                      </div>
                      <Button 
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full rounded-full bg-accent text-white hover:bg-primary h-16 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                        data-testid="button-submit"
                      >
                        {mutation.isPending ? (
                          <>{language === "en" ? "Sending..." : "Envoi..."}</>
                        ) : (
                          <>{language === "en" ? "Send Message" : "Envoyer le message"}</>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" data-testid="section-what-happens-next">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-20">
              <span className="text-accent font-bold uppercase tracking-widest text-xs">{language === "en" ? "Your Journey" : "Votre parcours"}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                {language === "en" ? "What Happens Next" : "Les prochaines étapes"}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                {language === "en"
                  ? "After you reach out, here's exactly what to expect. We believe in transparency at every step."
                  : "Après nous avoir contactés, voici exactement à quoi vous attendre. Nous croyons en la transparence à chaque étape."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {steps.map((item, index) => (
                <div key={index} className="relative text-center" data-testid={`card-next-step-${index}`}>
                  <div className="relative z-10">
                    <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-gradient-to-br from-accent to-accent/80 text-white flex items-center justify-center text-2xl font-extrabold mx-auto mb-6 shadow-lg shadow-accent/20">
                      {item.step}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-9 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent/30 to-accent/10" />
                  )}
                  <div className="bg-gradient-to-br from-[#FAFAFA] to-white rounded-2xl p-6 border border-border/60">
                    <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-[#FAFAFA] to-white" data-testid="section-faq">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-20">
              <span className="text-accent font-bold uppercase tracking-widest text-xs">{language === "en" ? "Common Questions" : "Questions fréquentes"}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                {language === "en" ? "Frequently Asked Questions" : "Foire aux questions"}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                {language === "en"
                  ? "Get answers to the most common questions about working with Performance Processes."
                  : "Obtenez des réponses aux questions les plus fréquentes sur le fait de travailler avec Performance Processes."}
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:shadow-md"
                  data-testid={`faq-item-${index}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-7 text-left hover:bg-gray-50/50 transition-colors"
                    data-testid={`button-faq-${index}`}
                    aria-expanded={openFaq === index}
                  >
                    <span className="font-bold text-primary pr-4">{faq.question}</span>
                    <span className={`text-accent flex-shrink-0 text-2xl leading-none font-light transition-transform duration-300 ${openFaq === index ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {openFaq === index && (
                    <div className="px-7 pb-7">
                      <div className="h-px bg-border/40 mb-5" />
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
