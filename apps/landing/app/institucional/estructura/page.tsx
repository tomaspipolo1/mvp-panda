"use client"

import { AuthoritiesCarousel } from "@/components/authorities-carousel"
import { directorio, gerentes } from "@/lib/authorities-data"

export default function Estructura() {
  return (
    <div className="min-h-screen bg-white">
      {/* Intro: título y texto (fondo blanco) */}
      <div className="w-full py-10 md:py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Nuestras autoridades
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              El Consorcio de Gestión del Puerto La Plata cuenta con un directorio integrado por representantes del gobierno provincial, los municipios de Berisso, Ensenada y La Plata, y sectores empresariales y sindicales.
            </p>
          </div>
        </div>
      </div>

      {/* Sección Directorio (fondo celeste) */}
      <div className="w-full py-10 md:py-14" style={{ backgroundColor: "#CAE6FF" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6" style={{ color: "#1B1E4A" }}>
            Directorio
          </h2>
          <AuthoritiesCarousel authorities={directorio} />
        </div>
      </div>

      {/* Separador */}
      <div className="w-full h-px bg-gray-300" aria-hidden />

      {/* Sección Gerencias (fondo celeste) */}
      <div className="w-full py-10 md:py-14" style={{ backgroundColor: "#CAE6FF" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6" style={{ color: "#1B1E4A" }}>
            Gerencias
          </h2>
          <AuthoritiesCarousel authorities={gerentes} />
        </div>
      </div>
    </div>
  )
}
