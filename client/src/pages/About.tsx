import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 border-b bg-black text-white italic">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase leading-none mb-8">
              About <br />
              <span className="text-accent">Us.</span>
            </h1>
            <p className="text-xl max-w-2xl text-gray-400 font-medium leading-relaxed">
              We are a registered business consulting firm that helps organizations bridge the gap between vision and execution.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-heading font-black uppercase italic mb-12">Who we are</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <p className="text-xl font-medium leading-relaxed">
                Performance Processes supports leaders in clarifying strategic direction, strengthening leadership capability, and optimizing performance systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our approach is collaborative and results-focused, ensuring sustainable performance improvements that drive clarity, accountability, and long-term impact. We work with organizations of all sizes to ensure they are operationally ready for growth.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
