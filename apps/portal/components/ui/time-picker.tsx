"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Clock } from "lucide-react"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function TimePicker({ value, onChange, label }: TimePickerProps) {
  const [hours, setHours] = useState<string>("00")
  const [minutes, setMinutes] = useState<string>("00")
  const [isOpen, setIsOpen] = useState(false)

  // Actualizar horas y minutos cuando cambia el valor
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":")
      setHours(h)
      setMinutes(m)
    }
  }, [value])

  // Generar opciones de horas (00-23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return (
      <Button
        key={hour}
        variant="ghost"
        className={`w-12 h-10 ${hours === hour ? "bg-blue-100" : ""}`}
        onClick={() => {
          setHours(hour)
          onChange(`${hour}:${minutes}`)
        }}
      >
        {hour}
      </Button>
    )
  })

  // Generar opciones de minutos (00-55, incrementos de 5)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => {
    const minute = (i * 5).toString().padStart(2, "0")
    return (
      <Button
        key={minute}
        variant="ghost"
        className={`w-12 h-10 ${minutes === minute ? "bg-blue-100" : ""}`}
        onClick={() => {
          setMinutes(minute)
          onChange(`${hours}:${minute}`)
        }}
      >
        {minute}
      </Button>
    )
  })

  return (
    <div>
      {label && <Label className="mb-1 block">{label}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            onClick={() => setIsOpen(true)}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value || "--:--"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="text-center">
                <Label className="mb-2 block">Hora</Label>
                <div className="grid grid-cols-6 gap-1">{hourOptions}</div>
              </div>
              <div className="text-center">
                <Label className="mb-2 block">Minutos</Label>
                <div className="grid grid-cols-4 gap-1">{minuteOptions}</div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  onChange("")
                  setIsOpen(false)
                }}
              >
                Limpiar
              </Button>
              <Button
                onClick={() => {
                  onChange(`${hours}:${minutes}`)
                  setIsOpen(false)
                }}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
