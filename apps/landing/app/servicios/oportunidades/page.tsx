"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ship, MapPin, Sparkles, Building2, ArrowRight, DollarSign, Users, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const CELESTE = "#CAE6FF"

const oportunidadesNegocio = [
  {
    titulo: "Operaciones portuarias",
    descripcion: "Facilitamos la logística para que tu empresa pueda operar desde nuestro puerto con ventajas competitivas y servicios integrales.",
    icon: Ship,
    items: ["Tarifas preferenciales", "Asesoramiento logístico", "Conectividad multimodal"],
  },
  {
    titulo: "Arrendamiento de espacios",
    descripcion: "Opciones flexibles de alquiler para oficinas, depósitos y áreas operativas dentro del puerto.",
    icon: MapPin,
    items: ["Ubicación estratégica", "Servicios incluidos", "Flexibilidad contractual"],
  },
  {
    titulo: "Proyectos de expansión",
    descripcion: "Colaboramos en el desarrollo de nuevos negocios y ampliaciones de operaciones portuarias.",
    icon: Sparkles,
    items: ["Análisis de viabilidad", "Soporte técnico", "Financiamiento"],
  },
]

const sitiosMuelles = [
  { titulo: "Carga y descarga de contenedores", nombreSitio: "Oficinas y servicios", longitud: "500-2000 m²" },
  { titulo: "Carga de proyecto", nombreSitio: "Oficinas y servicios", longitud: "500-2000 m²" },
  { titulo: "Conectividad multimodal", nombreSitio: "Oficinas y servicios", longitud: "500-2000 m²" },
]

const areasArrendamiento = [
  { titulo: "Terminales portuarias", edificio: "Edificio central", superficie: "500-2000 m²", uso: "Oficinas y servicios", disponibilidad: "Inmediata" },
  { titulo: "Actividades industriales / comerciales", edificio: "Edificio central", superficie: "500-2000 m²", uso: "Oficinas y servicios", disponibilidad: "3 meses" },
  { titulo: "Espacios de publicidad", edificio: "Edificio central", superficie: "500-2000 m²", uso: "Oficinas y servicios", disponibilidad: "6 meses" },
]

const proyectosExpansion = [
  { titulo: "A definir", edificio: "Edificio central", superficie: "500-2000 m²", uso: "Oficinas y servicios", disponibilidad: "Inmediata" },
  { titulo: "A definir", edificio: "Edificio central", superficie: "500-2000 m²", uso: "Oficinas y servicios", disponibilidad: "3 meses" },
  { titulo: "A definir", edificio: "Edificio central", superficie: "500-2000 m²", uso: "Oficinas y servicios", disponibilidad: "6 meses" },
]

const otrasSecciones = [
  { label: "Ventajas competitivas", href: "/servicios/vision-comercial/ventajas-competitivas" },
  { label: "Mapa del puerto", href: "/servicios/vision-comercial/mapa" },
  { label: "Licitaciones", href: "/licitaciones" },
  { label: "Tarifario", href: "/servicios/tarifario" },
]

function CarouselCardsSection({
  titulo,
  children,
  bgCeleste = false,
  bgBlanco = false,
  bgClaro = false,
}: { titulo: string; children: React.ReactNode; bgCeleste?: boolean; bgBlanco?: boolean; bgClaro?: boolean }) {
  const sectionBg = bgCeleste ? undefined : bgBlanco ? "bg-white" : bgClaro ? "bg-plp-gray-50" : "bg-plp-gray-100"
  return (
    <section
      className={`w-full py-12 md:py-16 ${sectionBg}`}
      style={bgCeleste ? { backgroundColor: CELESTE } : undefined}
    >
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-bold text-plp-primary mb-8 text-center">{titulo}</h3>
        <div className="relative max-w-6xl mx-auto pl-14 pr-14 md:pl-20 md:pr-20">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">{children}</CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 top-1/2 -translate-y-1/2 h-10 w-10" />
            <CarouselNext className="-right-4 md:-right-12 top-1/2 -translate-y-1/2 h-10 w-10" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default function OportunidadesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero: Traé tu carga al Puerto La Plata — fondo celeste, imagen izq, CTA der */}
      <section className="w-full py-10 md:py-14" style={{ backgroundColor: CELESTE }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden aspect-video md:aspect-[4/3] bg-plp-gray-200">
              <Image
                src="/banner.jpg"
                alt="Conectividad logística Puerto La Plata"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-4">
                Traé tu carga al Puerto La Plata
              </h2>
              <p className="text-plp-gray-600 leading-relaxed mb-6">
                Conectamos tu negocio con el mundo a través de servicios logísticos integrales, tarifas competitivas y la mejor ubicación estratégica de la región.
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2 text-plp-gray-700">
                  <DollarSign className="h-5 w-5 text-plp-primary shrink-0" />
                  <span className="text-sm md:text-base">Tarifas preferenciales</span>
                </div>
                <div className="flex items-center gap-2 text-plp-gray-700">
                  <Users className="h-5 w-5 text-plp-primary shrink-0" />
                  <span className="text-sm md:text-base">Asesoramiento especializado</span>
                </div>
                <div className="flex items-center gap-2 text-plp-gray-700">
                  <Calendar className="h-5 w-5 text-plp-primary shrink-0" />
                  <span className="text-sm md:text-base">Plazos flexibles</span>
                </div>
              </div>
              <Link
                      href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial por oportunidades`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para obtener más información sobre las oportunidades de negocio que ofrecen.`)}`}
                      className="flex-1"
                    >
                  <Button variant="outline" size="lg" className="border-2 border-plp-primary bg-white text-plp-primary hover:bg-plp-gray-100">
                Consultar oportunidades
                <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Oportunidades de negocio — 3 cards en fila */}
      <section className="w-full pt-12 md:pt-16 pb-16 md:pb-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-10 text-center">
            Oportunidades de negocio
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {oportunidadesNegocio.map((op, i) => (
              <Card key={i} className="p-6 bg-white rounded-xl shadow-md border-0 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  <op.icon className="h-10 w-10 text-plp-primary" />
                </div>
                <h3 className="text-lg font-bold text-plp-primary mb-3">{op.titulo}</h3>
                <p className="text-sm text-plp-gray-600 leading-relaxed mb-4">{op.descripcion}</p>
                <ul className="space-y-2">
                  {op.items.map((item, j) => (
                    <li key={j} className="text-sm text-plp-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-plp-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sitios y muelles disponibles — carousel fondo gris claro para separar de Oportunidades de negocio */}
      <CarouselCardsSection titulo="Sitios y muelles disponibles" bgClaro>
        {sitiosMuelles.map((s, i) => (
          <CarouselItem key={i} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-plp-gray-200 h-full flex flex-col">
              <h4 className="text-base font-bold text-plp-primary mb-3 line-clamp-2">{s.titulo}</h4>
              <p className="text-sm text-plp-gray-600 mb-1">Nombre del sitio: {s.nombreSitio}</p>
              <p className="text-sm text-plp-gray-600 mb-4">Longitud: {s.longitud}</p>
              <Link
                      href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial por sitios y muelles`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para obtener más información sobre los sitios y muelles disponibles para operar.`)}`}
                      className="flex-1"
                    >
                    <Button className="mt-auto w-full" size="sm">
                Solicitar información
              </Button>
            </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselCardsSection>

      {/* Áreas o zonas disponibles para arrendamiento — carousel con tags */}
      <CarouselCardsSection titulo="Áreas o zonas disponibles para arrendamiento">
        {areasArrendamiento.map((a, i) => (
          <CarouselItem key={i} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-plp-gray-200 h-full flex flex-col relative">
              <span
                className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded ${
                  a.disponibilidad === "Inmediata"
                    ? "bg-plp-gray-700 text-white"
                    : a.disponibilidad === "3 meses"
                      ? "bg-plp-primary/80 text-white"
                      : "bg-plp-secondary text-white"
                }`}
              >
                {a.disponibilidad}
              </span>
              <h4 className="text-base font-bold text-plp-primary mb-3 pr-20 line-clamp-2">{a.titulo}</h4>
              <div className="flex items-center gap-2 text-sm text-plp-gray-600 mb-2">
                <Building2 className="h-4 w-4 shrink-0" />
                {a.edificio}
              </div>
              <p className="text-sm text-plp-gray-600 mb-1">Superficie: {a.superficie}</p>
              <p className="text-sm text-plp-gray-600 mb-4">Uso: {a.uso}</p>
              <Link
                      href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial por áreas o zonas disponibles para arrendamiento`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para obtener más información sobre las áreas o zonas disponibles para arrendamiento.`)}`}
                      className="flex-1"
                    >
              <Button className="mt-auto w-full" size="sm">
                Solicitar información
              </Button>
            </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselCardsSection>

      {/* Proyectos de expansión — fondo celeste, carousel */}
      <CarouselCardsSection titulo="Proyectos de expansión" bgCeleste>
        {proyectosExpansion.map((p, i) => (
          <CarouselItem key={i} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-plp-gray-200 h-full flex flex-col relative">
              <span
                className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded ${
                  p.disponibilidad === "Inmediata"
                    ? "bg-plp-gray-700 text-white"
                    : p.disponibilidad === "3 meses"
                      ? "bg-plp-primary/80 text-white"
                      : "bg-plp-secondary text-white"
                }`}
              >
                {p.disponibilidad}
              </span>
              <h4 className="text-base font-bold text-plp-primary mb-3 pr-20">{p.titulo}</h4>
              <div className="flex items-center gap-2 text-sm text-plp-gray-600 mb-2">
                <Building2 className="h-4 w-4 shrink-0" />
                {p.edificio}
              </div>
              <p className="text-sm text-plp-gray-600 mb-1">Superficie: {p.superficie}</p>
              <p className="text-sm text-plp-gray-600 mb-4">Uso: {p.uso}</p>
              <Link
                      href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial por proyectos de expansión`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para obtener más información sobre los proyectos de expansión disponibles.`)}`}
                      className="flex-1"
                    >
              <Button className="mt-auto w-full" size="sm">
                Solicitar información
              </Button>
            </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselCardsSection>

      {/* CTA ¿Tenés un proyecto en mente? */}
      <section className="w-full py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-plp-primary border-0 rounded-2xl shadow-xl text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Tenés un proyecto en mente?</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Nuestro equipo comercial está disponible para analizar tu propuesta y encontrar la mejor manera de hacerla realidad en el Puerto La Plata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                      href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial por proyecto`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para comentarles sobre un proyecto que quisiera llevar a cabo en el Puerto La Plata y recibir más información.`)}`}
                      className="flex-1"
                    >
              <Button size="lg" className="bg-white text-plp-primary hover:bg-plp-gray-100">
                Contactar equipo comercial
              </Button>
            </Link>
            </div>
          </Card>
        </div>
      </section>

      
    </div>
  )
}
