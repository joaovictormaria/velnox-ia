import { scryptSync, timingSafeEqual } from 'node:crypto';

export function verifyAdminCredentials(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedUsername || !storedHash) return false;
  if (typeof username !== 'string' || typeof password !== 'string') return false;

  const [salt, hashHex] = storedHash.split(':');
  if (!salt || !hashHex) return false;

  const usernameMatches = username === expectedUsername;
  const derivedHex = scryptSync(password, salt, 64).toString('hex');
  const derivedBuf = Buffer.from(derivedHex, 'hex');
  const storedBuf = Buffer.from(hashHex, 'hex');
  const passwordMatches =
    derivedBuf.length === storedBuf.length && timingSafeEqual(derivedBuf, storedBuf);

  return usernameMatches && passwordMatches;
}
