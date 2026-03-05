"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Calendar, Save } from "lucide-react"
import { GuardarBorradorModal } from "../proveedores/guardar-borrador-modal"

interface DatosGeneralesClienteFormProps {
  onSave: (data: any) => void
  onNext: () => void
  onSaveDraft?: () => void
  onSubmit?: (data?: any) => boolean
  initialData?: any
  onCancel?: () => void
  readOnly?: boolean
}

interface DocumentoArchivo {
  id: string
  nombre: string
  archivo: File | null
  fechaEmision: string
}

export default function DatosGeneralesClienteForm({ 
  onSave, 
  onNext, 
  onSaveDraft, 
  onSubmit, 
  initialData = {}, 
  onCancel,
  readOnly,
}: DatosGeneralesClienteFormProps) {
  const [formData, setFormData] = useState({
    naturalezaOrganizacion: initialData.naturalezaOrganizacion || "",
    tipoSocietario: initialData.tipoSocietario || "",
    razonSocial: initialData.razonSocial || "",
    cuit: initialData.cuit || "",
    nombreFantasia: initialData.nombreFantasia || "",
    ultimaActividad: initialData.ultimaActividad || "",
    convenioMultilateral: initialData.convenioMultilateral || "",
    exencionesImpositivas: initialData.exencionesImpositivas || "",

    // Documentos
    documentos: {
      constanciaARCA: {
        archivo: null as File | null,
        fechaEmision: "",
        fechaVencimiento: "",
      },
      constanciaARBA: {
        archivo: null as File | null,
        fechaEmision: "",
        fechaVencimiento: "",
      },
      convenioMultilateral: {
        archivo: null as File | null,
        fechaEmision: "",
        fechaVencimiento: "",
      },
      exencionesImpositivas: {
        archivo: null as File | null,
        fechaEmision: "",
        fechaVencimiento: "",
      },
      declaracionPatrimonial: {
        archivo: null as File | null,
        fechaEmision: "",
      },
      
      constanciaINAES: {
        archivo: null as File | null,
        fechaEmision: "",
      },
      reglamentoINAES: {
        archivo: null as File | null,
        fechaEmision: "",
      },
    },
    referenciasFinancieras: [] as DocumentoArchivo[],
    balancesAprobados: [] as DocumentoArchivo[],
    ...initialData,
  })

  // Estado para el modal de borrador guardado
  const [showBorradorModal, setShowBorradorModal] = useState(false)

  // Inicializar con una referencia y un balance
  useEffect(() => {
    if (formData.referenciasFinancieras.length === 0) {
      handleMultipleFileAdd("referenciasFinancieras")
    }
    if (formData.balancesAprobados.length === 0) {
      handleMultipleFileAdd("balancesAprobados")
    }
  }, [])

  // Estado para controlar qué calendario está abierto
  const [openCalendar, setOpenCalendar] = useState<string | null>(null)

  // Referencias para los calendarios
  const calendarRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Cerrar el calendario cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openCalendar &&
        calendarRefs.current[openCalendar] &&
        !calendarRefs.current[openCalendar]?.contains(event.target as Node)
      ) {
        setOpenCalendar(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openCalendar])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Si cambia la naturaleza de la organización, actualizar automáticamente el tipo societario
    if (name === "naturalezaOrganizacion") {
      let tipoSocietarioDefault = ""

      if (value === "Persona fisica") {
        tipoSocietarioDefault = "Persona Fisica"
      } else if (value === "Sociedad de hecho") {
        tipoSocietarioDefault = "Sociedad de hecho"
      } else if (value === "Sociedades legalmente Constituidas") {
        tipoSocietarioDefault = ""
      }

      const newFormData = {
        ...formData,
        [name]: value,
        tipoSocietario: tipoSocietarioDefault,
      }
      setFormData(newFormData)
      
      // Guardar automáticamente los datos cuando cambian
      onSave(newFormData)
    } else {
      const newFormData = {
        ...formData,
        [name]: value,
      }
      setFormData(newFormData)
      
      // Guardar automáticamente los datos cuando cambian
      onSave(newFormData)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0] || null
    const newFormData = {
      ...formData,
      documentos: {
        ...formData.documentos,
        [docType]: {
          ...formData.documentos[docType as keyof typeof formData.documentos],
          archivo: file,
        },
      },
    }
    setFormData(newFormData)
    onSave(newFormData)
  }

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: string,
    dateType: "fechaEmision" | "fechaVencimiento",
  ) => {
    const newFormData = {
      ...formData,
      documentos: {
        ...formData.documentos,
        [docType]: {
          ...formData.documentos[docType as keyof typeof formData.documentos],
          [dateType]: e.target.value,
        },
      },
    }
    setFormData(newFormData)
    onSave(newFormData)
  }

  const handleDateSelect = (date: Date, docType: string, dateType: "fechaEmision" | "fechaVencimiento") => {
    const formattedDate = date.toISOString().split("T")[0]
    const newFormData = {
      ...formData,
      documentos: {
        ...formData.documentos,
        [docType]: {
          ...formData.documentos[docType as keyof typeof formData.documentos],
          [dateType]: formattedDate,
        },
      },
    }
    setFormData(newFormData)
    onSave(newFormData)
    setOpenCalendar(null)
  }

  const handleMultipleFileAdd = (tipo: "referenciasFinancieras" | "balancesAprobados") => {
    const newDoc: DocumentoArchivo = {
      id: `${tipo}_${Date.now()}`,
      nombre: "",
      archivo: null,
      fechaEmision: "",
    }
    const newFormData = {
      ...formData,
      [tipo]: [...formData[tipo], newDoc],
    }
    setFormData(newFormData)
    onSave(newFormData)
  }

  const handleMultipleFileRemove = (tipo: "referenciasFinancieras" | "balancesAprobados", id: string) => {
    const newFormData = {
      ...formData,
      [tipo]: formData[tipo].filter((doc: DocumentoArchivo) => doc.id !== id),
    }
    setFormData(newFormData)
    onSave(newFormData)
  }

  const handleMultipleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "referenciasFinancieras" | "balancesAprobados",
    id: string,
  ) => {
    const file = e.target.files?.[0] || null
    const newFormData = {
      ...formData,
      [tipo]: formData[tipo].map((doc: DocumentoArchivo) =>
        doc.id === id ? { ...doc, archivo: file } : doc
      ),
    }
    setFormData(newFormData)
    onSave(newFormData)
  }

  const handleMultipleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "referenciasFinancieras" | "balancesAprobados",
    id: string,
  ) => {
    const newFormData = {
      ...formData,
      [tipo]: formData[tipo].map((doc: DocumentoArchivo) =>
        doc.id === id ? { ...doc, fechaEmision: e.target.value } : doc
      ),
    }
    setFormData(newFormData)
    onSave(newFormData)
  }

  const handleMultipleDateSelect = (date: Date, tipo: "referenciasFinancieras" | "balancesAprobados", id: string) => {
    const formattedDate = date.toISOString().split("T")[0]
    const newFormData = {
      ...formData,
      [tipo]: formData[tipo].map((doc: DocumentoArchivo) =>
        doc.id === id ? { ...doc, fechaEmision: formattedDate } : doc
      ),
    }
    setFormData(newFormData)
    onSave(newFormData)
    setOpenCalendar(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    
    // Si hay función de validación, ejecutarla con los datos actuales
    if (onSubmit) {
      return onSubmit(formData)
    }
    return true
  }

  const handleNext = () => {
    onSave(formData)
    
    // Si hay función de next, ejecutarla para avanzar
    if (onNext) {
    onNext()
  }
  }

  const handleSaveDraftClick = () => {
    onSave(formData)
    if (onSaveDraft) {
      onSaveDraft()
    }
    setShowBorradorModal(true)
  }

  // Componente de calendario
  const DatePicker = ({
    id,
    value,
    onChange,
    onSelect,
  }: {
    id: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSelect: (date: Date) => void
  }) => {
    const today = new Date()
    const [viewDate, setViewDate] = useState(value ? new Date(value) : today)
    const [currentMonth, setCurrentMonth] = useState(viewDate.getMonth())
    const [currentYear, setCurrentYear] = useState(viewDate.getFullYear())

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    const handlePrevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    }

    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }

    const handleDayClick = (day: number) => {
      const selectedDate = new Date(currentYear, currentMonth, day)
      onSelect(selectedDate)
    }

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]

    return (
      <div className="relative w-full">
        <div className="flex items-center">
          <input
            type="text"
            id={id}
            value={value ? value.split("-").reverse().join("/") : ""}
            onChange={onChange}
            placeholder="DD/MM/AAAA"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
          />
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-600"
            onClick={() => setOpenCalendar(openCalendar === id ? null : id)}
          >
            <Calendar size={18} />
          </button>
        </div>

        {openCalendar === id && (
          <div
            ref={(el) => {
              calendarRefs.current[id] = el
            }}
            className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 w-64"
          >
            <div className="flex justify-between items-center mb-2">
              <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full">
                &lt;
              </button>
              <div className="font-medium">
                {monthNames[currentMonth]} {currentYear}
              </div>
              <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <div className="font-medium">D</div>
              <div className="font-medium">L</div>
              <div className="font-medium">M</div>
              <div className="font-medium">M</div>
              <div className="font-medium">J</div>
              <div className="font-medium">V</div>
              <div className="font-medium">S</div>

              {days.map((day, index) => (
                <div key={index}>
                  {day ? (
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className={`w-8 h-8 rounded-full hover:bg-gray-100 ${
                        value &&
                        new Date(value).getDate() === day &&
                        new Date(value).getMonth() === currentMonth &&
                        new Date(value).getFullYear() === currentYear
                          ? "bg-plp-primary text-white hover:bg-plp-dark"
                          : ""
                      }`}
                    >
                      {day}
                    </button>
                  ) : (
                    <div className="w-8 h-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label htmlFor="tipoCliente" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Cliente <span className="text-red-500">*</span>
          </label>
          <select
            id="tipoCliente"
            name="tipoCliente"
            value={formData.tipoCliente}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Agencia Marítima">Agencia Marítima</option>
            <option value="Permisionario">Permisionario</option>
            <option value="Concesionario">Concesionario</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div>
          <label htmlFor="naturalezaOrganizacion" className="block text-sm font-medium text-gray-700 mb-1">
            Naturaleza de la Organización <span className="text-red-500">*</span>
          </label>
          <select
            id="naturalezaOrganizacion"
            name="naturalezaOrganizacion"
            value={formData.naturalezaOrganizacion}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Persona fisica">Persona fisica</option>
            <option value="Sociedad de hecho">Sociedad de hecho</option>
            <option value="Sociedades legalmente Constituidas">Sociedades legalmente Constituidas</option>
          </select>
        </div>

        <div>
          <label htmlFor="tipoSocietario" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo Societario <span className="text-red-500">*</span>
          </label>
          <select
            id="tipoSocietario"
            name="tipoSocietario"
            value={formData.tipoSocietario}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            {formData.naturalezaOrganizacion === "Persona fisica" ? (
              <option value="Persona Fisica">Persona Fisica</option>
            ) : formData.naturalezaOrganizacion === "Sociedad de hecho" ? (
              <option value="Sociedad de hecho">Sociedad de hecho</option>
            ) : formData.naturalezaOrganizacion === "Sociedades legalmente Constituidas" ? (
              <>
                <option value="SRL">SRL</option>
                <option value="SA">SA</option>
                <option value="Sociedad por Acciones Simplificadas (S.A.S.)">Sociedad por Acciones Simplificadas (S.A.S.)</option>
                <option value="Sociedad de Capital e Industria">Sociedad de Capital e Industria</option>
                <option value="Sociedad Colectiva (S.C.)">Sociedad Colectiva (S.C.)</option>
                <option value="Sociedad en Comandita Simple (S.C.S.)">Sociedad en Comandita Simple (S.C.S.)</option>
                <option value="Sociedad en Comandita por Acciones (SC)">Sociedad en Comandita por Acciones (SC)</option>
                <option value="Sociedad de Hecho">Sociedad de Hecho</option>
                <option value="Uniones Transitorias (U.T.)">Uniones Transitorias (U.T.)</option>
                <option value="Cooperativa">Cooperativa</option>
              </>
            ) : null}
          </select>
        </div>

        <div>
          <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700 mb-1">
            Razón Social <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese la razón social"
            required
          />
        </div>

        <div>
          <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-1">
            CUIT <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cuit"
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="XX-XXXXXXXX-X"
            required
          />
        </div>

        <div>
          <label htmlFor="nombreFantasia" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Fantasía
          </label>
          <input
            type="text"
            id="nombreFantasia"
            name="nombreFantasia"
            value={formData.nombreFantasia}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el nombre fantasía"
          />
        </div>

        <div>
          <label htmlFor="ultimaActividad" className="block text-sm font-medium text-gray-700 mb-1">
            Última actividad realizada en Puerto <span className="text-red-500">*</span>
          </label>
          <select
            id="ultimaActividad"
            name="ultimaActividad"
            value={formData.ultimaActividad}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Nuevo Cliente">Nuevo Cliente</option>
            <option value="1 a 3 años">1 a 3 años</option>
            <option value="3 a 5 años">3 a 5 años</option>
            <option value="Mayor a 5 años">Mayor a 5 años</option>
          </select>
        </div>

        <div>
          <label htmlFor="convenioMultilateral" className="block text-sm font-medium text-gray-700 mb-1">
            Convenio multilateral <span className="text-red-500">*</span>
          </label>
          <select
            id="convenioMultilateral"
            name="convenioMultilateral"
            value={formData.convenioMultilateral}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label htmlFor="exencionesImpositivas" className="block text-sm font-medium text-gray-700 mb-1">
            Exenciones impositivas <span className="text-red-500">*</span>
          </label>
          <select
            id="exencionesImpositivas"
            name="exencionesImpositivas"
            value={formData.exencionesImpositivas}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Sección de documentos */}
        <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Documentación</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Regimen tributario ARCA */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Régimen tributario ARCA</span>
                        </div>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                <span className="text-sm text-gray-600">Browse...</span>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "constanciaARCA")} />
              </label>
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                placeholder="Ningún archivo seleccionado"
                readOnly
                value={formData.documentos?.constanciaARCA?.archivo?.name || ""}
              />
                      </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
                <DatePicker
                  id="constanciaARCA-emision"
                  value={formData.documentos?.constanciaARCA?.fechaEmision ?? ""}
                  onChange={(e) => handleDateChange(e, "constanciaARCA", "fechaEmision")}
                  onSelect={(date) => handleDateSelect(date, "constanciaARCA", "fechaEmision")}
                />
                  </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Venc.</label>
                <DatePicker
                  id="constanciaARCA-vencimiento"
                  value={formData.documentos?.constanciaARCA?.fechaVencimiento ?? ""}
                  onChange={(e) => handleDateChange(e, "constanciaARCA", "fechaVencimiento")}
                  onSelect={(date) => handleDateSelect(date, "constanciaARCA", "fechaVencimiento")}
                />
                          </div>
                            </div>
          </div>

          {/* Régimen tributario ARBA - Solo se muestra si Convenio Multilateral es "No" */}
          {formData.convenioMultilateral === "No" && (
            <div>
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Régimen tributario ARBA</span>
              </div>
              <div className="flex gap-2 mb-2">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                  <span className="text-sm text-gray-600">Browse...</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "constanciaARBA")} />
                </label>
                            <input
                  type="text"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                  placeholder="Ningún archivo seleccionado"
                  readOnly
                  value={formData.documentos?.constanciaARBA?.archivo?.name || ""}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
                                <DatePicker
                    id="constanciaARBA-emision"
                    value={formData.documentos?.constanciaARBA?.fechaEmision ?? ""}
                    onChange={(e) => handleDateChange(e, "constanciaARBA", "fechaEmision")}
                    onSelect={(date) => handleDateSelect(date, "constanciaARBA", "fechaEmision")}
                                />
                              </div>
                              <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Vencimiento</label>
                                <DatePicker
                    id="constanciaARBA-vencimiento"
                    value={formData.documentos?.constanciaARBA?.fechaVencimiento ?? ""}
                    onChange={(e) => handleDateChange(e, "constanciaARBA", "fechaVencimiento")}
                    onSelect={(date) => handleDateSelect(date, "constanciaARBA", "fechaVencimiento")}
                                />
                              </div>
                          </div>
                        </div>
          )}

          {/* Convenio Multilateral - Solo se muestra si Convenio Multilateral es "Si" */}
          {formData.convenioMultilateral === "Si" && (
            <div>
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Convenio Multilateral</span>
                    </div>
              <div className="flex gap-2 mb-2">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                  <span className="text-sm text-gray-600">Browse...</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "convenioMultilateral")} />
                </label>
                        <input
                  type="text"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                  placeholder="Ningún archivo seleccionado"
                  readOnly
                  value={formData.documentos?.convenioMultilateral?.archivo?.name || ""}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
                            <DatePicker
                    id="convenioMultilateral-emision"
                    value={formData.documentos?.convenioMultilateral?.fechaEmision ?? ""}
                    onChange={(e) => handleDateChange(e, "convenioMultilateral", "fechaEmision")}
                    onSelect={(date) => handleDateSelect(date, "convenioMultilateral", "fechaEmision")}
                            />
                          </div>
                          <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Vencimiento</label>
                            <DatePicker
                    id="convenioMultilateral-vencimiento"
                    value={formData.documentos?.convenioMultilateral?.fechaVencimiento ?? ""}
                    onChange={(e) => handleDateChange(e, "convenioMultilateral", "fechaVencimiento")}
                    onSelect={(date) => handleDateSelect(date, "convenioMultilateral", "fechaVencimiento")}
                            />
                          </div>
                            </div>
                          </div>
                        )}

          {/* Exenciones Impositivas - Solo se muestra si Exenciones Impositivas es "Si" */}
          {formData.exencionesImpositivas === "Si" && (
            <div>
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Exenciones Impositivas</span>
                        </div>
              <div className="flex gap-2 mb-2">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                  <span className="text-sm text-gray-600">Browse...</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "exencionesImpositivas")} />
                </label>
                        <input
                  type="text"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                  placeholder="Ningún archivo seleccionado"
                  readOnly
                  value={formData.documentos?.exencionesImpositivas?.archivo?.name || ""}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
                            <DatePicker
                    id="exencionesImpositivas-emision"
                    value={formData.documentos?.exencionesImpositivas?.fechaEmision ?? ""}
                    onChange={(e) => handleDateChange(e, "exencionesImpositivas", "fechaEmision")}
                    onSelect={(date) => handleDateSelect(date, "exencionesImpositivas", "fechaEmision")}
                            />
                          </div>
                          <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Vencimiento</label>
                            <DatePicker
                    id="exencionesImpositivas-vencimiento"
                    value={formData.documentos?.exencionesImpositivas?.fechaVencimiento ?? ""}
                    onChange={(e) => handleDateChange(e, "exencionesImpositivas", "fechaVencimiento")}
                    onSelect={(date) => handleDateSelect(date, "exencionesImpositivas", "fechaVencimiento")}
                            />
                          </div>
                      </div>
                    </div>
            )}
        </div>
      </div>

      <div className="flex justify-between space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel || (() => window.history.back())}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
        >
          {readOnly ? "Volver" : "Cancelar"}
        </button>
        {!readOnly && (
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleSaveDraftClick}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Borrador
            </button>
            <button 
              type="button" 
              onClick={handleNext}
              className="px-4 py-2 bg-[#002169] text-white rounded-md hover:bg-blue-900 font-medium"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Modal de borrador guardado */}
      <GuardarBorradorModal isOpen={showBorradorModal} onClose={() => setShowBorradorModal(false)} />
    </form>
  )
}
