"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltrosProps {
  onFilter: (filters: any) => void
}

export function Filtros({ onFilter }: FiltrosProps) {
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")
  const [numero, setNumero] = useState("")
  const [concepto, setConcepto] = useState("")
  const [formaPago, setFormaPago] = useState("")

  const handleFilter = () => {
    onFilter({
      fechaDesde,
      fechaHasta,
      numero,
      concepto,
      formaPago,
    })
  }

  const handleClearFilters = () => {
    setFechaDesde("")
    setFechaHasta("")
    setNumero("")
    setConcepto("")
    setFormaPago("")
    onFilter({})
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-gray-500">
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fechaDesde">Fecha desde</Label>
          <Input
            id="fechaDesde"
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaHasta">Fecha hasta</Label>
          <Input
            id="fechaHasta"
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numero">Número</Label>
          <Input
            id="numero"
            type="text"
            placeholder="Ej: OP-2023-0123"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="concepto">Concepto</Label>
          <Input
            id="concepto"
            type="text"
            placeholder="Ej: Pago de servicios"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="formaPago">Forma de pago</Label>
          <Select value={formaPago} onValueChange={setFormaPago}>
            <SelectTrigger id="formaPago" className="w-full">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="Transferencia Bancaria">Transferencia Bancaria</SelectItem>
              <SelectItem value="Cheque">Cheque</SelectItem>
              <SelectItem value="Efectivo">Efectivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleFilter} className="bg-plp-dark hover:bg-plp-darker">
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>
    </div>
  )
}
