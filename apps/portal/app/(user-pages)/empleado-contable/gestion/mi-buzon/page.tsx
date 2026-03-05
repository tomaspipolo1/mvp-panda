"use client"

import { ArrowLeft, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MiBuzonPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/empleado-contable" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Mi Buzón</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/empleado-contable/gestion/mi-buzon/solicitudes">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Solicitudes
              </CardTitle>
              <CardDescription>Gestiona las solicitudes asignadas a ti</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Accede a las solicitudes que te han sido asignadas directamente. Puedes ver detalles, responder y
                actualizar su estado.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empleado-contable/gestion/mi-buzon/visitas">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Visitas
              </CardTitle>
              <CardDescription>Gestiona las visitas asignadas a ti</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Accede a las visitas que te han sido asignadas directamente. Puedes ver detalles, aprobar, rechazar o
                reprogramar visitas.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
