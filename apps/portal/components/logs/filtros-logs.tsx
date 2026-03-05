"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export type ResultadoLog = "Todos" | "OK" | "FAIL"

export interface FiltrosLogs {
  fechaDesde: string
  fechaHasta: string
  resultado: ResultadoLog
}

interface FiltrosLogsProps {
  onFilter: (filtros: FiltrosLogs) => void
}

export function FiltrosLogs({ onFilter }: FiltrosLogsProps) {
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")
  const [resultado, setResultado] = useState<ResultadoLog>("Todos")

  const handleLimpiar = () => {
    setFechaDesde("")
    setFechaHasta("")
    setResultado("Todos")
    onFilter({ fechaDesde: "", fechaHasta: "", resultado: "Todos" })
  }

  const handleAplicar = () => {
    onFilter({ fechaDesde, fechaHasta, resultado })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label htmlFor="fechaDesde">Fecha desde</Label>
          <Input
            id="fechaDesde"
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="fechaHasta">Fecha hasta</Label>
          <Input
            id="fechaHasta"
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="resultado">Resultado</Label>
          <Select value={resultado} onValueChange={(v: ResultadoLog) => setResultado(v)}>
            <SelectTrigger id="resultado" className="mt-1">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="OK">OK</SelectItem>
              <SelectItem value="FAIL">FAIL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
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
