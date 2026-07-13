import React from 'react';
import SiteShell from '@/components/SiteShell';
import Pricing from '@/components/velnox/Pricing';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Planos e Preços',
  description: data.pricing.subtitle,
  path: '/planos',
});

export default function PricingPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd page="Planos e Preços" path="/planos" />
      <Pricing headingLevel="h1" />
    </SiteShell>
  );
}
