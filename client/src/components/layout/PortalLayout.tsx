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
  Bell
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo.png";

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/portal", icon: <LayoutDashboard size={20} /> },
    { label: "Roadmap & Milestones", href: "/portal/roadmap", icon: <MapIcon size={20} /> },
    { label: "Deliverables & Docs", href: "/portal/documents", icon: <Folder size={20} /> },
    { label: "Meeting Hub", href: "/portal/meetings", icon: <Calendar size={20} /> },
    { label: "Action Tracker", href: "/portal/actions", icon: <CheckSquare size={20} /> },
    { label: "Performance", href: "/portal/performance", icon: <BarChart3 size={20} /> },
    { label: "Messages", href: "/portal/messages", icon: <MessageSquare size={20} /> },
    { label: "Resource Library", href: "/portal/resources", icon: <BookOpen size={20} /> },
    { label: "Billing", href: "/portal/billing", icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-border fixed h-full z-20">
        <div className="h-24 flex items-center px-8 border-b border-border">
          <Link href="/">
            <a className="flex items-center gap-3">
              <img src={logoImg} alt="Performance Processes" className="h-10 w-auto" />
              <span className="font-heading font-black text-xl leading-none tracking-tighter text-primary uppercase italic">
                Portal
              </span>
            </a>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="flex flex-col gap-2 px-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-secondary hover:text-primary"
                  )}>
                    <span className={cn(isActive ? "text-accent" : "text-muted-foreground")}>{item.icon}</span>
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-primary truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Acme Corp</p>
            </div>
          </div>
          <Link href="/">
            <a className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={20} />
              Logout
            </a>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full h-20 bg-white border-b border-border flex items-center justify-between px-4 z-30">
        <Link href="/">
          <a className="flex items-center gap-2">
            <img src={logoImg} alt="Performance Processes" className="h-8 w-auto" />
            <span className="font-heading font-black text-lg tracking-tighter text-primary uppercase italic">Portal</span>
          </a>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-20 overflow-y-auto">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-base transition-all",
                      isActive 
                        ? "bg-primary text-white" 
                        : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    <span className={cn(isActive ? "text-accent" : "")}>{item.icon}</span>
                    {item.label}
                  </a>
                </Link>
              );
            })}
            <div className="h-px bg-border my-4"></div>
            <Link href="/">
              <a className="flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-base text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={20} />
                Logout
              </a>
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 pt-20 lg:pt-0">
        {/* Topbar Desktop */}
        <header className="hidden lg:flex h-24 bg-white/50 backdrop-blur-md border-b border-border items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-heading font-extrabold text-primary">Acme Corp Engagement</h2>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Strategic Planning Phase</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:text-accent hover:border-accent transition-colors relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            <Button className="rounded-full bg-accent text-white hover:bg-primary px-6 font-bold uppercase tracking-wider text-xs">
              Book Meeting
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}