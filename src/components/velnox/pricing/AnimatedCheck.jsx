'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Marca de conferido que se desenha ao entrar na viewport.
 *
 * @param {{ delay?: number }} props
 */
export default function AnimatedCheck({ delay = 0 }) {
  return (
    <span className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-cyan/5 ring-1 ring-neon-cyan/30">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <motion.path
          d="M5 13l4 4L19 7"
          className="stroke-neon-cyan"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        />
      </svg>
    </span>
  );
}
