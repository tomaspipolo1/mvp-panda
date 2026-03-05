"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

interface DocumentoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (documento: any) => void
  documento?: {
    nombre: string
    tipo: string
    tamano: string
    fechaActualizacion: string
    fechaVencimiento?: string
  }
  isEditing?: boolean
}

export function SubirDocumentoModal({ open, onOpenChange, onSave, documento, isEditing = false }: DocumentoModalProps) {
  const [formData, setFormData] = useState(
    documento || {
      nombre: "",
      tipo: "PDF",
      tamano: "",
      fechaActualizacion: format(new Date(), "dd/MM/yyyy"),
      fechaVencimiento: "",
    },
  )

  const [fechaActualizacion, setFechaActualizacion] = useState<Date | undefined>(
    documento?.fechaActualizacion ? new Date(convertirFechaADate(documento.fechaActualizacion)) : new Date(),
  )

  const [fechaVencimiento, setFechaVencimiento] = useState<Date | undefined>(
    documento?.fechaVencimiento ? new Date(convertirFechaADate(documento.fechaVencimiento)) : undefined,
  )

  const [archivo, setArchivo] = useState<File | null>(null)

  // Función para convertir fecha en formato dd/MM/yyyy a Date
  function convertirFechaADate(fecha: string): string {
    const [dia, mes, anio] = fecha.split("/")
    return `${anio}-${mes}-${dia}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setArchivo(file)
      setFormData({
        ...formData,
        tipo: file.type.split("/")[1].toUpperCase(),
        tamano: formatFileSize(file.size),
      })
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Actualizar fechas en el formato correcto
    const documentoActualizado = {
      ...formData,
      fechaActualizacion: fechaActualizacion ? format(fechaActualizacion, "dd/MM/yyyy") : formData.fechaActualizacion,
      fechaVencimiento: fechaVencimiento ? format(fechaVencimiento, "dd/MM/yyyy") : undefined,
    }

    onSave(documentoActualizado)
    toast({
      title: isEditing ? "Documento actualizado" : "Documento subido",
      description: isEditing
        ? "El documento ha sido actualizado correctamente."
        : "El documento ha sido subido correctamente.",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Documento" : "Subir Documento"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Documento</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Constancia de CUIT"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="archivo">Archivo</Label>
              <Input
                id="archivo"
                name="archivo"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
                required={!isEditing}
              />
              {isEditing && !archivo && (
                <p className="text-sm text-gray-500">
                  Archivo actual: {formData.nombre} ({formData.tipo}, {formData.tamano})
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha de Actualización</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fechaActualizacion && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fechaActualizacion ? (
                        format(fechaActualizacion, "dd/MM/yyyy", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fechaActualizacion}
                      onSelect={setFechaActualizacion}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Fecha de Vencimiento (opcional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fechaVencimiento && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fechaVencimiento ? (
                        format(fechaVencimiento, "dd/MM/yyyy", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fechaVencimiento}
                      onSelect={setFechaVencimiento}
                      initialFocus
                      disabled={(date) => (fechaActualizacion ? date < fechaActualizacion : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Actualizar" : "Subir"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
