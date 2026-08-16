'use client';

import React, { useEffect, useState } from 'react';

const TYPE_MS = 70;
const ERASE_MS = 28;
const HOLD_MS = 2400;
const RESTART_MS = 600;

/**
 * Datilografa os textos em sequencia, segura o resultado completo, apaga na
 * ordem inversa e recomeca, em loop.
 *
 * Comeca com todos os textos completos de proposito: assim o HTML entregue pelo
 * servidor ja contem o conteudo e a animacao so assume depois da montagem.
 * Respeita prefers-reduced-motion.
 *
 * @param {string[]} texts
 * @returns {{ lengths: number[], active: number, animating: boolean }}
 */
export function useTypewriterSequence(texts) {
  // JSON, e nao join(separador): os textos contem espacos e pontuacao, entao
  // qualquer separador comum quebraria a lista ao remontar dentro do efeito.
  const key = JSON.stringify(texts);
  const [lengths, setLengths] = useState(() => texts.map((t) => t.length));
  const [active, setActive] = useState(texts.length - 1);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const list = JSON.parse(key);
    let timer;
    let phase = 'typing';
    let i = 0;
    let current = list.map(() => 0);

    // Tudo comeca dentro de um timeout: setState sincrono no corpo do efeito e
    // barrado pelo react-hooks/set-state-in-effect. E como o estado inicial ja
    // e o texto completo, o caso de reduced-motion nao precisa mexer em nada.
    function start() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setAnimating(true);
      setLengths(current);
      setActive(0);
      timer = setTimeout(tick, RESTART_MS);
    }

    function tick() {
      if (phase === 'typing') {
        if (current[i] < list[i].length) {
          current = current.slice();
          current[i] += 1;
          setLengths(current);
          timer = setTimeout(tick, TYPE_MS);
          return;
        }
        if (i < list.length - 1) {
          i += 1;
          setActive(i);
          timer = setTimeout(tick, TYPE_MS);
          return;
        }
        phase = 'holding';
        timer = setTimeout(tick, HOLD_MS);
        return;
      }

      if (phase === 'holding') {
        phase = 'erasing';
        i = list.length - 1;
        setActive(i);
        timer = setTimeout(tick, ERASE_MS);
        return;
      }

      if (current[i] > 0) {
        current = current.slice();
        current[i] -= 1;
        setLengths(current);
        timer = setTimeout(tick, ERASE_MS);
        return;
      }
      if (i > 0) {
        i -= 1;
        setActive(i);
        timer = setTimeout(tick, ERASE_MS);
        return;
      }
      phase = 'typing';
      i = 0;
      setActive(0);
      timer = setTimeout(tick, RESTART_MS);
    }

    timer = setTimeout(start, 0);
    return () => clearTimeout(timer);
  }, [key]);

  return { lengths, active, animating };
}

/**
 * Reserva o espaco do texto completo com uma copia invisivel e desenha o trecho
 * datilografado por cima. Sem isso o bloco reflui a cada caractere digitado.
 *
 * `textClassName` cai no elemento que de fato contem o texto, e nao num pai.
 * Isso importa para `bg-clip-text`: o recorte so funciona sobre o texto do
 * proprio elemento, e o texto visivel aqui fica num filho `absolute`. Aplicado
 * no pai, o gradiente nao recorta nada e o `text-transparent` some com tudo.
 *
 * @param {{ full: string, length: number, showCursor?: boolean, cursorClassName?: string, className?: string, textClassName?: string }} props
 */
export function Slot({ full, length, showCursor, cursorClassName = 'text-neon-cyan', className, textClassName }) {
  return (
    <span className={`relative inline-block ${className || ''}`}>
      <span aria-hidden="true" className="invisible">{full}</span>
      <span className={`absolute inset-0 ${textClassName || ''}`}>
        {full.slice(0, length)}
        {showCursor && <span aria-hidden="true" className={`animate-blink ${cursorClassName}`}>|</span>}
      </span>
    </span>
  );
}
