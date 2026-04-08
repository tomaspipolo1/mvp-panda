"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import WorkingGoogleMap from "@/components/working-google-map"
import MapFilters, { MAP_FILTERS, type MapFilterId } from "@/components/map-filters"
import { 
  MapPin,
  ExternalLink,
  Filter,
  Download,
  FileText
} from "lucide-react"
import Link from "next/link"

export default function MapaInteractivo() {
  const [selectedFilters, setSelectedFilters] = useState<MapFilterId[]>(MAP_FILTERS.map((filter) => filter.id))

  return (
    <div className="min-h-screen bg-white">
     

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introducción */}
        <section className="mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-plp-primary mb-4">Descubre nuestro puerto</h2>
            <p className="text-plp-gray-700 leading-relaxed">
              El Puerto La Plata es un complejo portuario integrado que alberga múltiples operadores 
              especializados. Navega por el mapa para conocer cada instalación y sus servicios.
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section className="mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="h-5 w-5 text-plp-primary" />
              <h3 className="text-lg font-semibold text-plp-primary">Filtrar capas del KMZ</h3>
            </div>
            <MapFilters selectedFilters={selectedFilters} onChange={setSelectedFilters} />
          </Card>
        </section>

        {/* Mapa de Google Maps con KML */}
        <section className="mb-12">
          <Card className="p-4">
            <WorkingGoogleMap activeFilters={selectedFilters} />
          </Card>
        </section>

        



        {/* CTA final */}
        <section className="flex justify-center px-4">
          <Card className="w-full max-w-4xl p-8 bg-gradient-to-r from-plp-primary to-plp-secondary text-white text-center rounded-xl">
            <h3 className="text-2xl font-bold mb-4">¿Interesado en operar en el puerto?</h3>
            <p className="text-lg mb-6 opacity-90 max-w-xl mx-auto">
              Conecta con nuestros operadores o consulta sobre oportunidades de arrendamiento.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/servicios/oportunidades">
                <Button size="lg" className="bg-white text-plp-primary hover:bg-gray-100 w-full sm:w-auto">
                  Ver oportunidades
                </Button>
              </Link>
              <Link
                href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial por oportunidades`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para obtener más información sobre las oportunidades de arrendamiento que ofrecen.`)}`}
              >
                <Button size="lg" className="bg-white text-plp-primary hover:bg-gray-100 w-full sm:w-auto">
                  Contactar equipo comercial
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
