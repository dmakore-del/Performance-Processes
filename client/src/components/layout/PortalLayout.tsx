import { Link, useLocation } from "wouter";
import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { usePortalEngagement } from "@/hooks/use-portal";
import { usePortalI18n } from "@/lib/portal-i18n";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { serviceName } from "@shared/portal-services";

export function PortalLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [engagementDropdownOpen, setEngagementDropdownOpen] = useState(false);
  const { user, impersonation } = useAuth();
  const logoutMutation = useLogout();
  const { engagement, engagements, setSelectedEngagementId } = usePortalEngagement();
  const { t, fr } = usePortalI18n();
  const [endingImpersonation, setEndingImpersonation] = useState(false);
  const [impersonationError, setImpersonationError] = useState("");
  const isClient = user?.role === "client";
  const navItems = [
    { label: t("Company Overview"), href: "/portal" },
    { label: t("Payments"), href: "/portal/payments" },
    { label: t("Progress"), href: "/portal/progress" },
    { label: t("Reports"), href: "/portal/reports" },
  ];
  const initials = user?.fullName?.split(" ").map((name: string) => name[0]).join("").toUpperCase().slice(0, 2) || "??";
  const portalTitle = isClient
    ? `${user?.companyName || t("Client")} Portal`
    : user?.role === "admin" ? "Performance Processes Portal" : t("Staff Portal");
  const portalSubtitle = isClient
    ? t("Client engagement")
    : user?.role === "admin" ? t("Administrator") : t("Engagement manager");
  const hasMultipleEngagements = engagements.length > 1;
  const showEngagementSelector = engagements.length > 0;
  const handleLogout = () => logoutMutation.mutate();
  const handleSelectEngagement = (id: number) => {
    setSelectedEngagementId(id);
    setEngagementDropdownOpen(false);
  };
  const handleStopImpersonating = async () => {
    setEndingImpersonation(true);
    setImpersonationError("");
    try {
      await apiRequest("POST", "/api/auth/impersonate/stop");
      queryClient.clear();
      window.location.assign("/portal/admin/users");
    } catch {
      setImpersonationError(t("Could not return to the admin account. Please refresh and try again."));
      setEndingImpersonation(false);
    }
  };

  return (
    <div className="portal-shell min-h-[100dvh] font-sans">
      {impersonation && (
        <div className="flex flex-col gap-2 border-b border-amber-900/15 bg-amber-100 px-4 py-3 text-amber-950 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="text-sm">
            <strong>{t("Viewing as")}: {user?.fullName}</strong>
            <span className="ml-2 text-amber-900/80">{t("Admin session")}: {impersonation.adminFullName} ({impersonation.adminEmail})</span>
            {impersonationError && <p role="alert" className="mt-1 text-xs font-semibold">{impersonationError}</p>}
          </div>
          <button type="button" onClick={handleStopImpersonating} disabled={endingImpersonation} className="min-h-10 self-start border border-amber-900/30 px-4 text-xs font-bold hover:bg-amber-200 disabled:opacity-60 sm:self-auto">
            {endingImpersonation ? t("Returning...") : t("Return to admin")}
          </button>
        </div>
      )}

      <header className="relative z-30 border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex min-h-[4.75rem] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-10">
          <Link href="/portal" className="flex min-w-0 items-center gap-3" data-testid="link-portal-logo">
            <img src={logoImg} alt="Performance Processes" className="h-8 w-auto brightness-0 invert sm:h-9" />
            <span className="h-8 w-px bg-primary-foreground/25" />
            <span className="font-heading text-xl tracking-tight">Portal</span>
          </Link>
          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <span className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">{portalSubtitle}</span>
            <span className="mx-3 h-1 w-1 rounded-full bg-accent" />
            <span data-testid="text-portal-title" className="truncate text-sm font-semibold">{portalTitle}</span>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/portal/meetings" className="inline-flex min-h-10 items-center border border-primary-foreground/30 px-4 text-xs font-semibold hover:bg-primary-foreground/10" data-testid="button-book-meeting">{t("Book meeting")}</Link>
            {user?.role === "admin" && <Link href="/portal/admin/users" className="inline-flex min-h-10 items-center px-2 text-xs font-semibold text-primary-foreground/75 hover:text-white" data-testid="link-admin-users-utility">{t("User Management")}</Link>}
            {!isClient && <Link href="/portal/leads" className="inline-flex min-h-10 items-center px-2 text-xs font-semibold text-primary-foreground/75 hover:text-white">{fr ? "Demandes" : "Enquiries"}</Link>}
            <span className="grid size-9 shrink-0 place-items-center border border-primary-foreground/30 bg-primary-foreground/10 text-xs font-bold" aria-hidden="true">{initials}</span>
          </div>
          <button type="button" onClick={() => setIsMobileMenuOpen((open) => !open)} className="min-h-10 border border-primary-foreground/35 px-3 text-[10px] font-bold uppercase tracking-[.14em] lg:hidden" aria-label={isMobileMenuOpen ? t("Close") : t("Menu")} aria-expanded={isMobileMenuOpen} aria-controls="portal-mobile-navigation">
            {isMobileMenuOpen ? t("Close") : t("Menu")}
          </button>
        </div>

        <div className="hidden border-t border-primary-foreground/15 lg:block">
          <nav aria-label={t("Your workspace")} className="mx-auto flex max-w-[1600px] items-stretch gap-1 px-7 lg:px-10">
            {navItems.map((item, index) => {
              const active = location === item.href;
              return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`} className={cn("relative flex min-h-[3.25rem] items-center gap-3 px-4 text-xs font-semibold transition-colors", active ? "text-white" : "text-primary-foreground/60 hover:text-white")}>
                <span className="font-mono text-[9px] text-primary-foreground/35">0{index + 1}</span>{item.label}
                {active && <span className="absolute inset-x-4 bottom-0 h-[2px] bg-accent" />}
              </Link>;
            })}
          </nav>
        </div>

        {isMobileMenuOpen && (
          <div id="portal-mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-b border-border bg-background text-foreground shadow-xl lg:hidden">
            <nav aria-label={t("Your workspace")} className="grid grid-cols-2 gap-px border-b border-border bg-border p-px">
              {navItems.map((item, index) => {
                const active = location === item.href;
                return <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} aria-current={active ? "page" : undefined} className={cn("flex min-h-16 flex-col justify-center gap-1 bg-background px-4 text-sm font-semibold", active && "border-l-2 border-accent bg-secondary")}>
                  <span className="font-mono text-[9px] text-muted-foreground">0{index + 1}</span>{item.label}
                </Link>;
              })}
            </nav>
            {showEngagementSelector && <div className="border-b border-border p-4">
              <p className="portal-kicker mb-2">{isClient ? t("Your services") : user?.role === "admin" ? t("Viewing client") : t("Assigned client")}</p>
              <div className="space-y-1">
                {engagements.map((item) => <button key={item.id} type="button" onClick={() => { handleSelectEngagement(item.id); setIsMobileMenuOpen(false); }} className={cn("flex min-h-12 w-full items-center justify-between gap-3 border px-3 text-left", engagement?.id === item.id ? "border-accent bg-accent/15" : "border-border bg-background")}>
                  <span className="min-w-0"><span className="block truncate text-sm font-semibold">{item.clientName}</span><span className="block truncate text-xs text-muted-foreground">{serviceName(item, fr ? "fr" : "en")}</span></span>
                  {engagement?.id === item.id && <span className="text-[9px] font-bold uppercase tracking-wider">{t("Active")}</span>}
                </button>)}
              </div>
            </div>}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <span className="text-sm font-semibold">{user?.fullName || t("User")} <span className="ml-1 text-xs font-normal text-muted-foreground">{user?.email}</span></span>
              <div className="flex gap-2">
                {user?.role === "admin" && <Link href="/portal/admin/users" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex min-h-10 items-center border border-border px-3 text-xs font-semibold" data-testid="link-admin-users-utility-mobile">{t("User Management")}</Link>}
                {!isClient && <Link href="/portal/leads" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex min-h-10 items-center border border-border px-3 text-xs font-semibold">{fr ? "Demandes" : "Enquiries"}</Link>}
                <button type="button" onClick={handleLogout} className="min-h-10 border border-border px-3 text-xs font-semibold">{t("Sign out")}</button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="border-b border-border bg-background">
        <div className="mx-auto flex min-h-[3.75rem] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-10">
          {showEngagementSelector ? (
            <div className="relative min-w-0">
              <p className="portal-kicker mb-0.5">{isClient ? t("Your services") : user?.role === "admin" ? t("Viewing client") : t("Assigned client")}</p>
              <button type="button" onClick={() => setEngagementDropdownOpen((open) => !open)} aria-expanded={engagementDropdownOpen} aria-haspopup="listbox" className="flex max-w-[78vw] items-center gap-2 text-left text-sm font-semibold sm:max-w-none" data-testid="button-engagement-switcher">
                <span className="truncate" data-testid="text-active-client">{engagement?.clientName || t("Select client")}</span>
                <span className="text-accent">{hasMultipleEngagements ? "⌄" : "·"}</span>
                <span className="hidden truncate text-xs font-normal text-muted-foreground sm:inline">{engagement ? serviceName(engagement, fr ? "fr" : "en") : t("No engagement")}</span>
              </button>
              {engagementDropdownOpen && hasMultipleEngagements && <div role="listbox" aria-label={t("Assigned client")} className="absolute left-0 top-full z-50 mt-2 max-h-72 w-[min(22rem,90vw)] overflow-y-auto border border-border bg-background shadow-xl">
                {engagements.map((item) => <button key={item.id} type="button" role="option" aria-selected={engagement?.id === item.id} onClick={() => handleSelectEngagement(item.id)} className="flex w-full items-center justify-between gap-3 border-b border-border px-4 py-3 text-left last:border-0 hover:bg-secondary">
                  <span className="min-w-0"><span className="block truncate text-sm font-semibold">{item.clientName}</span><span className="block truncate text-xs text-muted-foreground">{serviceName(item, fr ? "fr" : "en")} · {item.currentPhase || t("Active")}</span></span>
                  {engagement?.id === item.id && <span className="size-2 shrink-0 rounded-full bg-accent" />}
                </button>)}
              </div>}
            </div>
          ) : <span className="portal-kicker">{t("Your workspace")}</span>}
          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-xs text-muted-foreground">{user?.fullName}</span>
            <button type="button" onClick={handleLogout} className="text-xs font-semibold underline decoration-border underline-offset-4 hover:text-accent">{t("Sign out")}</button>
          </div>
        </div>
      </div>

      <main className="relative mx-auto min-w-0 max-w-[1600px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        {children}
      </main>
    </div>
  );
}
