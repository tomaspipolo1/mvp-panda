"use client"

import { use } from "react"
import { DetalleVisitaComponent, Visita, Persona, Vehiculo, ArchivoAdjunto } from "@/components/visitas/detalle-visita-component"
import type { ActionEvent } from "@/components/visitas/historial-acciones"

// Datos de ejemplo para las visitas de prensa
const visitasPrensa: Visita[] = [
  {
    id: "1",
    numero: "VIS-2024-PR-001",
    visitante: "Juan Pérez",
    empresa: "Diario La Nación",
    fechaVisita: "06/01/2024",
    horaVisita: "10:00",
    estado: "Pendiente",
    motivo: "Reunión para discutir cobertura de prensa del nuevo proyecto",
    tipo: "Laboral",
    sitio: "Oficina Central",
    personas: 2,
    vehiculos: 1,
    fechaInicio: "06/01/2024",
    fechaFin: "06/01/2024",
    horaInicio: "10:00",
    horaFin: "12:00",
    solicitante: "Juan Pérez (Proveedor)",
    descripcion: "Reunión para discutir cobertura de prensa del nuevo proyecto",
    personasDetalle: [
      {
        id: "1",
        nombre: "Juan Pérez",
        documento: "DNI 25.456.789",
        empresa: "Diario La Nación",
        mail: "jperez@lanacion.com.ar",
        telefono: "+54 11 4567-8901",
      },
      {
        id: "2",
        nombre: "María Rodríguez",
        documento: "DNI 30.123.456",
        empresa: "Diario La Nación",
        mail: "mrodriguez@lanacion.com.ar",
        telefono: "+54 11 4567-8902",
      },
    ],
    vehiculosDetalle: [
      {
        id: "1",
        tipo: "Automóvil",
        patente: "ABC123",
        marca: "Toyota",
        modelo: "Corolla",
      },
    ],
  },
  {
    id: "2",
    numero: "VIS-2024-PR-002",
    visitante: "Carlos Martínez",
    empresa: "Departamento de Marketing",
    fechaVisita: "15/12/2023",
    horaVisita: "14:00",
    estado: "Aprobada",
    motivo: "Presentación de nueva campaña",
    tipo: "Evento",
    sitio: "Auditorio Principal",
    personas: 4,
    vehiculos: 2,
    fechaInicio: "15/12/2023",
    fechaFin: "15/12/2023",
    horaInicio: "14:00",
    horaFin: "18:00",
    solicitante: "Departamento de Marketing",
    descripcion: "Presentación de nueva campaña",
    personasDetalle: [
      {
        id: "1",
        nombre: "Carlos Martínez",
        documento: "DNI 28.789.456",
        empresa: "Departamento de Marketing",
        mail: "cmartinez@empresa.com",
        telefono: "+54 11 5555-1234",
      },
      {
        id: "2",
        nombre: "Ana López",
        documento: "DNI 32.456.789",
        empresa: "Departamento de Marketing",
        mail: "alopez@empresa.com",
        telefono: "+54 11 5555-1235",
      },
      {
        id: "3",
        nombre: "Roberto García",
        documento: "DNI 29.123.456",
        empresa: "Agencia Creativa",
        mail: "rgarcia@agencia.com",
        telefono: "+54 11 5555-1236",
      },
      {
        id: "4",
        nombre: "Laura Fernández",
        documento: "DNI 31.789.123",
        empresa: "Agencia Creativa",
        mail: "lfernandez@agencia.com",
        telefono: "+54 11 5555-1237",
      },
    ],
    vehiculosDetalle: [
      {
        id: "1",
        tipo: "Automóvil",
        patente: "DEF456",
        marca: "Ford",
        modelo: "Focus",
      },
      {
        id: "2",
        tipo: "Camioneta",
        patente: "GHI789",
        marca: "Chevrolet",
        modelo: "S10",
      },
    ],
  },
  {
    id: "3",
    numero: "VIS-2024-PR-003",
    visitante: "María González",
    empresa: "Empresa",
    fechaVisita: "10/11/2023",
    horaVisita: "11:00",
    estado: "Completada",
    motivo: "Entrevista para boletín interno",
    tipo: "Laboral",
    sitio: "Sala de Reuniones B",
    personas: 1,
    vehiculos: 1,
    fechaInicio: "10/11/2023",
    fechaFin: "10/11/2023",
    horaInicio: "11:00",
    horaFin: "12:30",
    solicitante: "María González (Empleado)",
    descripcion: "Entrevista para boletín interno",
    personasDetalle: [
      {
        id: "1",
        nombre: "María González",
        documento: "DNI 27.654.321",
        empresa: "Empresa",
        mail: "mgonzalez@empresa.com",
        telefono: "+54 11 4444-5678",
      },
    ],
    vehiculosDetalle: [
      {
        id: "1",
        tipo: "Automóvil",
        patente: "JKL012",
        marca: "Volkswagen",
        modelo: "Gol",
      },
    ],
  },
  {
    id: "4",
    numero: "VIS-2024-PR-004",
    visitante: "Colegio San Martín",
    empresa: "Colegio San Martín",
    fechaVisita: "05/10/2023",
    horaVisita: "09:00",
    estado: "Cancelada",
    motivo: "Visita educativa para estudiantes",
    tipo: "Visita Guiada",
    sitio: "Instalaciones Portuarias",
    personas: 8,
    vehiculos: 0,
    fechaInicio: "05/10/2023",
    fechaFin: "05/10/2023",
    horaInicio: "09:00",
    horaFin: "13:00",
    solicitante: "Colegio San Martín",
    descripcion: "Visita educativa para estudiantes",
    personasDetalle: [
      {
        id: "1",
        nombre: "Prof. Roberto Sánchez",
        documento: "DNI 22.345.678",
        empresa: "Colegio San Martín",
        mail: "rsanchez@colegiosanmartin.edu.ar",
        telefono: "+54 11 3333-4567",
      },
      {
        id: "2",
        nombre: "Pedro Gómez",
        documento: "DNI 45.123.456",
        empresa: "Colegio San Martín",
        mail: "",
        telefono: "",
      },
      {
        id: "3",
        nombre: "Lucía Ramírez",
        documento: "DNI 46.234.567",
        empresa: "Colegio San Martín",
        mail: "",
        telefono: "",
      },
      {
        id: "4",
        nombre: "Martín Torres",
        documento: "DNI 45.345.678",
        empresa: "Colegio San Martín",
        mail: "",
        telefono: "",
      },
      {
        id: "5",
        nombre: "Carolina Silva",
        documento: "DNI 46.456.789",
        empresa: "Colegio San Martín",
        mail: "",
        telefono: "",
      },
      {
        id: "6",
        nombre: "Diego Moreno",
        documento: "DNI 45.567.890",
        empresa: "Colegio San Martín",
        mail: "",
        telefono: "",
      },
      {
        id: "7",
        nombre: "Valentina Castro",
        documento: "DNI 46.678.901",
        empresa: "Colegio San Martín",
        mail: "",
        telefono: "",
      },
      {
        id: "8",
        nombre: "Sebastián Ruiz",
        documento: "DNI 45.789.012",
        empresa: "Colegio San Martín",
        mail: "",
        telefono: "",
      },
    ],
    vehiculosDetalle: [],
  },
  {
    id: "5",
    numero: "VIS-2024-PR-005",
    visitante: "Universidad Nacional",
    empresa: "Universidad Nacional",
    fechaVisita: "20/01/2024",
    horaVisita: "15:00",
    estado: "Pendiente",
    motivo: "Visita académica para estudiantes de Logística",
    tipo: "Visita Guiada",
    sitio: "Zona Operativa",
    personas: 12,
    vehiculos: 1,
    fechaInicio: "20/01/2024",
    fechaFin: "20/01/2024",
    horaInicio: "15:00",
    horaFin: "18:00",
    solicitante: "Universidad Nacional",
    descripcion: "Visita académica para estudiantes de Logística",
    personasDetalle: [
      {
        id: "1",
        nombre: "Dr. Alberto Fernández",
        documento: "DNI 20.123.456",
        empresa: "Universidad Nacional",
        mail: "afernandez@universidad.edu.ar",
        telefono: "+54 11 2222-3456",
      },
      {
        id: "2",
        nombre: "Estudiante 1",
        documento: "DNI 44.111.222",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "3",
        nombre: "Estudiante 2",
        documento: "DNI 44.222.333",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "4",
        nombre: "Estudiante 3",
        documento: "DNI 44.333.444",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "5",
        nombre: "Estudiante 4",
        documento: "DNI 44.444.555",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "6",
        nombre: "Estudiante 5",
        documento: "DNI 44.555.666",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "7",
        nombre: "Estudiante 6",
        documento: "DNI 44.666.777",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "8",
        nombre: "Estudiante 7",
        documento: "DNI 44.777.888",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "9",
        nombre: "Estudiante 8",
        documento: "DNI 44.888.999",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "10",
        nombre: "Estudiante 9",
        documento: "DNI 44.999.000",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "11",
        nombre: "Estudiante 10",
        documento: "DNI 45.000.111",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
      {
        id: "12",
        nombre: "Estudiante 11",
        documento: "DNI 45.111.222",
        empresa: "Universidad Nacional",
        mail: "",
        telefono: "",
      },
    ],
    vehiculosDetalle: [
      {
        id: "1",
        tipo: "Minibús",
        patente: "MNO345",
        marca: "Mercedes Benz",
        modelo: "Sprinter",
      },
    ],
  },
  {
    id: "6",
    numero: "VIS-2024-PR-006",
    visitante: "Carlos Rodríguez",
    empresa: "Canal 7 Televisión",
    fechaVisita: "25/01/2024",
    horaVisita: "16:00",
    estado: "Pendiente",
    motivo: "Reunión para coordinar entrevista sobre nuevo servicio",
    tipo: "Laboral",
    sitio: "Oficina de Prensa",
    personas: 3,
    vehiculos: 1,
    fechaInicio: "25/01/2024",
    fechaFin: "25/01/2024",
    horaInicio: "16:00",
    horaFin: "17:30",
    solicitante: "Carlos Rodríguez (Cliente)",
    descripcion: "Reunión para coordinar entrevista sobre nuevo servicio",
    personasDetalle: [
      {
        id: "1",
        nombre: "Carlos Rodríguez",
        documento: "DNI 26.789.012",
        empresa: "Canal 7 Televisión",
        mail: "crodriguez@canal7.com",
        telefono: "+54 11 6666-7890",
      },
      {
        id: "2",
        nombre: "Camarógrafo 1",
        documento: "DNI 33.456.789",
        empresa: "Canal 7 Televisión",
        mail: "produccion@canal7.com",
        telefono: "+54 11 6666-7891",
      },
      {
        id: "3",
        nombre: "Asistente de Producción",
        documento: "DNI 34.567.890",
        empresa: "Canal 7 Televisión",
        mail: "produccion@canal7.com",
        telefono: "+54 11 6666-7892",
      },
    ],
    vehiculosDetalle: [
      {
        id: "1",
        tipo: "Camioneta",
        patente: "PQR678",
        marca: "Ford",
        modelo: "Ranger",
      },
    ],
  },
]

// Documentos de ejemplo para las visitas
const documentosVisitas: Record<string, ArchivoAdjunto[]> = {
  "1": [
    {
      nombre: "dni-juan-perez.pdf",
      archivo: "dni-juan-perez.pdf",
      tipo: "DNI del visitante",
    },
    {
      nombre: "carta-solicitud-prensa.pdf",
      archivo: "carta-solicitud-prensa.pdf",
      tipo: "Carta de solicitud",
    },
  ],
  "2": [
    {
      nombre: "propuesta-campana.pdf",
      archivo: "propuesta-campana.pdf",
      tipo: "Propuesta de campaña",
    },
  ],
  "3": [
    {
      nombre: "autorizacion-entrevista.pdf",
      archivo: "autorizacion-entrevista.pdf",
      tipo: "Autorización de entrevista",
    },
  ],
  "4": [
    {
      nombre: "nota-colegio.pdf",
      archivo: "nota-colegio.pdf",
      tipo: "Nota del colegio",
    },
    {
      nombre: "listado-estudiantes.pdf",
      archivo: "listado-estudiantes.pdf",
      tipo: "Listado de estudiantes",
    },
  ],
  "5": [
    {
      nombre: "carta-universidad.pdf",
      archivo: "carta-universidad.pdf",
      tipo: "Carta de la universidad",
    },
    {
      nombre: "listado-estudiantes-universidad.pdf",
      archivo: "listado-estudiantes-universidad.pdf",
      tipo: "Listado de estudiantes",
    },
  ],
  "6": [
    {
      nombre: "acreditacion-prensa.pdf",
      archivo: "acreditacion-prensa.pdf",
      tipo: "Acreditación de prensa",
    },
    {
      nombre: "seguro-equipos.pdf",
      archivo: "seguro-equipos.pdf",
      tipo: "Seguro de equipos",
    },
  ],
}

export default function DetalleVisitaPrensaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)

  // Buscar la visita según el ID
  const visita = visitasPrensa.find((v) => v.id === resolvedParams.id) || visitasPrensa[0]
  const documentos = documentosVisitas[resolvedParams.id] || []

  // Definir las acciones disponibles para visitas pendientes
  const acciones =
    visita.estado === "Pendiente"
      ? {
          canApprove: true,
          canReject: true,
          onApprove: () => {
            console.log("Visita aprobada:", visita.numero)
            // Aquí iría la lógica para aprobar la visita
          },
          onReject: () => {
            console.log("Visita rechazada:", visita.numero)
            // Aquí iría la lógica para rechazar la visita
          },
        }
      : undefined

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
      message: "Paula Medina aprobó la solicitud",
      actor: "Paula Medina",
      detail: "Departamento de Prensa",
    },
    {
      id: "evt-4",
      timestamp: "2024-01-05T11:30:00",
      type: "approved",
      message: "Solicitud aprobada",
      showActor: false,
    },
  ]

  return (
    <DetalleVisitaComponent
      visita={visita}
      documentos={documentos}
      acciones={acciones}
      backUrl="/empleado-prensa/visitas/mis-visitas"
      userType="empleado-prensa"
      historialEventos={historialEventos}
    />
  )
}

