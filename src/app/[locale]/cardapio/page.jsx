import React from 'react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { withLocale } from '@/lib/content';

// Página do cardápio digital (cardapio.velnoxia.com.br). Só em português por ora, como a /velnox-app.
// Cada item descreve o que o produto faz hoje; cancelamento e reembolso ficam nos Termos de Contratação de lá.

const PRECO = 'R$ 35';
const CARDAPIO_URL = 'https://cardapio.velnoxia.com.br';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    title: 'Cardápio digital para restaurantes — Velnox',
    description:
      `Site com cardápio digital no endereço da sua loja, pedidos pelo celular e painel para acompanhar tudo. ` +
      `${PRECO} por mês. Veja grátis como fica o seu.`,
    path: '/cardapio',
    locale,
  });
}

const INCLUSO = [
  {
    titulo: 'Site e cardápio com a sua marca',
    texto: 'Fotos, cores e logo da sua loja, num endereço próprio: suaLoja.velnoxia.com.br.',
  },
  {
    titulo: 'Pedidos pelo celular',
    texto: 'O cliente monta o pedido no cardápio, para entrega ou retirada, sem instalar aplicativo.',
  },
  {
    titulo: 'Painel da loja',
    texto: 'Pedidos, avaliações, horários, taxas de entrega e cardápio, tudo editado por você.',
  },
  {
    titulo: 'Aviso de pedido pronto',
    texto: 'Marque o que já saiu da cozinha e avise o cliente pelo WhatsApp com a mensagem pronta.',
  },
  {
    titulo: 'QR Code do cardápio',
    texto: 'Para imprimir e colar no balcão, na mesa ou na embalagem.',
  },
  {
    titulo: 'Em português, inglês e espanhol',
    texto: 'O cardápio da loja pode ser exibido no idioma do seu público.',
  },
];

const PASSOS = [
  { titulo: 'Veja a prévia', texto: 'Informe o tipo e o nome do seu estabelecimento e veja como o site fica.' },
  { titulo: 'Contrate', texto: `Assinatura de ${PRECO} por mês, paga com cartão de crédito pelo Stripe.` },
  { titulo: 'Envie seus dados', texto: 'Logo, fotos e cardápio pelo link de ativação que chega por e-mail.' },
  { titulo: 'Comece a vender', texto: 'A equipe publica a sua loja e você recebe o acesso ao painel.' },
];

const linkClass =
  'text-foreground underline decoration-neon-cyan/40 underline-offset-4 hover:text-neon-cyan';

export default async function CardapioPage({ params }) {
  const { locale } = await params;

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: 'Cardápio digital', path: '/cardapio' }]} />

      <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 sm:px-8">
        <header>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
            Para restaurantes e delivery
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Cardápio <span className="text-neon-cyan">digital</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Site profissional com cardápio online para o seu restaurante, lanchonete ou delivery.
            Veja grátis como fica o seu antes de contratar.
          </p>
        </header>

        <section className="mt-10 rounded-2xl border border-neon-cyan/30 bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="font-display text-5xl font-extrabold text-neon-cyan">{PRECO}</span>
            <span className="pb-1 text-lg text-muted-foreground">por mês</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Assinatura mensal cobrada no cartão de crédito pelo Stripe, até você cancelar.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`${CARDAPIO_URL}/criar-site`}
              className="rounded-xl bg-neon-cyan px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Ver meu cardápio grátis
            </a>
            <a
              href={`${CARDAPIO_URL}/hamburgueria`}
              className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-neon-cyan"
            >
              Ver um exemplo
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">A prévia é grátis e não pede cartão.</p>
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

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Como funciona</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2">
            {PASSOS.map((passo, i) => (
              <li key={passo.titulo} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="font-display text-2xl font-extrabold text-neon-cyan">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{passo.titulo}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{passo.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold">Contratação e cancelamento</h2>
          <p className="mt-3 text-muted-foreground">
            Preço, cobrança, cancelamento e reembolso estão nos{' '}
            <a href={`${CARDAPIO_URL}/termos-de-contratacao`} className={linkClass}>
              Termos de Contratação
            </a>
            , que você aceita antes do pagamento. Dúvidas? Fale com a gente pelo{' '}
            <a href={withLocale(locale, '/contato')} className={linkClass}>
              contato
            </a>
            .
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
