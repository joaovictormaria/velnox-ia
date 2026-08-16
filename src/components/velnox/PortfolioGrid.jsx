'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Scale, Clock, Users, ShieldCheck, ExternalLink, Construction, UserCheck, X } from 'lucide-react';
import conjuraCover from '@/images/capa_conjura.jpeg';
import conformiaCover from '@/images/capa_conformia.png';
import conformiaAppCover from '@/images/capa_conformia_app.png';
import drkeeprCover from '@/images/capa_drkeepr.png';
import claraMachadoCover from '@/images/capa_clara_machado.jpeg';
import velnoxTextLogo from '@/images/texto-velnox.png';
import WaveLines from '@/components/velnox/WaveLines';

const COVERS = {
  'Clara Machado Advocacia': claraMachadoCover,
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

const NOTE_ICONS = { real: Scale, dev: Construction, team: UserCheck };

/** Tem que bater com a duracao de `modal-slide-out` no tailwind.config.js. */
const CLOSE_MS = 450;

function Card({ item, ui, onOpen }) {
  const cover = COVERS[item.name];
  const badgeType = item.badgeType ?? 'real';
  const badgeLabel =
    badgeType === 'dev' ? ui.portfolioInDevBadge : badgeType === 'team' ? ui.portfolioTeamBadge : ui.portfolioRealCaseLabel;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative shrink-0 w-60 sm:w-auto aspect-[3/4] rounded-2xl overflow-hidden text-left border border-neon-cyan/25 bg-card shadow-[0_0_25px_rgba(0,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/60 hover:shadow-[0_0_35px_rgba(0,255,255,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
    >
      {cover && (
        <Image
          src={cover}
          alt={ui.portfolioScreenshotAltTemplate.replace('{name}', item.name)}
          fill
          sizes="700px"
          quality={85}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Veu que escurece o pe da foto para o texto sobreposto ter contraste.
          Sem ele, o titulo cai sobre a parte clara das capas. */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent" />

      <span
        className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide shadow-lg ${BADGE_STYLES[badgeType]}`}
      >
        {badgeLabel}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <h3 className="font-display text-sm font-semibold leading-tight">{item.name ?? item.segment}</h3>
        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{item.segment}</p>
        {item.timeline && (
          <span className="inline-flex items-center gap-1 mt-2 text-[10px] text-neon-cyan">
            <Clock className="w-3 h-3" /> {ui.portfolioDeliveredInPrefix}{item.timeline}
          </span>
        )}
      </div>
    </button>
  );
}

function Modal({ item, ui, onClose }) {
  const NoteIcon = NOTE_ICONS[item.badgeType ?? 'real'];
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  /**
   * Fechar nao pode desmontar na hora: o React removeria o no antes de a
   * animacao de saida rodar. Marca o estado, deixa o CSS tocar e so entao
   * avisa o pai.
   */
  const requestClose = useCallback(() => {
    setClosing((already) => {
      if (already) return already;
      closeTimer.current = window.setTimeout(onClose, CLOSE_MS);
      return true;
    });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') requestClose(); };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
      clearTimeout(closeTimer.current);
    };
  }, [requestClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/85 backdrop-blur-sm motion-reduce:animate-none ${closing ? 'animate-modal-veil-out' : 'animate-modal-fade'}`}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      {/* As mesmas ondas do Hero, so enquanto o modal existe. Vir antes no DOM
          nao basta: elemento posicionado (as ondas sao `absolute`) pinta depois
          de elemento estatico, entao o painel precisa de `relative z-10` para
          ficar por cima. */}
      <WaveLines className="absolute top-1/2 left-0 z-0 w-full h-64 md:h-80 -translate-y-1/2" />

      <div className={`relative z-10 w-full max-w-lg motion-reduce:animate-none ${closing ? 'animate-modal-slide-out' : 'animate-modal-rise'}`}>
        {/* Marca ancorada ACIMA do painel com `bottom-full`, e nao empilhada por
            gap: assim afastar a logo nao empurra o painel para baixo, ja que o
            overlay centraliza o grupo. Fica fora do bloco com stopPropagation,
            entao clicar nela conta como clique fora e fecha o modal. */}
        <Image
          src={velnoxTextLogo}
          alt=""
          aria-hidden="true"
          sizes="290px"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-10 md:mb-14 h-8 md:h-10 w-auto animate-flicker-logo motion-reduce:animate-none"
        />

        {/* stopPropagation para o clique dentro do painel nao fechar o modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[82vh] w-full overflow-hidden rounded-2xl border border-neon-cyan/30 bg-card shadow-[0_0_60px_rgba(0,255,255,0.10)]"
        >
        <div className="relative w-full overflow-y-auto">
          <button
            type="button"
            onClick={requestClose}
            aria-label={ui.portfolioCloseLabel}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full border border-border bg-background/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-neon-cyan/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {COVERS[item.name] && (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={COVERS[item.name]}
                alt={ui.portfolioScreenshotAltTemplate.replace('{name}', item.name)}
                fill
                sizes="520px"
                quality={85}
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
          )}

          <div className="p-5">
            <h3 id="portfolio-modal-title" className="font-display text-xl font-bold">{item.name ?? item.segment}</h3>
            <p className="text-xs text-muted-foreground mt-1">{item.segment}</p>
            {item.plan && (
              <span className="inline-block mt-3 font-mono text-[10px] text-neon-cyan uppercase tracking-wide px-2 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
                {item.plan}
              </span>
            )}

            <div className="flex flex-col gap-2.5 mt-4">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                <span className="text-xs text-muted-foreground leading-relaxed">{item.focus}</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                <span className="text-xs text-muted-foreground leading-relaxed">{item.audience}</span>
              </div>
              {item.timeline && (
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {ui.portfolioDeliveredInPrefix}{item.timeline}
                  </span>
                </div>
              )}
            </div>

            {item.note && (
              <div className="flex items-start gap-2 mt-4 pt-4 border-t border-border">
                <NoteIcon className="w-4 h-4 text-neon-magenta mt-0.5 shrink-0" />
                <span className="text-xs text-muted-foreground leading-relaxed">{item.note}</span>
              </div>
            )}

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition-all"
              >
                {ui.portfolioOpenProjectCta}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

/** @param {{ cases: any[], ui: any }} props */
export default function PortfolioGrid({ cases, ui }) {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const loopCases = [...cases, ...cases];

  return (
    <>
      <div className="sm:hidden group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max gap-3 animate-marquee group-hover/marquee:[animation-play-state:paused]">
          {loopCases.map((item, index) => (
            <Card key={index} item={item} ui={ui} onOpen={setActive} />
          ))}
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
        {cases.map((item) => (
          <Card key={item.segment} item={item} ui={ui} onOpen={setActive} />
        ))}
      </div>

      {/* Portal para o <body> em vez de renderizar aqui dentro.
          Esta secao vive dentro de um wrapper `relative z-10` (o do parallax),
          e isso cria um contexto de empilhamento: o `z-[100]` do modal passaria
          a valer apenas dentro dele, ficando abaixo do header, que e z-50 no
          contexto raiz. No body, o modal volta a competir de igual para igual.
          A checagem de `document` cobre o SSR, onde ele nao existe. */}
      {active && typeof document !== 'undefined'
        && createPortal(<Modal item={active} ui={ui} onClose={close} />, document.body)}
    </>
  );
}
