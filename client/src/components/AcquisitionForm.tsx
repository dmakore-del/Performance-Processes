import { useState } from "react";
import { Link } from "wouter";
import { INQUIRY_SERVICES } from "@shared/acquisition";
import { useLanguage } from "@/hooks/use-language";
import { acquisitionAttribution, trackAcquisition } from "@/lib/acquisition";

const field = "mt-2 min-h-12 w-full border border-primary/20 bg-background px-4 py-3 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
export function AcquisitionForm({ customerType, compact = false }: { customerType?: "launch" | "growth"; compact?: boolean }) {
  const { language } = useLanguage();
  const fr = language === "fr";
  const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const [journey, setJourney] = useState(customerType || (params.get("journey") === "growth" ? "growth" : "launch"));
  const [requestId] = useState(() => crypto.randomUUID());
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [calendar, setCalendar] = useState("");
  const requestedService = params.get("service");
  const text = (en: string, french: string) => fr ? french : en;
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setPending(true); setError("");
    const form = new FormData(event.currentTarget);
    const analyticsConsent = form.get("analyticsConsent") === "on";
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId, customerType: journey, language, ...acquisitionAttribution(),
          ...Object.fromEntries(["fullName", "email", "phone", "businessName", "businessStage", "serviceInterest", "projectDescription", "contactMethod", "website"].map((key) => [key, String(form.get(key) || "")])),
          marketingConsent: form.get("marketingConsent") === "on", analyticsConsent,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || text("Please try again.", "Veuillez réessayer."));
      try { localStorage.setItem("pp-analytics-consent", analyticsConsent ? "yes" : "no"); } catch {}
      trackAcquisition("generate_lead", { customerType: journey });
      setCalendar(result.schedulingUrl);
    } catch (err) { setError(err instanceof Error ? err.message : text("Unable to save your enquiry.", "Impossible d’enregistrer votre demande.")); }
    finally { setPending(false); }
  };
  if (calendar) return <section className="border border-primary/20 bg-secondary p-6 md:p-8" aria-live="polite">
    <h2 className="font-heading text-3xl">{text("Your enquiry is saved.", "Votre demande est enregistrée.")}</h2>
    <p className="mt-4 leading-7 text-muted-foreground">{text("Next, choose an available time in Google Calendar using the same email address. Your meeting is only confirmed when you receive the calendar confirmation and invitation.", "Choisissez maintenant un horaire dans Google Agenda en utilisant la même adresse courriel. Le rendez-vous est confirmé uniquement après la réception de la confirmation et de l’invitation du calendrier.")}</p>
    <a href={calendar} target="_blank" rel="noopener noreferrer" onClick={() => trackAcquisition("booking_started", { customerType: journey })} className="mt-6 inline-block bg-primary px-6 py-4 text-sm text-white">{text("Choose an appointment time", "Choisir un horaire")}</a>
    <p className="mt-4 text-sm text-muted-foreground">{text("The calendar opens in a new tab. If you leave before booking, our team still has your enquiry.", "Le calendrier s’ouvre dans un nouvel onglet. Si vous quittez avant de réserver, notre équipe conserve votre demande.")}</p>
  </section>;
  return <form onSubmit={submit} className="space-y-5" aria-label={text("Consultation enquiry", "Demande de consultation")}>
    {!compact && <p className="text-sm leading-6 text-muted-foreground">{text("Tell us what you need, then choose a discovery-call time. Fields marked * are required.", "Décrivez vos besoins, puis choisissez un horaire d’appel découverte. Les champs marqués * sont obligatoires.")}</p>}
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm">{text("Full name", "Nom complet")} *<input className={field} name="fullName" autoComplete="name" minLength={2} maxLength={120} required /></label>
      <label className="text-sm">{text("Email", "Courriel")} *<input className={field} name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <label className="text-sm">{text("Phone (optional)", "Téléphone (facultatif)")}<input className={field} name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
      <label className="text-sm">{text("Business name (optional)", "Nom de l’entreprise (facultatif)")}<input className={field} name="businessName" autoComplete="organization" maxLength={180} /></label>
      <label className="text-sm">{text("I am", "Je souhaite")} *<select className={field} value={journey} onChange={(e) => setJourney(e.target.value as "launch" | "growth")}><option value="launch">{text("Starting a business", "Démarrer une entreprise")}</option><option value="growth">{text("Improving an existing business", "Améliorer une entreprise existante")}</option></select></label>
      <label className="text-sm">{text("Business stage", "Étape de l’entreprise")} *<select name="businessStage" className={field} defaultValue="" required>
        <option value="" disabled>{text("Select a stage", "Choisir une étape")}</option>
        {([["idea","Idea","Idée"],["pre-launch","Preparing to launch","Préparation du lancement"],["operating","Operating","En activité"],["growing","Growing","En croissance"],["nonprofit","Nonprofit","Organisme sans but lucratif"]] as const).map(([id,en,frLabel]) => <option key={id} value={id}>{text(en,frLabel)}</option>)}
      </select></label>
      <label className="text-sm">{text("Service of interest", "Service recherché")} *<select name="serviceInterest" className={field} defaultValue={INQUIRY_SERVICES.find((s) => s === requestedService) || ""} required>
        <option value="" disabled>{text("Select a service", "Choisir un service")}</option>
        {INQUIRY_SERVICES.map((service, i) => <option key={service} value={service}>{fr ? ["Fondations essentielles","Lancement complet","Site web et présence numérique","Systèmes et croissance","Subventions et financement","Aidez-moi à choisir"][i] : service}</option>)}
      </select></label>
      <label className="text-sm">{text("Preferred contact", "Contact préféré")}<select name="contactMethod" className={field}><option value="email">{text("Email", "Courriel")}</option><option value="phone">{text("Phone", "Téléphone")}</option></select></label>
    </div>
    <label className="block text-sm">{text("What would you like to accomplish?", "Que souhaitez-vous accomplir?")} *<textarea name="projectDescription" minLength={20} maxLength={3000} rows={4} required className={field} /></label>
    <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <p className="text-xs leading-6 text-muted-foreground">{text("We use your details to respond to your request and coordinate your consultation, including its campaign source. Do not include financial account numbers or confidential documents. See our ", "Vos renseignements servent à répondre à votre demande et à coordonner la consultation, y compris sa source de campagne. N’incluez aucun numéro de compte financier ni document confidentiel. Consultez notre ")}<Link href="/legal#privacy" className="underline">{text("privacy policy", "politique de confidentialité")}</Link>.</p>
    <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1.5 size-4 shrink-0 accent-primary" name="marketingConsent" type="checkbox" /><span>{text("Optional: I agree to receive business tips and marketing emails from Performance Processes. I can unsubscribe at any time.", "Facultatif : j’accepte les conseils et courriels promotionnels de Performance Processes. Je peux me désabonner à tout moment.")}<span className="block text-xs text-muted-foreground">Performance Processes Soleria Inc., Toronto, Ontario · contact@performanceprocesses.com</span></span></label>
    <label className="flex items-start gap-3 text-xs leading-6 text-muted-foreground"><input className="mt-1.5 size-4 shrink-0 accent-primary" name="analyticsConsent" type="checkbox" /><span>{text("Optional: allow anonymous interaction analytics on this device. This is separate from marketing and is not required to book.", "Facultatif : permettre les statistiques anonymes d’interaction sur cet appareil. Ce consentement est distinct du marketing et n’est pas requis pour réserver.")}</span></label>
    {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
    <button type="submit" disabled={pending} className="min-h-12 bg-primary px-7 py-3 text-sm text-primary-foreground hover:bg-primary/85 disabled:opacity-60">{pending ? text("Saving…", "Enregistrement…") : text("Save enquiry & choose a time", "Enregistrer et choisir un horaire")}</button>
  </form>;
}
