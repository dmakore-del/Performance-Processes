import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function Contact() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white border-b py-20 lg:py-32 text-center">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
              {language === "en" ? "Get in" : "Restez en"} <span className="text-accent italic">{language === "en" ? "Touch" : "Contact"}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {language === "en" 
                ? "Ready to take your business to the next level? Our consultants are ready to help."
                : "Prêt à faire passer votre entreprise au niveau supérieur ? Nos consultants sont prêts à vous aider."}
            </p>
          </div>
        </section>

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
                      <p className="text-xl font-bold text-primary">+1 (416) 555-0123</p>
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
                 <h3 className="text-2xl font-bold mb-8 text-primary uppercase italic">
                   {language === "en" ? "Send us a message" : "Envoyez-nous un message"}
                 </h3>
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                           {language === "en" ? "Name" : "Nom"}
                         </label>
                         <input className="w-full bg-[#F8FAFC] border border-border rounded-xl px-6 py-4 outline-none focus:border-accent font-medium" placeholder={language === "en" ? "Your name" : "Votre nom"} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                         <input className="w-full bg-[#F8FAFC] border border-border rounded-xl px-6 py-4 outline-none focus:border-accent font-medium" placeholder="your@email.com" />
                       </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                        {language === "en" ? "How can we help?" : "Comment pouvons-nous vous aider ?"}
                      </label>
                      <textarea className="w-full bg-[#F8FAFC] border border-border rounded-xl px-6 py-4 outline-none focus:border-accent font-medium h-40 resize-none" placeholder={language === "en" ? "Tell us about your project..." : "Parlez-nous de votre projet..."}></textarea>
                    </div>
                    <Button className="w-full rounded-full bg-accent text-white hover:bg-primary h-16 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                      {language === "en" ? "Send Message" : "Envoyer le message"} <Send size={18} />
                    </Button>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
