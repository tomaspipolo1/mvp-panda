"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, X } from "lucide-react"

// Datos de ejemplo para gerentes disponibles (solo con cargo GERENTE)
const gerentesDisponibles = [
  { id: 1, nombre: "Carlos Mendoza", cargo: "GERENTE", area: "Administración" },
  { id: 2, nombre: "María González", cargo: "GERENTE", area: "Legales" },
  { id: 3, nombre: "Roberto Silva", cargo: "GERENTE", area: "RRHH RRII y Comunidad" },
  { id: 4, nombre: "Ana Rodríguez", cargo: "GERENTE", area: "Operaciones" },
  { id: 5, nombre: "Luis Martínez", cargo: "GERENTE", area: "Infraestructura y Mantenimiento" },
  { id: 6, nombre: "Patricia López", cargo: "GERENTE", area: "Presidencia" },
]

interface ModalAltaGerenciaProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: any) => void
  mode?: "create" | "edit" | "view"
  gerencia?: any
}

export function ModalAltaGerencia({
  isOpen,
  onClose,
  onConfirm,
  mode = "create",
  gerencia = null,
}: ModalAltaGerenciaProps) {
  const [codigo, setCodigo] = useState("")
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [gerenteId, setGerenteId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Resetear el formulario cuando cambia el modo o los datos
  useEffect(() => {
    if (isOpen) {
      if (mode === "create") {
        resetForm()
      } else if (gerencia && (mode === "edit" || mode === "view")) {
        setCodigo(gerencia.codigo || "")
        setNombre(gerencia.nombre || "")
        setDescripcion(gerencia.descripcion || "")

        // Buscar el ID del gerente basado en el nombre
        const gerenteEncontrado = gerentesDisponibles.find((g) => g.nombre === gerencia.gerenteResponsable)
        setGerenteId(gerenteEncontrado ? String(gerenteEncontrado.id) : "")
      }
    }
  }, [isOpen, mode, gerencia])

  const resetForm = () => {
    setCodigo("")
    setNombre("")
    setDescripcion("")
    setGerenteId("")
    setErrors({})
  }

  const handleClose = () => {
    if (!isLoading) {
      resetForm()
      onClose()
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!codigo.trim()) {
      newErrors.codigo = "El código es obligatorio"
    } else if (codigo.length < 2) {
      newErrors.codigo = "El código debe tener al menos 2 caracteres"
    }

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    } else if (nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres"
    }

    if (!gerenteId) {
      newErrors.gerenteId = "Debe seleccionar un gerente responsable"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "view") {
      handleClose()
      return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const gerenteEncontrado = gerentesDisponibles.find((g) => g.id === Number.parseInt(gerenteId))

      const formData = {
        codigo: codigo.toUpperCase(),
        nombre,
        descripcion,
        gerenteResponsable: gerenteEncontrado?.nombre || "",
      }

      onConfirm(formData)
      handleClose()
    } catch (error) {
      console.error("Error al procesar el formulario:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isViewMode = mode === "view"
  const isEditMode = mode === "edit"

  const getTitleText = () => {
    if (isViewMode) return "Detalles de Gerencia"
    if (isEditMode) return "Editar Gerencia"
    return "Nueva Gerencia"
  }

  const getButtonText = () => {
    if (isViewMode) return "Cerrar"
    if (isEditMode) return isLoading ? "Actualizando..." : "Actualizar Gerencia"
    return isLoading ? "Creando..." : "Crear Gerencia"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{getTitleText()}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {isViewMode
                ? "Información detallada de la gerencia."
                : "Complete los campos para crear una nueva gerencia. Los campos marcados con * son obligatorios."}
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="codigo">
              Código <span className="text-red-500">*</span>
            </Label>
            <Input
              id="codigo"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value.toUpperCase())
                if (errors.codigo) {
                  setErrors({ ...errors, codigo: "" })
                }
              }}
              placeholder="Ej: GA"
              disabled={isViewMode}
              className={errors.codigo ? "border-red-500" : ""}
            />
            {errors.codigo && <p className="text-red-500 text-sm">{errors.codigo}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nombre">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value)
                if (errors.nombre) {
                  setErrors({ ...errors, nombre: "" })
                }
              }}
              placeholder="Ej: Gerencia de Administración"
              disabled={isViewMode}
              className={errors.nombre ? "border-red-500" : ""}
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción de las funciones y responsabilidades de la gerencia"
              disabled={isViewMode}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gerente">
              Gerente Responsable <span className="text-red-500">*</span>
            </Label>
            <Select
              value={gerenteId}
              onValueChange={(value) => {
                setGerenteId(value)
                if (errors.gerenteId) {
                  setErrors({ ...errors, gerenteId: "" })
                }
              }}
              disabled={isViewMode}
            >
              <SelectTrigger className={errors.gerenteId ? "border-red-500" : ""}>
                <SelectValue placeholder="Seleccione un gerente" />
              </SelectTrigger>
              <SelectContent>
                {gerentesDisponibles.map((gerente) => (
                  <SelectItem key={gerente.id} value={gerente.id.toString()}>
                    {gerente.nombre} - {gerente.area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gerenteId && <p className="text-red-500 text-sm">{errors.gerenteId}</p>}
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || isViewMode}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {getButtonText()}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
