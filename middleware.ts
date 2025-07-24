import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // ✅ 1. Only allow access to `/admin` if URL contains correct ?key=
  if (pathname === '/admin') {
    const paramName = process.env.NEXT_PUBLIC_PARAM || '';
    const expectedKey = process.env.NEXT_PUBLIC_KEY;
    const actualKey = searchParams.get(paramName);

    if (actualKey !== expectedKey) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin'; // send them back to admin login page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*'],
};
