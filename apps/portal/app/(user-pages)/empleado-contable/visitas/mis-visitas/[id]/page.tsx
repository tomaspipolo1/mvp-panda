"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { DetalleVisitaComponent, type Visita, type ArchivoAdjunto } from "@/components/visitas/detalle-visita-component"
import type { ActionEvent } from "@/components/visitas/historial-acciones"

// Datos de ejemplo para visitas del empleado contable
const visitasEmpleadoContable: Visita[] = [
  {
    id: "1",
    numero: "VIS-2024-001",
    visitante: "Juan Pérez",
    empresa: "PLP",
    fechaVisita: "06/01/2024",
    horaVisita: "09:00",
    estado: "Pendiente",
    motivo: "Inspección de calidad de materiales",
    tipo: "Laboral",
    sitio: "Tecno Port S.A.",
    personas: 2,
    vehiculos: 1,
    fechaInicio: "06/01/2024",
    fechaFin: "06/01/2024",
    horaInicio: "09:00",
    horaFin: "11:00",
    observaciones: "Visita programada para inspección de calidad de materiales.",
    solicitante: "Departamento de Gerencia",
    personasDetalle: [
      {
        id: "1",
        nombre: "Juan Pérez",
        documento: "25.123.456",
        empresa: "PLP",
        mail: "juan.perez@plp.com",
        telefono: "+54 11 1234-5678",
      },
      {
        id: "2",
        nombre: "María González",
        documento: "28.789.012",
        empresa: "PLP",
        mail: "maria.gonzalez@plp.com",
        telefono: "+54 11 2345-6789",
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
    numero: "VIS-2023-156",
    visitante: "Juan Pérez",
    empresa: "Aceros del Sur S.A.",
    fechaVisita: "15/12/2023",
    horaVisita: "14:30",
    estado: "Aprobada",
    motivo: "Evaluación de capacidad productiva",
    tipo: "Guiada",
    sitio: "Aceros del Sur S.A.",
    personas: 4,
    vehiculos: 2,
    fechaInicio: "15/12/2023",
    fechaFin: "15/12/2023",
    horaInicio: "14:30",
    horaFin: "17:00",
    observaciones: "Visita guiada para evaluación de capacidad productiva.",
    solicitante: "Juan Pérez (Gerencia)",
    personasDetalle: [
      {
        id: "3",
        nombre: "Roberto Martínez",
        documento: "32.456.789",
        empresa: "Aceros del Sur S.A.",
        mail: "roberto.martinez@acerosur.com",
        telefono: "+54 11 3456-7890",
      },
      {
        id: "4",
        nombre: "Laura Sánchez",
        documento: "29.567.890",
        empresa: "Aceros del Sur S.A.",
        mail: "laura.sanchez@acerosur.com",
        telefono: "+54 11 4567-8901",
      },
      {
        id: "5",
        nombre: "Fernando Díaz",
        documento: "31.678.901",
        empresa: "Aceros del Sur S.A.",
        mail: "fernando.diaz@acerosur.com",
        telefono: "+54 11 5678-9012",
      },
      {
        id: "6",
        nombre: "Carolina Ruiz",
        documento: "28.789.012",
        empresa: "Aceros del Sur S.A.",
        mail: "carolina.ruiz@acerosur.com",
        telefono: "+54 11 6789-0123",
      },
    ],
    vehiculosDetalle: [
      {
        id: "2",
        tipo: "Camioneta",
        patente: "DEF456",
        marca: "Ford",
        modelo: "Ranger",
      },
      {
        id: "3",
        tipo: "Auto",
        patente: "GHI789",
        marca: "Chevrolet",
        modelo: "Cruze",
      },
    ],
  },
  {
    id: "3",
    numero: "VIS-2023-142",
    visitante: "María González",
    empresa: "PLP",
    fechaVisita: "10/11/2023",
    horaVisita: "08:00",
    estado: "Completada",
    motivo: "Revisión de términos contractuales",
    tipo: "Evento",
    sitio: "Sala de Reuniones A",
    personas: 3,
    vehiculos: 0,
    fechaInicio: "10/11/2023",
    fechaFin: "10/11/2023",
    horaInicio: "08:00",
    horaFin: "12:00",
    observaciones: "Reunión completada satisfactoriamente.",
    solicitante: "María González (Logística)",
    personasDetalle: [
      {
        id: "7",
        nombre: "Patricia López",
        documento: "27.890.123",
        empresa: "PLP",
        mail: "patricia.lopez@plp.com",
        telefono: "+54 11 7890-1234",
      },
      {
        id: "8",
        nombre: "Gabriel Torres",
        documento: "33.901.234",
        empresa: "PLP",
        mail: "gabriel.torres@plp.com",
        telefono: "+54 11 8901-2345",
      },
      {
        id: "9",
        nombre: "Valeria Castro",
        documento: "30.012.345",
        empresa: "PLP",
        mail: "valeria.castro@plp.com",
        telefono: "+54 11 9012-3456",
      },
    ],
    vehiculosDetalle: [],
  },
  {
    id: "4",
    numero: "VIS-2023-128",
    visitante: "Carlos Rodríguez",
    empresa: "Calidad S.A.",
    fechaVisita: "05/10/2023",
    horaVisita: "10:00",
    estado: "Cancelada",
    motivo: "Verificación de stock",
    tipo: "Materiales",
    sitio: "Almacén Central",
    personas: 2,
    vehiculos: 1,
    fechaInicio: "05/10/2023",
    fechaFin: "05/10/2023",
    horaInicio: "10:00",
    horaFin: "12:00",
    observaciones: "Visita cancelada por reorganización del almacén.",
    solicitante: "Carlos Rodríguez (Calidad)",
    personasDetalle: [
      {
        id: "10",
        nombre: "Martín Suárez",
        documento: "34.123.456",
        empresa: "Calidad S.A.",
        mail: "martin.suarez@calidad.com",
        telefono: "+54 11 1111-2222",
      },
      {
        id: "11",
        nombre: "Sofía Morales",
        documento: "35.234.567",
        empresa: "Calidad S.A.",
        mail: "sofia.morales@calidad.com",
        telefono: "+54 11 2222-3333",
      },
    ],
    vehiculosDetalle: [
      {
        id: "4",
        tipo: "Camioneta",
        patente: "JKL012",
        marca: "Volkswagen",
        modelo: "Amarok",
      },
    ],
  },
  {
    id: "5",
    numero: "VIS-2024-020",
    visitante: "Ana Martínez",
    empresa: "Suministros Industriales S.A.",
    fechaVisita: "20/01/2024",
    horaVisita: "13:00",
    estado: "Pendiente",
    motivo: "Negociación de nuevos contratos",
    tipo: "Acceso a Obra",
    sitio: "Suministros Industriales S.A.",
    personas: 3,
    vehiculos: 1,
    fechaInicio: "20/01/2024",
    fechaFin: "20/01/2024",
    horaInicio: "13:00",
    horaFin: "16:00",
    observaciones: "Negociación de términos para nuevos contratos de suministro.",
    solicitante: "Ana Martínez (Gerencia)",
    personasDetalle: [
      {
        id: "12",
        nombre: "Ricardo Vega",
        documento: "28.345.678",
        empresa: "Suministros Industriales S.A.",
        mail: "ricardo.vega@suministros.com",
        telefono: "+54 11 3333-4444",
      },
      {
        id: "13",
        nombre: "Luciana Paz",
        documento: "31.456.789",
        empresa: "Suministros Industriales S.A.",
        mail: "luciana.paz@suministros.com",
        telefono: "+54 11 4444-5555",
      },
      {
        id: "14",
        nombre: "Diego Blanco",
        documento: "29.567.890",
        empresa: "Suministros Industriales S.A.",
        mail: "diego.blanco@suministros.com",
        telefono: "+54 11 5555-6666",
      },
    ],
    vehiculosDetalle: [
      {
        id: "5",
        tipo: "Auto",
        patente: "MNO345",
        marca: "Honda",
        modelo: "Civic",
      },
    ],
  },
  {
    id: "6",
    numero: "VIS-2024-025",
    visitante: "Roberto Sánchez",
    empresa: "Finanzas Corp",
    fechaVisita: "25/01/2024",
    horaVisita: "11:00",
    estado: "Pendiente",
    motivo: "Revisión de presupuestos para nuevas adquisiciones",
    tipo: "Acceso a Muelle",
    sitio: "Oficina de Gerencia",
    personas: 5,
    vehiculos: 2,
    fechaInicio: "25/01/2024",
    fechaFin: "25/01/2024",
    horaInicio: "11:00",
    horaFin: "14:00",
    observaciones: "Reunión para revisión de presupuestos y planificación de adquisiciones.",
    solicitante: "Roberto Sánchez (Finanzas)",
    personasDetalle: [
      {
        id: "15",
        nombre: "Patricia Gómez",
        documento: "31.678.901",
        empresa: "Finanzas Corp",
        mail: "patricia.gomez@finanzascorp.com",
        telefono: "+54 11 6666-7777",
      },
      {
        id: "16",
        nombre: "Gabriel Ruiz",
        documento: "32.789.012",
        empresa: "Finanzas Corp",
        mail: "gabriel.ruiz@finanzascorp.com",
        telefono: "+54 11 7777-8888",
      },
      {
        id: "17",
        nombre: "Valeria Paz",
        documento: "33.890.123",
        empresa: "Finanzas Corp",
        mail: "valeria.paz@finanzascorp.com",
        telefono: "+54 11 8888-9999",
      },
      {
        id: "18",
        nombre: "Hernán Vega",
        documento: "34.901.234",
        empresa: "Finanzas Corp",
        mail: "hernan.vega@finanzascorp.com",
        telefono: "+54 11 9999-0000",
      },
      {
        id: "19",
        nombre: "Mónica Blanco",
        documento: "35.012.345",
        empresa: "Finanzas Corp",
        mail: "monica.blanco@finanzascorp.com",
        telefono: "+54 11 0000-1111",
      },
    ],
    vehiculosDetalle: [
      {
        id: "6",
        tipo: "Auto",
        patente: "PQR678",
        marca: "Chevrolet",
        modelo: "Cruze",
      },
      {
        id: "7",
        tipo: "Auto",
        patente: "STU901",
        marca: "Peugeot",
        modelo: "408",
      },
    ],
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

export default function DetalleVisitaEmpleadoContablePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  // Buscar la visita según el ID
  const visita = visitasEmpleadoContable.find((v) => v.id === resolvedParams.id) || visitasEmpleadoContable[0]

  const handleAceptar = () => {
    alert(`Visita ${visita.numero} aceptada`)
    router.push("/empleado-contable/visitas/mis-visitas")
  }

  const handleRechazar = () => {
    alert(`Visita ${visita.numero} rechazada`)
    router.push("/empleado-contable/visitas/mis-visitas")
  }

  const creadorDetalle = [visita.empresa, visita.visitante || visita.solicitante].filter(Boolean).join(" - ") || undefined

  const historialEventos: ActionEvent[] = [
    {
      id: "evt-1",
      timestamp: "2024-01-05T09:00:00",
      type: "created",
      message: "Solicitud creada",
      actor: visita.solicitante || visita.visitante,
      detail: creadorDetalle,
    },
    {
      id: "evt-2",
      timestamp: "2024-01-05T10:30:00",
      type: "progress",
      message: "Solicitud en proceso",
      showActor: false,
    },
    {
      id: "evt-3",
      timestamp: "2024-01-05T11:00:00",
      type: "info",
      message: "Soledad Ibáñez aprobó la solicitud",
      actor: "Soledad Ibáñez",
      detail: "Departamento de Contabilidad",
    },
    {
      id: "evt-4",
      timestamp: "2024-01-05T11:15:00",
      type: "approved",
      message: "Solicitud aprobada",
      showActor: false,
    },
  ]

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
      backUrl="/empleado-contable/visitas/mis-visitas"
      userType="empleado-contable"
      historialEventos={historialEventos}
    />
  )
}

