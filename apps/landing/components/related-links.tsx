"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState, useMemo } from "react"

/**
 * Enlaces por sección: mismas rutas reales que el mega menú.
 * Sin "visión comercial", "servicios portuarios" ni rutas inexistentes.
 */
const SECCIONES: { basePath: string; enlaces: { title: string; href: string }[] }[] = [
  {
    basePath: "/institucional",
    enlaces: [
      { title: "Sobre nosotros", href: "/institucional/nosotros" },
      { title: "Autoridad portuaria", href: "/institucional/autoridad-portuaria" },
      { title: "Estructura", href: "/institucional/estructura" },
      { title: "Historia del puerto", href: "/institucional/historia" },
    ],
  },
  {
    basePath: "/servicios",
    enlaces: [
      { title: "Ventajas competitivas", href: "/servicios/ventajas-competitivas" },
      { title: "Oportunidades", href: "/servicios/oportunidades" },
      { title: "Mapa interactivo", href: "/servicios/mapa" },
      { title: "Terminal de Contenedores TecPlata", href: "/servicios/terminales/contenedores" },
      { title: "YPF", href: "/servicios/terminales/ypf" },
      { title: "Copetro", href: "/servicios/terminales/copetro" },
      { title: "Areneras", href: "/servicios/terminales/areneras" },
      { title: "Zona franca", href: "/servicios/operadores-organismos/zona-franca" },
      { title: "Aduana", href: "/servicios/operadores-organismos/aduana" },
      { title: "Transporte terrestre", href: "/servicios/transporte-terrestre" },
      { title: "Tarifario", href: "/servicios/tarifario" },
      { title: "Licitaciones publicadas", href: "/servicios/vision-comercial/licitaciones" },
    ],
  },
  {
    basePath: "/comunicacion",
    enlaces: [
      { title: "Noticias", href: "/comunicacion/noticias" },
      { title: "Galeria", href: "/comunicacion/galeria" },
      { title: "Material descargable", href: "/comunicacion/descargas" },
    ],
  },
  {
    basePath: "/comunidad",
    enlaces: [
      { title: "Museo", href: "/comunidad/museo" },
      { title: "Visitas educativas y guiadas", href: "/comunidad/visitas-educativas" },
      { title: "Eventos", href: "/comunidad/eventos" },
    ],
  },
  {
    basePath: "/calidad",
    enlaces: [
      { title: "Certificaciones", href: "/calidad/certificaciones" },
      { title: "Normas y políticas", href: "/calidad/normas-politicas" },
      { title: "Sostenibilidad", href: "/calidad/sostenibilidad" },
    ],
  },
  {
    basePath: "/innovacion",
    enlaces: [
      { title: "Digitalización y tecnológica", href: "/innovacion/digitalizacion-tecnologica" },
      { title: "Proyectos estratégicos", href: "/innovacion/proyectos-estrategicos" },
    ],
  },
]

const ENLACES_FUERA_DE_SECCION = [
  { title: "Contacto", href: "/contacto" },
  { title: "Trabajar con nosotros", href: "https://docs.google.com/forms/d/e/1FAIpQLScqP8q8xXZjCvbruYrh02RLZiLz8qr1LyCnMypkN57J73wfww/viewform?usp=sharing" },
]

const MAX_ENLACES = 4

function normalizar(p: string): string {
  return (p || "").replace(/\/$/, "") || "/"
}

/** Enlaces a mostrar: de la sección actual, sin repetir la página en la que está el usuario. */
function obtenerEnlaces(pathname: string | null): { title: string; href: string }[] {
  const path = normalizar(pathname ?? "")

  const seccion = SECCIONES.find((s) => {
    const base = normalizar(s.basePath)
    return path === base || (base !== "/" && path.startsWith(base + "/"))
  })

  const lista = seccion ? seccion.enlaces : ENLACES_FUERA_DE_SECCION

  const sinPaginaActual = lista.filter((e) => {
    if (e.href.startsWith("http")) return true
    const h = normalizar(e.href)
    if (path === h) return false
    if (h !== "/" && path.startsWith(h + "/")) return false
    return true
  })

  return sinPaginaActual.slice(0, MAX_ENLACES)
}

export function RelatedLinks() {
  const pathname = usePathname()
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    const checkNotFound = () => {
      setIsNotFound(document.body.classList.contains("page-not-found"))
    }
    checkNotFound()
    const observer = new MutationObserver(checkNotFound)
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const links = useMemo(() => obtenerEnlaces(pathname), [pathname])

  if (isNotFound) return null

  const pagesWithoutLinks = ["/", "/login", "/registro", "/contacto/trabaja", "/contacto/trabaja/exito"]
  if (pathname && pagesWithoutLinks.includes(pathname)) return null

  if (pathname?.startsWith("/comunicacion/noticias/")) return null

  if (!links.length) return null

  return (
    <section className="w-full py-4 md:py-5" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="container mx-auto px-4 flex justify-center">
        <div
          className="rounded-xl p-4 md:p-5 xl:p-6 w-fit max-w-full"
          style={{
            border: "1px solid #4A90E2",
            backgroundColor: "white",
          }}
        >
          <h2
            className="text-base md:text-lg xl:text-xl font-semibold mb-3 md:mb-4"
            style={{ color: "#4A90E2" }}
          >
            Otras secciones que podrían interesarte...
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center sm:justify-start">
            {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between p-2.5 md:p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 group w-[220px] min-w-[220px] flex-shrink-0"
                  style={{ border: "1px solid #E5E7EB" }}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span
                    className="text-xs md:text-sm font-medium group-hover:text-blue-600 transition-colors"
                    style={{ color: "#4A90E2" }}
                  >
                    {link.title}
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 md:h-4 md:w-4 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0"
                    style={{ color: "#4A90E2" }}
                  />
                </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
