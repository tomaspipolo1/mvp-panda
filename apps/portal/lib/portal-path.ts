export const PORTAL_BASE_PATH = "/portal"

export function normalizePortalPath(pathname: string): string {
  if (!pathname) return "/"
  if (pathname === PORTAL_BASE_PATH) return "/"
  if (pathname.startsWith(`${PORTAL_BASE_PATH}/`)) {
    return pathname.slice(PORTAL_BASE_PATH.length)
  }
  return pathname
}

/** Rutas públicas bajo `/portal` (Vercel enruta ahí; sin `basePath` por `builds` en vercel.json). */
export function toPortalPath(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  if (normalized === "/") return PORTAL_BASE_PATH
  if (normalized === PORTAL_BASE_PATH || normalized.startsWith(`${PORTAL_BASE_PATH}/`)) {
    return normalized
  }
  return `${PORTAL_BASE_PATH}${normalized}`
}

export function toPortalAssetPath(assetPath: string): string {
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`
  return toPortalPath(normalized)
}
