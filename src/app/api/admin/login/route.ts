import { NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { success: true, message: 'Authenticated' },
      { status: 200 }
    );

    // Set cookies for admin session
    // httpOnly cookie for backend verification
    response.cookies.set('admin-auth-secure', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    // Non-httpOnly cookie for frontend detection
    response.cookies.set('admin-auth', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
