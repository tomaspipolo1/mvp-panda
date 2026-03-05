"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Leaf } from "lucide-react"

// Colores sostenibilidad: menta #E6F7F5, cards #E8F9F5, borde #AFDED7, títulos/botón #006450 / #007B64
const HERO_DESCRIPCION =
  "Impulsamos prácticas de gestión ambiental que promueven la eficiencia energética, la economía circular y la protección de la biodiversidad. Trabajamos con la comunidad portuaria y organismos públicos para alcanzar metas medibles y auditables."

const accionarCards = [
  {
    titulo: "Inventario de GEI",
    descripcion:
      "Medición anual de emisiones (alcances 1 y 2) y plan de reducción.",
  },
  {
    titulo: "Eficiencia energética",
    descripcion:
      "Modernización de equipos e iluminación; energías renovables.",
  },
  {
    titulo: "Gestión de efluentes",
    descripcion:
      "Monitoreo de calidad, planes de contingencia y capacitación.",
  },
]

const galeriaImages = [
  { src: "/social/DSC04672.JPG", alt: "Vista del puerto" },
  { src: "/banner.jpg", alt: "Puerto" },
  { src: "/social/Visita-Puerto-LP.jpeg", alt: "Visita al puerto" },
  { src: "/colorful-harbor-town.png", alt: "Puerto y ciudad" },
  { src: "/social/port-sunrise.png", alt: "Puerto al amanecer" },
]

export default function Sostenibilidad() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Sección título + descripción + foto a la derecha */}
      <section className="w-full bg-[#E6F7F5] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10 md:items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-8 w-8 text-[#006450]" />
                <h1 className="text-2xl font-bold text-[#006450] md:text-3xl">
                  Puerto Verde
                </h1>
              </div>
              <p className="text-gray-800 leading-relaxed">
                {HERO_DESCRIPCION}
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="/banner.jpg"
                alt="Puerto - sostenibilidad y eficiencia energética"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sección Nuestro accionar con cards */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl mb-10">
            Nuestro accionar
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {accionarCards.map((item) => (
              <Card
                key={item.titulo}
                className="border-2 border-[#AFDED7] bg-[#E8F9F5] p-5 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-bold text-[#006450] mb-2">
                  {item.titulo}
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {item.descripcion}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sección banner (card) */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-4xl overflow-hidden rounded-2xl border-0 bg-[#E6F7F2] py-8 px-6 text-center shadow-sm md:py-10 md:px-10">
            <h2 className="text-lg font-bold text-[#006450] md:text-xl max-w-2xl mx-auto leading-snug">
              ¿Tenés alguna sugerencia para nosotros?
            </h2>
            <p className="mt-3 text-sm text-gray-700 max-w-xl mx-auto leading-relaxed">
              Nuestro equipo de calidad está disponible para brindarte información detallada sobre nuestros procesos certificados.
            </p>
            <Link
              href={`/contacto?tipoConsulta=calidad&asunto=${encodeURIComponent(`Consulta calidad`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos debido a que necesito mas información sobre los procesos de calidad del Puerto La Plata.`)}`}
            >
              <Button
                
                className="mt-5 bg-[#007B64] hover:bg-[#006450] text-white rounded-lg px-6 text-sm"
              > Contactar equipo de calidad
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* 4. Sección Galería */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl mb-8">
            Galería
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {galeriaImages.map((img, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="overflow-hidden border border-gray-200 shadow-sm rounded-lg">
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
            <CarouselPrevious className="border-2 border-gray-200 bg-white" />
            <CarouselNext className="border-2 border-gray-200 bg-white" />
          </Carousel>
        </div>
      </section>
    </div>
  )
}
