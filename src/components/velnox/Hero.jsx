import React from 'react';
import Image from 'next/image';
import { Zap, ShieldCheck, MessageCircle, Search, Rocket, CircleCheck, Headset } from 'lucide-react';
import velnoxLogo from '@/images/velox.png';
import WaveLines from '@/components/velnox/WaveLines';
import { getContent } from '@/lib/content';

/** @param {{ locale: string }} props */
export default function Hero({ locale }) {
  const { hero, ui } = getContent(locale);
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-magenta/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />

      {/* Ondas presas a secao, nao mais ao logo: com o logo deslocado para a
          direita, ancora-las nele jogaria a faixa para fora do centro da tela. */}
      <WaveLines className="absolute top-1/2 left-0 z-0 w-full h-40 md:h-56 lg:h-64 -translate-y-1/2" />

      {/* Em lg o Hero usa um container mais largo que o resto do site: e o que
          aproxima o logo da borda esquerda sem precisar de margem negativa,
          que estouraria o overflow-hidden em viewports proximas de 1280px. */}
      <div className="relative z-10 w-full max-w-7xl lg:max-w-[86rem] mx-auto px-6 pt-16">
        {/* Colunas 1.2fr/1fr: o logo precisa de mais largura que o texto, e o
            gap maior e o que separa visualmente os dois blocos. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
          {/* Logo na coluna da esquerda. Como ele ja e o primeiro no DOM, a
              ordem visual sai de graca — nao precisa de classes `order`, e no
              mobile ele continua aparecendo primeiro.
              O -translate-y desloca so visualmente: como a coluna do texto e a
              mais alta, ela e quem define a altura da linha, entao mexer aqui
              nao empurra nada do resto do layout. */}
          {/* O wrapper externo ancora o grupo a esquerda da coluna em lg; o
              interno tem a largura do logo e mantem o pill centralizado sob
              ele, em vez de deixa-lo grudado na borda. */}
          <div className="flex flex-col items-center lg:items-start lg:-translate-y-8">
            <div className="flex flex-col items-center w-full max-w-[430px] md:max-w-[540px] lg:max-w-[600px]">
              <div className="relative aspect-[3000/1782] w-full">
                <Image
                  src={velnoxLogo}
                  alt={ui.logoAlt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 430px, (max-width: 1024px) 540px, 600px"
                  className="object-cover"
                  style={{ objectPosition: '50% 50%' }}
                />
              </div>
              {/* -mt-6 entra na faixa transparente que o object-cover deixa
                  abaixo do desenho do logo (43px na base, 60px no lg). Sem isso
                  o pill flutuaria longe demais mesmo com margem zero. */}
              <div className="-mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-muted-foreground">{hero.badge}</span>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              {hero.description}
            </p>

            {/* Empilhados: na meia largura da coluna os tres selos nao cabem
                lado a lado sem quebrar no meio da frase. */}
            <div className="flex flex-col items-center lg:items-start gap-3 mb-10 text-sm text-muted-foreground">
              <a href="#portfolio" className="inline-flex items-center gap-2 hover:text-neon-cyan transition-colors">
                <ShieldCheck className="w-4 h-4 text-neon-cyan shrink-0" /> {ui.heroRealProjectBadge}
              </a>
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-neon-cyan shrink-0" /> {ui.heroWhatsappBadge}
              </span>
              <span className="inline-flex items-center gap-2">
                <Search className="w-4 h-4 text-neon-cyan shrink-0" /> {ui.heroSeoBadge}
              </span>
            </div>

            {/* Os tres numeros sao fixos e sempre na mesma ordem em todos os
                idiomas, entao o icone e posicional — evita adicionar uma chave
                puramente visual aos 5 arquivos de conteudo. */}
            <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm px-4 py-6 sm:px-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-border">
                {hero.stats.map((stat, i) => {
                  const Icon = [Rocket, CircleCheck, Headset][i] ?? Rocket;
                  return (
                    <div key={stat.label} className="flex items-center justify-center gap-2.5 sm:px-3">
                      <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-neon-cyan shrink-0" />
                      <div className="text-left">
                        <div className="font-display text-xl lg:text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divisao entre o Hero e a secao seguinte: um degrade que escurece o pe
          da secao (a divisao de cor) fechado por um fio de luz na paleta da
          marca. Fica fora do wrapper de conteudo para colar no fundo real da
          secao, e nao recebe cliques. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="h-32 bg-gradient-to-b from-transparent to-background" />
        <div className="h-px w-full bg-velnox-rule" />
      </div>
    </section>
  );
}
