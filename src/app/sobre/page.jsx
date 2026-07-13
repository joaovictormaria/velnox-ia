import React from 'react';
import SiteShell from '@/components/SiteShell';
import About from '@/components/velnox/About';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sobre',
  description: data.about.breakdownIntro,
  path: '/sobre',
});

export default function AboutPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd page="Sobre" path="/sobre" />
      <About headingLevel="h1" />
    </SiteShell>
  );
}
