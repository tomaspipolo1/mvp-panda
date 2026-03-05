"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, UserX, Calendar, FileText, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Empleado {
  id: number
  nombre: string
  apellido: string
  dni: string
  cuil?: string
  fechaNacimiento?: string
  sexo?: string
  legajo: string
  fechaIngreso?: string
  gerencia: string
  departamento: string
  cargo: string
  estado: string
  email?: string
  telefono?: string
}

interface ConfirmarBajaEmpleadoModalProps {
  empleado: Empleado | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (empleadoId: number, motivo: string, observaciones: string) => void
}

const motivosBaja = [
  "Renuncia voluntaria",
  "Despido con causa",
  "Despido sin causa",
  "Finalización de contrato",
  "Jubilación",
  "Fallecimiento",
  "Abandono de trabajo",
  "Mutuo acuerdo",
  "Incapacidad permanente",
  "Otro",
]

export function ConfirmarBajaEmpleadoModal({ empleado, isOpen, onClose, onConfirm }: ConfirmarBajaEmpleadoModalProps) {
  const [motivo, setMotivo] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // Limpiar el formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setMotivo("")
      setObservaciones("")
      setIsLoading(false)
      setIsCompleted(false)
    }
  }, [isOpen])

  if (!empleado || !isOpen) return null

  const handleConfirm = async () => {
    if (!motivo.trim()) {
      return
    }

    setIsLoading(true)
    try {
      await onConfirm(empleado.id, motivo, observaciones)
      setIsCompleted(true)
    } catch (error) {
      console.error("Error al dar de baja:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Vista de éxito
  if (isCompleted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <CheckCircle className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Baja Procesada Exitosamente</h2>
          </div>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">
                El empleado {empleado.nombre} {empleado.apellido} ha sido dado de baja exitosamente.
              </p>
              <p className="text-sm text-muted-foreground">
                Se ha enviado una notificación al departamento de RRHH y se ha actualizado el estado del empleado.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleClose} className="w-full">
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Vista del formulario
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <UserX className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Confirmar Baja de Empleado</h2>
        </div>

        <div className="space-y-4">
          {/* Advertencia */}
          <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">¡Atención! Esta acción dará de baja al empleado</p>
              <p className="text-xs text-red-700">
                El empleado no podrá acceder al sistema y su estado cambiará a "Inactivo". Esta acción NO puede ser
                revertida.
              </p>
            </div>
          </div>

          {/* Información del empleado */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Datos del Empleado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nombre completo</p>
                <p className="font-medium">
                  {empleado.nombre} {empleado.apellido}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">DNI</p>
                <p className="font-medium">{empleado.dni}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Legajo</p>
                <p className="font-medium">{empleado.legajo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado actual</p>
                <Badge variant="default">{empleado.estado}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gerencia</p>
                <p className="font-medium">{empleado.gerencia}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Departamento</p>
                <p className="font-medium">{empleado.departamento}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cargo</p>
                <p className="font-medium">{empleado.cargo}</p>
              </div>
              {empleado.fechaIngreso && (
                <div>
                  <p className="text-sm text-gray-600">Fecha de ingreso</p>
                  <p className="font-medium">{formatearFecha(empleado.fechaIngreso)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Formulario de baja */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="motivo" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Motivo de la baja *
              </Label>
              <Select value={motivo} onValueChange={setMotivo} disabled={isLoading}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccione el motivo de la baja" />
                </SelectTrigger>
                <SelectContent>
                  {motivosBaja.map((motivoItem) => (
                    <SelectItem key={motivoItem} value={motivoItem}>
                      {motivoItem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="observaciones">Observaciones adicionales</Label>
              <Textarea
                id="observaciones"
                placeholder="Observaciones sobre la baja (opcional)"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="mt-1"
                rows={2}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">Quedarán registradas en el historial</p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Información importante:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• El empleado no podrá acceder al sistema</li>
                <li>• Su estado cambiará a "Inactivo"</li>
                <li>• Se mantendrá el historial y los datos</li>
              </ul>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• La baja es PERMANENTE</li>
                <li>• Se enviará notificación a RRHH</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!motivo.trim() || isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Procesando...
              </>
            ) : (
              <>
                <UserX className="h-4 w-4" />
                Confirmar Baja
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
