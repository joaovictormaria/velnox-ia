import React from 'react';
import SiteShell from '@/components/SiteShell';
import FAQ from '@/components/velnox/FAQ';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'Perguntas Frequentes',
  description: data.faq.subtitle,
  path: '/faq',
});

export default function FAQPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd page="Perguntas Frequentes" path="/faq" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(data.faq.items)) }}
      />
      <FAQ headingLevel="h1" />
    </SiteShell>
  );
}
