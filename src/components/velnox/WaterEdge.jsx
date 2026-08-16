import React from 'react';

/** 8 ondas de 360 unidades, amplitude no padrao [1, 0.6, 1.25, 0.75].
 *  1440 (o deslocamento por ciclo) e multiplo do periodo E do tamanho do padrao. */
const RIPPLE = 'M0,44 C72,14 234,74 360,44 C432,26 594,62 720,44 C792,7 954,82 1080,44 C1152,22 1314,67 1440,44 C1512,14 1674,74 1800,44 C1872,26 2034,62 2160,44 C2232,7 2394,82 2520,44 C2592,22 2754,67 2880,44 L2880,120 L0,120 Z';

/** 6 ondas de 480 unidades, amplitude no padrao [1, 1.35, 0.7].
 *  1440 (o deslocamento por ciclo) e multiplo do periodo E do tamanho do padrao. */
const SWELL = 'M0,56 C96,22 312,90 480,56 C576,10 792,102 960,56 C1056,32 1272,80 1440,56 C1536,22 1752,90 1920,56 C2016,10 2232,102 2400,56 C2496,32 2712,80 2880,56 L2880,120 L0,120 Z';

/** 4 ondas de 720 unidades, amplitude no padrao [1, 0.75].
 *  1440 (o deslocamento por ciclo) e multiplo do periodo E do tamanho do padrao. */
const CREST = 'M0,68 C144,30 468,106 720,68 C864,40 1188,97 1440,68 C1584,30 1908,106 2160,68 C2304,40 2628,97 2880,68 L2880,120 L0,120 Z';

/**
 * Borda superior ondulada, no lugar do corte reto entre uma secao e outra.
 *
 * Fica acima do topo da secao (via `-top-*`) e avanca sobre a secao anterior,
 * pintada na cor da propria secao — e o que da a leitura de agua subindo.
 *
 * A altura do viewBox (120) tem que ficar proxima da altura da faixa em px.
 * Com  o SVG e esmagado para caber, e a amplitude
 * encolhe na mesma proporcao: um viewBox de 160 numa faixa de 64px deixava a
 * onda com ~14px de crista, ou seja, praticamente reta.
 *
 * Tres camadas com periodos, amplitudes e velocidades diferentes. Duas coisas
 * tiram o ar de senoide e dao o aspecto de mar agitado: a amplitude varia de
 * onda para onda num padrao curto, e os pontos de controle sao assimetricos
 * (0.20 e 0.65 do periodo), o que inclina cada vaga.
 *
 * Cada SVG tem o dobro da largura do container e desliza metade dela por ciclo.
 * O deslocamento (1440) e multiplo do periodo E do tamanho do padrao de
 * amplitude nas tres camadas — sem isso a emenda do loop apareceria.
 *
 * @param {{ className?: string, fillClassName?: string }} props
 */
export default function WaterEdge({ className = '', fillClassName = 'fill-white' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className}`}
    >
      <svg
        className={`absolute inset-0 h-full w-[200%] opacity-25 animate-water-drift motion-reduce:animate-none ${fillClassName}`}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        style={{ animationDuration: '14s' }}
      >
        <path d={RIPPLE} />
      </svg>
      <svg
        className={`absolute inset-0 h-full w-[200%] opacity-50 animate-water-drift motion-reduce:animate-none ${fillClassName}`}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        style={{ animationDuration: '10s' }}
      >
        <path d={SWELL} />
      </svg>
      <svg
        className={`absolute inset-0 h-full w-[200%]  animate-water-drift motion-reduce:animate-none ${fillClassName}`}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        style={{ animationDuration: '7s' }}
      >
        <path d={CREST} />
      </svg>
    </div>
  );
}
