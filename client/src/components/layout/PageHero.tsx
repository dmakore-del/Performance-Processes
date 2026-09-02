import { ReactNode } from "react";
import geoPatternImg from "@assets/generated/geo-pattern-new.png";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-background overflow-hidden relative min-h-[400px] lg:min-h-[500px] flex items-center border-b border-primary/10">
      <div className="absolute inset-0 z-0">
        <img src={geoPatternImg} alt="" className="w-full h-full object-cover opacity-[0.08] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-secondary/60" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
      <div className="container mx-auto px-4 md:px-8 py-20 lg:py-32 text-center max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
