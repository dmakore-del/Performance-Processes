import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLogin, useVerify2FA } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = useLogin();
  const verify2FA = useVerify2FA();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      if (result.requiresTwoFactor) {
        setShowTwoFactor(true);
      } else {
        setLocation("/portal");
      }
    } catch (err: any) {
      const msg = err.message || "";
      try {
        const parsed = JSON.parse(msg.replace(/^\d+:\s*/, ""));
        setError(parsed.message || "Login failed");
      } catch {
        setError("Invalid email or password");
      }
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await verify2FA.mutateAsync(twoFactorCode);
      setLocation("/portal");
    } catch (err: any) {
      const msg = err.message || "";
      try {
        const parsed = JSON.parse(msg.replace(/^\d+:\s*/, ""));
        setError(parsed.message || "Invalid code");
      } catch {
        setError("Invalid 2FA code");
      }
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="bg-video"
      >
        <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-white">Client Portal</h1>
          <p className="text-white/70 mt-2">Sign in to access your engagement dashboard</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
          {!showTwoFactor ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-bold text-primary mb-2 block">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="input-login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="rounded-xl h-12"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-bold text-primary mb-2 block">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    data-testid="input-login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="rounded-xl h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm"
              >
                {loginMutation.isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                Sign In
              </Button>

              <div className="text-center">
                <Link href="/portal/forgot-password">
                  <span data-testid="link-forgot-password" className="text-sm text-accent hover:text-primary cursor-pointer font-medium">
                    Forgot your password?
                  </span>
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify2FA} className="space-y-5">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={32} className="text-accent" />
                </div>
                <h2 className="text-xl font-bold text-primary">Two-Factor Authentication</h2>
                <p className="text-sm text-muted-foreground mt-2">Enter the 6-digit code from your authenticator app</p>
              </div>

              <div>
                <Input
                  type="text"
                  data-testid="input-2fa-code"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="rounded-xl h-14 text-center text-2xl tracking-[0.5em] font-mono"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                data-testid="button-verify-2fa"
                disabled={verify2FA.isPending || twoFactorCode.length !== 6}
                className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm"
              >
                {verify2FA.isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                Verify
              </Button>

              <button
                type="button"
                onClick={() => { setShowTwoFactor(false); setError(""); setTwoFactorCode(""); }}
                className="w-full text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back to login
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-white/70">
            Don't have an account?{" "}
            <Link href="/portal/register">
              <span data-testid="link-register" className="text-accent hover:text-white cursor-pointer font-bold">
                Sign Up
              </span>
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link href="/">
            <span className="text-xs text-white/50 hover:text-white cursor-pointer flex items-center justify-center gap-1">
              <ArrowLeft size={12} /> Back to website
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
