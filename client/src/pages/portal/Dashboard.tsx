import { PortalLayout } from "@/components/layout/PortalLayout";
import { CheckCircle2, Clock, AlertCircle, FileText, Calendar, ArrowRight, Loader2, Briefcase } from "lucide-react";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import type { ActionItem, Meeting, Milestone, Document } from "@shared/schema";

export default function Dashboard() {
  const { engagement, engagementId, isLoading } = usePortalEngagement();
  const { user } = useAuth();
  const { data: actions } = usePortalData<ActionItem[]>("actions", engagementId);
  const { data: meetings } = usePortalData<Meeting[]>("meetings", engagementId);
  const { data: milestones } = usePortalData<Milestone[]>("milestones", engagementId);
  const { data: documents } = usePortalData<Document[]>("documents", engagementId);

  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-accent" size={40} />
        </div>
      </PortalLayout>
    );
  }

  if (!engagement) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div data-testid="text-no-engagement" className="bg-white p-10 rounded-3xl border border-border shadow-sm text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
              {isStaffOrAdmin ? <Briefcase size={32} /> : <AlertCircle size={32} />}
            </div>
            <h2 className="text-xl font-bold text-primary mb-3">
              {isStaffOrAdmin ? "No Assigned Clients" : "No Active Engagement"}
            </h2>
            <p className="text-muted-foreground">
              {isStaffOrAdmin
                ? "You don't have any client engagements assigned yet. The admin will assign clients to you."
                : "Your consultant will set up your engagement shortly."}
            </p>
          </div>
        </div>
      </PortalLayout>
    );
  }

  const openActions = actions?.filter(a => a.status !== "completed") || [];
  const overdueActions = actions?.filter(a => a.status === "overdue") || [];
  const upcomingMeetings = meetings?.filter(m => m.status === "upcoming") || [];
  const completedMeetings = meetings?.filter(m => m.status === "completed") || [];
  const pendingMilestones = milestones?.filter(m => m.status === "pending") || [];
  const recentDocs = documents?.slice(0, 3) || [];

  const statusColor = engagement.status === "active" ? "bg-green-500" : "bg-orange-500";

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 data-testid="text-dashboard-title" className="text-3xl md:text-4xl font-heading font-extrabold text-primary">
              {isStaffOrAdmin ? engagement.clientName : "Welcome back"}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {isStaffOrAdmin
                ? "Manage this client's engagement, milestones, and deliverables."
                : "Here is the latest overview of your consulting engagement."}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-border shadow-sm">
            <div className={`w-3 h-3 rounded-full ${statusColor} animate-pulse`}></div>
            <span data-testid="text-project-status" className="font-bold text-sm uppercase tracking-wider text-primary">Project Status: On Track</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Engagement Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {isStaffOrAdmin && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Client</p>
                <p data-testid="text-client-name" className="font-bold text-primary">{engagement.clientName}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <p data-testid="text-engagement-type" className="font-bold text-primary">{engagement.engagementType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Start Date</p>
              <p data-testid="text-start-date" className="font-bold text-primary">{engagement.startDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Phase</p>
              <p data-testid="text-current-phase" className="font-bold text-primary">{engagement.currentPhase}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Next Session</p>
              <p data-testid="text-next-session" className="font-bold text-primary">{engagement.nextSession || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Outstanding Actions</p>
              <p data-testid="text-outstanding-actions" className="font-bold text-primary">{openActions.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 data-testid="text-completion-percent" className="text-3xl font-black text-primary mb-1">{engagement.completionPercent}%</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Overall Completion</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <h3 data-testid="text-upcoming-milestones" className="text-3xl font-black text-primary mb-1">{pendingMilestones.length}</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Upcoming Milestones</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 data-testid="text-overdue-count" className="text-3xl font-black text-primary mb-1">{overdueActions.length}</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Overdue Items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-6">Key Milestones</h3>
            <div className="space-y-4">
              {milestones?.slice(0, 6).map((ms) => (
                <div key={ms.id} className="flex items-center gap-4">
                  {ms.status === "completed" ? (
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  ) : ms.status === "in-progress" ? (
                    <Clock size={18} className="text-accent flex-shrink-0 animate-pulse" />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${ms.status === "completed" ? "text-muted-foreground line-through" : "text-primary"}`}>{ms.title}</p>
                    <p className="text-xs text-muted-foreground">{ms.phase} &bull; {ms.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/portal/roadmap">
              <button data-testid="link-view-roadmap" className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
                View full roadmap <ArrowRight size={16} className="ml-2" />
              </button>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-6">Upcoming Schedule</h3>
            <div className="space-y-4">
              {upcomingMeetings.length === 0 && (
                <p className="text-sm text-muted-foreground">No upcoming meetings scheduled.</p>
              )}
              {upcomingMeetings.map((meeting) => {
                const parts = meeting.meetingDate.split(" ");
                const month = parts[0]?.slice(0, 3) || "";
                const day = parts[1]?.replace(",", "") || "";
                return (
                  <div key={meeting.id} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-transparent hover:border-border transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                      <span className="text-[10px] font-bold uppercase text-accent leading-none mb-1">{month}</span>
                      <span className="text-lg font-black text-primary leading-none">{day}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-primary">{meeting.title}</p>
                      <p className="text-sm text-muted-foreground">{meeting.meetingTime} &bull; {meeting.meetingType}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/portal/meetings">
              <button data-testid="link-view-calendar" className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
                View full calendar <ArrowRight size={16} className="ml-2" />
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-primary text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h3 className="text-2xl font-bold mb-8 relative z-10">Recent Deliverables</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
            {recentDocs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors border border-white/10 cursor-pointer">
                <FileText size={24} className="text-accent" />
                <div>
                  <p className="font-bold text-sm line-clamp-1">{doc.name}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-70 mt-1">{doc.size}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/portal/documents">
            <button data-testid="link-view-documents" className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-accent hover:text-white transition-colors relative z-10">
              View all documents <ArrowRight size={16} className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </PortalLayout>
  );
}
