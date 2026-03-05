"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Printer,
  Download,
  Plus,
  Eye,
  X,
  FileText,
  Clock,
  Calendar,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Tipos para las solicitudes
type SolicitudPropia = {
  id: number
  fecha: string
  numero: string
  tipo: string
  asunto: string
  estado: string
  ultimaActualizacion: string
  descripcion?: string
  comentarios?: string[]
}

export default function MisSolicitudesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>("fecha")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState("")

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudPropia | null>(null)

  // Datos de ejemplo para la tabla de mis solicitudes
  const solicitudes: SolicitudPropia[] = [
    {
      id: 1,
      fecha: "15/04/2023",
      numero: "SOL-2023-0125",
      tipo: "Licencia Ordinaria Anual",
      asunto: "Vacaciones anuales",
      estado: "Pendiente",
      ultimaActualizacion: "15/04/2023",
      descripcion:
        "Solicito licencia ordinaria anual por un período de 15 días hábiles a partir del 01/06/2023 hasta el 21/06/2023 inclusive.",
      comentarios: [
        "15/04/2023 - Sistema: Solicitud creada",
        "16/04/2023 - María González: Se ha enviado la solicitud a su superior para aprobación.",
      ],
    },
    {
      id: 2,
      fecha: "10/04/2023",
      numero: "SOL-2023-0124",
      tipo: "Licencia Médica",
      asunto: "Reposo por enfermedad",
      estado: "Aprobada",
      ultimaActualizacion: "12/04/2023",
      descripcion:
        "Solicito licencia médica por un período de 3 días hábiles debido a un cuadro gripal, adjunto certificado médico correspondiente.",
      comentarios: [
        "10/04/2023 - Sistema: Solicitud creada",
        "11/04/2023 - Juan Pérez: Se ha recibido el certificado médico.",
        "12/04/2023 - Roberto Álvarez: Solicitud aprobada.",
      ],
    },
    {
      id: 3,
      fecha: "05/04/2023",
      numero: "SOL-2023-0123",
      tipo: "Día de trámite",
      asunto: "Trámite personal",
      estado: "Rechazada",
      ultimaActualizacion: "08/04/2023",
      descripcion: "Solicito un día de permiso para realizar trámites personales el día 10/04/2023.",
      comentarios: [
        "05/04/2023 - Sistema: Solicitud creada",
        "08/04/2023 - Roberto Álvarez: Solicitud rechazada debido a la carga de trabajo prevista para esa fecha. Por favor reprogramar para la semana siguiente.",
      ],
    },
    {
      id: 4,
      fecha: "28/03/2023",
      numero: "SOL-2023-0122",
      tipo: "Solicitud de Préstamo",
      asunto: "Préstamo personal",
      estado: "Pendiente",
      ultimaActualizacion: "30/03/2023",
      descripcion: "Solicito un préstamo personal por el monto de $50,000 a descontar en 12 cuotas mensuales.",
      comentarios: [
        "28/03/2023 - Sistema: Solicitud creada",
        "30/03/2023 - María González: Solicitud enviada al departamento de finanzas para evaluación.",
      ],
    },
    {
      id: 5,
      fecha: "20/03/2023",
      numero: "SOL-2023-0121",
      tipo: "Solicitud de Recibos de Sueldo",
      asunto: "Recibos de enero a marzo",
      estado: "Aprobada",
      ultimaActualizacion: "22/03/2023",
      descripcion:
        "Solicito copia de los recibos de sueldo correspondientes a los meses de enero, febrero y marzo de 2023 para trámite bancario.",
      comentarios: [
        "20/03/2023 - Sistema: Solicitud creada",
        "21/03/2023 - María González: Solicitud recibida, procesando documentación.",
        "22/03/2023 - María González: Solicitud aprobada. Los recibos han sido enviados a su correo electrónico.",
      ],
    },
    {
      id: 6,
      fecha: "15/03/2023",
      numero: "SOL-2023-0120",
      tipo: "Otra solicitud",
      asunto: "Cambio de horario laboral",
      estado: "Rechazada",
      ultimaActualizacion: "18/03/2023",
      descripcion: "Solicito cambio de horario laboral de 8:00-17:00 a 9:00-18:00 por motivos de transporte.",
      comentarios: [
        "15/03/2023 - Sistema: Solicitud creada",
        "18/03/2023 - Roberto Álvarez: Solicitud rechazada. El horario solicitado no se ajusta a las necesidades operativas del departamento.",
      ],
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

  // Función para abrir el modal con los detalles de la solicitud
  const handleOpenModal = (solicitud: SolicitudPropia) => {
    setSelectedSolicitud(solicitud)
    setIsModalOpen(true)
  }

  // Función para renderizar el badge de estado
  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
      case "Pendiente de Aprobación":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
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
            <Link href="/empleado-gerente/gestion/solicitudes/nueva-solicitud" className="flex items-center">
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asunto</th>
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
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asunto}</td>
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
                          <DropdownMenuItem onClick={() => handleOpenModal(solicitud)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <X className="mr-2 h-4 w-4" />
                            Cancelar solicitud
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-sm text-center text-gray-500 italic">
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

      {/* Modal de Detalles de Solicitud */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle de Solicitud</DialogTitle>
            <DialogDescription>
              {selectedSolicitud?.numero} - {selectedSolicitud?.asunto}
            </DialogDescription>
          </DialogHeader>

          {selectedSolicitud && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Tipo:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.tipo}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Fecha:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.fecha}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                  </div>
                  <div>{renderEstadoBadge(selectedSolicitud.estado)}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Última Actualización:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.ultimaActualizacion}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-md font-medium">Descripción</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedSolicitud.descripcion}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-md font-medium">Historial de Comentarios</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedSolicitud.comentarios?.map((comentario, index) => (
                    <div key={index} className="text-sm bg-gray-50 p-2 rounded-md">
                      {comentario}
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cerrar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
