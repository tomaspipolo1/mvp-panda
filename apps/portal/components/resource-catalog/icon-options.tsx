import {
  BookOpen,
  Building2,
  ClipboardList,
  DollarSign,
  FileText,
  HardHat,
  Landmark,
  Package,
  Scale,
  Shield,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import type { ResourceIconKey } from "./types"

type IconOption = {
  key: ResourceIconKey
  label: string
  icon: LucideIcon
}

export const RESOURCE_ICON_OPTIONS: IconOption[] = [
  { key: "dollar-sign", label: "Dinero", icon: DollarSign },
  { key: "file-text", label: "Documento", icon: FileText },
  { key: "shield", label: "Seguridad", icon: Shield },
  { key: "book-open", label: "Manual", icon: BookOpen },
  { key: "building-2", label: "Infraestructura", icon: Building2 },
  { key: "package", label: "Paquete", icon: Package },
  { key: "truck", label: "Logística", icon: Truck },
  { key: "landmark", label: "Normativa", icon: Landmark },
  { key: "scale", label: "Legal", icon: Scale },
  { key: "hard-hat", label: "Obra", icon: HardHat },
  { key: "wrench", label: "Mantenimiento", icon: Wrench },
  { key: "clipboard-list", label: "Listado", icon: ClipboardList },
]

export const RESOURCE_ICON_MAP = RESOURCE_ICON_OPTIONS.reduce(
  (acc, option) => {
    acc[option.key] = option.icon
    return acc
  },
  {} as Record<ResourceIconKey, LucideIcon>,
)
