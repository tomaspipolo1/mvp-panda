"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin } from "lucide-react"
import type { Direccion } from "./types"

interface DireccionesSectionProps {
  direcciones: Direccion[]
}

export function DireccionesSection({ direcciones }: DireccionesSectionProps) {
  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Home className="h-5 w-5 text-orange-600" />
          </div>
          Direcciones
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        {direcciones.length > 0 ? (
          <div className="space-y-4 h-full overflow-y-auto">
            {direcciones.map((direccion) => (
              <div key={direccion.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <Badge variant="outline" className="text-xs">
                    {direccion.tipo}
                  </Badge>
                </div>

                <div className="text-sm space-y-1">
                  <p className="font-medium text-gray-900">
                    {direccion.calle} {direccion.numero}
                    {direccion.piso && `, Piso ${direccion.piso}`}
                    {direccion.departamento && `, Depto ${direccion.departamento}`}
                  </p>
                  <p className="text-gray-600">
                    CP {direccion.codigoPostal}, {direccion.localidad}
                  </p>
                  <p className="text-gray-600">{direccion.provincia}</p>
                  {direccion.comentarios && (
                    <p className="text-gray-500 italic text-xs mt-2">{direccion.comentarios}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 h-full flex flex-col justify-center">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Este empleado no tiene direcciones cargadas.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
