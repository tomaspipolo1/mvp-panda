"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { FiltrosLogs, type FiltrosLogs as FiltrosLogsType } from "@/components/logs/filtros-logs"
import { TerminalLogs } from "@/components/logs/terminal-logs"
import { ModalLogDetalle } from "@/components/logs/modal-log-detalle"
import type { LogEntry, LogResult, LogSeverity } from "@/components/logs/types"
import { Download } from "lucide-react"

const logsMock: LogEntry[] = [
  {
    id: "log-001",
    timestamp: "2026-01-12 10:22:15",
    severity: "info",
    result: "OK",
    category: "auth",
    actor: "maria.garcia@plp.com",
    ip: "200.32.12.4",
    origin: "web",
    message: "Login exitoso",
    userAgent: "Chrome 122 / Windows",
  },
  {
    id: "log-002",
    timestamp: "2026-01-12 10:25:02",
    severity: "warn",
    result: "FAIL",
    category: "auth",
    actor: "juan.perez@plp.com",
    ip: "200.32.12.4",
    origin: "web",
    message: "Intento de login fallido (password incorrecto)",
    userAgent: "Chrome 122 / Windows",
  },
  {
    id: "log-003",
    timestamp: "2026-01-12 10:27:45",
    severity: "info",
    result: "OK",
    category: "roles",
    actor: "admin@plp.com",
    ip: "10.0.0.5",
    origin: "admin",
    message: "Se asignó rol 'Compras' al usuario lucia.mendez@plp.com",
    resource: "usuario",
    action: "assign-role",
    payload: { user: "lucia.mendez@plp.com", role: "Compras" },
  },
  {
    id: "log-004",
    timestamp: "2026-01-12 10:30:11",
    severity: "error",
    result: "FAIL",
    category: "api",
    actor: "service:erp-sync",
    ip: "10.0.1.2",
    origin: "api",
    message: "Webhook /erp/vendors devolvió 500",
    payload: { status: 500, endpoint: "/erp/vendors", body: "timeout" },
  },
  {
    id: "log-005",
    timestamp: "2026-01-12 10:35:00",
    severity: "critical",
    result: "FAIL",
    category: "system",
    actor: "admin@plp.com",
    ip: "10.0.0.5",
    origin: "admin",
    message: "Excepción no controlada en módulo de facturas",
    payload: { error: "NullReferenceException", stack: "..." },
  },
]

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>(logsMock)
  const [filtros, setFiltros] = useState<FiltrosLogsType>({ fechaDesde: "", fechaHasta: "", resultado: "Todos" })
  const [logSeleccionado, setLogSeleccionado] = useState<LogEntry | null>(null)
  const [modalAbierto, setModalAbierto] = useState(false)

  useEffect(() => {
    const categorias = ["auth", "roles", "api", "system", "security"]
    const actores = ["admin@plp.com", "service:erp-sync", "maria.garcia@plp.com", "juan.perez@plp.com"]
    const origins: LogEntry["origin"][] = ["admin", "web", "api"]
    const resultados: LogResult[] = ["OK", "FAIL"]
    const severidades: LogSeverity[] = ["info", "warn", "error", "critical"]

    const interval = setInterval(() => {
      const now = new Date()
      const pad = (n: number) => n.toString().padStart(2, "0")
      const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

      const result = resultados[Math.random() < 0.75 ? 0 : 1]
      const severity =
        result === "FAIL"
          ? severidades[Math.random() < 0.6 ? 2 : 3]
          : severidades[Math.random() < 0.7 ? 0 : 1]

      const category = categorias[Math.floor(Math.random() * categorias.length)]
      const actor = actores[Math.floor(Math.random() * actores.length)]
      const origin = origins[Math.floor(Math.random() * origins.length)]
      const ip = `10.0.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 200) + 1}`

      const msgMap: Record<string, string[]> = {
        auth: ["Login exitoso", "Intento de login fallido", "Token expirado", "Reset de contraseña enviado"],
        roles: ["Asignación de rol", "Revocación de rol", "Actualización de permisos"],
        api: ["Webhook respondió 200", "Webhook devolvió 500", "Timeout en integración ERP"],
        system: ["Tarea ejecutada", "Excepción no controlada", "Servicio reiniciado"],
        security: ["Intento de acceso no autorizado", "Bloqueo de usuario", "Captcha requerido"],
      }

      const mensajes = msgMap[category] || ["Evento registrado"]
      const message = mensajes[Math.floor(Math.random() * mensajes.length)]

      const nuevo: LogEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp,
        severity,
        result,
        category,
        actor,
        ip,
        origin,
        message,
      }

      setLogs((prev) => {
        const actualizados = [...prev, nuevo]
        // Limitar a 400 entradas para evitar crecimiento infinito
        return actualizados.slice(-400)
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  const logsFiltrados = useMemo(() => {
    let resultado = [...logs]
    if (filtros.resultado !== "Todos") {
      resultado = resultado.filter((l) => l.result === filtros.resultado)
    }
    if (filtros.fechaDesde) {
      resultado = resultado.filter((l) => l.timestamp >= `${filtros.fechaDesde}`)
    }
    if (filtros.fechaHasta) {
      resultado = resultado.filter((l) => l.timestamp <= `${filtros.fechaHasta} 23:59:59`)
    }
    return resultado
  }, [logs, filtros])

  const handleSelectLog = (log: LogEntry) => {
    setLogSeleccionado(log)
    setModalAbierto(true)
  }

  const handleExport = () => {
    console.log("Export CSV (mock) con filtros:", filtros)
    alert("Exportando CSV con los filtros aplicados (simulación).")
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Logs</h1>
          <p className="text-sm text-gray-500">Visor tipo terminal con filtros básicos.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      <FiltrosLogs onFilter={setFiltros} />

      <TerminalLogs
        logs={logsFiltrados}
        onSelectLog={handleSelectLog}
      />

      <ModalLogDetalle isOpen={modalAbierto} log={logSeleccionado} onClose={() => setModalAbierto(false)} />
    </div>
  )
}
