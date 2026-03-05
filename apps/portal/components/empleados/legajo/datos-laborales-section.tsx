"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, Building } from "lucide-react"
import type { Empleado } from "./types"
import { formatearFecha } from "./types"

interface DatosLaboralesSectionProps {
  empleado: Empleado
}

export function DatosLaboralesSection({ empleado }: DatosLaboralesSectionProps) {
  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
          <div className="p-2 bg-green-100 rounded-lg">
            <Briefcase className="h-5 w-5 text-green-600" />
          </div>
          Datos Laborales
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Fecha de ingreso</p>
              <p className="font-medium text-gray-900">{formatearFecha(empleado.fechaIngreso)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Building className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Gerencia</p>
              <p className="font-medium text-gray-900">{empleado.gerencia}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Building className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Departamento</p>
              <p className="font-medium text-gray-900">{empleado.departamento}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Cargo</p>
              <p className="font-medium text-gray-900">{empleado.cargo}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
