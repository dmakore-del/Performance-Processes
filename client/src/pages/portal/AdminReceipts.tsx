import { PortalLayout } from "@/components/layout/PortalLayout";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Redirect } from "wouter";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { usePortalI18n } from "@/lib/portal-i18n";

interface Receipt {
  id: number; receiptNumber: string; customerEmail: string | null; customerName: string | null;
  serviceDescription: string; amountCents: number; currency: string; paymentStatus: string;
  paymentMethod: string | null; recurring: boolean; paidAt: string | null; emailStatus: string;
  emailSentAt: string | null; deliveryAttempts: number; nextDeliveryAttemptAt: string | null; createdAt: string;
}

export default function AdminReceipts() {
  const { user } = useAuth();
  const { fr, t, status: translateStatus } = usePortalI18n();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const { data = [], isLoading } = useQuery<Receipt[]>({
    queryKey: ["/api/admin/receipts", search],
    queryFn: async () => {
      const res = await fetch(`/api/admin/receipts?search=${encodeURIComponent(search)}`, { credentials: "include" });
      if (!res.ok) throw new Error("Unable to load receipts");
      return res.json();
    },
  });
  if (user && user.role !== "admin") return <Redirect to="/portal" />;
  const resendMutation = useMutation({
    mutationFn: async (id: number) => (await apiRequest("POST", `/api/admin/receipts/${id}/resend`)).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/receipts"] });
       toast({ title: t("Receipt resend started") });
    },
     onError: () => toast({ title: t("Resend failed"), description: t("Something went wrong"), variant: "destructive" }),
  });
  const money = (r: Receipt) => new Intl.NumberFormat("en-CA", { style: "currency", currency: r.currency.toUpperCase() }).format(r.amountCents / 100);
   const date = (value: string | null) => value ? new Intl.DateTimeFormat(fr ? "fr-CA" : "en-CA", { dateStyle: "medium" }).format(new Date(value)) : t("Not available");

  return <PortalLayout>
    <div className="space-y-7">
      <div>
         <p className="text-[10px] font-black uppercase tracking-[.28em] text-accent">{t("Financial administration")}</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-heading font-extrabold text-primary">{t("Receipts")}</h1>
         <p className="mt-2 text-muted-foreground">{t("Secure ledger of payments and receipt delivery.")}</p>
      </div>
      <div className="rounded-2xl bg-white border border-border p-4 shadow-sm">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("Search receipt, customer, email, or service…")} data-testid="input-receipt-search" />
      </div>
      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-primary text-white text-[10px] uppercase tracking-widest">
               <tr><th className="text-left p-4">{t("Receipt / date")}</th><th className="text-left p-4">{t("Customer")}</th><th className="text-left p-4">{t("Service")}</th><th className="text-right p-4">{t("Amount")}</th><th className="text-left p-4">{t("Payment")}</th><th className="text-left p-4">{t("Email / retry")}</th><th className="p-4"></th></tr>
            </thead>
            <tbody>
              {isLoading ? <tr><td colSpan={7} className="p-10 text-center text-muted-foreground">{t("Loading…")}</td></tr> : data.length === 0 ? <tr><td colSpan={7} className="p-10 text-center text-muted-foreground">{t("No receipts found.")}</td></tr> :
                data.map((r) => <tr key={r.id} className="border-t border-border hover:bg-secondary/30">
                  <td className="p-4"><p className="font-bold text-primary">{r.receiptNumber}</p><p className="text-xs text-muted-foreground">{date(r.paidAt || r.createdAt)}</p></td>
                   <td className="p-4"><p className="font-medium">{r.customerName || t("Not available")}</p><p className="text-xs text-muted-foreground">{r.customerEmail || t("Not available")}</p></td>
                   <td className="p-4 max-w-[220px] truncate">{r.serviceDescription}{r.recurring && <span className="ml-2 text-[10px] text-accent font-bold">{t("Recurring")}</span>}</td>
                  <td className="p-4 text-right font-bold text-primary">{money(r)}</td>
                   <td className="p-4"><span className="rounded-full bg-green-50 border border-green-200 px-2 py-1 text-[10px] font-bold uppercase text-green-700">{translateStatus(r.paymentStatus)}</span><p className="text-xs text-muted-foreground mt-1">{t(r.paymentMethod === "card" ? "Card" : r.paymentMethod === "paypal" ? "PayPal" : "Not available")}</p></td>
                   <td className="p-4"><span className={r.emailStatus === "sent" ? "text-green-700" : r.emailStatus === "failed" ? "text-red-700" : "text-muted-foreground"}>{translateStatus(r.emailStatus)}</span><p className="text-xs text-muted-foreground mt-1">{t("Attempts")}: {r.deliveryAttempts}{r.nextDeliveryAttemptAt ? ` · ${t("Next")} ${date(r.nextDeliveryAttemptAt)}` : ""}</p>{r.emailStatus === "failed" && <Button variant="link" size="sm" className="h-auto p-0 text-accent" disabled={resendMutation.isPending} onClick={() => resendMutation.mutate(r.id)}>{t("Resend now")}</Button>}</td>
                  <td className="p-4 text-right"><Button variant="outline" size="sm" asChild><a href={`/api/admin/receipts/${r.id}/pdf`} data-testid={`button-download-receipt-${r.id}`}>PDF</a></Button></td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </PortalLayout>;
}