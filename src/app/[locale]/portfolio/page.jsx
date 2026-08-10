import React from 'react';
import SiteShell from '@/components/SiteShell';
import Portfolio from '@/components/velnox/Portfolio';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const data = getContent(locale);
  return buildMetadata({
    title: `${data.portfolio.headingPrefix} ${data.portfolio.headingHighlight}`,
    description: data.portfolio.subtitle,
    path: '/portfolio',
    locale,
  });
}

export default async function PortfolioPage({ params }) {
  const { locale } = await params;
  const data = getContent(locale);

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: `${data.portfolio.headingPrefix} ${data.portfolio.headingHighlight}`, path: '/portfolio' }]} />
      <Portfolio headingLevel="h1" locale={locale} />
    </SiteShell>
  );
}
