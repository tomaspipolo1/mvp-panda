"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Download, Paperclip, UserCheck, Users, FileText, User, Clock, Calendar, Building, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AsignarEmpleadoModal } from "./asignar-empleado-modal"

interface DetalleSolicitudBuzonModalProps {
  isOpen: boolean
  onClose: () => void
  solicitud: {
    id: number
    remitente: string
    tipoSolicitante: string
    asunto: string
    tipoSolicitud: string
    fecha: string
    hora: string
    leido: boolean
    estado: string
    adjuntos: string[]
    contenido: string
    prioridad: string
    numeroSolicitud: string
    correo: string
    departamento: string
    asignacion: string
    ultimaActualizacion: string
  } | null
}

export function DetalleSolicitudBuzonModal({ isOpen, onClose, solicitud }: DetalleSolicitudBuzonModalProps) {
  const [modalAsignarAbierto, setModalAsignarAbierto] = useState(false)

  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Bloquear el scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      // Restaurar el scroll del body cuando el modal se cierra
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  // Si el modal no está abierto o no hay solicitud, no renderizar nada
  if (!isOpen || !solicitud) return null

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "Media":
        return "bg-yellow-100 text-yellow-800"
      case "Baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para manejar el clic en el overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Solo cerrar si se hizo clic directamente en el overlay, no en su contenido
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleTomar = () => {
    // Lógica para tomar la solicitud
    console.log("Tomando solicitud:", solicitud.numeroSolicitud)
    // Aquí podrías actualizar el estado de la solicitud
  }

  const handleAsignar = (empleado: any) => {
    // Lógica para asignar la solicitud al empleado seleccionado
    console.log("Asignando solicitud:", solicitud.numeroSolicitud, "a:", empleado.nombre, empleado.apellido)
    // Aquí podrías actualizar el estado de la solicitud y el empleado asignado
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={handleOverlayClick}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[85vh] overflow-y-auto mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{solicitud.asunto}</h2>
              <p className="text-sm text-gray-600">
                De: {solicitud.remitente} ({solicitud.tipoSolicitante})
              </p>
              <p className="text-xs text-gray-500">
                {solicitud.fecha} a las {solicitud.hora}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              
              <Button type="button" variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Tipo de solicitud:</span>
                  </div>
                  <p className="text-sm font-medium">{solicitud.tipoSolicitud}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Solicitante:</span>
                  </div>
                  <p className="text-sm font-medium">{solicitud.remitente}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Correo:</span>
                  </div>
                  <p className="text-sm font-medium">{solicitud.correo}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Departamento:</span>
                  </div>
                  <p className="text-sm font-medium">{solicitud.departamento}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Fecha:</span>
                  </div>
                  <p className="text-sm font-medium">{solicitud.fecha}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Asignación:</span>
                  </div>
                  <Badge
                    className={`${
                      solicitud.asignacion === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {solicitud.asignacion}
                  </Badge>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Última Actualización:</span>
                  </div>
                  <p className="text-sm font-medium">{solicitud.ultimaActualizacion}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                  </div>
                  <Badge
                    className={`${
                      solicitud.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : solicitud.estado === "Procesada"
                          ? "bg-blue-100 text-blue-800"
                          : solicitud.estado === "Asignada"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                    }`}
                  >
                    {solicitud.estado}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Descripción</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{solicitud.contenido}</p>
              </div>
            </div>

            {solicitud.adjuntos.length > 0 && (
              <>
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Adjuntos:</h3>
                  <div className="space-y-3">
                    {/* Mostrar solo los primeros 3 documentos */}
                    {solicitud.adjuntos.slice(0, 3).map((adjunto: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Paperclip className="h-5 w-5 text-gray-400" />
                          <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                            {adjunto}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Descargar
                        </Button>
                      </div>
                    ))}
                    
                    {/* Mostrar contador de documentos adicionales si hay más de 3 */}
                    {solicitud.adjuntos.length > 3 && (
                      <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-700">
                          +{solicitud.adjuntos.length - 3} documentos cargados
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Separator className="my-6" />
              </>
            )}

            {/* Historial de acciones */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Historial de Acciones</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Solicitud recibida</span>
                    <span className="text-gray-500">
                      {solicitud.fecha} {solicitud.hora}
                    </span>
                  </div>
                  {solicitud.estado === "Procesada" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Solicitud procesada</span>
                      <span className="text-gray-500">{solicitud.fecha} 16:30</span>
                    </div>
                  )}
                  {solicitud.estado === "Asignada" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Solicitud asignada</span>
                      <span className="text-gray-500">{solicitud.fecha} 14:15</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer con acciones */}
          <div className="flex justify-between items-center p-6 border-t bg-gray-50">
            {solicitud.estado !== "Asignada" && (
              <div className="flex space-x-3">
                <Button onClick={handleTomar} className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Tomar
                </Button>
                <Button onClick={() => setModalAsignarAbierto(true)} variant="outline" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Asignar
                </Button>
              </div>
            )}
            <Button variant="outline" onClick={onClose} className={solicitud.estado === "Asignada" ? "ml-auto" : ""}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de asignación */}
      <AsignarEmpleadoModal
        isOpen={modalAsignarAbierto}
        onClose={() => setModalAsignarAbierto(false)}
        onAsignar={handleAsignar}
        solicitudNumero={solicitud?.numeroSolicitud || ""}
      />
    </>
  )
}
