import { auth } from './auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (request.nextUrl.pathname.startsWith('/mypage')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (session?.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/mypage/:path*', '/admin/:path*'],
};
