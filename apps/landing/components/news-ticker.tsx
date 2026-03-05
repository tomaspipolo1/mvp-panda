"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para las noticias del ticker
const latestNews = [
  {
    id: 1,
    title: "Puerto La Plata alcanza récord histórico de operaciones en el primer trimestre de 2025",
    date: "15/04/2025",
    url: "/noticias/record-operaciones-2025",
  },
  {
    id: 2,
    title: "Nueva línea de cruceros anuncia escala en Puerto La Plata para la temporada 2024-2025",
    date: "10/04/2025",
    url: "/noticias/nueva-linea-cruceros",
  },
  {
    id: 3,
    title: "El Puerto La Plata recibe certificación ambiental ISO 14001",
    date: "05/04/2025",
    url: "/noticias/certificacion-iso-14001",
  },
  {
    id: 4,
    title: "Inauguración de nuevo acceso ferroviario mejorará la conectividad logística del puerto",
    date: "01/04/2025",
    url: "/noticias/nuevo-acceso-ferroviario",
  },
  {
    id: 5,
    title: "Puerto La Plata firma acuerdo de cooperación con el Puerto de Rotterdam",
    date: "28/03/2025",
    url: "/noticias/acuerdo-rotterdam",
  },
]

export function NewsTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [duplicatedNews, setDuplicatedNews] = useState<typeof latestNews>([])

  // Duplicar las noticias para crear un efecto de desplazamiento continuo
  useEffect(() => {
    // Duplicamos el array de noticias varias veces para asegurar que el scroll sea continuo
    setDuplicatedNews([...latestNews, ...latestNews, ...latestNews])
  }, [])

  return (
    <div className="w-full bg-[#1B1E4A] text-white py-2 overflow-hidden border-t border-blue-800/50">
      <div className="relative flex items-center overflow-hidden">
        {/* Etiqueta de "Últimas Noticias" */}
        <div className="hidden md:flex items-center bg-[#6AB6F7] px-4 py-2 font-bold z-10 whitespace-nowrap flex-shrink-0">
          NOTICIAS
          <ChevronRight className="h-5 w-5 ml-1" />
        </div>

        {/* Contenedor del marquee con animación CSS */}
        <div className="overflow-hidden flex-1 relative max-w-full">
          <div ref={scrollRef} className="ticker-scroll flex items-center space-x-8 whitespace-nowrap will-change-transform">
            {duplicatedNews.map((news, index) => (
              <Link key={`${news.id}-${index}`} href={news.url} className="flex items-center group">
                <span className="text-blue-300 font-medium mr-2">{news.date}</span>
                <span className="group-hover:text-blue-300 transition-colors">{news.title}</span>
                <span className="mx-4 text-blue-500">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
