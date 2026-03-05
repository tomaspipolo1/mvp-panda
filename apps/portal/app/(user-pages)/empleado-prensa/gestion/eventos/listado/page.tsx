"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Calendar as CalendarIconLucide, Clock, MapPin, Users, Eye, MoreVertical, Edit, X, Globe, Plus } from "lucide-react"
import { eventosData } from "../[id]/page"
import Link from "next/link"
import CrearEventoPublicoModal from "@/components/eventos/crear-evento-publico-modal"

// Tipos de datos compatibles con el array de eventos
interface Participante {
  id: string
  nombreCompleto: string
  dni: string
  correo: string
  telefono: string
}

interface Evento {
  id: string
  numero: string
  titulo: string
  descripcion?: string
  fecha: Date
  fechaInicio: Date
  horaInicio?: string
  fechaFin?: Date
  horaFin?: string
  ubicacion?: string
  direccion?: string
  participantes?: Participante[]
  imagen?: string
  tipo: string
  color?: string
  estado: "Pendiente" | "En curso" | "Finalizado" | "Aprobado" | "Rechazado" | "Cancelado"
}

export default function ListadoEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false)

  // Convertir datos del array a formato compatible con el listado
  const convertirEventos = (eventosData: any[]): Evento[] => {
    return eventosData.map(evento => ({
      id: evento.id,
      numero: evento.numero,
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: new Date(evento.fechaDesde.split('/').reverse().join('-')),
      fechaInicio: new Date(evento.fechaDesde.split('/').reverse().join('-')),
      horaInicio: evento.horaDesde,
      fechaFin: new Date(evento.fechaHasta.split('/').reverse().join('-')),
      horaFin: evento.horaHasta,
      ubicacion: evento.ubicacion,
      direccion: evento.direccion,
      participantes: evento.participantes?.map((p: any) => ({
        id: p.id,
        nombreCompleto: p.nombreCompleto,
        dni: p.dni,
        correo: p.correo,
        telefono: p.telefono
      })),
      imagen: evento.imagen,
      tipo: "evento",
      estado: evento.estado
    }))
  }

  // Cargar eventos del array de datos
  useEffect(() => {
    const eventosConvertidos = convertirEventos(eventosData)
    setEventos(eventosConvertidos)
  }, [])

  // Filtrar eventos cuando cambian los filtros o la búsqueda
  useEffect(() => {
    let eventosFiltrados = eventos

    // Filtro por búsqueda
    if (busqueda) {
      eventosFiltrados = eventosFiltrados.filter((evento) =>
        evento.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        evento.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
        evento.ubicacion?.toLowerCase().includes(busqueda.toLowerCase())
      )
    }

    // Filtro por estado
    if (filtroEstado !== "todos") {
      eventosFiltrados = eventosFiltrados.filter((evento) => evento.estado === filtroEstado)
    }

    // Filtro por fecha desde
    if (fechaDesde) {
      eventosFiltrados = eventosFiltrados.filter((evento) => {
        const eventoFecha = new Date(evento.fechaInicio).toISOString().split('T')[0]
        return eventoFecha >= fechaDesde
      })
    }

    // Filtro por fecha hasta
    if (fechaHasta) {
      eventosFiltrados = eventosFiltrados.filter((evento) => {
        const eventoFecha = new Date(evento.fechaInicio).toISOString().split('T')[0]
        return eventoFecha <= fechaHasta
      })
    }

    // Ordenar por fecha (más recientes primero)
    eventosFiltrados.sort((a, b) => b.fechaInicio.getTime() - a.fechaInicio.getTime())

    setEventosFiltrados(eventosFiltrados)
  }, [eventos, busqueda, filtroEstado, fechaDesde, fechaHasta])

  // Guardar eventos en localStorage
  const guardarEventos = (nuevosEventos: Evento[]) => {
    // Los eventos ahora vienen del array de datos, no se guardan en localStorage
    console.log("Eventos actualizados:", nuevosEventos)
  }

  // Manejar ver detalle
  const handleVerDetalle = (evento: Evento) => {
    // Navegar a la página de detalle del evento
    window.location.href = `/empleado-prensa/gestion/eventos/${evento.id}`
  }

  // Manejar editar evento
  const handleEditarEvento = (evento: Evento) => {
    // TODO: Implementar edición de evento
    console.log("Editar evento:", evento)
  }

  // Manejar cancelar evento
  const handleCancelarEvento = (evento: Evento) => {
    // TODO: Implementar cancelación de evento
    console.log("Cancelar evento:", evento)
  }

  // Manejar publicar evento
  const handlePublicarEvento = (evento: Evento) => {
    // TODO: Implementar publicación de evento
    console.log("Publicar evento:", evento)
    // Aquí se podría cambiar el estado del evento o realizar otras acciones
  }

  // Manejar crear evento
  const handleCrearEvento = (data: any) => {
    // TODO: Implementar lógica de creación de evento
    console.log("Crear evento:", data)
    // Por ahora solo cerramos el modal
    setMostrarModalCrear(false)
  }


  // Obtener color del badge según el estado
  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "En curso":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Finalizado":
        return "bg-green-100 text-green-800 border-green-200"
      case "Aprobado":
        return "bg-green-100 text-green-800 border-green-200"
      case "Rechazado":
        return "bg-red-100 text-red-800 border-red-200"
      case "Cancelado":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }


  // Formatear fecha
  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Formatear hora
  const formatearHora = (hora?: string) => {
    if (!hora) return ""
    return hora
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Listado de Eventos</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setMostrarModalCrear(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear evento
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="busqueda">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
                <Input
                  id="busqueda"
                  placeholder="Buscar por título, descripción o ubicación..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full mt-1 pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="estado">Estado</Label>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="En curso">En curso</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                  <SelectItem value="Aprobado">Aprobado</SelectItem>
                  <SelectItem value="Rechazado">Rechazado</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fechaDesde">Fecha Desde</Label>
              <div className="relative">
                <CalendarIconLucide className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
                <Input
                  id="fechaDesde"
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  className="w-full mt-1 pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="fechaHasta">Fecha Hasta</Label>
              <div className="relative">
                <CalendarIconLucide className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
                <Input
                  id="fechaHasta"
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  className="w-full mt-1 pl-10"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setBusqueda("")
                setFiltroEstado("todos")
                setFechaDesde("")
                setFechaHasta("")
              }}
            >
              Limpiar filtros
            </Button>
            <Button>
              Aplicar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de eventos */}
      <div className="space-y-4">
        {eventosFiltrados.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
                    <CalendarIconLucide className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron eventos
              </h3>
              <p className="text-gray-500">
                {busqueda || filtroEstado !== "todos" || fechaDesde || fechaHasta
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "No hay eventos programados"}
              </p>
            </CardContent>
          </Card>
        ) : (
          eventosFiltrados.map((evento) => (
            <Card key={evento.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Header con título, badge de estado y menú */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
                    {evento.titulo}
                  </h3>
                  <div className="flex items-center gap-3">
                    <Badge className={getEstadoBadgeColor(evento.estado)}>
                      {evento.estado}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleVerDetalle(evento)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        {(evento.estado === "Pendiente" || evento.estado === "Aprobado") && (
                          <DropdownMenuItem onClick={() => handleEditarEvento(evento)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        )}
                        {evento.estado === "Aprobado" && (
                          <DropdownMenuItem 
                            onClick={() => handlePublicarEvento(evento)}
                            className="text-green-600 focus:text-green-600"
                          >
                            <Globe className="mr-2 h-4 w-4" />
                            Publicar
                          </DropdownMenuItem>
                        )}
                        {(evento.estado === "Pendiente" || evento.estado === "Aprobado") && (
                          <DropdownMenuItem 
                            onClick={() => handleCancelarEvento(evento)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Descripción */}
                {evento.descripcion && (
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {evento.descripcion}
                  </p>
                )}

                {/* Información en dos columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                  {/* Columna izquierda */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarIconLucide className="h-4 w-4" />
                      <span>{formatearFecha(evento.fechaInicio)}</span>
                    </div>
                    {evento.ubicacion && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{evento.ubicacion}</span>
                      </div>
                    )}
                  </div>

                  {/* Columna derecha */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {formatearHora(evento.horaInicio)}
                        {evento.horaFin && ` - ${formatearHora(evento.horaFin)}`}
                      </span>
                    </div>
                    {evento.participantes && evento.participantes.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{evento.participantes.length} participante(s)</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal para crear evento */}
      <CrearEventoPublicoModal
        open={mostrarModalCrear}
        onOpenChange={setMostrarModalCrear}
        onConfirm={handleCrearEvento}
      />
    </div>
  )
}
