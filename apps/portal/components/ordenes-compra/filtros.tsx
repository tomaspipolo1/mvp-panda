"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FiltrosProps {
  onFilter: (filters: any) => void
}

export function Filtros({ onFilter }: FiltrosProps) {
  const [numeroOrden, setNumeroOrden] = useState<string>("")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")

  const handleAplicarFiltros = () => {
    onFilter({
      numeroOrden,
      fechaDesde,
      fechaHasta,
    })
  }

  const handleLimpiar = () => {
    setNumeroOrden("")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      numeroOrden: "",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Número de Orden */}
        <div>
          <label htmlFor="numeroOrden" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Orden
          </label>
          <Input
            id="numeroOrden"
            placeholder="Ej: OC-2023-0458"
            value={numeroOrden}
            onChange={(e) => setNumeroOrden(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Fecha Desde */}
        <div>
          <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Desde
          </label>
          <div className="relative">
            <Input
              id="fechaDesde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Fecha Hasta */}
        <div>
          <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Hasta
          </label>
          <div className="relative">
            <Input
              id="fechaHasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" onClick={handleLimpiar}>
          Limpiar
        </Button>
        <Button onClick={handleAplicarFiltros} className="bg-plp-dark hover:bg-plp-medium">
          <Filter className="h-4 w-4 mr-2" />
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )
}
