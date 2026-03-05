"use client"
import { MoreHorizontal, Eye, Pencil, Users, Gavel, XCircle, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Actualizar la interfaz Licitacion para incluir información sobre adjudicación
export interface Licitacion {
  id: string
  numero: string
  tipoLicitacion: "Privada" | "Publica" | "Concurso de precios"
  titulo: string
  organismo: string
  fechaApertura: string
  fechaCierre: string
  montoEstimado: number
  estado: "abierta" | "cerrada" | "en evaluacion" | "adjudicada" | "finalizada" | "cancelada"
  proveedorAdjudicado?: {
    nombre: string
    monto: number
  }
}

// Actualizar la interfaz TablaLicitacionesComprasProps para incluir la nueva función
interface TablaLicitacionesComprasProps {
  licitaciones: Licitacion[]
  onEditar: (licitacion: Licitacion) => void
  onVisualizar: (licitacion: Licitacion) => void
  onVerOfertas?: (licitacion: Licitacion) => void
  onVerDocumentos?: (licitacion: Licitacion) => void
  onVerHistorial?: (licitacion: Licitacion) => void
  onVerProveedores?: (licitacion: Licitacion) => void
  onAnunciarAdjudicacion?: (licitacion: Licitacion) => void
  onCancelarLicitacion?: (licitacion: Licitacion) => void
  onInvitarProveedor?: (licitacion: Licitacion) => void
}

// Actualizar la desestructuración de props para incluir onAnunciarAdjudicacion
export function TablaLicitacionesCompras({
  licitaciones,
  onEditar,
  onVisualizar,
  onVerOfertas,
  onVerDocumentos,
  onVerHistorial,
  onVerProveedores,
  onAnunciarAdjudicacion,
  onCancelarLicitacion,
  onInvitarProveedor,
}: TablaLicitacionesComprasProps) {
  // Función para formatear montos en pesos argentinos
  const formatMonto = (monto: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(monto)
  }

  // Función para obtener el color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "abierta":
        return "bg-green-100 text-green-800"
      case "cerrada":
        return "bg-blue-100 text-blue-800"
      case "en evaluacion":
        return "bg-yellow-100 text-yellow-800"
      case "adjudicada":
        return "bg-purple-100 text-purple-800"
      case "finalizada":
        return "bg-gray-100 text-gray-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Número</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Tipo Licitación</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Objeto</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Cierre</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Apertura</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Monto Estimado</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Adjudicado</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {licitaciones.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                No se encontraron licitaciones
              </td>
            </tr>
          ) : (
            licitaciones.map((licitacion) => (
              <tr key={licitacion.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{licitacion.numero}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{licitacion.tipoLicitacion}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{licitacion.titulo}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{licitacion.fechaCierre}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{licitacion.fechaApertura}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatMonto(licitacion.montoEstimado)}</td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={getEstadoColor(licitacion.estado)}>
                    {licitacion.estado.charAt(0).toUpperCase() + licitacion.estado.slice(1).replace(/_/g, " ")}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  {licitacion.estado === "adjudicada" && licitacion.proveedorAdjudicado ? (
                    <div className="flex flex-col">
                      <span className="font-medium">{licitacion.proveedorAdjudicado.nombre}</span>
                      <span className="text-xs text-gray-500">{formatMonto(licitacion.proveedorAdjudicado.monto)}</span>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          {licitacion.estado === "abierta" && (
                            <span
                              className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"
                              title="Editable"
                            ></span>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onVisualizar(licitacion)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        {licitacion.estado === "abierta" ? (
                          <DropdownMenuItem onClick={() => onEditar(licitacion)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        )}
                        {onVerProveedores && (
                          <DropdownMenuItem onClick={() => onVerProveedores(licitacion)}>
                            <Users className="mr-2 h-4 w-4" />
                            Proveedores registrados
                          </DropdownMenuItem>
                        )}
                        {(licitacion.estado === "abierta" || licitacion.estado === "cerrada") && onInvitarProveedor && (
                          <DropdownMenuItem 
                            onSelect={(e) => {
                              // Permitir que el dropdown se cierre primero
                              setTimeout(() => {
                                onInvitarProveedor(licitacion)
                              }, 50)
                            }}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invitar proveedor
                          </DropdownMenuItem>
                        )}
                        {licitacion.estado === "en evaluacion" && onAnunciarAdjudicacion && (
                          <DropdownMenuItem onClick={() => onAnunciarAdjudicacion(licitacion)}>
                            <Gavel className="mr-2 h-4 w-4" />
                            Adjudicar
                          </DropdownMenuItem>
                        )}
                        {(licitacion.estado === "en evaluacion" || licitacion.estado === "abierta" || licitacion.estado === "cerrada") &&
                          onCancelarLicitacion && (
                            <DropdownMenuItem
                              onClick={() => onCancelarLicitacion(licitacion)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancelar
                            </DropdownMenuItem>
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
