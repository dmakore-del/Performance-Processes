import { PortalLayout } from "@/components/layout/PortalLayout";
import { CheckCircle2, Circle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import type { Milestone } from "@shared/schema";

export default function Roadmap() {
  const { engagement, engagementId, isLoading: engagementLoading } = usePortalEngagement();
  const { data: milestones, isLoading: milestonesLoading } = usePortalData<Milestone[]>("milestones", engagementId);

  const isLoading = engagementLoading || milestonesLoading;

  const groupedPhases = (() => {
    if (!milestones) return [];
    const phaseMap = new Map<string, Milestone[]>();
    for (const m of milestones) {
      if (!phaseMap.has(m.phase)) phaseMap.set(m.phase, []);
      phaseMap.get(m.phase)!.push(m);
    }
    return Array.from(phaseMap.entries()).map(([phase, items]) => {
      const sorted = items.sort((a, b) => a.sortOrder - b.sortOrder);
      const allCompleted = sorted.every(i => i.status === "completed");
      const anyInProgress = sorted.some(i => i.status === "in-progress");
      const phaseStatus = allCompleted ? "completed" : anyInProgress ? "in-progress" : "pending";
      return { title: phase, items: sorted, status: phaseStatus };
    });
  })();

  const completionPercent = engagement?.completionPercent ?? 0;

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="roadmap-loading">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4" data-testid="text-roadmap-title">Project Roadmap</h1>
          <p className="text-lg text-muted-foreground max-w-3xl" data-testid="text-roadmap-description">Track the progress of our engagement across key phases and milestones.</p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden" data-testid="roadmap-container">
          <div className="p-8 border-b border-border bg-secondary/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-primary" data-testid="text-engagement-type">{engagement?.engagementType ?? "Engagement"}</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-2" data-testid="text-engagement-phase">Current Phase: {engagement?.currentPhase}</p>
              </div>
              <div className="flex items-center gap-6 text-sm font-bold">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Completed</div>
                <div className="flex items-center gap-2"><Clock size={16} className="text-accent" /> In Progress</div>
                <div className="flex items-center gap-2"><Circle size={16} className="text-muted-foreground" /> Pending</div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                <span className="text-accent" data-testid="text-completion-percent">{completionPercent}% Complete</span>
              </div>
              <div className="h-3 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all duration-500" data-testid="progress-bar" style={{ width: `${completionPercent}%` }}></div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-12">
            {groupedPhases.map((phase, i) => (
              <div key={phase.title} className="relative" data-testid={`phase-group-${i}`}>
                {i !== groupedPhases.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-[-3rem] w-px bg-border"></div>
                )}
                
                <div className="flex gap-6 relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border",
                    phase.status === 'completed' ? "bg-green-50 border-green-200 text-green-500" :
                    phase.status === 'in-progress' ? "bg-accent/10 border-accent/20 text-accent" :
                    "bg-secondary border-border text-muted-foreground"
                  )}>
                    {phase.status === 'completed' ? <CheckCircle2 size={24} /> : 
                     phase.status === 'in-progress' ? <Clock size={24} /> : 
                     <span className="font-black text-lg">{i + 1}</span>}
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
                      <h4 className="text-xl font-bold text-primary" data-testid={`text-phase-title-${i}`}>{phase.title}</h4>
                    </div>
                    
                    <div className="space-y-3 bg-secondary/20 p-6 rounded-2xl border border-border/50">
                      {phase.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow" data-testid={`milestone-item-${item.id}`}>
                          <div className="flex items-center gap-4">
                            {item.status === 'completed' ? <CheckCircle2 size={20} className="text-green-500" /> :
                             item.status === 'in-progress' ? <Clock size={20} className="text-accent animate-pulse" /> :
                             <Circle size={20} className="text-muted-foreground/50" />}
                            <span className={cn("font-medium", item.status === 'completed' ? "text-primary line-through opacity-70" : "text-primary")} data-testid={`text-milestone-title-${item.id}`}>{item.title}</span>
                          </div>
                          <div className="hidden sm:flex items-center gap-3">
                            {item.dueDate && (
                              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-lg" data-testid={`text-milestone-date-${item.id}`}>{item.dueDate}</span>
                            )}
                            {item.owner && (
                              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-lg" data-testid={`text-milestone-owner-${item.id}`}>Owner: {item.owner}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {groupedPhases.length === 0 && (
              <div className="text-center py-12 text-muted-foreground" data-testid="text-no-milestones">
                No milestones found for this engagement.
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
