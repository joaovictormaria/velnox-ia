/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: '0.75rem',
        md: 'calc(0.75rem - 2px)',
        sm: 'calc(0.75rem - 4px)'
      },
      colors: {
        background: 'hsl(222 52% 4%)',
        foreground: 'hsl(0 0% 98%)',
        card: {
          DEFAULT: 'hsl(222 44% 8%)',
          foreground: 'hsl(0 0% 98%)'
        },
        popover: {
          DEFAULT: 'hsl(222 44% 8%)',
          foreground: 'hsl(0 0% 98%)'
        },
        primary: {
          DEFAULT: 'hsl(184 80% 56%)',
          foreground: 'hsl(222 52% 4%)'
        },
        secondary: {
          DEFAULT: 'hsl(314 94% 53%)',
          foreground: 'hsl(0 0% 98%)'
        },
        muted: {
          DEFAULT: 'hsl(222 30% 12%)',
          foreground: 'hsl(220 10% 65%)'
        },
        accent: {
          DEFAULT: 'hsl(314 94% 53%)',
          foreground: 'hsl(0 0% 98%)'
        },
        destructive: {
          DEFAULT: 'hsl(0 84% 60%)',
          foreground: 'hsl(0 0% 98%)'
        },
        border: 'hsl(222 30% 15%)',
        input: 'hsl(222 30% 15%)',
        ring: 'hsl(184 80% 56%)',
        // Amostrados de src/images/velox.png: o ciano e a cor do wordmark
        // "VELNOX.IA" (#36DEE9), o magenta e o extremo do degrade do "V"
        // (#F915C3). O violeta #9A77D6 e o ponto medio do mesmo degrade.
        neon: {
          cyan: 'hsl(184 80% 56%)',
          violet: 'hsl(263 53% 65%)',
          magenta: 'hsl(314 94% 53%)',
          // Variantes escuras para uso sobre fundo claro: os tons originais dao
          // 1.7:1 (ciano) e 3.9:1 (magenta) sobre branco, ambos ilegiveis.
          // Estes dao 5.2:1 e 4.9:1, acima do minimo da WCAG.
          'cyan-ink': 'hsl(184 80% 28%)',
          'magenta-ink': 'hsl(314 80% 45%)',
          // Azul do meio do degrade do "V" (hsl(232 54% 68%)) escurecido para
          // servir de cor de texto sobre fundo claro, no lugar dos cinzas
          // neutros. 14.4:1 para titulos e 10.2:1 para corpo, sobre slate-50.
          'blue-ink': 'hsl(232 55% 22%)',
          'blue-ink-soft': 'hsl(232 55% 35%)'
        }
      },
      backgroundImage: {
        // Paleta amostrada de src/images/velox.png: o "V" percorre um arco de
        // matiz de 181deg (ciano #2BE9EB, no vertice) a 314deg (magenta #F915C3,
        // no braco direito), passando por violeta #9A77D6. As camadas abaixo
        // repetem esse arco em luminosidade baixa, para servir de fundo sem
        // competir com o texto.
        'velnox-glow': [
          'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(43, 233, 235, 0.10), transparent 60%)',
          'radial-gradient(ellipse 90% 55% at 88% 100%, rgba(249, 21, 195, 0.08), transparent 60%)',
          'linear-gradient(160deg, hsl(190 45% 5%) 0%, hsl(215 45% 5%) 45%, hsl(235 35% 5%) 100%)'
        ].join(', '),
        // Fundos de secao: um veu branco muito baixo (que e o que "levanta" a
        // secao do fundo preto da pagina) somado a brilhos nas cores da marca.
        // Duas variantes para alternar entre secoes vizinhas e criar ritmo.
        // O branco vai ate 16%: acima disso o texto secundario
        // (hsl(220 10% 65%)) cai abaixo dos 4.5:1 exigidos pela WCAG sobre o
        // fundo resultante. Abaixo de ~8% o veu simplesmente nao e percebido
        // sobre o quase-preto da pagina.
        // Branco 14% no pico com brilhos de 5%: e o par mais claro que ainda
        // mantem o texto secundario (hsl(220 10% 65%)) acima dos 4.5:1 da WCAG
        // onde os dois se sobrepoem. Abaixo de ~8% de branco o veu nao chega a
        // ser percebido sobre o quase-preto da pagina.
        'velnox-section-a': [
          'radial-gradient(ellipse 70% 60% at 15% 0%, rgba(43, 233, 235, 0.05), transparent 60%)',
          'radial-gradient(ellipse 70% 60% at 85% 100%, rgba(249, 21, 195, 0.05), transparent 60%)',
          'linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.10) 60%, rgba(255, 255, 255, 0.07) 100%)'
        ].join(', '),
        'velnox-section-b': [
          'radial-gradient(ellipse 70% 60% at 85% 0%, rgba(43, 233, 235, 0.05), transparent 60%)',
          'radial-gradient(ellipse 70% 60% at 15% 100%, rgba(249, 21, 195, 0.04), transparent 60%)',
          'linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.10) 50%, rgba(255, 255, 255, 0.14) 100%)'
        ].join(', '),
        // Fio de luz que separa secoes: percorre o mesmo arco de matiz do "V"
        // (ciano -> violeta -> magenta) e desvanece nas pontas.
        'velnox-rule': [
          'linear-gradient(90deg,',
          'transparent 0%,',
          'hsl(184 80% 56% / 0.75) 22%,',
          'hsl(263 53% 65% / 0.95) 50%,',
          'hsl(314 94% 53% / 0.75) 78%,',
          'transparent 100%)'
        ].join(' ')
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-heading)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' }
        },
        'worm-flow': {
          to: { strokeDashoffset: '-320' }
        },
        // Corrente na linha que liga o card ao painel. O deslocamento (-40) e
        // multiplo exato do padrao de traco (6+14=20), entao o ciclo fecha sem
        // salto visivel na emenda.
        'energy-flow': {
          to: { strokeDashoffset: '-40' }
        },
        // Superficie da agua na borda da secao Sobre. O deslocamento e de
        // exatamente metade da largura do SVG, que contem dois periodos
        // identicos da onda — assim o fim do ciclo cai igual ao inicio.
        'water-drift': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        // synced to the cyan wave path (baseline 150/300, amplitude 110/300, period 720/1600)
        'sail-right': {
          '0%': { left: '-8.00%', top: '50.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg)' },
          '5%': { left: '-2.35%', top: '26.42%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '10%': { left: '3.30%', top: '13.88%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' },
          '15%': { left: '8.95%', top: '18.24%', transform: 'translate(-50%, -50%) rotate(7.0deg)' },
          '20%': { left: '14.60%', top: '37.46%', transform: 'translate(-50%, -50%) rotate(13.2deg)' },
          '25%': { left: '20.25%', top: '62.54%', transform: 'translate(-50%, -50%) rotate(13.2deg)' },
          '30%': { left: '25.90%', top: '81.76%', transform: 'translate(-50%, -50%) rotate(7.0deg)' },
          '35%': { left: '31.55%', top: '86.12%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' },
          '40%': { left: '37.20%', top: '73.58%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '45%': { left: '42.85%', top: '50.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg)' },
          '50%': { left: '48.50%', top: '26.42%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '55%': { left: '54.15%', top: '13.88%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' },
          '60%': { left: '59.80%', top: '18.24%', transform: 'translate(-50%, -50%) rotate(7.0deg)' },
          '65%': { left: '65.45%', top: '37.46%', transform: 'translate(-50%, -50%) rotate(13.2deg)' },
          '70%': { left: '71.10%', top: '62.54%', transform: 'translate(-50%, -50%) rotate(13.2deg)' },
          '75%': { left: '76.75%', top: '81.76%', transform: 'translate(-50%, -50%) rotate(7.0deg)' },
          '80%': { left: '82.40%', top: '86.12%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' },
          '85%': { left: '88.05%', top: '73.58%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '90%': { left: '93.70%', top: '50.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg)' },
          '95%': { left: '99.35%', top: '26.42%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '100%': { left: '105.00%', top: '13.88%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' }
        },
        // synced to the magenta wave path (baseline 90/300, amplitude ~90/300, period 800/1600), travels right to left
        'sail-left': {
          '0%': { left: '105.00%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(14.0deg) scaleX(-1)' },
          '5%': { left: '99.35%', top: '46.46%', transform: 'translate(-50%, -50%) rotate(11.3deg) scaleX(-1)' },
          '10%': { left: '93.70%', top: '56.63%', transform: 'translate(-50%, -50%) rotate(4.3deg) scaleX(-1)' },
          '15%': { left: '88.05%', top: '56.63%', transform: 'translate(-50%, -50%) rotate(-4.3deg) scaleX(-1)' },
          '20%': { left: '82.40%', top: '46.46%', transform: 'translate(-50%, -50%) rotate(-11.3deg) scaleX(-1)' },
          '25%': { left: '76.75%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg) scaleX(-1)' },
          '30%': { left: '71.10%', top: '13.54%', transform: 'translate(-50%, -50%) rotate(-11.3deg) scaleX(-1)' },
          '35%': { left: '65.45%', top: '3.37%', transform: 'translate(-50%, -50%) rotate(-4.3deg) scaleX(-1)' },
          '40%': { left: '59.80%', top: '3.37%', transform: 'translate(-50%, -50%) rotate(4.3deg) scaleX(-1)' },
          '45%': { left: '54.15%', top: '13.54%', transform: 'translate(-50%, -50%) rotate(11.3deg) scaleX(-1)' },
          '50%': { left: '48.50%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(14.0deg) scaleX(-1)' },
          '55%': { left: '42.85%', top: '46.46%', transform: 'translate(-50%, -50%) rotate(11.3deg) scaleX(-1)' },
          '60%': { left: '37.20%', top: '56.63%', transform: 'translate(-50%, -50%) rotate(4.3deg) scaleX(-1)' },
          '65%': { left: '31.55%', top: '56.63%', transform: 'translate(-50%, -50%) rotate(-4.3deg) scaleX(-1)' },
          '70%': { left: '25.90%', top: '46.46%', transform: 'translate(-50%, -50%) rotate(-11.3deg) scaleX(-1)' },
          '75%': { left: '20.25%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg) scaleX(-1)' },
          '80%': { left: '14.60%', top: '13.54%', transform: 'translate(-50%, -50%) rotate(-11.3deg) scaleX(-1)' },
          '85%': { left: '8.95%', top: '3.37%', transform: 'translate(-50%, -50%) rotate(-4.3deg) scaleX(-1)' },
          '90%': { left: '3.30%', top: '3.37%', transform: 'translate(-50%, -50%) rotate(4.3deg) scaleX(-1)' },
          '95%': { left: '-2.35%', top: '13.54%', transform: 'translate(-50%, -50%) rotate(11.3deg) scaleX(-1)' },
          '100%': { left: '-8.00%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(14.0deg) scaleX(-1)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        // Fundo da secao de planos. Em CSS e nao em JS: sao mais de vinte
        // elementos em laco infinito, e o compositor do navegador da conta
        // disso sem envolver a thread principal a cada quadro.
        'orb-drift': {
          '0%, 100%': { opacity: '0.18', transform: 'translate(0, 0) scale(1)' },
          '25%': { opacity: '0.42', transform: 'translate(40px, -30px) scale(1.15)' },
          '50%': { opacity: '0.28', transform: 'translate(-30px, 40px) scale(0.9)' },
          '75%': { opacity: '0.4', transform: 'translate(20px, -20px) scale(1.1)' }
        },
        'grid-pan': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '60px 60px' }
        },
        'particle-rise': {
          '0%, 100%': { opacity: '0', transform: 'translateY(0)' },
          '50%': { opacity: '0.6', transform: 'translateY(-30px)' }
        },
        'sheen-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' }
        },
        // Entrada do modal: sobe de baixo enquanto cresce e aparece.
        'modal-rise': {
          '0%': { opacity: '0', transform: 'translateY(48px) scale(0.94)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        // O fundo escurece antes, em ritmo proprio — se os dois entrassem na
        // mesma curva, o painel pareceria colado no veu em vez de vir de tras.
        'modal-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        // Abertura do site. A logo entra em linha reta pela esquerda...
        'intro-logo-in': {
          '0%': { opacity: '0', transform: 'translateX(-62vw)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        // ...depois respira devagar, variando brilho junto com a escala.
        'intro-logo-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 8px rgba(53, 221, 233, 0.45))'
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0 0 24px rgba(53, 221, 233, 0.9))'
          }
        },
        // ...e some estourando. 0.16s de proposito: tem que ler como um estalo,
        // nao como uma transicao.
        'intro-logo-burst': {
          '0%': { opacity: '1', transform: 'scale(1)', filter: 'drop-shadow(0 0 12px rgba(53, 221, 233, 0.9))' },
          '100%': { opacity: '0', transform: 'scale(2.6)', filter: 'drop-shadow(0 0 70px rgba(53, 221, 233, 0))' }
        },
        // As ondas estouram junto com a logo, no mesmo instante e na mesma
        // duracao. O translateY(-50%) e repetido dentro do keyframe porque a
        // animacao substitui o transform do utilitario `-translate-y-1/2` — sem
        // ele a faixa perderia a centralizacao e saltaria no primeiro quadro.
        'intro-waves-burst': {
          '0%': { opacity: '1', transform: 'translateY(-50%) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-50%) scale(2.8)' }
        },
        // Saida: desliza para fora pela direita, sem encolher nem girar.
        // 100vw garante que saia da tela em qualquer largura — o painel parte do
        // centro, entao precisa vencer meia tela mais a propria metade.
        'modal-slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100vw)' }
        },
        'modal-veil-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        // Cada fileira do mosaico desliza para a esquerda exatamente o passo do
        // padrao de cores (--shift). Como o padrao se repete nesse mesmo passo,
        // o fim do ciclo cai identico ao inicio e o loop nao tem emenda.
        'tile-slide': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(var(--shift, 0px))' }
        },
        'blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' }
        },
        // Lampada de neon prestes a queimar: fica acesa com brilho quase todo o
        // ciclo e falha em 3 momentos curtos. Sao 3 falhas a cada 5s — bem
        // abaixo do limite de 3 flashes por segundo da WCAG.
        'flicker': {
          '0%, 15%, 19%, 21%, 54%, 58%, 100%': {
            opacity: '1',
            textShadow: '0 0 5px currentColor, 0 0 14px currentColor, 0 0 26px currentColor'
          },
          '17%, 20%, 56%': {
            opacity: '0.22',
            textShadow: 'none'
          }
        },
        // Versoes para fundo claro: mesma cadencia de falhas, mas o halo usa a
        // cor neon CLARA da marca em vez de currentColor. Como o texto ali e o
        // tom -ink (escuro), currentColor produziria um borrao escuro; o neon
        // claro produz o halo aceso de um letreiro sobre superficie clara.
        'flicker-cyan': {
          '0%, 15%, 19%, 21%, 54%, 58%, 100%': {
            opacity: '1',
            textShadow: '0 0 8px rgba(53, 221, 233, 0.55), 0 0 22px rgba(53, 221, 233, 0.35)'
          },
          '17%, 20%, 56%': { opacity: '0.3', textShadow: 'none' }
        },
        // Mesma cadencia das outras, mas para IMAGEM: text-shadow nao afeta
        // <img>, entao o halo vem de drop-shadow, que segue o recorte alpha do
        // PNG em vez de desenhar um retangulo.
        'flicker-logo': {
          '0%, 15%, 19%, 21%, 54%, 58%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 6px rgba(53, 221, 233, 0.55)) drop-shadow(0 0 18px rgba(53, 221, 233, 0.35))'
          },
          '17%, 20%, 56%': { opacity: '0.25', filter: 'none' }
        },
        'flicker-magenta': {
          '0%, 15%, 19%, 21%, 54%, 58%, 100%': {
            opacity: '1',
            textShadow: '0 0 8px rgba(248, 22, 195, 0.5), 0 0 22px rgba(248, 22, 195, 0.3)'
          },
          '17%, 20%, 56%': { opacity: '0.3', textShadow: 'none' }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'worm-flow': 'worm-flow 4s linear infinite',
        'energy-flow': 'energy-flow 0.7s linear infinite',
        'water-drift': 'water-drift 14s linear infinite',
        'sail-right': 'sail-right 9s linear infinite',
        'sail-left': 'sail-left 11s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'orb-drift': 'orb-drift 20s ease-in-out infinite',
        'grid-pan': 'grid-pan 7s linear infinite',
        'particle-rise': 'particle-rise 10s ease-in-out infinite',
        'sheen-sweep': 'sheen-sweep 12s ease-in-out infinite',
        'tile-slide': 'tile-slide 20s linear infinite',
        // `both` para o estado inicial valer antes do primeiro quadro, senao o
        // painel pisca na posicao final antes de comecar a subir.
        'modal-rise': 'modal-rise 0.42s cubic-bezier(0.22, 1, 0.36, 1) both',
        'modal-fade': 'modal-fade 0.25s ease-out both',
        // `ease-in` acelera ao sair, que e como algo empurrado se comporta.
        // A duracao tem que casar com o timeout que desmonta o modal.
        'intro-logo-in': 'intro-logo-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'intro-logo-pulse': 'intro-logo-pulse 1.7s ease-in-out infinite',
        'intro-logo-burst': 'intro-logo-burst 0.16s ease-out both',
        'intro-waves-burst': 'intro-waves-burst 0.16s ease-out both',
        'modal-slide-out': 'modal-slide-out 0.45s cubic-bezier(0.45, 0, 0.75, 0) both',
        'modal-veil-out': 'modal-veil-out 0.45s ease-in both',
        'blink': 'blink 1s step-end infinite',
        // step-end, nao linear: com linear o navegador interpola a opacidade
        // entre os keyframes e o efeito vira um desvanecer suave. Com step-end
        // o valor salta, que e o corte seco de lampada falhando.
        'flicker': 'flicker 5s step-end infinite',
        'flicker-cyan': 'flicker-cyan 5s step-end infinite',
        'flicker-logo': 'flicker-logo 5s step-end infinite',
        'flicker-magenta': 'flicker-magenta 5s step-end infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
