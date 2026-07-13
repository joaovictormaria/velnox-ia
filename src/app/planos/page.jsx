import React from 'react';
import SiteShell from '@/components/SiteShell';
import Pricing from '@/components/velnox/Pricing';
import Breadcrumbs from '@/components/Breadcrumbs';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';
import { offerCatalogSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'Planos e Preços',
  description: data.pricing.subtitle,
  path: '/planos',
});

export default function PricingPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Planos e Preços', path: '/planos' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema(data.pricing.plans)) }}
      />
      <Pricing headingLevel="h1" />
    </SiteShell>
  );
}
