"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export interface TimelineItem {
  year: string
  text: string
}

export interface TimelinePeriod {
  period: string
  title: string
  image?: string
  images?: string[]
  imageAlt: string
  intro?: string
  items: TimelineItem[]
}

interface TimelineProps {
  data: TimelinePeriod[]
  backgroundColor?: string
}

export default function Timeline({ data, backgroundColor = "#CAE6FF" }: TimelineProps) {
  const [currentPeriod, setCurrentPeriod] = useState(0)

  const nextPeriod = () => {
    setCurrentPeriod((prev) => (prev + 1) % data.length)
  }

  const prevPeriod = () => {
    setCurrentPeriod((prev) => (prev - 1 + data.length) % data.length)
  }

  // Obtener la imagen actual (puede ser singular o plural)
  const getCurrentImage = () => {
    const current = data[currentPeriod]
    if (current.image) return current.image
    if (current.images && current.images.length > 0) return current.images[0]
    return "/placeholder.png"
  }

  return (
    <div className="w-full py-6 md:py-8 pb-10 md:pb-12" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline visual */}
          <div className="hidden md:flex items-center justify-between mb-10 px-12 relative h-16">
            {/* Línea base con segmentos */}
            <div className="absolute left-0 right-0 flex items-center top-1/2 -translate-y-1/2">
              {/* Flecha izquierda */}
              <div className="absolute -left-2 -translate-y-1/2 top-1/2 w-3 h-3 border-t-2 border-l-2 border-plp-gray-300 transform -rotate-45" />
              {/* Flecha derecha */}
              <div className="absolute -right-2 -translate-y-1/2 top-1/2 w-3 h-3 border-r-2 border-t-2 border-plp-gray-300 transform rotate-45" />

              {/* Segmentos de la línea */}
              {data.map((_, index) =>
                index < data.length - 1 ? (
                  <div
                    key={index}
                    className={`h-1 flex-1 transition-all duration-300 ${
                      index < currentPeriod ? "bg-plp-primary" : "bg-plp-gray-300"
                    }`}
                  />
                ) : null
              )}
            </div>

            {data.map((period, index) => (
              <button
                key={period.period}
                onClick={() => setCurrentPeriod(index)}
                className={`relative flex flex-col items-center group pt-16 ${
                  index === currentPeriod ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="absolute top-1/2 -translate-y-1/2 z-10">
                  <div
                    className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 shadow-sm ${
                      index === currentPeriod
                        ? "scale-[2] ring-3 ring-plp-primary/40"
                        : "group-hover:scale-110"
                    }`}
                  >
                    {/* Esqueleto para futura imagen del hito */}
                    <Skeleton
                      className={`w-full h-full ${
                        index <= currentPeriod ? "bg-plp-primary/40" : "bg-plp-gray-200"
                      }`}
                    />
                  </div>
                </div>
                <span
                  className={`text-sm font-medium transition-all duration-300 ${
                    index === currentPeriod
                      ? "mt-8 text-plp-primary text-base scale-105"
                      : " text-plp-gray-500 group-hover:text-plp-secondary"
                  }`}
                >
                  {period.period}
                </span>
              </button>
            ))}
          </div>

          {/* Contenido del período */}
          <div className="relative">
            <Card className="p-3 md:p-4 bg-white max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {/* Imagen del período */}
                <div className="relative bg-plp-gray-100 rounded-lg overflow-hidden aspect-video md:aspect-[5/4] w-full">
                  <img
                    src={getCurrentImage()}
                    alt={data[currentPeriod].imageAlt}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Texto en formato de introducción + punteo por año */}
                <div>
                  <div className="md:hidden mb-2 text-plp-primary font-medium text-sm">
                    {data[currentPeriod].period}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-plp-primary mb-2">
                    {data[currentPeriod].title}
                  </h2>
                  {data[currentPeriod].intro && (
                    <p className="text-sm text-plp-gray-600 leading-relaxed mb-2">
                      {data[currentPeriod].intro}
                    </p>
                  )}
                  <ul className="space-y-1.5">
                    {data[currentPeriod].items.map((it, idx) => (
                      <li key={idx} className="text-sm text-plp-gray-700 leading-relaxed">
                        <span className="font-semibold text-plp-primary">{it.year}</span>{" "}
                        <span className="text-plp-gray-600">{it.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Botones de navegación */}
            <button
              onClick={prevPeriod}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 bg-white/80 hover:bg-white text-plp-primary rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Período anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextPeriod}
              className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 bg-white/80 hover:bg-white text-plp-primary rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Período siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
