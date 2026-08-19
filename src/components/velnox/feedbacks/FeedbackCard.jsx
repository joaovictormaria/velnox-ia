'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronDown } from 'lucide-react';
import claraMachadoPhoto from '@/images/feedbacks/clara-machado.jpeg';
import pedroFeitosaPhoto from '@/images/feedbacks/pedro-feitosa.jpeg';
import camilaDeJesusPhoto from '@/images/feedbacks/camila-de-jesus.png';

const PHOTOS = {
  'Clara Machado': claraMachadoPhoto,
  'Pedro Feitosa': pedroFeitosaPhoto,
  'Camila de Jesus': camilaDeJesusPhoto,
};

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

/**
 * @param {{
 *   item: { name: string, role: string, quote: string, rating?: number, photo?: string },
 *   index: number,
 *   labels: { readMore: string, readLess: string }
 * }} props
 */
export default function FeedbackCard({ item, index, labels }) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const quoteRef = useRef(null);
  const quoteId = useId();
  const photo = PHOTOS[item.name];

  // Os depoimentos vao de ~230 a ~500 caracteres, e em cinco idiomas — nao da
  // para decidir por contagem de caracteres quem passa das 6 linhas. Aqui a
  // pergunta e feita ao layout: so ganha o botao quem de fato foi cortado, em
  // qualquer largura. Enquanto expandido nao ha o que medir (o clamp sai), por
  // isso o efeito nao roda nesse estado e o valor anterior vale.
  useEffect(() => {
    if (expanded) return undefined;
    const el = quoteRef.current;
    if (!el) return undefined;

    const measure = () => setOverflowing(el.scrollHeight > el.clientHeight + 1);
    measure();

    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-neon-cyan/40 hover:shadow-[0_0_30px_rgba(53,221,233,0.12),0_0_60px_rgba(249,21,195,0.07)]">
      {/* Brilho que acende na borda de cima no hover. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(120% 80% at 50% 0%, hsl(184 80% 56% / 0.12), transparent 60%)' }}
      />
      {/* Reflexo que atravessa o card. O atraso por indice evita os tres
          passarem juntos, que leria como um piscar da secao inteira. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-sheen-sweep motion-reduce:hidden"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(184 80% 56% / 0.10), hsl(314 94% 53% / 0.08), transparent)',
          animationDelay: `${index * 1.5}s`,
        }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 ring-1 ring-white/10 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
          <Quote className="h-4 w-4 text-neon-cyan" strokeWidth={2.5} />
        </div>

        {item.rating ? (
          <div className="flex gap-0.5" aria-label={`${item.rating}/5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                aria-hidden
                className={
                  i < item.rating
                    ? 'h-3.5 w-3.5 fill-neon-cyan text-neon-cyan drop-shadow-[0_0_6px_rgba(53,221,233,0.55)]'
                    : 'h-3.5 w-3.5 text-muted-foreground'
                }
              />
            ))}
          </div>
        ) : null}
      </div>

      <p
        id={quoteId}
        ref={quoteRef}
        className={`relative mt-5 flex-1 text-[15px] leading-relaxed text-muted-foreground ${expanded ? '' : 'line-clamp-6'}`}
      >
        &ldquo;{item.quote}&rdquo;
      </p>

      {overflowing || expanded ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={quoteId}
          className="relative mt-3 inline-flex items-center gap-1 self-start text-xs font-medium text-neon-cyan transition-colors hover:text-foreground"
        >
          {expanded ? labels.readLess : labels.readMore}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      ) : null}

      <div className="relative mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neon-cyan/30 bg-card">
          {/* Tres origens, nesta ordem: a foto enviada pelo proprio autor (data
              URL vinda do banco, fora do alcance do next/image), a foto fixa em
              src/images/feedbacks, e as iniciais quando nao ha nenhuma. */}
          {item.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
          ) : photo ? (
            <Image src={photo} alt={item.name} fill sizes="44px" className="object-cover" />
          ) : (
            <span className="text-xs font-semibold text-neon-cyan">{initials(item.name)}</span>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.role}</div>
        </div>
      </div>
    </article>
  );
}
