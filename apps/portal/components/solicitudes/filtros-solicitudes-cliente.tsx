"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FiltrosSolicitudesClienteProps {
  onFilter: (filters: any) => void
}

export function FiltrosSolicitudesCliente({ onFilter }: FiltrosSolicitudesClienteProps) {
  const [numeroSolicitud, setNumeroSolicitud] = useState<string>("")
  const [tipo, setTipo] = useState<string>("todos")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")

  const handleAplicarFiltros = () => {
    onFilter({
      numeroSolicitud,
      tipo,
      estado,
      fechaDesde,
    })
  }

  const handleLimpiar = () => {
    setNumeroSolicitud("")
    setTipo("todos")
    setEstado("todos")
    setFechaDesde("")
    onFilter({
      numeroSolicitud: "",
      tipo: "todos",
      estado: "todos",
      fechaDesde: "",
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Número de Solicitud */}
        <div>
          <label htmlFor="numeroSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Solicitud
          </label>
          <Input
            id="numeroSolicitud"
            placeholder="Ej: SOL-2023-0125"
            value={numeroSolicitud}
            onChange={(e) => setNumeroSolicitud(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Tipo */}
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger id="tipo" className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="cambio_datos">Cambio de datos</SelectItem>
              <SelectItem value="solicitud_acceso">Solicitud de acceso</SelectItem>
              <SelectItem value="reclamo">Reclamo</SelectItem>
              <SelectItem value="consulta">Consulta</SelectItem>
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
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="Aprobada">Aprobada</SelectItem>
              <SelectItem value="Rechazada">Rechazada</SelectItem>
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
