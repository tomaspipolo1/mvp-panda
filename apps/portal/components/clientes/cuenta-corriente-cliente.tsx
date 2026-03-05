"use client"

import { useState } from "react"
import { Printer, Download, FileBarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumenCardsCliente } from "@/components/cuenta-corriente/resumen-cards-cliente"
import { FiltrosCliente } from "@/components/cuenta-corriente/filtros-cliente"
import { TablaMovimientosCliente } from "@/components/cuenta-corriente/tabla-movimientos-cliente"
import { DetalleMovimientoModalCliente } from "@/components/cuenta-corriente/detalle-movimiento-modal-cliente"

interface CuentaCorrienteClienteProps {
  clienteId: number
  clienteNombre: string
  esVistaEmpleado?: boolean // true = vista empleado/admin, false/undefined = vista cliente
}

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
}

// Datos de ejemplo para movimientos
const movimientosData: Movimiento[] = [
  {
    id: "1",
    fecha: "15/04/2023",
    tipo: "Factura",
    numero: "FC-2023-0458",
    concepto: "Servicios portuarios",
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
    concepto: "Servicios de almacenamiento",
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
    concepto: "Servicios de carga",
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
]

export function CuentaCorrienteCliente({ 
  clienteId, 
  clienteNombre, 
  esVistaEmpleado = true 
}: CuentaCorrienteClienteProps) {
  const [filteredMovimientos, setFilteredMovimientos] = useState(movimientosData)
  const [selectedMovimiento, setSelectedMovimiento] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)

  // Datos de resumen (en una app real vendrían del backend según el clienteId)
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
    },
  }

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    setFilteredMovimientos(movimientosData)
  }

  const handleVerDetalle = (movimiento: any) => {
    // Añadir datos de ejemplo para el detalle
    const movimientoConDetalle = {
      ...movimiento,
      detalles: {
        entidad: clienteNombre,
        referencia: movimiento.tipo === "Factura" ? "Orden de Servicio #OS-2023-156" : undefined,
        fechaVencimiento: movimiento.tipo === "Factura" ? "30/04/2023" : undefined,
        items:
          movimiento.tipo === "Factura"
            ? [
                {
                  descripcion: "Servicios de carga y descarga",
                  cantidad: 50,
                  precioUnitario: 1200,
                  subtotal: 60000,
                },
                {
                  descripcion: "Almacenamiento temporal",
                  cantidad: 10,
                  precioUnitario: 2543,
                  subtotal: 25430,
                },
              ]
            : undefined,
        observaciones:
          movimiento.tipo === "Nota de Crédito"
            ? "Devolución parcial por servicios no prestados"
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
    alert(`Descargando PDF para ${movimiento.numero}`)
  }

  const handleImprimir = () => {
    console.log("Imprimiendo cuenta corriente")
    window.print()
  }

  const handleExportar = () => {
    console.log("Exportando cuenta corriente")
    alert("Exportando cuenta corriente... (Funcionalidad simulada)")
  }

  const handleReportes = () => {
    console.log("Generando reportes")
    alert("Generando reportes... (Funcionalidad simulada)")
  }

  return (
    <div className="space-y-6">
      {/* Header con acciones - Solo en vista empleado/admin */}
      {esVistaEmpleado && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cuenta Corriente</h2>
            <p className="text-sm text-gray-600 mt-1">{clienteNombre}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center" onClick={handleImprimir}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" className="flex items-center" onClick={handleExportar}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" className="flex items-center" onClick={handleReportes}>
              <FileBarChart className="mr-2 h-4 w-4" />
              Reportes
            </Button>
          </div>
        </div>
      )}

      {/* Resumen Cards */}
      <ResumenCardsCliente
        saldoActual={resumenData.saldoActual}
        proximoVencimiento={resumenData.proximoVencimiento}
        montoFacturado2025={resumenData.montoFacturado2025}
      />

      {/* Filtros */}
      <FiltrosCliente onFilter={handleFilter} />

      {/* Tabla de Movimientos */}
      <TablaMovimientosCliente
        movimientos={filteredMovimientos}
        onVerDetalle={handleVerDetalle}
        onDescargarPDF={handleDescargarPDF}
      />

      {/* Modal de Detalle */}
      <DetalleMovimientoModalCliente
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        movimiento={selectedMovimiento}
      />
    </div>
  )
}

