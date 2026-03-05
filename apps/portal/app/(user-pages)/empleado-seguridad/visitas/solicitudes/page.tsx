"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiltrosVisitas } from "@/components/visitas/filtros-visitas"
import { TablaVisitasEmpleadoSeguridad } from "@/components/visitas/tabla-visitas-empleado-seguridad"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function SolicitudesAccesoPage() {
  // Unificar todas las visitas en un solo array
  const VISITAS = [
    {
      id: "1",
      numero: "ACC-2023-040",
      visitante: "Roberto Gómez",
      empresa: "Logística ABC",
      fechaVisita: "2023-05-15",
      horaVisita: "10:00",
      estado: "Aprobada",
      motivo: "Inspección de seguridad",
      tipo: "Acceso a Obra",
      sitio: "Terminal 1",
      personas: 3,
      vehiculos: 1,
      recurrente: false,
      personasDetalle: [
        { id: "p1", nombre: "Roberto Gómez", documento: "12345678", empresa: "Logística ABC" },
        { id: "p2", nombre: "Juan Pérez", documento: "23456789", empresa: "Logística ABC" },
        { id: "p3", nombre: "Ana Torres", documento: "34567890", empresa: "Logística ABC" },
      ],
      vehiculosDetalle: [
        { id: "v1", tipo: "Camioneta", patente: "AB123CD", marca: "Toyota", modelo: "Hilux" },
      ],
    },
    {
      id: "2",
      numero: "ACC-2023-041",
      visitante: "Laura Sánchez",
      empresa: "Transportes XYZ",
      fechaVisita: "2023-05-16",
      horaVisita: "14:30",
      estado: "Rechazada",
      motivo: "Supervisión de carga",
      tipo: "Acceso a Muelle",
      sitio: "Muelle Sur",
      personas: 2,
      vehiculos: 0,
      recurrente: false,
      personasDetalle: [
        { id: "p4", nombre: "Laura Sánchez", documento: "45678901", empresa: "Transportes XYZ" },
        { id: "p5", nombre: "Carlos Ruiz", documento: "56789012", empresa: "Transportes XYZ" },
      ],
      vehiculosDetalle: [],
    },
    {
      id: "3",
      numero: "ACC-2023-042",
      visitante: "Miguel Fernández",
      empresa: "Consultora Marítima",
      fechaVisita: "2023-05-17",
      horaVisita: "09:15",
      estado: "Finalizada",
      motivo: "Inauguración",
      tipo: "Evento",
      sitio: "Salón Principal",
      personas: 25,
      vehiculos: 5,
      recurrente: false,
      personasDetalle: [
        { id: "p6", nombre: "Miguel Fernández", documento: "67890123", empresa: "Consultora Marítima" },
      ],
      vehiculosDetalle: [
        { id: "v2", tipo: "Minibús", patente: "CD456EF", marca: "Mercedes-Benz", modelo: "Sprinter" },
        { id: "v3", tipo: "Auto", patente: "EF789GH", marca: "Ford", modelo: "Focus" },
      ],
    },
    {
      id: "4",
      numero: "ACC-2023-043",
      visitante: "Ana Martínez",
      empresa: "Servicios Portuarios",
      fechaVisita: "2023-05-18",
      horaVisita: "11:30",
      estado: "En Curso",
      motivo: "Grupo escolar",
      tipo: "Guiada",
      sitio: "Terminal Principal",
      personas: 30,
      vehiculos: 1,
      recurrente: false,
      personasDetalle: [
        { id: "p7", nombre: "Ana Martínez", documento: "78901234", empresa: "Servicios Portuarios" },
      ],
      vehiculosDetalle: [
        { id: "v4", tipo: "Colectivo", patente: "GH012IJ", marca: "Iveco", modelo: "Daily" },
      ],
    },
    {
      id: "5",
      numero: "ACC-2023-050",
      visitante: "María López",
      empresa: "Recursos Humanos S.A.",
      fechaVisita: "2023-05-24",
      horaVisita: "07:45",
      estado: "Aprobada",
      motivo: "Capacitación de personal",
      tipo: "Laboral",
      sitio: "Sala de Capacitación",
      personas: 12,
      vehiculos: 0,
      recurrente: true,
      fechaVigenciaHasta: "2023-12-31",
      personasDetalle: [
        { id: "p9", nombre: "María López", documento: "90123456", empresa: "Recursos Humanos S.A." },
        { id: "p10", nombre: "Pedro Gómez", documento: "91234567", empresa: "Recursos Humanos S.A." },
      ],
      vehiculosDetalle: [],
    },
    {
      id: "6",
      numero: "ACC-2023-051",
      visitante: "Carlos Mendoza",
      empresa: "Mantenimiento Puerto S.A.",
      fechaVisita: "2023-05-25",
      horaVisita: "08:00",
      estado: "En Curso",
      motivo: "Mantenimiento preventivo",
      tipo: "Laboral",
      sitio: "Área de Grúas",
      personas: 5,
      vehiculos: 2,
      recurrente: true,
      fechaVigenciaHasta: "2023-08-30",
      personasDetalle: [
        { id: "p11", nombre: "Carlos Mendoza", documento: "12345432", empresa: "Mantenimiento Puerto S.A." },
        { id: "p12", nombre: "José Silva", documento: "23456543", empresa: "Mantenimiento Puerto S.A." },
      ],
      vehiculosDetalle: [
        { id: "v5", tipo: "Camioneta", patente: "IJ345KL", marca: "Ford", modelo: "Ranger" },
        { id: "v6", tipo: "Furgón", patente: "KL678MN", marca: "Volkswagen", modelo: "Crafter" },
      ],
    },
  ]
  const [filtros, setFiltros] = useState({ tipoVisita: "todos", estado: "todos", fechaDesde: "", fechaHasta: "" })
  const [busqueda, setBusqueda] = useState("")

  // Filtrado local
  const visitasFiltradas = VISITAS.filter((visita) => {
    // Tipo de visita
    const tipoOk = filtros.tipoVisita === "todos" ||
      visita.tipo.toLowerCase().replaceAll(" ", "_") === filtros.tipoVisita
    // Estado
    const estadoOk = filtros.estado === "todos" || visita.estado.toLowerCase() === filtros.estado.toLowerCase()
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
    return tipoOk && estadoOk && desdeOk && hastaOk && matchBusqueda
  })

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Historial de Solicitudes de Acceso</h1>
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
            {/* Estado */}
            <div className="flex flex-col w-full md:w-1/5 min-w-[10rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <Select value={filtros.estado} onValueChange={value => setFiltros({ ...filtros, estado: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Aprobada">Aprobada</SelectItem>
                  <SelectItem value="Rechazada">Rechazada</SelectItem>
                  <SelectItem value="Finalizada">Finalizada</SelectItem>
                  <SelectItem value="En Curso">En Curso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Fecha Desde */}
            <div className="flex flex-col w-40 min-w-[5rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
              <input
                type="date"
                className="w-40 border rounded px-3 py-2"
                value={filtros.fechaDesde}
                onChange={e => setFiltros({ ...filtros, fechaDesde: e.target.value })}
              />
            </div>
            {/* Fecha Hasta */}
            <div className="flex flex-col w-40 min-w-[10rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
              <input
                type="date"
                className="w-40 border rounded px-3 py-2"
                value={filtros.fechaHasta}
                onChange={e => setFiltros({ ...filtros, fechaHasta: e.target.value })}
              />
            </div>
            {/* Botones */}
            <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
              <button
                type="button"
                className="border rounded px-4 py-2 text-sm"
                onClick={() => setFiltros({ tipoVisita: "todos", estado: "todos", fechaDesde: "", fechaHasta: "" })}
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
          <TablaVisitasEmpleadoSeguridad visitas={visitasFiltradas} />
        </CardContent>
      </Card>
    </div>
  )
}
