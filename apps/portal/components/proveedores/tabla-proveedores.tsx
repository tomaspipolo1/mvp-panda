"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Star, MoreVertical, CreditCard, FileText } from "lucide-react"

export interface Proveedor {
  id: number
  razonSocial: string
  nombre: string
  cuit: string
  categorias: string[]
  subcategorias: string[]
  estado: string
  ultimaActividad: string
  calificacion: string
}

interface TablaProveedoresProps {
  proveedores: Proveedor[]
  onVerDetalle: (proveedor: Proveedor) => void
  onCalificar: (proveedor: Proveedor) => void
  onCuentaCorriente: (proveedor: Proveedor) => void
  onFacturas: (proveedor: Proveedor) => void
}

export function TablaProveedores({ 
  proveedores, 
  onVerDetalle, 
  onCalificar,
  onCuentaCorriente,
  onFacturas,
}: TablaProveedoresProps) {
  const renderEstadoBadge = (estado: string) => {
    const estadoConfig: Record<string, string> = {
      Activo: "bg-green-100 text-green-800 hover:bg-green-100",
      Inactivo: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      Potencial: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    }

    return <Badge className={estadoConfig[estado] || "bg-gray-100 text-gray-800"}>{estado}</Badge>
  }

  const renderCalificacionBadge = (calificacion: string) => {
    const calificacionConfig: Record<string, string> = {
      "Proveedor A": "bg-green-100 text-green-800 hover:bg-green-100",
      "Proveedor B": "bg-blue-100 text-blue-800 hover:bg-blue-100",
      "Proveedor C": "bg-amber-100 text-amber-800 hover:bg-amber-100",
      "NO APROBADO": "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return (
      <Badge className={calificacionConfig[calificacion] || "bg-gray-100 text-gray-800"}>{calificacion}</Badge>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Listado de Proveedores</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Razón Social</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CUIT</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Categoría</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Subcategoría</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Última actividad</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Calificación</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length > 0 ? (
              proveedores.map((proveedor) => (
                <tr key={proveedor.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-900">{proveedor.razonSocial}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{proveedor.nombre}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{proveedor.cuit}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {proveedor.categorias[0]}
                    {proveedor.categorias.length > 1 && (
                      <span className="ml-1 text-xs text-gray-500">+{proveedor.categorias.length - 1}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {proveedor.subcategorias[0]}
                    {proveedor.subcategorias.length > 1 && (
                      <span className="ml-1 text-xs text-gray-500">+{proveedor.subcategorias.length - 1}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{renderEstadoBadge(proveedor.estado)}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{proveedor.ultimaActividad}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {proveedor.calificacion ? (
                      renderCalificacionBadge(proveedor.calificacion)
                    ) : (
                      <span className="text-gray-500">Sin calificar</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onVerDetalle(proveedor)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCalificar(proveedor)}>
                          <Star className="mr-2 h-4 w-4" />
                          Calificación
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCuentaCorriente(proveedor)}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Cuenta corriente
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onFacturas(proveedor)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Facturas
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-sm text-center text-gray-500 italic">
                  No se encontraron proveedores que coincidan con los filtros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="p-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200">
        <div>
          Mostrando {proveedores.length} registro{proveedores.length !== 1 ? "s" : ""}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

