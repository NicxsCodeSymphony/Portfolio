import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === '/admin') {
    const paramName = process.env.NEXT_PUBLIC_PARAM || '';
    const expectedKey = process.env.NEXT_PUBLIC_KEY;

    const actualKey = searchParams.get(paramName);

    if (actualKey !== expectedKey) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin'],
};
