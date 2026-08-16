import React from 'react';
import Image from 'next/image';
import { Zap, Moon, Target, Eye, Heart, Linkedin, Github, Instagram } from 'lucide-react';
import { getContent } from '@/lib/content';
import BrandTypewriter from '@/components/velnox/BrandTypewriter';
import WaterEdge from '@/components/velnox/WaterEdge';
// Recorte quadrado no rosto, derivado de eu-portifolio.jpeg (que e de corpo
// inteiro): num avatar circular de 96px a foto original mostraria o torso e
// cortaria a cabeca.
import founderPhoto from '@/images/eu-portifolio-avatar.jpeg';

const icons = { Zap, Moon, Target, Eye, Heart };

/**
 * @param {{
 *   headingLevel?: 'h1' | 'h2',
 *   locale: string,
 *   waterEdge?: boolean
 * }} props `waterEdge` so faz sentido onde existe uma secao escura acima — na
 *   home, sobre o Hero. Na pagina /sobre a secao fica logo abaixo do cabecalho,
 *   e a faixa subiria por cima dos links de navegacao.
 */
export default function About({ headingLevel = 'h2', locale, waterEdge = false }) {
  const { about } = getContent(locale);
  const { founder } = about;
  const Heading = headingLevel;
  const VelIcon = icons[about.vel.icon];
  const NoxIcon = icons[about.nox.icon];

  return (
    <section id="sobre" className="relative py-16 md:py-24 scroll-mt-28 bg-white">
      {/* Sobe acima do topo da secao e avanca sobre o Hero: e o avanco que faz
          a leitura de agua subindo, no lugar do corte reto entre as duas. */}
      {waterEdge && <WaterEdge className="-top-24 md:-top-32 h-24 md:h-32" fillClassName="fill-white" />}

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4 text-neon-blue-ink">
            {/* animate-flicker acende os dois nomes como neon e faz falhar de
                vez em quando. O delay negativo no segundo tira os dois de
                sincronia — piscar junto denuncia que e animacao, nao lampada.
                motion-reduce desliga tudo. */}
            {about.headingPrefix} {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent animate-flicker motion-reduce:animate-none">{about.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan-ink animate-flicker-cyan motion-reduce:animate-none">{about.headingHighlight}</span>
            )}
            <span className="text-neon-blue-ink-soft/60 font-normal"> / </span>
            <span
              className="text-neon-magenta-ink uppercase animate-flicker-magenta motion-reduce:animate-none"
              style={{ animationDelay: '-2.3s' }}
            >
              {about.headingSuffix}
            </span>
          </Heading>
        </div>

        {/* Card unico dividido em duas colunas a partir de lg: a marca a
            esquerda, o fundador a direita. O divide-x substitui as regras
            horizontais que separavam os blocos quando eram empilhados. */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 shadow-[0_1px_3px_rgba(15,23,41,0.06),0_12px_32px_rgba(15,23,41,0.08)] p-6 md:p-8 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200">

              <div className="lg:pr-8">
                <BrandTypewriter
                  intro={about.breakdownIntro}
                  vel={about.vel}
                  nox={about.nox}
                  quote={about.quote}
                />

                {/* Empilhados no formato horizontal: em meia largura os tres
                    nao cabem lado a lado sem espremer o texto. */}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-200">
                  {about.values.map((value) => {
                    const Icon = icons[value.icon];
                    return (
                      <div key={value.title} className="bg-white border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan-ink/20 to-neon-magenta-ink/20 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-neon-cyan-ink" />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-semibold mb-1 text-neon-blue-ink">{value.title}</h3>
                          <p className="text-sm text-neon-blue-ink-soft leading-relaxed">{value.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:pl-8 pt-8 border-t border-slate-200 lg:pt-0 lg:border-t-0">
                <div className="flex items-center gap-4 mb-5">
                  {/* O halo usa os tres tons da marca (ciano -> violeta ->
                      magenta), o mesmo arco do "V" do logo — mas nas variantes
                      -ink, porque os tons claros sobre o card claro ficam
                      estridentes. */}
                  <div className="relative shrink-0">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-neon-cyan-ink via-neon-violet to-neon-magenta-ink opacity-60 blur-[5px]"
                    />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-slate-200">
                      <Image src={founderPhoto} alt={founder.name} fill sizes="96px" className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold leading-tight text-neon-blue-ink">{founder.name}</h3>
                    <p className="text-sm font-mono text-neon-cyan-ink mt-1">{founder.role}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-neon-blue-ink-soft hover:text-neon-cyan-ink hover:border-neon-cyan-ink/50 transition-all">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href={founder.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-neon-blue-ink-soft hover:text-neon-cyan-ink hover:border-neon-cyan-ink/50 transition-all">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={founder.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-neon-blue-ink-soft hover:text-neon-magenta-ink hover:border-neon-magenta-ink/50 transition-all">
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {founder.bio.map((paragraph, i) => (
                    <p key={i} className="text-sm md:text-base text-neon-blue-ink-soft leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
