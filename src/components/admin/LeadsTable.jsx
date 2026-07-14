'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'novo', label: 'Novo' },
  { value: 'em_contato', label: 'Em contato' },
  { value: 'convertido', label: 'Convertido' },
  { value: 'perdido', label: 'Perdido' },
];

function formatDate(value) {
  return new Date(value).toLocaleString('pt-BR');
}

export default function LeadsTable({ leads }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState(null);

  const handleStatusChange = async (id, status) => {
    setPendingId(id);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const handleNotesBlur = async (id, notes) => {
    setPendingId(id);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir este lead?')) return;
    setPendingId(id);
    try {
      await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Leads ({leads.length})</h1>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-neon-cyan/40 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      <div className="overflow-x-auto bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="p-4 font-medium">Nome</th>
              <th className="p-4 font-medium">Contato</th>
              <th className="p-4 font-medium">Tipo</th>
              <th className="p-4 font-medium">Mensagem</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Notas</th>
              <th className="p-4 font-medium">Criado em</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/60 align-top">
                <td className="p-4 font-medium text-foreground whitespace-nowrap">{lead.name}</td>
                <td className="p-4 text-muted-foreground">
                  <div>{lead.email}</div>
                  {lead.phone && <div>{lead.phone}</div>}
                </td>
                <td className="p-4 text-muted-foreground whitespace-nowrap">{lead.project_type}</td>
                <td className="p-4 text-muted-foreground max-w-xs">{lead.message}</td>
                <td className="p-4">
                  <select
                    value={lead.status}
                    disabled={pendingId === lead.id}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className="px-2 py-1.5 rounded-lg bg-background/60 border border-border text-foreground text-xs focus:outline-none focus:border-neon-cyan/50 transition-colors disabled:opacity-50"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    defaultValue={lead.notes ?? ''}
                    disabled={pendingId === lead.id}
                    onBlur={(e) => handleNotesBlur(lead.id, e.target.value)}
                    placeholder="—"
                    className="w-40 px-2 py-1.5 rounded-lg bg-background/60 border border-border text-foreground text-xs focus:outline-none focus:border-neon-cyan/50 transition-colors disabled:opacity-50"
                  />
                </td>
                <td className="p-4 text-muted-foreground whitespace-nowrap">{formatDate(lead.created_at)}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(lead.id)}
                    disabled={pendingId === lead.id}
                    className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:border-red-400/40 border border-transparent transition-colors disabled:opacity-50"
                    aria-label="Excluir lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-muted-foreground">
                  Nenhum lead ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
