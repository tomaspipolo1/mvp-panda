"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import type { LogEntry } from "./types"

interface TerminalLogsProps {
  logs: LogEntry[]
  onSelectLog: (log: LogEntry) => void
}

const severidadColor: Record<LogEntry["severity"], string> = {
  info: "text-blue-700",
  warn: "text-amber-700",
  error: "text-red-700",
  critical: "text-red-800 font-semibold",
}

const resultadoBadge: Record<LogEntry["result"], string> = {
  OK: "bg-green-100 text-green-800 border border-green-200",
  FAIL: "bg-red-100 text-red-800 border border-red-200",
}

export function TerminalLogs({ logs, onSelectLog }: TerminalLogsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="bg-white text-gray-900 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Terminal de logs</span>
          <span className="text-gray-300">|</span>
          <span>{logs.length} líneas (mock)</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-[480px] overflow-y-auto font-mono text-xs leading-6 px-4 py-3 space-y-1 bg-gray-50"
      >
        {logs.length === 0 && (
          <div className="text-gray-500 text-center mt-10">Sin registros para los filtros seleccionados.</div>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center gap-2 hover:bg-white cursor-pointer rounded px-2 py-1 transition-colors"
            onClick={() => onSelectLog(log)}
          >
            <span className="text-gray-500 w-40 flex-shrink-0">{log.timestamp}</span>
            <span className={`${severidadColor[log.severity]} w-16 text-center`}>{log.severity.toUpperCase()}</span>
            <Badge variant="outline" className={`${resultadoBadge[log.result]} text-[10px] px-2`}>
              {log.result}
            </Badge>
            <span className="text-gray-700 w-24 flex-shrink-0 truncate">{log.category}</span>
            <span className="text-gray-600 w-28 flex-shrink-0 truncate">{log.actor}</span>
            <span className="text-gray-500 w-24 flex-shrink-0 truncate">{log.ip}</span>
            <span className="text-gray-900 truncate">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
