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
    id: "growth-system",
    name: "Growth System",
    description: "A complete system to attract, capture, and convert more leads — built and installed for you.",
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
    category: "packages",
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
    category: "packages",
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
    category: "packages",
  },
  {
    id: "ongoing-performance-support",
    name: "Ongoing Performance Support",
    description: "A monthly partner to keep your systems running, measured, and improving. Pricing is assessed on a case-by-case basis.",
    price: 75000,
    priceLabel: "Custom",
    bestFor: "Businesses that want continuous support across systems, marketing, and performance.",
    includes: [
      "Monthly strategy and planning call",
      "KPI and performance review",
      "Marketing and systems optimization",
      "Process refinement and recommendations",
      "Priority support between calls",
      "Quarterly roadmap updates",
    ],
    category: "packages",
    isMonthly: true,
    isRange: true,
    ctaHref: "/contact",
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
    description: "Ongoing marketing planning, campaigns, and reporting. Pricing is assessed on a case-by-case basis.",
    price: 150000,
    priceLabel: "Custom",
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
    isRange: true,
    ctaHref: "/contact",
  },
  {
    id: "monthly-growth",
    name: "Monthly Growth Support",
    description: "Marketing, website, lead tracking, and KPI support every month. Pricing is assessed on a case-by-case basis.",
    price: 250000,
    priceLabel: "Custom",
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
    isRange: true,
    ctaHref: "/contact",
  },
  {
    id: "growth-partner-retainer",
    name: "Growth Partner Retainer",
    description: "Full ongoing support across marketing, CRM, website, KPIs, and process. Pricing is assessed on a case-by-case basis.",
    price: 400000,
    priceLabel: "Custom",
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
    isRange: true,
    ctaHref: "/contact",
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
    label: "Headline Packages",
    description: "Four productized systems that solve a complete business outcome — buy online and we get started.",
    order: 0,
  },
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
