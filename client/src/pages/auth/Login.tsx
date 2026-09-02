import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLogin } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImg from "@/assets/logo.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await loginMutation.mutateAsync({ email, password });
      setLocation("/portal");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src={logoImg} alt="Performance Processes" className="h-16 w-auto mx-auto mb-4 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-heading font-extrabold text-primary">Client Portal</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your engagement dashboard</p>
        </div>

        <div className="bg-white border border-border shadow-sm p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-bold text-primary mb-2 block">Email Address</Label>
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
              <Label htmlFor="password" className="text-sm font-bold text-primary mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                   autoComplete="current-password"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary"
                >
                  {showPassword ? "Hide" : "Show"}
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
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/portal/register">
                <span data-testid="link-register" className="text-accent hover:text-primary cursor-pointer font-bold">
                Sign Up
              </span>
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link href="/">
             <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer">
               ← Back to website
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
