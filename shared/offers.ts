export type OfferCategory =
  | "packages"
  | "website"
  | "marketing"
  | "crm"
  | "systems"
  | "hr-recruiting"
  | "support"
  | "bundle";

export type PriceMode = "standard" | "team";

export interface Offer {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  bestFor: string;
  includes: string[];
  category: OfferCategory;
  isMonthly?: boolean;
  isPerPerson?: boolean;
  perTeamPrice?: number;
  perTeamLabel?: string;
  isRange?: boolean;
  ctaHref?: string;
  highlight?: boolean;
}

export const OFFERS: Offer[] = [
  {
    id: "business-foundation",
    name: "Business Foundation",
    description: "Make your business official and organized with the essential guidance, registration support, and launch-ready administration to move forward with confidence.",
    price: 149500,
    priceLabel: "$1,495",
    bestFor: "Founders formalizing a new business and needing a clear, practical first step.",
    includes: ["Initial business consultation", "Structure and incorporation guidance", "Registration support", "Startup checklist", "Essential administrative setup", "One follow-up consultation"],
    category: "packages",
  },
  {
    id: "business-launch",
    name: "Business Launch",
    description: "Build a solid foundation and a professional digital presence that helps your new business look ready for customers.",
    price: 499500,
    priceLabel: "$4,995",
    bestFor: "Founders ready to move from an idea or registration into a credible, client-ready launch.",
    includes: ["Everything in Business Foundation", "Business model and pricing consultation", "Essential business systems", "Professional email setup", "Custom starter website", "Google Business Profile and foundational SEO"],
    category: "packages",
    highlight: true,
  },
  {
    id: "complete-business-build",
    name: "Complete Business Build",
    description: "Hands-on support from idea through launch, with the digital, operational, and client systems your business needs to run.",
    price: 999500,
    priceLabel: "$9,995",
    bestFor: "Founders who want one experienced partner to help build the business end to end.",
    includes: ["Everything in Business Launch", "Expanded website and brand direction", "CRM or booking-system setup", "Payment and invoicing integration", "Operational workflows and templates", "Digital launch plan and post-launch support"],
    category: "packages",
  },
  {
    id: "business-name-registration",
    name: "Business Name Search & Registration Support",
    description: "Administrative support to search, prepare, and submit your business name registration with a clear record of the next steps.",
    price: 29900,
    priceLabel: "$299",
    bestFor: "Founders who have chosen a name and want practical help making the registration process orderly.",
    includes: ["Business name availability search guidance", "Registration readiness review", "Administrative preparation and submission support", "Registration confirmation checklist", "Next-step guidance after registration"],
    category: "systems",
  },
  {
    id: "ontario-federal-incorporation",
    name: "Ontario or Federal Incorporation Support",
    description: "Practical administrative incorporation support to help you prepare and submit an Ontario or federal incorporation filing.",
    price: 69900,
    priceLabel: "$699 + government filing fees",
    bestFor: "Founders ready to incorporate who want organized, hands-on administrative support through the filing process.",
    includes: ["Incorporation pathway discussion", "Filing readiness checklist", "Administrative form preparation support", "Ontario or federal submission support", "Post-filing administrative next steps"],
    category: "systems",
  },
  {
    id: "cra-business-number",
    name: "CRA Business Number Setup",
    description: "Administrative support to set up your CRA Business Number and understand the practical information needed for your records.",
    price: 24900,
    priceLabel: "$249",
    bestFor: "Newly registered or incorporated businesses that need their CRA Business Number set up correctly.",
    includes: ["CRA Business Number setup support", "Information and document checklist", "Application preparation guidance", "Confirmation record checklist"],
    category: "systems",
  },
  {
    id: "cra-program-accounts",
    name: "CRA Program Account Setup Support",
    description: "Administrative support for relevant CRA program accounts, including GST/HST, payroll, and import/export accounts where applicable.",
    price: 29900,
    priceLabel: "$299",
    bestFor: "Businesses preparing to collect GST/HST, hire employees, or import/export goods.",
    includes: ["Program account needs review", "GST/HST, payroll, or import/export setup support as applicable", "Information checklist", "Application preparation guidance", "Account confirmation checklist"],
    category: "systems",
  },
  {
    id: "startup-compliance-checklist",
    name: "Startup Requirements & Compliance Checklist",
    description: "A practical checklist of the registrations, records, and operating requirements to organize before you launch.",
    price: 19900,
    priceLabel: "$199",
    bestFor: "Founders who want a clear administrative starting point before opening their doors.",
    includes: ["Business startup requirements review", "Customized administrative checklist", "Registration and account milestone list", "Recordkeeping and operational readiness prompts", "Recommended next steps"],
    category: "systems",
  },
  {
    id: "incorporation-cra-bundle",
    name: "Incorporation + CRA Setup Bundle",
    description: "A coordinated administrative setup covering incorporation support, your CRA Business Number, and applicable CRA program accounts.",
    price: 99500,
    priceLabel: "$995 + government filing fees",
    bestFor: "Founders who want one practical process to move from incorporation preparation into CRA setup.",
    includes: ["Ontario or federal incorporation support", "CRA Business Number setup", "CRA program account setup support as applicable", "Filing and information checklists", "Post-setup administrative next steps"],
    category: "systems",
    highlight: true,
  },
  {
    id: "growth-system",
    name: "Growth System",
    description: "A complete system to attract, capture, and convert more leads, built and installed for you.",
    price: 250000,
    priceLabel: "$2,500",
    bestFor: "Small businesses that need a reliable engine for generating and converting leads.",
    includes: [
      "Conversion-focused website or landing page structure",
      "Marketing strategy and offer positioning",
      "CRM and lead tracking setup",
      "Lead capture and follow-up workflow",
      "Campaign messaging and content direction",
      "Analytics and KPI tracking setup",
      "30-day execution plan",
    ],
    category: "marketing",
    highlight: true,
  },
  {
    id: "operations-system",
    name: "Operations System",
    description: "Document, streamline, and automate how your business runs day to day.",
    price: 500000,
    priceLabel: "$5,000",
    bestFor: "Businesses that need structure, SOPs, and systems in place before they scale.",
    includes: [
      "Full business and process audit",
      "Org structure and role clarity",
      "Standard operating procedures and playbooks",
      "KPI dashboard and reporting setup",
      "Workflow automation recommendations",
      "Tool and systems integration plan",
      "90-day implementation roadmap",
    ],
    category: "systems",
  },
  {
    id: "team-performance-system",
    name: "Team Performance System",
    description: "Hire the right people and build the structure to manage performance with confidence.",
    price: 350000,
    priceLabel: "$3,500",
    bestFor: "Growing teams that need hiring systems and a clear performance structure.",
    includes: [
      "Hiring strategy and job descriptions",
      "Recruitment and interview workflow",
      "Candidate scorecards and onboarding plan",
      "Performance review framework",
      "Role clarity and accountability map",
      "Team KPIs and check-in cadence",
    ],
    category: "hr-recruiting",
  },
  {
    id: "ongoing-performance-support",
    name: "Ongoing Performance Support",
    description: "A monthly partner to keep your systems running, measured, and improving.",
    price: 75000,
    priceLabel: "$750 / month",
    bestFor: "Businesses that want continuous support across systems, marketing, and performance.",
    includes: [
      "Monthly strategy and planning call",
      "KPI and performance review",
      "Marketing and systems optimization",
      "Process refinement and recommendations",
      "Priority support between calls",
      "Quarterly roadmap updates",
    ],
    category: "support",
    isMonthly: true,
  },

  {
    id: "starter-website",
    name: "Starter Website Package",
    description: "A simple, professional online presence to get you launched quickly.",
    price: 150000,
    priceLabel: "$1,500",
    bestFor: "Professionals, startups, and small businesses needing a simple online presence.",
    includes: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Contact form",
      "Basic on-page SEO",
      "Homepage copy support",
      "Social media links",
      "Basic launch support",
    ],
    category: "website",
  },
  {
    id: "business-website",
    name: "Business Website Package",
    description: "A stronger website to explain your services and generate leads.",
    price: 250000,
    priceLabel: "$2,500",
    bestFor: "Small businesses that need a stronger website to explain services and generate leads.",
    includes: [
      "Up to 8 pages",
      "Mobile responsive design",
      "Service pages",
      "Contact / lead form",
      "Basic SEO setup",
      "Google Business Profile integration",
      "Analytics setup",
      "Basic website copy support",
    ],
    category: "website",
    highlight: true,
  },
  {
    id: "website-conversion",
    name: "Website Conversion Package",
    description: "A website built to convert visitors into leads.",
    price: 350000,
    priceLabel: "$3,500",
    bestFor: "Businesses that need a website designed to convert visitors into leads.",
    includes: [
      "Up to 10 pages",
      "Landing page",
      "Lead capture form",
      "Conversion-focused page structure",
      "Call-to-action strategy",
      "Basic SEO setup",
      "Analytics setup",
      "Website copy support",
      "Launch support",
    ],
    category: "website",
  },

  {
    id: "marketing-starter",
    name: "Marketing Starter Package",
    description: "Structure and clarity around your marketing.",
    price: 150000,
    priceLabel: "$1,500",
    bestFor: "Small businesses that need structure and clarity around their marketing.",
    includes: [
      "Marketing audit",
      "Offer positioning review",
      "Target audience clarification",
      "Basic content direction",
      "30-day marketing action plan",
      "Recommended channels and next steps",
    ],
    category: "marketing",
  },
  {
    id: "social-media-setup",
    name: "Social Media Setup Package",
    description: "A professional social media foundation.",
    price: 120000,
    priceLabel: "$1,200",
    bestFor: "Businesses that need a professional social media foundation.",
    includes: [
      "Profile review and optimization",
      "Bio and about copy",
      "Branded content direction",
      "Content pillars",
      "10 starter post ideas",
      "Basic posting plan",
    ],
    category: "marketing",
  },
  {
    id: "campaign-setup",
    name: "Campaign Setup Package",
    description: "Everything you need to launch a campaign or promote an offer.",
    price: 250000,
    priceLabel: "$2,500",
    bestFor: "Businesses preparing to launch a campaign or promote an offer.",
    includes: [
      "Campaign strategy",
      "Audience definition",
      "Campaign messaging",
      "Landing page recommendation",
      "Email or DM outreach copy",
      "30-day campaign plan",
      "KPI tracking recommendations",
    ],
    category: "marketing",
  },
  {
    id: "growth-engine",
    name: "Growth Engine Package",
    description: "A complete basic lead generation setup.",
    price: 500000,
    priceLabel: "$5,000",
    bestFor: "Small businesses that need a complete basic lead generation setup.",
    includes: [
      "Marketing strategy",
      "Landing page or funnel structure",
      "Lead capture setup",
      "Basic CRM or lead tracking setup",
      "Campaign messaging",
      "30-day execution plan",
      "Analytics and tracking setup",
    ],
    category: "marketing",
    highlight: true,
  },

  {
    id: "crm-starter",
    name: "CRM Starter Setup",
    description: "Get your leads organized and trackable.",
    price: 150000,
    priceLabel: "$1,500",
    bestFor: "Businesses that need to organize and track leads.",
    includes: [
      "Basic CRM setup",
      "Pipeline stages",
      "Contact fields",
      "Lead source tracking",
      "Follow-up reminders",
      "Simple reporting setup",
    ],
    category: "crm",
  },
  {
    id: "lead-tracking-followup",
    name: "Lead Tracking and Follow-Up System",
    description: "A more structured sales follow-up process.",
    price: 250000,
    priceLabel: "$2,500",
    bestFor: "Businesses that need a more structured sales follow-up process.",
    includes: [
      "CRM setup",
      "Lead pipeline",
      "Follow-up workflow",
      "Email response templates",
      "Simple automation recommendations",
      "Reporting dashboard",
    ],
    category: "crm",
    highlight: true,
  },

  {
    id: "business-system-audit",
    name: "Business System Audit",
    description: "Clarity on what is and is not working in your business.",
    price: 75000,
    priceLabel: "$750",
    bestFor: "Small businesses that need clarity on what is not working.",
    includes: [
      "Review of current structure",
      "Review of website, marketing, process, and execution gaps",
      "Summary report",
      "Priority recommendations",
      "Suggested next steps",
    ],
    category: "systems",
  },
  {
    id: "foundation-sprint",
    name: "Foundation Sprint",
    description: "Build the structure your business needs before scaling.",
    price: 350000,
    priceLabel: "$3,500",
    bestFor: "Businesses that need structure before scaling.",
    includes: [
      "Role clarity",
      "Basic org structure",
      "KPI recommendations",
      "Process gap review",
      "90-day action plan",
    ],
    category: "systems",
    highlight: true,
  },
  {
    id: "hiring-strategy",
    name: "Hiring Strategy and Job Description Package",
    description: "Clear role definitions and a structured hiring plan before you start interviewing.",
    price: 150000,
    priceLabel: "$1,500",
    bestFor: "Small businesses preparing to hire who need clarity on roles, responsibilities, and the right candidate profile.",
    includes: [
      "Role intake and discovery session",
      "Job description writing (up to 2 roles)",
      "Candidate scorecard and interview rubric",
      "Compensation benchmarking guidance",
      "Recommended hiring channels",
      "30-day hiring plan",
    ],
    category: "hr-recruiting",
  },
  {
    id: "talent-sourcing-screening",
    name: "Talent Sourcing and Screening",
    description: "We source, screen, and shortlist candidates so you only meet the qualified ones.",
    price: 250000,
    priceLabel: "$2,500",
    bestFor: "Businesses that need help filling a single role without taking on the full sourcing workload.",
    includes: [
      "Sourcing across LinkedIn and relevant channels",
      "Candidate outreach and pre-screening",
      "Shortlist of qualified candidates",
      "Phone screen summaries",
      "Interview scheduling support",
      "30-day sourcing window per role",
    ],
    category: "hr-recruiting",
    highlight: true,
  },
  {
    id: "recruitment-setup",
    name: "Recruitment Setup Package",
    description: "Build a repeatable hiring system you can run yourself for every future role.",
    price: 350000,
    priceLabel: "$3,500",
    bestFor: "Growing businesses that hire regularly and want a structured, repeatable recruitment process.",
    includes: [
      "Applicant tracking workflow setup",
      "Standardized interview process and rubrics",
      "Hiring manager intake template",
      "Offer letter and onboarding templates",
      "Hiring playbook documentation",
      "Team training session",
    ],
    category: "hr-recruiting",
  },
  {
    id: "hr-foundations",
    name: "HR Foundations Package",
    description: "The core HR documentation and onboarding structure every small business needs.",
    price: 200000,
    priceLabel: "$2,000",
    bestFor: "Small businesses without dedicated HR who need core policies, onboarding, and compliance basics in place.",
    includes: [
      "Employee handbook (core policies)",
      "Onboarding checklist and welcome kit",
      "Offer letter and employment templates",
      "Performance review framework",
      "Termination and offboarding process",
      "Compliance review (Canadian employment standards)",
    ],
    category: "hr-recruiting",
  },
  {
    id: "interview-coaching",
    name: "Interview and Career Readiness Coaching",
    description: "One-on-one coaching to help professionals interview with confidence.",
    price: 75000,
    priceLabel: "$750",
    bestFor: "Professionals preparing for interviews, promotions, or career transitions.",
    includes: [
      "Resume and LinkedIn review",
      "Personal narrative and positioning",
      "Two mock interview sessions",
      "Behavioural and situational interview prep",
      "Salary negotiation coaching",
      "Follow-up and feedback document",
    ],
    category: "hr-recruiting",
  },

  {
    id: "monthly-marketing",
    name: "Monthly Marketing Support",
    description: "Ongoing marketing planning, campaigns, and reporting, with a clear monthly cadence.",
    price: 150000,
    priceLabel: "$1,500 / month",
    bestFor: "Businesses that need a marketing partner without hiring in-house.",
    includes: [
      "Monthly marketing planning",
      "Content direction",
      "Campaign support",
      "Basic reporting",
      "Optimization recommendations",
    ],
    category: "support",
    isMonthly: true,
  },
  {
    id: "monthly-growth",
    name: "Monthly Growth Support",
    description: "Marketing, website, lead tracking, and KPI support every month.",
    price: 250000,
    priceLabel: "$2,500 / month",
    bestFor: "Businesses that need broader monthly growth support.",
    includes: [
      "Marketing support",
      "Website improvement recommendations",
      "Lead tracking review",
      "KPI review",
      "Monthly strategy call",
    ],
    category: "support",
    isMonthly: true,
    highlight: true,
  },
  {
    id: "growth-partner-retainer",
    name: "Growth Partner Retainer",
    description: "Full ongoing support across marketing, CRM, website, KPIs, and process.",
    price: 400000,
    priceLabel: "$4,000 / month",
    bestFor: "Businesses that want an embedded growth partner.",
    includes: [
      "Marketing support",
      "CRM and lead tracking review",
      "Website optimization support",
      "KPI and performance review",
      "Process improvement support",
      "Monthly strategy and execution support",
    ],
    category: "support",
    isMonthly: true,
  },

  {
    id: "launch-bundle",
    name: "Launch Package",
    description: "A starter website, social setup, and launch support, in one bundle.",
    price: 300000,
    priceLabel: "$3,000",
    bestFor: "New businesses ready to launch with a complete starter setup.",
    includes: [
      "Starter Website Package",
      "Social Media Setup Package",
      "Basic launch support",
    ],
    category: "bundle",
  },
  {
    id: "growth-starter-bundle",
    name: "Growth Starter Package",
    description: "A stronger website, marketing structure, and CRM, bundled together.",
    price: 500000,
    priceLabel: "$5,000",
    bestFor: "Small businesses ready to start generating consistent leads.",
    includes: [
      "Business Website Package",
      "Marketing Starter Package",
      "CRM Starter Setup",
    ],
    category: "bundle",
    highlight: true,
  },
  {
    id: "growth-engine-bundle",
    name: "Growth Engine Package",
    description: "Conversion-focused website, campaign, and follow-up system in one bundle.",
    price: 750000,
    priceLabel: "$7,500",
    bestFor: "Businesses ready to build a real lead-generation engine.",
    includes: [
      "Website Conversion Package",
      "Campaign Setup Package",
      "Lead Tracking and Follow-Up System",
    ],
    category: "bundle",
  },
  {
    id: "scale-support-bundle",
    name: "Scale Support Package",
    description: "Foundation, growth engine, and 30-day implementation support.",
    price: 1000000,
    priceLabel: "$10,000",
    bestFor: "Businesses ready to scale with structure and supported execution.",
    includes: [
      "Foundation Sprint",
      "Growth Engine Package components",
      "30-day implementation support",
    ],
    category: "bundle",
  },
];

export const CATEGORY_META: Record<OfferCategory, { label: string; description: string; order: number }> = {
  packages: {
    label: "Launch Packages",
    description: "Three clear launch paths for founders, choose your scope, buy online, and we get started.",
    order: 0,
  },
  website: {
    label: "Websites & Digital Presence",
    description: "Websites that work, from a simple presence to a conversion engine.",
    order: 1,
  },
  marketing: {
    label: "Marketing / CRM",
    description: "Bring structure, campaigns, and lead generation to your marketing.",
    order: 2,
  },
  crm: {
    label: "CRM and Lead Tracking",
    description: "Capture, track, and follow up with your leads consistently.",
    order: 3,
  },
  systems: {
    label: "Business Setup / Systems",
    description: "Audits, frameworks, and structure for how your business runs.",
    order: 4,
  },
  "hr-recruiting": {
    label: "People / HR Support",
    description: "Hiring strategy, sourcing, HR foundations, and career coaching for growing businesses.",
    order: 5,
  },
  support: {
    label: "Monthly Support",
    description: "Monthly retainers to keep growth, marketing, and systems on track.",
    order: 6,
  },
  bundle: {
    label: "Bundled Builds",
    description: "Pre-built bundles that combine our most-requested services.",
    order: 7,
  },
};

export type ServiceCategory = Exclude<OfferCategory, "packages" | "bundle">;

export interface CategoryNarrative {
  eyebrow: string;
  problem: string;
  benefits: string[];
}

export const CATEGORY_NARRATIVE: Record<ServiceCategory, CategoryNarrative> = {
  website: {
    eyebrow: "The problem we solve",
    problem:
      "An outdated or missing website costs you credibility and leads every day. Visitors arrive, can't quickly see what you do or why to trust you, and leave without contacting you.",
    benefits: [
      "A professional presence that builds trust from the first visit",
      "More enquiries and leads from the traffic you already have",
      "Mobile-responsive design with an SEO foundation built in",
      "A site you own and can grow as your business grows",
    ],
  },
  marketing: {
    eyebrow: "The problem we solve",
    problem:
      "Most small businesses market in bursts, a post here, a campaign there, with no clear plan. Effort goes out, but leads don't come back in consistently.",
    benefits: [
      "Clear positioning and messaging your audience responds to",
      "A structured plan instead of guesswork and sporadic posting",
      "Campaigns designed to generate and convert leads",
      "Channels chosen deliberately, so budget goes where it works",
    ],
  },
  crm: {
    eyebrow: "The problem we solve",
    problem:
      "When leads live in inboxes and spreadsheets, follow-up slips and revenue quietly leaks. You can't improve a pipeline you can't see.",
    benefits: [
      "Every lead captured, tracked, and followed up on time",
      "Faster response times that win more of the deals you quote",
      "Full visibility into your pipeline and where deals stall",
      "Reporting that supports better sales decisions",
    ],
  },
  systems: {
    eyebrow: "The problem we solve",
    problem:
      "When how the business runs lives in the founder's head, delivery is inconsistent, delegation is hard, and growth adds chaos instead of profit.",
    benefits: [
      "Documented processes your team can actually run",
      "Role clarity and accountability across the business",
      "KPIs and reporting that show what's working",
      "A scalable foundation ready for your next stage of growth",
    ],
  },
  "hr-recruiting": {
    eyebrow: "The problem we solve",
    problem:
      "Bad hires are expensive and slow hiring stalls growth. Without structure, interviews are inconsistent and new people are left to figure it out alone.",
    benefits: [
      "The right hires, faster, with structured screening and scorecards",
      "A repeatable recruitment process you can run for every role",
      "Compliant HR foundations, policies, onboarding, and reviews",
      "Stronger performance management as your team grows",
    ],
  },
  support: {
    eyebrow: "The problem we solve",
    problem:
      "Systems and marketing decay without attention, and most small businesses can't justify a full-time hire to maintain them. Momentum fades month by month.",
    benefits: [
      "A senior growth partner without the cost of a full-time hire",
      "Continuous optimization of marketing, systems, and KPIs",
      "A monthly cadence that keeps execution accountable",
      "Priority support when something needs attention now",
    ],
  },
};

export function getOffer(id: string): Offer | undefined {
  return OFFERS.find((o) => o.id === id);
}

export function getOffersByCategory(category: OfferCategory): Offer[] {
  return OFFERS.filter((o) => o.category === category);
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingContent {
  slug: string;
  category: ServiceCategory;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  accentWord: string;
  intro: string;
  included: string[];
  faqs: LandingFaq[];
  related: ServiceCategory[];
  testimonialOrg?: string;
}

export const LANDING_PAGES: Record<ServiceCategory, LandingContent> = {
  website: {
    slug: "website-services",
    category: "website",
    seoTitle: "Small Business Website Design Services in Toronto | Performance Processes",
    seoDescription:
      "Professional, mobile-responsive websites for small businesses, from a simple online presence to a conversion-focused lead engine. Clear pricing from $1,500, secure online checkout, Toronto-based.",
    headline: "Websites that win trust and convert visitors into leads",
    accentWord: "convert",
    intro:
      "Your website is usually the first impression a prospect gets. We design and build professional, mobile-responsive websites for small and emerging businesses, with clear pricing, an SEO foundation, and structures built to turn visitors into enquiries.",
    included: [
      "Mobile-responsive design that looks professional on every device",
      "Basic on-page SEO so customers can find you",
      "Contact and lead capture forms wired to your inbox",
      "Website copy support so your message is clear",
      "Analytics setup and launch support on larger packages",
    ],
    faqs: [
      {
        q: "How much does a small business website cost?",
        a: "Our website packages have clear, fixed prices: the Starter Website Package is $1,500, the Business Website Package is $2,500, and the Website Conversion Package is $3,500. Every price is listed on the package card, and you can pay securely online by credit card, debit, or PayPal.",
      },
      {
        q: "What is the difference between the three website packages?",
        a: "The Starter package (up to 5 pages) gives you a simple, professional presence. The Business package (up to 8 pages) adds service pages, Google Business Profile integration, and analytics. The Conversion package (up to 10 pages) adds a landing page, lead capture, and a conversion-focused structure designed to turn visitors into leads.",
      },
      {
        q: "Will I own my website?",
        a: "Yes. Every website we build is yours to keep and grow as your business grows.",
      },
      {
        q: "Is there a discount for NextUp Foundation partners?",
        a: "Yes. Through our NextUp Foundation for Canadian Youth partnership, eligible organizations can apply the NEXTPROCESSES code for 40% off website packages at checkout.",
      },
    ],
    related: ["marketing", "crm"],
    testimonialOrg: "NextUp Foundation for Canadian Youth",
  },
  marketing: {
    slug: "marketing-services",
    category: "marketing",
    seoTitle: "Small Business Marketing Services and Lead Generation | Performance Processes",
    seoDescription:
      "Structured marketing for small businesses: audits, positioning, social media setup, campaign launches, and complete lead generation systems. Fixed pricing from $1,200 with secure online checkout.",
    headline: "Marketing with structure, not guesswork",
    accentWord: "structure",
    intro:
      "Most small businesses market in bursts, a post here, a campaign there, with no clear plan. We install marketing structure: clear positioning, deliberate channels, campaign plans, and lead generation systems that turn effort into a consistent flow of enquiries.",
    included: [
      "Marketing audit and offer positioning review",
      "Target audience clarification and content direction",
      "Campaign strategy, messaging, and launch plans",
      "Landing page and lead capture recommendations",
      "KPI tracking so you know what is working",
    ],
    faqs: [
      {
        q: "What marketing services do you offer?",
        a: "Four fixed-price packages: the Marketing Starter Package ($1,500) for structure and a 30-day action plan, the Social Media Setup Package ($1,200) for a professional social foundation, the Campaign Setup Package ($2,500) for launching a campaign or offer, and the Growth Engine Package ($5,000) for a complete basic lead generation setup.",
      },
      {
        q: "Do you run our ads or post for us every month?",
        a: "These packages are one-time builds that give you strategy, structure, and plans you can execute. If you want ongoing hands-on marketing help, our Monthly Marketing Support retainer covers monthly planning, content direction, campaign support, and reporting.",
      },
      {
        q: "How do I know which package fits my business?",
        a: "Book a free consultation and we will recommend the right starting point based on your goals, or start with the Marketing Starter Package, which includes an audit and a 30-day action plan.",
      },
    ],
    related: ["website", "crm"],
  },
  crm: {
    slug: "crm-lead-tracking",
    category: "crm",
    seoTitle: "CRM Setup and Lead Tracking for Small Businesses | Performance Processes",
    seoDescription:
      "CRM setup, sales pipelines, and follow-up systems for small businesses, so every lead is captured, tracked, and followed up on time. Fixed pricing from $1,500 with secure online checkout.",
    headline: "Never lose another lead to a missed follow-up",
    accentWord: "lead",
    intro:
      "When leads live in inboxes and spreadsheets, follow-up slips and revenue quietly leaks. We set up your CRM, pipeline, and follow-up workflows so every lead is captured, tracked, and followed up on time, and you can finally see where deals stall.",
    included: [
      "CRM setup with pipeline stages and contact fields",
      "Lead source tracking so you know where enquiries come from",
      "Follow-up workflows and reminders",
      "Email response templates and automation recommendations",
      "Reporting dashboards for better sales decisions",
    ],
    faqs: [
      {
        q: "What does CRM setup cost?",
        a: "The CRM Starter Setup is $1,500 and covers a basic CRM with pipeline stages, contact fields, lead source tracking, follow-up reminders, and simple reporting. The Lead Tracking and Follow-Up System is $2,500 and adds a structured follow-up workflow, email templates, automation recommendations, and a reporting dashboard.",
      },
      {
        q: "Do I need special software?",
        a: "No. We set up the system around tools that fit your business and budget, and configure it to match how you actually sell.",
      },
      {
        q: "Will my team know how to use it?",
        a: "The setup is built around your workflow, with pipeline stages, reminders, and templates your team can run day to day. If you want ongoing help, our monthly support retainers include lead tracking reviews.",
      },
    ],
    related: ["marketing", "support"],
  },
  systems: {
    slug: "business-systems",
    category: "systems",
    seoTitle: "Business Systems, Process Audits, and SOPs for Small Business | Performance Processes",
    seoDescription:
      "Business system audits, process documentation, role clarity, and 90-day action plans that give small businesses the structure to scale. Fixed pricing from $750 with secure online checkout.",
    headline: "Structure your business so it can scale without you",
    accentWord: "scale",
    intro:
      "When how the business runs lives in the founder's head, delivery is inconsistent, delegation is hard, and growth adds chaos instead of profit. We audit, document, and structure how your business runs, so your team can execute without everything routing through you.",
    included: [
      "A full review of your structure, website, marketing, and process gaps",
      "Priority recommendations and suggested next steps",
      "Role clarity and basic org structure",
      "KPI recommendations and reporting direction",
      "A 90-day action plan you can execute",
    ],
    faqs: [
      {
        q: "What is a Business System Audit?",
        a: "A $750 review of your current structure, website, marketing, processes, and execution gaps. You receive a summary report, priority recommendations, and suggested next steps, clarity on what is and is not working before you invest further.",
      },
      {
        q: "What is the Foundation Sprint?",
        a: "A $3,500 engagement that builds the structure your business needs before scaling: role clarity, basic org structure, KPI recommendations, a process gap review, and a 90-day action plan.",
      },
      {
        q: "Which one should I start with?",
        a: "If you are unsure where the problems are, start with the Business System Audit. If you already know you need structure, the Foundation Sprint builds it. Book a free consultation and we will point you to the right fit.",
      },
    ],
    related: ["support", "hr-recruiting"],
    testimonialOrg: "Ubuntu Immigration",
  },
  "hr-recruiting": {
    slug: "hr-recruiting",
    category: "hr-recruiting",
    seoTitle: "HR and Recruiting Services for Small Businesses | Performance Processes",
    seoDescription:
      "Hiring strategy, candidate sourcing and screening, recruitment systems, HR foundations, and interview coaching for growing businesses. Fixed pricing from $750 with secure online checkout.",
    headline: "Hire the right people, with a process you can repeat",
    accentWord: "right",
    intro:
      "Bad hires are expensive and slow hiring stalls growth. We bring structure to how you hire and manage people, from job descriptions and candidate scorecards to sourcing, screening, HR foundations, and repeatable recruitment systems.",
    included: [
      "Hiring strategy, job descriptions, and candidate scorecards",
      "Candidate sourcing, outreach, and pre-screening",
      "Standardized interview processes and rubrics",
      "Employee handbook, onboarding, and offer templates",
      "Compliance review against Canadian employment standards",
    ],
    faqs: [
      {
        q: "What do your recruiting services cost?",
        a: "Fixed prices for each package: Hiring Strategy and Job Descriptions is $1,500, Talent Sourcing and Screening is $2,500 per role, the Recruitment Setup Package is $3,500, HR Foundations is $2,000, and Interview and Career Readiness Coaching is $750.",
      },
      {
        q: "Do you replace a recruitment agency?",
        a: "For a single role, Talent Sourcing and Screening covers sourcing, outreach, pre-screening, and a shortlist of qualified candidates over a 30-day sourcing window. If you hire regularly, the Recruitment Setup Package builds a repeatable hiring system you can run yourself.",
      },
      {
        q: "We have no HR at all. Where do we start?",
        a: "The HR Foundations Package covers the core documentation every small business needs: an employee handbook, onboarding checklist, offer letter templates, a performance review framework, offboarding process, and a compliance review against Canadian employment standards.",
      },
    ],
    related: ["systems", "support"],
  },
  support: {
    slug: "growth-support",
    category: "support",
    seoTitle: "Ongoing Growth and Marketing Support Retainers | Performance Processes",
    seoDescription:
      "Monthly retainers that keep your marketing, CRM, website, and KPIs improving, a senior growth partner without the cost of a full-time hire. Custom pricing, assessed case by case.",
    headline: "A growth partner who keeps your systems improving",
    accentWord: "improving",
    intro:
      "Systems and marketing decay without attention, and most small businesses can't justify a full-time hire to maintain them. Our monthly retainers keep your marketing, website, lead tracking, and KPIs measured, maintained, and improving, with a senior partner on call.",
    included: [
      "Monthly strategy and planning calls",
      "Marketing planning, content direction, and campaign support",
      "Website and CRM review and optimization",
      "KPI and performance reviews",
      "Priority support between calls on the full retainer",
    ],
    faqs: [
      {
        q: "How much does ongoing support cost?",
        a: "Retainer pricing is assessed case by case based on the scope your business needs. There are three tiers, Monthly Marketing Support, Monthly Growth Support, and the Growth Partner Retainer, and after a conversation we will recommend the right one and quote it clearly.",
      },
      {
        q: "What is the difference between the three retainers?",
        a: "Monthly Marketing Support focuses on marketing planning, content direction, campaigns, and reporting. Monthly Growth Support adds website recommendations, lead tracking review, and a monthly strategy call. The Growth Partner Retainer is the fullest option, covering marketing, CRM, website optimization, KPIs, and process improvement.",
      },
      {
        q: "Am I locked into a long contract?",
        a: "Retainers are monthly engagements. We review scope and results with you regularly, and we will recommend the arrangement that fits during your consultation.",
      },
    ],
    related: ["crm", "systems"],
    testimonialOrg: "TrueNorth Property & Facilities",
  },
};

export function getLandingBySlug(slug: string): LandingContent | undefined {
  return Object.values(LANDING_PAGES).find((l) => l.slug === slug);
}

export type Language = "en" | "fr";

type OfferFr = Partial<Pick<Offer, "name" | "description" | "bestFor" | "includes" | "priceLabel">>;

export const OFFERS_FR: Record<string, OfferFr> = {
  "business-name-registration": {
    name: "Recherche de nom commercial et soutien à l’enregistrement",
    description: "Un soutien administratif pour rechercher, préparer et soumettre l’enregistrement de votre nom commercial, avec une prochaine étape claire.",
    priceLabel: "299 $",
    bestFor: "Les fondateurs qui ont choisi un nom et souhaitent un accompagnement pratique pour organiser l’enregistrement.",
    includes: ["Orientation sur la disponibilité du nom commercial", "Revue de préparation à l’enregistrement", "Préparation administrative et soutien à la soumission", "Liste de vérification de la confirmation", "Orientation sur les étapes suivant l’enregistrement"],
  },
  "ontario-federal-incorporation": {
    name: "Soutien à l’incorporation en Ontario ou au fédéral",
    description: "Un soutien pratique et administratif pour vous aider à préparer et soumettre une demande d’incorporation en Ontario ou au fédéral.",
    priceLabel: "699 $ + frais gouvernementaux",
    bestFor: "Les fondateurs prêts à s’incorporer qui veulent un soutien administratif organisé tout au long du processus de dépôt.",
    includes: ["Discussion du parcours d’incorporation", "Liste de préparation au dépôt", "Soutien à la préparation administrative des formulaires", "Soutien à la soumission en Ontario ou au fédéral", "Prochaines étapes administratives après le dépôt"],
  },
  "cra-business-number": {
    name: "Configuration du numéro d’entreprise de l’ARC",
    description: "Un soutien administratif pour configurer votre numéro d’entreprise de l’ARC et organiser les renseignements nécessaires à vos dossiers.",
    priceLabel: "249 $",
    bestFor: "Les entreprises nouvellement enregistrées ou incorporées qui doivent configurer leur numéro d’entreprise de l’ARC.",
    includes: ["Soutien à la configuration du numéro d’entreprise de l’ARC", "Liste des renseignements et documents", "Orientation sur la préparation de la demande", "Liste de vérification du dossier de confirmation"],
  },
  "cra-program-accounts": {
    name: "Soutien à la configuration des comptes de programme de l’ARC",
    description: "Un soutien administratif pour les comptes de programme de l’ARC pertinents, y compris TPS/TVH, paie et importation/exportation selon le cas.",
    priceLabel: "299 $",
    bestFor: "Les entreprises qui se préparent à percevoir la TPS/TVH, à embaucher ou à importer/exporter des biens.",
    includes: ["Revue des besoins en comptes de programme", "Soutien à la configuration TPS/TVH, paie ou import/export selon le cas", "Liste des renseignements requis", "Orientation sur la préparation de la demande", "Liste de vérification de la confirmation du compte"],
  },
  "startup-compliance-checklist": {
    name: "Liste des exigences de démarrage et de conformité",
    description: "Une liste pratique des enregistrements, dossiers et exigences de fonctionnement à organiser avant votre lancement.",
    priceLabel: "199 $",
    bestFor: "Les fondateurs qui souhaitent un point de départ administratif clair avant d’ouvrir leurs portes.",
    includes: ["Revue des exigences de démarrage", "Liste administrative personnalisée", "Liste des étapes d’enregistrement et de comptes", "Points de préparation des dossiers et des opérations", "Prochaines étapes recommandées"],
  },
  "incorporation-cra-bundle": {
    name: "Forfait incorporation + configuration ARC",
    description: "Une mise en place administrative coordonnée couvrant le soutien à l’incorporation, votre numéro d’entreprise de l’ARC et les comptes de programme applicables.",
    priceLabel: "995 $ + frais gouvernementaux",
    bestFor: "Les fondateurs qui veulent un processus pratique unique, de la préparation à l’incorporation jusqu’à la configuration de l’ARC.",
    includes: ["Soutien à l’incorporation en Ontario ou au fédéral", "Configuration du numéro d’entreprise de l’ARC", "Soutien à la configuration des comptes de programme ARC selon le cas", "Listes de vérification des dépôts et renseignements", "Prochaines étapes administratives après la configuration"],
  },
  "business-foundation": {
    name: "Fondation d’entreprise",
    description: "Officialisez et organisez votre entreprise grâce à l’orientation essentielle, au soutien à l’enregistrement et à la mise en place administrative nécessaire pour avancer en confiance.",
    bestFor: "Les fondateurs qui officialisent une nouvelle entreprise et ont besoin d’une première étape claire et pratique.",
    priceLabel: "1 495 $",
    includes: ["Consultation initiale", "Orientation sur la structure et l’incorporation", "Soutien à l’enregistrement", "Liste de vérification de démarrage", "Mise en place administrative essentielle", "Une consultation de suivi"],
  },
  "business-launch": {
    name: "Lancement d’entreprise",
    description: "Bâtissez une fondation solide et une présence numérique professionnelle qui donne à votre nouvelle entreprise une image prête pour ses clients.",
    bestFor: "Les fondateurs prêts à passer de l’idée ou de l’enregistrement à un lancement crédible et prêt pour les clients.",
    priceLabel: "4 995 $",
    includes: ["Tout ce qui est inclus dans Fondation d’entreprise", "Consultation sur le modèle d’affaires et les prix", "Systèmes d’entreprise essentiels", "Configuration du courriel professionnel", "Site web de départ personnalisé", "Fiche Google Business et SEO de base"],
  },
  "complete-business-build": {
    name: "Construction complète de l’entreprise",
    description: "Un accompagnement pratique de l’idée au lancement, avec les systèmes numériques, opérationnels et clients nécessaires au fonctionnement de votre entreprise.",
    bestFor: "Les fondateurs qui veulent un partenaire expérimenté pour bâtir leur entreprise de bout en bout.",
    priceLabel: "9 995 $",
    includes: ["Tout ce qui est inclus dans Lancement d’entreprise", "Site web élargi et orientation de marque", "Configuration d’un CRM ou système de réservation", "Intégration du paiement et de la facturation", "Flux de travail et modèles opérationnels", "Plan de lancement numérique et soutien après lancement"],
  },
  "growth-system": {
    name: "Système de croissance",
    description:
      "Un système complet pour attirer, capter et convertir plus de prospects, conçu et installé pour vous.",
    bestFor:
      "Les petites entreprises qui ont besoin d'un moteur fiable pour générer et convertir des prospects.",
    includes: [
      "Structure de site web ou de page de destination axée sur la conversion",
      "Stratégie marketing et positionnement de l'offre",
      "Configuration du CRM et du suivi des prospects",
      "Flux de capture et de relance des prospects",
      "Messages de campagne et orientation du contenu",
      "Configuration du suivi des analyses et des indicateurs clés",
      "Plan d'exécution de 30 jours",
    ],
  },
  "operations-system": {
    name: "Système d'exploitation",
    description:
      "Documentez, simplifiez et automatisez le fonctionnement quotidien de votre entreprise.",
    bestFor:
      "Les entreprises qui ont besoin de structure, de procédures et de systèmes avant de croître.",
    includes: [
      "Audit complet de l'entreprise et des processus",
      "Structure organisationnelle et clarté des rôles",
      "Procédures normalisées et guides opérationnels",
      "Configuration du tableau de bord des indicateurs et des rapports",
      "Recommandations d'automatisation des flux de travail",
      "Plan d'intégration des outils et des systèmes",
      "Feuille de route de mise en œuvre sur 90 jours",
    ],
  },
  "team-performance-system": {
    name: "Système de performance d'équipe",
    description:
      "Recrutez les bonnes personnes et bâtissez la structure pour gérer la performance en toute confiance.",
    bestFor:
      "Les équipes en croissance qui ont besoin de systèmes de recrutement et d'une structure de performance claire.",
    includes: [
      "Stratégie de recrutement et descriptions de poste",
      "Flux de recrutement et d'entretien",
      "Grilles d'évaluation des candidats et plan d'intégration",
      "Cadre d'évaluation de la performance",
      "Cartographie de la clarté des rôles et des responsabilités",
      "Indicateurs d'équipe et cadence de suivi",
    ],
  },
  "ongoing-performance-support": {
    name: "Soutien continu à la performance",
    description:
      "Un partenaire mensuel pour maintenir vos systèmes en marche, mesurés et en amélioration.",
    priceLabel: "750 $ / mois",
    bestFor:
      "Les entreprises qui souhaitent un soutien continu en matière de systèmes, de marketing et de performance.",
    includes: [
      "Appel mensuel de stratégie et de planification",
      "Revue des indicateurs et de la performance",
      "Optimisation du marketing et des systèmes",
      "Affinement des processus et recommandations",
      "Soutien prioritaire entre les appels",
      "Mises à jour trimestrielles de la feuille de route",
    ],
  },
  "starter-website": {
    name: "Forfait site web de départ",
    description:
      "Une présence en ligne simple et professionnelle pour vous lancer rapidement.",
    bestFor:
      "Les professionnels, les jeunes pousses et les petites entreprises qui ont besoin d'une présence en ligne simple.",
    includes: [
      "Jusqu'à 5 pages",
      "Design adaptatif pour mobile",
      "Formulaire de contact",
      "Référencement de base sur la page",
      "Soutien à la rédaction de la page d'accueil",
      "Liens vers les réseaux sociaux",
      "Soutien de base au lancement",
    ],
  },
  "business-website": {
    name: "Forfait site web d'entreprise",
    description:
      "Un site web plus solide pour présenter vos services et générer des prospects.",
    bestFor:
      "Les petites entreprises qui ont besoin d'un site web plus solide pour présenter leurs services et générer des prospects.",
    includes: [
      "Jusqu'à 8 pages",
      "Design adaptatif pour mobile",
      "Pages de services",
      "Formulaire de contact et de prospects",
      "Configuration du référencement de base",
      "Intégration au profil d'entreprise Google",
      "Configuration des analyses",
      "Soutien de base à la rédaction du site",
    ],
  },
  "website-conversion": {
    name: "Forfait site web de conversion",
    description: "Un site web conçu pour convertir les visiteurs en prospects.",
    bestFor:
      "Les entreprises qui ont besoin d'un site web conçu pour convertir les visiteurs en prospects.",
    includes: [
      "Jusqu'à 10 pages",
      "Page de destination",
      "Formulaire de capture de prospects",
      "Structure de page axée sur la conversion",
      "Stratégie d'appel à l'action",
      "Configuration du référencement de base",
      "Configuration des analyses",
      "Soutien à la rédaction du site",
      "Soutien au lancement",
    ],
  },
  "marketing-starter": {
    name: "Forfait marketing de départ",
    description: "De la structure et de la clarté pour votre marketing.",
    bestFor:
      "Les petites entreprises qui ont besoin de structure et de clarté pour leur marketing.",
    includes: [
      "Audit marketing",
      "Revue du positionnement de l'offre",
      "Clarification de la clientèle cible",
      "Orientation de contenu de base",
      "Plan d'action marketing de 30 jours",
      "Canaux recommandés et prochaines étapes",
    ],
  },
  "social-media-setup": {
    name: "Forfait configuration des réseaux sociaux",
    description: "Une base professionnelle pour les réseaux sociaux.",
    bestFor:
      "Les entreprises qui ont besoin d'une base professionnelle sur les réseaux sociaux.",
    includes: [
      "Revue et optimisation des profils",
      "Rédaction de la bio et de la section à propos",
      "Orientation de contenu de marque",
      "Piliers de contenu",
      "10 idées de publications de départ",
      "Plan de publication de base",
    ],
  },
  "campaign-setup": {
    name: "Forfait configuration de campagne",
    description:
      "Tout ce qu'il vous faut pour lancer une campagne ou promouvoir une offre.",
    bestFor:
      "Les entreprises qui se préparent à lancer une campagne ou à promouvoir une offre.",
    includes: [
      "Stratégie de campagne",
      "Définition de la clientèle",
      "Messages de campagne",
      "Recommandation de page de destination",
      "Rédaction de la prospection par courriel ou message direct",
      "Plan de campagne de 30 jours",
      "Recommandations de suivi des indicateurs",
    ],
  },
  "growth-engine": {
    name: "Forfait moteur de croissance",
    description: "Une configuration complète de base pour la génération de prospects.",
    bestFor:
      "Les petites entreprises qui ont besoin d'une configuration complète de base pour la génération de prospects.",
    includes: [
      "Stratégie marketing",
      "Structure de page de destination ou d'entonnoir",
      "Configuration de la capture de prospects",
      "Configuration de base du CRM ou du suivi des prospects",
      "Messages de campagne",
      "Plan d'exécution de 30 jours",
      "Configuration des analyses et du suivi",
    ],
  },
  "crm-starter": {
    name: "Configuration CRM de départ",
    description: "Organisez et suivez vos prospects.",
    bestFor: "Les entreprises qui ont besoin d'organiser et de suivre leurs prospects.",
    includes: [
      "Configuration de base du CRM",
      "Étapes du pipeline",
      "Champs de contact",
      "Suivi de la source des prospects",
      "Rappels de relance",
      "Configuration de rapports simples",
    ],
  },
  "lead-tracking-followup": {
    name: "Système de suivi et de relance des prospects",
    description: "Un processus de relance commerciale plus structuré.",
    bestFor:
      "Les entreprises qui ont besoin d'un processus de relance commerciale plus structuré.",
    includes: [
      "Configuration du CRM",
      "Pipeline de prospects",
      "Flux de relance",
      "Modèles de réponse par courriel",
      "Recommandations d'automatisation simples",
      "Tableau de bord de rapports",
    ],
  },
  "business-system-audit": {
    name: "Audit des systèmes d'entreprise",
    description: "Une vision claire de ce qui fonctionne et de ce qui ne fonctionne pas dans votre entreprise.",
    bestFor:
      "Les petites entreprises qui ont besoin de clarté sur ce qui ne fonctionne pas.",
    includes: [
      "Revue de la structure actuelle",
      "Revue des lacunes du site web, du marketing, des processus et de l'exécution",
      "Rapport de synthèse",
      "Recommandations prioritaires",
      "Prochaines étapes suggérées",
    ],
  },
  "foundation-sprint": {
    name: "Sprint de fondation",
    description: "Bâtissez la structure dont votre entreprise a besoin avant de croître.",
    bestFor: "Les entreprises qui ont besoin de structure avant de croître.",
    includes: [
      "Clarté des rôles",
      "Structure organisationnelle de base",
      "Recommandations d'indicateurs clés",
      "Revue des lacunes de processus",
      "Plan d'action de 90 jours",
    ],
  },
  "hiring-strategy": {
    name: "Forfait stratégie de recrutement et descriptions de poste",
    description:
      "Des définitions de rôles claires et un plan de recrutement structuré avant de commencer les entretiens.",
    bestFor:
      "Les petites entreprises qui se préparent à recruter et qui ont besoin de clarté sur les rôles, les responsabilités et le profil du bon candidat.",
    includes: [
      "Séance de cadrage et de découverte du rôle",
      "Rédaction de descriptions de poste (jusqu'à 2 rôles)",
      "Grille d'évaluation des candidats et barème d'entretien",
      "Conseils de balisage de la rémunération",
      "Canaux de recrutement recommandés",
      "Plan de recrutement de 30 jours",
    ],
  },
  "talent-sourcing-screening": {
    name: "Recherche et présélection de talents",
    description:
      "Nous recherchons, présélectionnons et retenons les candidats pour que vous ne rencontriez que les personnes qualifiées.",
    bestFor:
      "Les entreprises qui ont besoin d'aide pour pourvoir un seul poste sans assumer toute la charge de la recherche.",
    includes: [
      "Recherche sur LinkedIn et les canaux pertinents",
      "Prospection et présélection des candidats",
      "Liste restreinte de candidats qualifiés",
      "Résumés des entretiens téléphoniques",
      "Soutien à la planification des entretiens",
      "Fenêtre de recherche de 30 jours par poste",
    ],
  },
  "recruitment-setup": {
    name: "Forfait configuration du recrutement",
    description:
      "Bâtissez un système de recrutement reproductible que vous pouvez exécuter vous-même pour chaque poste futur.",
    bestFor:
      "Les entreprises en croissance qui recrutent régulièrement et souhaitent un processus de recrutement structuré et reproductible.",
    includes: [
      "Configuration du flux de suivi des candidatures",
      "Processus d'entretien normalisé et barèmes",
      "Modèle de cadrage pour le gestionnaire d'embauche",
      "Modèles de lettre d'offre et d'intégration",
      "Documentation du guide de recrutement",
      "Séance de formation de l'équipe",
    ],
  },
  "hr-foundations": {
    name: "Forfait fondations RH",
    description:
      "La documentation RH de base et la structure d'intégration dont chaque petite entreprise a besoin.",
    bestFor:
      "Les petites entreprises sans RH dédiées qui ont besoin de politiques de base, d'intégration et de conformité.",
    includes: [
      "Manuel de l'employé (politiques de base)",
      "Liste de vérification d'intégration et trousse d'accueil",
      "Modèles de lettre d'offre et d'emploi",
      "Cadre d'évaluation de la performance",
      "Processus de cessation d'emploi et de départ",
      "Revue de conformité (normes d'emploi canadiennes)",
    ],
  },
  "interview-coaching": {
    name: "Accompagnement à l'entretien et à la préparation de carrière",
    description:
      "Un accompagnement individuel pour aider les professionnels à passer leurs entretiens avec confiance.",
    bestFor:
      "Les professionnels qui se préparent à des entretiens, à des promotions ou à des transitions de carrière.",
    includes: [
      "Revue du CV et de LinkedIn",
      "Récit personnel et positionnement",
      "Deux séances d'entretien simulé",
      "Préparation aux entretiens comportementaux et situationnels",
      "Accompagnement à la négociation salariale",
      "Document de suivi et de rétroaction",
    ],
  },
  "monthly-marketing": {
    name: "Soutien marketing mensuel",
    description:
      "Planification marketing, campagnes et rapports en continu, selon une cadence mensuelle claire.",
    priceLabel: "1 500 $ / mois",
    bestFor:
      "Les entreprises qui ont besoin d'un partenaire marketing sans recruter à l'interne.",
    includes: [
      "Planification marketing mensuelle",
      "Orientation de contenu",
      "Soutien aux campagnes",
      "Rapports de base",
      "Recommandations d'optimisation",
    ],
  },
  "monthly-growth": {
    name: "Soutien mensuel à la croissance",
    description:
      "Soutien au marketing, au site web, au suivi des prospects et aux indicateurs chaque mois.",
    priceLabel: "2 500 $ / mois",
    bestFor: "Les entreprises qui ont besoin d'un soutien mensuel élargi à la croissance.",
    includes: [
      "Soutien marketing",
      "Recommandations d'amélioration du site web",
      "Revue du suivi des prospects",
      "Revue des indicateurs clés",
      "Appel de stratégie mensuel",
    ],
  },
  "growth-partner-retainer": {
    name: "Forfait partenaire de croissance",
    description:
      "Soutien continu complet en matière de marketing, de CRM, de site web, d'indicateurs et de processus.",
    priceLabel: "4 000 $ / mois",
    bestFor: "Les entreprises qui souhaitent un partenaire de croissance intégré.",
    includes: [
      "Soutien marketing",
      "Revue du CRM et du suivi des prospects",
      "Soutien à l'optimisation du site web",
      "Revue des indicateurs et de la performance",
      "Soutien à l'amélioration des processus",
      "Soutien mensuel à la stratégie et à l'exécution",
    ],
  },
  "launch-bundle": {
    name: "Forfait lancement",
    description:
      "Un site web de départ, une configuration des réseaux sociaux et un soutien au lancement, en un seul ensemble.",
    bestFor:
      "Les nouvelles entreprises prêtes à se lancer avec une configuration de départ complète.",
    includes: [
      "Forfait site web de départ",
      "Forfait configuration des réseaux sociaux",
      "Soutien de base au lancement",
    ],
  },
  "growth-starter-bundle": {
    name: "Forfait croissance de départ",
    description:
      "Un site web plus solide, une structure marketing et un CRM, regroupés ensemble.",
    bestFor: "Les petites entreprises prêtes à générer des prospects de façon constante.",
    includes: [
      "Forfait site web d'entreprise",
      "Forfait marketing de départ",
      "Configuration CRM de départ",
    ],
  },
  "growth-engine-bundle": {
    name: "Forfait moteur de croissance",
    description:
      "Un site web axé sur la conversion, une campagne et un système de relance en un seul ensemble.",
    bestFor: "Les entreprises prêtes à bâtir un véritable moteur de génération de prospects.",
    includes: [
      "Forfait site web de conversion",
      "Forfait configuration de campagne",
      "Système de suivi et de relance des prospects",
    ],
  },
  "scale-support-bundle": {
    name: "Forfait soutien à la mise à l'échelle",
    description:
      "Fondation, moteur de croissance et soutien à la mise en œuvre de 30 jours.",
    bestFor:
      "Les entreprises prêtes à croître avec de la structure et une exécution accompagnée.",
    includes: [
      "Sprint de fondation",
      "Composantes du forfait moteur de croissance",
      "Soutien à la mise en œuvre de 30 jours",
    ],
  },
};

export const CATEGORY_META_FR: Record<OfferCategory, { label: string; description: string }> = {
  packages: {
    label: "Forfaits de lancement",
    description:
      "Trois parcours clairs pour les fondateurs : choisissez la portée, achetez en ligne et nous démarrons.",
  },
  website: {
    label: "Sites web et présence numérique",
    description:
      "Des sites web qui fonctionnent, d'une simple présence à un moteur de conversion.",
  },
  marketing: {
    label: "Marketing / CRM",
    description:
      "Apportez de la structure, des campagnes et de la génération de prospects à votre marketing.",
  },
  crm: {
    label: "CRM et suivi des prospects",
    description: "Captez, suivez et relancez vos prospects de façon constante.",
  },
  systems: {
    label: "Mise en place / systèmes",
    description:
      "Audits, cadres et structure pour le fonctionnement de votre entreprise.",
  },
  "hr-recruiting": {
    label: "Soutien aux personnes / RH",
    description:
      "Stratégie de recrutement, recherche, fondations RH et accompagnement de carrière pour les entreprises en croissance.",
  },
  support: {
    label: "Soutien mensuel",
    description:
      "Des forfaits mensuels pour garder la croissance, le marketing et les systèmes sur la bonne voie.",
  },
  bundle: {
    label: "Constructions groupées",
    description:
      "Des ensembles préconçus qui combinent nos services les plus demandés.",
  },
};

export const CATEGORY_NARRATIVE_FR: Record<ServiceCategory, CategoryNarrative> = {
  website: {
    eyebrow: "Le problème que nous résolvons",
    problem:
      "Un site web désuet ou absent vous coûte de la crédibilité et des prospects chaque jour. Les visiteurs arrivent, ne voient pas rapidement ce que vous faites ni pourquoi vous faire confiance, et repartent sans vous contacter.",
    benefits: [
      "Une présence professionnelle qui inspire confiance dès la première visite",
      "Plus de demandes et de prospects à partir du trafic que vous avez déjà",
      "Un design adaptatif pour mobile avec une base de référencement intégrée",
      "Un site que vous possédez et pouvez faire évoluer avec votre entreprise",
    ],
  },
  marketing: {
    eyebrow: "Le problème que nous résolvons",
    problem:
      "La plupart des petites entreprises font du marketing par à-coups, une publication ici, une campagne là, sans plan clair. L'effort sort, mais les prospects ne reviennent pas de façon constante.",
    benefits: [
      "Un positionnement et des messages clairs auxquels votre clientèle réagit",
      "Un plan structuré plutôt que des suppositions et des publications sporadiques",
      "Des campagnes conçues pour générer et convertir des prospects",
      "Des canaux choisis délibérément, pour que le budget aille là où il fonctionne",
    ],
  },
  crm: {
    eyebrow: "Le problème que nous résolvons",
    problem:
      "Quand les prospects vivent dans les boîtes de réception et les tableurs, la relance échappe et les revenus fuient discrètement. On ne peut pas améliorer un pipeline qu'on ne voit pas.",
    benefits: [
      "Chaque prospect capté, suivi et relancé à temps",
      "Des temps de réponse plus rapides qui remportent plus des affaires que vous proposez",
      "Une visibilité complète sur votre pipeline et sur les points de blocage",
      "Des rapports qui appuient de meilleures décisions commerciales",
    ],
  },
  systems: {
    eyebrow: "Le problème que nous résolvons",
    problem:
      "Quand le fonctionnement de l'entreprise vit dans la tête du fondateur, la livraison est irrégulière, la délégation est difficile et la croissance ajoute du chaos plutôt que du profit.",
    benefits: [
      "Des processus documentés que votre équipe peut réellement exécuter",
      "De la clarté des rôles et de la responsabilisation dans toute l'entreprise",
      "Des indicateurs et des rapports qui montrent ce qui fonctionne",
      "Une base évolutive prête pour votre prochaine étape de croissance",
    ],
  },
  "hr-recruiting": {
    eyebrow: "Le problème que nous résolvons",
    problem:
      "Les mauvais recrutements coûtent cher et un recrutement lent freine la croissance. Sans structure, les entretiens sont irréguliers et les nouvelles personnes doivent se débrouiller seules.",
    benefits: [
      "Les bons recrutements, plus vite, avec une présélection structurée et des grilles d'évaluation",
      "Un processus de recrutement reproductible que vous pouvez exécuter pour chaque poste",
      "Des fondations RH conformes, politiques, intégration et évaluations",
      "Une meilleure gestion de la performance à mesure que votre équipe grandit",
    ],
  },
  support: {
    eyebrow: "Le problème que nous résolvons",
    problem:
      "Les systèmes et le marketing se dégradent sans attention, et la plupart des petites entreprises ne peuvent justifier un poste à temps plein pour les entretenir. L'élan s'estompe mois après mois.",
    benefits: [
      "Un partenaire de croissance chevronné sans le coût d'un poste à temps plein",
      "Une optimisation continue du marketing, des systèmes et des indicateurs",
      "Une cadence mensuelle qui garde l'exécution responsable",
      "Un soutien prioritaire quand une situation exige de l'attention immédiate",
    ],
  },
};

type LandingFr = Partial<Pick<LandingContent, "headline" | "accentWord" | "intro" | "included" | "faqs">>;

export const LANDING_PAGES_FR: Record<ServiceCategory, LandingFr> = {
  website: {
    headline: "Des sites web qui gagnent la confiance et convertissent les visiteurs en prospects",
    accentWord: "convertissent",
    intro:
      "Votre site web est souvent la première impression qu'un prospect reçoit. Nous concevons et bâtissons des sites web professionnels et adaptatifs pour les petites entreprises et les entreprises émergentes, avec une tarification claire, une base de référencement et des structures conçues pour transformer les visiteurs en demandes.",
    included: [
      "Un design adaptatif qui paraît professionnel sur chaque appareil",
      "Un référencement de base sur la page pour que les clients vous trouvent",
      "Des formulaires de contact et de capture de prospects reliés à votre boîte de réception",
      "Un soutien à la rédaction du site pour que votre message soit clair",
      "La configuration des analyses et le soutien au lancement sur les forfaits plus complets",
    ],
    faqs: [
      {
        q: "Combien coûte un site web pour une petite entreprise?",
        a: "Nos forfaits de site web ont des prix clairs et fixes : le Forfait site web de départ est à 1 500 $, le Forfait site web d'entreprise à 2 500 $ et le Forfait site web de conversion à 3 500 $. Chaque prix est indiqué sur la carte du forfait, et vous pouvez payer en ligne de façon sécurisée par carte de crédit, débit ou PayPal.",
      },
      {
        q: "Quelle est la différence entre les trois forfaits de site web?",
        a: "Le forfait de départ (jusqu'à 5 pages) vous offre une présence simple et professionnelle. Le forfait d'entreprise (jusqu'à 8 pages) ajoute des pages de services, l'intégration au profil d'entreprise Google et les analyses. Le forfait de conversion (jusqu'à 10 pages) ajoute une page de destination, la capture de prospects et une structure axée sur la conversion conçue pour transformer les visiteurs en prospects.",
      },
      {
        q: "Serai-je propriétaire de mon site web?",
        a: "Oui. Chaque site web que nous bâtissons vous appartient et peut évoluer avec votre entreprise.",
      },
      {
        q: "Y a-t-il un rabais pour les partenaires de la Fondation NextUp?",
        a: "Oui. Grâce à notre partenariat avec la NextUp Foundation for Canadian Youth, les organisations admissibles peuvent appliquer le code NEXTPROCESSES pour obtenir 40 % de rabais sur les forfaits de site web au paiement.",
      },
    ],
  },
  marketing: {
    headline: "Du marketing avec de la structure, pas des suppositions",
    accentWord: "structure",
    intro:
      "La plupart des petites entreprises font du marketing par à-coups, une publication ici, une campagne là, sans plan clair. Nous installons une structure marketing : un positionnement clair, des canaux délibérés, des plans de campagne et des systèmes de génération de prospects qui transforment l'effort en un flux constant de demandes.",
    included: [
      "Audit marketing et revue du positionnement de l'offre",
      "Clarification de la clientèle cible et orientation de contenu",
      "Stratégie de campagne, messages et plans de lancement",
      "Recommandations de page de destination et de capture de prospects",
      "Suivi des indicateurs pour savoir ce qui fonctionne",
    ],
    faqs: [
      {
        q: "Quels services marketing offrez-vous?",
        a: "Quatre forfaits à prix fixe : le Forfait marketing de départ (1 500 $) pour la structure et un plan d'action de 30 jours, le Forfait configuration des réseaux sociaux (1 200 $) pour une base sociale professionnelle, le Forfait configuration de campagne (2 500 $) pour lancer une campagne ou une offre, et le Forfait moteur de croissance (5 000 $) pour une configuration complète de base de génération de prospects.",
      },
      {
        q: "Gérez-vous nos publicités ou publiez-vous pour nous chaque mois?",
        a: "Ces forfaits sont des réalisations ponctuelles qui vous donnent une stratégie, une structure et des plans que vous pouvez exécuter. Si vous souhaitez une aide marketing pratique en continu, notre forfait Soutien marketing mensuel couvre la planification mensuelle, l'orientation de contenu, le soutien aux campagnes et les rapports.",
      },
      {
        q: "Comment savoir quel forfait convient à mon entreprise?",
        a: "Réservez une consultation gratuite et nous vous recommanderons le bon point de départ selon vos objectifs, ou commencez par le Forfait marketing de départ, qui comprend un audit et un plan d'action de 30 jours.",
      },
    ],
  },
  crm: {
    headline: "Ne perdez plus jamais un prospect à cause d'une relance manquée",
    accentWord: "prospect",
    intro:
      "Quand les prospects vivent dans les boîtes de réception et les tableurs, la relance échappe et les revenus fuient discrètement. Nous configurons votre CRM, votre pipeline et vos flux de relance pour que chaque prospect soit capté, suivi et relancé à temps, et pour que vous voyiez enfin où les affaires se bloquent.",
    included: [
      "Configuration du CRM avec étapes de pipeline et champs de contact",
      "Suivi de la source des prospects pour savoir d'où viennent les demandes",
      "Flux de relance et rappels",
      "Modèles de réponse par courriel et recommandations d'automatisation",
      "Tableaux de bord de rapports pour de meilleures décisions commerciales",
    ],
    faqs: [
      {
        q: "Combien coûte la configuration d'un CRM?",
        a: "La Configuration CRM de départ est à 1 500 $ et couvre un CRM de base avec étapes de pipeline, champs de contact, suivi de la source des prospects, rappels de relance et rapports simples. Le Système de suivi et de relance des prospects est à 2 500 $ et ajoute un flux de relance structuré, des modèles de courriel, des recommandations d'automatisation et un tableau de bord de rapports.",
      },
      {
        q: "Ai-je besoin d'un logiciel particulier?",
        a: "Non. Nous configurons le système autour d'outils qui conviennent à votre entreprise et à votre budget, et nous l'adaptons à votre façon de vendre.",
      },
      {
        q: "Mon équipe saura-t-elle l'utiliser?",
        a: "La configuration est bâtie autour de votre flux de travail, avec des étapes de pipeline, des rappels et des modèles que votre équipe peut utiliser au quotidien. Si vous souhaitez une aide continue, nos forfaits de soutien mensuel comprennent des revues du suivi des prospects.",
      },
    ],
  },
  systems: {
    headline: "Structurez votre entreprise pour qu'elle puisse croître sans vous",
    accentWord: "croître",
    intro:
      "Quand le fonctionnement de l'entreprise vit dans la tête du fondateur, la livraison est irrégulière, la délégation est difficile et la croissance ajoute du chaos plutôt que du profit. Nous auditons, documentons et structurons le fonctionnement de votre entreprise, pour que votre équipe puisse exécuter sans que tout passe par vous.",
    included: [
      "Une revue complète de votre structure, de votre site web, de votre marketing et des lacunes de processus",
      "Des recommandations prioritaires et des prochaines étapes suggérées",
      "De la clarté des rôles et une structure organisationnelle de base",
      "Des recommandations d'indicateurs et une orientation des rapports",
      "Un plan d'action de 90 jours que vous pouvez exécuter",
    ],
    faqs: [
      {
        q: "Qu'est-ce qu'un audit des systèmes d'entreprise?",
        a: "Une revue à 750 $ de votre structure actuelle, de votre site web, de votre marketing, de vos processus et des lacunes d'exécution. Vous recevez un rapport de synthèse, des recommandations prioritaires et des prochaines étapes suggérées, une vision claire de ce qui fonctionne et de ce qui ne fonctionne pas avant d'investir davantage.",
      },
      {
        q: "Qu'est-ce que le Sprint de fondation?",
        a: "Un engagement à 3 500 $ qui bâtit la structure dont votre entreprise a besoin avant de croître : clarté des rôles, structure organisationnelle de base, recommandations d'indicateurs, revue des lacunes de processus et plan d'action de 90 jours.",
      },
      {
        q: "Par lequel devrais-je commencer?",
        a: "Si vous ne savez pas où se trouvent les problèmes, commencez par l'Audit des systèmes d'entreprise. Si vous savez déjà que vous avez besoin de structure, le Sprint de fondation la bâtit. Réservez une consultation gratuite et nous vous orienterons vers le bon choix.",
      },
    ],
  },
  "hr-recruiting": {
    headline: "Recrutez les bonnes personnes, avec un processus que vous pouvez répéter",
    accentWord: "bonnes",
    intro:
      "Les mauvais recrutements coûtent cher et un recrutement lent freine la croissance. Nous apportons de la structure à votre façon de recruter et de gérer les personnes, des descriptions de poste et des grilles d'évaluation des candidats à la recherche, à la présélection, aux fondations RH et aux systèmes de recrutement reproductibles.",
    included: [
      "Stratégie de recrutement, descriptions de poste et grilles d'évaluation des candidats",
      "Recherche, prospection et présélection des candidats",
      "Processus d'entretien normalisés et barèmes",
      "Manuel de l'employé, intégration et modèles d'offre",
      "Revue de conformité aux normes d'emploi canadiennes",
    ],
    faqs: [
      {
        q: "Combien coûtent vos services de recrutement?",
        a: "Des prix fixes pour chaque forfait : Stratégie de recrutement et descriptions de poste à 1 500 $, Recherche et présélection de talents à 2 500 $ par poste, le Forfait configuration du recrutement à 3 500 $, Fondations RH à 2 000 $, et Accompagnement à l'entretien et à la préparation de carrière à 750 $.",
      },
      {
        q: "Remplacez-vous une agence de recrutement?",
        a: "Pour un seul poste, la Recherche et présélection de talents couvre la recherche, la prospection, la présélection et une liste restreinte de candidats qualifiés sur une fenêtre de 30 jours. Si vous recrutez régulièrement, le Forfait configuration du recrutement bâtit un système de recrutement reproductible que vous pouvez exécuter vous-même.",
      },
      {
        q: "Nous n'avons aucune RH. Par où commencer?",
        a: "Le Forfait fondations RH couvre la documentation de base dont chaque petite entreprise a besoin : un manuel de l'employé, une liste de vérification d'intégration, des modèles de lettre d'offre, un cadre d'évaluation de la performance, un processus de départ et une revue de conformité aux normes d'emploi canadiennes.",
      },
    ],
  },
  support: {
    headline: "Un partenaire de croissance qui garde vos systèmes en amélioration",
    accentWord: "amélioration",
    intro:
      "Les systèmes et le marketing se dégradent sans attention, et la plupart des petites entreprises ne peuvent justifier un poste à temps plein pour les entretenir. Nos forfaits mensuels gardent votre marketing, votre site web, votre suivi des prospects et vos indicateurs mesurés, entretenus et en amélioration, avec un partenaire chevronné à votre disposition.",
    included: [
      "Appels mensuels de stratégie et de planification",
      "Planification marketing, orientation de contenu et soutien aux campagnes",
      "Revue et optimisation du site web et du CRM",
      "Revues des indicateurs et de la performance",
      "Soutien prioritaire entre les appels sur le forfait complet",
    ],
    faqs: [
      {
        q: "Combien coûte le soutien continu?",
        a: "La tarification des forfaits est évaluée au cas par cas selon la portée dont votre entreprise a besoin. Il y a trois niveaux, Soutien marketing mensuel, Soutien mensuel à la croissance et Forfait partenaire de croissance, et après une conversation nous vous recommanderons le bon et le chiffrerons clairement.",
      },
      {
        q: "Quelle est la différence entre les trois forfaits?",
        a: "Le Soutien marketing mensuel se concentre sur la planification marketing, l'orientation de contenu, les campagnes et les rapports. Le Soutien mensuel à la croissance ajoute des recommandations de site web, une revue du suivi des prospects et un appel de stratégie mensuel. Le Forfait partenaire de croissance est l'option la plus complète, couvrant le marketing, le CRM, l'optimisation du site web, les indicateurs et l'amélioration des processus.",
      },
      {
        q: "Suis-je lié par un long contrat?",
        a: "Les forfaits sont des engagements mensuels. Nous revoyons la portée et les résultats avec vous régulièrement, et nous vous recommanderons l'arrangement qui convient lors de votre consultation.",
      },
    ],
  },
};

export function localizeOffer(offer: Offer, lang: Language): Offer {
  if (lang === "en") return offer;
  const fr = OFFERS_FR[offer.id];
  if (!fr) return offer;
  return {
    ...offer,
    name: fr.name ?? offer.name,
    description: fr.description ?? offer.description,
    bestFor: fr.bestFor ?? offer.bestFor,
    includes: fr.includes ?? offer.includes,
    priceLabel: fr.priceLabel ?? offer.priceLabel,
  };
}

export function getLocalizedCategoryMeta(
  cat: OfferCategory,
  lang: Language,
): { label: string; description: string; order: number } {
  const en = CATEGORY_META[cat];
  if (lang === "en") return en;
  const fr = CATEGORY_META_FR[cat];
  return {
    label: fr?.label ?? en.label,
    description: fr?.description ?? en.description,
    order: en.order,
  };
}

export function getLocalizedNarrative(cat: ServiceCategory, lang: Language): CategoryNarrative {
  const en = CATEGORY_NARRATIVE[cat];
  if (lang === "en") return en;
  const fr = CATEGORY_NARRATIVE_FR[cat];
  if (!fr) return en;
  return {
    eyebrow: fr.eyebrow ?? en.eyebrow,
    problem: fr.problem ?? en.problem,
    benefits: fr.benefits ?? en.benefits,
  };
}

export function getLocalizedLanding(landing: LandingContent, lang: Language): LandingContent {
  if (lang === "en") return landing;
  const fr = LANDING_PAGES_FR[landing.category];
  if (!fr) return landing;
  return {
    ...landing,
    headline: fr.headline ?? landing.headline,
    accentWord: fr.accentWord ?? landing.accentWord,
    intro: fr.intro ?? landing.intro,
    included: fr.included ?? landing.included,
    faqs: fr.faqs ?? landing.faqs,
  };
}
