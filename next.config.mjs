import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

function buildSecurityHeaders(isDev) {
  return [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self'",
        "img-src 'self' data:",
        `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
        "style-src 'self' 'unsafe-inline'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; '),
    },
  ];
}

/** @type {(phase: string) => import('next').NextConfig} */
export default function nextConfig(phase) {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    images: {
      formats: ['image/avif', 'image/webp'],
      // O Next 16 so aceita valores de `quality` declarados aqui — qualquer
      // outro cai no padrao (75) sem erro. 85 e usado nas capas do portfolio,
      // que sao screenshots com texto miudo, onde 75 deixa artefato visivel.
      qualities: [75, 85],
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: buildSecurityHeaders(isDev),
        },
      ];
    },
  };
}
