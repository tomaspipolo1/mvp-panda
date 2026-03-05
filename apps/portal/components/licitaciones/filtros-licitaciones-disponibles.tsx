"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FiltrosLicitacionesDisponiblesProps {
  onFilter: (filters: any) => void
}

export function FiltrosLicitacionesDisponibles({ onFilter }: FiltrosLicitacionesDisponiblesProps) {
  const [tipoLicitacion, setTipoLicitacion] = useState<string>("todos")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")

  const handleAplicarFiltros = () => {
    onFilter({
      tipoLicitacion,
      estado,
      fechaDesde,
      fechaHasta,
    })
  }

  const handleLimpiar = () => {
    setTipoLicitacion("todos")
    setEstado("todos")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      tipoLicitacion: "todos",
      estado: "todos",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tipo de Licitación */}
        <div>
          <label htmlFor="tipoLicitacion" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Licitación
          </label>
          <Select value={tipoLicitacion} onValueChange={setTipoLicitacion}>
            <SelectTrigger id="tipoLicitacion" className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="publica">Pública</SelectItem>
              <SelectItem value="privada">Privada</SelectItem>
              <SelectItem value="concurso">Concurso de precios</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <Select value={estado} onValueChange={setEstado}>
            <SelectTrigger id="estado" className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="abierta">Abierta</SelectItem>
              <SelectItem value="cerrada">Cerrada</SelectItem>
              <SelectItem value="evaluacion">En evaluación</SelectItem>
              <SelectItem value="adjudicada">Adjudicada</SelectItem>
              <SelectItem value="finalizada">Finalizada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
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
              placeholder="dd/mm/aaaa"
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
              placeholder="dd/mm/aaaa"
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
