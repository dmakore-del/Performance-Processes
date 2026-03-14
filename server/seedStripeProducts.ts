import { getUncachableStripeClient } from './stripeClient';

const PRODUCTS: { name: string; description: string; metadata: Record<string, string>; price: number; recurring?: boolean }[] = [
  // === ENTERPRISE: Discovery Phase ===
  { name: 'Discovery Phase - Essentials', description: 'Focused intake session with needs assessment and initial scope definition.', metadata: { category: 'consulting', service: 'discovery', tier: 'essentials' }, price: 75000 },
  { name: 'Discovery Phase - Standard', description: 'Comprehensive discovery with stakeholder interviews, detailed assessment, and full proposal roadmap.', metadata: { category: 'consulting', service: 'discovery', tier: 'standard' }, price: 150000 },
  // === ENTERPRISE: Strategic Engagement ===
  { name: 'Strategic Engagement - Foundation', description: 'Focused strategic engagement covering planning fundamentals and initial alignment.', metadata: { category: 'consulting', service: 'strategic-engagement', tier: 'foundation' }, price: 500000 },
  { name: 'Strategic Engagement - Standard', description: 'Full strategic engagement with KPI design, stakeholder alignment, and performance framework.', metadata: { category: 'consulting', service: 'strategic-engagement', tier: 'standard' }, price: 1000000 },
  { name: 'Strategic Engagement - Comprehensive', description: 'Complete strategic transformation with deep-dive analysis, leadership coaching, and ongoing support.', metadata: { category: 'consulting', service: 'strategic-engagement', tier: 'comprehensive' }, price: 1500000 },
  // === ENTERPRISE: Systems & Implementation ===
  { name: 'Systems & Implementation - Foundation', description: 'Core systems design with KPI frameworks, process mapping, and accountability structures.', metadata: { category: 'consulting', service: 'systems-implementation', tier: 'foundation' }, price: 800000 },
  { name: 'Systems & Implementation - Standard', description: 'Full system design with governance frameworks, SOP development, and balanced scorecard.', metadata: { category: 'consulting', service: 'systems-implementation', tier: 'standard' }, price: 1500000 },
  { name: 'Systems & Implementation - Enterprise', description: 'Complete systems overhaul with full implementation, dashboards, and ongoing support.', metadata: { category: 'consulting', service: 'systems-implementation', tier: 'enterprise' }, price: 2500000 },
  // === ENTERPRISE: Executive Advisory ===
  { name: 'Executive Advisory - Standard', description: 'Monthly strategy sessions with performance oversight and ongoing advisory.', metadata: { category: 'consulting', service: 'executive-advisory', tier: 'standard', billing: 'monthly' }, price: 250000, recurring: true },
  { name: 'Executive Advisory - Premium', description: 'Bi-weekly sessions with leadership coaching, team alignment, and hands-on project support.', metadata: { category: 'consulting', service: 'executive-advisory', tier: 'premium', billing: 'monthly' }, price: 500000, recurring: true },
  { name: 'Executive Advisory - Executive', description: 'Weekly strategic sessions with dedicated senior consultant, full advisory, and leadership development.', metadata: { category: 'consulting', service: 'executive-advisory', tier: 'executive', billing: 'monthly' }, price: 750000, recurring: true },
  // === ENTERPRISE: Business Registration ===
  { name: 'Business Registration - Starter', description: 'Sole proprietorship or basic incorporation with name search and registration filing.', metadata: { category: 'consulting', service: 'business-registration', tier: 'starter' }, price: 350000 },
  { name: 'Business Registration - Standard', description: 'Full incorporation with corporate records, tax registration, and business number applications.', metadata: { category: 'consulting', service: 'business-registration', tier: 'standard' }, price: 550000 },
  { name: 'Business Registration - Comprehensive', description: 'Complete setup with governance documents, shareholder agreements, and compliance framework.', metadata: { category: 'consulting', service: 'business-registration', tier: 'comprehensive' }, price: 850000 },
  // === ENTERPRISE: Website & Digital ===
  { name: 'Basic Website', description: 'Ideal for small businesses, personal portfolios, nonprofits, and simple informational sites.', metadata: { category: 'website', tier: 'basic' }, price: 120000 },
  { name: 'Standard Business Website', description: 'Perfect for established organizations that need a stronger online presence.', metadata: { category: 'website', tier: 'standard' }, price: 300000 },
  { name: 'Advanced / Growth Website', description: 'For organizations needing advanced functionality and strategic design.', metadata: { category: 'website', tier: 'advanced' }, price: 600000 },
  { name: 'Premium / Enterprise Website', description: 'For high-impact brands, nonprofits with large programs, or businesses with complex needs.', metadata: { category: 'website', tier: 'premium' }, price: 1200000 },
  { name: 'Ongoing Website Management', description: 'Monthly website management, updates, security, and ongoing development support.', metadata: { category: 'website', tier: 'ongoing', billing: 'monthly' }, price: 78000, recurring: true },
  // === ENTERPRISE: Process Audit ===
  { name: 'Process Audit - Essentials', description: 'Focused audit of 1-2 core workflows with bottleneck analysis and recommendations.', metadata: { category: 'consulting', service: 'process-audit', tier: 'essentials' }, price: 100000 },
  { name: 'Process Audit - Standard', description: 'Comprehensive audit across multiple workflows with stakeholder interviews.', metadata: { category: 'consulting', service: 'process-audit', tier: 'standard' }, price: 200000 },
  { name: 'Process Audit - Comprehensive', description: 'End-to-end process audit with detailed documentation and implementation guidance.', metadata: { category: 'consulting', service: 'process-audit', tier: 'comprehensive' }, price: 300000 },
  // === ENTERPRISE: Operational Efficiency Workshop ===
  { name: 'Efficiency Workshop - Half-Day', description: 'Focused 4-hour workshop on diagnosing inefficiencies and defining quick wins.', metadata: { category: 'consulting', service: 'efficiency-workshop', tier: 'half-day' }, price: 250000 },
  { name: 'Efficiency Workshop - Full-Day', description: 'Comprehensive 8-hour session with deep analysis and detailed roadmap.', metadata: { category: 'consulting', service: 'efficiency-workshop', tier: 'full-day' }, price: 500000 },
  // === ENTERPRISE: Fractional Process Consultant ===
  { name: 'Fractional Consultant - Core', description: 'Part-time process consultant with monthly systems work and optimization.', metadata: { category: 'consulting', service: 'fractional-consultant', tier: 'core', billing: 'monthly' }, price: 300000, recurring: true },
  { name: 'Fractional Consultant - Standard', description: 'Dedicated consultant with weekly sessions and full systems build-out.', metadata: { category: 'consulting', service: 'fractional-consultant', tier: 'standard', billing: 'monthly' }, price: 600000, recurring: true },
  { name: 'Fractional Consultant - Premium', description: 'Senior consultant with full operational integration and executive reporting.', metadata: { category: 'consulting', service: 'fractional-consultant', tier: 'premium', billing: 'monthly' }, price: 1000000, recurring: true },
  // === ENTERPRISE: HR & People Strategy ===
  { name: 'HR Strategy - Foundation', description: 'Core HR framework with policies, role clarity, and performance review design.', metadata: { category: 'consulting', service: 'hr-strategy', tier: 'foundation' }, price: 500000 },
  { name: 'HR Strategy - Standard', description: 'Full people strategy with engagement systems and talent planning.', metadata: { category: 'consulting', service: 'hr-strategy', tier: 'standard' }, price: 1000000 },
  { name: 'HR Strategy - Comprehensive', description: 'Complete people infrastructure with succession planning and implementation support.', metadata: { category: 'consulting', service: 'hr-strategy', tier: 'comprehensive' }, price: 1500000 },
  // === ENTERPRISE: Recruitment Process Design ===
  { name: 'Recruitment Design - Foundation', description: 'Core hiring process design with job frameworks and interview templates.', metadata: { category: 'consulting', service: 'recruitment-design', tier: 'foundation' }, price: 300000 },
  { name: 'Recruitment Design - Standard', description: 'Full recruitment system with sourcing strategy and onboarding design.', metadata: { category: 'consulting', service: 'recruitment-design', tier: 'standard' }, price: 600000 },
  { name: 'Recruitment Design - Enterprise', description: 'Complete talent acquisition infrastructure with ATS setup and DEI strategy.', metadata: { category: 'consulting', service: 'recruitment-design', tier: 'enterprise' }, price: 1000000 },
  // === ENTERPRISE: Leadership & Talent Development ===
  { name: 'Talent Development - Foundation', description: 'Leadership competency framework with talent assessment.', metadata: { category: 'consulting', service: 'talent-development', tier: 'foundation' }, price: 500000 },
  { name: 'Talent Development - Standard', description: 'Full talent development program with training and succession planning.', metadata: { category: 'consulting', service: 'talent-development', tier: 'standard' }, price: 1200000 },
  { name: 'Talent Development - Enterprise', description: 'Comprehensive leadership development with multi-level programs and 360 assessments.', metadata: { category: 'consulting', service: 'talent-development', tier: 'enterprise' }, price: 2000000 },
  // === ENTERPRISE: Talent Acquisition & Staffing ===
  { name: 'Talent Acquisition - Single Placement', description: 'End-to-end recruitment for a single role.', metadata: { category: 'consulting', service: 'talent-acquisition', tier: 'single' }, price: 500000 },
  { name: 'Talent Acquisition - Multi-Hire', description: 'Recruitment for 2-5 roles with dedicated recruiter.', metadata: { category: 'consulting', service: 'talent-acquisition', tier: 'multi' }, price: 1200000 },
  { name: 'Talent Acquisition - Recruiting Retainer', description: 'Ongoing recruiting partnership with dedicated team and unlimited placements.', metadata: { category: 'consulting', service: 'talent-acquisition', tier: 'retainer' }, price: 2500000 },
  // === SMALL BUSINESS: Growth System ===
  { name: 'SB Growth System - Essentials', description: 'Monthly advisory with strategy sessions and basic accountability.', metadata: { category: 'small-business', service: 'growth-system', tier: 'essentials', billing: 'monthly' }, price: 50000, recurring: true },
  { name: 'SB Growth System - Standard', description: 'Bi-weekly sessions with operational support and process development.', metadata: { category: 'small-business', service: 'growth-system', tier: 'standard', billing: 'monthly' }, price: 100000, recurring: true },
  { name: 'SB Growth System - Premium', description: 'Weekly sessions with full business systems support and growth strategy.', metadata: { category: 'small-business', service: 'growth-system', tier: 'premium', billing: 'monthly' }, price: 150000, recurring: true },
  // === SMALL BUSINESS: Business Foundations ===
  { name: 'Business Foundations - Core', description: 'Essential business foundations with core processes and structure.', metadata: { category: 'small-business', service: 'foundations', tier: 'core' }, price: 250000 },
  { name: 'Business Foundations - Standard', description: 'Complete business setup with systems, planning, and team frameworks.', metadata: { category: 'small-business', service: 'foundations', tier: 'standard' }, price: 350000 },
  { name: 'Business Foundations - Premium', description: 'Full business foundation with governance, compliance, and growth strategy.', metadata: { category: 'small-business', service: 'foundations', tier: 'premium' }, price: 500000 },
  // === SMALL BUSINESS: Process Audit ===
  { name: 'SB Process Audit - Quick Scan', description: 'Focused review of top 1-2 pain points with recommendations.', metadata: { category: 'small-business', service: 'sb-process-audit', tier: 'quick-scan' }, price: 50000 },
  { name: 'SB Process Audit - Standard', description: 'Full workflow audit across core business operations.', metadata: { category: 'small-business', service: 'sb-process-audit', tier: 'standard' }, price: 100000 },
  { name: 'SB Process Audit - Comprehensive', description: 'Deep-dive audit with documentation and implementation guidance.', metadata: { category: 'small-business', service: 'sb-process-audit', tier: 'comprehensive' }, price: 150000 },
  // === SMALL BUSINESS: Operational Efficiency Workshop ===
  { name: 'SB Workshop - Half-Day', description: 'Focused 3-hour session to diagnose issues and define priorities.', metadata: { category: 'small-business', service: 'sb-workshop', tier: 'half-day' }, price: 150000 },
  { name: 'SB Workshop - Full-Day', description: 'Comprehensive working session with process mapping and detailed roadmap.', metadata: { category: 'small-business', service: 'sb-workshop', tier: 'full-day' }, price: 300000 },
  // === SMALL BUSINESS: Website & Digital ===
  { name: 'SB Website - Starter', description: 'Clean single-page website with contact form and mobile-friendly design.', metadata: { category: 'small-business', service: 'sb-website', tier: 'starter' }, price: 150000 },
  { name: 'SB Website - Standard', description: 'Multi-page website with content strategy and lead capture.', metadata: { category: 'small-business', service: 'sb-website', tier: 'standard' }, price: 300000 },
  { name: 'SB Website - Premium', description: 'Full digital presence with brand identity and ongoing support.', metadata: { category: 'small-business', service: 'sb-website', tier: 'premium' }, price: 500000 },
  // === SMALL BUSINESS: People Operations ===
  { name: 'People Ops - Essentials', description: 'Core HR policies and employee handbook for small teams.', metadata: { category: 'small-business', service: 'people-ops', tier: 'essentials' }, price: 200000 },
  { name: 'People Ops - Standard', description: 'Full people operations setup with onboarding and reviews.', metadata: { category: 'small-business', service: 'people-ops', tier: 'standard' }, price: 350000 },
  { name: 'People Ops - Premium', description: 'Complete HR foundation with culture strategy and compensation framework.', metadata: { category: 'small-business', service: 'people-ops', tier: 'premium' }, price: 500000 },
  // === SMALL BUSINESS: Recruitment & Hiring Support ===
  { name: 'SB Hiring Support - Starter', description: 'Essential hiring tools with job templates for 1-3 roles.', metadata: { category: 'small-business', service: 'sb-hiring', tier: 'starter' }, price: 100000 },
  { name: 'SB Hiring Support - Standard', description: 'Complete hiring system with sourcing strategy.', metadata: { category: 'small-business', service: 'sb-hiring', tier: 'standard' }, price: 200000 },
  { name: 'SB Hiring Support - Comprehensive', description: 'Full recruitment setup with employer branding and support.', metadata: { category: 'small-business', service: 'sb-hiring', tier: 'comprehensive' }, price: 300000 },
  // === SMALL BUSINESS: Recruiting & Staffing ===
  { name: 'SB Recruiting - Single Hire', description: 'Full recruitment support for one role.', metadata: { category: 'small-business', service: 'sb-recruiting', tier: 'single' }, price: 200000 },
  { name: 'SB Recruiting - Standard', description: 'Enhanced recruiting with employer branding and onboarding support.', metadata: { category: 'small-business', service: 'sb-recruiting', tier: 'standard' }, price: 350000 },
  { name: 'SB Recruiting - Premium', description: 'Priority recruiting with dedicated support and placement guarantee.', metadata: { category: 'small-business', service: 'sb-recruiting', tier: 'premium' }, price: 500000 },
  // === PROFESSIONAL: Personal Performance Coaching ===
  { name: 'Personal Coaching - Essentials', description: 'Monthly coaching sessions with goal setting and accountability.', metadata: { category: 'professional', service: 'personal-coaching', tier: 'essentials', billing: 'monthly' }, price: 10000, recurring: true },
  { name: 'Personal Coaching - Standard', description: 'Bi-weekly sessions with productivity systems and habit building.', metadata: { category: 'professional', service: 'personal-coaching', tier: 'standard', billing: 'monthly' }, price: 25000, recurring: true },
  { name: 'Personal Coaching - Premium', description: 'Weekly sessions with comprehensive personal performance system.', metadata: { category: 'professional', service: 'personal-coaching', tier: 'premium', billing: 'monthly' }, price: 50000, recurring: true },
  // === PROFESSIONAL: Personal Workflow Audit ===
  { name: 'Workflow Audit - Quick Scan', description: 'Focused review of top productivity challenges.', metadata: { category: 'professional', service: 'workflow-audit', tier: 'quick-scan' }, price: 25000 },
  { name: 'Workflow Audit - Standard', description: 'Full workflow audit with personalized productivity system.', metadata: { category: 'professional', service: 'workflow-audit', tier: 'standard' }, price: 50000 },
  { name: 'Workflow Audit - Comprehensive', description: 'Deep-dive audit with full system setup and accountability.', metadata: { category: 'professional', service: 'workflow-audit', tier: 'comprehensive' }, price: 75000 },
  // === PROFESSIONAL: Performance Workshop ===
  { name: 'Performance Workshop - Half-Day', description: 'Focused 2-hour session on goals, priorities, and action planning.', metadata: { category: 'professional', service: 'perf-workshop', tier: 'half-day' }, price: 50000 },
  { name: 'Performance Workshop - Full-Day', description: 'Comprehensive session with habit design and accountability framework.', metadata: { category: 'professional', service: 'perf-workshop', tier: 'full-day' }, price: 150000 },
  // === PROFESSIONAL: Personal Brand Website ===
  { name: 'Personal Website - Essential', description: 'Clean single-page personal website with bio and contact form.', metadata: { category: 'professional', service: 'personal-website', tier: 'essential' }, price: 100000 },
  { name: 'Personal Website - Standard', description: 'Multi-page website with portfolio and booking integration.', metadata: { category: 'professional', service: 'personal-website', tier: 'standard' }, price: 200000 },
  { name: 'Personal Website - Premium', description: 'Full personal brand website with blog and content strategy.', metadata: { category: 'professional', service: 'personal-website', tier: 'premium' }, price: 300000 },
  // === PROFESSIONAL: Leadership & People Management Coaching ===
  { name: 'Leadership Coaching - Essentials', description: 'Monthly coaching on core management skills.', metadata: { category: 'professional', service: 'leadership-coaching', tier: 'essentials', billing: 'monthly' }, price: 20000, recurring: true },
  { name: 'Leadership Coaching - Standard', description: 'Bi-weekly coaching with hiring skills and team building.', metadata: { category: 'professional', service: 'leadership-coaching', tier: 'standard', billing: 'monthly' }, price: 45000, recurring: true },
  { name: 'Leadership Coaching - Premium', description: 'Weekly coaching with comprehensive leadership development.', metadata: { category: 'professional', service: 'leadership-coaching', tier: 'premium', billing: 'monthly' }, price: 75000, recurring: true },
  // === PROFESSIONAL: Interview & Career Readiness ===
  { name: 'Career Readiness - Quick Prep', description: 'Focused interview preparation session.', metadata: { category: 'professional', service: 'career-readiness', tier: 'quick-prep' }, price: 25000 },
  { name: 'Career Readiness - Standard', description: 'Full interview preparation with mock interviews and resume review.', metadata: { category: 'professional', service: 'career-readiness', tier: 'standard' }, price: 50000 },
  { name: 'Career Readiness - Comprehensive', description: 'Complete career readiness with negotiation coaching.', metadata: { category: 'professional', service: 'career-readiness', tier: 'comprehensive' }, price: 75000 },
  // === PROFESSIONAL: Career Placement ===
  { name: 'Career Placement - Starter', description: 'Resume and LinkedIn optimization with job search strategy.', metadata: { category: 'professional', service: 'career-placement', tier: 'starter' }, price: 50000 },
  { name: 'Career Placement - Standard', description: 'Active job search support with employer outreach.', metadata: { category: 'professional', service: 'career-placement', tier: 'standard' }, price: 100000 },
  { name: 'Career Placement - Premium', description: 'Full placement support with dedicated career partner.', metadata: { category: 'professional', service: 'career-placement', tier: 'premium' }, price: 200000 },
  // === SELF-SERVE: Performance Planner ===
  { name: 'Performance Planner - Digital', description: 'Digital download with templates and guides.', metadata: { category: 'self-serve', service: 'performance-planner', tier: 'digital' }, price: 4900 },
  { name: 'Performance Planner - Premium', description: 'Everything in Digital plus video walkthroughs and bonus resources.', metadata: { category: 'self-serve', service: 'performance-planner', tier: 'premium' }, price: 9900 },
  // === SELF-SERVE: 90-Day Program ===
  { name: '90-Day Program - Self-Guided', description: 'Complete program with templates and weekly action plans.', metadata: { category: 'self-serve', service: '90-day-program', tier: 'self-guided' }, price: 29700 },
  { name: '90-Day Program - Guided', description: 'Full program with live group calls and coaching support.', metadata: { category: 'self-serve', service: '90-day-program', tier: 'guided' }, price: 99700 },
  // === SELF-SERVE: Performance Systems Toolkit ===
  { name: 'Systems Toolkit - Starter', description: 'Essential templates for individual performance management.', metadata: { category: 'self-serve', service: 'systems-toolkit', tier: 'starter' }, price: 4900 },
  { name: 'Systems Toolkit - Team', description: 'Full team toolkit with accountability systems.', metadata: { category: 'self-serve', service: 'systems-toolkit', tier: 'team' }, price: 12900 },
  { name: 'Systems Toolkit - Business', description: 'Complete business toolkit with governance and SOPs.', metadata: { category: 'self-serve', service: 'systems-toolkit', tier: 'business' }, price: 19900 },
  // === SELF-SERVE: Hiring & People Management Toolkit ===
  { name: 'Hiring Toolkit - Starter', description: 'Essential hiring and onboarding templates.', metadata: { category: 'self-serve', service: 'hiring-toolkit', tier: 'starter' }, price: 4900 },
  { name: 'Hiring Toolkit - Manager', description: 'Complete people management toolkit with reviews and feedback.', metadata: { category: 'self-serve', service: 'hiring-toolkit', tier: 'manager' }, price: 12900 },
  { name: 'Hiring Toolkit - Business', description: 'Full HR toolkit with policies and compliance.', metadata: { category: 'self-serve', service: 'hiring-toolkit', tier: 'business' }, price: 19900 },
  // === SELF-SERVE: Job Search & Career Toolkit ===
  { name: 'Career Toolkit - Essential', description: 'Core job search templates including resume and application tracker.', metadata: { category: 'self-serve', service: 'career-toolkit', tier: 'essential' }, price: 2900 },
  { name: 'Career Toolkit - Standard', description: 'Complete toolkit with LinkedIn guide and salary research.', metadata: { category: 'self-serve', service: 'career-toolkit', tier: 'standard' }, price: 5900 },
  { name: 'Career Toolkit - Premium', description: 'Full career toolkit with video walkthroughs and negotiation scripts.', metadata: { category: 'self-serve', service: 'career-toolkit', tier: 'premium' }, price: 9900 },
  // === COLLECTIVE ===
  { name: 'Collective - Essential', description: 'Performance Processes Collective monthly membership - essential tier.', metadata: { category: 'collective', tier: 'essential', billing: 'monthly' }, price: 4900, recurring: true },
  { name: 'Collective - Premium', description: 'Performance Processes Collective monthly membership - premium tier.', metadata: { category: 'collective', tier: 'premium', billing: 'monthly' }, price: 9900, recurring: true },
];

export async function ensureStripeProducts(): Promise<void> {
  try {
    const stripe = await getUncachableStripeClient();

    const allProducts: any[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;
    while (hasMore) {
      const params: any = { active: true, limit: 100 };
      if (startingAfter) params.starting_after = startingAfter;
      const batch = await stripe.products.list(params);
      allProducts.push(...batch.data);
      hasMore = batch.has_more;
      if (batch.data.length > 0) startingAfter = batch.data[batch.data.length - 1].id;
    }
    const existingNames = new Set(allProducts.map((p: any) => p.name));

    const missing = PRODUCTS.filter(p => !existingNames.has(p.name));

    if (missing.length === 0) {
      console.log(`All ${PRODUCTS.length} Stripe products exist`);
      return;
    }

    console.log(`Creating ${missing.length} missing Stripe products...`);

    for (const service of missing) {
      const product = await stripe.products.create({
        name: service.name,
        description: service.description,
        metadata: service.metadata,
      });

      const priceParams: any = {
        product: product.id,
        unit_amount: service.price,
        currency: 'cad',
      };
      if (service.recurring) {
        priceParams.recurring = { interval: 'month' };
      }
      await stripe.prices.create(priceParams);

      console.log(`Created: ${product.name} ($${service.price / 100})`);
    }

    console.log('All Stripe products ready');
  } catch (error: any) {
    console.error('Error ensuring Stripe products:', error.message || error);
  }
}
