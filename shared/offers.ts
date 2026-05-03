export type OfferCategory =
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
    description: "Ongoing marketing planning, campaigns, and reporting.",
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
  website: {
    label: "Website Services",
    description: "Websites that work, from a simple presence to a conversion engine.",
    order: 1,
  },
  marketing: {
    label: "Marketing Services",
    description: "Bring structure, campaigns, and lead generation to your marketing.",
    order: 2,
  },
  crm: {
    label: "CRM and Lead Tracking",
    description: "Capture, track, and follow up with your leads consistently.",
    order: 3,
  },
  systems: {
    label: "Business Systems",
    description: "Audits, frameworks, and structure for how your business runs.",
    order: 4,
  },
  "hr-recruiting": {
    label: "HR and Recruiting",
    description: "Hiring strategy, sourcing, HR foundations, and career coaching for growing businesses.",
    order: 5,
  },
  support: {
    label: "Ongoing Growth Support",
    description: "Monthly retainers to keep growth, marketing, and systems on track.",
    order: 6,
  },
  bundle: {
    label: "Popular Packages",
    description: "Pre-built bundles that combine our most-requested services.",
    order: 7,
  },
};

export function getOffer(id: string): Offer | undefined {
  return OFFERS.find((o) => o.id === id);
}

export function getOffersByCategory(category: OfferCategory): Offer[] {
  return OFFERS.filter((o) => o.category === category);
}
