"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

interface Evento {
  id: number
  titulo: string
  fecha: Date
  tipo: string
  color?: string
  estado?: "pendiente" | "en_curso" | "finalizado"
}

interface CalendarioProps {
  eventos: Evento[]
  onEventClick?: (evento: Evento) => void
}

// Función helper para obtener el color según el estado
const getEventColor = (evento: Evento) => {
  if (evento.color) return evento.color

  switch (evento.estado) {
    case "pendiente":
      return "bg-pink-100 text-pink-800"
    case "en_curso":
      return "bg-blue-100 text-blue-800"
    case "finalizado":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function Calendario({ eventos, onEventClick }: CalendarioProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"Mes" | "Semana" | "Día">("Mes")

  // Navegación
  const goToPrev = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "Mes") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (viewMode === "Semana") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "Mes") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (viewMode === "Semana") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  // Obtener eventos de un día específico
  const getEventosDelDia = (fecha: Date) => {
    return eventos.filter((evento) => {
      const eventoDate = new Date(evento.fecha)
      return (
        eventoDate.getDate() === fecha.getDate() &&
        eventoDate.getMonth() === fecha.getMonth() &&
        eventoDate.getFullYear() === fecha.getFullYear()
      )
    })
  }

  // Obtener eventos de una hora específica
  const getEventosDeHora = (fecha: Date, hora: number) => {
    return eventos.filter((evento) => {
      const eventoDate = new Date(evento.fecha)
      return (
        eventoDate.getDate() === fecha.getDate() &&
        eventoDate.getMonth() === fecha.getMonth() &&
        eventoDate.getFullYear() === fecha.getFullYear() &&
        eventoDate.getHours() === hora
      )
    })
  }

  // Vista de mes
  const renderMonthView = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

    const calendar = []

    // Header de días de la semana
    calendar.push(
      <div key="header" className="grid grid-cols-7 bg-gray-50 border-b">
        {weekDays.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>,
    )

    // Calcular días
    const days = []
    let firstDayOfWeek = firstDayOfMonth.getDay() - 1
    if (firstDayOfWeek < 0) firstDayOfWeek = 6

    // Días del mes anterior
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
    const daysInPrevMonth = prevMonth.getDate()

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const fecha = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day)
      days.push(renderDayCell(fecha, false))
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const fecha = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      days.push(renderDayCell(fecha, true))
    }

    // Días del mes siguiente
    const totalCells = Math.ceil((daysInMonth + firstDayOfWeek) / 7) * 7
    const remainingCells = totalCells - (daysInMonth + firstDayOfWeek)

    for (let day = 1; day <= remainingCells; day++) {
      const fecha = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day)
      days.push(renderDayCell(fecha, false))
    }

    // Agrupar en filas
    const rows = Math.ceil(days.length / 7)
    for (let row = 0; row < rows; row++) {
      calendar.push(
        <div key={`row-${row}`} className="grid grid-cols-7">
          {days.slice(row * 7, (row + 1) * 7)}
        </div>,
      )
    }

    return calendar
  }

  // Renderizar celda de día
  const renderDayCell = (fecha: Date, isCurrentMonth: boolean) => {
    const eventosDelDia = getEventosDelDia(fecha)
    const isToday = fecha.toDateString() === new Date().toDateString()

    return (
      <div
        key={fecha.toISOString()}
        className={`min-h-[120px] p-2 border-r border-b ${isCurrentMonth ? "bg-white" : "bg-gray-50"}`}
      >
        <div
          className={`text-sm mb-2 ${isCurrentMonth ? "text-gray-900" : "text-gray-400"} ${
            isToday
              ? "w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium"
              : ""
          }`}
        >
          {fecha.getDate()}
        </div>
        <div className="space-y-1">
          {eventosDelDia.slice(0, 3).map((evento, index) => (
            <div
              key={index}
              className={`text-xs p-1 rounded cursor-pointer truncate ${getEventColor(evento)}`}
              onClick={() => onEventClick?.(evento)}
              title={evento.titulo}
            >
              {evento.titulo}
            </div>
          ))}
          {eventosDelDia.length > 3 && (
            <div className="text-xs text-gray-500 font-medium">+{eventosDelDia.length - 3} más</div>
          )}
        </div>
      </div>
    )
  }

  // Vista de semana
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      weekDays.push(day)
    }

    const dayNames = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"]

    return (
      <div className="flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-8 border-b bg-gray-50">
          <div className="p-3 text-center text-sm font-medium text-gray-700 border-r">Hora</div>
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString()
            return (
              <div key={index} className="p-3 text-center border-r last:border-r-0">
                <div className="text-sm font-medium text-gray-700">{dayNames[index]}</div>
                <div
                  className={`text-sm mt-1 ${
                    isToday
                      ? "w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-medium"
                      : "text-gray-900"
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>
            )
          })}
        </div>

        {/* Grid de horas */}
        <div>
          {Array.from({ length: 17 }, (_, i) => i + 7).map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b min-h-[60px]">
              <div className="p-2 text-sm text-gray-600 border-r text-center">{hour}:00</div>
              {weekDays.map((day, dayIndex) => {
                const eventosDeHora = getEventosDeHora(day, hour)
                return (
                  <div key={dayIndex} className="p-1 border-r last:border-r-0">
                    {eventosDeHora.map((evento, eventoIndex) => (
                      <div
                        key={eventoIndex}
                        className={`text-xs p-1 mb-1 rounded cursor-pointer truncate ${getEventColor(evento)}`}
                        onClick={() => onEventClick?.(evento)}
                        title={evento.titulo}
                      >
                        {evento.titulo}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Vista de día
  const renderDayView = () => {
    const dayName = currentDate.toLocaleDateString("es-ES", { weekday: "long" })
    const isToday = currentDate.toDateString() === new Date().toDateString()

    return (
      <div className="flex flex-col">
        {/* Header */}
        <div className="p-4 text-center border-b bg-gray-50">
          <div className="text-sm font-medium text-gray-700 capitalize">{dayName}</div>
          <div
            className={`text-lg mt-1 ${
              isToday
                ? "w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-medium"
                : "text-gray-900 font-medium"
            }`}
          >
            {currentDate.getDate()}
          </div>
        </div>

        {/* Grid de horas */}
        <div>
          {Array.from({ length: 17 }, (_, i) => i + 7).map((hour) => {
            const eventosDeHora = getEventosDeHora(currentDate, hour)
            return (
              <div key={hour} className="grid grid-cols-[100px_1fr] border-b min-h-[60px]">
                <div className="p-3 text-sm text-gray-600 border-r text-center">{hour}:00</div>
                <div className="p-2">
                  {eventosDeHora.map((evento, index) => (
                    <div
                      key={index}
                      className={`p-2 mb-2 rounded cursor-pointer ${getEventColor(evento)}`}
                      onClick={() => onEventClick?.(evento)}
                    >
                      <div className="font-medium text-sm">{evento.titulo}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Obtener título de fecha
  const getDateTitle = () => {
    if (viewMode === "Mes") {
      return currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
    } else if (viewMode === "Semana") {
      const startOfWeek = new Date(currentDate)
      const day = startOfWeek.getDay()
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
      startOfWeek.setDate(diff)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}`
    } else {
      return currentDate.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        {/* Header de navegación */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 ml-4">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-lg font-medium text-gray-900 min-w-[200px]">{getDateTitle()}</span>
            </div>
          </div>

          {/* Selector de vista */}
          <div className="flex space-x-1">
            {(["Mes", "Semana", "Día"] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode(mode)}
                className={viewMode === mode ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"}
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>

        {/* Contenido del calendario */}
        <div>
          {viewMode === "Mes" && renderMonthView()}
          {viewMode === "Semana" && renderWeekView()}
          {viewMode === "Día" && renderDayView()}
        </div>
      </CardContent>
    </Card>
  )
}
