import React from 'react';
import SiteShell from '@/components/SiteShell';
import FAQ from '@/components/velnox/FAQ';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/jsonld';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const data = getContent(locale);
  return buildMetadata({
    title: `${data.faq.headingPrefix} ${data.faq.headingHighlight}`,
    description: data.faq.subtitle,
    path: '/faq',
    locale,
  });
}

export default async function FAQPage({ params }) {
  const { locale } = await params;
  const data = getContent(locale);

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: `${data.faq.headingPrefix} ${data.faq.headingHighlight}`, path: '/faq' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(data.faq.items)) }}
      />
      <FAQ headingLevel="h1" locale={locale} />
    </SiteShell>
  );
}
