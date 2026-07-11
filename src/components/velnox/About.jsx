import React from 'react';
import { Zap, Moon, Target, Eye, Heart } from 'lucide-react';
import data from '@/data/static-data.json';

const icons = { Zap, Moon, Target, Eye, Heart };
const { about } = data;

export default function About() {
  const VelIcon = icons[about.vel.icon];
  const NoxIcon = icons[about.nox.icon];

  return (
    <section id="sobre" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{about.headingPrefix} <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{about.headingHighlight}</span></h2>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-card/60 backdrop-blur-xl border border-border shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)] p-8 md:p-12 rounded-3xl text-center">
            <p className="text-sm text-muted-foreground mb-6">{about.breakdownIntro}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-neon-cyan mb-2">{about.vel.word}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                  <VelIcon className="w-4 h-4 text-neon-cyan" /> {about.vel.label}
                </div>
              </div>
              <div className="font-display text-3xl text-muted-foreground hidden md:block">+</div>
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-neon-magenta mb-2">{about.nox.word}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                  <NoxIcon className="w-4 h-4 text-neon-magenta" /> {about.nox.label}
                </div>
              </div>
            </div>
            <p className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
              "{about.quote}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {about.values.map((value) => {
            const Icon = icons[value.icon];
            return (
              <div key={value.title} className="bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
