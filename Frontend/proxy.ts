        import { NextRequest, NextResponse } from 'next/server'

        const AUTH_COOKIE = 'accessToken'

        function isAuthRoute(pathname: string): boolean {
          return pathname.startsWith('/auth')
        }

        const publicRoutes = ["/"];

        function isPublicRoute(pathname: string) {
          return publicRoutes.includes(pathname);
        } 

        export function middleware(request: NextRequest): NextResponse {
          const { pathname } = request.nextUrl
          const token = request.cookies.get(AUTH_COOKIE)?.value

          if (
            pathname.startsWith('/_next') ||
            pathname.startsWith('/api') ||
            pathname.includes('.')
          ) {
            return NextResponse.next();
          }

          if (!token) {

            if (isPublicRoute(pathname)) {
              return NextResponse.next();

            }
            // Unauthenticated: allow auth routes, protect everything else
            if (isAuthRoute(pathname)) {
              return NextResponse.next()
            }
            const loginUrl = new URL('/auth/login', request.url)
            loginUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(loginUrl)
          }

          // Authenticated: bounce away from auth pages
          if (isAuthRoute(pathname)) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
          }

          return NextResponse.next()
        }

        export const config = {
          matcher: [
            /*
            * Match all request paths EXCEPT:
            * - _next/static (static files)
            * - _next/image (image optimisation)
            * - favicon.ico
            * - public folder files (png, jpg, svg, etc.)
            * - /api routes (handled by NestJS backend or Next.js API)
            */
            '/((?!_next/static|_next/image|favicon\\.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
          ],
        }
