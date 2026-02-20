import { PortalLayout } from "@/components/layout/PortalLayout";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Actions() {
  const actions = [
    { task: "Provide Q2 Financial Reports", owner: "Client Team", due: "Oct 10, 2026", status: "overdue", priority: "high" },
    { task: "Review Strategic Objectives Draft", owner: "John Doe", due: "Oct 14, 2026", status: "pending", priority: "high" },
    { leadership: "Schedule Team Alignment Session", owner: "Danai Makore", due: "Oct 15, 2026", status: "in-progress", priority: "medium" },
    { task: "Finalize Governance Template", owner: "Consulting Team", due: "Oct 20, 2026", status: "pending", priority: "low" },
    { task: "Complete Stakeholder Interviews", owner: "Consulting Team", due: "Oct 5, 2026", status: "completed", priority: "high" },
  ];

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2">Action Tracker</h1>
          <p className="text-lg text-muted-foreground">Keep track of agreed action items, ownership, and deadlines.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Open</p>
            <p className="text-3xl font-black text-primary">3</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">In Progress</p>
            <p className="text-3xl font-black text-accent">1</p>
          </div>
          <div className="bg-red-50 p-5 rounded-2xl border border-red-100 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">Overdue</p>
            <p className="text-3xl font-black text-red-600">1</p>
          </div>
          <div className="bg-green-50 p-5 rounded-2xl border border-green-100 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-1">Completed</p>
            <p className="text-3xl font-black text-green-700">12</p>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground w-1/2">Action Item</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Owner</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Due Date</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Priority</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action, i) => (
                  <tr key={i} className="border-b border-border hover:bg-secondary/20 transition-colors group">
                    <td className="py-4 px-6">
                      {action.status === 'completed' && <CheckCircle2 size={20} className="text-green-500" />}
                      {action.status === 'in-progress' && <Clock size={20} className="text-accent" />}
                      {action.status === 'pending' && <Circle size={20} className="text-muted-foreground" />}
                      {action.status === 'overdue' && <AlertCircle size={20} className="text-red-500" />}
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn("font-bold text-sm", action.status === 'completed' ? "text-muted-foreground line-through" : "text-primary")}>
                        {action.task || action.leadership}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">
                          {action.owner.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-primary">{action.owner}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn("text-sm font-medium", action.status === 'overdue' ? "text-red-500 font-bold" : "text-muted-foreground")}>
                        {action.due}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border",
                        action.priority === 'high' ? "bg-red-50 text-red-600 border-red-200" :
                        action.priority === 'medium' ? "bg-orange-50 text-orange-600 border-orange-200" :
                        "bg-blue-50 text-blue-600 border-blue-200"
                      )}>
                        {action.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}