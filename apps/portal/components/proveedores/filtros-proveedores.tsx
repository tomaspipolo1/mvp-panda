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

interface FiltrosProveedoresProps {
  onFilter: (filtros: FiltrosProveedores) => void
}

export interface FiltrosProveedores {
  busqueda: string
  categorias: string[]
  subcategorias: string[]
  estado: string
}

// Categorías y subcategorías disponibles
const categoriasDisponibles = [
  { value: "Materiales", label: "Materiales" },
  { value: "Servicios", label: "Servicios" },
  { value: "Tecnología", label: "Tecnología" },
  { value: "Seguridad", label: "Seguridad" },
  { value: "Construcción", label: "Construcción" },
  { value: "Comercio", label: "Comercio" },
]

const subcategoriasDisponibles = [
  { value: "Construcción", label: "Construcción" },
  { value: "Transporte", label: "Transporte" },
  { value: "Equipamiento", label: "Equipamiento" },
  { value: "Vigilancia", label: "Vigilancia" },
  { value: "Infraestructura", label: "Infraestructura" },
  { value: "Mantenimiento", label: "Mantenimiento" },
  { value: "Importación", label: "Importación" },
]

export function FiltrosProveedores({ onFilter }: FiltrosProveedoresProps) {
  const [busqueda, setBusqueda] = useState("")
  const [categorias, setCategorias] = useState<string[]>([])
  const [subcategorias, setSubcategorias] = useState<string[]>([])
  const [estado, setEstado] = useState("Todos")
  const [categoriasOpen, setCategoriasOpen] = useState(false)
  const [subcategoriasOpen, setSubcategoriasOpen] = useState(false)

  const handleLimpiar = () => {
    setBusqueda("")
    setCategorias([])
    setSubcategorias([])
    setEstado("Todos")
    onFilter({
      busqueda: "",
      categorias: [],
      subcategorias: [],
      estado: "Todos",
    })
  }

  const handleAplicarFiltros = () => {
    onFilter({
      busqueda,
      categorias,
      subcategorias,
      estado,
    })
  }

  const toggleCategoria = (categoria: string) => {
    if (categorias.includes(categoria)) {
      setCategorias(categorias.filter((c) => c !== categoria))
    } else {
      setCategorias([...categorias, categoria])
    }
  }

  const toggleSubcategoria = (subcategoria: string) => {
    if (subcategorias.includes(subcategoria)) {
      setSubcategorias(subcategorias.filter((s) => s !== subcategoria))
    } else {
      setSubcategorias([...subcategorias, subcategoria])
    }
  }

  const removeCategoria = (categoria: string) => {
    setCategorias(categorias.filter((c) => c !== categoria))
  }

  const removeSubcategoria = (subcategoria: string) => {
    setSubcategorias(subcategorias.filter((s) => s !== subcategoria))
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      
      {/* Todos los filtros en una sola fila */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Búsqueda */}
        <div>
          <Label htmlFor="busqueda">Búsqueda</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
            <Input
              id="busqueda"
              placeholder="CUIT o Razón Social"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full mt-1 pl-10"
            />
          </div>
        </div>

        {/* Categoría (multiselect con popover) */}
        <div>
          <Label htmlFor="categoria">Categoría</Label>
          <Popover open={categoriasOpen} onOpenChange={setCategoriasOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-1 justify-between font-normal"
              >
                {categorias.length > 0 ? `${categorias.length} seleccionada(s)` : "Seleccionar categorías"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                {categoriasDisponibles.map((categoria) => (
                  <div key={categoria.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${categoria.value}`}
                      checked={categorias.includes(categoria.value)}
                      onCheckedChange={() => toggleCategoria(categoria.value)}
                    />
                    <label
                      htmlFor={`cat-${categoria.value}`}
                      className="text-sm font-medium leading-none cursor-pointer flex-1"
                    >
                      {categoria.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {/* Badges de categorías seleccionadas */}
          {categorias.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {categorias.map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                  {cat}
                  <button
                    onClick={() => removeCategoria(cat)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Subcategoría (multiselect con popover) */}
        <div>
          <Label htmlFor="subcategoria">Subcategoría</Label>
          <Popover open={subcategoriasOpen} onOpenChange={setSubcategoriasOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-1 justify-between font-normal"
              >
                {subcategorias.length > 0 ? `${subcategorias.length} seleccionada(s)` : "Seleccionar subcategorías"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                {subcategoriasDisponibles.map((subcategoria) => (
                  <div key={subcategoria.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subcat-${subcategoria.value}`}
                      checked={subcategorias.includes(subcategoria.value)}
                      onCheckedChange={() => toggleSubcategoria(subcategoria.value)}
                    />
                    <label
                      htmlFor={`subcat-${subcategoria.value}`}
                      className="text-sm font-medium leading-none cursor-pointer flex-1"
                    >
                      {subcategoria.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {/* Badges de subcategorías seleccionadas */}
          {subcategorias.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {subcategorias.map((subcat) => (
                <Badge key={subcat} variant="secondary" className="text-xs">
                  {subcat}
                  <button
                    onClick={() => removeSubcategoria(subcat)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
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
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
              <SelectItem value="Potencial">Potencial</SelectItem>
            </SelectContent>
          </Select>
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

