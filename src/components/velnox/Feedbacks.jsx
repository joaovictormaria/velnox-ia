import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { getContent } from '@/lib/content';
import claraMachadoPhoto from '@/images/feedbacks/clara-machado.jpeg';
import pedroFeitosaPhoto from '@/images/feedbacks/pedro-feitosa.jpeg';
import camilaDeJesusPhoto from '@/images/feedbacks/camila-de-jesus.png';

const PHOTOS = {
  'Clara Machado': claraMachadoPhoto,
  'Pedro Feitosa': pedroFeitosaPhoto,
  'Camila de Jesus': camilaDeJesusPhoto,
};

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function FeedbackCard({ item }) {
  const photo = PHOTOS[item.name];
  return (
    <div className="group relative bg-card/50 backdrop-blur-xl border border-border p-4 rounded-xl flex flex-col shrink-0 w-72 sm:w-80 transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-[0_0_25px_rgba(0,255,255,0.08),0_0_50px_rgba(255,0,255,0.05)]">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Quote className="w-4 h-4 text-neon-cyan" />
        </div>
        {item.rating && (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < item.rating ? 'text-neon-cyan fill-neon-cyan' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-2.5 pt-3 border-t border-border/60">
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neon-cyan/30 shrink-0 bg-card flex items-center justify-center">
          {photo ? (
            <Image src={photo} alt={item.name} fill sizes="36px" className="object-cover" />
          ) : (
            <span className="text-xs font-semibold text-neon-cyan">{initials(item.name)}</span>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.role}</div>
        </div>
      </div>
    </div>
  );
}

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function Feedbacks({ headingLevel = 'h2', locale }) {
  const { feedbacks } = getContent(locale);
  const Heading = headingLevel;
  const loopItems = [...feedbacks.items, ...feedbacks.items];

  return (
    <section id="feedbacks" className="relative py-16 md:py-24 scroll-mt-28 bg-velnox-section-a border-y border-border/60 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">
            {feedbacks.headingPrefix} {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{feedbacks.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan">{feedbacks.headingHighlight}</span>
            )}
          </Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{feedbacks.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max gap-4 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {loopItems.map((item, index) => (
              <FeedbackCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
