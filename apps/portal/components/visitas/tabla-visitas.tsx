"use client"

import { useState } from "react"
import { ChevronDown, Eye, CheckCircle2, XCircle, MoreVertical, Ban, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Visita {
  id: string | number
  fecha: string
  hora?: string
  tipo: string
  destino?: string
  personas: number
  estado: string
}

export type TipoUsuario = "usuario-basico" | "proveedor" | "cliente" | "empresa-servicios-portuarios"

interface TablaVisitasProps {
  visitas: Visita[]
  tipoUsuario?: TipoUsuario
  onVerDetalle?: (visita: Visita) => void
  onAceptar?: (visita: Visita) => void
  onRechazar?: (visita: Visita) => void
  onCompletar?: (visita: Visita) => void
  onCancelar?: (visita: Visita) => void
  searchTerm?: string
  onSearchChange?: (term: string) => void
}

export function TablaVisitas({
  visitas,
  tipoUsuario = "usuario-basico",
  onVerDetalle,
  onAceptar,
  onRechazar,
  onCompletar,
  onCancelar,
  searchTerm: externalSearchTerm,
  onSearchChange,
}: TablaVisitasProps) {
  const [internalSearchTerm, setInternalSearchTerm] = useState("")
  const searchTerm = externalSearchTerm ?? internalSearchTerm
  const setSearchTerm = onSearchChange ?? setInternalSearchTerm

  // Filtrar por término de búsqueda
  const filteredVisitas = visitas.filter(
    (visita) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        (visita.destino?.toLowerCase() || "").includes(searchLower) ||
        (visita.tipo?.toLowerCase() || "").includes(searchLower) ||
        (visita.fecha?.toLowerCase() || "").includes(searchLower) ||
        (visita.hora?.toLowerCase() || "").includes(searchLower)
      )
    }
  )

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aceptada":
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aceptada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Completada":
      case "Finalizada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Completada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      case "En curso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En curso</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{estado}</Badge>
    }
  }

  // Determinar qué acciones mostrar según el estado de la visita
  const getAccionesDisponibles = (visita: Visita) => {
    const acciones = []
    
    if (onVerDetalle) {
      acciones.push({
        label: "Ver detalle",
        icon: Eye,
        onClick: () => onVerDetalle(visita),
        className: "cursor-pointer",
      })
    }

    if (visita.estado === "Pendiente") {
      if (onAceptar) {
        acciones.push({
          label: "Aceptar",
          icon: CheckCircle2,
          onClick: () => onAceptar(visita),
          className: "cursor-pointer text-green-600",
        })
      }
      if (onRechazar) {
        acciones.push({
          label: "Rechazar",
          icon: XCircle,
          onClick: () => onRechazar(visita),
          className: "cursor-pointer text-red-600",
        })
      }
    }

    // Completar: aparece en Pendientes (para completar datos) o en Aceptadas/Aprobadas/En curso (para finalizar)
    if (
      (visita.estado === "Pendiente" || 
       visita.estado === "Aceptada" || 
       visita.estado === "Aprobada" || 
       visita.estado === "En curso") && 
      onCompletar
    ) {
      acciones.push({
        label: "Completar",
        icon: CheckCircle,
        onClick: () => onCompletar(visita),
        className: "cursor-pointer text-blue-600",
      })
    }

    if ((visita.estado === "Aceptada" || visita.estado === "Aprobada" || visita.estado === "En curso" || visita.estado === "Pendiente") && onCancelar) {
      acciones.push({
        label: "Cancelar",
        icon: Ban,
        onClick: () => onCancelar(visita),
        className: "cursor-pointer text-orange-600",
      })
    }

    return acciones
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Visitas</h3>
        <div className="w-72">
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium">
                  Fecha
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Hora</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Tipo</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Destino</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Personas</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Estado</span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitas.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 px-4 text-center text-gray-500">
                  No se encontraron visitas
                </td>
              </tr>
            ) : (
              filteredVisitas.map((visita) => {
                const acciones = getAccionesDisponibles(visita)
                return (
                  <tr key={visita.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4">{visita.fecha || "-"}</td>
                    <td className="py-4 px-4">{visita.hora || "-"}</td>
                    <td className="py-4 px-4">{visita.tipo || "-"}</td>
                    <td className="py-4 px-4">{visita.destino || "-"}</td>
                    <td className="py-4 px-4">{visita.personas ?? "-"}</td>
                    <td className="py-4 px-4">{getEstadoBadge(visita.estado)}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {acciones.length === 0 ? (
                              <DropdownMenuItem disabled>No hay acciones disponibles</DropdownMenuItem>
                            ) : (
                              acciones.map((accion, index) => {
                                const Icon = accion.icon
                                return (
                                  <DropdownMenuItem
                                    key={index}
                                    className={accion.className}
                                    onClick={() => setTimeout(() => accion.onClick(), 0)}
                                  >
                                    <Icon className="h-4 w-4 mr-2" />
                                    {accion.label}
                                  </DropdownMenuItem>
                                )
                              })
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
