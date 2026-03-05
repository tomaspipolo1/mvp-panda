"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { DetalleVisitaComponent, type Visita, type ArchivoAdjunto } from "@/components/visitas/detalle-visita-component"
import type { ActionEvent } from "@/components/visitas/historial-acciones"
import Swal from "sweetalert2"
import { showSuccess } from "@/lib/sweetalert"

// Tipo de visita para cliente
export interface VisitaCliente {
  id: string | number
  numero?: string
  fecha: string
  hora: string
  tipo: string // Laboral, Guiada, Evento, Materiales, Acceso a Obra, Acceso a Muelle
  destino: string
  sitio?: string // Alternativa a destino
  personas: number
  estado: string // Pendiente, Aprobada, Rechazada, Completada, Cancelada
  fechaInicio?: string
  fechaFin?: string
  horaInicio?: string
  horaFin?: string
  motivo?: string
  observaciones?: string
  vehiculos?: number
  personaVisitada?: string
  personasDetalle?: Array<{
    id: string
    nombre: string
    documento: string
    empresa: string
    mail?: string
    telefono?: string
  }>
  vehiculosDetalle?: Array<{
    id: string
    tipo: string
    patente: string
    marca: string
    modelo: string
  }>
}

// Datos de ejemplo para visitas del cliente
export const visitasCliente: VisitaCliente[] = [
  {
    id: "1",
    numero: "VIS-CLI-2024-001",
    fecha: "12/01/2024",
    hora: "10:00",
    tipo: "Laboral",
    destino: "PLP - Oficinas Administrativas",
    sitio: "PLP - Oficinas Administrativas",
    personas: 2,
    vehiculos: 1,
    estado: "Pendiente",
    motivo: "Reunión de negocios con el equipo de logística",
    personaVisitada: "María González - Gerente de Operaciones",
    fechaInicio: "12/01/2024",
    fechaFin: "12/01/2024",
    horaInicio: "10:00",
    horaFin: "12:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Carlos Rodríguez",
        documento: "30.123.456",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p2",
        nombre: "Ana Martínez",
        documento: "29.876.543",
        empresa: "Empresa Cliente S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Automóvil",
        patente: "ABC123",
        marca: "Toyota",
        modelo: "Corolla",
      },
    ],
    observaciones: "Se requiere estacionamiento para el vehículo.",
  },
  {
    id: "2",
    numero: "VIS-CLI-2024-002",
    fecha: "18/12/2023",
    hora: "14:30",
    tipo: "Guiada",
    destino: "Terminal TEC Plata",
    sitio: "Terminal TEC Plata",
    personas: 5,
    vehiculos: 0,
    estado: "Aprobada",
    motivo: "Visita guiada para conocer las instalaciones del puerto",
    fechaInicio: "18/12/2023",
    fechaFin: "18/12/2023",
    horaInicio: "14:30",
    horaFin: "16:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Luis García",
        documento: "28.222.333",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p2",
        nombre: "Patricia López",
        documento: "31.333.444",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p3",
        nombre: "Roberto Sánchez",
        documento: "27.444.555",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p4",
        nombre: "Laura Fernández",
        documento: "32.555.666",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p5",
        nombre: "Diego Morales",
        documento: "26.666.777",
        empresa: "Empresa Cliente S.A.",
      },
    ],
    vehiculosDetalle: [],
    observaciones: "Grupo reducido, visita guiada estándar.",
  },
  {
    id: "3",
    numero: "VIS-CLI-2024-003",
    fecha: "05/11/2023",
    hora: "09:15",
    tipo: "Evento",
    destino: "Museo",
    sitio: "Museo",
    personas: 8,
    vehiculos: 1,
    estado: "Completada",
    motivo: "Participación en evento cultural del puerto",
    fechaInicio: "05/11/2023",
    fechaFin: "05/11/2023",
    horaInicio: "09:15",
    horaFin: "11:30",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Carmen Ruiz",
        documento: "33.777.888",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p2",
        nombre: "Gabriel Torres",
        documento: "29.888.999",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p3",
        nombre: "Mónica Blanco",
        documento: "34.999.000",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p4",
        nombre: "Hernán Vega",
        documento: "30.000.111",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p5",
        nombre: "Valeria Paz",
        documento: "35.111.222",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p6",
        nombre: "Fernando López",
        documento: "27.222.333",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p7",
        nombre: "Sofía Martín",
        documento: "36.333.444",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p8",
        nombre: "Javier Castro",
        documento: "28.444.555",
        empresa: "Empresa Cliente S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Camioneta",
        patente: "XYZ789",
        marca: "Ford",
        modelo: "Ranger",
      },
    ],
    observaciones: "Evento completado exitosamente.",
  },
  {
    id: "4",
    numero: "VIS-CLI-2024-004",
    fecha: "22/10/2023",
    hora: "11:00",
    tipo: "Materiales",
    destino: "Deposito Fiscal",
    sitio: "Deposito Fiscal",
    personas: 1,
    vehiculos: 1,
    estado: "Aprobada",
    motivo: "Entrega de documentación y materiales",
    fechaInicio: "22/10/2023",
    fechaFin: "22/10/2023",
    horaInicio: "11:00",
    horaFin: "13:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Carolina Díaz",
        documento: "37.555.666",
        empresa: "Empresa Cliente S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Utilitario",
        patente: "DEF456",
        marca: "Renault",
        modelo: "Kangoo",
      },
    ],
    observaciones: "Entrega realizada en tiempo y forma.",
  },
  {
    id: "5",
    numero: "VIS-CLI-2024-005",
    fecha: "15/01/2024",
    hora: "08:00",
    tipo: "Acceso a Obra",
    destino: "PLP - Obras e Ingenieria",
    sitio: "PLP - Obras e Ingenieria",
    personas: 3,
    vehiculos: 1,
    estado: "Pendiente",
    motivo: "Supervisión de obras en curso",
    fechaInicio: "15/01/2024",
    fechaFin: "15/01/2024",
    horaInicio: "08:00",
    horaFin: "17:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Eduardo Silva",
        documento: "29.666.777",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p2",
        nombre: "Natalia Ramos",
        documento: "38.777.888",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p3",
        nombre: "Alejandro Mendoza",
        documento: "30.888.999",
        empresa: "Empresa Cliente S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Camioneta",
        patente: "GHI789",
        marca: "Chevrolet",
        modelo: "S10",
      },
    ],
    observaciones: "Se requiere casco y elementos de seguridad.",
  },
  {
    id: "6",
    numero: "VIS-CLI-2024-006",
    fecha: "25/12/2023",
    hora: "07:30",
    tipo: "Acceso a Muelle",
    destino: "Zona Operativa/Muelles",
    sitio: "Zona Operativa/Muelles",
    personas: 2,
    vehiculos: 1,
    estado: "Aprobada",
    motivo: "Inspección de contenedores",
    fechaInicio: "25/12/2023",
    fechaFin: "25/12/2023",
    horaInicio: "07:30",
    horaFin: "12:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Ricardo Pérez",
        documento: "31.999.000",
        empresa: "Empresa Cliente S.A.",
      },
      {
        id: "p2",
        nombre: "María José Torres",
        documento: "39.000.111",
        empresa: "Empresa Cliente S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Automóvil",
        patente: "JKL012",
        marca: "Volkswagen",
        modelo: "Gol",
      },
    ],
    observaciones: "Inspección programada para la mañana.",
  },
]

// Documentos de ejemplo
const documentosEjemplo: ArchivoAdjunto[] = [
  { nombre: "ART.pdf", archivo: "art.pdf", tipo: "ART" },
  { nombre: "Seguro_Vehiculo.pdf", archivo: "seguro-vehiculo.pdf", tipo: "Seguro del vehículo" },
  { nombre: "Permiso_Acceso.pdf", archivo: "permiso-acceso.pdf", tipo: "Permiso" },
  { nombre: "Certificado_Capacitacion.pdf", archivo: "certificado-capacitacion.pdf", tipo: "Certificado" },
  { nombre: "Cedula_Verde.pdf", archivo: "cedula-verde.pdf", tipo: "Cédula verde vehículo" },
  { nombre: "DNI_Conductor.pdf", archivo: "dni-conductor.pdf", tipo: "DNI conductor" },
  { nombre: "Licencia_Conducir.pdf", archivo: "licencia-conducir.pdf", tipo: "Licencia de conducir" },
]

// Función para convertir VisitaCliente a Visita (del componente)
const convertirVisitaParaComponente = (visitaCliente: VisitaCliente): Visita => {
  return {
    id: visitaCliente.id.toString(),
    numero: visitaCliente.numero || `VIS-CLI-${visitaCliente.id}`,
    visitante: visitaCliente.personasDetalle?.[0]?.nombre || "Cliente",
    empresa: visitaCliente.personasDetalle?.[0]?.empresa || "Cliente",
    fechaVisita: visitaCliente.fecha,
    horaVisita: visitaCliente.hora,
    estado: visitaCliente.estado,
    motivo: visitaCliente.motivo || "",
    tipo: visitaCliente.tipo,
    sitio: visitaCliente.destino || visitaCliente.sitio || "",
    personas: visitaCliente.personas,
    vehiculos: visitaCliente.vehiculos || visitaCliente.vehiculosDetalle?.length || 0,
    personasDetalle: visitaCliente.personasDetalle || [],
    vehiculosDetalle: visitaCliente.vehiculosDetalle || [],
    fechaInicio: visitaCliente.fechaInicio,
    fechaFin: visitaCliente.fechaFin,
    horaInicio: visitaCliente.horaInicio,
    horaFin: visitaCliente.horaFin,
    observaciones: visitaCliente.observaciones,
    descripcion: visitaCliente.motivo,
    personalVisita: visitaCliente.personaVisitada,
  }
}

const stageConfigs: Record<
  "approved" | "rejected" | "cancelled" | "inCourse" | "finalized",
  { type: ActionEvent["type"]; message: string }
> = {
  approved: { type: "approved", message: "Solicitud aprobada" },
  rejected: { type: "rejected", message: "Solicitud rechazada" },
  cancelled: { type: "info", message: "Solicitud cancelada" },
  inCourse: { type: "info", message: "Solicitud en curso" },
  finalized: { type: "info", message: "Solicitud finalizada" },
}

const buildHistorialEventos = (visita: Visita): ActionEvent[] => {
  const creadorDetalle = [visita.empresa, visita.visitante].filter(Boolean).join(" - ") || undefined
  const normalizedEstado = visita.estado.toLowerCase()

  const eventosBase: ActionEvent[] = [
    {
      id: "evt-1",
      timestamp: "2024-01-05T09:00:00",
      type: "created",
      message: "Solicitud creada",
      actor: visita.visitante,
      detail: creadorDetalle,
    },
    {
      id: "evt-2",
      timestamp: "2024-01-05T10:30:00",
      type: "progress",
      message: "Solicitud en proceso",
      showActor: false,
    },
  ]

  const addStage = (config: { type: ActionEvent["type"]; message: string }) => {
    eventosBase.push({
      id: `evt-${eventosBase.length + 1}`,
      timestamp: `2024-01-05T${(9 + eventosBase.length).toString().padStart(2, "0")}:00:00`,
      ...config,
      showActor: false,
    })
  }

  if (normalizedEstado === "pendiente") {
    return eventosBase
  }

  if (normalizedEstado === "rechazada") {
    addStage(stageConfigs.rejected)
    return eventosBase
  }

  if (normalizedEstado === "cancelada") {
    addStage(stageConfigs.cancelled)
    return eventosBase
  }

  if (normalizedEstado === "aprobada" || normalizedEstado === "aceptada") {
    addStage(stageConfigs.approved)
    return eventosBase
  }

  if (normalizedEstado === "en curso") {
    addStage(stageConfigs.approved)
    addStage(stageConfigs.inCourse)
    return eventosBase
  }

  if (normalizedEstado === "completada" || normalizedEstado === "finalizada" || normalizedEstado === "realizada") {
    addStage(stageConfigs.approved)
    addStage(stageConfigs.inCourse)
    addStage(stageConfigs.finalized)
    return eventosBase
  }

  // Estado no contemplado explícitamente -> mostrar evento informativo
  addStage({ type: "info", message: `Solicitud ${visita.estado}` })
  return eventosBase
}

export default function DetalleVisitaClientePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  // Buscar la visita según el ID
  const visitaCliente = visitasCliente.find((v) => v.id.toString() === resolvedParams.id) || visitasCliente[0]
  const visita = convertirVisitaParaComponente(visitaCliente)
  const historialEventos = buildHistorialEventos(visita)

  const handleCancelar = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Cancelar visita?",
      html: `
        <div style="text-align: left;">
          <p style="margin-bottom: 16px; color: #374151;">
            ¿Desea cancelar la visita <strong>${visita.numero}</strong>? Esta acción no se puede deshacer.
          </p>
          <label for="swal-motivo-cancelacion" style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
            Motivo de la cancelación <span style="color: #DC2626;">*</span>
          </label>
          <textarea
            id="swal-motivo-cancelacion"
            class="swal2-input"
            placeholder="Ingrese el motivo de la cancelación..."
            rows="4"
            style="width: 100%; min-height: 100px; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; resize: vertical; font-size: 14px;"
          ></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      reverseButtons: true,
      customClass: {
        popup: "rounded-lg shadow-xl",
        title: "text-lg font-semibold",
        htmlContainer: "text-sm",
        confirmButton: "rounded-md px-4 py-2 font-medium",
        cancelButton: "rounded-md px-4 py-2 font-medium",
      },
      preConfirm: () => {
        const motivo = (document.getElementById("swal-motivo-cancelacion") as HTMLTextAreaElement)?.value
        if (!motivo || motivo.trim() === "") {
          Swal.showValidationMessage("Debe ingresar un motivo para cancelar la visita")
          return false
        }
        return motivo.trim()
      },
    })

    if (result.isConfirmed) {
      await showSuccess("Visita cancelada", `La visita ${visita.numero} ha sido cancelada correctamente.`)
      router.push("/cliente/visitas/mis-visitas")
    }
  }

  return (
    <DetalleVisitaComponent
      visita={visita}
      documentos={documentosEjemplo}
      acciones={{
        canCancel: visita.estado === "Pendiente" || visita.estado === "Aprobada",
        onCancel: handleCancelar,
      }}
      backUrl="/cliente/visitas/mis-visitas"
      userType="cliente"
      historialEventos={historialEventos}
    />
  )
}

