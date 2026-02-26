import { getUncachableStripeClient } from './stripeClient';

const PRODUCTS = [
  { name: 'Discovery Phase - Essentials', description: 'Focused intake session with needs assessment and initial scope definition.', metadata: { category: 'consulting', service: 'discovery', tier: 'essentials' }, price: 75000 },
  { name: 'Discovery Phase - Standard', description: 'Comprehensive discovery with stakeholder interviews, detailed assessment, and full proposal roadmap.', metadata: { category: 'consulting', service: 'discovery', tier: 'standard' }, price: 150000 },
  { name: 'Strategic Engagement - Foundation', description: 'Focused strategic engagement covering planning fundamentals and initial alignment.', metadata: { category: 'consulting', service: 'strategic-engagement', tier: 'foundation' }, price: 500000 },
  { name: 'Strategic Engagement - Standard', description: 'Full strategic engagement with KPI design, stakeholder alignment, and performance framework.', metadata: { category: 'consulting', service: 'strategic-engagement', tier: 'standard' }, price: 1000000 },
  { name: 'Strategic Engagement - Comprehensive', description: 'Complete strategic transformation with deep-dive analysis, leadership coaching, and ongoing support.', metadata: { category: 'consulting', service: 'strategic-engagement', tier: 'comprehensive' }, price: 1500000 },
  { name: 'Systems & Implementation - Foundation', description: 'Core systems design with KPI frameworks, process mapping, and accountability structures.', metadata: { category: 'consulting', service: 'systems-implementation', tier: 'foundation' }, price: 800000 },
  { name: 'Systems & Implementation - Standard', description: 'Full system design with governance frameworks, SOP development, and balanced scorecard.', metadata: { category: 'consulting', service: 'systems-implementation', tier: 'standard' }, price: 1500000 },
  { name: 'Systems & Implementation - Enterprise', description: 'Complete systems overhaul with full implementation, dashboards, and ongoing support.', metadata: { category: 'consulting', service: 'systems-implementation', tier: 'enterprise' }, price: 2500000 },
  { name: 'Executive Advisory - Standard', description: 'Monthly strategy sessions with performance oversight and ongoing advisory.', metadata: { category: 'consulting', service: 'executive-advisory', tier: 'standard', billing: 'monthly' }, price: 250000, recurring: true },
  { name: 'Executive Advisory - Premium', description: 'Bi-weekly sessions with leadership coaching, team alignment, and hands-on project support.', metadata: { category: 'consulting', service: 'executive-advisory', tier: 'premium', billing: 'monthly' }, price: 500000, recurring: true },
  { name: 'Executive Advisory - Executive', description: 'Weekly strategic sessions with dedicated senior consultant, full advisory, and leadership development.', metadata: { category: 'consulting', service: 'executive-advisory', tier: 'executive', billing: 'monthly' }, price: 750000, recurring: true },
  { name: 'Business Registration - Starter', description: 'Sole proprietorship or basic incorporation with name search and registration filing.', metadata: { category: 'consulting', service: 'business-registration', tier: 'starter' }, price: 350000 },
  { name: 'Business Registration - Standard', description: 'Full incorporation with corporate records, tax registration, and business number applications.', metadata: { category: 'consulting', service: 'business-registration', tier: 'standard' }, price: 550000 },
  { name: 'Business Registration - Comprehensive', description: 'Complete setup with governance documents, shareholder agreements, and compliance framework.', metadata: { category: 'consulting', service: 'business-registration', tier: 'comprehensive' }, price: 850000 },
  { name: 'Basic Website', description: 'Ideal for small businesses, personal portfolios, nonprofits, and simple informational sites.', metadata: { category: 'website', tier: 'basic' }, price: 120000 },
  { name: 'Standard Business Website', description: 'Perfect for established organizations that need a stronger online presence.', metadata: { category: 'website', tier: 'standard' }, price: 300000 },
  { name: 'Advanced / Growth Website', description: 'For organizations needing advanced functionality and strategic design.', metadata: { category: 'website', tier: 'advanced' }, price: 600000 },
  { name: 'Premium / Enterprise Website', description: 'For high-impact brands, nonprofits with large programs, or businesses with complex needs.', metadata: { category: 'website', tier: 'premium' }, price: 1200000 },
  { name: 'Ongoing Website Management', description: 'Monthly website management, updates, security, and ongoing development support.', metadata: { category: 'website', tier: 'ongoing', billing: 'monthly' }, price: 78000, recurring: true },
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
