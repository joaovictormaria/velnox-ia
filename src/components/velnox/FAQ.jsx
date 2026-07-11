import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Qual plano devo escolher?', a: 'Depende do seu objetivo. Para uma página de captura, o Launch é ideal. Para empresas que precisam de um site completo, o Business. Para plataformas e sistemas, o Premium. E para startups, o MVP.' },
  { q: 'Quanto tempo leva a entrega?', a: 'O Launch é entregue em 3-5 dias úteis, o Business em 7-15 dias úteis. Os planos Premium e MVP variam conforme o escopo do projeto.' },
  { q: 'Preciso de hospedagem?', a: 'Sim! A hospedagem é onde seu site fica disponível na internet. Oferecemos hospedagem premium por R$ 185/mês com SSL, backups e suporte inclusos.' },
  { q: 'Posso editar meu site?', a: 'Sim! Nos planos Business e Premium você tem um painel administrativo para alterar textos, fotos e gerenciar conteúdo sem depender de código.' },
  { q: 'O que é um MVP?', a: 'MVP significa Produto Mínimo Viável. É uma versão funcional do seu produto que permite validar sua ideia no mercado com rapidez e baixo custo, ideal para startups.' },
  { q: 'Como funciona o pagamento?', a: 'O pagamento é dividido em duas partes: o investimento único no desenvolvimento e a hospedagem mensal. Aceitamos PIX, cartão e boleto.' },
  { q: 'Meu site aparece no Google?', a: 'Sim! Todos os nossos sites são desenvolvidos com estrutura preparada para SEO, incluindo sitemap, tags otimizadas e performance de acordo com as Web Vitals do Google.' },
  { q: 'O site funciona no celular?', a: 'Sim! Todos os nossos sites são 100% responsivos, funcionando perfeitamente em desktops, tablets e celulares.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative py-24 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Perguntas <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">Frequentes</span></h2>
          <p className="text-muted-foreground">Tire suas dúvidas sobre nossos serviços.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-xl border border-border rounded-xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium text-foreground pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-neon-cyan transition-transform shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}