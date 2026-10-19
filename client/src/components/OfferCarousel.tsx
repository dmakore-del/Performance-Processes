import { useState } from "react";
import type { Offer } from "@shared/offers";
import { OfferCard } from "@/components/OfferCard";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useLanguage } from "@/hooks/use-language";

interface OfferCarouselProps {
  offers: Offer[];
  returnPage: string;
}

export function OfferCarousel({ offers, returnPage }: OfferCarouselProps) {
  const { language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  if (!offers.length) return null;
  return <Carousel setApi={setApi} opts={{ align: "start", loop: false, duration: 28 }} className="mt-10 px-0 md:px-12" aria-label={language === "fr" ? "Offres disponibles" : "Available offers"}>
    <CarouselContent className="-ml-5">{offers.map((offer) => <CarouselItem key={offer.id} className="basis-full pl-5 md:basis-1/2 lg:basis-1/3" aria-label={language === "fr" ? "Service" : "Service"}><OfferCard offer={offer} returnPage={returnPage}/></CarouselItem>)}</CarouselContent>
    {offers.length > 1 && <div className="mt-6 flex justify-end gap-6">
      <button type="button" onClick={() => api?.scrollPrev()} disabled={!api?.canScrollPrev()} className="border-b border-primary/30 pb-1 text-sm text-primary disabled:opacity-40">{language === "fr" ? "Précédent" : "Previous"}</button>
      <button type="button" onClick={() => api?.scrollNext()} disabled={!api?.canScrollNext()} className="border-b border-primary/30 pb-1 text-sm text-primary disabled:opacity-40">{language === "fr" ? "Suivant" : "Next"}</button>
    </div>}
  </Carousel>;
}