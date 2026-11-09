import type Stripe from "stripe";
import type { Offer } from "@shared/offers";

/** Version prices by immutable commercial terms; never mutate a purchased price. */
export function servicePriceKey(offer: Offer, discount = false): string {
  const amount = discount ? Math.round(offer.price * 0.6) : offer.price;
  return `pp_catalogue_${offer.id}_cad_${amount}_${offer.isMonthly ? "month" : "once"}${discount ? "_nextup" : ""}`;
}

export async function ensureServicePrice(stripe: Stripe, offer: Offer, discount = false): Promise<string> {
  const key = servicePriceKey(offer, discount);
  const products = await stripe.products.search({
    query: `active:'true' AND metadata['catalogue_service_id']:'${offer.id}'`,
    limit: 1,
  });
  const product = products.data[0]
    ? await stripe.products.update(products.data[0].id, {
      name: offer.name,
      description: offer.description,
      metadata: {
        catalogue_service_id: offer.id,
        catalogue: "modular",
        category: offer.category,
        starting_price: String(!!offer.isStartingPrice),
      },
    })
    : await stripe.products.create({
      name: offer.name,
      description: offer.description,
      metadata: {
        catalogue_service_id: offer.id,
        catalogue: "modular",
        category: offer.category,
        starting_price: String(!!offer.isStartingPrice),
      },
    }, { idempotencyKey: `pp-catalogue-product-${offer.id}` });
  const existing = await stripe.prices.list({ lookup_keys: [key], active: true, limit: 1 });
  if (existing.data[0]) return existing.data[0].id;
  const price = await stripe.prices.create({
    product: product.id,
    currency: "cad",
    unit_amount: discount ? Math.round(offer.price * 0.6) : offer.price,
    lookup_key: key,
    tax_behavior: "exclusive",
    ...(offer.isMonthly ? { recurring: { interval: "month" as const } } : {}),
    metadata: { catalogue_service_id: offer.id, discount: discount ? "NEXTPROCESSES" : "" },
  }, { idempotencyKey: key });
  return price.id;
}
