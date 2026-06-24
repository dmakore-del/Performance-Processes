import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import type { Lead } from "@shared/schema";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "proposal", "negotiation", "won", "lost"] as const;
const PRIORITY_OPTIONS = ["low", "medium", "high", "urgent"] as const;
const SOURCE_OPTIONS = ["website", "referral", "cold outreach", "event", "social media", "other"] as const;
const SERVICE_OPTIONS = ["Enterprise Advisory", "Small Business Support", "Professional Coaching", "Performance Collective", "Custom Engagement"] as const;

const statusColors: Record<string, string> = {
  new: "bg-zinc-100 text-zinc-900",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-zinc-100 text-zinc-900",
  proposal: "bg-zinc-100 text-zinc-900",
  negotiation: "bg-orange-100 text-orange-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
};

const priorityColors: Record<string, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-zinc-100 text-zinc-800",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

type StaffUser = { id: string; fullName: string; email: string; role: string };

export default function Leads() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isAdmin = user?.role === "admin";

  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assignFilter, setAssignFilter] = useState<string>("all");

  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    source: "website",
    status: "new",
    priority: "medium",
    serviceInterest: "",
    estimatedValue: "",
    notes: "",
    assignedToId: "",
    assignedToName: "",
    nextFollowUpDate: "",
  });

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/portal/leads"],
  });

  const { data: staffUsers = [] } = useQuery<StaffUser[]>({
    queryKey: ["/api/portal/staff-users"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await fetch("/api/portal/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create lead");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/leads"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<typeof form> }) => {
      const res = await fetch(`/api/portal/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update lead");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/leads"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/portal/leads/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete lead");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/leads"] });
    },
  });

  const resetForm = () => {
    setForm({
      companyName: "", contactName: "", contactEmail: "", contactPhone: "",
      source: "website", status: "new", priority: "medium", serviceInterest: "",
      estimatedValue: "", notes: "", assignedToId: "", assignedToName: "", nextFollowUpDate: "",
    });
    setShowForm(false);
    setEditingLead(null);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setForm({
      companyName: lead.companyName,
      contactName: lead.contactName,
      contactEmail: lead.contactEmail,
      contactPhone: lead.contactPhone || "",
      source: lead.source,
      status: lead.status,
      priority: lead.priority,
      serviceInterest: lead.serviceInterest || "",
      estimatedValue: lead.estimatedValue || "",
      notes: lead.notes || "",
      assignedToId: lead.assignedToId || "",
      assignedToName: lead.assignedToName || "",
      nextFollowUpDate: lead.nextFollowUpDate || "",
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      updateMutation.mutate({ id: editingLead.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleAssign = (leadId: number, staffId: string) => {
    const staff = staffUsers.find(s => s.id === staffId);
    updateMutation.mutate({
      id: leadId,
      data: { assignedToId: staffId, assignedToName: staff?.fullName || "" },
    });
  };

  const handleStatusChange = (leadId: number, newStatus: string) => {
    updateMutation.mutate({
      id: leadId,
      data: {
        status: newStatus,
        ...(newStatus === "contacted" ? { lastContactDate: new Date().toISOString().split("T")[0] } : {}),
      },
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchSearch = searchQuery === "" ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchAssign = assignFilter === "all" ||
      (assignFilter === "unassigned" ? !lead.assignedToId : lead.assignedToId === assignFilter);
    return matchSearch && matchStatus && matchAssign;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "new").length,
    qualified: leads.filter(l => l.status === "qualified" || l.status === "proposal" || l.status === "negotiation").length,
    won: leads.filter(l => l.status === "won").length,
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary" data-testid="text-leads-title">
              {isAdmin ? "Leads Tracker" : "My Assigned Leads"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isAdmin ? "Manage business development leads and assign them to staff" : "Track and update your assigned leads"}
            </p>
          </div>
          {isAdmin && (
            <Button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="bg-accent hover:bg-accent/90 text-white"
              data-testid="button-add-lead"
            >
              Add Lead
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: stats.total, color: "bg-primary/10 text-primary" },
            { label: "New", value: stats.new, color: "bg-zinc-100 text-zinc-900" },
            { label: "In Pipeline", value: stats.qualified, color: "bg-zinc-100 text-zinc-900" },
            { label: "Won", value: stats.won, color: "bg-green-100 text-green-700" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-5" data-testid={`stat-leads-${i}`}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-primary mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              placeholder="Search by company, contact, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-leads"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
            data-testid="select-filter-status"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          {isAdmin && (
            <select
              value={assignFilter}
              onChange={(e) => setAssignFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
              data-testid="select-filter-assigned"
            >
              <option value="all">All Staff</option>
              <option value="unassigned">Unassigned</option>
              {staffUsers.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
            </select>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl border border-border p-6" data-testid="form-lead">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-primary">
                {editingLead ? "Edit Lead" : "Add New Lead"}
              </h2>
              <button onClick={resetForm} className="text-muted-foreground hover:text-primary text-lg font-bold leading-none">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Company Name *</label>
                  <Input data-testid="input-lead-company" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Contact Name *</label>
                  <Input data-testid="input-lead-contact" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Contact Email *</label>
                  <Input data-testid="input-lead-email" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Phone</label>
                  <Input data-testid="input-lead-phone" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Source</label>
                  <select data-testid="select-lead-source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm">
                    {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Status</label>
                  <select data-testid="select-lead-status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm">
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Priority</label>
                  <select data-testid="select-lead-priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm">
                    {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Service Interest</label>
                  <select data-testid="select-lead-service" value={form.serviceInterest} onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm">
                    <option value="">Select...</option>
                    {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Estimated Value</label>
                  <Input data-testid="input-lead-value" placeholder="e.g. $5,000" value={form.estimatedValue} onChange={(e) => setForm({ ...form, estimatedValue: e.target.value })} />
                </div>
                {isAdmin && (
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Assign To</label>
                    <select
                      data-testid="select-lead-assign"
                      value={form.assignedToId}
                      onChange={(e) => {
                        const staff = staffUsers.find(s => s.id === e.target.value);
                        setForm({ ...form, assignedToId: e.target.value, assignedToName: staff?.fullName || "" });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm"
                    >
                      <option value="">Unassigned</option>
                      {staffUsers.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
                    </select>
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Next Follow-up</label>
                  <Input data-testid="input-lead-followup" type="date" value={form.nextFollowUpDate} onChange={(e) => setForm({ ...form, nextFollowUpDate: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Notes</label>
                <textarea
                  data-testid="input-lead-notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-white" data-testid="button-submit-lead">
                  {editingLead ? "Update Lead" : "Create Lead"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-border">
            <p className="text-lg font-semibold text-primary mb-1">No leads found</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery || statusFilter !== "all" ? "Try adjusting your filters" : isAdmin ? "Click 'Add Lead' to create your first lead" : "No leads have been assigned to you yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
                data-testid={`card-lead-${lead.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-primary text-lg truncate" data-testid={`text-lead-company-${lead.id}`}>
                        {lead.companyName}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[lead.status] || "bg-gray-100 text-gray-600"}`}>
                        {lead.status}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${priorityColors[lead.priority] || "bg-gray-100 text-gray-600"}`}>
                        {lead.priority}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">{lead.contactName}</span>
                      <span className="flex items-center gap-1.5">{lead.contactEmail}</span>
                      {lead.contactPhone && <span className="flex items-center gap-1.5">{lead.contactPhone}</span>}
                      {lead.serviceInterest && <span className="flex items-center gap-1.5">{lead.serviceInterest}</span>}
                      {lead.estimatedValue && <span className="flex items-center gap-1.5">{lead.estimatedValue}</span>}
                    </div>
                    {lead.notes && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-1 italic">{lead.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {lead.assignedToName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-xs font-semibold text-accent">
                        {lead.assignedToName}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Unassigned</span>
                    )}

                    {lead.nextFollowUpDate && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {lead.nextFollowUpDate}
                      </div>
                    )}

                    {isAdmin && (
                      <select
                        value={lead.assignedToId || ""}
                        onChange={(e) => handleAssign(lead.id, e.target.value)}
                        className="px-2 py-1.5 rounded-lg border border-border bg-white text-xs min-w-[120px]"
                        data-testid={`select-assign-${lead.id}`}
                      >
                        <option value="">Assign to...</option>
                        {staffUsers.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
                      </select>
                    )}

                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className="px-2 py-1.5 rounded-lg border border-border bg-white text-xs min-w-[110px]"
                      data-testid={`select-status-${lead.id}`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>

                    <button
                      onClick={() => handleEdit(lead)}
                      className="px-3 py-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-wider"
                      data-testid={`button-edit-${lead.id}`}
                    >
                      Edit
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          if (confirm("Delete this lead?")) deleteMutation.mutate(lead.id);
                        }}
                        className="px-3 py-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors text-[10px] font-bold uppercase tracking-wider"
                        data-testid={`button-delete-${lead.id}`}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
