'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Code, Rocket, Layout, Search, Server, Cpu, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { withLocale } from '@/lib/content';

const icons = { Code, Rocket, Layout, Search, Server, Cpu };

function Card({ service, active, onSelect, innerRef }) {
  const Icon = icons[service.icon];
  return (
    <button
      type="button"
      ref={innerRef}
      onClick={onSelect}
      aria-expanded={active}
      className={`group flex items-center gap-4 w-full text-left backdrop-blur-xl border p-4 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan ${
        active
          ? 'bg-card border-neon-cyan/60 translate-x-1.5 shadow-[0_0_25px_rgba(0,255,255,0.14)]'
          : 'bg-card/50 border-border hover:translate-x-1.5 hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,255,255,0.08)]'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
          active ? 'scale-110' : 'group-hover:scale-110'
        }`}
      >
        <Icon className="w-5 h-5 text-neon-cyan" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-semibold leading-tight">{service.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 leading-snug line-clamp-2">{service.description}</p>
      </div>
      <ArrowRight
        className={`w-4 h-4 text-neon-cyan shrink-0 transition-transform duration-300 ${
          active ? 'translate-x-1' : 'group-hover:translate-x-1'
        }`}
      />
    </button>
  );
}

function List({ heading, items }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-neon-cyan mb-2">{heading}</h4>
      <ul className="flex flex-col gap-1.5">
        {items.map((entry, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-neon-cyan mt-0.5 shrink-0" />
            <span className="text-xs text-muted-foreground leading-relaxed">{entry}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** @param {{ items: any[], locale: string, ui: any }} props */
export default function ServicesBoard({ items, locale, ui }) {
  // Ja abre no primeiro servico (Desenvolvimento Web). Alem de mostrar o
  // formato da secao de cara, poe o texto completo desse servico no HTML do
  // servidor, o que conta para SEO.
  const [active, setActive] = useState(0);
  const [path, setPath] = useState('');
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const panelRef = useRef(null);

  /**
   * Mede as posicoes reais e desenha a curva do card ate o painel.
   *
   * Roda dentro de requestAnimationFrame por dois motivos: da tempo de o painel
   * existir no DOM antes de medir, e tira o `setState` do corpo do efeito, que o
   * eslint do projeto barra.
   */
  useEffect(() => {
    if (active === null) return undefined;

    let raf = 0;
    const measure = () => {
      const box = containerRef.current?.getBoundingClientRect();
      const card = cardRefs.current[active]?.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (!box || !card || !panel) return;

      const x1 = card.right - box.left;
      const y1 = card.top + card.height / 2 - box.top;
      const x2 = panel.left - box.left;
      // Ancora no alto do painel, nao no centro: painel alto faria a linha
      // descer demais e cruzar os cards de baixo.
      const y2 = panel.top + Math.min(panel.height / 2, 72) - box.top;
      const mid = (x1 + x2) / 2;

      setPath(`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
    };

    raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [active]);

  const current = active === null ? null : items[active];

  return (
    <div ref={containerRef} className="relative lg:flex lg:items-start lg:gap-10">
      {current && path && (
        <svg
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          {/* Trilho apagado por baixo, para a corrente ter por onde correr
              mesmo no intervalo entre um traco e outro. */}
          <path d={path} fill="none" strokeWidth="2" className="stroke-neon-cyan/20" />
          <path
            d={path}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            className="stroke-neon-cyan animate-energy-flow [stroke-dasharray:6_14] motion-reduce:animate-none"
            style={{ filter: 'drop-shadow(0 0 6px rgba(53, 221, 233, 0.9))' }}
          />
        </svg>
      )}

      {/* Com o container mais largo, a coluna de cards encolhe em proporcao: os
          cards ja sao compactos e nao ganham nada em esticar. O espaco vai para
          o painel, que e quem precisa de largura. */}
      <div className="relative z-10 flex flex-col gap-3 w-full lg:w-[38%] xl:w-[34%] shrink-0">
        {items.map((service, i) => (
          <Card
            key={service.title}
            service={service}
            active={active === i}
            onSelect={() => setActive((prev) => (prev === i ? null : i))}
            innerRef={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
      </div>

      {current && (
        <div
          ref={panelRef}
          className="relative z-10 mt-6 lg:mt-0 lg:flex-1 bg-card/70 backdrop-blur-xl border border-neon-cyan/30 rounded-2xl p-5 shadow-[0_0_30px_rgba(0,255,255,0.08)] animate-modal-rise motion-reduce:animate-none"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label={ui.portfolioCloseLabel}
            className="absolute top-3 right-3 w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-neon-cyan/50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <h3 className="font-display text-xl font-bold pr-8">{current.title}</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {current.details?.explanation ?? current.description}
          </p>

          {/* As quatro listas em duas colunas. Empilhadas, o painel ficava tres
              vezes mais alto que largo; em grade, a altura cai pela metade. */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-5">
            <List heading={ui.benefitsHeading} items={current.details?.benefits} />
            <List heading={ui.howItWorksHeading} items={current.details?.process} />
            <List heading={ui.differentiatorsHeading} items={current.details?.differentiators} />
            <List heading={ui.useCasesHeading} items={current.details?.useCases} />
          </div>

          <Link
            href={withLocale(locale, `/servicos/${current.slug}`)}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition-all"
          >
            {ui.readMoreLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
