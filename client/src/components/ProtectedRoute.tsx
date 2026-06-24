import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Loader2, Clock, ShieldAlert } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/portal/login" />;
  }

  if (user?.status === "pending_approval") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-orange-200">
            <Clock size={40} className="text-orange-500" />
          </div>
          <h1 data-testid="text-pending-title" className="text-2xl font-heading font-extrabold text-primary mb-3">Account Pending Approval</h1>
          <p className="text-muted-foreground mb-6">
            Your staff account has been created and is waiting for administrator approval. 
            You will be able to access the portal once your account is approved.
          </p>
          <div className="bg-white rounded-2xl border border-border p-6 text-left">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-primary block mb-1">What happens next?</span>
              An administrator will review your account and approve your access. 
              This typically happens within 1 business day.
            </p>
          </div>
          <a href="/" className="mt-6 inline-block text-sm font-bold text-accent hover:text-primary transition-colors">
            Back to website
          </a>
        </div>
      </div>
    );
  }

  if (user?.status === "suspended") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-200">
            <ShieldAlert size={40} className="text-red-500" />
          </div>
          <h1 data-testid="text-suspended-title" className="text-2xl font-heading font-extrabold text-primary mb-3">Account Suspended</h1>
          <p className="text-muted-foreground mb-6">
            Your account has been suspended. Please contact support for assistance.
          </p>
          <a href="/" className="mt-6 inline-block text-sm font-bold text-accent hover:text-primary transition-colors">
            Back to website
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
