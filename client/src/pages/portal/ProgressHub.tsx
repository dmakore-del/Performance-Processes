import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePortalData, usePortalEngagement } from "@/hooks/use-portal";
import type { ActionItem, Milestone } from "@shared/schema";
import Documents from "./Documents";
import Messages from "./Messages";
import { usePortalI18n } from "@/lib/portal-i18n";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPortalService } from "@shared/portal-services";

export default function ProgressHub() {
  const [section, setSection] = useState("documents");
  const { t } = usePortalI18n();
  const { user } = useAuth();
  const { toast } = useToast();
  const { engagement, engagementId, isLoading } = usePortalEngagement();
  const { data: actions = [] } = usePortalData<ActionItem[]>("actions", engagementId);
  const milestoneQuery = usePortalData<Milestone[]>("milestones", engagementId);
  const milestones = milestoneQuery.data || [];
  const isTeam = user?.role === "staff" || user?.role === "admin";
  const [newTitle, setNewTitle] = useState("");
  const [newPhase, setNewPhase] = useState("");
  const openActions = actions.filter((action) => action.status !== "completed");
  const activeMilestones = milestones.filter((milestone) => milestone.status !== "completed").slice(0, 4);
  const service = getPortalService(engagement?.serviceCategory);
  const phases = service?.phases || [];
  const invalidateMilestones = () => queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/milestones`] });
  const planMutation = useMutation({
    mutationFn: async () => {
      if (!engagementId) throw new Error("Select a service first.");
      const response = await apiRequest("POST", `/api/portal/engagements/${engagementId}/service-plan`);
      return response.json();
    },
    onSuccess: () => {
      invalidateMilestones();
      queryClient.invalidateQueries({ queryKey: ["/api/portal/engagements"] });
      toast({ title: t("Service plan ready") });
    },
    onError: (error: Error) => toast({ title: t("Could not create service plan"), description: error.message, variant: "destructive" }),
  });
  const createMilestone = useMutation({
    mutationFn: async () => {
      if (!engagementId || !newTitle.trim()) throw new Error("Add a milestone title.");
      const response = await apiRequest("POST", "/api/portal/milestones", {
        engagementId, title: newTitle.trim(), phase: newPhase || engagement?.currentPhase || "Delivery",
        status: "pending", dueDate: null, owner: null, sortOrder: milestones.length,
      });
      return response.json();
    },
    onSuccess: () => {
      invalidateMilestones();
      queryClient.invalidateQueries({ queryKey: ["/api/portal/engagements"] });
      setNewTitle("");
      toast({ title: t("Milestone added") });
    },
    onError: (error: Error) => toast({ title: t("Could not add milestone"), description: error.message, variant: "destructive" }),
  });
  const updateMilestone = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/portal/milestones/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      invalidateMilestones();
      queryClient.invalidateQueries({ queryKey: ["/api/portal/engagements"] });
    },
    onError: (error: Error) => toast({ title: t("Could not update milestone"), description: error.message, variant: "destructive" }),
  });
  const cycleStatus = (value: string) => value === "pending" ? "in-progress" : value === "in-progress" ? "completed" : "pending";

  return (
    <PortalLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary">
            {t("Progress")}
          </h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            {t("Share updates, upload requested documents, and ask your team questions in one place.")}
          </p>
        </header>

        <div className="flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {t("Need clarification or want to send an update? Open the secure chat. Use Documents to upload files requested by your team.")}
          </p>
          <Button
            type="button"
            onClick={() => setSection("chat")}
            className="shrink-0 bg-primary text-white hover:bg-accent hover:text-primary"
          >
            {t("Request information")}
          </Button>
        </div>

        {isLoading ? (
          <div className="py-6 text-sm text-muted-foreground">{t("Loading")}</div>
        ) : engagement ? (
          <section className="grid gap-5 border-b border-border pb-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" aria-label={t("Engagement progress")}>
            <div className="border-l-2 border-accent pl-5">
              <p className="text-xs font-semibold text-muted-foreground">{t("Current phase")}</p>
              <h2 className="mt-1 text-xl font-heading text-primary">{engagement.currentPhase || t("In progress")}</h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden bg-secondary">
                  <div className="h-full bg-accent" style={{ width: `${Math.max(0, Math.min(100, engagement.completionPercent))}%` }} />
                </div>
                <span className="text-sm font-bold text-primary">{engagement.completionPercent}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">{t("Open actions")}</p>
                <p className="mt-1 text-2xl font-heading text-primary">{openActions.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t("Upcoming milestones")}</p>
                <p className="mt-1 text-2xl font-heading text-primary">{activeMilestones.length}</p>
              </div>
              {activeMilestones.length > 0 && (
                <div className="col-span-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  {activeMilestones.map((milestone) => <span key={milestone.id}>{milestone.title}</span>)}
                </div>
              )}
            </div>
          </section>
        ) : (
          <div className="border border-border bg-white p-5 text-sm text-muted-foreground">{t("Your consultant will set up your engagement shortly.")}</div>
        )}

        {engagement && <>
          <section className="border border-border bg-white p-5 md:p-7" aria-label={t("Service delivery phases")}>
            <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="eyebrow text-accent">{t("Delivery plan")}</p><h2 className="mt-1 text-2xl font-heading text-primary">{service?.name || engagement.engagementType}</h2></div>
              {isTeam && service && milestones.length === 0 && <Button variant="outline" onClick={() => {
                if (engagement.completionPercent > 0 && !window.confirm(t("The suggested plan starts with pending milestones and recalculates progress from them. Replace the current manual completion percentage?"))) return;
                planMutation.mutate();
              }} disabled={planMutation.isPending}>{planMutation.isPending ? t("Preparing") : t("Add suggested phases")}</Button>}
            </div>
            {service && <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {phases.map((phase) => {
                const isCurrent = phase === engagement.currentPhase;
                const phaseMilestones = milestones.filter((m) => m.phase === phase);
                const hasDelivered = phaseMilestones.length > 0 && phaseMilestones.every((m) => m.status === "completed");
                return <li key={phase} className={`border-t-2 p-3 ${isCurrent ? "border-accent bg-secondary/50" : hasDelivered ? "border-primary/40" : "border-border"}`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{isCurrent ? t("Current phase") : hasDelivered ? t("Delivered") : t("Upcoming")}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">{phase}</p>
                </li>;
              })}
            </ol>}
            {milestoneQuery.isLoading ? <div className="mt-5 h-20 animate-pulse bg-secondary" /> : milestoneQuery.isError ? <div role="alert" className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-800">{t("Unable to load milestones.")} <button className="ml-2 underline" onClick={() => milestoneQuery.refetch()}>{t("Retry")}</button></div> : <>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {milestones.map((milestone) => <div key={milestone.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div><p className="font-semibold text-primary">{milestone.title}</p><p className="mt-1 text-xs text-muted-foreground">{milestone.phase}{milestone.dueDate ? ` · ${milestone.dueDate}` : ""}{milestone.owner ? ` · ${milestone.owner}` : ""}</p></div>
                  <div className="flex items-center gap-3"><span className="text-xs capitalize text-muted-foreground">{t(milestone.status)}</span>{isTeam && <Button size="sm" variant="outline" onClick={() => updateMilestone.mutate({ id: milestone.id, status: cycleStatus(milestone.status) })} disabled={updateMilestone.isPending}>{milestone.status === "completed" ? t("Reopen") : milestone.status === "pending" ? t("Start") : t("Mark delivered")}</Button>}</div>
                </div>)}
                {milestones.length === 0 && <p className="py-5 text-sm text-muted-foreground">{t("No milestone updates yet. Suggested phases do not imply completed work.")}</p>}
              </div>
              {isTeam && <div className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                <div><Label htmlFor="progress-milestone-title">{t("Add a milestone")}</Label><Input id="progress-milestone-title" className="mt-1" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={t("Specific deliverable or checkpoint")} /></div>
                <div><Label>{t("Phase")}</Label>{phases.length ? <Select value={newPhase || engagement.currentPhase} onValueChange={setNewPhase}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent>{phases.map((phase) => <SelectItem key={phase} value={phase}>{phase}</SelectItem>)}</SelectContent></Select> : <Input className="mt-1" value={newPhase || engagement.currentPhase} onChange={(e) => setNewPhase(e.target.value)} />}</div>
                <Button className="self-end bg-primary text-primary-foreground" onClick={() => createMilestone.mutate()} disabled={createMilestone.isPending || !newTitle.trim()}>{createMilestone.isPending ? t("Adding") : t("Add milestone")}</Button>
              </div>}
            </>}
          </section>
        </>}

        <Tabs value={section} onValueChange={setSection} className="space-y-5">
          <TabsList className="grid h-auto w-full max-w-md grid-cols-2 rounded-none bg-transparent p-0">
            <TabsTrigger
              value="documents"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              {t("Documents & Requests")}
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              {t("Chat with your team")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="documents" className="mt-0">
            <Documents embedded />
          </TabsContent>
          <TabsContent value="chat" className="mt-0">
            <Messages embedded />
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}
