"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { useEffect, useState } from 'react'

export function BreadcrumbNav() {
  const pathname = usePathname()
  const [isNotFound, setIsNotFound] = useState(false)

  // Detectar si estamos en página not-found
  useEffect(() => {
    const checkNotFound = () => {
      setIsNotFound(document.body.classList.contains('page-not-found'))
    }
    
    checkNotFound()
    
    // Observer para detectar cambios en las clases del body
    const observer = new MutationObserver(checkNotFound)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // No mostrar en páginas específicas o en not-found
  const pagesWithoutBreadcrumb = [
    '/',
    '/contacto',
    '/contacto/trabaja/exito',
    '/contacto/trabaja',
  ]

  if (pagesWithoutBreadcrumb.includes(pathname) || isNotFound) {
    return null
  }

  // Generar breadcrumbs desde la ruta
  const segments = pathname.split('/').filter(Boolean)
  
  // Mapeo de rutas especiales a títulos personalizados
  const customTitles: Record<string, string> = {
    'trabaja': 'Trabajar con nosotros',
    'contacto': 'Contacto',
    'nosotros': 'Nosotros',
    'institucional': 'Institucional',
    'servicios': 'Servicios',
    'calidad': 'Calidad y sostenibilidad',
    'certificaciones': 'Certificaciones',
    'normas-politicas': 'Normas y políticas',
    'sostenibilidad': 'Sostenibilidad',
    'comunicacion': 'Comunicación',
    'comunidad': 'Comunidad',
    'innovacion': 'Innovación',
    'licitaciones': 'Licitaciones',
    'estadisticas': 'Estadísticas',
    'descargas': 'Material descargable',
    'galeria': 'Galería',
    'noticias': 'Noticias',
    'museo': 'Museo',
    'visitas-educativas': 'Visitas educativas y guiadas',
    'eventos': 'Eventos'
  }

  // Función para convertir el slug a texto legible
  const formatSegment = (segment: string) => {
    // Verificar si hay un título personalizado
    if (customTitles[segment]) {
      return customTitles[segment]
    }
    
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Construir breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> }
  ]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      label: formatSegment(segment),
      href: currentPath,
      icon: null
    })
  })

  return (
    <nav className="w-full py-3 bg-gray-100 border-b border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 min-w-0">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <li key={crumb.href} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 shrink-0" />
                )}
                {isLast ? (
                  <span className="flex items-center gap-1 font-semibold text-gray-900">
                    {crumb.icon}
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                  >
                    {crumb.icon}
                    {crumb.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
