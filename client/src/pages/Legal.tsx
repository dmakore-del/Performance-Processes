import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { PageHero } from "@/components/layout/PageHero";

export default function Legal() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>Privacy & <span className="text-accent">Terms</span></>}
        />
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Performance Processes is committed to protecting your privacy. We collect and use personal data only as necessary to provide our consulting services and communicate with our clients. We do not sell your information to third parties.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">Terms of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                By using our website and services, you agree to comply with our terms. Our consulting engagements are governed by specific service agreements that outline deliverables, timelines, and confidentiality.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary italic">Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your data from unauthorized access or disclosure.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
