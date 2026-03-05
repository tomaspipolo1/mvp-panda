"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Filter, Printer, Download, Plus, Eye, X, MoreVertical } from "lucide-react"
import { DetalleSolicitudModal } from "@/components/solicitudes/detalle-solicitud-empleado-modal"
import { ConfirmarCancelacionModal } from "@/components/solicitudes/confirmar-cancelacion-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function MisSolicitudesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>("fecha")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState("")
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)
  const [modalCancelacionAbierto, setModalCancelacionAbierto] = useState(false)
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null)

  // Datos de ejemplo para la tabla
  const solicitudes = [
    {
      id: 1,
      fecha: "15/04/2023",
      numero: "SOL-2023-0125",
      tipo: "Licencia Ordinaria Anual",
      estado: "Pendiente",
      ultimaActualizacion: "15/04/2023",
      empleado: {
        nombre: "Juan Carlos",
        apellido: "Pérez",
        legajo: "EMP-001",
      },
      descripcion: "Solicitud de vacaciones anuales del 20 al 30 de abril para descanso familiar.",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Pendiente", fecha: null },
        { nombre: "Roberto", apellido: "Silva", firma: "Pendiente", fecha: null },
        { nombre: "Ana", apellido: "Martínez", firma: "Pendiente", fecha: null },
      ],
      documentos: ["Formulario_Vacaciones.pdf"],
    },
    {
      id: 2,
      fecha: "10/04/2023",
      numero: "SOL-2023-0124",
      tipo: "Licencia Médica",
      estado: "Aprobada",
      ultimaActualizacion: "12/04/2023",
      empleado: {
        nombre: "Ana María",
        apellido: "López",
        legajo: "EMP-002",
      },
      descripcion: "Solicitud de licencia médica por reposo indicado por médico tratante.",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Aprobado", fecha: "11/04/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "Aprobado", fecha: "12/04/2023" },
        { nombre: "Ana", apellido: "Martínez", firma: "Aprobado", fecha: "12/04/2023" },
      ],
      documentos: ["Certificado_Medico.pdf", "Formulario_Licencia.pdf"],
    },
    {
      id: 3,
      fecha: "05/04/2023",
      numero: "SOL-2023-0123",
      tipo: "Día de trámite",
      estado: "Rechazada",
      ultimaActualizacion: "08/04/2023",
      empleado: {
        nombre: "Carlos",
        apellido: "Rodríguez",
        legajo: "EMP-003",
      },
      descripcion: "Solicitud de día de trámite para gestiones personales bancarias.",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Aprobado", fecha: "06/04/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "Rechazado", fecha: "08/04/2023" },
        { nombre: "Ana", apellido: "Martínez", firma: "Pendiente", fecha: null },
      ],
      documentos: [],
    },
    {
      id: 4,
      fecha: "28/03/2023",
      numero: "SOL-2023-0122",
      tipo: "Solicitud de Préstamo",
      estado: "Pendiente",
      ultimaActualizacion: "30/03/2023",
      empleado: {
        nombre: "Laura",
        apellido: "Fernández",
        legajo: "EMP-004",
      },
      descripcion: "Solicitud de préstamo personal para gastos médicos familiares.",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Aprobado", fecha: "29/03/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "Pendiente", fecha: null },
        { nombre: "Ana", apellido: "Martínez", firma: "Pendiente", fecha: null },
      ],
      documentos: ["Solicitud_Prestamo.pdf", "Comprobantes_Gastos.pdf"],
    },
    {
      id: 5,
      fecha: "20/03/2023",
      numero: "SOL-2023-0121",
      tipo: "Solicitud de Recibos de Sueldo",
      estado: "Aprobada",
      ultimaActualizacion: "22/03/2023",
      empleado: {
        nombre: "Miguel",
        apellido: "Torres",
        legajo: "EMP-005",
      },
      descripcion: "Solicitud de recibos de sueldo de enero a marzo para trámite hipotecario.",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Aprobado", fecha: "21/03/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "Aprobado", fecha: "22/03/2023" },
        { nombre: "Ana", apellido: "Martínez", firma: "Aprobado", fecha: "22/03/2023" },
      ],
      documentos: [],
    },
    {
      id: 6,
      fecha: "15/03/2023",
      numero: "SOL-2023-0120",
      tipo: "Otra solicitud",
      estado: "Rechazada",
      ultimaActualizacion: "18/03/2023",
      empleado: {
        nombre: "Patricia",
        apellido: "Morales",
        legajo: "EMP-006",
      },
      descripcion: "Solicitud de cambio de horario laboral por motivos familiares.",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Rechazado", fecha: "16/03/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "Pendiente", fecha: null },
        { nombre: "Ana", apellido: "Martínez", firma: "Pendiente", fecha: null },
      ],
      documentos: ["Justificacion_Cambio_Horario.pdf"],
    },
    {
      id: 7,
      fecha: "12/03/2023",
      numero: "SOL-2023-0119",
      tipo: "Licencia Ordinaria Anual",
      estado: "Cancelada",
      ultimaActualizacion: "14/03/2023",
      empleado: {
        nombre: "Roberto",
        apellido: "Jiménez",
        legajo: "EMP-007",
      },
      descripcion: "Solicitud de vacaciones familiares cancelada por cambio de planes.",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Pendiente", fecha: null },
        { nombre: "Roberto", apellido: "Silva", firma: "Pendiente", fecha: null },
        { nombre: "Ana", apellido: "Martínez", firma: "Pendiente", fecha: null },
      ],
      documentos: ["Formulario_Vacaciones.pdf"],
    },
  ]

  // Función para ordenar las solicitudes
  const sortedSolicitudes = [...solicitudes].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Función para filtrar las solicitudes
  const filteredSolicitudes = sortedSolicitudes.filter((solicitud) => {
    // Filtro por búsqueda
    const matchesSearch =
      searchTerm === "" ||
      Object.values(solicitud).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()),
      )

    // Filtro por tipo
    const matchesTipo = tipoFilter === "todos" || solicitud.tipo.includes(tipoFilter)

    // Filtro por estado
    const matchesEstado = estadoFilter === "todos" || solicitud.estado === estadoFilter

    // Filtro por fecha
    const matchesFecha =
      fechaDesdeFilter === "" || new Date(solicitud.fecha.split("/").reverse().join("-")) >= new Date(fechaDesdeFilter)

    return matchesSearch && matchesTipo && matchesEstado && matchesFecha
  })

  // Función para manejar el cambio de columna de ordenación
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setTipoFilter("todos")
    setEstadoFilter("todos")
    setFechaDesdeFilter("")
  }

  // Función para renderizar el badge de estado
  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  // Función para manejar ver detalle
  const handleVerDetalle = (solicitud: any) => {
    setSolicitudSeleccionada(solicitud)
    setModalDetalleAbierto(true)
  }

  // Función para manejar cancelar solicitud desde la tabla
  const handleCancelarDesdeTabla = (solicitud: any) => {
    setSolicitudSeleccionada(solicitud)
    setModalCancelacionAbierto(true)
  }

  // Función para manejar cancelar solicitud desde el modal de detalle
  const handleCancelarDesdeDetalle = (solicitud: any) => {
    setModalDetalleAbierto(false)
    setSolicitudSeleccionada(solicitud)
    setModalCancelacionAbierto(true)
  }

  // Función para confirmar la cancelación
  const handleConfirmarCancelacion = (motivo: string) => {
    console.log("Cancelando solicitud:", solicitudSeleccionada?.numero, "Motivo:", motivo)
    // Aquí implementarías la lógica para cancelar la solicitud
    // Por ejemplo, hacer una llamada a la API
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mis Solicitudes</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/gestion/portal-empleado/nueva-solicitud" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Solicitud
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="numeroSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Solicitud
            </label>
            <Input id="numeroSolicitud" placeholder="Ej: SOL-2023-0125" className="w-full" />
          </div>
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Licencia Ordinaria Anual">Licencia Ordinaria Anual</SelectItem>
                <SelectItem value="Licencia Médica">Licencia Médica</SelectItem>
                <SelectItem value="Día de trámite">Día de trámite</SelectItem>
                <SelectItem value="Solicitud de Préstamo">Solicitud de Préstamo</SelectItem>
                <SelectItem value="Solicitud de Recibos de Sueldo">Solicitud de Recibos de Sueldo</SelectItem>
                <SelectItem value="Otra solicitud">Otra solicitud</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger id="estado">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Aprobada">Aprobada</SelectItem>
                <SelectItem value="Rechazada">Rechazada</SelectItem>
                <SelectItem value="Cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Desde
            </label>
            <Input
              id="fechaDesde"
              type="date"
              value={fechaDesdeFilter}
              onChange={(e) => setFechaDesdeFilter(e.target.value)}
              className="w-full"
              placeholder="dd/mm/aaaa"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" onClick={handleClearFilters}>
            Limpiar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Aplicar Filtros
          </Button>
        </div>
      </div>

      {/* Tabla de Solicitudes */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Solicitudes</h2>
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("fecha")}
                >
                  <div className="flex items-center">
                    Fecha
                    {sortColumn === "fecha" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Número</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Última Actualización</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSolicitudes.length > 0 ? (
                filteredSolicitudes.map((solicitud) => (
                  <tr key={solicitud.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.fecha}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.numero}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipo}</td>
                    <td className="px-4 py-4 text-sm">{renderEstadoBadge(solicitud.estado)}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.ultimaActualizacion}</td>
                    <td className="px-4 py-4 text-sm text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerDetalle(solicitud)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalle
                          </DropdownMenuItem>
                          {(solicitud.estado === "Pendiente" || solicitud.estado === "Aprobada") && (
                            <DropdownMenuItem onClick={() => handleCancelarDesdeTabla(solicitud)}>
                              <X className="mr-2 h-4 w-4" />
                              Cancelar solicitud
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                    No se encontraron solicitudes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-between items-center text-sm text-gray-500">
          <div>
            Mostrando {filteredSolicitudes.length} de {solicitudes.length} registros
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Siguiente
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de detalle */}
      <DetalleSolicitudModal
        isOpen={modalDetalleAbierto}
        onClose={() => setModalDetalleAbierto(false)}
        onCancelar={handleCancelarDesdeDetalle}
        solicitud={solicitudSeleccionada}
      />

      {/* Modal de confirmación de cancelación */}
      <ConfirmarCancelacionModal
        isOpen={modalCancelacionAbierto}
        onClose={() => setModalCancelacionAbierto(false)}
        onConfirm={handleConfirmarCancelacion}
        solicitud={solicitudSeleccionada}
      />
    </div>
  )
}

