import React from 'react';
import SiteShell from '@/components/SiteShell';
import Budget from '@/components/velnox/Budget';
import data from '@/data/static-data.json';

export default async function BudgetPage({ searchParams }) {
  const params = await searchParams;
  const planParam = (Array.isArray(params?.plano) ? params.plano[0] : params?.plano) || '';
  const selectedPlan = data.pricing.plans.find(
    (plan) => plan.name.toLowerCase() === planParam.toLowerCase()
  ) || null;

  return (
    <SiteShell>
      <Budget selectedPlan={selectedPlan} />
    </SiteShell>
  );
}
