import React from 'react';
import SiteShell from '@/components/SiteShell';
import Contact from '@/components/velnox/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const data = getContent(locale);
  return buildMetadata({
    title: `${data.contact.headingPrefix} ${data.contact.headingHighlight}`,
    description: data.contact.subtitle,
    path: '/contato',
    locale,
  });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const data = getContent(locale);

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: `${data.contact.headingPrefix} ${data.contact.headingHighlight}`, path: '/contato' }]} />
      <Contact headingLevel="h1" locale={locale} />
    </SiteShell>
  );
}
