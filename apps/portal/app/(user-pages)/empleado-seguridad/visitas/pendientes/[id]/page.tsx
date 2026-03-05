"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { DetalleVisitaComponent, type Visita, type ArchivoAdjunto } from "@/components/visitas/detalle-visita-component"
import type { ActionEvent } from "@/components/visitas/historial-acciones"

const mapEstadoToFinalEvent = (estado: string): { type: ActionEvent["type"]; message: string } => {
  const normalized = estado.toLowerCase()

  if (normalized === "aprobada" || normalized === "aprobado") {
    return { type: "approved", message: "Solicitud aprobada" }
  }

  if (normalized === "rechazada" || normalized === "rechazado") {
    return { type: "rejected", message: "Solicitud rechazada" }
  }

  if (normalized === "pendiente") {
    return { type: "progress", message: "Solicitud en proceso" }
  }

  if (normalized === "cancelada" || normalized === "cancelado") {
    return { type: "info", message: "Solicitud cancelada" }
  }

  if (normalized === "en curso") {
    return { type: "info", message: "Solicitud en curso" }
  }

  if (normalized === "finalizada" || normalized === "completada") {
    return { type: "info", message: "Solicitud finalizada" }
  }

  return { type: "info", message: `Solicitud ${normalized}` }
}

export default function DetalleVisitaPendientePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  // Datos de ejemplo para visitas pendientes
  const visitasPendientes: Visita[] = [
    {
      id: "1",
      numero: "ACC-2023-045",
      visitante: "Roberto Gómez",
      empresa: "Logística ABC",
      fechaVisita: "20/05/2023",
      horaVisita: "10:00",
      estado: "Pendiente",
      motivo: "Inspección de seguridad",
      tipo: "Acceso a Obra",
      sitio: "Terminal 1",
      personas: 3,
      vehiculos: 1,
      fechaInicio: "20/05/2023",
      fechaFin: "20/05/2023",
      horaInicio: "10:00",
      horaFin: "18:00",
      observaciones: "Inspección de seguridad programada para revisar las instalaciones del Terminal 1.",
      personasDetalle: [
        { id: "p1", nombre: "Roberto Gómez", documento: "12345678", empresa: "Logística ABC", mail: "roberto.gomez@abc.com", telefono: "+54 11 1234-5678" },
        { id: "p2", nombre: "Juan Pérez", documento: "23456789", empresa: "Logística ABC", telefono: "+54 11 2345-6789" },
        { id: "p3", nombre: "Ana Torres", documento: "34567890", empresa: "Logística ABC", mail: "ana.torres@abc.com" },
      ],
      vehiculosDetalle: [
        { id: "v1", tipo: "Camioneta", patente: "AB123CD", marca: "Toyota", modelo: "Hilux" },
      ],
    },
    {
      id: "2",
      numero: "ACC-2023-046",
      visitante: "Laura Sánchez",
      empresa: "Transportes XYZ",
      fechaVisita: "21/05/2023",
      horaVisita: "14:30",
      estado: "Pendiente",
      motivo: "Supervisión de carga",
      tipo: "Acceso a Muelle",
      sitio: "Muelle Sur",
      personas: 2,
      vehiculos: 0,
      fechaInicio: "21/05/2023",
      fechaFin: "21/05/2023",
      horaInicio: "14:30",
      horaFin: "17:00",
      observaciones: "Supervisión de operaciones de carga en el Muelle Sur.",
      personasDetalle: [
        { id: "p4", nombre: "Laura Sánchez", documento: "45678901", empresa: "Transportes XYZ", mail: "laura.sanchez@xyz.com", telefono: "+54 11 3456-7890" },
        { id: "p5", nombre: "Carlos Ruiz", documento: "56789012", empresa: "Transportes XYZ", telefono: "+54 11 4567-8901" },
      ],
      vehiculosDetalle: [],
    },
    {
      id: "3",
      numero: "EVT-2023-047",
      visitante: "Miguel Fernández",
      empresa: "Consultora Marítima",
      fechaVisita: "22/05/2023",
      horaVisita: "09:15",
      estado: "Aprobada",
      motivo: "Inauguración",
      tipo: "Evento",
      sitio: "Salón Principal",
      personas: 25,
      vehiculos: 5,
      fechaInicio: "22/05/2023",
      fechaFin: "22/05/2023",
      horaInicio: "09:15",
      horaFin: "14:00",
      observaciones: "Evento de inauguración con presencia de autoridades.",
      
      
    },
    {
      id: "4",
      numero: "ACC-2023-048",
      visitante: "Ana Martínez",
      empresa: "Servicios Portuarios",
      fechaVisita: "22/05/2023",
      horaVisita: "11:30",
      estado: "Pendiente",
      motivo: "Grupo escolar",
      tipo: "Guiada",
      sitio: "Terminal Principal",
      personas: 30,
      vehiculos: 1,
      fechaInicio: "22/05/2023",
      fechaFin: "22/05/2023",
      horaInicio: "11:30",
      horaFin: "14:30",
      observaciones: "Visita guiada para grupo escolar con fines educativos.",
      personasDetalle: [
        { id: "p7", nombre: "Ana Martínez", documento: "78901234", empresa: "Servicios Portuarios", mail: "ana.martinez@portuarios.com", telefono: "+54 11 6789-0123" },
      ],
      vehiculosDetalle: [
        { id: "v4", tipo: "Colectivo", patente: "GH012IJ", marca: "Iveco", modelo: "Daily" },
      ],
    },
    {
      id: "5",
      numero: "ACC-2023-049",
      visitante: "Carlos Rodríguez",
      empresa: "Constructora Puerto",
      fechaVisita: "23/05/2023",
      horaVisita: "08:00",
      estado: "Rechazada",
      motivo: "Entrega de equipos",
      tipo: "Materiales",
      sitio: "Almacén Central",
      personas: 4,
      vehiculos: 2,
      fechaInicio: "23/05/2023",
      fechaFin: "23/05/2023",
      horaInicio: "08:00",
      horaFin: "12:00",
      observaciones: "Solicitud rechazada por documentación incompleta.",
      personasDetalle: [
        { id: "p8", nombre: "Carlos Rodríguez", documento: "89012345", empresa: "Constructora Puerto", mail: "carlos.rodriguez@puerto.com", telefono: "+54 11 7890-1234" },
      ],
      vehiculosDetalle: [
        { id: "v5", tipo: "Camión", patente: "IJ345KL", marca: "Scania", modelo: "R450" },
        { id: "v6", tipo: "Camioneta", patente: "KL678MN", marca: "Volkswagen", modelo: "Amarok" },
      ],
    },
    {
      id: "6",
      numero: "ACC-2023-050",
      visitante: "María López",
      empresa: "Recursos Humanos S.A.",
      fechaVisita: "24/05/2023",
      horaVisita: "07:45",
      estado: "Pendiente",
      motivo: "Capacitación de personal",
      tipo: "Laboral",
      sitio: "Sala de Capacitación",
      personas: 12,
      vehiculos: 0,
      fechaInicio: "24/05/2023",
      fechaFin: "24/05/2023",
      horaInicio: "07:45",
      horaFin: "16:00",
      observaciones: "Capacitación de personal en normativas de seguridad portuaria.",
      personasDetalle: [
        { id: "p9", nombre: "María López", documento: "90123456", empresa: "Recursos Humanos S.A.", mail: "maria.lopez@rhsa.com", telefono: "+54 11 8901-2345" },
        { id: "p10", nombre: "Pedro Gómez", documento: "91234567", empresa: "Recursos Humanos S.A.", telefono: "+54 11 9012-3456" },
      ],
      vehiculosDetalle: [],
    },
  ]

  // Buscar la visita según el ID
  const visita = visitasPendientes.find((v) => v.id === resolvedParams.id) || visitasPendientes[0]

  // Documentos de ejemplo
  const documentos: ArchivoAdjunto[] = [
    { nombre: "ART.pdf", archivo: "art.pdf", tipo: "ART" },
    { nombre: "Seguro_Vehiculo.pdf", archivo: "seguro-vehiculo.pdf", tipo: "Seguro del vehículo" },
    { nombre: "Permiso_Acceso.pdf", archivo: "permiso-acceso.pdf", tipo: "Permiso" },
    { nombre: "Certificado_Capacitacion.pdf", archivo: "certificado-capacitacion.pdf", tipo: "Certificado" },
    { nombre: "Cedula_Verde.pdf", archivo: "cedula-verde.pdf", tipo: "Cédula verde vehículo" },
    { nombre: "DNI_Conductor.pdf", archivo: "dni-conductor.pdf", tipo: "DNI conductor" },
    { nombre: "Licencia_Conducir.pdf", archivo: "licencia-conducir.pdf", tipo: "Licencia de conducir" },
  ]

  const handleAprobar = () => {
    alert(`Visita ${visita.numero} aprobada`)
    router.push("/empleado-seguridad/visitas/pendientes")
  }

  const handleRechazar = () => {
    alert(`Visita ${visita.numero} rechazada`)
    router.push("/empleado-seguridad/visitas/pendientes")
  }

  const creadorDetalle = [visita.empresa, visita.visitante].filter(Boolean).join(" - ") || undefined
  const finalEvent = mapEstadoToFinalEvent(visita.estado)

  const historialEventos: ActionEvent[] = [
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
      timestamp: "2024-01-05T10:00:00",
      type: "progress",
      message: "Solicitud en proceso",
      showActor: false,
    },
    {
      id: "evt-3",
      timestamp: "2024-01-05T11:00:00",
      type: "info",
      message: "Equipo de Seguridad revisó la solicitud",
      actor: "Equipo de Seguridad",
      detail: "Control de accesos",
    },
    {
      id: "evt-4",
      timestamp: "2024-01-05T12:00:00",
      ...finalEvent,
      showActor: false,
    },
  ]

  return (
    <DetalleVisitaComponent
      visita={visita}
      documentos={documentos}
      acciones={{
        canApprove: visita.estado === "Pendiente",
        canReject: visita.estado === "Pendiente",
        onApprove: handleAprobar,
        onReject: handleRechazar,
      }}
      backUrl="/empleado-seguridad/visitas/pendientes"
      userType="empleado-seguridad"
      historialEventos={historialEventos}
    />
  )
} 
