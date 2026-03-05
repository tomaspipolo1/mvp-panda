"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, CheckCircle, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface AsignarEmpleadoModalProps {
  isOpen: boolean
  onClose: () => void
  onAsignar: (empleado: any) => void
  solicitudNumero: string
}

// Datos de ejemplo de empleados del departamento de compras
const empleadosCompras = [
  {
    id: 1,
    nombre: "María González",
    cargo: "Analista de Compras Senior",
    avatar: "/placeholder.svg?height=40&width=40&text=MG",
  },
  {
    id: 2,
    nombre: "Carlos Fernández",
    cargo: "Especialista en Proveedores",
    avatar: "/placeholder.svg?height=40&width=40&text=CF",
  },
  {
    id: 3,
    nombre: "Ana Martínez",
    cargo: "Analista de Compras",
    avatar: "/placeholder.svg?height=40&width=40&text=AM",
  },
  {
    id: 4,
    nombre: "Roberto Silva",
    cargo: "Coordinador de Compras",
    avatar: "/placeholder.svg?height=40&width=40&text=RS",
  },
  {
    id: 5,
    nombre: "Laura Pérez",
    cargo: "Analista de Compras Junior",
    avatar: "/placeholder.svg?height=40&width=40&text=LP",
  },
]

// Datos de ejemplo de departamentos
const departamentos = [
  "Compras",
  "Contabilidad",
  "Recursos Humanos",
  "Mesa de Entradas",
  "Sistemas",
  "Gerencia",
]

export function AsignarEmpleadoModal({ isOpen, onClose, onAsignar, solicitudNumero }: AsignarEmpleadoModalProps) {
  const [tipoAsignacion, setTipoAsignacion] = useState("Empleado")
  const [busqueda, setBusqueda] = useState("")
  const [seleccion, setSeleccion] = useState<any>(null)

  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  // Limpiar estado al cerrar
  useEffect(() => {
    if (!isOpen) {
      setBusqueda("")
      setSeleccion(null)
      setTipoAsignacion("Empleado")
    }
  }, [isOpen])

  // Sugerencias según tipo y búsqueda
  const sugerencias = tipoAsignacion === "Empleado"
    ? empleadosCompras.filter(e =>
        e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.cargo.toLowerCase().includes(busqueda.toLowerCase())
      )
    : departamentos.filter(d => d.toLowerCase().includes(busqueda.toLowerCase()))

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null

  const handleAsignar = () => {
    if (seleccion) {
      onAsignar(seleccion)
      onClose()
    }
  }

  // Función para manejar el clic en el overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[70vh] overflow-hidden mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Asignar solicitud</h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asignar a</label>
            <Select value={tipoAsignacion} onValueChange={setTipoAsignacion}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Empleado">Empleado</SelectItem>
                <SelectItem value="Departamento">Departamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <Input
              placeholder={`Buscar ${tipoAsignacion.toLowerCase()}...`}
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full"
              disabled={!!seleccion}
            />
            <div className="mt-3 border rounded-md h-32 min-h-[120px] max-h-32 overflow-y-auto bg-white flex flex-col justify-start">
              {seleccion ? (
                <div className="flex items-center justify-between px-4 py-3 bg-blue-50 text-blue-700 font-medium">
                  <span>
                    {tipoAsignacion === "Empleado"
                      ? `${seleccion.nombre} (${seleccion.cargo})`
                      : seleccion}
                  </span>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => setSeleccion(null)}
                    type="button"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                sugerencias.length > 0 ? (
                  sugerencias.map((item: any) => (
                    <div
                      key={tipoAsignacion === "Empleado" ? item.id : item}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      onClick={() => setSeleccion(item)}
                    >
                      {tipoAsignacion === "Empleado"
                        ? `${item.nombre} (${item.cargo})`
                        : item}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-gray-400 text-center select-none">Sin resultados</div>
                )
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end space-x-3 p-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleAsignar} disabled={!seleccion}>
            Asignar
          </Button>
        </div>
      </div>
    </div>
  )
}
