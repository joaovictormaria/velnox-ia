import React from 'react';
import SiteShell from '@/components/SiteShell';
import Portfolio from '@/components/velnox/Portfolio';
import Breadcrumbs from '@/components/Breadcrumbs';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Portfólio',
  description: data.portfolio.subtitle,
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Portfólio', path: '/portfolio' }]} />
      <Portfolio headingLevel="h1" />
    </SiteShell>
  );
}
