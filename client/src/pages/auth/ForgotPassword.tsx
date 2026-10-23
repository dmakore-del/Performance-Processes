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
    subtitle: "Nous vous enverrons un code de réinitialisation à 8 chiffres",
    check: "Vérifiez votre boîte de réception",
    sent: "Si un compte correspond à cette adresse, vous recevrez sous peu un code de réinitialisation.",
    email: "Adresse courriel",
    send: "Envoyer le code",
    back: "Retour à la connexion",
    failed: "Impossible d’envoyer le code de réinitialisation. Veuillez réessayer.",
  } : {
    title: "Reset Password",
    subtitle: "We'll email you an 8-digit reset code",
    check: "Check Your Email",
    sent: "If an account exists with this address, you will receive a reset code shortly.",
    email: "Email Address",
    send: "Send Reset Code",
    back: "Back to Sign In",
    failed: "Failed to send reset code. Please try again.",
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
    <div className="portal-auth flex items-center justify-center p-4">
      <div className="w-full max-w-xl border border-border bg-white p-6 sm:p-10">
        <div className="text-center mb-8">
          <Link href="/portal/login">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-primary">{copy.title}</h1>
          <p className="text-muted-foreground mt-2">{copy.subtitle}</p>
        </div>

        <div className="portal-auth-panel p-6 sm:p-8">
          {sent ? (
            <ResetCodeForm email={email} />
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

function ResetCodeForm({ email }: { email: string }) {
  const { language } = useLanguage();
  const fr = language === "fr";
  const copy = fr ? {
    title: "Saisissez votre code",
    instructions: `Entrez le code à 8 chiffres envoyé à ${email}. Il expire dans 15 minutes.`,
    code: "Code de réinitialisation",
    password: "Nouveau mot de passe",
    confirm: "Confirmer le mot de passe",
    submit: "Réinitialiser le mot de passe",
    success: "Votre mot de passe a été mis à jour.",
    signIn: "Se connecter",
    mismatch: "Les mots de passe ne correspondent pas.",
    tooShort: "Le mot de passe doit contenir au moins 8 caractères.",
    failed: "Code invalide ou expiré. Demandez un nouveau code et réessayez.",
    resend: "Renvoyer le code",
    resent: "Si un compte existe avec cette adresse, un nouveau code a été envoyé.",
    back: "Utiliser une autre adresse courriel",
  } : {
    title: "Enter your reset code",
    instructions: `Enter the 8-digit code sent to ${email}. It expires in 15 minutes.`,
    code: "Reset code",
    password: "New password",
    confirm: "Confirm password",
    submit: "Reset Password",
    success: "Your password has been updated successfully.",
    signIn: "Sign In",
    mismatch: "Passwords do not match.",
    tooShort: "Password must be at least 8 characters.",
    failed: "Invalid or expired code. Request a new code and try again.",
    resend: "Resend code",
    resent: "If an account exists with this address, a new code has been sent.",
    back: "Use a different email address",
  };
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState(false);
  const resetPassword = useResetPassword();
  const forgotPassword = useForgotPassword();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (password !== confirmPassword) {
      setError(copy.mismatch);
      return;
    }
    if (password.length < 8) {
      setError(copy.tooShort);
      return;
    }
    try {
      await resetPassword.mutateAsync({ email, code: code.trim(), password });
      setSuccess(true);
    } catch {
      setError(copy.failed);
    }
  };

  const resendCode = async () => {
    setError("");
    setNotice("");
    try {
      await forgotPassword.mutateAsync(email);
      setNotice(copy.resent);
    } catch {
      setError(fr ? "Impossible d’envoyer un nouveau code pour le moment." : "Unable to send a new code right now.");
    }
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-primary mb-2">{copy.success}</h2>
        <Link href="/portal/login" data-testid="button-login-after-reset" className="inline-flex min-h-10 items-center justify-center bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-accent hover:text-primary">
          {copy.signIn}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-primary">{copy.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{copy.instructions}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="reset-code" className="text-sm font-bold text-primary mb-2 block">{copy.code}</Label>
          <Input
            id="reset-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{8}"
            maxLength={8}
            data-testid="input-reset-code"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 8))}
            placeholder="00000000"
            required
            className="h-12 rounded-xl text-center text-xl tracking-[0.4em]"
          />
        </div>
        <div>
          <Label htmlFor="reset-password" className="text-sm font-bold text-primary mb-2 block">{copy.password}</Label>
          <Input
            id="reset-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="h-12 rounded-xl"
          />
        </div>
        <div>
          <Label htmlFor="reset-confirm-password" className="text-sm font-bold text-primary mb-2 block">{copy.confirm}</Label>
          <Input
            id="reset-confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="h-12 rounded-xl"
          />
        </div>
        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        {notice && <p role="status" className="text-sm text-muted-foreground">{notice}</p>}
        <Button type="submit" disabled={resetPassword.isPending} className="h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wider text-white hover:bg-accent">
          {copy.submit}
        </Button>
      </form>
      <div className="flex flex-col items-center gap-3 text-sm">
        <button type="button" onClick={resendCode} disabled={forgotPassword.isPending} className="text-primary underline underline-offset-4 disabled:opacity-50">
          {copy.resend}
        </button>
        <button type="button" onClick={() => setLocation("/portal/forgot-password")} className="text-muted-foreground underline underline-offset-4">
          {copy.back}
        </button>
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
    <div className="portal-auth flex items-center justify-center p-4">
      <div className="w-full max-w-xl border border-border bg-white p-6 sm:p-10">
        <div className="text-center mb-8">
          <Link href="/portal/login">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-primary">{copy.title}</h1>
        </div>

        <div className="portal-auth-panel p-6 sm:p-8">
          {success ? (
            <div className="text-center py-4">
              <h2 className="text-xl font-bold text-primary mb-2">{copy.resetTitle}</h2>
              <p className="text-sm text-muted-foreground mb-6">{copy.resetBody}</p>
              <Link href="/portal/login" data-testid="button-login-after-reset" className="inline-flex min-h-10 items-center justify-center bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-accent hover:text-primary">
                {copy.signIn}
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
