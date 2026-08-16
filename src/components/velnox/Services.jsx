import React from 'react';
import { getContent } from '@/lib/content';
import ServicesBoard from '@/components/velnox/ServicesBoard';
import TypewriterHeading from '@/components/velnox/TypewriterHeading';

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function Services({ headingLevel = 'h2', locale }) {
  const { services, ui } = getContent(locale);

  return (
    <section id="servicos" className="relative py-16 md:py-24 scroll-mt-28 bg-velnox-section-a border-y border-border/60">
      {/* Container mais largo que o padrao do site (max-w-7xl): esta secao
          precisa acomodar a coluna de cards e o painel lado a lado sem que
          nenhum dos dois fique espremido. */}
      <div className="max-w-[108rem] mx-auto px-6">
        <div className="text-center mb-16">
          <TypewriterHeading
            as={headingLevel}
            prefix={services.headingPrefix}
            highlight={services.headingHighlight}
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            highlightClassName={
              headingLevel === 'h1'
                ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent'
                : 'text-neon-cyan'
            }
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">{services.subtitle}</p>
        </div>

        <ServicesBoard items={services.items} locale={locale} ui={ui} />
      </div>
    </section>
  );
}
