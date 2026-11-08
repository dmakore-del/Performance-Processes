import { attributionSchema, type Attribution } from "@shared/acquisition";

export function bookingHref(customerType?: "launch" | "growth", service?: string) {
  const params = new URLSearchParams();
  if (customerType) params.set("journey", customerType);
  const services: Record<string, string> = {
    "business-setup-essentials": "Business Setup Essentials",
    "complete-business-launch": "Complete Business Launch",
    "website-digital-presence": "Website & Digital Presence",
    "business-systems-growth": "Business Systems & Growth",
  };
  if (service) params.set("service", services[service] || service);
  return `/book-consultation${params.size ? `?${params}` : ""}`;
}
export function acquisitionAttribution(): { firstTouch: Attribution; latestTouch: Attribution } {
  const empty = { firstTouch: {}, latestTouch: {} };
  if (typeof window === "undefined") return empty;
  try {
    const query = new URLSearchParams(location.search);
    const touch: Record<string, string> = { landingPath: location.pathname };
    for (const key of ["source", "medium", "campaign", "content", "term"]) {
      const value = query.get(`utm_${key}`);
      if (value && /^[a-zA-Z0-9 _./-]{1,100}$/.test(value)) touch[key] = value;
    }
    if (document.referrer) touch.referrerHost = new URL(document.referrer).hostname;
    const safe = attributionSchema.safeParse(touch);
    const latest = safe.success ? safe.data : { landingPath: location.pathname };
    const stored = JSON.parse(sessionStorage.getItem("pp-acquisition") || "null");
    const first = attributionSchema.safeParse(stored?.firstTouch);
    const previous = attributionSchema.safeParse(stored?.latestTouch);
    const result = {
      firstTouch: first.success ? first.data : latest,
      latestTouch: query.has("utm_source") || !previous.success ? latest : previous.data,
    };
    sessionStorage.setItem("pp-acquisition", JSON.stringify(result));
    return result;
  } catch { return empty; }
}
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
export function trackAcquisition(event: "select_service" | "booking_started" | "download_resource" | "generate_lead", details?: { customerType?: string; resource?: string }) {
  try {
    if (localStorage.getItem("pp-analytics-consent") !== "yes") return;
    // GA4 is optional. Never configure an invented measurement ID or send contact/free-text data.
    window.gtag?.("event", event, details || {});
    window.dispatchEvent(new CustomEvent("pp:acquisition", { detail: { event, ...details } }));
  } catch { /* Tracking cannot interrupt the consultation journey. */ }
}
