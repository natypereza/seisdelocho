import { NextResponse } from 'next/server';
import { verifySessionToken } from './admin-auth';

export function isAdminAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin-session=([^;]+)/);
  if (!match) return false;
  return verifySessionToken(match[1]);
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}
