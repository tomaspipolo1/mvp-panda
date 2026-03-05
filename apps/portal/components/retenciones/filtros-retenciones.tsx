"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface FiltrosRetencionesProps {
  onFilter: (filters: any) => void
}

export function FiltrosRetenciones({ onFilter }: FiltrosRetencionesProps) {
  const [tipoRetencion, setTipoRetencion] = useState<string>("todos")
  const [jurisdiccion, setJurisdiccion] = useState<string>("todas")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")

  const handleAplicarFiltros = () => {
    onFilter({
      tipoRetencion,
      jurisdiccion,
      fechaDesde,
      fechaHasta,
    })
  }

  const handleLimpiar = () => {
    setTipoRetencion("todos")
    setJurisdiccion("todas")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      tipoRetencion: "todos",
      jurisdiccion: "todas",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tipo de Retención */}
        <div>
          <label htmlFor="tipoRetencion" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Retención
          </label>
          <Select value={tipoRetencion} onValueChange={setTipoRetencion}>
            <SelectTrigger id="tipoRetencion" className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">
                <div className="flex items-center">
                  <Checkbox checked={tipoRetencion === "todos"} className="mr-2" />
                  Todos
                </div>
              </SelectItem>
              <SelectItem value="iva">IVA</SelectItem>
              <SelectItem value="ingresosBrutos">Ingresos Brutos</SelectItem>
              <SelectItem value="ganancias">Ganancias</SelectItem>
              <SelectItem value="seguridadSocial">Seguridad Social</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Jurisdicción */}
        <div>
          <label htmlFor="jurisdiccion" className="block text-sm font-medium text-gray-700 mb-1">
            Jurisdicción
          </label>
          <Select value={jurisdiccion} onValueChange={setJurisdiccion}>
            <SelectTrigger id="jurisdiccion" className="w-full">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="nacional">Nacional</SelectItem>
              <SelectItem value="caba">CABA</SelectItem>
              <SelectItem value="buenosAires">Buenos Aires</SelectItem>
              <SelectItem value="cordoba">Córdoba</SelectItem>
              <SelectItem value="santaFe">Santa Fe</SelectItem>
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
