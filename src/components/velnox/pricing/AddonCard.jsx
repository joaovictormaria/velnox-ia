'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Plug } from 'lucide-react';
import AnimatedCheck from './AnimatedCheck';

const icons = { Server, Plug };

/**
 * Card horizontal dos servicos adicionais (hospedagem, integracoes).
 *
 * @param {{ addon: any, index: number, ui: any, quoteHref: string }} props
 */
export default function AddonCard({ addon, index, ui, quoteHref }) {
  const Icon = icons[addon.icon] ?? Server;
  const step = index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: step, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-7 transition-colors duration-300 hover:border-white/20"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon-cyan/5 blur-3xl transition-colors duration-500 group-hover:bg-neon-cyan/10" />

      {/* Sempre em coluna: na faixa lateral (~480px) o layout em linha
          espremeria o titulo e a lista lado a lado. */}
      <div className="relative flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/15 to-neon-magenta/10 ring-1 ring-neon-cyan/25">
            <Icon className="h-6 w-6 text-neon-cyan" strokeWidth={1.8} />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold">{addon.name}</h3>
            <p className="mt-1 text-xl font-extrabold text-neon-cyan">{addon.price}</p>
          </div>
        </div>

        <ul className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
          {addon.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step + 0.2 + i * 0.07 }}
              className="flex items-center gap-2.5 text-sm text-muted-foreground"
            >
              <AnimatedCheck delay={step + 0.2 + i * 0.07} />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      <Link
        href={quoteHref}
        className="relative mt-6 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-300 hover:text-neon-cyan"
      >
        {ui.chooseLabel}
        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
