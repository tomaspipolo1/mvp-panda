"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import WorkingGoogleMap from "@/components/working-google-map"
import MapFilters from "@/components/map-filters"
import {
  DEFAULT_ACTIVE_FILTERS,
  type MapFilterId,
  type MapFilterItemOption,
} from "@/components/map-filter-config"
import { 
  FileText
} from "lucide-react"
import Link from "next/link"

function normalizeMapLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
}

function isDefaultExcludedArrendamiento(item: MapFilterItemOption) {
  const haystack = `${item.label} ${item.name}`
  const normalized = normalizeMapLabel(haystack)
  return (
    item.key === "AR:AR-33" ||
    item.key === "AR:AR-48" ||
    normalized.includes("AR 33") ||
    normalized.includes("AR 48") ||
    (normalized.includes("YPF") &&
      normalized.includes("CANERIA") &&
      normalized.includes("PETROQUIMICA"))
  )
}

export default function MapaInteractivo() {
  const [selectedFilters, setSelectedFilters] = useState<MapFilterId[]>(DEFAULT_ACTIVE_FILTERS)
  const [selectedItemKeys, setSelectedItemKeys] = useState<string[]>([])
  const [availableItemsByCategory, setAvailableItemsByCategory] = useState<Partial<Record<MapFilterId, MapFilterItemOption[]>>>({})
  const [didInitArrendamientos, setDidInitArrendamientos] = useState(false)

  useEffect(() => {
    if (didInitArrendamientos) return

    const arrendamientos = availableItemsByCategory.AR || []
    if (arrendamientos.length === 0) return

    setSelectedItemKeys((current) => {
      if (current.length > 0) {
        return current
      }

      return arrendamientos
        .filter((item) => !isDefaultExcludedArrendamiento(item))
        .map((item) => item.key)
    })
    setDidInitArrendamientos(true)
  }, [availableItemsByCategory, didInitArrendamientos])

  const toggleItemKey = (itemKey: string) => {
    setSelectedItemKeys((current) =>
      current.includes(itemKey) ? current.filter((value) => value !== itemKey) : [...current, itemKey],
    )
  }

  const toggleCategoryItems = (filterId: MapFilterId, itemKeys: string[]) => {
    if (itemKeys.length === 0) {
      setSelectedFilters((currentFilters) =>
        currentFilters.includes(filterId)
          ? currentFilters.filter((value) => value !== filterId)
          : [...currentFilters, filterId],
      )
      return
    }

    const allItemsSelected = itemKeys.every((itemKey) => selectedItemKeys.includes(itemKey))

    if (allItemsSelected) {
      setSelectedFilters((currentFilters) => currentFilters.filter((value) => value !== filterId))
      setSelectedItemKeys((currentKeys) => currentKeys.filter((itemKey) => !itemKeys.includes(itemKey)))
      return
    }

    setSelectedFilters((currentFilters) =>
      currentFilters.includes(filterId) ? currentFilters : [...currentFilters, filterId],
    )
    setSelectedItemKeys((currentKeys) => Array.from(new Set([...currentKeys, ...itemKeys])))
  }

  return (
    <div className="min-h-screen bg-white">
     

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introducción */}
        <section className="mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-plp-primary mb-4">Descubre nuestro puerto</h2>
            <p className="text-plp-gray-700 leading-relaxed">
              El Puerto La Plata es un complejo portuario integrado que alberga múltiples operadores 
              especializados. Navega por el mapa para conocer cada instalación y sus servicios.
            </p>
          </div>
        </section>

        {/* Mapa + filtros */}
        <section className="mb-12">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,2.1fr)_360px]">
            <Card className="p-4">
              <WorkingGoogleMap
                activeFilters={selectedFilters}
                activeItemKeys={selectedItemKeys}
                onCatalogChange={setAvailableItemsByCategory}
                height="620px"
              />
            </Card>

            <Card className="h-[740px] overflow-hidden p-5 xl:sticky xl:top-24">
              <MapFilters
                selectedFilters={selectedFilters}
                onChange={setSelectedFilters}
                availableItemsByCategory={availableItemsByCategory}
                selectedItemKeys={selectedItemKeys}
                onToggleItemKey={toggleItemKey}
                onToggleCategoryItems={toggleCategoryItems}
              />
            </Card>
          </div>
        </section>

        



        {/* CTA final */}
        <section className="flex justify-center px-4">
          <Card className="w-full max-w-4xl p-8 bg-gradient-to-r from-plp-primary to-plp-secondary text-white text-center rounded-xl">
            <h3 className="text-2xl font-bold mb-4">¿Interesado en operar en el puerto?</h3>
            <p className="text-lg mb-6 opacity-90 max-w-xl mx-auto">
              Conecta con nuestros operadores o consulta sobre oportunidades de arrendamiento.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/servicios/oportunidades">
                <Button size="lg" className="bg-white text-plp-primary hover:bg-gray-100 w-full sm:w-auto">
                  Ver oportunidades
                </Button>
              </Link>
              <Link
                href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial por oportunidades`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para obtener más información sobre las oportunidades de arrendamiento que ofrecen.`)}`}
              >
                <Button size="lg" className="bg-white text-plp-primary hover:bg-gray-100 w-full sm:w-auto">
                  Contactar equipo comercial
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
