"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Eye, Award, Download } from "lucide-react"
import Image from "next/image"

export default function AutoridadPortuaria() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sección destacada: título, texto, botón e imagen */}
      <div className="w-full py-10 md:py-14" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
                Consorcio de Gestión del Puerto La Plata
              </h1>
              <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: '#1B1E4A', opacity: 0.9 }}>
                El Consorcio de Gestión del Puerto La Plata es el ente público no estatal responsable de la administración y explotación del Puerto La Plata. Nuestra función principal es garantizar la eficiencia y competitividad de las operaciones portuarias, contribuyendo al desarrollo económico y social de la región. Como autoridad portuaria, supervisamos y coordinamos todas las actividades dentro del puerto, asegurando el cumplimiento de las normativas nacionales e internacionales, y promoviendo el crecimiento sostenible de la actividad portuaria.
              </p>
              <Button
                size="lg"
                className="bg-[#1B1E4A] hover:bg-[#272C5B] text-white rounded-lg"
                asChild
              >
                <a href="#" className="inline-flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Descargar política de calidad
                </a>
              </Button>
            </div>
            <div className="relative w-full aspect-[4/3] max-h-[320px] md:max-h-[400px] rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/banner.jpg"
                alt="Infraestructura del Puerto La Plata"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tres tarjetas: Misión, Visión, Valores */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-[#1B1E4A]/10">
              <Target className="h-6 w-6" style={{ color: '#1B1E4A' }} />
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#1B1E4A' }}>
              Misión
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Gestionar y desarrollar el puerto de manera eficiente y sostenible, facilitando el comercio marítimo y contribuyendo al desarrollo económico de la región.
            </p>
          </Card>

          <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-[#1B1E4A]/10">
              <Eye className="h-6 w-6" style={{ color: '#1B1E4A' }} />
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#1B1E4A' }}>
              Visión
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ser reconocidos como un puerto líder en la región, destacando por nuestra excelencia operativa, innovación y compromiso con el desarrollo sostenible.
            </p>
          </Card>

          <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-[#1B1E4A]/10">
              <Award className="h-6 w-6" style={{ color: '#1B1E4A' }} />
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#1B1E4A' }}>
              Valores
            </h3>
            <ul className="text-gray-600 text-sm leading-relaxed space-y-1.5 list-none">
              <li>• Excelencia operativa</li>
              <li>• Transparencia</li>
              <li>• Sostenibilidad</li>
              <li>• Innovación</li>
              <li>• Compromiso social</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
