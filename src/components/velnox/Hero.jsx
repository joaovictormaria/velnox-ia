import React from 'react';
import { ArrowRight, Rocket, Zap } from 'lucide-react';
import velnoxLogo from '@/images/velox.ia_logo.png';
import veloxBoat from '@/images/VELOX-removebg-preview.png';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-magenta/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16">
        <div className="relative mx-auto mt-24 w-full max-w-md md:max-w-lg lg:max-w-xl mb-1">
          <div className="absolute top-1/2 left-1/2 z-0 w-screen h-40 md:h-56 lg:h-64 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1600 300"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0,150 C120,40 240,260 360,150 S600,40 720,150 S960,260 1080,150 S1320,40 1440,150 S1600,260 1600,150"
                stroke="hsl(var(--neon-cyan))"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.55"
                className="worm-trace"
              />
              <path
                d="M0,90 C140,220 260,-30 400,90 S660,220 800,90 S1060,-30 1200,90 S1460,220 1600,90"
                stroke="hsl(var(--neon-magenta))"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.45"
                className="worm-trace"
                style={{ animationDelay: '-1.3s' }}
              />
              <path
                d="M0,220 C160,110 300,330 440,220 S700,110 840,220 S1100,330 1240,220 S1500,110 1600,220"
                stroke="hsl(var(--neon-cyan))"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.35"
                className="worm-trace"
                style={{ animationDelay: '-2.6s' }}
              />
            </svg>
            <img
              src={veloxBoat}
              alt=""
              aria-hidden="true"
              className="sail-right absolute z-20 w-16 md:w-20 lg:w-24 h-auto [filter:drop-shadow(0_0_10px_rgba(0,255,255,0.9))_drop-shadow(0_0_22px_rgba(0,255,255,0.6))]"
              style={{ animationDuration: '9s' }}
            />
            <img
              src={veloxBoat}
              alt=""
              aria-hidden="true"
              className="sail-right absolute z-20 w-16 md:w-20 lg:w-24 h-auto [filter:drop-shadow(0_0_10px_rgba(0,255,255,0.9))_drop-shadow(0_0_22px_rgba(0,255,255,0.6))]"
              style={{ animationDuration: '9s', animationDelay: '-3s' }}
            />
            <img
              src={veloxBoat}
              alt=""
              aria-hidden="true"
              className="sail-right absolute z-20 w-16 md:w-20 lg:w-24 h-auto [filter:drop-shadow(0_0_10px_rgba(0,255,255,0.9))_drop-shadow(0_0_22px_rgba(0,255,255,0.6))]"
              style={{ animationDuration: '9s', animationDelay: '-6s' }}
            />
          </div>
          <div
            role="img"
            aria-label="Velnox.IA - Desenvolvendo o Impossível"
            className="relative z-10 mx-auto aspect-[350/224] w-full max-w-[320px] md:max-w-[380px] lg:max-w-[430px]"
            style={{
              backgroundImage: `url(${velnoxLogo})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '142.86% 223.21%',
              backgroundPosition: '50% 48.19%',
            }}
          />
        </div>

        <div className="mt-16 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
          <Zap className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm text-muted-foreground">A velocidade nunca dorme</span>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Desenvolvimento web de alta performance. Transformamos ideias em plataformas digitais que impulsionam o seu negócio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#planos" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all">
            Ver Planos <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#contato" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-foreground font-semibold hover:border-neon-cyan/50 transition-all">
            <Rocket className="w-5 h-5" /> Iniciar Projeto
          </a>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
          <div>
            <div className="font-display text-3xl font-bold gradient-text">3-5</div>
            <div className="text-sm text-muted-foreground mt-1">dias para lançar</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold gradient-text">100%</div>
            <div className="text-sm text-muted-foreground mt-1">responsivo</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold gradient-text">24/7</div>
            <div className="text-sm text-muted-foreground mt-1">suporte dedicado</div>
          </div>
        </div>
      </div>
    </section>
  );
}