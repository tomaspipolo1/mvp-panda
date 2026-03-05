"use client"

import { useState } from "react"
import { Eye, Check, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmarAccionModal } from "@/components/camiones/confirmar-accion-modal"
import { DetalleSolicitudModal } from "@/components/camiones/detalle-solicitud-modal"
import { TablaSolicitudesCamiones, SolicitudCamion } from "@/components/camiones/tabla-solicitudes-camiones"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function CamionesPendientesPage() {
  const router = useRouter()
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [selectedSolicitud, setSelectedSolicitud] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [accion, setAccion] = useState<"aceptar" | "rechazar" | null>(null)
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")
  const [busqueda, setBusqueda] = useState("")
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [solicitudCancelar, setSolicitudCancelar] = useState<SolicitudCamion | null>(null)

  const solicitudes = [
    {
      id: "SOL-2023-001",
      persona: "Carlos Rodríguez",
      dni: "28456789",
      patente: "AB123CD",
      fecha: "2023-05-15",
      hora: "09:30",
      estado: "pendiente",
      tipoCarga: "Materiales",
    },
    {
      id: "SOL-2023-002",
      persona: "María González",
      dni: "30987654",
      patente: "XY456ZW",
      fecha: "2023-05-16",
      hora: "14:45",
      estado: "pendiente",
      tipoCarga: "Maquinaria",
    },
    {
      id: "SOL-2023-003",
      persona: "Juan Pérez",
      dni: "25678901",
      patente: "CD789EF",
      fecha: "2023-05-17",
      hora: "11:15",
      estado: "pendiente",
      tipoCarga: "Líquidos",
    },
    {
      id: "SOL-2023-004",
      persona: "Laura Martínez",
      dni: "32456123",
      patente: "GH012IJ",
      fecha: "2023-05-18",
      hora: "08:00",
      estado: "pendiente",
      tipoCarga: "Contenedores",
    },
    {
      id: "SOL-2023-005",
      persona: "Roberto Sánchez",
      dni: "27890345",
      patente: "KL345MN",
      fecha: "2023-05-19",
      hora: "16:30",
      estado: "pendiente",
      tipoCarga: "Granos",
    },
  ]

  // Filtrado
  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const estadoOk = estado === "todos" || solicitud.estado === estado
    const desdeOk = !fechaDesde || solicitud.fecha >= fechaDesde
    const hastaOk = !fechaHasta || solicitud.fecha <= fechaHasta
    const textoBusqueda = busqueda.trim().toLowerCase()
    const matchBusqueda =
      !textoBusqueda ||
      [
        solicitud.id,
        solicitud.persona,
        solicitud.patente
      ]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(textoBusqueda))
    return estadoOk && desdeOk && hastaOk && matchBusqueda
  })

  const handleViewDetail = (solicitud: any) => {
    router.push(`/empleado-seguridad/visitas/camiones/pendientes/${solicitud.id}`)
  }

  const handleAction = (solicitud: any, action: "approve" | "reject") => {
    setSelectedSolicitud(solicitud)
    setAccion(action === "approve" ? "aceptar" : "rechazar")
    setModalOpen(true)
  }

  const handleConfirmar = (motivo: string) => {
    // Aquí va la lógica para aprobar o rechazar la solicitud
    // Puedes hacer una llamada a API aquí
    setModalOpen(false)
    setAccion(null)
    setSelectedSolicitud(null)
  }
  const handleCerrarModal = () => {
    setModalOpen(false)
    setAccion(null)
    setSelectedSolicitud(null)
  }

  const handleCancelar = (solicitud: SolicitudCamion) => {
    setSolicitudCancelar(solicitud)
    setIsCancelModalOpen(true)
  }

  const handleConfirmCancelar = (motivo: string) => {
    // Aquí va la lógica real de cancelación (API, etc.)
    alert(`Solicitud ${solicitudCancelar?.id} cancelada. Motivo: ${motivo}`)
    setSolicitudCancelar(null)
    setIsCancelModalOpen(false)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 rounded-full px-4 py-1 font-semibold">Pendiente</Badge>
      case "aprobado":
      case "aprobada":
        return <Badge className="bg-green-100 text-green-800 rounded-full px-4 py-1 font-semibold">Aprobada</Badge>
      case "rechazado":
      case "rechazada":
        return <Badge className="bg-red-100 text-red-800 rounded-full px-4 py-1 font-semibold">Rechazada</Badge>
      case "finalizada":
        return <Badge className="bg-purple-100 text-purple-800 rounded-full px-4 py-1 font-semibold">Finalizada</Badge>
      case "en curso":
        return <Badge className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-semibold">En Curso</Badge>
      default:
        return <Badge className="bg-gray-200 text-gray-800 rounded-full px-4 py-1 font-semibold">{estado}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Solicitudes de Acceso</h1>
      {/* Filtros: Card separado */}
      <div className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 px-6 py-6">
          <h3 className="text-xl font-bold mb-4">Filtros</h3>
          <form
            className="flex flex-col md:flex-row md:items-end md:gap-6 gap-4"
            onSubmit={e => { e.preventDefault() }}
          >
            {/* Fecha Desde */}
            <div className="flex flex-col w-40 min-w-[5rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
              <input
                type="date"
                className="w-40 border rounded px-3 py-2"
                value={fechaDesde}
                onChange={e => setFechaDesde(e.target.value)}
              />
            </div>
            {/* Fecha Hasta */}
            <div className="flex flex-col w-40 min-w-[10rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
              <input
                type="date"
                className="w-40 border rounded px-3 py-2"
                value={fechaHasta}
                onChange={e => setFechaHasta(e.target.value)}
              />
            </div>
            {/* Botones */}
            <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
              <button
                type="button"
                className="border rounded px-4 py-2 text-sm"
                onClick={() => {
                  setEstado("todos");
                  setFechaDesde("");
                  setFechaHasta("");
                }}
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
      <Card className="mb-6 shadow-md">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle>Solicitudes de Transporte de cargas Pendientes</CardTitle>
          <Input
            placeholder="Buscar por número, persona o patente..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full md:w-80"
          />
        </CardHeader>
        <CardContent className="p-8">
          <TablaSolicitudesCamiones
            solicitudes={solicitudesFiltradas}
            onVerDetalle={handleViewDetail}
            onAprobar={solicitud => handleAction(solicitud, "approve")}
            onRechazar={solicitud => handleAction(solicitud, "reject")}
            showActions={true}
            onCancelar={handleCancelar}
          />
            </CardContent>
        </Card>
      <ConfirmarAccionModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancelar}
        title="Cancelar solicitud"
        description="¿Está seguro que desea cancelar esta solicitud? Puede ingresar un motivo (opcional)."
        confirmText="Cancelar"
        confirmVariant="destructive"
      />
    </div>
  )
}

