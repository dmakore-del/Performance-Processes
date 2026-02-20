import { ReactNode } from "react";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-white border-b overflow-hidden relative min-h-[400px] lg:min-h-[500px] flex items-center">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>
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
