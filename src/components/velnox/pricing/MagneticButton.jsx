'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Botao que se desloca em direcao ao cursor e volta com mola ao sair.
 *
 * O efeito e so de mouse: em toque nao ha hover, e `onMouseMove` nunca dispara.
 *
 * @param {{ children: React.ReactNode, featured?: boolean, href?: string }} props
 */
export default function MagneticButton({ children, featured = false, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = href ? motion.a : motion.button;

  return (
    <MotionTag
      ref={ref}
      href={href}
      {...(href ? {} : { type: 'button' })}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={
        featured
          ? 'group/btn relative block w-full overflow-hidden rounded-xl px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-background'
          : 'block w-full rounded-xl border border-white/15 bg-transparent px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-foreground transition-colors duration-300 hover:border-neon-cyan/60 hover:bg-neon-cyan/5'
      }
    >
      {featured && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-magenta transition-transform duration-500 group-hover/btn:scale-110" />
          <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-magenta opacity-0 blur-md transition-opacity duration-300 group-hover/btn:opacity-80" />
        </>
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </MotionTag>
  );
}
