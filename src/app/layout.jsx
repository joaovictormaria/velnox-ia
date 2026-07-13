import '@/app/globals.css';
import HashScrollFix from '@/components/HashScrollFix';

export const metadata = {
  title: 'Velnox.IA — Desenvolvendo o Impossível',
  description: 'Desenvolvimento web de alta performance. Landing pages, sites institucionais e plataformas web sob medida.',
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground font-body bg-fixed bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.04),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(255,0,255,0.04),transparent_50%)]">
        <HashScrollFix />
        {children}
      </body>
    </html>
  );
}
