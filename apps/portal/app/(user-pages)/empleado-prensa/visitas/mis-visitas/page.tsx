"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronDown, Filter, Printer, Download, Plus, Eye, CheckCircle2, XCircle, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ConfirmarAccionVisitaModal } from "@/components/visitas/confirmar-accion-visita-modal"

export default function MisVisitasPage() {
  const [tipoVisita, setTipoVisita] = useState<string>("todos")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string>("fecha")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  
  // Estados para el modal de confirmación
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accionModal, setAccionModal] = useState<"aceptar" | "rechazar" | null>(null)
  const [visitaSeleccionada, setVisitaSeleccionada] = useState<string | null>(null)

  // Datos de ejemplo para las visitas con los tipos específicos: Visita Guiada, Laboral y Evento
  // Incluye ejemplos de solicitudes de visitas que este usuario puede recibir
  const visitas = [
    {
      id: "1",
      fecha: "06/01/2024",
      tipo: "Laboral",
      sitio: "Oficina Central",
      personas: 2,
      vehiculos: 1,
      estado: "Pendiente",
      solicitante: "Juan Pérez (Proveedor)",
      descripcion: "Reunión para discutir cobertura de prensa del nuevo proyecto",
    },
    {
      id: "2",
      fecha: "15/12/2023",
      tipo: "Evento",
      sitio: "Auditorio Principal",
      personas: 4,
      vehiculos: 2,
      estado: "Aprobada",
      solicitante: "Departamento de Marketing",
      descripcion: "Presentación de nueva campaña",
    },
    {
      id: "3",
      fecha: "10/11/2023",
      tipo: "Laboral",
      sitio: "Sala de Reuniones B",
      personas: 1,
      vehiculos: 1,
      estado: "Completada",
      solicitante: "María González (Empleado)",
      descripcion: "Entrevista para boletín interno",
    },
    {
      id: "4",
      fecha: "05/10/2023",
      tipo: "Visita Guiada",
      sitio: "Instalaciones Portuarias",
      personas: 8,
      vehiculos: 0,
      estado: "Cancelada",
      solicitante: "Colegio San Martín",
      descripcion: "Visita educativa para estudiantes",
    },
    {
      id: "5",
      fecha: "20/01/2024",
      tipo: "Visita Guiada",
      sitio: "Zona Operativa",
      personas: 12,
      vehiculos: 1,
      estado: "Pendiente",
      solicitante: "Universidad Nacional",
      descripcion: "Visita académica para estudiantes de Logística",
    },
    {
      id: "6",
      fecha: "25/01/2024",
      tipo: "Laboral",
      sitio: "Oficina de Prensa",
      personas: 3,
      vehiculos: 1,
      estado: "Pendiente",
      solicitante: "Carlos Rodríguez (Cliente)",
      descripcion: "Reunión para coordinar entrevista sobre nuevo servicio",
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


  const handleAceptar = (id: string) => {
    setVisitaSeleccionada(id)
    setAccionModal("aceptar")
    setIsModalOpen(true)
  }

  const handleRechazar = (id: string) => {
    setVisitaSeleccionada(id)
    setAccionModal("rechazar")
    setIsModalOpen(true)
  }

  const handleConfirmarAccion = (motivo: string) => {
    if (!visitaSeleccionada) return
    
    if (accionModal === "aceptar") {
      console.log(`Visita ${visitaSeleccionada} aceptada`)
      // Aquí iría la lógica para aceptar la visita
    } else if (accionModal === "rechazar") {
      console.log(`Visita ${visitaSeleccionada} rechazada. Motivo: ${motivo}`)
      // Aquí iría la lógica para rechazar la visita
    }
    
    // Cerrar el modal
    setIsModalOpen(false)
    setAccionModal(null)
    setVisitaSeleccionada(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setAccionModal(null)
    setVisitaSeleccionada(null)
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
          <Button className="bg-black hover:bg-gray-800 flex items-center gap-2">
            <Link href="/empleado-prensa/visitas/nueva-visita">
              <Plus className="h-4 w-4" />
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
          <div>
            <label htmlFor="tipoVisita" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Visita
            </label>
            <Select value={tipoVisita} onValueChange={setTipoVisita}>
              <SelectTrigger id="tipoVisita" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="laboral">Laboral</SelectItem>
                <SelectItem value="guiada">Visita Guiada</SelectItem>
                <SelectItem value="evento">Evento</SelectItem>
              </SelectContent>
            </Select>
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
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/empleado-prensa/visitas/mis-visitas/${visita.id}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalle
                            </Link>
                          </DropdownMenuItem>
                          {visita.estado === "Pendiente" && (
                            <>
                              <DropdownMenuItem onClick={() => handleAceptar(visita.id)}>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Aceptar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRechazar(visita.id)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Rechazar
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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

      {/* Modal de confirmación */}
      <ConfirmarAccionVisitaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmarAccion}
        accion={accionModal}
        visitaId={visitaSeleccionada || undefined}
      />
    </div>
  )
}
