import { useEffect, useMemo, useState } from "react";
import { Redirect } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import type { Engagement, Invoice } from "@shared/schema";
import { usePortalI18n } from "@/lib/portal-i18n";
import { serviceName } from "@shared/portal-services";

type BillingData = { engagements: Engagement[]; invoices: Invoice[] };
type InvoiceFilter = "all" | "unpaid" | "overdue" | "paid";

const today = () => new Date().toISOString().slice(0, 10);
const invoiceStatus = (invoice: Invoice) => invoice.status === "unpaid" && invoice.dueDate < today() ? "overdue" : invoice.status;
const money = (cents: number, currency = "cad") => new Intl.NumberFormat("en-CA", { style: "currency", currency: currency.toUpperCase() }).format((cents || 0) / 100);
const formatPaidDate = (value: string | Date, locale: string) => {
  const dateOnly = new Date(value).toISOString().slice(0, 10);
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${dateOnly}T12:00:00.000Z`));
};

export default function AdminBilling() {
  const { user } = useAuth();
  const { t, status: translateStatus, locale } = usePortalI18n();
  const { toast } = useToast();
  const [filter, setFilter] = useState<InvoiceFilter>("all");
  const [selectedEngagementId, setSelectedEngagementId] = useState<number | null>(null);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [invoiceForm, setInvoiceForm] = useState({
    engagementId: "",
    invoiceNumber: "",
    description: "",
    amountCents: "",
    issueDate: today(),
    dueDate: "",
    paymentType: "one_time",
    status: "unpaid",
    paidAt: "",
  });
  const [retainerForm, setRetainerForm] = useState({
    retainerPlan: "",
    retainerAmountCents: "0",
    retainerStatus: "inactive",
    retainerNextBillingDate: "",
  });

  const adminBillingQuery = useQuery<BillingData>({ queryKey: ["/api/admin/billing"] });
  const { data, isLoading } = adminBillingQuery;
  const engagements = data?.engagements || [];
  const invoices = data?.invoices || [];
  const selectedEngagement = engagements.find((item) => item.id === selectedEngagementId) || engagements[0];

  useEffect(() => {
    if (!selectedEngagementId && engagements[0]) setSelectedEngagementId(engagements[0].id);
  }, [engagements, selectedEngagementId]);

  useEffect(() => {
    if (!selectedEngagement) return;
    setRetainerForm({
      retainerPlan: selectedEngagement.retainerPlan || "",
      retainerAmountCents: String(selectedEngagement.retainerAmountCents || 0),
      retainerStatus: selectedEngagement.retainerStatus || "inactive",
      retainerNextBillingDate: selectedEngagement.retainerNextBillingDate || "",
    });
  }, [selectedEngagement]);

  const filteredInvoices = useMemo(() => invoices.filter((invoice) => filter === "all" || invoiceStatus(invoice) === filter), [invoices, filter]);
  const invoiceClient = (invoice: Invoice) => engagements.find((item) => item.id === invoice.engagementId)?.clientName || "Unassigned client";
  const invalidatePortalInvoices = () => queryClient.invalidateQueries({
    predicate: (query) => typeof query.queryKey[0] === "string" && query.queryKey[0].startsWith("/api/portal/engagements/") && query.queryKey[0].endsWith("/invoices"),
  });

  const saveRetainer = useMutation({
    mutationFn: async () => {
      if (!selectedEngagement) throw new Error("Select an engagement first");
      const response = await apiRequest("PATCH", `/api/portal/engagements/${selectedEngagement.id}`, {
        retainerPlan: retainerForm.retainerPlan || null,
        retainerAmountCents: Math.max(0, Number(retainerForm.retainerAmountCents) || 0),
        retainerStatus: retainerForm.retainerStatus,
        retainerNextBillingDate: retainerForm.retainerNextBillingDate || null,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/billing"] });
      invalidatePortalInvoices();
      queryClient.invalidateQueries({ queryKey: ["/api/portal/engagements"] });
      toast({ title: t("Retainer settings saved"), description: t("The client will see the updated billing plan in their portal.") });
    },
    onError: () => toast({ title: t("Could not save retainer"), description: t("Something went wrong"), variant: "destructive" }),
  });

  const createInvoice = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/portal/invoices", {
        ...invoiceForm,
        engagementId: Number(invoiceForm.engagementId),
        amountCents: Number(invoiceForm.amountCents),
        amount: money(Number(invoiceForm.amountCents)),
        currency: "cad",
        paidAt: invoiceForm.status === "paid" && invoiceForm.paidAt ? `${invoiceForm.paidAt}T00:00:00.000Z` : null,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/billing"] });
      invalidatePortalInvoices();
      setInvoiceDialogOpen(false);
      toast({ title: t("Invoice Created"), description: t("The invoice is now available in the client portal.") });
    },
    onError: () => toast({ title: t("Could not create invoice"), description: t("Something went wrong"), variant: "destructive" }),
  });

  const updateInvoice = useMutation({
    mutationFn: async ({ id, data: update }: { id: number; data: Partial<Invoice> }) => {
      const response = await apiRequest("PATCH", `/api/portal/invoices/${id}`, update);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/billing"] });
      invalidatePortalInvoices();
      setInvoiceDialogOpen(false);
      setEditingInvoice(null);
      toast({ title: t("Invoice updated") });
    },
    onError: () => toast({ title: t("Could not update invoice"), description: t("Something went wrong"), variant: "destructive" }),
  });

  const openCreateInvoice = () => {
    setEditingInvoice(null);
    setInvoiceForm({
      engagementId: String(selectedEngagement?.id || engagements[0]?.id || ""),
      invoiceNumber: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      description: selectedEngagement?.retainerPlan || "",
      amountCents: String(selectedEngagement?.retainerAmountCents || ""),
      issueDate: today(),
      dueDate: "",
      paymentType: selectedEngagement?.retainerAmountCents ? "monthly_retainer" : "one_time",
      status: "unpaid",
      paidAt: "",
    });
    setInvoiceDialogOpen(true);
  };

  const openEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setInvoiceForm({
      engagementId: String(invoice.engagementId),
      invoiceNumber: invoice.invoiceNumber,
      description: invoice.description || "",
      amountCents: String(invoice.amountCents || 0),
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      paymentType: invoice.paymentType || "one_time",
      status: invoice.status,
      paidAt: invoice.paidAt ? new Date(invoice.paidAt).toISOString().slice(0, 10) : "",
    });
    setInvoiceDialogOpen(true);
  };

  if (user && user.role !== "admin") return <Redirect to="/portal" />;
  if (adminBillingQuery.isError) return <PortalLayout><div role="alert" className="border border-red-200 bg-red-50 p-6 text-sm text-red-800">{t("Unable to load billing records.")}<Button className="ml-3" variant="outline" onClick={() => adminBillingQuery.refetch()}>{t("Retry")}</Button></div></PortalLayout>;

  return (
    <PortalLayout>
      <div className="space-y-8">
        <header className="flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">{t("Admin workspace")}</p>
            <h1 className="mt-3 text-4xl font-heading text-primary md:text-5xl">{t("Billing and retainers")}</h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{t("Set the commercial terms, keep invoices current, and give every client a simple place to pay.")}</p>
          </div>
          <Button className="bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={openCreateInvoice}>{t("Create invoice")}</Button>
        </header>

        <section className="grid gap-4 sm:grid-cols-3" aria-label={t("Billing overview")}>
          {[
            [t("Open balance"), invoices.filter((item) => invoiceStatus(item) === "unpaid").reduce((sum, item) => sum + item.amountCents, 0), "unpaid"],
            [t("Overdue"), invoices.filter((item) => invoiceStatus(item) === "overdue").reduce((sum, item) => sum + item.amountCents, 0), "overdue"],
            [t("Paid invoices"), invoices.filter((item) => invoiceStatus(item) === "paid").length, "paid"],
          ].map(([label, value, key]) => (
            <button key={key} type="button" onClick={() => setFilter(key as InvoiceFilter)} className={`border p-5 text-left transition-colors ${filter === key ? "border-accent bg-secondary" : "border-border bg-white hover:border-accent"}`}>
              <p className="text-xs font-semibold text-muted-foreground">{label}</p>
              <p className="mt-3 text-3xl font-heading text-primary">{key === "paid" ? value : money(Number(value))}</p>
            </button>
          ))}
        </section>

        <section className="grid gap-8 xl:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading text-primary">{t("Client retainers")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("Adjust the monthly plan shown to the selected client.")}</p>
              </div>
            </div>
            <div className="border border-border bg-white">
              <div className="border-b border-border p-4">
                <Label htmlFor="admin-engagement">{t("Client engagement")}</Label>
                <Select value={String(selectedEngagement?.id || "")} onValueChange={(value) => setSelectedEngagementId(Number(value))}>
                  <SelectTrigger id="admin-engagement" className="mt-2"><SelectValue placeholder={t("Select an engagement")} /></SelectTrigger>
                  <SelectContent>{engagements.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.clientName}, {item.engagementType}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {selectedEngagement ? (
                <div className="space-y-5 p-5">
                  <div className="border-l-2 border-accent bg-secondary p-4">
                    <p className="text-xs font-semibold text-muted-foreground">{t("Current plan")}</p>
                    <p className="mt-1 text-xl font-heading text-primary">{selectedEngagement.retainerPlan || t("No retainer configured")}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{money(selectedEngagement.retainerAmountCents)} {t("per month")}, {translateStatus(selectedEngagement.retainerStatus || "inactive")}</p>
                  </div>
                  <div className="space-y-4">
                    <div><Label htmlFor="retainer-plan">{t("Plan name")}</Label><Input id="retainer-plan" className="mt-2" value={retainerForm.retainerPlan} onChange={(event) => setRetainerForm({ ...retainerForm, retainerPlan: event.target.value })} placeholder={t("Ongoing Performance Support")} /></div>
                    <div><Label htmlFor="retainer-amount">{t("Monthly amount in cents")}</Label><Input id="retainer-amount" className="mt-2" type="number" min="0" value={retainerForm.retainerAmountCents} onChange={(event) => setRetainerForm({ ...retainerForm, retainerAmountCents: event.target.value })} /></div>
                    <div><Label htmlFor="retainer-status">{t("Retainer status")}</Label><Select value={retainerForm.retainerStatus} onValueChange={(value) => setRetainerForm({ ...retainerForm, retainerStatus: value })}><SelectTrigger id="retainer-status" className="mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="inactive">{t("Inactive")}</SelectItem><SelectItem value="active">{t("Active")}</SelectItem><SelectItem value="paused">{t("Paused")}</SelectItem></SelectContent></Select></div>
                    <div><Label htmlFor="retainer-date">{t("Next billing date")}</Label><Input id="retainer-date" className="mt-2" type="date" value={retainerForm.retainerNextBillingDate} onChange={(event) => setRetainerForm({ ...retainerForm, retainerNextBillingDate: event.target.value })} /></div>
                  </div>
                   <Button className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-primary" onClick={() => saveRetainer.mutate()} disabled={saveRetainer.isPending}>{saveRetainer.isPending ? t("Saving") : t("Save retainer settings")}</Button>
                </div>
              ) : <p className="p-6 text-sm text-muted-foreground">{t("Create an engagement to start managing a retainer.")}</p>}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
              <div><h2 className="text-2xl font-heading text-primary">{t("Invoice register")}</h2><p className="mt-1 text-sm text-muted-foreground">{t("Edit, mark paid, or reopen any client invoice.")}</p></div>
              <div className="flex gap-1 border border-border bg-white p-1">
                 {(["all", "unpaid", "overdue", "paid"] as InvoiceFilter[]).map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`px-3 py-2 text-xs font-semibold capitalize ${filter === item ? "bg-accent text-primary" : "text-muted-foreground hover:text-primary"}`}>{item === "all" ? t("All") : translateStatus(item)}</button>)}
              </div>
            </div>
            <div className="overflow-hidden border border-border bg-white">
              {isLoading ? <p className="p-8 text-sm text-muted-foreground">{t("Loading billing records")}</p> : filteredInvoices.length === 0 ? <p className="p-8 text-sm text-muted-foreground">{t("No invoices in this view.")}</p> : filteredInvoices.map((invoice) => {
                const status = invoiceStatus(invoice);
                return <div key={invoice.id} className="flex flex-col gap-4 border-b border-border p-5 last:border-0 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0"><div className="flex items-center gap-3"><p className="font-semibold text-primary">{invoice.invoiceNumber}</p><span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${status === "paid" ? "bg-green-50 text-green-700" : status === "overdue" ? "bg-red-50 text-red-700" : "bg-secondary text-primary"}`}>{translateStatus(status)}</span></div><p className="mt-1 text-sm text-muted-foreground">{invoiceClient(invoice)} · {serviceName(engagements.find((item) => item.id === invoice.engagementId) || { engagementType: t("Service invoice") })}{invoice.description ? ` · ${invoice.description}` : ""}</p><p className="mt-1 text-xs text-muted-foreground">{t("Due")} {invoice.dueDate}{status === "paid" && invoice.paidAt ? ` · ${t("Paid")} ${formatPaidDate(invoice.paidAt, locale)}` : ""}</p></div>
                   <div className="flex items-center justify-between gap-5 md:justify-end"><p className="font-heading text-xl text-primary">{money(invoice.amountCents, invoice.currency)}</p><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => openEditInvoice(invoice)}>{t("Edit")}</Button>{status !== "paid" && <Button size="sm" className="bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => updateInvoice.mutate({ id: invoice.id, data: { status: "paid", paidAt: new Date() } })}>{t("Mark paid")}</Button>}</div></div>
                </div>;
              })}
            </div>
          </div>
        </section>
      </div>

      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent className="max-w-lg">
           <DialogHeader><DialogTitle>{editingInvoice ? t("Edit invoice") : t("Create invoice")}</DialogTitle></DialogHeader>
          <div className="space-y-4">
              <div><Label htmlFor="invoice-client">{t("Client engagement")}</Label><Select value={invoiceForm.engagementId} onValueChange={(value) => setInvoiceForm({ ...invoiceForm, engagementId: value })}><SelectTrigger id="invoice-client" className="mt-2"><SelectValue placeholder={t("Select a client")} /></SelectTrigger><SelectContent>{engagements.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.clientName} · {serviceName(item)}</SelectItem>)}</SelectContent></Select></div>
             <div><Label htmlFor="invoice-number">{t("Invoice number")}</Label><Input id="invoice-number" className="mt-2" value={invoiceForm.invoiceNumber} onChange={(event) => setInvoiceForm({ ...invoiceForm, invoiceNumber: event.target.value })} /></div>
             <div><Label htmlFor="invoice-description">{t("Description")}</Label><Input id="invoice-description" className="mt-2" value={invoiceForm.description} onChange={(event) => setInvoiceForm({ ...invoiceForm, description: event.target.value })} /></div>
             <div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="invoice-amount">{t("Amount in cents")}</Label><Input id="invoice-amount" className="mt-2" type="number" min="1" value={invoiceForm.amountCents} onChange={(event) => setInvoiceForm({ ...invoiceForm, amountCents: event.target.value })} /></div><div><Label htmlFor="invoice-type">{t("Invoice type")}</Label><Select value={invoiceForm.paymentType} onValueChange={(value) => setInvoiceForm({ ...invoiceForm, paymentType: value })}><SelectTrigger id="invoice-type" className="mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="one_time">{t("One time service")}</SelectItem><SelectItem value="monthly_retainer">{t("Monthly retainer")}</SelectItem></SelectContent></Select></div></div>
             <div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="invoice-issue">{t("Issue date")}</Label><Input id="invoice-issue" className="mt-2" type="date" value={invoiceForm.issueDate} onChange={(event) => setInvoiceForm({ ...invoiceForm, issueDate: event.target.value })} /></div><div><Label htmlFor="invoice-due">{t("Due date")}</Label><Input id="invoice-due" className="mt-2" type="date" value={invoiceForm.dueDate} onChange={(event) => setInvoiceForm({ ...invoiceForm, dueDate: event.target.value })} /></div></div>
              <div><Label htmlFor="invoice-status">{t("Status")}</Label><Select value={invoiceForm.status} onValueChange={(value) => setInvoiceForm({ ...invoiceForm, status: value, paidAt: value === "paid" ? invoiceForm.paidAt : "" })}><SelectTrigger id="invoice-status" className="mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unpaid">{t("Unpaid")}</SelectItem><SelectItem value="paid">{t("Paid")}</SelectItem>{editingInvoice && <><SelectItem value="overdue">{t("Overdue")}</SelectItem><SelectItem value="void">{t("Void")}</SelectItem></>}</SelectContent></Select></div>
              {invoiceForm.status === "paid" && <div><Label htmlFor="invoice-paid-date">{t("Actual paid date")}</Label><Input id="invoice-paid-date" className="mt-2" type="date" value={invoiceForm.paidAt} onChange={(event) => setInvoiceForm({ ...invoiceForm, paidAt: event.target.value })} required /></div>}
              <p className="text-xs leading-5 text-muted-foreground">{invoiceForm.status === "paid" ? t("Records an already-received payment only; no Stripe charge or email will be created.") : t("Unpaid invoices are available to the client for secure payment.")}</p>
              <Button className="w-full bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => {
                if (invoiceForm.dueDate < invoiceForm.issueDate || (invoiceForm.status === "paid" && (!invoiceForm.paidAt || invoiceForm.paidAt < invoiceForm.issueDate || invoiceForm.paidAt > today()))) return;
                const paidAt = invoiceForm.status === "paid" ? `${invoiceForm.paidAt}T00:00:00.000Z` : null;
                if (editingInvoice) updateInvoice.mutate({ id: editingInvoice.id, data: { invoiceNumber: invoiceForm.invoiceNumber, description: invoiceForm.description, amountCents: Number(invoiceForm.amountCents), amount: money(Number(invoiceForm.amountCents)), issueDate: invoiceForm.issueDate, dueDate: invoiceForm.dueDate, paymentType: invoiceForm.paymentType, status: invoiceForm.status, paidAt: paidAt ? new Date(paidAt) : null } });
                else createInvoice.mutate();
              }} disabled={createInvoice.isPending || updateInvoice.isPending || !invoiceForm.invoiceNumber || !invoiceForm.issueDate || !invoiceForm.dueDate || invoiceForm.dueDate < invoiceForm.issueDate || Number(invoiceForm.amountCents) <= 0 || (invoiceForm.status === "paid" && (!invoiceForm.paidAt || invoiceForm.paidAt < invoiceForm.issueDate || invoiceForm.paidAt > today()))}>{editingInvoice ? t("Save invoice") : t("Create invoice")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}