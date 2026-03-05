"use client"

import { TrabajoForm } from "@/components/trabajo-form"

export default function TrabajaConNosotros() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Trabajar con nosotros
            </h1>
            <p className="text-lg mb-0" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Formá parte del equipo de Puerto La Plata y contribuí al desarrollo del comercio exterior argentino
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <TrabajoForm />
        </div>
      </div>
    </div>
  )
}
