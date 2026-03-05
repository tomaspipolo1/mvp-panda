"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

const SUBTITLE =
  "En esta sección encontrarás enlaces para poder descargar material relacionado a nuestras certificaciones."

const certificados = [
  {
    id: 1,
    titulo: "ISO 9001:2015 - Sistema de Gestión de la Calidad",
    codigo: "9001:2015",
    entidad: "Organismo Certificador Marítimo (OCM)",
    vigente: "Vigente hasta 12/2026",
    pdf: "/docs/certificados/iso-9001-2015-plp.pdf",
    logo: "/iso.png",
  },
  {
    id: 2,
    titulo: "ISO 14001:2015 - Gestión Ambiental",
    codigo: "14001:2015",
    entidad: "Bureau Portuario Internacional",
    vigente: "Vigente hasta 05/2027",
    pdf: "/docs/certificados/iso-14001-2015-plp.pdf",
    logo: "/iso.png",
  },
  {
    id: 3,
    titulo: "OHSAS 18001 / ISO 45001 - Seguridad y Salud en el Trabajo",
    codigo: "45001",
    entidad: "Global Ports Certification",
    vigente: "Vigente hasta 09/2026",
    pdf: "/docs/certificados/iso-45001-plp.pdf",
    logo: "/iso.png",
  },
]

export default function Certificaciones() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 pt-10 md:pt-12 pb-6 md:pb-8">
        {/* Título y descripción */}
        <h1 className="text-center text-2xl font-bold text-plp-primary md:text-3xl">
          Certificaciones
        </h1>
        <p className="mt-3 text-center text-plp-gray-600 max-w-2xl mx-auto">
          {SUBTITLE}
        </p>

        {/* Grid de cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {certificados.map((c) => (
            <Card
              key={c.id}
              className="flex flex-col overflow-hidden rounded-lg border border-plp-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Área logo */}
              <div className="flex flex-col items-center justify-center bg-plp-gray-50 py-6 px-4">
                <div className="relative h-14 w-14 md:h-16 md:w-16">
                  <Image
                    src={c.logo}
                    alt="ISO"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <span className="mt-2 text-sm font-semibold text-plp-primary">
                  {c.codigo}
                </span>
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-base font-bold text-gray-900 md:text-lg">
                  {c.titulo}
                </h2>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-plp-gray-600">
                  <Calendar className="h-4 w-4 shrink-0 text-plp-primary" />
                  <span>{c.vigente}</span>
                </div>
                <p className="mt-1 text-xs text-plp-gray-500">{c.entidad}</p>
                <Button
                  asChild
                  className="mt-4 w-full bg-plp-primary hover:bg-plp-primary/90 text-white rounded-lg"
                >
                  <a href={c.pdf} download>
                    Material descargable
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
