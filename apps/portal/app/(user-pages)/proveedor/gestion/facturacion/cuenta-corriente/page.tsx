"use client"

import { useState } from "react"
import { Printer, Download, FileBarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumenCards } from "@/components/cuenta-corriente/resumen-cards"
import { Filtros } from "@/components/cuenta-corriente/filtros"
import { TablaMovimientos } from "@/components/cuenta-corriente/tabla-movimientos"
import { DetalleMovimientoModal } from "@/components/cuenta-corriente/detalle-movimiento-modal"

// Datos de ejemplo
const resumenData = {
  saldoActual: {
    monto: "$1,250,430.75",
    fechaActualizacion: "15/04/2023",
  },
  proximoVencimiento: {
    fecha: "25/04/2023",
    factura: "FC-2023-0458",
  },
  montoFacturado2025: {
    monto: "$2,845,670.50",
    anio: "2025",
  },
}

const movimientosData = [
  {
    id: "1",
    fecha: "15/04/2023",
    tipo: "Factura",
    numero: "FC-2023-0458",
    concepto: "Suministro de materiales",
    debe: 85430.0,
    haber: null,
    saldo: 1250430.75,
    estado: "Pendiente",
  },
  {
    id: "2",
    fecha: "10/04/2023",
    tipo: "Recibo",
    numero: "RC-2023-0125",
    concepto: "Pago de facturas varias",
    debe: null,
    haber: 120000.0,
    saldo: 1165000.75,
    estado: "Pagado",
  },
  {
    id: "3",
    fecha: "05/04/2023",
    tipo: "Factura",
    numero: "FC-2023-0432",
    concepto: "Servicios de mantenimiento",
    debe: 45000.0,
    haber: null,
    saldo: 1285000.75,
    estado: "Pagado",
  },
  {
    id: "4",
    fecha: "28/03/2023",
    tipo: "Nota de Crédito",
    numero: "NC-2023-0089",
    concepto: "Devolución parcial",
    debe: null,
    haber: 15430.0,
    saldo: 1240000.75,
    estado: "Procesado",
  },
  {
    id: "5",
    fecha: "20/03/2023",
    tipo: "Factura",
    numero: "FC-2023-0410",
    concepto: "Suministro de equipos",
    debe: 230430.0,
    haber: null,
    saldo: 1255430.75,
    estado: "Pagado",
  },
  {
    id: "6",
    fecha: "15/03/2023",
    tipo: "Nota de Débito",
    numero: "ND-2023-0045",
    concepto: "Intereses por mora",
    debe: 5000.0,
    haber: null,
    saldo: 1025000.75,
    estado: "Pagado",
  },
] as const

export default function CuentaCorrientePage() {
  const [filteredMovimientos, setFilteredMovimientos] = useState(movimientosData)
  const [selectedMovimiento, setSelectedMovimiento] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredMovimientos(movimientosData)
  }

  const handleVerDetalle = (movimiento: any) => {
    // Añadir datos de ejemplo para el detalle
    const movimientoConDetalle = {
      ...movimiento,
      detalles: {
        entidad: "Suministros Industriales S.A.",
        referencia: movimiento.tipo === "Factura" ? "Orden de Compra #OC-2023-156" : undefined,
        fechaVencimiento: movimiento.tipo === "Factura" ? "30/04/2023" : undefined,
        items:
          movimiento.tipo === "Factura"
            ? [
                {
                  descripcion: "Materiales de construcción",
                  cantidad: 50,
                  precioUnitario: 1200,
                  subtotal: 60000,
                },
                {
                  descripcion: "Herramientas especializadas",
                  cantidad: 10,
                  precioUnitario: 2543,
                  subtotal: 25430,
                },
              ]
            : undefined,
        observaciones:
          movimiento.tipo === "Nota de Crédito"
            ? "Devolución parcial por materiales defectuosos"
            : movimiento.tipo === "Nota de Débito"
              ? "Intereses por pago fuera de término"
              : undefined,
      },
    }
    setSelectedMovimiento(movimientoConDetalle)
    setIsDetalleModalOpen(true)
  }

  const handleDescargarPDF = (movimiento: any) => {
    console.log(`Descargando PDF para ${movimiento.numero}`)
    // Aquí iría la lógica real para descargar el PDF
    alert(`Descargando PDF para ${movimiento.numero}`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mi Cuenta Corriente</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" className="flex items-center">
            <FileBarChart className="mr-2 h-4 w-4" />
            Reportes
          </Button>
        </div>
      </div>

      <ResumenCards
        saldoActual={resumenData.saldoActual}
        proximoVencimiento={resumenData.proximoVencimiento}
        montoFacturado2025={resumenData.montoFacturado2025}
      />

      <Filtros onFilter={handleFilter} />

      <TablaMovimientos
        movimientos={filteredMovimientos}
        onVerDetalle={handleVerDetalle}
        onDescargarPDF={handleDescargarPDF}
      />

      <DetalleMovimientoModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        movimiento={selectedMovimiento}
      />
    </div>
  )
}
