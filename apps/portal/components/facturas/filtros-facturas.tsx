"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FiltrosFacturasProps {
  onFilter: (filtros: any) => void
  showProveedorFilter?: boolean
}

export function FiltrosFacturas({ onFilter, showProveedorFilter = false }: FiltrosFacturasProps) {
  const [numero, setNumero] = useState("")
  const [estado, setEstado] = useState<string | undefined>(undefined)
  const [cuit, setCuit] = useState("")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")

  const handleLimpiar = () => {
    setNumero("")
    setEstado(undefined)
    setCuit("")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      numero: "",
      estado: undefined,
      cuit: "",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  const handleAplicarFiltros = () => {
    onFilter({
      numero,
      estado,
      cuit,
      fechaDesde,
      fechaHasta,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      <div className={cn("grid grid-cols-1 gap-4 mb-4", showProveedorFilter ? "md:grid-cols-5" : "md:grid-cols-4")}>
        <div>
          <Label htmlFor="numero">Número de Factura</Label>
          <Input
            id="numero"
            placeholder="Ej: 0003-00000458"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="mt-1"
          />
        </div>

        {showProveedorFilter && (
          <div>
            <Label htmlFor="cuit">CUIT Proveedor</Label>
            <Input
              id="cuit"
              placeholder="XX-XXXXXXXX-X"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label htmlFor="estado">Estado</Label>
          <Select value={estado} onValueChange={setEstado}>
            <SelectTrigger id="estado" className="mt-1">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Cargada">Cargada</SelectItem>
              <SelectItem value="En Proceso">En Proceso</SelectItem>
              <SelectItem value="Paga">Paga</SelectItem>
              <SelectItem value="Anulada">Anulada</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleLimpiar}>
          Limpiar
        </Button>
        <Button 
          className="bg-plp-primary hover:bg-plp-dark text-white" 
          style={{ backgroundColor: '#0a2472' }}
          onClick={handleAplicarFiltros}
        >
          <Filter className="mr-2 h-4 w-4" />
          Aplicar filtros
        </Button>
      </div>
    </div>
  )
}

