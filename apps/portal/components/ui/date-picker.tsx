"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  label?: string
  className?: string
}

export function DatePicker({ date, setDate, label, className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy", { locale: es }) : "dd/mm/aaaa"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
            initialFocus
            locale={es}
            footer={
              <div className="flex justify-between px-4 py-2 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setDate(undefined)
                    setOpen(false)
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Borrar
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setDate(new Date())
                    setOpen(false)
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Hoy
                </Button>
              </div>
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
