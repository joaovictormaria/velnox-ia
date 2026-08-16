'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import velnoxLogo from '@/images/velox.png';
import WaveLines from '@/components/velnox/WaveLines';

/**
 * Ladrilhamento irregular que cobre 100x100.
 * [left, top, width, height, indiceDeCor] — tudo em % da tela.
 */
const MOSAIC_DEF = [
  [0, 0, 30, 18, 0], [0, 18, 30, 20, 1], [30, 0, 20, 38, 2], [50, 0, 22, 38, 0],
  [72, 0, 14, 38, 1], [86, 0, 14, 38, 3], [0, 38, 30, 20, 2], [30, 38, 8, 20, 0],
  [38, 38, 12, 20, 1], [50, 38, 22, 10, 3], [50, 48, 22, 10, 0], [72, 38, 28, 20, 2],
  [0, 58, 30, 20, 1], [0, 78, 30, 22, 0], [30, 58, 20, 22, 3], [30, 80, 20, 20, 2],
  [50, 58, 10, 42, 1], [60, 58, 12, 42, 0], [72, 58, 28, 42, 3],
];

/** Azuis quase pretos, na familia do fundo do site. */
const BLOCK_COLORS = ['#071112', '#0a1622', '#0d1a28', '#101c34'];

const BLOCKS = MOSAIC_DEF.map(([l, t, w, h, ci]) => {
  const cx = l + w / 2;
  const cy = t + h / 2;
  const dx = cx - 50;
  const dy = cy - 50;
  const dist = Math.hypot(dx, dy) || 1;
  return {
    l, t, w, h,
    color: BLOCK_COLORS[ci],
    // Vetor de fuga radial: cada peca sai na direcao em que ja estava em
    // relacao ao centro, e as mais distantes partem depois.
    exitX: (dx / dist) * 165,
    exitY: (dy / dist) * 165,
    delay: Math.round((dist / 70) * 280),
  };
});

const DURATION_MS = 6000;    // tempo de tela antes da saida comecar
const BLOCKS_OUT_MS = 1400;  // explosao das pecas ate o desmonte

/**
 * Tela de abertura: mosaico de pecas, ondas da marca e a logo entrando pela
 * esquerda, pulsando e sumindo num estouro quando as pecas se abrem.
 *
 * @param {{ onDone?: () => void }} props
 */
export default function IntroScreen({ onDone }) {
  // 0 = so mosaico | 1 = logo entrando | 2 = logo pulsando | 3 = saida
  const [phase, setPhase] = useState(0);
  const [gone, setGone] = useState(false);
  const timers = useRef([]);

  const exit = useCallback(() => {
    setPhase((current) => {
      if (current === 3) return current;
      timers.current.push(window.setTimeout(() => setGone(true), BLOCKS_OUT_MS));
      onDone?.();
      return 3;
    });
  }, [onDone]);

  useEffect(() => {
    const t = timers.current;
    t.push(window.setTimeout(() => setPhase(1), 300));
    t.push(window.setTimeout(() => setPhase(2), 1000));
    t.push(window.setTimeout(exit, DURATION_MS));

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      t.forEach(clearTimeout);
      document.body.style.overflow = previous;
    };
  }, [exit]);

  useEffect(() => {
    if (gone) document.body.style.overflow = '';
  }, [gone]);

  if (gone) return null;

  const exiting = phase === 3;

  return (
    <div
      onClick={exit}
      aria-hidden="true"
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{ background: exiting ? 'transparent' : '#071112', cursor: exiting ? 'default' : 'pointer', pointerEvents: exiting ? 'none' : 'auto' }}
    >
      {BLOCKS.map((b, i) => (
        <div
          key={i}
          className="absolute will-change-transform"
          style={{
            left: `${b.l}%`,
            top: `${b.t}%`,
            // +1px cobre o arredondamento entre pecas vizinhas, que senao deixa
            // fios do fundo aparecendo nas juntas.
            width: `calc(${b.w}% + 1px)`,
            height: `calc(${b.h}% + 1px)`,
            background: b.color,
            transform: exiting ? `translate(${b.exitX}vw, ${b.exitY}vh) scale(1.04)` : 'translate(0, 0)',
            transition: exiting ? `transform 0.85s cubic-bezier(0.55, 0, 1, 0.45) ${b.delay}ms` : 'none',
          }}
        />
      ))}

      <WaveLines
        className={`absolute top-1/2 left-0 w-full h-72 md:h-96 -translate-y-1/2 motion-reduce:animate-none ${
          exiting ? 'animate-intro-waves-burst' : ''
        }`}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        {phase >= 1 && (
          // A animacao vai no wrapper, nao na <Image>: o `fill` exige um pai
          // posicionado, e assim o drop-shadow do pulso segue o recorte alpha do
          // PNG em vez de um retangulo.
          // aspect + object-cover replicam o enquadramento do Hero, que corta a
          // sobra transparente do arquivo quadrado.
          <div
            className={`relative aspect-[3000/1782] w-[min(84vw,640px)] motion-reduce:animate-none ${
              exiting ? 'animate-intro-logo-burst' : phase === 2 ? 'animate-intro-logo-pulse' : 'animate-intro-logo-in'
            }`}
          >
            <Image
              src={velnoxLogo}
              alt=""
              fill
              sizes="(max-width: 768px) 84vw, 640px"
              priority
              className="object-cover"
              style={{ objectPosition: '50% 50%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
