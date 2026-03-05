"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, FileSearch, Download } from "lucide-react"
import Link from "next/link"

const documentosTarifarios = [
  { titulo: "Tarifa de Uso del Puerto", subtitulo: "Tarifas y aranceles para operaciones de importación", detalle: "Clasificación arancelaria y tarifas por categoría", tamano: "2.3 MB", fecha: "Enero 2024" },
  { titulo: "Tarifa de Importación", subtitulo: "Tarifas y aranceles para operaciones de importación", detalle: "Clasificación arancelaria y tarifas por categoría", tamano: "3.1 MB", fecha: "Enero 2024" },
  { titulo: "Tarifa de Exportación", subtitulo: "Tarifas y aranceles para operaciones de importación", detalle: "Clasificación arancelaria y tarifas por categoría", tamano: "2.8 MB", fecha: "Enero 2024" },
  { titulo: "Tarifa de Servicios Especiales", subtitulo: "Tarifas y aranceles para operaciones de importación", detalle: "Clasificación arancelaria y tarifas por categoría", tamano: "2.5 MB", fecha: "Enero 2024" },
  { titulo: "Tarifa de Almacenamiento", subtitulo: "Tarifas y aranceles para operaciones de importación", detalle: "Clasificación arancelaria y tarifas por categoría", tamano: "2.9 MB", fecha: "Enero 2024" },
  { titulo: "Tarifa de Transporte", subtitulo: "Tarifas y aranceles para operaciones de importación", detalle: "Clasificación arancelaria y tarifas por categoría", tamano: "2.4 MB", fecha: "Enero 2024" },
]

const informacionAdicional = [
  { titulo: "Documentación Requerida", descripcion: "Las tarifas se actualizan anualmente y pueden estar sujetas a modificaciones durante el año según las regulaciones vigentes." },
  { titulo: "Actualizaciones de Tarifas", descripcion: "Las tarifas se actualizan anualmente y pueden estar sujetas a modificaciones durante el año según las regulaciones vigentes." },
  { titulo: "Consultas Especiales", descripcion: "Las tarifas se actualizan anualmente y pueden estar sujetas a modificaciones durante el año según las regulaciones vigentes." },
  { titulo: "Procedimientos", descripcion: "Las tarifas se actualizan anualmente y pueden estar sujetas a modificaciones durante el año según las regulaciones vigentes." },
  { titulo: "Medios de Pago", descripcion: "Las tarifas se actualizan anualmente y pueden estar sujetas a modificaciones durante el año según las regulaciones vigentes." },
  { titulo: "Herramientas de Cálculo", descripcion: "Las tarifas se actualizan anualmente y pueden estar sujetas a modificaciones durante el año según las regulaciones vigentes." },
]

export default function TarifarioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Tarifario — fondo gris, icono y título un poco a la izquierda */}
      <section className="w-full py-10 md:py-14 bg-plp-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto -translate-x-2 md:-translate-x-6 grid md:grid-cols-2 gap-4 md:gap-6 items-center">
            <div className="flex justify-center md:justify-start">
              <FileText className="h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 text-plp-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-plp-primary mb-4">
                Tarifario
              </h1>
              <p className="text-plp-gray-600 leading-relaxed mb-6">
                Tarifas unificadas del Puerto La Plata. Descarga de archivos PDF y herramientas de cálculo para estimar costos de operaciones portuarias.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-plp-primary bg-white text-plp-primary hover:bg-plp-gray-100"
              >
                Descargar tarifas
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifas Unificadas + grid de 6 cards de documentos */}
      <section className="w-full pt-12 md:pt-16 pb-6 md:pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-6">
              Tarifas Unificadas del Puerto La Plata
            </h2>
            <p className="text-plp-gray-600 leading-relaxed">
              Acceda a todas las tarifas vigentes del Puerto La Plata organizadas por categorías. Descargue los archivos PDF correspondientes y utilice nuestras herramientas de cálculo para estimar los costos de sus operaciones portuarias.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentosTarifarios.map((doc, i) => (
              <Card
                key={i}
                className="p-5 bg-plp-gray-50 rounded-xl shadow-sm border border-plp-gray-200"
              >
                <div className="flex items-start gap-3 mb-4">
                  <FileSearch className="h-5 w-5 text-plp-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-plp-primary">{doc.titulo}</h3>
                    <p className="text-sm text-plp-gray-600">{doc.subtitulo}</p>
                  </div>
                </div>
                <Card className="p-4 bg-white rounded-lg border border-plp-gray-200 shadow-sm">
                  <div className="flex items-start gap-2 mb-3">
                    <FileText className="h-4 w-4 text-plp-primary shrink-0 mt-0.5" />
                    <h4 className="font-bold text-plp-primary text-sm">{doc.titulo}</h4>
                  </div>
                  <p className="text-xs text-plp-gray-600 mb-3">{doc.detalle}</p>
                  <div className="flex justify-between text-xs text-plp-gray-600 mb-4">
                    <span>{doc.tamano}</span>
                    <span>{doc.fecha}</span>
                  </div>
                  <Button size="sm" className="w-full bg-plp-primary hover:bg-plp-primary/90 text-white">
                    Descargar
                  </Button>
                </Card>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Descarga Completa de Tarifas */}
      <section className="w-full py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-6">
              Descarga Completa de Tarifas
            </h2>
            <p className="text-plp-gray-600 leading-relaxed mb-8">
              Descargue el paquete completo de tarifas en formato ZIP que incluye todos los archivos PDF organizados por categorías para su consulta offline.
            </p>
            <Button size="lg" className="bg-plp-primary hover:bg-plp-primary/90 text-white">
              <Download className="mr-2 h-5 w-5" />
              Descargar Tarifario completo (ZIP)
            </Button>
          </div>
        </div>
      </section>

      {/* Información adicional — 6 cards */}
      <section className="w-full pt-6 md:pt-8 pb-12 md:pb-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-10 text-center">
            Información adicional
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {informacionAdicional.map((info, i) => (
              <Card
                key={i}
                className="p-6 bg-plp-gray-50 rounded-xl shadow-sm border border-plp-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-plp-primary/10 shrink-0">
                    <FileText className="h-5 w-5 text-plp-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-plp-primary mb-2">{info.titulo}</h3>
                    <p className="text-sm text-plp-gray-600 leading-relaxed">{info.descripcion}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ¿Necesitas ayuda con las tarifas? — fondo plp-primary, menos ancho */}
      <section className="w-full py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto bg-plp-primary rounded-3xl py-12 md:py-16 px-6 md:px-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Necesitas ayuda con las tarifas?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de tarifas está disponible para ayudarte con cualquier consulta sobre costos y procedimientos portuarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para consultar sobre las tarifas vigentes.`)}`}
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
          </div>
        </div>
      </section>
    </div>
  )
}
