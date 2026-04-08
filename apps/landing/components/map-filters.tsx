"use client"

import type React from "react"
import { Building2, DoorOpen, Layers3, MapPin, Route, Ruler, TrainFront, Warehouse } from "lucide-react"

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

type MapFiltersProps = {
  selectedFilters: MapFilterId[]
  onChange: (filters: MapFilterId[]) => void
}

export default function MapFilters({ selectedFilters, onChange }: MapFiltersProps) {
  const allSelected = selectedFilters.length === ALL_FILTERS.length

  const toggleFilter = (filterId: MapFilterId) => {
    if (selectedFilters.includes(filterId)) {
      const nextFilters = selectedFilters.filter((value) => value !== filterId)
      onChange(nextFilters.length > 0 ? nextFilters : ALL_FILTERS)
      return
    }

    onChange([...selectedFilters, filterId])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-plp-primary">
          <Layers3 className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Filtros del mapa</h3>
        </div>

        <button
          type="button"
          onClick={() => onChange(allSelected ? ["ST", "AC", "AR", "BA", "PR", "EJ", "ED", "FF"] : ALL_FILTERS)}
          className="rounded-lg border border-plp-primary px-3 py-2 text-sm font-medium text-plp-primary transition-colors hover:bg-plp-primary hover:text-white"
        >
          {allSelected ? "Restablecer selección" : "Seleccionar todos"}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {MAP_FILTERS.map((filter) => {
          const isSelected = selectedFilters.includes(filter.id)
          const Icon = filter.icon

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => toggleFilter(filter.id)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-plp-primary bg-plp-primary text-white"
                  : "border-gray-300 bg-white text-plp-gray-700 hover:border-plp-primary hover:text-plp-primary"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{filter.label}</span>
              <span className={`rounded px-1.5 py-0.5 text-xs ${isSelected ? "bg-white/20" : "bg-gray-100"}`}>
                {filter.shortLabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
