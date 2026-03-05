"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface DatePickerModalProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder?: string
}

export function DatePickerModal({ date, setDate, placeholder = "dd/mm/aaaa" }: DatePickerModalProps) {
  // Estado para controlar la visualización del calendario
  const [showCalendar, setShowCalendar] = useState(false)

  // Estado para el mes actual del calendario
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Estado para la posición del calendario
  const [calendarPosition, setCalendarPosition] = useState("left-0")

  // Referencia para cerrar el calendario al hacer clic fuera
  const calendarRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Días de la semana
  const weekDays = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]

  // Función para calcular la posición del calendario
  const calculateCalendarPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const calendarWidth = 280 // Ancho del calendario
      const screenWidth = window.innerWidth

      // Si el calendario se sale por la derecha, lo movemos hacia la izquierda
      if (rect.left + calendarWidth > screenWidth) {
        const offset = rect.left + calendarWidth - screenWidth + 20 // 20px de margen
        setCalendarPosition(`-left-[${offset}px]`)
      } else {
        setCalendarPosition("left-0")
      }
    }
  }

  // Función para generar los días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Obtener el primer día del mes
    const firstDay = new Date(year, month, 1).getDay()
    // Ajustar para que la semana comience en lunes (0 = lunes, 6 = domingo)
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1

    // Días del mes anterior para completar la primera semana
    const prevMonthDays = []
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    for (let i = firstDayAdjusted - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: daysInPrevMonth - i,
        month: "prev",
        date: new Date(year, month - 1, daysInPrevMonth - i),
      })
    }

    // Días del mes actual
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month: "current",
        date: new Date(year, month, i),
      })
    }

    // Días del mes siguiente para completar la última semana
    const nextMonthDays = []
    const totalDaysShown = 42 // 6 semanas * 7 días
    const remainingDays = totalDaysShown - (prevMonthDays.length + currentMonthDays.length)
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        day: i,
        month: "next",
        date: new Date(year, month + 1, i),
      })
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  // Función para navegar entre meses
  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  // Función para seleccionar un día
  const selectDay = (date: Date) => {
    setDate(date)
    setShowCalendar(false)
  }

  // Función para formatear el mes y año
  const formatMonthYear = (date: Date) => {
    return format(date, "MMMM yyyy", { locale: es })
  }

  // Función para abrir el calendario
  const openCalendar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowCalendar(!showCalendar)
    setCurrentMonth(date || new Date())

    // Calcular posición después de que el estado se actualice
    setTimeout(() => {
      calculateCalendarPosition()
    }, 0)
  }

  // Efecto para cerrar el calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCalendar &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("[data-calendar-trigger]")
      ) {
        setShowCalendar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCalendar])

  // Efecto para recalcular posición cuando se redimensiona la ventana
  useEffect(() => {
    const handleResize = () => {
      if (showCalendar) {
        calculateCalendarPosition()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [showCalendar])

  // Función para verificar si un día está seleccionado
  const isDaySelected = (date: Date, selectedDate?: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  // Detener la propagación para evitar que el modal se cierre
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div ref={containerRef} className="relative" onClick={handleClick}>
      <div className="flex" data-calendar-trigger>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
          <CalendarIcon className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          value={date ? format(date, "dd/MM/yyyy", { locale: es }) : ""}
          placeholder={placeholder}
          readOnly
          className="pl-10 pr-3 cursor-pointer"
          onClick={openCalendar}
        />
      </div>

      {showCalendar && (
        <div
          ref={calendarRef}
          className={cn(
            "absolute z-10 bg-white border rounded-md shadow-md top-full mt-1 w-[280px]",
            calendarPosition === "left-0" ? "left-0" : "right-0",
          )}
          style={
            calendarPosition !== "left-0" && calendarPosition.includes("-left-")
              ? { transform: `translateX(${calendarPosition.match(/-?\d+/)?.[0]}px)` }
              : {}
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-2 border-b">
            <div className="flex justify-between items-center">
              <div className="font-medium">{formatMonthYear(currentMonth)}</div>
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateMonth("prev")
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateMonth("next")
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="grid grid-cols-7 gap-1 mb-1">
              {weekDays.map((day, index) => (
                <div key={index} className="text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    selectDay(day.date)
                  }}
                  className={cn(
                    "h-7 w-7 text-center text-sm rounded-md",
                    day.month === "current" ? "text-gray-900" : "text-gray-400",
                    isDaySelected(day.date, date) && "bg-blue-600 text-white",
                    !isDaySelected(day.date, date) && "hover:bg-gray-100",
                  )}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between p-2 border-t">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={(e) => {
                e.stopPropagation()
                setDate(undefined)
                setShowCalendar(false)
              }}
            >
              Borrar
            </button>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={(e) => {
                e.stopPropagation()
                const today = new Date()
                setDate(today)
                setShowCalendar(false)
              }}
            >
              Hoy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
