"use client"

import { ArrowLeft, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MiBuzonPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/empleado-prensa" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Mi Buzón</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/empleado-prensa/gestion/mi-buzon/solicitudes" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Solicitudes
              </CardTitle>
              <CardDescription>Gestiona las solicitudes asignadas a ti</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Accede a las solicitudes que te han sido asignadas directamente. Podrás ver detalles, responder y
                actualizar su estado.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empleado-prensa/gestion/mi-buzon/visitas" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Visitas
              </CardTitle>
              <CardDescription>Gestiona las visitas asignadas a ti</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Accede a las visitas que te han sido asignadas directamente. Podrás ver detalles, aprobar, rechazar y
                gestionar cada visita.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
