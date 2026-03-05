"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Calendar, Plus, Trash2, ChevronLeft, ChevronRight, Upload } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format, addMonths, subMonths } from "date-fns"
import { es } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { ModalInvitacionVisita } from "@/components/visitas/modal-invitacion-visita"

// Interfaces
interface Persona {
  id: string
  nombre: string
  documento: string
  empresa: string
  telefono?: string
  email?: string
  licenciaConducir?: File | null
  numeroLicencia?: string
  categorias?: string[]
  fechaVencimientoLicencia?: Date | undefined
}

interface Vehiculo {
  id: string
  tipo: string
  patente: string
  marca?: string
  modelo?: string
  titular?: string
  seguro?: File | null
  cedulaVerde?: File | null
  certificadoSeguridadVehicular?: File | null
  conductorNoTitular?: boolean
  cedulaAzul?: File | null
  fechaVencimientoSeguro?: Date | undefined
}

// Datos de ejemplo para vehículos cargados
const vehiculosCargadosData = [
  {
    id: 1,
    tipo: "Auto",
    patente: "AB123CD",
    marca: "Toyota",
    modelo: "Corolla",
    seguro: "seguro_auto_1.pdf",
    fechaVencimientoSeguro: "2025-05-15",
  },
  {
    id: 2,
    tipo: "Camioneta",
    patente: "XY456ZW",
    marca: "Ford",
    modelo: "Ranger",
    seguro: "seguro_camioneta_1.pdf",
    fechaVencimientoSeguro: "2025-06-20",
  },
  {
    id: 3,
    tipo: "Camion",
    patente: "CD789EF",
    marca: "Mercedes-Benz",
    modelo: "Actros",
    seguro: "seguro_camion_1.pdf",
    fechaVencimientoSeguro: "2025-07-10",
  },
]

// Datos de ejemplo para conductores cargados
const conductoresCargadosData = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    dni: "28456789",
    telefono: "1145678901",
    numeroLicencia: "11-1234-5678",
    categorias: ["B", "C"],
    licencia: "licencia_carlos.pdf",
    fechaVencimientoLicencia: "2025-05-15",
  },
  {
    id: 2,
    nombre: "María González",
    dni: "30987654",
    telefono: "1156789012",
    numeroLicencia: "11-5678-1234",
    categorias: ["B"],
    licencia: "licencia_maria.pdf",
    fechaVencimientoLicencia: "2025-06-20",
  },
  {
    id: 3,
    nombre: "Juan Pérez",
    dni: "25678901",
    telefono: "1167890123",
    numeroLicencia: "11-9012-3456",
    categorias: ["A", "B", "E"],
    licencia: "licencia_juan.pdf",
    fechaVencimientoLicencia: "2025-07-10",
  },
]

// Lista de proveedores registrados (simulada)
const proveedoresRegistrados = [
  {
    id: 1,
    razonSocial: "Transportes Marítimos del Plata S.A.",
    cuit: "30-12345678-9",
    email: "contacto@tmpsa.com.ar",
    telefono: "11-4567-8901",
    activo: true,
  },
  {
    id: 2,
    razonSocial: "Logística Portuaria Internacional",
    cuit: "30-23456789-0",
    email: "info@lpi.com.ar",
    telefono: "11-5678-9012",
    activo: true,
  },
  {
    id: 3,
    razonSocial: "Servicios Portuarios Unidos",
    cuit: "30-34567890-1",
    email: "ventas@spu.com.ar",
    telefono: "11-6789-0123",
    activo: true,
  },
  {
    id: 4,
    razonSocial: "Carga Express Argentina",
    cuit: "30-45678901-2",
    email: "operaciones@cea.com.ar",
    telefono: "11-7890-1234",
    activo: true,
  },
  {
    id: 5,
    razonSocial: "Terminal de Contenedores SA",
    cuit: "30-56789012-3",
    email: "comercial@tcsa.com.ar",
    telefono: "11-8901-2345",
    activo: true,
  },
]

// Componente de calendario personalizado
const CustomCalendar = ({
  selectedDate,
  onSelectDate,
}: {
  selectedDate?: Date
  onSelectDate: (date: Date) => void
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Obtener el primer día del mes actual
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)

  // Obtener el día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Obtener el número de días en el mes actual
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  // Crear un array con los días del mes
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Función para ir al mes anterior
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Función para ir al mes siguiente
  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Obtener el nombre del mes y el año
  const monthName = format(currentMonth, "MMMM yyyy", { locale: es })

  // Capitalizar la primera letra del mes
  const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1)

  // Días de la semana
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"]

  // Verificar si un día es el seleccionado
  const isSelectedDay = (day: number) => {
    if (!selectedDate) return false

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  // Verificar si un día es hoy
  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[320px]">
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={goToPreviousMonth} className="text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-center font-medium">{capitalizedMonthName}</div>
        <button type="button" onClick={goToNextMonth} className="text-gray-600 hover:text-gray-900">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Días de la semana */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm font-medium text-gray-500 h-8 flex items-center justify-center"
          >
            {day}
          </div>
        ))}

        {/* Espacios vacíos antes del primer día */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8"></div>
        ))}

        {/* Días del mes */}
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
            className={`h-9 w-9 rounded-full flex items-center justify-center text-sm ${
              isSelectedDay(day)
                ? "bg-blue-600 text-white"
                : isToday(day)
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

// Componente DatePicker Inline (sin modal)
function DatePickerInline({ date, setDate }: { date?: Date; setDate: (date: Date) => void }) {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div className="relative">
      <div
        className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-600">
          {date ? format(date, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
        </span>
      </div>
      {showCalendar && (
        <div className="absolute z-10 top-full mt-1">
          <CustomCalendar
            selectedDate={date}
            onSelectDate={(date) => {
              setDate(date)
              setShowCalendar(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function NuevaVisitaPage() {
  const router = useRouter()
  const [modalAbierto, setModalAbierto] = useState(false)
  const [datosVisitaActual, setDatosVisitaActual] = useState<any>(null)

  // Estados para los campos del formulario
  const [tipoVisita, setTipoVisita] = useState<string>("")

  // Estado para destino
  const [destino, setDestino] = useState<string>("")

  // Estado para persona responsable del puerto
  const [personaResponsable, setPersonaResponsable] = useState<string>("")

  // Estado para operacion (cuando se selecciona Transporte Cargas)
  const [operacion, setOperacion] = useState<string>("")

  // Estado para tipo de carga (cuando se selecciona Transporte Cargas)
  const [tipoCarga, setTipoCarga] = useState<string>("")
  const [otroTipoCarga, setOtroTipoCarga] = useState<string>("")
  const [empresaTransporte, setEmpresaTransporte] = useState<string>("")
  const [transporteTerciarizado, setTransporteTerciarizado] = useState<boolean>(false)

  // Estados para proveedor (solo para Transporte Cargas)
  const [razonSocial, setRazonSocial] = useState<string>("")
  const [cuitProveedor, setCuitProveedor] = useState<string>("")
  const [emailProveedor, setEmailProveedor] = useState<string>("")
  const [telefonoProveedor, setTelefonoProveedor] = useState<string>("")
  const [proveedorNoInscripto, setProveedorNoInscripto] = useState<boolean>(false)

  const [proveedorEncontrado, setProveedorEncontrado] = useState<any>(null)
  const [camposDeshabilitados, setCamposDeshabilitados] = useState<boolean>(false)
  const [showProveedorSuggestions, setShowProveedorSuggestions] = useState<boolean>(false)
  const [proveedoresSugeridos, setProveedoresSugeridos] = useState<any[]>([])

  // Estados para fecha y hora desde
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [horaDesde, setHoraDesde] = useState<string>("")
  const [showCalendarDesde, setShowCalendarDesde] = useState(false)

  // Estados para fecha y hora hasta
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [horaHasta, setHoraHasta] = useState<string>("")
  const [showCalendarHasta, setShowCalendarHasta] = useState(false)

  // Estado para el personal a visitar (solo para visitas laborales)
  const [personalVisita, setPersonalVisita] = useState<string>("")

  // Estados para personas
  const [personas, setPersonas] = useState<Persona[]>([])
  const [nombrePersona, setNombrePersona] = useState<string>("")
  const [documentoPersona, setDocumentoPersona] = useState<string>("")
  const [emailPersona, setEmailPersona] = useState<string>("")
  const [telefonoPersona, setTelefonoPersona] = useState<string>("")
  // Estados para vehículos
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])

  // Estados para vehículos y conductores cargados
  const [vehiculosCargados, setVehiculosCargados] = useState(vehiculosCargadosData)
  const [conductoresCargados, setConductoresCargados] = useState(conductoresCargadosData)
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<string>("")
  const [conductorSeleccionado, setConductorSeleccionado] = useState<string>("")
  const [isNewVehiculoModalOpen, setIsNewVehiculoModalOpen] = useState(false)
  const [isNewConductorModalOpen, setIsNewConductorModalOpen] = useState(false)

  // Estados para fechas de vencimiento
  const [fechaVencimientoLicencia, setFechaVencimientoLicencia] = useState<Date | undefined>(undefined)
  const [fechaVencimientoSeguro, setFechaVencimientoSeguro] = useState<Date | undefined>(undefined)

  // Estados para controlar la visibilidad de los calendarios en los modales
  const [showLicenciaCalendar, setShowLicenciaCalendar] = useState(false)
  const [showSeguroCalendar, setShowSeguroCalendar] = useState(false)

  // Categorías de licencia disponibles
  const categoriasLicencia = [
    "A.1",
    "A.2",
    "A.3",
    "A.4",
    "A.5",
    "B.1",
    "B.2",
    "C.1",
    "C.2",
    "D.1",
    "D.2",
    "D.3",
    "E.1",
    "E.2",
    "F",
    "G.1",
    "G.2",
    "G.3",
  ]

  // Estados para conductor
  const [nombreConductor, setNombreConductor] = useState<string>("")
  const [dniConductor, setDniConductor] = useState<string>("")
  const [telefonoConductor, setTelefonoConductor] = useState<string>("")
  const [numeroLicencia, setNumeroLicencia] = useState<string>("")
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([])
  const [licenciaConducir, setLicenciaConducir] = useState<File | null>(null)
  const [errorCategorias, setErrorCategorias] = useState<string>("")
  const [emailConductor, setEmailConductor] = useState<string>("")

  // Estados para vehículo
  const [tipoVehiculo, setTipoVehiculo] = useState<string>("")
  const [patenteVehiculo, setPatenteVehiculo] = useState<string>("")
  const [marcaVehiculo, setMarcaVehiculo] = useState<string>("")
  const [modeloVehiculo, setModeloVehiculo] = useState<string>("")
  const [titularVehiculo, setTitularVehiculo] = useState<string>("")
  const [cedulaVerde, setCedulaVerde] = useState<File | null>(null)
  const [seguroVehiculo, setSeguroVehiculo] = useState<File | null>(null)
  const [certificadoSeguridadVehicular, setCertificadoSeguridadVehicular] = useState<File | null>(null)
  const [conductorNoTitular, setConductorNoTitular] = useState<boolean>(false)
  const [cedulaAzul, setCedulaAzul] = useState<File | null>(null)

  // Estado para visita recurrente
  const [visitaRecurrente, setVisitaRecurrente] = useState<boolean>(false)
  const [diasSemana, setDiasSemana] = useState<string[]>([])

  const tiposVisita = ["Laboral", "Transporte Cargas", "Acceso a Obra", "Acceso a Muelle"]

  const tiposVehiculo = ["Auto", "Camioneta", "Camión", "Utilitario", "Moto", "Acoplado"]

  // Opciones de destino
  const opcionesDestino = [
    "Areneras",
    "Terminal TEC Plata",
    "Copetro",
    "Deposito Fiscal",
    "PLP - Oficinas Administrativas",
    "Zona Operativa/Muelles",
    "PLP - Pañol/Deposito",
    "PLP - Obras e Ingenieria",
    "PLP - Taller de herreria",
    "PLP - Taller de Locomotoras",
  ]

  const personasResponsables = ["Adrian Monticelli", "Aquiles Ruiz", "Facundo Fiorino", "Julian Pertierra"]

  const tiposOperacion = ["Descarga", "Carga", "Carga y Descarga"]

  const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  // Estado para observaciones
  const [observaciones, setObservaciones] = useState<string>("")

  // Estado para validación del formulario
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // Referencias para cerrar los calendarios al hacer clic fuera
  const calendarDesdeRef = useRef<HTMLDivElement>(null)
  const calendarHastaRef = useRef<HTMLDivElement>(null)
  const licenciaCalendarRef = useRef<HTMLDivElement>(null)
  const seguroCalendarRef = useRef<HTMLDivElement>(null)

  // Cerrar calendarios al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarDesdeRef.current && !calendarDesdeRef.current.contains(event.target as Node)) {
        setShowCalendarDesde(false)
      }
      if (calendarHastaRef.current && !calendarHastaRef.current.contains(event.target as Node)) {
        setShowCalendarHasta(false)
      }
      if (licenciaCalendarRef.current && !licenciaCalendarRef.current.contains(event.target as Node)) {
        setShowLicenciaCalendar(false)
      }
      if (seguroCalendarRef.current && !seguroCalendarRef.current.contains(event.target as Node)) {
        setShowSeguroCalendar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Validar el formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar tipo de visita
    if (!tipoVisita) {
      newErrors.tipoVisita = "El tipo de visita es obligatorio"
    }

    // Validar destino
    if (!destino) {
      newErrors.destino = "El destino es obligatorio"
    }

    // Validar persona responsable (para destinos específicos)
    if (
      (destino === "PLP - Oficinas Administrativas" ||
        destino === "PLP - Pañol/Deposito" ||
        destino === "PLP - Obras e Ingenieria" ||
        destino === "PLP - Taller de herreria" ||
        destino === "PLP - Taller de Locomotoras") &&
      !personaResponsable
    ) {
      newErrors.personaResponsable = "La persona responsable es obligatoria"
    }

    // Validaciones específicas para Transporte Cargas
    if (tipoVisita === "Transporte Cargas") {
      // Validar operacion
      if (!operacion) {
        newErrors.operacion = "La operación es obligatoria"
      }

      // Validar tipo de carga
      if (!tipoCarga) {
        newErrors.tipoCarga = "El tipo de carga es obligatoria"
      }

      // Validar otro tipo de carga si se seleccionó "Otro"
      if (tipoCarga === "Otro" && !otroTipoCarga) {
        newErrors.otroTipoCarga = "Debe especificar el tipo de carga"
      }

      // Validar proveedor
      if (!razonSocial) {
        newErrors.razonSocial = "La razón social es obligatoria"
      }

      if (!cuitProveedor) {
        newErrors.cuitProveedor = "El CUIT es obligatorio"
      }

      if (!emailProveedor) {
        newErrors.emailProveedor = "El email es obligatorio"
      }

      if (!telefonoProveedor) {
        newErrors.telefonoProveedor = "El teléfono es obligatorio"
      }

      // Validaciones según si es transporte terciarizado o no
      if (transporteTerciarizado) {
        // Validar empresa de transporte solo si es terciarizado
        if (!empresaTransporte) {
          newErrors.empresaTransporte = "La empresa de transporte es obligatoria"
        }
      }
    } else {
      // Validaciones para otros tipos de visita

      // Validar personal a visitar (solo para visitas laborales)
      if (tipoVisita === "Laboral" && !personalVisita) {
        newErrors.personalVisita = "El personal a visitar es obligatorio"
      }

      // Validar que haya al menos una persona (solo para otros tipos de visita)
      if (personas.length === 0) {
        newErrors.personas = "Debe agregar al menos una persona"
      }
    }

    // Validar fecha y hora desde
    if (!fechaDesde) {
      newErrors.fechaDesde = "La fecha desde es obligatoria"
    }

    if (!horaDesde) {
      newErrors.horaDesde = "La hora desde es obligatoria"
    }

    // Validar fecha y hora hasta
    if (!fechaHasta) {
      newErrors.fechaHasta = "La fecha hasta es obligatoria"
    }

    // Validar hora hasta (para todas las visitas)
    if (!horaHasta) {
      newErrors.horaHasta = "La hora hasta es obligatoria"
    }

    if (visitaRecurrente && diasSemana.length === 0) {
      newErrors.diasSemana = "Debe seleccionar al menos un día de la semana"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función para agregar persona
  const agregarPersona = () => {
    if (nombrePersona && documentoPersona) {
      const nuevaPersona: Persona = {
        id: Date.now().toString(),
        nombre: nombrePersona,
        documento: documentoPersona,
        empresa: "",
        telefono: telefonoPersona,
        email: emailPersona,
      }
      setPersonas([...personas, nuevaPersona])

      // Limpiar campos
      setNombrePersona("")
      setDocumentoPersona("")
      setEmailPersona("")
      setTelefonoPersona("")
    }
  }

  // Función para eliminar persona
  const eliminarPersona = (id: string) => {
    setPersonas(personas.filter((persona) => persona.id !== id))
  }

  // Función para eliminar vehículo
  const eliminarVehiculo = (id: string) => {
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id))
  }

  // Función para manejar la carga de archivos
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  // Función para buscar proveedor por razón social
  const buscarProveedorPorRazonSocial = (razonSocial: string) => {
    if (razonSocial.length < 3 || proveedorNoInscripto) {
      setProveedoresSugeridos([])
      setShowProveedorSuggestions(false)
      return
    }

    const sugerencias = proveedoresRegistrados.filter(
      (prov) => prov.razonSocial.toLowerCase().includes(razonSocial.toLowerCase()) && prov.activo,
    )
    setProveedoresSugeridos(sugerencias)
    setShowProveedorSuggestions(sugerencias.length > 0)
  }

  // Función para buscar proveedor por CUIT
  const buscarProveedorPorCuit = (cuit: string) => {
    if (cuit.length < 5 || proveedorNoInscripto) return

    const proveedorEncontrado = proveedoresRegistrados.find((prov) => prov.cuit === cuit && prov.activo)

    if (proveedorEncontrado) {
      autocompletarProveedor(proveedorEncontrado)
    }
  }

  // Función para autocompletar datos del proveedor
  const autocompletarProveedor = (proveedor: any) => {
    setProveedorEncontrado(proveedor)
    setRazonSocial(proveedor.razonSocial)
    setCuitProveedor(proveedor.cuit)
    setEmailProveedor(proveedor.email)
    setTelefonoProveedor(proveedor.telefono)
    setCamposDeshabilitados(true)
    setShowProveedorSuggestions(false)
  }

  // Función para limpiar datos del proveedor
  const limpiarDatosProveedor = () => {
    setProveedorEncontrado(null)
    setRazonSocial("")
    setCuitProveedor("")
    setEmailProveedor("")
    setTelefonoProveedor("")
    setCamposDeshabilitados(false)
    setShowProveedorSuggestions(false)
  }

  // Función para manejar el cambio del checkbox de proveedor no inscripto
  const handleProveedorNoInscriptoChange = (checked: boolean) => {
    setProveedorNoInscripto(checked)
    if (checked) {
      limpiarDatosProveedor()
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (validateForm()) {
      console.log("Formulario enviado correctamente")
      console.log("Operacion:", operacion)
      console.log("Persona Responsable:", personaResponsable)

      // Datos a enviar
      const formData = {
        tipoVisita,
        destino,
        personaResponsable,
        operacion,
        tipoCarga,
        otroTipoCarga,
        empresaTransporte,
        transporteTerciarizado,
        razonSocial,
        cuitProveedor,
        emailProveedor,
        telefonoProveedor,
        proveedorNoInscripto,
        fechaDesde,
        horaDesde,
        fechaHasta,
        horaHasta,
        personalVisita,
        personas,
        vehiculos,
        visitaRecurrente,
        diasSemana,
        observaciones,
        id: `VIS-${Math.floor(Math.random() * 100000)}`,
      }

      // Si es transporte de cargas y hay un proveedor no registrado con email
      if (isTransporteCarga && emailProveedor) {
        console.log(`Enviando invitación por email a: ${emailProveedor}`)
        console.log(`Datos de la visita: ${formData.id}`)
      }

      // Generar un ID simulado para la visita
      const visitaConId = {
        tipoVisita,
        destino,
        personaResponsable,
        operacion,
        tipoCarga,
        otroTipoCarga,
        empresaTransporte,
        transporteTerciarizado,
        razonSocial,
        cuitProveedor,
        emailProveedor,
        telefonoProveedor,
        proveedorNoInscripto,
        fechaDesde,
        horaDesde,
        fechaHasta,
        horaHasta,
        personalVisita,
        personas,
        vehiculos,
        visitaRecurrente,
        diasSemana,
        observaciones,
        id: `VIS-${Math.floor(Math.random() * 100000)}`,
      }

      // Guardar los datos de la visita y abrir el modal
      setDatosVisitaActual(visitaConId)
      setModalAbierto(true)
    } else {
      console.log("Formulario con errores", errors)
    }
  }

  const handleCancel = () => {
    router.push("/empleado-compras/visitas/mis-visitas")
  }

  const cerrarModalYRedirigir = () => {
    setModalAbierto(false)
    // Redirigir a la página de mis visitas
    router.push("/empleado-compras/visitas/mis-visitas")
  }

  // Determinar si estamos en modo Transporte Cargas
  const isTransporteCarga = tipoVisita === "Transporte Cargas"

  const tiposCarga = [
    "Granel",
    "Liquida",
    "Gases",
    "Contenedores",
    "Paquetes",
    "Materiales de Construcción",
    "Maquinaria",
    "Otro",
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href="/empleado-compras/visitas/mis-visitas"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Nueva Visita</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección principal */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tipo de visita */}
          <div>
            <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Tipo Visita
            </Label>
            <Select value={tipoVisita} onValueChange={setTipoVisita}>
              <SelectTrigger
                id="tipoVisita"
                className={`w-full ${submitted && errors.tipoVisita ? "border-red-500 focus:ring-red-500" : ""}`}
              >
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposVisita.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
          </div>

          {/* Operacion (solo para Transporte Cargas) */}
          {isTransporteCarga && (
            <div>
              <Label htmlFor="operacion" className="text-sm font-medium text-gray-700 mb-1 block">
                Operación
              </Label>
              <Select value={operacion} onValueChange={setOperacion}>
                <SelectTrigger
                  id="operacion"
                  className={`w-full ${submitted && errors.operacion ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Seleccionar operación" />
                </SelectTrigger>
                <SelectContent>
                  {tiposOperacion.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.operacion && <p className="text-red-500 text-xs mt-1">{errors.operacion}</p>}
            </div>
          )}

          {/* Tipo de carga (solo para Transporte Cargas) */}
          {isTransporteCarga && (
            <div>
              <Label htmlFor="tipoCarga" className="text-sm font-medium text-gray-700 mb-1 block">
                Tipo Carga
              </Label>
              <Select value={tipoCarga} onValueChange={setTipoCarga}>
                <SelectTrigger
                  id="tipoCarga"
                  className={`w-full ${submitted && errors.tipoCarga ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Seleccionar tipo de carga" />
                </SelectTrigger>
                <SelectContent>
                  {tiposCarga.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoCarga && <p className="text-red-500 text-xs mt-1">{errors.tipoCarga}</p>}
            </div>
          )}

          {/* Especificar otro tipo de carga (cuando se selecciona "Otro") */}
          {isTransporteCarga && tipoCarga === "Otro" && (
            <div>
              <Label htmlFor="otroTipoCarga" className="text-sm font-medium text-gray-700 mb-1 block">
                Especifique el tipo de carga
              </Label>
              <Input
                id="otroTipoCarga"
                value={otroTipoCarga}
                onChange={(e) => setOtroTipoCarga(e.target.value)}
                placeholder="Describa el tipo de carga"
                className={`w-full ${submitted && errors.otroTipoCarga ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {submitted && errors.otroTipoCarga && <p className="text-red-500 text-xs mt-1">{errors.otroTipoCarga}</p>}
            </div>
          )}

          {/* Destino */}
          <div>
            <Label htmlFor="destino" className="text-sm font-medium text-gray-700 mb-1 block">
              Destino
            </Label>
            <Select value={destino} onValueChange={setDestino}>
              <SelectTrigger
                id="destino"
                className={`w-full ${submitted && errors.destino ? "border-red-500 focus:ring-red-500" : ""}`}
              >
                <SelectValue placeholder="Seleccionar destino" />
              </SelectTrigger>
              <SelectContent>
                {opcionesDestino.map((opcion) => (
                  <SelectItem key={opcion} value={opcion}>
                    {opcion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {submitted && errors.destino && <p className="text-red-500 text-xs mt-1">{errors.destino}</p>}
          </div>

          {/* Persona Responsable del Puerto (para destinos específicos) */}
          {(destino === "PLP - Oficinas Administrativas" ||
            destino === "PLP - Pañol/Deposito" ||
            destino === "PLP - Obras e Ingenieria" ||
            destino === "PLP - Taller de herreria" ||
            destino === "PLP - Taller de Locomotoras") && (
            <div>
              <Label htmlFor="personaResponsable" className="text-sm font-medium text-gray-700 mb-1 block">
                Persona Responsable del Puerto
              </Label>
              <Select value={personaResponsable} onValueChange={setPersonaResponsable}>
                <SelectTrigger
                  id="personaResponsable"
                  className={`w-full ${submitted && errors.personaResponsable ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Seleccionar persona responsable" />
                </SelectTrigger>
                <SelectContent>
                  {personasResponsables.map((persona) => (
                    <SelectItem key={persona} value={persona}>
                      {persona}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.personaResponsable && (
                <p className="text-red-500 text-xs mt-1">{errors.personaResponsable}</p>
              )}
            </div>
          )}

          {/* Checkbox para transporte terciarizado (solo para Transporte Cargas) */}
          {isTransporteCarga && (
            <div className="col-span-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="transporteTerciarizado"
                  checked={transporteTerciarizado}
                  onCheckedChange={(checked) => setTransporteTerciarizado(checked as boolean)}
                />
                <Label htmlFor="transporteTerciarizado" className="font-medium text-gray-700">
                  Transporte terciarizado
                </Label>
              </div>
            </div>
          )}

          {/* Empresa de transporte (solo para Transporte Cargas terciarizado) */}
          {isTransporteCarga && transporteTerciarizado && (
            <div>
              <Label htmlFor="empresaTransporte" className="text-sm font-medium text-gray-700 mb-1 block">
                Empresa de Transporte
              </Label>
              <Input
                id="empresaTransporte"
                value={empresaTransporte}
                onChange={(e) => setEmpresaTransporte(e.target.value)}
                placeholder="Nombre de la empresa"
                className={`w-full ${submitted && errors.empresaTransporte ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {submitted && errors.empresaTransporte && (
                <p className="text-red-500 text-xs mt-1">{errors.empresaTransporte}</p>
              )}
            </div>
          )}

          {/* Checkbox para visita recurrente (solo para tipos específicos) */}
          {(tipoVisita === "Transporte Cargas" ||
            tipoVisita === "Acceso a Obra" ||
            tipoVisita === "Acceso a Muelle") && (
            <div className="col-span-3">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="visitaRecurrente"
                  checked={visitaRecurrente}
                  onCheckedChange={(checked) => setVisitaRecurrente(checked as boolean)}
                />
                <Label htmlFor="visitaRecurrente" className="font-medium text-gray-700">
                  Visita Recurrente
                </Label>
              </div>
            </div>
          )}

          {!visitaRecurrente ? (
            <>
              {/* Fecha y hora desde (para visitas no recurrentes) */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Desde</Label>
                <div className="grid grid-cols-2 gap-2">
                  {/* Selector de fecha desde */}
                  <div className="relative" ref={calendarDesdeRef}>
                    <div
                      className={`flex items-center border ${
                        submitted && errors.fechaDesde ? "border-red-500" : "border-gray-300"
                      } rounded-md px-3 py-2 h-10 cursor-pointer`}
                      onClick={() => {
                        setShowCalendarDesde(!showCalendarDesde)
                        setShowCalendarHasta(false)
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {fechaDesde ? format(fechaDesde, "dd/MM/yyyy") : "dd/mm/aaaa"}
                      </span>
                    </div>
                    {showCalendarDesde && (
                      <div className="absolute z-10 top-full mt-1">
                        <CustomCalendar
                          selectedDate={fechaDesde}
                          onSelectDate={(date) => {
                            setFechaDesde(date)
                            setShowCalendarDesde(false)
                          }}
                        />
                      </div>
                    )}
                    {submitted && errors.fechaDesde && <p className="text-red-500 text-xs mt-1">{errors.fechaDesde}</p>}
                  </div>

                  {/* Selector de hora desde */}
                  <Input
                    id="horaDesde"
                    type="time"
                    value={horaDesde}
                    onChange={(e) => setHoraDesde(e.target.value)}
                    className={`w-full ${submitted && errors.horaDesde ? "border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {submitted && errors.horaDesde && <p className="text-red-500 text-xs mt-1">{errors.horaDesde}</p>}
                </div>
              </div>

              {/* Fecha y hora hasta (para visitas no recurrentes) */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Hasta</Label>
                <div className="grid grid-cols-2 gap-2">
                  {/* Selector de fecha hasta */}
                  <div className="relative" ref={calendarHastaRef}>
                    <div
                      className={`flex items-center border ${
                        submitted && errors.fechaHasta ? "border-red-500" : "border-gray-300"
                      } rounded-md px-3 py-2 h-10 cursor-pointer`}
                      onClick={() => {
                        setShowCalendarHasta(!showCalendarHasta)
                        setShowCalendarDesde(false)
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {fechaHasta ? format(fechaHasta, "dd/MM/yyyy") : "dd/mm/aaaa"}
                      </span>
                    </div>
                    {showCalendarHasta && (
                      <div className="absolute z-10 top-full mt-1">
                        <CustomCalendar
                          selectedDate={fechaHasta}
                          onSelectDate={(date) => {
                            setFechaHasta(date)
                            setShowCalendarHasta(false)
                          }}
                        />
                      </div>
                    )}
                    {submitted && errors.fechaHasta && <p className="text-red-500 text-xs mt-1">{errors.fechaHasta}</p>}
                  </div>

                  {/* Selector de hora hasta */}
                  <Input
                    id="horaHasta"
                    type="time"
                    value={horaHasta}
                    onChange={(e) => setHoraHasta(e.target.value)}
                    className={`w-full ${submitted && errors.horaHasta ? "border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {submitted && errors.horaHasta && <p className="text-red-500 text-xs mt-1">{errors.horaHasta}</p>}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Campos para visita recurrente */}
              <div className="col-span-3">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Días de la semana</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {diasDeLaSemana.map((dia) => (
                      <div key={dia} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dia-${dia}`}
                          checked={diasSemana.includes(dia)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setDiasSemana([...diasSemana, dia])
                            } else {
                              setDiasSemana(diasSemana.filter((d) => d !== dia))
                            }
                          }}
                        />
                        <Label htmlFor={`dia-${dia}`} className="text-sm font-normal">
                          {dia}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {submitted && diasSemana.length === 0 && (
                    <p className="text-red-500 text-xs mt-2">Debe seleccionar al menos un día de la semana</p>
                  )}
                </div>
              </div>

              {/* Fechas y horarios para visitas recurrentes - todo en una fila */}
              <div className="col-span-3">
                <div className="grid grid-cols-4 gap-4">
                  {/* Fecha de inicio */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">Fecha de inicio</Label>
                    <div className="relative" ref={calendarDesdeRef}>
                      <div
                        className={`flex items-center border ${
                          submitted && errors.fechaDesde ? "border-red-500" : "border-gray-300"
                        } rounded-md px-3 py-2 h-10 cursor-pointer`}
                        onClick={() => {
                          setShowCalendarDesde(!showCalendarDesde)
                          setShowCalendarHasta(false)
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {fechaDesde ? format(fechaDesde, "dd/MM/yyyy") : "dd/mm/aaaa"}
                        </span>
                      </div>
                      {showCalendarDesde && (
                        <div className="absolute z-10 top-full mt-1">
                          <CustomCalendar
                            selectedDate={fechaDesde}
                            onSelectDate={(date) => {
                              setFechaDesde(date)
                              setShowCalendarDesde(false)
                            }}
                          />
                        </div>
                      )}
                      {submitted && errors.fechaDesde && (
                        <p className="text-red-500 text-xs mt-1">{errors.fechaDesde}</p>
                      )}
                    </div>
                  </div>

                  {/* Hora de ingreso */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">Hora de ingreso</Label>
                    <Input
                      id="horaDesde"
                      type="time"
                      value={horaDesde}
                      onChange={(e) => setHoraDesde(e.target.value)}
                      className={`w-full ${submitted && errors.horaDesde ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                    {submitted && errors.horaDesde && <p className="text-red-500 text-xs mt-1">{errors.horaDesde}</p>}
                  </div>

                  {/* Fecha de fin */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">Fecha de fin</Label>
                    <div className="relative" ref={calendarHastaRef}>
                      <div
                        className={`flex items-center border ${
                          submitted && errors.fechaHasta ? "border-red-500" : "border-gray-300"
                        } rounded-md px-3 py-2 h-10 cursor-pointer`}
                        onClick={() => {
                          setShowCalendarHasta(!showCalendarHasta)
                          setShowCalendarDesde(false)
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {fechaHasta ? format(fechaHasta, "dd/MM/yyyy") : "dd/mm/aaaa"}
                        </span>
                      </div>
                      {showCalendarHasta && (
                        <div className="absolute z-10 top-full mt-1">
                          <CustomCalendar
                            selectedDate={fechaHasta}
                            onSelectDate={(date) => {
                              setFechaHasta(date)
                              setShowCalendarHasta(false)
                            }}
                          />
                        </div>
                      )}
                      {submitted && errors.fechaHasta && (
                        <p className="text-red-500 text-xs mt-1">{errors.fechaHasta}</p>
                      )}
                    </div>
                  </div>

                  {/* Hora de egreso */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">Hora de egreso</Label>
                    <Input
                      id="horaHasta"
                      type="time"
                      value={horaHasta}
                      onChange={(e) => setHoraHasta(e.target.value)}
                      className={`w-full ${submitted && errors.horaHasta ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                    {submitted && errors.horaHasta && <p className="text-red-500 text-xs mt-1">{errors.horaHasta}</p>}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sección de proveedor (solo para Transporte Cargas) */}
        {isTransporteCarga && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Proveedor</h2>

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="proveedorNoInscripto"
                checked={proveedorNoInscripto}
                onCheckedChange={handleProveedorNoInscriptoChange}
              />
              <Label htmlFor="proveedorNoInscripto" className="font-medium text-gray-700">
                Proveedor no inscripto
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Label htmlFor="razonSocial" className="text-sm font-medium text-gray-700 mb-1 block">
                  Razón Social
                </Label>
                <Input
                  id="razonSocial"
                  value={razonSocial}
                  onChange={(e) => {
                    setRazonSocial(e.target.value)
                    if (!proveedorNoInscripto && !camposDeshabilitados) {
                      buscarProveedorPorRazonSocial(e.target.value)
                    }
                  }}
                  placeholder="Nombre de la empresa"
                  disabled={camposDeshabilitados && !proveedorNoInscripto}
                  className={`w-full ${submitted && errors.razonSocial ? "border-red-500 focus:ring-red-500" : ""} ${
                    camposDeshabilitados && !proveedorNoInscripto ? "bg-gray-100 text-gray-500" : ""
                  }`}
                />

                {/* Sugerencias de proveedores */}
                {showProveedorSuggestions && !camposDeshabilitados && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {proveedoresSugeridos.map((prov) => (
                      <div
                        key={prov.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => autocompletarProveedor(prov)}
                      >
                        <div className="font-medium">{prov.razonSocial}</div>
                        <div className="text-sm text-gray-600">CUIT: {prov.cuit}</div>
                      </div>
                    ))}
                  </div>
                )}

                {submitted && errors.razonSocial && <p className="text-red-500 text-xs mt-1">{errors.razonSocial}</p>}
              </div>

              <div>
                <Label htmlFor="cuitProveedor" className="text-sm font-medium text-gray-700 mb-1 block">
                  CUIT
                </Label>
                <Input
                  id="cuitProveedor"
                  value={cuitProveedor}
                  onChange={(e) => {
                    setCuitProveedor(e.target.value)
                    if (!camposDeshabilitados && !proveedorNoInscripto) {
                      buscarProveedorPorCuit(e.target.value)
                    }
                  }}
                  placeholder="XX-XXXXXXXX-X"
                  disabled={camposDeshabilitados && !proveedorNoInscripto}
                  className={`w-full ${submitted && errors.cuitProveedor ? "border-red-500 focus:ring-red-500" : ""} ${
                    camposDeshabilitados && !proveedorNoInscripto ? "bg-gray-100 text-gray-500" : ""
                  }`}
                />
                {submitted && errors.cuitProveedor && (
                  <p className="text-red-500 text-xs mt-1">{errors.cuitProveedor}</p>
                )}
              </div>

              <div>
                <Label htmlFor="emailProveedor" className="text-sm font-medium text-gray-700 mb-1 block">
                  Email
                </Label>
                <Input
                  id="emailProveedor"
                  type="email"
                  value={emailProveedor}
                  onChange={(e) => setEmailProveedor(e.target.value)}
                  placeholder="contacto@empresa.com"
                  disabled={camposDeshabilitados && !proveedorNoInscripto}
                  className={`w-full ${submitted && errors.emailProveedor ? "border-red-500 focus:ring-red-500" : ""} ${
                    camposDeshabilitados && !proveedorNoInscripto ? "bg-gray-100 text-gray-500" : ""
                  }`}
                />
                {submitted && errors.emailProveedor && (
                  <p className="text-red-500 text-xs mt-1">{errors.emailProveedor}</p>
                )}
              </div>

              <div>
                <Label htmlFor="telefonoProveedor" className="text-sm font-medium text-gray-700 mb-1 block">
                  Teléfono
                </Label>
                <Input
                  id="telefonoProveedor"
                  value={telefonoProveedor}
                  onChange={(e) => setTelefonoProveedor(e.target.value)}
                  placeholder="11-XXXX-XXXX"
                  disabled={camposDeshabilitados && !proveedorNoInscripto}
                  className={`w-full ${submitted && errors.telefonoProveedor ? "border-red-500 focus:ring-red-500" : ""} ${
                    camposDeshabilitados && !proveedorNoInscripto ? "bg-gray-100 text-gray-500" : ""
                  }`}
                />
                {submitted && errors.telefonoProveedor && (
                  <p className="text-red-500 text-xs mt-1">{errors.telefonoProveedor}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              {camposDeshabilitados && (
                <Button type="button" variant="outline" onClick={limpiarDatosProveedor} className="text-sm">
                  Limpiar datos
                </Button>
              )}
            </div>

            {proveedorEncontrado && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  ✓ Proveedor encontrado: <strong>{proveedorEncontrado.razonSocial}</strong>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Campo de personal a visitar (solo para visitas laborales) */}
        {tipoVisita === "Laboral" && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <Label htmlFor="personalVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Personal a visitar
            </Label>
            <Input
              id="personalVisita"
              value={personalVisita}
              onChange={(e) => setPersonalVisita(e.target.value)}
              placeholder="Nombre y apellido de la persona a visitar"
              className={`w-full ${submitted && errors.personalVisita ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.personalVisita && <p className="text-red-500 text-xs mt-1">{errors.personalVisita}</p>}
          </div>
        )}

        {/* Sección de conductor (solo para Transporte Cargas NO terciarizado) */}
        {!isTransporteCarga && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Conductor</h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewConductorModalOpen(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Conductor
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <Label htmlFor="conductorSeleccionado" className="text-sm font-medium text-gray-700 mb-1 block">
                  Seleccionar Conductor
                </Label>
                <Select value={conductorSeleccionado} onValueChange={setConductorSeleccionado}>
                  <SelectTrigger id="conductorSeleccionado">
                    <SelectValue placeholder="Seleccionar conductor" />
                  </SelectTrigger>
                  <SelectContent>
                    {conductoresCargados.map((conductor) => (
                      <SelectItem key={conductor.id} value={conductor.id.toString()}>
                        {conductor.nombre} - DNI: {conductor.dni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="agregarConductor" className="text-sm font-medium text-gray-700 mb-1 block">
                  Agregar al listado
                </Label>
                <Button
                  type="button"
                  onClick={() => {
                    if (conductorSeleccionado) {
                      const conductor = conductoresCargados.find((c) => c.id.toString() === conductorSeleccionado)
                      if (conductor) {
                        const nuevaPersona: Persona = {
                          id: Date.now().toString(),
                          nombre: conductor.nombre,
                          documento: conductor.dni,
                          empresa: empresaTransporte,
                          telefono: conductor.telefono,
                          numeroLicencia: conductor.numeroLicencia,
                          categorias: conductor.categorias,
                          fechaVencimientoLicencia: conductor.fechaVencimientoLicencia
                            ? new Date(conductor.fechaVencimientoLicencia)
                            : undefined,
                        }
                        setPersonas([...personas, nuevaPersona])
                        setConductorSeleccionado("")
                      }
                    }
                  }}
                  disabled={!conductorSeleccionado}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                >
                  Agregar Conductor
                </Button>
              </div>
            </div>

            {personas.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Documento</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">N° de Licencia</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((persona) => (
                      <tr key={persona.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{persona.nombre}</td>
                        <td className="py-3 px-4">{persona.documento}</td>
                        <td className="py-3 px-4">{persona.numeroLicencia || "-"}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarPersona(persona.id)}
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
            {submitted && errors.conductor && <p className="text-red-500 text-sm mt-2">{errors.conductor}</p>}
          </div>
        )}

        {/* Sección de personas (solo para visitas que no son Transporte Cargas O para Transporte Cargas NO terciarizado) */}
        {!isTransporteCarga && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Personas que asistirán</h2>
              <Button
                type="button"
                variant="outline"
                onClick={agregarPersona}
                className="flex items-center"
                disabled={!nombrePersona || !documentoPersona}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Persona
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="nombrePersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Nombre Completo
                </Label>
                <Input
                  id="nombrePersona"
                  value={nombrePersona}
                  onChange={(e) => setNombrePersona(e.target.value)}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <Label htmlFor="documentoPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  DNI
                </Label>
                <Input
                  id="documentoPersona"
                  value={documentoPersona}
                  onChange={(e) => setDocumentoPersona(e.target.value)}
                  placeholder="Número de documento"
                />
              </div>
              <div>
                <Label htmlFor="emailPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Email
                </Label>
                <Input
                  id="emailPersona"
                  type="email"
                  value={emailPersona}
                  onChange={(e) => setEmailPersona(e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="telefonoPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Teléfono
                </Label>
                <Input
                  id="telefonoPersona"
                  value={telefonoPersona}
                  onChange={(e) => setTelefonoPersona(e.target.value)}
                  placeholder="11-XXXX-XXXX"
                />
              </div>
            </div>

            {personas.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">DNI</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Teléfono</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((persona) => (
                      <tr key={persona.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{persona.nombre}</td>
                        <td className="py-3 px-4">{persona.documento}</td>
                        <td className="py-3 px-4">{persona.email || "-"}</td>
                        <td className="py-3 px-4">{persona.telefono || "-"}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarPersona(persona.id)}
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
            ) : (
              submitted && errors.personas && <p className="text-red-500 text-sm mt-2">{errors.personas}</p>
            )}
          </div>
        )}

        {/* Sección de vehículos (solo cuando NO es transporte terciarizado) */}
        {!isTransporteCarga && !transporteTerciarizado && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Vehículos</h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewVehiculoModalOpen(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Vehículo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <Label htmlFor="vehiculoSeleccionado" className="text-sm font-medium text-gray-700 mb-1 block">
                  Seleccionar Vehículo
                </Label>
                <Select value={vehiculoSeleccionado} onValueChange={setVehiculoSeleccionado}>
                  <SelectTrigger id="vehiculoSeleccionado">
                    <SelectValue placeholder="Seleccionar vehículo" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehiculosCargados.map((vehiculo) => (
                      <SelectItem key={vehiculo.id} value={vehiculo.id.toString()}>
                        {vehiculo.tipo} - {vehiculo.marca} {vehiculo.modelo} - {vehiculo.patente}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="agregarVehiculo" className="text-sm font-medium text-gray-700 mb-1 block">
                  Agregar al listado
                </Label>
                <Button
                  type="button"
                  onClick={() => {
                    if (vehiculoSeleccionado) {
                      const vehiculo = vehiculosCargados.find((v) => v.id.toString() === vehiculoSeleccionado)
                      if (vehiculo) {
                        const nuevoVehiculo: Vehiculo = {
                          id: Date.now().toString(),
                          tipo: vehiculo.tipo,
                          patente: vehiculo.patente,
                          marca: vehiculo.marca,
                          modelo: vehiculo.modelo,
                          fechaVencimientoSeguro: vehiculo.fechaVencimientoSeguro
                            ? new Date(vehiculo.fechaVencimientoSeguro)
                            : undefined,
                        }
                        setVehiculos([...vehiculos, nuevoVehiculo])
                        setVehiculoSeleccionado("")
                      }
                    }
                  }}
                  disabled={!vehiculoSeleccionado}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                >
                  Agregar Vehículo
                </Button>
              </div>
            </div>

            {vehiculos.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tipo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Patente</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Marca</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Modelo</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehiculos.map((vehiculo) => (
                      <tr key={vehiculo.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{vehiculo.tipo}</td>
                        <td className="py-3 px-4">{vehiculo.patente}</td>
                        <td className="py-3 px-4">{vehiculo.marca || "-"}</td>
                        <td className="py-3 px-4">{vehiculo.modelo || "-"}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarVehiculo(vehiculo.id)}
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
            ) : (
              isTransporteCarga &&
              submitted &&
              errors.vehiculos && <p className="text-red-500 text-sm mt-2">{errors.vehiculos}</p>
            )}
          </div>
        )}

        {/* Sección de observaciones */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <Label htmlFor="observaciones" className="text-sm font-medium text-gray-700 mb-1 block">
            Observaciones
          </Label>
          <Textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ingrese cualquier información adicional relevante para la visita..."
            rows={4}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/empleado-compras/visitas/mis-visitas">Cancelar</Link>
          </Button>
          <Button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white">
            Enviar Solicitud
          </Button>
        </div>
      </form>

      {/* Modal para agregar nuevo conductor */}
      <Dialog open={isNewConductorModalOpen} onOpenChange={setIsNewConductorModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Conductor</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              // Validar que al menos una categoría esté seleccionada
              if (categoriasSeleccionadas.length === 0) {
                setErrorCategorias("Seleccione al menos una categoría")
                return
              }

              const nuevoConductor = {
                id: conductoresCargados.length + 1,
                nombre: nombreConductor,
                dni: dniConductor,
                telefono: telefonoConductor,
                numeroLicencia: numeroLicencia,
                categorias: categoriasSeleccionadas,
                licencia: licenciaConducir ? licenciaConducir.name : "sin_licencia.pdf",
                fechaVencimientoLicencia: fechaVencimientoLicencia
                  ? fechaVencimientoLicencia.toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0],
              }

              setConductoresCargados([...conductoresCargados, nuevoConductor])

              // Limpiar campos
              setNombreConductor("")
              setDniConductor("")
              setTelefonoConductor("")
              setEmailConductor("")
              setNumeroLicencia("")
              setCategoriasSeleccionadas([])
              setLicenciaConducir(null)
              setFechaVencimientoLicencia(undefined)
              setErrorCategorias("")

              setIsNewConductorModalOpen(false)
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="nombreConductor">Nombre Completo</Label>
                <Input
                  id="nombreConductor"
                  name="nombreConductor"
                  value={nombreConductor}
                  onChange={(e) => setNombreConductor(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dniConductor">DNI</Label>
                <Input
                  id="dniConductor"
                  name="dniConductor"
                  value={dniConductor}
                  onChange={(e) => setDniConductor(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefonoConductor">Teléfono</Label>
                <Input
                  id="telefonoConductor"
                  name="telefonoConductor"
                  value={telefonoConductor}
                  onChange={(e) => setTelefonoConductor(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emailConductor">Email (Opcional)</Label>
                <Input
                  id="emailConductor"
                  name="emailConductor"
                  type="email"
                  value={emailConductor}
                  onChange={(e) => setEmailConductor(e.target.value)}
                  placeholder="ejemplo@email.com"
                />
              </div>
              <div>
                <Label htmlFor="numeroLicencia">N° de Licencia</Label>
                <Input
                  id="numeroLicencia"
                  name="numeroLicencia"
                  value={numeroLicencia}
                  onChange={(e) => setNumeroLicencia(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fechaVencimientoLicencia">Fecha Vencimiento Licencia</Label>
                <div className="relative" ref={licenciaCalendarRef}>
                  <div
                    className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
                    onClick={() => setShowLicenciaCalendar(!showLicenciaCalendar)}
                  >
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {fechaVencimientoLicencia
                        ? format(fechaVencimientoLicencia, "dd/MM/yyyy", { locale: es })
                        : "dd/mm/aaaa"}
                    </span>
                  </div>
                  {showLicenciaCalendar && (
                    <div className="absolute z-10 top-full mt-1">
                      <CustomCalendar
                        selectedDate={fechaVencimientoLicencia}
                        onSelectDate={(date) => {
                          setFechaVencimientoLicencia(date)
                          setShowLicenciaCalendar(false)
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Categorías de Licencia</Label>
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-600 mb-2">Seleccione todas las categorías que apliquen:</p>
                <div className="grid grid-cols-9 gap-2">
                  {categoriasLicencia.map((categoria) => (
                    <div key={categoria} className="flex items-center space-x-2">
                      <Checkbox
                        id={`categoria-${categoria}`}
                        checked={categoriasSeleccionadas.includes(categoria)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria])
                            setErrorCategorias("")
                          } else {
                            setCategoriasSeleccionadas(categoriasSeleccionadas.filter((cat) => cat !== categoria))
                          }
                        }}
                      />
                      <Label htmlFor={`categoria-${categoria}`} className="text-sm font-normal">
                        {categoria}
                      </Label>
                    </div>
                  ))}
                </div>
                {errorCategorias && <p className="text-red-500 text-xs mt-2">{errorCategorias}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licenciaConducir">Licencia de Conducir</Label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                  <label htmlFor="licenciaConducirInput" className="flex items-center cursor-pointer w-full">
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">
                      {licenciaConducir ? licenciaConducir.name : "Seleccionar archivo"}
                    </span>
                  </label>
                  <input
                    id="licenciaConducirInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setLicenciaConducir)}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{licenciaConducir ? "Ningún archivo seleccionado" : ""}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNombreConductor("")
                  setDniConductor("")
                  setTelefonoConductor("")
                  setEmailConductor("")
                  setNumeroLicencia("")
                  setCategoriasSeleccionadas([])
                  setLicenciaConducir(null)
                  setFechaVencimientoLicencia(undefined)
                  setErrorCategorias("")
                  setIsNewConductorModalOpen(false)
                }}
                className="border border-gray-300 bg-white text-black hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white">
                Guardar Conductor
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isNewVehiculoModalOpen} onOpenChange={setIsNewVehiculoModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Vehículo</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              const nuevoVehiculo = {
                id: vehiculosCargados.length + 1,
                tipo: tipoVehiculo,
                patente: patenteVehiculo,
                marca: marcaVehiculo,
                modelo: modeloVehiculo,
                titular: titularVehiculo,
                conductorNoTitular: tipoVehiculo !== "Acoplado" && conductorNoTitular,
                seguro: seguroVehiculo ? seguroVehiculo.name : "sin_seguro.pdf",
                cedulaVerde: cedulaVerde ? cedulaVerde.name : "sin_cedula_verde.pdf",
                certificadoSeguridadVehicular: certificadoSeguridadVehicular
                  ? certificadoSeguridadVehicular.name
                  : null,
                cedulaAzul: conductorNoTitular && cedulaAzul ? cedulaAzul.name : null,
                fechaVencimientoSeguro: fechaVencimientoSeguro
                  ? fechaVencimientoSeguro.toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0],
              }

              setVehiculosCargados([...vehiculosCargados, nuevoVehiculo])

              // Limpiar campos
              setTipoVehiculo("")
              setPatenteVehiculo("")
              setMarcaVehiculo("")
              setModeloVehiculo("")
              setTitularVehiculo("")
              setConductorNoTitular(false)
              setSeguroVehiculo(null)
              setCedulaVerde(null)
              setCertificadoSeguridadVehicular(null)
              setCedulaAzul(null)
              setFechaVencimientoSeguro(undefined)
              setIsNewVehiculoModalOpen(false)
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipoVehiculo">Tipo</Label>
                <Select value={tipoVehiculo} onValueChange={setTipoVehiculo} required>
                  <SelectTrigger id="tipoVehiculo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposVehiculo.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="patenteVehiculo">Patente</Label>
                <Input
                  id="patenteVehiculo"
                  value={patenteVehiculo}
                  onChange={(e) => setPatenteVehiculo(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="marcaVehiculo">Marca</Label>
                <Input id="marcaVehiculo" value={marcaVehiculo} onChange={(e) => setMarcaVehiculo(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="modeloVehiculo">Modelo</Label>
                <Input id="modeloVehiculo" value={modeloVehiculo} onChange={(e) => setModeloVehiculo(e.target.value)} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="titularVehiculo">Nombre completo del titular</Label>
                <Input
                  id="titularVehiculo"
                  value={titularVehiculo}
                  onChange={(e) => setTitularVehiculo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cedulaVerde">Cédula Verde</Label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                <label htmlFor="cedulaVerdeInput" className="flex items-center cursor-pointer w-full">
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600 truncate">
                    {cedulaVerde ? cedulaVerde.name : "Seleccionar archivo"}
                  </span>
                </label>
                <input
                  id="cedulaVerdeInput"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setCedulaVerde)}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
            </div>

            <div>
              <Label htmlFor="seguroVehiculo">Seguro</Label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                <label htmlFor="seguroVehiculoInput" className="flex items-center cursor-pointer w-full">
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600 truncate">
                    {seguroVehiculo ? seguroVehiculo.name : "Seleccionar archivo"}
                  </span>
                </label>
                <input
                  id="seguroVehiculoInput"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setSeguroVehiculo)}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
            </div>

            {tipoVehiculo === "Acoplado" && (
              <div>
                <Label htmlFor="certificadoSeguridadVehicular">Certificado de Seguridad Vehicular</Label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                  <label
                    htmlFor="certificadoSeguridadVehicularInput"
                    className="flex items-center cursor-pointer w-full"
                  >
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">
                      {certificadoSeguridadVehicular ? certificadoSeguridadVehicular.name : "Seleccionar archivo"}
                    </span>
                  </label>
                  <input
                    id="certificadoSeguridadVehicularInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setCertificadoSeguridadVehicular)}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
              </div>
            )}

            {tipoVehiculo !== "Acoplado" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="conductorNoTitular"
                  checked={conductorNoTitular}
                  onCheckedChange={(checked) => setConductorNoTitular(checked as boolean)}
                />
                <Label htmlFor="conductorNoTitular" className="text-sm font-normal">
                  El vehículo lo conduce alguien que no es el titular
                </Label>
              </div>
            )}

            {tipoVehiculo !== "Acoplado" && conductorNoTitular && (
              <div>
                <Label htmlFor="cedulaAzul">Cédula Azul</Label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                  <label htmlFor="cedulaAzulInput" className="flex items-center cursor-pointer w-full">
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">
                      {cedulaAzul ? cedulaAzul.name : "Seleccionar archivo"}
                    </span>
                  </label>
                  <input
                    id="cedulaAzulInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setCedulaAzul)}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
              </div>
            )}

            <div>
              <Label htmlFor="fechaVencimientoSeguro">Fecha Vencimiento Seguro</Label>
              <div className="relative" ref={seguroCalendarRef}>
                <div
                  className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
                  onClick={() => setShowSeguroCalendar(!showSeguroCalendar)}
                >
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {fechaVencimientoSeguro
                      ? format(fechaVencimientoSeguro, "dd/MM/yyyy", { locale: es })
                      : "dd/mm/aaaa"}
                  </span>
                </div>
                {showSeguroCalendar && (
                  <div className="absolute z-10 top-full mt-1">
                    <CustomCalendar
                      selectedDate={fechaVencimientoSeguro}
                      onSelectDate={(date) => {
                        setFechaVencimientoSeguro(date)
                        setShowSeguroCalendar(false)
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTipoVehiculo("")
                  setPatenteVehiculo("")
                  setMarcaVehiculo("")
                  setModeloVehiculo("")
                  setTitularVehiculo("")
                  setConductorNoTitular(false)
                  setSeguroVehiculo(null)
                  setCedulaVerde(null)
                  setCertificadoSeguridadVehicular(null)
                  setCedulaAzul(null)
                  setFechaVencimientoSeguro(undefined)
                  setIsNewVehiculoModalOpen(false)
                }}
                className="border border-gray-300 bg-white text-black hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white">
                Guardar Vehículo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Modal de invitación */}
      {modalAbierto && datosVisitaActual && (
        <ModalInvitacionVisita isOpen={modalAbierto} onClose={cerrarModalYRedirigir} datosVisita={datosVisitaActual} />
      )}
    </div>
  )
}
