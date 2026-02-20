import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronRight, Target, Users, BarChart3, Settings2, FileText, CheckCircle2 } from "lucide-react";

// Asset imports
import heroImg from "@/assets/images/hero-corporate.jpg";
import architectureImg from "@/assets/images/architecture.jpg";
import leadershipImg from "@/assets/images/leadership.jpg";
import consultingImg from "@/assets/images/consulting.jpg";

export default function Home() {
  const services = [
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "Strategic Planning & Alignment",
      description: "Clarify strategic direction and ensure organizational alignment from the top down."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Leadership Development",
      description: "Strengthen leadership capability to navigate complexity and drive team performance."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-accent" />,
      title: "Performance Management",
      description: "Design and optimize systems that connect strategic goals with daily execution."
    },
    {
      icon: <Settings2 className="w-8 h-8 text-accent" />,
      title: "Process Improvement",
      description: "Streamline operations and document processes for enhanced efficiency and scale."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-accent" />,
      title: "Organizational Assessment",
      description: "Evaluate current structures and identify targeted areas for sustainable improvement."
    },
    {
      icon: <FileText className="w-8 h-8 text-accent" />,
      title: "Business Registration",
      description: "Governance guidance to ensure legal compliance and operational readiness."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION - Deloitte Style Split / Overlap */}
        <section className="relative w-full">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImg} 
              alt="Corporate strategy meeting" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-primary/70 md:bg-transparent"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4 md:px-6 pt-32 pb-24 md:py-48">
            <div className="max-w-2xl bg-primary md:p-12 p-8 text-white relative before:absolute before:inset-0 before:w-full before:h-full before:-z-10 shadow-2xl">
              <div className="w-12 h-1 bg-accent mb-8"></div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Aligning Strategy with <span className="text-accent">Measurable Impact</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed font-light">
                We support leaders in clarifying direction, strengthening capability, and optimizing performance systems that connect goals with execution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="rounded-none bg-accent hover:bg-accent/90 text-white font-medium cursor-pointer" 
                  data-testid="button-hero-primary"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-none border-white text-white hover:bg-white/10 font-medium cursor-pointer" 
                  data-testid="button-hero-secondary"
                  onClick={() => document.getElementById('approach')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Our Approach
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Driving clarity, accountability, and long-term impact.
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Performance Processes is a registered business consulting firm dedicated to helping organizations bridge the gap between strategic vision and operational reality.
                </p>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Through our collaborative, results-focused approach, we ensure sustainable performance improvements that prepare your organization for growth, scale, and lasting success.
                </p>
                <a href="#approach" className="corporate-link group" data-testid="link-read-more-about">
                  Learn about our collaborative approach
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary/10 z-0"></div>
                <img 
                  src={leadershipImg} 
                  alt="Business leadership" 
                  className="w-full h-auto shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 max-w-3xl">
              <div className="w-12 h-1 bg-accent mb-6"></div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive consulting solutions designed to optimize your people, processes, and performance systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="rounded-none border-none shadow-sm hover-lift bg-white h-full transition-all duration-300">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6 p-4 bg-secondary/50 inline-block w-fit">
                      {service.icon}
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-4 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                    <a href="#" className="text-primary font-medium text-sm flex items-center hover:text-accent transition-colors mt-auto w-fit" data-testid={`link-service-${index}`}>
                      Read more <ArrowRight className="ml-1 w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* APPROACH SECTION - Split design */}
        <section id="approach" className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative min-h-[400px]">
            <img 
              src={architectureImg} 
              alt="Structured architecture" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 bg-primary text-white p-12 md:p-24 flex flex-col justify-center">
            <div className="w-12 h-1 bg-accent mb-8"></div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              Our Methodology
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="font-heading text-4xl font-bold text-accent/50 leading-none">01</div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Collaborative Design</h3>
                  <p className="text-primary-foreground/80">We work alongside your leadership team, ensuring solutions are tailored to your specific organizational context and culture.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="font-heading text-4xl font-bold text-accent/50 leading-none">02</div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Results-Focused Execution</h3>
                  <p className="text-primary-foreground/80">Every strategy is tied to measurable metrics. We build systems that track progress and hold teams accountable to goals.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="font-heading text-4xl font-bold text-accent/50 leading-none">03</div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Sustainable Improvement</h3>
                  <p className="text-primary-foreground/80">We don't just deliver a plan; we provide the change management support and coaching needed to make new practices stick.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-secondary/50 -z-10 transform -skew-x-12 translate-x-16"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white glass-card p-12 lg:p-16">
              <div className="max-w-2xl">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Ready to optimize your organization's performance?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Whether you need strategic alignment, leadership coaching, or assistance with business registration and governance, our experts are ready to guide you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="rounded-none bg-primary hover:bg-primary/90 text-white font-medium px-8 cursor-pointer" 
                    data-testid="button-cta-primary"
                    onClick={() => window.location.href = 'mailto:contact@performanceprocesses.com'}
                  >
                    Schedule a Consultation
                  </Button>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                 <img 
                  src={consultingImg} 
                  alt="Consulting in action" 
                  className="w-full h-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
