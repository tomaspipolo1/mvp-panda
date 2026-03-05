"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Plus, Trash2, Camera, X, Upload, Eye, FileImage } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Interfaces
interface Persona {
  id: string
  nombre: string
  documento: string
  empresa: string
  telefono?: string
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

export default function NuevaVisitaPage() {
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

  // Estados para fecha y hora desde
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [horaDesde, setHoraDesde] = useState<string>("")

  // Estados para fecha y hora hasta
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [horaHasta, setHoraHasta] = useState<string>("")

  // Estado para el personal a visitar (solo para visitas laborales)
  const [personalVisita, setPersonalVisita] = useState<string>("")

  // Estados para personas
  const [personas, setPersonas] = useState<Persona[]>([])
  const [nombrePersona, setNombrePersona] = useState<string>("")
  const [documentoPersona, setDocumentoPersona] = useState<string>("")
  const [empresaPersona, setEmpresaPersona] = useState<string>("")

  // Estados para vehículos
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])

  // Estados para vehículos y conductores cargados
  const [vehiculosCargados, setVehiculosCargados] = useState(vehiculosCargadosData)
  const [conductoresCargados, setConductoresCargados] = useState(conductoresCargadosData)
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<string>("")
  const [conductorSeleccionado, setConductorSeleccionado] = useState<string>("")
  const [isNewVehiculoModalOpen, setIsNewVehiculoModalOpen] = useState(false)
  const [isNewConductorModalOpen, setIsNewConductorModalOpen] = useState(false)
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [previewTitle, setPreviewTitle] = useState<string>("")

  // Estados para fechas de vencimiento
  const [fechaVencimientoLicencia, setFechaVencimientoLicencia] = useState<Date | undefined>(undefined)
  const [fechaVencimientoSeguro, setFechaVencimientoSeguro] = useState<Date | undefined>(undefined)


  // Categorías de licencia disponibles
  const categoriasLicencia = ["A", "B", "C", "D", "E", "F", "G"]

  // Estados para conductor
  const [nombreConductor, setNombreConductor] = useState<string>("")
  const [dniConductor, setDniConductor] = useState<string>("")
  const [telefonoConductor, setTelefonoConductor] = useState<string>("")
  const [numeroLicencia, setNumeroLicencia] = useState<string>("")
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([])
  const [licenciaConducir, setLicenciaConducir] = useState<File | null>(null)
  const [errorCategorias, setErrorCategorias] = useState<string>("")

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

  // Estado para eventos
  const [evento, setEvento] = useState<string>("")

  // Estados para proveedor (solo para Transporte Cargas)
  const [razonSocial, setRazonSocial] = useState<string>("")
  const [cuitProveedor, setCuitProveedor] = useState<string>("")
  const [emailProveedor, setEmailProveedor] = useState<string>("")
  const [telefonoProveedor, setTelefonoProveedor] = useState<string>("")
  const [proveedorNoInscripto, setProveedorNoInscripto] = useState<boolean>(false)

  const tiposVisita = ["Laboral", "Transporte Cargas", "Acceso a Obra", "Acceso a Muelle", "Evento"]

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

  const diasDeLaSemana = [
    { corto: "Lun", largo: "Lunes" },
    { corto: "Mar", largo: "Martes" }, 
    { corto: "Mie", largo: "Miércoles" },
    { corto: "Jue", largo: "Jueves" },
    { corto: "Vie", largo: "Viernes" },
    { corto: "Sab", largo: "Sábado" },
    { corto: "Dom", largo: "Domingo" }
  ]

  // Opciones de eventos
  const opcionesEventos = [
    "Conferencia de Prensa",
    "Evento Corporativo", 
    "Inauguración",
    "Visita Protocolar",
    "Reunión Ejecutiva",
    "Capacitación",
    "Evento Social",
    "Otro"
  ]

  // Estado para observaciones
  const [observaciones, setObservaciones] = useState<string>("")

  // Estado para validación del formulario
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // Referencias para cerrar los calendarios al hacer clic fuera


  // Función para agregar persona
  const agregarPersona = () => {
    if (nombrePersona && documentoPersona) {
      const nuevaPersona: Persona = {
        id: Date.now().toString(),
        nombre: nombrePersona,
        documento: documentoPersona,
        empresa: empresaPersona,
      }
      setPersonas([...personas, nuevaPersona])

      // Limpiar campos
      setNombrePersona("")
      setDocumentoPersona("")
      setEmpresaPersona("")
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

  // Validar el formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar tipo de visita
    if (!tipoVisita) {
      newErrors.tipoVisita = "El tipo de visita es obligatorio"
    }

    // Validaciones específicas según tipo de visita
    if (tipoVisita === "Laboral") {
      if (!destino) newErrors.destino = "El destino es obligatorio"
      if (!personalVisita) newErrors.personalVisita = "El personal a visitar es obligatorio"
    }

    if (tipoVisita === "Transporte Cargas") {
      if (!destino) newErrors.destino = "El destino es obligatorio"
      if (!operacion) newErrors.operacion = "La operación es obligatoria"
      if (!tipoCarga) newErrors.tipoCarga = "El tipo de carga es obligatorio"
      if (tipoCarga === "Otro" && !otroTipoCarga) newErrors.otroTipoCarga = "Debe especificar el tipo de carga"
      if (transporteTerciarizado && !empresaTransporte) newErrors.empresaTransporte = "La empresa de transporte es obligatoria"
    }

    if (tipoVisita === "Acceso a Obra" || tipoVisita === "Acceso a Muelle") {
      if (!destino) newErrors.destino = "El destino es obligatorio"
    }

    if (tipoVisita === "Evento") {
      if (!evento) newErrors.evento = "El evento es obligatorio"
    }

    // Validar fechas y horarios
    if (!fechaDesde) newErrors.fechaDesde = "La fecha desde es obligatoria"
    if (!horaDesde) newErrors.horaDesde = "La hora desde es obligatoria"
    if (!fechaHasta) newErrors.fechaHasta = "La fecha hasta es obligatoria"
    if (!horaHasta) newErrors.horaHasta = "La hora hasta es obligatoria"

    if (visitaRecurrente && diasSemana.length === 0) {
      newErrors.diasSemana = "Debe seleccionar al menos un día de la semana"
    }

    // Validar personas (excepto para transporte terciarizado)
    if (tipoVisita !== "Transporte Cargas" || !transporteTerciarizado) {
      if (personas.length === 0) {
        newErrors.personas = "Debe agregar al menos una persona"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (validateForm()) {
      console.log("Formulario enviado correctamente")
      console.log("Datos de la visita:", {
        tipoVisita,
        destino,
        evento,
        personalVisita,
        operacion,
        tipoCarga,
        otroTipoCarga,
        transporteTerciarizado,
        empresaTransporte,
        fechaDesde,
        horaDesde,
        fechaHasta,
        horaHasta,
        visitaRecurrente,
        diasSemana,
        personas,
        vehiculos,
        observaciones,
      })
      alert("Solicitud enviada correctamente")
    } else {
      console.log("Formulario con errores", errors)
    }
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

  // Función para limpiar campos del vehículo
  const limpiarCamposVehiculo = () => {
    setTipoVehiculo("")
    setPatenteVehiculo("")
    setMarcaVehiculo("")
    setModeloVehiculo("")
    setTitularVehiculo("")
    setSeguroVehiculo(null)
    setCedulaVerde(null)
    setCertificadoSeguridadVehicular(null)
    setConductorNoTitular(false)
    setCedulaAzul(null)
    setFechaVencimientoSeguro(undefined)
  }

  // Función para limpiar campos del conductor
  const limpiarCamposConductor = () => {
    setNombreConductor("")
    setDniConductor("")
    setTelefonoConductor("")
    setNumeroLicencia("")
    setLicenciaConducir(null)
  }

  // Función para agregar nuevo vehículo
  const agregarNuevoVehiculo = () => {
    if (patenteVehiculo && tipoVehiculo && marcaVehiculo && modeloVehiculo && seguroVehiculo && cedulaVerde && fechaVencimientoSeguro) {
      const nuevoVehiculo: Vehiculo = {
        id: Date.now().toString(),
        tipo: tipoVehiculo,
        patente: patenteVehiculo,
        marca: marcaVehiculo,
        modelo: modeloVehiculo,
        cedulaVerde: cedulaVerde,
        seguro: seguroVehiculo,
        fechaVencimientoSeguro: fechaVencimientoSeguro,
      }

      setVehiculos([...vehiculos, nuevoVehiculo])
      limpiarCamposVehiculo()
      setIsNewVehiculoModalOpen(false)
      alert("Vehículo agregado correctamente")
    } else {
      alert("Por favor complete todos los campos obligatorios")
    }
  }

  // Función para agregar nuevo conductor
  const agregarNuevoConductor = () => {
    if (nombreConductor && dniConductor && telefonoConductor && numeroLicencia && licenciaConducir) {
      const nuevoConductor = {
        id: Date.now(),
        nombre: `${nombreConductor}`,
        dni: dniConductor,
        telefono: telefonoConductor,
        numeroLicencia: numeroLicencia,
        categorias: ["B"],
        licencia: `licencia_${dniConductor}.jpg`,
        fechaVencimientoLicencia: "2025-12-31",
      }

      setConductoresCargados([...conductoresCargados, nuevoConductor])
      limpiarCamposConductor()
      setIsNewConductorModalOpen(false)
      alert("Conductor agregado correctamente")
    } else {
      alert("Por favor complete todos los campos obligatorios")
    }
  }

  // Función para capturar foto desde la cámara
  const capturarFoto = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.capture = "environment" // Usar cámara trasera en dispositivos móviles
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setFile(file)
      }
    }
    input.click()
  }

  // Función para abrir vista previa de imagen
  const abrirVistaPrevia = (file: File | null | undefined, titulo: string) => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
      setPreviewTitle(titulo)
      setIsImagePreviewOpen(true)
    }
  }

  // Función para cerrar vista previa
  const cerrarVistaPrevia = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage)
    }
    setPreviewImage(null)
    setPreviewTitle("")
    setIsImagePreviewOpen(false)
  }

  return (
    <div className="ml-14 sm:ml-16 md:ml-20 p-6 max-w-7xl">
      <div className="flex items-center mb-6">
        <Link
          href="/empleado-guardia/visita"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Nueva Visita</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contenedor: Información de la Visita */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Información de la Visita</h2>
            
            {/* Si no hay tipo seleccionado, mostrar solo el selector */}
            {!tipoVisita && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                  <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
                  Tipo Visita
                </Label>
                <Select value={tipoVisita} onValueChange={setTipoVisita}>
                    <SelectTrigger className="w-full h-12">
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
              </div>
              </div>
            )}

            {/* Para visita Laboral */}
            {tipoVisita === "Laboral" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
                    Tipo Visita
                  </Label>
                  <Select value={tipoVisita} onValueChange={setTipoVisita}>
                    <SelectTrigger className="w-full h-12">
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
                </div>
                <div>
                  <Label htmlFor="destino" className="text-sm font-medium text-gray-700 mb-1 block">
                    Destino
                  </Label>
                  <Select value={destino} onValueChange={setDestino}>
                    <SelectTrigger className="w-full h-12">
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
                </div>
                <div>
                  <Label htmlFor="personalVisita" className="text-sm font-medium text-gray-700 mb-1 block">
                    Personal a visitar
                  </Label>
                  <Input
                    id="personalVisita"
                    value={personalVisita}
                    onChange={(e) => setPersonalVisita(e.target.value)}
                    placeholder="Nombre y apellido"
                    className="w-full h-12"
                  />
                </div>
                </div>
              )}

            {/* Para visita Transporte Cargas */}
            {tipoVisita === "Transporte Cargas" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
                    Tipo Visita
                  </Label>
                  <Select value={tipoVisita} onValueChange={setTipoVisita}>
                    <SelectTrigger className="w-full h-12">
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
                </div>
              <div>
                  <Label htmlFor="destino" className="text-sm font-medium text-gray-700 mb-1 block">
                  Destino
                </Label>
                <Select value={destino} onValueChange={setDestino}>
                    <SelectTrigger className="w-full h-12">
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
              </div>
                <div className="flex items-center h-full">
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="visitaRecurrente"
                      checked={visitaRecurrente}
                      onCheckedChange={(checked) => setVisitaRecurrente(checked as boolean)}
                    />
                    <Label htmlFor="visitaRecurrente" className="text-sm font-medium text-gray-700">
                      Visita Recurrente
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Para visita Acceso a Obra */}
            {tipoVisita === "Acceso a Obra" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
                    Tipo Visita
                  </Label>
                  <Select value={tipoVisita} onValueChange={setTipoVisita}>
                    <SelectTrigger className="w-full h-12">
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
                </div>
                <div>
                  <Label htmlFor="destino" className="text-sm font-medium text-gray-700 mb-1 block">
                    Destino
                  </Label>
                  <Select value={destino} onValueChange={setDestino}>
                    <SelectTrigger className="w-full h-12">
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
                </div>
                <div className="flex items-center h-full">
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="visitaRecurrente"
                      checked={visitaRecurrente}
                      onCheckedChange={(checked) => setVisitaRecurrente(checked as boolean)}
                    />
                    <Label htmlFor="visitaRecurrente" className="text-sm font-medium text-gray-700">
                      Visita Recurrente
                    </Label>
                  </div>
                </div>
                </div>
              )}

            {/* Para visita Acceso a Muelle */}
            {tipoVisita === "Acceso a Muelle" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
                    Tipo Visita
                  </Label>
                  <Select value={tipoVisita} onValueChange={setTipoVisita}>
                    <SelectTrigger className="w-full h-12">
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
                </div>
                <div>
                  <Label htmlFor="destino" className="text-sm font-medium text-gray-700 mb-1 block">
                    Destino
                  </Label>
                  <Select value={destino} onValueChange={setDestino}>
                    <SelectTrigger className="w-full h-12">
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
                </div>
                <div className="flex items-center h-full">
                  <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                      id="visitaRecurrente"
                      checked={visitaRecurrente}
                      onCheckedChange={(checked) => setVisitaRecurrente(checked as boolean)}
                    />
                    <Label htmlFor="visitaRecurrente" className="text-sm font-medium text-gray-700">
                      Visita Recurrente
                  </Label>
                  </div>
                </div>
                </div>
              )}

            {/* Para visita Evento */}
            {tipoVisita === "Evento" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
                    Tipo Visita
                  </Label>
                  <Select value={tipoVisita} onValueChange={setTipoVisita}>
                    <SelectTrigger className="w-full h-12">
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
                </div>
                <div>
                  <Label htmlFor="evento" className="text-sm font-medium text-gray-700 mb-1 block">
                    Evento
                  </Label>
                  <Select value={evento} onValueChange={setEvento}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Seleccionar evento" />
                    </SelectTrigger>
                    <SelectContent>
                      {opcionesEventos.map((opcion) => (
                        <SelectItem key={opcion} value={opcion}>
                          {opcion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center h-full">
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="visitaRecurrente"
                      checked={visitaRecurrente}
                      onCheckedChange={(checked) => setVisitaRecurrente(checked as boolean)}
                    />
                    <Label htmlFor="visitaRecurrente" className="text-sm font-medium text-gray-700">
                      Visita Recurrente
                    </Label>
                  </div>
                </div>
                </div>
              )}
            </div>

          {/* Contenedor: Fechas y Horarios */}
          {tipoVisita && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Fechas y Horarios</h2>
              
              {/* Campos de fecha y hora - siempre visibles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Fecha y hora desde */}
              <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    {visitaRecurrente ? "Fecha de inicio" : "Desde"}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Campo de fecha */}
                    <Input
                      type="date"
                      value={fechaDesde ? format(fechaDesde, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFechaDesde(new Date(e.target.value + 'T00:00:00'))
                        } else {
                          setFechaDesde(undefined)
                        }
                      }}
                      className={`h-12 ${errors.fechaDesde ? "border-red-500" : ""}`}
                    />
                    {/* Campo de hora */}
                    <Input
                      type="time"
                      value={horaDesde}
                      onChange={(e) => setHoraDesde(e.target.value)}
                      className={`h-12 ${errors.horaDesde ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.fechaDesde && <p className="text-red-500 text-sm mt-1">{errors.fechaDesde}</p>}
                  {errors.horaDesde && <p className="text-red-500 text-sm mt-1">{errors.horaDesde}</p>}
              </div>

              {/* Fecha y hora hasta */}
              <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    {visitaRecurrente ? "Fecha de fin" : "Hasta"}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Campo de fecha */}
                    <Input
                      type="date"
                      value={fechaHasta ? format(fechaHasta, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFechaHasta(new Date(e.target.value + 'T00:00:00'))
                        } else {
                          setFechaHasta(undefined)
                        }
                      }}
                      className={`h-12 ${errors.fechaHasta ? "border-red-500" : ""}`}
                    />
                    {/* Campo de hora */}
                    <Input
                      type="time"
                      value={horaHasta}
                      onChange={(e) => setHoraHasta(e.target.value)}
                      className={`h-12 ${errors.horaHasta ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.fechaHasta && <p className="text-red-500 text-sm mt-1">{errors.fechaHasta}</p>}
                  {errors.horaHasta && <p className="text-red-500 text-sm mt-1">{errors.horaHasta}</p>}
              </div>
            </div>

              {/* Días de la semana - solo cuando es visita recurrente */}
              {visitaRecurrente && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Días de la semana</h3>
                  <div className="grid grid-cols-7 gap-4">
                    {diasDeLaSemana.map((dia) => (
                      <div key={dia.largo} className="flex items-center justify-center space-x-2">
                        <Checkbox
                          id={`dia-${dia.largo}`}
                          checked={diasSemana.includes(dia.largo)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setDiasSemana([...diasSemana, dia.largo])
                            } else {
                              setDiasSemana(diasSemana.filter((d) => d !== dia.largo))
                            }
                          }}
                        />
                        <Label htmlFor={`dia-${dia.largo}`} className="text-sm font-normal text-center">
                          <span className="lg:hidden">{dia.corto}</span>
                          <span className="hidden lg:inline">{dia.largo}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contenedor: Información de Transporte (solo para Transporte Cargas) */}
          {tipoVisita === "Transporte Cargas" && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Información de Transporte</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Operación */}
                <div>
                  <Label htmlFor="operacion" className="text-sm font-medium text-gray-700 mb-1 block">
                    Operación
                  </Label>
                  <Select value={operacion} onValueChange={setOperacion}>
                    <SelectTrigger className="w-full h-12">
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
                </div>

                {/* Tipo de carga */}
                <div>
                  <Label htmlFor="tipoCarga" className="text-sm font-medium text-gray-700 mb-1 block">
                    Tipo Carga
                  </Label>
                  <Select value={tipoCarga} onValueChange={setTipoCarga}>
                    <SelectTrigger className="w-full h-12">
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
                </div>

                {/* Checkbox para transporte terciarizado */}
                <div className="flex items-center h-full">
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="transporteTerciarizado"
                      checked={transporteTerciarizado}
                      onCheckedChange={(checked) => setTransporteTerciarizado(checked as boolean)}
                    />
                    <Label htmlFor="transporteTerciarizado" className="text-sm font-medium text-gray-700">
                      Transporte terciarizado
                    </Label>
                  </div>
                </div>

                {/* Especificar otro tipo de carga (cuando se selecciona "Otro") */}
                {tipoCarga === "Otro" && (
                  <div className="col-span-3">
                    <Label htmlFor="otroTipoCarga" className="text-sm font-medium text-gray-700 mb-1 block">
                      Especifique el tipo de carga
              </Label>
              <Input
                      id="otroTipoCarga"
                      value={otroTipoCarga}
                      onChange={(e) => setOtroTipoCarga(e.target.value)}
                      placeholder="Describa el tipo de carga"
                      className="w-full h-12"
              />
            </div>
          )}
              </div>

              {/* Segunda fila para empresa de transporte cuando es terciarizado */}
              {transporteTerciarizado && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <Label htmlFor="empresaTransporte" className="text-sm font-medium text-gray-700 mb-1 block">
                      Empresa de Transporte
                    </Label>
                    <Input
                      id="empresaTransporte"
                      value={empresaTransporte}
                      onChange={(e) => setEmpresaTransporte(e.target.value)}
                      placeholder="Nombre de la empresa"
                      className="w-full h-12"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contenedor: Personas que asistirán */}
          {(!isTransporteCarga || (isTransporteCarga && !transporteTerciarizado)) && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Personas que asistirán</h2>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={agregarPersona}
                    className="flex items-center h-12 w-12 lg:w-auto lg:px-6"
                    disabled={!nombrePersona || !documentoPersona}
                    title="Agregar Persona"
                  >
                    <Plus className="h-4 w-4 lg:mr-2" />
                    <span className="hidden lg:inline">Agregar Persona</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center h-12 w-12 lg:w-auto lg:px-6"
                    title="Cargar listado"
                  >
                    <Upload className="h-4 w-4 lg:mr-2" />
                    <span className="hidden lg:inline">Cargar listado</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <Label htmlFor="nombrePersona" className="text-sm font-medium text-gray-700 mb-1 block">
                    Nombre Completo
                  </Label>
                  <Input
                    id="nombrePersona"
                    value={nombrePersona}
                    onChange={(e) => setNombrePersona(e.target.value)}
                    placeholder="Nombre completo"
                    className="h-12"
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
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="empresaPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                    Empresa
                  </Label>
                  <Input
                    id="empresaPersona"
                    value={empresaPersona}
                    onChange={(e) => setEmpresaPersona(e.target.value)}
                    placeholder="Nombre de la empresa"
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="telefonoPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                    Teléfono
                  </Label>
                  <Input
                    id="telefonoPersona"
                    placeholder="11-XXXX-XXXX"
                    className="h-12"
                  />
                </div>
              </div>

              {personas.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">DNI</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Empresa</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personas.map((persona) => (
                        <tr key={persona.id} className="border-b border-gray-200">
                          <td className="py-3 px-4">{persona.nombre}</td>
                          <td className="py-3 px-4">{persona.documento}</td>
                          <td className="py-3 px-4">{persona.empresa}</td>
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
            </div>
          )}

          {/* Contenedor: Vehículos (para todos los tipos excepto cuando es transporte terciarizado) */}
          {!transporteTerciarizado && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Vehículos</h2>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewVehiculoModalOpen(true)}
                  className="flex items-center h-12 w-12 lg:w-auto lg:px-6"
                  title="Nuevo Vehículo"
                >
                  <Plus className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">Nuevo Vehículo</span>
                </Button>
              </div>


              {vehiculos.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Patente</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tipo Vehículo</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Marca</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Modelo</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Cédula</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Seguro</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Vencimiento</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehiculos.map((vehiculo) => (
                        <tr key={vehiculo.id} className="border-b border-gray-200">
                          <td className="py-3 px-4">{vehiculo.patente}</td>
                          <td className="py-3 px-4">{vehiculo.tipo}</td>
                          <td className="py-3 px-4">{vehiculo.marca || "-"}</td>
                          <td className="py-3 px-4">{vehiculo.modelo || "-"}</td>
                          <td className="py-3 px-4">
                            {vehiculo.cedulaVerde ? (
                              <button
                                type="button"
                                onClick={() => abrirVistaPrevia(vehiculo.cedulaVerde, `Cédula Verde - ${vehiculo.patente}`)}
                                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                              >
                                <FileImage className="h-4 w-4" />
                                <span className="text-sm">✓</span>
                              </button>
                            ) : (
                              <span className="text-gray-400 text-sm">Sin archivo</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {vehiculo.seguro ? (
                              <button
                                type="button"
                                onClick={() => abrirVistaPrevia(vehiculo.seguro, `Seguro - ${vehiculo.patente}`)}
                                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                              >
                                <FileImage className="h-4 w-4" />
                                <span className="text-sm">✓</span>
                              </button>
                            ) : (
                              <span className="text-gray-400 text-sm">Sin archivo</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {vehiculo.fechaVencimientoSeguro ? (
                              format(vehiculo.fechaVencimientoSeguro, "dd/MM/yyyy")
                            ) : (
                              "-"
                            )}
                          </td>
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
              )}
            </div>
          )}

          {/* Contenedor: Observaciones */}
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
              className="h-24"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" asChild className="h-12 px-8">
              <Link href="/empleado-guardia/visita">Cancelar</Link>
            </Button>
            <Button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white h-12 px-8">
              Enviar Solicitud
            </Button>
          </div>
        </form>


        {/* Modal para Nuevo Vehículo */}
        <Dialog open={isNewVehiculoModalOpen} onOpenChange={setIsNewVehiculoModalOpen}>
          <DialogContent className="max-w-2xl  mx-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Nuevo Vehículo</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="patenteVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
                    Patente *
                  </Label>
                  <Input
                    id="patenteVehiculo"
                    value={patenteVehiculo}
                    onChange={(e) => setPatenteVehiculo(e.target.value.toUpperCase())}
                    placeholder="ABC123 o AB123CD"
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="tipoVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
                    Tipo de Vehículo
                  </Label>
                  <Select value={tipoVehiculo} onValueChange={setTipoVehiculo}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposVehiculo.map((tipo) => (
                        <SelectItem key={tipo} value={tipo} className="text-base py-3">
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="marcaVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
                    Marca *
                  </Label>
                  <Input
                    id="marcaVehiculo"
                    value={marcaVehiculo}
                    onChange={(e) => setMarcaVehiculo(e.target.value)}
                    placeholder="Ej: Toyota, Ford, etc."
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="modeloVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
                    Modelo *
                  </Label>
                  <Input
                    id="modeloVehiculo"
                    value={modeloVehiculo}
                    onChange={(e) => setModeloVehiculo(e.target.value)}
                    placeholder="Ej: Corolla, Ranger, etc."
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* Seguro del vehículo */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">Seguro del Vehículo *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {seguroVehiculo ? (
                    <div className="space-y-2">
                      <div className="text-green-600 font-medium">✓ Foto del seguro capturada</div>
                      <div className="text-sm text-gray-500">{seguroVehiculo.name}</div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSeguroVehiculo(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                      <div className="text-gray-600">Tomar foto del seguro</div>
                      <Button
                        type="button"
                        onClick={() => capturarFoto(setSeguroVehiculo)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Capturar Foto
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Cédula verde */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">Cédula Verde *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {cedulaVerde ? (
                    <div className="space-y-2">
                      <div className="text-green-600 font-medium">✓ Foto de la cédula verde capturada</div>
                      <div className="text-sm text-gray-500">{cedulaVerde.name}</div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCedulaVerde(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                      <div className="text-gray-600">Tomar foto de la cédula verde</div>
                      <Button
                        type="button"
                        onClick={() => capturarFoto(setCedulaVerde)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Capturar Foto
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Vencimiento del seguro */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">Vencimiento del Seguro *</Label>
                <Input
                  type="date"
                  value={fechaVencimientoSeguro ? format(fechaVencimientoSeguro, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setFechaVencimientoSeguro(new Date(e.target.value + 'T00:00:00'))
                    } else {
                      setFechaVencimientoSeguro(undefined)
                    }
                  }}
                  className="h-12 text-base"
                />
              </div>
            </div>

            <DialogFooter className="space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsNewVehiculoModalOpen(false)
                  limpiarCamposVehiculo()
                }}
                className="h-12 px-6 text-base"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={agregarNuevoVehiculo}
                className="bg-blue-900 hover:bg-blue-800 text-white h-12 px-6 text-base"
              >
                Agregar Vehículo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal para Nuevo Conductor */}
        <Dialog open={isNewConductorModalOpen} onOpenChange={setIsNewConductorModalOpen}>
          <DialogContent className="max-w-2xl  mx-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Nuevo Conductor</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nombreConductor" className="text-base font-medium text-gray-700 mb-2 block">
                    Nombre *
                  </Label>
                  <Input
                    id="nombreConductor"
                    value={nombreConductor}
                    onChange={(e) => setNombreConductor(e.target.value)}
                    placeholder="Nombre completo"
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="dniConductor" className="text-base font-medium text-gray-700 mb-2 block">
                    DNI *
                  </Label>
                  <Input
                    id="dniConductor"
                    value={dniConductor}
                    onChange={(e) => setDniConductor(e.target.value.replace(/\D/g, ""))}
                    placeholder="12345678"
                    maxLength={8}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="telefonoConductor" className="text-base font-medium text-gray-700 mb-2 block">
                    Teléfono *
                  </Label>
                  <Input
                    id="telefonoConductor"
                    value={telefonoConductor}
                    onChange={(e) => setTelefonoConductor(e.target.value)}
                    placeholder="11-1234-5678"
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="numeroLicencia" className="text-base font-medium text-gray-700 mb-2 block">
                    Número de Licencia *
                  </Label>
                  <Input
                    id="numeroLicencia"
                    value={numeroLicencia}
                    onChange={(e) => setNumeroLicencia(e.target.value)}
                    placeholder="11-1234-5678"
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* Licencia de conducir */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">Licencia de Conducir *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {licenciaConducir ? (
                    <div className="space-y-2">
                      <div className="text-green-600 font-medium">✓ Foto de la licencia capturada</div>
                      <div className="text-sm text-gray-500">{licenciaConducir.name}</div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setLicenciaConducir(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                      <div className="text-gray-600">Tomar foto de la licencia de conducir</div>
                      <Button
                        type="button"
                        onClick={() => capturarFoto(setLicenciaConducir)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Capturar Foto
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsNewConductorModalOpen(false)
                  limpiarCamposConductor()
                }}
                className="h-12 px-6 text-base"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={agregarNuevoConductor}
                className="bg-blue-900 hover:bg-blue-800 text-white h-12 px-6 text-base"
              >
                Agregar Conductor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Vista Previa de Imagen */}
        <Dialog open={isImagePreviewOpen} onOpenChange={cerrarVistaPrevia}>
          <DialogContent className="max-w-3xl w-full h-[80vh] mx-4">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">{previewTitle}</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cerrarVistaPrevia}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              {previewImage && (
                <img
                  src={previewImage}
                  alt={previewTitle}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}
