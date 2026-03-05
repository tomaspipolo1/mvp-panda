"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { DetalleVisitaComponent, type Visita, type ArchivoAdjunto } from "@/components/visitas/detalle-visita-component"
import Swal from "sweetalert2"
import { showSuccess, showConfirm } from "@/lib/sweetalert"

// Tipo de visita para usuario-basico (basado en la interfaz Visita de tabla-visitas)
export interface VisitaUsuarioBasico {
  id: string | number
  numero?: string
  fecha: string
  hora: string
  tipo: string // Laboral, Guiada, Evento
  destino: string
  personas: number
  estado: string // Pendiente, Aceptada, Rechazada, Finalizada, En curso, Cancelada
  fechaInicio?: string
  fechaFin?: string
  horaInicio?: string
  horaFin?: string
  motivo?: string
  observaciones?: string
  entidad?: string
  personalVisita?: string
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

// Datos de ejemplo para visitas del usuario básico
export const visitasUsuarioBasico: VisitaUsuarioBasico[] = [
  {
    id: "1",
    numero: "VIS-2024-001",
    fecha: "15/05/2023",
    hora: "10:00 AM",
    tipo: "Laboral",
    destino: "Oficinas administrativas",
    entidad: "Empresa ABC",
    personas: 3,
    estado: "Pendiente",
    fechaInicio: "15/05/2023",
    fechaFin: "15/05/2023",
    horaInicio: "10:00",
    horaFin: "12:00",
    motivo: "Reunión de trabajo con el equipo de logística para coordinar próximos envíos.",
    observaciones: "Se requiere estacionamiento para los vehículos.",
    personasDetalle: [
      {
        id: "1",
        nombre: "Juan Pérez",
        documento: "30.123.456",
        empresa: "Empresa ABC",
        mail: "juan.perez@empresaabc.com",
        telefono: "+54 11 1234-5678",
      },
      {
        id: "2",
        nombre: "María López",
        documento: "29.876.543",
        empresa: "Empresa ABC",
        mail: "maria.lopez@empresaabc.com",
        telefono: "+54 11 2345-6789",
      },
      {
        id: "3",
        nombre: "Carlos Rodríguez",
        documento: "31.567.890",
        empresa: "Empresa ABC",
        mail: "carlos.rodriguez@empresaabc.com",
        telefono: "+54 11 3456-7890",
      },
    ],
    vehiculosDetalle: [
      {
        id: "1",
        tipo: "Auto",
        patente: "ABC123",
        marca: "Toyota",
        modelo: "Corolla",
      },
    ],
  },
  {
    id: "2",
    numero: "VIS-2024-002",
    fecha: "20/05/2023",
    hora: "2:30 PM",
    tipo: "Guiada",
    destino: "TecPlata",
    entidad: "Compañía XYZ",
    personas: 2,
    estado: "Aceptada",
    fechaInicio: "20/05/2023",
    fechaFin: "20/05/2023",
    horaInicio: "14:30",
    horaFin: "16:00",
    motivo: "Visita guiada para conocer las instalaciones del puerto.",
    observaciones: "Grupo reducido, visita guiada estándar.",
    personasDetalle: [
      {
        id: "4",
        nombre: "Ana Martínez",
        documento: "32.111.222",
        empresa: "Compañía XYZ",
        mail: "ana.martinez@companiaxyz.com",
        telefono: "+54 11 4567-8901",
      },
      {
        id: "5",
        nombre: "Luis García",
        documento: "28.222.333",
        empresa: "Compañía XYZ",
        mail: "luis.garcia@companiaxyz.com",
        telefono: "+54 11 5678-9012",
      },
    ],
    vehiculosDetalle: [],
  },
  {
    id: "3",
    numero: "VIS-2024-003",
    fecha: "10/05/2023",
    hora: "9:15 AM",
    tipo: "Evento",
    destino: "Museo",
    entidad: "Corporación 123",
    personas: 4,
    estado: "Finalizada",
    fechaInicio: "10/05/2023",
    fechaFin: "10/05/2023",
    horaInicio: "09:15",
    horaFin: "11:30",
    motivo: "Participación en evento cultural del puerto.",
    observaciones: "Evento completado exitosamente.",
    personasDetalle: [
      {
        id: "6",
        nombre: "Roberto Sánchez",
        documento: "27.333.444",
        empresa: "Corporación 123",
        mail: "roberto.sanchez@corporacion123.com",
        telefono: "+54 11 6789-0123",
      },
      {
        id: "7",
        nombre: "Laura Fernández",
        documento: "33.444.555",
        empresa: "Corporación 123",
        mail: "laura.fernandez@corporacion123.com",
        telefono: "+54 11 7890-1234",
      },
      {
        id: "8",
        nombre: "Diego Morales",
        documento: "26.555.666",
        empresa: "Corporación 123",
        mail: "diego.morales@corporacion123.com",
        telefono: "+54 11 8901-2345",
      },
      {
        id: "9",
        nombre: "Carmen Ruiz",
        documento: "34.666.777",
        empresa: "Corporación 123",
        mail: "carmen.ruiz@corporacion123.com",
        telefono: "+54 11 9012-3456",
      },
    ],
    vehiculosDetalle: [
      {
        id: "2",
        tipo: "Camioneta",
        patente: "XYZ789",
        marca: "Ford",
        modelo: "Ranger",
      },
    ],
  },
  {
    id: "4",
    numero: "VIS-2024-004",
    fecha: "05/05/2023",
    hora: "11:45 AM",
    tipo: "Laboral",
    destino: "Oficinas administrativas",
    entidad: "Empresa ABC",
    personas: 2,
    estado: "Rechazada",
    fechaInicio: "05/05/2023",
    fechaFin: "05/05/2023",
    horaInicio: "11:45",
    horaFin: "13:00",
    motivo: "Reunión de negocios para tratar nuevos contratos.",
    observaciones: "Visita rechazada por falta de documentación requerida.",
    personasDetalle: [
      {
        id: "10",
        nombre: "Patricia Gómez",
        documento: "31.777.888",
        empresa: "Empresa ABC",
        mail: "patricia.gomez@empresaabc.com",
        telefono: "+54 11 0123-4567",
      },
      {
        id: "11",
        nombre: "Gabriel Torres",
        documento: "29.888.999",
        empresa: "Empresa ABC",
        mail: "gabriel.torres@empresaabc.com",
        telefono: "+54 11 1234-5678",
      },
    ],
    vehiculosDetalle: [
      {
        id: "3",
        tipo: "Auto",
        patente: "DEF456",
        marca: "Volkswagen",
        modelo: "Gol",
      },
    ],
  },
  {
    id: "5",
    numero: "VIS-2024-005",
    fecha: "25/05/2023",
    hora: "3:00 PM",
    tipo: "Evento",
    destino: "Museo",
    entidad: "Organización DEF",
    personas: 10,
    estado: "En curso",
    fechaInicio: "25/05/2023",
    fechaFin: "25/05/2023",
    horaInicio: "15:00",
    horaFin: "17:30",
    motivo: "Presentación de proyecto educativo sobre el puerto.",
    observaciones: "Evento en desarrollo, se espera finalización a las 17:30.",
    personasDetalle: [
      {
        id: "12",
        nombre: "Mónica Blanco",
        documento: "35.999.000",
        empresa: "Organización DEF",
        mail: "monica.blanco@organizaciondef.com",
        telefono: "+54 11 2345-6789",
      },
      {
        id: "13",
        nombre: "Hernán Vega",
        documento: "30.000.111",
        empresa: "Organización DEF",
        mail: "hernan.vega@organizaciondef.com",
        telefono: "+54 11 3456-7890",
      },
      {
        id: "14",
        nombre: "Valeria Paz",
        documento: "36.111.222",
        empresa: "Organización DEF",
        mail: "valeria.paz@organizaciondef.com",
        telefono: "+54 11 4567-8901",
      },
      {
        id: "15",
        nombre: "Fernando López",
        documento: "27.222.333",
        empresa: "Organización DEF",
        mail: "fernando.lopez@organizaciondef.com",
        telefono: "+54 11 5678-9012",
      },
      {
        id: "16",
        nombre: "Sofía Martín",
        documento: "37.333.444",
        empresa: "Organización DEF",
        mail: "sofia.martin@organizaciondef.com",
        telefono: "+54 11 6789-0123",
      },
      {
        id: "17",
        nombre: "Javier Castro",
        documento: "28.444.555",
        empresa: "Organización DEF",
        mail: "javier.castro@organizaciondef.com",
        telefono: "+54 11 7890-1234",
      },
      {
        id: "18",
        nombre: "Carolina Díaz",
        documento: "38.555.666",
        empresa: "Organización DEF",
        mail: "carolina.diaz@organizaciondef.com",
        telefono: "+54 11 8901-2345",
      },
      {
        id: "19",
        nombre: "Eduardo Silva",
        documento: "29.666.777",
        empresa: "Organización DEF",
        mail: "eduardo.silva@organizaciondef.com",
        telefono: "+54 11 9012-3456",
      },
      {
        id: "20",
        nombre: "Natalia Ramos",
        documento: "39.777.888",
        empresa: "Organización DEF",
        mail: "natalia.ramos@organizaciondef.com",
        telefono: "+54 11 0123-4567",
      },
      {
        id: "21",
        nombre: "Alejandro Mendoza",
        documento: "30.888.999",
        empresa: "Organización DEF",
        mail: "alejandro.mendoza@organizaciondef.com",
        telefono: "+54 11 1234-5678",
      },
    ],
    vehiculosDetalle: [
      {
        id: "4",
        tipo: "Micro",
        patente: "GHI789",
        marca: "Mercedes-Benz",
        modelo: "Sprinter",
      },
    ],
  },
  {
    id: "6",
    numero: "VIS-2024-006",
    fecha: "25/05/2023",
    hora: "4:00 PM",
    tipo: "Evento",
    destino: "TecPlata",
    entidad: "Organización DEF",
    personas: 10,
    estado: "Cancelada",
    fechaInicio: "25/05/2023",
    fechaFin: "25/05/2023",
    horaInicio: "16:00",
    horaFin: "18:00",
    motivo: "Taller de capacitación sobre procesos portuarios.",
    observaciones: "Evento cancelado por motivos de fuerza mayor.",
    personasDetalle: [],
    vehiculosDetalle: [],
  },
  {
    id: "7",
    numero: "VIS-2024-007",
    fecha: "30/05/2023",
    hora: "10:00 AM",
    tipo: "Laboral",
    destino: "Oficinas administrativas",
    entidad: "Empresa GHI",
    personas: 0, // Pendiente de completar
    estado: "Pendiente",
    fechaInicio: "30/05/2023",
    fechaFin: "30/05/2023",
    horaInicio: "10:00",
    horaFin: "12:00",
    motivo: "Reunión con gerencia para revisión de contratos. El empleado interno ha programado la visita y requiere que complete los datos de personas y vehículos.",
    observaciones: "Visita precargada por personal del puerto. Se requiere completar lista de personas y vehículos para proceder.",
    personalVisita: "María González - Gerente de Operaciones",
    personasDetalle: [], // Sin personas aún - requiere completar
    vehiculosDetalle: [], // Sin vehículos aún - requiere completar
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

// Función para convertir VisitaUsuarioBasico a Visita (del componente)
const convertirVisitaParaComponente = (visitaBasica: VisitaUsuarioBasico): Visita => {
  return {
    id: visitaBasica.id.toString(),
    numero: visitaBasica.numero || `VIS-${visitaBasica.id}`,
    visitante: visitaBasica.entidad || "Usuario",
    empresa: visitaBasica.entidad || "",
    fechaVisita: visitaBasica.fecha,
    horaVisita: visitaBasica.hora,
    estado: visitaBasica.estado,
    motivo: visitaBasica.motivo || "",
    tipo: visitaBasica.tipo,
    sitio: visitaBasica.destino,
    personas: visitaBasica.personas,
    vehiculos: visitaBasica.vehiculosDetalle?.length || 0,
    personasDetalle: visitaBasica.personasDetalle || [],
    vehiculosDetalle: visitaBasica.vehiculosDetalle || [],
    fechaInicio: visitaBasica.fechaInicio,
    fechaFin: visitaBasica.fechaFin,
    horaInicio: visitaBasica.horaInicio,
    horaFin: visitaBasica.horaFin,
    observaciones: visitaBasica.observaciones,
    descripcion: visitaBasica.motivo,
  }
}

export default function DetalleVisitaUsuarioBasicoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  // Buscar la visita según el ID
  const visitaBasica = visitasUsuarioBasico.find((v) => v.id.toString() === resolvedParams.id) || visitasUsuarioBasico[0]
  const visita = convertirVisitaParaComponente(visitaBasica)

  const handleAceptar = async () => {
    const result = await showConfirm(
      "¿Aceptar visita?",
      `¿Desea aceptar la visita ${visita.numero}?`,
      "Sí, aceptar",
      "Cancelar"
    )

    if (result.isConfirmed) {
      await showSuccess("Visita aceptada", `La visita ${visita.numero} ha sido aceptada correctamente.`)
      router.push("/usuario-basico/visitas/mis-visitas")
    }
  }

  const handleRechazar = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Rechazar visita?",
      html: `
        <div style="text-align: left;">
          <p style="margin-bottom: 16px; color: #374151;">
            ¿Desea rechazar la visita <strong>${visita.numero}</strong>?
          </p>
          <label for="swal-motivo-rechazo" style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
            Motivo del rechazo <span style="color: #DC2626;">*</span>
          </label>
          <textarea
            id="swal-motivo-rechazo"
            class="swal2-input"
            placeholder="Ingrese el motivo del rechazo..."
            rows="4"
            style="width: 100%; min-height: 100px; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; resize: vertical; font-size: 14px;"
          ></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Sí, rechazar",
      cancelButtonText: "Cancelar",
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
        const motivo = (document.getElementById("swal-motivo-rechazo") as HTMLTextAreaElement)?.value
        if (!motivo || motivo.trim() === "") {
          Swal.showValidationMessage("Debe ingresar un motivo para rechazar la visita")
          return false
        }
        return motivo.trim()
      },
    })

    if (result.isConfirmed) {
      await showSuccess("Visita rechazada", `La visita ${visita.numero} ha sido rechazada correctamente.`)
      router.push("/usuario-basico/visitas/mis-visitas")
    }
  }

  return (
    <DetalleVisitaComponent
      visita={visita}
      documentos={documentosEjemplo}
      acciones={{
        canApprove: visita.estado === "Pendiente",
        canReject: visita.estado === "Pendiente",
        onApprove: handleAceptar,
        onReject: handleRechazar,
      }}
      backUrl="/usuario-basico/visitas/mis-visitas"
      userType="empleado-seguridad"
    />
  )
}
