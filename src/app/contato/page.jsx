import React from 'react';
import SiteShell from '@/components/SiteShell';
import Contact from '@/components/velnox/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contato',
  description: data.contact.subtitle,
  path: '/contato',
});

export default function ContactPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Contato', path: '/contato' }]} />
      <Contact headingLevel="h1" />
    </SiteShell>
  );
}
