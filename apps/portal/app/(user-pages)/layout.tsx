"use client"

import type React from "react"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { normalizePortalPath, toPortalPath } from "@/lib/portal-path"

export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const normalizedPathname = normalizePortalPath(pathname || "/")
  const [headerHeight, setHeaderHeight] = useState(64) // Altura inicial del header (16 * 4 = 64px)

  const segmentLabels: Record<string, string> = {
    home: "Home",
    admin: "Admin",
    gestion: "Gestión",
    facturacion: "Facturación",
    "mi-cuenta-corriente": "Mi cuenta corriente",
    perfil: "Perfil",
    "datos-personales": "Datos personales",
    proveedores: "Proveedores",
    usuarios: "Usuarios",
    estaticos: "Estáticos",
    logs: "Logs",
    aplicativos: "Aplicativos",
    "flujos-aprobacion": "Flujos de aprobación",
    nuevo: "Nuevo",
    listado: "Listado",
    visitas: "Visitas",
    solicitudes: "Solicitudes",
    tramites: "Trámites",
    altas: "Altas",
    eventos: "Eventos",
    "empleado": "Empleado",
    "empleado-compras": "Empleado - Compras",
    "empleado-prensa": "Empleado - Prensa",
    "empleado-seguridad": "Empleado - Seguridad",
    "empleado-guardia": "Empleado - Guardia",
    "empleado-gerente": "Empleado - Gerente",
    "empleado-contable": "Empleado - Contable",
    "empleado-rrhh": "Empleado - RRHH",
    "empleado-mesa-entradas": "Empleado - Mesa de Entradas",
    "empleado-legales": "Empleado - Legales",
    "empresa-servicios-portuarios": "Empresa Servicios Portuarios",
    "usuario-basico": "Usuario Básico",
    cliente: "Cliente",
    proveedor: "Proveedor",
  }

  const formatSegment = (segment: string) => {
    const decoded = decodeURIComponent(segment)
    const lower = decoded.toLowerCase()
    if (segmentLabels[lower]) return segmentLabels[lower]
    return decoded
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  }

  const breadcrumbs = useMemo(() => {
    if (!pathname) return []
    const segments = pathname.split("/").filter(Boolean)
    const trail = [{ href: toPortalPath("/"), label: "Home" }]
    let accumulator = ""
    segments.forEach((seg) => {
      accumulator += `/${seg}`
      trail.push({ href: accumulator, label: formatSegment(seg) })
    })
    return trail
  }, [pathname])

  // Determinar el tipo de usuario basado en la ruta actual
  const getUserTypeFromPath = (path: string) => {
    if (path.includes("/empleado-prensa")) return "Empleado - Prensa"
    if (path.includes("/empleado-contable")) return "Empleado - Contable"
    return "Empleado - Prensa"
  }

  const [currentUser, setCurrentUser] = useState(getUserTypeFromPath(normalizedPathname))

  // Actualizar el tipo de usuario cuando cambia la ruta
  useEffect(() => {
    setCurrentUser(getUserTypeFromPath(normalizedPathname))
  }, [normalizedPathname])

  // MVP: bloquear navegación a rutas fuera de Prensa/Contable.
  useEffect(() => {
    if (!normalizedPathname) return
    const allowedPrefixes = ["/empleado-prensa", "/empleado-contable"]
    const isAllowed = allowedPrefixes.some((prefix) => normalizedPathname.startsWith(prefix))
    if (!isAllowed) {
      router.replace(toPortalPath("/empleado-prensa"))
    }
  }, [normalizedPathname, router])

  // Efecto para detectar el scroll y ajustar el contenido principal
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setHeaderHeight(isScrolled ? 48 : 64) // 12 * 4 = 48px cuando está scrolleado, 16 * 4 = 64px cuando no
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleUserTypeChange = (userType: string) => {
    setCurrentUser(userType)

    switch (userType) {
      case "Empleado - Contable":
        router.push(toPortalPath("/empleado-contable"))
        break
      default:
        router.push(toPortalPath("/empleado-prensa"))
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-plp-lightest">
      <Header currentUser={currentUser} onUserTypeChange={handleUserTypeChange} />
      <div className="flex flex-1">
        <Sidebar userType={currentUser} />
        <main
          className="flex-1 overflow-auto p-4 lg:ml-64 transition-all"
          style={{
            marginTop: `${headerHeight}px`,
            transition: "margin-top 0.3s ease",
          }}
        >
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1
              return (
                <span key={item.href} className="flex items-center gap-2">
                  {isLast ? (
                    <span className="font-medium text-gray-700">{item.label}</span>
                  ) : (
                    <Link href={item.href} className="hover:text-blue-600">
                      {item.label}
                    </Link>
                  )}
                  {!isLast && <span className="text-gray-400">›</span>}
                </span>
              )
            })}
          </nav>
          {children}
        </main>
      </div>
    </div>
  )
}
