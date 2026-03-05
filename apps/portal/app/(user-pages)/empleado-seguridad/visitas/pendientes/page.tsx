"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TablaVisitasEmpleadoSeguridad } from "@/components/visitas/tabla-visitas-empleado-seguridad"
import { VISITAS_PENDIENTES } from "@/mocks/mock-visitas"
import { useState } from "react"
import { FiltrosVisitas } from "@/components/visitas/filtros-visitas"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function VisitasPendientesPage() {
  const [filtros, setFiltros] = useState({ tipoVisita: "todos", fechaDesde: "", fechaHasta: "" })
  const [busqueda, setBusqueda] = useState("")

  // Filtrado local
  const visitasFiltradas = VISITAS_PENDIENTES.filter((visita) => {
    // Tipo de visita
    const tipoOk = filtros.tipoVisita === "todos" ||
      visita.tipo.toLowerCase().replaceAll(" ", "_") === filtros.tipoVisita
    // Fecha desde
    const desdeOk = !filtros.fechaDesde || visita.fechaVisita >= filtros.fechaDesde
    // Fecha hasta
    const hastaOk = !filtros.fechaHasta || visita.fechaVisita <= filtros.fechaHasta
    // Búsqueda
    const textoBusqueda = busqueda.trim().toLowerCase()
    const matchBusqueda =
      !textoBusqueda ||
      [
        visita.numero,
        visita.visitante,
        visita.empresa
      ]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(textoBusqueda))
    return tipoOk && desdeOk && hastaOk && matchBusqueda
  })

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Accesos Pendientes de Aprobación</h1>
      {/* Filtros */}
      <div className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 px-6 py-6">
          <h3 className="text-xl font-bold mb-4">Filtros</h3>
          <form
            className="flex flex-col md:flex-row md:items-end md:gap-6 gap-4"
            onSubmit={e => { e.preventDefault() }}
          >
            {/* Tipo de Visita */}
            <div className="flex flex-col w-full md:w-1/5 min-w-[10rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Visita</label>
              <Select value={filtros.tipoVisita} onValueChange={value => setFiltros({ ...filtros, tipoVisita: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="laboral">Laboral</SelectItem>
                  <SelectItem value="guiada">Guiada</SelectItem>
                  <SelectItem value="evento">Evento</SelectItem>
                  <SelectItem value="materiales">Materiales</SelectItem>
                  <SelectItem value="acceso_a_obra">Acceso a Obra</SelectItem>
                  <SelectItem value="acceso_a_muelle">Acceso a Muelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Fecha Desde */}
            <div className="flex flex-col w-full md:w-1/5 min-w-[10rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={filtros.fechaDesde}
                onChange={e => setFiltros({ ...filtros, fechaDesde: e.target.value })}
              />
            </div>
            {/* Fecha Hasta */}
            <div className="flex flex-col w-full md:w-1/5 min-w-[10rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={filtros.fechaHasta}
                onChange={e => setFiltros({ ...filtros, fechaHasta: e.target.value })}
              />
            </div>
            {/* Botones */}
            <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
              <button
                type="button"
                className="border rounded px-4 py-2 text-sm"
                onClick={() => setFiltros({ tipoVisita: "todos", fechaDesde: "", fechaHasta: "" })}
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="bg-[#002366] hover:bg-[#001a4d] text-white rounded px-4 py-2 text-sm flex items-center gap-2 font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 6v12m6-12v12" /></svg>
                Aplicar Filtros
              </button>
            </div>
          </form>
        </div>
      </div>
      <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle>Todas las Solicitudes</CardTitle>
          <Input
            placeholder="Buscar por número, visitante, empresa..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full md:w-80"
          />
        </CardHeader>
        <CardContent>
          <TablaVisitasEmpleadoSeguridad visitas={visitasFiltradas} detallePath="/empleado-seguridad/visitas/pendientes" />
        </CardContent>
      </Card>
    </div>
  )
}
