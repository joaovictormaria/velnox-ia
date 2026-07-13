import React from 'react';
import Image from 'next/image';
import { ArrowRight, Rocket, Zap } from 'lucide-react';
import velnoxLogo from '@/images/velox.ia_logo.png';
import veloxBoat from '@/images/VELOX-removebg-preview.png';
import data from '@/data/static-data.json';

const { hero } = data;

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-magenta/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />

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
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.55"
                className="stroke-neon-cyan animate-worm-flow [stroke-dasharray:18_14]"
              />
              <path
                d="M0,90 C140,220 260,-30 400,90 S660,220 800,90 S1060,-30 1200,90 S1460,220 1600,90"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.45"
                className="stroke-neon-magenta animate-worm-flow [stroke-dasharray:18_14]"
                style={{ animationDelay: '-1.3s' }}
              />
              <path
                d="M0,220 C160,110 300,330 440,220 S700,110 840,220 S1100,330 1240,220 S1500,110 1600,220"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.35"
                className="stroke-neon-cyan animate-worm-flow [stroke-dasharray:18_14]"
                style={{ animationDelay: '-2.6s' }}
              />
            </svg>
            <Image
              src={veloxBoat}
              alt=""
              aria-hidden="true"
              className="animate-sail-right absolute z-20 w-16 md:w-20 lg:w-24 h-auto [filter:drop-shadow(0_0_10px_rgba(0,255,255,0.9))_drop-shadow(0_0_22px_rgba(0,255,255,0.6))]"
            />
            <Image
              src={veloxBoat}
              alt=""
              aria-hidden="true"
              className="animate-sail-right absolute z-20 w-16 md:w-20 lg:w-24 h-auto [filter:drop-shadow(0_0_10px_rgba(0,255,255,0.9))_drop-shadow(0_0_22px_rgba(0,255,255,0.6))]"
              style={{ animationDelay: '-3s' }}
            />
            <Image
              src={veloxBoat}
              alt=""
              aria-hidden="true"
              className="animate-sail-right absolute z-20 w-16 md:w-20 lg:w-24 h-auto [filter:drop-shadow(0_0_10px_rgba(0,255,255,0.9))_drop-shadow(0_0_22px_rgba(0,255,255,0.6))]"
              style={{ animationDelay: '-6s' }}
            />
          </div>
          <div className="relative z-10 mx-auto aspect-[350/224] w-full max-w-[320px] md:max-w-[380px] lg:max-w-[430px]">
            <Image
              src={velnoxLogo}
              alt="Velnox.IA - Desenvolvendo o Impossível"
              fill
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 430px"
              className="object-cover"
              style={{ objectPosition: '50% 48.19%', transform: 'scale(1.4286, 2.2321)' }}
            />
          </div>
        </div>

        <div className="mt-16 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
          <Zap className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm text-muted-foreground">{hero.badge}</span>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#planos" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all">
            {hero.primaryCta} <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#contato" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-foreground font-semibold hover:border-neon-cyan/50 transition-all">
            <Rocket className="w-5 h-5" /> {hero.secondaryCta}
          </a>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
