"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Target,
  Users,
  TrendingUp,
  Award,
  FileText,
  BarChart3,
  MapPin,
  Settings,
} from "lucide-react"

const TITULO_DESCRIPCION =
  "El Puerto La Plata implementa y mantiene un Sistema de Gestión de Calidad certificado bajo la norma ISO 9001:2015, garantizando la excelencia en nuestros servicios y procesos operativos. Esta certificación refleja nuestro compromiso con la mejora continua y la satisfacción de nuestros clientes."

const objetivos = [
  {
    icon: Target,
    titulo: "Mejora continua",
    descripcion:
      "Implementamos procesos sistemáticos para identificar oportunidades de mejora y optimizar nuestros servicios portuarios.",
  },
  {
    icon: Users,
    titulo: "Satisfacción del cliente",
    descripcion:
      "Nos enfocamos en entender y superar las expectativas de nuestros clientes, usuarios y partes interesadas.",
  },
  {
    icon: Shield,
    titulo: "Gestión de riesgos",
    descripcion:
      "Identificamos, evaluamos y gestionamos proactivamente los riesgos operativos y ambientales.",
  },
  {
    icon: TrendingUp,
    titulo: "Eficiencia operativa",
    descripcion:
      "Optimizamos nuestros procesos para maximizar la eficiencia y reducir costos operativos.",
  },
]

const beneficios = [
  {
    titulo: "Certificación internacional",
    descripcion: "Reconocimiento mundial de nuestros estándares de calidad y gestión.",
  },
  {
    titulo: "Competitividad",
    descripcion: "Ventaja competitiva en el mercado portuario regional e internacional.",
  },
  {
    titulo: "Confianza de clientes",
    descripcion: "Mayor credibilidad y confianza de nuestros usuarios y operadores portuarios.",
  },
  {
    titulo: "Mejora de procesos",
    descripcion: "Procesos más eficientes, documentados y controlados.",
  },
]

const politicas = [
  {
    icon: MapPin,
    titulo: "Política de calidad",
    descripcion:
      "Compromiso con la excelencia operativa, mejora continua y satisfacción del cliente a través de procesos estandarizados y monitoreados.",
  },
  {
    icon: Settings,
    titulo: "Gestión de procesos",
    descripcion:
      "Documentación, control y mejora continua de todos los procesos operativos para garantizar eficiencia y calidad en nuestros servicios.",
  },
  {
    icon: Users,
    titulo: "Enfoque al cliente",
    descripcion:
      "Priorizamos las necesidades de nuestros clientes y partes interesadas, implementando mejoras basadas en sus expectativas y feedback.",
  },
]

export default function NormasPoliticas() {
  return (
    <div className="bg-white">
      {/* Sección título y descripción — fondo medio gris */}
      <section className="w-full bg-plp-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-col items-center gap-3">
              <Award className="h-12 w-12 text-plp-primary" />
              <Badge className="bg-white border border-plp-gray-300 text-plp-gray-700 text-base px-4 py-2">
                ISO 9001:2015
              </Badge>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Sistema de Gestión de Calidad
            </h1>
            <p className="mt-4 text-plp-gray-600 leading-relaxed">{TITULO_DESCRIPCION}</p>
          </div>
        </div>
      </section>

      {/* Sección Objetivos principales — fondo celeste, separados por línea (sin cards) */}
      <section className="w-full bg-sky-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-plp-primary md:text-3xl mb-10">
            Objetivos principales
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-4 gap-0">
            {objetivos.map((obj, index) => {
              const Icon = obj.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center border-b border-plp-gray-300 px-4 py-4 text-center last:border-b-0 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
                >
                  <Icon className="h-8 w-8 text-plp-primary mb-3" />
                  <h3 className="text-base font-bold text-gray-900">{obj.titulo}</h3>
                  <p className="mt-2 text-sm text-plp-gray-600">{obj.descripcion}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sección Beneficios — imagen a la izquierda, texto a la derecha (sin cards) */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-plp-primary md:text-3xl mb-10">
            Beneficios de la certificación
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12 md:items-center">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src="/social/DSC04672.JPG"
                alt="Puerto La Plata"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-0">
              {beneficios.map((b, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4 bg-plp-gray-200" />}
                  <h3 className="text-base font-bold text-gray-900">{b.titulo}</h3>
                  <p className="mt-1 text-sm text-plp-gray-600">{b.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección Políticas implementadas — cards */}
      <section className="w-full bg-plp-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-plp-primary md:text-3xl mb-10">
            Políticas implementadas
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {politicas.map((pol, index) => {
              const Icon = pol.icon
              return (
                <Card
                  key={index}
                  className="flex flex-col items-center rounded-lg border border-plp-gray-200 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-plp-primary/10">
                    <Icon className="h-6 w-6 text-plp-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{pol.titulo}</h3>
                  <p className="mt-2 text-sm text-plp-gray-600 leading-relaxed">{pol.descripcion}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Banner (card) — fondo celeste, botón azul */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-4xl overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-sky-100 to-sky-200/90 py-8 px-6 text-center shadow-sm md:py-10 md:px-10">
            <h2 className="text-lg font-bold text-plp-primary md:text-xl max-w-2xl mx-auto leading-snug">
              ¿Necesitás más información sobre nuestros procesos de calidad?
            </h2>
            <p className="mt-3 text-sm text-plp-primary/80 max-w-xl mx-auto leading-relaxed">
              Nuestro equipo de calidad está disponible para brindarte información detallada sobre
              nuestros procesos certificados.
            </p>
            <Link
              href={`/contacto?tipoConsulta=calidad&asunto=${encodeURIComponent(`Consulta calidad`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos debido a que necesito mas información sobre los procesos de calidad del Puerto La Plata.`)}`}
            >
            <Button 
              asChild
              className="mt-5 bg-plp-primary hover:bg-plp-primary/90 text-white rounded-lg px-6 text-sm"
            > Contactar al equipo de calidad
            </Button>
            </Link>    
          </Card>
        </div>
      </section>
    </div>
  )
}
