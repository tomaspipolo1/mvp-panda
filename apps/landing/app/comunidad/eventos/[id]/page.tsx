"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { EventInscriptionForm } from "@/components/event-inscription-form"
import { CalendarDays, Clock } from "lucide-react"

const formatFecha = (fecha: string) => {
  const d = new Date(fecha)
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
}

// Siempre el mismo evento para el detalle (evitar código extra)
const EVENTO_DETALLE = {
  id: 1,
  titulo: "Visita guiada al área histórica del puerto",
  fecha: "2025-09-15",
  hora: "10:00 hs",
  descripcion:
    "El Puerto La Plata es una terminal multipropósito que opera en el estuario del Río de la Plata. Su ubicación estratégica lo convierte en un nodo clave para el comercio exterior y la logística regional. En esta visita recorreremos su área de influencia, corredores industriales y servicios asociados.",
  imagen: "/social/Visita-Puerto-LP.jpeg",
}

// Otros eventos para el carousel (mismo formato que en eventos page)
const otrosEventos = [
  {
    id: 2,
    titulo: "Jornada de puertas abiertas: innovación y tecnología",
    fecha: "2025-10-03",
    hora: "10:00 hs",
    descripcion:
      "Charlas y demostraciones sobre digitalización y logística portuaria. Actividad para todo público.",
    imagen: "/social/Visita-Puerto-LP.jpeg",
  },
  {
    id: 3,
    titulo: "Encuentro con la comunidad: pasado y futuro del puerto",
    fecha: "2025-10-20",
    hora: "10:00 hs",
    descripcion:
      "Conversatorio con especialistas e integrantes de la comunidad portuaria. Entrada gratuita con inscripción.",
    imagen: "/social/Visita-Puerto-LP.jpeg",
  },
  {
    id: 4,
    titulo: "Taller para docentes: el puerto como recurso didáctico",
    fecha: "2025-11-05",
    hora: "10:00 hs",
    descripcion:
      "Propuestas para trabajar contenidos de historia, geografía y ciudadanía a partir del caso del puerto.",
    imagen: "/colorful-harbor-town.png",
  },
  {
    id: 5,
    titulo: "Visita técnica: operaciones de contenedores",
    fecha: "2025-11-12",
    hora: "10:00 hs",
    descripcion:
      "Recorrido guiado para estudiantes de carreras afines a logística e ingeniería.",
    imagen: "/diverse-group-city.png",
  },
]

export default function DetalleEventoPage() {
  const e = EVENTO_DETALLE

  return (
    <div className="min-h-screen bg-white">
      {/* Sección principal celeste: título, fecha/hora, descripción + imagen; debajo formulario */}
      <section className="w-full bg-sky-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Bloque superior: texto a la izquierda, imagen a la derecha */}
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10 md:items-center mb-12 md:mb-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl mb-4">{e.titulo}</h1>
              <div className="flex flex-wrap items-center gap-4 text-plp-gray-600 mb-4">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formatFecha(e.fecha)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {e.hora}
                </span>
              </div>
              <div className="text-plp-gray-600 leading-relaxed space-y-3">
                <p>{e.descripcion}</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white shadow-sm">
              <Image
                src={e.imagen}
                alt={e.titulo}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Formulario de inscripción (misma sección, debajo) */}
          <EventInscriptionForm
            onSubmit={(data) => {
              console.log("Inscripción:", data)
            }}
          />
        </div>
      </section>

      {/* Otros eventos que podrían interesarte — carousel */}
      <section className="w-full pt-10 md:pt-12 pb-6 md:pb-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-plp-primary md:text-3xl mb-6">
            Otros eventos que podrían interesarte
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {otrosEventos.map((ev) => (
                <CarouselItem
                  key={ev.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="overflow-hidden rounded-lg border border-plp-gray-200 shadow-sm flex flex-col h-full">
                    <div className="relative w-full aspect-[4/3] shrink-0">
                      <Image
                        src={ev.imagen}
                        alt={ev.titulo}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                        {ev.titulo}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-plp-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 shrink-0" />
                          {formatFecha(ev.fecha)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 shrink-0" />
                          {ev.hora}
                        </span>
                      </div>
                      <p className="text-sm text-plp-gray-600 line-clamp-2 flex-1 mb-4">
                        {ev.descripcion}
                      </p>
                      <Button asChild className="w-full bg-plp-primary hover:bg-plp-primary/90 text-white mt-auto">
                        <Link href={`/comunidad/eventos/${ev.id}`}>Inscribirse</Link>
                      </Button>
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
