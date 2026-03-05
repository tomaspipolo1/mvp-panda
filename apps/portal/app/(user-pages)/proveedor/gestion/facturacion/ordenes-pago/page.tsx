"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Filtros } from "@/components/ordenes-pago/filtros"
import { TablaOrdenes } from "@/components/ordenes-pago/tabla-ordenes"
import { DetalleOrdenModal } from "@/components/ordenes-pago/detalle-orden-modal"

// Datos de ejemplo
const ordenesPagoData = [
  {
    id: "1",
    fecha: "15/04/2023",
    numero: "OP-2023-0125",
    concepto: "Pago de facturas varias",
    formaPago: "Transferencia Bancaria",
    monto: 120000.0,
  },
  {
    id: "2",
    fecha: "10/04/2023",
    numero: "OP-2023-0124",
    concepto: "Pago de servicios",
    formaPago: "Cheque",
    monto: 45000.0,
  },
  {
    id: "3",
    fecha: "05/04/2023",
    numero: "OP-2023-0123",
    concepto: "Pago de materiales",
    formaPago: "Transferencia Bancaria",
    monto: 85430.0,
  },
  {
    id: "4",
    fecha: "28/03/2023",
    numero: "OP-2023-0122",
    concepto: "Pago de equipos",
    formaPago: "Transferencia Bancaria",
    monto: 230000.0,
  },
  {
    id: "5",
    fecha: "20/03/2023",
    numero: "OP-2023-0121",
    concepto: "Pago de servicios de consultoría",
    formaPago: "Cheque",
    monto: 78500.0,
  },
  {
    id: "6",
    fecha: "15/03/2023",
    numero: "OP-2023-0120",
    concepto: "Pago de insumos",
    formaPago: "Transferencia Bancaria",
    monto: 12800.0,
  },
] as const

export default function OrdenesPagoPage() {
  const [filteredOrdenes, setFilteredOrdenes] = useState(ordenesPagoData)
  const [selectedOrden, setSelectedOrden] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredOrdenes(ordenesPagoData)
  }

  const handleVerDetalle = (orden: any) => {
    // Añadir datos de ejemplo para el detalle
    const ordenConDetalle = {
      ...orden,
      detalles: {
        fechaPago: "18/04/2023",
        cuentaOrigen:
          orden.formaPago === "Transferencia Bancaria" ? "Banco Nacional - Cta. Cte. 0012345678" : undefined,
        cuentaDestino:
          orden.formaPago === "Transferencia Bancaria"
            ? "Banco Provincia - Cta. Cte. 9876543210 - Suministros Industriales S.A."
            : undefined,
        referencia: orden.formaPago === "Cheque" ? "Cheque N° 00123456" : "Transferencia N° 987654321",
        observaciones: "Pago correspondiente a servicios prestados durante el mes de marzo 2023.",
        facturas: [
          {
            numero: "FC-2023-0458",
            fecha: "05/04/2023",
            concepto: "Suministro de materiales",
            monto: 85430.0,
          },
          {
            numero: "FC-2023-0432",
            fecha: "28/03/2023",
            concepto: "Servicios de mantenimiento",
            monto: 34570.0,
          },
        ],
      },
    }
    setSelectedOrden(ordenConDetalle)
    setIsDetalleModalOpen(true)
  }

  const handleDescargarPDF = (orden: any) => {
    console.log(`Descargando PDF para ${orden.numero}`)
    // Aquí iría la lógica real para descargar el PDF
    alert(`Descargando PDF para ${orden.numero}`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Órdenes de Pago</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Filtros onFilter={handleFilter} />

      <TablaOrdenes ordenes={filteredOrdenes} onVerDetalle={handleVerDetalle} onDescargarPDF={handleDescargarPDF} />

      <DetalleOrdenModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        orden={selectedOrden}
      />
    </div>
  )
}
