import { Link, useLocation } from "wouter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { usePortalEngagement } from "@/hooks/use-portal";
import { usePortalI18n } from "@/lib/portal-i18n";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [engagementDropdownOpen, setEngagementDropdownOpen] = useState(false);
  const { user, impersonation } = useAuth();
  const logoutMutation = useLogout();
  const { engagement, engagements, setSelectedEngagementId } = usePortalEngagement();
  const { t, role } = usePortalI18n();
  const [endingImpersonation, setEndingImpersonation] = useState(false);
  const [impersonationError, setImpersonationError] = useState("");

  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";
  const isClient = user?.role === "client";

  const clientNavItems = [
    { label: t("Overview"), href: "/portal" },
    { label: t("Launch plan"), href: "/portal/roadmap" },
    { label: t("Deliverables"), href: "/portal/documents" },
    { label: t("Sessions"), href: "/portal/meetings" },
    { label: t("Next actions"), href: "/portal/actions" },
    { label: t("Progress"), href: "/portal/performance" },
    { label: t("Messages"), href: "/portal/messages" },
    { label: t("Resource library"), href: "/portal/resources" },
    { label: t("Billing"), href: "/portal/billing" },
  ];

  const staffNavItems = [
    { label: t("Overview"), href: "/portal" },
    { label: t("Milestones"), href: "/portal/roadmap" },
    { label: t("Documents"), href: "/portal/documents" },
    { label: t("Meeting Hub"), href: "/portal/meetings" },
    { label: t("Action Items"), href: "/portal/actions" },
    { label: t("KPIs & Metrics"), href: "/portal/performance" },
    { label: t("Client Messages"), href: "/portal/messages" },
    { label: t("Resources"), href: "/portal/resources" },
    { label: t("Billing & Contracts"), href: "/portal/billing" },
    { label: t("Leads Tracker"), href: "/portal/leads" },
  ];

  const adminNavItems = [
    ...staffNavItems,
    { label: t("Billing & Retainers"), href: "/portal/admin/billing" },
    { label: t("User Management"), href: "/portal/admin/users" },
    { label: t("Submissions"), href: "/portal/admin/submissions" },
    { label: t("Receipts"), href: "/portal/admin/receipts" },
  ];

  const navItems = user?.role === "admin" ? adminNavItems : isClient ? clientNavItems : staffNavItems;

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

  const hasMultipleEngagements = isStaffOrAdmin && engagements.length > 1;

  const portalTitle = isClient
    ? `${user?.companyName || t("Client")} Portal`
    : user?.role === "admin"
    ? t("Admin Portal")
    : t("Staff Portal");

  const portalSubtitle = isClient
    ? t("Client engagement")
    : user?.role === "admin"
    ? t("Administrator")
    : t("Engagement manager");

  const sectionLabel = isStaffOrAdmin ? t("Operations") : t("Your workspace");

  return (
    <div className="portal-shell min-h-[100dvh] flex font-sans relative">
      {/* Ambient editorial backdrop */}
      <div
         className="pointer-events-none fixed inset-0 z-0 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
             "radial-gradient(900px 600px at 80% -10%, rgba(214,30,110,0.06), transparent 60%), radial-gradient(700px 500px at -10% 110%, rgba(15,23,42,0.025), transparent 60%)",
        }}
      />

      {/* Desktop sidebar */}
       <aside className="hidden lg:flex flex-col w-[17rem] bg-white text-primary fixed h-full z-20 overflow-hidden border-r border-border">
        {/* Subtle gradient sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
               "radial-gradient(600px 400px at 100% 0%, rgba(214,30,110,0.08), transparent 60%), radial-gradient(500px 350px at 0% 100%, rgba(15,23,42,0.025), transparent 70%)",
          }}
        />
        {/* Right edge hairline */}
        <div className="absolute top-0 right-0 h-full w-px bg-border" aria-hidden="true" />

        <div className="relative h-24 flex items-center px-7 border-b border-border">
          <Link href="/portal" className="flex items-center gap-3 group" data-testid="link-portal-logo">
            <img src={logoImg} alt="Performance Processes" className="h-9 w-auto" />
            <div className="leading-none">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("Performance")}</p>
              <p className="font-heading text-xl tracking-tight text-primary group-hover:text-accent transition-colors">
                Portal
              </p>
            </div>
          </Link>
        </div>

        {isStaffOrAdmin && engagements.length > 0 && (
          <div className="relative px-4 pt-5 pb-3">
             <p className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground px-3 mb-2">
              {user?.role === "admin" ? t("Engagement") : t("Assigned client")}
            </p>
            <div className="relative">
              <button
                onClick={() => setEngagementDropdownOpen(!engagementDropdownOpen)}
                aria-expanded={engagementDropdownOpen}
                aria-haspopup="listbox"
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-2xl border text-left transition-all",
                   "bg-background border-border hover:border-accent/50 hover:bg-secondary/40",
                )}
                data-testid="button-engagement-switcher"
              >
             <div className="w-9 h-9 bg-accent/30 flex items-center justify-center flex-shrink-0 text-primary text-[10px] font-black">
                  {(engagement?.clientName || "C").charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold text-primary truncate" data-testid="text-active-client">
                    {engagement?.clientName || t("Select client")}
                  </p>
                   <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider">
                     {engagement?.engagementType || t("No engagement")}
                  </p>
                </div>
                {hasMultipleEngagements && <span className="text-muted-foreground" aria-hidden="true">⌄</span>}
              </button>
              {engagementDropdownOpen && hasMultipleEngagements && (
                 <div role="listbox" aria-label={t("Assigned client")} className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-2xl shadow-2xl shadow-primary/20 z-30 max-h-72 overflow-y-auto">
                  {engagements.map((eng) => (
                    <button
                      key={eng.id}
                      onClick={() => handleSelectEngagement(eng.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors first:rounded-t-2xl last:rounded-b-2xl",
                        engagement?.id === eng.id && "bg-accent/5",
                      )}
                       data-testid={`button-select-engagement-${eng.id}`}
                       role="option"
                       aria-selected={engagement?.id === eng.id}
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary text-[10px] font-black">
                        {eng.clientName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-primary truncate">{eng.clientName}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {eng.engagementType} · {eng.currentPhase || t("Active")}
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

        <div className="relative flex-1 overflow-y-auto py-4">
           <p className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground px-7 mb-3">{sectionLabel}</p>
          <nav className="flex flex-col gap-0.5 px-3">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all",
                    isActive
                       ? "bg-accent/15 text-primary"
                       : "text-muted-foreground hover:bg-secondary hover:text-primary",
                  )}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                >
                  {/* Active accent bar */}
                  <span
                    className={cn(
                      "absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full transition-all",
                      isActive ? "bg-accent opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

          <div className="relative p-3 border-t border-border">
           <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-secondary/50 border border-border">
             <div className="w-10 h-10 bg-accent/30 flex items-center justify-center font-black text-primary text-sm">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
               <p data-testid="text-user-name" className="text-sm font-bold text-primary truncate">
                 {user?.fullName || t("User")}
              </p>
               <p data-testid="text-user-role" className="text-[10px] text-muted-foreground truncate uppercase tracking-[0.18em] capitalize">
                {user?.role || ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            data-testid="button-logout"
             className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
          >
            {t("Sign out")}
          </button>
        </div>
      </aside>

      {/* ───────────────── Mobile top bar ───────────────── */}
        <div className="lg:hidden fixed top-0 w-full h-16 bg-white text-primary border-b border-border flex items-center justify-between px-4 z-30">
        <Link href="/portal" className="flex items-center gap-2">
          <img src={logoImg} alt="Performance Processes" className="h-8 w-auto" />
            <span className="font-heading text-xl tracking-tight text-primary">Portal</span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="text-primary text-xs font-bold uppercase tracking-[0.18em]"
            aria-label={isMobileMenuOpen ? t("Close") : t("Menu")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="portal-mobile-navigation"
          >
            {isMobileMenuOpen ? t("Close") : t("Menu")}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
         <div id="portal-mobile-navigation" className="lg:hidden fixed inset-16 bottom-0 bg-white text-primary z-20 overflow-y-auto">
          {isStaffOrAdmin && engagements.length > 0 && (
            <div className="px-4 pt-5 pb-3 border-b border-white/10">
               <p className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground mb-2">
                {user?.role === "admin" ? t("Engagement") : t("Assigned client")}
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
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors",
                      engagement?.id === eng.id
                         ? "bg-accent/15 border border-accent/40"
                         : "hover:bg-secondary border border-transparent",
                    )}
                  >
                    <span className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center text-accent text-[10px] font-black flex-shrink-0">
                      {eng.clientName.charAt(0).toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold text-primary truncate">{eng.clientName}</p>
                     <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{eng.engagementType}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <nav aria-label={sectionLabel} className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all",
                     isActive ? "bg-accent/15 text-primary" : "text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
             <div className="h-px bg-border my-4" />
            <button
              onClick={handleLogout}
               className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
            >
              {t("Sign out")}
            </button>
          </nav>
        </div>
      )}

      {/* ───────────────── Main column ───────────────── */}
       <main className="relative z-[1] flex-1 lg:ml-[17rem] pt-16 lg:pt-0">
        {impersonation && (
          <div className="sticky top-0 z-40 flex flex-col gap-2 bg-amber-100 px-4 py-3 text-amber-950 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
        <header className="hidden lg:flex h-24 bg-white/70 backdrop-blur-xl border-b border-border/60 items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-5">
            <div>
               <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1">{portalSubtitle}</p>
              <h2
                data-testid="text-portal-title"
                className="text-2xl font-heading font-extrabold text-primary leading-none tracking-tight"
              >
                {portalTitle}
                {isStaffOrAdmin && engagement && (
                  <span className="ml-3 text-base font-bold text-muted-foreground">
                    <span className="text-accent">·</span> {engagement.clientName}
                  </span>
                )}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/portal/meetings" className="bg-primary text-white hover:bg-accent hover:text-primary h-11 px-5 inline-flex items-center justify-center font-bold uppercase tracking-[0.12em] text-[10px] transition-all" data-testid="button-book-meeting">
                {t("Book meeting")}
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-10 max-w-[1440px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
