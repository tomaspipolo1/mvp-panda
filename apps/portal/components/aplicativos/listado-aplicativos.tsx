"use client"

import Link from "next/link"
import { Ship, MapPin, Train, Ticket, Clock } from "lucide-react"

type Aplicativo = {
  nombre: string
  descripcion: string
  url: string
  icono: React.ElementType
}

const aplicativos: Aplicativo[] = [
  {
    nombre: "PONTO",
    descripcion: "Sistema de gestión de giro de buques.",
    url: "https://devenv-plp.com/front-1/nd1/ponto/ocupacion",
    icono: Ship,
  },
  {
    nombre: "PAN",
    descripcion: "Sistema de gestión de permisos de uso y arrendatarios.",
    url: "https://devenv-plp.com/front-1/nd1/pan/calendario",
    icono: MapPin,
  },
  {
    nombre: "IRIS",
    descripcion: "Sistema de gestión de movimientos de ferrotracción.",
    url: "https://devenv-plp.com/front-1/nd1/iris/trafico/inicio-turno/buscar",
    icono: Train,
  },
  {
    nombre: "Tickets",
    descripcion: "Sistema de gestión de tickets y solicitudes.",
    url: "#",
    icono: Ticket,
  },
  {
    nombre: "QuickPass",
    descripcion: "Sistema de fichada.",
    url: "#",
    icono: Clock,
  },
]

export function ListadoAplicativos() {
  return (
    <div className="container mx-auto py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Aplicativos</h1>
        <p className="text-sm text-gray-500">Acceso rápido a sistemas internos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {aplicativos.map((app) => (
          <Link
            key={app.nombre}
            href={app.url}
            target="_blank"
            className="group block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow min-h-[210px]"
          >
            <div className="flex flex-col items-center text-center gap-3 h-full justify-center">
              <div className="h-14 w-14 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                <app.icono className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {app.nombre}
                </h2>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{app.descripcion}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
