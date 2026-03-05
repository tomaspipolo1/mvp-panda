"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosLicitacionesDisponibles } from "@/components/licitaciones/filtros-licitaciones-disponibles"
import { TablaLicitacionesDisponibles } from "@/components/licitaciones/tabla-licitaciones-disponibles"

// Datos de ejemplo para licitaciones disponibles
const licitacionesDisponiblesData = [
  {
    id: "1",
    numero: "LIC-2023-0130",
    objeto: "Adquisición de mobiliario escolar",
    tipo: "Pública" as const,
    cierre: "10/05/2023",
    apertura: "11/05/2023",
    montoEstimado: 2500000.0,
    inscripto: false,
    estado: "Abierta" as const,
  },
  {
    id: "2",
    numero: "LIC-2023-0129",
    objeto: "Servicio de seguridad para edificios públicos",
    tipo: "Privada" as const,
    cierre: "05/05/2023",
    apertura: "06/05/2023",
    montoEstimado: 4800000.0,
    inscripto: true,
    estado: "En evaluación" as const,
  },
  {
    id: "3",
    numero: "LIC-2023-0128",
    objeto: "Provisión de equipos médicos",
    tipo: "Pública" as const,
    cierre: "30/04/2023",
    apertura: "02/05/2023",
    montoEstimado: 3200000.0,
    inscripto: false,
    estado: "Cerrada" as const,
  },
  {
    id: "4",
    numero: "LIC-2023-0127",
    objeto: "Mantenimiento de sistemas informáticos",
    tipo: "Concurso de precios" as const,
    cierre: "28/04/2023",
    apertura: "29/04/2023",
    montoEstimado: 1800000.0,
    inscripto: false,
    estado: "Abierta" as const,
  },
  {
    id: "5",
    numero: "LIC-2023-0126",
    objeto: "Construcción de centro deportivo",
    tipo: "Pública" as const,
    cierre: "25/04/2023",
    apertura: "26/04/2023",
    montoEstimado: 12500000.0,
    inscripto: true,
    estado: "Adjudicada" as const,
  },
  {
    id: "6",
    numero: "LIC-2023-0125",
    objeto: "Suministro de material de oficina",
    tipo: "Concurso de precios" as const,
    cierre: "20/04/2023",
    apertura: "21/04/2023",
    montoEstimado: 850000.0,
    inscripto: false,
    estado: "Finalizada" as const,
  },
  {
    id: "7",
    numero: "LIC-2023-0124",
    objeto: "Reparación de infraestructura portuaria",
    tipo: "Privada" as const,
    cierre: "15/04/2023",
    apertura: "16/04/2023",
    montoEstimado: 5600000.0,
    inscripto: false,
    estado: "Cancelada" as const,
  },
]

export default function NuevaInscripcionPage() {
  const [filteredLicitaciones, setFilteredLicitaciones] = useState(licitacionesDisponiblesData)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredLicitaciones(licitacionesDisponiblesData)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Listado licitaciones</h1>
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <FiltrosLicitacionesDisponibles onFilter={handleFilter} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaLicitacionesDisponibles licitaciones={filteredLicitaciones} />
      </div>
    </div>
  )
}
