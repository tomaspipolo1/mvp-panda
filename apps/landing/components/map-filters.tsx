"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Building2, ChevronDown, ChevronRight, DoorOpen, Layers3, MapPin, Route, Ruler, TrainFront, Warehouse } from "lucide-react"

export type MapFilterId = "ST" | "AC" | "AR" | "BA" | "PR" | "EJ" | "ED" | "FF"

export const MAP_FILTERS: Array<{
  id: MapFilterId
  label: string
  shortLabel: string
  icon: React.ComponentType<{ className?: string }>
}> = [
  { id: "ST", label: "Sitios", shortLabel: "ST", icon: MapPin },
  { id: "AC", label: "Accesos", shortLabel: "AC", icon: DoorOpen },
  { id: "AR", label: "Arrendamientos", shortLabel: "AR", icon: Warehouse },
  { id: "BA", label: "Balizas", shortLabel: "BA", icon: MapPin },
  { id: "PR", label: "Progresivas", shortLabel: "PR", icon: Ruler },
  { id: "EJ", label: "Eje canal", shortLabel: "EJ", icon: Route },
  { id: "ED", label: "Edificios", shortLabel: "ED", icon: Building2 },
  { id: "FF", label: "Ferrocarriles", shortLabel: "FF", icon: TrainFront },
]

const ALL_FILTERS = MAP_FILTERS.map((filter) => filter.id)

export type MapFilterItemOption = {
  key: string
  name: string
  label: string
  count: number
}

type MapFiltersProps = {
  selectedFilters: MapFilterId[]
  onChange: (filters: MapFilterId[]) => void
  availableItemsByCategory?: Partial<Record<MapFilterId, MapFilterItemOption[]>>
  selectedItemKeys?: string[]
  onToggleItemKey?: (itemKey: string) => void
  onToggleCategoryItems?: (filterId: MapFilterId, itemKeys: string[]) => void
}

export default function MapFilters({
  selectedFilters,
  onChange,
  availableItemsByCategory = {},
  selectedItemKeys = [],
  onToggleItemKey,
  onToggleCategoryItems,
}: MapFiltersProps) {
  const allSelected = selectedFilters.length === ALL_FILTERS.length
  const [expandedFilters, setExpandedFilters] = useState<MapFilterId[]>([])

  const expandedSet = useMemo(() => new Set(expandedFilters), [expandedFilters])

  const toggleFilter = (filterId: MapFilterId) => {
    if (selectedFilters.includes(filterId)) {
      const nextFilters = selectedFilters.filter((value) => value !== filterId)
      onChange(nextFilters.length > 0 ? nextFilters : ALL_FILTERS)
      return
    }

    onChange([...selectedFilters, filterId])
  }

  const toggleExpanded = (filterId: MapFilterId) => {
    setExpandedFilters((current) =>
      current.includes(filterId) ? current.filter((value) => value !== filterId) : [...current, filterId],
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-plp-primary">
          <Layers3 className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Filtros del mapa</h3>
        </div>

        <button
          type="button"
          onClick={() => onChange(allSelected ? [] : ALL_FILTERS)}
          className="rounded-lg border border-plp-primary px-3 py-2 text-sm font-medium text-plp-primary transition-colors hover:bg-plp-primary hover:text-white"
        >
          {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {MAP_FILTERS.map((filter) => {
          const isSelected = selectedFilters.includes(filter.id)
          const Icon = filter.icon
          const items = availableItemsByCategory[filter.id] || []
          const isExpanded = expandedSet.has(filter.id)
          const itemKeys = items.map((item) => item.key)
          const allItemsSelected = itemKeys.length > 0 && itemKeys.every((itemKey) => selectedItemKeys.includes(itemKey))

          const handleMainToggle = () => {
            if (items.length > 0) {
              onToggleCategoryItems?.(filter.id, itemKeys)
              return
            }

            toggleFilter(filter.id)
          }

          return (
            <div key={filter.id} className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 p-2">
                <button
                  type="button"
                  onClick={handleMainToggle}
                  className={`flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isSelected || allItemsSelected
                      ? "border-plp-primary bg-plp-primary text-white"
                      : "border-gray-300 bg-white text-plp-gray-700 hover:border-plp-primary hover:text-plp-primary"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{filter.label}</span>
                  <span className={`rounded px-1.5 py-0.5 text-xs ${isSelected || allItemsSelected ? "bg-white/20" : "bg-gray-100"}`}>
                    {filter.shortLabel}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleExpanded(filter.id)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 transition-colors hover:border-plp-primary hover:text-plp-primary"
                  aria-label={isExpanded ? `Contraer ${filter.label}` : `Expandir ${filter.label}`}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 px-3 py-3">
                  {items.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay elementos cargados para esta categoría.</p>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item) => {
                        const isItemSelected = selectedItemKeys.includes(item.key)
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => onToggleItemKey?.(item.key)}
                            className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                              isItemSelected
                                ? "border-plp-primary bg-plp-primary/10 text-plp-primary"
                                : "border-gray-200 bg-white text-gray-700 hover:border-plp-primary/50 hover:bg-plp-gray-50"
                            }`}
                          >
                            <span className="truncate">{item.label}</span>
                            <span className="ml-3 shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                              {item.count}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
