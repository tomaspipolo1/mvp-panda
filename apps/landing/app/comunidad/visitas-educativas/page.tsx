"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { Download, MessageCircle } from "lucide-react"

const HERO_DESCRIPTION =
  "Programas para escuelas, universidades y grupos comunitarios con foco en historia portuaria, tecnología e impacto territorial."

const visitasPuntos = [
  "Recorridos guiados por áreas operativas y puntos históricos (según disponibilidad y protocolos).",
  "Enfoque pedagógico por niveles: primaria, secundaria, terciario/universitario.",
  "Duración estimada: 60-90 minutos. Cupos por grupo y requerimientos de seguridad.",
  "Adaptables a contenidos curriculares: historia, ciudadanía, geografía, tecnología, ambiente.",
]

const visitasCierre =
  "Todas las visitas se coordinan previamente y requieren aprobación según agenda operativa, normativa de seguridad y documentación del grupo responsable."

const guiaPdfHref = "/docs/guia-visitas-educativas.pdf"

const galeriaImages = [
  { src: "/visita.jpg", alt: "Visita educativa" },
  { src: "/social/Visita-Puerto-LP.jpeg", alt: "Visita al puerto" },
  { src: "/social/DSC04672.JPG", alt: "Vista del puerto" },
  { src: "/social/port-sunrise.png", alt: "Puerto al amanecer" },
  { src: "/banner.jpg", alt: "Vista del puerto" },
]

export default function VisitasEducativas() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero: título y pequeña descripción */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-plp-primary md:text-4xl">
              Visitas educativas y guiadas
            </h1>
            <p className="mt-4 text-plp-gray-600 leading-relaxed">{HERO_DESCRIPTION}</p>
          </div>
        </div>
      </section>

      {/* Sección ¿Cómo son las visitas? — fondo celeste, punteo izquierda, imagen derecha */}
      <section className="w-full py-12 md:py-16 bg-sky-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10 md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-plp-primary md:text-3xl mb-6">
                ¿Cómo son las visitas?
              </h2>
              <ul className="list-disc ml-5 space-y-3 text-plp-gray-600">
                {visitasPuntos.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-plp-gray-600 leading-relaxed">{visitasCierre}</p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/10">
              <Image
                src="/visita.jpg"
                alt="Visita educativa al puerto"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Banner: fondo blanco, CARD celeste con título, descripción y botones (blanco + azul) */}
      <section className="w-full py-8 md:py-10 px-4">
        <div className="max-w-4xl mx-auto bg-plp-primary rounded-3xl py-8 md:py-10 px-6 md:px-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Guía para solicitar una visita
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Descargá la guía con los pasos, requisitos y documentación necesaria para coordinar una
          visita educativa o guiada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white text-plp-primary hover:bg-plp-gray-100 w-full sm:w-auto"
            >
              <Link href="#">
                <Download className="mr-2 h-4 w-4" />
                Descargar la guía
              </Link>
            </Button>
            <Link
              href={`/contacto?tipoConsulta=visitas&asunto=${encodeURIComponent(`Consulta sobre visita para el museo`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos debido a que necesito realizar una visita al museo y quiero saber si hay disponibilidad.`)}`}
            >
              <Button
                size="lg"
                className="border-2 border-white bg-white text-plp-primary hover:bg-plp-gray-100 w-full sm:w-auto"
              >
                Consultar disponibilidad
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="w-full py-12 md:py-16 bg-plp-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-plp-primary md:text-3xl mb-8">
            Galería
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {galeriaImages.map((img, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="overflow-hidden border border-plp-gray-200 shadow-sm">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-2 border-plp-gray-200 bg-white" />
            <CarouselNext className="border-2 border-plp-gray-200 bg-white" />
          </Carousel>
        </div>
      </section>
    </div>
  )
}
