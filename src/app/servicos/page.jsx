import React from 'react';
import SiteShell from '@/components/SiteShell';
import Services from '@/components/velnox/Services';
import Breadcrumbs from '@/components/Breadcrumbs';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Serviços',
  description: data.services.subtitle,
  path: '/servicos',
});

export default function ServicesPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Serviços', path: '/servicos' }]} />
      <Services headingLevel="h1" />
    </SiteShell>
  );
}
