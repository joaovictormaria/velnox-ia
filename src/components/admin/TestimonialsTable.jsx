'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Star, Trash2, X } from 'lucide-react';

const FILTERS = [
  { value: 'pendente', label: 'Pendentes' },
  { value: 'aprovado', label: 'Aprovados' },
  { value: 'rejeitado', label: 'Rejeitados' },
  { value: 'all', label: 'Todos' },
];

function formatDate(value) {
  return new Date(value).toLocaleString('pt-BR');
}

export default function TestimonialsTable({ testimonials }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState(null);
  const [filter, setFilter] = useState('pendente');

  const counts = useMemo(() => {
    return testimonials.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    }, {});
  }, [testimonials]);

  const shown = useMemo(
    () => (filter === 'all' ? testimonials : testimonials.filter((t) => t.status === filter)),
    [testimonials, filter]
  );

  const patch = async (id, status) => {
    setPendingId(id);
    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const remove = async (id) => {
    if (!confirm('Excluir este depoimento?')) return;
    setPendingId(id);
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  return (
    <section className="rounded-xl border border-border bg-card/50 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">
          Depoimentos
          {counts.pendente ? (
            <span className="ml-2 rounded-full bg-neon-cyan/15 px-2 py-0.5 text-xs font-medium text-neon-cyan">
              {counts.pendente} pendente{counts.pendente > 1 ? 's' : ''}
            </span>
          ) : null}
        </h2>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                filter === option.value
                  ? 'border-neon-cyan/60 text-neon-cyan'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Nada aqui.</p>
      ) : (
        <ul className="space-y-3">
          {shown.map((item) => (
            <li key={item.id} className="rounded-lg border border-border bg-background/40 p-4">
              <div className="flex flex-wrap items-start gap-4">
                {item.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photo} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
                ) : (
                  <div className="h-12 w-12 shrink-0 rounded-full border border-dashed border-border" />
                )}

                <div className="min-w-[240px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{item.name}</span>
                    {item.role ? <span className="text-xs text-muted-foreground">— {item.role}</span> : null}
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-neon-cyan text-neon-cyan" />
                      ))}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item.created_at)}
                      {item.locale ? ` · ${item.locale}` : ''}
                    </span>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{item.quote}</p>
                </div>

                <div className="flex items-center gap-2">
                  {item.status !== 'aprovado' ? (
                    <button
                      type="button"
                      disabled={pendingId === item.id}
                      onClick={() => patch(item.id, 'aprovado')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-neon-cyan/40 px-3 py-2 text-xs font-medium text-neon-cyan transition-colors hover:bg-neon-cyan/10 disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" /> Aprovar
                    </button>
                  ) : (
                    <span className="rounded-full bg-neon-cyan/15 px-2.5 py-1 text-xs text-neon-cyan">no site</span>
                  )}

                  {item.status !== 'rejeitado' ? (
                    <button
                      type="button"
                      disabled={pendingId === item.id}
                      onClick={() => patch(item.id, 'rejeitado')}
                      aria-label="Rejeitar"
                      className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : null}

                  <button
                    type="button"
                    disabled={pendingId === item.id}
                    onClick={() => remove(item.id)}
                    aria-label="Excluir"
                    className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
