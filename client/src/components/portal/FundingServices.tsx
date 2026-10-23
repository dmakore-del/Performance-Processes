import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { usePortalI18n } from "@/lib/portal-i18n";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  FUNDING_SERVICES,
  latestFundingBillingMonth,
  fundingOrderSchema,
  fundingService,
  money,
  withTax,
} from "@shared/funding";
import type { FundingOrderView } from "@shared/schema";

type Props = { engagementId: number; compact?: boolean };
type CreateForm = {
  serviceKey: string;
  scopeKey: string;
  scope: string;
  funder: string;
  program: string;
  fundingKind: "grant" | "financing";
  quantity: string;
  unitFee: string;
  hstPercent: string;
  budgetCap: string;
  quoteReference: string;
  recordsDue: string;
  draftDue: string;
  approvalDue: string;
  submissionDue: string;
  percentageFeePermitted: boolean;
};
type ApprovalForm = {
  signerName: string;
  signerTitle: string;
  legalBusinessName: string;
  businessAddress: string;
  acceptTerms: boolean;
};
type DeliveryForm = { type: "draft" | "delivered"; reference: string; actualQuantity?: number; suitableResearchConfirmed?: boolean };
type PaymentForm = {
  stage: "authorization" | "draft" | "delivery" | "hourly" | "success";
  hours: string;
  period: string;
  qualifyingFunds: string;
  receiptReference: string;
  receivedDate: string;
  evidenceReference: string;
  confirmQualifyingReceipt: boolean;
};

const blankCreate = (): CreateForm => ({
  serviceKey: FUNDING_SERVICES[0].id,
  scopeKey: "",
  scope: "",
  funder: "",
  program: "",
  fundingKind: "grant",
  quantity: "1",
  unitFee: "150.00",
  hstPercent: "13",
  budgetCap: "150.00",
  quoteReference: "",
  recordsDue: "",
  draftDue: "",
  approvalDue: "",
  submissionDue: "",
  percentageFeePermitted: false,
});
const blankApproval = (): ApprovalForm => ({
  signerName: "",
  signerTitle: "",
  legalBusinessName: "",
  businessAddress: "",
  acceptTerms: false,
});
const blankDelivery = (): DeliveryForm => ({ type: "draft", reference: "" });
const blankPayment = (): PaymentForm => ({
  stage: "authorization",
  hours: "",
  period: latestFundingBillingMonth(),
  qualifyingFunds: "",
  receiptReference: "",
  receivedDate: "",
  evidenceReference: "",
  confirmQualifyingReceipt: false,
});

const serviceFeeValue = (serviceKey: string) => {
  const item = fundingService(serviceKey);
  return item?.feeCents == null ? "" : (item.feeCents / 100).toFixed(2);
};
const parseAmountCents = (value: string) => Math.round(Number(value) * 100);
const displayDate = (value: string | Date | null | undefined, locale: string) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(date);
};
export function FundingServices({ engagementId, compact = false }: Props) {
  const { user, impersonation } = useAuth();
  const { locale } = usePortalI18n();
  const fr = locale?.toLowerCase().startsWith("fr") ?? false;
  const text = (en: string, french: string) => fr ? french : en;
  const isAdmin = user?.role === "admin";
  const isClient = user?.role === "client";
  const queryKey = [`/api/portal/engagements/${engagementId}/funding-orders`];
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CreateForm>(blankCreate);
  const [approvalOrderId, setApprovalOrderId] = useState<number | null>(null);
  const [approvalForm, setApprovalForm] = useState<ApprovalForm>(blankApproval);
  const [deliveryOrderId, setDeliveryOrderId] = useState<number | null>(null);
  const [deliveryForm, setDeliveryForm] = useState<DeliveryForm>(blankDelivery);
  const [paymentOrderId, setPaymentOrderId] = useState<number | null>(null);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>(blankPayment);
  const [formError, setFormError] = useState("");

  const ordersQuery = useQuery<FundingOrderView[]>({
    queryKey,
    enabled: engagementId > 0,
  });
  const orders = ordersQuery.data ?? [];
  const selectedService = fundingService(createForm.serviceKey);
  const createPreview = useMemo(() => {
    const quantity = Number(createForm.quantity);
    const unit = parseAmountCents(createForm.unitFee);
    if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unit) || unit <= 0) return null;
    const subtotal = Math.round(quantity * unit);
    const hstBps = Math.round(Number(createForm.hstPercent) * 100);
    return Number.isFinite(hstBps) && hstBps >= 0 && hstBps <= 1500 ? withTax(subtotal, hstBps) : null;
  }, [createForm.quantity, createForm.unitFee, createForm.hstPercent]);

  const refreshAfterChange = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey }),
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/invoices`] }),
      queryClient.invalidateQueries({ queryKey: ["/api/admin/billing"] }),
    ]);
  };
  const postMutation = useMutation({
    mutationFn: async ({ url, data }: { url: string; data?: unknown }) => {
      const response = await apiRequest("POST", url, data);
      return response.json().catch(() => ({}));
    },
    onSuccess: async () => {
      setFormError("");
      await refreshAfterChange();
      setCreateOpen(false);
      setCreateForm(blankCreate());
      setApprovalOrderId(null);
      setApprovalForm(blankApproval());
      setDeliveryOrderId(null);
      setDeliveryForm(blankDelivery());
      setPaymentOrderId(null);
      setPaymentForm(blankPayment());
    },
    onError: (error: Error) => setFormError(error.message),
  });

  const outstanding = orders.filter((order) => !["declined", "withdrawn"].includes(order.status));
  const proposedCount = orders.filter((order) => order.status === "proposed").length;
  if (compact) {
    return (
      <section className="flex flex-col gap-3 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between" aria-label={text("Funding service orders", "Commandes de services de financement")}>
        <div>
          <p className="portal-kicker">{text("Funding services", "Services de financement")}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {ordersQuery.isLoading
              ? text("Loading service orders…", "Chargement des commandes…")
              : ordersQuery.isError
                ? text("Service orders are temporarily unavailable.", "Les commandes sont temporairement indisponibles.")
                : text(`${proposedCount} awaiting approval · ${outstanding.length} active service orders`, `${proposedCount} en attente d’approbation · ${outstanding.length} commandes actives`)}
          </p>
          {ordersQuery.isError && <button type="button" className="mt-1 text-xs font-semibold underline underline-offset-2" onClick={() => ordersQuery.refetch()}>{text("Retry", "Réessayer")}</button>}
        </div>
        <Link href="/portal/payments" className="inline-flex min-h-10 items-center border border-border px-4 text-sm font-semibold text-foreground hover:border-primary">
          {text("Review service orders", "Voir les commandes")}
        </Link>
      </section>
    );
  }

  if (ordersQuery.isLoading) {
    return <section className="space-y-3" aria-label={text("Funding service orders", "Commandes de services de financement")} aria-busy="true">
      <div className="h-7 w-56 animate-pulse bg-secondary" />
      <div className="h-28 animate-pulse border border-border bg-secondary/50" />
      <div className="h-28 animate-pulse border border-border bg-secondary/50" />
    </section>;
  }
  if (ordersQuery.isError) {
    return <div role="alert" className="border border-destructive/30 bg-destructive/5 p-5 text-sm">
      <p>{text("Funding service orders could not be loaded.", "Impossible de charger les commandes de financement.")}</p>
      <Button type="button" variant="outline" className="mt-3" onClick={() => ordersQuery.refetch()}>{text("Retry", "Réessayer")}</Button>
    </div>;
  }

  const orderFee = (order: FundingOrderView) => Math.round(Number(order.quantity) * order.unitFeeCents);
  const updateCreateService = (serviceKey: string) => {
    const fee = serviceFeeValue(serviceKey);
    setCreateForm((current) => ({
      ...current,
      serviceKey,
      unitFee: fee,
      budgetCap: fee ? (Number(fee) * Number(current.quantity || 1)).toFixed(2) : current.budgetCap,
      fundingKind: serviceKey === "standard-grant" ? "grant" : serviceKey === "standard-financing" ? "financing" : current.fundingKind,
    }));
  };
  const createOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const result = fundingOrderSchema.safeParse({
      serviceKey: createForm.serviceKey,
      scopeKey: createForm.scopeKey,
      scope: createForm.scope,
      funder: createForm.funder,
      program: createForm.program,
      fundingKind: createForm.fundingKind,
      quantity: createForm.quantity,
      unitFeeCents: parseAmountCents(createForm.unitFee),
      hstBps: Math.round(Number(createForm.hstPercent) * 100),
      budgetCapCents: parseAmountCents(createForm.budgetCap),
      quoteReference: createForm.quoteReference,
      recordsDue: createForm.recordsDue,
      draftDue: createForm.draftDue,
      approvalDue: createForm.approvalDue,
      submissionDue: createForm.submissionDue,
      percentageFeePermitted: createForm.percentageFeePermitted,
    });
    if (!result.success) {
      setFormError(result.error.issues.map((issue) => issue.message).join(" "));
      return;
    }
    postMutation.mutate({ url: `/api/portal/engagements/${engagementId}/funding-orders`, data: result.data });
  };
  const submitApproval = (event: FormEvent<HTMLFormElement>, orderId: number) => {
    event.preventDefault();
    setFormError("");
    postMutation.mutate({ url: `/api/portal/funding-orders/${orderId}/approve`, data: { ...approvalForm, acceptTerms: approvalForm.acceptTerms } });
  };

  return (
    <section className="space-y-6" aria-label={text("Funding service orders", "Commandes de services de financement")}>
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="portal-kicker">{text("Engagement services", "Services du mandat")}</p>
          <h2 className="mt-2 text-2xl font-heading font-medium">{text("Grant & financing orders", "Commandes de subvention et financement")}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {text("Each application or project has its own written scope and approval. No work or payment obligation begins until the client approves an order.", "Chaque demande ou projet fait l’objet d’une portée écrite et d’une approbation distincte. Aucun travail ni paiement n’est exigible avant l’approbation du client.")}
          </p>
        </div>
        {isAdmin && <Button type="button" onClick={() => { setCreateOpen((open) => !open); setFormError(""); }} aria-expanded={createOpen}>
          {createOpen ? text("Close order form", "Fermer le formulaire") : text("Assign a service", "Attribuer un service")}
        </Button>}
      </header>

      {formError && <p role="alert" className="border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{formError}</p>}
      {impersonation && <p className="text-sm text-muted-foreground">{text("Viewing as a client does not permit approving fees on their behalf. The client must sign in to authorize their order.", "La consultation du compte client ne permet pas d’approuver des honoraires en son nom. Le client doit se connecter pour autoriser sa commande.")}</p>}

      {createOpen && isAdmin && (
        <form onSubmit={createOrder} className="space-y-6 border border-border bg-card p-4 sm:p-6">
          <div>
            <p className="portal-kicker">{text("New proposed order", "Nouvelle commande proposée")}</p>
            <h3 className="mt-2 text-xl font-heading">{text("Define the service and its limits", "Définir le service et ses limites")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text("Fixed rates follow the agreement. Complex applications and business plans require the final quoted amount.", "Les tarifs fixes suivent l’entente. Les demandes complexes et plans d’affaires exigent le montant final du devis.")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={text("Service", "Service")} required>
              <select className={selectClass} value={createForm.serviceKey} onChange={(event) => updateCreateService(event.target.value)} required>
                {FUNDING_SERVICES.map((service) => <option key={service.id} value={service.id}>{fr ? service.fr : service.name}</option>)}
              </select>
            </Field>
            <Field label={text("Unique scope reference", "Référence unique de portée")} required hint={text("Reuse only for the same actual application or project, including its included readiness assessment. Separate searches need separate references.", "À réutiliser uniquement pour la même demande ou le même projet, y compris l’évaluation de préparation incluse. Les recherches distinctes exigent une autre référence.")}>
              <Input value={createForm.scopeKey} minLength={3} maxLength={160} onChange={(event) => setCreateForm({ ...createForm, scopeKey: event.target.value })} placeholder={text("e.g. North-site expansion", "p. ex. Agrandissement du site nord")} required />
            </Field>
            <Field label={text("Detailed scope", "Portée détaillée")} required hint={text("Describe the actual application, project, outputs and boundaries (20–6,000 characters).", "Décrivez la demande, le projet, les livrables et les limites (20 à 6 000 caractères).")}>
              <Textarea value={createForm.scope} minLength={20} maxLength={6000} rows={4} onChange={(event) => setCreateForm({ ...createForm, scope: event.target.value })} required />
            </Field>
            <div className="grid content-start gap-4">
              <Field label={text("Quantity", "Quantité")} required hint={text(selectedService?.id === "research" ? "Number of suitable opportunities." : selectedService?.id === "hourly-support" ? "Approved hours; use 0.25-hour increments." : "One per application, project or financial model.", selectedService?.id === "research" ? "Nombre d’occasions pertinentes." : selectedService?.id === "hourly-support" ? "Heures autorisées, par incréments de 0,25." : "Une par demande, projet ou modèle financier.")}>
                <Input type="number" min="0.25" step={selectedService?.timing === "hourly" ? "0.25" : "1"} max="10000" value={createForm.quantity} onChange={(event) => setCreateForm({ ...createForm, quantity: event.target.value })} required />
              </Field>
              <Field label={text("Unit fee (CAD, before HST)", "Tarif unitaire (CAD, avant TVH)")} required hint={selectedService?.id === "projections" ? text("Agreement minimum: $490.00 CAD.", "Minimum de l’entente : 490,00 $ CAD.") : selectedService?.feeCents != null ? text("Agreement rate — locked.", "Tarif de l’entente — verrouillé.") : text("Enter the final agreed quote.", "Saisissez le montant final convenu.")}>
                <Input type="number" min={selectedService?.id === "projections" ? "490" : "0.01"} step="0.01" value={createForm.unitFee} disabled={selectedService?.feeCents != null && selectedService.id !== "projections"} onChange={(event) => setCreateForm({ ...createForm, unitFee: event.target.value })} required />
              </Field>
              <Field label={text("HST rate (%)", "Taux de TVH (%)")} required>
                <Input type="number" min="0" max="15" step="0.01" value={createForm.hstPercent} onChange={(event) => setCreateForm({ ...createForm, hstPercent: event.target.value })} required />
              </Field>
            </div>
            <Field label={text("Approved before-tax budget cap (CAD)", "Plafond budgétaire approuvé avant TVH (CAD)")} required hint={text("Must cover the full approved service fee; HST is calculated separately.", "Doit couvrir la totalité des honoraires approuvés; la TVH est calculée séparément.")}>
              <Input type="number" min="0.01" step="0.01" value={createForm.budgetCap} onChange={(event) => setCreateForm({ ...createForm, budgetCap: event.target.value })} required />
            </Field>
            <Field label={text("Quotation / agreement reference", "Référence du devis / de l’entente")} required>
              <Input value={createForm.quoteReference} minLength={3} maxLength={300} onChange={(event) => setCreateForm({ ...createForm, quoteReference: event.target.value })} required />
            </Field>
          </div>

          {selectedService?.application && (
            <fieldset className="space-y-4 border-t border-border pt-5">
              <legend className="px-1 text-sm font-semibold">{text("Funding details", "Détails du financement")}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={text("Funder or lender", "Organisme ou prêteur")} required><Input value={createForm.funder} maxLength={200} onChange={(event) => setCreateForm({ ...createForm, funder: event.target.value })} required /></Field>
                <Field label={text("Program, product or intake", "Programme, produit ou période de dépôt")} required><Input value={createForm.program} maxLength={240} onChange={(event) => setCreateForm({ ...createForm, program: event.target.value })} required /></Field>
                <Field label={text("Funding type", "Type de financement")} required>
                  <select className={selectClass} value={createForm.fundingKind} disabled={createForm.serviceKey === "standard-grant" || createForm.serviceKey === "standard-financing"} onChange={(event) => setCreateForm({ ...createForm, fundingKind: event.target.value as "grant" | "financing" })}>
                    <option value="grant">{text("Grant", "Subvention")}</option><option value="financing">{text("Financing / loan", "Financement / prêt")}</option>
                  </select>
                </Field>
              </div>
              <label className="flex items-start gap-3 text-sm leading-6">
                <input type="checkbox" className="mt-1 size-4 accent-primary" checked={createForm.percentageFeePermitted} onChange={(event) => setCreateForm({ ...createForm, percentageFeePermitted: event.target.checked })} />
                <span>{text("I have confirmed this funder/lender and program/product/intake permits the 6% success fee for this application service.", "J’ai confirmé que cet organisme/prêteur et ce programme/produit/période permettent les frais de succès de 6 % pour ce service de demande.")}</span>
              </label>
            </fieldset>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {([
              ["recordsDue", text("Client records due", "Documents du client requis")],
              ["draftDue", text("Draft due", "Ébauche prévue")],
              ["approvalDue", text("Approval due", "Approbation prévue")],
              ["submissionDue", text("Submission due", "Dépôt prévu")],
            ] as const).map(([key, label]) => <Field key={key} label={label}><Input type="date" value={createForm[key]} onChange={(event) => setCreateForm({ ...createForm, [key]: event.target.value })} /></Field>)}
          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
            <div className="text-sm">
              <p className="text-muted-foreground">{text("Calculated service fee · HST separate", "Honoraires calculés · TVH distincte")}</p>
              <p className="mt-1 font-semibold">{createPreview ? `${money(createPreview.base, fr ? "fr" : "en")} + ${money(createPreview.tax, fr ? "fr" : "en")} ${text("HST", "TVH")} = ${money(createPreview.total, fr ? "fr" : "en")}` : "—"}</p>
            </div>
            <Button type="submit" disabled={postMutation.isPending}>{postMutation.isPending ? text("Saving…", "Enregistrement…") : text("Send proposed order", "Envoyer la commande proposée")}</Button>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">{text("No minimum monthly fee, automatic charge or recurring funding-service payment. Submission, disclosure and credit checks require separate approval.", "Aucun minimum mensuel, prélèvement automatique ni frais récurrent de service de financement. Le dépôt, la divulgation et les vérifications de crédit exigent une approbation distincte.")}</p>
        </form>
      )}

      {orders.length === 0 ? (
        <div className="border border-dashed border-border bg-card px-6 py-10 text-center">
          <h3 className="font-heading text-xl">{text("No service orders yet", "Aucune commande de service")}</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{text(isAdmin ? "Assign a scoped grant or financing service when there is a specific opportunity or project to work on." : "When a service is proposed for your engagement, its scope, fees and approval will appear here.", isAdmin ? "Attribuez un service de subvention ou financement délimité lorsqu’une occasion ou un projet précis est identifié." : "Lorsqu’un service est proposé pour votre mandat, sa portée, ses frais et son approbation apparaîtront ici.")}</p>
          {isAdmin && !createOpen && <Button type="button" variant="outline" className="mt-5" onClick={() => setCreateOpen(true)}>{text("Assign a service", "Attribuer un service")}</Button>}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const service = fundingService(order.serviceKey);
            const serviceName = service ? (fr ? service.fr : service.name) : order.serviceKey;
            const baseFee = orderFee(order);
            const tax = withTax(baseFee, order.hstBps);
            const statusText: Record<string, [string, string]> = {
              proposed: ["Awaiting client approval", "En attente de l’approbation du client"],
              approved: ["Approved · work authorized", "Approuvée · travail autorisé"],
              declined: ["Declined", "Refusée"],
              withdrawn: ["Withdrawn", "Retirée"],
            };
            const orderStatus = statusText[order.status]?.[fr ? 1 : 0] ?? order.status.replaceAll("-", " ");
            const hasDraft = Boolean(order.draftProvidedAt || order.draftReference);
            const hasDelivery = Boolean(order.deliveredAt || order.deliveryReference);
            const paymentOpen = paymentOrderId === order.id;
            const paymentPreview = paymentPreviewFor(order, paymentForm);
            const availableStages = service?.timing === "split"
              ? [
                  ...(!order.charges.some((charge) => charge.stageKey === "authorization") ? ["authorization" as const] : []),
                  ...(hasDraft && !order.charges.some((charge) => charge.stageKey === "draft") ? ["draft" as const] : []),
                ]
              : service?.timing === "delivery" && hasDelivery && !order.charges.some((charge) => charge.stageKey === "delivery") ? ["delivery" as const]
              : service?.timing === "hourly" && order.approvedAt && new Date(order.approvedAt).toISOString().slice(0, 7) <= latestFundingBillingMonth() ? ["hourly" as const]
              : [];
            const canSuccess = Boolean(service?.application && (hasDraft || hasDelivery));
            const available = isAdmin && order.status === "approved" ? [...availableStages, ...(canSuccess ? ["success" as const] : [])] : [];

            return <article key={order.id} className="border border-border bg-card">
              <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-heading">{serviceName}</h3>
                    <span className="border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">{orderStatus}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{text("Scope reference", "Référence de portée")}: <span className="font-mono">{order.scopeKey}</span></p>
                </div>
                <p className="shrink-0 text-sm font-semibold">{money(tax.total, fr ? "fr" : "en")} <span className="font-normal text-muted-foreground">{text("incl. HST", "TVH incl.")}</span></p>
              </div>

              <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
                <div className="space-y-4">
                  <Info label={text("Scope", "Portée")} value={order.scope} multiline />
                  {service?.includesReadiness && <p className="border-l-2 border-accent pl-3 text-sm leading-6 text-muted-foreground">{text("Includes the funding readiness / eligibility assessment described in the agreement.", "Comprend l’évaluation de préparation et d’admissibilité au financement décrite dans l’entente.")}</p>}
                  <Info label={text("Funder / lender", "Organisme / prêteur")} value={order.funder || "—"} />
                  <Info label={text("Program / product / intake", "Programme / produit / période")} value={order.program || "—"} />
                  {service?.application && <Info label={text("Funding type", "Type de financement")} value={order.fundingKind === "grant" ? text("Grant", "Subvention") : text("Financing", "Financement")} />}
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 border-b border-border pb-4 text-sm">
                    <span className="text-muted-foreground">{text("Quantity", "Quantité")}</span><span className="text-right">{order.quantity} {service?.unit ?? ""}</span>
                    <span className="text-muted-foreground">{text("Unit rate", "Tarif unitaire")}</span><span className="text-right">{money(order.unitFeeCents, fr ? "fr" : "en")}</span>
                    <span className="text-muted-foreground">{text("Before-tax fee", "Honoraires avant taxe")}</span><span className="text-right">{money(baseFee, fr ? "fr" : "en")}</span>
                    <span className="text-muted-foreground">{text(`HST (${(order.hstBps / 100).toFixed(2)}%)`, `TVH (${(order.hstBps / 100).toFixed(2)} %)` )}</span><span className="text-right">{money(tax.tax, fr ? "fr" : "en")}</span>
                    <span className="font-semibold">{text("Total", "Total")}</span><span className="text-right font-semibold">{money(tax.total, fr ? "fr" : "en")}</span>
                    <span className="text-muted-foreground">{text("Approved fee cap", "Plafond approuvé")}</span><span className="text-right">{money(order.budgetCapCents, fr ? "fr" : "en")}</span>
                  </div>
                  <Info label={text("Quotation reference", "Référence du devis")} value={order.quoteReference} />
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <DateInfo label={text("Records due", "Documents requis")} value={order.recordsDue} locale={locale} />
                    <DateInfo label={text("Draft due", "Ébauche")} value={order.draftDue} locale={locale} />
                    <DateInfo label={text("Approval due", "Approbation")} value={order.approvalDue} locale={locale} />
                    <DateInfo label={text("Submission due", "Dépôt")} value={order.submissionDue} locale={locale} />
                  </div>
                </div>
              </div>

              {(order.status === "approved" || hasDraft || hasDelivery) && (
                <div className="grid gap-3 border-t border-border bg-secondary/25 p-4 text-sm sm:grid-cols-2 sm:p-5">
                  <Info label={text("Authorized signer", "Signataire autorisé")} value={order.signerName ? `${order.signerName}, ${order.signerTitle || ""} · ${order.legalBusinessName || ""}` : text("Not recorded", "Non enregistré")} />
                  {order.signerName && <Info label={text("Signer business address", "Adresse commerciale du signataire")} value={order.businessAddress || "—"} multiline />}
                  <Info label={text("Approved", "Approuvée")} value={displayDate(order.approvedAt, locale)} />
                  {(hasDraft || hasDelivery) && <Info label={text("Draft reference", "Référence de l’ébauche")} value={order.draftReference || "—"} multiline />}
                  {hasDraft && <Info label={text("Draft recorded", "Ébauche enregistrée")} value={displayDate(order.draftProvidedAt, locale)} />}
                  {hasDelivery && <Info label={text("Delivery reference", "Référence de livraison")} value={order.deliveryReference || "—"} multiline />}
                  {order.serviceKey === "research" && order.deliveredQuantity != null && <Info label={text("Suitable opportunities delivered", "Occasions admissibles livrées")} value={String(order.deliveredQuantity)} />}
                  {hasDelivery && <Info label={text("Delivered", "Livrée")} value={displayDate(order.deliveredAt, locale)} />}
                </div>
              )}

              {order.charges.length > 0 && (
                <div className="border-t border-border p-4 sm:p-5">
                  <h4 className="text-sm font-semibold">{text("Requested payments", "Paiements demandés")}</h4>
                  <div className="mt-3 divide-y divide-border border-y border-border">
                    {order.charges.map((charge) => <div key={charge.id} className="grid gap-2 py-3 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center">
                      <div>
                        <p className="font-medium">{stageLabel(charge.stageKey, fr)} · {charge.invoiceNumber}</p>
                        <p className="text-xs text-muted-foreground">{text("Invoice", "Facture")}: {charge.invoiceStatus} · {text("Base", "Avant taxe")} {money(charge.baseAmountCents, fr ? "fr" : "en")} · {text("HST", "TVH")} {money(charge.hstAmountCents, fr ? "fr" : "en")}</p>
                        {charge.stageKey.startsWith("success") && <p className="mt-1 text-xs text-muted-foreground">{text("Funds received", "Fonds reçus")}: {money(charge.qualifyingFundsCents ?? 0, fr ? "fr" : "en")} · {charge.receiptReference || "—"} · {charge.receivedDate ? displayDate(charge.receivedDate, locale) : "—"}</p>}
                        {charge.hours && <p className="mt-1 text-xs text-muted-foreground">{charge.hours} {text("hours", "heures")} · {charge.evidenceReference}</p>}
                      </div>
                      <p className="font-semibold">{money(charge.baseAmountCents + charge.hstAmountCents, fr ? "fr" : "en")}</p>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">{charge.invoiceStatus}</span>
                    </div>)}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-border p-4 sm:p-5">
                {isClient && !impersonation && order.status === "proposed" && (
                  <>
                    {approvalOrderId !== order.id ? <div className="flex flex-wrap gap-2">
                      <Button type="button" onClick={() => { setApprovalOrderId(order.id); setApprovalForm(blankApproval()); setFormError(""); }}>{text("Review & approve", "Examiner et approuver")}</Button>
                      <Button type="button" variant="outline" disabled={postMutation.isPending} onClick={() => {
                        if (window.confirm(text("Decline this proposed service order?", "Refuser cette proposition de service?"))) postMutation.mutate({ url: `/api/portal/funding-orders/${order.id}/decline` });
                      }}>{text("Decline", "Refuser")}</Button>
                    </div> : (
                      <form onSubmit={(event) => submitApproval(event, order.id)} className="space-y-4 border border-border bg-secondary/20 p-4">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">{text("Client authorization", "Autorisation du client")}</p>
                          <p className="text-sm leading-6 text-muted-foreground">{text("Approval authorizes only this stated scope, fee, budget cap and agreement. A 6% success fee applies only to qualifying funds actually received; no approval, undrawn credit or repeated redraw is included. HST is additional. No monthly minimum or automatic recurring fee. Submission, disclosure and credit checks need separate approval.", "L’approbation autorise uniquement la portée, les frais, le plafond et l’entente indiqués. Les frais de succès de 6 % s’appliquent uniquement aux fonds admissibles réellement reçus; aucune approbation, marge non tirée ou nouvelle utilisation répétée n’est incluse. La TVH s’ajoute. Aucun minimum mensuel ou prélèvement récurrent automatique. Le dépôt, la divulgation et les vérifications de crédit exigent une approbation distincte.")}</p>
                          <a href="/api/portal/funding-agreement" target="_blank" rel="noopener noreferrer" className="inline-flex text-sm font-semibold underline underline-offset-4">{text("Read the funding services agreement", "Lire l’entente de services de financement")}</a>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Field label={text("Authorized signer name", "Nom du signataire autorisé")} required><Input value={approvalForm.signerName} minLength={2} maxLength={120} onChange={(event) => setApprovalForm({ ...approvalForm, signerName: event.target.value })} required /></Field>
                          <Field label={text("Title", "Titre")} required><Input value={approvalForm.signerTitle} minLength={2} maxLength={120} onChange={(event) => setApprovalForm({ ...approvalForm, signerTitle: event.target.value })} required /></Field>
                          <Field label={text("Legal business name", "Raison sociale légale")} required><Input value={approvalForm.legalBusinessName} minLength={2} maxLength={200} onChange={(event) => setApprovalForm({ ...approvalForm, legalBusinessName: event.target.value })} required /></Field>
                          <Field label={text("Business address", "Adresse de l’entreprise")} required><Textarea value={approvalForm.businessAddress} minLength={10} maxLength={500} rows={2} onChange={(event) => setApprovalForm({ ...approvalForm, businessAddress: event.target.value })} required /></Field>
                        </div>
                        <label className="flex items-start gap-3 text-sm leading-6">
                          <input type="checkbox" className="mt-1 size-4 accent-primary" checked={approvalForm.acceptTerms} onChange={(event) => setApprovalForm({ ...approvalForm, acceptTerms: event.target.checked })} required />
                          <span>{text("I am authorized to bind this business. I have reviewed and explicitly accept the service scope, fees, approved cap and full funding services agreement.", "Je suis autorisé à engager cette entreprise. J’ai lu et j’accepte explicitement la portée, les frais, le plafond approuvé et l’entente complète de services de financement.")}</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <Button type="submit" disabled={postMutation.isPending || !approvalForm.acceptTerms}>{postMutation.isPending ? text("Submitting…", "Envoi…") : text("Approve this order", "Approuver cette commande")}</Button>
                          <Button type="button" variant="outline" onClick={() => setApprovalOrderId(null)}>{text("Cancel", "Annuler")}</Button>
                        </div>
                      </form>
                    )}
                  </>
                )}

                {isAdmin && order.status === "proposed" && <Button type="button" variant="outline" className="self-start" disabled={postMutation.isPending} onClick={() => {
                  if (window.confirm(text("Withdraw this proposal? Create a replacement if changes are needed.", "Retirer cette proposition? Créez-en une nouvelle si des changements sont nécessaires."))) postMutation.mutate({ url: `/api/portal/funding-orders/${order.id}/withdraw` });
                }}>{text("Withdraw proposal", "Retirer la proposition")}</Button>}

                {isAdmin && order.status === "approved" && (
                  <div className="flex flex-col gap-4">
                     {deliveryOrderId !== order.id ? <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" onClick={() => { setDeliveryOrderId(order.id); setDeliveryForm({ type: hasDraft ? "delivered" : "draft", reference: "" }); setFormError(""); }}>{text(hasDraft ? "Record delivery" : "Record draft or delivery", hasDraft ? "Enregistrer la livraison" : "Enregistrer l’ébauche ou livraison")}</Button>
                    </div> : (
                      <form className="grid gap-3 border border-border bg-secondary/20 p-4 sm:grid-cols-[180px_1fr_auto]" onSubmit={(event) => {
                        event.preventDefault();
                        postMutation.mutate({ url: `/api/portal/funding-orders/${order.id}/delivery`, data: deliveryForm });
                      }}>
                        <Field label={text("Milestone", "Étape")} required>
                          <select className={selectClass} value={deliveryForm.type} onChange={(event) => setDeliveryForm({ ...deliveryForm, type: event.target.value as "draft" | "delivered" })}>
                            <option value="draft">{text("Draft provided", "Ébauche fournie")}</option><option value="delivered">{text("Delivered", "Livrée")}</option>
                          </select>
                        </Field>
                        <Field label={text("Reference (required)", "Référence (obligatoire)")} required hint={text("Enter a real document, secure portal or delivery record reference.", "Saisissez une référence réelle de document, portail sécurisé ou livraison.")}>
                          <Input value={deliveryForm.reference} minLength={10} maxLength={1500} onChange={(event) => setDeliveryForm({ ...deliveryForm, reference: event.target.value })} required />
                        </Field>
                         {order.serviceKey === "research" && deliveryForm.type === "delivered" && <div className="space-y-3 sm:col-span-3">
                           <Field label={text("Actual suitable opportunities delivered", "Occasions admissibles effectivement livrées")} required hint={text("Only delivered results are invoiced, not the unused authorized maximum. Reference each written summary above.", "Seuls les résultats livrés sont facturés, et non le maximum inutilisé. Référencez chaque résumé écrit ci-dessus.")}>
                             <Input type="number" min="1" max={Number(order.quantity)} step="1" value={deliveryForm.actualQuantity || ""} onChange={(event) => setDeliveryForm({ ...deliveryForm, actualQuantity: Number(event.target.value) })} required />
                           </Field>
                           <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={!!deliveryForm.suitableResearchConfirmed} onChange={(event) => setDeliveryForm({ ...deliveryForm, suitableResearchConfirmed: event.target.checked })} className="mt-1 size-4 accent-primary" /><span>{text("These are distinct, suitable opportunities with written summaries, eligibility considerations and next steps. No raw listings, unsuitable or duplicate opportunities are included.", "Il s’agit d’occasions distinctes et pertinentes accompagnées de résumés écrits, de critères d’admissibilité et des prochaines étapes. Aucune liste brute, occasion non pertinente ou doublon n’est inclus.")}</span></label>
                         </div>}
                        <div className="flex items-end gap-2"><Button type="submit" disabled={postMutation.isPending}>{text("Save", "Enregistrer")}</Button><Button type="button" variant="outline" onClick={() => setDeliveryOrderId(null)}>{text("Cancel", "Annuler")}</Button></div>
                      </form>
                    )}
                    {available.length > 0 && (paymentOrderId !== order.id ? (
                      <div className="flex flex-wrap gap-2">
                        {available.map((stage) => <Button key={stage} type="button" variant={stage === "success" ? "outline" : "default"} onClick={() => { setPaymentOrderId(order.id); setPaymentForm({ ...blankPayment(), stage }); setFormError(""); }}>{text(`Request ${stageLabel(stage, false)} payment`, `Demander le paiement — ${stageLabel(stage, true)}`)}</Button>)}
                      </div>
                    ) : <PaymentRequestForm
                      order={order}
                      form={paymentForm}
                      setForm={setPaymentForm}
                      preview={paymentPreview}
                      onSubmit={(event) => {
                        event.preventDefault();
                        const payload: Record<string, unknown> = { stage: paymentForm.stage };
                        if (paymentForm.stage === "hourly") Object.assign(payload, { hours: Number(paymentForm.hours), period: paymentForm.period, evidenceReference: paymentForm.evidenceReference });
                        if (paymentForm.stage === "success") Object.assign(payload, {
                          qualifyingFundsCents: parseAmountCents(paymentForm.qualifyingFunds),
                          receiptReference: paymentForm.receiptReference,
                          receivedDate: paymentForm.receivedDate,
                          evidenceReference: paymentForm.evidenceReference,
                          confirmQualifyingReceipt: paymentForm.confirmQualifyingReceipt,
                        });
                        postMutation.mutate({ url: `/api/portal/funding-orders/${order.id}/request-payment`, data: payload });
                      }}
                      pending={postMutation.isPending}
                      onCancel={() => setPaymentOrderId(null)}
                      fr={fr}
                    />)}
                  </div>
                )}
              </div>
            </article>;
          })}
        </div>
      )}
      <p className="text-xs leading-5 text-muted-foreground">{text("Hourly support is invoiced at month-end for actual time within the approved cap. Service-order payment requests create invoices here; they do not automatically charge a card or send email.", "Le soutien horaire est facturé en fin de mois selon le temps réel, dans le plafond approuvé. Les demandes créent des factures ici, sans débit automatique ni courriel.")}</p>
    </section>
  );
}

const selectClass = "min-h-10 w-full border border-input bg-background px-3 py-2 text-sm";

function Field({ label, children, required, hint }: { label: string; children: ReactNode; required?: boolean; hint?: string }) {
  return <label className="block space-y-1.5">
    <span className="block text-sm font-medium">{label}{required && <span aria-hidden="true"> *</span>}</span>
    {children}
    {hint && <span className="block text-xs leading-5 text-muted-foreground">{hint}</span>}
  </label>;
}

function Info({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return <div className="min-w-0">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={`mt-1 text-sm leading-6 ${multiline ? "whitespace-pre-wrap break-words" : "break-words"}`}>{value}</p>
  </div>;
}

function DateInfo({ label, value, locale }: { label: string; value: string | null; locale: string }) {
  return <div><p className="text-muted-foreground">{label}</p><p className="mt-1">{displayDate(value, locale)}</p></div>;
}

function stageLabel(stage: string, fr: boolean) {
  const labels: Record<string, [string, string]> = {
    authorization: ["Authorization", "Autorisation"],
    draft: ["Draft", "Ébauche"],
    delivery: ["Delivery", "Livraison"],
    hourly: ["Hourly support", "Soutien horaire"],
    success: ["Success fee", "Frais de succès"],
  };
  return labels[stage]?.[fr ? 1 : 0] ?? stage;
}

function paymentPreviewFor(order: FundingOrderView, form: PaymentForm) {
  const unit = order.unitFeeCents;
  let base = 0;
  if (form.stage === "authorization") base = Math.ceil(Math.round(Number(order.quantity) * unit) / 2);
  if (form.stage === "draft") base = Math.round(Number(order.quantity) * unit) - Math.ceil(Math.round(Number(order.quantity) * unit) / 2);
  if (form.stage === "delivery") base = Math.round(Number(order.serviceKey === "research" ? order.deliveredQuantity || 0 : order.quantity) * unit);
  if (form.stage === "hourly") base = Math.round(Number(form.hours) * unit);
  if (form.stage === "success") base = Math.round(parseAmountCents(form.qualifyingFunds) * 0.06);
  if (!Number.isFinite(base) || base <= 0) return null;
  const amounts = withTax(base, order.hstBps);
  return amounts;
}

function PaymentRequestForm({
  order, form, setForm, preview, onSubmit, pending, onCancel, fr,
}: {
  order: FundingOrderView;
  form: PaymentForm;
  setForm: (form: PaymentForm) => void;
  preview: ReturnType<typeof paymentPreviewFor>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pending: boolean;
  onCancel: () => void;
  fr: boolean;
}) {
  const service = fundingService(order.serviceKey);
  const remainingHours = Math.max(0, Number(order.quantity) - order.charges.reduce((sum, charge) => sum + Number(charge.hours || 0), 0));
  return <form onSubmit={onSubmit} className="space-y-4 border border-border bg-secondary/20 p-4">
    <div>
      <p className="text-sm font-semibold">{fr ? `Demande de paiement — ${stageLabel(form.stage, true)}` : `Payment request — ${stageLabel(form.stage, false)}`}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {form.stage === "success"
          ? (fr ? "6 % des fonds admissibles réellement reçus; les fonds approuvés ou le crédit non tiré ne comptent pas." : "6% of qualifying funds actually received; approvals and undrawn credit do not count.")
          : form.stage === "hourly"
            ? (fr ? `Taux convenu : ${money(order.unitFeeCents, "fr")}/h. Solde autorisé : ${remainingHours} h.` : `Agreed rate: ${money(order.unitFeeCents, "en")}/hour. Approved hours remaining: ${remainingHours}.`)
            : (fr ? "Le montant est calculé à partir du tarif approuvé; la TVH est séparée." : "Amount is calculated from the approved rate; HST is separate.")}
      </p>
    </div>
    {form.stage === "hourly" && <div className="grid gap-3 sm:grid-cols-3">
      <Field label={fr ? "Heures réellement effectuées" : "Actual hours completed"} required>
        <Input type="number" min="0.25" max={remainingHours} step="0.25" value={form.hours} onChange={(event) => setForm({ ...form, hours: event.target.value })} required />
      </Field>
      <Field label={fr ? "Mois complété (AAAA-MM)" : "Completed month (YYYY-MM)"} required>
        <Input type="month" min={order.approvedAt ? new Date(order.approvedAt).toISOString().slice(0, 7) : undefined} max={latestFundingBillingMonth()} value={form.period} onChange={(event) => setForm({ ...form, period: event.target.value })} required />
      </Field>
      <Field label={fr ? "Référence de preuve" : "Evidence reference"} required>
        <Input minLength={10} maxLength={1500} value={form.evidenceReference} onChange={(event) => setForm({ ...form, evidenceReference: event.target.value })} required />
      </Field>
    </div>}
    {form.stage === "success" && <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={fr ? "Fonds admissibles effectivement reçus (CAD)" : "Qualifying funds actually received (CAD)"} required>
          <Input type="number" min="0.01" step="0.01" value={form.qualifyingFunds} onChange={(event) => setForm({ ...form, qualifyingFunds: event.target.value })} required />
        </Field>
        <Field label={fr ? "Date de réception" : "Date funds received"} required>
          <Input type="date" value={form.receivedDate} onChange={(event) => setForm({ ...form, receivedDate: event.target.value })} required />
        </Field>
        <Field label={fr ? "Référence unique du reçu bancaire / organisme" : "Unique bank / funder receipt reference"} required>
          <Input minLength={3} maxLength={200} value={form.receiptReference} onChange={(event) => setForm({ ...form, receiptReference: event.target.value })} required />
        </Field>
        <Field label={fr ? "Référence de preuve" : "Evidence reference"} required>
          <Input minLength={10} maxLength={1500} value={form.evidenceReference} onChange={(event) => setForm({ ...form, evidenceReference: event.target.value })} required />
        </Field>
      </div>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input type="checkbox" className="mt-1 size-4 accent-primary" checked={form.confirmQualifyingReceipt} onChange={(event) => setForm({ ...form, confirmQualifyingReceipt: event.target.checked })} required />
        <span>{fr ? "Je confirme que ces fonds admissibles ont effectivement été reçus. Aucune approbation ou marge non tirée n’est comptabilisée." : "I confirm these qualifying funds have actually been received. No approval or undrawn credit is counted."}</span>
      </label>
    </div>}
    <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm">
        <span className="text-muted-foreground">{fr ? "Aperçu calculé : " : "Calculated preview: "}</span>
        {preview ? <strong>{money(preview.base, fr ? "fr" : "en")} + {money(preview.tax, fr ? "fr" : "en")} HST = {money(preview.total, fr ? "fr" : "en")}</strong> : "—"}
      </p>
      <div className="flex gap-2">
        <Button type="submit" disabled={pending || !preview || (form.stage === "hourly" && Number(form.hours) > remainingHours) || (form.stage === "success" && !form.confirmQualifyingReceipt)}>{fr ? "Créer la facture" : "Request invoice"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>{fr ? "Annuler" : "Cancel"}</Button>
      </div>
    </div>
    {service?.application && form.stage === "success" && <p className="text-xs leading-5 text-muted-foreground">{fr ? "Une demande de subvention ou financement doit avoir une ébauche documentée ou avoir été livrée avant de demander les frais de succès." : "An application must have a documented draft or delivery before requesting its success fee."}</p>}
  </form>;
}
