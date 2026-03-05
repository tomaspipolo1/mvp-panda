"use client"

import { useState } from "react"
import { Download, FileText, Printer, MoreVertical, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FiltrosFacturas } from "@/components/facturas/filtros-facturas"
import { DetalleFacturaProveedorModal } from "@/components/facturas/detalle-factura-proveedor-modal"

export default function FacturasProveedoresPage() {
  const [selectedFacturaId, setSelectedFacturaId] = useState<string | null>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)

  // Datos de ejemplo para la tabla
  const facturas = [
    {
      id: "1",
      fecha: "15/04/2023",
      tipo: "Factura A",
      numero: "0003-00000458",
      puntoVenta: "0003",
      numeroFactura: "00000458",
      proveedor: "Suministros Industriales S.A.",
      cuit: "30-12345678-9",
      vencimiento: "15/05/2023",
      ordenCompra: "0000123",
      montoNeto: 70500.00,
      montoTotal: 85430.00,
      estado: "Cargada",
      detalle: "Suministro de materiales de construcción",
      archivo: "factura_458.pdf",
    },
    {
      id: "2",
      fecha: "10/04/2023",
      tipo: "Factura C",
      numero: "0003-00000457",
      puntoVenta: "0003",
      numeroFactura: "00000457",
      proveedor: "Logística Portuaria SRL",
      cuit: "30-98765432-1",
      vencimiento: "10/05/2023",
      ordenCompra: "0000120",
      montoNeto: 45000.00,
      montoTotal: 45000.00,
      estado: "En Proceso",
      detalle: "Servicios de transporte portuario",
      archivo: "factura_457.pdf",
    },
    {
      id: "3",
      fecha: "05/04/2023",
      tipo: "Factura A",
      numero: "0003-00000456",
      puntoVenta: "0003",
      numeroFactura: "00000456",
      proveedor: "Tecnología Naval Argentina",
      cuit: "30-56789012-3",
      vencimiento: "05/05/2023",
      ordenCompra: "0000115",
      montoNeto: 99792.00,
      montoTotal: 120750.00,
      estado: "Paga",
      detalle: "Equipamiento tecnológico para operaciones portuarias",
      archivo: "factura_456.pdf",
    },
    {
      id: "4",
      fecha: "28/03/2023",
      tipo: "Ticket",
      numero: "0003-00000455",
      puntoVenta: "0003",
      numeroFactura: "00000455",
      proveedor: "Seguridad Marítima SA",
      cuit: "30-34567890-1",
      vencimiento: "28/04/2023",
      ordenCompra: "0000110",
      montoNeto: 230000.00,
      montoTotal: 230000.00,
      estado: "Paga",
      detalle: "Equipos de seguridad y vigilancia",
      archivo: "ticket_455.pdf",
    },
    {
      id: "5",
      fecha: "22/03/2023",
      tipo: "Factura A",
      numero: "0003-00000454",
      puntoVenta: "0003",
      numeroFactura: "00000454",
      proveedor: "Suministros Industriales S.A.",
      cuit: "30-12345678-9",
      vencimiento: "22/04/2023",
      ordenCompra: "0000108",
      montoNeto: 55000.00,
      montoTotal: 66550.00,
      estado: "Cargada",
      detalle: "Materiales para mantenimiento",
      archivo: "factura_454.pdf",
    },
    {
      id: "6",
      fecha: "18/03/2023",
      tipo: "Recibo",
      numero: "0003-00000453",
      puntoVenta: "0003",
      numeroFactura: "00000453",
      proveedor: "Construcciones Portuarias",
      cuit: "30-23456789-0",
      vencimiento: "18/04/2023",
      ordenCompra: "0000105",
      montoNeto: 180000.00,
      montoTotal: 180000.00,
      estado: "Anulada",
      detalle: "Servicios de construcción - Anulado por error en facturación",
      archivo: "recibo_453.pdf",
    },
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Cargada":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "En Proceso":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Paga":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Anulada":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const handleVerFactura = (facturaId: string) => {
    setSelectedFacturaId(facturaId)
    setIsDetalleModalOpen(true)
  }

  const handleFilter = (filtros: any) => {
    console.log("Aplicando filtros:", filtros)
    // Aquí iría la lógica real de filtrado
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Facturas de Proveedores</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <FiltrosFacturas onFilter={handleFilter} showProveedorFilter={true} />

      <Card>
        <CardHeader>
          <CardTitle>Listado de Facturas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Fecha</th>
                  <th className="py-3 px-4 text-left">Tipo</th>
                  <th className="py-3 px-4 text-left">Número</th>
                  <th className="py-3 px-4 text-left">Proveedor</th>
                  <th className="py-3 px-4 text-left">Vencimiento</th>
                  <th className="py-3 px-4 text-left">Orden de Compra</th>
                  <th className="py-3 px-4 text-right">Monto</th>
                  <th className="py-3 px-4 text-left">Estado</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((factura) => (
                  <tr key={factura.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{factura.fecha}</td>
                    <td className="py-3 px-4">{factura.tipo}</td>
                    <td className="py-3 px-4 font-mono">{factura.numero}</td>
                    <td className="py-3 px-4">{factura.proveedor}</td>
                    <td className="py-3 px-4">{factura.vencimiento}</td>
                    <td className="py-3 px-4 font-mono">{factura.ordenCompra}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      ${factura.montoTotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getEstadoColor(factura.estado)}>{factura.estado}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="cursor-pointer" 
                              onClick={() => setTimeout(() => handleVerFactura(factura.id), 0)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => window.alert(`Descargando ${factura.archivo}`)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Descargar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedFacturaId && (
        <DetalleFacturaProveedorModal
          isOpen={isDetalleModalOpen}
          onClose={() => setIsDetalleModalOpen(false)}
          facturaId={selectedFacturaId}
        />
      )}
    </div>
  )
}
