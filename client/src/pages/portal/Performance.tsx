import { PortalLayout } from "@/components/layout/PortalLayout";
import { TrendingUp, Target, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
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
  const { engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: kpis, isLoading: kpisLoading } = usePortalData<PerformanceKpi[]>("kpis", engagementId);

  const isLoading = engLoading || kpisLoading;
  const kpiList = kpis ?? [];
  const health = calculateOverallHealth(kpiList);
  const period = kpiList.length > 0 ? kpiList[0].period : "—";

  const categories = Array.from(new Set(kpiList.map(k => k.category).filter(Boolean)));

  const chartData = kpiList.map(k => {
    const current = parseFloat(k.currentValue) || 0;
    const target = parseFloat(k.targetValue) || 0;
    return { name: k.name, current, target };
  });

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="performance-loading">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <div className="bg-white px-4 py-2 rounded-xl border border-border shadow-sm text-sm font-bold text-primary" data-testid="text-performance-period">
            {period}
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
                </tr>
              </thead>
              <tbody>
                {kpiList.map((kpi) => {
                  const currentVal = parseFloat(kpi.currentValue) || 0;
                  const targetVal = parseFloat(kpi.targetValue) || 0;
                  const variance = currentVal - targetVal;
                  
                  return (
                    <tr key={kpi.id} className="border-b border-border hover:bg-secondary/20 transition-colors" data-testid={`row-kpi-${kpi.id}`}>
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
                    </tr>
                  )
                })}
                {kpiList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground" data-testid="text-no-kpis">No KPI data available.</td>
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
