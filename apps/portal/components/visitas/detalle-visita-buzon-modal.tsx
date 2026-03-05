"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  X,
  Download,
  Printer,
  Calendar,
  MapPin,
  Users,
  Truck,
  Clock,
  CheckCircle,
  Package,
  User,
  Building,
  Phone,
  Mail,
  CreditCard,
  Car,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AsignarEmpleadoModal } from "@/components/solicitudes/asignar-empleado-modal"

interface DetalleVisitaBuzonModalProps {
  isOpen: boolean
  onClose: () => void
  visita: any
}

export function DetalleVisitaBuzonModal({ isOpen, onClose, visita }: DetalleVisitaBuzonModalProps) {
  const [showAsignarModal, setShowAsignarModal] = useState(false)

  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Bloquear scroll del body
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen || !visita) return null

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Aprobada":
        return "bg-green-100 text-green-800"
      case "Rechazada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleTomar = () => {
    console.log("Tomando visita:", visita.id)
    // Aquí iría la lógica para tomar la visita
    onClose()
  }

  const handleAsignar = (empleado: any) => {
    console.log("Asignando visita a:", empleado.nombre)
    // Aquí iría la lógica para asignar la visita
    setShowAsignarModal(false)
  }

  // Función para manejar el clic en el overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={handleOverlayClick}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 flex items-center">
                {visita.tipoVisita === "Transporte Cargas" ? (
                  <Truck className="h-5 w-5 mr-2" />
                ) : (
                  <Building className="h-5 w-5 mr-2" />
                )}
                {visita.tipoVisita}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  {visita.tipoVisita === "Transporte Cargas"
                    ? `De: ${visita.proveedor?.razonSocial}`
                    : `Solicitante: ${visita.personas?.[0]?.nombre}`}
                </span>
                <span>•</span>
                <span>
                  {visita.fechaSolicitud} a las {visita.horaSolicitud}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={`${getEstadoColor(visita.estado)}`}>{visita.estado}</Badge>
              <Button variant="ghost" size="icon" onClick={() => window.print()}>
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contenido */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="p-6 space-y-6">
              {/* Información específica según el tipo de visita */}
              {visita.tipoVisita === "Transporte Cargas" ? (
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Información del Proveedor
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-gray-700">Razón Social:</span>
                        <p className="text-gray-900">{visita.proveedor?.razonSocial}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">CUIT:</span>
                        <p className="text-gray-900">{visita.proveedor?.cuit}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <p className="text-gray-900 flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {visita.proveedor?.email}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Teléfono:</span>
                        <p className="text-gray-900 flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {visita.proveedor?.telefono}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Coordinador de la visita para tipo Guiada o Evento */}
                  {(visita.tipoVisita === "Guiada" || visita.tipoVisita === "Evento") && visita.coordinador && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Coordinador de la visita
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <span className="font-medium text-gray-700">Nombre completo:</span>
                            <p className="text-gray-900">{visita.coordinador.nombreCompleto}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">DNI:</span>
                            <p className="text-gray-900">{visita.coordinador.dni}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Email:</span>
                            <p className="text-gray-900">{visita.coordinador.email}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Teléfono:</span>
                            <p className="text-gray-900">{visita.coordinador.telefono}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Solo mostrar Personas que Asistirán si NO es Evento */}
                  {visita.tipoVisita !== "Evento" && (
                    <>
                      <h3 className="font-semibold text-lg mb-3 flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Personas que Asistirán
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-4">
                          {visita.personas?.map((persona: any, index: number) => (
                            <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <span className="font-medium text-gray-700">Nombre:</span>
                                  <p className="text-gray-900">{persona.nombre}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">Apellido:</span>
                                  <p className="text-gray-900">{persona.apellido}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">DNI:</span>
                                  <p className="text-gray-900">{persona.dni}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Detalles de la Visita */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Detalles de la Visita
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="font-medium text-gray-700">Destino:</span>
                      <p className="text-gray-900 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {visita.destino}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fecha y Hora Desde:</span>
                      <p className="text-gray-900 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {visita.fechaDesde} - {visita.horaDesde}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fecha y Hora Hasta:</span>
                      <p className="text-gray-900 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {visita.fechaHasta} - {visita.horaHasta}
                      </p>
                    </div>
                  </div>

                  {/* Información específica de Transporte Cargas */}
                  {visita.tipoVisita === "Transporte Cargas" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Operación:</span>
                        <p className="text-gray-900 flex items-center">
                          <Package className="h-4 w-4 mr-1" />
                          {visita.operacion}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Tipo de Carga:</span>
                        <p className="text-gray-900">{visita.tipoCarga}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Información del Vehículo */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Vehículo
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">Patente:</span>
                      <p className="text-gray-900 font-mono">{visita.vehiculo?.patente}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Tipo:</span>
                      <p className="text-gray-900">{visita.vehiculo?.tipo}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Marca:</span>
                      <p className="text-gray-900">{visita.vehiculo?.marca}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Modelo:</span>
                      <p className="text-gray-900">{visita.vehiculo?.modelo}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del Conductor */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Conductor
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">Nombre:</span>
                      <p className="text-gray-900">{visita.conductor?.nombre}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">DNI:</span>
                      <p className="text-gray-900 flex items-center">
                        <CreditCard className="h-4 w-4 mr-1" />
                        {visita.conductor?.dni}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Licencia:</span>
                      <p className="text-gray-900">{visita.conductor?.licencia}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Teléfono:</span>
                      <p className="text-gray-900 flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {visita.conductor?.telefono}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              {visita.observaciones && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Observaciones</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{visita.observaciones}</p>
                  </div>
                </div>
              )}

              {/* Historial de Acciones */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Historial de Acciones</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-500">
                      {visita.fechaSolicitud} {visita.horaSolicitud}
                    </span>
                    <span className="text-gray-700">
                      Solicitud recibida{" "}
                      {visita.tipoVisita === "Transporte Cargas"
                        ? `de ${visita.proveedor?.razonSocial}`
                        : `de ${visita.personas?.[0]?.nombre}`}
                    </span>
                  </div>
                  {visita.estado === "Aprobada" && (
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-500">2024-01-15 14:30</span>
                      <span className="text-gray-700">Visita aprobada por María González</span>
                    </div>
                  )}
                  {visita.estado === "Rechazada" && (
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-500">2024-01-17 16:15</span>
                      <span className="text-gray-700">Visita rechazada por falta de documentación</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              Solicitud #{visita.numeroSolicitud} • Recibida el {visita.fechaSolicitud}
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <Button onClick={handleTomar} className="bg-blue-600 hover:bg-blue-700">
                <CheckCircle className="h-4 w-4 mr-1" />
                Tomar
              </Button>
              <Button onClick={() => setShowAsignarModal(true)} variant="outline">
                <Users className="h-4 w-4 mr-1" />
                Asignar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Asignación */}
      <AsignarEmpleadoModal
        isOpen={showAsignarModal}
        onClose={() => setShowAsignarModal(false)}
        onAsignar={handleAsignar}
        solicitudNumero={visita.numeroSolicitud}
      />
    </>
  )
}
