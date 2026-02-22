import { getUncachableStripeClient } from './stripeClient';

const PRODUCTS = [
  { name: 'Strategic Planning - Essentials', description: 'Half-day leadership workshop with vision refinement and basic strategic roadmap.', metadata: { category: 'consulting', service: 'strategic-planning', tier: 'essentials' }, price: 750000 },
  { name: 'Strategic Planning - Standard', description: 'Multi-day engagement with stakeholder analysis, KPI design, and 1-year roadmap.', metadata: { category: 'consulting', service: 'strategic-planning', tier: 'standard' }, price: 1500000 },
  { name: 'Strategic Planning - Comprehensive', description: 'Full transformation package with leadership alignment workshops, 3-year roadmap, and ongoing support.', metadata: { category: 'consulting', service: 'strategic-planning', tier: 'comprehensive' }, price: 2500000 },
  { name: 'Organizational Assessment - Focused', description: 'Targeted assessment covering leadership interviews and structure review.', metadata: { category: 'consulting', service: 'org-assessment', tier: 'focused' }, price: 500000 },
  { name: 'Organizational Assessment - Standard', description: 'Full assessment with culture, capability, and performance review.', metadata: { category: 'consulting', service: 'org-assessment', tier: 'standard' }, price: 1000000 },
  { name: 'Organizational Assessment - Comprehensive', description: 'Deep-dive with governance analysis, risk review, and comprehensive findings report.', metadata: { category: 'consulting', service: 'org-assessment', tier: 'comprehensive' }, price: 1800000 },
  { name: 'Performance Management - Foundation', description: 'KPI framework development and basic accountability structures.', metadata: { category: 'consulting', service: 'performance-management', tier: 'foundation' }, price: 600000 },
  { name: 'Performance Management - Standard', description: 'Full system design with balanced scorecard, review templates, and role-based structures.', metadata: { category: 'consulting', service: 'performance-management', tier: 'standard' }, price: 1200000 },
  { name: 'Performance Management - Enterprise', description: 'Complete package with reporting dashboards, implementation support, and ongoing guidance.', metadata: { category: 'consulting', service: 'performance-management', tier: 'enterprise' }, price: 2000000 },
  { name: 'Leadership Development - Workshop', description: 'Single-day leadership workshop with competency assessment.', metadata: { category: 'consulting', service: 'leadership', tier: 'workshop' }, price: 350000 },
  { name: 'Leadership Development - Program', description: 'Multi-session program with team alignment and management workshops.', metadata: { category: 'consulting', service: 'leadership', tier: 'program' }, price: 800000 },
  { name: 'Leadership Development - Executive', description: 'Full coaching program with one-on-one executive coaching and accountability training.', metadata: { category: 'consulting', service: 'leadership', tier: 'executive' }, price: 1500000 },
  { name: 'Process Improvement - Essentials', description: 'Process mapping sessions and basic workflow analysis.', metadata: { category: 'consulting', service: 'process-improvement', tier: 'essentials' }, price: 400000 },
  { name: 'Process Improvement - Standard', description: 'Full workflow analysis with SOP development and role clarity frameworks.', metadata: { category: 'consulting', service: 'process-improvement', tier: 'standard' }, price: 800000 },
  { name: 'Process Improvement - Comprehensive', description: 'Complete systems overhaul with operational efficiency recommendations and implementation.', metadata: { category: 'consulting', service: 'process-improvement', tier: 'comprehensive' }, price: 1500000 },
  { name: 'Change Management - Foundation', description: 'Change readiness assessment and stakeholder mapping.', metadata: { category: 'consulting', service: 'change-management', tier: 'foundation' }, price: 500000 },
  { name: 'Change Management - Standard', description: 'Full change strategy design with communication plan and stakeholder engagement.', metadata: { category: 'consulting', service: 'change-management', tier: 'standard' }, price: 1200000 },
  { name: 'Change Management - Enterprise', description: 'Complete implementation with coaching, adoption tracking, and ongoing support.', metadata: { category: 'consulting', service: 'change-management', tier: 'enterprise' }, price: 2000000 },
  { name: 'Basic Website', description: 'Ideal for small businesses, personal portfolios, nonprofits, and simple informational sites.', metadata: { category: 'website', tier: 'basic' }, price: 120000 },
  { name: 'Standard Business Website', description: 'Perfect for established organizations that need a stronger online presence.', metadata: { category: 'website', tier: 'standard' }, price: 300000 },
  { name: 'Advanced / Growth Website', description: 'For organizations needing advanced functionality and strategic design.', metadata: { category: 'website', tier: 'advanced' }, price: 600000 },
  { name: 'Premium / Enterprise Website', description: 'For high-impact brands, nonprofits with large programs, or businesses with complex needs.', metadata: { category: 'website', tier: 'premium' }, price: 1200000 },
  { name: 'Ongoing Website Management', description: 'Monthly website management, updates, security, and ongoing development support.', metadata: { category: 'website', tier: 'ongoing', billing: 'monthly' }, price: 78000, recurring: true },
  { name: 'Business Support - Essential', description: 'Ideal for small businesses needing periodic expert guidance and check-ins. 5 consulting hours per month.', metadata: { category: 'consulting', service: 'business-support', tier: 'essential', billing: 'monthly' }, price: 65000, recurring: true },
  { name: 'Business Support - Professional', description: 'For growing organizations that need regular hands-on consulting and project support. 15 consulting hours per month.', metadata: { category: 'consulting', service: 'business-support', tier: 'professional', billing: 'monthly' }, price: 288000, recurring: true },
  { name: 'Business Support - Enterprise', description: 'Full embedded support for organizations undergoing transformation or rapid growth. 40 consulting hours per month.', metadata: { category: 'consulting', service: 'business-support', tier: 'enterprise', billing: 'monthly' }, price: 768000, recurring: true },
];

export async function ensureStripeProducts(): Promise<void> {
  try {
    const stripe = await getUncachableStripeClient();

    const existing = await stripe.products.list({ active: true, limit: 100 });
    const existingNames = new Set(existing.data.map(p => p.name));

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
      if ((service as any).recurring) {
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
