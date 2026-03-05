"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface OptionItem {
  value: string
  label: string
}

interface FiltrosVisitasProps {
  onFilter: (filters: any) => void
  showEstado?: boolean
  // Opcional: permitir que cada pantalla inyecte sus propias opciones
  tipoOptions?: OptionItem[]
  estadoOptions?: OptionItem[]
}

export function FiltrosVisitas({ onFilter, showEstado = true, tipoOptions, estadoOptions }: FiltrosVisitasProps) {
  const [tipoVisita, setTipoVisita] = useState<string>("todos")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")
  const [showTipoOptions, setShowTipoOptions] = useState<boolean>(false)

  // Opciones por defecto solicitadas
  const defaultTipoOptions: OptionItem[] = [
    { value: "todos", label: "Todos" },
    { value: "laboral", label: "Laboral" },
    { value: "guiada", label: "Guiada" },
    { value: "evento", label: "Evento" },
    { value: "transporte_cargas", label: "Transporte de cargas" },
    { value: "obras_mantenimiento", label: "Obras/Mantenimiento" },
  ]

  const defaultEstadoOptions: OptionItem[] = [
    { value: "todos", label: "Todos" },
    { value: "pendiente", label: "Pendiente" },
    { value: "aceptada", label: "Aceptada" },
    { value: "rechazada", label: "Rechazada" },
    { value: "finalizada", label: "Finalizada" },
    { value: "en_curso", label: "En curso" },
    { value: "cancelada", label: "Cancelada" },
  ]

  const effectiveTipoOptions = tipoOptions ?? defaultTipoOptions
  const effectiveEstadoOptions = estadoOptions ?? defaultEstadoOptions

  const handleAplicarFiltros = () => {
    onFilter({
      tipoVisita,
      estado,
      fechaDesde,
      fechaHasta,
    })
  }

  const handleLimpiar = () => {
    setTipoVisita("todos")
    setEstado("todos")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      tipoVisita: "todos",
      estado: "todos",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tipo de Visita */}
        <div className="relative">
          <label htmlFor="tipoVisita" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Visita
          </label>
          <div className="relative">
            <Select value={tipoVisita} onValueChange={setTipoVisita} onOpenChange={setShowTipoOptions}>
              <SelectTrigger id="tipoVisita" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {effectiveTipoOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showTipoOptions && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
                {effectiveTipoOptions.map((opt) => (
                  <div key={opt.value} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={tipoVisita === opt.value}
                      onChange={() => setTipoVisita(opt.value)}
                      className="mr-2"
                    />
                    <span>{opt.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Estado (opcional) */}
        {showEstado && (
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger id="estado" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {(effectiveEstadoOptions).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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
