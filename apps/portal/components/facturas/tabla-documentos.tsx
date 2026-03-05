"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreVertical, Download, XCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Documento {
  id: string
  fecha: string
  numero: string
  puntoVenta: string
  fechaVencimiento: string
  tipoComprobante: string
  ordenCompra: string
  cliente: string
  concepto: string
  monto: number
  estado: string
  fechaEstimadaPago?: string
}

interface TablaDocumentosProps {
  documentos: Documento[]
  tipo: "facturas" | "notasCredito" | "notasDebito"
  onVerDetalle: (documento: Documento) => void
  onDescargarPDF?: (documento: Documento) => void
  onAnular?: (documento: Documento) => void
}

export function TablaDocumentos({
  documentos,
  tipo,
  onVerDetalle,
  onDescargarPDF = () => {},
  onAnular = () => {},
}: TablaDocumentosProps) {
  const formatMonto = (monto: number) => {
    return `$ ${monto.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const formatNumeroComprobanteCompleto = (tipoComprobante: string, puntoVenta: string, numero: string) => {
    let tipoAbrev = ""
    
    if (tipoComprobante.includes("Factura")) {
      const letra = tipoComprobante.split(" ").pop() || ""
      tipoAbrev = `FC-${letra}`
    } else if (tipoComprobante.includes("Nota") && tipoComprobante.includes("Crédito")) {
      const letra = tipoComprobante.split(" ").pop() || ""
      tipoAbrev = `NC-${letra}`
    } else if (tipoComprobante.includes("Nota") && tipoComprobante.includes("Débito")) {
      const letra = tipoComprobante.split(" ").pop() || ""
      tipoAbrev = `ND-${letra}`
    } else if (tipoComprobante.includes("Ticket")) {
      tipoAbrev = "TK"
    } else {
      tipoAbrev = tipoComprobante
    }
    
    return `${tipoAbrev}-${puntoVenta}-${numero}`
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

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Cargada":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Cargada</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Proceso</Badge>
      case "Paga":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paga</Badge>
      case "Anulada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Anulada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const getTitulo = () => {
    switch (tipo) {
      case "facturas":
        return "Facturas"
      case "notasCredito":
        return "Notas de Crédito"
      case "notasDebito":
        return "Notas de Débito"
      default:
        return "Documentos"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">{getTitulo()}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '18%' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">N° comprobante</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Emisión</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Vencimiento</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Orden de Compra</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Monto</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha est. pago</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Estado</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentos.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-sm text-center text-gray-500 italic">
                  No se encontraron documentos
                </td>
              </tr>
            ) : (
              documentos.map((documento) => (
                <tr key={documento.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-left font-medium text-gray-900">
                    {formatNumeroComprobanteCompleto(documento.tipoComprobante, documento.puntoVenta, documento.numero)}
                  </td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{documento.fecha}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{documento.fechaVencimiento}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{documento.ordenCompra}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">{formatMonto(documento.monto)}</td>
                  <td className="px-4 py-4 text-sm text-left text-gray-900">
                    {documento.estado !== "Cargada" && documento.estado !== "Anulada"
                      ? documento.fechaEstimadaPago || calcularFechaEstimadaPago(documento.fecha)
                      : ""}
                  </td>
                  <td className="px-4 py-4 text-sm text-center text-gray-900">{getEstadoBadge(documento.estado)}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onVerDetalle(documento)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDescargarPDF(documento)} className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar PDF
                        </DropdownMenuItem>
                        {documento.estado !== "Anulada" && (
                          <DropdownMenuItem onClick={() => onAnular(documento)} className="cursor-pointer">
                            <XCircle className="mr-2 h-4 w-4" />
                            Anular
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="p-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200">
        <div>
          Mostrando {documentos.length} registro{documentos.length !== 1 ? "s" : ""}
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
