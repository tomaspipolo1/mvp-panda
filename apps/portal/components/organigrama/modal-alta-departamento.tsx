"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Loader2, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Datos de ejemplo para las gerencias
const gerencias = [
  { id: 1, nombre: "Gerencia de Administración", codigo: "GA" },
  { id: 2, nombre: "Gerencia de Legales", codigo: "GL" },
  { id: 3, nombre: "Gerencia de RRHH RRII y Comunidad", codigo: "GRIC" },
  { id: 4, nombre: "Gerencia de Operaciones", codigo: "GO" },
  { id: 5, nombre: "Gerencia de Infraestructura y Mantenimiento", codigo: "GIM" },
  { id: 6, nombre: "Presidencia", codigo: "PRES" },
]

// Datos de ejemplo para los superiores (coordinadores y subcoordinadores)
const superioresDisponibles = [
  { id: 1, nombre: "Laura Sánchez", cargo: "Coordinador Superior", area: "Administración" },
  { id: 2, nombre: "Pedro Ramírez", cargo: "Coordinador", area: "Legales" },
  { id: 3, nombre: "Elena Castro", cargo: "Coordinador", area: "RRHH" },
  { id: 4, nombre: "Ricardo Vega", cargo: "Coordinador", area: "Operaciones" },
  { id: 5, nombre: "Sofía Mendoza", cargo: "Coordinador", area: "Infraestructura" },
  { id: 6, nombre: "Javier Ruiz", cargo: "Coordinador", area: "Sistemas" },
  { id: 7, nombre: "Mónica Silva", cargo: "Coordinador", area: "Mesa de Entradas" },
  { id: 8, nombre: "Alberto Díaz", cargo: "Coordinador", area: "Tesorería" },
  { id: 9, nombre: "Claudia Herrera", cargo: "Coordinador", area: "Ingresos" },
  { id: 10, nombre: "Andrés Moreno", cargo: "Coordinador", area: "Compras" },
  { id: 11, nombre: "Isabel García", cargo: "Coordinador", area: "Contable" },
  { id: 12, nombre: "Raúl Jiménez", cargo: "Coordinador", area: "Gestión RRHH" },
  { id: 13, nombre: "Natalia Vargas", cargo: "Subcoordinador", area: "Relaciones Institucionales" },
  { id: 14, nombre: "Gonzalo Ramos", cargo: "Subcoordinador", area: "Unidad Comercial" },
  { id: 15, nombre: "Rodrigo Peña", cargo: "Subcoordinador", area: "Asuntos Jurídicos" },
  { id: 16, nombre: "Carmen Delgado", cargo: "Subcoordinador", area: "Secretaría Presidencia" },
  { id: 17, nombre: "Roberto Vásquez", cargo: "Subcoordinador", area: "Secretaría Directorio" },
  { id: 18, nombre: "Diego Fernández", cargo: "Subcoordinador", area: "Batimetrías" },
  { id: 19, nombre: "Patricia Morales", cargo: "Subcoordinador", area: "Dragado" },
  { id: 20, nombre: "Carlos Ruiz", cargo: "Subcoordinador", area: "Obras Terrestres" },
  { id: 21, nombre: "Miguel Torres", cargo: "Subcoordinador", area: "Seguridad Integral" },
  { id: 22, nombre: "Valeria Campos", cargo: "Coordinador", area: "Comunidad" },
  { id: 23, nombre: "Marcela Ortega", cargo: "Coordinador", area: "Asuntos Legales" },
]

interface Departamento {
  id: number
  codigo: string
  nombre: string
  descripcion: string
  gerencia: string
  gerenciaId?: string
  superior: string
  superiorId?: string
  cantidadEmpleados: number
  estado: string
}

interface ModalAltaDepartamentoProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: (departamento: any) => void
  mode?: "crear" | "editar" | "ver"
  departamento?: Departamento
}

export function ModalAltaDepartamento({
  isOpen,
  onClose,
  onConfirm,
  mode = "crear",
  departamento,
}: ModalAltaDepartamentoProps) {
  const [codigo, setCodigo] = useState("")
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [gerenciaId, setGerenciaId] = useState("")
  const [superiorId, setSuperiorId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos si estamos en modo editar o ver
  useEffect(() => {
    if (departamento && (mode === "editar" || mode === "ver")) {
      setCodigo(departamento.codigo || "")
      setNombre(departamento.nombre || "")
      setDescripcion(departamento.descripcion || "")

      // Buscar el ID de la gerencia basado en el nombre
      const gerenciaEncontrada = gerencias.find((g) => g.nombre === departamento.gerencia)
      setGerenciaId(gerenciaEncontrada ? gerenciaEncontrada.id.toString() : "")

      // Buscar el ID del superior basado en el nombre
      const superiorEncontrado = superioresDisponibles.find((s) => s.nombre === departamento.superior)
      setSuperiorId(superiorEncontrado ? superiorEncontrado.id.toString() : "")
    }
  }, [departamento, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validaciones
    if (!codigo || !nombre || !gerenciaId || !superiorId) {
      setError("Por favor complete todos los campos obligatorios.")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulación de envío al servidor
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const gerenciaSeleccionada = gerencias.find((g) => g.id.toString() === gerenciaId)
      const superiorSeleccionado = superioresDisponibles.find((s) => s.id.toString() === superiorId)

      const departamentoData = {
        id: departamento?.id || Math.floor(Math.random() * 1000),
        codigo: codigo.toUpperCase(),
        nombre,
        descripcion,
        gerencia: gerenciaSeleccionada?.nombre || "",
        gerenciaId,
        superior: superiorSeleccionado?.nombre || "",
        superiorId,
        cantidadEmpleados: departamento?.cantidadEmpleados || 0,
        estado: "Activo",
      }

      // Llamar al callback con los datos
      if (onConfirm) {
        onConfirm(departamentoData)
      }

      // Resetear formulario y cerrar modal
      setIsSubmitting(false)
      handleReset()
      onClose()
    } catch (err) {
      setError("Ocurrió un error. Intente nuevamente.")
      console.error(err)
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setCodigo("")
    setNombre("")
    setDescripcion("")
    setGerenciaId("")
    setSuperiorId("")
    setError(null)
  }

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null

  const isViewMode = mode === "ver"
  const title =
    mode === "crear" ? "Nuevo Departamento" : mode === "editar" ? "Editar Departamento" : "Detalles del Departamento"
  const buttonText = mode === "crear" ? "Guardar" : mode === "editar" ? "Actualizar" : "Cerrar"

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" disabled={isSubmitting}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigo" className="text-right">
                  Código <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ej: CONT"
                  className="uppercase"
                  maxLength={10}
                  disabled={isViewMode}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-right">
                  Nombre <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Contabilidad"
                  disabled={isViewMode}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gerencia" className="text-right">
                Gerencia <span className="text-red-500">*</span>
              </Label>
              <Select value={gerenciaId} onValueChange={setGerenciaId} disabled={isViewMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una gerencia" />
                </SelectTrigger>
                <SelectContent>
                  {gerencias.map((gerencia) => (
                    <SelectItem key={gerencia.id} value={gerencia.id.toString()}>
                      {gerencia.nombre} ({gerencia.codigo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="superior" className="text-right">
                Superior a cargo <span className="text-red-500">*</span>
              </Label>
              <Select value={superiorId} onValueChange={setSuperiorId} disabled={isViewMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un superior" />
                </SelectTrigger>
                <SelectContent>
                  {superioresDisponibles.map((superior) => (
                    <SelectItem key={superior.id} value={superior.id.toString()}>
                      {superior.nombre} - {superior.cargo} ({superior.area})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción del departamento y sus funciones principales"
                rows={3}
                disabled={isViewMode}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 p-4 border-t">
            {mode !== "ver" && (
              <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
            )}
            <Button
              type={mode === "ver" ? "button" : "submit"}
              onClick={mode === "ver" ? onClose : undefined}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
