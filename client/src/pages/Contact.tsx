import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 bg-[#2e2e2e] text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="inline-block bg-accent text-primary font-bold text-xs uppercase tracking-[0.2em] px-3 py-1 mb-8">
              Contact
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase italic leading-none mb-8">
              Let's <br />
              <span className="text-accent">Connect.</span>
            </h1>
            <p className="text-xl max-w-2xl text-gray-300 font-medium leading-relaxed">
              Take the first step toward organizational excellence.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl font-black uppercase italic mb-12 ey-yellow-underline pb-2 inline-block">Get in touch</h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Whether you have a specific project in mind or just want to learn more about our approach, our team is ready to help.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-2">Office</h4>
                  <p className="text-lg font-bold">123 Strategy Ave, Suite 400<br/>Business District, 10001</p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-2">Email</h4>
                  <p className="text-2xl font-black uppercase italic">contact@performanceprocesses.com</p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-2">Phone</h4>
                  <p className="text-xl font-bold">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-12 border">
              <form className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Name</label>
                  <input className="w-full bg-white border border-border p-4 outline-none focus:border-accent font-bold" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Email</label>
                  <input className="w-full bg-white border border-border p-4 outline-none focus:border-accent font-bold" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Message</label>
                  <textarea className="w-full bg-white border border-border p-4 outline-none focus:border-accent font-bold h-32 resize-none" placeholder="How can we help?"></textarea>
                </div>
                <Button className="w-full rounded-full bg-primary text-white hover:bg-accent hover:text-primary transition-all font-bold h-16 uppercase tracking-[0.2em] text-xs">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
