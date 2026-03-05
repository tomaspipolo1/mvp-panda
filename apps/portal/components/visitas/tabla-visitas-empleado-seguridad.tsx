"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ConfirmarAccionVisitaModal } from "@/components/visitas/confirmar-accion-visita-modal"
import { CheckIcon, XIcon, EyeIcon, StopCircleIcon, Ban, MoreVertical } from "lucide-react"
import { DetalleVisitaModal } from "@/components/visitas/detalle-visita-modal"
import { CerrarVisitaModal } from "@/components/visitas/cerrar-visita-modal"
import { CancelarVisitaModal } from "@/components/visitas/cancelar-visita-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface Visita {
  id: string
  numero: string
  visitante: string
  empresa: string
  fechaVisita: string
  horaVisita: string
  estado: string
  motivo: string
  tipo?: string
  sitio?: string
  personas?: number
  vehiculos?: number
  recurrente?: boolean
  fechaVigenciaHasta?: string
  personasDetalle?: Array<{ id: string; nombre: string; documento: string; empresa: string }>
  vehiculosDetalle?: Array<{ id: string; tipo: string; patente: string; marca: string; modelo: string }>
}

interface TablaVisitasEmpleadoSeguridadProps {
  visitas: Visita[]
  detallePath?: string // ruta base para el detalle
}

export function TablaVisitasEmpleadoSeguridad({ visitas, detallePath = "/empleado-seguridad/visitas/solicitudes" }: TablaVisitasEmpleadoSeguridadProps) {
  const router = useRouter()
  
  // Estados para modal de aprobar/rechazar
  const [modalOpen, setModalOpen] = useState(false)
  const [accion, setAccion] = useState<"aceptar" | "rechazar" | null>(null)
  const [actionVisita, setActionVisita] = useState<Visita | null>(null)
  
  // Estados para modal de cerrar visita
  const [cerrarModalOpen, setCerrarModalOpen] = useState(false)
  const [visitaACerrar, setVisitaACerrar] = useState<Visita | null>(null)
  
  // Estados para modal de cancelar visita
  const [cancelarModalOpen, setCancelarModalOpen] = useState(false)
  const [visitaACancelar, setVisitaACancelar] = useState<{id: string; fecha: string; tipo: string; sitio: string} | null>(null)

  // Función para ver detalle
  const handleVerDetalle = (visita: Visita) => {
    router.push(`${detallePath}/${visita.id}`)
  }

  const handleAprobar = (visita: Visita) => {
    setActionVisita(visita)
    setAccion("aceptar")
    setModalOpen(true)
  }

  const handleRechazar = (visita: Visita) => {
    setActionVisita(visita)
    setAccion("rechazar")
    setModalOpen(true)
  }

  const handleConfirmar = (motivo: string) => {
    // Aquí va la lógica para aprobar o rechazar la visita
    // Puedes hacer una llamada a API aquí
    setModalOpen(false)
    setAccion(null)
    setActionVisita(null)
  }
  
  const handleCerrarModal = () => {
    setModalOpen(false)
    setAccion(null)
    setActionVisita(null)
  }

  // Funciones para cerrar visita
  const handleCerrarVisita = (visita: Visita) => {
    setVisitaACerrar(visita)
    setCerrarModalOpen(true)
  }

  const handleConfirmarCerrar = (observaciones: string) => {
    // Aquí va la lógica para cerrar la visita
    // Puedes hacer una llamada a API aquí
    console.log('Cerrando visita:', visitaACerrar?.numero, 'Observaciones:', observaciones)
    setCerrarModalOpen(false)
    setVisitaACerrar(null)
  }

  const handleCerrarCerrarModal = () => {
    setCerrarModalOpen(false)
    setVisitaACerrar(null)
  }

  // Funciones para cancelar visita
  const handleCancelarVisita = (visita: Visita) => {
    // Adaptar la estructura de la visita para el modal de cancelar
    const visitaAdaptada = {
      id: visita.id,
      fecha: visita.fechaVisita,
      tipo: visita.tipo || '',
      sitio: visita.sitio || ''
    }
    setVisitaACancelar(visitaAdaptada)
    setCancelarModalOpen(true)
  }

  const handleConfirmarCancelar = (motivo: string) => {
    // Aquí va la lógica para cancelar la visita
    // Puedes hacer una llamada a API aquí
    console.log('Cancelando visita:', visitaACancelar?.id, 'Motivo:', motivo)
    setCancelarModalOpen(false)
    setVisitaACancelar(null)
  }

  const handleCerrarCancelarModal = () => {
    setCancelarModalOpen(false)
    setVisitaACancelar(null)
  }

  const canApproveReject = (tipo: string | undefined) => {
    if (!tipo) return false
    return ["Acceso a Obra", "Acceso a Muelle", "Materiales", "Laboral", "Evento"].includes(tipo)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "aceptada":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aceptada</Badge>
      case "aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      case "finalizada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Finalizada</Badge>
      case "en curso":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">En Curso</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const getTipoBadge = (tipo: string | undefined) => {
    if (!tipo) return null

    switch (tipo) {
      case "Acceso a Obra":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{tipo}</Badge>
      case "Acceso a Muelle":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{tipo}</Badge>
      case "Laboral":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{tipo}</Badge>
      case "Guiada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{tipo}</Badge>
      case "Evento":
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">{tipo}</Badge>
      case "Materiales":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">{tipo}</Badge>
      default:
        return <Badge>{tipo}</Badge>
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Número</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Visitante</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Empresa</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Hora</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Personas</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehículos</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((visita, idx) => (
              <tr
                key={visita.id}
                className={
                  (idx % 2 === 0 ? "bg-white" : "bg-gray-50") +
                  " border-b last:border-b-0 hover:bg-blue-50 transition-colors"
                }
              >
                <td className="px-4 py-3 text-sm">{visita.numero}</td>
                <td className="px-4 py-3 text-sm">{visita.visitante}</td>
                <td className="px-4 py-3 text-sm">{visita.empresa}</td>
                <td className="px-4 py-3 text-sm">{getTipoBadge(visita.tipo)}</td>
                <td className="px-4 py-3 text-sm">{visita.fechaVisita}</td>
                <td className="px-4 py-3 text-sm">{visita.horaVisita}</td>
                <td className="px-4 py-3 text-sm">{visita.personas || "-"}</td>
                <td className="px-4 py-3 text-sm">{visita.vehiculos || "-"}</td>
                <td className="px-4 py-3 text-sm">{getEstadoBadge(visita.estado)}</td>
                <td className="px-4 py-3 text-center text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleVerDetalle(visita)}>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        Ver detalle
                      </DropdownMenuItem>
                      
                      {/* Aprobar - solo para estado Pendiente */}
                      {visita.estado.toLowerCase() === "pendiente" && canApproveReject(visita.tipo) && (
                        <DropdownMenuItem onClick={() => handleAprobar(visita)}>
                          <CheckIcon className="mr-2 h-4 w-4 text-green-600" />
                          Aprobar
                        </DropdownMenuItem>
                      )}
                      
                      {/* Rechazar - solo para estado Pendiente */}
                      {visita.estado.toLowerCase() === "pendiente" && canApproveReject(visita.tipo) && (
                        <DropdownMenuItem onClick={() => handleRechazar(visita)}>
                          <XIcon className="mr-2 h-4 w-4 text-red-600" />
                          Rechazar
                        </DropdownMenuItem>
                      )}
                      
                      {/* Cancelar - para estados Pendiente y Aprobada */}
                      {(visita.estado.toLowerCase() === "pendiente" || visita.estado.toLowerCase() === "aprobada") && (
                        <DropdownMenuItem onClick={() => handleCancelarVisita(visita)}>
                          <Ban className="mr-2 h-4 w-4 text-orange-600" />
                          Cancelar
                        </DropdownMenuItem>
                      )}
                      
                      {/* Finalizar - para estado En Curso */}
                      {visita.estado.toLowerCase() === "en curso" && (
                        <DropdownMenuItem onClick={() => handleCerrarVisita(visita)}>
                          <StopCircleIcon className="mr-2 h-4 w-4 text-blue-600" />
                          Finalizar
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Confirmación para aprobar/rechazar */}
      <ConfirmarAccionVisitaModal
        isOpen={modalOpen}
        onClose={handleCerrarModal}
        onConfirm={handleConfirmar}
        accion={accion}
        visitaId={actionVisita?.numero}
      />

      {/* Modal para cerrar visita */}
      <CerrarVisitaModal
        isOpen={cerrarModalOpen}
        onClose={handleCerrarCerrarModal}
        onConfirm={handleConfirmarCerrar}
        visita={visitaACerrar ? {
          id: visitaACerrar.id,
          numero: visitaACerrar.numero,
          visitante: visitaACerrar.visitante,
          fechaVisita: visitaACerrar.fechaVisita,
          tipo: visitaACerrar.tipo || '',
          sitio: visitaACerrar.sitio || '',
          recurrente: visitaACerrar.recurrente,
          fechaVigenciaHasta: visitaACerrar.fechaVigenciaHasta
        } : null}
      />

      {/* Modal para cancelar visita */}
      <CancelarVisitaModal
        isOpen={cancelarModalOpen}
        onClose={handleCerrarCancelarModal}
        onConfirm={handleConfirmarCancelar}
        visita={visitaACancelar}
      />
    </div>
  )
}
