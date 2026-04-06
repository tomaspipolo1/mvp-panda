import { PORTAL_BASE_PATH } from "@/lib/portal-path"

/** Para `window.location` u ortras APIs que no aplican `basePath` de Next. */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) {
    return `${PORTAL_BASE_PATH}/${path}`
  }
  return `${PORTAL_BASE_PATH}${path}`
}
