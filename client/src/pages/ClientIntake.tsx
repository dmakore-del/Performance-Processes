import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import {
  healthFields, healthResults, intakeFields,
  type IntakeKind, type Localized,
} from "@shared/intake";

type Answers = Record<string, string>;
type Invitation = { name: string; email: string; organization: string; callAt: string };
const copy = {
  en: {
    discovery: { title: "Prepare for your discovery call", intro: "A few details help us use your conversation well. Share what you can; budget is optional." },
    funding: { title: "Funding readiness", intro: "This preliminary screen helps identify a useful next step. It is not a funding decision or paid-work authorization." },
    health: { title: "Business health check", intro: "Rate each statement from 1 (not in place) to 5 (consistently in place). This reflection is not an audit or certification." },
    name: "Your name", email: "Email address", org: "Business or organization", phone: "Phone (optional)",
    consent: "I agree that Performance Processes may use these answers to prepare for or respond to my enquiry and contact me about it. I have read the privacy policy.",
    send: "Send to Performance Processes", sending: "Sending…", error: "We could not submit this form. Please try again or email contact@performanceprocesses.com.",
    required: "Please complete the required fields.", privacy: "We use your answers only to respond to this enquiry and plan the requested discussion. Do not include passwords, government ID numbers, bank details or attach confidential financial records.",
    privacyLink: "Privacy policy", callAt: "Your discovery call is scheduled for", scale: "Choose a score",
    submitted: "Thank you. Your answers have been received.", retryNote: "If delivery to our team is still pending, we have safely queued your response for retry.",
    priority: "Priority to strengthen", foundation: "Building a foundation", strong: "Strong foundation",
    resultIntro: "Your self-assessment summary", notFormal: "This is a reflection tool, not a formal assessment, funding eligibility decision or guarantee of results.",
    choose: "Choose a form", discoveryLink: "Discovery call preparation", fundingLink: "Funding readiness", healthLink: "Business health check",
    invitationError: "This invitation link is invalid or has expired. Email contact@performanceprocesses.com and we can help.",
    back: "Back to Grants & Financing",
    scoreOptions: ["Not in place yet", "Early stages", "Inconsistent", "Mostly in place", "Consistently in place"],
  },
  fr: {
    discovery: { title: "Préparer votre appel découverte", intro: "Quelques renseignements nous aideront à bien préparer notre échange. Le budget est facultatif." },
    funding: { title: "Préparation au financement", intro: "Cette première vérification aide à déterminer une prochaine étape pertinente. Ce n’est ni une décision de financement ni une autorisation de travaux payants." },
    health: { title: "Bilan de santé de l’entreprise", intro: "Évaluez chaque énoncé de 1 (pas en place) à 5 (toujours en place). Il s’agit d’une réflexion, pas d’un audit ou d’une certification." },
    name: "Votre nom", email: "Adresse courriel", org: "Entreprise ou organisation", phone: "Téléphone (facultatif)",
    consent: "J’accepte que Performance Processes utilise ces réponses pour préparer ou répondre à ma demande et communiquer avec moi à ce sujet. J’ai lu la politique de confidentialité.",
    send: "Envoyer à Performance Processes", sending: "Envoi…", error: "Impossible d’envoyer ce formulaire. Réessayez ou écrivez à contact@performanceprocesses.com.",
    required: "Veuillez remplir les champs obligatoires.", privacy: "Vos réponses servent uniquement à répondre à cette demande et à préparer la discussion souhaitée. N’incluez aucun mot de passe, numéro de pièce d’identité, renseignement bancaire ou document financier confidentiel.",
    privacyLink: "Politique de confidentialité", callAt: "Votre appel découverte est prévu le", scale: "Choisir une note",
    submitted: "Merci. Vos réponses ont été reçues.", retryNote: "Si la livraison à notre équipe est en attente, votre réponse est en file d’attente sécurisée pour un nouvel essai.",
    priority: "Priorité à renforcer", foundation: "Base en développement", strong: "Base solide",
    resultIntro: "Résumé de votre autoévaluation", notFormal: "Cet outil sert à la réflexion. Il ne constitue ni une évaluation formelle, ni une décision d’admissibilité au financement, ni une garantie de résultats.",
    choose: "Choisir un formulaire", discoveryLink: "Préparer un appel découverte", fundingLink: "Préparation au financement", healthLink: "Bilan de l’entreprise",
    invitationError: "Ce lien est invalide ou expiré. Écrivez à contact@performanceprocesses.com pour obtenir de l’aide.",
    back: "Retour à Subventions et financement",
    scoreOptions: ["Pas encore en place", "Débuts", "Inconstant", "Généralement en place", "Toujours en place"],
  },
} as const;

function currentKind(): IntakeKind {
  const value = new URLSearchParams(window.location.search).get("kind");
  return value === "funding" || value === "health" ? value : "discovery";
}
function localized(value: Localized, language: "en" | "fr") {
  return value[language];
}
function makeRequestId() {
  return globalThis.crypto.randomUUID();
}

export default function ClientIntake() {
  const { language } = useLanguage();
  const t = copy[language];
  const [kind, setKind] = useState<IntakeKind>(currentKind);
  const fields = intakeFields[kind];
  const [token, setToken] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get("token") || "");
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [invitationError, setInvitationError] = useState(false);
  const [contextLoading, setContextLoading] = useState(false);
  const [identity, setIdentity] = useState({ name: "", email: "", organization: "", phone: "" });
  const [answers, setAnswers] = useState<Answers>({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [requestId, setRequestId] = useState(makeRequestId);
  const [honeypot, setHoneypot] = useState("");
  const results = useMemo(() => kind === "health" ? healthResults(answers) : [], [kind, answers]);

  useEffect(() => {
    const selected = currentKind();
    setKind(selected);
    const hash = window.location.hash;
    const foundToken = new URLSearchParams(hash.slice(1)).get("token") || "";
    setToken(foundToken);
    if (hash) window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    if (foundToken) {
      setContextLoading(true);
      fetch("/api/intake/context", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: foundToken }),
      }).then(async (response) => {
        if (!response.ok) throw new Error("Invalid invite");
        const context = await response.json();
        setInvitation(context);
        setIdentity((current) => ({ ...current, name: context.name, email: context.email, organization: context.organization }));
      }).catch(() => setInvitationError(true)).finally(() => setContextLoading(false));
    }
  }, []);

  useEffect(() => {
    if (token) return;
    const query = new URLSearchParams(window.location.search);
    query.set("kind", kind);
    window.history.replaceState(null, "", `${window.location.pathname}?${query.toString()}`);
  }, [kind, token]);

  function chooseKind(next: IntakeKind) {
    setKind(next);
    setAnswers({});
    setStatus("idle");
    setMessage("");
    setRequestId(makeRequestId());
    window.history.pushState(null, "", `/intake?kind=${next}`);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind, language, ...identity, answers, consent,
          invitationToken: token || undefined, requestId, website: honeypot,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || t.error);
      setStatus("done");
      setMessage(result.emailStatus === "sent" ? result.message || t.submitted : t.retryNote);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : t.error);
    }
  }

  const title = t[kind].title;
  const grouped = fields.reduce<{ section: Localized; fields: typeof fields }[]>((groups, field) => {
    let group = groups.find((item) => item.section.en === field.section.en);
    if (!group) { group = { section: field.section, fields: [] }; groups.push(group); }
    group.fields.push(field);
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary">
      <SEOHead title={`${title} | Performance Processes`} description={t[kind].intro} path="/intake" noindex />
      <Navbar />
      <main>
        <section className="border-b border-primary/10 bg-secondary px-5 py-16 md:py-22">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-display max-w-4xl text-5xl leading-[.98] md:text-7xl">{title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{t[kind].intro}</p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
          <nav aria-label={t.choose} className="mb-12 flex flex-wrap gap-x-7 gap-y-3 border-b border-primary/15 pb-5 text-sm">
            {(["discovery", "funding", "health"] as IntakeKind[]).map((option) => (
              <button type="button" key={option} onClick={() => chooseKind(option)}
                aria-current={kind === option ? "page" : undefined}
                className={`border-b pb-2 text-left ${kind === option ? "border-accent text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}>
                {t[`${option}Link`]}
              </button>
            ))}
          </nav>

          {kind === "health" && <p className="mb-10 text-sm leading-6 text-muted-foreground">{t.notFormal}</p>}
          {kind === "funding" && <p className="mb-10 text-sm leading-6 text-muted-foreground">{t.privacy}</p>}
          {contextLoading && <p role="status" className="mb-8 text-sm text-muted-foreground">{language === "fr" ? "Vérification du lien…" : "Verifying your invitation…"}</p>}
          {invitationError && <p role="alert" className="mb-8 border-l-2 border-accent pl-4 text-sm leading-6">{t.invitationError}</p>}
          {invitation && <p className="mb-8 text-sm text-muted-foreground">{t.callAt} {new Date(invitation.callAt).toLocaleString(language === "fr" ? "fr-CA" : "en-CA", { dateStyle: "long", timeStyle: "short" })}.</p>}

          {status === "done" ? (
            <section className="border-y border-primary/15 py-10" role="status">
              <h2 className="text-display text-3xl">{t.submitted}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{message}</p>
              {kind === "health" && <div className="mt-9">
                <h3 className="text-xl font-semibold">{t.resultIntro}</h3>
                <dl className="mt-4 divide-y divide-primary/10">{results.map((result) => (
                  <div key={result.section.en} className="flex flex-wrap justify-between gap-2 py-4">
                    <dt>{localized(result.section, language)}</dt><dd className="text-sm font-semibold">{result.score}/25 · {t[result.level]}</dd>
                  </div>
                ))}</dl>
              </div>}
            </section>
          ) : (
            <form onSubmit={submit} className="space-y-12">
              <section className="grid gap-6 border-b border-primary/15 pb-10 sm:grid-cols-2">
                <label className="block text-sm font-medium">{t.name}
                  <input required maxLength={120} autoComplete="name" value={identity.name} onChange={(e) => setIdentity({...identity,name:e.target.value})} readOnly={!!invitation}
                    className="mt-2 block w-full border border-primary/20 bg-background px-3 py-3 font-normal outline-none focus:border-accent read-only:bg-secondary/60" />
                </label>
                <label className="block text-sm font-medium">{t.email}
                  <input required type="email" maxLength={254} autoComplete="email" value={identity.email} onChange={(e) => setIdentity({...identity,email:e.target.value})} readOnly={!!invitation}
                    className="mt-2 block w-full border border-primary/20 bg-background px-3 py-3 font-normal outline-none focus:border-accent read-only:bg-secondary/60" />
                </label>
                <label className="block text-sm font-medium">{t.org}
                  <input required maxLength={200} autoComplete="organization" value={identity.organization} onChange={(e) => setIdentity({...identity,organization:e.target.value})}
                    className="mt-2 block w-full border border-primary/20 bg-background px-3 py-3 font-normal outline-none focus:border-accent" />
                </label>
                <label className="block text-sm font-medium">{t.phone}
                  <input type="tel" maxLength={60} autoComplete="tel" value={identity.phone} onChange={(e) => setIdentity({...identity,phone:e.target.value})}
                    className="mt-2 block w-full border border-primary/20 bg-background px-3 py-3 font-normal outline-none focus:border-accent" />
                </label>
              </section>

              {grouped.map((group) => (
                <fieldset key={group.section.en} className="space-y-6">
                  <legend className="mb-6 border-b border-primary/15 pb-3 text-display text-2xl md:text-3xl">{localized(group.section, language)}</legend>
                  {group.fields.map((field) => (
                    <label key={field.id} className="block text-sm font-medium leading-6">
                      {localized(field.label, language)}{field.required ? <span aria-hidden="true" className="ml-1 text-accent">*</span> : null}
                      {field.type === "select" || field.type === "score" ? (
                        <select required={field.required} value={answers[field.id] || ""} onChange={(e) => setAnswers({...answers,[field.id]:e.target.value})}
                          className="mt-2 block w-full border border-primary/20 bg-background px-3 py-3 font-normal outline-none focus:border-accent">
                          <option value="">{field.type === "score" ? t.scale : language === "fr" ? "Choisir une réponse" : "Choose an answer"}</option>
                          {field.type === "score"
                            ? [1,2,3,4,5].map((score,index)=><option key={score} value={score}>{score} — {t.scoreOptions[index]}</option>)
                            : field.options?.map((option)=><option key={option.value} value={option.value}>{localized(option.label,language)}</option>)}
                        </select>
                      ) : (
                        <textarea required={field.required} maxLength={2000} rows={field.id === "additional" ? 3 : 4} value={answers[field.id] || ""} onChange={(e) => setAnswers({...answers,[field.id]:e.target.value})}
                          className="mt-2 block w-full resize-y border border-primary/20 bg-background px-3 py-3 font-normal outline-none focus:border-accent" />
                      )}
                    </label>
                  ))}
                </fieldset>
              ))}

              <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                Leave this field blank
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>

              {kind === "health" && <section className="border-t border-primary/15 pt-7">
                <h2 className="text-display text-2xl">{t.resultIntro}</h2>
                <dl className="mt-4 divide-y divide-primary/10">{results.map((result) => (
                  <div key={result.section.en} className="flex flex-wrap justify-between gap-2 py-4">
                    <dt>{localized(result.section, language)}</dt><dd className="text-sm font-semibold">{result.score}/25 · {t[result.level]}</dd>
                  </div>
                ))}</dl>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">{t.notFormal}</p>
              </section>}

              <div className="border-t border-primary/15 pt-7">
                <label className="flex items-start gap-3 text-sm leading-6">
                  <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} required className="mt-1 accent-accent" />
                  <span>{t.consent} <Link href="/legal" className="underline underline-offset-2">{t.privacyLink}</Link></span>
                </label>
                <p className="mt-5 text-xs leading-5 text-muted-foreground">{t.privacy}</p>
                {message && <p role="alert" className="mt-5 text-sm text-destructive">{status === "error" && message !== t.error ? message : t.error}</p>}
                <button disabled={status === "sending" || contextLoading || invitationError} type="submit"
                  className="mt-7 bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:bg-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {status === "sending" ? t.sending : t.send}
                </button>
              </div>
            </form>
          )}
          <Link href="/grants-financing" className="mt-12 inline-block border-b border-primary pb-1 text-sm">{t.back}</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
