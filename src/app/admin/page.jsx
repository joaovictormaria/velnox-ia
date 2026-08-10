import React from 'react';
import { getLeads, getVisitStats } from '@/lib/db';
import LeadsTable from '@/components/admin/LeadsTable';
import VisitsStats from '@/components/admin/VisitsStats';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [leads, visitStats] = await Promise.all([getLeads(), getVisitStats()]);

  return (
    <main className="min-h-screen px-6 py-10 bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        <VisitsStats total={visitStats.total} byCountry={visitStats.byCountry} />
        <LeadsTable leads={leads} />
      </div>
    </main>
  );
}
