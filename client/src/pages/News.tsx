import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ExternalLink, Clock, Newspaper, RefreshCw, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  snippet: string;
}

export default function News() {
  const [searchFilter, setSearchFilter] = useState("");

  const { data, isLoading, isError, refetch, isFetching } = useQuery<{ articles: NewsArticle[] }>({
    queryKey: ["/api/news"],
    staleTime: 5 * 60 * 1000,
  });

  const articles = data?.articles || [];
  const filtered = searchFilter
    ? articles.filter(a =>
        a.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        a.source.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : articles;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero
          title="Industry News"
          subtitle="Stay informed with the latest thinking, trends, and developments in business consulting, strategy, and management."
        />

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Filter size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter by keyword or source..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="border border-border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-accent/30"
                  data-testid="input-news-filter"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                data-testid="button-refresh-news"
              >
                <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
                <span className="ml-2">{isFetching ? "Refreshing..." : "Refresh"}</span>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16" data-testid="section-news-feed">
          <div className="container mx-auto px-4 md:px-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <RefreshCw size={32} className="text-accent animate-spin mb-4" />
                <p className="text-muted-foreground">Loading latest news...</p>
              </div>
            ) : isError ? (
              <div className="text-center py-20">
                <Newspaper size={48} className="text-muted-foreground mx-auto mb-4 opacity-40" />
                <h3 className="text-xl font-bold text-primary mb-2">Unable to load news</h3>
                <p className="text-muted-foreground mb-6">We couldn't fetch the latest articles. Please try again.</p>
                <Button onClick={() => refetch()} data-testid="button-retry-news">
                  Try Again
                </Button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <Newspaper size={48} className="text-muted-foreground mx-auto mb-4 opacity-40" />
                <h3 className="text-xl font-bold text-primary mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your filter or refresh for new content.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article, i) => (
                  <a
                    key={i}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all flex flex-col"
                    data-testid={`news-card-${i}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors leading-snug flex-grow">
                        {article.title}
                      </h3>
                      <ExternalLink size={16} className="text-muted-foreground flex-shrink-0 mt-1 group-hover:text-accent transition-colors" />
                    </div>
                    {article.snippet && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {article.snippet}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                      {article.source && (
                        <span className="font-bold uppercase tracking-wider text-accent">
                          {article.source}
                        </span>
                      )}
                      {article.pubDate && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(article.pubDate)}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white border-t" data-testid="section-news-cta">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-heading font-extrabold text-primary mb-4">
              Want deeper analysis?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our Insights page features original thinking from our consulting team, with frameworks and strategies you can apply directly to your organization.
            </p>
            <a href="/insights">
              <Button size="lg" data-testid="button-view-insights">
                View Our Insights
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
