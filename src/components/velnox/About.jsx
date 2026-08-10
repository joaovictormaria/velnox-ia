import React from 'react';
import Image from 'next/image';
import { Zap, Moon, Target, Eye, Heart, Linkedin, Github, Instagram } from 'lucide-react';
import { getContent } from '@/lib/content';
import founderPhoto from '@/images/foto-victor.jpeg';

const icons = { Zap, Moon, Target, Eye, Heart };

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function About({ headingLevel = 'h2', locale }) {
  const { about } = getContent(locale);
  const { founder } = about;
  const Heading = headingLevel;
  const VelIcon = icons[about.vel.icon];
  const NoxIcon = icons[about.nox.icon];

  return (
    <section id="sobre" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">
            {about.headingPrefix} {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{about.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan">{about.headingHighlight}</span>
            )}
          </Heading>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-card/60 backdrop-blur-xl border border-border shadow-[0_0_25px_rgba(0,255,255,0.05),0_0_50px_rgba(255,0,255,0.03)] p-8 md:p-12 rounded-3xl text-center">
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
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
              &ldquo;{about.quote}&rdquo;
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

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-card/50 backdrop-blur-xl border border-border p-6 md:p-10 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-neon-cyan/30 shrink-0">
              <Image src={founderPhoto} alt={founder.name} fill sizes="160px" className="object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-display text-xl font-semibold">{founder.name}</h3>
              <p className="text-sm text-neon-cyan font-mono mb-4">{founder.role}</p>
              {founder.bio.map((paragraph, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">{paragraph}</p>
              ))}
              <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={founder.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50 transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href={founder.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-neon-magenta hover:border-neon-magenta/50 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
