import React from 'react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, WHATSAPP_URL } from '@/lib/contact';

export const metadata = buildMetadata({
  title: 'Termos de Uso',
  description: 'Condições de uso do site e dos serviços da VELNOX.IA.',
  path: '/termos',
});

const sections = [
  {
    title: '1. Sobre este site',
    body: [
      'Este site é um canal institucional da VELNOX.IA para apresentar serviços, planos e portfólio, além de receber pedidos de orçamento. Ao usá-lo, você concorda com estes termos.',
    ],
  },
  {
    title: '2. Planos e preços',
    body: [
      'Os valores exibidos em "Planos & Preços" são referências de ponto de partida. O escopo final, prazo e valor de cada projeto são confirmados em uma proposta personalizada, enviada após conversarmos sobre a sua necessidade.',
      'Os prazos de entrega informados (ex.: "3-5 dias", "7-15 dias") são estimativas por tipo de plano e podem variar conforme a complexidade do projeto combinado.',
    ],
  },
  {
    title: '3. Solicitação de orçamento',
    body: [
      'Ao preencher o formulário de Contato ou Orçamento, você concorda em ser contatado pela VELNOX.IA pelos canais informados (WhatsApp e/ou e-mail) para dar andamento à sua solicitação.',
      'O envio do formulário não representa contratação automática de nenhum serviço — a contratação só se confirma depois que ambas as partes acertam escopo, prazo e forma de pagamento.',
    ],
  },
  {
    title: '4. Propriedade intelectual',
    body: [
      'A marca VELNOX.IA, o conteúdo, textos e identidade visual deste site pertencem à VELNOX.IA e não podem ser reproduzidos sem autorização.',
      'Projetos exibidos no Portfólio são citados apenas com o consentimento do respectivo cliente.',
    ],
  },
  {
    title: '5. Links externos',
    body: [
      'Este site contém links para WhatsApp, Instagram e sites de projetos entregues. Cada um desses serviços tem seus próprios termos, sobre os quais a VELNOX.IA não tem controle.',
    ],
  },
  {
    title: '6. Limitação de responsabilidade',
    body: [
      'Fazemos o possível para manter as informações deste site atualizadas, mas elas podem mudar sem aviso prévio. Em caso de dúvida sobre um valor ou prazo, confirme diretamente com a gente antes de decidir.',
    ],
  },
  {
    title: '7. Legislação aplicável',
    body: [
      'Estes termos são regidos pela legislação brasileira.',
    ],
  },
];

export default function TermosPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Termos de Uso', path: '/termos' }]} />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mb-12">Última atualização: 14 de julho de 2026.</p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl font-semibold mb-3">{section.title}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
          Dúvidas sobre estes termos? Fale com a gente por{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-neon-cyan hover:underline">e-mail</a>
          {' '}ou{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">WhatsApp</a>.
        </div>
      </div>
    </SiteShell>
  );
}
