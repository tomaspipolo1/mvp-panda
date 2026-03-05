"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FiltrosSolicitudesUsuarioBasicoProps {
  onFilter: (filters: any) => void
}

export function FiltrosSolicitudesUsuarioBasico({ onFilter }: FiltrosSolicitudesUsuarioBasicoProps) {
  const [numeroSolicitud, setNumeroSolicitud] = useState<string>("")
  const [tipo, setTipo] = useState<string>("todos")
  const [clase, setClase] = useState<string>("todos")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")

  const handleAplicarFiltros = () => {
    onFilter({
      numeroSolicitud,
      tipo,
      clase,
      estado,
      fechaDesde,
    })
  }

  const handleLimpiar = () => {
    setNumeroSolicitud("")
    setTipo("todos")
    setClase("todos")
    setEstado("todos")
    setFechaDesde("")
    onFilter({
      numeroSolicitud: "",
      tipo: "todos",
      clase: "todos",
      estado: "todos",
      fechaDesde: "",
    })
  }

  const getClaseOptions = (tipoSeleccionado: string) => {
    switch (tipoSeleccionado) {
      case "reclamo":
        return [
          { value: "todos", label: "Todos" },
          { value: "ecologicas", label: "Ecológicas" },
          { value: "servicios", label: "Servicios" },
          { value: "otros_reclamo", label: "Otros" },
        ]
      case "consulta":
        return [
          { value: "todos", label: "Todos" },
          { value: "comercial", label: "Comercial" },
          { value: "acceso", label: "Acceso" },
          { value: "otros_consulta", label: "Otros" },
        ]
      case "tramite":
        return [
          { value: "todos", label: "Todos" },
          { value: "cambio_datos_personales", label: "Cambio de datos personales" },
          { value: "otros_tramite", label: "Otros" },
        ]
      default:
        return [{ value: "todos", label: "Todos" }]
    }
  }

  const handleTipoChange = (value: string) => {
    setTipo(value)
    setClase("todos") // Reset clase when tipo changes
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
          <Select value={tipo} onValueChange={handleTipoChange}>
            <SelectTrigger id="tipo" className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="reclamo">Reclamo</SelectItem>
              <SelectItem value="consulta">Consulta</SelectItem>
              <SelectItem value="tramite">Trámite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clase */}
        <div>
          <label htmlFor="clase" className="block text-sm font-medium text-gray-700 mb-1">
            Clase
          </label>
          <Select value={clase} onValueChange={setClase} disabled={tipo === "todos"}>
            <SelectTrigger id="clase" className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              {getClaseOptions(tipo).map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
              <SelectItem value="En Proceso">En Proceso</SelectItem>
              <SelectItem value="Resuelta">Resuelta</SelectItem>
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
