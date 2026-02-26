import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, Clock, Briefcase, Users, HelpCircle, MessageSquare, ArrowRight, Shield, Award, Star, ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import torontoSkyline from "@assets/stock_images/toronto_skyline.jpg";

const whyReachOutCards = [
  {
    icon: Briefcase,
    title: "New Engagement",
    description: "Exploring consulting services for your organization? Let's discuss your goals and how we can help you achieve measurable results.",
  },
  {
    icon: Users,
    title: "Existing Client Support",
    description: "Already working with us? Reach out for project updates, additional support, or to discuss expanding your engagement.",
  },
  {
    icon: MessageSquare,
    title: "Partnership Inquiry",
    description: "Interested in partnering with Performance Processes? We're always open to strategic collaborations and referral partnerships.",
  },
  {
    icon: HelpCircle,
    title: "General Questions",
    description: "Have questions about our services, methodology, or team? We're happy to provide information with no obligation.",
  },
];

const faqItems = [
  {
    question: "What does a typical engagement look like?",
    answer: "Every engagement begins with a complimentary Discovery Call where we learn about your organization's goals and challenges. From there, we develop a customized proposal outlining scope, timeline, and investment. Engagements typically range from 3 to 12 months depending on complexity.",
  },
  {
    question: "How quickly will I receive a response?",
    answer: "We respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our office directly. Our team monitors communications throughout business hours to ensure timely responses.",
  },
  {
    question: "Is there a cost for the initial consultation?",
    answer: "No. Your first Discovery Call is completely complimentary. We use this time to understand your needs and determine if there's a good fit before any commitment is made.",
  },
  {
    question: "What information should I prepare before reaching out?",
    answer: "It's helpful to have a general idea of your organizational challenges, goals, and timeline. However, you don't need to have everything figured out, that's what we're here for. A brief description of your situation is a great starting point.",
  },
  {
    question: "Do you work with organizations outside of Toronto?",
    answer: "Absolutely. While our office is based in Toronto, we work with clients across Canada and internationally. We offer both in-person and virtual engagement options to accommodate organizations of all locations.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We work across multiple sectors including government, nonprofit, healthcare, financial services, technology, education, and manufacturing. Our frameworks are adaptable to any industry context.",
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{language === "en" ? "Get in" : "Restez en"} <span className="text-accent italic">{language === "en" ? "Touch" : "Contact"}</span></>}
          subtitle={language === "en" 
            ? "Ready to take your business to the next level? Our consultants are ready to help."
            : "Prêt à faire passer votre entreprise au niveau supérieur ? Nos consultants sont prêts à vous aider."}
        />

        {/* Trust Strip */}
        <section className="bg-primary py-6" data-testid="section-trust-strip">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-white">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-accent" />
                <span className="font-bold text-sm uppercase tracking-wider">Results-Driven Consulting</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/20" />
              <div className="flex items-center gap-3">
                <Award size={20} className="text-accent" />
                <span className="font-bold text-sm uppercase tracking-wider">End-to-End Support</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/20" />
              <div className="flex items-center gap-3">
                <Star size={20} className="text-accent" />
                <span className="font-bold text-sm uppercase tracking-wider">24hr Response Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Reach Out Section */}
        <section className="py-20 bg-white" data-testid="section-why-reach-out">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <span className="text-accent font-bold uppercase tracking-widest text-xs">How Can We Help</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                Why Reach Out
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Whether you're exploring a new engagement or have a quick question, we're here to help. Here are the most common reasons clients connect with us.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyReachOutCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-[#F8FAFC] rounded-2xl p-8 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                  data-testid={`card-why-reach-out-${index}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                    <card.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info + Form Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
              <div>
                <h2 className="text-3xl font-heading font-extrabold text-primary mb-12 italic">
                  {language === "en" ? "Contact Information" : "Coordonnées"}
                </h2>
                <div className="space-y-12">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">Email Us</h4>
                      <p className="text-xl font-bold text-primary">contact@performanceprocesses.com</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">Call Us</h4>
                      <p className="text-xl font-bold text-primary">+1 (647) 400-4744</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">Our Office</h4>
                      <p className="text-xl font-bold text-primary">Toronto, Ontario</p>
                    </div>
                  </div>
                  {/* Office Hours & Availability */}
                  <div className="flex gap-6 items-start" data-testid="info-office-hours">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-2">Office Hours</h4>
                      <p className="text-lg font-bold text-primary">Monday – Friday</p>
                      <p className="text-muted-foreground text-sm mt-1">9:00 AM – 6:00 PM EST</p>
                      <p className="text-muted-foreground text-sm mt-1">Weekend & evening appointments available by request</p>
                    </div>
                  </div>
                </div>

                {/* Toronto Location Card */}
                <div className="mt-12 rounded-2xl overflow-hidden border border-border shadow-lg" data-testid="card-location">
                  <img
                    src={torontoSkyline}
                    alt="Toronto skyline"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 bg-white">
                    <h4 className="font-bold text-primary text-lg mb-2">Based in Toronto, Serving Globally</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Our headquarters is located in the heart of Toronto, Ontario, Canada's business capital. We serve clients across Canada and internationally through both in-person and virtual engagements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl border border-border shadow-xl">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary" data-testid="text-success-title">
                      {language === "en" ? "Message Sent!" : "Message envoyé !"}
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
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
                    <h3 className="text-2xl font-bold mb-8 text-primary uppercase italic">
                      {language === "en" ? "Send us a message" : "Envoyez-nous un message"}
                    </h3>
                    {mutation.isError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium" data-testid="text-error">
                        {language === "en" ? "Something went wrong. Please try again." : "Une erreur s'est produite. Veuillez réessayer."}
                      </div>
                    )}
                    <form 
                      className="space-y-6"
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
                            className="w-full bg-[#F8FAFC] border border-border rounded-xl px-6 py-4 outline-none focus:border-accent font-medium" 
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
                            className="w-full bg-[#F8FAFC] border border-border rounded-xl px-6 py-4 outline-none focus:border-accent font-medium" 
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
                          className="w-full bg-[#F8FAFC] border border-border rounded-xl px-6 py-4 outline-none focus:border-accent font-medium h-40 resize-none" 
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
                        className="w-full rounded-full bg-accent text-white hover:bg-primary h-16 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2"
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

        {/* What Happens Next Section */}
        <section className="py-20 bg-white" data-testid="section-what-happens-next">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <span className="text-accent font-bold uppercase tracking-widest text-xs">Your Journey</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                What Happens Next
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                After you reach out, here's exactly what to expect. We believe in transparency at every step.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {nextSteps.map((item, index) => (
                <div key={index} className="relative text-center" data-testid={`card-next-step-${index}`}>
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-extrabold mx-auto mb-6">
                    {item.step}
                  </div>
                  {index < nextSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-accent/20">
                      <ArrowRight size={16} className="text-accent/40 absolute -right-2 -top-2" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#F8FAFC]" data-testid="section-faq">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-accent font-bold uppercase tracking-widest text-xs">Common Questions</span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-4 italic">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Get answers to the most common questions about working with Performance Processes.
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300"
                  data-testid={`faq-item-${index}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    data-testid={`button-faq-${index}`}
                  >
                    <span className="font-bold text-primary pr-4">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`text-accent flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
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
