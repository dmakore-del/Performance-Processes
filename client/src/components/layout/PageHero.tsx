import { ReactNode } from "react";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  imageAlt?: string;
}

export function PageHero({ title, subtitle, image, imageAlt = "" }: PageHeroProps) {
  return (
    <section className="bg-white overflow-hidden relative border-b border-primary/10">
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
      <div className={`container mx-auto px-5 md:px-8 py-12 lg:py-16 max-w-5xl relative z-10 ${image ? "grid items-center gap-10 md:grid-cols-[1fr_.8fr]" : ""}`}>
        <div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-primary mb-5 leading-[.98] max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {image && <img src={image} alt={imageAlt} className="h-60 w-full object-cover md:h-72 border-l-4 border-accent" />}
      </div>
    </section>
  );
}
