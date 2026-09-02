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

type BillingData = { engagements: Engagement[]; invoices: Invoice[] };
type InvoiceFilter = "all" | "unpaid" | "overdue" | "paid";

const today = () => new Date().toISOString().slice(0, 10);
const invoiceStatus = (invoice: Invoice) => invoice.status === "unpaid" && invoice.dueDate < today() ? "overdue" : invoice.status;
const money = (cents: number, currency = "cad") => new Intl.NumberFormat("en-CA", { style: "currency", currency: currency.toUpperCase() }).format((cents || 0) / 100);

export default function AdminBilling() {
  const { user } = useAuth();
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
  });
  const [retainerForm, setRetainerForm] = useState({
    retainerPlan: "",
    retainerAmountCents: "0",
    retainerStatus: "inactive",
    retainerNextBillingDate: "",
  });

  const { data, isLoading } = useQuery<BillingData>({ queryKey: ["/api/admin/billing"] });
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
      queryClient.invalidateQueries({ queryKey: ["/api/portal/engagements"] });
      toast({ title: "Retainer settings saved", description: "The client will see the updated billing plan in their portal." });
    },
    onError: (error: Error) => toast({ title: "Could not save retainer", description: error.message, variant: "destructive" }),
  });

  const createInvoice = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/portal/invoices", {
        ...invoiceForm,
        engagementId: Number(invoiceForm.engagementId),
        amountCents: Number(invoiceForm.amountCents),
        amount: money(Number(invoiceForm.amountCents)),
        currency: "cad",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/billing"] });
      setInvoiceDialogOpen(false);
      toast({ title: "Invoice created", description: "The invoice is now available in the client portal." });
    },
    onError: (error: Error) => toast({ title: "Could not create invoice", description: error.message, variant: "destructive" }),
  });

  const updateInvoice = useMutation({
    mutationFn: async ({ id, data: update }: { id: number; data: Partial<Invoice> }) => {
      const response = await apiRequest("PATCH", `/api/portal/invoices/${id}`, update);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/billing"] });
      setInvoiceDialogOpen(false);
      setEditingInvoice(null);
      toast({ title: "Invoice updated" });
    },
    onError: (error: Error) => toast({ title: "Could not update invoice", description: error.message, variant: "destructive" }),
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
    });
    setInvoiceDialogOpen(true);
  };

  if (user && user.role !== "admin") return <Redirect to="/portal" />;

  return (
    <PortalLayout>
      <div className="space-y-8">
        <header className="flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">Admin workspace</p>
            <h1 className="mt-3 text-4xl font-heading text-primary md:text-5xl">Billing and retainers</h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">Set the commercial terms, keep invoices current, and give every client a simple place to pay.</p>
          </div>
          <Button className="bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={openCreateInvoice}>Create invoice</Button>
        </header>

        <section className="grid gap-4 sm:grid-cols-3" aria-label="Billing overview">
          {[
            ["Open balance", invoices.filter((item) => invoiceStatus(item) === "unpaid").reduce((sum, item) => sum + item.amountCents, 0), "unpaid"],
            ["Overdue", invoices.filter((item) => invoiceStatus(item) === "overdue").reduce((sum, item) => sum + item.amountCents, 0), "overdue"],
            ["Paid invoices", invoices.filter((item) => invoiceStatus(item) === "paid").length, "paid"],
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
                <h2 className="text-2xl font-heading text-primary">Client retainers</h2>
                <p className="mt-1 text-sm text-muted-foreground">Adjust the monthly plan shown to the selected client.</p>
              </div>
            </div>
            <div className="border border-border bg-white">
              <div className="border-b border-border p-4">
                <Label htmlFor="admin-engagement">Client engagement</Label>
                <Select value={String(selectedEngagement?.id || "")} onValueChange={(value) => setSelectedEngagementId(Number(value))}>
                  <SelectTrigger id="admin-engagement" className="mt-2"><SelectValue placeholder="Select an engagement" /></SelectTrigger>
                  <SelectContent>{engagements.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.clientName}, {item.engagementType}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {selectedEngagement ? (
                <div className="space-y-5 p-5">
                  <div className="border-l-2 border-accent bg-secondary p-4">
                    <p className="text-xs font-semibold text-muted-foreground">Current plan</p>
                    <p className="mt-1 text-xl font-heading text-primary">{selectedEngagement.retainerPlan || "No retainer configured"}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{money(selectedEngagement.retainerAmountCents)} per month, {selectedEngagement.retainerStatus || "inactive"}</p>
                  </div>
                  <div className="space-y-4">
                    <div><Label htmlFor="retainer-plan">Plan name</Label><Input id="retainer-plan" className="mt-2" value={retainerForm.retainerPlan} onChange={(event) => setRetainerForm({ ...retainerForm, retainerPlan: event.target.value })} placeholder="Ongoing Performance Support" /></div>
                    <div><Label htmlFor="retainer-amount">Monthly amount in cents</Label><Input id="retainer-amount" className="mt-2" type="number" min="0" value={retainerForm.retainerAmountCents} onChange={(event) => setRetainerForm({ ...retainerForm, retainerAmountCents: event.target.value })} /></div>
                    <div><Label htmlFor="retainer-status">Retainer status</Label><Select value={retainerForm.retainerStatus} onValueChange={(value) => setRetainerForm({ ...retainerForm, retainerStatus: value })}><SelectTrigger id="retainer-status" className="mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="inactive">Inactive</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="paused">Paused</SelectItem></SelectContent></Select></div>
                    <div><Label htmlFor="retainer-date">Next billing date</Label><Input id="retainer-date" className="mt-2" type="date" value={retainerForm.retainerNextBillingDate} onChange={(event) => setRetainerForm({ ...retainerForm, retainerNextBillingDate: event.target.value })} /></div>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-primary" onClick={() => saveRetainer.mutate()} disabled={saveRetainer.isPending}>{saveRetainer.isPending ? "Saving" : "Save retainer settings"}</Button>
                </div>
              ) : <p className="p-6 text-sm text-muted-foreground">Create an engagement to start managing a retainer.</p>}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
              <div><h2 className="text-2xl font-heading text-primary">Invoice register</h2><p className="mt-1 text-sm text-muted-foreground">Edit, mark paid, or reopen any client invoice.</p></div>
              <div className="flex gap-1 border border-border bg-white p-1">
                {(["all", "unpaid", "overdue", "paid"] as InvoiceFilter[]).map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`px-3 py-2 text-xs font-semibold capitalize ${filter === item ? "bg-accent text-primary" : "text-muted-foreground hover:text-primary"}`}>{item}</button>)}
              </div>
            </div>
            <div className="overflow-hidden border border-border bg-white">
              {isLoading ? <p className="p-8 text-sm text-muted-foreground">Loading billing records</p> : filteredInvoices.length === 0 ? <p className="p-8 text-sm text-muted-foreground">No invoices in this view.</p> : filteredInvoices.map((invoice) => {
                const status = invoiceStatus(invoice);
                return <div key={invoice.id} className="flex flex-col gap-4 border-b border-border p-5 last:border-0 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0"><div className="flex items-center gap-3"><p className="font-semibold text-primary">{invoice.invoiceNumber}</p><span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${status === "paid" ? "bg-green-50 text-green-700" : status === "overdue" ? "bg-red-50 text-red-700" : "bg-secondary text-primary"}`}>{status}</span></div><p className="mt-1 text-sm text-muted-foreground">{invoiceClient(invoice)}, {invoice.description || "Service invoice"}</p><p className="mt-1 text-xs text-muted-foreground">Due {invoice.dueDate}</p></div>
                  <div className="flex items-center justify-between gap-5 md:justify-end"><p className="font-heading text-xl text-primary">{money(invoice.amountCents, invoice.currency)}</p><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => openEditInvoice(invoice)}>Edit</Button>{status !== "paid" && <Button size="sm" className="bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => updateInvoice.mutate({ id: invoice.id, data: { status: "paid", paidAt: new Date() } })}>Mark paid</Button>}</div></div>
                </div>;
              })}
            </div>
          </div>
        </section>
      </div>

      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingInvoice ? "Edit invoice" : "Create invoice"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label htmlFor="invoice-client">Client engagement</Label><Select value={invoiceForm.engagementId} onValueChange={(value) => setInvoiceForm({ ...invoiceForm, engagementId: value })}><SelectTrigger id="invoice-client" className="mt-2"><SelectValue placeholder="Select a client" /></SelectTrigger><SelectContent>{engagements.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.clientName}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="invoice-number">Invoice number</Label><Input id="invoice-number" className="mt-2" value={invoiceForm.invoiceNumber} onChange={(event) => setInvoiceForm({ ...invoiceForm, invoiceNumber: event.target.value })} /></div>
            <div><Label htmlFor="invoice-description">Description</Label><Input id="invoice-description" className="mt-2" value={invoiceForm.description} onChange={(event) => setInvoiceForm({ ...invoiceForm, description: event.target.value })} /></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="invoice-amount">Amount in cents</Label><Input id="invoice-amount" className="mt-2" type="number" min="1" value={invoiceForm.amountCents} onChange={(event) => setInvoiceForm({ ...invoiceForm, amountCents: event.target.value })} /></div><div><Label htmlFor="invoice-type">Invoice type</Label><Select value={invoiceForm.paymentType} onValueChange={(value) => setInvoiceForm({ ...invoiceForm, paymentType: value })}><SelectTrigger id="invoice-type" className="mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="one_time">One time service</SelectItem><SelectItem value="monthly_retainer">Monthly retainer</SelectItem></SelectContent></Select></div></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="invoice-issue">Issue date</Label><Input id="invoice-issue" className="mt-2" type="date" value={invoiceForm.issueDate} onChange={(event) => setInvoiceForm({ ...invoiceForm, issueDate: event.target.value })} /></div><div><Label htmlFor="invoice-due">Due date</Label><Input id="invoice-due" className="mt-2" type="date" value={invoiceForm.dueDate} onChange={(event) => setInvoiceForm({ ...invoiceForm, dueDate: event.target.value })} /></div></div>
            {editingInvoice && <div><Label htmlFor="invoice-status">Status</Label><Select value={invoiceForm.status} onValueChange={(value) => setInvoiceForm({ ...invoiceForm, status: value })}><SelectTrigger id="invoice-status" className="mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unpaid">Unpaid</SelectItem><SelectItem value="overdue">Overdue</SelectItem><SelectItem value="paid">Paid</SelectItem><SelectItem value="void">Void</SelectItem></SelectContent></Select></div>}
            <Button className="w-full bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => editingInvoice ? updateInvoice.mutate({ id: editingInvoice.id, data: { invoiceNumber: invoiceForm.invoiceNumber, description: invoiceForm.description, amountCents: Number(invoiceForm.amountCents), amount: money(Number(invoiceForm.amountCents)), issueDate: invoiceForm.issueDate, dueDate: invoiceForm.dueDate, paymentType: invoiceForm.paymentType, status: invoiceForm.status } }) : createInvoice.mutate()} disabled={createInvoice.isPending || updateInvoice.isPending}>{editingInvoice ? "Save invoice" : "Create invoice"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}