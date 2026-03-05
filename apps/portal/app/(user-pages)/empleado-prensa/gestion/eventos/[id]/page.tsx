"use client"

import { use } from "react"
import { DetalleEventoComponent, EventoDetalle } from "@/components/eventos/detalle-evento-component"

// Array de datos de eventos de ejemplo
const eventosData: EventoDetalle[] = [
  {
    id: "1",
    numero: "EVT-2025-001",
    titulo: "Conferencia de Prensa Puerto",
    descripcion: "Conferencia de prensa sobre las nuevas inversiones en infraestructura portuaria y proyectos de modernización.",
    ubicacion: "Sala de Prensa Principal",
    direccion: "Puerto La Plata, Av. Costanera 1234",
    fechaDesde: "03/06/2025",
    fechaHasta: "03/06/2025",
    horaDesde: "09:00",
    horaHasta: "11:00",
    estado: "Aprobado",
    imagen: "/news-interview-setting.png",
    participantes: [
      {
        id: "1",
        nombreCompleto: "María González",
        dni: "12345678",
        correo: "maria.gonzalez@eldia.com",
        telefono: "+54 221 123-4567"
      },
      {
        id: "2",
        nombreCompleto: "Carlos Rodríguez",
        dni: "87654321",
        correo: "carlos.rodriguez@canal2.com",
        telefono: "+54 221 234-5678"
      },
      {
        id: "3",
        nombreCompleto: "Ana Martínez",
        dni: "11223344",
        correo: "ana.martinez@radiouniversidad.com",
        telefono: "+54 221 345-6789"
      }
    ],
    creador: {
      nombre: "Patricia Ruiz",
      departamento: "Prensa"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "01/06/2025",
        usuario: "Patricia Ruiz"
      },
      {
        id: "2",
        estado: "Seguridad aprobó",
        fecha: "02/06/2025",
        usuario: "Roberto Silva"
      },
      {
        id: "3",
        estado: "Prensa publicó",
        fecha: "02/06/2025",
        usuario: "Patricia Ruiz"
      }
    ]
  },
  {
    id: "2",
    numero: "EVT-2025-002",
    titulo: "Entrevista Director Ejecutivo",
    descripcion: "Entrevista exclusiva con el Director Ejecutivo sobre los resultados del primer trimestre y planes futuros.",
    ubicacion: "Oficina Dirección Ejecutiva",
    direccion: "Puerto La Plata, Edificio Central, Piso 5",
    fechaDesde: "05/06/2025",
    fechaHasta: "05/06/2025",
    horaDesde: "14:00",
    horaHasta: "15:30",
    estado: "En curso",
    imagen: "/professional-interview-setup.png",
    participantes: [
      {
        id: "4",
        nombreCompleto: "Roberto Silva",
        dni: "22334455",
        correo: "roberto.silva@direccion.com",
        telefono: "+54 221 456-7890"
      },
      {
        id: "5",
        nombreCompleto: "Laura Fernández",
        dni: "33445566",
        correo: "laura.fernandez@canal9.com",
        telefono: "+54 221 567-8901"
      }
    ],
    creador: {
      nombre: "Alejandro Castro",
      departamento: "Prensa"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "03/06/2025",
        usuario: "Alejandro Castro"
      },
      {
        id: "2",
        estado: "Seguridad aprobó",
        fecha: "04/06/2025",
        usuario: "Laura Fernández"
      },
      {
        id: "3",
        estado: "Prensa publicó",
        fecha: "04/06/2025",
        usuario: "Alejandro Castro"
      }
    ]
  },
  {
    id: "3",
    numero: "EVT-2025-003",
    titulo: "Cobertura Llegada Crucero",
    descripcion: "Cobertura mediática de la llegada del crucero de lujo con 3000 pasajeros al Puerto La Plata.",
    ubicacion: "Muelle de Cruceros",
    direccion: "Terminal Pasajeros, Puerto La Plata",
    fechaDesde: "07/06/2025",
    fechaHasta: "07/06/2025",
    horaDesde: "08:00",
    horaHasta: "12:00",
    estado: "Pendiente",
    creador: {
      nombre: "Gabriela Torres",
      departamento: "Prensa"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "05/06/2025",
        usuario: "Gabriela Torres"
      }
    ]
  },
  {
    id: "4",
    numero: "EVT-2025-004",
    titulo: "Reunión Comité Editorial",
    descripcion: "Reunión mensual del comité editorial para revisar contenidos y planificar próximas publicaciones.",
    ubicacion: "Sala de Reuniones Prensa",
    direccion: "Puerto La Plata, Edificio Prensa, Piso 2",
    fechaDesde: "09/06/2025",
    fechaHasta: "09/06/2025",
    horaDesde: "10:00",
    horaHasta: "12:00",
    estado: "Finalizado",
    participantes: [
      {
        id: "6",
        nombreCompleto: "Fernando Vega",
        dni: "44556677",
        correo: "fernando.vega@prensa.com",
        telefono: "+54 221 678-9012"
      },
      {
        id: "7",
        nombreCompleto: "Diego Morales",
        dni: "55667788",
        correo: "diego.morales@seguridad.com",
        telefono: "+54 221 789-0123"
      },
      {
        id: "8",
        nombreCompleto: "Carmen López",
        dni: "66778899",
        correo: "carmen.lopez@comunicaciones.com",
        telefono: "+54 221 890-1234"
      }
    ],
    creador: {
      nombre: "Fernando Vega",
      departamento: "Prensa"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "07/06/2025",
        usuario: "Fernando Vega"
      },
      {
        id: "2",
        estado: "Seguridad aprobó",
        fecha: "08/06/2025",
        usuario: "Diego Morales"
      },
      {
        id: "3",
        estado: "Prensa publicó",
        fecha: "08/06/2025",
        usuario: "Fernando Vega"
      }
    ]
  },
  {
    id: "5",
    numero: "EVT-2025-005",
    titulo: "Presentación Informe Anual",
    descripcion: "Presentación del informe anual de actividades del puerto ante medios de comunicación.",
    ubicacion: "Auditorio Principal",
    direccion: "Puerto La Plata, Centro de Convenciones",
    fechaDesde: "12/06/2025",
    fechaHasta: "12/06/2025",
    horaDesde: "16:00",
    horaHasta: "18:00",
    estado: "Rechazado",
    imagen: "/diverse-business-conference.png",
    creador: {
      nombre: "Valeria Sánchez",
      departamento: "Prensa"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "10/06/2025",
        usuario: "Valeria Sánchez"
      },
      {
        id: "2",
        estado: "Seguridad rechazó",
        fecha: "11/06/2025",
        usuario: "Martín Pérez"
      }
    ]
  }
]

interface EventoDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EventoDetailPage({ params }: EventoDetailPageProps) {
  // Desenvolver params usando React.use()
  const { id } = use(params)
  
  // Buscar el evento por ID
  const evento = eventosData.find(e => e.id === id)

  if (!evento) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Evento no encontrado</h1>
          <p className="text-gray-600 mb-4">El evento que buscas no existe o ha sido eliminado.</p>
          <a 
            href="/empleado-prensa/gestion/eventos/listado"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Volver al listado de eventos
          </a>
        </div>
      </div>
    )
  }

  return (
    <DetalleEventoComponent 
      evento={evento} 
      backUrl="/empleado-prensa/gestion/eventos/listado" 
    />
  )
}

// Exportar el array de datos para usar en otras páginas
export { eventosData }
