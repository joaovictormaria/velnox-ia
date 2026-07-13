import React from 'react';
import SiteShell from '@/components/SiteShell';
import Budget from '@/components/velnox/Budget';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Orçamento',
  description: data.budget.subtitle,
  path: '/orcamento',
});

export default async function BudgetPage({ searchParams }) {
  const params = await searchParams;
  const planParam = (Array.isArray(params?.plano) ? params.plano[0] : params?.plano) || '';
  const selectedPlan = data.pricing.plans.find(
    (plan) => plan.name.toLowerCase() === planParam.toLowerCase()
  ) || null;

  return (
    <SiteShell>
      <BreadcrumbJsonLd page="Orçamento" path="/orcamento" />
      <Budget selectedPlan={selectedPlan} />
    </SiteShell>
  );
}
