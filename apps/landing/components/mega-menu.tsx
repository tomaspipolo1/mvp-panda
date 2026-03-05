"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"

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

// Estructura del menú según lo especificado
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

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [selectedSubmenu, setSelectedSubmenu] = useState<SubmenuItem | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    if (!activeMenu) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (menuRef.current && !menuRef.current.contains(target)) {
        setActiveMenu(null)
        setSelectedSubmenu(null)
      }
    }

    // Usar click en lugar de mousedown y agregar un pequeño delay
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true)
    }, 0)
    
    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [activeMenu])

  // Manejar la selección de un submenú en el panel izquierdo
  const handleSubmenuClick = (subItem: SubmenuItem, e: React.MouseEvent) => {
    e.preventDefault()
    if (subItem.items && subItem.items.length > 0) {
      setSelectedSubmenu(subItem)
    }
  }

  // Resetear el submenú seleccionado cuando cambia el menú principal
  useEffect(() => {
    setSelectedSubmenu(null)
  }, [activeMenu])

  return (
    <div className="hidden md:block relative overflow-visible" ref={menuRef}>
      <ul className="flex items-center justify-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-1.5 xl:gap-2 min-w-0 overflow-visible">
        {menuItems.map((item) => (
          <li key={item.href} className="relative flex-shrink-0 overflow-visible">
            <button
              ref={(el) => (buttonRefs.current[item.label] = el)}
              className={`flex items-center px-1 sm:px-1.5 md:px-2 lg:px-2 xl:px-2 py-1 sm:py-1.5 md:py-2 text-[0.7rem] sm:text-[0.75rem] md:text-[0.78rem] lg:text-[0.8rem] xl:text-[0.8rem] font-medium transition-colors hover:text-blue-300 text-white text-shadow whitespace-nowrap ${
                activeMenu === item.label ? "text-blue-300" : "text-white"
              }`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setActiveMenu(activeMenu === item.label ? null : item.label)
              }}
              aria-expanded={activeMenu === item.label}
            >
              {item.label}
              <ChevronDown
                className={`ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 transition-transform flex-shrink-0 ${
                  activeMenu === item.label ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown desplegable debajo del item */}
            {activeMenu === item.label && (
              <div 
                className="absolute top-full left-0 mt-2 z-[9999] flex rounded-lg overflow-hidden bg-[#1B1E4A] text-white" 
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                style={{ 
                  minWidth: '220px',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '8px',
                  zIndex: 9999,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Panel izquierdo - Navegación principal */}
                <div className="flex flex-col bg-[#1B1E4A] min-w-[220px] p-3 sm:p-4">
                  <ul className="space-y-1.5 sm:space-y-2 w-full">
                    {menuItems
                      .find((menuItem) => menuItem.label === activeMenu)
                      ?.items.map((subItem) => {
                        const hasSubItems = subItem.items && subItem.items.length > 0
                        const isSelected = selectedSubmenu?.label === subItem.label
                        
                        return (
                          <li key={subItem.href} className="w-full">
                            {hasSubItems ? (
                              <button
                                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                                  isSelected
                                    ? "bg-blue-600/30 text-blue-400"
                                    : "hover:bg-blue-600/20 text-white"
                                }`}
                                onClick={(e) => handleSubmenuClick(subItem, e)}
                                onMouseEnter={() => {
                                  if (subItem.items && subItem.items.length > 0) {
                                    setSelectedSubmenu(subItem)
                                  }
                                }}
                              >
                                <span>{subItem.label}</span>
                                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                              </button>
                            ) : (
                              <Link
                                href={subItem.href}
                                className="block px-3 py-2 rounded transition-colors text-sm hover:bg-blue-600/20 text-white"
                                onClick={() => setActiveMenu(null)}
                              >
                                {subItem.label}
                              </Link>
                            )}
                          </li>
                        )
                      })}
                  </ul>
                </div>

                {/* Panel derecho - Submenús */}
                {selectedSubmenu && selectedSubmenu.items && selectedSubmenu.items.length > 0 && (
                  <div className="flex flex-col bg-[#1B1E4A] min-w-[220px] p-3 sm:p-4 border-l border-blue-600/30">
                    <ul className="space-y-1.5 sm:space-y-2 w-full">
                      {selectedSubmenu.items.map((subSubItem) => (
                        <li key={subSubItem.href} className="w-full">
                          <Link
                            href={subSubItem.href}
                            className="block px-3 py-2 rounded transition-colors text-sm hover:bg-blue-600/20 text-white"
                            onClick={() => setActiveMenu(null)}
                          >
                            {subSubItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
