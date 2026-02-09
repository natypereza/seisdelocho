export const ADMIN_PASSWORD = 'Ward';

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateAdminToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
