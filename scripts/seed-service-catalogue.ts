import { SERVICE_CATALOGUE } from "../shared/serviceCatalogue";
import { getUncachableStripeClient } from "../server/stripeClient";
import { ensureServicePrice } from "../server/servicePrices";

const stripe = await getUncachableStripeClient();
for (const offer of SERVICE_CATALOGUE) {
  await ensureServicePrice(stripe, offer);
  if (offer.category === "website") await ensureServicePrice(stripe, offer, true);
  console.log(`Ready: ${offer.name} (${offer.priceLabel} CAD)`);
}
console.log(`Prepared ${SERVICE_CATALOGUE.length} modular services.`);
