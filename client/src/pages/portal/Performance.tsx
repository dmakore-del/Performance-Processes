import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { TrendingUp, Target, Loader2, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PerformanceKpi } from "@shared/schema";

function calculateOverallHealth(kpis: PerformanceKpi[]): { label: string; color: string } {
  if (kpis.length === 0) return { label: "No Data", color: "text-muted-foreground" };
  const atRiskCount = kpis.filter(k => k.status === "at-risk").length;
  const needsAttentionCount = kpis.filter(k => k.status === "needs-attention").length;
  if (atRiskCount > kpis.length / 3) return { label: "At Risk", color: "text-red-500" };
  if (needsAttentionCount + atRiskCount > kpis.length / 2) return { label: "Needs Attention", color: "text-orange-500" };
  return { label: "Good", color: "text-green-500" };
}

export default function Performance() {
  const { user } = useAuth();
  const { engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: kpis, isLoading: kpisLoading } = usePortalData<PerformanceKpi[]>("kpis", engagementId);

  const isLoading = engLoading || kpisLoading;
  const kpiList = kpis ?? [];
  const health = calculateOverallHealth(kpiList);
  const period = kpiList.length > 0 ? kpiList[0].period : "—";
  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  const categories = Array.from(new Set(kpiList.map(k => k.category).filter(Boolean)));

  const chartData = kpiList.map(k => {
    const current = parseFloat(k.currentValue) || 0;
    const target = parseFloat(k.targetValue) || 0;
    return { name: k.name, current, target };
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currentValue: "",
    targetValue: "",
    status: "on-track",
    period: "",
    category: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData & { engagementId: number }) => {
      const res = await apiRequest("POST", "/api/portal/kpis", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/kpis`] });
      setCreateOpen(false);
      setFormData({ name: "", currentValue: "", targetValue: "", status: "on-track", period: "", category: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/portal/kpis/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/kpis`] });
    },
  });

  const handleCreate = () => {
    if (!engagementId) return;
    createMutation.mutate({ ...formData, engagementId });
  };

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="performance-loading">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PortalLayout>
    );
  }

  if (!engagementId && !isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="performance-empty">
          <div className="text-center space-y-4">
            <Target className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-bold text-primary">No Active Engagement</h2>
            <p className="text-muted-foreground">Your consultant will set up your engagement shortly.</p>
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="text-performance-title">Performance Dashboard</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-performance-subtitle">Track key performance indicators and organizational metrics.</p>
          </div>
          <div className="flex items-center gap-3">
            {isStaffOrAdmin && (
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-add-kpi">
                    <Plus className="h-4 w-4 mr-2" />
                    Add KPI
                  </Button>
                </DialogTrigger>
                <DialogContent data-testid="dialog-create-kpi">
                  <DialogHeader>
                    <DialogTitle>Add New KPI</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="kpi-name">Name</Label>
                      <Input id="kpi-name" data-testid="input-kpi-name" value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Revenue Growth" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="kpi-current">Current Value</Label>
                        <Input id="kpi-current" data-testid="input-kpi-current" value={formData.currentValue} onChange={e => setFormData(f => ({ ...f, currentValue: e.target.value }))} placeholder="e.g. 75" />
                      </div>
                      <div>
                        <Label htmlFor="kpi-target">Target Value</Label>
                        <Input id="kpi-target" data-testid="input-kpi-target" value={formData.targetValue} onChange={e => setFormData(f => ({ ...f, targetValue: e.target.value }))} placeholder="e.g. 90" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="kpi-status">Status</Label>
                      <Select value={formData.status} onValueChange={v => setFormData(f => ({ ...f, status: v }))}>
                        <SelectTrigger data-testid="select-kpi-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on-track">On Track</SelectItem>
                          <SelectItem value="needs-attention">Needs Attention</SelectItem>
                          <SelectItem value="at-risk">At Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="kpi-period">Period</Label>
                      <Input id="kpi-period" data-testid="input-kpi-period" value={formData.period} onChange={e => setFormData(f => ({ ...f, period: e.target.value }))} placeholder="e.g. Q1 2026" />
                    </div>
                    <div>
                      <Label htmlFor="kpi-category">Category</Label>
                      <Input id="kpi-category" data-testid="input-kpi-category" value={formData.category} onChange={e => setFormData(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Financial" />
                    </div>
                    <Button className="w-full" data-testid="button-submit-kpi" onClick={handleCreate} disabled={createMutation.isPending || !formData.name}>
                      {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Create KPI
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <div className="bg-white px-4 py-2 rounded-xl border border-border shadow-sm text-sm font-bold text-primary" data-testid="text-performance-period">
              {period}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-primary text-white p-6 rounded-3xl shadow-lg relative overflow-hidden" data-testid="card-overall-health">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <Target className="text-accent mb-4" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Overall Health</p>
              <h3 className="text-4xl font-black" data-testid="text-overall-health">{health.label}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm lg:col-span-3 flex items-center justify-center" data-testid="chart-quarterly-trajectory">
             <div className="text-center space-y-4 w-full">
               <div className="flex justify-between items-end mb-6 border-b border-border pb-2">
                 <h4 className="font-bold text-primary">Quarterly Trajectory</h4>
                 <div className="flex gap-4">
                   <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 bg-accent rounded-sm"></div> Actual</div>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 bg-primary rounded-sm"></div> Target</div>
                 </div>
               </div>
               <div className="h-40 w-full flex items-end justify-between px-4">
                 {chartData.map((d, i) => (
                   <div key={i} className="flex-1 flex gap-1 items-end justify-center" data-testid={`chart-bar-${i}`}>
                     <div className="w-5 bg-accent rounded-t-sm transition-all" style={{ height: `${Math.min(d.current, 100)}%` }}></div>
                     <div className="w-5 bg-primary rounded-t-sm opacity-50" style={{ height: `${Math.min(d.target, 100)}%` }}></div>
                   </div>
                 ))}
               </div>
               {chartData.length > 0 && (
                 <div className="flex justify-between px-4">
                   {chartData.map((d, i) => (
                     <div key={i} className="flex-1 text-center text-[9px] text-muted-foreground truncate px-1">{d.name.split(' ').slice(0, 2).join(' ')}</div>
                   ))}
                 </div>
               )}
             </div>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex gap-2 flex-wrap" data-testid="kpi-categories">
            {categories.map(cat => (
              <span key={cat} className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-secondary text-primary border border-border" data-testid={`badge-category-${cat}`}>
                {cat}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-2xl font-heading font-bold text-primary mt-12 mb-6">Key Performance Indicators</h3>
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden" data-testid="table-kpis">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Metric</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Current</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Target</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Variance</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  {isStaffOrAdmin && <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground"></th>}
                </tr>
              </thead>
              <tbody>
                {kpiList.map((kpi) => {
                  const currentVal = parseFloat(kpi.currentValue) || 0;
                  const targetVal = parseFloat(kpi.targetValue) || 0;
                  const variance = currentVal - targetVal;
                  
                  return (
                    <tr key={kpi.id} className="border-b border-border hover:bg-secondary/20 transition-colors group" data-testid={`row-kpi-${kpi.id}`}>
                      <td className="py-5 px-6 font-bold text-primary text-sm" data-testid={`text-kpi-name-${kpi.id}`}>{kpi.name}</td>
                      <td className="py-5 px-6 font-black text-lg" data-testid={`text-kpi-current-${kpi.id}`}>{kpi.currentValue}%</td>
                      <td className="py-5 px-6 text-muted-foreground" data-testid={`text-kpi-target-${kpi.id}`}>{kpi.targetValue}%</td>
                      <td className="py-5 px-6">
                        <span className={cn(
                          "text-sm font-bold flex items-center gap-1",
                          variance >= 0 ? "text-green-500" : "text-red-500"
                        )} data-testid={`text-kpi-variance-${kpi.id}`}>
                          {variance > 0 ? "+" : ""}{variance}%
                          <TrendingUp size={14} className={cn(variance < 0 && "rotate-180")} />
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
                          kpi.status === 'on-track' ? "bg-green-50 text-green-600 border-green-200" :
                          kpi.status === 'needs-attention' ? "bg-orange-50 text-orange-600 border-orange-200" :
                          "bg-red-50 text-red-600 border-red-200"
                        )} data-testid={`badge-kpi-status-${kpi.id}`}>
                          {kpi.status.replace('-', ' ')}
                        </span>
                      </td>
                      {isStaffOrAdmin && (
                        <td className="py-5 px-6">
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50" data-testid={`button-delete-kpi-${kpi.id}`} onClick={() => deleteMutation.mutate(kpi.id)} disabled={deleteMutation.isPending}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      )}
                    </tr>
                  )
                })}
                {kpiList.length === 0 && (
                  <tr>
                    <td colSpan={isStaffOrAdmin ? 6 : 5} className="py-12 text-center text-muted-foreground" data-testid="text-no-kpis">No KPI data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
