"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

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
  fechaInicio: Date
  horaInicio?: string
  fechaFin?: Date
  horaFin?: string
  ubicacion?: string
  participantes?: Participante[]
  imagen?: string
  tipo: string
  color?: string
  /** Acepta "pendiente" | "en_curso" | "finalizado" o "Pendiente" | "En curso" | "Finalizado" */
  estado: string
}

interface ModalEventoProps {
  evento: Evento | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function ModalEvento({ evento, open, onOpenChange, onEdit, onDelete }: ModalEventoProps) {
  const router = useRouter()
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!evento) return null

  const handleEdit = () => {
    if (onEdit) {
      onEdit(evento.id)
    } else {
      // Redirigir a la página de edición con el ID del evento
      router.push(`/empleado-prensa/gestion/eventos/editar/${evento.id}`)
    }
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (confirmDelete) {
      if (onDelete) {
        onDelete(evento.id)
      }
      onOpenChange(false)
      setConfirmDelete(false)
    } else {
      setConfirmDelete(true)
    }
  }

  const formatFecha = (fecha: Date) => {
    return format(fecha, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })
  }

  const estadoDisplay =
    evento.estado === "pendiente" || evento.estado === "Pendiente"
      ? "Pendiente"
      : evento.estado === "en_curso" || evento.estado === "En curso"
        ? "En curso"
        : evento.estado === "finalizado" || evento.estado === "Finalizado"
          ? "Finalizado"
          : evento.estado

  const estadoBadgeClass =
    evento.estado === "pendiente" || evento.estado === "Pendiente"
      ? "bg-yellow-100 text-yellow-800"
      : evento.estado === "en_curso" || evento.estado === "En curso"
        ? "bg-blue-100 text-blue-800"
        : evento.estado === "finalizado" || evento.estado === "Finalizado"
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{evento.titulo}</DialogTitle>
          <div className="mt-1">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estadoBadgeClass}`}
            >
              {estadoDisplay}
            </span>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          {/* Descripción */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">{evento.descripcion}</p>
          </div>
          {/* Detalles del evento */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Detalles del evento</h3>
            {/* Fecha y hora de inicio en la misma línea */}
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
              <div className="flex items-start flex-1">
                <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Fecha de inicio</p>
                  <p className="text-gray-700 text-sm capitalize">{formatFecha(evento.fechaInicio)}</p>
                </div>
              </div>
              {evento.horaInicio && (
                <div className="flex items-start flex-1">
                  <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Hora de inicio</p>
                    <p className="text-gray-700 text-sm">{evento.horaInicio}</p>
                  </div>
                </div>
              )}
            </div>
            {/* Fecha y hora de fin en la misma línea */}
            {(evento.fechaFin || evento.horaFin) && (
              <div className="flex flex-col sm:flex-row gap-4 mb-2">
                {evento.fechaFin && (
                  <div className="flex items-start flex-1">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Fecha de fin</p>
                      <p className="text-gray-700 text-sm capitalize">{formatFecha(evento.fechaFin)}</p>
                    </div>
                  </div>
                )}
                {evento.horaFin && (
                  <div className="flex items-start flex-1">
                    <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Hora de fin</p>
                      <p className="text-gray-700 text-sm">{evento.horaFin}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Ubicación */}
            {evento.ubicacion && (
              <div className="flex items-start mb-2">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Ubicación</p>
                  <p className="text-gray-700 text-sm">{evento.ubicacion}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Botones de acción */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            Editar
          </Button>
          <Button
            variant={confirmDelete ? "destructive" : "outline"}
            onClick={handleDelete}
            className={confirmDelete ? "bg-red-600 hover:bg-red-700" : "text-red-600 hover:text-red-700"}
          >
            {confirmDelete ? (
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Confirmar
              </div>
            ) : (
              "Eliminar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
