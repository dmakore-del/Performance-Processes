import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
                </div>
              </div>

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
      </main>
      <Footer />
    </div>
  );
}
