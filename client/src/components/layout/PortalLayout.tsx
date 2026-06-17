import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Map as MapIcon,
  Folder,
  Calendar,
  CheckSquare,
  BarChart3,
  MessageSquare,
  BookOpen,
  CreditCard,
  LogOut,
  Menu,
  X,
  Bell,
  Users,
  ChevronDown,
  Briefcase,
  Inbox,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo.png";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { usePortalEngagement } from "@/hooks/use-portal";

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [engagementDropdownOpen, setEngagementDropdownOpen] = useState(false);
  const { user } = useAuth();
  const logoutMutation = useLogout();
  const { engagement, engagements, setSelectedEngagementId } = usePortalEngagement();

  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";
  const isClient = user?.role === "client";

  const clientNavItems = [
    { label: "Dashboard", href: "/portal", icon: <LayoutDashboard size={18} /> },
    { label: "Roadmap & Milestones", href: "/portal/roadmap", icon: <MapIcon size={18} /> },
    { label: "Deliverables & Docs", href: "/portal/documents", icon: <Folder size={18} /> },
    { label: "Meeting Hub", href: "/portal/meetings", icon: <Calendar size={18} /> },
    { label: "Action Tracker", href: "/portal/actions", icon: <CheckSquare size={18} /> },
    { label: "Performance", href: "/portal/performance", icon: <BarChart3 size={18} /> },
    { label: "Messages", href: "/portal/messages", icon: <MessageSquare size={18} /> },
    { label: "Resource Library", href: "/portal/resources", icon: <BookOpen size={18} /> },
    { label: "Billing & Contracts", href: "/portal/billing", icon: <CreditCard size={18} /> },
  ];

  const staffNavItems = [
    { label: "Dashboard", href: "/portal", icon: <LayoutDashboard size={18} /> },
    { label: "Milestones", href: "/portal/roadmap", icon: <MapIcon size={18} /> },
    { label: "Documents", href: "/portal/documents", icon: <Folder size={18} /> },
    { label: "Meeting Hub", href: "/portal/meetings", icon: <Calendar size={18} /> },
    { label: "Action Items", href: "/portal/actions", icon: <CheckSquare size={18} /> },
    { label: "KPIs & Metrics", href: "/portal/performance", icon: <BarChart3 size={18} /> },
    { label: "Client Messages", href: "/portal/messages", icon: <MessageSquare size={18} /> },
    { label: "Resources", href: "/portal/resources", icon: <BookOpen size={18} /> },
    { label: "Billing & Contracts", href: "/portal/billing", icon: <CreditCard size={18} /> },
    { label: "Leads Tracker", href: "/portal/leads", icon: <Target size={18} /> },
  ];

  const adminNavItems = [
    ...staffNavItems,
    { label: "User Management", href: "/portal/admin/users", icon: <Users size={18} /> },
    { label: "Submissions", href: "/portal/admin/submissions", icon: <Inbox size={18} /> },
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

  const handleSelectEngagement = (id: number) => {
    setSelectedEngagementId(id);
    setEngagementDropdownOpen(false);
  };

  const hasMultipleEngagements = isStaffOrAdmin && engagements.length > 1;

  const portalTitle = isClient
    ? `${user?.companyName || "Client"} Portal`
    : user?.role === "admin"
    ? "Admin Portal"
    : "Staff Portal";

  const portalSubtitle = isClient
    ? "Client engagement"
    : user?.role === "admin"
    ? "Administrator"
    : "Engagement manager";

  const sectionLabel = isStaffOrAdmin ? "Operations" : "Workspace";

  return (
    <div className="min-h-screen flex font-sans bg-[#F4F6FB] relative">
      {/* Ambient editorial backdrop */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(900px 600px at 80% -10%, rgba(42,110,240,0.08), transparent 60%), radial-gradient(700px 500px at -10% 110%, rgba(15,23,42,0.07), transparent 60%)",
        }}
      />

      {/* ───────────────── Desktop sidebar — dark editorial ───────────────── */}
      <aside className="hidden lg:flex flex-col w-72 bg-primary text-white fixed h-full z-20 overflow-hidden">
        {/* Subtle gradient sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(600px 400px at 100% 0%, rgba(42,110,240,0.18), transparent 60%), radial-gradient(500px 350px at 0% 100%, rgba(255,255,255,0.05), transparent 70%)",
          }}
        />
        {/* Right edge hairline */}
        <div className="absolute top-0 right-0 h-full w-px bg-white/10" aria-hidden="true" />

        <div className="relative h-24 flex items-center px-7 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group" data-testid="link-portal-logo">
            <img src={logoImg} alt="Performance Processes" className="h-9 w-auto" />
            <div className="leading-none">
              <p className="text-[9px] font-black uppercase tracking-[0.32em] text-accent mb-1">Performance</p>
              <p className="font-heading font-black text-lg tracking-tight text-white uppercase italic group-hover:text-accent transition-colors">
                Portal
              </p>
            </div>
          </Link>
        </div>

        {isStaffOrAdmin && engagements.length > 0 && (
          <div className="relative px-4 pt-5 pb-3">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/50 px-3 mb-2">
              {user?.role === "admin" ? "Engagement" : "Assigned client"}
            </p>
            <div className="relative">
              <button
                onClick={() => setEngagementDropdownOpen(!engagementDropdownOpen)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-2xl border text-left transition-all",
                  "bg-white/[0.04] border-white/10 hover:border-accent/50 hover:bg-white/[0.07]",
                )}
                data-testid="button-engagement-switcher"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                  <Briefcase size={15} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate" data-testid="text-active-client">
                    {engagement?.clientName || "Select client"}
                  </p>
                  <p className="text-[10px] text-white/50 truncate uppercase tracking-wider">
                    {engagement?.engagementType || "No engagement"}
                  </p>
                </div>
                {hasMultipleEngagements && (
                  <ChevronDown size={14} className={cn("text-white/50 transition-transform", engagementDropdownOpen && "rotate-180")} />
                )}
              </button>
              {engagementDropdownOpen && hasMultipleEngagements && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-2xl shadow-2xl shadow-primary/20 z-30 max-h-72 overflow-y-auto">
                  {engagements.map((eng) => (
                    <button
                      key={eng.id}
                      onClick={() => handleSelectEngagement(eng.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors first:rounded-t-2xl last:rounded-b-2xl",
                        engagement?.id === eng.id && "bg-accent/5",
                      )}
                      data-testid={`button-select-engagement-${eng.id}`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase size={14} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-primary truncate">{eng.clientName}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {eng.engagementType} · {eng.currentPhase || "Active"}
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
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/40 px-7 mb-3">{sectionLabel}</p>
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
                      ? "bg-white/[0.08] text-white"
                      : "text-white/65 hover:bg-white/[0.04] hover:text-white",
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
                  <span
                    className={cn(
                      "transition-colors",
                      isActive ? "text-accent" : "text-white/55 group-hover:text-white/85",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="relative p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-accent/20">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p data-testid="text-user-name" className="text-sm font-bold text-white truncate">
                {user?.fullName || "User"}
              </p>
              <p data-testid="text-user-role" className="text-[10px] text-white/55 truncate uppercase tracking-[0.18em] capitalize">
                {user?.role || ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            data-testid="button-logout"
            className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-[0.2em] text-white/65 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ───────────────── Mobile top bar ───────────────── */}
      <div className="lg:hidden fixed top-0 w-full h-20 bg-primary text-white border-b border-white/10 flex items-center justify-between px-4 z-30">
        <Link href="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Performance Processes" className="h-8 w-auto" />
          <span className="font-heading font-black text-lg tracking-tighter text-white uppercase italic">Portal</span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="text-white/85 relative" aria-label="Notifications">
            <Bell size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full ring-2 ring-primary"></span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-primary text-white z-20 overflow-y-auto">
          {isStaffOrAdmin && engagements.length > 0 && (
            <div className="px-4 pt-5 pb-3 border-b border-white/10">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/50 mb-2">
                {user?.role === "admin" ? "Engagement" : "Assigned client"}
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
                        ? "bg-white/[0.08] border border-accent/40"
                        : "hover:bg-white/[0.04] border border-transparent",
                    )}
                  >
                    <Briefcase size={16} className="text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{eng.clientName}</p>
                      <p className="text-[10px] text-white/55 uppercase tracking-wider">{eng.engagementType}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all",
                    isActive ? "bg-white/[0.08] text-white" : "text-white/70 hover:bg-white/[0.04]",
                  )}
                >
                  <span className={cn(isActive ? "text-accent" : "text-white/55")}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            <div className="h-px bg-white/10 my-4" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </nav>
        </div>
      )}

      {/* ───────────────── Main column ───────────────── */}
      <main className="relative z-[1] flex-1 lg:ml-72 pt-20 lg:pt-0">
        <header className="hidden lg:flex h-24 bg-white/70 backdrop-blur-xl border-b border-border/60 items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="text-[11px] font-black tracking-tighter">PP</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-accent mb-1">{portalSubtitle}</p>
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
            <button
              className="w-11 h-11 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:text-accent hover:border-accent transition-colors relative shadow-sm"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full animate-pulse" />
            </button>
            <Link href="/portal/meetings">
              <Button
                className="rounded-full bg-primary text-white hover:bg-accent h-11 px-6 font-bold uppercase tracking-[0.18em] text-[11px] shadow-lg shadow-primary/15 transition-all gap-2"
                data-testid="button-book-meeting"
              >
                Book meeting
                <ArrowUpRight size={14} />
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
