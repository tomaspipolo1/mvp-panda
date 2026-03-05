"use client"

import { useState } from "react"
import { Printer, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumenCardsCliente } from "@/components/cuenta-corriente/resumen-cards-cliente"
import { FiltrosCliente } from "@/components/cuenta-corriente/filtros-cliente"
import { TablaMovimientosCliente } from "@/components/cuenta-corriente/tabla-movimientos-cliente"
import { DetalleMovimientoModalCliente } from "@/components/cuenta-corriente/detalle-movimiento-modal-cliente"

interface Movimiento {
  id: string
  fecha: string
  tipo: "Factura" | "Recibo" | "Nota de Crédito" | "Nota de Débito"
  numero: string
  concepto: string
  debe: number | null
  haber: number | null
  saldo: number
  estado: "Pendiente" | "Pagado" | "Procesado"
  detalles?: {
    entidad: string
    referencia?: string
    fechaVencimiento?: string
    items?: Array<{
      descripcion: string
      cantidad: number
      precioUnitario: number
      subtotal: number
    }>
    observaciones?: string
  }
}

export default function CuentaCorrienteClientePage() {
  const [selectedMovimiento, setSelectedMovimiento] = useState<Movimiento | null>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [filteredMovimientos, setFilteredMovimientos] = useState<Movimiento[]>(movimientosData)

  const handleVerDetalle = (movimiento: Movimiento) => {
    setSelectedMovimiento(movimiento)
    setIsDetalleModalOpen(true)
  }

  const handleDescargarPDF = (movimiento: Movimiento) => {
    // Implementación de descarga de PDF
    console.log("Descargando PDF para:", movimiento.numero)
    // Aquí iría la lógica para descargar el PDF
  }

  const handleFilter = (filters: any) => {
    let filtered = [...movimientosData]

    if (filters.tipoDocumento !== "todos") {
      filtered = filtered.filter((mov) => mov.tipo.toLowerCase() === filters.tipoDocumento)
    }

    if (filters.estado !== "todos") {
      filtered = filtered.filter((mov) => mov.estado.toLowerCase() === filters.estado)
    }

    if (filters.fechaDesde) {
      const fechaDesde = new Date(filters.fechaDesde)
      filtered = filtered.filter((mov) => {
        const fechaMov = new Date(mov.fecha.split("/").reverse().join("-"))
        return fechaMov >= fechaDesde
      })
    }

    if (filters.fechaHasta) {
      const fechaHasta = new Date(filters.fechaHasta)
      filtered = filtered.filter((mov) => {
        const fechaMov = new Date(mov.fecha.split("/").reverse().join("-"))
        return fechaMov <= fechaHasta
      })
    }

    setFilteredMovimientos(filtered)
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
            <FileText className="mr-2 h-4 w-4" />
            Reportes
          </Button>
        </div>
      </div>

      <ResumenCardsCliente
        saldoActual={{
          monto: "$1.250.430,75",
          fechaActualizacion: "15/04/2023",
        }}
        proximoVencimiento={{
          fecha: "25/04/2023",
          factura: "FC-2023-0458",
        }}
        montoFacturado2025={{
          monto: "$2.840.650,00",
        }}
      />

      <FiltrosCliente onFilter={handleFilter} />

      <TablaMovimientosCliente
        movimientos={filteredMovimientos}
        onVerDetalle={handleVerDetalle}
        onDescargarPDF={handleDescargarPDF}
      />

      <DetalleMovimientoModalCliente
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        movimiento={selectedMovimiento}
      />
    </div>
  )
}

// Datos de ejemplo
const movimientosData: Movimiento[] = [
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
    detalles: {
      entidad: "Puerto La Plata",
      fechaVencimiento: "25/04/2023",
      items: [
        {
          descripcion: "Servicio de amarre",
          cantidad: 1,
          precioUnitario: 45000.0,
          subtotal: 45000.0,
        },
        {
          descripcion: "Uso de muelle",
          cantidad: 3,
          precioUnitario: 13476.67,
          subtotal: 40430.0,
        },
      ],
    },
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
    detalles: {
      entidad: "Puerto La Plata",
      referencia: "Transferencia #45678",
    },
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
    detalles: {
      entidad: "Puerto La Plata",
      fechaVencimiento: "20/04/2023",
      items: [
        {
          descripcion: "Mantenimiento mensual",
          cantidad: 1,
          precioUnitario: 45000.0,
          subtotal: 45000.0,
        },
      ],
    },
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
    detalles: {
      entidad: "Puerto La Plata",
      referencia: "FC-2023-0410",
    },
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
    detalles: {
      entidad: "Puerto La Plata",
      fechaVencimiento: "05/04/2023",
      items: [
        {
          descripcion: "Equipo de seguridad",
          cantidad: 5,
          precioUnitario: 15000.0,
          subtotal: 75000.0,
        },
        {
          descripcion: "Sistema de monitoreo",
          cantidad: 1,
          precioUnitario: 155430.0,
          subtotal: 155430.0,
        },
      ],
    },
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
    detalles: {
      entidad: "Puerto La Plata",
      referencia: "FC-2023-0389",
    },
  },
]
