"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRight, Download, MessageCircle } from "lucide-react"

const MUSEO_DESCRIPTION =
  "El Museo del Puerto conserva piezas, documentos y testimonios que explican la evolución del puerto, su infraestructura y su impacto en el desarrollo regional. Su propósito es acercar la memoria portuaria a la ciudadanía y favorecer experiencias educativas y culturales para todas las edades."

const cards = [
  {
    title: "Colecciones",
    description:
      "Maquetas, planos originales, instrumentos de navegación, archivos fotográficos y material audiovisual que ilustran distintas épocas del puerto y su comunidad.",
  },
  {
    title: "Actividades educativas",
    description:
      "Visitas guiadas, talleres y propuestas pedagógicas para escuelas, universidades y organizaciones sociales, con foco en historia, tecnología e identidad portuaria.",
  },
  {
    title: "Patrimonio vivo",
    description:
      "Testimonios orales de trabajadores y trabajadoras del puerto y de la comunidad, que complementan el acervo documental para construir una memoria plural.",
  },
]

const galeriaImages = [
  { src: "/social/DSC04672.JPG", alt: "Vista del puerto" },
  { src: "/social/port-sunrise.png", alt: "Puerto al amanecer" },
  { src: "/banner.jpg", alt: "Vista del puerto" },
  { src: "/colorful-harbor-town.png", alt: "Puerto y ciudad" },
  { src: "/social/Visita-Puerto-LP.jpeg", alt: "Visita al puerto" },
]

export default function Museo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — sección título con botón ¿Cómo llegar? */}
      <section className="w-full bg-plp-primary/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-plp-primary md:text-4xl">Museo</h1>
            <p className="mt-4 text-plp-gray-600 leading-relaxed">{MUSEO_DESCRIPTION}</p>
            <Button
              asChild
              variant="outline"
              className="mt-6 border-2 border-plp-primary bg-white text-plp-primary hover:bg-plp-gray-100"
            >
              <Link
                href="https://maps.app.goo.gl/nJTvzBQM8JoctcvK7"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¿Cómo llegar?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Imagen del museo / recorrido virtual */}
      <section className="w-full">
        <div className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[3/1]">
          <Image
            src="/museo.jpg"
            alt="Museo del Puerto - Recorrido virtual"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* Cards: Colecciones, Actividades educativas, Patrimonio vivo */}
      <section className="w-full py-8 md:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {cards.map((item) => (
              <Card
                key={item.title}
                className="border-2 border-plp-primary/20 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-plp-gray-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: ¿No encontrás lo que buscabas? */}
      <section className="w-full py-8 md:py-10 px-4">
        <div className="max-w-4xl mx-auto bg-plp-primary rounded-3xl py-8 md:py-10 px-6 md:px-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            ¿Necesitas más información?
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Solo tenés que contactarnos y nosotros te ayudaremos a resolver tus dudas o descargá la guía de visitas.
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
      <section className="w-full py-8 md:py-10 bg-white">
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
