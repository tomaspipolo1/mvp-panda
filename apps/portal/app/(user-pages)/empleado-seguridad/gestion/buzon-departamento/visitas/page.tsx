"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, Users, Truck, User, Building } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetalleVisitaBuzonModal } from "@/components/visitas/detalle-visita-buzon-modal"

// Datos de ejemplo para visitas del departamento de seguridad
const visitasData = [
  {
    id: 1,
    numeroSolicitud: "VIS-SEG-001",
    tipoVisita: "Laboral",
    destino: "Zona Operativa/Muelles",
    fechaDesde: "2024-01-16",
    horaDesde: "08:00",
    fechaHasta: "2024-01-16",
    horaHasta: "17:00",
    estado: "Pendiente",
    fechaSolicitud: "2024-01-15",
    horaSolicitud: "14:30",
    observaciones: "Inspección de seguridad en instalaciones portuarias. Auditoría de cumplimiento normativo.",
    personas: [
      {
        nombre: "Inspector Juan Carlos Pérez",
        dni: "25.123.456",
        email: "jperez@seguridadportuaria.gov.ar",
        telefono: "11-4567-8901",
      },
      {
        nombre: "Técnico María González",
        dni: "28.987.654",
        email: "mgonzalez@seguridadportuaria.gov.ar",
        telefono: "11-5555-1234",
      },
    ],
    vehiculo: {
      patente: "SEG123OF",
      tipo: "Camioneta oficial",
      marca: "Toyota",
      modelo: "Hilux",
    },
    conductor: {
      nombre: "Inspector Juan Carlos Pérez",
      dni: "25.123.456",
      licencia: "Profesional Clase B1",
      telefono: "11-4567-8901",
    },
  },
  {
    id: 2,
    numeroSolicitud: "VIS-SEG-002",
    tipoVisita: "Transporte Cargas",
    destino: "Terminal TEC Plata",
    fechaDesde: "2024-01-17",
    horaDesde: "06:00",
    fechaHasta: "2024-01-17",
    horaHasta: "14:00",
    estado: "Aprobada",
    fechaSolicitud: "2024-01-14",
    horaSolicitud: "09:15",
    observaciones: "Transporte de materiales peligrosos. Requiere escolta de seguridad.",
    operacion: "Solo Descarga",
    tipoCarga: "Materiales de construcción",
    proveedor: {
      razonSocial: "Transportes Especiales SA",
      cuit: "30-12345678-9",
      email: "operaciones@transportesespeciales.com.ar",
      telefono: "11-4444-7890",
    },
    vehiculo: {
      patente: "MAT789PE",
      tipo: "Camión con grúa",
      marca: "Mercedes Benz",
      modelo: "Actros",
    },
    conductor: {
      nombre: "Roberto Silva Martinez",
      dni: "32.456.789",
      licencia: "Profesional Clase E2",
      telefono: "11-8888-4567",
    },
  },
]

const tiposVisita = ["Todos", "Laboral", "Transporte Cargas"]
const tiposOperacion = ["Todas", "Solo Carga", "Solo Descarga", "Carga y Descarga"]
const tiposCarga = [
  "Todos",
  "Granel",
  "Líquida",
  "Gases",
  "Contenedores",
  "Paquetes",
  "Materiales de construcción",
  "Maquinaria",
  "Otro",
]
const estados = ["Todos", "Pendiente", "Aprobada", "Rechazada"]

export default function BuzonVisitasSeguridadPage() {
  const [visitaSeleccionada, setVisitaSeleccionada] = useState<any>(null)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [filtroTipoVisita, setFiltroTipoVisita] = useState("Todos")
  const [filtroOperacion, setFiltroOperacion] = useState("Todas")
  const [filtroTipoCarga, setFiltroTipoCarga] = useState("Todos")
  const [filtroEstado, setFiltroEstado] = useState("Todos")
  const [busqueda, setBusqueda] = useState("")
  const [tabActiva, setTabActiva] = useState("todas")

  // Filtrar visitas según la pestaña activa
  const visitasPorTab = visitasData.filter((visita) => {
    if (tabActiva === "pendientes") return visita.estado === "Pendiente"
    return true
  })

  const handleTipoVisitaChange = (valor: string) => {
    setFiltroTipoVisita(valor)
    if (valor !== "Transporte Cargas") {
      setFiltroOperacion("Todas")
      setFiltroTipoCarga("Todos")
    }
  }

  // Aplicar filtros adicionales
  const visitasFiltradas = visitasPorTab.filter((visita) => {
    const coincideBusqueda =
      visita.proveedor?.razonSocial?.toLowerCase().includes(busqueda.toLowerCase()) ||
      visita.operacion?.toLowerCase().includes(busqueda.toLowerCase()) ||
      visita.tipoCarga?.toLowerCase().includes(busqueda.toLowerCase()) ||
      visita.numeroSolicitud.toLowerCase().includes(busqueda.toLowerCase()) ||
      visita.destino.toLowerCase().includes(busqueda.toLowerCase()) ||
      visita.personas?.some((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase())) ||
      false

    const coincideTipoVisita = filtroTipoVisita === "Todos" || visita.tipoVisita === filtroTipoVisita
    const coincideOperacion =
      visita.tipoVisita !== "Transporte Cargas" || filtroOperacion === "Todas" || visita.operacion === filtroOperacion
    const coincideTipoCarga =
      visita.tipoVisita !== "Transporte Cargas" || filtroTipoCarga === "Todos" || visita.tipoCarga === filtroTipoCarga
    const coincideEstado = filtroEstado === "Todos" || visita.estado === filtroEstado

    return coincideBusqueda && coincideTipoVisita && coincideOperacion && coincideTipoCarga && coincideEstado
  })

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Aprobada":
        return "bg-green-100 text-green-800"
      case "Rechazada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTipoVisitaIcon = (tipo: string) => {
    switch (tipo) {
      case "Transporte Cargas":
        return <Truck className="h-4 w-4" />
      case "Laboral":
        return <Building className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const handleVerDetalle = (visita: any) => {
    setVisitaSeleccionada(visita)
    setShowDetalleModal(true)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href="/empleado-seguridad/gestion/buzon-departamento"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Buzón Departamento - Visitas</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Barra de herramientas */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por proveedor, personas, operación, destino o número..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroTipoVisita} onValueChange={handleTipoVisitaChange}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Tipo de Visita" />
              </SelectTrigger>
              <SelectContent>
                {tiposVisita.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(filtroTipoVisita === "Transporte Cargas" || filtroTipoVisita === "Todos") && (
              <>
                <Select value={filtroOperacion} onValueChange={setFiltroOperacion}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Operación" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposOperacion.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroTipoCarga} onValueChange={setFiltroTipoCarga}>
                  <SelectTrigger className="w-full lg:w-40">
                    <SelectValue placeholder="Tipo de Carga" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposCarga.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {estados.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={tabActiva} onValueChange={setTabActiva} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="todas">Todas las visitas ({visitasData.length})</TabsTrigger>
            <TabsTrigger value="pendientes">
              Pendientes ({visitasData.filter((v) => v.estado === "Pendiente").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tabActiva} className="mt-0">
            <div className="divide-y divide-gray-100">
              {visitasFiltradas.map((visita) => (
                <div
                  key={visita.id}
                  onClick={() => handleVerDetalle(visita)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTipoVisitaIcon(visita.tipoVisita)}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {visita.tipoVisita === "Transporte Cargas"
                            ? visita.proveedor?.razonSocial
                            : `${visita.personas?.[0]?.nombre} ${visita.personas?.length > 1 ? `y ${visita.personas.length - 1} más` : ""}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {visita.tipoVisita === "Transporte Cargas"
                            ? `${visita.operacion} - ${visita.tipoCarga}`
                            : visita.destino}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{visita.horaSolicitud}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-900 mb-1">Solicitud de {visita.tipoVisita}</p>
                    <p className="text-xs text-gray-600">{visita.numeroSolicitud}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge className={`text-xs ${getEstadoColor(visita.estado)}`}>{visita.estado}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {visita.tipoVisita}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{visita.personas?.length || 1}</span>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        <span>{visita.vehiculo?.patente}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{visita.fechaDesde}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {visitasFiltradas.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No se encontraron visitas que coincidan con los filtros</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Detalle */}
      <DetalleVisitaBuzonModal
        isOpen={showDetalleModal}
        onClose={() => setShowDetalleModal(false)}
        visita={visitaSeleccionada}
      />
    </div>
  )
}
