"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, X } from "lucide-react"

interface ModalAltaCargoProps {
  isOpen: boolean
  onClose: () => void
  cargo?: {
    codigo: string
    nombre: string
    descripcion: string
    empleados?: number
  }
  mode?: "create" | "edit" | "view"
}

export function ModalAltaCargo({ isOpen, onClose, cargo, mode = "create" }: ModalAltaCargoProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
  })

  const [errors, setErrors] = useState({
    codigo: "",
    nombre: "",
  })

  useEffect(() => {
    if (cargo && (mode === "edit" || mode === "view")) {
      setFormData({
        codigo: cargo.codigo,
        nombre: cargo.nombre,
        descripcion: cargo.descripcion || "",
      })
    } else {
      setFormData({
        codigo: "",
        nombre: "",
        descripcion: "",
      })
    }
    setErrors({
      codigo: "",
      nombre: "",
    })
  }, [cargo, mode, isOpen])

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors = {
      codigo: "",
      nombre: "",
    }

    if (!formData.codigo.trim()) {
      newErrors.codigo = "El código es obligatorio"
    } else if (formData.codigo.trim().length < 2) {
      newErrors.codigo = "El código debe tener al menos 2 caracteres"
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "view") {
      onClose()
      return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log(mode === "create" ? "Nuevo cargo:" : "Cargo actualizado:", formData)

      // Cerrar modal
      onClose()
    } catch (error) {
      console.error(`Error al ${mode === "create" ? "crear" : "actualizar"} cargo:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (mode === "view") return

    setFormData((prev) => ({
      ...prev,
      [field]: field === "codigo" ? value.toUpperCase() : value,
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const modalTitle = {
    create: "Nuevo Cargo",
    edit: "Editar Cargo",
    view: "Detalles del Cargo",
  }[mode]

  const submitButtonText = {
    create: "Crear Cargo",
    edit: "Actualizar Cargo",
    view: "Cerrar",
  }[mode]

  const loadingText = {
    create: "Creando...",
    edit: "Actualizando...",
    view: "",
  }[mode]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{modalTitle}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoading}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código {mode !== "view" && <span className="text-red-500">*</span>}</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => handleInputChange("codigo", e.target.value)}
                placeholder="Ej: PROF"
                className={errors.codigo ? "border-red-500" : ""}
                disabled={mode === "view" || (mode === "edit" && cargo?.empleados && cargo.empleados > 0)}
              />
              {errors.codigo && <p className="text-sm text-red-500">{errors.codigo}</p>}
              {mode === "edit" && cargo?.empleados && cargo.empleados > 0 && (
                <p className="text-xs text-amber-600">
                  El código no puede modificarse porque hay empleados asociados a este cargo.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre {mode !== "view" && <span className="text-red-500">*</span>}</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ej: PROFESIONAL"
                className={errors.nombre ? "border-red-500" : ""}
                disabled={mode === "view"}
              />
              {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
              placeholder="Descripción del cargo (opcional)"
              rows={3}
              disabled={mode === "view"}
            />
          </div>

          {cargo && cargo.empleados !== undefined && (mode === "edit" || mode === "view") && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">
                <span className="font-medium">Empleados asociados:</span> {cargo.empleados}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            {mode !== "view" && (
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isLoading} variant={mode === "view" ? "outline" : "default"}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? loadingText : submitButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
