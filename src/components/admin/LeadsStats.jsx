import React from 'react';

export const STATUS_OPTIONS = [
  { value: 'novo', label: 'Novo' },
  { value: 'em_contato', label: 'Em contato' },
  { value: 'convertido', label: 'Convertido' },
  { value: 'perdido', label: 'Perdido' },
];

export default function LeadsStats({ leads }) {
  const total = leads.length;
  const counts = Object.fromEntries(STATUS_OPTIONS.map((opt) => [opt.value, 0]));
  for (const lead of leads) {
    if (counts[lead.status] !== undefined) counts[lead.status] += 1;
  }
  const conversionRate = total > 0 ? ((counts.convertido / total) * 100).toFixed(1) : '0.0';

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
      <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-4">
        <div className="text-xs text-muted-foreground mb-1">Total de leads</div>
        <div className="text-2xl font-bold text-foreground">{total}</div>
      </div>
      {STATUS_OPTIONS.map((opt) => (
        <div key={opt.value} className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-4">
          <div className="text-xs text-muted-foreground mb-1">{opt.label}</div>
          <div className="text-2xl font-bold text-foreground">{counts[opt.value]}</div>
        </div>
      ))}
      <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-4">
        <div className="text-xs text-muted-foreground mb-1">Taxa de conversão</div>
        <div className="text-2xl font-bold text-neon-cyan">{conversionRate}%</div>
      </div>
    </div>
  );
}
