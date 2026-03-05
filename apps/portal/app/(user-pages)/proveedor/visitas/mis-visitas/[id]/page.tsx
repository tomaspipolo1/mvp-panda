"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { DetalleVisitaComponent, type Visita, type ArchivoAdjunto } from "@/components/visitas/detalle-visita-component"
import type { ActionEvent } from "@/components/visitas/historial-acciones"
import Swal from "sweetalert2"
import { showSuccess } from "@/lib/sweetalert"

// Tipo de visita para proveedor
export interface VisitaProveedor {
  id: string | number
  numero?: string
  fecha: string
  hora: string
  tipo: string // Laboral, Acceso a Muelle, Obras/Mantenimiento, Transporte de cargas
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

// Datos de ejemplo para visitas del proveedor
export const visitasProveedor: VisitaProveedor[] = [
  {
    id: "1",
    numero: "VIS-PROV-2024-001",
    fecha: "06/01/2024",
    hora: "09:00",
    tipo: "Laboral",
    destino: "Sitio 1",
    sitio: "Sitio 1",
    personas: 2,
    vehiculos: 1,
    estado: "Pendiente",
    motivo: "Mantenimiento de equipos informáticos",
    fechaInicio: "06/01/2024",
    fechaFin: "06/01/2024",
    horaInicio: "09:00",
    horaFin: "17:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Juan Pérez",
        documento: "25.456.789",
        empresa: "Suministros Industriales S.A.",
      },
      {
        id: "p2",
        nombre: "María López",
        documento: "30.123.456",
        empresa: "Suministros Industriales S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Camioneta",
        patente: "AB123CD",
        marca: "Toyota",
        modelo: "Hilux",
      },
    ],
    observaciones: "Se requiere acceso a la sala de servidores.",
  },
  {
    id: "2",
    numero: "VIS-PROV-2024-002",
    fecha: "15/12/2023",
    hora: "08:00",
    tipo: "Acceso a Muelle",
    destino: "Sitio 3",
    sitio: "Sitio 3",
    personas: 4,
    vehiculos: 2,
    estado: "Aprobada",
    motivo: "Descarga de materiales",
    fechaInicio: "15/12/2023",
    fechaFin: "15/12/2023",
    horaInicio: "08:00",
    horaFin: "16:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Roberto Gómez",
        documento: "20.789.456",
        empresa: "Suministros Industriales S.A.",
      },
      {
        id: "p2",
        nombre: "Carlos Sánchez",
        documento: "22.456.123",
        empresa: "Suministros Industriales S.A.",
      },
      {
        id: "p3",
        nombre: "Ana Martínez",
        documento: "28.123.789",
        empresa: "Suministros Industriales S.A.",
      },
      {
        id: "p4",
        nombre: "Luis Rodríguez",
        documento: "31.456.789",
        empresa: "Suministros Industriales S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Camión",
        patente: "XY789ZW",
        marca: "Mercedes-Benz",
        modelo: "Actros",
      },
      {
        id: "v2",
        tipo: "Camioneta",
        patente: "CD456EF",
        marca: "Ford",
        modelo: "Ranger",
      },
    ],
    observaciones: "Se requiere grúa para descarga de materiales pesados.",
  },
  {
    id: "3",
    numero: "VIS-PROV-2024-003",
    fecha: "10/11/2023",
    hora: "10:00",
    tipo: "Transporte de cargas",
    destino: "Sitio 2",
    sitio: "Sitio 2",
    personas: 1,
    vehiculos: 1,
    estado: "Completada",
    motivo: "Transporte de contenedores con mercadería",
    fechaInicio: "10/11/2023",
    fechaFin: "10/11/2023",
    horaInicio: "10:00",
    horaFin: "12:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Pedro Fernández",
        documento: "27.123.456",
        empresa: "Suministros Industriales S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Utilitario",
        patente: "GH789IJ",
        marca: "Renault",
        modelo: "Kangoo",
      },
    ],
    observaciones: "Entrega realizada en tiempo y forma.",
  },
  {
    id: "4",
    numero: "VIS-PROV-2024-004",
    fecha: "05/10/2023",
    hora: "14:00",
    tipo: "Obras/Mantenimiento",
    destino: "Sitio 4",
    sitio: "Sitio 4",
    personas: 8,
    vehiculos: 0,
    estado: "Cancelada",
    motivo: "Reparación de infraestructura portuaria",
    fechaInicio: "05/10/2023",
    fechaFin: "05/10/2023",
    horaInicio: "14:00",
    horaFin: "16:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Laura Giménez",
        documento: "24.789.123",
        empresa: "Universidad Nacional",
      },
      {
        id: "p2",
        nombre: "Martín Torres",
        documento: "25.123.789",
        empresa: "Universidad Nacional",
      },
      {
        id: "p3",
        nombre: "Sofía Ramírez",
        documento: "26.456.123",
        empresa: "Universidad Nacional",
      },
      {
        id: "p4",
        nombre: "Javier López",
        documento: "27.789.456",
        empresa: "Universidad Nacional",
      },
      {
        id: "p5",
        nombre: "Valentina Pérez",
        documento: "28.123.456",
        empresa: "Universidad Nacional",
      },
      {
        id: "p6",
        nombre: "Matías González",
        documento: "29.456.789",
        empresa: "Universidad Nacional",
      },
      {
        id: "p7",
        nombre: "Lucía Fernández",
        documento: "30.789.123",
        empresa: "Universidad Nacional",
      },
      {
        id: "p8",
        nombre: "Nicolás Martínez",
        documento: "31.123.456",
        empresa: "Universidad Nacional",
      },
    ],
    vehiculosDetalle: [],
    observaciones: "Cancelada por mal tiempo.",
  },
  {
    id: "5",
    numero: "VIS-PROV-2024-005",
    fecha: "20/01/2024",
    hora: "11:00",
    tipo: "Laboral",
    destino: "Sitio 1",
    sitio: "Sitio 1",
    personas: 3,
    vehiculos: 1,
    estado: "Aprobada",
    motivo: "Instalación de nuevo sistema de seguridad",
    fechaInicio: "20/01/2024",
    fechaFin: "20/01/2024",
    horaInicio: "11:00",
    horaFin: "15:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Carlos Mendoza",
        documento: "32.111.222",
        empresa: "Seguridad Técnica S.A.",
      },
      {
        id: "p2",
        nombre: "Patricia Ruiz",
        documento: "33.222.333",
        empresa: "Seguridad Técnica S.A.",
      },
      {
        id: "p3",
        nombre: "Miguel Ángel Torres",
        documento: "34.333.444",
        empresa: "Seguridad Técnica S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Camioneta",
        patente: "JK456LM",
        marca: "Chevrolet",
        modelo: "S10",
      },
    ],
    observaciones: "Instalación programada para el mediodía.",
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

// Función para convertir VisitaProveedor a Visita (del componente)
const convertirVisitaParaComponente = (visitaProveedor: VisitaProveedor): Visita => {
  return {
    id: visitaProveedor.id.toString(),
    numero: visitaProveedor.numero || `VIS-PROV-${visitaProveedor.id}`,
    visitante: visitaProveedor.personasDetalle?.[0]?.nombre || "Proveedor",
    empresa: visitaProveedor.personasDetalle?.[0]?.empresa || "Proveedor",
    fechaVisita: visitaProveedor.fecha,
    horaVisita: visitaProveedor.hora,
    estado: visitaProveedor.estado,
    motivo: visitaProveedor.motivo || "",
    tipo: visitaProveedor.tipo,
    sitio: visitaProveedor.destino || visitaProveedor.sitio || "",
    personas: visitaProveedor.personas,
    vehiculos: visitaProveedor.vehiculos || visitaProveedor.vehiculosDetalle?.length || 0,
    personasDetalle: visitaProveedor.personasDetalle || [],
    vehiculosDetalle: visitaProveedor.vehiculosDetalle || [],
    fechaInicio: visitaProveedor.fechaInicio,
    fechaFin: visitaProveedor.fechaFin,
    horaInicio: visitaProveedor.horaInicio,
    horaFin: visitaProveedor.horaFin,
    observaciones: visitaProveedor.observaciones,
    descripcion: visitaProveedor.motivo,
  }
}

export default function DetalleVisitaProveedorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  // Buscar la visita según el ID
  const visitaProveedor = visitasProveedor.find((v) => v.id.toString() === resolvedParams.id) || visitasProveedor[0]
  const visita = convertirVisitaParaComponente(visitaProveedor)

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
      router.push("/proveedor/visitas/mis-visitas")
    }
  }

  const creadorDetalle = [visita.empresa, visita.visitante].filter(Boolean).join(" - ") || undefined

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
      timestamp: "2024-01-05T10:30:00",
      type: "progress",
      message: "Solicitud en proceso",
    },
    {
      id: "evt-3",
      timestamp: "2024-01-05T12:00:00",
      type: "approved",
      message: "Solicitud aprobada",
    },
  ]

  return (
    <DetalleVisitaComponent
      visita={visita}
      documentos={documentosEjemplo}
      acciones={{
        canCancel: visita.estado === "Pendiente" || visita.estado === "Aprobada",
        onCancel: handleCancelar,
      }}
      backUrl="/proveedor/visitas/mis-visitas"
      userType="empleado-seguridad"
      historialEventos={historialEventos}
    />
  )
}

