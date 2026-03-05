"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Filtros } from "@/components/ordenes-compra/filtros"
import { TablaOrdenes } from "@/components/ordenes-compra/tabla-ordenes"
import { DetalleOrdenModal } from "@/components/ordenes-compra/detalle-orden-modal"
import { RegistrarEntregaModal } from "@/components/ordenes-compra/registrar-entrega-modal"

// Datos de ejemplo
const ordenesData = [
  {
    id: "1",
    fecha: "15/04/2023",
    numero: "OC-2023-0458",
    expediente: "EXP-2023-1458",
    descripcion: "Suministro de materiales",
    solicitante: "Departamento de Compras",
    monto: 85430.0,
  },
  {
    id: "2",
    fecha: "10/04/2023",
    numero: "OC-2023-0457",
    expediente: "EXP-2023-1420",
    descripcion: "Servicios de consultoría",
    solicitante: "Gerencia General",
    monto: 45000.0,
  },
  {
    id: "3",
    fecha: "05/04/2023",
    numero: "OC-2023-0456",
    expediente: "EXP-2023-1389",
    descripcion: "Materiales de construcción",
    solicitante: "Departamento de Obras",
    monto: 120750.0,
  },
  {
    id: "4",
    fecha: "28/03/2023",
    numero: "OC-2023-0455",
    expediente: "EXP-2023-1356",
    descripcion: "Equipos informáticos",
    solicitante: "Departamento de IT",
    monto: 230000.0,
  },
  {
    id: "5",
    fecha: "20/03/2023",
    numero: "OC-2023-0454",
    expediente: "EXP-2023-1298",
    descripcion: "Mobiliario de oficina",
    solicitante: "Administración",
    monto: 78500.0,
  },
  {
    id: "6",
    fecha: "15/03/2023",
    numero: "OC-2023-0453",
    expediente: "EXP-2023-1267",
    descripcion: "Insumos de limpieza",
    solicitante: "Servicios Generales",
    monto: 12800.0,
  },
] as const

export default function OrdenesCompraPage() {
  const [filteredOrdenes, setFilteredOrdenes] = useState(ordenesData)
  const [selectedOrden, setSelectedOrden] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [isRegistrarEntregaModalOpen, setIsRegistrarEntregaModalOpen] = useState(false)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredOrdenes(ordenesData)
  }

  const handleVerDetalle = (orden: any) => {
    // Añadir datos de ejemplo para el detalle
    const ordenConDetalle = {
      ...orden,
      detalles: {
        contacto: "Transportes Marítimos S.A. - Carlos Gutiérrez - Tel: +54 221 456-7890",
        observaciones: "Entregar en horario de 9 a 17hs. Coordinar con el departamento de logística.",
        items: [
          {
            codigo: "MAT-001",
            descripcion: "Cemento Portland x 50kg",
            cantidad: 50,
            precioUnitario: 1200,
            subtotal: 60000,
          },
          {
            codigo: "MAT-002",
            descripcion: "Arena fina x m³",
            cantidad: 10,
            precioUnitario: 2543,
            subtotal: 25430,
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

  const handleRegistrarEntrega = (orden: any) => {
    setSelectedOrden(orden)
    setIsRegistrarEntregaModalOpen(true)
  }

  const handleConfirmarEntrega = (data: any) => {
    console.log("Confirmando entrega:", data)
    // Aquí iría la lógica real para registrar la entrega
    alert(`Entrega registrada para la orden ${selectedOrden?.numero}`)
    // Actualizar el estado de la orden en la lista
    const updatedOrdenes = filteredOrdenes.map((orden) => (orden.id === data.ordenId ? { ...orden } : orden))
    setFilteredOrdenes(updatedOrdenes)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Órdenes de Compra</h1>
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

      <TablaOrdenes
        ordenes={filteredOrdenes}
        onVerDetalle={handleVerDetalle}
        onDescargarPDF={handleDescargarPDF}
        onRegistrarEntrega={handleRegistrarEntrega}
      />

      <DetalleOrdenModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        orden={selectedOrden}
      />

      <RegistrarEntregaModal
        isOpen={isRegistrarEntregaModalOpen}
        onClose={() => setIsRegistrarEntregaModalOpen(false)}
        onConfirm={handleConfirmarEntrega}
        orden={selectedOrden}
      />
    </div>
  )
}
