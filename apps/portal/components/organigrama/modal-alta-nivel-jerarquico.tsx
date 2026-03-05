"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Crown, AlertCircle } from "lucide-react"

interface ModalAltaNivelJerarquicoProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  modo: "crear" | "editar" | "ver"
  nivelInicial?: any
}

// Lista de cargos disponibles con sus códigos
const cargosDisponibles = [
  { id: "gerente", nombre: "Gerente", codigo: "GER" },
  { id: "coordinador-superior", nombre: "Coordinador Superior", codigo: "COOSUPE" },
  { id: "coordinador", nombre: "Coordinador", codigo: "COORD" },
  { id: "subcoordinador-superior", nombre: "Subcoordinador Superior", codigo: "SUBSUPE" },
  { id: "subcoordinador", nombre: "Subcoordinador", codigo: "SUBCOOR" },
  { id: "supervisor", nombre: "Supervisor", codigo: "SUPERV" },
  { id: "jefe-area", nombre: "Jefe de Área", codigo: "JEFAREA" },
  { id: "especialista", nombre: "Especialista", codigo: "ESP" },
  { id: "analista", nombre: "Analista", codigo: "ANAL" },
  { id: "asistente", nombre: "Asistente", codigo: "ASIST" },
  { id: "operario", nombre: "Operario", codigo: "OPER" },
]

export default function ModalAltaNivelJerarquico({
  isOpen,
  onClose,
  onSubmit,
  modo,
  nivelInicial,
}: ModalAltaNivelJerarquicoProps) {
  const [formData, setFormData] = useState({
    nivel: "",
    cargo: "",
    codigo: "",
    descripcion: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (nivelInicial && (modo === "editar" || modo === "ver")) {
      setFormData({
        nivel: nivelInicial.nivel.toString(),
        cargo: nivelInicial.cargo,
        codigo: nivelInicial.codigo,
        descripcion: nivelInicial.descripcion,
      })
    } else {
      setFormData({
        nivel: "",
        cargo: "",
        codigo: "",
        descripcion: "",
      })
    }
    setErrors({})
  }, [nivelInicial, modo, isOpen])

  if (!isOpen) return null

  const handleCargoChange = (cargoSeleccionado: string) => {
    const cargo = cargosDisponibles.find((c) => c.nombre === cargoSeleccionado)
    setFormData((prev) => ({
      ...prev,
      cargo: cargoSeleccionado,
      codigo: cargo ? cargo.codigo : "",
    }))
    if (errors.cargo) {
      setErrors((prev) => ({ ...prev, cargo: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nivel) {
      newErrors.nivel = "El nivel es obligatorio"
    } else if (isNaN(Number(formData.nivel)) || Number(formData.nivel) < 1) {
      newErrors.nivel = "El nivel debe ser un número mayor a 0"
    }

    if (!formData.cargo) {
      newErrors.cargo = "El cargo es obligatorio"
    }

    if (!formData.codigo) {
      newErrors.codigo = "El código es obligatorio"
    }

    if (!formData.descripcion) {
      newErrors.descripcion = "La descripción es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSubmit({
        ...formData,
        nivel: Number(formData.nivel),
      })
      onClose()
    } catch (error) {
      console.error("Error al guardar nivel jerárquico:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTitulo = () => {
    switch (modo) {
      case "crear":
        return "Nuevo Nivel Jerárquico"
      case "editar":
        return "Editar Nivel Jerárquico"
      case "ver":
        return "Detalles del Nivel Jerárquico"
      default:
        return "Nivel Jerárquico"
    }
  }

  const isReadOnly = modo === "ver"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Crown className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{getTitulo()}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nivel */}
            <div className="space-y-2">
              <Label htmlFor="nivel" className="text-sm font-medium text-gray-700">
                Nivel *
              </Label>
              <Input
                id="nivel"
                type="number"
                min="1"
                value={formData.nivel}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, nivel: e.target.value }))
                  if (errors.nivel) setErrors((prev) => ({ ...prev, nivel: "" }))
                }}
                disabled={isReadOnly}
                className={errors.nivel ? "border-red-500" : ""}
                placeholder="Ej: 1, 2, 3..."
              />
              {errors.nivel && (
                <div className="flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.nivel}
                </div>
              )}
            </div>

            {/* Cargo */}
            <div className="space-y-2">
              <Label htmlFor="cargo" className="text-sm font-medium text-gray-700">
                Cargo *
              </Label>
              {isReadOnly ? (
                <Input value={formData.cargo} disabled className="bg-gray-50" />
              ) : (
                <Select value={formData.cargo} onValueChange={handleCargoChange}>
                  <SelectTrigger className={errors.cargo ? "border-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargosDisponibles.map((cargo) => (
                      <SelectItem key={cargo.id} value={cargo.nombre}>
                        <div className="flex items-center justify-between w-full">
                          <span>{cargo.nombre}</span>
                          <span className="text-xs text-gray-500 ml-2">({cargo.codigo})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.cargo && (
                <div className="flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.cargo}
                </div>
              )}
            </div>
          </div>

          {/* Código */}
          <div className="space-y-2">
            <Label htmlFor="codigo" className="text-sm font-medium text-gray-700">
              Código *
            </Label>
            <Input
              id="codigo"
              value={formData.codigo}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, codigo: e.target.value.toUpperCase() }))
                if (errors.codigo) setErrors((prev) => ({ ...prev, codigo: "" }))
              }}
              disabled={isReadOnly}
              className={`${errors.codigo ? "border-red-500" : ""} ${!isReadOnly ? "bg-gray-50" : ""}`}
              placeholder="Se autocompleta al seleccionar cargo"
              style={{ textTransform: "uppercase" }}
            />
            {errors.codigo && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.codigo}
              </div>
            )}
            {!isReadOnly && (
              <p className="text-xs text-gray-500">
                El código se autocompleta al seleccionar un cargo, pero puedes modificarlo si es necesario
              </p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
              Descripción *
            </Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, descripcion: e.target.value }))
                if (errors.descripcion) setErrors((prev) => ({ ...prev, descripcion: "" }))
              }}
              disabled={isReadOnly}
              className={errors.descripcion ? "border-red-500" : ""}
              placeholder="Describe las responsabilidades y funciones de este nivel jerárquico"
              rows={4}
            />
            {errors.descripcion && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.descripcion}
              </div>
            )}
          </div>

          {/* Información adicional para modo ver */}
          {modo === "ver" && nivelInicial && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-gray-900">Información adicional</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Empleados asignados:</span>
                  <span className="ml-2 font-medium">{nivelInicial.empleados || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Estado:</span>
                  <span className="ml-2 font-medium text-green-600">Activo</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              {modo === "ver" ? "Cerrar" : "Cancelar"}
            </Button>
            {!isReadOnly && (
              <Button type="submit" disabled={isLoading} className="bg-plp-dark hover:bg-plp-medium">
                {isLoading ? "Guardando..." : modo === "crear" ? "Crear Nivel" : "Actualizar"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
