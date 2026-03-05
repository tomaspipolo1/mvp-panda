"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Paperclip, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface DetalleSolicitudMiBuzonModalProps {
  isOpen: boolean
  onClose: () => void
  solicitud: any
}

export function DetalleSolicitudMiBuzonModal({ isOpen, onClose, solicitud }: DetalleSolicitudMiBuzonModalProps) {
  // Estado para el modal de confirmación personalizado
  const [showConfirmacion, setShowConfirmacion] = useState(false)
  const [accion, setAccion] = useState<"aceptar" | "rechazar" | null>(null)
  const [procesando, setProcesando] = useState(false)

  // Cerrar el modal de confirmación cuando el modal principal se cierra
  useEffect(() => {
    if (!isOpen) {
      // Si el modal principal se cierra, asegurarse de que el modal de confirmación también esté cerrado
      setShowConfirmacion(false)
    }
  }, [isOpen])

  if (!solicitud) return null

  const handleAccion = (tipo: "aceptar" | "rechazar") => {
    // Primero cerramos el modal principal
    onClose()

    // Establecemos la acción
    setAccion(tipo)

    // Abrimos el modal de confirmación después de un breve retraso
    setTimeout(() => {
      setShowConfirmacion(true)
    }, 100)
  }

  const confirmarAccion = () => {
    setProcesando(true)

    // Simulación de procesamiento
    setTimeout(() => {
      setProcesando(false)
      setShowConfirmacion(false)
    }, 1000)
  }

  const handleCancelarConfirmacion = () => {
    setShowConfirmacion(false)
  }

  return (
    <>
      {/* Modal principal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle de Solicitud</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Encabezado */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{solicitud.asunto}</h3>
                <p className="text-sm text-gray-500">
                  {solicitud.tipoEntidad} - {solicitud.numeroSolicitud}
                </p>
              </div>
              <Badge
                className={`${
                  solicitud.estado === "Pendiente"
                    ? "bg-yellow-100 text-yellow-800"
                    : solicitud.estado === "Procesada" || solicitud.estado === "Respondida"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {solicitud.estado}
              </Badge>
            </div>

            <Separator />

            {/* Información principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Remitente</h4>
                <p className="text-sm">{solicitud.remitente}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Categoría</h4>
                <p className="text-sm">{solicitud.categoria}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Fecha y hora</h4>
                <p className="text-sm">
                  {solicitud.fecha} - {solicitud.hora}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Prioridad</h4>
                <p className="text-sm">{solicitud.prioridad}</p>
              </div>
            </div>

            <Separator />

            {/* Contenido */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Contenido de la solicitud</h4>
              <div className="bg-gray-50 p-4 rounded-md text-sm">{solicitud.contenido}</div>
            </div>

            {/* Archivos adjuntos */}
            {solicitud.adjuntos && solicitud.adjuntos.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Archivos adjuntos</h4>
                <div className="space-y-2">
                  {solicitud.adjuntos.map((adjunto: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <Paperclip className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{adjunto}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              {solicitud.estado === "Pendiente" && (
                <>
                  <Button variant="destructive" onClick={() => handleAccion("rechazar")}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Rechazar
                  </Button>
                  <Button variant="default" onClick={() => handleAccion("aceptar")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aceptar
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación personalizado */}
      {showConfirmacion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
            <div className="flex items-center mb-4">
              {accion === "aceptar" ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  <h3 className="text-lg font-medium">Confirmar aprobación</h3>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  <h3 className="text-lg font-medium">Confirmar rechazo</h3>
                </>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-6">
              {accion === "aceptar"
                ? "¿Está seguro que desea aprobar esta solicitud? Esta acción no se puede deshacer."
                : "¿Está seguro que desea rechazar esta solicitud? Esta acción no se puede deshacer."}
            </p>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancelarConfirmacion} disabled={procesando}>
                Cancelar
              </Button>
              <Button
                onClick={confirmarAccion}
                disabled={procesando}
                className={accion === "aceptar" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
              >
                {procesando ? "Procesando..." : accion === "aceptar" ? "Aprobar" : "Rechazar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
