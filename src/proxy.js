import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/session';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/content';

// Runs on every page path (pages matcher) plus the admin API routes
// (second matcher) — everything else (static assets, /api/*) is skipped.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\..*).*)',
    '/api/admin/:path*',
  ],
};

const PUBLIC_ADMIN_PATHS = new Set(['/admin/login', '/api/admin/login']);
const LOCALE_COOKIE = 'NEXT_LOCALE';
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function toInternalPath(locale, pathname) {
  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
}

// Picks the first Accept-Language preference (in the visitor's own order of
// preference) that this site supports, defaulting to pt when none match.
function negotiateLocale(request) {
  const header = request.headers.get('accept-language');
  if (!header) return DEFAULT_LOCALE;

  const preferred = header
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase().slice(0, 2))
    .filter(Boolean);

  return preferred.find((lang) => LOCALES.includes(lang)) ?? DEFAULT_LOCALE;
}

function handleAdmin(request, pathname) {
  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySession(cookie);

  if (session) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin/')) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    return handleAdmin(request, pathname);
  }

  // Already under an explicit non-default locale prefix (/en, /es, /fr, /de) — serve as-is.
  const hasExplicitLocale = LOCALES.some(
    (l) => l !== DEFAULT_LOCALE && (pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  );
  if (hasExplicitLocale) {
    return NextResponse.next();
  }

  // First visit this session: negotiate a locale from Accept-Language. Redirect
  // (visible URL change) if it isn't pt, so a French browser lands on /fr/...
  // instead of the unprefixed pt URL. Remembered via cookie so navigating back
  // to a bare path later isn't bounced again.
  if (!request.cookies.has(LOCALE_COOKIE)) {
    const detected = negotiateLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = toInternalPath(detected, pathname);

    const response = detected === DEFAULT_LOCALE ? NextResponse.rewrite(url) : NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, detected, { maxAge: LOCALE_COOKIE_MAX_AGE, path: '/' });
    return response;
  }

  // No locale prefix in the URL — this is a pt-BR route, rewritten internally
  // to /pt/... so the visible URL stays exactly as it's always been (/, /servicos, ...).
  const url = request.nextUrl.clone();
  url.pathname = toInternalPath(DEFAULT_LOCALE, pathname);
  return NextResponse.rewrite(url);
}
