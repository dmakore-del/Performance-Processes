import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ActionItem, Meeting, Milestone, Document } from "@shared/schema";
import { usePortalI18n } from "@/lib/portal-i18n";

export default function Dashboard() {
  const { engagement, engagementId, isLoading } = usePortalEngagement();
  const { user } = useAuth();
  const { t, status } = usePortalI18n();
  const { toast } = useToast();
  const { data: actions } = usePortalData<ActionItem[]>("actions", engagementId);
  const { data: meetings } = usePortalData<Meeting[]>("meetings", engagementId);
  const { data: milestones } = usePortalData<Milestone[]>("milestones", engagementId);
  const { data: documents } = usePortalData<Document[]>("documents", engagementId);

  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusForm, setStatusForm] = useState({
    status: "",
    currentPhase: "",
    completionPercent: 0,
  });

  const updateEngagementMutation = useMutation({
    mutationFn: async (data: typeof statusForm) => {
      const res = await apiRequest("PATCH", `/api/portal/engagements/${engagementId}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/engagements"] });
      toast({ title: t("Project Updated"), description: t("Project status has been updated.") });
      setStatusDialogOpen(false);
    },
    onError: () => {
      toast({ title: t("Error"), description: t("Something went wrong"), variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent animate-pulse">{t("Loading")}</span>
        </div>
      </PortalLayout>
    );
  }

  if (!engagement) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div data-testid="text-no-engagement" className="bg-white p-10 rounded-3xl border border-border shadow-sm text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6 font-black text-xl">
              {isStaffOrAdmin ? "C" : "!"}
            </div>
            <h2 className="text-xl font-bold text-primary mb-3">
              {isStaffOrAdmin ? (t("No Assigned Clients")) : t("No Active Engagement")}
            </h2>
            <p className="text-muted-foreground">
              {isStaffOrAdmin
                ? t("You don't have any client engagements assigned yet. The admin will assign clients to you.")
                : t("Your consultant will set up your engagement shortly.")}
            </p>
          </div>
        </div>
      </PortalLayout>
    );
  }

  const openActions = actions?.filter(a => a.status !== "completed") || [];
  const overdueActions = actions?.filter(a => a.status === "overdue") || [];
  const upcomingMeetings = meetings?.filter(m => m.status === "upcoming") || [];
  const pendingMilestones = milestones?.filter(m => m.status === "pending") || [];
  const recentDocs = documents?.slice(0, 3) || [];

  const statusColor = engagement.status === "active" ? "bg-green-500" : "bg-orange-500";
  const statusLabel = status(engagement.status);

  return (
    <PortalLayout>
      <div className="space-y-8 [&_.rounded-3xl]:rounded-none [&_.rounded-2xl]:rounded-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 data-testid="text-dashboard-title" className="text-3xl md:text-4xl font-heading font-extrabold text-primary">
              {isStaffOrAdmin ? engagement.clientName : t("Welcome back")}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {isStaffOrAdmin
                ? t("Manage this client's engagement, milestones, and deliverables.")
                : t("Here is the latest overview of your consulting engagement.")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-border shadow-sm">
              <div className={`w-3 h-3 rounded-full ${statusColor} animate-pulse`}></div>
              <span data-testid="text-project-status" className="font-bold text-sm uppercase tracking-wider text-primary">
                {t("Status")}: {statusLabel}
              </span>
            </div>
            {isStaffOrAdmin && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-10 px-5 text-xs font-bold uppercase tracking-wider"
                onClick={() => {
                  setStatusForm({
                    status: engagement.status,
                    currentPhase: engagement.currentPhase,
                    completionPercent: engagement.completionPercent,
                  });
                  setStatusDialogOpen(true);
                }}
                data-testid="button-edit-status"
              >
                {t("Edit")}
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{t("Engagement Summary")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {isStaffOrAdmin && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("Client")}</p>
                <p data-testid="text-client-name" className="font-bold text-primary">{engagement.clientName}</p>
              </div>
            )}
            <div>
                <p className="text-xs text-muted-foreground mb-1">{t("Type")}</p>
              <p data-testid="text-engagement-type" className="font-bold text-primary">{engagement.engagementType}</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground mb-1">{t("Start Date")}</p>
              <p data-testid="text-start-date" className="font-bold text-primary">{engagement.startDate}</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground mb-1">{t("Current Phase")}</p>
              <p data-testid="text-current-phase" className="font-bold text-primary">{engagement.currentPhase}</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground mb-1">{t("Next Session")}</p>
              <p data-testid="text-next-session" className="font-bold text-primary">{engagement.nextSession || ","}</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground mb-1">{t("Outstanding Actions")}</p>
              <p data-testid="text-outstanding-actions" className="font-bold text-primary">{openActions.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-1 rounded-full bg-accent mb-4" />
            <h3 data-testid="text-completion-percent" className="text-3xl font-black text-primary mb-1">{engagement.completionPercent}%</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("Overall Completion")}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-1 rounded-full bg-primary mb-4" />
            <h3 data-testid="text-upcoming-milestones" className="text-3xl font-black text-primary mb-1">{pendingMilestones.length}</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("Upcoming Milestones")}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-1 rounded-full bg-orange-500 mb-4" />
            <h3 data-testid="text-overdue-count" className="text-3xl font-black text-primary mb-1">{overdueActions.length}</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("Overdue Items")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-6">{t("Key Milestones")}</h3>
            <div className="space-y-4">
              {milestones?.slice(0, 6).map((ms) => (
                <div key={ms.id} className="flex items-center gap-4">
                  {ms.status === "completed" ? (
                    <div className="w-[14px] h-[14px] rounded-full bg-green-500 flex-shrink-0" />
                  ) : ms.status === "in-progress" ? (
                    <div className="w-[14px] h-[14px] rounded-full bg-accent flex-shrink-0 animate-pulse" />
                  ) : (
                    <div className="w-[14px] h-[14px] rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${ms.status === "completed" ? "text-muted-foreground line-through" : "text-primary"}`}>{ms.title}</p>
                    <p className="text-xs text-muted-foreground">{ms.phase} &bull; {ms.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/portal/roadmap" data-testid="link-view-roadmap" className="mt-6 inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
              {t("View full roadmap")} <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-6">{t("Upcoming Schedule")}</h3>
            <div className="space-y-4">
              {upcomingMeetings.length === 0 && (
                <p className="text-sm text-muted-foreground">{t("No upcoming meetings scheduled.")}</p>
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
            <Link href="/portal/meetings" data-testid="link-view-calendar" className="mt-6 inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
              {t("View full calendar")} <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="border-y border-border bg-secondary p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h3 className="text-2xl font-bold mb-8 relative z-10">{t("Recent Deliverables")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
            {recentDocs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 bg-white hover:bg-white p-4 rounded-2xl transition-colors border border-border cursor-pointer">
                <span className="text-[9px] font-black uppercase tracking-wider text-accent border border-accent/40 px-2 py-1">{t("Document")}</span>
                <div>
                  <p className="font-bold text-sm line-clamp-1">{doc.name}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-70 mt-1">{doc.size}</p>
                </div>
              </div>
            ))}
          </div>
           <Link href="/portal/documents" data-testid="link-view-documents" className="mt-6 inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors relative z-10">
             {t("View all documents")} <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="max-w-md" data-testid="edit-status-dialog">
          <DialogHeader>
            <DialogTitle>{t("Edit Project Status")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>{t("Project Status")}</Label>
              <Select value={statusForm.status} onValueChange={(v) => setStatusForm({ ...statusForm, status: v })}>
                <SelectTrigger data-testid="select-project-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t("Active")}</SelectItem>
                  <SelectItem value="on-hold">{t("On Hold")}</SelectItem>
                  <SelectItem value="completed">{t("Completed")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("Current Phase")}</Label>
              <Input data-testid="input-current-phase" value={statusForm.currentPhase} onChange={(e) => setStatusForm({ ...statusForm, currentPhase: e.target.value })} />
            </div>
            <div>
              <Label>{t("Completion %")}</Label>
              <Input data-testid="input-completion-percent" type="number" min={0} max={100} value={statusForm.completionPercent} onChange={(e) => setStatusForm({ ...statusForm, completionPercent: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-accent text-white hover:bg-primary"
                onClick={() => updateEngagementMutation.mutate(statusForm)}
                disabled={updateEngagementMutation.isPending}
                data-testid="button-save-status"
              >
                {updateEngagementMutation.isPending ? t("Saving...") : t("Save Changes")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
