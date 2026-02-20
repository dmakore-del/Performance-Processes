import { PortalLayout } from "@/components/layout/PortalLayout";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Roadmap() {
  const phases = [
    {
      title: "Phase 1: Discovery & Assessment",
      date: "Sep 1 - Sep 30",
      status: "completed",
      items: [
        { name: "Kickoff Meeting", owner: "Danai Makore", status: "completed" },
        { name: "Stakeholder Interviews", owner: "Consulting Team", status: "completed" },
        { name: "Current State Analysis", owner: "Consulting Team", status: "completed" },
        { name: "Assessment Report Presentation", owner: "Joint Team", status: "completed" },
      ]
    },
    {
      title: "Phase 2: Strategic Design",
      date: "Oct 1 - Oct 31",
      status: "in-progress",
      items: [
        { name: "Vision & Mission Workshop", owner: "Danai Makore", status: "completed" },
        { name: "Strategic Objectives Draft", owner: "Consulting Team", status: "in-progress" },
        { name: "KPI Framework Design", owner: "Consulting Team", status: "pending" },
        { name: "Phase 2 Sign-off", owner: "Client Sponsor", status: "pending" },
      ]
    },
    {
      title: "Phase 3: Implementation Planning",
      date: "Nov 1 - Nov 30",
      status: "pending",
      items: [
        { name: "Action Plan Development", owner: "Consulting Team", status: "pending" },
        { name: "Resource Allocation", owner: "Joint Team", status: "pending" },
        { name: "Change Management Strategy", owner: "Danai Makore", status: "pending" },
      ]
    }
  ];

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">Project Roadmap</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">Track the progress of our engagement across key phases and milestones.</p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="p-8 border-b border-border bg-secondary/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-primary">Strategic Alignment Initiative</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-2">Target Completion: Dec 15, 2026</p>
              </div>
              <div className="flex items-center gap-6 text-sm font-bold">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Completed</div>
                <div className="flex items-center gap-2"><Clock size={16} className="text-accent" /> In Progress</div>
                <div className="flex items-center gap-2"><Circle size={16} className="text-muted-foreground" /> Pending</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                <span className="text-accent">32% Complete</span>
              </div>
              <div className="h-3 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-12">
            {phases.map((phase, i) => (
              <div key={i} className="relative">
                {/* Timeline Line */}
                {i !== phases.length - 1 && (
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
                      <h4 className="text-xl font-bold text-primary">{phase.title}</h4>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-3 py-1 rounded-full">{phase.date}</span>
                    </div>
                    
                    <div className="space-y-3 bg-secondary/20 p-6 rounded-2xl border border-border/50">
                      {phase.items.map((item, j) => (
                        <div key={j} className="flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                            {item.status === 'completed' ? <CheckCircle2 size={20} className="text-green-500" /> :
                             item.status === 'in-progress' ? <Clock size={20} className="text-accent animate-pulse" /> :
                             <Circle size={20} className="text-muted-foreground/50" />}
                            <span className={cn("font-medium", item.status === 'completed' ? "text-primary line-through opacity-70" : "text-primary")}>{item.name}</span>
                          </div>
                          <div className="hidden sm:block">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-lg">Owner: {item.owner}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}