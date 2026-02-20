import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function Sitemap() {
  const links = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Our Approach", href: "/approach" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy & Terms", href: "/legal" },
    { label: "Accessibility", href: "/accessibility" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-12 italic">
            Site<span className="text-accent">map</span>
          </h1>
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href}>
                    <a className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary transition-colors border border-transparent hover:border-border group">
                      <span className="text-lg font-bold text-primary group-hover:text-accent transition-colors">{link.label}</span>
                      <ChevronRight size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
