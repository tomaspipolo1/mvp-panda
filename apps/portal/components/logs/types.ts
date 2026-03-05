export type LogSeverity = "info" | "warn" | "error" | "critical"
export type LogResult = "OK" | "FAIL"

export interface LogEntry {
  id: string
  timestamp: string
  severity: LogSeverity
  result: LogResult
  category: string
  actor: string
  ip: string
  origin: "admin" | "web" | "api"
  message: string
  resource?: string
  action?: string
  userAgent?: string
  payload?: Record<string, unknown>
}
