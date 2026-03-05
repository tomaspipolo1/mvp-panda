"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search } from "lucide-react"

export type TipoCampoEstatico = "select" | "multiselect" | "radiobutton" | "checkbox"

export interface FiltrosEstaticos {
  busqueda: string
  tipo: TipoCampoEstatico | "Todos"
  estado: "Todos" | "Activo" | "Inactivo"
}

interface FiltrosEstaticosProps {
  onFilter: (filtros: FiltrosEstaticos) => void
}

export function FiltrosEstaticos({ onFilter }: FiltrosEstaticosProps) {
  const [busqueda, setBusqueda] = useState("")
  const [tipo, setTipo] = useState<FiltrosEstaticos["tipo"]>("Todos")
  const [estado, setEstado] = useState<FiltrosEstaticos["estado"]>("Todos")

  const handleLimpiar = () => {
    const valoresLimpios: FiltrosEstaticos = {
      busqueda: "",
      tipo: "Todos",
      estado: "Todos",
    }
    setBusqueda(valoresLimpios.busqueda)
    setTipo(valoresLimpios.tipo)
    setEstado(valoresLimpios.estado)
    onFilter(valoresLimpios)
  }

  const handleAplicar = () => {
    onFilter({
      busqueda,
      tipo,
      estado,
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="busqueda">Buscar por nombre</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
            <Input
              id="busqueda"
              placeholder="Ej: Tipo de documento"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full mt-1 pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tipo">Tipo</Label>
          <Select value={tipo} onValueChange={(value: FiltrosEstaticos["tipo"]) => setTipo(value)}>
            <SelectTrigger id="tipo" className="mt-1">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="multiselect">Multiselect</SelectItem>
              <SelectItem value="radiobutton">Radio button</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="estado">Estado</Label>
          <Select value={estado} onValueChange={(value: FiltrosEstaticos["estado"]) => setEstado(value)}>
            <SelectTrigger id="estado" className="mt-1">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleLimpiar}>
          Limpiar
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAplicar}>
          <Filter className="mr-2 h-4 w-4" />
          Aplicar filtros
        </Button>
      </div>
    </div>
  )
}
