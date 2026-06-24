import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, Loader2, Briefcase, Users, HelpCircle, MessageSquare, ArrowRight, Shield, Award, Star, ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import torontoSkyline from "@assets/generated/toronto-skyline.png";

const whyReachOutCards = [
  {
    icon: Briefcase,
    title: "New Engagement",
    description: "Looking to install a website, CRM, marketing engine, or full growth infrastructure? Let's scope it together.",
  },
  {
    icon: Users,
    title: "Existing Client Support",
    description: "Already working with us? Reach out for project updates, training requests, or to expand your monthly support.",
  },
  {
    icon: MessageSquare,
    title: "Partnership Inquiry",
    description: "Interested in partnering with Performance Processes? We're always open to strategic collaborations and referral partnerships.",
  },
  {
    icon: HelpCircle,
    title: "General Questions",
    description: "Have questions about our services, scope, pricing, or process? We're happy to help with no obligation.",
  },
];

const faqItems = [
  {
    question: "Which services do you offer?",
    answer: "Six integrated practices: Websites, Marketing, CRM & Lead Tracking, Business Systems, Training & Implementation, and Ongoing Support. Buy any one as a standalone productized offer, or combine several into a bundle that installs your full growth infrastructure end-to-end.",
  },
  {
    question: "How does a new engagement start?",
    answer: "Every engagement begins with a complimentary Discovery Call where we learn about your business, your goals, and what you already have in place. From there, we recommend a productized offer or bundle with clear scope, timeline, and price — usually within a few business days.",
  },
  {
    question: "How quickly will I receive a response?",
    answer: "We respond to all inquiries within 24 business hours. For urgent matters you can email or call directly during business hours.",
  },
  {
    question: "Is the Discovery Call really free?",
    answer: "Yes. The Discovery Call is complimentary — no commitment. We use it to understand your situation and recommend the right starting point, even if that turns out to be 'not us'.",
  },
  {
    question: "What should I prepare before reaching out?",
    answer: "A short note about your business, what you're trying to grow, and what you already have in place (website, CRM, marketing tools) is plenty. You don't need a brief — that's what the Discovery Call is for.",
  },
  {
    question: "Do you work with clients outside of Ontario?",
    answer: "Yes. We're based in Ontario but work with clients across Canada. Most of our work runs remotely with structured weekly check-ins, and we travel for workshops or training when it makes sense.",
  },
  {
    question: "Who do you typically work with?",
    answer: "Professionals, nonprofits, and small-to-mid-sized businesses — including professional services, trades and local businesses, health and wellness practices, coaches, creators, and growing nonprofits.",
  },
];

const nextSteps = [
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
];

export default function Contact() {
  const { language } = useLanguage();
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield size={18} className="text-accent" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">Growth Infrastructure Studio</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/15" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Award size={18} className="text-accent" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">End-to-End Support</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/15" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Star size={18} className="text-accent" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">24hr Response Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" data-testid="section-why-reach-out">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-20">
              <span className="text-accent font-bold uppercase tracking-widest text-xs">How Can We Help</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                Why Reach Out
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                Whether you're exploring a new engagement or have a quick question, we're here to help. Here are the most common reasons clients connect with us.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyReachOutCards.map((card, index) => (
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
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">Email Us</h4>
                    <p className="text-xl font-bold text-primary">contact@performanceprocesses.com</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">Call Us</h4>
                    <p className="text-xl font-bold text-primary">+1 (905) 823-1324</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">WhatsApp</h4>
                    <a href="https://wa.me/14374254844" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-primary hover:text-accent transition-colors" data-testid="link-whatsapp-contact">
                      +1 (437) 425-4844
                    </a>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">Our Office</h4>
                    <p className="text-xl font-bold text-primary">Toronto, Ontario</p>
                  </div>
                  <div data-testid="info-office-hours">
                    <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">Office Hours</h4>
                    <p className="text-lg font-bold text-primary">Monday , Friday</p>
                    <p className="text-muted-foreground text-sm mt-1">9:00 AM , 6:00 PM EST</p>
                    <p className="text-muted-foreground text-sm mt-1">Weekend & evening appointments available by request</p>
                  </div>
                </div>

                <div className="mt-14 rounded-2xl overflow-hidden border border-border/60 shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="card-location">
                  <img
                    src={torontoSkyline}
                    alt="Toronto skyline"
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-8 bg-gradient-to-br from-white to-[#FAFAFA]">
                    <h4 className="font-bold text-primary text-lg mb-3">Based in Toronto, Serving Globally</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Our headquarters is located in the heart of Toronto, Ontario, Canada's business capital. We serve clients across Canada and internationally through both in-person and virtual engagements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 lg:p-12 rounded-3xl border border-border/60 shadow-2xl">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
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
                    <p className="text-muted-foreground text-sm mb-8">Fill out the form below and we'll get back to you promptly.</p>
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
                          <><Loader2 size={18} className="animate-spin" /> {language === "en" ? "Sending..." : "Envoi..."}</>
                        ) : (
                          <>{language === "en" ? "Send Message" : "Envoyer le message"} <Send size={18} /></>
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
              <span className="text-accent font-bold uppercase tracking-widest text-xs">Your Journey</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                What Happens Next
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                After you reach out, here's exactly what to expect. We believe in transparency at every step.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {nextSteps.map((item, index) => (
                <div key={index} className="relative text-center" data-testid={`card-next-step-${index}`}>
                  <div className="relative z-10">
                    <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-gradient-to-br from-accent to-accent/80 text-white flex items-center justify-center text-2xl font-extrabold mx-auto mb-6 shadow-lg shadow-accent/20">
                      {item.step}
                    </div>
                  </div>
                  {index < nextSteps.length - 1 && (
                    <div className="hidden md:block absolute top-9 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent/30 to-accent/10">
                      <ArrowRight size={16} className="text-accent/40 absolute -right-2 -top-[7px]" />
                    </div>
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
              <span className="text-accent font-bold uppercase tracking-widest text-xs">Common Questions</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                Get answers to the most common questions about working with Performance Processes.
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:shadow-md"
                  data-testid={`faq-item-${index}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-7 text-left hover:bg-gray-50/50 transition-colors"
                    data-testid={`button-faq-${index}`}
                  >
                    <span className="font-bold text-primary pr-4">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`text-accent flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    />
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
