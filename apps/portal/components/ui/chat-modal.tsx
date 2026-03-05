"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Paperclip, Send, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export type ChatMessage = {
  id: number
  autor: string
  contenido: string
  fecha: string
  hora: string
  esPropio: boolean
  adjuntos?: {
    nombre: string
    url: string
    tipo: string
  }[]
  tipo: 'texto' | 'archivo'
}

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  titulo: string
  subtitulo?: string
  mensajes: ChatMessage[]
  onEnviarMensaje: (contenido: string, adjuntos?: File[]) => void
  usuarioActual: string
  className?: string
}

export function ChatModal({
  isOpen,
  onClose,
  titulo,
  subtitulo,
  mensajes,
  onEnviarMensaje,
  usuarioActual,
  className
}: ChatModalProps) {
  const [nuevoMensaje, setNuevoMensaje] = useState("")
  const [adjuntos, setAdjuntos] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [mensajes])

  if (!isOpen) return null

  const handleEnviar = () => {
    if (nuevoMensaje.trim() || adjuntos.length > 0) {
      onEnviarMensaje(nuevoMensaje.trim(), adjuntos)
      setNuevoMensaje("")
      setAdjuntos([])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAdjuntos(prev => [...prev, ...files])
  }

  const removeAdjunto = (index: number) => {
    setAdjuntos(prev => prev.filter((_, i) => i !== index))
  }

  const formatearHora = (fecha: string, hora: string) => {
    return hora || new Date(fecha).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={cn("bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col", className)}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{titulo}</h3>
            {subtitulo && (
              <p className="text-sm text-gray-500">{subtitulo}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {mensajes.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No hay mensajes aún</p>
              <p className="text-sm">Inicia la conversación</p>
            </div>
          ) : (
            mensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={cn(
                  "flex flex-col",
                  mensaje.esPropio ? "items-end" : "items-start"
                )}
              >
                {/* Nombre del autor */}
                {!mensaje.esPropio && (
                  <span className="text-xs text-gray-500 mb-1 px-2">
                    {mensaje.autor}
                  </span>
                )}
                
                {/* Burbuja del mensaje */}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 break-words",
                    mensaje.esPropio
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                  )}
                >
                  {/* Contenido del mensaje */}
                  {mensaje.contenido && (
                    <p className="text-sm whitespace-pre-wrap">{mensaje.contenido}</p>
                  )}
                  
                  {/* Adjuntos */}
                  {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {mensaje.adjuntos.map((adjunto, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-center space-x-2 p-2 rounded-lg text-xs",
                            mensaje.esPropio
                              ? "bg-blue-400 bg-opacity-50"
                              : "bg-gray-100"
                          )}
                        >
                          <Paperclip className="h-3 w-3" />
                          <span className="flex-1 truncate">{adjunto.nombre}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => window.open(adjunto.url, '_blank')}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Hora */}
                <span className="text-xs text-gray-400 mt-1 px-2">
                  {formatearHora(mensaje.fecha, mensaje.hora)}
                </span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de input */}
        <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
          {/* Adjuntos seleccionados */}
          {adjuntos.length > 0 && (
            <div className="mb-3 space-y-1">
              {adjuntos.map((archivo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 rounded-lg p-2"
                >
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 truncate">
                      {archivo.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAdjunto(index)}
                    className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Input de mensaje */}
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Input
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribir mensaje..."
                className="resize-none border-gray-300 rounded-full px-4 py-2"
                maxLength={1000}
              />
            </div>
            
            {/* Botón adjuntar */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 p-0 text-gray-500 hover:text-gray-700"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            {/* Botón enviar */}
            <Button
              onClick={handleEnviar}
              disabled={!nuevoMensaje.trim() && adjuntos.length === 0}
              className="h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Input file oculto */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />
        </div>
      </div>
    </div>
  )
}
