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
          monto: "$2.150.750,25",
          fechaActualizacion: "15/04/2023",
        }}
        proximoVencimiento={{
          fecha: "28/04/2023",
          factura: "FC-2023-0789",
        }}
        montoFacturado2025={{
          monto: "$8.450.320,00",
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
    numero: "FC-2023-0789",
    concepto: "Servicios de carga y descarga",
    debe: 125430.0,
    haber: null,
    saldo: 2150750.25,
    estado: "Pendiente",
    detalles: {
      entidad: "Servicios Portuarios del Sur S.A.",
      fechaVencimiento: "28/04/2023",
      items: [
        {
          descripcion: "Servicio de carga de contenedores",
          cantidad: 50,
          precioUnitario: 1800.0,
          subtotal: 90000.0,
        },
        {
          descripcion: "Servicio de descarga",
          cantidad: 20,
          precioUnitario: 1771.5,
          subtotal: 35430.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "10/04/2023",
    tipo: "Recibo",
    numero: "RC-2023-0245",
    concepto: "Pago de servicios portuarios",
    debe: null,
    haber: 180000.0,
    saldo: 2025320.25,
    estado: "Pagado",
    detalles: {
      entidad: "Servicios Portuarios del Sur S.A.",
      referencia: "Transferencia #78901",
    },
  },
  {
    id: "3",
    fecha: "05/04/2023",
    tipo: "Factura",
    numero: "FC-2023-0765",
    concepto: "Servicios de almacenaje",
    debe: 78500.0,
    haber: null,
    saldo: 2205320.25,
    estado: "Pagado",
    detalles: {
      entidad: "Servicios Portuarios del Sur S.A.",
      fechaVencimiento: "20/04/2023",
      items: [
        {
          descripcion: "Almacenaje mensual",
          cantidad: 1,
          precioUnitario: 78500.0,
          subtotal: 78500.0,
        },
      ],
    },
  },
  {
    id: "4",
    fecha: "28/03/2023",
    tipo: "Nota de Crédito",
    numero: "NC-2023-0112",
    concepto: "Ajuste por servicio no realizado",
    debe: null,
    haber: 22000.0,
    saldo: 2126820.25,
    estado: "Procesado",
    detalles: {
      entidad: "Servicios Portuarios del Sur S.A.",
      referencia: "FC-2023-0742",
    },
  },
  {
    id: "5",
    fecha: "20/03/2023",
    tipo: "Factura",
    numero: "FC-2023-0742",
    concepto: "Servicios de operación portuaria",
    debe: 345820.0,
    haber: null,
    saldo: 2148820.25,
    estado: "Pagado",
    detalles: {
      entidad: "Servicios Portuarios del Sur S.A.",
      fechaVencimiento: "05/04/2023",
      items: [
        {
          descripcion: "Operación de grúa",
          cantidad: 80,
          precioUnitario: 2500.0,
          subtotal: 200000.0,
        },
        {
          descripcion: "Personal especializado",
          cantidad: 1,
          precioUnitario: 145820.0,
          subtotal: 145820.0,
        },
      ],
    },
  },
  {
    id: "6",
    fecha: "15/03/2023",
    tipo: "Nota de Débito",
    numero: "ND-2023-0067",
    concepto: "Recargo por servicio fuera de horario",
    debe: 8500.0,
    haber: null,
    saldo: 1803000.25,
    estado: "Pagado",
    detalles: {
      entidad: "Servicios Portuarios del Sur S.A.",
      referencia: "FC-2023-0720",
    },
  },
]
