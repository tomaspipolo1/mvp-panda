"use client"

import Link from "next/link"
import { Mail, Calendar, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MiBuzonPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/empleado-gerente/gestion" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Mi Buzón</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/empleado-gerente/gestion/mi-buzon/solicitudes">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Solicitudes
              </CardTitle>
              <CardDescription>Gestione las solicitudes que requieren su aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Revise, apruebe o rechace solicitudes de proveedores, clientes y empleados que han sido dirigidas a
                usted.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  3 pendientes
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empleado-gerente/gestion/mi-buzon/visitas">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Visitas
              </CardTitle>
              <CardDescription>Gestione las solicitudes de visitas que requieren su aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Revise, apruebe o rechace solicitudes de visitas laborales y de transporte de cargas que han sido
                dirigidas a usted.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  2 pendientes
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
