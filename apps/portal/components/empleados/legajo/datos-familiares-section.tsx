"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import type { Empleado } from "./types"
import { formatearFecha } from "./types"

interface DatosFamiliaresSectionProps {
  empleado: Empleado
}

export function DatosFamiliaresSection({ empleado }: DatosFamiliaresSectionProps) {
  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <User className="h-5 w-5 text-yellow-600" />
          </div>
          Datos familiares
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1 space-y-6">
        {/* Cónyuge */}
        {empleado.estadoCivil === "Casado" && empleado.conyuge && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Cónyuge</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nombre completo</p>
                <p className="font-medium text-gray-900">{empleado.conyuge.nombreCompleto}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">DNI</p>
                <p className="font-medium text-gray-900">{empleado.conyuge.dni}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha de nacimiento</p>
                <p className="font-medium text-gray-900">{formatearFecha(empleado.conyuge.fechaNacimiento)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hijos */}
        {empleado.hijos && empleado.hijosDatos && empleado.hijosDatos.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Hijo/s</h4>
            <div className="space-y-2">
              {empleado.hijosDatos.map((hijo, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm text-gray-500">Nombre completo</p>
                    <p className="font-medium text-gray-900">{hijo.nombreCompleto}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">DNI</p>
                    <p className="font-medium text-gray-900">{hijo.dni}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha de nacimiento</p>
                    <p className="font-medium text-gray-900">{formatearFecha(hijo.fechaNacimiento)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
