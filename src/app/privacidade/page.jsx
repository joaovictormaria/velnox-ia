import React from 'react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, WHATSAPP_URL } from '@/lib/contact';

export const metadata = buildMetadata({
  title: 'Política de Privacidade',
  description: 'Como a VELNOX.IA trata os dados pessoais coletados através deste site.',
  path: '/privacidade',
});

const sections = [
  {
    title: '1. Quem trata seus dados',
    body: [
      'Este site é operado pela VELNOX.IA. Para qualquer dúvida sobre esta política ou sobre os dados que você nos enviou, entre em contato pelo e-mail informado no final desta página.',
    ],
  },
  {
    title: '2. Quais dados coletamos',
    body: [
      'Coletamos apenas os dados que você mesmo informa nos formulários de Contato e Orçamento: nome, e-mail, telefone (opcional), tipo de projeto e a mensagem que você escreve.',
      'Não usamos cookies de rastreamento, pixels de terceiros ou ferramentas de analytics neste site.',
    ],
  },
  {
    title: '3. Para que usamos esses dados',
    body: [
      'Os dados servem exclusivamente para entender sua solicitação e te responder — seja preparando uma proposta, seja tirando dúvidas sobre os planos.',
      'Ao enviar o formulário, os dados são usados para montar uma mensagem que abre diretamente no seu WhatsApp, endereçada ao nosso número de atendimento. Não existe banco de dados no servidor que armazene esse formulário: o texto é montado no seu próprio navegador e enviado por você.',
    ],
  },
  {
    title: '4. Com quem seus dados são compartilhados',
    body: [
      'A conversa segue pelo WhatsApp (Meta) ou pelo seu cliente de e-mail, que passam a processar essa comunicação conforme as próprias políticas de privacidade deles.',
      'Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing.',
    ],
  },
  {
    title: '5. Por quanto tempo guardamos seus dados',
    body: [
      'Como não operamos um banco de dados para os formulários, o único registro que existe é o histórico da própria conversa no WhatsApp ou e-mail, que você pode apagar a qualquer momento pelo seu aplicativo.',
    ],
  },
  {
    title: '6. Seus direitos (LGPD)',
    body: [
      'Você pode solicitar a qualquer momento: confirmação de que tratamos seus dados, acesso a eles, correção, ou exclusão do histórico de conversa que temos com você.',
      'Para exercer qualquer um desses direitos, é só chamar pelo e-mail ou WhatsApp informados abaixo.',
    ],
  },
  {
    title: '7. Alterações desta política',
    body: [
      'Podemos atualizar este texto para refletir mudanças no site ou na legislação. A data da última atualização fica sempre visível no topo desta página.',
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Política de Privacidade', path: '/privacidade' }]} />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Política de Privacidade</h1>
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
          Dúvidas sobre seus dados? Fale com a gente por{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-neon-cyan hover:underline">e-mail</a>
          {' '}ou{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">WhatsApp</a>.
        </div>
      </div>
    </SiteShell>
  );
}
