import React from 'react';
import SiteShell from '@/components/SiteShell';
import Services from '@/components/velnox/Services';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const data = getContent(locale);
  return buildMetadata({
    title: data.services.headingHighlight,
    description: data.services.subtitle,
    path: '/servicos',
    locale,
  });
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const data = getContent(locale);

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: data.services.headingHighlight, path: '/servicos' }]} />
      <Services headingLevel="h1" locale={locale} />
    </SiteShell>
  );
}
