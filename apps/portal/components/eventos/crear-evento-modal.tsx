"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

export interface CrearEventoModalFormData {
  titulo: string
  descripcion: string
  fechaInicio: Date
  horaInicio: string
  fechaFin: Date
  horaFin: string
  ubicacion: string
  estado: "pendiente" | "en_curso" | "finalizado"
}

/** Objeto mínimo para prellenar el formulario en modo edición */
export interface EventoParaEditar {
  titulo: string
  descripcion?: string
  fechaInicio: Date
  horaInicio?: string
  fechaFin?: Date
  horaFin?: string
  ubicacion?: string
  estado?: "pendiente" | "en_curso" | "finalizado"
}

interface CrearEventoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: CrearEventoModalFormData) => void
  /** Si se pasa, el modal se usa en modo edición y el formulario se prellena con estos datos */
  eventoEditar?: EventoParaEditar | null
}

export default function CrearEventoModal({ open, onOpenChange, onConfirm, eventoEditar }: CrearEventoModalProps) {
  const [form, setForm] = useState<CrearEventoModalFormData>({
    titulo: "",
    descripcion: "",
    fechaInicio: new Date(),
    horaInicio: "09:00",
    fechaFin: new Date(),
    horaFin: "10:00",
    ubicacion: "",
    estado: "pendiente",
  })
  const [touched, setTouched] = useState(false)

  // Resetear o prellenar formulario cuando el modal se abre/cierra
  useEffect(() => {
    if (open) {
      if (eventoEditar) {
        setForm({
          titulo: eventoEditar.titulo ?? "",
          descripcion: eventoEditar.descripcion ?? "",
          fechaInicio: eventoEditar.fechaInicio instanceof Date ? eventoEditar.fechaInicio : new Date(eventoEditar.fechaInicio),
          horaInicio: eventoEditar.horaInicio ?? "09:00",
          fechaFin: eventoEditar.fechaFin instanceof Date ? eventoEditar.fechaFin : new Date(eventoEditar.fechaFin ?? eventoEditar.fechaInicio),
          horaFin: eventoEditar.horaFin ?? "10:00",
          ubicacion: eventoEditar.ubicacion ?? "",
          estado: (eventoEditar.estado as "pendiente" | "en_curso" | "finalizado") ?? "pendiente",
        })
      } else {
        setForm({
          titulo: "",
          descripcion: "",
          fechaInicio: new Date(),
          horaInicio: "09:00",
          fechaFin: new Date(),
          horaFin: "10:00",
          ubicacion: "",
          estado: "pendiente",
        })
      }
      setTouched(false)
    }
  }, [open, eventoEditar])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: new Date(value) }))
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!form.titulo.trim() || !form.descripcion.trim() || !form.ubicacion.trim()) return
    onConfirm(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto p-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
        <DialogTitle className="sr-only">{eventoEditar ? "Editar actividad" : "Crear nueva actividad"}</DialogTitle>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl font-bold mb-6 text-center">{eventoEditar ? "Editar actividad" : "Crear nueva actividad"}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="titulo">Título</label>
            <Input
              id="titulo"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
              className="text-base"
              autoFocus
            />
            {touched && !form.titulo.trim() && <span className="text-xs text-red-500">Este campo es obligatorio</span>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="descripcion">Descripción</label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
              className="text-base"
            />
            {touched && !form.descripcion.trim() && <span className="text-xs text-red-500">Este campo es obligatorio</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fechaInicio">Fecha de inicio</label>
              <Input
                id="fechaInicio"
                name="fechaInicio"
                type="date"
                value={format(form.fechaInicio, "yyyy-MM-dd")}
                onChange={e => handleDateChange("fechaInicio", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="horaInicio">Hora de inicio</label>
              <Input
                id="horaInicio"
                name="horaInicio"
                type="time"
                value={form.horaInicio}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fechaFin">Fecha de fin</label>
              <Input
                id="fechaFin"
                name="fechaFin"
                type="date"
                value={format(form.fechaFin, "yyyy-MM-dd")}
                onChange={e => handleDateChange("fechaFin", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="horaFin">Hora de fin</label>
              <Input
                id="horaFin"
                name="horaFin"
                type="time"
                value={form.horaFin}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="ubicacion">Ubicación</label>
            <Input
              id="ubicacion"
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              required
              className="text-base"
            />
            {touched && !form.ubicacion.trim() && <span className="text-xs text-red-500">Este campo es obligatorio</span>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-base"
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_curso">En curso</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
            <Button type="submit" className="bg-blue-600 text-white">{eventoEditar ? "Guardar" : "Crear"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
