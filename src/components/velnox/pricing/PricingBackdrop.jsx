import React from 'react';

const CYAN = 'rgba(53, 221, 233';
const MAGENTA = 'rgba(248, 22, 195';

/** [cor, tamanho px, left %, top %, duracao s, atraso s] */
const ORBS = [
  [CYAN, 520, 8, 12, 18, 0],
  [MAGENTA, 460, 62, 8, 22, 2],
  [CYAN, 380, 72, 58, 26, 1],
  [MAGENTA, 340, 12, 62, 20, 3],
];

/**
 * Posicoes deterministicas de proposito: `Math.random` faria servidor e cliente
 * sortearem valores diferentes e quebraria a hidratacao.
 */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 53) % 100,
  y: (i * 37) % 100,
  size: 1.5 + (i % 3),
  duration: 8 + (i % 5) * 2,
  delay: (i % 6) * 0.8,
}));

/**
 * Fundo animado da secao de planos: orbes derivando, grade em panoramica,
 * particulas subindo e um brilho varrendo o topo.
 *
 * Tudo em CSS — sem estado e sem client component.
 */
export default function PricingBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(222_44%_8%)_0%,hsl(222_52%_4%)_80%)]" />

      {ORBS.map(([color, size, left, top, duration, delay], i) => (
        <div
          key={i}
          className="absolute rounded-full blur-2xl animate-orb-drift motion-reduce:animate-none"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color}, 0.13), ${color}, 0.03) 40%, transparent 70%)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.09] animate-grid-pan motion-reduce:animate-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-neon-cyan shadow-[0_0_8px_theme(colors.neon.cyan)] animate-particle-rise motion-reduce:animate-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div
        className="absolute top-0 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent animate-sheen-sweep motion-reduce:animate-none"
        style={{ animationDelay: '4s' }}
      />

      {/* Vinheta que escurece as bordas e devolve o foco ao centro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(222_52%_4%)_95%)]" />
    </div>
  );
}
