import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, sessionCookieOptions } from '@/lib/session';

export async function POST(request) {
  const isHttps = request.nextUrl.protocol === 'https:';
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, '', { ...sessionCookieOptions(isHttps), maxAge: 0 });
  return response;
}
