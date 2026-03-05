"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Upload, XCircle } from "lucide-react"

interface ModalNuevoPersonalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { nombre: string; apellido: string; dni: string; telefono: string; imagen?: string }) => void
}

export function ModalNuevoPersonal({ isOpen, onClose, onSave }: ModalNuevoPersonalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    imagen: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageAspectRatio, setImageAspectRatio] = useState<"1:1" | "4:3" | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen")
        return
      }

      // Crear preview y detectar proporción
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, imagen: result }))

        // Detectar proporción de la imagen
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.width / img.height
          // Si es aproximadamente 1:1 (0.9 a 1.1) o 4:3 vertical (aproximadamente 0.75)
          if (aspectRatio >= 0.9 && aspectRatio <= 1.1) {
            setImageAspectRatio("1:1")
          } else if (aspectRatio >= 0.7 && aspectRatio <= 0.8) {
            setImageAspectRatio("4:3")
          } else {
            // Por defecto usar 1:1 si no coincide exactamente
            setImageAspectRatio("1:1")
          }
        }
        img.src = result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setImageAspectRatio(null)
    setFormData((prev) => ({ ...prev, imagen: "" }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.nombre && formData.dni) {
      onSave({
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: formData.dni,
        telefono: formData.telefono,
        imagen: formData.imagen || undefined,
      })
      setFormData({ nombre: "", apellido: "", dni: "", telefono: "", imagen: "" })
      setImagePreview(null)
      setImageAspectRatio(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({ nombre: "", apellido: "", dni: "", telefono: "", imagen: "" })
    setImagePreview(null)
    setImageAspectRatio(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Nuevo Personal</h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="imagen">Foto/Selfie</Label>
            <div className="space-y-2">
              {imagePreview ? (
                <div className="relative inline-block">
                  <div
                    className={`relative rounded-lg overflow-hidden border-2 border-gray-200 ${
                      imageAspectRatio === "4:3"
                        ? "w-32 h-[106px]" // 4:3 vertical (128px * 4/3 = ~106px)
                        : "w-32 h-32" // 1:1 (cuadrado)
                    }`}
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Sin imagen</p>
                  </div>
                </div>
              )}
              <Input
                id="imagen"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground">Formatos: 1:1 o 4:3 vertical</p>
            </div>
          </div>

          <div>
            <Label htmlFor="nombreCompleto">Nombre Completo *</Label>
            <Input
              id="nombreCompleto"
              value={formData.nombre}
              onChange={(e) => setFormData((prev) => ({ ...prev, nombreCompleto: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="dni">DNI *</Label>
            <Input
              id="dni"
              value={formData.dni}
              onChange={(e) => setFormData((prev) => ({ ...prev, dni: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={formData.telefono}
              onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
