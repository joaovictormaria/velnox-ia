'use client';

import React from 'react';
import { Zap, Moon, Target, Eye, Heart } from 'lucide-react';
import { useTypewriterSequence, Slot } from '@/components/velnox/typewriter';

const icons = { Zap, Moon, Target, Eye, Heart };

/**
 * @param {{
 *   intro: string,
 *   vel: { word: string, label: string, icon: string },
 *   nox: { word: string, label: string, icon: string },
 *   quote: string
 * }} props
 */
export default function BrandTypewriter({ intro, vel, nox, quote }) {
  const VelIcon = icons[vel.icon];
  const NoxIcon = icons[nox.icon];
  const quoted = `“${quote}”`;

  const { lengths, active, animating } = useTypewriterSequence([vel.word, nox.word, quoted]);
  const cursorAt = (i) => animating && active === i;

  return (
    <div className="text-center">
      <p className="text-sm text-neon-blue-ink-soft mb-5">{intro}</p>

      <div className="flex flex-row items-end justify-center gap-6 mb-5">
        <div className="text-center">
          <div className="flex items-center gap-1.5 text-sm font-medium text-neon-blue-ink-soft justify-center mb-1.5">
            <VelIcon className="w-4 h-4 text-neon-cyan-ink" /> {vel.label}
          </div>
          <div className="font-display text-4xl md:text-5xl font-bold text-neon-cyan-ink">
            <Slot full={vel.word} length={lengths[0]} showCursor={cursorAt(0)} cursorClassName="text-neon-cyan-ink" />
          </div>
        </div>

        <div className="font-display text-3xl text-neon-blue-ink-soft/70 pb-2">+</div>

        <div className="text-center">
          <div className="flex items-center gap-1.5 text-sm font-medium text-neon-blue-ink-soft justify-center mb-1.5">
            <NoxIcon className="w-4 h-4 text-neon-magenta-ink" /> {nox.label}
          </div>
          <div className="font-display text-4xl md:text-5xl font-bold text-neon-magenta-ink">
            <Slot full={nox.word} length={lengths[1]} showCursor={cursorAt(1)} cursorClassName="text-neon-cyan-ink" />
          </div>
        </div>
      </div>

      {/* whitespace-nowrap mantem a frase numa linha so. A maior das traducoes
          tem 28 caracteres (de), o que cabe na coluna ate no mobile com o
          tamanho base reduzido. */}
      <p className="font-display text-base md:text-xl lg:text-2xl font-bold text-neon-blue-ink">
        <Slot full={quoted} length={lengths[2]} showCursor={cursorAt(2)} cursorClassName="text-neon-cyan-ink" className="whitespace-nowrap" />
      </p>
    </div>
  );
}
