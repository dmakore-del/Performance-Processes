import { PortalLayout } from "@/components/layout/PortalLayout";
import { Receipt, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Billing() {
  const invoices = [
    { id: "INV-2026-042", date: "Oct 1, 2026", amount: "$5,000.00", status: "unpaid", due: "Oct 15, 2026" },
    { id: "INV-2026-028", date: "Sep 1, 2026", amount: "$7,500.00", status: "paid", due: "Sep 15, 2026" },
  ];

  const agreements = [
    { title: "Master Services Agreement", date: "Aug 15, 2026", status: "Signed" },
    { title: "Statement of Work - Phase 2", date: "Sep 28, 2026", status: "Pending Signature" },
  ];

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2">Billing & Agreements</h1>
          <p className="text-lg text-muted-foreground">Manage invoices, payments, and view engagement contracts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Invoices */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Recent Invoices</h3>
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
              {invoices.map((inv, i) => (
                <div key={i} className="p-6 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      inv.status === 'paid' ? "bg-green-50 text-green-500" : "bg-orange-50 text-orange-500"
                    )}>
                      <Receipt size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{inv.id}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Issued: {inv.date} • Due: {inv.due}</p>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto">
                    <p className="text-lg font-black text-primary">{inv.amount}</p>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mt-1 border",
                      inv.status === 'paid' ? "bg-green-50 text-green-600 border-green-200" : "bg-orange-50 text-orange-600 border-orange-200"
                    )}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Payment Method Stub */}
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Payment Method</p>
                <p className="font-bold text-primary">Visa ending in 4242</p>
              </div>
              <Button variant="outline" className="text-xs">Update</Button>
            </div>
          </div>

          {/* Agreements */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Contracts & Agreements</h3>
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
              {agreements.map((doc, i) => (
                <div key={i} className="p-6 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary flex-shrink-0 border border-border">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm">{doc.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.status === 'Signed' ? (
                      <CheckCircle2 size={20} className="text-green-500" />
                    ) : (
                      <Button className="bg-accent text-white hover:bg-primary text-xs px-4 h-8 rounded-lg">Sign</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}