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
  Briefcase
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
    { label: "Dashboard", href: "/portal", icon: <LayoutDashboard size={20} /> },
    { label: "Roadmap & Milestones", href: "/portal/roadmap", icon: <MapIcon size={20} /> },
    { label: "Deliverables & Docs", href: "/portal/documents", icon: <Folder size={20} /> },
    { label: "Meeting Hub", href: "/portal/meetings", icon: <Calendar size={20} /> },
    { label: "Action Tracker", href: "/portal/actions", icon: <CheckSquare size={20} /> },
    { label: "Performance", href: "/portal/performance", icon: <BarChart3 size={20} /> },
    { label: "Messages", href: "/portal/messages", icon: <MessageSquare size={20} /> },
    { label: "Resource Library", href: "/portal/resources", icon: <BookOpen size={20} /> },
    { label: "Billing & Contracts", href: "/portal/billing", icon: <CreditCard size={20} /> },
  ];

  const staffNavItems = [
    { label: "Dashboard", href: "/portal", icon: <LayoutDashboard size={20} /> },
    { label: "Milestones", href: "/portal/roadmap", icon: <MapIcon size={20} /> },
    { label: "Documents", href: "/portal/documents", icon: <Folder size={20} /> },
    { label: "Meeting Hub", href: "/portal/meetings", icon: <Calendar size={20} /> },
    { label: "Action Items", href: "/portal/actions", icon: <CheckSquare size={20} /> },
    { label: "KPIs & Metrics", href: "/portal/performance", icon: <BarChart3 size={20} /> },
    { label: "Client Messages", href: "/portal/messages", icon: <MessageSquare size={20} /> },
    { label: "Resources", href: "/portal/resources", icon: <BookOpen size={20} /> },
    { label: "Billing & Contracts", href: "/portal/billing", icon: <CreditCard size={20} /> },
  ];

  const adminNavItems = [
    ...staffNavItems,
    { label: "User Management", href: "/portal/admin/users", icon: <Users size={20} /> },
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
    ? "Client Engagement"
    : user?.role === "admin"
    ? "Administrator"
    : "Engagement Manager";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-border fixed h-full z-20">
        <div className="h-24 flex items-center px-8 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Performance Processes" className="h-10 w-auto" />
            <span className="font-heading font-black text-xl leading-none tracking-tighter text-primary uppercase italic">
              Portal
            </span>
          </Link>
        </div>

        {isStaffOrAdmin && engagements.length > 0 && (
          <div className="px-4 pt-4 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 mb-2">
              {user?.role === "admin" ? "Engagement" : "Assigned Client"}
            </p>
            <div className="relative">
              <button
                onClick={() => setEngagementDropdownOpen(!engagementDropdownOpen)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary border border-border hover:border-primary transition-colors text-left"
                data-testid="button-engagement-switcher"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-primary truncate" data-testid="text-active-client">
                    {engagement?.clientName || "Select Client"}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {engagement?.engagementType || "No engagement"}
                  </p>
                </div>
                {hasMultipleEngagements && (
                  <ChevronDown size={16} className={cn("text-muted-foreground transition-transform", engagementDropdownOpen && "rotate-180")} />
                )}
              </button>
              {engagementDropdownOpen && hasMultipleEngagements && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto">
                  {engagements.map((eng) => (
                    <button
                      key={eng.id}
                      onClick={() => handleSelectEngagement(eng.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors first:rounded-t-xl last:rounded-b-xl",
                        engagement?.id === eng.id && "bg-primary/5"
                      )}
                      data-testid={`button-select-engagement-${eng.id}`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase size={14} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-primary truncate">{eng.clientName}</p>
                        <p className="text-[10px] text-muted-foreground">{eng.engagementType} • {eng.currentPhase || "Active"}</p>
                      </div>
                      {engagement?.id === eng.id && (
                        <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-4">
          {isStaffOrAdmin && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-8 mb-2">Management</p>
          )}
          <nav className="flex flex-col gap-1 px-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href} className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-primary"
                )}>
                  <span className={cn(isActive ? "text-accent" : "text-muted-foreground")}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{initials}</div>
            <div className="flex-1 min-w-0">
              <p data-testid="text-user-name" className="text-sm font-bold text-primary truncate">{user?.fullName || "User"}</p>
              <p data-testid="text-user-role" className="text-xs text-muted-foreground truncate capitalize">{user?.role || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            data-testid="button-logout"
            className="mt-2 w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 w-full h-20 bg-white border-b border-border flex items-center justify-between px-4 z-30">
        <Link href="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Performance Processes" className="h-8 w-auto" />
          <span className="font-heading font-black text-lg tracking-tighter text-primary uppercase italic">Portal</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-primary relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-primary">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-20 overflow-y-auto">
          {isStaffOrAdmin && engagements.length > 0 && (
            <div className="px-4 pt-4 pb-2 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                {user?.role === "admin" ? "Engagement" : "Assigned Client"}
              </p>
              <div className="space-y-1">
                {engagements.map((eng) => (
                  <button
                    key={eng.id}
                    onClick={() => { handleSelectEngagement(eng.id); setIsMobileMenuOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors",
                      engagement?.id === eng.id ? "bg-primary/5 border border-primary/20" : "hover:bg-secondary"
                    )}
                  >
                    <Briefcase size={16} className="text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-primary truncate">{eng.clientName}</p>
                      <p className="text-[10px] text-muted-foreground">{eng.engagementType}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn(
                  "flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-base transition-all",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:bg-secondary"
                )}>
                  <span className={cn(isActive ? "text-accent" : "")}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            <div className="h-px bg-border my-4"></div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-base text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </div>
      )}

      <main className="flex-1 lg:ml-72 pt-20 lg:pt-0">
        <header className="hidden lg:flex h-24 bg-white/50 backdrop-blur-md border-b border-border items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 data-testid="text-portal-title" className="text-2xl font-heading font-extrabold text-primary">{portalTitle}</h2>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {portalSubtitle}
              {isStaffOrAdmin && engagement && (
                <span className="text-accent ml-2">• {engagement.clientName}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:text-accent hover:border-accent transition-colors relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            <Link href="/portal/meetings">
              <Button className="rounded-full bg-accent text-white hover:bg-primary px-6 font-bold uppercase tracking-wider text-xs">
                Book Meeting
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
