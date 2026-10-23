import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PerformanceKpi } from "@shared/schema";
import { getPortalService, kpiChange, serviceName } from "@shared/portal-services";
import { usePortalI18n } from "@/lib/portal-i18n";

type KpiForm = {
  name: string; baselineValue: string; currentValue: string; targetValue: string; unit: string;
  direction: string; period: string; status: string; category: string; outcomeNotes: string;
};
const blankForm: KpiForm = {
  name: "", baselineValue: "", currentValue: "", targetValue: "", unit: "", direction: "increase",
  period: "", status: "on-track", category: "", outcomeNotes: "",
};

export default function Performance() {
  const { user } = useAuth();
  const { t, status, fr } = usePortalI18n();
  const { engagement, engagementId, isLoading: engagementLoading } = usePortalEngagement();
  const query = usePortalData<PerformanceKpi[]>("kpis", engagementId);
  const { toast } = useToast();
  const isTeam = user?.role === "staff" || user?.role === "admin";
  const kpis = query.data || [];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<PerformanceKpi | null>(null);
  const [form, setForm] = useState<KpiForm>(blankForm);
  const service = getPortalService(engagement?.serviceCategory);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/kpis`] });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!engagementId) throw new Error("Select a service first.");
      const body = { ...form, baselineValue: form.baselineValue || null, outcomeNotes: form.outcomeNotes || null, engagementId };
      const response = editing
        ? await apiRequest("PATCH", `/api/portal/kpis/${editing.id}`, body)
        : await apiRequest("POST", "/api/portal/kpis", body);
      return response.json();
    },
    onSuccess: () => {
      invalidate();
      setDialogOpen(false);
      setEditing(null);
      setForm(blankForm);
      toast({ title: editing ? t("Report metric updated") : t("Report metric added") });
    },
    onError: (error: Error) => toast({ title: t("Could not save report metric"), description: error.message, variant: "destructive" }),
  });
  const removeMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/portal/kpis/${id}`),
    onSuccess: () => { invalidate(); toast({ title: t("Report metric removed") }); },
    onError: (error: Error) => toast({ title: t("Could not remove report metric"), description: error.message, variant: "destructive" }),
  });
  const openCreate = () => { setEditing(null); setForm(blankForm); setDialogOpen(true); };
  const openEdit = (kpi: PerformanceKpi) => {
    setEditing(kpi);
    setForm({
      name: kpi.name, baselineValue: kpi.baselineValue || "", currentValue: kpi.currentValue,
      targetValue: kpi.targetValue, unit: kpi.unit || "", direction: kpi.direction || "increase",
      period: kpi.period, status: kpi.status, category: kpi.category || "", outcomeNotes: kpi.outcomeNotes || "",
    });
    setDialogOpen(true);
  };
  const chooseTemplate = (name: string) => {
    const template = service?.kpis.find((item) => item.name === name);
    setForm((current) => ({ ...current, name, unit: template?.unit || current.unit, direction: template?.direction || current.direction, category: service?.name || current.category }));
  };
  const validMetricNumber = (value: string) => value.trim() !== "" && Number.isFinite(Number(value));

  return <PortalLayout>
    <div className="space-y-8">
      <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow text-accent">{engagement ? serviceName(engagement, fr ? "fr" : "en") : t("Service reporting")}</p><h1 className="mt-2 text-display text-4xl text-primary md:text-5xl">{t("Reports")}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{t("A clear record of where each measure started, where it is now, and what changed.")}</p></div>
        {isTeam && <Button className="bg-primary text-primary-foreground" onClick={openCreate} disabled={!engagementId}>{t("Add measured result")}</Button>}
      </header>
      {engagementLoading || query.isLoading ? <div className="space-y-4" aria-label={t("Loading reports")}><div className="h-28 animate-pulse bg-secondary" /><div className="h-48 animate-pulse bg-secondary" /></div>
        : query.isError ? <div role="alert" className="border border-red-200 bg-red-50 p-5 text-sm text-red-800">{t("Unable to load report data.")}<Button className="ml-3" variant="outline" onClick={() => query.refetch()}>{t("Retry")}</Button></div>
        : !engagementId ? <div className="portal-empty p-10 text-center text-sm text-muted-foreground">{t("Your consultant will set up your engagement shortly.")}</div>
        : <>
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="border-l-2 border-accent bg-white p-5"><p className="eyebrow text-muted-foreground">{t("Service")}</p><p className="mt-2 font-semibold text-primary">{serviceName(engagement!, fr ? "fr" : "en")}</p></div>
            <div className="border-l-2 border-primary/30 bg-white p-5"><p className="eyebrow text-muted-foreground">{t("Reporting period")}</p><p className="mt-2 font-semibold text-primary">{Array.from(new Set(kpis.map((item) => item.period))).filter(Boolean).join(" · ") || t("No reporting period recorded")}</p></div>
            <div className="border-l-2 border-primary/30 bg-white p-5"><p className="eyebrow text-muted-foreground">{t("Measured indicators")}</p><p className="mt-2 font-heading text-3xl text-primary">{kpis.length}</p></div>
          </section>
          {kpis.length === 0 ? <section className="portal-empty border border-dashed p-10 text-center">
            <p className="eyebrow text-accent">{t("No measured results yet")}</p><h2 className="mt-3 text-2xl font-heading text-primary">{t("Your report starts with real measurements.")}</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{isTeam ? t("Use a suggested metric as a starting point, then enter verified baseline, current, target, and period values.") : t("Your team will add measured baselines and updates here when results are ready to share.")}</p>
            {isTeam && <Button className="mt-5 bg-primary text-primary-foreground" onClick={openCreate}>{t("Add measured result")}</Button>}
          </section> : <section className="space-y-5">
            <div><p className="eyebrow text-accent">{t("Service outcomes")}</p><h2 className="mt-2 text-2xl font-heading text-primary">{t("Before / now / target")}</h2></div>
            {kpis.map((kpi) => {
              const change = kpiChange(kpi.baselineValue, kpi.currentValue, kpi.direction);
              const unit = kpi.unit ? ` ${kpi.unit}` : "";
              const categoryService = getPortalService(kpi.category);
              const categoryLabel = categoryService ? (fr ? categoryService.fr : categoryService.name) : (kpi.category || serviceName(engagement!, fr ? "fr" : "en"));
              return <article key={kpi.id} className="border border-border bg-white">
                <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-start sm:justify-between md:p-6">
                  <div><div className="flex flex-wrap items-center gap-3"><h3 className="text-xl font-heading text-primary">{kpi.name}</h3><span className="border border-border px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{status(kpi.status)}</span></div><p className="mt-2 text-xs text-muted-foreground">{categoryLabel} · {kpi.period} · {kpi.direction === "decrease" ? t("Lower is better") : t("Higher is better")}</p></div>
                  {isTeam && <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => openEdit(kpi)}>{t("Edit metric")}</Button><Button size="sm" variant="ghost" disabled={removeMutation.isPending} onClick={() => {
                    if (window.confirm(t("Remove this measured result? It will no longer appear in the client's reports."))) removeMutation.mutate(kpi.id);
                  }}>{t("Delete")}</Button></div>}
                </div>
                <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  <div className="p-5"><p className="eyebrow text-muted-foreground">{t("Baseline")}</p><p className="mt-2 text-2xl font-heading text-primary">{kpi.baselineValue != null && kpi.baselineValue !== "" ? `${kpi.baselineValue}${unit}` : "—"}</p></div>
                  <div className="bg-secondary/35 p-5"><p className="eyebrow text-muted-foreground">{t("Current")}</p><p className="mt-2 text-2xl font-heading text-primary">{kpi.currentValue}{unit}</p>{change && <p className={`mt-2 text-xs font-semibold ${change.improved ? "text-emerald-800" : change.difference === 0 ? "text-muted-foreground" : "text-rose-800"}`}>{change.difference > 0 ? "+" : ""}{change.difference}{unit} {change.improved ? t("improvement from baseline") : change.difference === 0 ? t("no change from baseline") : t("change from baseline")}{change.percent !== null ? ` · ${change.percent > 0 ? "+" : ""}${change.percent.toFixed(1)}%` : ""}</p>}</div>
                  <div className="p-5"><p className="eyebrow text-muted-foreground">{t("Target")}</p><p className="mt-2 text-2xl font-heading text-primary">{kpi.targetValue}{unit}</p></div>
                </div>
                {kpi.outcomeNotes && <div className="border-t border-border px-5 py-4 md:px-6"><p className="eyebrow text-muted-foreground">{t("Outcome notes")}</p><p className="mt-2 max-w-4xl whitespace-pre-wrap text-sm leading-6 text-primary">{kpi.outcomeNotes}</p></div>}
              </article>;
            })}
          </section>}
        </>}
    </div>
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl"><DialogHeader><DialogTitle>{editing ? t("Edit measured result") : t("Add measured result")}</DialogTitle></DialogHeader>
        <div className="grid gap-4 pt-2 sm:grid-cols-2">
          {service && <div className="sm:col-span-2"><Label>{t("Suggested metric (optional)")}</Label><Select value={service.kpis.some((item) => item.name === form.name) ? form.name : ""} onValueChange={chooseTemplate}><SelectTrigger className="mt-1"><SelectValue placeholder={t("Choose a template or enter a custom metric")} /></SelectTrigger><SelectContent>{service.kpis.map((item) => <SelectItem key={item.name} value={item.name}>{item.name} · {item.unit}</SelectItem>)}</SelectContent></Select><p className="mt-1 text-xs text-muted-foreground">{t("Suggestions are templates only. Enter actual measurements below.")}</p></div>}
          <div className="sm:col-span-2"><Label>{t("Metric name")}</Label><Input className="mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>{t("Baseline")}</Label><Input className="mt-1" value={form.baselineValue} onChange={(e) => setForm({ ...form, baselineValue: e.target.value })} placeholder={t("Actual starting measurement")} /></div>
          <div><Label>{t("Current value")}</Label><Input className="mt-1" value={form.currentValue} onChange={(e) => setForm({ ...form, currentValue: e.target.value })} required /></div>
          <div><Label>{t("Target value")}</Label><Input className="mt-1" value={form.targetValue} onChange={(e) => setForm({ ...form, targetValue: e.target.value })} required /></div>
          <div><Label>{t("Unit")}</Label><Input className="mt-1" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder={t("%, CAD, hours, applications…")} required /></div>
          <div><Label>{t("Direction of improvement")}</Label><Select value={form.direction} onValueChange={(v) => setForm({ ...form, direction: v })}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="increase">{t("Increase is better")}</SelectItem><SelectItem value="decrease">{t("Decrease is better")}</SelectItem></SelectContent></Select></div>
          <div><Label>{t("Reporting period")}</Label><Input className="mt-1" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder={t("e.g. Jan–Mar 2026")} required /></div>
          <div><Label>{t("Status")}</Label><Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="on-track">{t("On track")}</SelectItem><SelectItem value="needs-attention">{t("Needs attention")}</SelectItem><SelectItem value="at-risk">{t("At risk")}</SelectItem></SelectContent></Select></div>
          <div><Label>{t("Service area")}</Label><Input className="mt-1" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder={service?.name || t("Optional")} /></div>
          <div className="sm:col-span-2"><Label>{t("Outcome notes")}</Label><Textarea className="mt-1 min-h-24" value={form.outcomeNotes} onChange={(e) => setForm({ ...form, outcomeNotes: e.target.value })} placeholder={t("Context for the result, what changed, and how it was measured")} /></div>
          <Button className="sm:col-span-2 bg-primary text-primary-foreground" disabled={saveMutation.isPending || !form.name.trim() || !validMetricNumber(form.currentValue) || !validMetricNumber(form.targetValue) || (form.baselineValue.trim() !== "" && !validMetricNumber(form.baselineValue)) || !form.period.trim() || !form.unit.trim()} onClick={() => saveMutation.mutate()}>{saveMutation.isPending ? t("Saving") : t("Save report metric")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  </PortalLayout>;
}
