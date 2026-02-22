import { getUncachableStripeClient } from './stripeClient';

async function seedProducts() {
  const stripe = await getUncachableStripeClient();

  const services = [
    {
      name: 'Strategic Planning & Alignment',
      description: 'Define clear strategic direction and translate vision into measurable priorities.',
      metadata: { category: 'consulting', tier: 'strategic-planning' },
      price: 750000, // $7,500 starting
    },
    {
      name: 'Organizational Assessment',
      description: 'Data-driven diagnostic that identifies structural gaps and performance barriers.',
      metadata: { category: 'consulting', tier: 'org-assessment' },
      price: 500000, // $5,000 starting
    },
    {
      name: 'Performance Management Design',
      description: 'Performance systems that connect strategy to accountability.',
      metadata: { category: 'consulting', tier: 'performance-management' },
      price: 600000, // $6,000 starting
    },
    {
      name: 'Leadership Development',
      description: 'Equip leaders with clarity and confidence through practical capability building.',
      metadata: { category: 'consulting', tier: 'leadership' },
      price: 350000, // $3,500 starting
    },
    {
      name: 'Process Improvement',
      description: 'Streamline operations, eliminate inefficiencies, and create structured systems.',
      metadata: { category: 'consulting', tier: 'process-improvement' },
      price: 400000, // $4,000 starting
    },
    {
      name: 'Change Management Support',
      description: 'Support organizations through transitions with structured change frameworks.',
      metadata: { category: 'consulting', tier: 'change-management' },
      price: 500000, // $5,000 starting
    },
    {
      name: 'Basic Website',
      description: 'Ideal for small businesses, personal portfolios, nonprofits, and simple informational sites.',
      metadata: { category: 'website', tier: 'basic' },
      price: 120000, // $1,200 starting
    },
    {
      name: 'Standard Business Website',
      description: 'Perfect for established organizations that need a stronger online presence.',
      metadata: { category: 'website', tier: 'standard' },
      price: 300000, // $3,000 starting
    },
    {
      name: 'Advanced / Growth Website',
      description: 'For organizations needing advanced functionality and strategic design.',
      metadata: { category: 'website', tier: 'advanced' },
      price: 600000, // $6,000 starting
    },
    {
      name: 'Premium / Enterprise Website',
      description: 'For high-impact brands, nonprofits with large programs, or businesses with complex needs.',
      metadata: { category: 'website', tier: 'premium' },
      price: 1200000, // $12,000 starting
    },
  ];

  for (const service of services) {
    const existing = await stripe.products.search({ query: `name:'${service.name}'` });
    if (existing.data.length > 0) {
      console.log(`Product "${service.name}" already exists, skipping.`);
      continue;
    }

    const product = await stripe.products.create({
      name: service.name,
      description: service.description,
      metadata: service.metadata,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: service.price,
      currency: 'cad',
    });

    console.log(`Created: ${product.name} (${product.id}) - Price: ${price.id} ($${service.price / 100})`);
  }

  console.log('Done seeding products!');
}

seedProducts().catch(console.error);
