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
import { ServiceAssignment } from "@/components/portal/ServiceAssignment";
import { serviceName } from "@shared/portal-services";
import { FundingServices } from "@/components/portal/FundingServices";
import { isFundingService } from "@shared/funding";

export default function Dashboard() {
  const { engagement, engagements, engagementId, isLoading, setSelectedEngagementId } = usePortalEngagement();
  const { user } = useAuth();
  const { t, status, fr } = usePortalI18n();
  const { toast } = useToast();
  const { data: actions } = usePortalData<ActionItem[]>("actions", engagementId);
  const { data: meetings } = usePortalData<Meeting[]>("meetings", engagementId);
  const { data: milestones } = usePortalData<Milestone[]>("milestones", engagementId);
  const { data: documents } = usePortalData<Document[]>("documents", engagementId);
  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";
  const isAdmin = user?.role === "admin";
  const companyServices = engagement ? engagements.filter((item) => engagement.clientUserId
    ? item.clientUserId === engagement.clientUserId
    : item.id === engagement.id) : engagements;
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusForm, setStatusForm] = useState({ status: "", currentPhase: "", completionPercent: 0 });
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
    onError: () => toast({ title: t("Error"), description: t("Something went wrong"), variant: "destructive" }),
  });

  if (isLoading) return <PortalLayout>
    <div aria-busy="true" className="space-y-5">
      <div className="h-56 animate-pulse bg-secondary" />
      <div className="grid gap-4 md:grid-cols-3"><div className="h-24 animate-pulse bg-secondary" /><div className="h-24 animate-pulse bg-secondary" /><div className="h-24 animate-pulse bg-secondary" /></div>
      <div className="h-64 animate-pulse border border-border bg-background" />
    </div>
  </PortalLayout>;

  if (!engagement) return <PortalLayout>
    <div className="flex min-h-[56vh] items-center justify-center">
      <section data-testid="text-no-engagement" className="w-full max-w-xl border border-border bg-background">
        <div className="border-b border-border px-6 py-5">
          <p className="portal-kicker">{t("Your workspace")}</p>
          <h1 className="mt-3 text-3xl text-primary">{isStaffOrAdmin ? t("No Assigned Clients") : t("No Active Engagement")}</h1>
        </div>
        <div className="px-6 py-6">
          <p className="max-w-lg text-sm leading-6 text-muted-foreground">{isStaffOrAdmin
            ? t("You don't have any client engagements assigned yet. The admin will assign clients to you.")
            : t("Your consultant will set up your engagement shortly.")}</p>
          {isAdmin && <div className="mt-6 flex flex-wrap gap-3"><ServiceAssignment trigger={<Button>{t("Assign first service")}</Button>} /><Link href="/portal/admin/users" className="inline-flex min-h-10 items-center border border-border px-4 text-sm font-semibold">{t("Open client management")}</Link></div>}
        </div>
      </section>
    </div>
  </PortalLayout>;

  const openActions = actions?.filter((action) => action.status !== "completed") || [];
  const overdueActions = actions?.filter((action) => action.status === "overdue") || [];
  const upcomingMeetings = meetings?.filter((meeting) => meeting.status === "upcoming") || [];
  const pendingMilestones = milestones?.filter((milestone) => milestone.status === "pending") || [];
  const recentDocs = documents?.slice(0, 3) || [];
  const statusLabel = status(engagement.status);
  const completion = Math.max(0, Math.min(100, Number(engagement.completionPercent) || 0));
  const companyTitle = isAdmin ? (user?.companyName || "Performance Processes") : isStaffOrAdmin ? engagement.clientName : (user?.companyName || engagement.clientName);

  return <PortalLayout>
    <div className="space-y-7">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="px-6 py-7 sm:px-9 sm:py-9 lg:px-11 lg:py-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="portal-kicker text-primary-foreground/55">{t("Company Overview")}</p>
              <span className="h-px w-8 bg-accent" />
              <span className="text-[10px] font-semibold uppercase tracking-[.13em] text-primary-foreground/60">{t("Engagement")}</span>
            </div>
            <h1 data-testid="text-dashboard-title" className="mt-5 max-w-3xl text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">{companyTitle}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/65 sm:text-base">
              {isStaffOrAdmin ? t("Manage this client's engagement, milestones, and deliverables.") : t("A summary of your company, assigned services, and current delivery.")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex min-h-9 items-center gap-2 border border-primary-foreground/30 px-3 text-[10px] font-bold uppercase tracking-[.1em]" data-testid="text-project-status">
                <span className={`size-2 rounded-full ${engagement.status === "active" ? "bg-emerald-300" : engagement.status === "on-hold" ? "bg-amber-300" : "bg-accent"}`} />
                {t("Status")}: {statusLabel}
              </span>
              <span className="text-xs text-primary-foreground/55">{engagement.currentPhase}</span>
              {isStaffOrAdmin && <Button variant="outline" size="sm" className="h-9 border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-white" onClick={() => {
                setStatusForm({ status: engagement.status, currentPhase: engagement.currentPhase, completionPercent: engagement.completionPercent });
                setStatusDialogOpen(true);
              }} data-testid="button-edit-status">{t("Edit")}</Button>}
              {isAdmin && <ServiceAssignment trigger={<Button variant="outline" size="sm" className="h-9 border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-white">{t("Assign service")}</Button>} />}
            </div>
          </div>
          <div className="flex flex-col justify-between border-t border-primary-foreground/15 bg-primary-foreground/[.045] px-6 py-6 sm:px-9 lg:border-l lg:border-t-0 lg:px-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="portal-kicker text-primary-foreground/55">{t("Overall Completion")}</p>
                <p data-testid="text-completion-percent" className="mt-3 font-heading text-6xl leading-none text-white">{engagement.completionPercent}<span className="text-3xl text-accent">%</span></p>
              </div>
              <span className="pt-1 font-mono text-[10px] text-primary-foreground/40">{t("In progress")}</span>
            </div>
            <div className="mt-7">
              <div className="h-[3px] bg-primary-foreground/20"><div className="h-full bg-accent transition-[width] duration-500" style={{ width: `${completion}%` }} /></div>
              <p className="mt-3 text-xs text-primary-foreground/55">{engagement.currentPhase}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={t("Engagement Summary")} className="grid border-y border-border bg-background sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: isStaffOrAdmin ? (isAdmin ? t("Selected client") : t("Client")) : t("Company"), value: isStaffOrAdmin ? engagement.clientName : (user?.companyName || engagement.clientName), testId: isStaffOrAdmin ? "text-client-name" : "text-company-name" },
          { label: t("Type"), value: engagement.engagementType, testId: "text-engagement-type" },
          { label: t("Start Date"), value: engagement.startDate, testId: "text-start-date" },
          { label: t("Current Phase"), value: engagement.currentPhase, testId: "text-current-phase" },
          { label: t("Next Session"), value: engagement.nextSession || "—", testId: "text-next-session" },
        ].map((item, index) => <div key={item.label} className={`min-w-0 border-b border-border px-4 py-4 sm:px-5 lg:border-b-0 ${index > 0 ? "lg:border-l" : ""}`}>
          <p className="portal-kicker">{item.label}</p>
          <p data-testid={item.testId} className="mt-2 truncate text-sm font-semibold text-primary">{item.value}</p>
        </div>)}
      </section>

      <section aria-label={t("Company services")} className="border border-border bg-background">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="portal-kicker">{t("Company services")}</p>
            <h2 className="mt-1 font-heading text-2xl text-primary">{engagement.clientName}</h2>
            {isAdmin && <p className="mt-1 text-xs text-muted-foreground">{t("Performance Processes workspace · selected client")}</p>}
          </div>
          {isAdmin && <Link href="/portal/admin/users" className="text-xs font-semibold underline decoration-accent decoration-2 underline-offset-4" data-testid="link-manage-client-services">{t("Manage clients and services")}</Link>}
        </div>
        {companyServices.length ? <div className="divide-y divide-border">
          {companyServices.map((item) => <div key={item.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-6">
            <button type="button" onClick={() => setSelectedEngagementId(item.id)} className="min-w-0 text-left" aria-label={`${t("Service")}: ${serviceName(item, fr ? "fr" : "en")}`}>
              <span className="block truncate text-sm font-semibold text-primary">{serviceName(item, fr ? "fr" : "en")}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{item.currentPhase} · {item.startDate}</span>
            </button>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="min-w-28">
                <div className="flex justify-between gap-3 text-[10px]"><span className="text-muted-foreground">{status(item.status)}</span><span className="font-semibold">{item.completionPercent}%</span></div>
                <div className="mt-1.5 h-[2px] bg-secondary"><div className="h-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, Number(item.completionPercent) || 0))}%` }} /></div>
              </div>
              {isAdmin && <ServiceAssignment engagement={item} />}
            </div>
          </div>)}
        </div> : <div className="portal-empty m-4 p-6 text-sm text-muted-foreground">{t("No services have been assigned to this company yet.")}</div>}
      </section>

      {isFundingService(engagement.serviceCategory) && <FundingServices key={engagement.id} engagementId={engagement.id} compact />}

      <section className="grid border-y border-border bg-background sm:grid-cols-3">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6 sm:last:border-b-0">
          <div><p className="portal-kicker">{t("Outstanding Actions")}</p><p data-testid="text-outstanding-actions" className="mt-2 font-heading text-4xl">{openActions.length}</p></div>
          <span className="text-right text-xs text-muted-foreground">{t("Open actions")}</span>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:border-l sm:px-6 sm:last:border-b-0">
          <div><p className="portal-kicker">{t("Upcoming Milestones")}</p><p data-testid="text-upcoming-milestones" className="mt-2 font-heading text-4xl">{pendingMilestones.length}</p></div>
          <Link href="/portal/progress" className="text-right text-xs font-semibold underline decoration-border underline-offset-4">{t("Progress")}</Link>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5 sm:border-l sm:px-6">
          <div><p className="portal-kicker">{t("Overdue Items")}</p><p data-testid="text-overdue-count" className="mt-2 font-heading text-4xl">{overdueActions.length}</p></div>
          <Link href="/portal/progress" className="text-right text-xs font-semibold underline decoration-border underline-offset-4">{t("Open actions")}</Link>
        </div>
      </section>

      <div className="grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
        <section className="border border-border bg-background">
          <div className="flex items-end justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div><p className="portal-kicker">{t("Delivery plan")}</p><h2 className="mt-1 font-heading text-2xl">{t("Key Milestones")}</h2></div>
            {isStaffOrAdmin && <Link href="/portal/roadmap" data-testid="link-view-roadmap" className="text-xs font-semibold underline decoration-accent decoration-2 underline-offset-4">{t("View full roadmap")}</Link>}
          </div>
          <div className="divide-y divide-border px-5 sm:px-6">
            {milestones?.slice(0, 6).map((milestone) => <div key={milestone.id} className="flex items-start gap-4 py-4">
              <span aria-hidden="true" className={`mt-1.5 size-2.5 shrink-0 border ${milestone.status === "completed" ? "border-primary bg-primary" : milestone.status === "in-progress" ? "border-accent bg-accent" : "border-border bg-background"}`} />
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${milestone.status === "completed" ? "text-muted-foreground" : "text-primary"}`}>{milestone.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{milestone.phase} · {milestone.dueDate}</p>
              </div>
              <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{status(milestone.status)}</span>
            </div>)}
            {!milestones?.length && <p className="py-6 text-sm text-muted-foreground">{t("No milestones found for this engagement.")}</p>}
          </div>
        </section>

        <section className="border border-border bg-background">
          <div className="flex items-end justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div><p className="portal-kicker">{t("Next Session")}</p><h2 className="mt-1 font-heading text-2xl">{t("Upcoming Schedule")}</h2></div>
            <Link href="/portal/meetings" data-testid="link-view-calendar" className="text-xs font-semibold underline decoration-accent decoration-2 underline-offset-4">{isStaffOrAdmin ? t("View full calendar") : t("Book meeting")}</Link>
          </div>
          <div className="divide-y divide-border px-5 sm:px-6">
            {upcomingMeetings.length === 0 && <p className="py-6 text-sm text-muted-foreground">{t("No upcoming meetings scheduled.")}</p>}
            {upcomingMeetings.map((meeting) => {
              const parts = meeting.meetingDate.split(" ");
              const month = parts[0]?.slice(0, 3) || "";
              const day = parts[1]?.replace(",", "") || "";
              return <article key={meeting.id} className="flex items-center gap-4 py-4">
                <div className="flex w-12 shrink-0 flex-col border-r border-border pr-3 text-center">
                  <span className="font-mono text-[9px] font-semibold uppercase text-accent">{month}</span>
                  <span className="font-heading text-2xl leading-none">{day}</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{meeting.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{meeting.meetingTime} · {meeting.meetingType}</p>
                </div>
              </article>;
            })}
          </div>
        </section>
      </div>

      <section className="border border-border bg-secondary/55">
        <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div><p className="portal-kicker">{t("Documents")}</p><h2 className="mt-1 font-heading text-2xl">{t("Recent Deliverables")}</h2></div>
          <Link href={isStaffOrAdmin ? "/portal/documents" : "/portal/progress"} data-testid="link-view-documents" className="text-xs font-semibold underline decoration-accent decoration-2 underline-offset-4">{isStaffOrAdmin ? t("View all documents") : t("Open progress workspace")}</Link>
        </div>
        {recentDocs.length ? <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {recentDocs.map((doc) => <div key={doc.id} className="flex min-w-0 items-center gap-3 px-5 py-4 sm:px-6">
            <span className="shrink-0 border border-accent/50 px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-primary">{t("Document")}</span>
            <div className="min-w-0"><p className="truncate text-sm font-semibold">{doc.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{doc.size}</p></div>
          </div>)}
        </div> : <p className="px-5 py-6 text-sm text-muted-foreground">{t("No documents found.")}</p>}
      </section>
    </div>

    <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
      <DialogContent className="max-w-md" data-testid="edit-status-dialog">
        <DialogHeader><DialogTitle>{t("Edit Project Status")}</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-2">
          <div><Label>{t("Project Status")}</Label><Select value={statusForm.status} onValueChange={(value) => setStatusForm({ ...statusForm, status: value })}><SelectTrigger data-testid="select-project-status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">{t("Active")}</SelectItem><SelectItem value="on-hold">{t("On Hold")}</SelectItem><SelectItem value="completed">{t("Completed")}</SelectItem></SelectContent></Select></div>
          <div><Label>{t("Current Phase")}</Label><Input data-testid="input-current-phase" value={statusForm.currentPhase} onChange={(event) => setStatusForm({ ...statusForm, currentPhase: event.target.value })} /></div>
          <div><Label>{t("Completion %")}</Label><Input data-testid="input-completion-percent" type="number" min={0} max={100} value={statusForm.completionPercent} onChange={(event) => setStatusForm({ ...statusForm, completionPercent: parseInt(event.target.value, 10) || 0 })} /></div>
          <div className="flex justify-end"><Button className="bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => updateEngagementMutation.mutate(statusForm)} disabled={updateEngagementMutation.isPending} data-testid="button-save-status">{updateEngagementMutation.isPending ? t("Saving...") : t("Save Changes")}</Button></div>
        </div>
      </DialogContent>
    </Dialog>
  </PortalLayout>;
}
