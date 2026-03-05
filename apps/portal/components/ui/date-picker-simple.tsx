"use client"
import { format } from "date-fns"
import type React from "react"

import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DatePickerSimple({
  date,
  setDate,
}: {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}) {
  // Función para detener la propagación del evento
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          onClick={handleClick} // Detener la propagación aquí
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: es }) : "dd/mm/aaaa"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" onClick={handleClick}>
        {" "}
        {/* Detener la propagación aquí también */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          onDayClick={handleClick} // Detener la propagación en los clics del calendario
        />
      </PopoverContent>
    </Popover>
  )
}
