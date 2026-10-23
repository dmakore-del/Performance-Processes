import { Link, useLocation } from "wouter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { usePortalEngagement } from "@/hooks/use-portal";
import { usePortalI18n } from "@/lib/portal-i18n";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { serviceName } from "@shared/portal-services";

export function PortalLayout({ children }: { children: React.ReactNode }) {
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

  const clientNavItems = [
    { label: t("Company Overview"), href: "/portal" },
    { label: t("Payments"), href: "/portal/payments" },
    { label: t("Progress"), href: "/portal/progress" },
    { label: t("Reports"), href: "/portal/reports" },
  ];

  const navItems = clientNavItems;

  const initials = user?.fullName
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

  const handleLogout = () => {
    logoutMutation.mutate();
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

  const handleSelectEngagement = (id: number) => {
    setSelectedEngagementId(id);
    setEngagementDropdownOpen(false);
  };

  const hasMultipleEngagements = engagements.length > 1;
  const showEngagementSelector = engagements.length > 0;

  const portalTitle = isClient
    ? `${user?.companyName || t("Client")} Portal`
    : user?.role === "admin"
    ? "Performance Processes Portal"
    : t("Staff Portal");

  const portalSubtitle = isClient
    ? t("Client engagement")
    : user?.role === "admin"
    ? t("Administrator")
    : t("Engagement manager");

  const sectionLabel = t("Your workspace");

  return (
    <div className="portal-shell min-h-[100dvh] flex font-sans relative">

      {/* Desktop sidebar */}
       <aside aria-label={t("Your workspace")} className="hidden lg:flex flex-col w-[16rem] bg-white text-primary fixed inset-y-0 left-0 z-20 overflow-visible border-r border-border">
        <div className="h-[5.25rem] flex items-center px-6 border-b border-border">
          <Link href="/portal" className="flex items-center gap-3 group" data-testid="link-portal-logo">
            <img src={logoImg} alt="Performance Processes" className="h-9 w-auto" />
            <div className="leading-none">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-1">{t("Performance")}</p>
              <p className="font-heading text-lg tracking-tight text-primary group-hover:text-accent transition-colors">
                Portal
              </p>
            </div>
          </Link>
        </div>

        {showEngagementSelector && (
          <div className="relative px-4 pt-4 pb-2">
             <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground px-2 mb-2">
              {isClient ? t("Your services") : user?.role === "admin" ? t("Viewing client") : t("Assigned client")}
            </p>
            <div className="relative">
              <button
                onClick={() => setEngagementDropdownOpen(!engagementDropdownOpen)}
                aria-expanded={engagementDropdownOpen}
                aria-haspopup="listbox"
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md border text-left transition-colors",
                   "bg-background border-border hover:border-primary/30 hover:bg-secondary/50",
                )}
                data-testid="button-engagement-switcher"
              >
             <div className="w-8 h-8 rounded-sm bg-accent/35 flex items-center justify-center flex-shrink-0 text-primary text-[10px] font-bold" aria-hidden="true">
                  {(engagement?.clientName || "C").charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-primary truncate" data-testid="text-active-client">
                    {engagement?.clientName || t("Select client")}
                  </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                    {engagement ? serviceName(engagement, fr ? "fr" : "en") : t("No engagement")}
                  </p>
                </div>
                {hasMultipleEngagements && <span className="text-muted-foreground" aria-hidden="true">⌄</span>}
              </button>
              {engagementDropdownOpen && hasMultipleEngagements && (
                  <div role="listbox" aria-label={t("Assigned client")} className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-md shadow-lg z-30 max-h-72 overflow-y-auto">
                  {engagements.map((eng) => (
                    <button
                      key={eng.id}
                      onClick={() => handleSelectEngagement(eng.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-secondary transition-colors",
                        engagement?.id === eng.id && "bg-accent/5",
                      )}
                       data-testid={`button-select-engagement-${eng.id}`}
                       role="option"
                       aria-selected={engagement?.id === eng.id}
                    >
                      <div className="w-7 h-7 rounded-sm bg-primary/5 flex items-center justify-center flex-shrink-0 text-primary text-[10px] font-bold" aria-hidden="true">
                        {eng.clientName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-primary truncate">{eng.clientName}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {serviceName(eng, fr ? "fr" : "en")} · {eng.currentPhase || t("Active")}
                        </p>
                      </div>
                      {engagement?.id === eng.id && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="relative flex-1 overflow-y-auto py-5">
           <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground px-6 mb-2">{sectionLabel}</p>
          <nav className="flex flex-col gap-0.5 px-3">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center px-3 py-2.5 mx-2 rounded-md font-medium text-[13px] transition-colors",
                    isActive
                       ? "bg-accent/25 text-primary"
                       : "text-muted-foreground hover:bg-secondary hover:text-primary",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                >
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

          <div className="relative p-3 border-t border-border">
          {user?.role === "admin" && (
            <Link
              href="/portal/admin/users"
              className="mb-2 flex items-center px-3 py-2.5 rounded-md text-[13px] font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              data-testid="link-admin-users-utility"
            >
              {t("User Management")}
            </Link>
          )}
           <div className="flex items-center gap-3 px-2 py-2">
             <div className="w-9 h-9 rounded-sm bg-accent/35 flex items-center justify-center font-semibold text-primary text-xs" aria-hidden="true">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
               <p data-testid="text-user-name" className="text-sm font-bold text-primary truncate">
                 {user?.fullName || t("User")}
              </p>
                <p data-testid="text-user-role" className="text-[10px] text-muted-foreground truncate capitalize">
                {user?.role || ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            data-testid="button-logout"
              className="mt-1 w-full flex items-center px-3 py-2.5 rounded-md font-medium text-[13px] text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
          >
            {t("Sign out")}
          </button>
        </div>
      </aside>

      {/* ───────────────── Mobile top bar ───────────────── */}
        <div className="lg:hidden fixed top-0 w-full min-h-16 bg-white text-primary border-b border-border flex items-center justify-between px-4 z-30">
        <Link href="/portal" className="flex items-center gap-2">
          <img src={logoImg} alt="Performance Processes" className="h-8 w-auto" />
            <span className="font-heading text-lg tracking-tight text-primary">Portal</span>
        </Link>
        <div className="flex items-center gap-3 min-w-0">
          {isClient && user?.companyName && (
            <span className="max-w-[34vw] truncate text-xs text-muted-foreground" title={user.companyName}>{user.companyName}</span>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="rounded-sm px-2 py-2 text-primary text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={isMobileMenuOpen ? t("Close") : t("Menu")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="portal-mobile-navigation"
          >
            {isMobileMenuOpen ? t("Close") : t("Menu")}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
          <div id="portal-mobile-navigation" className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white text-primary z-20 overflow-y-auto border-b border-border">
          {showEngagementSelector && (
             <div className="px-4 pt-4 pb-3 border-b border-border">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                {isClient ? t("Your services") : user?.role === "admin" ? t("Viewing client") : t("Assigned client")}
              </p>
              <div className="space-y-1">
                {engagements.map((eng) => (
                  <button
                    key={eng.id}
                    onClick={() => {
                      handleSelectEngagement(eng.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors",
                      engagement?.id === eng.id
                         ? "bg-accent/20 border border-accent/50"
                         : "hover:bg-secondary border border-transparent",
                    )}
                  >
                     <span className="w-7 h-7 rounded-sm bg-accent/25 flex items-center justify-center text-primary text-[10px] font-semibold flex-shrink-0" aria-hidden="true">
                      {eng.clientName.charAt(0).toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-primary truncate">{eng.clientName}</p>
                       <p className="text-[10px] text-muted-foreground">{serviceName(eng, fr ? "fr" : "en")}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <nav aria-label={sectionLabel} className="flex flex-col gap-1 p-3">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md font-medium text-sm transition-colors",
                     isActive ? "bg-accent/25 text-primary" : "text-muted-foreground hover:bg-secondary",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
              <div className="h-px bg-border my-3" />
            {user?.role === "admin" && (
              <Link
                href="/portal/admin/users"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-3 rounded-md font-medium text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                data-testid="link-admin-users-utility-mobile"
              >
                {t("User Management")}
              </Link>
            )}
            <div className="mt-2 border-t border-border px-3 pt-3">
              <p className="truncate text-sm font-semibold text-primary">{user?.fullName || t("User")}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email || ""}</p>
            </div>
            <button
              onClick={handleLogout}
               className="flex w-full items-center px-3 py-3 rounded-md font-medium text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
            >
              {t("Sign out")}
            </button>
          </nav>
        </div>
      )}

      {/* ───────────────── Main column ───────────────── */}
       <main className="relative z-[1] flex-1 min-w-0 lg:ml-[16rem] pt-16 lg:pt-0">
        {impersonation && (
          <div className="sticky top-16 lg:top-0 z-40 flex flex-col gap-2 bg-amber-100 px-4 py-3 text-amber-950 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="text-sm">
              <strong>{t("Viewing as")}: {user?.fullName}</strong>
              <span className="ml-2 text-amber-900/80">
                {t("Admin session")}: {impersonation.adminFullName} ({impersonation.adminEmail})
              </span>
              {impersonationError && <p role="alert" className="mt-1 text-xs font-semibold">{impersonationError}</p>}
            </div>
            <button
              type="button"
              onClick={handleStopImpersonating}
              disabled={endingImpersonation}
              className="self-start rounded-md border border-amber-900/30 px-3 py-2 text-xs font-bold hover:bg-amber-200 disabled:opacity-60 sm:self-auto"
            >
              {endingImpersonation ? t("Returning...") : t("Return to admin")}
            </button>
          </div>
        )}
         <header className="hidden lg:flex min-h-[5.25rem] bg-white border-b border-border items-center justify-between px-8 xl:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-5">
            <div>
               <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1">{portalSubtitle}</p>
              <h2
                data-testid="text-portal-title"
                className="text-xl font-heading font-medium text-primary leading-tight tracking-tight"
              >
                {portalTitle}
                {user?.role === "staff" && engagement && (
                  <span className="ml-3 text-base font-bold text-muted-foreground">
                    <span className="text-accent">·</span> {engagement.clientName}
                  </span>
                )}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/portal/meetings" className="border border-border hover:border-primary/40 hover:bg-secondary h-10 px-4 inline-flex items-center justify-center font-semibold text-[11px] transition-colors" data-testid="button-book-meeting">
                {t("Book meeting")}
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-10 max-w-[1440px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
