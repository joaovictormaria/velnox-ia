import React from 'react';
import SiteShell from '@/components/SiteShell';
import Services from '@/components/velnox/Services';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
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
      <BreadcrumbJsonLd page="Serviços" path="/servicos" />
      <Services headingLevel="h1" />
    </SiteShell>
  );
}
