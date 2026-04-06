export const PORTAL_BASE_PATH = "/portal"

export function normalizePortalPath(pathname: string): string {
  if (!pathname) return "/"
  if (pathname === PORTAL_BASE_PATH) return "/"
  if (pathname.startsWith(`${PORTAL_BASE_PATH}/`)) {
    return pathname.slice(PORTAL_BASE_PATH.length)
  }
  return pathname
}

/** Rutas para `Link` y `router.*`: sin prefijo; Next aplica `basePath` en next.config. */
export function toPortalPath(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  if (normalized === PORTAL_BASE_PATH) return "/"
  if (normalized.startsWith(`${PORTAL_BASE_PATH}/`)) {
    return normalized.slice(PORTAL_BASE_PATH.length) || "/"
  }
  return normalized
}

export function toPortalAssetPath(assetPath: string): string {
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`
  return toPortalPath(normalized)
}
