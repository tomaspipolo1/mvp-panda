"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import WorkingGoogleMap from "@/components/working-google-map"
import { 
  Building2,
  Ship,
  Warehouse,
  Factory,
  MapPin,
  Info,
  ExternalLink,
  Layers,
  Filter,
  Download,
  FileText
} from "lucide-react"
import Link from "next/link"

// Tipos de operadores
const operatorTypes = [
  { id: "all", label: "Todos", icon: Layers, color: "bg-gray-500" },
  { id: "consortium", label: "Consorcio", icon: Building2, color: "bg-blue-600" },
  { id: "tenants", label: "Arrendatarios", icon: Warehouse, color: "bg-green-600" },
  { id: "operators", label: "Operadores", icon: Ship, color: "bg-purple-600" },
  { id: "freezone", label: "Zona Franca", icon: Factory, color: "bg-orange-600" },
  { id: "shipyards", label: "Astilleros", icon: Ship, color: "bg-red-600" }
]

// Datos de los operadores en el mapa
const mapOperators = [
  {
    id: 1,
    name: "Consorcio de Gestión del Puerto La Plata",
    type: "consortium",
    category: "Administración",
    description: "Ente administrador del puerto y coordinador de operaciones",
    position: { x: 50, y: 30 },
    website: "/institucional/nosotros",
    details: {
      superficie: "Toda el área portuaria",
      servicios: ["Administración", "Coordinación", "Seguridad"],
      contacto: "info@puertolaplata.com"
    }
  },
  {
    id: 2,
    name: "Terminal de Contenedores TCLP",
    type: "tenants",
    category: "Contenedores",
    description: "Operador principal de contenedores y carga general",
    position: { x: 25, y: 45 },
    website: "/servicios/vision-comercial/oportunidades",
    details: {
      superficie: "15.000 m²",
      servicios: ["Contenedores", "Carga general", "Almacenamiento"],
      contacto: "tclp@puertolaplata.com"
    }
  },
  {
    id: 3,
    name: "Terminal de Graneles Sólidos",
    type: "tenants",
    category: "Graneles",
    description: "Especializada en graneles sólidos y minerales",
    position: { x: 75, y: 60 },
    website: "/servicios/vision-comercial/oportunidades",
    details: {
      superficie: "8.000 m²",
      servicios: ["Graneles sólidos", "Minerales", "Cereales"],
      contacto: "graneles@puertolaplata.com"
    }
  },
  {
    id: 4,
    name: "Zona Franca La Plata",
    type: "freezone",
    category: "Zona Franca",
    description: "Área de libre comercio con beneficios fiscales",
    position: { x: 40, y: 70 },
    website: "/servicios/vision-comercial/oportunidades",
    details: {
      superficie: "50.000 m²",
      servicios: ["Almacenamiento", "Transformación", "Comercialización"],
      contacto: "zonafranca@puertolaplata.com"
    }
  },
  {
    id: 5,
    name: "Astillero Río de la Plata",
    type: "shipyards",
    category: "Astilleros",
    description: "Reparaciones navales y construcción de embarcaciones",
    position: { x: 60, y: 80 },
    website: "/servicios/vision-comercial/oportunidades",
    details: {
      superficie: "12.000 m²",
      servicios: ["Reparaciones", "Construcción", "Mantenimiento"],
      contacto: "astillero@puertolaplata.com"
    }
  },
  {
    id: 6,
    name: "Operador Logístico Multimodal",
    type: "operators",
    category: "Logística",
    description: "Servicios de logística integrada y distribución",
    position: { x: 80, y: 40 },
    website: "/servicios/vision-comercial/oportunidades",
    details: {
      superficie: "6.000 m²",
      servicios: ["Logística", "Distribución", "Almacenamiento"],
      contacto: "logistica@puertolaplata.com"
    }
  },
  {
    id: 7,
    name: "Terminal de Hidrocarburos",
    type: "tenants",
    category: "Hidrocarburos",
    description: "Especializada en productos petrolíferos y químicos",
    position: { x: 20, y: 75 },
    website: "/servicios/vision-comercial/oportunidades",
    details: {
      superficie: "10.000 m²",
      servicios: ["Hidrocarburos", "Productos químicos", "Combustibles"],
      contacto: "hidrocarburos@puertolaplata.com"
    }
  },
  {
    id: 8,
    name: "Centro de Servicios Portuarios",
    type: "operators",
    category: "Servicios",
    description: "Servicios auxiliares y de apoyo a la navegación",
    position: { x: 45, y: 55 },
    website: "/servicios/vision-comercial/oportunidades",
    details: {
      superficie: "3.000 m²",
      servicios: ["Remolque", "Bunkering", "Asistencia técnica"],
      contacto: "servicios@puertolaplata.com"
    }
  }
]

export default function MapaInteractivo() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedOperator, setSelectedOperator] = useState<any>(null)

  const filteredOperators = selectedFilter === "all" 
    ? mapOperators 
    : mapOperators.filter(op => op.type === selectedFilter)

  const getOperatorTypeInfo = (type: string) => {
    return operatorTypes.find(t => t.id === type)
  }

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
              <h3 className="text-lg font-semibold text-plp-primary">Filtrar por tipo</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {operatorTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedFilter(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    selectedFilter === type.id
                      ? 'bg-plp-primary text-white border-plp-primary'
                      : 'bg-white text-plp-gray-700 border-gray-300 hover:border-plp-primary hover:text-plp-primary'
                  }`}
                >
                  <type.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </section>

        {/* Mapa de Google Maps con KML */}
        <section className="mb-12">
          <Card className="p-4">
            <WorkingGoogleMap />
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
