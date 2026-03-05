"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { LogEntry } from "./types"

interface ModalLogDetalleProps {
  isOpen: boolean
  log: LogEntry | null
  onClose: () => void
}

const severidadColor: Record<LogEntry["severity"], string> = {
  info: "bg-blue-100 text-blue-800",
  warn: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
  critical: "bg-red-200 text-red-900",
}

const resultadoColor: Record<LogEntry["result"], string> = {
  OK: "bg-green-100 text-green-800",
  FAIL: "bg-red-100 text-red-800",
}

export function ModalLogDetalle({ isOpen, log, onClose }: ModalLogDetalleProps) {
  if (!isOpen || !log) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Log {log.id}
            <Badge className={resultadoColor[log.result]}>{log.result}</Badge>
            <Badge className={severidadColor[log.severity]}>{log.severity.toUpperCase()}</Badge>
          </DialogTitle>
          <DialogDescription>{log.timestamp}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <p><span className="text-gray-500">Categoría:</span> {log.category}</p>
            <p><span className="text-gray-500">Actor:</span> {log.actor}</p>
            <p><span className="text-gray-500">IP:</span> {log.ip}</p>
            <p><span className="text-gray-500">Origen:</span> {log.origin}</p>
          </div>
          <div className="space-y-1">
            <p><span className="text-gray-500">Recurso:</span> {log.resource || "-"}</p>
            <p><span className="text-gray-500">Acción:</span> {log.action || "-"}</p>
            <p><span className="text-gray-500">Resultado:</span> {log.result}</p>
            <p><span className="text-gray-500">UA:</span> {log.userAgent || "-"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Mensaje</p>
          <div className="bg-gray-50 rounded border border-gray-200 p-3 text-sm text-gray-800">
            {log.message}
          </div>
        </div>

        {log.payload && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Payload (redacted)</p>
            <ScrollArea className="h-48 rounded border border-gray-200 bg-gray-50 p-3">
              <pre className="text-xs text-gray-800 whitespace-pre-wrap">
{JSON.stringify(log.payload, null, 2)}
              </pre>
            </ScrollArea>
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
