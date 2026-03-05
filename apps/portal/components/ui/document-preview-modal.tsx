"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X, ZoomIn, ZoomOut } from "lucide-react"

interface DocumentPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  document: {
    name: string
    type: string
    url: string
  } | null
}

export function DocumentPreviewModal({ isOpen, onClose, document }: DocumentPreviewModalProps) {
  const [zoom, setZoom] = useState(100)

  if (!document) return null

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = document.url
    link.download = document.name
    link.click()
  }

  const isPDF = document.type === "application/pdf" || document.url.toLowerCase().includes(".pdf")
  const isImage = document.type.startsWith("image/") || /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(document.url)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[60vh] p-0">
        <DialogHeader className="p-2 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-semibold truncate pr-2">{document.name}</DialogTitle>
            <div className="flex items-center gap-1 flex-shrink-0">
              {(isPDF || isImage) && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(Math.max(50, zoom - 25))}
                    disabled={zoom <= 50}
                    className="h-7 w-7 p-0"
                  >
                    <ZoomOut className="h-3 w-3" />
                  </Button>
                  <span className="text-xs px-1 min-w-[40px] text-center">{zoom}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(Math.min(200, zoom + 25))}
                    disabled={zoom >= 200}
                    className="h-7 w-7 p-0"
                  >
                    <ZoomIn className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={handleDownload} className="h-7 px-2">
                <Download className="h-3 w-3" />
                <span className="sr-only">Descargar</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-auto p-2" style={{ maxHeight: "calc(60vh - 45px)" }}>
          {isPDF ? (
            <div className="w-full h-[250px]">
              <iframe
                src={`${document.url}#zoom=${zoom}`}
                className="w-full h-full border rounded"
                title={document.name}
              />
            </div>
          ) : isImage ? (
            <div className="flex justify-center overflow-auto h-[250px]">
              <img
                src={document.url || "/placeholder.svg"}
                alt={document.name}
                className="max-w-full h-auto rounded"
                style={{ transform: `scale(${zoom / 100})` }}
              />
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-2 text-sm">Vista previa no disponible</p>
              <Button onClick={handleDownload} className="bg-blue-900 hover:bg-blue-800 py-1 h-8">
                <Download className="h-3 w-3 mr-1" />
                Descargar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
