"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Ship, Globe, Download } from "lucide-react"
import Image from "next/image"

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sección destacada: título, texto, botón e imagen */}
      <div className="w-full py-10 md:py-14" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
                Puerto La Plata
              </h1>
              <p className="text-base md:text-lg mb-4 leading-relaxed" style={{ color: '#1B1E4A', opacity: 0.9 }}>
                El Puerto La Plata es una terminal multipropósito ubicada sobre la ribera del Río de la Plata, en una zona estratégica del litoral bonaerense. Su localización lo posiciona como un nodo clave para el comercio exterior y la logística regional, articulando el intercambio de cargas con los principales polos productivos del entorno.
              </p>
              <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: '#1B1E4A', opacity: 0.9 }}>
                En su área de influencia se encuentran importantes corredores industriales y de servicios, con acceso a redes viales y ferroviarias. Esta conectividad favorece operaciones eficientes y seguras para distintos tipos de cargas, impulsando el desarrollo económico y la integración logística de la región.
              </p>
              <Button
                size="lg"
                className="bg-[#1B1E4A] hover:bg-[#272C5B] text-white rounded-lg"
                asChild
              >
                <a href="#" className="inline-flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Descargar plano del puerto
                </a>
              </Button>
            </div>
            <div className="relative w-full aspect-[4/3] max-h-[320px] md:max-h-[400px] rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/puerto-plata-satellite.png"
                alt="Vista del Puerto La Plata"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tres tarjetas: Ubicación, Infraestructura, Conectividad */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-[#1B1E4A]/10">
              <MapPin className="h-6 w-6" style={{ color: '#1B1E4A' }} />
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#1B1E4A' }}>
              Ubicación
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Situado en la margen del Río de la Plata, el puerto se integra al entramado urbano e industrial de su área metropolitana y a la red de accesos regionales, facilitando la conexión con centros productivos cercanos.
            </p>
          </Card>

          <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-[#1B1E4A]/10">
              <Ship className="h-6 w-6" style={{ color: '#1B1E4A' }} />
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#1B1E4A' }}>
              Infraestructura y servicios
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cuenta con instalaciones para contenedores, cargas generales y a granel, además de áreas operativas y de apoyo. La infraestructura está pensada para brindar operaciones confiables y adaptadas a distintas necesidades logísticas.
            </p>
          </Card>

          <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-[#1B1E4A]/10">
              <Globe className="h-6 w-6" style={{ color: '#1B1E4A' }} />
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#1B1E4A' }}>
              Conectividad y competitividad
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              La proximidad a corredores logísticos y centros de consumo mejora los tiempos de tránsito y la previsibilidad. Su posicionamiento fortalece la competitividad regional y la integración con cadenas de valor.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
