"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosPercepciones } from "@/components/percepciones/filtros-percepciones"
import { TablaPercepciones } from "@/components/percepciones/tabla-percepciones"
import { DetallePercepcionModal } from "@/components/percepciones/detalle-percepcion-modal"

// Datos de ejemplo
const percepcionesData = [
  {
    id: "1",
    fecha: "15/04/2023",
    tipo: "IVA",
    jurisdiccion: "Nacional",
    comprobante: "FC-2023-0458",
    concepto: "Suministro de materiales",
    baseImponible: 85430.0,
    alicuota: 10.5,
    monto: 8970.15,
  },
  {
    id: "2",
    fecha: "10/04/2023",
    tipo: "Ingresos Brutos",
    jurisdiccion: "CABA",
    comprobante: "FC-2023-0457",
    concepto: "Servicios de consultoría",
    baseImponible: 45000.0,
    alicuota: 3.5,
    monto: 1575.0,
  },
  {
    id: "3",
    fecha: "05/04/2023",
    tipo: "Ganancias",
    jurisdiccion: "Nacional",
    comprobante: "FC-2023-0456",
    concepto: "Materiales de construcción",
    baseImponible: 120750.0,
    alicuota: 2,
    monto: 2415.0,
  },
  {
    id: "4",
    fecha: "28/03/2023",
    tipo: "IVA",
    jurisdiccion: "Nacional",
    comprobante: "FC-2023-0455",
    concepto: "Equipos informáticos",
    baseImponible: 230000.0,
    alicuota: 21,
    monto: 48300.0,
  },
]

export default function PercepcionesPage() {
  const [filteredPercepciones, setFilteredPercepciones] = useState(percepcionesData)
  const [selectedPercepcion, setSelectedPercepcion] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredPercepciones(percepcionesData)
  }

  const handleVerDetalle = (percepcion: any) => {
    // Añadir datos de ejemplo para el detalle
    const percepcionConDetalle = {
      ...percepcion,
      detalles: {
        fechaVencimiento: "30/04/2023",
        ordenCompra: "OC-2023-0123",
        formaPago: "Transferencia Bancaria",
        observaciones: "Percepción aplicada según normativa vigente.",
        items: [
          {
            codigo: "PROD-001",
            descripcion: "Cemento Portland x 50kg",
            cantidad: 50,
            precioUnitario: 1200,
            subtotal: 60000,
          },
          {
            codigo: "PROD-002",
            descripcion: "Arena fina x m³",
            cantidad: 10,
            precioUnitario: 2543,
            subtotal: 25430,
          },
        ],
      },
    }
    setSelectedPercepcion(percepcionConDetalle)
    setIsDetalleModalOpen(true)
  }

  const handleDescargarCertificado = (percepcion: any) => {
    console.log(`Descargando certificado para ${percepcion.comprobante}`)
    // Aquí iría la lógica real para descargar el certificado
    alert(`Descargando certificado para ${percepcion.comprobante}`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Percepciones</h1>
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

      <FiltrosPercepciones onFilter={handleFilter} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaPercepciones
          percepciones={filteredPercepciones}
          onVerDetalle={handleVerDetalle}
          onDescargarCertificado={handleDescargarCertificado}
        />
      </div>

      <DetallePercepcionModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        percepcion={selectedPercepcion}
      />
    </div>
  )
}
