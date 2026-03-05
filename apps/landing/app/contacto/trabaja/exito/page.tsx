"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CurriculumEnviado() {
  return (
    <div className="flex items-center justify-center py-20" style={{ backgroundColor: '#CAE6FF' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Contenido de texto */}
            <div className="text-center md:text-left space-y-4 max-w-lg flex-shrink-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: '#1B1E4A' }}>
                ¡Currículum enviado con éxito!
              </h1>
              
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#1B1E4A', opacity: 0.8 }}>
                Muchas gracias por tu interés en formar parte de nuestro equipo.
                En caso de cumplir con los requisitos de las búsquedas nos estaremos
                comunicando vos.
              </p>

              <div className="pt-2">
                <Link href="/">
                  <Button 
                    size="lg"
                    className="text-white px-8 py-3 text-sm rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1B1E4A' }}
                  >
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Imagen del barco */}
            <div className="flex-shrink-0 w-full md:w-auto max-w-2xl md:ml-auto">
              <img
                src="/trabaja.png"
                alt="Contenedor enviado"
                className="object-contain w-full"
                style={{ maxWidth: '650px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
