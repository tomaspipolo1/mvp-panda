import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * En Vercel, el portal vive bajo `/portal/*`. Los enlaces sin prefijo caen en la landing;
 * redirigimos al namespace del portal (sin `basePath` en Next por `builds` en vercel.json).
 */
const portalAtRoot = /^\/(admin|cliente|proveedor|usuario-basico|empresa-servicios-portuarios|empleado-[a-z0-9-]+)(\/|$)/i

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (portalAtRoot.test(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = `/portal${pathname}`
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
