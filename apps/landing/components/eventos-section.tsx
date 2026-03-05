"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const eventos = [
  {
    id: 1,
    titulo: "Título de la card",
    fecha: "10 de marzo 2024",
    hora: "10:00",
    descripcion: "Breve descripción de 2 líneas. Breve descripción de 2 líneas. Breve descripción de 2 líneas.",
    imagen: "/social/DSC04672.JPG"
  },
  {
    id: 2,
    titulo: "Título de la card",
    fecha: "10 de marzo 2024",
    hora: "10:00",
    descripcion: "Breve descripción de 2 líneas. Breve descripción de 2 líneas. Breve descripción de 2 líneas.",
    imagen: "/social/colorful-harbor-town.png"
  },
  {
    id: 3,
    titulo: "Título de la card",
    fecha: "10 de marzo 2024",
    hora: "10:00",
    descripcion: "Breve descripción de 2 líneas. Breve descripción de 2 líneas. Breve descripción de 2 líneas.",
    imagen: "/social/diverse-group-city.png"
  },
  {
    id: 4,
    titulo: "Título de la card",
    fecha: "10 de marzo 2024",
    hora: "10:00",
    descripcion: "Breve descripción de 2 líneas. Breve descripción de 2 líneas. Breve descripción de 2 líneas.",
    imagen: "/social/Visita-Puerto-LP.jpeg"
  },
  {
    id: 5,
    titulo: "Título de la card",
    fecha: "10 de marzo 2024",
    hora: "10:00",
    descripcion: "Breve descripción de 2 líneas. Breve descripción de 2 líneas. Breve descripción de 2 líneas.",
    imagen: "/social/INICIO_PANEL_CP 3.jpg"
  },
  {
    id: 6,
    titulo: "Título de la card",
    fecha: "10 de marzo 2024",
    hora: "10:00",
    descripcion: "Breve descripción de 2 líneas. Breve descripción de 2 líneas. Breve descripción de 2 líneas.",
    imagen: "/social/port-sunrise.png"
  }
]

export function EventosSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#F0F2F9' }}>
      <div className="container mx-auto px-4">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1B1E4A' }}>
          Próximos eventos
        </h2>
        
        {/* Subtítulo de 2 líneas */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-base md:text-lg text-gray-700 mb-2">
            Participá de nuestros eventos y actividades.
          </p>
          <p className="text-base md:text-lg text-gray-700">
            Mantenete informado sobre las próximas jornadas, seminarios y visitas guiadas.
          </p>
        </div>

        {/* Carousel de eventos */}
        <div className="max-w-6xl mx-auto mb-12 relative px-16 md:px-20">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {eventos.map((evento) => (
                <CarouselItem key={evento.id} className="pl-2 md:pl-4 md:basis-1/3">
                  <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                    {/* Imagen del evento */}
                    <div className="relative h-48 w-full">
                      <img
                        src={evento.imagen}
                        alt={evento.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Contenido del evento */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold mb-3" style={{ color: '#1B1E4A' }}>
                        {evento.titulo}
                      </h3>
                      
                      {/* Fecha y hora */}
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar className="h-4 w-4 mr-2" style={{ color: '#1B1E4A' }} />
                        <span>{evento.fecha}</span>
                        <Clock className="h-4 w-4 ml-4 mr-2" style={{ color: '#1B1E4A' }} />
                        <span>{evento.hora} hs</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4 text-sm flex-1 leading-relaxed">
                        {evento.descripcion}
                      </p>

                      {/* Botón de inscripción */}
                      <Button
                        asChild
                        className="w-full mt-auto rounded-lg"
                        style={{ backgroundColor: '#1B1E4A' }}
                      >
                        <Link href="/comunidad/eventos/1">Inscribirse</Link>
                      </Button>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/90 hover:bg-white border-2 border-gray-300 shadow-lg z-10 [&>svg]:h-6 [&>svg]:w-6" />
            <CarouselNext className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/90 hover:bg-white border-2 border-gray-300 shadow-lg z-10 [&>svg]:h-6 [&>svg]:w-6" />
          </Carousel>
        </div>

        {/* Botón para ver todos los eventos */}
        <div className="text-center">
          <Link href="/comunidad/eventos">
            <Button 
              className="rounded-lg px-8 py-3"
              style={{ backgroundColor: '#1B1E4A' }}
            >
              Ver eventos disponibles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
