import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForgotPassword, useResetPassword } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/hooks/use-language";

export default function ForgotPassword() {
  const [location] = useLocation();
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const resetToken = params.get("token");

  if (resetToken) {
    return <ResetPasswordForm token={resetToken} />;
  }

  return <ForgotPasswordForm />;
}

function ForgotPasswordForm() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const copy = fr ? {
    title: "Réinitialiser le mot de passe",
    subtitle: "Nous vous enverrons un lien pour réinitialiser votre mot de passe",
    check: "Vérifiez votre boîte de réception",
    sent: "Si un compte correspond à cette adresse, vous recevrez sous peu un lien de réinitialisation.",
    email: "Adresse courriel",
    send: "Envoyer le lien",
    back: "Retour à la connexion",
    failed: "Impossible d’envoyer le courriel de réinitialisation. Veuillez réessayer.",
  } : {
    title: "Reset Password",
    subtitle: "We'll send you a link to reset your password",
    check: "Check Your Email",
    sent: "If an account exists with this address, you will receive a password reset link shortly.",
    email: "Email Address",
    send: "Send Reset Link",
    back: "Back to Sign In",
    failed: "Failed to send reset email. Please try again.",
  };
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const forgotPassword = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await forgotPassword.mutateAsync(email);
      setSent(true);
    } catch (err: any) {
      setError(copy.failed);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-primary">{copy.title}</h1>
          <p className="text-muted-foreground mt-2">{copy.subtitle}</p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-8">
          {sent ? (
            <div className="text-center py-4">
              <h2 className="text-xl font-bold text-primary mb-2">{copy.check}</h2>
              <p className="text-sm text-muted-foreground mb-6">
                {copy.sent}
              </p>
              <Link href="/portal/login">
                <Button data-testid="button-back-to-login" className="rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm">
                  {copy.back}
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <Label htmlFor="email" className="text-sm font-bold text-primary mb-2 block">{copy.email}</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="input-forgot-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="rounded-xl h-12"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                data-testid="button-send-reset"
                disabled={forgotPassword.isPending}
                className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm"
              >
                {copy.send}
              </Button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/portal/login">
            <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
              ← {copy.back}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResetPasswordForm({ token }: { token: string }) {
  const { language } = useLanguage();
  const fr = language === "fr";
  const copy = fr ? {
    title: "Définir un nouveau mot de passe",
    resetTitle: "Mot de passe réinitialisé",
    resetBody: "Votre mot de passe a été mis à jour.",
    signIn: "Se connecter",
    newPassword: "Nouveau mot de passe",
    confirm: "Confirmer le mot de passe",
    min: "Minimum 8 caractères",
    repeat: "Répétez le nouveau mot de passe",
    submit: "Réinitialiser le mot de passe",
    mismatch: "Les mots de passe ne correspondent pas",
    tooShort: "Le mot de passe doit contenir au moins 8 caractères",
    failed: "Impossible de réinitialiser le mot de passe. Le lien a peut-être expiré.",
  } : {
    title: "Set New Password",
    resetTitle: "Password Reset",
    resetBody: "Your password has been updated successfully.",
    signIn: "Sign In",
    newPassword: "New Password",
    confirm: "Confirm Password",
    min: "Min. 8 characters",
    repeat: "Repeat new password",
    submit: "Reset Password",
    mismatch: "Passwords do not match",
    tooShort: "Password must be at least 8 characters",
    failed: "Failed to reset password. The link may have expired.",
  };
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const resetPassword = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
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
      await resetPassword.mutateAsync({ token, password });
      setSuccess(true);
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
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-primary">{copy.title}</h1>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-8">
          {success ? (
            <div className="text-center py-4">
              <h2 className="text-xl font-bold text-primary mb-2">{copy.resetTitle}</h2>
              <p className="text-sm text-muted-foreground mb-6">{copy.resetBody}</p>
              <Link href="/portal/login">
                <Button data-testid="button-login-after-reset" className="rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm">
                  {copy.signIn}
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <Label htmlFor="password" className="text-sm font-bold text-primary mb-2 block">{copy.newPassword}</Label>
                <Input
                  id="password"
                  type="password"
                  data-testid="input-reset-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={copy.min}
                  required
                  minLength={8}
                  className="rounded-xl h-12"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-primary mb-2 block">{copy.confirm}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  data-testid="input-reset-confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={copy.repeat}
                  required
                  className="rounded-xl h-12"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                data-testid="button-reset-password"
                disabled={resetPassword.isPending}
                className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm"
              >
                {copy.submit}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
