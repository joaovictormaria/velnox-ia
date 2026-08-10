import React from 'react';
import SiteShell from '@/components/SiteShell';
import Pricing from '@/components/velnox/Pricing';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { offerCatalogSchema } from '@/lib/jsonld';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const data = getContent(locale);
  return buildMetadata({
    title: `${data.pricing.headingPrefix} ${data.pricing.headingHighlight}`,
    description: data.pricing.subtitle,
    path: '/planos',
    locale,
  });
}

export default async function PricingPage({ params }) {
  const { locale } = await params;
  const data = getContent(locale);

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: `${data.pricing.headingPrefix} ${data.pricing.headingHighlight}`, path: '/planos' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema(data.pricing.plans)) }}
      />
      <Pricing headingLevel="h1" locale={locale} />
    </SiteShell>
  );
}
