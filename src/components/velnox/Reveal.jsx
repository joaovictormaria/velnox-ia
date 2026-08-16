'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Revela o conteudo quando ele entra na viewport: sobe alguns pixels enquanto
 * aparece. Dispara uma vez por elemento e desliga o observer em seguida.
 *
 * Detalhes que importam:
 *
 * - Marca via atributo no DOM em vez de estado do React. Alem de mais barato
 *   (nao re-renderiza a arvore), evita o `setState` sincrono dentro do efeito,
 *   que o eslint do projeto barra.
 * - O estado revelado usa `transform: none`, e nao `translateY(0)`. Elemento com
 *   transform vira bloco de contencao para descendentes `position: fixed` — e o
 *   modal do portfolio vive dentro de uma destas secoes. Com `none`, o transform
 *   deixa de existir assim que a transicao termina.
 * - `prefers-reduced-motion` revela na hora, sem observar nada.
 *
 * @param {{ children: React.ReactNode, className?: string }} props
 */
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reveal = () => el.setAttribute('data-revealed', 'true');

    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal();
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        io.disconnect();
      },
      // O rootMargin negativo embaixo atrasa o gatilho ate a secao entrar de
      // fato, em vez de disparar quando so a primeira linha assomou.
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={`opacity-0 [transform:translateY(2rem)] transition-[opacity,transform] duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:[transform:none] ${className}`}
    >
      {children}
    </div>
  );
}
