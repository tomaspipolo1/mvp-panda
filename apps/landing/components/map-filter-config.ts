import type React from "react"
import {
  Building2,
  DoorOpen,
  MapPin,
  Route,
  Ruler,
  TrainFront,
  Warehouse,
} from "lucide-react"

export type MapFilterId = "ST" | "AC" | "AR" | "BA" | "PR" | "EJ" | "ED" | "FF"

export type MapFilterItemOption = {
  key: string
  name: string
  label: string
  count: number
}

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

export const DEFAULT_ACTIVE_FILTERS: MapFilterId[] = ["ST", "AC", "AR", "ED"]

export const MAP_FILTER_COLORS: Record<
  MapFilterId,
  { strokeColor: string; fillColor: string; badgeColor: string }
> = {
  ST: { strokeColor: "#2563eb", fillColor: "#dbeafe", badgeColor: "#dbeafe" },
  AC: { strokeColor: "#d97706", fillColor: "#fde7c2", badgeColor: "#fde7c2" },
  AR: { strokeColor: "#0f766e", fillColor: "#bbf7d0", badgeColor: "#d7f5f1" },
  BA: { strokeColor: "#dc2626", fillColor: "#fee2e2", badgeColor: "#fee2e2" },
  PR: { strokeColor: "#64748b", fillColor: "#e2e8f0", badgeColor: "#e2e8f0" },
  EJ: { strokeColor: "#7c3aed", fillColor: "#ede9fe", badgeColor: "#ede9fe" },
  ED: { strokeColor: "#1d4ed8", fillColor: "#dbeafe", badgeColor: "#dbeafe" },
  FF: { strokeColor: "#334155", fillColor: "#e5e7eb", badgeColor: "#e5e7eb" },
}

export const ALL_MAP_FILTERS = MAP_FILTERS.map((filter) => filter.id)
