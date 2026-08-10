import React from 'react';
import SiteShell from '@/components/SiteShell';
import Budget from '@/components/velnox/Budget';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const data = getContent(locale);
  return buildMetadata({
    title: `${data.budget.headingPrefix} ${data.budget.headingHighlight}`,
    description: data.budget.subtitle,
    path: '/orcamento',
    locale,
  });
}

export default async function BudgetPage({ params, searchParams }) {
  const { locale } = await params;
  const data = getContent(locale);
  const search = await searchParams;
  const planParam = (Array.isArray(search?.plano) ? search.plano[0] : search?.plano) || '';
  const selectedPlan = data.pricing.plans.find(
    (plan) => plan.name.toLowerCase() === planParam.toLowerCase()
  ) || null;

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: `${data.budget.headingPrefix} ${data.budget.headingHighlight}`, path: '/orcamento' }]} />
      <Budget selectedPlan={selectedPlan} locale={locale} />
    </SiteShell>
  );
}
