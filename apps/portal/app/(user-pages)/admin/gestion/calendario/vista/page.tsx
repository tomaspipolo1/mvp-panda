"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Calendario from "@/components/calendario/calendario"
import ModalEvento from "@/components/eventos/modal-evento"
import ModalConfirmacionEvento from "@/components/eventos/modal-confirmacion-evento"
import CrearEventoModal from "@/components/eventos/crear-evento-modal"
import CrearEventoPublicoModal from "@/components/eventos/crear-evento-publico-modal"

// Tipos de datos
interface Participante {
  id: number
  nombre: string
  documento: string
  empresa?: string
}

interface Evento {
  id: number
  titulo: string
  descripcion?: string
  fecha: Date
  fechaInicio: Date
  horaInicio?: string
  fechaFin?: Date
  horaFin?: string
  ubicacion?: string
  participantes?: Participante[]
  imagen?: string
  tipo: string
  color?: string
  estado?: "pendiente" | "en_curso" | "finalizado"
}

// Eventos de ejemplo para Admin
const eventosEjemplo: Evento[] = [
  {
    id: 1,
    titulo: "Reunión Directorio",
    descripcion:
      "Reunión mensual del directorio para revisar resultados y planificar estrategias del trimestre.",
    fecha: new Date(2025, 5, 3, 9, 0), // 3 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 3, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 3, 11, 0),
    horaFin: "11:00",
    ubicacion: "Sala de Directorio - Puerto La Plata",
    tipo: "reunion",
    estado: "pendiente",
    participantes: [
      { id: 1, nombre: "María González", documento: "12345678", empresa: "Directorio" },
      { id: 2, nombre: "Carlos Rodríguez", documento: "87654321", empresa: "Directorio" },
      { id: 3, nombre: "Ana Martínez", documento: "11223344", empresa: "Directorio" },
    ],
    imagen: "/diverse-business-conference.png",
  },
  {
    id: 2,
    titulo: "Auditoría Anual",
    descripcion:
      "Auditoría externa anual de procesos administrativos y financieros del puerto.",
    fecha: new Date(2025, 5, 5, 14, 0), // 5 de junio 2025, 14:00
    fechaInicio: new Date(2025, 5, 5, 14, 0),
    horaInicio: "14:00",
    fechaFin: new Date(2025, 5, 5, 17, 30),
    horaFin: "17:30",
    ubicacion: "Área Administrativa - Piso 3",
    tipo: "auditoria",
    estado: "en_curso",
    participantes: [
      { id: 4, nombre: "Roberto Silva", documento: "55667788", empresa: "Auditoría Externa" },
      { id: 5, nombre: "Laura Fernández", documento: "99887766", empresa: "Auditoría Externa" },
    ],
    imagen: "/business-invoice-details.png",
  },
  {
    id: 3,
    titulo: "Revisión Proveedores",
    descripcion: "Reunión de revisión trimestral de proveedores y renovación de contratos.",
    fecha: new Date(2025, 5, 7, 10, 0), // 7 de junio 2025, 10:00
    fechaInicio: new Date(2025, 5, 7, 10, 0),
    horaInicio: "10:00",
    fechaFin: new Date(2025, 5, 7, 12, 0),
    horaFin: "12:00",
    ubicacion: "Sala de Reuniones Principal",
    tipo: "reunion",
    estado: "pendiente",
    participantes: [
      { id: 6, nombre: "Diego Morales", documento: "44556677", empresa: "Compras" },
      { id: 7, nombre: "Sofía López", documento: "33445566", empresa: "Legales" },
      { id: 8, nombre: "Martín Pérez", documento: "22334455", empresa: "Finanzas" },
    ],
    imagen: "/global-supply-network.png",
  },
  {
    id: 4,
    titulo: "Capacitación Personal",
    descripcion: "Capacitación obligatoria de seguridad e higiene para todo el personal administrativo.",
    fecha: new Date(2025, 5, 9, 9, 0), // 9 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 9, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 9, 13, 0),
    horaFin: "13:00",
    ubicacion: "Auditorio Principal",
    tipo: "capacitacion",
    estado: "finalizado",
    participantes: [
      { id: 9, nombre: "Patricia Ruiz", documento: "66778899", empresa: "RRHH" },
      { id: 10, nombre: "Alejandro Castro", documento: "77889900", empresa: "Seguridad" },
    ],
    imagen: "/port-worker-training.png",
  },
  {
    id: 5,
    titulo: "Presentación Resultados Anuales",
    descripcion: "Presentación de resultados anuales ante stakeholders y autoridades.",
    fecha: new Date(2025, 5, 12, 16, 0), // 12 de junio 2025, 16:00
    fechaInicio: new Date(2025, 5, 12, 16, 0),
    horaInicio: "16:00",
    fechaFin: new Date(2025, 5, 12, 18, 0),
    horaFin: "18:00",
    ubicacion: "Salón de Actos",
    tipo: "presentacion",
    estado: "finalizado",
    participantes: [
      { id: 11, nombre: "Gabriela Torres", documento: "88990011", empresa: "Gerencia General" },
      { id: 12, nombre: "Fernando Vega", documento: "99001122", empresa: "Finanzas" },
      { id: 13, nombre: "Valeria Sánchez", documento: "00112233", empresa: "Comunicaciones" },
    ],
    imagen: "/diverse-business-conference.png",
  },
]

export default function CalendarioVistaPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null)
  const [mostrarModalEvento, setMostrarModalEvento] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [accionConfirmacion, setAccionConfirmacion] = useState<"crear" | "actualizar">("crear")
  const [tituloEventoConfirmacion, setTituloEventoConfirmacion] = useState("")
  const [eventoParaEditar, setEventoParaEditar] = useState<Evento | null>(null)
  const [mostrarModalEventoPublico, setMostrarModalEventoPublico] = useState(false)

  // Cargar eventos del localStorage al montar el componente
  useEffect(() => {
    // Primero cargamos los eventos de ejemplo
    const eventosBase = [...eventosEjemplo]

    // Luego intentamos cargar eventos personalizados del localStorage
    const eventosGuardados = localStorage.getItem("eventos-admin")
    if (eventosGuardados) {
      try {
        const eventosParsed = JSON.parse(eventosGuardados).map((evento: any) => ({
          ...evento,
          fecha: new Date(evento.fecha),
          fechaInicio: new Date(evento.fechaInicio),
          fechaFin: evento.fechaFin ? new Date(evento.fechaFin) : null,
        }))

        // Combinamos ambos arrays
        setEventos([...eventosBase, ...eventosParsed])
      } catch (error) {
        console.error("Error al cargar eventos:", error)
        setEventos(eventosBase)
      }
    } else {
      setEventos(eventosBase)
    }
  }, [])

  // Guardar eventos en localStorage
  const guardarEventos = (nuevosEventos: Evento[]) => {
    // Solo guardamos en localStorage los eventos personalizados (no los de ejemplo)
    const eventosPersonalizados = nuevosEventos.filter((evento) => {
      // Un evento es personalizado si no está en la lista de eventos de ejemplo
      return !eventosEjemplo.some((ejemploEvento) => ejemploEvento.id === evento.id)
    })

    localStorage.setItem("eventos-admin", JSON.stringify(eventosPersonalizados))
  }

  // Manejar clic en evento del calendario
  const handleEventoClick = (evento: Evento) => {
    setEventoSeleccionado(evento)
    setMostrarModalEvento(true)
  }

  // Manejar creación o actualización de evento
  const handleGuardarEvento = (evento: Evento) => {
    let eventosActualizados: Evento[]

    if (eventoParaEditar) {
      // Actualizar evento existente
      eventosActualizados = eventos.map((e) => {
        if (e.id === evento.id) {
          // Aseguramos que la fecha también se actualice
          return {
            ...evento,
            fecha: evento.fechaInicio, // Actualizamos la fecha para que coincida con fechaInicio
          }
        }
        return e
      })

      setAccionConfirmacion("actualizar")
    } else {
      // Crear nuevo evento
      const nuevoEvento = {
        ...evento,
        fecha: evento.fechaInicio, // Aseguramos que fecha coincida con fechaInicio
      }
      eventosActualizados = [...eventos, nuevoEvento]
      setAccionConfirmacion("crear")
    }

    setEventos(eventosActualizados)
    guardarEventos(eventosActualizados)
    setMostrarFormulario(false)
    setEventoParaEditar(null)
    setTituloEventoConfirmacion(evento.titulo)
    setMostrarConfirmacion(true)
  }

  // Manejar eliminación de evento
  const handleEliminarEvento = (id: number) => {
    const eventosActualizados = eventos.filter((evento) => evento.id !== id)
    setEventos(eventosActualizados)
    guardarEventos(eventosActualizados)
    setMostrarModalEvento(false)
  }

  // Manejar edición de evento
  const handleEditarEvento = (id: number) => {
    const evento = eventos.find((e) => e.id === id)
    if (evento) {
      setEventoParaEditar(evento)
      setMostrarFormulario(true)
      setMostrarModalEvento(false)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendario de Eventos</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setEventoParaEditar(null)
              setMostrarFormulario(true)
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Actividad
          </Button>
          <Button
            onClick={() => {
              setMostrarModalEventoPublico(true)
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear evento
          </Button>
        </div>
      </div>
      {/* Leyenda de colores */}
      <div className="flex gap-6 mb-4">
        <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-pink-100 border border-pink-300"></span> <span className="text-sm">Pendiente</span></div>
        <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-blue-100 border border-blue-300"></span> <span className="text-sm">En curso</span></div>
        <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-green-100 border border-green-300"></span> <span className="text-sm">Finalizado</span></div>
      </div>
      {/* Calendario */}
      <Calendario eventos={eventos} onEventClick={handleEventoClick} />

      {/* Modal Formulario Nuevo/Editar Evento */}
      <CrearEventoModal
        open={mostrarFormulario}
        onOpenChange={(open) => {
          setMostrarFormulario(open)
          if (!open) setEventoParaEditar(null)
        }}
        onConfirm={handleGuardarEvento}
        // Si quieres pasar datos para editar, puedes agregar un prop 'eventoParaEditar={eventoParaEditar}' y adaptarlo en el modal
      />

      {/* Modal Detalle Evento */}
      <ModalEvento
        evento={eventoSeleccionado}
        open={mostrarModalEvento}
        onOpenChange={setMostrarModalEvento}
        onEdit={handleEditarEvento}
        onDelete={handleEliminarEvento}
      />

      {/* Modal Confirmación */}
      <ModalConfirmacionEvento
        open={mostrarConfirmacion}
        onOpenChange={setMostrarConfirmacion}
        onConfirm={() => setMostrarConfirmacion(false)}
        tituloEvento={tituloEventoConfirmacion}
        accion={accionConfirmacion}
      />

      <CrearEventoPublicoModal
        open={mostrarModalEventoPublico}
        onOpenChange={setMostrarModalEventoPublico}
        onConfirm={(data) => {
          // Aquí puedes manejar el evento público creado
          console.log("Evento público creado:", data);
        }}
      />
    </div>
  )
}

