"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Hash, Calendar } from "lucide-react"
import type { Empleado } from "./types"
import { formatearFecha } from "./types"

interface DatosPersonalesSectionProps {
  empleado: Empleado
  edad: number
}

export function DatosPersonalesSection({ empleado, edad }: DatosPersonalesSectionProps) {
  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          Datos Personales
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Hash className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">DNI</p>
              <p className="font-medium text-gray-900">{empleado.dni}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Hash className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">CUIL</p>
              <p className="font-medium text-gray-900">{empleado.cuil}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Fecha de nacimiento</p>
              <p className="font-medium text-gray-900">{formatearFecha(empleado.fechaNacimiento)}</p>
              <p className="text-sm text-gray-500">{edad} años</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Sexo</p>
              <p className="font-medium text-gray-900">{empleado.sexo}</p>
            </div>
          </div>

          {empleado.nacionalidad && (
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Nacionalidad</p>
                <p className="font-medium text-gray-900">{empleado.nacionalidad}</p>
              </div>
            </div>
          )}

          {empleado.estadoCivil && (
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Estado civil</p>
                <p className="font-medium text-gray-900">{empleado.estadoCivil}</p>
              </div>
            </div>
          )}

          {empleado.grupoSanguineo && (
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Grupo sanguíneo</p>
                <p className="font-medium text-gray-900">{empleado.grupoSanguineo}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Hijo/s</p>
              <p className="font-medium text-gray-900">{empleado.hijos ? "Sí" : "No"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
