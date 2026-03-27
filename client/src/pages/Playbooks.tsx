import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { ShoppingCart, X, Plus, Minus, CheckCircle2, ArrowRight, BookOpen, Layers, Rocket, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ppLogo from "@assets/ChatGPT_Image_Feb_21,_2026,_09_32_25_PM_1774628332564.png";
import foundationsImg from "@assets/generated/playbook-foundations.png";
import systemsImg from "@assets/generated/playbook-systems.png";
import advancedImg from "@assets/generated/playbook-advanced.png";

interface PlaybookProduct {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  description: string;
  idealFor: string;
  included: string[];
  tier: "foundations" | "systems" | "advanced";
  tagline: string;
}

interface CartItem {
  product: PlaybookProduct;
  quantity: number;
}

interface StripeProductRow {
  product_id: string;
  product_name: string;
  product_description: string;
  product_metadata: Record<string, string>;
  price_id: string;
  unit_amount: number;
  currency: string;
}

const PLAYBOOK_PRODUCTS: PlaybookProduct[] = [
  {
    id: "performance-kickstart",
    name: "The Performance Kickstart Kit",
    price: 49,
    priceLabel: "$49",
    description: "Everything you need to set meaningful goals, build weekly momentum, and track what matters.",
    idealFor: "New managers, solo founders, and professionals who want structure without complexity.",
    included: ["Goal-setting templates", "Weekly planning tools", "Personal performance scorecard", "Progress tracking guide"],
    tier: "foundations",
    tagline: "Start strong. Stay consistent.",
  },
  {
    id: "hiring-right",
    name: "The Hiring Right Playbook",
    price: 29,
    priceLabel: "$29",
    description: "Hire with confidence using structured templates that reduce bias and improve outcomes.",
    idealFor: "Growing teams, first-time hiring managers, and HR professionals building repeatable processes.",
    included: ["Job description templates", "Interview scorecards", "Onboarding checklists", "Candidate evaluation rubrics"],
    tier: "foundations",
    tagline: "Better hires. Fewer regrets.",
  },
  {
    id: "sops-that-scale",
    name: "The SOPs That Scale Starter Pack",
    price: 25,
    priceLabel: "$25",
    description: "Document your processes so your team can execute without you in the room.",
    idealFor: "Operations leads, growing teams, and founders preparing to delegate.",
    included: ["SOP templates", "Process mapping guide", "Team accountability tracker", "Quality checklist framework"],
    tier: "foundations",
    tagline: "Build once. Scale forever.",
  },
  {
    id: "managers-first-90",
    name: "The Manager's First 90 Days",
    price: 29,
    priceLabel: "$29",
    description: "Hit the ground running in a new leadership role with a clear plan for your first three months.",
    idealFor: "Newly promoted managers, leaders transitioning to new teams, and first-time people managers.",
    included: ["Transition plan template", "Team assessment framework", "Quick-win action planner", "Stakeholder mapping tool"],
    tier: "foundations",
    tagline: "Lead with clarity from day one.",
  },
  {
    id: "strategic-planning-blueprint",
    name: "The Strategic Planning Blueprint",
    price: 149,
    priceLabel: "$149",
    description: "A complete strategic planning system to align your team, set priorities, and build a roadmap that sticks.",
    idealFor: "Leadership teams, department heads, and organizations entering a new growth phase.",
    included: ["Strategic planning workbook", "SWOT analysis framework", "OKR setting templates", "1-3 year roadmap builder", "Quarterly review guide"],
    tier: "systems",
    tagline: "From vision to execution.",
  },
  {
    id: "performance-management-system",
    name: "The Performance Management System",
    price: 129,
    priceLabel: "$129",
    description: "A ready-to-deploy performance management system with KPIs, review cycles, and feedback frameworks.",
    idealFor: "HR leaders, COOs, and organizations building or overhauling their performance infrastructure.",
    included: ["KPI library (100+ metrics)", "Review cycle templates", "Feedback frameworks", "Performance dashboard template", "Calibration guide"],
    tier: "systems",
    tagline: "Measure what matters. Manage with intention.",
  },
  {
    id: "culture-engagement-toolkit",
    name: "The Culture & Engagement Toolkit",
    price: 99,
    priceLabel: "$99",
    description: "Understand and shape your workplace culture with practical tools for engagement and alignment.",
    idealFor: "People & culture teams, founders building intentional culture, and HR professionals.",
    included: ["Engagement survey templates", "Culture audit framework", "Values alignment workshop guide", "Action planning templates"],
    tier: "systems",
    tagline: "Culture by design, not by default.",
  },
  {
    id: "organizational-design",
    name: "The Organizational Design Playbook",
    price: 199,
    priceLabel: "$199",
    description: "Redesign your organization for clarity, efficiency, and growth with proven structural frameworks.",
    idealFor: "CEOs, COOs, and leadership teams navigating restructuring, rapid growth, or role confusion.",
    included: ["Org structure templates", "Role clarity matrices", "RACI charts", "Restructuring guide", "Span of control analysis", "Communication flow mapping"],
    tier: "advanced",
    tagline: "Design the organization your strategy demands.",
  },
  {
    id: "executive-transition",
    name: "The Executive Transition Toolkit",
    price: 149,
    priceLabel: "$149",
    description: "Navigate senior leadership transitions with a structured approach to the critical first 100 days.",
    idealFor: "Incoming executives, board members overseeing transitions, and HR supporting C-suite changes.",
    included: ["Leadership transition roadmap", "Stakeholder mapping tool", "First 100 days plan", "Board reporting templates", "Team alignment framework"],
    tier: "advanced",
    tagline: "Set the tone. Build trust. Deliver early wins.",
  },
  {
    id: "change-management",
    name: "The Change Management Playbook",
    price: 89,
    priceLabel: "$89",
    description: "Lead organizational change with confidence using proven frameworks for communication, adoption, and resistance.",
    idealFor: "Change leaders, project managers, and organizations undergoing transformation or integration.",
    included: ["Change readiness assessment", "Communication plan templates", "Resistance management guide", "Adoption tracker", "Stakeholder engagement playbook"],
    tier: "advanced",
    tagline: "Change happens. Lead it.",
  },
];

const TIER_CONFIG = {
  foundations: {
    label: "Foundations",
    description: "Essential tools and templates to get started with structure and clarity",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    image: foundationsImg,
  },
  systems: {
    label: "Systems",
    description: "Comprehensive frameworks to build and scale your organizational infrastructure",
    icon: Layers,
    color: "from-accent to-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-700",
    image: systemsImg,
  },
  advanced: {
    label: "Advanced",
    description: "Enterprise-grade playbooks for senior leaders navigating complex organizational challenges",
    icon: Rocket,
    color: "from-primary to-blue-900",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    textColor: "text-slate-700",
    image: advancedImg,
  },
};

function ProductCard({ product, onAddToCart, isInCart }: { product: PlaybookProduct; onAddToCart: (p: PlaybookProduct) => void; isInCart: boolean }) {
  const tier = TIER_CONFIG[product.tier];
  const [showIncluded, setShowIncluded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group" data-testid={`card-playbook-${product.id}`}>
      <div className={`relative overflow-hidden rounded-t-2xl p-6 bg-gradient-to-br ${tier.color} flex items-center justify-center h-44`}>
        <img src={ppLogo} alt="Performance Processes" className="h-16 w-auto opacity-20 absolute top-4 right-4" />
        <div className="text-white text-center relative z-10">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3">{tier.label}</p>
          <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-sm italic text-muted-foreground mb-3">{product.tagline}</p>
        <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{product.description}</p>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Ideal for</p>
          <p className="text-sm text-foreground/70">{product.idealFor}</p>
        </div>
        <button
          onClick={() => setShowIncluded(!showIncluded)}
          className="text-xs font-bold text-accent hover:text-accent/80 transition-colors mb-3 text-left flex items-center gap-1"
          data-testid={`toggle-included-${product.id}`}
        >
          {showIncluded ? "Hide" : "What's included"} ({product.included.length} items)
          <ArrowRight size={12} className={`transition-transform ${showIncluded ? "rotate-90" : ""}`} />
        </button>
        {showIncluded && (
          <ul className="mb-4 space-y-1.5">
            {product.included.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{product.priceLabel}</span>
          <button
            onClick={() => onAddToCart(product)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              isInCart
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-accent text-white hover:bg-primary"
            }`}
            data-testid={`button-add-cart-${product.id}`}
          >
            {isInCart ? (
              <>
                <CheckCircle2 size={16} />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({
  cart,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  isCheckingOut,
}: {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
}) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[200] flex justify-end" data-testid="cart-drawer">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} data-testid="cart-backdrop" />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <ShoppingCart size={22} />
            Your Cart ({cart.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors" data-testid="button-close-cart">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Browse our playbooks and add items to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="bg-secondary/50 rounded-xl p-4 flex gap-4" data-testid={`cart-item-${item.product.id}`}>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-primary truncate">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{TIER_CONFIG[item.product.tier].label}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-full border border-border hover:bg-white transition-colors"
                        data-testid={`button-decrease-${item.product.id}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-full border border-border hover:bg-white transition-colors"
                        data-testid={`button-increase-${item.product.id}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                      data-testid={`button-remove-${item.product.id}`}
                    >
                      <X size={16} />
                    </button>
                    <span className="font-bold text-primary">${item.product.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary">Total</span>
              <span className="text-2xl font-bold text-primary" data-testid="text-cart-total">${total} CAD</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-accent text-white font-bold rounded-full hover:bg-primary transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              data-testid="button-checkout"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            <p className="text-xs text-center text-muted-foreground">Secure checkout powered by Stripe. All prices in CAD.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Playbooks() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "success") {
      toast({
        title: "Payment successful!",
        description: "Thank you for your purchase. Your playbook will be delivered to your email shortly.",
      });
      setCart([]);
      window.history.replaceState({}, "", "/playbooks");
    } else if (payment === "cancelled") {
      toast({
        title: "Payment cancelled",
        description: "Your payment was not completed.",
        variant: "destructive",
      });
      window.history.replaceState({}, "", "/playbooks");
    }
  }, []);

  const { data: productsData } = useQuery({
    queryKey: ["/api/products"],
  });

  const checkoutMutation = useMutation({
    mutationFn: async (items: { priceId: string; quantity: number }[]) => {
      const res = await apiRequest("POST", "/api/cart-checkout", { items });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      toast({
        title: "Checkout error",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const cartProductIds = useMemo(() => new Set(cart.map((item) => item.product.id)), [cart]);

  const addToCart = (product: PlaybookProduct) => {
    if (cartProductIds.has(product.id)) {
      setCartOpen(true);
      return;
    }
    setCart((prev) => [...prev, { product, quantity: 1 }]);
    toast({ title: "Added to cart", description: product.name });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== id));
      return;
    }
    setCart((prev) => prev.map((item) => (item.product.id === id ? { ...item, quantity: qty } : item)));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleCheckout = () => {
    if (!productsData?.data) {
      toast({
        title: "Loading...",
        description: "Products are still loading. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    const items: { priceId: string; quantity: number }[] = [];
    const missing: string[] = [];

    for (const cartItem of cart) {
      const stripeProduct = (productsData.data as StripeProductRow[]).find((p) => p.product_name === cartItem.product.name);
      if (stripeProduct) {
        items.push({ priceId: stripeProduct.price_id, quantity: cartItem.quantity });
      } else {
        missing.push(cartItem.product.name);
      }
    }

    if (missing.length > 0) {
      toast({
        title: "Some items are unavailable",
        description: `Unable to process: ${missing.join(", ")}. Please remove them and try again.`,
        variant: "destructive",
      });
      return;
    }

    checkoutMutation.mutate(items);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const tiers: Array<"foundations" | "systems" | "advanced"> = ["foundations", "systems", "advanced"];

  return (
    <>
      <SEOHead
        title="Performance Playbooks | Performance Processes"
        description="Digital tools, templates, and frameworks to build organizational performance systems. From goal-setting kits to enterprise change management playbooks."
        path="/playbooks"
      />
      <Navbar />

      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-[100] bg-accent text-white rounded-full p-4 shadow-2xl hover:bg-primary transition-all flex items-center gap-2 group"
          data-testid="button-floating-cart"
        >
          <ShoppingCart size={22} />
          <span className="font-bold" data-testid="text-cart-count">{cartCount}</span>
        </button>
      )}

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
          isCheckingOut={checkoutMutation.isPending}
        />
      )}

      <section className="relative bg-gradient-to-br from-primary via-primary to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimateOnScroll animation="fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Performance Systems & Tools
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                Proven frameworks, templates, and playbooks built from real consulting engagements.
                Everything you need to build organizational performance — without starting from scratch.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Instant digital delivery</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Ready-to-use templates</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Built by consultants</span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {tiers.map((tierKey) => {
        const tier = TIER_CONFIG[tierKey];
        const TierIcon = tier.icon;
        const products = PLAYBOOK_PRODUCTS.filter((p) => p.tier === tierKey);

        return (
          <section key={tierKey} className="py-20 md:py-24 bg-white even:bg-secondary/30" data-testid={`section-tier-${tierKey}`}>
            <div className="container mx-auto px-4 md:px-8">
              <AnimateOnScroll animation="fade-up">
                <div className="relative rounded-2xl overflow-hidden mb-12">
                  <img src={tier.image} alt={`${tier.label} playbooks`} className="w-full h-48 md:h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
                    <div className="px-8 md:px-12">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center`}>
                          <TierIcon size={20} className="text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{tier.label}</h2>
                      </div>
                      <p className="text-lg text-white/80 max-w-xl">{tier.description}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, i) => (
                  <AnimateOnScroll key={product.id} animation="fade-up" delay={i * 100}>
                    <ProductCard
                      product={product}
                      onAddToCart={addToCart}
                      isInCart={cartProductIds.has(product.id)}
                    />
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-20 md:py-24 bg-gradient-to-br from-primary via-primary to-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need something tailored?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Our playbooks are built from real consulting engagements. If you need a customized version
              or want hands-on implementation support, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm" data-testid="link-playbooks-audit">
                Book a Free Audit
                <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm" data-testid="link-playbooks-services">
                View Consulting Services
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </>
  );
}
