"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Calendar as CalendarIcon, Search } from "lucide-react"

interface FiltrosFacturasMesaEntradasProps {
  onFilter: (filtros: FiltrosFacturas) => void
}

export interface FiltrosFacturas {
  busqueda: string
  estado: string
  fechaDesde: string
  fechaHasta: string
}

export function FiltrosFacturasMesaEntradas({ onFilter }: FiltrosFacturasMesaEntradasProps) {
  const [busqueda, setBusqueda] = useState("")
  const [estado, setEstado] = useState("Todos")
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")

  const handleLimpiar = () => {
    setBusqueda("")
    setEstado("Todos")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      busqueda: "",
      estado: "Todos",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  const handleAplicarFiltros = () => {
    onFilter({
      busqueda,
      estado,
      fechaDesde,
      fechaHasta,
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Búsqueda unificada */}
        <div>
          <Label htmlFor="busqueda">Búsqueda</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
            <Input
              id="busqueda"
              placeholder="Nro. Factura o Proveedor"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full mt-1 pl-10"
            />
          </div>
        </div>

        {/* Estado */}
        <div>
          <Label htmlFor="estado">Estado</Label>
          <Select value={estado} onValueChange={setEstado}>
            <SelectTrigger id="estado" className="mt-1">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Cargada">Cargada</SelectItem>
              <SelectItem value="En proceso">En proceso</SelectItem>
              <SelectItem value="Paga">Paga</SelectItem>
              <SelectItem value="Anulada">Anulada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fecha Desde */}
        <div>
          <Label htmlFor="fechaDesde">Fecha Desde</Label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
            <Input
              id="fechaDesde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full mt-1 pl-10"
            />
          </div>
        </div>

        {/* Fecha Hasta */}
        <div>
          <Label htmlFor="fechaHasta">Fecha Hasta</Label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
            <Input
              id="fechaHasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full mt-1 pl-10"
            />
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleLimpiar}>
          Limpiar
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAplicarFiltros}>
          <Filter className="mr-2 h-4 w-4" />
          Aplicar filtros
        </Button>
      </div>
    </div>
  )
}

