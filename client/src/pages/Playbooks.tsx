import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { ShoppingCart, X, Plus, Minus, CheckCircle2, ArrowRight, BookOpen, Layers, Rocket, Loader2, Star, Package, ChevronDown, ChevronUp } from "lucide-react";
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
  included: string[];
  tier: "foundation" | "build" | "run";
  tagline: string;
  isBundle?: boolean;
  isFlagship?: boolean;
  bundleContents?: string[];
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

interface FlagshipOption {
  id: string;
  name: string;
  label: string;
  price: number;
  priceLabel: string;
  description: string;
  included: string[];
}

const FLAGSHIP_OPTIONS: FlagshipOption[] = [
  {
    id: "growth-infrastructure-system-standard",
    name: "Growth Infrastructure System (Standard)",
    label: "Standard",
    price: 299,
    priceLabel: "$299",
    description: "Core frameworks and templates for all three phases.",
    included: [
      "Foundation phase frameworks and templates",
      "Build phase implementation guides",
      "Run phase optimization playbooks",
      "KPI libraries and scorecard templates",
      "Implementation checklist",
    ],
  },
  {
    id: "growth-infrastructure-system-complete",
    name: "Growth Infrastructure System (Complete)",
    label: "Complete",
    price: 499,
    priceLabel: "$499",
    description: "Everything in Standard, plus advanced tools and the full 90-day roadmap.",
    included: [
      "Foundation phase frameworks and templates",
      "Build phase implementation guides",
      "Run phase optimization playbooks",
      "KPI libraries and scorecard templates",
      "Hiring, performance, and operations systems",
      "Marketing and conversion frameworks",
      "Strategic planning workbook",
      "90-day implementation roadmap",
    ],
  },
];

const PLAYBOOK_PRODUCTS: PlaybookProduct[] = [
  {
    id: "hiring-system",
    name: "Hiring System",
    price: 199,
    priceLabel: "$199",
    description: "Build a repeatable hiring process that attracts, evaluates, and onboards the right people, every time.",
    included: ["Job description templates", "Interview scorecards", "Candidate evaluation rubrics", "Onboarding checklists", "Hiring process flowcharts", "Implementation guide"],
    tier: "foundation",
    tagline: "Better hires. Fewer regrets.",
  },
  {
    id: "operations-blueprint",
    name: "Operations & SOP Blueprint",
    price: 199,
    priceLabel: "$199",
    description: "Document and systematize your operations so your team can execute without you in the room.",
    included: ["SOP templates", "Process mapping frameworks", "Team accountability tracker", "Quality checklist system", "Delegation frameworks", "Implementation steps"],
    tier: "foundation",
    tagline: "Build once. Scale forever.",
  },
  {
    id: "leadership-transition-system",
    name: "Leadership Transition System",
    price: 199,
    priceLabel: "$199",
    description: "Equip new managers with a structured plan for their first 90 days of leadership.",
    included: ["Transition plan template", "Team assessment framework", "Quick-win action planner", "Stakeholder mapping tool", "Communication cadence template", "30/60/90 day milestones"],
    tier: "foundation",
    tagline: "Lead with clarity from day one.",
  },
  {
    id: "performance-foundation-system",
    name: "Performance Foundation System",
    price: 149,
    priceLabel: "$149",
    description: "Install the goal-setting, tracking, and accountability infrastructure every team needs to perform.",
    included: ["Goal-setting frameworks", "Weekly planning system", "Personal performance scorecard", "Progress tracking templates", "Team alignment tools", "Implementation checklist"],
    tier: "foundation",
    tagline: "Start strong. Stay consistent.",
  },
  {
    id: "strategic-planning-system",
    name: "Strategic Planning System",
    price: 299,
    priceLabel: "$299",
    description: "Align your team, set priorities, and build a roadmap that converts strategy into execution.",
    included: ["Strategic planning workbook", "SWOT analysis framework", "OKR setting templates", "1 to 3 year roadmap builder", "Quarterly review system", "Team alignment workshop guide"],
    tier: "build",
    tagline: "From vision to execution.",
  },
  {
    id: "performance-management-system",
    name: "Performance Management System",
    price: 279,
    priceLabel: "$279",
    description: "Implement a complete performance management system with KPIs, review cycles, and feedback frameworks across your organization.",
    included: ["KPI library (100+ metrics)", "Review cycle templates", "Feedback frameworks", "Performance dashboard template", "Calibration system", "Implementation roadmap"],
    tier: "build",
    tagline: "Measure what matters. Manage with intention.",
  },
  {
    id: "culture-engagement-system",
    name: "Culture & Engagement System",
    price: 249,
    priceLabel: "$249",
    description: "Design and embed the culture your organization needs to attract, retain, and motivate top performers.",
    included: ["Engagement survey system", "Culture audit framework", "Values alignment workshop", "Action planning templates", "Retention strategy builder", "Implementation timeline"],
    tier: "build",
    tagline: "Culture by design, not by default.",
  },
  {
    id: "organizational-design-system",
    name: "Organizational Design System",
    price: 399,
    priceLabel: "$399",
    description: "Redesign your organization for clarity, efficiency, and sustainable growth using proven structural frameworks.",
    included: ["Org structure templates", "Role clarity matrices", "RACI charts", "Restructuring guide", "Span of control analysis", "Communication flow mapping", "Change impact assessment"],
    tier: "run",
    tagline: "Design the organization your strategy demands.",
  },
  {
    id: "executive-transition-framework",
    name: "Executive Transition Framework",
    price: 299,
    priceLabel: "$299",
    description: "Navigate senior leadership transitions with a structured approach to the critical first 100 days.",
    included: ["Leadership transition roadmap", "Stakeholder mapping tool", "First 100 days plan", "Board reporting templates", "Team alignment framework", "Quick-win identification system"],
    tier: "run",
    tagline: "Set the tone. Build trust. Deliver early wins.",
  },
  {
    id: "change-management-system",
    name: "Change Management System",
    price: 249,
    priceLabel: "$249",
    description: "Lead organizational change with confidence using proven frameworks for communication, adoption, and resistance management.",
    included: ["Change readiness assessment", "Communication plan templates", "Resistance management system", "Adoption tracker", "Stakeholder engagement framework", "Post-change optimization guide"],
    tier: "run",
    tagline: "Change happens. Lead it.",
  },
];

const BUNDLE_PRODUCTS: PlaybookProduct[] = [
  {
    id: "business-foundation-kit",
    name: "Business Foundation Kit",
    price: 399,
    priceLabel: "$399",
    description: "Everything you need to design the structure, roles, and systems your business needs before scaling.",
    included: ["Hiring System", "Operations & SOP Blueprint", "Performance Foundation System", "Leadership Transition System"],
    tier: "foundation",
    tagline: "Design the business. Then build it.",
    isBundle: true,
    bundleContents: ["Hiring System", "Operations & SOP Blueprint", "Performance Foundation System", "Leadership Transition System"],
  },
  {
    id: "growth-engine-kit",
    name: "Growth Engine Kit",
    price: 599,
    priceLabel: "$599",
    description: "Implement the strategy, performance, and culture systems that drive scalable growth.",
    included: ["Strategic Planning System", "Performance Management System", "Culture & Engagement System"],
    tier: "build",
    tagline: "Build the engine. Fuel the growth.",
    isBundle: true,
    bundleContents: ["Strategic Planning System", "Performance Management System", "Culture & Engagement System"],
  },
  {
    id: "execution-scaling-kit",
    name: "Execution & Scaling Kit",
    price: 699,
    priceLabel: "$699",
    description: "Optimize, restructure, and scale your organization with advanced execution frameworks.",
    included: ["Organizational Design System", "Executive Transition Framework", "Change Management System"],
    tier: "run",
    tagline: "Operate at scale. Optimize continuously.",
    isBundle: true,
    bundleContents: ["Organizational Design System", "Executive Transition Framework", "Change Management System"],
  },
];

const TIER_CONFIG = {
  foundation: {
    label: "Foundation",
    subtitle: "Design the business",
    description: "Design the structure and systems your business needs to scale",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    image: foundationsImg,
  },
  build: {
    label: "Build",
    subtitle: "Implement systems and infrastructure",
    description: "Implement the people, tools, and growth systems",
    icon: Layers,
    color: "from-accent to-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-700",
    image: systemsImg,
  },
  run: {
    label: "Run",
    subtitle: "Operate and optimize",
    description: "Operate, optimize, and scale performance continuously",
    icon: Rocket,
    color: "from-primary to-blue-900",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    textColor: "text-slate-700",
    image: advancedImg,
  },
};

function FlagshipCard({ options, onAddToCart, cartProductIds }: { options: FlagshipOption[]; onAddToCart: (p: PlaybookProduct) => void; cartProductIds: Set<string> }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selected = options[selectedIndex];
  const isInCart = cartProductIds.has(selected.id);

  const productForCart: PlaybookProduct = {
    id: selected.id,
    name: selected.name,
    price: selected.price,
    priceLabel: selected.priceLabel,
    description: selected.description,
    included: selected.included,
    tier: "foundation",
    tagline: "The full methodology. One system.",
    isFlagship: true,
  };

  return (
    <div className="relative bg-gradient-to-br from-primary via-primary to-blue-900 rounded-3xl overflow-hidden shadow-2xl" data-testid="card-flagship-playbook">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Star size={14} />
              Flagship System
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Growth Infrastructure System</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Our complete methodology in one system. Design, build, and run scalable business infrastructure using the same frameworks we deploy in consulting engagements.
            </p>

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Select your edition</p>
              <div className="flex gap-3">
                {options.map((opt, i) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedIndex(i)}
                    className={`flex-1 rounded-xl p-4 border-2 transition-all text-left ${
                      selectedIndex === i
                        ? "border-accent bg-accent/10"
                        : "border-white/15 bg-white/5 hover:border-white/30"
                    }`}
                    data-testid={`button-flagship-option-${i}`}
                  >
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${selectedIndex === i ? "text-accent" : "text-white/50"}`}>
                      {opt.label}
                    </p>
                    <p className="text-2xl font-bold text-white">{opt.priceLabel}</p>
                    <p className="text-xs text-white/60 mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onAddToCart(productForCart)}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                isInCart
                  ? "bg-green-500/20 text-green-300 border border-green-400/30"
                  : "bg-accent text-white hover:bg-white hover:text-primary"
              }`}
              data-testid="button-add-cart-flagship"
            >
              {isInCart ? (
                <>
                  <CheckCircle2 size={18} />
                  In Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add {selected.label} to Cart
                </>
              )}
            </button>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">What's included in {selected.label}</p>
            <ul className="space-y-2.5">
              {selected.included.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BundleCard({ product, onAddToCart, isInCart }: { product: PlaybookProduct; onAddToCart: (p: PlaybookProduct) => void; isInCart: boolean }) {
  const tier = TIER_CONFIG[product.tier];
  const [showContents, setShowContents] = useState(false);

  return (
    <div className="bg-white rounded-2xl border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden" data-testid={`card-bundle-${product.id}`}>
      <div className="absolute top-0 right-0">
        <div className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <Package size={10} />
          Bundle
        </div>
      </div>
      <div className={`p-6 bg-gradient-to-br ${tier.color} text-white`}>
        <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">{tier.label} Phase</p>
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-sm text-white/80 leading-relaxed">{product.description}</p>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <button
          onClick={() => setShowContents(!showContents)}
          className="text-xs font-bold text-accent hover:text-accent/80 transition-colors mb-3 text-left flex items-center gap-1"
          data-testid={`toggle-bundle-${product.id}`}
        >
          {showContents ? "Hide" : "What's included"} ({product.bundleContents?.length || 0} systems)
          {showContents ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {showContents && (
          <ul className="space-y-2 mb-6 flex-1">
            {product.bundleContents?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
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
                Add Bundle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

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
        <button
          onClick={() => setShowIncluded(!showIncluded)}
          className="text-xs font-bold text-accent hover:text-accent/80 transition-colors mb-3 text-left flex items-center gap-1"
          data-testid={`toggle-included-${product.id}`}
        >
          {showIncluded ? "Hide" : "What's included"} ({product.included.length} items)
          {showIncluded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
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
              <p className="text-sm mt-1">Browse our systems and add items to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="bg-secondary/50 rounded-xl p-4 flex gap-4" data-testid={`cart-item-${item.product.id}`}>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-primary truncate">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.product.isBundle ? "Bundle" : item.product.isFlagship ? "Flagship" : TIER_CONFIG[item.product.tier].label}
                    </p>
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

  const { data: productsData } = useQuery<{ data: StripeProductRow[] }>({
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
    if (qty > 10) return;
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
      const stripeProduct = productsData.data.find((p) => p.product_name === cartItem.product.name);
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

  const tiers: Array<"foundation" | "build" | "run"> = ["foundation", "build", "run"];

  return (
    <>
      <SEOHead
        title="Growth Infrastructure Systems | Performance Processes"
        description="Structured systems, frameworks, and blueprints built from real consulting engagements. Design, build, and run scalable business infrastructure."
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
                Growth Infrastructure Systems
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                These are not generic resources. They are structured systems built from real consulting engagements, designed to help you design, build, and run scalable business infrastructure.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Instant digital delivery</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Implementation-ready systems</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Built by consultants</span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white" data-testid="section-flagship">
        <div className="container mx-auto px-4 md:px-8">
          <AnimateOnScroll animation="fade-up">
            <FlagshipCard
              options={FLAGSHIP_OPTIONS}
              onAddToCart={addToCart}
              cartProductIds={cartProductIds}
            />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary/30" data-testid="section-bundles">
        <div className="container mx-auto px-4 md:px-8">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Save with Bundles</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">System Bundles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Curated collections of systems grouped by phase. Get everything you need for each stage of growth at a bundled price.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BUNDLE_PRODUCTS.map((bundle, i) => (
              <AnimateOnScroll key={bundle.id} animation="fade-up" delay={i * 100}>
                <BundleCard
                  product={bundle}
                  onAddToCart={addToCart}
                  isInCart={cartProductIds.has(bundle.id)}
                />
              </AnimateOnScroll>
            ))}
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
                  <img src={tier.image} alt={`${tier.label} systems`} className="w-full h-48 md:h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
                    <div className="px-8 md:px-12">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                          <TierIcon size={20} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-white">{tier.label}</h2>
                        </div>
                      </div>
                      <p className="text-sm font-bold uppercase tracking-wider text-white/60 mb-1">{tier.subtitle}</p>
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

      <section className="py-16 bg-purple-50 border-t border-purple-100">
        <div className="container mx-auto px-4 md:px-8">
          <AnimateOnScroll animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-600 mb-4">Want Guided Learning?</p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Training Programs for Team Implementation</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                If you want structured training to help your team implement these systems together, explore our live virtual, cohort-based, and workshop training programs.
              </p>
              <Link href="/training" className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-bold px-8 h-12 uppercase tracking-wider text-sm" data-testid="link-playbooks-training">
                Explore Training Programs
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gradient-to-br from-primary via-primary to-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need something tailored?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Our systems are built from real consulting engagements. If you need a customized version
              or want hands-on implementation support, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm" data-testid="link-playbooks-contact">
                Get in Touch
                <ArrowRight size={18} />
              </Link>
              <Link href="/solutions" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all font-bold px-8 h-14 uppercase tracking-wider text-sm" data-testid="link-playbooks-services">
                View Our Solutions
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </>
  );
}
