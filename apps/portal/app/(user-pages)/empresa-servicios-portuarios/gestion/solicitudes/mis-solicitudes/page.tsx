"use client"

import { useState } from "react"
import { Printer, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FiltrosSolicitudes } from "@/components/solicitudes/filtros-solicitudes"
import { TablaSolicitudes } from "@/components/solicitudes/tabla-solicitudes"
import { ChatModal } from "@/components/ui/chat-modal"
import { CancelarSolicitudModal } from "@/components/solicitudes/cancelar-solicitud-modal"
import { useChat } from "@/hooks/use-chat"

// Datos de ejemplo para solicitudes
const solicitudesData = [
  {
    id: "1",
    fecha: "01/04/2023",
    numero: "SOL-2023-0121",
    tipo: "Inscripción",
    asunto: "Nueva inscripción de empresa de servicios portuarios",
    estado: "Resuelta" as "Resuelta",
    ultimaActualizacion: "03/04/2023",
    descripcion: "Solicito la inscripción de mi empresa para prestar servicios portuarios en el puerto.",
    comentarios: [
      {
        id: "c1",
        fecha: "01/04/2023",
        usuario: "María González",
        texto: "Adjunto toda la documentación requerida para la inscripción.",
      },
      {
        id: "c2",
        fecha: "03/04/2023",
        usuario: "Admin",
        texto: "Documentación revisada y aprobada. Inscripción exitosa.",
      },
    ],
    historial: [
      {
        id: "h1",
        fecha: "01/04/2023",
        accion: "Creación de solicitud",
        usuario: "María González",
        comentario: null,
      },
      {
        id: "h2",
        fecha: "03/04/2023",
        accion: "Cambio de estado",
        usuario: "Admin",
        comentario: "Documentación aprobada",
      },
      {
        id: "h3",
        fecha: "03/04/2023",
        accion: "Resolución",
        usuario: "Admin",
        comentario: "Inscripción aprobada exitosamente",
      },
    ],
  },
  {
    id: "2",
    fecha: "05/04/2023",
    numero: "SOL-2023-0122",
    tipo: "Reinscripción",
    asunto: "Renovación de contrato anual de servicios",
    estado: "En proceso" as "En proceso",
    ultimaActualizacion: "05/04/2023",
    descripcion: "Solicito la renovación del contrato anual para continuar prestando servicios portuarios.",
    comentarios: [
      {
        id: "c3",
        fecha: "05/04/2023",
        usuario: "Carlos Ruiz",
        texto: "Adjunto la documentación actualizada para la renovación.",
      },
    ],
    historial: [
      {
        id: "h4",
        fecha: "05/04/2023",
        accion: "Creación de solicitud",
        usuario: "Carlos Ruiz",
        comentario: null,
      },
    ],
  },
  {
    id: "3",
    fecha: "08/04/2023",
    numero: "SOL-2023-0123",
    tipo: "Reinscripción",
    asunto: "Actualización de documentación legal y operativa",
    estado: "Resuelta" as "Resuelta",
    ultimaActualizacion: "10/04/2023",
    descripcion: "Solicito actualizar la documentación legal y operativa de mi empresa de servicios portuarios.",
    comentarios: [
      {
        id: "c4",
        fecha: "08/04/2023",
        usuario: "Ana Martínez",
        texto: "Adjunto toda la documentación actualizada.",
      },
      {
        id: "c5",
        fecha: "09/04/2023",
        usuario: "Admin",
        texto: "Documentación revisada y aprobada.",
      },
    ],
    historial: [
      {
        id: "h5",
        fecha: "08/04/2023",
        accion: "Creación de solicitud",
        usuario: "Ana Martínez",
        comentario: null,
      },
      {
        id: "h6",
        fecha: "09/04/2023",
        accion: "Cambio de estado",
        usuario: "Admin",
        comentario: "Documentación aprobada",
      },
      {
        id: "h7",
        fecha: "10/04/2023",
        accion: "Resolución",
        usuario: "Admin",
        comentario: "Solicitud aprobada y documentación actualizada",
      },
    ],
  },
  {
    id: "4",
    fecha: "10/04/2023",
    numero: "SOL-2023-0124",
    tipo: "Reclamo",
    asunto: "Disputa contractual por servicios portuarios",
    estado: "En proceso" as "En proceso",
    ultimaActualizacion: "10/04/2023",
    descripcion: "Presento reclamo por incumplimiento en los términos del contrato de servicios portuarios.",
    comentarios: [
      {
        id: "c6",
        fecha: "10/04/2023",
        usuario: "Luis Fernández",
        texto: "Adjunto evidencia del incumplimiento contractual.",
      },
    ],
    historial: [
      {
        id: "h8",
        fecha: "10/04/2023",
        accion: "Creación de solicitud",
        usuario: "Luis Fernández",
        comentario: null,
      },
    ],
  },
]

export default function MisSolicitudesPage() {
  const router = useRouter()
  const [filteredSolicitudes, setFilteredSolicitudes] = useState(solicitudesData)
  const [selectedSolicitud, setSelectedSolicitud] = useState<any>(null)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [isCancelarModalOpen, setIsCancelarModalOpen] = useState(false)

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: selectedSolicitud?.numero || '',
    usuarioActual: 'María González'
  })

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredSolicitudes(solicitudesData)
  }

  const handleVerDetalle = (solicitud: any) => {
    router.push(`/empresa-servicios-portuarios/gestion/solicitudes/mis-solicitudes/${solicitud.id}`)
  }

  const handleAbrirMensajes = (solicitud: any) => {
    setSelectedSolicitud(solicitud)
    setIsChatModalOpen(true)
  }

  const handleCancelarSolicitud = (solicitud: any) => {
    setSelectedSolicitud(solicitud)
    setIsCancelarModalOpen(true)
  }

  const handleEditar = (solicitud: any) => {
    console.log(`Editando solicitud ${solicitud.numero}:`, solicitud)
    
    // Solo permitir editar Inscripción y Reinscripción que NO estén en proceso
    if ((solicitud.tipo === "Inscripción" || solicitud.tipo === "Reinscripción") && solicitud.estado !== "En proceso") {
      // Redirigir al formulario con los datos de la solicitud
      router.push(`/empresa-servicios-portuarios/gestion/solicitudes/editar-solicitud/${solicitud.id}`)
    } else {
      // Para otros tipos de solicitud o solicitudes en proceso, mostrar mensaje
      if (solicitud.estado === "En proceso") {
        console.log("No se pueden editar solicitudes en proceso")
      } else {
        console.log("Este tipo de solicitud no se puede editar")
      }
    }
  }

  const handleConfirmCancelar = (motivo: string) => {
    console.log(`Solicitud ${selectedSolicitud?.numero} cancelada. Motivo:`, motivo)
    // Aquí iría la lógica real para cancelar la solicitud
    alert(`Solicitud ${selectedSolicitud?.numero} cancelada`)
  }

  const handleNuevaSolicitud = () => {
    router.push("/empresa-servicios-portuarios/gestion/solicitudes/nueva-solicitud")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Solicitudes</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={handleNuevaSolicitud} className="bg-black hover:bg-gray-800 text-white flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </Button>
        </div>
      </div>

      <FiltrosSolicitudes onFilter={handleFilter} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaSolicitudes
          solicitudes={filteredSolicitudes}
          onVerDetalle={handleVerDetalle}
          onAgregarComentario={handleAbrirMensajes}
          onCancelarSolicitud={handleCancelarSolicitud}
          onEditar={handleEditar}
        />
      </div>

      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        titulo={selectedSolicitud?.numero || ''}
        subtitulo={selectedSolicitud?.asunto || ''}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual="María González"
      />

      <CancelarSolicitudModal
        isOpen={isCancelarModalOpen}
        onClose={() => setIsCancelarModalOpen(false)}
        onConfirm={handleConfirmCancelar}
        solicitud={selectedSolicitud}
      />
    </div>
  )
}
