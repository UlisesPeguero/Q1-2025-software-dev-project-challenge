import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth/validation';

const publicRoutes = ['/login', '/signup'];

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);
  const session = await validateSession();
  const isAuthenticated = session?.isAuthenticated;
  //console.log('Middleware', { pathname, isPublicRoute, isAuthenticated });
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  } // is a secure route and is not logged in, send to login

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  } // is not a secure route and is logged in, return to /

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
