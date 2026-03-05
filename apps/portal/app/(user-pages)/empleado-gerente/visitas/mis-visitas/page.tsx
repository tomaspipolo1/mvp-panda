"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronDown, Filter, Printer, Download, Plus, Eye, CheckCircle2, XCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DetalleVisitaModalEmpleadoCompras } from "@/components/visitas/detalle-visita-modal-empleado-compras"
import { ConfirmarAccionVisitaModal } from "@/components/visitas/confirmar-accion-visita-modal"

// Definir interfaces para los tipos de datos
interface Persona {
  id: string
  nombre: string
  documento: string
  empresa: string
}

interface Vehiculo {
  id: string
  tipo: string
  patente: string
  marca: string
  modelo: string
}

interface Visita {
  id: string
  fecha: string
  tipo: string
  sitio: string
  personas: number
  vehiculos: number
  estado: string
  solicitante: string
  descripcion: string
  // Campos opcionales para el detalle
  fechaInicio?: string
  fechaFin?: string
  horaInicio?: string
  horaFin?: string
  motivo?: string
  observaciones?: string
  personasDetalle?: Persona[]
  vehiculosDetalle?: Vehiculo[]
}

export default function MisVisitasEmpleadoGerente() {
  const [tipoVisita, setTipoVisita] = useState<string>("todos")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string>("fecha")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [showTipoOptions, setShowTipoOptions] = useState<boolean>(false)

  const [selectedVisita, setSelectedVisita] = useState<Visita | null>(null)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [accionPendiente, setAccionPendiente] = useState<"aceptar" | "rechazar" | null>(null)

  // Datos de ejemplo para las visitas con los tipos específicos para empleado-gerente
  const visitas: Visita[] = [
    {
      id: "1",
      fecha: "06/01/2024",
      tipo: "Laboral",
      sitio: "Tecno Port S.A.",
      personas: 2,
      vehiculos: 1,
      estado: "Pendiente",
      solicitante: "Departamento de Gerencia",
      descripcion: "Inspección de calidad de materiales",
      personasDetalle: [
        {
          id: "1",
          nombre: "Juan Pérez",
          documento: "25.123.456",
          empresa: "PLP",
        },
        {
          id: "2",
          nombre: "María González",
          documento: "28.789.012",
          empresa: "PLP",
        },
      ],
      vehiculosDetalle: [
        {
          id: "1",
          tipo: "Auto",
          patente: "ABC123",
          marca: "Toyota",
          modelo: "Corolla",
        },
      ],
    },
    {
      id: "2",
      fecha: "15/12/2023",
      tipo: "Guiada",
      sitio: "Aceros del Sur S.A.",
      personas: 4,
      vehiculos: 2,
      estado: "Aprobada",
      solicitante: "Juan Pérez (Gerencia)",
      descripcion: "Evaluación de capacidad productiva",
      personasDetalle: [],
      vehiculosDetalle: [],
    },
    {
      id: "3",
      fecha: "10/11/2023",
      tipo: "Evento",
      sitio: "Sala de Reuniones A",
      personas: 3,
      vehiculos: 0,
      estado: "Completada",
      solicitante: "María González (Logística)",
      descripcion: "Revisión de términos contractuales",
      personasDetalle: [],
      vehiculosDetalle: [],
    },
    {
      id: "4",
      fecha: "05/10/2023",
      tipo: "Materiales",
      sitio: "Almacén Central",
      personas: 2,
      vehiculos: 1,
      estado: "Cancelada",
      solicitante: "Carlos Rodríguez (Calidad)",
      descripcion: "Verificación de stock",
      personasDetalle: [],
      vehiculosDetalle: [],
    },
    {
      id: "5",
      fecha: "20/01/2024",
      tipo: "Acceso a Obra",
      sitio: "Suministros Industriales S.A.",
      personas: 3,
      vehiculos: 1,
      estado: "Pendiente",
      solicitante: "Ana Martínez (Gerencia)",
      descripcion: "Negociación de nuevos contratos",
      personasDetalle: [],
      vehiculosDetalle: [],
    },
    {
      id: "6",
      fecha: "25/01/2024",
      tipo: "Acceso a Muelle",
      sitio: "Oficina de Gerencia",
      personas: 5,
      vehiculos: 2,
      estado: "Pendiente",
      solicitante: "Roberto Sánchez (Finanzas)",
      descripcion: "Revisión de presupuestos para nuevas adquisiciones",
      personasDetalle: [],
      vehiculosDetalle: [],
    },
  ]

  const handleAplicarFiltros = () => {
    // Lógica para aplicar filtros
    console.log("Aplicando filtros:", { tipoVisita, estado, fechaDesde, fechaHasta })
  }

  const handleLimpiar = () => {
    setTipoVisita("todos")
    setEstado("todos")
    setFechaDesde("")
    setFechaHasta("")
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Completada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Completada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      default:
        return null
    }
  }

  const handleVerDetalle = (id: string) => {
    const visita = visitas.find((v) => v.id === id)
    if (visita) {
      // Añadir datos adicionales para el detalle si no existen
      const visitaDetalle: Visita = {
        ...visita,
        fechaInicio: visita.fechaInicio || visita.fecha,
        fechaFin: visita.fechaFin || visita.fecha,
        horaInicio: visita.horaInicio || "09:00",
        horaFin: visita.horaFin || "11:00",
        motivo: visita.motivo || visita.descripcion,
        observaciones: visita.observaciones || "Sin observaciones adicionales.",
        personasDetalle: visita.personasDetalle || [],
        vehiculosDetalle: visita.vehiculosDetalle || [],
      }
      setSelectedVisita(visitaDetalle)
      setShowDetalleModal(true)
    }
  }

  const handleAceptar = (id: string) => {
    const visita = visitas.find((v) => v.id === id)
    if (visita) {
      setSelectedVisita(visita)
      setAccionPendiente("aceptar")
      setShowConfirmModal(true)
    }
  }

  const handleRechazar = (id: string) => {
    const visita = visitas.find((v) => v.id === id)
    if (visita) {
      setSelectedVisita(visita)
      setAccionPendiente("rechazar")
      setShowConfirmModal(true)
    }
  }

  const confirmarAccion = (motivo: string) => {
    console.log(`Visita ${selectedVisita?.id} ${accionPendiente === "aceptar" ? "aceptada" : "rechazada"}: ${motivo}`)
    setShowConfirmModal(false)
    // Aquí iría la lógica para actualizar el estado de la visita
  }

  const handleAccionDesdeDetalle = (accion: "aceptar" | "rechazar") => {
    setAccionPendiente(accion)
    setShowDetalleModal(false)
    setShowConfirmModal(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-plp-darkest">Mis Visitas</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="bg-black hover:bg-gray-800 flex items-center gap-2 w-15">
            <Link href="/empleado-gerente/visitas/nueva-visita">
              <Plus className="h-4 w-14" />
              Nueva Visita
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Tipo de Visita */}
          <div className="relative">
            <label htmlFor="tipoVisita" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Visita
            </label>
            <div className="relative">
              <Select value={tipoVisita} onValueChange={setTipoVisita} onOpenChange={setShowTipoOptions}>
                <SelectTrigger id="tipoVisita" className="w-full">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="laboral">Laboral</SelectItem>
                  <SelectItem value="guiada">Guiada</SelectItem>
                  <SelectItem value="evento">Evento</SelectItem>
                  <SelectItem value="materiales">Materiales</SelectItem>
                  <SelectItem value="acceso-obra">Acceso a Obra</SelectItem>
                  <SelectItem value="acceso-muelle">Acceso a Muelle</SelectItem>
                </SelectContent>
              </Select>
              {showTipoOptions && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={tipoVisita === "todos"}
                      onChange={() => setTipoVisita("todos")}
                      className="mr-2"
                    />
                    <span>Todos</span>
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={tipoVisita === "laboral"}
                      onChange={() => setTipoVisita("laboral")}
                      className="mr-2"
                    />
                    <span>Laboral</span>
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={tipoVisita === "guiada"}
                      onChange={() => setTipoVisita("guiada")}
                      className="mr-2"
                    />
                    <span>Guiada</span>
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={tipoVisita === "evento"}
                      onChange={() => setTipoVisita("evento")}
                      className="mr-2"
                    />
                    <span>Evento</span>
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={tipoVisita === "materiales"}
                      onChange={() => setTipoVisita("materiales")}
                      className="mr-2"
                    />
                    <span>Materiales</span>
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={tipoVisita === "acceso-obra"}
                      onChange={() => setTipoVisita("acceso-obra")}
                      className="mr-2"
                    />
                    <span>Acceso a Obra</span>
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={tipoVisita === "acceso-muelle"}
                      onChange={() => setTipoVisita("acceso-muelle")}
                      className="mr-2"
                    />
                    <span>Acceso a Muelle</span>
                  </div>
                </div>
              )}
            </div>
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
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="aprobada">Aprobada</SelectItem>
                <SelectItem value="completada">Completada</SelectItem>
                <SelectItem value="rechazada">Rechazada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
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
                placeholder="dd/mm/aaaa"
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
                placeholder="dd/mm/aaaa"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <Button variant="outline" onClick={handleLimpiar}>
            Limpiar
          </Button>
          <Button onClick={handleAplicarFiltros} className="bg-blue-900 hover:bg-blue-800">
            <Filter className="h-4 w-4 mr-2" />
            Aplicar Filtros
          </Button>
        </div>
      </div>

      {/* Tabla de Visitas */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-plp-darkest">Visitas</h3>
          <div className="w-72">
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">
                  <button className="flex items-center text-gray-600 font-medium">
                    Fecha
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="text-gray-600 font-medium">Tipo</span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="text-gray-600 font-medium">Sitio</span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="text-gray-600 font-medium">Solicitante</span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="text-gray-600 font-medium">Personas</span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="text-gray-600 font-medium">Vehículos</span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="text-gray-600 font-medium">Estado</span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="text-gray-600 font-medium">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visitas.map((visita) => (
                <tr key={visita.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">{visita.fecha}</td>
                  <td className="py-4 px-4">{visita.tipo}</td>
                  <td className="py-4 px-4">{visita.sitio}</td>
                  <td className="py-4 px-4">{visita.solicitante}</td>
                  <td className="py-4 px-4">{visita.personas}</td>
                  <td className="py-4 px-4">{visita.vehiculos}</td>
                  <td className="py-4 px-4">{getEstadoBadge(visita.estado)}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleVerDetalle(visita.id)}
                              className="h-8 w-8 text-gray-600 hover:text-gray-900"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver detalle</p>
                          </TooltipContent>
                        </Tooltip>

                        {visita.estado === "Pendiente" && (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleAceptar(visita.id)}
                                  className="h-8 w-8 text-green-600 hover:text-green-800"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Aceptar</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRechazar(visita.id)}
                                  className="h-8 w-8 text-red-600 hover:text-red-800"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Rechazar</p>
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
                      </TooltipProvider>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Mostrando {visitas.length} de {visitas.length} registros
          </div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled={true}>
              Anterior
            </Button>
            <Button variant="default" size="sm" className="bg-black">
              1
            </Button>
            <Button variant="outline" size="sm" disabled={true}>
              Siguiente
            </Button>
          </div>
        </div>
      </div>
      {/* Modales */}
      <DetalleVisitaModalEmpleadoCompras
        isOpen={showDetalleModal}
        onClose={() => setShowDetalleModal(false)}
        visita={selectedVisita}
        onAceptar={selectedVisita?.estado === "Pendiente" ? () => handleAccionDesdeDetalle("aceptar") : undefined}
        onRechazar={selectedVisita?.estado === "Pendiente" ? () => handleAccionDesdeDetalle("rechazar") : undefined}
      />

      <ConfirmarAccionVisitaModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmarAccion}
        accion={accionPendiente}
        visitaId={selectedVisita?.id}
      />
    </div>
  )
}
