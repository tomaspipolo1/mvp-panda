"use client"

import { ResourceCatalogBoard } from "@/components/resource-catalog/resource-catalog-board"
import type { ResourceCategoryItem } from "@/components/resource-catalog/types"

const INITIAL_TARIFARIO_ITEMS: ResourceCategoryItem[] = [
  {
    id: "tarifario-1",
    icon: "dollar-sign",
    title: "Tarifas generales",
    description: "Valores base de servicios portuarios y administrativos.",
    file: {
      title: "Tarifario General 2026",
      fileName: "tarifario-general-2026.pdf",
      fileSize: "1.8 MB",
      fileDate: "12/01/2026",
      fileUrl: "#",
    },
  },
  {
    id: "tarifario-2",
    icon: "truck",
    title: "Servicios terrestres",
    description: "Tarifas aplicadas a logistica terrestre y movimientos internos.",
    file: {
      title: "Tarifario Terrestre 2026",
      fileName: "tarifario-terrestre-2026.pdf",
      fileSize: "1.4 MB",
      fileDate: "18/01/2026",
      fileUrl: "#",
    },
  },
  {
    id: "tarifario-3",
    icon: "package",
    title: "Servicios nauticos",
    description: "Costos para maniobras maritimas y asistencia nautica.",
    file: {
      title: "Tarifario Nautico 2026",
      fileName: "tarifario-nautico-2026.pdf",
      fileSize: "1.1 MB",
      fileDate: "21/01/2026",
      fileUrl: "#",
    },
  },
  {
    id: "tarifario-4",
    icon: "landmark",
    title: "Normativa y tasas",
    description: "Tasas regulatorias y costos administrativos obligatorios.",
    file: {
      title: "Tasas y Normativa 2026",
      fileName: "tasas-normativa-2026.pdf",
      fileSize: "980 KB",
      fileDate: "24/01/2026",
      fileUrl: "#",
    },
  },
]

export default function TarifarioPage() {
  return (
    <ResourceCatalogBoard
      title="Tarifario"
      description="Gestiona el tarifario disponible en la web con archivos descargables divididos por categorias segun corresponda."
      initialItems={INITIAL_TARIFARIO_ITEMS}
    />
  )
}
