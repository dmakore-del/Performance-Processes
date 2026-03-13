import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { type ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "fade-scale";
  delay?: number;
  threshold?: number;
}

const animationClasses: Record<string, string> = {
  "fade-up": "animate-fade-in-up",
  "fade-left": "animate-fade-in-left",
  "fade-right": "animate-fade-in-right",
  "fade-scale": "animate-fade-in-scale",
};

export function AnimateOnScroll({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useScrollAnimation(threshold);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClasses[animation] : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function FloatingShape({
  className = "",
  variant = "circle",
}: {
  className?: string;
  variant?: "circle" | "ring" | "dot" | "square" | "triangle";
}) {
  const shapes: Record<string, string> = {
    circle: "rounded-full bg-accent/10",
    ring: "rounded-full border-2 border-accent/20 bg-transparent",
    dot: "rounded-full bg-accent/30",
    square: "rounded-lg bg-primary/5 rotate-12",
    triangle: "w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-accent/10",
  };

  return (
    <div
      className={`absolute pointer-events-none animate-float-slow ${shapes[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

export function GeometricAccent({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="animate-spin-slow opacity-[0.07]">
        <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
        <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
      </svg>
    </div>
  );
}

export function GradientOrb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none rounded-full blur-3xl animate-pulse-soft ${className}`}
      aria-hidden="true"
    />
  );
}
