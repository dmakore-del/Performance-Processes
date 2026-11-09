export function CheckoutReturnNotice({ french = false }: { french?: boolean }) {
  const payment = typeof window === "undefined"
    ? null
    : new URLSearchParams(window.location.search).get("payment");

  if (payment !== "success" && payment !== "cancelled") return null;

  return (
    <div role="status" className="mx-auto mt-8 max-w-7xl border border-primary/20 bg-secondary px-5 py-4 text-sm leading-6 md:px-8">
      {payment === "success"
        ? french
          ? "Le prestataire de paiement vous a redirigé ici. Nous vérifions la confirmation du paiement avant de confirmer la suite."
          : "The payment provider returned you here. We’re checking payment confirmation before confirming next steps."
        : french
          ? "Le paiement n’a pas été complété. Vous pouvez reprendre lorsque vous le souhaitez."
          : "Checkout was not completed. You can return to any service whenever you’re ready."}
    </div>
  );
}
