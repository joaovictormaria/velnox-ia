import { NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/lib/auth';
import { SESSION_COOKIE_NAME, sessionCookieOptions, signSession } from '@/lib/session';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_credentials' }, { status: 401 });
  }

  const { username, password } = body ?? {};

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json({ ok: false, error: 'invalid_credentials' }, { status: 401 });
  }

  const isHttps = request.nextUrl.protocol === 'https:';
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, signSession(username), sessionCookieOptions(isHttps));
  return response;
}
