import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { cn } from "@/lib/utils";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Milestone } from "@shared/schema";

export default function Roadmap() {
  const { engagement, engagementId, isLoading: engagementLoading } = usePortalEngagement();
  const { data: milestones, isLoading: milestonesLoading } = usePortalData<Milestone[]>("milestones", engagementId);
  const { user } = useAuth();
  const { toast } = useToast();

  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";
  const isLoading = engagementLoading || milestonesLoading;

  const [createOpen, setCreateOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [form, setForm] = useState({
    title: "",
    phase: "",
    status: "pending",
    dueDate: "",
    owner: "",
    sortOrder: 0,
  });

  const resetForm = () => setForm({ title: "", phase: "", status: "pending", dueDate: "", owner: "", sortOrder: 0 });

  const createMutation = useMutation({
    mutationFn: async (data: typeof form & { engagementId: number }) => {
      const res = await apiRequest("POST", "/api/portal/milestones", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/milestones`] });
      toast({ title: "Milestone Created", description: "The milestone has been added." });
      setCreateOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Milestone> }) => {
      const res = await apiRequest("PATCH", `/api/portal/milestones/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/milestones`] });
      toast({ title: "Milestone Updated" });
      setEditingMilestone(null);
      resetForm();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

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
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent animate-pulse">Loading</span>
        </div>
      </PortalLayout>
    );
  }

  const statusCycle = (current: string) => {
    if (current === "pending") return "in-progress";
    if (current === "in-progress") return "completed";
    return "pending";
  };

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4" data-testid="text-roadmap-title">Project Roadmap</h1>
            <p className="text-lg text-muted-foreground max-w-3xl" data-testid="text-roadmap-description">Track the progress of our engagement across key phases and milestones.</p>
          </div>
          {isStaffOrAdmin && (
            <Button
              onClick={() => { resetForm(); setCreateOpen(true); }}
              className="bg-accent text-white hover:bg-primary gap-2"
              data-testid="button-add-milestone"
            >
              Add Milestone
            </Button>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden" data-testid="roadmap-container">
          <div className="p-8 border-b border-border bg-secondary/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-primary" data-testid="text-engagement-type">{engagement?.engagementType ?? "Engagement"}</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-2" data-testid="text-engagement-phase">Current Phase: {engagement?.currentPhase}</p>
              </div>
              <div className="flex items-center gap-6 text-sm font-bold">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500" /> Completed</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-accent" /> In Progress</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-muted-foreground" /> Pending</div>
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
                    <span className="font-black text-lg">{i + 1}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
                      <h4 className="text-xl font-bold text-primary" data-testid={`text-phase-title-${i}`}>{phase.title}</h4>
                    </div>
                    
                    <div className="space-y-3 bg-secondary/20 p-6 rounded-2xl border border-border/50">
                      {phase.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow group" data-testid={`milestone-item-${item.id}`}>
                          <div className="flex items-center gap-4">
                            {isStaffOrAdmin ? (
                              <button
                                onClick={() => updateMutation.mutate({ id: item.id, data: { status: statusCycle(item.status) } })}
                                className="cursor-pointer"
                                data-testid={`button-toggle-status-${item.id}`}
                                title="Click to change status"
                              >
                                {item.status === 'completed' ? <span className="w-4 h-4 rounded-full bg-green-500 block" /> :
                                 item.status === 'in-progress' ? <span className="w-4 h-4 rounded-full bg-accent block animate-pulse" /> :
                                 <span className="w-4 h-4 rounded-full border-2 border-muted-foreground/50 block" />}
                              </button>
                            ) : (
                              <>
                                {item.status === 'completed' ? <span className="w-4 h-4 rounded-full bg-green-500 block" /> :
                                 item.status === 'in-progress' ? <span className="w-4 h-4 rounded-full bg-accent block animate-pulse" /> :
                                 <span className="w-4 h-4 rounded-full border-2 border-muted-foreground/50 block" />}
                              </>
                            )}
                            <span className={cn("font-medium", item.status === 'completed' ? "text-primary line-through opacity-70" : "text-primary")} data-testid={`text-milestone-title-${item.id}`}>{item.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {item.dueDate && (
                              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-lg" data-testid={`text-milestone-date-${item.id}`}>{item.dueDate}</span>
                            )}
                            {item.owner && (
                              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-lg" data-testid={`text-milestone-owner-${item.id}`}>Owner: {item.owner}</span>
                            )}
                            {isStaffOrAdmin && (
                              <button
                                onClick={() => {
                                  setEditingMilestone(item);
                                  setForm({
                                    title: item.title,
                                    phase: item.phase,
                                    status: item.status,
                                    dueDate: item.dueDate || "",
                                    owner: item.owner || "",
                                    sortOrder: item.sortOrder,
                                  });
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                                data-testid={`button-edit-milestone-${item.id}`}
                              >
                                <span className="text-[10px] font-bold uppercase tracking-wider">Edit</span>
                              </button>
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

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md" data-testid="create-milestone-dialog">
          <DialogHeader>
            <DialogTitle>Add Milestone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Title</Label>
              <Input data-testid="input-milestone-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Milestone title" required />
            </div>
            <div>
              <Label>Phase</Label>
              <Input data-testid="input-milestone-phase" value={form.phase} onChange={(e) => setForm({ ...form, phase: e.target.value })} placeholder="e.g. Discovery, Strategy, Implementation" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger data-testid="select-milestone-status"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input data-testid="input-milestone-sort" type="number" value={form.sortOrder || ""} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} placeholder="0" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Due Date</Label>
                <Input data-testid="input-milestone-due" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} placeholder="e.g. Mar 15, 2026" />
              </div>
              <div>
                <Label>Owner</Label>
                <Input data-testid="input-milestone-owner" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="e.g. Danai" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-accent text-white hover:bg-primary"
                onClick={() => {
                  if (!engagementId) return;
                  createMutation.mutate({ ...form, engagementId });
                }}
                disabled={createMutation.isPending}
                data-testid="button-submit-milestone"
              >
                {createMutation.isPending ? "Creating..." : "Add Milestone"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingMilestone} onOpenChange={(open) => { if (!open) { setEditingMilestone(null); resetForm(); } }}>
        <DialogContent className="max-w-md" data-testid="edit-milestone-dialog">
          <DialogHeader>
            <DialogTitle>Edit Milestone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Title</Label>
              <Input data-testid="input-edit-milestone-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <Label>Phase</Label>
              <Input data-testid="input-edit-milestone-phase" value={form.phase} onChange={(e) => setForm({ ...form, phase: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger data-testid="select-edit-milestone-status"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input data-testid="input-edit-milestone-sort" type="number" value={form.sortOrder || ""} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Due Date</Label>
                <Input data-testid="input-edit-milestone-due" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              </div>
              <div>
                <Label>Owner</Label>
                <Input data-testid="input-edit-milestone-owner" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-accent text-white hover:bg-primary"
                onClick={() => {
                  if (!editingMilestone) return;
                  updateMutation.mutate({ id: editingMilestone.id, data: form });
                }}
                disabled={updateMutation.isPending}
                data-testid="button-save-milestone"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
