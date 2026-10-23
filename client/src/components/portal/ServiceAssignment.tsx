import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PORTAL_SERVICES } from "@shared/portal-services";
import type { Engagement } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { usePortalI18n } from "@/lib/portal-i18n";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ClientUser = { id: string; companyName: string; fullName: string; role: string; status: string; email: string };
type Props = { clientUser?: ClientUser; engagement?: Engagement; trigger?: React.ReactNode };

export function ServiceAssignment({ clientUser, engagement, trigger }: Props) {
  const { t, fr } = usePortalI18n();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const initialForm = () => ({
    clientUserId: clientUser?.id || engagement?.clientUserId || "",
    clientName: engagement?.clientName || clientUser?.companyName || "",
    serviceCategory: engagement?.serviceCategory || "",
    startDate: engagement?.startDate || new Date().toISOString().slice(0, 10),
    currentPhase: engagement?.currentPhase || "",
    status: engagement?.status || "active",
    completionPercent: String(engagement?.completionPercent ?? 0),
    assignedStaffId: engagement?.assignedStaffId || "",
  });
  const [form, setForm] = useState(initialForm);
  const usersQuery = useQuery<ClientUser[]>({ queryKey: ["/api/admin/users"], enabled: open });
  const users = usersQuery.data || [];
  const clients = users.filter((u) => u.role === "client" && u.status === "active");
  const staff = users.filter((u) => ["staff", "admin"].includes(u.role) && u.status === "active");
  const service = PORTAL_SERVICES.find((item) => item.id === form.serviceCategory);
  useEffect(() => {
    if (service && (!engagement || service.id !== engagement.serviceCategory)) setForm((prev) => ({ ...prev, currentPhase: service.phases[0] }));
  }, [service, engagement]);
  const save = useMutation({
    mutationFn: async () => {
      const chosenClient = clients.find((u) => u.id === form.clientUserId) || clientUser;
      const serviceItem = PORTAL_SERVICES.find((item) => item.id === form.serviceCategory);
      if (!serviceItem) throw new Error("Select a service.");
      const payload = {
        clientUserId: form.clientUserId || chosenClient?.id,
        clientName: form.clientName || chosenClient?.companyName || "",
        engagementType: serviceItem.name,
        serviceCategory: serviceItem.id,
        startDate: form.startDate,
        currentPhase: form.currentPhase || serviceItem.phases[0],
        status: form.status,
        completionPercent: Math.max(0, Math.min(100, Number(form.completionPercent) || 0)),
        assignedStaffId: form.assignedStaffId || null,
      };
      const response = engagement
        ? await apiRequest("PATCH", `/api/portal/engagements/${engagement.id}`, payload)
        : await apiRequest("POST", "/api/portal/engagements", payload);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/engagements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/billing"] });
      toast({ title: engagement ? t("Service updated") : t("Service assigned") });
      setOpen(false);
    },
    onError: (error: Error) => toast({ title: t("Could not save service"), description: error.message, variant: "destructive" }),
  });
  const change = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return <Dialog open={open} onOpenChange={(nextOpen) => {
    if (nextOpen) setForm(initialForm());
    setOpen(nextOpen);
  }}>
    <DialogTrigger asChild>{trigger || <Button type="button" variant="outline">{engagement ? t("Edit service") : t("Assign service")}</Button>}</DialogTrigger>
    <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
      <DialogHeader><DialogTitle>{engagement ? t("Edit service delivery") : t("Assign a service")}</DialogTitle></DialogHeader>
      {usersQuery.isError && <div role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">{t("Unable to load client and staff list.")}<Button className="ml-2" size="sm" variant="outline" onClick={() => usersQuery.refetch()}>{t("Retry")}</Button></div>}
      {usersQuery.isLoading && <div className="h-12 animate-pulse bg-secondary" aria-label={t("Loading clients")} />}
      {!usersQuery.isLoading && !usersQuery.isError && !clientUser && clients.length === 0 && <p className="border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{t("No active client accounts are available. Activate a client account before assigning a service.")}</p>}
      <div className="grid gap-4 pt-2 sm:grid-cols-2">
        {!clientUser && !engagement && <div className="sm:col-span-2"><Label>{t("Client company")}</Label><Select value={form.clientUserId} onValueChange={(id) => {
          const selected = clients.find((u) => u.id === id);
          setForm((prev) => ({ ...prev, clientUserId: id, clientName: selected?.companyName || prev.clientName }));
        }}><SelectTrigger className="mt-1"><SelectValue placeholder={t("Select client")} /></SelectTrigger><SelectContent>{clients.map((u) => <SelectItem key={u.id} value={u.id}>{u.companyName} · {u.fullName}</SelectItem>)}</SelectContent></Select></div>}
        <div className="sm:col-span-2"><Label>{t("Service")}</Label><Select value={form.serviceCategory} onValueChange={(id) => change("serviceCategory", id)}><SelectTrigger className="mt-1"><SelectValue placeholder={t("Choose a service")} /></SelectTrigger><SelectContent>{PORTAL_SERVICES.map((item) => <SelectItem key={item.id} value={item.id}>{fr ? item.fr : item.name}</SelectItem>)}</SelectContent></Select></div>
        {(clientUser || engagement) && <div className="sm:col-span-2"><Label>{t("Company")}</Label><Input className="mt-1" value={form.clientName} readOnly /></div>}
        <div><Label>{t("Start date")}</Label><Input className="mt-1" type="date" value={form.startDate} onChange={(e) => change("startDate", e.target.value)} /></div>
        <div><Label>{t("Status")}</Label><Select value={form.status} onValueChange={(v) => change("status", v)}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">{t("Active")}</SelectItem><SelectItem value="on-hold">{t("On hold")}</SelectItem><SelectItem value="completed">{t("Completed")}</SelectItem></SelectContent></Select></div>
        <div className="sm:col-span-2"><Label>{t("Current phase")}</Label>{service ? <Select value={form.currentPhase} onValueChange={(v) => change("currentPhase", v)}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent>{Array.from(new Set([form.currentPhase, ...service.phases].filter(Boolean))).map((phase) => <SelectItem key={phase} value={phase}>{phase}</SelectItem>)}</SelectContent></Select> : <Input className="mt-1" value={form.currentPhase} onChange={(e) => change("currentPhase", e.target.value)} />}</div>
        <div><Label>{t("Completion percent")}</Label><Input className="mt-1" type="number" min="0" max="100" value={form.completionPercent} onChange={(e) => change("completionPercent", e.target.value)} /></div>
        <div><Label>{t("Assigned staff")}</Label><Select value={form.assignedStaffId || "unassigned"} onValueChange={(v) => change("assignedStaffId", v === "unassigned" ? "" : v)}><SelectTrigger className="mt-1"><SelectValue placeholder={t("Unassigned")} /></SelectTrigger><SelectContent><SelectItem value="unassigned">{t("Unassigned")}</SelectItem>{staff.map((u) => <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>)}</SelectContent></Select></div>
        <div className="sm:col-span-2"><Button className="w-full bg-primary text-primary-foreground" disabled={save.isPending || (!clientUser && !form.clientUserId) || !form.serviceCategory || !form.startDate} onClick={() => save.mutate()}>{save.isPending ? t("Saving") : t("Save service")}</Button></div>
      </div>
    </DialogContent>
  </Dialog>;
}
