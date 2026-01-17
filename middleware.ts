import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Utilidad para obtener el token de auth (ejemplo: cookie, header, etc.)
function getAuthToken(request: NextRequest) {
  // Aquí deberías usar cookies seguras, JWT, etc. Ejemplo simple:
  return request.cookies.get('authToken')?.value || null;
}

// Utilidad para obtener el rol (ejemplo: cookie, header, etc.)
function getUserRole(request: NextRequest) {
  return request.cookies.get('userRole')?.value || null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = !!getAuthToken(request);
  const userRole = getUserRole(request);
  const isDev = process.env.NODE_ENV === 'development';

  // Rutas públicas
  if (pathname.startsWith('/login')) return NextResponse.next();

  // Rutas internas solo en dev/flag
  if (pathname.startsWith('/internal') && !isDev) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Rutas protegidas (core app)
  if (
    pathname.startsWith('/(app)') ||
    pathname === '/' ||
    pathname.startsWith('/explore')
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Rutas admin solo para rol admin
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
