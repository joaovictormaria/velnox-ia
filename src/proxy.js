import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/session';

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

const PUBLIC_PATHS = new Set(['/admin/login', '/api/admin/login']);

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
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
