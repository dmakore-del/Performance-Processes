import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useRegister, type RegistrationInput } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/hooks/use-language";
import { PORTAL_SERVICES } from "@shared/portal-services";

export default function Register() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const copy = fr ? {
    mismatch: "Les mots de passe ne correspondent pas",
    tooShort: "Le mot de passe doit contenir au moins 8 caractères",
    failed: "L’inscription a échoué. Veuillez réessayer.",
    title: "Créer un compte client",
    subtitle: "Partagez les renseignements qui aideront notre équipe à préparer votre espace client.",
    fullName: "Nom complet",
    email: "Adresse courriel",
    phone: "Téléphone",
    organization: "Nom légal ou nom d’usage de l’entreprise",
    location: "Ville, province ou région et pays",
    website: "Site web (facultatif)",
    industry: "Secteur d’activité (facultatif)",
    stage: "Où en est votre entreprise?",
    planning: "En préparation",
    preLaunch: "Prête à démarrer",
    operating: "En activité",
    growing: "En croissance",
    nonprofit: "Organisme sans but lucratif",
    services: "Quels services vous intéressent?",
    notSure: "Je ne sais pas encore, aidez-moi à choisir",
    goals: "Que souhaitez-vous accomplir avec notre équipe?",
    goalsHint: "Décrivez brièvement votre priorité ou le défi à résoudre.",
    contactSection: "Coordonnées",
    businessSection: "Votre entreprise",
    supportSection: "Vos priorités",
    accountSection: "Sécurité du compte",
    requiredNote: "Les champs marqués d’un astérisque sont obligatoires.",
    password: "Mot de passe",
    min: "Minimum 8 caractères",
    hide: "Masquer",
    show: "Afficher",
    confirm: "Confirmer le mot de passe",
    repeat: "Répétez le mot de passe",
    create: "Créer mon compte",
    existing: "Vous avez déjà un compte?",
    signIn: "Se connecter",
    back: "Retour au site web",
  } : {
    mismatch: "Passwords do not match",
    tooShort: "Password must be at least 8 characters",
    failed: "Registration failed. Please try again.",
    title: "Create your client account",
    subtitle: "Share a few details so our team can prepare your client workspace.",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    organization: "Business legal or operating name",
    location: "City, province or region, and country",
    website: "Website (optional)",
    industry: "Industry (optional)",
    stage: "Where is your business today?",
    planning: "Planning",
    preLaunch: "Preparing to launch",
    operating: "Operating",
    growing: "Growing",
    nonprofit: "Non-profit organization",
    services: "Which services are you interested in?",
    notSure: "I’m not sure yet, help me choose",
    goals: "What would you like our team to help you accomplish?",
    goalsHint: "Briefly describe your priority or the challenge you want to solve.",
    contactSection: "Contact details",
    businessSection: "Your business",
    supportSection: "What you need",
    accountSection: "Account security",
    requiredNote: "Fields marked with an asterisk are required.",
    password: "Password",
    min: "Min. 8 characters",
    hide: "Hide",
    show: "Show",
    confirm: "Confirm Password",
    repeat: "Repeat password",
    create: "Create Account",
    existing: "Already have an account?",
    signIn: "Sign In",
    back: "Back to website",
  };
  const [, setLocation] = useLocation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [businessStage, setBusinessStage] = useState<RegistrationInput["businessStage"] | "">("");
  const [requestedServices, setRequestedServices] = useState<string[]>([]);
  const [supportGoals, setSupportGoals] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const registerMutation = useRegister();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(copy.mismatch);
      return;
    }

    if (password.length < 8) {
      setError(copy.tooShort);
      return;
    }

    if (requestedServices.length === 0) {
      setError(fr ? "Choisissez un service ou sélectionnez l’option pour vous aider à choisir." : "Choose a service or select the option for help deciding.");
      return;
    }
    if (!businessStage) {
      setError(fr ? "Sélectionnez l’étape de votre entreprise." : "Select your business stage.");
      return;
    }

    try {
      await registerMutation.mutateAsync({
        email,
        password,
        companyName,
        fullName,
        contactPhone,
        businessLocation,
        businessWebsite,
        industry,
        businessStage,
        requestedServices,
        supportGoals,
      });
      setLocation("/portal");
    } catch (err: any) {
      const msg = err.message || "";
      try {
        const parsed = JSON.parse(msg.replace(/^\d+:\s*/, ""));
        setError(fr ? copy.failed : (parsed.message || copy.failed));
      } catch {
        setError(copy.failed);
      }
    }
  };

  const toggleService = (serviceId: string) => {
    setRequestedServices((selected) => {
      if (serviceId === "not-sure-yet") {
        return selected.includes(serviceId) ? [] : [serviceId];
      }
      const withoutHelpOption = selected.filter((id) => id !== "not-sure-yet");
      return withoutHelpOption.includes(serviceId)
        ? withoutHelpOption.filter((id) => id !== serviceId)
        : [...withoutHelpOption, serviceId];
    });
  };

  return (
    <div className="portal-auth min-h-[100dvh] px-4 py-8 sm:px-8 sm:py-12">
      <main className="mx-auto w-full max-w-4xl">
        <header className="mb-9 text-center">
          <Link href="/portal/login">
            <img src={logoImg} alt="Performance Processes" className="mx-auto mb-5 h-12 w-auto cursor-pointer" />
          </Link>
          <h1 className="text-4xl font-heading text-primary">{copy.title}</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{copy.subtitle}</p>
          <p className="mt-3 text-xs text-muted-foreground">{copy.requiredNote}</p>
        </header>

        <form onSubmit={handleRegister} className="space-y-9">
          <section aria-labelledby="register-contact-heading">
            <h2 id="register-contact-heading" className="mb-4 border-b border-border pb-2 text-xl font-heading">{copy.contactSection}</h2>
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold">{copy.fullName} *</Label>
                <Input id="fullName" type="text" autoComplete="name" data-testid="input-register-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={120} className="h-11 rounded-none" />
              </div>
              <div>
                <Label htmlFor="email" className="mb-1.5 block text-sm font-semibold">{copy.email} *</Label>
                <Input id="email" type="email" autoComplete="email" data-testid="input-register-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required className="h-11 rounded-none" />
              </div>
              <div>
                <Label htmlFor="contactPhone" className="mb-1.5 block text-sm font-semibold">{copy.phone} *</Label>
                <Input id="contactPhone" type="tel" autoComplete="tel" data-testid="input-register-phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required minLength={7} maxLength={40} className="h-11 rounded-none" />
              </div>
            </div>
          </section>

          <section aria-labelledby="register-business-heading">
            <h2 id="register-business-heading" className="mb-4 border-b border-border pb-2 text-xl font-heading">{copy.businessSection}</h2>
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="companyName" className="mb-1.5 block text-sm font-semibold">{copy.organization} *</Label>
                <Input id="companyName" type="text" autoComplete="organization" data-testid="input-register-company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required maxLength={160} className="h-11 rounded-none" />
              </div>
              <div>
                <Label htmlFor="businessLocation" className="mb-1.5 block text-sm font-semibold">{copy.location} *</Label>
                <Input id="businessLocation" type="text" autoComplete="address-level2" data-testid="input-register-location" value={businessLocation} onChange={(e) => setBusinessLocation(e.target.value)} required maxLength={180} className="h-11 rounded-none" />
              </div>
              <div>
                <Label htmlFor="businessStage" className="mb-1.5 block text-sm font-semibold">{copy.stage} *</Label>
                <select id="businessStage" data-testid="select-register-stage" value={businessStage} onChange={(e) => setBusinessStage(e.target.value as RegistrationInput["businessStage"])} required className="mt-0.5 h-11 w-full border border-input bg-white px-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                  <option value="" disabled>{fr ? "Sélectionner" : "Select one"}</option>
                  <option value="planning">{copy.planning}</option>
                  <option value="pre-launch">{copy.preLaunch}</option>
                  <option value="operating">{copy.operating}</option>
                  <option value="growing">{copy.growing}</option>
                  <option value="nonprofit">{copy.nonprofit}</option>
                </select>
              </div>
              <div>
                <Label htmlFor="businessWebsite" className="mb-1.5 block text-sm font-semibold">{copy.website}</Label>
                <Input id="businessWebsite" type="url" autoComplete="url" data-testid="input-register-website" value={businessWebsite} onChange={(e) => setBusinessWebsite(e.target.value)} placeholder="https://" maxLength={300} className="h-11 rounded-none" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="industry" className="mb-1.5 block text-sm font-semibold">{copy.industry}</Label>
                <Input id="industry" type="text" data-testid="input-register-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} maxLength={120} className="h-11 rounded-none" />
              </div>
            </div>
          </section>

          <section aria-labelledby="register-support-heading">
            <h2 id="register-support-heading" className="mb-4 border-b border-border pb-2 text-xl font-heading">{copy.supportSection}</h2>
            <fieldset>
              <legend className="mb-3 text-sm font-semibold">{copy.services} *</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {PORTAL_SERVICES.map((service) => (
                  <label key={service.id} className="flex min-h-11 cursor-pointer items-center gap-3 border border-border bg-white px-3 py-2 text-sm hover:border-primary/50">
                    <input type="checkbox" value={service.id} checked={requestedServices.includes(service.id)} onChange={() => toggleService(service.id)} className="h-4 w-4 accent-primary" />
                    <span>{fr ? service.fr : service.name}</span>
                  </label>
                ))}
                <label className="flex min-h-11 cursor-pointer items-center gap-3 border border-border bg-white px-3 py-2 text-sm hover:border-primary/50 sm:col-span-2">
                  <input type="checkbox" value="not-sure-yet" checked={requestedServices.includes("not-sure-yet")} onChange={() => toggleService("not-sure-yet")} className="h-4 w-4 accent-primary" />
                  <span>{copy.notSure}</span>
                </label>
              </div>
            </fieldset>
            <div className="mt-5">
              <Label htmlFor="supportGoals" className="mb-1.5 block text-sm font-semibold">{copy.goals} *</Label>
              <textarea id="supportGoals" data-testid="input-register-goals" value={supportGoals} onChange={(e) => setSupportGoals(e.target.value)} required minLength={10} maxLength={1200} rows={4} placeholder={copy.goalsHint} className="w-full resize-y border border-input bg-white px-3 py-2.5 text-sm leading-6 text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
            </div>
          </section>

          <section aria-labelledby="register-account-heading">
            <h2 id="register-account-heading" className="mb-4 border-b border-border pb-2 text-xl font-heading">{copy.accountSection}</h2>
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="password" className="mb-1.5 block text-sm font-semibold">{copy.password} *</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} autoComplete="new-password" data-testid="input-register-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={copy.min} required minLength={8} className="h-11 rounded-none pr-16" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-primary">{showPassword ? copy.hide : copy.show}</button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold">{copy.confirm} *</Label>
                <Input id="confirmPassword" type="password" autoComplete="new-password" data-testid="input-register-confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={copy.repeat} required minLength={8} className="h-11 rounded-none" />
              </div>
            </div>
          </section>

          {error && <div role="alert" data-testid="text-register-error" className="border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <Button type="submit" data-testid="button-register" disabled={registerMutation.isPending} className="h-12 w-full rounded-none bg-primary text-white hover:bg-accent hover:text-primary sm:w-auto sm:min-w-64">
            {registerMutation.isPending ? (fr ? "Création du compte…" : "Creating account…") : copy.create}
          </Button>
        </form>

        <div className="mt-8 border-t border-border pt-5 text-center">
          <p className="text-sm text-muted-foreground">
            {copy.existing}{" "}
            <Link href="/portal/login"><span data-testid="link-login" className="cursor-pointer font-semibold text-primary underline underline-offset-4">{copy.signIn}</span></Link>
          </p>
          <a href="https://performanceprocesses.com" className="mt-4 inline-block text-xs text-muted-foreground hover:text-primary">{copy.back}</a>
        </div>
      </main>
    </div>
  );
}
