import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { bookingHref, trackAcquisition } from "@/lib/acquisition";

export function Footer() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const services = fr ? [
    ["Démarrer une entreprise", "/start-a-business"],
    ["Mise en place d’entreprise", "/business-setup"],
    ["Sites web et présence numérique", "/websites-digital"],
    ["Conseil aux entreprises", "/consulting"],
    ["Subventions et financement", "/grants-financing"],
  ] : [
    ["Start a Business", "/start-a-business"],
    ["Business Setup", "/business-setup"],
    ["Websites & Digital", "/websites-digital"],
    ["Business Consulting", "/consulting"],
    ["Grants & Financing", "/grants-financing"],
  ];
  const explore = fr ? [
    ["Notre travail", "/our-work"],
    ["À propos", "/about"],
    ["Ressources", "/resources"],
    ["Contact", "/contact"],
    ["Portail client", "/portal"],
  ] : [
    ["Our Work", "/our-work"],
    ["About", "/about"],
    ["Resources", "/resources"],
    ["Contact", "/contact"],
    ["Client portal", "/portal"],
  ];
  return (
    <footer id="site-footer" className="border-t border-primary/15 bg-background text-primary">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:py-20 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_.8fr_1fr]">
          <div>
            <Link href="/" aria-label={fr ? "Accueil Performance Processes" : "Performance Processes home"} className="inline-flex items-center gap-4">
              <img src="/favicon.png" alt="" className="h-12 w-12 border border-accent object-cover" />
              <span className="font-heading text-2xl tracking-wide">Performance Processes</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">{fr ? "Partenaire torontois pour accompagner les entrepreneurs canadiens dans le lancement, les sites web et l’amélioration des opérations." : "A Toronto-based partner helping Canadian founders launch, improve websites, and strengthen business operations."}</p>
          </div>
          <div>
            <h2 className="eyebrow text-muted-foreground">{fr ? "Services" : "Services"}</h2>
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">{services.map(([label, href]) => <Link key={href} href={href} className="w-fit transition-colors hover:text-primary">{label}</Link>)}</div>
          </div>
          <div>
            <h2 className="eyebrow text-muted-foreground">{fr ? "Explorer" : "Explore"}</h2>
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">{explore.map(([label, href]) => <Link key={href} href={href} className="w-fit transition-colors hover:text-primary">{label}</Link>)}</div>
          </div>
          <div>
            <h2 className="eyebrow text-muted-foreground">{fr ? "Parlons-en" : "Get in touch"}</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">Toronto, Ontario<br /><a className="text-primary transition-colors hover:text-accent" href="mailto:contact@performanceprocesses.com">contact@performanceprocesses.com</a><br />+1 (437) 425-4844</p>
            <Link href={bookingHref()} onClick={() => trackAcquisition("booking_started")} className="mt-5 inline-block border-b border-primary pb-1 text-sm font-medium">{fr ? "Réserver une consultation" : "Book a consultation"}</Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-primary/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/nextup-partnership" className="w-fit text-xs font-medium text-primary underline underline-offset-2">{fr ? "Soutenir le travail communautaire de NextUp" : "Support NextUp community work"}</Link>
            <a href="https://nextupcan.ca" target="_blank" rel="noopener noreferrer" className="w-fit text-xs font-medium text-primary underline underline-offset-2">{fr ? "Visiter le site Web de NextUp" : "Visit NextUp Canada's website"}</a>
          </div>
          <p className="text-[10px] leading-5 text-muted-foreground">
          © {new Date().getFullYear()} Performance Processes. {fr ? "Soutien à l’incorporation et orientation générale seulement, nous ne fournissons pas de conseils juridiques, fiscaux ou comptables." : "Incorporation support and general business guidance only, we do not provide legal, tax, or accounting advice."}
          <Link href="/legal" className="ml-2 text-primary underline underline-offset-2">{fr ? "Mentions légales" : "Legal"}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
