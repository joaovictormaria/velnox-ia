'use client';

import React from 'react';
import { useTypewriterSequence, Slot } from '@/components/velnox/typewriter';

/**
 * Titulo de secao datilografado: escreve o prefixo, depois o destaque, segura,
 * apaga e recomeca.
 *
 * O bloco visivel e `aria-hidden` e o texto completo vai num `sr-only` ao lado.
 * Sem isso, um leitor de tela anunciaria o titulo pela metade — o que quer que
 * a animacao tivesse escrito no instante da leitura.
 *
 * @param {{
 *   as?: 'h1' | 'h2',
 *   prefix: string,
 *   highlight: string,
 *   className?: string,
 *   highlightClassName?: string,
 *   cursorClassName?: string
 * }} props
 */
export default function TypewriterHeading({
  as = 'h2',
  prefix,
  highlight,
  className = '',
  highlightClassName = '',
  cursorClassName = 'text-neon-cyan',
}) {
  const { lengths, active, animating } = useTypewriterSequence([prefix, highlight]);
  const Tag = as;
  const cursorAt = (i) => animating && active === i;

  return (
    <Tag className={className}>
      <span className="sr-only">{prefix} {highlight}</span>
      <span aria-hidden="true">
        <Slot full={prefix} length={lengths[0]} showCursor={cursorAt(0)} cursorClassName={cursorClassName} />{' '}
        {/* A classe de destaque vai por `textClassName`, direto no elemento do
            texto. Envolvendo o Slot num pai, um gradiente com `bg-clip-text`
            nao teria texto proprio para recortar. */}
        <Slot
          full={highlight}
          length={lengths[1]}
          showCursor={cursorAt(1)}
          cursorClassName={cursorClassName}
          textClassName={highlightClassName}
        />
      </span>
    </Tag>
  );
}
