import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, BarChart, Rocket } from "lucide-react";

export default function Services() {
  const specializedServices = [
    {
      title: "Strategic Planning",
      icon: <Lightbulb className="w-10 h-10 text-accent" />,
      description: "We help leaders clarify their vision and translate it into actionable strategic roadmaps.",
      features: ["Vision & Mission Clarification", "Strategic Roadmap Design", "Goal Setting (OKR/KPI)", "Resource Alignment"]
    },
    {
      title: "Organizational Performance",
      icon: <BarChart className="w-10 h-10 text-accent" />,
      description: "Optimizing the systems that drive execution and ensuring your structure supports your strategy.",
      features: ["Performance System Audit", "Process Documentation", "Efficiency Optimization", "Incentive Alignment"]
    },
    {
      title: "Leadership & Change",
      icon: <Rocket className="w-10 h-10 text-accent" />,
      description: "Equipping leaders with the tools to navigate complexity and lead through transformation.",
      features: ["Executive Coaching", "Change Management Support", "Leadership Workshops", "Culture Assessment"]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-primary text-white py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 italic">Our Services</h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Comprehensive consulting solutions designed to align your organization's strategy with measurable, sustainable impact.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {specializedServices.map((service, i) => (
              <Card key={i} className="rounded-none border-none shadow-xl bg-white hover:translate-y-[-8px] transition-transform duration-300">
                <CardHeader className="pb-2">
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl font-heading font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-medium">
                        <div className="w-1.5 h-1.5 bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="mt-8 w-full rounded-none bg-primary text-white hover:bg-accent font-bold uppercase tracking-widest text-xs h-12"
                    onClick={() => window.location.href = 'mailto:contact@performanceprocesses.com'}
                  >
                    Discuss this service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
