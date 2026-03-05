"use client"
import { Mail, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MiBuzonPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mi Buzón</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de Solicitudes */}
        <Link href="/empleado-rrhh/gestion/mi-buzon/solicitudes">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Solicitudes</h2>
                    <p className="text-gray-500 mt-1">Gestiona las solicitudes asignadas a ti</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    3 Pendientes
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">6 Total</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Tarjeta de Visitas */}
        <Link href="/empleado-rrhh/gestion/mi-buzon/visitas">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Visitas</h2>
                    <p className="text-gray-500 mt-1">Gestiona las visitas asignadas a ti</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    2 Pendientes
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">5 Total</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
