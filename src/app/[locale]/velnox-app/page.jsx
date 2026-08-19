import React from 'react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { withLocale } from '@/lib/content';

/**
 * A página do Velnox.app.
 *
 * Existe separada de /planos por um motivo prático: é o endereço declarado
 * como site da empresa no Stripe, e quem analisa precisa cair numa página que
 * fala só do produto cobrado — preço, o que inclui, como cancelar e quem
 * cobra. Misturada aos projetos avulsos de R$ 799 a R$ 2.499, a assinatura de
 * R$ 300 vira mais um número no meio de outros e a análise trava.
 *
 * Por isso o texto aqui é literal. Cada afirmação corresponde ao que o sistema
 * faz de verdade: o cancelamento realmente vale até o fim do período pago, e o
 * nome no extrato é realmente VELNOX.APP.BR.
 *
 * Escrita só em português por ora; quando for traduzida, o conteúdo migra para
 * src/data/content/*.json como as outras páginas.
 */

const PRECO = 'R$ 300';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    title: 'Velnox.app — Cardápio digital e gestão de pedidos',
    description:
      `Software por assinatura para restaurantes e lanchonetes: cardápio digital próprio, ` +
      `pedidos em tempo real, entregadores e relatórios. ${PRECO} por mês, cancele quando quiser.`,
    path: '/velnox-app',
    locale,
  });
}

const INCLUSO = [
  {
    titulo: 'Cardápio digital no seu endereço',
    texto:
      'Uma página própria, com as suas fotos, cores e logo. O cliente monta o pedido pelo celular, sem instalar aplicativo nenhum.',
  },
  {
    titulo: 'Pedidos em tempo real',
    texto:
      'Cada pedido cai num quadro que vai de "recebido" a "entregue". A cozinha vê o que fazer sem ninguém precisar anotar.',
  },
  {
    titulo: 'Tamanhos, adicionais e perguntas',
    texto:
      'Preço por tamanho, adicionais pagos e perguntas obrigatórias — o sabor do suco, o ponto da carne — respondidas antes de ir ao carrinho.',
  },
  {
    titulo: 'Entregadores',
    texto:
      'Conta própria para cada motoboy, com a lista do que ele tem para levar. O cliente acompanha a distância até a porta dele.',
  },
  {
    titulo: 'Promoções, cupons e avaliações',
    texto: 'Descontos por código, ofertas em destaque no cardápio e as avaliações de quem já pediu.',
  },
  {
    titulo: 'Relatórios',
    texto: 'O que vendeu, quanto entrou e quais produtos puxam o faturamento.',
  },
  {
    titulo: 'QR Code da sua loja',
    texto: 'Para imprimir e colar na porta, no balcão ou na embalagem. Leva direto ao seu cardápio.',
  },
  {
    titulo: 'Atualizações incluídas',
    texto: 'Tudo que entra no sistema chega para quem já é assinante, sem custo adicional.',
  },
];

export default async function VelnoxAppPage({ params }) {
  const { locale } = await params;

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: 'Velnox.app', path: '/velnox-app' }]} />

      <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 sm:px-8">
        <header>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
            Produto por assinatura
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Velnox<span className="text-neon-cyan">.app</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Cardápio digital e gestão de pedidos para restaurantes, lanchonetes, pizzarias e
            delivery. O seu cliente pede pelo celular; você acompanha tudo por um painel, do
            pedido à entrega.
          </p>
        </header>

        {/* O preço vem cedo e sozinho: é a primeira coisa que tanto o lojista
            quanto quem analisa a conta de pagamento procuram. */}
        <section className="mt-10 rounded-2xl border border-neon-cyan/30 bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="font-display text-5xl font-extrabold text-neon-cyan">{PRECO}</span>
            <span className="pb-1 text-lg text-muted-foreground">por mês</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Assinatura mensal recorrente, cobrada automaticamente no cartão de crédito a cada 30
            dias, até que você cancele. Sem taxa de adesão, sem fidelidade e sem multa para sair.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Uma assinatura atende <strong className="text-foreground">um estabelecimento</strong>,
            sem limite de produtos, de pedidos ou de pessoas usando o painel.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://velnox.app.br/admin/cadastro"
              className="rounded-xl bg-neon-cyan px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Testar 14 dias grátis
            </a>
            <a
              href="https://wa.me/5579974007193"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-neon-cyan"
            >
              Falar no WhatsApp
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            O teste não pede cartão. A cobrança só começa quando você assinar.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">O que está incluso</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {INCLUSO.map((item) => (
              <div key={item.titulo} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">{item.titulo}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* As três seções abaixo são as que uma assinatura recorrente precisa
            deixar escritas: como sair, quando devolvemos dinheiro, e quem
            aparece na fatura. Sem elas o cliente contesta a cobrança em vez de
            pedir cancelamento. */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Como cancelar</h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              O cancelamento é feito pelo próprio painel, em{' '}
              <strong className="text-foreground">Assinatura → Gerenciar assinatura</strong>. Não
              é preciso ligar, enviar e-mail nem justificar.
            </p>
            <p>
              Ao cancelar, você{' '}
              <strong className="text-foreground">
                continua com tudo funcionando até o fim do período já pago
              </strong>
              . Nenhuma cobrança nova é feita depois disso.
            </p>
            <p>
              Passada essa data, o cardápio sai do ar para os seus clientes e o painel fica
              bloqueado — mas{' '}
              <strong className="text-foreground">seus dados continuam guardados</strong>: produtos,
              preços, pedidos e clientes. Assinando de novo, tudo volta como estava.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Reembolso</h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              Você tem <strong className="text-foreground">7 dias corridos</strong> a partir da
              primeira cobrança para desistir e receber o valor de volta integralmente, conforme o
              artigo 49 do Código de Defesa do Consumidor. Basta pedir pelos contatos abaixo.
            </p>
            <p>
              Depois desse prazo, o cancelamento vale para as próximas cobranças: o mês já pago não
              é devolvido, e você segue usando até o fim dele.
            </p>
            <p>
              Se houver falha do nosso lado que deixe o serviço indisponível por tempo relevante,
              devolvemos a parte proporcional — sem você precisar pedir.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Como aparece na sua fatura</h2>
          <p className="mt-4 text-muted-foreground">
            A cobrança é processada pela Stripe e aparece no extrato do cartão como{' '}
            <code className="rounded-md border border-border bg-white/5 px-2 py-0.5 font-mono text-sm text-neon-cyan">
              VELNOX.APP.BR
            </code>
            . Se você não reconhecer alguma cobrança, fale com a gente antes de contestar no banco —
            resolvemos direto e mais rápido.
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold">Quem cobra e quem atende</h2>
          <p className="mt-3 text-muted-foreground">
            O Velnox.app é desenvolvido e operado pela <strong className="text-foreground">VELNOX.IA</strong>,
            em Aracaju, Sergipe, Brasil.
          </p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</dt>
              <dd className="mt-1">
                <a
                  href="mailto:velnoxx.ia@gmail.com"
                  className="text-foreground underline decoration-neon-cyan/40 underline-offset-4 hover:text-neon-cyan"
                >
                  velnoxx.ia@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href="https://wa.me/5579974007193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-neon-cyan/40 underline-offset-4 hover:text-neon-cyan"
                >
                  (79) 97400-7193
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-muted-foreground">
            Atendimento de segunda a sexta, das 9h às 18h (horário de Brasília). Pedidos de
            cancelamento e reembolso são respondidos em até 2 dias úteis.
          </p>
        </section>

        <p className="mt-10 text-sm text-muted-foreground">
          O uso do Velnox.app segue os{' '}
          <a
            href={withLocale(locale, '/termos')}
            className="text-foreground underline decoration-neon-cyan/40 underline-offset-4 hover:text-neon-cyan"
          >
            Termos de uso
          </a>{' '}
          e a{' '}
          <a
            href={withLocale(locale, '/privacidade')}
            className="text-foreground underline decoration-neon-cyan/40 underline-offset-4 hover:text-neon-cyan"
          >
            Política de privacidade
          </a>
          .
        </p>
      </div>
    </SiteShell>
  );
}
