"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Filtros } from "@/components/ordenes-cobro/filtros"
import { TablaOrdenes } from "@/components/ordenes-cobro/tabla-ordenes"
import { DetalleOrdenModal } from "@/components/ordenes-cobro/detalle-orden-modal"

// Datos de ejemplo
const ordenesCobroEjemplo = [
  {
    id: "1",
    fecha: "15/04/2023",
    numero: "OC-2023-0125",
    concepto: "Cobro de servicios portuarios",
    formaCobro: "Transferencia Bancaria",
    monto: 120000.0,
    detalles: {
      fechaCobro: "15/04/2023",
      cuentaOrigen: "Consorcio de Gestión Puerto La Plata",
      cuentaDestino: "Empresa ABC S.A. - Banco Provincia",
      referencia: "REF-2023-0125",
      observaciones: "Cobro por servicios portuarios del mes de marzo 2023",
      facturas: [
        {
          numero: "FC-2023-0458",
          fecha: "01/04/2023",
          concepto: "Servicios portuarios - Marzo 2023",
          monto: 120000.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "10/04/2023",
    numero: "OC-2023-0124",
    concepto: "Cobro de alquiler de espacio",
    formaCobro: "Cheque",
    monto: 45000.0,
  },
  {
    id: "3",
    fecha: "05/04/2023",
    numero: "OC-2023-0123",
    concepto: "Cobro de tasas portuarias",
    formaCobro: "Transferencia Bancaria",
    monto: 85430.0,
    detalles: {
      cuentaOrigen: "Consorcio de Gestión Puerto La Plata",
      cuentaDestino: "Constructora Norte - Banco Nación",
      referencia: "REF-2023-0123",
    },
  },
  {
    id: "4",
    fecha: "28/03/2023",
    numero: "OC-2023-0122",
    concepto: "Cobro de servicios de amarre",
    formaCobro: "Transferencia Bancaria",
    monto: 230000.0,
    detalles: {
      observaciones: "Orden anulada por duplicidad con OC-2023-0121",
    },
  },
  {
    id: "5",
    fecha: "25/03/2023",
    numero: "OC-2023-0121",
    concepto: "Cobro de servicios de amarre",
    formaCobro: "Transferencia Bancaria",
    monto: 230000.0,
  },
  {
    id: "6",
    fecha: "20/03/2023",
    numero: "OC-2023-0120",
    concepto: "Cobro de tasas de habilitación",
    formaCobro: "Efectivo",
    monto: 15000.0,
  },
]

export default function OrdenesCobroPage() {
  const [filtros, setFiltros] = useState({})
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<any>(null)
  const [modalDetalle, setModalDetalle] = useState(false)

  const handleFiltrar = (nuevosFiltros: any) => {
    setFiltros(nuevosFiltros)
    // Aquí iría la lógica para filtrar las órdenes según los filtros aplicados
    // Por simplicidad, no implementamos el filtrado real en este ejemplo
  }

  const handleVerDetalle = (orden: any) => {
    setOrdenSeleccionada(orden)
    setModalDetalle(true)
  }

  const handleDescargarPDF = (orden: any) => {
    // Aquí iría la lógica para descargar el PDF de la orden
    console.log("Descargando PDF de la orden:", orden.numero)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-plp-darkest">Órdenes de Cobro</h1>
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

      <Filtros onFilter={handleFiltrar} />
      <TablaOrdenes ordenes={ordenesCobroEjemplo} onVerDetalle={handleVerDetalle} onDescargarPDF={handleDescargarPDF} />

      <DetalleOrdenModal isOpen={modalDetalle} onClose={() => setModalDetalle(false)} orden={ordenSeleccionada} />
    </div>
  )
}
