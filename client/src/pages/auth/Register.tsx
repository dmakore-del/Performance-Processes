import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useRegister } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/hooks/use-language";

export default function Register() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const copy = fr ? {
    mismatch: "Les mots de passe ne correspondent pas",
    tooShort: "Le mot de passe doit contenir au moins 8 caractères",
    failed: "L’inscription a échoué. Veuillez réessayer.",
    title: "Créer un compte",
    subtitle: "Inscrivez-vous au portail de Performance Processes",
    fullName: "Nom complet",
    email: "Adresse courriel",
    organization: "Nom de l’organisation",
    password: "Mot de passe",
    min: "Minimum 8 caractères",
    hide: "Masquer",
    show: "Afficher",
    confirm: "Confirmer le mot de passe",
    repeat: "Répétez le mot de passe",
    create: "Créer le compte",
    existing: "Vous avez déjà un compte?",
    signIn: "Se connecter",
    back: "Retour au site web",
  } : {
    mismatch: "Passwords do not match",
    tooShort: "Password must be at least 8 characters",
    failed: "Registration failed. Please try again.",
    title: "Create Account",
    subtitle: "Register for the Performance Processes portal",
    fullName: "Full Name",
    email: "Email Address",
    organization: "Organization Name",
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

    try {
      await registerMutation.mutateAsync({ email, password, companyName, fullName });
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

  return (
    <div className="portal-auth flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-[.85fr_1fr] border border-border bg-white">
        <section className="hidden lg:flex flex-col justify-between bg-primary text-white p-12">
          <div>
            <h2 className="max-w-sm text-6xl font-heading leading-[.96]">{fr ? "Faisons avancer votre entreprise." : "Move your business forward."}</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">{fr ? "Un espace sécurisé pour suivre votre plan, échanger avec l’équipe et retrouver vos livrables." : "A secure place to follow your plan, connect with the team and find your deliverables."}</p>
          </div>
          <p className="text-xs text-white/55">{fr ? "Espace bilingue · Soutien partout au Canada" : "Bilingual workspace · Support across Canada"}</p>
        </section>
      <div className="w-full max-w-2xl mx-auto p-6 sm:p-10">
        <div className="text-center mb-8">
          <Link href="/portal/login">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-primary">{copy.title}</h1>
          <p className="text-muted-foreground mt-2">{copy.subtitle}</p>
        </div>

        <div className="portal-auth-panel p-6 sm:p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-sm font-bold text-primary mb-2 block">{copy.fullName}</Label>
              <Input
                id="fullName"
                type="text"
                data-testid="input-register-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                 placeholder={fr ? "Nom complet" : "Your name"}
                required
                className="rounded-xl h-12"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-bold text-primary mb-2 block">{copy.email}</Label>
              <Input
                id="email"
                type="email"
                data-testid="input-register-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="rounded-xl h-12"
              />
            </div>

            <div>
              <Label htmlFor="companyName" className="text-sm font-bold text-primary mb-2 block">{copy.organization}</Label>
              <Input
                id="companyName"
                type="text"
                data-testid="input-register-company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                 placeholder={fr ? "Nom de l’entreprise" : "Business name"}
                required
                className="rounded-xl h-12"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-bold text-primary mb-2 block">{copy.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  data-testid="input-register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={copy.min}
                  required
                  minLength={8}
                  className="rounded-xl h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary"
                >
                  {showPassword ? copy.hide : copy.show}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-bold text-primary mb-2 block">{copy.confirm}</Label>
              <Input
                id="confirmPassword"
                type="password"
                data-testid="input-register-confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={copy.repeat}
                required
                className="rounded-xl h-12"
              />
            </div>

            {error && (
              <div data-testid="text-register-error" className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              data-testid="button-register"
              disabled={registerMutation.isPending}
              className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm"
            >
              {copy.create}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {copy.existing}{" "}
            <Link href="/portal/login">
              <span data-testid="link-login" className="text-primary underline underline-offset-4 cursor-pointer font-bold">
                {copy.signIn}
              </span>
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <a href="https://performanceprocesses.com">
            <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer">
              ← {copy.back}
            </span>
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}
