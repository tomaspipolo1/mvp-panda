"use client"

import Link from "next/link"
import {
  FileDown,
  FileText,
  Image as ImageIcon,
  PlayCircle,
  Map,
  FolderArchive,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DownloadCard } from "@/components/download-card"

const recursos = [
  {
    id: "videos",
    titulo: "Videos institucionales",
    descripcion: "Material audiovisual del Puerto La Plata para prensa y presentaciones.",
    icon: PlayCircle,
    href: "#",
    fileSize: "—",
    date: "—",
  },
  {
    id: "fotos",
    titulo: "Banco de imágenes",
    descripcion: "Fotografías en alta calidad de terminales, operaciones y áreas del puerto.",
    icon: ImageIcon,
    href: "#",
    fileSize: "—",
    date: "—",
  },
  {
    id: "brochure",
    titulo: "Brochure comercial",
    descripcion: "Presentación institucional con capacidades, servicios y ventajas competitivas.",
    icon: FileText,
    href: "#",
    fileSize: "2.4 MB",
    date: "Enero 2024",
  },
  {
    id: "mapas",
    titulo: "Mapas y planos",
    descripcion: "Plano general del puerto, accesos, batimetría y áreas operativas.",
    icon: Map,
    href: "#",
    fileSize: "1.8 MB",
    date: "Enero 2024",
  },
  {
    id: "tarifas",
    titulo: "Tarifas y aranceles",
    descripcion: "Tarifas y aranceles para operaciones de importación.",
    icon: Map,
    href: "#",
    fileSize: "3.1 MB",
    date: "Enero 2024",
  },
  {
    id: "kits",
    titulo: "Kit de prensa",
    descripcion: "Paquete con logos, lineamientos de marca y recursos de comunicación.",
    icon: FolderArchive,
    href: "#",
    fileSize: "—",
    date: "—",
  },
]

const HERO_DESCRIPTION =
  "En esta sección encontrarás enlaces de acceso a material en alta calidad: videos, fotografías, brochure comercial, mapas y recursos de prensa. Todo el contenido está preparado para uso institucional y comunicacional del Puerto La Plata."

export default function MaterialDescargablePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — misma estructura que tarifario: fondo gris, contenido max-w-6xl, icono y título grandes */}
      <section className="w-full py-10 md:py-14 bg-plp-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mr-auto -translate-x-1 md:-translate-x-4 grid md:grid-cols-2 gap-2 md:gap-3 items-center">
            <div className="flex justify-center md:justify-end">
              <FileDown
                className="h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 text-plp-primary shrink-0"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
            <div className="md:pl-0">
              <h1 className="text-3xl md:text-4xl font-bold text-plp-primary mb-2 md:mb-3">
                Material descargable
              </h1>
              <p className="text-plp-gray-600 leading-relaxed mb-0">
                {HERO_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de cards */}
      <section className="w-full pt-12 md:pt-16 pb-6 md:pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recursos.map((item) => (
              <DownloadCard
                key={item.id}
                icon={item.icon}
                title={item.titulo}
                description={item.descripcion}
                fileSize={item.fileSize}
                date={item.date}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — mismo estilo que tarifario: bloque azul max-w-4xl */}
      <section className="w-full py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto bg-plp-primary rounded-3xl py-12 md:py-16 px-6 md:px-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿No encontrás lo que buscabas?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Si necesitás otros formatos, materiales específicos o permisos de uso, ponete en
            contacto con nuestro equipo de comunicación.
          </p>
          <Link
            href={`/contacto?tipoConsulta=prensa&asunto=${encodeURIComponent(`Consulta sobre material`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos debido a que necesito material específico para una noticia o evento.`)}`}
            >
              <Button
              size="lg"
              className="bg-white text-plp-primary hover:bg-plp-gray-100 border-2 border-white w-full sm:w-auto"
          >
            Contactar equipo de comunicación
          </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
