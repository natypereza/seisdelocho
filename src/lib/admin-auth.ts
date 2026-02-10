import { createHmac, timingSafeEqual } from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Ward';
const SESSION_SECRET = process.env.SESSION_SECRET || 'seisdelocho-secret-key-change-in-production';

export function verifyAdminPassword(password: string): boolean {
  const inputBuf = Buffer.from(password);
  const passwordBuf = Buffer.from(ADMIN_PASSWORD);

  if (inputBuf.length !== passwordBuf.length) {
    return false;
  }

  return timingSafeEqual(inputBuf, passwordBuf);
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = createHmac('sha256', SESSION_SECRET)
    .update(timestamp)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;

  const [timestamp, signature] = token.split('.');
  if (!timestamp || !signature) return false;

  // Token expires after 24 hours
  const tokenAge = Date.now() - parseInt(timestamp, 10);
  if (isNaN(tokenAge) || tokenAge > 24 * 60 * 60 * 1000) {
    return false;
  }

  const expectedSignature = createHmac('sha256', SESSION_SECRET)
    .update(timestamp)
    .digest('hex');

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expectedBuf.length) return false;

  return timingSafeEqual(sigBuf, expectedBuf);
}
