import React from 'react';

/** Lado do quadrado, em px. O passo da grade e este valor — os quadrados sao
 *  todos iguais e ficam lado a lado, sem sobrepor. */
const TILE = 140;
/** Fresta entre um quadrado e outro, so para que sejam lidos como pecas
 *  separadas em vez de uma superficie continua. */
const GAP = 2;

/** Colunas e linhas o bastante para cobrir telas largas e altas com folga —
 *  o que sobrar e cortado pelo overflow-hidden da secao. */
const COLS = 20;
const ROWS = 10;

/**
 * Tons translucidos: as placas modulam o gradiente da pagina em vez de
 * substitui-lo. O mais claro fica em 9% de branco — acima de 10% o subtitulo
 * (text-muted-foreground) cai abaixo dos 4.5:1 da WCAG sobre esta secao.
 */
const TONES = [
  'rgba(0, 0, 0, 0.28)',
  'rgba(255, 255, 255, 0.03)',
  'rgba(43, 233, 235, 0.06)',
  'rgba(255, 255, 255, 0.09)',
];

/**
 * Tom por posicao, deterministico de proposito: `Math.random` faria o servidor
 * e o cliente sortearem valores diferentes e quebraria a hidratacao.
 *
 * O periodo em `c` e o numero de tons (4). Isso importa: a fileira desliza
 * exatamente 4 quadrados por ciclo, entao ao reiniciar cada posicao reencontra
 * um quadrado do mesmo tom e a emenda fica invisivel.
 */
const toneAt = (row, col) => TONES[(row * 2 + col) % TONES.length];

const SHIFT = TONES.length * TILE;

/**
 * Grade de quadrados iguais deslizando para a esquerda em loop permanente.
 * Cada fileira anda numa velocidade um pouco diferente, o que da a sensacao de
 * uns empurrarem os outros em vez de tudo escorregar como um bloco unico.
 *
 * CSS puro — sem estado, sem client component.
 */
export default function MosaicBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: ROWS }, (_, row) => (
        <div
          key={row}
          className="absolute flex animate-tile-slide motion-reduce:animate-none will-change-transform"
          style={{
            top: row * TILE,
            left: 0,
            width: COLS * TILE,
            height: TILE - GAP,
            '--shift': `-${SHIFT}px`,
            animationDuration: `${18 + (row % 5) * 4}s`,
          }}
        >
          {Array.from({ length: COLS }, (_, col) => (
            <div
              key={col}
              style={{
                width: TILE - GAP,
                height: TILE - GAP,
                marginRight: GAP,
                background: toneAt(row, col),
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
