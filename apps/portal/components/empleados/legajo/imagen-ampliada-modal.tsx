"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImagenAmpliadaModalProps {
  isOpen: boolean
  onClose: () => void
  imagenUrl: string
  nombreCompleto: string
}

export function ImagenAmpliadaModal({
  isOpen,
  onClose,
  imagenUrl,
  nombreCompleto,
}: ImagenAmpliadaModalProps) {
  if (!isOpen || !imagenUrl) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />
      <div className="relative z-50 max-w-4xl max-h-[90vh] w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{nombreCompleto}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4 flex items-center justify-center bg-gray-100">
            <img
              src={imagenUrl}
              alt={nombreCompleto}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
