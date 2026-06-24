import { Link } from "wouter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import type { Offer, PriceMode } from "@shared/offers";

interface OfferCardProps {
  offer: Offer;
  returnPage?: string;
}

export function OfferCard({ offer, returnPage = "/services" }: OfferCardProps) {
  const { toast } = useToast();
  const [mode, setMode] = useState<PriceMode>("standard");
  const [busy, setBusy] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const checkoutMutation = useMutation({
    mutationFn: async (payload: { offerId: string; mode: PriceMode; returnPage: string; promoCode?: string }) => {
      const res = await apiRequest("POST", "/api/instant-checkout", payload);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Checkout failed");
      }
      return data;
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setBusy(false);
        toast({ title: "Checkout error", description: "Could not start checkout. Please try again.", variant: "destructive" });
      }
    },
    onError: (err: any) => {
      setBusy(false);
      toast({ title: "Checkout error", description: err?.message || "Could not start checkout. Please try again.", variant: "destructive" });
    },
  });

  const handleBuy = () => {
    setBusy(true);
    const trimmed = promoCode.trim();
    checkoutMutation.mutate({
      offerId: offer.id,
      mode,
      returnPage,
      ...(trimmed ? { promoCode: trimmed } : {}),
    });
  };

  const showBuy = !offer.isRange;
  const isWebsite = offer.category === "website";
  const baseLabel = mode === "team" && offer.perTeamLabel ? offer.perTeamLabel : offer.priceLabel;
  const baseAmount = mode === "team" && offer.perTeamPrice ? offer.perTeamPrice : offer.price;
  const codeIsNextUp = promoCode.trim().toUpperCase() === "NEXTPROCESSES";
  const discountActive = isWebsite && codeIsNextUp;
  const discountedAmount = discountActive ? Math.round(baseAmount * 0.6) : baseAmount;
  const formatCAD = (cents: number) =>
    `$${(cents / 100).toLocaleString("en-CA", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  const activePrice = discountActive ? formatCAD(discountedAmount) : baseLabel;

  return (
    <div
      className={`relative flex flex-col h-full rounded-none border bg-white p-7 transition-colors ${
        offer.highlight ? "border-accent" : "border-border hover:border-primary/40"
      }`}
      data-testid={`offer-card-${offer.id}`}
    >
      {offer.highlight && (
        <span className="absolute top-0 right-0 text-[10px] uppercase tracking-[0.2em] bg-accent text-white px-3 py-1.5">
          Most Popular
        </span>
      )}

      <div className="mb-5">
        <h3 className="text-display text-2xl text-primary mb-2" data-testid={`text-offer-name-${offer.id}`}>
          {offer.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-light">{offer.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <div className="text-display text-4xl text-primary" data-testid={`text-offer-price-${offer.id}`}>
            {activePrice}
          </div>
          {discountActive && (
            <div className="text-sm text-muted-foreground line-through" data-testid={`text-offer-original-${offer.id}`}>
              {baseLabel}
            </div>
          )}
        </div>
        {discountActive && (
          <div className="text-[11px] uppercase tracking-wider text-primary mt-1.5">
            NextUp 40% off applied
          </div>
        )}
        {offer.isPerPerson && offer.perTeamLabel && (
          <div className="mt-4 inline-flex items-center border border-border text-xs">
            <button
              type="button"
              onClick={() => setMode("standard")}
              className={`px-3 py-1.5 transition-colors ${mode === "standard" ? "bg-primary text-white" : "text-primary hover:text-accent"}`}
              data-testid={`button-mode-standard-${offer.id}`}
            >
              Per Person
            </button>
            <button
              type="button"
              onClick={() => setMode("team")}
              className={`px-3 py-1.5 transition-colors ${mode === "team" ? "bg-primary text-white" : "text-primary hover:text-accent"}`}
              data-testid={`button-mode-team-${offer.id}`}
            >
              Team
            </button>
          </div>
        )}
      </div>

      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Best for</div>
        <p className="text-sm text-primary leading-relaxed font-light">{offer.bestFor}</p>
      </div>

      <ul className="space-y-2.5 mb-7">
        {offer.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-primary font-light">
            <span aria-hidden="true" className="text-accent shrink-0 leading-relaxed">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-2.5">
        {showBuy && isWebsite && (
          <div className="rounded-none bg-secondary/50 border border-border p-3">
            {!showPromo ? (
              <button
                type="button"
                onClick={() => setShowPromo(true)}
                className="text-[11px] font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors"
                data-testid={`button-promo-toggle-${offer.id}`}
              >
                Have a NextUp discount code?
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Discount code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="NEXTPROCESSES"
                    className="flex-1 min-w-0 rounded-md border border-border bg-white px-3 py-2 text-sm font-mono uppercase tracking-wide focus:outline-none focus:border-accent"
                    data-testid={`input-promo-${offer.id}`}
                  />
                  {promoCode && (
                    <button
                      type="button"
                      onClick={() => { setPromoCode(""); setShowPromo(false); }}
                      className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary px-2"
                      data-testid={`button-promo-clear-${offer.id}`}
                    >
                      Clear
                    </button>
                  )}
                </div>
                {promoCode.trim() && !codeIsNextUp && (
                  <p className="text-[11px] text-destructive font-medium">Code not recognized.</p>
                )}
                {discountActive && (
                  <p className="text-[11px] text-primary font-semibold">40% NextUp discount will apply at checkout.</p>
                )}
              </div>
            )}
          </div>
        )}
        {showBuy ? (
          <>
            <Button
              onClick={handleBuy}
              disabled={busy}
              className={`w-full rounded-none h-12 font-semibold text-xs uppercase tracking-[0.2em] transition-colors ${
                offer.highlight ? "bg-accent text-white hover:bg-primary" : "bg-primary text-white hover:bg-accent"
              }`}
              data-testid={`button-buy-${offer.id}`}
            >
              {busy ? "Processing..." : offer.isMonthly ? "Subscribe Now" : "Get Started"}
            </Button>
            <div className="flex items-center justify-center gap-2 pt-0.5">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Pay with</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Card · Debit · PayPal</span>
            </div>
          </>
        ) : offer.ctaHref ? (
          <Link href={offer.ctaHref}>
            <Button
              className="w-full rounded-none h-12 font-semibold text-xs uppercase tracking-[0.2em] bg-primary text-white hover:bg-accent"
              data-testid={`button-explore-${offer.id}`}
            >
              Request Quote
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
