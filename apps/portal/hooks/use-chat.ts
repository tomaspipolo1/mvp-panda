"use client"

import { useState, useCallback, useEffect } from "react"
import { ChatMessage } from "@/components/ui/chat-modal"

interface UseChatProps {
  chatId: string
  usuarioActual: string
}

export function useChat({ chatId, usuarioActual }: UseChatProps) {
  const [mensajes, setMensajes] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Cargar mensajes desde localStorage al montar
  useEffect(() => {
    const mensajesGuardados = localStorage.getItem(`chat-${chatId}`)
    if (mensajesGuardados) {
      try {
        setMensajes(JSON.parse(mensajesGuardados))
      } catch (error) {
        console.error('Error al cargar mensajes:', error)
      }
    }
  }, [chatId])

  // Guardar mensajes en localStorage cuando cambien
  useEffect(() => {
    if (mensajes.length > 0) {
      localStorage.setItem(`chat-${chatId}`, JSON.stringify(mensajes))
    }
  }, [mensajes, chatId])

  const enviarMensaje = useCallback(async (contenido: string, adjuntos?: File[]) => {
    setIsLoading(true)
    
    try {
      const ahora = new Date()
      const nuevoMensaje: ChatMessage = {
        id: Date.now(),
        autor: usuarioActual,
        contenido,
        fecha: ahora.toISOString().split('T')[0],
        hora: ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        esPropio: true,
        tipo: adjuntos && adjuntos.length > 0 ? 'archivo' : 'texto',
        adjuntos: adjuntos?.map(file => ({
          nombre: file.name,
          url: URL.createObjectURL(file), // En producción sería una URL real del servidor
          tipo: file.type
        }))
      }

      setMensajes(prev => [...prev, nuevoMensaje])

      // Aquí iría la lógica para enviar al servidor
      // await api.enviarMensaje(chatId, nuevoMensaje)
      
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      // Aquí podrías mostrar un toast de error
    } finally {
      setIsLoading(false)
    }
  }, [chatId, usuarioActual])

  const agregarMensajeRecibido = useCallback((mensaje: Omit<ChatMessage, 'esPropio'>) => {
    const mensajeCompleto: ChatMessage = {
      ...mensaje,
      esPropio: mensaje.autor === usuarioActual
    }
    setMensajes(prev => [...prev, mensajeCompleto])
  }, [usuarioActual])

  const limpiarChat = useCallback(() => {
    setMensajes([])
    localStorage.removeItem(`chat-${chatId}`)
  }, [chatId])

  return {
    mensajes,
    enviarMensaje,
    agregarMensajeRecibido,
    limpiarChat,
    isLoading
  }
}
