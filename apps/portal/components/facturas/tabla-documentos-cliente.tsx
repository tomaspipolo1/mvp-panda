"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, XCircle } from "lucide-react"
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
  expediente?: string
  cliente: string
  concepto: string
  monto: number
  estado: string
}

interface TablaDocumentosProps {
  documentos: Documento[]
  tipo: "facturas" | "notasCredito" | "notasDebito"
  onVerDetalle?: (documento: Documento) => void
  onDescargarPDF?: (documento: Documento) => void
  onAnular?: (documento: Documento) => void
}

export function TablaDocumentos({
  documentos,
  tipo,
  onVerDetalle = () => {},
  onDescargarPDF = () => {},
  onAnular = () => {},
}: TablaDocumentosProps) {
  const formatMonto = (monto: number) => {
    return `$ ${monto.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const formatTipoComprobante = (tipoComprobante: string) => {
    if (tipoComprobante.includes("Factura")) {
      const letra = tipoComprobante.split(" ").pop() || ""
      return `FC-${letra}`
    } else if (tipoComprobante.includes("Nota") && tipoComprobante.includes("Crédito")) {
      const letra = tipoComprobante.split(" ").pop() || ""
      return `NC-${letra}`
    } else if (tipoComprobante.includes("Nota") && tipoComprobante.includes("Débito")) {
      const letra = tipoComprobante.split(" ").pop() || ""
      return `ND-${letra}`
    } else if (tipoComprobante.includes("Ticket")) {
      return "TICKET"
    }
    return tipoComprobante
  }

  const formatNumeroCompleto = (puntoVenta: string, numero: string) => {
    return `${puntoVenta}-${numero}`
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Emitida":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Emitida</Badge>
      case "Cobrada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Cobrada</Badge>
      case "Anulada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Anulada</Badge>
      case "Vencida":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Vencida</Badge>
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">{getTitulo()}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Fecha</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Número</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Vencimiento</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Expediente</th>
              <th className="py-3 px-4 text-center text-gray-600 font-medium">Estado</th>
              <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentos.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No se encontraron documentos
                </td>
              </tr>
            ) : (
              documentos.map((documento) => (
                <tr key={documento.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">{documento.fecha}</td>
                  <td className="py-4 px-4">{formatTipoComprobante(documento.tipoComprobante)}</td>
                  <td className="py-4 px-4">{formatNumeroCompleto(documento.puntoVenta, documento.numero)}</td>
                  <td className="py-4 px-4">{documento.fechaVencimiento}</td>
                  <td className="py-4 px-4">{documento.expediente || "-"}</td>
                  <td className="py-4 px-4 text-center">{getEstadoBadge(documento.estado)}</td>
                  <td className="py-4 px-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onDescargarPDF(documento)} className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar
                        </DropdownMenuItem>
                        {tipo !== "facturas" && documento.estado !== "Anulada" && (
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
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Mostrando {documentos.length} de {documentos.length} registros
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="bg-plp-dark text-white">
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
