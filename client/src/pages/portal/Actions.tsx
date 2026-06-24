import { PortalLayout } from "@/components/layout/PortalLayout";
import { cn } from "@/lib/utils";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ActionItem } from "@shared/schema";

const STATUS_CYCLE = ["pending", "in-progress", "completed"] as const;

export default function Actions() {
  const { engagement, engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: actions, isLoading: actionsLoading } = usePortalData<ActionItem[]>("actions", engagementId);
  const { toast } = useToast();
  const { user } = useAuth();
  const canEdit = user?.role === 'staff' || user?.role === 'admin';
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  const queryKey = `/api/portal/engagements/${engagementId}/actions`;

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/portal/actions/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { engagementId: number; task: string; owner: string; dueDate: string; priority: string }) => {
      const res = await apiRequest("POST", "/api/portal/actions", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setDialogOpen(false);
      setNewTask("");
      setNewOwner("");
      setNewDueDate("");
      setNewPriority("medium");
      toast({ title: "Action created", description: "New action item has been added." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/portal/actions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({ title: "Action deleted", description: "Action item has been removed." });
    },
  });

  const handleStatusCycle = (action: ActionItem) => {
    const currentIdx = STATUS_CYCLE.indexOf(action.status as typeof STATUS_CYCLE[number]);
    const nextStatus = STATUS_CYCLE[(currentIdx + 1) % STATUS_CYCLE.length];
    updateStatusMutation.mutate({ id: action.id, status: nextStatus });
  };

  const handleCreate = () => {
    if (!engagementId || !newTask || !newOwner || !newDueDate) return;
    createMutation.mutate({
      engagementId,
      task: newTask,
      owner: newOwner,
      dueDate: newDueDate,
      priority: newPriority,
    });
  };

  const isLoading = engLoading || actionsLoading;

  const isOverdue = (action: ActionItem) => {
    if (action.status === "completed") return false;
    const due = new Date(action.dueDate);
    return due < new Date();
  };

  const openCount = actions?.filter(a => a.status === "pending" && !isOverdue(a)).length ?? 0;
  const inProgressCount = actions?.filter(a => a.status === "in-progress" && !isOverdue(a)).length ?? 0;
  const overdueCount = actions?.filter(a => isOverdue(a)).length ?? 0;
  const completedCount = actions?.filter(a => a.status === "completed").length ?? 0;

  const getDisplayStatus = (action: ActionItem) => {
    if (isOverdue(action)) return "overdue";
    return action.status;
  };

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary animate-pulse" data-testid="loading-spinner">Loading</span>
        </div>
      </PortalLayout>
    );
  }

  if (!engagement) {
    return (
      <PortalLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center" data-testid="empty-state-no-engagement">
          <h2 className="text-xl font-bold text-primary mb-2">No Active Engagement</h2>
          <p className="text-muted-foreground">Your consultant will set up your engagement shortly.</p>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="text-page-title">Action Tracker</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-description">Keep track of agreed action items, ownership, and deadlines.</p>
          </div>
          {canEdit && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-new-action">
                New Action
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Action Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="task">Task</Label>
                  <Input id="task" data-testid="input-task" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Describe the action item" />
                </div>
                <div>
                  <Label htmlFor="owner">Owner</Label>
                  <Input id="owner" data-testid="input-owner" value={newOwner} onChange={e => setNewOwner(e.target.value)} placeholder="Who is responsible?" />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" data-testid="input-due-date" type="date" value={newDueDate} onChange={e => setNewDueDate(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newPriority} onValueChange={setNewPriority}>
                    <SelectTrigger data-testid="select-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button data-testid="button-submit-action" onClick={handleCreate} disabled={createMutation.isPending || !newTask || !newOwner || !newDueDate} className="w-full">
                  {createMutation.isPending ? "Creating..." : "Create Action"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm" data-testid="card-summary-open">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Open</p>
            <p className="text-3xl font-black text-primary" data-testid="text-count-open">{openCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm" data-testid="card-summary-in-progress">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">In Progress</p>
            <p className="text-3xl font-black text-accent" data-testid="text-count-in-progress">{inProgressCount}</p>
          </div>
          <div className="bg-red-50 p-5 rounded-2xl border border-red-100 shadow-sm" data-testid="card-summary-overdue">
            <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">Overdue</p>
            <p className="text-3xl font-black text-red-600" data-testid="text-count-overdue">{overdueCount}</p>
          </div>
          <div className="bg-green-50 p-5 rounded-2xl border border-green-100 shadow-sm" data-testid="card-summary-completed">
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-1">Completed</p>
            <p className="text-3xl font-black text-green-700" data-testid="text-count-completed">{completedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" data-testid="table-actions">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground w-1/2">Action Item</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Owner</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Due Date</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Priority</th>
                  {canEdit && <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {actions && actions.length > 0 ? (
                  actions.map((action) => {
                    const displayStatus = getDisplayStatus(action);
                    return (
                      <tr key={action.id} className="border-b border-border hover:bg-secondary/20 transition-colors group" data-testid={`row-action-${action.id}`}>
                        <td className="py-4 px-6">
                          {canEdit ? (
                          <button
                            onClick={() => handleStatusCycle(action)}
                            className={cn(
                              "cursor-pointer text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border transition-colors",
                              displayStatus === 'completed' ? "bg-green-50 text-green-600 border-green-200" :
                              displayStatus === 'in-progress' ? "bg-accent/5 text-accent border-accent/20" :
                              displayStatus === 'overdue' ? "bg-red-50 text-red-600 border-red-200" :
                              "bg-zinc-100 text-zinc-700 border-zinc-200"
                            )}
                            data-testid={`button-status-${action.id}`}
                            title="Click to cycle status"
                          >
                            {displayStatus === 'in-progress' ? 'In Progress' : displayStatus}
                          </button>
                          ) : (
                          <span
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border",
                              displayStatus === 'completed' ? "bg-green-50 text-green-600 border-green-200" :
                              displayStatus === 'in-progress' ? "bg-accent/5 text-accent border-accent/20" :
                              displayStatus === 'overdue' ? "bg-red-50 text-red-600 border-red-200" :
                              "bg-zinc-100 text-zinc-700 border-zinc-200"
                            )}
                            data-testid={`status-icon-${action.id}`}
                          >
                            {displayStatus === 'in-progress' ? 'In Progress' : displayStatus}
                          </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className={cn("font-bold text-sm", displayStatus === 'completed' ? "text-muted-foreground line-through" : "text-primary")} data-testid={`text-task-${action.id}`}>
                            {action.task}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">
                              {action.owner.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-medium text-primary" data-testid={`text-owner-${action.id}`}>{action.owner}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={cn("text-sm font-medium", displayStatus === 'overdue' ? "text-red-500 font-bold" : "text-muted-foreground")} data-testid={`text-due-${action.id}`}>
                            {action.dueDate}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border",
                            action.priority === 'high' ? "bg-red-50 text-red-600 border-red-200" :
                            action.priority === 'medium' ? "bg-orange-50 text-orange-600 border-orange-200" :
                            "bg-zinc-100 text-zinc-800 border-zinc-200"
                          )} data-testid={`badge-priority-${action.id}`}>
                            {action.priority}
                          </span>
                        </td>
                        {canEdit && (
                        <td className="py-4 px-6">
                          <button
                            onClick={() => deleteMutation.mutate(action.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            data-testid={`button-delete-${action.id}`}
                            title="Delete action"
                          >
                            <span className="text-xs font-bold uppercase tracking-wider">Delete</span>
                          </button>
                        </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={canEdit ? 6 : 5} className="py-12 text-center text-muted-foreground" data-testid="text-empty-actions">
                      {canEdit ? 'No action items yet. Click "New Action" to create one.' : 'No action items yet.'}
                    </td>
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
