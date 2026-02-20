import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";

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
      <main className="flex-grow">
        <PageHero 
          title={<>Site<span className="text-accent">map</span></>}
        />
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
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
