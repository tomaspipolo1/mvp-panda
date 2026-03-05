"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Check, X, Ban, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export interface SolicitudCamion {
  id: string
  persona: string
  dni: string
  patente: string
  fecha: string
  hora: string
  estado: string
  tipoCarga: string
  destino?: string
}

interface TablaSolicitudesCamionesProps {
  solicitudes: SolicitudCamion[]
  onVerDetalle: (solicitud: SolicitudCamion) => void
  onAprobar?: (solicitud: SolicitudCamion) => void
  onRechazar?: (solicitud: SolicitudCamion) => void
  onCancelar?: (solicitud: SolicitudCamion) => void
  showActions?: boolean // Si true, muestra aprobar/rechazar/cancelar
  showCancelar?: boolean // Si true, muestra cancelar (para Todos)
}

export function TablaSolicitudesCamiones({ solicitudes, onVerDetalle, onAprobar, onRechazar, onCancelar, showActions = false, showCancelar = false }: TablaSolicitudesCamionesProps) {
  const router = useRouter()

  const handleVerDetalle = (solicitud: SolicitudCamion) => {
    onVerDetalle(solicitud)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 rounded-full px-4 py-1 font-semibold">Pendiente</Badge>
      case "aprobado":
      case "aprobada":
        return <Badge className="bg-green-100 text-green-800 rounded-full px-4 py-1 font-semibold">Aprobada</Badge>
      case "rechazado":
      case "rechazada":
        return <Badge className="bg-red-100 text-red-800 rounded-full px-4 py-1 font-semibold">Rechazada</Badge>
      case "finalizada":
        return <Badge className="bg-purple-100 text-purple-800 rounded-full px-4 py-1 font-semibold">Finalizada</Badge>
      case "en curso":
        return <Badge className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-semibold">En Curso</Badge>
      case "cancelada":
        return <Badge className="bg-gray-100 text-gray-800 rounded-full px-4 py-1 font-semibold">Cancelada</Badge>
      default:
        return <Badge className="bg-gray-200 text-gray-800 rounded-full px-4 py-1 font-semibold">{estado}</Badge>
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-4 py-3 text-left font-semibold">N° Solicitud</th>
            <th className="px-4 py-3 text-left font-semibold">Persona que solicita</th>
            <th className="px-4 py-3 text-left font-semibold">DNI</th>
            <th className="px-4 py-3 text-left font-semibold">Patente</th>
            <th className="px-4 py-3 text-left font-semibold">Tipo de Carga</th>
            <th className="px-4 py-3 text-left font-semibold">Destino</th>
            <th className="px-4 py-3 text-left font-semibold">EDA</th>
            <th className="px-4 py-3 text-left font-semibold">ETA</th>
            <th className="px-4 py-3 text-left font-semibold">Estado</th>
            <th className="px-4 py-3 text-center font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud, idx) => (
            <tr key={solicitud.id} className={cn("border-b", idx % 2 === 1 ? "bg-gray-50" : "bg-white") }>
              <td className="px-4 py-3 font-mono">{solicitud.id}</td>
              <td className="px-4 py-3">{solicitud.persona}</td>
              <td className="px-4 py-3">{solicitud.dni}</td>
              <td className="px-4 py-3">{solicitud.patente}</td>
              <td className="px-4 py-3">{solicitud.tipoCarga}</td>
              <td className="px-4 py-3">{solicitud.destino || '-'}</td>
              <td className="px-4 py-3">{solicitud.fecha}</td>
              <td className="px-4 py-3">{solicitud.hora}</td>
              <td className="px-4 py-3">{getEstadoBadge(solicitud.estado)}</td>
              <td className="px-4 py-3 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleVerDetalle(solicitud)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalle
                    </DropdownMenuItem>
                    {showActions && solicitud.estado.toLowerCase() === "pendiente" && (
                      <>
                        <DropdownMenuItem onClick={() => onAprobar && onAprobar(solicitud)}>
                          <Check className="mr-2 h-4 w-4 text-green-600" />
                          Aprobar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRechazar && onRechazar(solicitud)}>
                          <X className="mr-2 h-4 w-4 text-red-600" />
                          Rechazar
                        </DropdownMenuItem>
                      </>
                    )}
                    {(showActions || showCancelar) && solicitud.estado.toLowerCase() !== "cancelada" && solicitud.estado.toLowerCase() !== "rechazado" && (
                      <DropdownMenuItem onClick={() => onCancelar && onCancelar(solicitud)}>
                        <Ban className="mr-2 h-4 w-4 text-orange-600" />
                        Cancelar
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 