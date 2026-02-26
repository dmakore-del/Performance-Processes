import { PortalLayout } from "@/components/layout/PortalLayout";
import { Receipt, FileText, CheckCircle2, Loader2, CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useToast } from "@/hooks/use-toast";
import type { Invoice, Contract } from "@shared/schema";

export default function Billing() {
  const { engagement, engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: invoices, isLoading: invLoading } = usePortalData<Invoice[]>("invoices", engagementId);
  const { data: contracts, isLoading: conLoading } = usePortalData<Contract[]>("contracts", engagementId);
  const { toast } = useToast();

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

  const handlePayNow = (inv: Invoice) => {
    toast({
      title: "Payment",
      description: `Payment processing for ${inv.invoiceNumber} is not available in demo mode.`,
    });
  };

  const handleUpdatePayment = () => {
    toast({
      title: "Payment Method",
      description: "Payment method update is not available in demo mode.",
    });
  };

  const handleSignContract = (contract: Contract) => {
    toast({
      title: "Contract Signing",
      description: `Signing for "${contract.title}" is not available in demo mode.`,
    });
  };

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="billing-title">Billing & Agreements</h1>
          <p className="text-lg text-muted-foreground" data-testid="billing-subtitle">Manage invoices, payments, and view engagement contracts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary" data-testid="invoices-heading">Recent Invoices</h3>
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
                            onClick={() => handlePayNow(inv)}
                            data-testid={`button-pay-${inv.id}`}
                          >
                            <DollarSign size={12} className="mr-1" />
                            Pay Now
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

            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex justify-between items-center" data-testid="payment-method-card">
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-primary" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Payment Method</p>
                  <p className="font-bold text-primary">Visa ending in 4242</p>
                </div>
              </div>
              <Button variant="outline" className="text-xs" onClick={handleUpdatePayment} data-testid="button-update-payment">Update</Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary" data-testid="contracts-heading">Contracts & Agreements</h3>
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
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {contract.status === 'signed' ? (
                        <CheckCircle2 size={20} className="text-green-500" data-testid={`contract-signed-${contract.id}`} />
                      ) : (
                        <Button
                          className="bg-accent text-white hover:bg-primary text-xs px-4 h-8 rounded-lg"
                          onClick={() => handleSignContract(contract)}
                          data-testid={`button-sign-${contract.id}`}
                        >
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
    </PortalLayout>
  );
}
