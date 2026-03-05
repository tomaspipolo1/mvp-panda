"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function NotFound() {
  // Ocultar breadcrumb y hero usando CSS cuando estamos en not-found
  useEffect(() => {
    // Agregar clase al body para identificar página not-found
    document.body.classList.add('page-not-found')
    
    return () => {
      document.body.classList.remove('page-not-found')
    }
  }, [])

  return (
    <div 
      className="w-full min-h-[calc(100vh-var(--header-height,80px)-200px)] flex items-center justify-center px-10 py-12"
      style={{ backgroundColor: '#CAE6FF' }}
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-1 md:gap-12">
        {/* Imagen del contenedor flotando */}
        <div className="flex-shrink-0">
          <Image
            src="/not-found.png"
            alt="Contenedor flotando"
            width={800}
            height={800}
            className="w-96 md:w-[600px] lg:w-[700px] h-auto"
            priority
          />
        </div>

        {/* Texto y botón */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
            Página no encontrada
          </h1>
          <div className="text-sm md:text-base mb-8 text-gray-700">
            <p>Lo sentimos. No pudimos encontrar la página que buscabas.</p>
            <p>Pudo haberse movido de su lugar o eliminado.</p>
          </div>
          <Button
            asChild
            className="bg-[#1B1E4A] hover:bg-[#272C5B] text-white rounded-lg px-6 py-3"
          >
            <Link href="/">Volver a Inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
