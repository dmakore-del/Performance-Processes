import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-12 italic">
            Accessi<span className="text-accent">bility</span>
          </h1>
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                Performance Processes is committed to making our website and services accessible to everyone, including individuals with disabilities. We are continuously working to improve the user experience for everyone and applying the relevant accessibility standards.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">Conformance Status</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. We strive to maintain WCAG 2.1 Level AA compliance.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">Feedback</h2>
              <p className="text-muted-foreground leading-relaxed">
                We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers by contacting us at contact@performanceprocesses.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
