import { Analytics } from '@vercel/analytics/next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import '@/app/globals.css';
import HashScrollFix from '@/components/HashScrollFix';
import WhatsappFloatButton from '@/components/WhatsappFloatButton';
import data from '@/data/static-data.json';
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from '@/lib/seo';
import { organizationSchema, websiteSchema } from '@/lib/jsonld';

const fullTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: fullTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: data.hero.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_NAME,
    url: '/',
    title: fullTitle,
    description: data.hero.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: fullTitle,
    description: data.hero.description,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-background text-foreground font-body bg-fixed bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.04),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(255,0,255,0.04),transparent_50%)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <HashScrollFix />
        {children}
        <WhatsappFloatButton />
        <Analytics />
      </body>
    </html>
  );
}
