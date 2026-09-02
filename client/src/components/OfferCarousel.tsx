import { useEffect, useState } from "react";
import type { Offer } from "@shared/offers";
import { OfferCard } from "@/components/OfferCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useLanguage } from "@/hooks/use-language";

interface OfferCarouselProps {
  offers: Offer[];
  returnPage: string;
}

export function OfferCarousel({ offers, returnPage }: OfferCarouselProps) {
  const { language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => { api.off("select", onSelect); api.off("reInit", onSelect); };
  }, [api]);
  if (!offers.length) return null;
  return <Carousel setApi={setApi} opts={{ align: "start", loop: false, duration: 28 }} className="mt-10 px-0 md:px-12" aria-label={language === "fr" ? "Offres disponibles" : "Available offers"}>
    <CarouselContent className="-ml-5">{offers.map((offer, index) => <CarouselItem key={offer.id} className="basis-full pl-5 md:basis-1/2 lg:basis-1/3" aria-label={`${index + 1} ${language === "fr" ? "sur" : "of"} ${offers.length}`}><OfferCard offer={offer} returnPage={returnPage}/></CarouselItem>)}</CarouselContent>
    {offers.length > 1 && <><CarouselPrevious className="left-0 top-[-3rem] translate-y-0 md:top-1/2 md:-translate-y-1/2"/><CarouselNext className="right-0 top-[-3rem] translate-y-0 md:top-1/2 md:-translate-y-1/2"/></>}
    <p className="mt-6 text-center text-sm text-muted-foreground" aria-live="polite">{selected + 1} {language === "fr" ? "sur" : "of"} {offers.length}</p>
  </Carousel>;
}