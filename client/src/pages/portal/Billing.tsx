import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Invoice, Contract } from "@shared/schema";
import { usePortalI18n } from "@/lib/portal-i18n";

export default function Billing() {
  const { engagement, engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: invoices, isLoading: invLoading } = usePortalData<Invoice[]>("invoices", engagementId);
  const { data: contracts, isLoading: conLoading } = usePortalData<Contract[]>("contracts", engagementId);
  const { toast } = useToast();
  const { user } = useAuth();
  const { t, status } = usePortalI18n();

  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contractFileRef = useRef<HTMLInputElement>(null);

  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNumber: "",
    description: "",
    amount: "",
    amountCents: 0,
    issueDate: "",
    dueDate: "",
  });

  const [createContractOpen, setCreateContractOpen] = useState(false);
  const [contractForm, setContractForm] = useState({
    title: "",
    terms: "",
    documentDate: "",
  });
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [invoiceFilter, setInvoiceFilter] = useState<"all" | "outstanding" | "overdue" | "paid">("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      toast({
        title: t("Payment successful!"),
        description: t("Your payment has been processed."),
      });
      window.history.replaceState({}, "", window.location.pathname);
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/invoices`] });
    }
  }, []);

  const payMutation = useMutation({
    mutationFn: async (invoiceId: number) => {
      const res = await apiRequest("POST", `/api/portal/invoices/${invoiceId}/pay`);
      return res.json();
    },
    onSuccess: (data: { url: string }) => {
      window.location.href = data.url;
    },
    onError: (error: Error) => {
      toast({ title: t("Payment Error"), description: error.message, variant: "destructive" });
    },
  });

  const retainerMutation = useMutation({
    mutationFn: async () => {
       if (!engagementId) throw new Error(t("No engagement selected"));
      const res = await apiRequest("POST", `/api/portal/engagements/${engagementId}/retainer/checkout`);
      return res.json();
    },
    onSuccess: (data: { url: string }) => {
      window.location.href = data.url;
    },
    onError: (error: Error) => {
      toast({ title: t("Retainer payment error"), description: error.message, variant: "destructive" });
    },
  });

  const signMutation = useMutation({
    mutationFn: async ({ contractId, signatureData }: { contractId: number; signatureData: string }) => {
      const res = await apiRequest("POST", `/api/portal/contracts/${contractId}/sign`, { signatureData });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: t("Contract Signed"), description: t("The contract has been signed successfully.") });
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/contracts`] });
      setSignDialogOpen(false);
      setSelectedContract(null);
    },
    onError: (error: Error) => {
      toast({ title: t("Signing Error"), description: error.message, variant: "destructive" });
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (data: typeof invoiceForm & { engagementId: number }) => {
      const res = await apiRequest("POST", "/api/portal/invoices", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: t("Invoice Created"), description: t("The invoice has been created and is ready for client payment.") });
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/invoices`] });
      setCreateInvoiceOpen(false);
      setInvoiceForm({ invoiceNumber: "", description: "", amount: "", amountCents: 0, issueDate: "", dueDate: "" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const createContractMutation = useMutation({
    mutationFn: async (data: typeof contractForm & { engagementId: number }) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("terms", data.terms);
      formData.append("documentDate", data.documentDate);
      formData.append("engagementId", String(data.engagementId));
      if (contractFile) {
        formData.append("file", contractFile);
      }
      const res = await fetch("/api/portal/contracts", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Failed to create contract" }));
        throw new Error(err.message);
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: t("Agreement Created"), description: t("The agreement has been uploaded and created.") });
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/contracts`] });
      setCreateContractOpen(false);
      setContractForm({ title: "", terms: "", documentDate: "" });
      setContractFile(null);
      if (contractFileRef.current) contractFileRef.current.value = "";
    },
    onError: (error: Error) => {
      toast({ title: t("Error"), description: error.message, variant: "destructive" });
    },
  });

  const getCanvasCoords = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [getCanvasCoords]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing, getCanvasCoords]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSignContract = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedContract) return;
    const signatureData = canvas.toDataURL();
    signMutation.mutate({ contractId: selectedContract.id, signatureData });
  };

  const isLoading = engLoading || invLoading || conLoading;
  const currentDate = new Date().toISOString().slice(0, 10);
  const getInvoiceStatus = (invoice: Invoice) => invoice.status === "unpaid" && invoice.dueDate < currentDate ? "overdue" : invoice.status;
  const invoiceStatus = (invoice: Invoice) => getInvoiceStatus(invoice);
  const outstandingInvoices = invoices?.filter((invoice) => invoiceStatus(invoice) === "unpaid") || [];
  const overdueInvoices = invoices?.filter((invoice) => invoiceStatus(invoice) === "overdue") || [];
  const paidInvoices = invoices?.filter((invoice) => invoiceStatus(invoice) === "paid") || [];
  const visibleInvoices = (invoices || []).filter((invoice) => invoiceFilter === "all" || invoiceFilter === "outstanding" && invoiceStatus(invoice) === "unpaid" || invoiceFilter === "overdue" && invoiceStatus(invoice) === "overdue" || invoiceFilter === "paid" && invoiceStatus(invoice) === "paid");

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center py-20" data-testid="billing-loading">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary animate-pulse">{t("Loading")}</span>
        </div>
      </PortalLayout>
    );
  }

  if (!engagement && !engLoading) {
    return (
      <PortalLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="billing-empty">
          <h2 className="text-xl font-bold text-primary mb-2">{t("No Active Engagement")}</h2>
          <p className="text-muted-foreground">{t("Your consultant will set up your engagement shortly.")}</p>
        </div>
      </PortalLayout>
    );
  }
  const activeEngagement = engagement!;

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="billing-title">{t("Billing & Agreements")}</h1>
          <p className="text-lg text-muted-foreground" data-testid="billing-subtitle">{t("Manage invoices, payments, and view engagement contracts.")}</p>
        </div>

        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [t("Outstanding"), outstandingInvoices.length, "outstanding"],
              [t("Overdue"), overdueInvoices.length, "overdue"],
              [t("Paid invoices"), paidInvoices.length, "paid"],
            ].map(([label, value, key]) => (
              <button key={key} type="button" onClick={() => setInvoiceFilter(key as typeof invoiceFilter)} className={`border p-5 text-left transition-colors ${invoiceFilter === key ? "border-accent bg-secondary" : "border-border bg-white hover:border-accent"}`}>
                <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                <p className="mt-2 text-3xl font-heading text-primary">{value}</p>
              </button>
            ))}
          </div>

          {activeEngagement.retainerAmountCents > 0 && (
            <section className="border-l-2 border-accent bg-secondary p-6 md:p-8" data-testid="retainer-card">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent">{t("Monthly support")}</p>
                  <h2 className="mt-3 text-3xl font-heading text-primary">{activeEngagement.retainerPlan || t("Your monthly retainer")}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{activeEngagement.retainerStatus === "past_due" ? t("Your latest retainer payment needs attention.") : t("Keep your ongoing support active with a secure monthly payment.")}</p>
                  <p className="mt-4 text-2xl font-heading text-primary">${(activeEngagement.retainerAmountCents / 100).toLocaleString("en-CA", { minimumFractionDigits: 2 })} <span className="text-sm text-muted-foreground">{t("CAD per month")}</span></p>
                </div>
                {!isStaffOrAdmin && activeEngagement.retainerStatus !== "paused" && (
                  <Button className="bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => retainerMutation.mutate()} disabled={retainerMutation.isPending} data-testid="button-pay-retainer">
                    {retainerMutation.isPending ? t("Opening secure checkout") : activeEngagement.retainerStatus === "active" ? t("Manage monthly payment") : t("Start monthly retainer")}
                  </Button>
                )}
              </div>
            </section>
          )}

          <div className="space-y-5">
            <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-2xl font-heading text-primary" data-testid="invoices-heading">{t("Invoices")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t("Review past payments and take care of anything outstanding.")}</p>
              </div>
              {isStaffOrAdmin && <Button size="sm" className="bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setCreateInvoiceOpen(true)} data-testid="button-create-invoice">{t("Create invoice")}</Button>}
            </div>
            <div className="flex gap-1 overflow-x-auto border border-border bg-white p-1" role="tablist" aria-label="Invoice views">
              {(["all", "outstanding", "overdue", "paid"] as const).map((item) => <button key={item} type="button" role="tab" aria-selected={invoiceFilter === item} onClick={() => setInvoiceFilter(item)} className={`shrink-0 px-4 py-2 text-xs font-semibold capitalize ${invoiceFilter === item ? "bg-accent text-primary" : "text-muted-foreground hover:text-primary"}`}>{item === "all" ? t("All") : item === "outstanding" ? t("Outstanding") : item === "overdue" ? t("Overdue") : t("Paid invoices")}</button>)}
            </div>
            <div className="border border-border bg-white" data-testid="invoices-list">
              {visibleInvoices.length > 0 ? visibleInvoices.map((inv) => {
               const invoiceState = invoiceStatus(inv);
                return <div key={inv.id} className="flex flex-col gap-4 border-b border-border p-5 last:border-0 transition-colors hover:bg-secondary/20 sm:flex-row sm:items-center sm:justify-between" data-testid={`invoice-row-${inv.id}`}>
                   <div><h4 className="font-semibold text-primary" data-testid={`invoice-number-${inv.id}`}>{inv.invoiceNumber}</h4><p className="mt-1 text-xs text-muted-foreground">{t("Issued")} {inv.issueDate}, {t("due")} {inv.dueDate}</p>{inv.description && <p className="mt-1 text-sm text-muted-foreground">{inv.description}</p>}</div>
                   <div className="flex items-center justify-between gap-4 sm:justify-end"><div className="text-right"><p className="font-heading text-xl text-primary" data-testid={`invoice-amount-${inv.id}`}>{inv.amount}</p><span className={`text-[10px] font-bold uppercase tracking-[.12em] ${invoiceState === "paid" ? "text-green-700" : invoiceState === "overdue" ? "text-red-700" : "text-accent"}`} data-testid={`invoice-status-${inv.id}`}>{status(invoiceState)}</span></div>{invoiceState !== "paid" && invoiceState !== "void" && !isStaffOrAdmin && <Button size="sm" className="bg-accent text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => payMutation.mutate(inv.id)} disabled={payMutation.isPending} data-testid={`button-pay-${inv.id}`}>{payMutation.isPending ? t("Processing") : t("Pay invoice")}</Button>}{isStaffOrAdmin && invoiceState !== "paid" && <span className="text-xs text-muted-foreground">{t("Client payment pending")}</span>}</div>
                </div>;
              }) : <div className="p-8 text-center text-sm text-muted-foreground" data-testid="invoices-empty">{t("No invoices in this view.")}</div>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary" data-testid="contracts-heading">{t("Contracts & Agreements")}</h3>
              {isStaffOrAdmin && (
                <Button
                  size="sm"
                  className="bg-accent text-white hover:bg-primary"
                  onClick={() => setCreateContractOpen(true)}
                  data-testid="button-create-contract"
                >
                  {t("Upload Agreement")}
                </Button>
              )}
            </div>
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden" data-testid="contracts-list">
              {contracts && contracts.length > 0 ? (
                contracts.map((contract) => (
                  <div key={contract.id} className="p-6 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors flex justify-between items-center gap-4" data-testid={`contract-row-${contract.id}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary flex-shrink-0 border border-border text-[8px] font-black uppercase tracking-wider">
                        Doc
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-sm" data-testid={`contract-title-${contract.id}`}>{contract.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{contract.documentDate}</p>
                        {contract.status === 'signed' && contract.signedByName && (
                          <p className="text-xs text-green-600 mt-0.5" data-testid={`contract-signer-${contract.id}`}>
                            Signed by {contract.signedByName} on {contract.signedAt ? new Date(contract.signedAt).toLocaleDateString() : ""}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {(contract as any).documentUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 px-3 rounded-lg"
                          asChild
                          data-testid={`button-download-contract-${contract.id}`}
                        >
                          <a href={(contract as any).documentUrl} target="_blank" rel="noopener noreferrer">
                            {t("View")}
                          </a>
                        </Button>
                      )}
                      {contract.status === 'signed' ? (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-600" data-testid={`contract-signed-${contract.id}`}>{t("Signed")}</span>
                      ) : (
                        <Button
                          className="bg-accent text-white hover:bg-primary text-xs px-4 h-8 rounded-lg"
                          onClick={() => {
                            setSelectedContract(contract);
                            setSignDialogOpen(true);
                          }}
                          data-testid={`button-sign-${contract.id}`}
                        >
                          {t("Sign")}
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground" data-testid="contracts-empty">
                  No contracts found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={signDialogOpen} onOpenChange={setSignDialogOpen}>
        <DialogContent className="max-w-lg" data-testid="sign-contract-dialog">
          <DialogHeader>
            <DialogTitle data-testid="sign-dialog-title">{t("Sign Contract")}: {selectedContract?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedContract?.terms && (
              <div className="max-h-48 overflow-y-auto border rounded-lg p-4 text-sm text-muted-foreground bg-secondary/30" data-testid="contract-terms">
                {selectedContract.terms}
              </div>
            )}
            <div>
              <Label>{t("Signature")}</Label>
              <div className="border rounded-lg mt-1 bg-white">
                <canvas
                  ref={canvasRef}
                  width={440}
                  height={150}
                  className="w-full cursor-crosshair touch-none"
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  onTouchStart={handleCanvasMouseDown}
                  onTouchMove={handleCanvasMouseMove}
                  onTouchEnd={handleCanvasMouseUp}
                  data-testid="signature-canvas"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={clearCanvas} data-testid="button-clear-signature">
                {t("Clear")}
              </Button>
              <Button
                className="bg-accent text-white hover:bg-primary"
                onClick={handleSignContract}
                disabled={signMutation.isPending}
                data-testid="button-submit-signature"
              >
                {signMutation.isPending ? t("Signing...") : t("Sign Contract")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={createInvoiceOpen} onOpenChange={setCreateInvoiceOpen}>
        <DialogContent className="max-w-md" data-testid="create-invoice-dialog">
          <DialogHeader>
            <DialogTitle>{t("Create & Send Invoice")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t("Invoice Number")}</Label>
              <Input
                value={invoiceForm.invoiceNumber}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, invoiceNumber: e.target.value })}
                placeholder="INV-001"
                data-testid="input-invoice-number"
              />
            </div>
            <div>
              <Label>{t("Description")}</Label>
              <Input
                value={invoiceForm.description}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, description: e.target.value })}
                placeholder="Invoice description"
                data-testid="input-invoice-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
              <Label>{t("Amount")}</Label>
                <Input
                  value={invoiceForm.amount}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInvoiceForm({ ...invoiceForm, amount: val, amountCents: Math.round(parseFloat(val.replace(/[^0-9.]/g, "")) * 100) || 0 });
                  }}
                  placeholder="$5,000.00"
                  data-testid="input-invoice-amount"
                />
              </div>
              <div>
              <Label>{t("Amount (cents)")}</Label>
                <Input
                  type="number"
                  value={invoiceForm.amountCents || ""}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, amountCents: parseInt(e.target.value) || 0 })}
                  placeholder="500000"
                  data-testid="input-invoice-amount-cents"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("Issue Date")}</Label>
                <Input
                  type="date"
                  value={invoiceForm.issueDate}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, issueDate: e.target.value })}
                  data-testid="input-invoice-issue-date"
                />
              </div>
              <div>
                <Label>{t("Due Date")}</Label>
                <Input
                  type="date"
                  value={invoiceForm.dueDate}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                  data-testid="input-invoice-due-date"
                />
              </div>
            </div>
            <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200 flex items-start gap-3">
              <p className="text-xs text-zinc-900">This invoice will be visible to the client immediately in their portal. They can pay using the Pay Now button.</p>
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-accent text-white hover:bg-primary gap-2"
                onClick={() => {
                  if (!engagementId) return;
                  createInvoiceMutation.mutate({ ...invoiceForm, engagementId });
                }}
                disabled={createInvoiceMutation.isPending}
                data-testid="button-submit-invoice"
              >
                {createInvoiceMutation.isPending ? t("Sending...") : t("Create & Send Invoice")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={createContractOpen} onOpenChange={setCreateContractOpen}>
        <DialogContent className="max-w-md" data-testid="create-contract-dialog">
          <DialogHeader>
            <DialogTitle>{t("Upload Agreement / Document")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t("Title")}</Label>
              <Input
                value={contractForm.title}
                onChange={(e) => setContractForm({ ...contractForm, title: e.target.value })}
                placeholder="Contract title"
                data-testid="input-contract-title"
              />
            </div>
            <div>
              <Label>{t("Terms & Conditions")}</Label>
              <Textarea
                value={contractForm.terms}
                onChange={(e) => setContractForm({ ...contractForm, terms: e.target.value })}
                placeholder="Contract terms and conditions..."
                rows={6}
                data-testid="input-contract-terms"
              />
            </div>
            <div>
              <Label>{t("Attach Document (PDF, DOC, etc.)")}</Label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  ref={contractFileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xlsx,.pptx"
                  className="hidden"
                  data-testid="input-contract-file"
                  onChange={(e) => setContractFile(e.target.files?.[0] || null)}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => contractFileRef.current?.click()}
                  data-testid="button-choose-contract-file"
                >
                  {contractFile ? t("Change File") : t("Choose File")}
                </Button>
                {contractFile && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    {contractFile.name}
                  </span>
                )}
              </div>
            </div>
            <div>
              <Label>{t("Document Date")}</Label>
              <Input
                type="date"
                value={contractForm.documentDate}
                onChange={(e) => setContractForm({ ...contractForm, documentDate: e.target.value })}
                data-testid="input-contract-date"
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-accent text-white hover:bg-primary gap-2"
                onClick={() => {
                  if (!engagementId) return;
                  createContractMutation.mutate({ ...contractForm, engagementId });
                }}
                disabled={createContractMutation.isPending}
                data-testid="button-submit-contract"
              >
                {createContractMutation.isPending ? t("Uploading...") : t("Upload Agreement")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
