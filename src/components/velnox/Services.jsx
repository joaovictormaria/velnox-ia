import React from 'react';
import { Code, Rocket, Layout, Search, Server, Cpu } from 'lucide-react';

const services = [
  { icon: Code, title: 'Desenvolvimento Web', description: 'Sites e sistemas desenvolvidos com tecnologia moderna e código limpo.' },
  { icon: Rocket, title: 'Landing Pages', description: 'Páginas de alto impacto focadas em conversão e captação de leads.' },
  { icon: Layout, title: 'Plataformas Web', description: 'Sistemas completos e personalizados para o seu negócio escalar.' },
  { icon: Search, title: 'SEO & Performance', description: 'Otimização para mecanismos de busca e máxima velocidade.' },
  { icon: Server, title: 'Hospedagem & Infra', description: 'Servidores premium com SSL, backups e monitoramento 24/7.' },
  { icon: Cpu, title: 'Integrações & APIs', description: 'Conecte seu site a pagamentos, CRMs e ferramentas externas.' },
];

export default function Services() {
  return (
    <section id="servicos" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Nossos <span className="gradient-text">Serviços</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Soluções completas para a presença digital do seu negócio.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="glass-card p-6 rounded-2xl hover:border-neon-cyan/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mb-4 group-hover:from-neon-cyan/30 group-hover:to-neon-magenta/30 transition-all">
                <service.icon className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}