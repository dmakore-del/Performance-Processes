import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, TrendingUp } from "lucide-react";

export default function Insights() {
  const articles = [
    {
      category: "Case Study",
      title: "Strategic Realignment for a Global Logistics Firm",
      excerpt: "How we helped a $500M firm regain 15% operational efficiency through clear strategic siloing.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      category: "Whitepaper",
      title: "The Future of Performance Management",
      excerpt: "Moving beyond annual reviews to real-time execution tracking and feedback loops.",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      category: "Trends",
      title: "Leadership in the Age of AI",
      excerpt: "Why strengthening human capability is more critical than ever in automated environments.",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-secondary py-24 border-b">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Insights & Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Thought leadership and practical guides to help you navigate organizational complexity.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <Card key={i} className="rounded-none border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest mb-4">
                    {article.icon}
                    {article.category}
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{article.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary font-bold uppercase tracking-widest text-[11px] group-hover:text-accent"
                    onClick={() => window.location.href = 'mailto:contact@performanceprocesses.com?subject=Inquiry about ' + article.title}
                  >
                    Read Full Article
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
