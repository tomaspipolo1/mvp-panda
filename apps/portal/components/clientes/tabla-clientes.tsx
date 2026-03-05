"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreVertical, CreditCard, FileText } from "lucide-react"

export interface Cliente {
  id: number
  razonSocial: string
  nombre: string
  cuit: string
  tiposCliente: string[]
  subcategorias: string[]
  estado: string
  ultimaActividad: string
}

interface TablaClientesProps {
  clientes: Cliente[]
  onVerDetalle: (cliente: Cliente) => void
  onCuentaCorriente: (cliente: Cliente) => void
  onFacturas: (cliente: Cliente) => void
}

export function TablaClientes({ 
  clientes, 
  onVerDetalle, 
  onCuentaCorriente,
  onFacturas,
}: TablaClientesProps) {
  const renderEstadoBadge = (estado: string) => {
    const estadoConfig: Record<string, string> = {
      Activo: "bg-green-100 text-green-800 hover:bg-green-100",
      Inactivo: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      Potencial: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      Pendiente: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    }

    return <Badge className={estadoConfig[estado] || "bg-gray-100 text-gray-800"}>{estado}</Badge>
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Listado de Clientes</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Razón Social</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CUIT</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo de Cliente</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Subcategoría</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Última actividad</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-900">{cliente.razonSocial}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{cliente.nombre}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{cliente.cuit}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {cliente.tiposCliente[0]}
                    {cliente.tiposCliente.length > 1 && (
                      <span className="ml-1 text-xs text-gray-500">+{cliente.tiposCliente.length - 1}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {cliente.subcategorias[0]}
                    {cliente.subcategorias.length > 1 && (
                      <span className="ml-1 text-xs text-gray-500">+{cliente.subcategorias.length - 1}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{renderEstadoBadge(cliente.estado)}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{cliente.ultimaActividad}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onVerDetalle(cliente)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCuentaCorriente(cliente)}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Cuenta corriente
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onFacturas(cliente)}>
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
                <td colSpan={8} className="px-4 py-8 text-sm text-center text-gray-500 italic">
                  No se encontraron clientes que coincidan con los filtros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="p-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200">
        <div>
          Mostrando {clientes.length} registro{clientes.length !== 1 ? "s" : ""}
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

