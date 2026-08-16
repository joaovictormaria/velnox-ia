import React from 'react';

/**
 * As tres ondas pontilhadas da marca. Sao apenas SVG + CSS, sem estado, entao
 * funcionam tanto em server component (Hero) quanto dentro de um client
 * component (o modal do portfolio).
 *
 * O `preserveAspectRatio="none"` faz o traco esticar para a largura do
 * container em vez de manter a proporcao do viewBox — e o que permite a mesma
 * arte servir uma faixa larga e baixa no Hero e a tela inteira no modal.
 *
 * @param {{ className?: string }} props className do container que define a
 *   area ocupada pelas ondas.
 */
export default function WaveLines({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-visible ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 300" preserveAspectRatio="none" fill="none">
        <path
          d="M0,150 C120,40 240,260 360,150 S600,40 720,150 S960,260 1080,150 S1320,40 1440,150 S1600,260 1600,150"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
          className="stroke-neon-cyan animate-worm-flow [stroke-dasharray:18_14]"
        />
        <path
          d="M0,90 C140,220 260,-30 400,90 S660,220 800,90 S1060,-30 1200,90 S1460,220 1600,90"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
          className="stroke-neon-magenta animate-worm-flow [stroke-dasharray:18_14]"
          style={{ animationDelay: '-1.3s' }}
        />
        <path
          d="M0,220 C160,110 300,330 440,220 S700,110 840,220 S1100,330 1240,220 S1500,110 1600,220"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
          className="stroke-neon-cyan animate-worm-flow [stroke-dasharray:18_14]"
          style={{ animationDelay: '-2.6s' }}
        />
      </svg>
    </div>
  );
}
