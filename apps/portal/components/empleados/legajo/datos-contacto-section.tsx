"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, User } from "lucide-react"
import type { Empleado } from "./types"

interface DatosContactoSectionProps {
  empleado: Empleado
}

export function DatosContactoSection({ empleado }: DatosContactoSectionProps) {
  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Phone className="h-5 w-5 text-purple-600" />
          </div>
          Datos de Contacto
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <div className="space-y-4 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{empleado.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Teléfono</p>
              <p className="font-medium text-gray-900">{empleado.telefono}</p>
            </div>
          </div>

          {empleado.telefonoEmpresa && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Teléfono Empresa</p>
                <p className="font-medium text-gray-900">{empleado.telefonoEmpresa}</p>
              </div>
            </div>
          )}

          {empleado.telefonoEmergencia && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Teléfono de emergencia</p>
                <p className="font-medium text-gray-900">{empleado.telefonoEmergencia}</p>
              </div>
            </div>
          )}

          {empleado.contactoEmergencia && (
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Persona a contactar</p>
                <p className="font-medium text-gray-900">{empleado.contactoEmergencia}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
