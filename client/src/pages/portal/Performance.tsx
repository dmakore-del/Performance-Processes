import { PortalLayout } from "@/components/layout/PortalLayout";
import { TrendingUp, BarChart3, Activity, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Performance() {
  const kpis = [
    { name: "Employee Engagement Score", current: "78%", target: "85%", status: "needs-attention" },
    { name: "Operational Efficiency", current: "92%", target: "90%", status: "on-track" },
    { name: "Leadership Bench Strength", current: "65%", target: "80%", status: "at-risk" },
    { name: "Strategy Execution Rate", current: "88%", target: "95%", status: "on-track" },
  ];

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2">Performance Dashboard</h1>
            <p className="text-lg text-muted-foreground">Track key performance indicators and organizational metrics.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-border shadow-sm text-sm font-bold text-primary">
            Q3 2026
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-primary text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <Target className="text-accent mb-4" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Overall Health</p>
              <h3 className="text-4xl font-black">Good</h3>
            </div>
          </div>
          
          {/* Placeholder charts for visual mockup */}
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm lg:col-span-3 flex items-center justify-center">
             <div className="text-center space-y-4 w-full">
               <div className="flex justify-between items-end mb-6 border-b border-border pb-2">
                 <h4 className="font-bold text-primary">Quarterly Trajectory</h4>
                 <div className="flex gap-4">
                   <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 bg-accent rounded-sm"></div> Actual</div>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 bg-primary rounded-sm"></div> Target</div>
                 </div>
               </div>
               <div className="h-40 w-full flex items-end justify-between px-4">
                 {[40, 60, 55, 80, 75, 90].map((h, i) => (
                   <div key={i} className="w-12 flex gap-1 items-end">
                     <div className="w-5 bg-accent rounded-t-sm transition-all" style={{ height: `${h}%` }}></div>
                     <div className="w-5 bg-primary rounded-t-sm opacity-50" style={{ height: `${h + 10}%` }}></div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>

        <h3 className="text-2xl font-heading font-bold text-primary mt-12 mb-6">Key Performance Indicators</h3>
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
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
                {kpis.map((kpi, i) => {
                  const currentVal = parseInt(kpi.current);
                  const targetVal = parseInt(kpi.target);
                  const variance = currentVal - targetVal;
                  
                  return (
                    <tr key={i} className="border-b border-border hover:bg-secondary/20 transition-colors">
                      <td className="py-5 px-6 font-bold text-primary text-sm">{kpi.name}</td>
                      <td className="py-5 px-6 font-black text-lg">{kpi.current}</td>
                      <td className="py-5 px-6 text-muted-foreground">{kpi.target}</td>
                      <td className="py-5 px-6">
                        <span className={cn(
                          "text-sm font-bold flex items-center gap-1",
                          variance >= 0 ? "text-green-500" : "text-red-500"
                        )}>
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
                        )}>
                          {kpi.status.replace('-', ' ')}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}