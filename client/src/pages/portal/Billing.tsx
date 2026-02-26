import { PortalLayout } from "@/components/layout/PortalLayout";
import { Receipt, FileText, CheckCircle2, Loader2, DollarSign, Plus, Pen } from "lucide-react";
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

export default function Billing() {
  const { engagement, engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: invoices, isLoading: invLoading } = usePortalData<Invoice[]>("invoices", engagementId);
  const { data: contracts, isLoading: conLoading } = usePortalData<Contract[]>("contracts", engagementId);
  const { toast } = useToast();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      toast({
        title: "Payment successful!",
        description: "Your payment has been processed.",
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
      toast({ title: "Payment Error", description: error.message, variant: "destructive" });
    },
  });

  const signMutation = useMutation({
    mutationFn: async ({ contractId, signatureData }: { contractId: number; signatureData: string }) => {
      const res = await apiRequest("POST", `/api/portal/contracts/${contractId}/sign`, { signatureData });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Contract Signed", description: "The contract has been signed successfully." });
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/contracts`] });
      setSignDialogOpen(false);
      setSelectedContract(null);
    },
    onError: (error: Error) => {
      toast({ title: "Signing Error", description: error.message, variant: "destructive" });
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (data: typeof invoiceForm & { engagementId: number }) => {
      const res = await apiRequest("POST", "/api/portal/invoices", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Invoice Created", description: "The invoice has been created." });
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
      const res = await apiRequest("POST", "/api/portal/contracts", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Contract Created", description: "The contract has been created." });
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/contracts`] });
      setCreateContractOpen(false);
      setContractForm({ title: "", terms: "", documentDate: "" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
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

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center py-20" data-testid="billing-loading">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PortalLayout>
    );
  }

  if (!engagement && !engLoading) {
    return (
      <PortalLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="billing-empty">
          <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2">No Active Engagement</h2>
          <p className="text-muted-foreground">Your consultant will set up your engagement shortly.</p>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="billing-title">Billing & Agreements</h1>
          <p className="text-lg text-muted-foreground" data-testid="billing-subtitle">Manage invoices, payments, and view engagement contracts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary" data-testid="invoices-heading">Recent Invoices</h3>
              {isAdmin && (
                <Button
                  size="sm"
                  className="bg-accent text-white hover:bg-primary"
                  onClick={() => setCreateInvoiceOpen(true)}
                  data-testid="button-create-invoice"
                >
                  <Plus size={16} className="mr-1" />
                  Create Invoice
                </Button>
              )}
            </div>
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden" data-testid="invoices-list">
              {invoices && invoices.length > 0 ? (
                invoices.map((inv) => (
                  <div key={inv.id} className="p-6 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4" data-testid={`invoice-row-${inv.id}`}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        inv.status === 'paid' ? "bg-green-50 text-green-500" : "bg-orange-50 text-orange-500"
                      )}>
                        <Receipt size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary" data-testid={`invoice-number-${inv.id}`}>{inv.invoiceNumber}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Issued: {inv.issueDate} • Due: {inv.dueDate}</p>
                        {inv.description && <p className="text-xs text-muted-foreground mt-0.5">{inv.description}</p>}
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-2">
                      <p className="text-lg font-black text-primary" data-testid={`invoice-amount-${inv.id}`}>{inv.amount}</p>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border",
                          inv.status === 'paid' ? "bg-green-50 text-green-600 border-green-200" : "bg-orange-50 text-orange-600 border-orange-200"
                        )} data-testid={`invoice-status-${inv.id}`}>
                          {inv.status}
                        </span>
                        {inv.status !== 'paid' && (
                          <Button
                            size="sm"
                            className="bg-accent text-white hover:bg-primary text-xs h-7 px-3 rounded-lg"
                            onClick={() => payMutation.mutate(inv.id)}
                            disabled={payMutation.isPending}
                            data-testid={`button-pay-${inv.id}`}
                          >
                            <DollarSign size={12} className="mr-1" />
                            {payMutation.isPending ? "Processing..." : "Pay Now"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground" data-testid="invoices-empty">
                  No invoices found.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary" data-testid="contracts-heading">Contracts & Agreements</h3>
              {isAdmin && (
                <Button
                  size="sm"
                  className="bg-accent text-white hover:bg-primary"
                  onClick={() => setCreateContractOpen(true)}
                  data-testid="button-create-contract"
                >
                  <Plus size={16} className="mr-1" />
                  Create Contract
                </Button>
              )}
            </div>
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden" data-testid="contracts-list">
              {contracts && contracts.length > 0 ? (
                contracts.map((contract) => (
                  <div key={contract.id} className="p-6 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors flex justify-between items-center gap-4" data-testid={`contract-row-${contract.id}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary flex-shrink-0 border border-border">
                        <FileText size={20} />
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
                      {contract.status === 'signed' ? (
                        <CheckCircle2 size={20} className="text-green-500" data-testid={`contract-signed-${contract.id}`} />
                      ) : (
                        <Button
                          className="bg-accent text-white hover:bg-primary text-xs px-4 h-8 rounded-lg"
                          onClick={() => {
                            setSelectedContract(contract);
                            setSignDialogOpen(true);
                          }}
                          data-testid={`button-sign-${contract.id}`}
                        >
                          <Pen size={12} className="mr-1" />
                          Sign
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
            <DialogTitle data-testid="sign-dialog-title">Sign Contract: {selectedContract?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedContract?.terms && (
              <div className="max-h-48 overflow-y-auto border rounded-lg p-4 text-sm text-muted-foreground bg-secondary/30" data-testid="contract-terms">
                {selectedContract.terms}
              </div>
            )}
            <div>
              <Label>Signature</Label>
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
                Clear
              </Button>
              <Button
                className="bg-accent text-white hover:bg-primary"
                onClick={handleSignContract}
                disabled={signMutation.isPending}
                data-testid="button-submit-signature"
              >
                {signMutation.isPending ? "Signing..." : "Sign Contract"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={createInvoiceOpen} onOpenChange={setCreateInvoiceOpen}>
        <DialogContent className="max-w-md" data-testid="create-invoice-dialog">
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Invoice Number</Label>
              <Input
                value={invoiceForm.invoiceNumber}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, invoiceNumber: e.target.value })}
                placeholder="INV-001"
                data-testid="input-invoice-number"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={invoiceForm.description}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, description: e.target.value })}
                placeholder="Invoice description"
                data-testid="input-invoice-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Amount</Label>
                <Input
                  value={invoiceForm.amount}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: e.target.value })}
                  placeholder="$5,000.00"
                  data-testid="input-invoice-amount"
                />
              </div>
              <div>
                <Label>Amount (cents)</Label>
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
                <Label>Issue Date</Label>
                <Input
                  type="date"
                  value={invoiceForm.issueDate}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, issueDate: e.target.value })}
                  data-testid="input-invoice-issue-date"
                />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={invoiceForm.dueDate}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                  data-testid="input-invoice-due-date"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-accent text-white hover:bg-primary"
                onClick={() => {
                  if (!engagementId) return;
                  createInvoiceMutation.mutate({ ...invoiceForm, engagementId });
                }}
                disabled={createInvoiceMutation.isPending}
                data-testid="button-submit-invoice"
              >
                {createInvoiceMutation.isPending ? "Creating..." : "Create Invoice"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={createContractOpen} onOpenChange={setCreateContractOpen}>
        <DialogContent className="max-w-md" data-testid="create-contract-dialog">
          <DialogHeader>
            <DialogTitle>Create Contract</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={contractForm.title}
                onChange={(e) => setContractForm({ ...contractForm, title: e.target.value })}
                placeholder="Contract title"
                data-testid="input-contract-title"
              />
            </div>
            <div>
              <Label>Terms</Label>
              <Textarea
                value={contractForm.terms}
                onChange={(e) => setContractForm({ ...contractForm, terms: e.target.value })}
                placeholder="Contract terms and conditions..."
                rows={6}
                data-testid="input-contract-terms"
              />
            </div>
            <div>
              <Label>Document Date</Label>
              <Input
                type="date"
                value={contractForm.documentDate}
                onChange={(e) => setContractForm({ ...contractForm, documentDate: e.target.value })}
                data-testid="input-contract-date"
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-accent text-white hover:bg-primary"
                onClick={() => {
                  if (!engagementId) return;
                  createContractMutation.mutate({ ...contractForm, engagementId });
                }}
                disabled={createContractMutation.isPending}
                data-testid="button-submit-contract"
              >
                {createContractMutation.isPending ? "Creating..." : "Create Contract"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
