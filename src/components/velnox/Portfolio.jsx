import React from 'react';
import Image from 'next/image';
import { Scale, Clock, Users, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import data from '@/data/static-data.json';
import conjuraCover from '@/images/capa_conjura.jpeg';

const { portfolio } = data;

const COVERS = {
  Conjura: conjuraCover,
};

/** @param {{ headingLevel?: 'h1' | 'h2' }} props */
export default function Portfolio({ headingLevel = 'h2' }) {
  const Heading = headingLevel;

  return (
    <section id="portfolio" className="relative py-24 scroll-mt-20 border-y border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/[0.06] via-neon-magenta/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-card/60 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium text-foreground">Projeto real, não mockup</span>
          </div>
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">
            {portfolio.headingPrefix} {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{portfolio.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan">{portfolio.headingHighlight}</span>
            )}
          </Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{portfolio.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {portfolio.cases.map((item) => {
            const cover = COVERS[item.name];
            return (
            <div key={item.segment} className="relative bg-card/70 backdrop-blur-xl border border-neon-cyan/25 shadow-[0_0_25px_rgba(0,255,255,0.06),0_0_50px_rgba(255,0,255,0.04)] rounded-2xl">
              <div className="absolute -top-3 left-5 z-10 px-2.5 py-1 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta text-background text-xs font-semibold tracking-wide">
                Case Real
              </div>
              {cover && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block relative w-full aspect-[16/9] bg-background rounded-t-2xl overflow-hidden">
                  <Image src={cover} alt={`Captura de tela do site ${item.name}`} fill sizes="(max-width: 448px) 100vw, 448px" className="object-cover object-top" />
                </a>
              )}
              <div className="p-4">
              <div className="flex items-center justify-between gap-2 mb-3 mt-1">
                <div>
                  <h3 className="font-display text-base font-semibold">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-neon-cyan transition-colors">
                        {item.name ?? item.segment}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      item.name ?? item.segment
                    )}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.segment}</p>
                </div>
                <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-wide shrink-0">{item.plan}</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5 mb-3">
                <div className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{item.focus}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Users className="w-3.5 h-3.5 text-neon-cyan mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{item.audience}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neon-cyan mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">Entregue em {item.timeline}</span>
                </div>
              </div>
              <div className="flex items-start gap-1.5 pt-3 border-t border-border">
                <Scale className="w-3.5 h-3.5 text-neon-magenta mt-0.5 shrink-0" />
                <span className="text-xs text-muted-foreground">{item.legalContext}</span>
              </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
