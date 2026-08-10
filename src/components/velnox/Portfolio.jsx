import React from 'react';
import Image from 'next/image';
import { Scale, Clock, Users, ShieldCheck, Sparkles, ExternalLink, Construction, UserCheck } from 'lucide-react';
import { getContent } from '@/lib/content';
import conjuraCover from '@/images/capa_conjura.jpeg';
import conformiaCover from '@/images/capa_conformia.png';
import conformiaAppCover from '@/images/capa_conformia_app.png';
import drkeeprCover from '@/images/capa_drkeepr.png';

const COVERS = {
  Conjura: conjuraCover,
  'Conform.ia': conformiaCover,
  'Conform.ia — Plataforma Web': conformiaAppCover,
  'Conform.ia — Web Platform': conformiaAppCover,
  'Conform.ia — Plateforme Web': conformiaAppCover,
  'Conform.ia — Web-Plattform': conformiaAppCover,
  'DrKeepr (PawKeepr)': drkeeprCover,
};

const BADGE_STYLES = {
  real: 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-background',
  dev: 'bg-amber-500 text-background',
  team: 'bg-violet-500 text-background',
};

const NOTE_ICONS = {
  real: Scale,
  dev: Construction,
  team: UserCheck,
};

function PortfolioCard({ item, ui }) {
  const cover = COVERS[item.name];
  const badgeType = item.badgeType ?? 'real';
  const badgeLabel = badgeType === 'dev' ? ui.portfolioInDevBadge : badgeType === 'team' ? ui.portfolioTeamBadge : ui.portfolioRealCaseLabel;
  const NoteIcon = NOTE_ICONS[badgeType];

  return (
    <div className="group relative flex flex-col shrink-0 w-60 sm:w-auto bg-card/70 backdrop-blur-xl border border-neon-cyan/25 shadow-[0_0_25px_rgba(0,255,255,0.06),0_0_50px_rgba(255,0,255,0.04)] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/50 hover:shadow-[0_0_35px_rgba(0,255,255,0.12),0_0_60px_rgba(255,0,255,0.08)]">
      {cover ? (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block relative w-full aspect-[16/9] bg-background overflow-hidden">
          <Image src={cover} alt={ui.portfolioScreenshotAltTemplate.replace('{name}', item.name)} fill sizes="(max-width: 640px) 240px, 25vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-80" />
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide shadow-lg ${BADGE_STYLES[badgeType]}`}>
            {badgeLabel}
          </span>
        </a>
      ) : (
        <span className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide shadow-lg ${BADGE_STYLES[badgeType]}`}>
          {badgeLabel}
        </span>
      )}
      <div className="flex flex-col flex-1 p-3 sm:p-3.5">
      <div className="mb-2">
        <h3 className="font-display text-xs sm:text-sm font-semibold truncate">
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-neon-cyan transition-colors">
              {item.name ?? item.segment}
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            item.name ?? item.segment
          )}
        </h3>
        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{item.segment}</p>
        {item.plan && (
          <span className="inline-block mt-1.5 font-mono text-[9px] text-neon-cyan uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">{item.plan}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex items-start gap-1">
          <ShieldCheck className="w-3 h-3 text-neon-cyan mt-0.5 shrink-0" />
          <span className="text-[10px] text-muted-foreground leading-snug">{item.focus}</span>
        </div>
        <div className="flex items-start gap-1">
          <Users className="w-3 h-3 text-neon-cyan mt-0.5 shrink-0" />
          <span className="text-[10px] text-muted-foreground leading-snug">{item.audience}</span>
        </div>
        {item.timeline && (
          <div className="flex items-start gap-1">
            <Clock className="w-3 h-3 text-neon-cyan mt-0.5 shrink-0" />
            <span className="text-[10px] text-muted-foreground leading-snug">{ui.portfolioDeliveredInPrefix}{item.timeline}</span>
          </div>
        )}
      </div>
      {item.note && (
        <div className="flex items-start gap-1 pt-2 mt-auto border-t border-border">
          <NoteIcon className="w-3 h-3 text-neon-magenta mt-0.5 shrink-0" />
          <span className="text-[10px] text-muted-foreground leading-snug">{item.note}</span>
        </div>
      )}
      </div>
    </div>
  );
}

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function Portfolio({ headingLevel = 'h2', locale }) {
  const { portfolio, ui } = getContent(locale);
  const Heading = headingLevel;
  const loopCases = [...portfolio.cases, ...portfolio.cases];

  return (
    <section id="portfolio" className="relative py-16 md:py-24 scroll-mt-20 border-y border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/[0.06] via-neon-magenta/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[450px] md:w-[600px] h-[300px] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-card/60 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium text-foreground">{ui.portfolioNotMockupBadge}</span>
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

        <div className="sm:hidden group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max gap-3 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {loopCases.map((item, index) => (
              <PortfolioCard key={index} item={item} ui={ui} />
            ))}
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-4 gap-4 items-stretch">
          {portfolio.cases.map((item) => (
            <PortfolioCard key={item.segment} item={item} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  );
}
