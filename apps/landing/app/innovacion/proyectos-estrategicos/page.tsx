"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Timeline, { TimelinePeriod } from "@/components/timeline"

// Hitos históricos y proyectos estratégicos del puerto
const hitosHistoricos: TimelinePeriod[] = [
  {
    period: "1999",
    title: "Creación del Consorcio",
    image: "/banner.jpg",
    imageAlt: "Consorcio de Gestión Puerto La Plata",
    intro:
      "El 29 de septiembre se crea el Consorcio de Gestión del Puerto La Plata, iniciando una etapa caracterizada por una visión moderna y orientada al futuro.",
    items: [
      {
        year: "1999",
        text: "Inicio de gestión descentralizada del puerto con participación de los tres municipios: La Plata, Berisso y Ensenada.",
      },
    ],
  },
  {
    period: "2000-2010",
    title: "Modernización Operativa",
    image: "/social/port-sunrise.png",
    imageAlt: "Modernización del puerto",
    intro:
      "Período de transición hacia la contenedorización y modernización de las operaciones portuarias, mejorando infraestructura y conectividad.",
    items: [
      {
        year: "2000-2005",
        text: "Inversiones en dragado y mantenimiento de canales de navegación.",
      },
      {
        year: "2006-2008",
        text: "Mejoras en infraestructura de muelles y sistemas de amarre.",
      },
      {
        year: "2009-2010",
        text: "Desarrollo de sistemas de gestión operativa digital.",
      },
    ],
  },
  {
    period: "2010-2014",
    title: "Expansión Infraestructura",
    image: "/colorful-harbor-town.png",
    imageAlt: "Inversiones en infraestructura",
    items: [
      {
        year: "2010-2012",
        text: "Mejoras en conectividad vial y accesos terrestres al puerto.",
      },
      {
        year: "2013",
        text: "Plan Director de infraestructura portuaria.",
      },
      {
        year: "2014",
        text: "Inauguración de la terminal TecPlata, ampliando capacidad de carga contenerizada.",
      },
    ],
  },
  {
    period: "2015-2020",
    title: "Diversificación de Cargas",
    image: "/banner.jpg",
    imageAlt: "Diversificación operativa",
    intro:
      "Consolidación del puerto como hub multimodal con diversificación de tipos de carga y fortalecimiento de conexiones ferroviarias.",
    items: [
      {
        year: "2015-2017",
        text: "Desarrollo de terminales especializadas para diferentes tipos de carga.",
      },
      {
        year: "2018",
        text: "Mejoras en sistema ferroviario de acceso al puerto.",
      },
      {
        year: "2019-2020",
        text: "Implementación de sistemas de gestión ambiental y sostenibilidad.",
      },
    ],
  },
  {
    period: "2021-Actualidad",
    title: "Puerto Inteligente y Sostenible",
    image: "/social/port-sunrise.png",
    imageAlt: "Puerto moderno y sostenible",
    intro:
      "Transformación hacia un puerto inteligente con enfoque en sostenibilidad, digitalización y competitividad regional.",
    items: [
      {
        year: "2021-2022",
        text: "Implementación de tecnologías IoT y gestión digital de operaciones.",
      },
      {
        year: "2023",
        text: "Plan de eficiencia energética y reducción de huella de carbono.",
      },
      {
        year: "2024",
        text: "Certificaciones ambientales y de calidad operativa.",
      },
      {
        year: "Actualidad",
        text: "Desarrollo continuo de infraestructura inteligente y proyectos de expansión estratégica.",
      },
    ],
  },
]

// Obras en expansión
const obrasExpansion = [
  {
    id: 1,
    titulo: "Nuevos muelles",
    desc: "Incorporación de posiciones de atraque para incrementar capacidad operativa y diversificar cargas. Optimización de accesos náuticos y defensas.",
    etapa: "Anteproyecto",
  },
  {
    id: 2,
    titulo: "Nuevos muelles",
    desc: "Incorporación de posiciones de atraque para incrementar capacidad operativa y diversificar cargas. Optimización de accesos náuticos y defensas.",
    etapa: "Anteproyecto",
  },
  {
    id: 3,
    titulo: "Nuevos muelles",
    desc: "Incorporación de posiciones de atraque para incrementar capacidad operativa y diversificar cargas. Optimización de accesos náuticos y defensas.",
    etapa: "Anteproyecto",
  },
  {
    id: 4,
    titulo: "Interconexión ferroviaria",
    desc: "Mejora de vinculación ferroviaria para ingreso de trenes a áreas operativas, reduciendo tiempos y emisiones del transporte.",
    etapa: "En evaluación",
  },
  {
    id: 5,
    titulo: "Interconexión ferroviaria",
    desc: "Mejora de vinculación ferroviaria para ingreso de trenes a áreas operativas, reduciendo tiempos y emisiones del transporte.",
    etapa: "En evaluación",
  },
  {
    id: 6,
    titulo: "Interconexión ferroviaria",
    desc: "Mejora de vinculación ferroviaria para ingreso de trenes a áreas operativas, reduciendo tiempos y emisiones del transporte.",
    etapa: "En evaluación",
  },
]

export default function ProyectosEstrategicos() {
  return (
    <div className="min-h-screen bg-white">
      {/* Primera sección: Título e introducción + Timeline (fondo celeste) */}
      <div className="w-full pt-6 pb-0" style={{ backgroundColor: "#CAE6FF" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center pb-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Proyectos estratégicos
            </h1>
            <p className="text-sm md:text-base text-plp-gray-600 leading-relaxed">
              Desde 1999, el Puerto La Plata ha experimentado una transformación constante, consolidándose como un
              puerto moderno, sostenible e inteligente. Conoce los hitos más importantes y los proyectos que impulsarán
              nuestro futuro.
            </p>
          </div>
        </div>
      </div>

      {/* Segunda sección: Timeline de hitos históricos (fondo celeste) */}
      <Timeline data={hitosHistoricos} backgroundColor="#CAE6FF" />

      {/* Tercera sección: Obras en expansión en cards */}
      <div className="w-full bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-plp-primary mb-5 text-center">Obras en expansión</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {obrasExpansion.map((obra) => (
                <Card
                  key={obra.id}
                  className="p-4 bg-white rounded-md border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-semibold text-plp-primary mb-2">{obra.titulo}</h3>
                  <p className="text-xs text-plp-gray-700 leading-relaxed mb-2">{obra.desc}</p>
                  <Badge className="bg-plp-primary/10 text-plp-primary text-xs">{obra.etapa}</Badge>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
