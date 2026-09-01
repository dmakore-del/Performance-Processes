import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: object;
}

export function SEOHead({ title, description, path, type = "website", noindex = false, jsonLd }: SEOHeadProps) {
  const fullTitle = title.includes("Performance Processes") ? title : `${title} | Performance Processes`;
  const canonicalUrl = `https://performanceprocesses.com${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const existingJsonLd = document.getElementById("seo-page-jsonld");
    if (jsonLd) {
      let script = existingJsonLd as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "seo-page-jsonld";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (existingJsonLd) {
      existingJsonLd.remove();
    }

    return () => {
      document.title = "Business Setup, Incorporation Support & Websites | Performance Processes";
      document.getElementById("seo-page-jsonld")?.remove();
    };
  }, [fullTitle, description, canonicalUrl, type, noindex, jsonLd]);

  return null;
}
