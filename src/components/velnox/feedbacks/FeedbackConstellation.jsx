'use client';

import React, { useEffect, useRef } from 'react';

// Ciano e magenta da logo (src/images/velox.png), em RGB porque o canvas
// precisa montar a string com alfa variavel a cada traco.
const CYAN = '53, 221, 233';
const MAGENTA = '249, 21, 195';

const LINK_DIST = 130;
const POINTER_DIST = 180;

/**
 * Constelacao de fundo da secao de depoimentos: pontos a deriva que se ligam
 * quando ficam perto, e que se inclinam na direcao do cursor.
 *
 * Decisoes que importam:
 *
 * - Em canvas e nao em DOM: sao ~60 pontos e ~1800 pares de distancia por
 *   quadro. Como elementos animados isso seria layout/paint a cada frame.
 * - O laco so roda com a secao em vista (IntersectionObserver). Sem isso a
 *   home ficaria com um requestAnimationFrame vivo do topo ao rodape.
 * - `prefers-reduced-motion` nem chega a montar o laco: o canvas fica vazio.
 * - No resize, os pontos so sao recriados se a quantidade mudar — em celular a
 *   barra de endereco dispara resize a cada rolagem, e recriar ali faria a
 *   constelacao piscar.
 */
export default function FeedbackConstellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };

    let width = 0;
    let height = 0;
    let particles = [];
    let raf = 0;
    let running = false;

    const targetCount = () => Math.max(18, Math.min(64, Math.round(width / 26)));

    const spawn = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 1.8,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = targetCount();
      if (particles.length !== count) {
        particles = Array.from({ length: count }, spawn);
        return;
      }
      // Mesma quantidade: so traz de volta quem ficou fora da nova caixa.
      for (const p of particles) {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < POINTER_DIST) {
          const pull = (POINTER_DIST - dist) / POINTER_DIST;
          p.x += dx * pull * 0.015;
          p.y += dy * pull * 0.015;
        }
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK_DIST) continue;
          ctx.strokeStyle = `rgba(${CYAN}, ${(1 - d / LINK_DIST) * 0.28})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.lineWidth = 0.8;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r > 1.5 ? MAGENTA : CYAN}, 0.75)`;
        ctx.fill();

        const d = Math.hypot(pointer.x - p.x, pointer.y - p.y);
        if (d >= POINTER_DIST) continue;
        ctx.strokeStyle = `rgba(${MAGENTA}, ${(1 - d / POINTER_DIST) * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      resize();
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
