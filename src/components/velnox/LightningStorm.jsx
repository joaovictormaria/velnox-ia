'use client';

import { useEffect, useRef } from 'react';

/**
 * LightningStorm
 * Full-viewport canvas: dark blue night sky + realistic procedural
 * cloud-to-ground lightning with branching, glow, and screen flash.
 */
export default function LightningStorm() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let bolts = [];
    let flashAlpha = 0;
    let strikeTimer = 200; // ms until first strike (near-immediate)
    let lastTime = performance.now();

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Midpoint-displacement jagged path
    function generatePath(x1, y1, x2, y2, displace, minDisplace) {
      const pts = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      let disp = displace;
      while (disp > minDisplace) {
        // Snapshot segment count before mutating, and walk backwards so
        // inserting a midpoint never shifts the index of a segment we
        // haven't processed yet in this pass.
        const segCount = pts.length - 1;
        for (let i = segCount - 1; i >= 0; i--) {
          const a = pts[i];
          const b = pts[i + 1];
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const off = (Math.random() - 0.5) * disp;
          pts.splice(i + 1, 0, { x: mx + nx * off, y: my + ny * off });
        }
        disp *= 0.5;
      }
      return pts;
    }

    function createBolt() {
      const startX = width * 0.1 + Math.random() * width * 0.8;
      const startY = Math.random() * height * 0.2;
      const endX = startX + (Math.random() - 0.5) * width * 0.25;
      const endY = height * (0.8 + Math.random() * 0.18);
      const mainDisplace = Math.max(width, height) * 0.06;
      const minDisplace = 6;
      const mainPath = generatePath(startX, startY, endX, endY, mainDisplace, minDisplace);

      const branches = [];
      const branchCount = 2 + Math.floor(Math.random() * 4);
      for (let b = 0; b < branchCount; b++) {
        const idx = 1 + Math.floor(Math.random() * (mainPath.length - 2));
        const node = mainPath[idx];
        const angle = (Math.random() - 0.5) * 1.4;
        const len = 60 + Math.random() * 180;
        const ex = node.x + Math.sin(angle) * len;
        const ey = node.y + Math.cos(angle) * len * (Math.random() > 0.3 ? 1 : 0.4);
        branches.push(generatePath(node.x, node.y, ex, ey, mainDisplace * 0.5, minDisplace));
      }

      return {
        mainPath,
        branches,
        life: 0,
        maxLife: 350 + Math.random() * 350,
        intensity: 0.85 + Math.random() * 0.15,
      };
    }

    function drawPath(path) {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
    }

    function drawBolt(bolt, alphaMul) {
      const a = Math.max(0, bolt.intensity * alphaMul);
      if (a <= 0) return;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Outer wide glow (electric blue)
      ctx.strokeStyle = `rgba(90, 170, 255, ${0.4 * a})`;
      ctx.shadowColor = 'rgba(120, 190, 255, 0.95)';
      ctx.shadowBlur = 40;
      ctx.lineWidth = 10;
      drawPath(bolt.mainPath);
      bolt.branches.forEach(drawPath);

      // Mid glow
      ctx.strokeStyle = `rgba(200, 225, 255, ${0.75 * a})`;
      ctx.shadowBlur = 22;
      ctx.lineWidth = 4;
      drawPath(bolt.mainPath);
      bolt.branches.forEach(drawPath);

      // Bright white core
      ctx.strokeStyle = `rgba(245, 250, 255, ${0.98 * a})`;
      ctx.shadowColor = 'rgba(220, 240, 255, 1)';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 1.8;
      drawPath(bolt.mainPath);
      bolt.branches.forEach(drawPath);

      ctx.shadowBlur = 0;
    }

    function drawSky() {
      // Base sky gradient — dark blue night
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, '#05070A');
      sky.addColorStop(0.4, '#0d0f1c');
      sky.addColorStop(0.78, '#1a1030');
      sky.addColorStop(1, '#2D1B4E');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      // Subtle vignette
      const vg = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        height * 0.2,
        width / 2,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);
    }

    function frame(now) {
      const elapsed = now - lastTime;
      lastTime = now;

      drawSky();

      // Countdown to next strike
      strikeTimer -= elapsed;

      // Update + draw bolts
      for (const b of bolts) {
        b.life += elapsed;
        const t = Math.min(1, b.life / b.maxLife);
        const alpha = (1 - t) * (t < 0.12 ? t / 0.12 : 1);
        drawBolt(b, alpha);
      }
      bolts = bolts.filter((b) => b.life < b.maxLife);

      // Whole-frame flash
      if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(220, 235, 255, ${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
        flashAlpha *= 0.84;
        if (flashAlpha < 0.005) flashAlpha = 0;
      }

      // Trigger strike
      if (strikeTimer <= 0) {
        const burst = Math.random() < 0.3 ? 2 : 1;
        for (let i = 0; i < burst; i++) bolts.push(createBolt());
        flashAlpha = 0.1 + Math.random() * 0.05;
        if (navigator.vibrate) {
          setTimeout(() => navigator.vibrate(60), 500);
        }
        strikeTimer = 800 + Math.random() * 2000;
      }

      rafId = requestAnimationFrame(frame);
    }

    function onResize() {
      resize();
    }

    let rafId = 0;
    resize();
    window.addEventListener('resize', onResize);
    // Kick off with a strike almost immediately
    strikeTimer = 300;
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full block pointer-events-none"
      style={{
        background:
          'linear-gradient(to bottom, #05070A 0%, #0d0f1c 40%, #1a1030 78%, #2D1B4E 100%)',
      }}
    />
  );
}