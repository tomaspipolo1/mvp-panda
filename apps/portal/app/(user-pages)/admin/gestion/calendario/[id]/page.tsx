"use client"

import { use } from "react"
import { DetalleEventoComponent, EventoDetalle } from "@/components/eventos/detalle-evento-component"

// Array de datos de eventos de ejemplo para Admin
export const eventosData: EventoDetalle[] = [
  {
    id: "1",
    numero: "ADM-2025-001",
    titulo: "Reunión Directorio",
    descripcion: "Reunión mensual del directorio para revisar resultados y planificar estrategias del trimestre.",
    ubicacion: "Sala de Directorio",
    direccion: "Puerto La Plata, Edificio Administrativo, Piso 4",
    fechaDesde: "03/06/2025",
    fechaHasta: "03/06/2025",
    horaDesde: "09:00",
    horaHasta: "11:00",
    estado: "Aprobado",
    imagen: "/diverse-business-conference.png",
    participantes: [
      {
        id: "1",
        nombreCompleto: "María González",
        dni: "12345678",
        correo: "maria.gonzalez@plp.com",
        telefono: "+54 221 123-4567"
      },
      {
        id: "2",
        nombreCompleto: "Carlos Rodríguez",
        dni: "87654321",
        correo: "carlos.rodriguez@plp.com",
        telefono: "+54 221 234-5678"
      },
      {
        id: "3",
        nombreCompleto: "Ana Martínez",
        dni: "11223344",
        correo: "ana.martinez@plp.com",
        telefono: "+54 221 345-6789"
      }
    ],
    creador: {
      nombre: "Admin Principal",
      departamento: "Administración"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "01/06/2025",
        usuario: "Admin Principal"
      },
      {
        id: "2",
        estado: "Evento aprobado",
        fecha: "02/06/2025",
        usuario: "Admin Principal"
      }
    ]
  },
  {
    id: "2",
    numero: "ADM-2025-002",
    titulo: "Auditoría Anual",
    descripcion: "Auditoría externa anual de procesos administrativos y financieros del puerto.",
    ubicacion: "Área Administrativa",
    direccion: "Puerto La Plata, Edificio Central, Piso 3",
    fechaDesde: "05/06/2025",
    fechaHasta: "05/06/2025",
    horaDesde: "14:00",
    horaHasta: "17:30",
    estado: "En curso",
    imagen: "/business-invoice-details.png",
    participantes: [
      {
        id: "4",
        nombreCompleto: "Roberto Silva",
        dni: "55667788",
        correo: "roberto.silva@auditoria.com",
        telefono: "+54 221 456-7890"
      },
      {
        id: "5",
        nombreCompleto: "Laura Fernández",
        dni: "99887766",
        correo: "laura.fernandez@auditoria.com",
        telefono: "+54 221 567-8901"
      }
    ],
    creador: {
      nombre: "Admin Principal",
      departamento: "Administración"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "01/06/2025",
        usuario: "Admin Principal"
      },
      {
        id: "2",
        estado: "Auditoría iniciada",
        fecha: "05/06/2025",
        usuario: "Roberto Silva"
      }
    ]
  },
  {
    id: "3",
    numero: "ADM-2025-003",
    titulo: "Revisión Proveedores",
    descripcion: "Reunión de revisión trimestral de proveedores y renovación de contratos.",
    ubicacion: "Sala de Reuniones Principal",
    direccion: "Puerto La Plata, Edificio Administrativo, Piso 2",
    fechaDesde: "07/06/2025",
    fechaHasta: "07/06/2025",
    horaDesde: "10:00",
    horaHasta: "12:00",
    estado: "Pendiente",
    imagen: "/global-supply-network.png",
    participantes: [
      {
        id: "6",
        nombreCompleto: "Diego Morales",
        dni: "44556677",
        correo: "diego.morales@plp.com",
        telefono: "+54 221 678-9012"
      },
      {
        id: "7",
        nombreCompleto: "Sofía López",
        dni: "33445566",
        correo: "sofia.lopez@plp.com",
        telefono: "+54 221 789-0123"
      }
    ],
    creador: {
      nombre: "Admin Principal",
      departamento: "Administración"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "01/06/2025",
        usuario: "Admin Principal"
      }
    ]
  },
  {
    id: "4",
    numero: "ADM-2025-004",
    titulo: "Capacitación Personal",
    descripcion: "Capacitación obligatoria de seguridad e higiene para todo el personal administrativo.",
    ubicacion: "Auditorio Principal",
    direccion: "Puerto La Plata, Edificio Central, Planta Baja",
    fechaDesde: "09/06/2025",
    fechaHasta: "09/06/2025",
    horaDesde: "09:00",
    horaHasta: "13:00",
    estado: "Finalizado",
    imagen: "/port-worker-training.png",
    participantes: [
      {
        id: "8",
        nombreCompleto: "Patricia Ruiz",
        dni: "66778899",
        correo: "patricia.ruiz@plp.com",
        telefono: "+54 221 890-1234"
      },
      {
        id: "9",
        nombreCompleto: "Alejandro Castro",
        dni: "77889900",
        correo: "alejandro.castro@plp.com",
        telefono: "+54 221 901-2345"
      }
    ],
    creador: {
      nombre: "Admin Principal",
      departamento: "Administración"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "01/06/2025",
        usuario: "Admin Principal"
      },
      {
        id: "2",
        estado: "Evento finalizado",
        fecha: "09/06/2025",
        usuario: "Patricia Ruiz"
      }
    ]
  },
  {
    id: "5",
    numero: "ADM-2025-005",
    titulo: "Presentación Resultados Anuales",
    descripcion: "Presentación de resultados anuales ante stakeholders y autoridades.",
    ubicacion: "Salón de Actos",
    direccion: "Puerto La Plata, Edificio Principal",
    fechaDesde: "12/06/2025",
    fechaHasta: "12/06/2025",
    horaDesde: "16:00",
    horaHasta: "18:00",
    estado: "Finalizado",
    imagen: "/diverse-business-conference.png",
    participantes: [
      {
        id: "10",
        nombreCompleto: "Gabriela Torres",
        dni: "88990011",
        correo: "gabriela.torres@plp.com",
        telefono: "+54 221 012-3456"
      },
      {
        id: "11",
        nombreCompleto: "Fernando Vega",
        dni: "99001122",
        correo: "fernando.vega@plp.com",
        telefono: "+54 221 123-4567"
      }
    ],
    creador: {
      nombre: "Admin Principal",
      departamento: "Administración"
    },
    historialEstados: [
      {
        id: "1",
        estado: "Creó el evento",
        fecha: "01/06/2025",
        usuario: "Admin Principal"
      },
      {
        id: "2",
        estado: "Presentación completada",
        fecha: "12/06/2025",
        usuario: "Gabriela Torres"
      }
    ]
  }
]

export default function EventoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const evento = eventosData.find((e) => e.id === resolvedParams.id)

  if (!evento) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Evento no encontrado</h2>
          <p className="text-gray-600">El evento que buscas no existe o fue eliminado.</p>
        </div>
      </div>
    )
  }

  return <DetalleEventoComponent evento={evento} />
}

