import data from '@/data/static-data.json';
import { SITE_NAME } from '@/lib/seo';

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: data.hero.description,
    start_url: '/',
    display: 'standalone',
    background_color: 'hsl(222, 52%, 4%)',
    theme_color: 'hsl(180, 100%, 50%)',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
