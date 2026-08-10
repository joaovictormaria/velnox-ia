import React from 'react';
import SiteShell from '@/components/SiteShell';
import About from '@/components/velnox/About';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const data = getContent(locale);
  return buildMetadata({
    title: `${data.about.headingPrefix} ${data.about.headingHighlight}`,
    description: data.about.breakdownIntro,
    path: '/sobre',
    locale,
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const data = getContent(locale);

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: `${data.about.headingPrefix} ${data.about.headingHighlight}`, path: '/sobre' }]} />
      <About headingLevel="h1" locale={locale} />
    </SiteShell>
  );
}
