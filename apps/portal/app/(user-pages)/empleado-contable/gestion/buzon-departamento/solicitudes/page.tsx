"use client"

import { useState } from "react"
import { ArrowLeft, Search, Mail, MailOpen, Paperclip, Filter, Printer, Download, Eye, User, UserCheck, MoreVertical } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { DetalleSolicitudBuzonModal } from "@/components/solicitudes/detalle-solicitud-buzon-modal"
import { cn } from "@/lib/utils"

// Tipos para las solicitudes del departamento
type SolicitudDepartamento = {
  id: number
  fecha: string
  numero: string
  solicitante: string
  tipoSolicitante: string
  departamento: string
  tipo: string
  asunto: string
  estado: string
  ultimaActualizacion: string
  descripcion?: string
  comentarios?: string[]
  correo?: string
  asignacion?: string
  adjuntos?: string[]
  hora?: string
  leido?: boolean
  prioridad?: string
  contenido?: string
}

// Datos de ejemplo para solicitudes externas del departamento contable
const solicitudesExternas: SolicitudDepartamento[] = [
  {
    id: 1,
    numero: "SOL-22118-2025",
    tipo: "Tramite",
    tipoSolicitante: "Proveedor",
    asunto: "Consulta sobre Estado de Factura N° 0001-00234567",
    descripcion: "Consulto sobre el estado de pago de la factura N° 0001-00234567 por servicios portuarios del mes de diciembre 2023.",
    fecha: "15/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "15/01/2024",
    solicitante: "Transportes Marítimos S.A.",
    departamento: "Contable",
    correo: "facturacion@transportesmaritimos.com",
    asignacion: "Sin asignar",
    adjuntos: ["factura_original.pdf"],
    hora: "14:30",
    leido: false,
    prioridad: "Media",
    contenido: "Consulto sobre el estado de pago de la factura N° 0001-00234567 por servicios portuarios del mes de diciembre 2023.",
  },
  {
    id: 2,
    numero: "SOL-22119-2025",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Solicitud de Certificado de Retenciones",
    descripcion: "Solicito certificado de retenciones practicadas durante el año 2023 para presentación ante AFIP.",
    fecha: "15/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "15/01/2024",
    solicitante: "Industrias Químicas del Sur",
    departamento: "Contable",
    correo: "contabilidad@industriasquimicas.com",
    asignacion: "Sin asignar",
    adjuntos: ["detalle_retenciones.xlsx"],
    hora: "11:15",
    leido: true,
    prioridad: "Media",
    contenido: "Solicito certificado de retenciones practicadas durante el año 2023 para presentación ante AFIP.",
  },
  {
    id: 3,
    numero: "SOL-22120-2025",
    tipo: "Reclamo",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por Nota de Débito Incorrecta",
    descripcion: "Reclamo por nota de débito incorrecta. Los conceptos facturados no corresponden a servicios efectivamente utilizados.",
    fecha: "14/01/2024",
    estado: "Resuelta",
    ultimaActualizacion: "14/01/2024",
    solicitante: "Logística Integral Ltda.",
    departamento: "Contable",
    correo: "administracion@logisticaintegral.com",
    asignacion: "Ana Martínez",
    adjuntos: ["nota_debito.pdf", "justificacion_reclamo.docx"],
    hora: "16:45",
    leido: true,
    prioridad: "Alta",
    contenido: "Reclamo por nota de débito incorrecta. Los conceptos facturados no corresponden a servicios efectivamente utilizados.",
  },
  {
    id: 4,
    numero: "SOL-22121-2025",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Solicitud de Plan de Pagos",
    descripcion: "Solicito plan de pagos para regularizar deuda pendiente. Adjunto propuesta de cronograma de pagos.",
    fecha: "14/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "14/01/2024",
    solicitante: "Exportadora de Granos ABC",
    departamento: "Contable",
    correo: "finanzas@exportadoragranos.com",
    asignacion: "Sin asignar",
    adjuntos: ["propuesta_plan_pagos.pdf"],
    hora: "09:20",
    leido: false,
    prioridad: "Media",
    contenido: "Solicito plan de pagos para regularizar deuda pendiente. Adjunto propuesta de cronograma de pagos.",
  },
]

export default function BuzonSolicitudesContablePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [numeroSolicitud, setNumeroSolicitud] = useState("")
  const [tipoFilter, setTipoFilter] = useState("Todos")
  const [estadoFilter, setEstadoFilter] = useState("Todos")
  const [departamentoFilter, setDepartamentoFilter] = useState("Todos")

  // Estados para modales
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [isAsignarModalOpen, setIsAsignarModalOpen] = useState(false)
  const [asignarBusqueda, setAsignarBusqueda] = useState("")
  const [asignarSeleccion, setAsignarSeleccion] = useState<string | null>(null)

  // Función para filtrar las solicitudes externas
  const filterSolicitudesExternas = (solicitudes: SolicitudDepartamento[]) => {
    return solicitudes.filter((solicitud) => {
      const matchesNumero = numeroSolicitud === "" || solicitud.numero.includes(numeroSolicitud)
      const matchesEstado = estadoFilter === "Todos" || solicitud.estado === estadoFilter
      const matchesTipo = tipoFilter === "Todos" || solicitud.tipo === tipoFilter
      const matchesSearch = searchTerm === "" || Object.values(solicitud).some((value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesNumero && matchesEstado && matchesTipo && matchesSearch
    })
  }

  const filteredSolicitudesExternas = filterSolicitudesExternas(solicitudesExternas)

  const handleClearFilters = () => {
    setNumeroSolicitud("")
    setTipoFilter("Todos")
    setEstadoFilter("Todos")
    setDepartamentoFilter("Todos")
  }

  const handleSolicitudClick = (solicitud: any) => {
    setSolicitudSeleccionada(solicitud)
    setModalAbierto(true)
  }

  const handleCloseModal = () => {
    setModalAbierto(false)
    setSolicitudSeleccionada(null)
  }

  const handleTomar = (solicitud: SolicitudDepartamento) => {
    // Lógica para tomar la solicitud (asignarla al usuario actual)
    console.log("Tomando solicitud:", solicitud.numero)
  }

  const handleOpenAsignarModal = (solicitud: SolicitudDepartamento) => {
    setSolicitudSeleccionada(solicitud)
    setIsAsignarModalOpen(true)
    setAsignarBusqueda("")
    setAsignarSeleccion(null)
  }

  const handleAsignar = () => {
    if (asignarSeleccion && solicitudSeleccionada) {
      console.log("Asignando solicitud", solicitudSeleccionada.numero, "a", asignarSeleccion)
      setIsAsignarModalOpen(false)
      setAsignarSeleccion(null)
      setSolicitudSeleccionada(null)
    }
  }

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En proceso</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Resuelta":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resuelta</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  // Datos de ejemplo para asignación
  const empleadosEjemplo = [
    "Ana García",
    "Carlos López", 
    "María Fernández",
    "Roberto Martínez",
    "Diego Torres",
    "Juan Pérez",
    "Sofía Ramírez",
  ]

  // Sugerencias filtradas para asignación
  const sugerenciasAsignacion = empleadosEjemplo
    .filter((item) => item.toLowerCase().includes(asignarBusqueda.toLowerCase()))
    .slice(0, 8)

  return (
    <div className="container mx-auto py-6 space-y-6">
      

      <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Solicitudes Externas - Departamento Contable</h1>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
      </div>

          {/* Filtros */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="numeroSolicitudExternos" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Solicitud
                </label>
              <Input
                  id="numeroSolicitudExternos"
                  placeholder="Ej: SOL-22118-2025"
                  className="w-full"
                  value={numeroSolicitud}
                  onChange={(e) => setNumeroSolicitud(e.target.value)}
              />
            </div>
              <div>
                <label htmlFor="estadoExternos" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                  <SelectTrigger id="estadoExternos">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                    <SelectItem value="Rechazada">Rechazada</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="tipoSolicitudExternos" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger id="tipoSolicitudExternos">
                    <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Facturación">Tramite</SelectItem>
                    <SelectItem value="Certificados">Cosulta</SelectItem>
                    <SelectItem value="Reclamo">Reclamo</SelectItem>
              </SelectContent>
            </Select>
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

          {/* Tabla de Solicitudes Externas */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Solicitudes Externas</h2>
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Número</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Solicitante</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asunto</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asignación</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSolicitudesExternas.length > 0 ? (
                    filteredSolicitudesExternas.map((solicitud) => (
                      <tr key={solicitud.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.fecha}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.numero}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.solicitante}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipo}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asunto}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{renderEstadoBadge(solicitud.estado)}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asignacion}</td>
                        <td className="px-4 py-4 text-sm text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleSolicitudClick(solicitud)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTomar(solicitud)}>
                                <User className="mr-2 h-4 w-4" />
                                Tomar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenAsignarModal(solicitud)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Asignar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                        No hay solicitudes que coincidan con los filtros
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
                    </div>
            <div className="p-4 flex justify-between items-center text-sm text-gray-500">
              <div>
                Mostrando {filteredSolicitudesExternas.length} de {solicitudesExternas.length} registros
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
      </div>
      {/* Modal de detalle */}
      <DetalleSolicitudBuzonModal isOpen={modalAbierto} onClose={handleCloseModal} solicitud={solicitudSeleccionada} />

      {/* Modal de Asignación */}
      {isAsignarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Asignar Solicitud</h3>
            <p className="text-gray-600 mb-4">
              Asignar solicitud {solicitudSeleccionada?.numero} a un empleado
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar empleado</label>
                <Input
                  placeholder="Buscar empleado..."
                  value={asignarBusqueda}
                  onChange={e => setAsignarBusqueda(e.target.value)}
                  className="w-full"
                  disabled={!!asignarSeleccion}
                />
                <div className="mt-3 border rounded-md h-32 min-h-[120px] max-h-32 overflow-y-auto bg-white flex flex-col justify-start">
                  {asignarSeleccion ? (
                    <div className="flex items-center justify-between px-4 py-3 bg-blue-50 text-blue-700 font-medium">
                      <span>{asignarSeleccion}</span>
                      <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => setAsignarSeleccion(null)}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    sugerenciasAsignacion.length > 0 ? (
                      sugerenciasAsignacion.map((item) => (
                        <div
                          key={item}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                          onClick={() => setAsignarSeleccion(item)}
                        >
                          {item}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-gray-400 text-center select-none">Sin resultados</div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsAsignarModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                disabled={!asignarSeleccion}
                onClick={handleAsignar}
              >
                Asignar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
