import { Button } from "@/components/ui/button"
import Link from "next/link"

export function StatisticsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center mb-12" style={{ color: '#1B1E4A' }}>
          Capacidad operativa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {/* Longitud total del muelle */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <p className="text-xs uppercase text-gray-500 mb-3 tracking-wide">
              LONGITUD TOTAL DEL MUELLE
            </p>
            <p className="text-3xl md:text-4xl text-gray-900">
              2.340.000 m
            </p>
          </div>

          {/* Capacidad de almacenamiento */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <p className="text-xs uppercase text-gray-500 mb-3 tracking-wide">
              CAPACIDAD DE ALMACENAMIENTO
            </p>
            <p className="text-3xl md:text-4xl  text-gray-900">
              45.600 tn
            </p>
          </div>

          {/* Cantidad de contenedores */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <p className="text-xs uppercase text-gray-500 mb-3 tracking-wide">
              CANTIDAD DE CONTENEDORES
            </p>
            <p className="text-3xl md:text-4xl  text-gray-900">
              92 millones
            </p>
          </div>

          {/* Total de buques */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <p className="text-xs uppercase text-gray-500 mb-3 tracking-wide">
              TOTAL DE SITIOS
            </p>
            <p className="text-3xl md:text-4xl  text-gray-900">
              22 sitios
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/estadisticas">
            <Button 
              className="bg-[#1B1E4A] hover:bg-[#272C5B] text-white px-8 py-3 rounded-lg"
            >
              Ver nuestras estadisticas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
