"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface FiltrosDocumentosProps {
  tipo: "facturas" | "notasCredito" | "notasDebito"
  onFilter: (filters: any) => void
}

export function FiltrosDocumentos({ tipo, onFilter }: FiltrosDocumentosProps) {
  const [numeroDocumento, setNumeroDocumento] = useState<string>("")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")

  const getPlaceholder = () => {
    switch (tipo) {
      case "facturas":
        return "Ej: FC-2023-0458"
      case "notasCredito":
        return "Ej: NC-2023-0089"
      case "notasDebito":
        return "Ej: ND-2023-0045"
      default:
        return ""
    }
  }

  const getLabel = () => {
    switch (tipo) {
      case "facturas":
        return "Número de Factura"
      case "notasCredito":
        return "Número de Nota de Crédito"
      case "notasDebito":
        return "Número de Nota de Débito"
      default:
        return ""
    }
  }

  const handleAplicarFiltros = () => {
    onFilter({
      numeroDocumento,
      estado,
      fechaDesde,
      fechaHasta,
    })
  }

  const handleLimpiar = () => {
    setNumeroDocumento("")
    setEstado("todos")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      numeroDocumento: "",
      estado: "todos",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Número de Documento */}
        <div>
          <label htmlFor="numeroDocumento" className="block text-sm font-medium text-gray-700 mb-1">
            {getLabel()}
          </label>
          <Input
            id="numeroDocumento"
            placeholder={getPlaceholder()}
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
            className="w-full"
          />
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
              <SelectItem value="todos">
                <div className="flex items-center">
                  <Checkbox checked={estado === "todos"} className="mr-2" />
                  Todos
                </div>
              </SelectItem>
              <SelectItem value="emitida">Emitida</SelectItem>
              <SelectItem value="pagada">Pagada</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
              <SelectItem value="anulada">Anulada</SelectItem>
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
          Filtrar
        </Button>
      </div>
    </div>
  )
}
