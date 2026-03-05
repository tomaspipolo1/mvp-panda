"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search } from "lucide-react"

export interface FiltrosUsuarios {
  busqueda: string
  rol: string | "Todos"
  estado: "Todos" | "Activo" | "Inactivo" | "Bloqueado"
}

interface FiltrosUsuariosProps {
  onFilter: (filtros: FiltrosUsuarios) => void
  rolesDisponibles: string[]
}

export function FiltrosUsuarios({ onFilter, rolesDisponibles }: FiltrosUsuariosProps) {
  const [busqueda, setBusqueda] = useState("")
  const [rol, setRol] = useState<FiltrosUsuarios["rol"]>("Todos")
  const [estado, setEstado] = useState<FiltrosUsuarios["estado"]>("Todos")

  const handleLimpiar = () => {
    const valores: FiltrosUsuarios = { busqueda: "", rol: "Todos", estado: "Todos" }
    setBusqueda(valores.busqueda)
    setRol(valores.rol)
    setEstado(valores.estado)
    onFilter(valores)
  }

  const handleAplicar = () => {
    onFilter({ busqueda, rol, estado })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="busqueda">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
            <Input
              id="busqueda"
              placeholder="Email, nombre, apellido o DNI"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full mt-1 pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="rol">Rol</Label>
          <Select value={rol} onValueChange={(value: FiltrosUsuarios["rol"]) => setRol(value)}>
            <SelectTrigger id="rol" className="mt-1">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {rolesDisponibles.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="estado">Estado</Label>
          <Select value={estado} onValueChange={(value: FiltrosUsuarios["estado"]) => setEstado(value)}>
            <SelectTrigger id="estado" className="mt-1">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
              <SelectItem value="Bloqueado">Bloqueado</SelectItem>
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
