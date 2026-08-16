import React from 'react';
import { Sparkles } from 'lucide-react';
import { getContent } from '@/lib/content';
import MosaicBackdrop from '@/components/velnox/MosaicBackdrop';
import PortfolioGrid from '@/components/velnox/PortfolioGrid';

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function Portfolio({ headingLevel = 'h2', locale }) {
  const { portfolio, ui } = getContent(locale);
  const Heading = headingLevel;

  return (
    // Sem `bg-velnox-section-b`: o veu branco daquele token lavava as placas do
    // mosaico. Aqui quem faz o fundo e o proprio mosaico, sobre o gradiente da
    // pagina.
    // `bg-background` e obrigatorio aqui, nao decorativo: esta secao passa por
    // cima da secao Sobre no efeito de parallax, e sem fundo opaco a secao
    // branca de tras apareceria atraves das placas translucidas do mosaico.
    <section id="portfolio" className="relative py-32 md:py-44 scroll-mt-28 border-y border-border overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/[0.06] via-neon-magenta/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[450px] md:w-[600px] h-[300px] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      {/* Depois dos dois overlays de proposito: como estes sao decorativos e
          pintam na ordem do DOM, o mosaico ficava abafado por baixo deles —
          principalmente pelo brilho de blur-[120px] no topo. Como as placas sao
          translucidas, por cima elas ainda deixam o brilho aparecer. */}
      <MosaicBackdrop />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-card/60 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium text-foreground">{ui.portfolioNotMockupBadge}</span>
          </div>
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-3">
            {portfolio.headingPrefix} {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{portfolio.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan">{portfolio.headingHighlight}</span>
            )}
          </Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{portfolio.subtitle}</p>
        </div>

        <PortfolioGrid cases={portfolio.cases} ui={ui} />
      </div>
    </section>
  );
}
