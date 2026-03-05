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
    fecha: "15/04/2023",
    numero: "SOL-2023-0125",
    tipo: "Trámite",
    asunto: "Actualización de información bancaria",
    estado: "En proceso" as "En proceso",
    ultimaActualizacion: "15/04/2023",
    descripcion:
      "Solicito actualizar la información bancaria de mi cuenta para recibir los pagos en una nueva cuenta del Banco Provincia.",
    comentarios: [],
    historial: [
      {
        id: "h1",
        fecha: "15/04/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
    ],
  },
  {
    id: "2",
    fecha: "10/04/2023",
    numero: "SOL-2023-0124",
    tipo: "Trámite",
    asunto: "Solicitud de certificado de cumplimiento",
    estado: "En proceso" as "En proceso",
    ultimaActualizacion: "12/04/2023",
    descripcion:
      "Solicito certificado de cumplimiento de servicios prestados durante el año 2023 para presentar en una licitación externa.",
    comentarios: [
      {
        id: "c1",
        fecha: "12/04/2023",
        usuario: "Administrador",
        texto:
          "Se está procesando su solicitud. El certificado estará disponible en 48 horas hábiles.",
      },
    ],
    historial: [
      {
        id: "h1",
        fecha: "10/04/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
      {
        id: "h2",
        fecha: "12/04/2023",
        accion: "Cambio de estado",
        usuario: "Administrador",
        comentario: "Cambio a En Proceso",
      },
    ],
  },
  {
    id: "3",
    fecha: "05/04/2023",
    numero: "SOL-2023-0123",
    tipo: "Reclamo",
    asunto: "Facturación incorrecta",
    estado: "Resuelta" as "Resuelta",
    ultimaActualizacion: "08/04/2023",
    descripcion:
      "La factura N° FC-2023-0089 contiene un error en el monto total. El valor correcto debería ser $45,780.00 en lugar de $54,780.00.",
    comentarios: [
      {
        id: "c1",
        fecha: "06/04/2023",
        usuario: "Administrador",
        texto: "Estamos revisando la factura mencionada. Nos comunicaremos a la brevedad.",
      },
      {
        id: "c2",
        fecha: "08/04/2023",
        usuario: "Administrador",
        texto:
          "Se ha emitido una nota de crédito por la diferencia. La encontrará disponible en la sección de facturas.",
      },
    ],
    historial: [
      {
        id: "h1",
        fecha: "05/04/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
      {
        id: "h2",
        fecha: "06/04/2023",
        accion: "Cambio de estado",
        usuario: "Administrador",
        comentario: "Cambio a En Proceso",
      },
      {
        id: "h3",
        fecha: "08/04/2023",
        accion: "Cambio de estado",
        usuario: "Administrador",
        comentario: "Cambio a Resuelta",
      },
    ],
  },
  {
    id: "4",
    fecha: "28/03/2023",
    numero: "SOL-2023-0122",
    tipo: "Consulta",
    asunto: "Información sobre licitación",
    estado: "Rechazada" as "Rechazada",
    ultimaActualizacion: "30/03/2023",
    descripcion:
      "Quisiera obtener más información sobre la licitación LIC-2023-0118 respecto a los requisitos técnicos específicos para la presentación.",
    comentarios: [
      {
        id: "c1",
        fecha: "30/03/2023",
        usuario: "Administrador",
        texto:
          "Esta consulta debe realizarse a través del sistema de consultas específico de la licitación. Por favor, utilice la opción 'Ver consultas' en la sección de licitaciones.",
      },
    ],
    historial: [
      {
        id: "h1",
        fecha: "28/03/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
      {
        id: "h2",
        fecha: "30/03/2023",
        accion: "Cambio de estado",
        usuario: "Administrador",
        comentario: "Cambio a Rechazada",
      },
    ],
  },
  {
    id: "5",
    fecha: "20/03/2023",
    numero: "SOL-2023-0121",
    tipo: "Trámite",
    asunto: "Actualización de domicilio fiscal",
    estado: "Cancelada" as "Cancelada",
    ultimaActualizacion: "21/03/2023",
    descripcion:
      "Solicito actualizar el domicilio fiscal de la empresa debido a una mudanza de oficinas.",
    comentarios: [],
    historial: [
      {
        id: "h1",
        fecha: "20/03/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
      {
        id: "h2",
        fecha: "21/03/2023",
        accion: "Cancelación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud cancelada por el usuario",
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
    usuarioActual: 'Mariano Hernández'
  })

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredSolicitudes(solicitudesData)
  }

  const handleVerDetalle = (solicitud: any) => {
    router.push(`/proveedor/gestion/solicitudes/mis-solicitudes/${solicitud.id}`)
  }

  const handleAbrirMensajes = (solicitud: any) => {
    setSelectedSolicitud(solicitud)
    setIsChatModalOpen(true)
  }

  const handleCancelarSolicitud = (solicitud: any) => {
    setSelectedSolicitud(solicitud)
    setIsCancelarModalOpen(true)
  }

  const handleConfirmCancelar = (motivo: string) => {
    console.log(`Solicitud ${selectedSolicitud?.numero} cancelada. Motivo:`, motivo)
    // Aquí iría la lógica real para cancelar la solicitud
    alert(`Solicitud ${selectedSolicitud?.numero} cancelada`)
  }

  const handleNuevaSolicitud = () => {
    router.push("/proveedor/gestion/solicitudes/nueva-solicitud")
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
        />
      </div>

      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        titulo={selectedSolicitud?.numero || ''}
        subtitulo={selectedSolicitud?.asunto || ''}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual="Mariano Hernández"
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
