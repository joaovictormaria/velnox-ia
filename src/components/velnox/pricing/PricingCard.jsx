'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import AnimatedCheck from './AnimatedCheck';
import MagneticButton from './MagneticButton';

/**
 * Separa "R$ 1.700+" em moeda e valor, para estilizar cada parte. Se nao houver
 * espaco (ex.: "Sob consulta"), o texto inteiro vira o valor.
 */
function splitPrice(price) {
  const at = price.indexOf(' ');
  if (at < 0) return { currency: null, value: price };
  return { currency: price.slice(0, at), value: price.slice(at + 1) };
}

/**
 * @param {{ plan: any, index: number, ui: any, quoteHref: string }} props
 */
export default function PricingCard({ plan, index, ui, quoteHref }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const featured = !!plan.highlighted;
  const { currency, value } = splitPrice(plan.price);
  const step = index * 0.12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: step, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="relative h-full"
    >
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: step + 0.3 }}
          className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2"
        >
          <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-neon-magenta to-neon-magenta/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground shadow-lg shadow-neon-magenta/40">
            <Sparkles className="h-3 w-3" />
            {ui.mostPopularLabel}
          </span>
        </motion.div>
      )}

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative h-full"
      >
        {/* Borda conica girando, so no destacado */}
        {featured && (
          <span className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[150%] rounded-full opacity-70 [background:conic-gradient(from_0deg,transparent_0deg,theme(colors.neon.cyan)_60deg,theme(colors.neon.magenta)_180deg,theme(colors.neon.cyan)_300deg,transparent_360deg)]"
            />
          </span>
        )}

        <span
          className={
            featured
              ? 'absolute inset-0 rounded-2xl bg-card'
              : 'absolute inset-0 rounded-2xl border border-white/10 bg-card transition-colors duration-300 group-hover:border-white/20'
          }
        />

        <span
          className={
            featured
              ? 'pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-neon-cyan to-neon-magenta opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-40'
              : 'pointer-events-none absolute -inset-2 rounded-3xl bg-neon-cyan opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.07]'
          }
        />

        <span className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-3 select-none font-display text-6xl font-extrabold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-white/[0.05]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* translateZ afasta o conteudo do plano do card, o que faz o tilt ler
            como profundidade e nao como uma imagem plana inclinada. */}
        <div style={{ transform: 'translateZ(40px)' }} className="relative flex h-full flex-col p-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: step + 0.15 }}
          >
            <span
              className={
                featured
                  ? 'inline-flex items-center gap-2 rounded-full bg-neon-magenta/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-neon-magenta ring-1 ring-neon-magenta/25'
                  : 'inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground ring-1 ring-white/10'
              }
            >
              <span className={featured ? 'h-1.5 w-1.5 rounded-full bg-neon-magenta' : 'h-1.5 w-1.5 rounded-full bg-neon-cyan'} />
              {plan.name}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: step + 0.22 }}
            className="mt-4 text-sm leading-relaxed text-foreground/80"
          >
            {plan.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: step + 0.3 }}
            className="mt-5 flex items-baseline gap-1.5"
          >
            {currency && <span className="text-lg font-semibold text-muted-foreground">{currency}</span>}
            <span className="font-display text-4xl font-extrabold tracking-tight">{value}</span>
          </motion.div>

          <span className="mt-5 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

          <ul className="mt-5 flex-1 space-y-3.5">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step + 0.4 + i * 0.08 }}
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85"
              >
                <AnimatedCheck delay={step + 0.4 + i * 0.08} />
                {feature}
              </motion.li>
            ))}
          </ul>

          <div className="mt-7">
            <MagneticButton featured={featured} href={quoteHref}>
              {ui.chooseLabel}
            </MagneticButton>
          </div>

          {plan.projectType && (
            <Link
              href={quoteHref}
              className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-300 hover:text-neon-cyan"
            >
              {plan.projectType}
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
