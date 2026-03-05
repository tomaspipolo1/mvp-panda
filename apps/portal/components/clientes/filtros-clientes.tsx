"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface FiltrosClientesProps {
  onFilter: (filtros: FiltrosClientes) => void
}

export interface FiltrosClientes {
  busqueda: string
  tiposCliente: string[]
  subcategorias: string[]
  estado: string
}

// Tipos de cliente y subcategorías disponibles
const tiposClienteDisponibles = [
  { value: "Permisionario", label: "Permisionario" },
  { value: "Agencia Marítima", label: "Agencia Marítima" },
  { value: "Empresa de Servicios Portuarios", label: "Empresa de Servicios Portuarios" },
  { value: "Consecionarios", label: "Consecionarios" },
]

const subcategoriasDisponibles = [
  { value: "Mayorista", label: "Mayorista" },
  { value: "Transporte", label: "Transporte" },
  { value: "Equipamiento", label: "Equipamiento" },
  { value: "Vigilancia", label: "Vigilancia" },
  { value: "Infraestructura", label: "Infraestructura" },
  { value: "Mantenimiento", label: "Mantenimiento" },
  { value: "Importación", label: "Importación" },
  { value: "Exportación", label: "Exportación" },
  { value: "Carga", label: "Carga" },
  { value: "Construcción", label: "Construcción" },
  { value: "Logística", label: "Logística" },
]

export function FiltrosClientes({ onFilter }: FiltrosClientesProps) {
  const [busqueda, setBusqueda] = useState("")
  const [tiposCliente, setTiposCliente] = useState<string[]>([])
  const [subcategorias, setSubcategorias] = useState<string[]>([])
  const [estado, setEstado] = useState("Todos")
  const [tiposClienteOpen, setTiposClienteOpen] = useState(false)
  const [subcategoriasOpen, setSubcategoriasOpen] = useState(false)

  const handleAplicarFiltros = () => {
    onFilter({
      busqueda,
      tiposCliente,
      subcategorias,
      estado,
    })
  }

  const handleLimpiarFiltros = () => {
    setBusqueda("")
    setTiposCliente([])
    setSubcategorias([])
    setEstado("Todos")
    onFilter({
      busqueda: "",
      tiposCliente: [],
      subcategorias: [],
      estado: "Todos",
    })
  }

  const hasActiveFilters = busqueda || tiposCliente.length > 0 || subcategorias.length > 0 || estado !== "Todos"

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por razón social, nombre, CUIT..."
            className="pl-8"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAplicarFiltros()
              }
            }}
          />
        </div>

        {/* Filtros avanzados */}
        <Popover open={tiposClienteOpen} onOpenChange={setTiposClienteOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={tiposCliente.length > 0 ? "default" : "outline"}
              className={tiposCliente.length > 0 ? "bg-plp-dark hover:bg-plp-medium" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              Tipos de Cliente
              {tiposCliente.length > 0 && (
                <Badge className="ml-2 bg-white text-plp-dark hover:bg-gray-100">{tiposCliente.length}</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Tipos de Cliente</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {tiposClienteDisponibles.map((tipo) => (
                  <div key={tipo.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tipo-${tipo.value}`}
                      checked={tiposCliente.includes(tipo.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTiposCliente([...tiposCliente, tipo.value])
                        } else {
                          setTiposCliente(tiposCliente.filter((t) => t !== tipo.value))
                        }
                      }}
                    />
                    <label
                      htmlFor={`tipo-${tipo.value}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tipo.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={subcategoriasOpen} onOpenChange={setSubcategoriasOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={subcategorias.length > 0 ? "default" : "outline"}
              className={subcategorias.length > 0 ? "bg-plp-dark hover:bg-plp-medium" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              Subcategorías
              {subcategorias.length > 0 && (
                <Badge className="ml-2 bg-white text-plp-dark hover:bg-gray-100">{subcategorias.length}</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Subcategorías</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {subcategoriasDisponibles.map((subcat) => (
                  <div key={subcat.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subcat-${subcat.value}`}
                      checked={subcategorias.includes(subcat.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSubcategorias([...subcategorias, subcat.value])
                        } else {
                          setSubcategorias(subcategorias.filter((s) => s !== subcat.value))
                        }
                      }}
                    />
                    <label
                      htmlFor={`subcat-${subcat.value}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subcat.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Estado */}
        <Select value={estado} onValueChange={setEstado}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Activo">Activo</SelectItem>
            <SelectItem value="Inactivo">Inactivo</SelectItem>
            <SelectItem value="Potencial">Potencial</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
          </SelectContent>
        </Select>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button onClick={handleAplicarFiltros} className="bg-plp-dark hover:bg-plp-medium">
            Aplicar
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" onClick={handleLimpiarFiltros}>
              <X className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Badges de filtros activos */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {busqueda && (
            <Badge variant="secondary" className="px-3 py-1">
              Búsqueda: {busqueda}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setBusqueda("")
                  handleAplicarFiltros()
                }}
              >
                ×
              </button>
            </Badge>
          )}
          {tiposCliente.map((tipo) => (
            <Badge key={tipo} variant="secondary" className="px-3 py-1">
              Tipo: {tipo}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setTiposCliente(tiposCliente.filter((t) => t !== tipo))
                  handleAplicarFiltros()
                }}
              >
                ×
              </button>
            </Badge>
          ))}
          {subcategorias.map((subcat) => (
            <Badge key={subcat} variant="secondary" className="px-3 py-1">
              Subcat: {subcat}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setSubcategorias(subcategorias.filter((s) => s !== subcat))
                  handleAplicarFiltros()
                }}
              >
                ×
              </button>
            </Badge>
          ))}
          {estado !== "Todos" && (
            <Badge variant="secondary" className="px-3 py-1">
              Estado: {estado}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setEstado("Todos")
                  handleAplicarFiltros()
                }}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

