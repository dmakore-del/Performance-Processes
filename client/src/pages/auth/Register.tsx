import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useRegister, useVerify2FA } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldCheck, Loader2, ArrowLeft, Building2, CheckCircle2, Users, Briefcase } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function Register() {
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
  const [twoFactorSetup, setTwoFactorSetup] = useState<{ secret: string; otpauthUrl: string } | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const registerMutation = useRegister();
  const verify2FA = useVerify2FA();

  const handleRegister = async (e: React.FormEvent) => {
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
      const result = await registerMutation.mutateAsync({ email, password, companyName, fullName, accountType } as any);
      if (result.pendingApproval) {
        setPendingApproval(true);
        return;
      }
      if (result.twoFactorSetup) {
        setTwoFactorSetup(result.twoFactorSetup);
      }
    } catch (err: any) {
      const msg = err.message || "";
      try {
        const parsed = JSON.parse(msg.replace(/^\d+:\s*/, ""));
        setError(parsed.message || "Registration failed");
      } catch {
        setError("Registration failed. Please try again.");
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
        setError("Invalid 2FA code. Please try again.");
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
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="bg-video"
      >
        <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm"></div>
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
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-200">
              <Users size={32} className="text-orange-500" />
            </div>
            <h1 data-testid="text-pending-title" className="text-2xl font-heading font-extrabold text-primary mb-3">Account Created</h1>
            <p className="text-muted-foreground mb-4">
              Your staff account has been created and is pending administrator approval. 
              You will receive access once approved.
            </p>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-left">
              <p className="text-xs text-blue-700">
                <span className="font-bold block mb-1">What happens next?</span>
                An administrator will review and approve your account. This typically happens within 1 business day.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/portal/login">
              <span className="text-sm font-bold text-accent hover:text-white cursor-pointer">Go to Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (twoFactorSetup) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        {bgVideo}
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link href="/">
              <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
            </Link>
            <h1 className="text-2xl font-heading font-extrabold text-white">Set Up Two-Factor Authentication</h1>
            <p className="text-white/70 mt-2">2FA is required for all accounts</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-accent" />
              </div>
              <p className="text-sm text-muted-foreground">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
            </div>

            <div className="bg-secondary/50 rounded-2xl p-6 mb-6">
              <div className="bg-white rounded-xl p-4 flex items-center justify-center mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(twoFactorSetup.otpauthUrl)}`}
                  alt="2FA QR Code"
                  className="w-48 h-48"
                  data-testid="img-2fa-qr"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Or enter this key manually:</p>
                <code data-testid="text-2fa-secret" className="bg-white px-4 py-2 rounded-lg text-sm font-mono font-bold text-primary border border-border block break-all">
                  {twoFactorSetup.secret}
                </code>
              </div>
            </div>

            <form onSubmit={handleVerify2FA} className="space-y-4">
              <div>
                <Label className="text-sm font-bold text-primary mb-2 block">Verification Code</Label>
                <Input
                  type="text"
                  data-testid="input-setup-2fa-code"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit code"
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
                data-testid="button-activate-2fa"
                disabled={verify2FA.isPending || twoFactorCode.length !== 6}
                className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm"
              >
                {verify2FA.isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : <CheckCircle2 size={18} className="mr-2" />}
                Activate 2FA & Continue
              </Button>
            </form>
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
          <h1 className="text-3xl font-heading font-extrabold text-white">Create Account</h1>
          <p className="text-white/70 mt-2">Register for the Performance Processes portal</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label className="text-sm font-bold text-primary mb-3 block">Account Type</Label>
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
                  <Briefcase size={20} className={accountType === "client" ? "text-accent mb-2" : "text-muted-foreground mb-2"} />
                  <p className="font-bold text-sm text-primary">Client</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Organization seeking consulting services</p>
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
                  <Users size={20} className={accountType === "staff" ? "text-accent mb-2" : "text-muted-foreground mb-2"} />
                  <p className="font-bold text-sm text-primary">Staff</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Team member (requires admin approval)</p>
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="fullName" className="text-sm font-bold text-primary mb-2 block">Full Name</Label>
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
              <Label htmlFor="email" className="text-sm font-bold text-primary mb-2 block">Email Address</Label>
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
                <span className="flex items-center gap-2">
                  <Building2 size={14} /> {accountType === "staff" ? "Department / Team" : "Organization Name"}
                </span>
              </Label>
              <Input
                id="companyName"
                type="text"
                data-testid="input-register-company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={accountType === "staff" ? "e.g. Consulting Team" : "Acme Corp"}
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
                  data-testid="input-register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
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

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-bold text-primary mb-2 block">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                data-testid="input-register-confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                required
                className="rounded-xl h-12"
              />
            </div>

            {error && (
              <div data-testid="text-register-error" className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            {accountType === "staff" ? (
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-200 flex items-start gap-3">
                <Users size={18} className="text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-700">Staff accounts require administrator approval before access is granted.</p>
              </div>
            ) : (
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 flex items-start gap-3">
                <ShieldCheck size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700">Two-factor authentication will be set up after registration for enhanced security.</p>
              </div>
            )}

            <Button
              type="submit"
              data-testid="button-register"
              disabled={registerMutation.isPending}
              className="w-full h-12 rounded-xl bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-sm"
            >
              {registerMutation.isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
              {accountType === "staff" ? "Request Staff Access" : "Create Account"}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-white/70">
            Already have an account?{" "}
            <Link href="/portal/login">
              <span data-testid="link-login" className="text-accent hover:text-white cursor-pointer font-bold">
                Sign In
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
