"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Upload,
  Trash2,
  FileText,
  FileSpreadsheet,
  Plus,
  Calendar,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { format, parse, addMonths, subMonths, isValid } from "date-fns"
import { es } from "date-fns/locale"

interface ArchivoAdjunto {
  id: string
  nombre: string
  tipo: string
  tamano: string
  categoria?: string // Propiedad para categorizar los archivos
}

interface Persona {
  id: string
  nombre: string
  apellido: string
  dni: string
  cargo: string
}

interface Vehiculo {
  id: string
  tipo: string
  patente: string
  modelo: string
  seguroId?: string // Referencia al archivo de seguro
}

// Datos de ejemplo para expedientes y órdenes de compra
const expedientesData = [
  { id: "EXP-2025-123456", ordenCompra: "OC-2023-0458" },
  { id: "EXP-2025-789012", ordenCompra: "OC-2023-0457" },
  { id: "EXP-2025-345678", ordenCompra: "OC-2023-0456" },
]

// Tipos de vehículos
const tiposVehiculo = ["Automóvil", "Camioneta", "Camión", "Utilitario", "Maquinaria", "Otro"]

// Componente de calendario personalizado
function CustomCalendar({
  selectedDate,
  onSelectDate,
  minDate,
  onClose,
}: {
  selectedDate?: Date
  onSelectDate: (date: Date) => void
  minDate?: Date
  onClose: () => void
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate || new Date())

  const daysOfWeek = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleSelectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (minDate && newDate < minDate) return
    onSelectDate(newDate)
  }

  const handleClear = () => {
    onSelectDate(new Date(0)) // Fecha inválida para indicar borrado
    onClose()
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    onSelectDate(today)
    onClose()
  }

  // Generar días del mes actual
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const firstDay = new Date(year, month, 1).getDay()
    // Convertir a formato donde lunes es el primer día (0 = lunes, ..., 6 = domingo)
    return firstDay === 0 ? 6 : firstDay - 1
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Días del mes anterior para completar la primera semana
  const daysInPrevMonth = getDaysInMonth(year, month - 1)
  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1)

  // Días del mes actual
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Días del mes siguiente para completar la última semana
  const nextMonthDays = Array.from({ length: 42 - (firstDayOfMonth + daysInMonth) }, (_, i) => i + 1)

  // Verificar si un día está seleccionado
  const isSelectedDay = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  // Verificar si un día está deshabilitado
  const isDisabledDay = (day: number, isCurrentMonth: boolean) => {
    if (!minDate || !isCurrentMonth) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date < minDate
  }

  return (
    <div className="bg-white border rounded-md shadow-md w-[250px]">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="font-medium">{format(currentMonth, "MMMM 'de' yyyy", { locale: es })}</div>
        <div className="flex space-x-1">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded" aria-label="Mes anterior">
            <ChevronUp className="h-4 w-4" />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded" aria-label="Mes siguiente">
            <ChevronDown className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded ml-1" aria-label="Cerrar">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Días del mes anterior */}
          {prevMonthDays.map((day) => (
            <button
              key={`prev-${day}`}
              className="h-7 w-7 text-center text-xs text-gray-400 hover:bg-gray-100 rounded-sm"
              onClick={() => {
                const prevMonth = new Date(year, month - 1, day)
                setCurrentMonth(prevMonth)
                handleSelectDate(day)
              }}
              disabled={isDisabledDay(day, false)}
            >
              {day}
            </button>
          ))}

          {/* Días del mes actual */}
          {currentMonthDays.map((day) => (
            <button
              key={`current-${day}`}
              className={`h-7 w-7 text-center text-xs rounded-sm ${
                isSelectedDay(day) ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-900"
              } ${isDisabledDay(day, true) ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleSelectDate(day)}
              disabled={isDisabledDay(day, true)}
            >
              {day}
            </button>
          ))}

          {/* Días del mes siguiente */}
          {nextMonthDays.map((day) => (
            <button
              key={`next-${day}`}
              className="h-7 w-7 text-center text-xs text-gray-400 hover:bg-gray-100 rounded-sm"
              onClick={() => {
                const nextMonth = new Date(year, month + 1, day)
                setCurrentMonth(nextMonth)
                handleSelectDate(day)
              }}
              disabled={isDisabledDay(day, false)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between p-2 border-t text-xs">
        <button onClick={handleClear} className="text-blue-500 hover:text-blue-700">
          Borrar
        </button>
        <button onClick={handleToday} className="text-blue-500 hover:text-blue-700">
          Hoy
        </button>
      </div>
    </div>
  )
}

export function FormularioNuevaSolicitudCliente() {
  const [tipoSolicitud, setTipoSolicitud] = useState<string>("")
  const [clase, setClase] = useState<string>("")
  const [expediente, setExpediente] = useState<string>("")
  const [ordenCompra, setOrdenCompra] = useState<string>("")
  const [asunto, setAsunto] = useState<string>("")
  const [descripcion, setDescripcion] = useState<string>("")
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<ArchivoAdjunto[]>([])

  // Campos para Acceso a Obra
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(undefined)
  const [fechaFin, setFechaFin] = useState<Date | undefined>(undefined)
  const [fechaInicioStr, setFechaInicioStr] = useState<string>("")
  const [fechaFinStr, setFechaFinStr] = useState<string>("")
  const [showCalendarInicio, setShowCalendarInicio] = useState(false)
  const [showCalendarFin, setShowCalendarFin] = useState(false)
  const [personal, setPersonal] = useState<Persona[]>([])
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])

  // Campos para nuevo personal
  const [nuevoNombre, setNuevoNombre] = useState("")
  const [nuevoApellido, setNuevoApellido] = useState("")
  const [nuevoDNI, setNuevoDNI] = useState("")
  const [nuevoCargo, setNuevoCargo] = useState("")

  // Campos para nuevo vehículo
  const [nuevoTipo, setNuevoTipo] = useState("")
  const [nuevaPatente, setNuevaPatente] = useState("")
  const [nuevoModelo, setNuevoModelo] = useState("")
  const [mostrarFormVehiculo, setMostrarFormVehiculo] = useState(false)
  const [mostrarFormPersonal, setMostrarFormPersonal] = useState(false)

  // Campos específicos para "Cambio de datos"
  const [origenDato, setOrigenDato] = useState<string>("")
  const [tipoDato, setTipoDato] = useState<string>("")

  // Referencias para los inputs de archivo
  const fileInputRef = useRef<HTMLInputElement>(null)
  const notaInputRef = useRef<HTMLInputElement>(null)
  const otrosArchivosInputRef = useRef<HTMLInputElement>(null)
  const segurosInputRef = useRef<HTMLInputElement>(null)
  const artInputRef = useRef<HTMLInputElement>(null)
  const seguroVehiculoInputRef = useRef<HTMLInputElement>(null)

  // Referencias para los calendarios
  const calendarInicioRef = useRef<HTMLDivElement>(null)
  const calendarFinRef = useRef<HTMLDivElement>(null)

  // Cerrar calendarios al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarInicioRef.current && !calendarInicioRef.current.contains(event.target as Node)) {
        setShowCalendarInicio(false)
      }
      if (calendarFinRef.current && !calendarFinRef.current.contains(event.target as Node)) {
        setShowCalendarFin(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Autocompletar orden de compra cuando se selecciona un expediente
  useEffect(() => {
    if (expediente) {
      const expedienteEncontrado = expedientesData.find((exp) => exp.id === expediente)
      if (expedienteEncontrado) {
        setOrdenCompra(expedienteEncontrado.ordenCompra)
      }
    }
  }, [expediente])

  // Actualizar strings de fecha cuando cambian las fechas
  useEffect(() => {
    if (fechaInicio && isValid(fechaInicio)) {
      setFechaInicioStr(format(fechaInicio, "dd/MM/yyyy"))
    }
  }, [fechaInicio])

  useEffect(() => {
    if (fechaFin && isValid(fechaFin)) {
      setFechaFinStr(format(fechaFin, "dd/MM/yyyy"))
    }
  }, [fechaFin])

  // Actualizar fechas cuando cambian los strings (input manual)
  const handleFechaInicioStrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFechaInicioStr(value)

    try {
      if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date())
        if (isValid(parsedDate)) {
          setFechaInicio(parsedDate)
        }
      }
    } catch (error) {
      // Si hay error de parseo, no actualizamos la fecha
    }
  }

  const handleFechaFinStrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFechaFinStr(value)

    try {
      if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date())
        if (isValid(parsedDate)) {
          setFechaFin(parsedDate)
        }
      }
    } catch (error) {
      // Si hay error de parseo, no actualizamos la fecha
    }
  }

  const handleSelectFechaInicio = (date: Date) => {
    if (date.getTime() === 0) {
      // Fecha inválida indica borrado
      setFechaInicio(undefined)
      setFechaInicioStr("")
    } else {
      setFechaInicio(date)
      setFechaInicioStr(format(date, "dd/MM/yyyy"))
    }
  }

  const handleSelectFechaFin = (date: Date) => {
    if (date.getTime() === 0) {
      // Fecha inválida indica borrado
      setFechaFin(undefined)
      setFechaFinStr("")
    } else {
      setFechaFin(date)
      setFechaFinStr(format(date, "dd/MM/yyyy"))
    }
  }

  const handleAdjuntarArchivo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAdjuntarNota = () => {
    if (notaInputRef.current) {
      notaInputRef.current.click()
    }
  }

  const handleAdjuntarOtrosArchivos = () => {
    if (otrosArchivosInputRef.current) {
      otrosArchivosInputRef.current.click()
    }
  }

  const handleAdjuntarSeguros = () => {
    if (segurosInputRef.current) {
      segurosInputRef.current.click()
    }
  }

  const handleAdjuntarART = () => {
    if (artInputRef.current) {
      artInputRef.current.click()
    }
  }

  const handleAdjuntarSeguroVehiculo = () => {
    if (seguroVehiculoInputRef.current) {
      seguroVehiculoInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, categoria?: string) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        nombre: file.name,
        tipo: file.type,
        tamano: formatFileSize(file.size),
        categoria: categoria,
      }))
      setArchivosAdjuntos([...archivosAdjuntos, ...newFiles])
    }
    // Reset input value to allow selecting the same file again
    if (e.target.value) {
      e.target.value = ""
    }
  }

  const handleRemoveFile = (id: string) => {
    setArchivosAdjuntos(archivosAdjuntos.filter((archivo) => archivo.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getClaseOptions = (tipo: string) => {
    switch (tipo) {
      case "reclamo":
        return [
          { value: "ecologicas", label: "Ecológicas" },
          { value: "servicios", label: "Servicios" },
          { value: "otros_reclamo", label: "Otros" },
        ]
      case "consulta":
        return [
          { value: "comercial", label: "Comercial" },
          { value: "acceso", label: "Acceso" },
          { value: "otros_consulta", label: "Otros" },
        ]
      case "tramite":
        return [
          { value: "cambio_datos_usuario", label: "Cambio de datos Usuario" },
          { value: "cambio_datos_proveedor", label: "Cambio de datos proveedor" },
          { value: "otros_tramite", label: "Otros" },
        ]
      default:
        return []
    }
  }

  const handleTipoChange = (value: string) => {
    setTipoSolicitud(value)
    setClase("") // Reset clase when tipo changes
  }

  const getNuevoValorOptions = (tipoDato: string) => {
    switch (tipoDato) {
      case "naturaleza_organizacion":
        return [
          { value: "Persona Física / SH", label: "Persona Física / SH" },
          { value: "Sociedades de Hecho", label: "Sociedades de Hecho" },
          { value: "Sociedades Legalmente Constituída", label: "Sociedades Legalmente Constituída" },
        ]
      case "tipo_societario":
        return [
          { value: "Persona Física", label: "Persona Física" },
          { value: "Sociedad de Hecho", label: "Sociedad de Hecho" },
          { value: "SRL", label: "SRL" },
          { value: "SA", label: "SA" },
          { value: "Sociedad por Acciones Simplificadas (S.A.S.)", label: "Sociedad por Acciones Simplificadas (S.A.S.)" },
          { value: "Sociedad de Capital e Industria", label: "Sociedad de Capital e Industria" },
          { value: "Sociedad Colectiva (S.C.)", label: "Sociedad Colectiva (S.C.)" },
          { value: "Sociedad en Comandita Simple (S.C.S.)", label: "Sociedad en Comandita Simple (S.C.S.)" },
          { value: "Sociedad en Comandita por Acciones (S.C.A.)", label: "Sociedad en Comandita por Acciones (S.C.A.)" },
          { value: "Uniones Transitorias (U.T.)", label: "Uniones Transitorias (U.T.)" },
          { value: "Cooperativa", label: "Cooperativa" },
        ]
      default:
        return []
    }
  }

  const esSelect = tipoDato === "naturaleza_organizacion" || tipoDato === "tipo_societario"

  const handleTipoDatoChange = (value: string) => {
    setTipoDato(value)
    setOrigenDato("") // Reset nuevo valor when tipo dato changes
  }

  const handleAgregarPersona = () => {
    if (nuevoNombre && nuevoApellido && nuevoDNI) {
      const nuevaPersona: Persona = {
        id: Math.random().toString(36).substring(2, 9),
        nombre: nuevoNombre,
        apellido: nuevoApellido,
        dni: nuevoDNI,
        cargo: nuevoCargo,
      }
      setPersonal([...personal, nuevaPersona])
      // Limpiar campos
      setNuevoNombre("")
      setNuevoApellido("")
      setNuevoDNI("")
      setNuevoCargo("")
      setMostrarFormPersonal(false)
    }
  }

  const handleRemovePersona = (id: string) => {
    setPersonal(personal.filter((persona) => persona.id !== id))
  }

  const handleAgregarVehiculo = () => {
    if (nuevoTipo && nuevaPatente && nuevoModelo) {
      const nuevoVehiculo: Vehiculo = {
        id: Math.random().toString(36).substring(2, 9),
        tipo: nuevoTipo,
        patente: nuevaPatente,
        modelo: nuevoModelo,
      }
      setVehiculos([...vehiculos, nuevoVehiculo])
      // Limpiar campos
      setNuevoTipo("")
      setNuevaPatente("")
      setNuevoModelo("")
      setMostrarFormVehiculo(false)
    }
  }

  const handleRemoveVehiculo = (id: string) => {
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log({
      tipoSolicitud,
      expediente,
      ordenCompra,
      asunto,
      descripcion,
      origenDato,
      tipoDato,
      archivosAdjuntos,
      // Campos de Acceso a Obra
      fechaInicio,
      fechaFin,
      personal,
      vehiculos,
    })
    alert("Solicitud enviada correctamente")
  }

  // Determinar qué campos mostrar según el tipo de solicitud
  const mostrarExpediente = clase === "redeterminacion"
  const mostrarOrdenCompra = clase === "redeterminacion"
  const mostrarCamposCambioDatos = clase === "cambio_datos_usuario" || clase === "cambio_datos_proveedor"
  const mostrarCamposRedeterminacion = clase === "redeterminacion"

  // Filtrar archivos por categoría para mostrarlos en secciones separadas
  const archivosGenerales = archivosAdjuntos.filter((archivo) => !archivo.categoria || archivo.categoria === "general")
  const archivosNota = archivosAdjuntos.filter((archivo) => archivo.categoria === "nota")
  const archivosOtros = archivosAdjuntos.filter((archivo) => archivo.categoria === "otros")
  const archivosSeguros = archivosAdjuntos.filter((archivo) => archivo.categoria === "seguros")
  const archivosART = archivosAdjuntos.filter((archivo) => archivo.categoria === "art")

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <p className="text-gray-600">Complete los datos para generar una nueva solicitud</p>

          <div className="space-y-6">
            {/* Tipo de Solicitud y Clase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="tipoSolicitud" className="text-base font-medium">
                Tipo de Solicitud
              </label>
                <Select value={tipoSolicitud} onValueChange={handleTipoChange}>
                  <SelectTrigger id="tipoSolicitud" className="w-full mt-1">
                  <SelectValue placeholder="Seleccionar tipo de solicitud" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reclamo">Reclamo</SelectItem>
                  <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="tramite">Trámite</SelectItem>
                </SelectContent>
              </Select>
            </div>

                  <div>
                <label htmlFor="clase" className="text-base font-medium">
                  Clase
                </label>
                <Select
                  value={clase}
                  onValueChange={setClase}
                  disabled={!tipoSolicitud}
                >
                  <SelectTrigger id="clase" className="w-full mt-1">
                    <SelectValue placeholder="Seleccionar clase" />
                  </SelectTrigger>
                  <SelectContent>
                    {getClaseOptions(tipoSolicitud).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                        </div>
                    </div>


            {/* Campos específicos para Redeterminación */}
            {(mostrarExpediente || mostrarOrdenCompra) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mostrarExpediente && (
              <div>
                    <label htmlFor="expediente" className="text-base font-medium">
                  Número de Expediente
                </label>
                <Select value={expediente} onValueChange={setExpediente}>
                      <SelectTrigger id="expediente" className="w-full mt-1">
                    <SelectValue placeholder="Seleccionar número de expediente" />
                  </SelectTrigger>
                  <SelectContent>
                    {expedientesData.map((exp) => (
                      <SelectItem key={exp.id} value={exp.id}>
                        {exp.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {mostrarOrdenCompra && (
              <div>
                    <label htmlFor="ordenCompra" className="text-base font-medium">
                  Orden de Compra
                </label>
                    <Input id="ordenCompra" value={ordenCompra} readOnly className="w-full mt-1 bg-gray-50" />
                  </div>
                )}
              </div>
            )}

            {/* Campos específicos para Cambio de datos */}
            {mostrarCamposCambioDatos && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tipoDato" className="text-base font-medium">
                    Tipo de dato
                  </label>
                  <Select value={tipoDato} onValueChange={handleTipoDatoChange}>
                    <SelectTrigger id="tipoDato" className="w-full mt-1">
                      <SelectValue placeholder="Seleccionar tipo de dato" />
                    </SelectTrigger>
                    <SelectContent>
                      {clase === "cambio_datos_usuario" && (
                        <>
                          <SelectItem value="dni">DNI</SelectItem>
                          <SelectItem value="cuil">CUIL</SelectItem>
                        </>
                      )}
                      {clase === "cambio_datos_proveedor" && (
                        <>
                          <SelectItem value="cuit_cuil">CUIT/CUIL</SelectItem>
                          <SelectItem value="razon_social">Razón Social</SelectItem>
                          <SelectItem value="nombre_fantasia">Nombre fantasía</SelectItem>
                          <SelectItem value="naturaleza_organizacion">Naturaleza de la organización</SelectItem>
                          <SelectItem value="tipo_societario">Tipo societario</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="nuevoValor" className="text-base font-medium">
                    Nuevo valor
                  </label>
                  {esSelect ? (
                    <Select value={origenDato} onValueChange={setOrigenDato}>
                      <SelectTrigger id="nuevoValor" className="w-full mt-1">
                        <SelectValue placeholder="Seleccionar nuevo valor" />
                      </SelectTrigger>
                      <SelectContent>
                        {getNuevoValorOptions(tipoDato).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                  <Input
                      id="nuevoValor"
                      type="text"
                      value={origenDato}
                      onChange={(e) => {
                        let value = e.target.value;
                        
                        // Solo aplicar validación numérica para campos de usuario (DNI/CUIL)
                        if (clase === "cambio_datos_usuario") {
                          value = value.replace(/\D/g, "").slice(0, 8)
                        }
                        
                        setOrigenDato(value)
                      }}
                      className="mt-1"
                      placeholder={
                        clase === "cambio_datos_usuario" 
                          ? "Ingrese el nuevo valor (hasta 8 dígitos)" 
                          : "Ingrese el nuevo valor"
                      }
                      maxLength={clase === "cambio_datos_usuario" ? 8 : undefined}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Asunto */}
            <div className="max-w-md">
              <label htmlFor="asunto" className="text-base font-medium">
                Asunto
              </label>
              <Input
                id="asunto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className="mt-1"
                placeholder="Ingrese el asunto de su solicitud"
              />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="text-base font-medium">
                Descripción
              </label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={6}
                className="mt-1 resize-none"
                placeholder="Describa detalladamente el motivo de su solicitud..."
              />
            </div>

                </div>
                      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Documentación Adjunta</h3>
                      <div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50">
                <Upload size={16} />
                <span>Adjuntar otros Archivo</span>
                      </div>
                        <input
                id="file-upload"
                          type="file"
                multiple
                onChange={(e) => handleFileChange(e, "general")}
                          className="hidden"
                accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                        />
            </label>
                      </div>
          </div>

          {/* Campos adicionales para Redeterminación */}
          {mostrarCamposRedeterminacion && (
            <div className="mb-6 space-y-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold">Documentación específica para Redeterminación</h3>

              {/* Nota */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Nota</h4>
                  <p className="text-sm text-gray-500">Adjunte la nota de redeterminación</p>
                </div>
                <Button type="button" variant="outline" onClick={handleAdjuntarNota} className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Adjuntar Nota
                </Button>
                <input
                  type="file"
                  ref={notaInputRef}
                  onChange={(e) => handleFileChange(e, "nota")}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* Tabla de archivos de nota */}
              {archivosNota.length > 0 && (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre del Archivo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tamaño</th>
                        <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {archivosNota.map((archivo) => (
                        <tr key={archivo.id} className="border-b border-gray-200">
                          <td className="py-4 px-4">{archivo.nombre}</td>
                          <td className="py-4 px-4">{archivo.tipo}</td>
                          <td className="py-4 px-4">{archivo.tamano}</td>
                          <td className="py-4 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(archivo.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}


        <div className="border rounded-md">
          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium">
            <div className="col-span-5">Nombre del Archivo</div>
            <div className="col-span-3">Tipo</div>
            <div className="col-span-2">Tamaño</div>
            <div className="col-span-2 text-right">Acciones</div>
              </div>

          {archivosGenerales.length === 0 ? (
            <div className="p-6 text-center text-gray-500 italic">No hay archivos adjuntos</div>
          ) : (
            <div>
              {archivosGenerales.map((archivo) => (
                <div key={archivo.id} className="grid grid-cols-12 gap-4 p-4 border-b text-sm items-center">
                  <div className="col-span-5 truncate">{archivo.nombre}</div>
                  <div className="col-span-3">{archivo.tipo || "Desconocido"}</div>
                  <div className="col-span-2">{archivo.tamano}</div>
                  <div className="col-span-2 text-right">
                            <Button
                      type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(archivo.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-transparent p-0"
                            >
                      <X size={16} />
                            </Button>
                </div>
                </div>
              ))}
                </div>
              )}
            </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
                        <Button
          type="button"
          variant="outline"
          onClick={() => window.location.href = "/cliente/gestion/solicitudes/mis-solicitudes"}
        >
          Cancelar
                        </Button>
        <Button type="submit" className="bg-plp-dark hover:bg-plp-medium">
            Enviar Solicitud
          </Button>
        </div>
      </form>
  )
}
