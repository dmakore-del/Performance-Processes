import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 border-b bg-black text-white italic">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase leading-none mb-8">
              Let's <br />
              <span className="text-accent">Talk.</span>
            </h1>
            <p className="text-xl max-w-2xl text-gray-400 font-medium leading-relaxed">
              Ready to align your strategy with impact? Contact us today to schedule a consultation.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-3xl font-heading font-black uppercase italic mb-8">Contact Info</h2>
              <div className="space-y-12">
                <div>
                  <h3 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4">Email</h3>
                  <p className="text-2xl font-heading font-black uppercase italic">contact@performanceprocesses.com</p>
                </div>
                <div>
                  <h3 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4">Office</h3>
                  <p className="text-xl font-bold uppercase tracking-tight">123 Strategy Ave, Suite 400<br/>Business District, 10001</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-12">
               <h2 className="text-3xl font-heading font-black uppercase italic mb-8">Send a Message</h2>
               <div className="space-y-6">
                 <input className="w-full bg-transparent border-b border-black py-4 uppercase font-bold text-xs tracking-widest outline-none focus:border-accent" placeholder="NAME" />
                 <input className="w-full bg-transparent border-b border-black py-4 uppercase font-bold text-xs tracking-widest outline-none focus:border-accent" placeholder="EMAIL" />
                 <textarea className="w-full bg-transparent border-b border-black py-4 uppercase font-bold text-xs tracking-widest outline-none focus:border-accent h-32 resize-none" placeholder="MESSAGE"></textarea>
                 <Button className="w-full rounded-none bg-black text-white hover:bg-accent h-16 uppercase font-black tracking-widest text-xs">Send Message</Button>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
