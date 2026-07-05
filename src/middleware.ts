import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public assets, APIs, admin, and auth routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/login' ||
    pathname === '/onboarding' ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') // allow static files (like images)
  ) {
    return NextResponse.next()
  }

  // Check for NextAuth session token or guest cookie
  const sessionToken = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');
  const guestToken = request.cookies.get('guest_access');

  if (!sessionToken && !guestToken) {
    // Redirect to login if neither is present
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
