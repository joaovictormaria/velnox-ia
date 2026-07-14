import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE_NAME = 'velnox_admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function sign(payloadB64url) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return createHmac('sha256', secret).update(payloadB64url).digest('hex');
}

export function signSession(username) {
  const payload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const payloadB64url = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(payloadB64url);
  return `${payloadB64url}.${signature}`;
}

export function verifySession(cookieValue) {
  if (!cookieValue) return null;

  const parts = cookieValue.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64url, signature] = parts;

  try {
    const expected = sign(payloadB64url);
    const expectedBuf = Buffer.from(expected, 'hex');
    const actualBuf = Buffer.from(signature, 'hex');
    if (expectedBuf.length !== actualBuf.length || !timingSafeEqual(expectedBuf, actualBuf)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadB64url, 'base64url').toString('utf8'));
    if (typeof payload.exp !== 'number' || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    if (typeof payload.u !== 'string' || payload.u !== process.env.ADMIN_USERNAME) {
      return null;
    }

    return { username: payload.u };
  } catch {
    return null;
  }
}

/** @returns {{httpOnly: true, secure: boolean, sameSite: 'lax', path: string, maxAge: number}} */
export function sessionCookieOptions(isHttps) {
  return {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
