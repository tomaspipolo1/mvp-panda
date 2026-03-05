"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FeatureImageCard } from "@/components/feature-image-card"
import { MapSection } from "@/components/map-section"
import {
  MapPin,
  Train,
  Network,
  Ship,
  Settings,
  FileText,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Tipos de conexiones (cards grandes imagen + texto, estilo ventajas competitivas)
const tiposConexiones = [
  {
    id: "terrestre",
    titulo: "Transporte Terrestre",
    descripcion: "Conexiones por carretera entre terminales y accesos terrestres",
    icon: MapPin,
    empresas: ["Logística Portuaria S.A.", "Transportes del Sur", "Cargo Express La Plata"],
    bgTexto: "#E1F0FF",
    imagen: "/banner.jpg",
    layout: "imagen-izq" as const,
  },
  {
    id: "ferroviario",
    titulo: "Transporte Ferroviario",
    descripcion: "Conexiones ferroviarias operadas por PLP",
    icon: Train,
    empresas: ["PLP - Puerto La Plata"],
    bgTexto: "#F2F2F2",
    imagen: "/social/port-sunrise.png",
    layout: "texto-izq" as const,
  },
  {
    id: "intermodal",
    titulo: "Conexiones Intermodales",
    descripcion: "Integración entre diferentes modos de transporte",
    icon: Network,
    empresas: ["Sistema Integrado PLP", "Intermodal La Plata"],
    bgTexto: "#F2E9F7",
    imagen: "/colorful-harbor-town.png",
    layout: "imagen-izq" as const,
  },
]

// Terminales conectadas (cards compactas 2x2)
const terminalesConectadas = [
  {
    id: 1,
    titulo: "Terminal de Contenedores TecPlata",
    subtitulo: "Tarifas y aranceles para operaciones de importación",
    items: [
      "Ubicación: Sitio 1-2",
      "Conexiones: Terrestre, Ferroviario",
      "Capacidad: 1.2 millones TEU/año",
    ],
  },
  {
    id: 2,
    titulo: "Complejo Industrial YPF",
    subtitulo: "Tarifas y aranceles para operaciones de importación",
    items: [
      "Ubicación: Sitio 3-4",
      "Conexiones: Terrestre, Ferroviario",
      "Capacidad: 45.000 m³/día",
    ],
  },
  {
    id: 3,
    titulo: "Terminal Copetro",
    subtitulo: "Tarifas y aranceles para operaciones de importación",
    items: [
      "Ubicación: Sitio 7-8",
      "Conexiones: Terrestre, Ferroviario",
      "Capacidad: 55.000 toneladas",
    ],
  },
  {
    id: 4,
    titulo: "Terminal de Areneras",
    subtitulo: "Tarifas y aranceles para operaciones de importación",
    items: [
      "Ubicación: Sitio 9-10",
      "Conexiones: Terrestre",
      "Capacidad: 500.000 ton/año",
    ],
  },
]

// Rutas principales (3 columnas con icono, título, descripción)
const rutasPrincipales = [
  {
    id: 1,
    titulo: "Coordinación operativa",
    descripcion: "Gestión coordinada de atraques, servicios auxiliares y operaciones portuarias.",
    icon: Ship,
  },
  {
    id: 2,
    titulo: "Desarrollo conjunto",
    descripcion: "Trabajo conjunto con terminales y operadores para optimizar la cadena logística.",
    icon: MapPin,
  },
  {
    id: 3,
    titulo: "Servicios integrados",
    descripcion: "Integración entre transporte terrestre, ferroviario y portuario en un solo flujo.",
    icon: Settings,
  },
]

function scrollToMap() {
  const el = document.getElementById("mapa-conexiones")
  el?.scrollIntoView({ behavior: "smooth" })
}

export default function TransporteTerrestrePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero: Servicios de Transporte Terrestre */}
      <section className="w-full py-10 md:py-14 bg-plp-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-plp-primary mb-4">
              Servicios de Transporte Terrestre
            </h1>
            <p className="text-lg text-plp-gray-700 mb-2">
              Conexiones intermodales entre terminales, CGPLP y accesos terrestres y ferroviarios.
            </p>
            <p className="text-plp-gray-700 mb-8">
              Mapa de rutas para camiones y conexiones ferroviarias operadas por PLP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-plp-primary text-plp-primary hover:bg-plp-primary/10 bg-white"
                onClick={scrollToMap}
              >
                Ver mapa de rutas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-plp-primary text-plp-primary hover:bg-plp-primary/10 bg-white"
                asChild
              >
                <Link href="/servicios/operadores-organismos/empresas-servicios-portuarios">
                  Empresas de logística
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Conexiones Intermodales — cards estilo ventajas competitivas */}
      <section className="w-full py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-4 text-center">
              Tipos de Conexiones Intermodales
            </h2>
            <p className="text-plp-gray-700 text-center mb-12 max-w-3xl mx-auto">
              El Puerto La Plata cuenta con una red integral de conexiones terrestres y ferroviarias
              que conectan todas las terminales con los principales accesos y destinos.
            </p>
            <div className="space-y-8">
              {tiposConexiones.map((t) => (
                <FeatureImageCard
                  key={t.id}
                  titulo={t.titulo}
                  descripcion={t.descripcion}
                  icon={t.icon}
                  items={t.empresas}
                  bgTexto={t.bgTexto}
                  imagen={t.imagen}
                  imagenAlt={t.titulo}
                  layout={t.layout}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mapa de conexiones intermodales — reutiliza MapSection de la homepage */}
      <MapSection
        id="mapa-conexiones"
        title="Mapa de conexiones intermodales"
        description="Visualización de las conexiones entre terminales, CGPLP y accesos terrestres y ferroviarios"
      />

      {/* Terminales conectadas — 4 cards en grid 2x2 */}
      <section className="w-full py-14 md:py-20 bg-plp-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-10 text-center">
            Terminales conectadas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {terminalesConectadas.map((t) => (
              <Card
                key={t.id}
                className="p-6 bg-white rounded-xl shadow-sm border border-plp-gray-200 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-plp-primary/10 shrink-0">
                    <MapPin className="h-6 w-6 text-plp-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-plp-primary">{t.titulo}</h3>
                </div>
                <p className="text-sm text-plp-gray-600 mb-4">{t.subtitulo}</p>
                <ul className="space-y-2 mt-auto">
                  {t.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-plp-gray-700">
                      <FileText className="h-4 w-4 text-plp-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rutas principales — 3 columnas con icono, título, descripción */}
      <section className="w-full py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-10 text-center">
            Rutas principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {rutasPrincipales.map((r, i) => (
              <div key={r.id} className="relative flex flex-col items-center text-center px-4">
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-plp-gray-200"
                    aria-hidden
                  />
                )}
                <div className="p-3 rounded-full bg-plp-primary/10 mb-4">
                  <r.icon className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-bold text-plp-primary mb-2">{r.titulo}</h3>
                <p className="text-sm text-plp-gray-600 leading-relaxed">{r.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: ¿Tienes un proyecto en mente? */}
      <section className="w-full py-14 md:py-20 bg-plp-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl bg-plp-primary border-0 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">¿Tienes un proyecto en mente?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Nuestro equipo comercial está disponible para analizar tu propuesta y encontrar la
              mejor manera de hacerla realidad en el Puerto La Plata.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para consultar sobre un proyecto que desearía realizar y recibir más información.`)}`}
              >
                <Button
                  size="lg"
                  className="bg-white text-plp-primary hover:bg-plp-gray-100 w-full sm:w-auto"
                >
                  Contactar equipo comercial
                </Button>
              </Link>
              <Link
                href={`/contacto?tipoConsulta=cotizacion&asunto=${encodeURIComponent(`Solicitar cotización`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para solicitar una cotización para un proyecto que desearía realizar y recibir más información.`)}`}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent w-full sm:w-auto"
                >
                  Solicitar cotización
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
