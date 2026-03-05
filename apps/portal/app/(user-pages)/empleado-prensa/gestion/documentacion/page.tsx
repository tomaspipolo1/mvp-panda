"use client"

import { ResourceCatalogBoard } from "@/components/resource-catalog/resource-catalog-board"
import type { ResourceCategoryItem } from "@/components/resource-catalog/types"

const INITIAL_MATERIAL_DESCARGABLE_ITEMS: ResourceCategoryItem[] = [
  {
    id: "material-1",
    icon: "book-open",
    title: "Videos institucionales",
    description: "Material audiovisual para presentaciones institucionales y comunicacion corporativa.",
    file: {
      title: "Video Institucional 2026",
      fileName: "video-institucional-2026.mp4",
      fileSize: "24.5 MB",
      fileDate: "03/02/2026",
      fileUrl: "#",
    },
  },
  {
    id: "material-2",
    icon: "building-2",
    title: "Banco de imagenes",
    description: "Repositorio de imagenes oficiales para prensa, redes y piezas visuales.",
    file: {
      title: "Banco Imagenes - Set Enero",
      fileName: "banco-imagenes-enero.zip",
      fileSize: "42.8 MB",
      fileDate: "07/02/2026",
      fileUrl: "#",
    },
  },
  {
    id: "material-3",
    icon: "file-text",
    title: "Brochure comercial",
    description: "Versiones actualizadas del brochure comercial para difusion y presentaciones.",
    file: {
      title: "Brochure Comercial 2026",
      fileName: "brochure-comercial-2026.pdf",
      fileSize: "3.2 MB",
      fileDate: "10/02/2026",
      fileUrl: "#",
    },
  },
  {
    id: "material-4",
    icon: "landmark",
    title: "Mapas y planos",
    description: "Documentacion grafica de zonas operativas, accesos y distribucion portuaria.",
    file: {
      title: "Plano General Puerto",
      fileName: "plano-general-puerto.pdf",
      fileSize: "5.9 MB",
      fileDate: "12/02/2026",
      fileUrl: "#",
    },
  },
  {
    id: "material-5",
    icon: "clipboard-list",
    title: "Kit de prensa",
    description: "Paquete base de comunicacion para prensa con recursos institucionales.",
    file: {
      title: "Kit de Prensa Oficial",
      fileName: "kit-prensa-oficial.zip",
      fileSize: "12.4 MB",
      fileDate: "15/02/2026",
      fileUrl: "#",
    },
  },
]

export default function DocumentacionPage() {
  return (
    <ResourceCatalogBoard
      title="Material descargable"
      description="Gestiona los recursos descargables para prensa con cards reutilizables y archivos adjuntos."
      initialItems={INITIAL_MATERIAL_DESCARGABLE_ITEMS}
    />
  )
}
