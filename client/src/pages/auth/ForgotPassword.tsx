import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForgotPassword, useResetPassword } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2, CheckCircle2, KeyRound } from "lucide-react";
import logoImg from "@/assets/logo.png";

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
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-primary">Reset Password</h1>
          <p className="text-muted-foreground mt-2">We'll send you a link to reset your password</p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">Check Your Email</h2>
              <p className="text-sm text-muted-foreground mb-6">
                If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
              </p>
              <Link href="/portal/login">
                <Button data-testid="button-back-to-login" className="rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-accent" />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-bold text-primary mb-2 block">Email Address</Label>
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
                {forgotPassword.isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                Send Reset Link
              </Button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/portal/login">
            <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer flex items-center justify-center gap-1">
              <ArrowLeft size={14} /> Back to Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResetPasswordForm({ token }: { token: string }) {
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
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await resetPassword.mutateAsync({ token, password });
      setSuccess(true);
    } catch (err: any) {
      const msg = err.message || "";
      try {
        const parsed = JSON.parse(msg.replace(/^\d+:\s*/, ""));
        setError(parsed.message || "Reset failed");
      } catch {
        setError("Failed to reset password. The link may have expired.");
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
          <h1 className="text-3xl font-heading font-extrabold text-primary">Set New Password</h1>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-8">
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">Password Reset</h2>
              <p className="text-sm text-muted-foreground mb-6">Your password has been updated successfully.</p>
              <Link href="/portal/login">
                <Button data-testid="button-login-after-reset" className="rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <KeyRound size={32} className="text-accent" />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-bold text-primary mb-2 block">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  data-testid="input-reset-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="rounded-xl h-12"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-primary mb-2 block">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  data-testid="input-reset-confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
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
                {resetPassword.isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
