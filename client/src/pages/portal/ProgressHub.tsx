import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePortalData, usePortalEngagement } from "@/hooks/use-portal";
import type { ActionItem, Milestone } from "@shared/schema";
import Documents from "./Documents";
import Messages from "./Messages";
import { usePortalI18n } from "@/lib/portal-i18n";

export default function ProgressHub() {
  const [section, setSection] = useState("documents");
  const { t } = usePortalI18n();
  const { engagement, engagementId, isLoading } = usePortalEngagement();
  const { data: actions = [] } = usePortalData<ActionItem[]>("actions", engagementId);
  const { data: milestones = [] } = usePortalData<Milestone[]>("milestones", engagementId);
  const openActions = actions.filter((action) => action.status !== "completed");
  const activeMilestones = milestones.filter((milestone) => milestone.status !== "completed").slice(0, 4);

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
