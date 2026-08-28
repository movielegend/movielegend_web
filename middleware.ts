import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Decode JWT payload without Node crypto dependency in Edge middleware
      const base64Payload = token.split('.')[1];
      if (!base64Payload) {
        throw new Error('Invalid token structure');
      }

      const decodedJson = Buffer.from(base64Payload, 'base64').toString('utf8');
      const payload = JSON.parse(decodedJson);

      const isExpired = payload.exp && payload.exp * 1000 < Date.now();
      const isAdminOrStaff = ['Admin', 'Super Admin', 'Staff'].includes(payload.role);

      if (isExpired || !isAdminOrStaff) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (err) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
