import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="Accessibility Statement" description="Performance Processes is committed to digital accessibility. Learn about our accessibility practices and how we ensure our website is usable for everyone." path="/accessibility" />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>Accessi<span className="text-accent">bility</span></>}
        />
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
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
