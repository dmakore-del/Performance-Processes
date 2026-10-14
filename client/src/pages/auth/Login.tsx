import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLogin, useVerify2FA } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/hooks/use-language";

export default function Login() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const copy = fr ? {
    title: "Portail client",
    subtitle: "Connectez-vous pour accéder au tableau de bord de votre mandat",
    email: "Adresse courriel",
    password: "Mot de passe",
    passwordPlaceholder: "Entrez votre mot de passe",
    hide: "Masquer",
    show: "Afficher",
    signIn: "Se connecter",
    forgot: "Mot de passe oublié?",
    noAccount: "Vous n’avez pas de compte?",
    signUp: "Créer un compte",
    back: "Retour au site web",
    invalid: "Adresse courriel ou mot de passe invalide",
    failed: "La connexion a échoué",
    twoFactorTitle: "Vérification en deux étapes",
    twoFactorSubtitle: "Entrez le code à 6 chiffres de votre application d’authentification.",
    twoFactorCode: "Code d’authentification",
    verify: "Vérifier le code",
    verifying: "Vérification…",
    verifyFailed: "Code invalide ou expiré. Vérifiez votre code et réessayez.",
    backToSignIn: "Retour à la connexion",
  } : {
    title: "Client Portal",
    subtitle: "Sign in to access your engagement dashboard",
    email: "Email Address",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    hide: "Hide",
    show: "Show",
    signIn: "Sign In",
    forgot: "Forgot your password?",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    back: "Back to website",
    invalid: "Invalid email or password",
    failed: "Login failed",
    twoFactorTitle: "Two-step verification",
    twoFactorSubtitle: "Enter the 6-digit code from your authenticator app.",
    twoFactorCode: "Authentication code",
    verify: "Verify code",
    verifying: "Verifying…",
    verifyFailed: "That code is invalid or expired. Check it and try again.",
    backToSignIn: "Back to sign in",
  };
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const loginMutation = useLogin();
  const verifyMutation = useVerify2FA();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      if (result?.requiresTwoFactor) {
        setTwoFactorRequired(true);
        setTwoFactorCode("");
        return;
      }
      setLocation("/portal");
    } catch (err: any) {
      const msg = err.message || "";
      try {
        const parsed = JSON.parse(msg.replace(/^\d+:\s*/, ""));
        setError(fr ? copy.failed : (parsed.message || copy.failed));
      } catch {
        setError(copy.invalid);
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await verifyMutation.mutateAsync(twoFactorCode);
      setLocation("/portal");
    } catch {
      setError(copy.verifyFailed);
    }
  };

  return (
    <div className="portal-auth flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl grid md:grid-cols-[1fr_.82fr] bg-white border border-border">
        <section className="hidden md:flex flex-col justify-between bg-primary text-white p-10 lg:p-14">
          <div>
            <h2 className="max-w-md text-5xl lg:text-6xl font-heading leading-[.98]">{fr ? "Un espace de travail, du premier pas à la suite." : "One workspace, from first steps to what comes next."}</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">{fr ? "Votre équipe de conseil, vos prochaines étapes et vos documents sécurisés, réunis au même endroit." : "Your advisory team, next steps and secure documents, together in one place."}</p>
          </div>
          <p className="text-xs text-white/55">{fr ? "Un accompagnement clair pour les entrepreneurs canadiens." : "Clear support for Canadian entrepreneurs."}</p>
        </section>
        <section className="w-full max-w-md mx-auto px-6 py-10 sm:p-10 lg:p-14">
        <div className="text-center mb-8">
          <Link href="/portal/login">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-primary">{twoFactorRequired ? copy.twoFactorTitle : copy.title}</h1>
          <p className="text-muted-foreground mt-2">{twoFactorRequired ? copy.twoFactorSubtitle : copy.subtitle}</p>
        </div>

        <div className="portal-auth-panel p-6 sm:p-8">
          {twoFactorRequired ? (
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <Label htmlFor="two-factor-code" className="text-sm font-bold text-primary mb-2 block">{copy.twoFactorCode}</Label>
                <Input
                  id="two-factor-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  data-testid="input-login-2fa-code"
                  value={twoFactorCode}
                  onChange={(event) => setTwoFactorCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  aria-describedby={error ? "text-login-error" : undefined}
                  required
                  className="h-12 text-center font-mono text-lg tracking-[.35em]"
                />
              </div>
              {error && (
                <div id="text-login-error" role="alert" data-testid="text-login-error" className="bg-red-50 text-red-600 text-sm p-3 border border-red-200">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                data-testid="button-verify-2fa"
                disabled={verifyMutation.isPending || twoFactorCode.length !== 6}
                className="w-full h-12 bg-primary text-white hover:bg-accent hover:text-primary font-bold uppercase tracking-wider text-sm"
              >
                {verifyMutation.isPending ? copy.verifying : copy.verify}
              </Button>
              <button
                type="button"
                onClick={() => { setTwoFactorRequired(false); setTwoFactorCode(""); setError(""); }}
                className="w-full text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
              >
                {copy.backToSignIn}
              </button>
            </form>
          ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-bold text-primary mb-2 block">{copy.email}</Label>
              <Input
                id="email"
                type="email"
                 autoComplete="email"
                data-testid="input-login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
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
                   autoComplete="current-password"
                  data-testid="input-login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={copy.passwordPlaceholder}
                  required
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

            {error && (
              <div data-testid="text-login-error" className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              data-testid="button-login"
              disabled={loginMutation.isPending}
              className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent hover:text-primary font-bold uppercase tracking-wider text-sm"
            >
              {copy.signIn}
            </Button>

            <div className="text-center">
              <Link href="/portal/forgot-password">
                <span data-testid="link-forgot-password" className="text-sm text-accent hover:text-primary cursor-pointer font-medium">
                  {copy.forgot}
                </span>
              </Link>
            </div>
          </form>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {copy.noAccount}{" "}
            <Link href="/portal/register">
                <span data-testid="link-register" className="text-accent hover:text-primary cursor-pointer font-bold">
                {copy.signUp}
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
        </section>
      </div>
    </div>
  );
}
