import React from 'react';
import { getLeads } from '@/lib/db';
import LeadsTable from '@/components/admin/LeadsTable';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const leads = await getLeads();

  return (
    <main className="min-h-screen px-6 py-10 bg-background">
      <div className="max-w-6xl mx-auto">
        <LeadsTable leads={leads} />
      </div>
    </main>
  );
}
