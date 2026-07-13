import React from 'react';
import { Scale, Clock, Users, ShieldCheck } from 'lucide-react';
import data from '@/data/static-data.json';

const { portfolio } = data;

/** @param {{ headingLevel?: 'h1' | 'h2' }} props */
export default function Portfolio({ headingLevel = 'h2' }) {
  const Heading = headingLevel;

  return (
    <section id="portfolio" className="relative py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">{portfolio.headingPrefix} <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{portfolio.headingHighlight}</span></Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{portfolio.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {portfolio.cases.map((item) => (
            <div key={item.segment} className="bg-card/60 backdrop-blur-xl border border-border shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)] p-6 md:p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
                <h3 className="font-display text-xl font-semibold">{item.segment}</h3>
                <span className="font-mono text-xs text-neon-cyan uppercase tracking-wide">{item.plan}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.focus}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.audience}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Entregue em {item.timeline}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-4 border-t border-border">
                <Scale className="w-4 h-4 text-neon-magenta mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{item.legalContext}</span>
              </div>

              {/*
                Bloco com identificação do cliente — só publicar com autorização explícita confirmada.
                Fatos verificados nesta sessão (não inventados):
                - Equipe da cliente (advogadas especialistas em Direito Digital / proteção de crianças e adolescentes):
                  - Clara Machado — Advogada; Doutora e Mestre em Direito pela UFBA; docente e pesquisadora em
                    Direito, Tecnologia e Inovação; educadora parental.
                  - Grasielle Vieira — Advogada; Doutora em Direito pela Universidade Presbiteriana Mackenzie/SP;
                    Mestre em Direito Penal pela PUC-SP; pesquisadora em violência doméstica e políticas públicas
                    de proteção de mulheres, crianças e adolescentes; educadora parental.
                  - Karoline Santana — Advogada e empresária; Mestre em Direito pela Universidade Tiradentes/SE;
                    atuação em proteção de crianças e adolescentes.
                - Artigos publicados por integrantes dessa equipe em veículos jurídicos reais, sobre Roblox x ECA Digital:
                  - Conjur (18/03/2026), "Arquitetura do vício e dever de cuidado: algoritmo no banco dos réus e
                    interlocução com ECA Digital", autoras Clara Machado, Denise Andrade e Grasielle Vieira.
                    https://www.conjur.com.br/2026-mar-18/arquitetura-do-vicio-e-dever-de-cuidado-algoritmo-no-banco-dos-reus-e-interlocucao-com-eca-digital/
                  - Migalhas, "Roblox e o ECA Digital: Verificação de idade e desproteção de crianças".
                    https://www.migalhas.com.br/depeso/450785/roblox-e-o-eca-digital-verificacao-de-idade-e-desprotecao-de-criancas

                Pra ativar: descomentar o bloco JSX abaixo (precisa de fotos reais das 3 advogadas — não
                incluídas aqui, buscar com o cliente — e trocar os placeholders de src).

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Equipe jurídica do projeto</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <img src="/portfolio/clara-machado.jpg" alt="Clara Machado" className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
                    <div className="text-sm font-semibold">Clara Machado</div>
                    <div className="text-xs text-muted-foreground">Advogada; Doutora e Mestre em Direito (UFBA); docente e pesquisadora em Direito, Tecnologia e Inovação; educadora parental.</div>
                  </div>
                  <div className="text-center">
                    <img src="/portfolio/grasielle-vieira.jpg" alt="Grasielle Vieira" className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
                    <div className="text-sm font-semibold">Grasielle Vieira</div>
                    <div className="text-xs text-muted-foreground">Advogada; Doutora em Direito (Mackenzie/SP); Mestre em Direito Penal (PUC-SP); pesquisadora em violência doméstica e proteção de crianças e adolescentes; educadora parental.</div>
                  </div>
                  <div className="text-center">
                    <img src="/portfolio/karoline-santana.jpg" alt="Karoline Santana" className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
                    <div className="text-sm font-semibold">Karoline Santana</div>
                    <div className="text-xs text-muted-foreground">Advogada e empresária; Mestre em Direito (UNIT/SE); atuação em proteção de crianças e adolescentes.</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Presença técnica real em mídia jurídica: {' '}
                  <a href="https://www.conjur.com.br/2026-mar-18/arquitetura-do-vicio-e-dever-de-cuidado-algoritmo-no-banco-dos-reus-e-interlocucao-com-eca-digital/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">Conjur</a>
                  {' '}e{' '}
                  <a href="https://www.migalhas.com.br/depeso/450785/roblox-e-o-eca-digital-verificacao-de-idade-e-desprotecao-de-criancas" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">Migalhas</a>
                  , sobre Roblox x ECA Digital.
                </p>
              </div>
              */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
