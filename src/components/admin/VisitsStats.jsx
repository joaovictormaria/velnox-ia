import React from 'react';

const COUNTRY_NAMES = new Intl.DisplayNames(['pt-BR'], { type: 'region' });

function countryLabel(code) {
  if (!code || code === 'XX') return 'Desconhecido';
  try {
    return COUNTRY_NAMES.of(code) ?? code;
  } catch {
    return code;
  }
}

export default function VisitsStats({ total, byCountry }) {
  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-4">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Acessos ao site</h2>
        <div className="text-2xl font-bold text-neon-cyan">{total}</div>
      </div>
      {byCountry.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum acesso registrado ainda.</p>
      ) : (
        <ul className="space-y-2">
          {byCountry.map((row) => {
            const pct = total > 0 ? (row.count / total) * 100 : 0;
            return (
              <li key={row.country} className="flex items-center gap-3 text-sm">
                <span className="w-32 shrink-0 text-muted-foreground truncate">{countryLabel(row.country)}</span>
                <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right font-mono text-foreground">{row.count}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
