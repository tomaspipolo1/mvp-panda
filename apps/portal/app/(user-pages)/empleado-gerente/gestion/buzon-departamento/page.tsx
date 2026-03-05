"use client"

import { Calendar, ClipboardList } from "lucide-react"
import Link from "next/link"

export default function BuzonDepartamentoPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Buzón Departamento</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/empleado-gerente/gestion/buzon-departamento/solicitudes"
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Solicitudes</h2>
              <p className="text-gray-600">Gestione las solicitudes recibidas para su departamento</p>
            </div>
          </div>
        </Link>

        <Link
          href="/empleado-gerente/gestion/buzon-departamento/visitas"
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Visitas</h2>
              <p className="text-gray-600">Administre las visitas programadas para su departamento</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
