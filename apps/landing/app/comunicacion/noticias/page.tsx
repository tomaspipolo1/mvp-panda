"use client"

import { useState, useMemo } from "react"
import { NoticiaCard } from "@/components/noticia-card"
import { Button } from "@/components/ui/button"
import { NOTICIAS, CATEGORIAS_FILTRO } from "@/lib/noticias-data"

const INICIAL_VISIBLES = 6
const INCREMENTO_CARGAR_MAS = 6

export default function NoticiasPage() {
  const [filtroActivo, setFiltroActivo] = useState("Todas")
  const [cantidadVisibles, setCantidadVisibles] = useState(INICIAL_VISIBLES)

  const noticiasFiltradas = useMemo(() => {
    if (filtroActivo === "Todas") return NOTICIAS
    return NOTICIAS.filter((n) => n.categoria === filtroActivo)
  }, [filtroActivo])

  const noticiasMostradas = noticiasFiltradas.slice(0, cantidadVisibles)
  const hayMas = noticiasMostradas.length < noticiasFiltradas.length

  const handleCargarMas = () => {
    setCantidadVisibles((prev) => Math.min(prev + INCREMENTO_CARGAR_MAS, noticiasFiltradas.length))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Contenido principal: título + filtros + grid */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-plp-primary mb-8">
            Noticias y novedades
          </h1>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm font-medium text-plp-gray-700 shrink-0">Filtrar por:</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS_FILTRO.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFiltroActivo(cat)
                    setCantidadVisibles(INICIAL_VISIBLES)
                  }}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filtroActivo === cat
                      ? "bg-plp-primary text-white"
                      : "bg-plp-gray-100 text-plp-gray-700 border border-plp-gray-200 hover:bg-plp-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de cards: la primera siempre destacada (más ancha) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {noticiasMostradas.map((noticia, index) => (
              <div
                key={noticia.id}
                className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <NoticiaCard noticia={noticia} destacada={index === 0} />
              </div>
            ))}
          </div>

          {/* Cargar más noticias */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-plp-primary hover:bg-plp-primary/90 text-white"
              onClick={handleCargarMas}
              disabled={!hayMas}
            >
              Cargar más noticias
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
