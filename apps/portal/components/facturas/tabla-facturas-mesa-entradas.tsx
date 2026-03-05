"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, XCircle, Download, MoreVertical } from "lucide-react"

export interface Factura {
  id: number
  numeroFactura: string
  proveedor: string
  fecha: string
  fechaVencimiento: string
  ordenCompra: string
  monto: string
  estado: "Cargada" | "En proceso" | "Paga" | "Anulada"
  fechaEstimadaPago?: string
}

interface TablaFacturasMesaEntradasProps {
  facturas: Factura[]
  onIngresar: (factura: Factura) => void
  onAnular: (factura: Factura) => void
  onDescargar: (factura: Factura) => void
}

export function TablaFacturasMesaEntradas({
  facturas,
  onIngresar,
  onAnular,
  onDescargar,
}: TablaFacturasMesaEntradasProps) {
  const renderEstadoBadge = (estado: Factura["estado"]) => {
    const estadoConfig = {
      Cargada: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      "En proceso": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      Paga: "bg-green-100 text-green-800 hover:bg-green-100",
      Anulada: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return (
      <Badge className={estadoConfig[estado]}>
        {estado}
      </Badge>
    )
  }

  const calcularFechaEstimadaPago = (fechaCarga: string) => {
    // Convertir fecha en formato dd/mm/yyyy a Date
    const [dia, mes, anio] = fechaCarga.split("/")
    const fecha = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia))
    
    // Sumar 30 días
    fecha.setDate(fecha.getDate() + 30)
    
    // Formatear de vuelta a dd/mm/yyyy
    const diaResult = String(fecha.getDate()).padStart(2, "0")
    const mesResult = String(fecha.getMonth() + 1).padStart(2, "0")
    const anioResult = fecha.getFullYear()
    
    return `${diaResult}/${mesResult}/${anioResult}`
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Listado de Facturas</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '14%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">N° comprobante</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Emisión</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Proveedor</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Vencimiento</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Orden de Compra</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Monto</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha est. pago</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Estado</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.length > 0 ? (
              facturas.map((factura) => (
                <tr key={factura.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-left font-medium text-gray-900">{factura.numeroFactura}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{factura.fecha}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{factura.proveedor}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{factura.fechaVencimiento}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{factura.ordenCompra}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{factura.monto}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">
                    {factura.estado !== "Cargada" && factura.estado !== "Anulada"
                      ? factura.fechaEstimadaPago || calcularFechaEstimadaPago(factura.fecha)
                      : ""}
                  </td>
                  <td className="px-4 py-4 text-sm text-center text-gray-900">{renderEstadoBadge(factura.estado)}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {factura.estado === "Cargada" && (
                          <>
                            <DropdownMenuItem onClick={() => onIngresar(factura)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Ingresar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onAnular(factura)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Anular
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem onClick={() => onDescargar(factura)}>
                          <Download className="mr-2 h-4 w-4" />
                          Descargar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-sm text-center text-gray-500 italic">
                  No se encontraron facturas que coincidan con los filtros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="p-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200">
        <div>
          Mostrando {facturas.length} registro{facturas.length !== 1 ? "s" : ""}
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

