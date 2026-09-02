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
    created: "Compte créé",
    approvalBody: "Votre compte d’équipe a été créé et attend l’approbation d’un administrateur. Vous pourrez y accéder une fois qu’il aura été approuvé.",
    next: "Prochaine étape",
    review: "Un administrateur examinera et approuvera votre compte, généralement dans un délai d’un jour ouvrable.",
    login: "Aller à la connexion",
    title: "Créer un compte",
    subtitle: "Inscrivez-vous au portail de Performance Processes",
    accountType: "Type de compte",
    client: "Client",
    clientDesc: "Organisation à la recherche de services-conseils",
    staff: "Équipe",
    staffDesc: "Membre de l’équipe (approbation requise)",
    fullName: "Nom complet",
    email: "Adresse courriel",
    department: "Service ou équipe",
    organization: "Nom de l’organisation",
    teamExample: "p. ex. Équipe-conseil",
    password: "Mot de passe",
    min: "Minimum 8 caractères",
    hide: "Masquer",
    show: "Afficher",
    confirm: "Confirmer le mot de passe",
    repeat: "Répétez le mot de passe",
    approvalNote: "Les comptes d’équipe doivent être approuvés par un administrateur avant que l’accès soit accordé.",
    requestAccess: "Demander l’accès équipe",
    create: "Créer le compte",
    existing: "Vous avez déjà un compte?",
    signIn: "Se connecter",
    back: "Retour au site web",
  } : {
    mismatch: "Passwords do not match",
    tooShort: "Password must be at least 8 characters",
    failed: "Registration failed. Please try again.",
    created: "Account Created",
    approvalBody: "Your staff account has been created and is pending administrator approval. You will receive access once approved.",
    next: "What happens next?",
    review: "An administrator will review and approve your account. This typically happens within 1 business day.",
    login: "Go to Login",
    title: "Create Account",
    subtitle: "Register for the Performance Processes portal",
    accountType: "Account Type",
    client: "Client",
    clientDesc: "Organization seeking consulting services",
    staff: "Staff",
    staffDesc: "Team member (requires admin approval)",
    fullName: "Full Name",
    email: "Email Address",
    department: "Department / Team",
    organization: "Organization Name",
    teamExample: "e.g. Consulting Team",
    password: "Password",
    min: "Min. 8 characters",
    hide: "Hide",
    show: "Show",
    confirm: "Confirm Password",
    repeat: "Repeat password",
    approvalNote: "Staff accounts require administrator approval before access is granted.",
    requestAccess: "Request Staff Access",
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
  const [accountType, setAccountType] = useState<"client" | "staff">("client");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pendingApproval, setPendingApproval] = useState(false);

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
      const result = await registerMutation.mutateAsync({ email, password, companyName, fullName, accountType } as any);
      if (result.pendingApproval) {
        setPendingApproval(true);
        return;
      }
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

  const bgVideo = (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        {...{ "webkit-playsinline": "true" } as any}
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="bg-video"
      >
        <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
    </>
  );

  if (pendingApproval) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        {bgVideo}
        <div className="w-full max-w-md text-center relative z-10">
          <Link href="/">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-6 cursor-pointer" />
          </Link>
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
            <h1 data-testid="text-pending-title" className="text-2xl font-heading font-extrabold text-primary mb-3">{copy.created}</h1>
            <p className="text-muted-foreground mb-4">
              {copy.approvalBody}
            </p>
            <div className="bg-zinc-100 p-4 rounded-xl border border-zinc-200 text-left">
              <p className="text-xs text-zinc-900">
                <span className="font-bold block mb-1">{copy.next}</span>
                {copy.review}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/portal/login">
              <span className="text-sm font-bold text-accent hover:text-white cursor-pointer">{copy.login}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {bgVideo}

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-white">{copy.title}</h1>
          <p className="text-white/70 mt-2">{copy.subtitle}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label className="text-sm font-bold text-primary mb-3 block">{copy.accountType}</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  data-testid="button-type-client"
                  onClick={() => setAccountType("client")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    accountType === "client"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="font-bold text-sm text-primary">{copy.client}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{copy.clientDesc}</p>
                </button>
                <button
                  type="button"
                  data-testid="button-type-staff"
                  onClick={() => setAccountType("staff")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    accountType === "staff"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="font-bold text-sm text-primary">{copy.staff}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{copy.staffDesc}</p>
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="fullName" className="text-sm font-bold text-primary mb-2 block">{copy.fullName}</Label>
              <Input
                id="fullName"
                type="text"
                data-testid="input-register-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
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
              <Label htmlFor="companyName" className="text-sm font-bold text-primary mb-2 block">
                {accountType === "staff" ? copy.department : copy.organization}
              </Label>
              <Input
                id="companyName"
                type="text"
                data-testid="input-register-company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={accountType === "staff" ? copy.teamExample : "Acme Corp"}
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

            {accountType === "staff" && (
              <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200">
                <p className="text-xs text-zinc-700">{copy.approvalNote}</p>
              </div>
            )}

            <Button
              type="submit"
              data-testid="button-register"
              disabled={registerMutation.isPending}
              className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm"
            >
              {accountType === "staff" ? copy.requestAccess : copy.create}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-white/70">
            {copy.existing}{" "}
            <Link href="/portal/login">
              <span data-testid="link-login" className="text-accent hover:text-white cursor-pointer font-bold">
                {copy.signIn}
              </span>
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link href="/">
            <span className="text-xs text-white/50 hover:text-white cursor-pointer">
              ← {copy.back}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
