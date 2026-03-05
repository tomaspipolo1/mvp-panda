"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosRetenciones } from "@/components/retenciones/filtros-retenciones"
import { TablaRetenciones } from "@/components/retenciones/tabla-retenciones"
import { DetalleRetencionModal } from "@/components/retenciones/detalle-retencion-modal"

// Datos de ejemplo
const retencionesData = [
  {
    id: "1",
    fecha: "15/04/2023",
    tipo: "IVA",
    jurisdiccion: "Nacional",
    comprobante: "RT-2023-0458",
    concepto: "Suministro de materiales",
    baseImponible: 85430.0,
    alicuota: 10.5,
    monto: 8970.15,
    detalles: {
      fechaVencimiento: "30/04/2023",
      ordenPago: "OP-2023-0789",
      formaPago: "Transferencia Bancaria",
      observaciones: "Retención aplicada según normativa vigente",
      items: [
        {
          codigo: "MAT-001",
          descripcion: "Materiales de construcción",
          cantidad: 10,
          precioUnitario: 8543.0,
          subtotal: 85430.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "10/04/2023",
    tipo: "Ingresos Brutos",
    jurisdiccion: "CABA",
    comprobante: "RT-2023-0457",
    concepto: "Servicios de consultoría",
    baseImponible: 45000.0,
    alicuota: 3.5,
    monto: 1575.0,
    detalles: {
      fechaVencimiento: "25/04/2023",
      ordenPago: "OP-2023-0756",
      formaPago: "Transferencia Bancaria",
      observaciones: "Retención IIBB CABA",
    },
  },
  {
    id: "3",
    fecha: "05/04/2023",
    tipo: "Ganancias",
    jurisdiccion: "Nacional",
    comprobante: "RT-2023-0456",
    concepto: "Materiales de construcción",
    baseImponible: 120750.0,
    alicuota: 2,
    monto: 2415.0,
    detalles: {
      fechaVencimiento: "20/04/2023",
      ordenPago: "OP-2023-0723",
      formaPago: "Transferencia Bancaria",
    },
  },
  {
    id: "4",
    fecha: "28/03/2023",
    tipo: "IVA",
    jurisdiccion: "Nacional",
    comprobante: "RT-2023-0455",
    concepto: "Equipos informáticos",
    baseImponible: 230000.0,
    alicuota: 21,
    monto: 48300.0,
    detalles: {
      fechaVencimiento: "15/04/2023",
      ordenPago: "OP-2023-0698",
      formaPago: "Transferencia Bancaria",
      items: [
        {
          codigo: "EQ-001",
          descripcion: "Servidores",
          cantidad: 2,
          precioUnitario: 95000.0,
          subtotal: 190000.0,
        },
        {
          codigo: "EQ-002",
          descripcion: "Equipos de red",
          cantidad: 4,
          precioUnitario: 10000.0,
          subtotal: 40000.0,
        },
      ],
    },
  },
]

export default function RetencionesPage() {
  const [filteredRetenciones, setFilteredRetenciones] = useState(retencionesData)
  const [selectedRetencion, setSelectedRetencion] = useState<any>(null)
  const [isDetalleOpen, setIsDetalleOpen] = useState(false)

  const handleFilter = (filters: any) => {
    let filtered = [...retencionesData]

    if (filters.tipoRetencion !== "todos") {
      filtered = filtered.filter((retencion) => retencion.tipo === filters.tipoRetencion)
    }

    if (filters.jurisdiccion !== "todas") {
      filtered = filtered.filter((retencion) => retencion.jurisdiccion === filters.jurisdiccion)
    }

    if (filters.fechaDesde) {
      const fechaDesde = new Date(filters.fechaDesde)
      filtered = filtered.filter((retencion) => {
        const fechaRetencion = new Date(retencion.fecha.split("/").reverse().join("-"))
        return fechaRetencion >= fechaDesde
      })
    }

    if (filters.fechaHasta) {
      const fechaHasta = new Date(filters.fechaHasta)
      filtered = filtered.filter((retencion) => {
        const fechaRetencion = new Date(retencion.fecha.split("/").reverse().join("-"))
        return fechaRetencion <= fechaHasta
      })
    }

    setFilteredRetenciones(filtered)
  }

  const handleVerDetalle = (retencion: any) => {
    setSelectedRetencion(retencion)
    setIsDetalleOpen(true)
  }

  const handleDescargarCertificado = (retencion: any) => {
    console.log("Descargando certificado para:", retencion.comprobante)
    // Lógica para descargar certificado
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Retenciones</h1>
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

      <FiltrosRetenciones onFilter={handleFilter} />
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaRetenciones
          retenciones={filteredRetenciones}
          onVerDetalle={handleVerDetalle}
          onDescargarCertificado={handleDescargarCertificado}
        />
      </div>

      <DetalleRetencionModal
        isOpen={isDetalleOpen}
        onClose={() => setIsDetalleOpen(false)}
        retencion={selectedRetencion}
      />
    </div>
  )
}
