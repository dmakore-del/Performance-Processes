import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import type { Lead } from "@shared/schema";
import { usePortalI18n } from "@/lib/portal-i18n";

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
  const { t, status, priority, fr } = usePortalI18n();
  const queryClient = useQueryClient();
  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff";

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
    lastContactDate: "",
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
      const staffEditableFields = new Set([
        "status",
        "priority",
        "notes",
        "lastContactDate",
        "nextFollowUpDate",
      ]);
      const safeData = isStaff
        ? Object.fromEntries(Object.entries(data).filter(([key]) => staffEditableFields.has(key))) as Partial<typeof form>
        : data;
      const res = await fetch(`/api/portal/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(safeData),
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
      estimatedValue: "", notes: "", assignedToId: "", assignedToName: "", lastContactDate: "", nextFollowUpDate: "",
    });
    setShowForm(false);
    setEditingLead(null);
  };

  const canEditLead = (lead: Lead) => isAdmin || (isStaff && lead.assignedToId === user?.id);

  const handleEdit = (lead: Lead) => {
    if (!canEditLead(lead)) return;
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
      lastContactDate: lead.lastContactDate || "",
      nextFollowUpDate: lead.nextFollowUpDate || "",
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      if (!canEditLead(editingLead)) return;
      const data = isStaff
        ? {
            status: form.status,
            priority: form.priority,
            notes: form.notes,
            lastContactDate: form.lastContactDate,
            nextFollowUpDate: form.nextFollowUpDate,
          }
        : form;
      updateMutation.mutate({ id: editingLead.id, data });
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

  const assignedLeads = isStaff ? leads.filter((lead) => lead.assignedToId === user?.id) : leads;
  const filteredLeads = assignedLeads.filter(lead => {
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
    total: assignedLeads.length,
    new: assignedLeads.filter(l => l.status === "new").length,
    qualified: assignedLeads.filter(l => l.status === "qualified" || l.status === "proposal" || l.status === "negotiation").length,
    won: assignedLeads.filter(l => l.status === "won").length,
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary" data-testid="text-leads-title">
              {isAdmin ? t("Leads Tracker") : t("My Assigned Leads")}
            </h1>
     <p className="text-sm text-muted-foreground mt-1">
               {isAdmin ? t("Manage business development leads and assign them to staff") : t("Track and update your assigned leads")}
            </p>
          </div>
          {isAdmin && (
            <Button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="bg-accent hover:bg-accent/90 text-white"
              data-testid="button-add-lead"
            >
              {t("Add Lead")}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
             { label: t("Total Leads"), value: stats.total, color: "bg-primary/10 text-primary" },
             { label: t("New"), value: stats.new, color: "bg-zinc-100 text-zinc-900" },
             { label: t("In Pipeline"), value: stats.qualified, color: "bg-zinc-100 text-zinc-900" },
             { label: t("Won"), value: stats.won, color: "bg-green-100 text-green-700" },
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
               placeholder={t("Search by company, contact, or email...")}
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
            <option value="all">{t("All Statuses")}</option>
             {STATUS_OPTIONS.map(s => <option key={s} value={s}>{status(s)}</option>)}
          </select>
          {isAdmin && (
            <select
              value={assignFilter}
              onChange={(e) => setAssignFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
              data-testid="select-filter-assigned"
            >
               <option value="all">{t("All Staff")}</option>
               <option value="unassigned">{t("Unassigned")}</option>
              {staffUsers.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
            </select>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl border border-border p-6" data-testid="form-lead">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-primary">
                {editingLead ? t("Edit Lead") : t("Add New Lead")}
              </h2>
              <button onClick={resetForm} aria-label={t("Close")} className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-wider leading-none">
                {t("Close")}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isAdmin && <>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Company Name")} *</label>
                  <Input data-testid="input-lead-company" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
                </div>
                <div>
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Contact Name *")}</label>
                  <Input data-testid="input-lead-contact" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} required />
                </div>
                <div>
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Contact Email *")}</label>
                  <Input data-testid="input-lead-email" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} required />
                </div>
                <div>
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Phone")}</label>
                  <Input data-testid="input-lead-phone" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
                </div>
                <div>
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Source")}</label>
                  <select data-testid="select-lead-source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm">
                     {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{t(s)}</option>)}
                  </select>
                </div>
                <div>
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Service Interest")}</label>
                  <select data-testid="select-lead-service" value={form.serviceInterest} onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm">
                     <option value="">{t("Select...")}</option>
                     {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{t(s)}</option>)}
                  </select>
                </div>
                <div>
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Estimated Value")}</label>
                   <Input data-testid="input-lead-value" placeholder={t("e.g. $5,000")} value={form.estimatedValue} onChange={(e) => setForm({ ...form, estimatedValue: e.target.value })} />
                </div>
                <div>
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Assign To")}</label>
                  <select
                    data-testid="select-lead-assign"
                    value={form.assignedToId}
                    onChange={(e) => {
                      const staff = staffUsers.find(s => s.id === e.target.value);
                      setForm({ ...form, assignedToId: e.target.value, assignedToName: staff?.fullName || "" });
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm"
                  >
                     <option value="">{t("Unassigned")}</option>
                    {staffUsers.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
                  </select>
                </div>
                </>}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Status")}</label>
                  <select data-testid="select-lead-status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm">
                     {STATUS_OPTIONS.map(s => <option key={s} value={s}>{status(s)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Priority")}</label>
                  <select data-testid="select-lead-priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm">
                     {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{priority(p)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{fr ? "Dernier contact" : "Last contact"}</label>
                  <Input data-testid="input-lead-last-contact" type="date" value={form.lastContactDate} onChange={(e) => setForm({ ...form, lastContactDate: e.target.value })} />
                </div>
                <div>
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Next Follow-up")}</label>
                  <Input data-testid="input-lead-followup" type="date" value={form.nextFollowUpDate} onChange={(e) => setForm({ ...form, nextFollowUpDate: e.target.value })} />
                </div>
              </div>
              <div>
                 <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{t("Notes")}</label>
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
                  {editingLead ? t("Update Lead") : t("Create Lead")}
                </Button>
                 <Button type="button" variant="outline" onClick={resetForm}>{t("Cancel")}</Button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">{t("Loading leads...")}</div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-border">
            <p className="text-lg font-semibold text-primary mb-1">{t("No leads found")}</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery || statusFilter !== "all" ? t("Try adjusting your filters") : isAdmin ? t("Click 'Add Lead' to create your first lead") : t("No leads have been assigned to you yet")}
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
                         {status(lead.status)}
                      </span>
                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${priorityColors[lead.priority] || "bg-gray-100 text-gray-600"}`}>
                         {priority(lead.priority)}
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
                    {isAdmin && lead.assignedToName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-xs font-semibold text-accent">
                        {lead.assignedToName}
                      </div>
                    ) : isAdmin ? (
                       <span className="text-xs text-muted-foreground italic">{t("Unassigned")}</span>
                    ) : null}

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
                         <option value="">{t("Assign to...")}</option>
                        {staffUsers.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
                      </select>
                    )}

                    {canEditLead(lead) && <>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="px-2 py-1.5 rounded-lg border border-border bg-white text-xs min-w-[110px]"
                        data-testid={`select-status-${lead.id}`}
                        aria-label={`${t("Status")}: ${lead.companyName}`}
                      >
                         {STATUS_OPTIONS.map(s => <option key={s} value={s}>{status(s)}</option>)}
                      </select>
                      <select
                        value={lead.priority}
                        onChange={(e) => updateMutation.mutate({ id: lead.id, data: { priority: e.target.value } })}
                        className="px-2 py-1.5 rounded-lg border border-border bg-white text-xs min-w-[100px]"
                        data-testid={`select-priority-${lead.id}`}
                        aria-label={`${t("Priority")}: ${lead.companyName}`}
                      >
                         {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{priority(p)}</option>)}
                      </select>
                    </>}

                    {canEditLead(lead) && <button
                      onClick={() => handleEdit(lead)}
                      className="px-3 py-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-wider"
                      data-testid={`button-edit-${lead.id}`}
                    >
                       {t("Edit")}
                    </button>}

                    {isAdmin && (
                      <button
                        onClick={() => {
                           if (confirm(t("Delete this lead?"))) deleteMutation.mutate(lead.id);
                        }}
                        className="px-3 py-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors text-[10px] font-bold uppercase tracking-wider"
                        data-testid={`button-delete-${lead.id}`}
                      >
                         {t("Delete")}
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
