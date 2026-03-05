"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Definición de tipos para la estructura del menú
type SubSubmenuItem = {
  label: string
  href: string
}

type SubmenuItem = {
  label: string
  href: string
  items?: SubSubmenuItem[]
}

type MenuItem = {
  label: string
  href: string
  items: SubmenuItem[]
}

// Estructura del menú
const menuItems: MenuItem[] = [
  {
    label: "Institucional",
    href: "/institucional",
    items: [
      { label: "Sobre nosotros", href: "/institucional/nosotros" },
      { label: "Autoridad portuaria", href: "/institucional/autoridad-portuaria" },
      { label: "Estructura", href: "/institucional/estructura" },
      { label: "Historia del puerto", href: "/institucional/historia" },
    ],
  },
  {
    label: "Servicios y Negocios",
    href: "/servicios",
    items: [
      { label: "Ventajas competitivas", href: "/servicios/ventajas-competitivas" },
      { label: "Oportunidades", href: "/servicios/oportunidades" },
      { label: "Arrendamientos", href: "/servicios/arrendamientos" },
      { label: "Mapa interactivo", href: "/servicios/mapa" },
      {
        label: "Terminales",
        href: "/servicios/terminales", 
        items: [
          { label: "Terminal de Contenedores TecPlata", href: "/servicios/terminales/contenedores" },
          { label: "YPF", href: "/servicios/terminales/ypf" },
          { label: "Copetro", href: "/servicios/terminales/copetro" },
          { label: "Areneras", href: "/servicios/terminales/areneras" },
        ],
      },
      {
        label: "Operadores y organismos",
        href: "/servicios/operadores-organismos",
        items: [
          { label: "Zona franca", href: "/servicios/operadores-organismos/zona-franca" },
          { label: "Aduana", href: "/servicios/operadores-organismos/aduana" },
          { label: "Migraciones", href: "/servicios/operadores-organismos/migraciones" },
          { label: "Prefectura", href: "/servicios/operadores-organismos/prefectura" },
          { label: "Prácticos", href: "/servicios/operadores-organismos/practicos" },
          { label: "Empresas de Servicios Portuarios", href: "/servicios/operadores-organismos/empresas-servicios-portuarios" },
        ],
      },
      { label: "Transporte terrestre", href: "/servicios/transporte-terrestre" },
      { label: "Tarifario", href: "/servicios/tarifario" },
      { label: "Licitaciones publicadas", href: "/servicios/vision-comercial/licitaciones" },
    ],
  },
  {
    label: "Comunicación",
    href: "/comunicacion",
    items: [
      { label: "Noticias", href: "/comunicacion/noticias" },
      { label: "Galeria", href: "/comunicacion/galeria" },
      { label: "Material descargable", href: "/comunicacion/descargas" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    label: "Comunidad y visitas",
    href: "/comunidad",
    items: [
      { label: "Museo", href: "/comunidad/museo" },
      { label: "Visitas educativas y guiadas", href: "/comunidad/visitas-educativas" },
      { label: "Eventos", href: "/comunidad/eventos" },
    ],
  },
  {
    label: "Calidad y sostenibilidad",
    href: "/calidad",
    items: [
      { label: "Certificaciones", href: "/calidad/certificaciones" },
      { label: "Normas y políticas", href: "/calidad/normas-politicas" },
      { label: "Sostenibilidad", href: "/calidad/sostenibilidad" },
    ],
  },
  {
    label: "Innovación y futuro",
    href: "/innovacion",
    items: [
      { label: "Digitalización y tecnologíca", href: "/innovacion/digitalizacion-tecnologica" },
      { label: "Proyectos estratégicos", href: "/innovacion/proyectos-estrategicos" },
    ],
  },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [expandedSubItems, setExpandedSubItems] = useState<string[]>([])

  const toggleItem = (label: string) => {
    // Acordeón: solo un menú principal puede estar expandido
    if (expandedItem === label) {
      setExpandedItem(null)
      setExpandedSubItems([])
    } else {
      setExpandedItem(label)
      setExpandedSubItems([])
    }
  }

  const toggleSubItem = (label: string) => {
    setExpandedSubItems((prev) => 
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-white hover:text-blue-300 hover:bg-white/10"
        onClick={() => setOpen(!open)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menú</span>
      </Button>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-80 max-h-[70vh] bg-gradient-to-b from-black/90 via-black/80 to-black/70 backdrop-blur-md text-white shadow-lg rounded-b-lg border border-white/10 z-50">
          {/* Header fijo */}
          <div className="flex items-center justify-between p-4 border-b border-blue-400/50">
            <h2 className="text-lg font-bold">Menú</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-blue-300 hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>

          {/* Contenido scrolleable */}
          <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => (
                <div key={item.href} className="border-b border-white/20 last:border-b-0">
                  <button
                    className={`flex items-center justify-between w-full p-3 text-left transition-colors rounded ${
                      expandedItem === item.label 
                        ? 'text-blue-300 bg-white/10' 
                        : 'text-white hover:text-blue-300 hover:bg-white/5'
                    }`}
                    onClick={() => toggleItem(item.label)}
                  >
                    <span className="font-medium">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                        {item.items.length}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedItem === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Submenús expandidos */}
                  {expandedItem === item.label && (
                    <div className="pl-4 pr-2 pb-3 bg-black/20 rounded-lg mt-2">
                      {item.items.map((subItem) => (
                        <div key={subItem.href} className="mb-2">
                          {subItem.items ? (
                            <>
                              <button
                                className="flex items-center justify-between w-full p-2 text-left text-sm text-gray-300 hover:text-blue-300 transition-colors rounded hover:bg-white/5"
                                onClick={() => toggleSubItem(subItem.label)}
                              >
                                <span>{subItem.label}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                                    {subItem.items.length}
                                  </span>
                                  <ChevronRight
                                    className={`h-4 w-4 transition-transform ${
                                      expandedSubItems.includes(subItem.label) ? "rotate-90" : ""
                                    }`}
                                  />
                                </div>
                              </button>

                              {/* Submenu de tercer nivel */}
                              {expandedSubItems.includes(subItem.label) && (
                                <div className="pl-4 py-1 bg-black/10 rounded-lg mt-1">
                                  {subItem.items.map((subSubItem) => (
                                    <Link
                                      key={subSubItem.href}
                                      href={subSubItem.href}
                                      className="block p-2 text-xs text-gray-400 hover:text-blue-300 transition-colors rounded hover:bg-white/5"
                                      onClick={() => setOpen(false)}
                                    >
                                      {subSubItem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link 
                              href={subItem.href} 
                              className="block p-2 text-sm text-gray-300 hover:text-blue-300 transition-colors rounded hover:bg-white/5"
                              onClick={() => setOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
