import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
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

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const guestToken = request.cookies.get('guest_access');

  if (!token && !guestToken) {
    // Redirect to login if neither is present
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Logged-in (non-guest) users must complete their profile before using the site
  if (token && (!token.name || !token.phoneNumber)) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
