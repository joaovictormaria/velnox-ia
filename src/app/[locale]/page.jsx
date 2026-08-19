import React from 'react';
import dynamic from 'next/dynamic';
import IntroScreen from '@/components/velnox/IntroScreen';
import Navbar from '@/components/velnox/Navbar';
import Hero from '@/components/velnox/Hero';
import Services from '@/components/velnox/Services';
import Pricing from '@/components/velnox/Pricing';
import About from '@/components/velnox/About';
import Portfolio from '@/components/velnox/Portfolio';
import Feedbacks from '@/components/velnox/Feedbacks';
import FAQ from '@/components/velnox/FAQ';
import Footer from '@/components/velnox/Footer';
import Reveal from '@/components/velnox/Reveal';
import { getContent } from '@/lib/content';

const Contact = dynamic(() => import('@/components/velnox/Contact'));

// A secao de depoimentos le do banco os que foram aprovados no /admin. ISR em
// vez de render por requisicao: o resto da home e estatico, e a aprovacao ja
// dispara `revalidatePath` — este prazo e so a rede de seguranca.
export const revalidate = 300;

export default async function Home({ params }) {
  const { locale } = await params;
  const data = getContent(locale);

  return (
    // `overflow-x-clip` e nao `hidden`: `hidden` cria um contexto de rolagem,
    // e isso quebra o `position: sticky` dos filhos. `clip` corta igual sem
    // criar o contexto.
    <div className="min-h-screen text-foreground overflow-x-clip">
      {/* So na home: entrar direto em /planos ou /sobre nao deve reproduzir a
          abertura. Como esta montada aqui e nao no layout, isso sai de graca. */}
      <IntroScreen />
      <Navbar locale={locale} />
      <h1 className="sr-only">{data.brand.name}{data.brand.suffix} — {data.brand.tagline}</h1>
      <main>
        {/* O Hero fica de fora: ele ja esta na tela quando a pagina abre, entao
            revelar ao rolar so atrasaria o que o visitante ja deveria ver. */}
        {/* Dois parallax encadeados. Em cada par, a secao de baixo fica presa e
            a de cima desliza sobre ela:
              Hero preso  <- Sobre sobe por cima (com a borda de agua)
              Sobre presa <- Servicos prestados sobe por cima

            Cada par tem seu proprio wrapper, e e ele que limita o alcance do
            sticky: um elemento sticky fica preso enquanto o PAI estiver em
            vista. Sem esse limite, o pai seria a <main> inteira e as secoes
            presas continuariam aparecendo atras de todas as seguintes.

            O sticky fica separado do Reveal de proposito: o Reveal usa
            `transform` na transicao, e ancestral com transform interfere na
            contencao do sticky. */}
        <div className="relative">
          <div className="lg:sticky lg:top-0 lg:z-0">
            <Hero locale={locale} />
          </div>

          <div className="relative z-10">
            <div className="lg:sticky lg:top-0 lg:z-0">
              <Reveal><About locale={locale} waterEdge /></Reveal>
            </div>
            <div className="relative z-10">
              <Reveal><Portfolio locale={locale} /></Reveal>
            </div>
          </div>
        </div>
        <Reveal><Services locale={locale} /></Reveal>
        <Reveal><Pricing locale={locale} /></Reveal>
        <Reveal><Feedbacks locale={locale} /></Reveal>
        <Reveal><FAQ locale={locale} /></Reveal>
        <Reveal><Contact locale={locale} /></Reveal>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
