"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy, Share2, X, Mail, AlertCircle } from "lucide-react"
import Image from "next/image"

interface ModalInvitacionVisitaProps {
  isOpen: boolean
  onClose: () => void
  datosVisita: any
}

export function ModalInvitacionVisita({ isOpen, onClose, datosVisita }: ModalInvitacionVisitaProps) {
  const [copiado, setCopiado] = useState(false)
  const [email, setEmail] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const linkRef = useRef<HTMLInputElement>(null)

  // URL de ejemplo para la invitación
  const urlInvitacion = `https://plp.gob.ar/visita/${datosVisita?.id || "VIS-18327"}`

  // Función para copiar el enlace al portapapeles
  const copiarEnlace = () => {
    if (linkRef.current) {
      linkRef.current.select()
      document.execCommand("copy")
      setCopiado(true)

      // Resetear el estado después de 2 segundos
      setTimeout(() => {
        setCopiado(false)
      }, 2000)
    }
  }

  // Función para compartir (en dispositivos móviles)
  const compartir = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Invitación visita Puerto La Plata",
          text: `Has sido invitado a visitar Puerto La Plata el ${datosVisita?.fechaDesde ? new Date(datosVisita.fechaDesde).toLocaleDateString("es-AR") : "fecha programada"}.`,
          url: urlInvitacion,
        })
      } catch (error) {
        console.error("Error al compartir:", error)
      }
    }
  }

  // Validar email
  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Función para enviar la invitación por correo
  const enviarPorCorreo = () => {
    // Resetear estados
    setError(null)

    // Validar email
    if (!email) {
      setError("Por favor, ingrese un correo electrónico")
      return
    }

    if (!validarEmail(email)) {
      setError("Por favor, ingrese un correo electrónico válido")
      return
    }

    // Simular envío
    setEnviando(true)

    setTimeout(() => {
      setEnviando(false)
      setEnviado(true)

      // Resetear después de 3 segundos
      setTimeout(() => {
        setEnviado(false)
      }, 3000)
    }, 1500)
  }

  // Limpiar estados al cerrar
  const handleClose = () => {
    setEmail("")
    setError(null)
    setEnviado(false)
    setEnviando(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-3">
          <div className="flex justify-between items-center">
            <DialogTitle>Invitación enviada correctamente</DialogTitle>
            
          </div>
        </DialogHeader>

        {/* Contenido principal - 2 columnas en desktop, 1 columna en móvil */}
        <div className="px-6 py-3 grid grid-cols-1 sm:grid-cols-5 gap-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
          {/* Columna izquierda - Datos de la visita (3/5 del ancho) */}
          <div className="space-y-4 order-2 sm:order-1 sm:col-span-3">
            {/* Detalles de la visita */}
            <div className="w-full bg-gray-50 p-4 rounded-lg text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Tipo de visita:</div>
                <div>{datosVisita?.tipoVisita || "Laboral"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Fecha:</div>
                <div>
                  {datosVisita?.fechaDesde ? new Date(datosVisita.fechaDesde).toLocaleDateString("es-AR") : "24/4/2025"}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Hora:</div>
                <div>
                  {datosVisita?.horaDesde || "00:00"} a {datosVisita?.horaHasta || "00:00"}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Personas:</div>
                <div>{datosVisita?.personas?.length || 1}</div>
              </div>
            </div>

            {/* Campo de enlace */}
            <div className="w-full relative">
              <input
                ref={linkRef}
                type="text"
                value={urlInvitacion}
                readOnly
                className="w-full pr-10 border rounded-md py-2 px-3 text-sm"
              />
              <button
                onClick={copiarEnlace}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Copiar enlace"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>

            
          </div>

          {/* Columna derecha - Código QR (2/5 del ancho) */}
          <div className="flex justify-center items-start order-1 sm:order-2 sm:col-span-2">
            <div className="bg-white p-4 rounded-lg border">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(urlInvitacion)}`}
                alt="Código QR para la visita"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Footer con botones */}
        <div className="px-6 py-4 border-t">
          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cerrar
            </Button>
            <Button variant="outline" onClick={compartir} className="flex-1 flex justify-center items-center gap-1">
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
            <Button
              onClick={copiarEnlace}
              className="flex-1 bg-black text-white hover:bg-gray-800 flex justify-center items-center gap-1"
            >
              {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiado ? "¡Copiado!" : "Copiar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
