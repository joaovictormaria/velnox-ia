import React from 'react';
import FeedbackCard from './feedbacks/FeedbackCard';
import FeedbackConstellation from './feedbacks/FeedbackConstellation';
import FeedbackForm from './feedbacks/FeedbackForm';
import { getContent } from '@/lib/content';
import { getApprovedTestimonials } from '@/lib/db';

/**
 * Depoimentos aprovados no /admin. O try/catch nao e zelo excessivo: este
 * componente e renderizado no `next build`, e ali o DATABASE_URL pode nao
 * existir ainda. Sem banco a secao cai nos depoimentos fixos do JSON em vez de
 * derrubar a home inteira.
 */
async function loadApproved() {
  try {
    return await getApprovedTestimonials();
  } catch {
    return [];
  }
}

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default async function Feedbacks({ headingLevel = 'h2', locale }) {
  const { feedbacks } = getContent(locale);
  const Heading = headingLevel;
  const approved = await loadApproved();
  const items = [...feedbacks.items, ...approved];

  return (
    // `isolate` para o canvas e os halos ficarem atras do conteudo mas na
    // frente do fundo da secao: sem contexto de empilhamento proprio, um filho
    // em z negativo cairia atras do proprio `bg-velnox-section-a`.
    <section
      id="feedbacks"
      className="relative isolate overflow-hidden py-16 md:py-24 scroll-mt-28 bg-velnox-section-a border-y border-border/60"
    >
      {/* Halos nas duas cores da marca. O deslocamento fica no wrapper e a
          animacao no filho: `orb-drift` escreve em `transform`, e um utilitario
          de translate no mesmo elemento seria sobrescrito no primeiro quadro. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3">
          <div
            className="h-full w-full rounded-full blur-[120px] animate-orb-drift motion-reduce:animate-none"
            style={{ background: 'radial-gradient(circle, hsl(184 80% 56% / 0.18), transparent 70%)' }}
          />
        </div>
        <div className="absolute bottom-0 right-0 h-[460px] w-[460px] translate-x-1/4 translate-y-1/4">
          <div
            className="h-full w-full rounded-full blur-[120px] animate-orb-drift [animation-delay:-7s] motion-reduce:animate-none"
            style={{ background: 'radial-gradient(circle, hsl(314 94% 53% / 0.16), transparent 70%)' }}
          />
        </div>
      </div>

      <FeedbackConstellation />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-card/60 backdrop-blur-sm text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(53,221,233,0.9)]" />
            {feedbacks.badge}
          </span>

          <Heading className="font-display text-4xl md:text-5xl font-bold mt-6 mb-4">
            {feedbacks.headingPrefix}{' '}
            {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{feedbacks.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan">{feedbacks.headingHighlight}</span>
            )}
          </Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{feedbacks.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <FeedbackCard
              key={item.id ?? item.name}
              item={item}
              index={index}
              labels={{ readMore: feedbacks.readMore, readLess: feedbacks.readLess }}
            />
          ))}
        </div>

        <FeedbackForm labels={feedbacks.form} locale={locale} />
      </div>
    </section>
  );
}
