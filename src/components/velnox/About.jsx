import React from 'react';
import { Zap, Moon, Target, Eye, Heart } from 'lucide-react';

const values = [
  { icon: Target, title: 'Missão', text: 'Democratizar o acesso a tecnologia de ponta para empresas de todos os tamanhos.' },
  { icon: Eye, title: 'Visão', text: 'Ser referência em desenvolvimento web inovador e de alta performance no Brasil.' },
  { icon: Heart, title: 'Valores', text: 'Velocidade, inovação, transparência e compromisso com resultados reais.' },
];

export default function About() {
  return (
    <section id="sobre" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Sobre a <span className="gradient-text">VELNOX.IA</span></h2>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-card-highlight p-8 md:p-12 rounded-3xl text-center">
            <p className="text-sm text-muted-foreground mb-6">Você sabe o que significa VELNOX?</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-neon-cyan mb-2">VEL</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                  <Zap className="w-4 h-4 text-neon-cyan" /> Velocidade
                </div>
              </div>
              <div className="font-display text-3xl text-muted-foreground hidden md:block">+</div>
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-neon-magenta mb-2">NOX</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                  <Moon className="w-4 h-4 text-neon-magenta" /> Noite (latim)
                </div>
              </div>
            </div>
            <p className="font-display text-2xl md:text-3xl font-bold gradient-text">
              "A velocidade nunca dorme."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div key={value.title} className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}