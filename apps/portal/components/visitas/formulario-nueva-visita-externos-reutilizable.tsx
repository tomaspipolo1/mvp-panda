"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Plus, Trash2, Upload, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import {
  type Persona,
  type Vehiculo,
  type Documento,
  type Evento,
  type ConductorCargado,
  type VehiculoCargado,
  type PersonalCargado,
  type ProveedorRegistrado,
  type ConfiguracionFormularioVisita,
  type DatosFormularioVisita,
} from "./types"
import {
  OPCIONES_DESTINO_DEFAULT,
  OPCIONES_DESTINO_MAP_DEFAULT,
  SITIOS_MUELLE_DEFAULT,
  TIPOS_OPERACION,
  TIPOS_CARGA,
  TIPOS_ACTIVIDAD,
  ACTIVIDADES_OBRAS,
  ACTIVIDADES_MANTENIMIENTO,
  TIPOS_CONTRATACION,
  PERSONAS_RESPONSABLES,
  TIPOS_VEHICULO,
  CATEGORIAS_LICENCIA,
  DEPARTAMENTOS_RESPONSABLES,
} from "./formulario-visita-estaticos"

// Helper para input type="date" (YYYY-MM-DD)
function toDateInputValue(d: Date | undefined): string {
  if (!d) return ""
  return format(d, "yyyy-MM-dd")
}

interface FormularioNuevaVisitaExternosReutilizableProps {
  configuracion: ConfiguracionFormularioVisita
  backUrl: string
  onSubmit: (datos: DatosFormularioVisita) => void | Promise<void>
  onCancel?: () => void
  modoEdicion?: boolean
  datosPrecargados?: Partial<DatosFormularioVisita>
}

export function FormularioNuevaVisitaExternosReutilizable({
  configuracion,
  backUrl,
  onSubmit,
  onCancel,
  modoEdicion = false,
  datosPrecargados,
}: FormularioNuevaVisitaExternosReutilizableProps) {
  // Estados principales - inicializar con datos precargados si existe
  const [tipoVisita, setTipoVisita] = useState<string>(datosPrecargados?.tipoVisita || "")
  const [destino, setDestino] = useState<string>(datosPrecargados?.destino || "")
  const [eventoSeleccionado, setEventoSeleccionado] = useState<string>(datosPrecargados?.eventoSeleccionado || "")
  const [personalVisita, setPersonalVisita] = useState<string>(datosPrecargados?.personalVisita || "")
  
  // Estados para Transporte Cargas
  const [operacion, setOperacion] = useState<string>("")
  const [tipoCarga, setTipoCarga] = useState<string>("")
  const [otroTipoCarga, setOtroTipoCarga] = useState<string>("")
  const [empresaTransporte, setEmpresaTransporte] = useState<string>("")
  const [transporteTerciarizado, setTransporteTerciarizado] = useState<boolean>(false)

  // Estados para Obras/Mantenimiento
  const [tipoActividad, setTipoActividad] = useState<string>("")
  const [actividad, setActividad] = useState<string>("")
  const [tipoContratacion, setTipoContratacion] = useState<string>("")
  const [numeroExpediente, setNumeroExpediente] = useState<string>("")
  const [numeroOrdenCompra, setNumeroOrdenCompra] = useState<string>("")
  const [personaResponsable, setPersonaResponsable] = useState<string>("")

  // Estados para fechas y horarios - inicializar con datos precargados
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(
    datosPrecargados?.fechaDesde || undefined
  )
  const [horaDesde, setHoraDesde] = useState<string>(datosPrecargados?.horaDesde || "")
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(
    datosPrecargados?.fechaHasta || undefined
  )
  const [horaHasta, setHoraHasta] = useState<string>(datosPrecargados?.horaHasta || "")
  const [visitaRecurrente, setVisitaRecurrente] = useState<boolean>(false)
  const [diasSemana, setDiasSemana] = useState<string[]>([])

  // Estados para personas - inicializar con datos precargados
  const [personas, setPersonas] = useState<Persona[]>(datosPrecargados?.personas || [])
  const [nombrePersona, setNombrePersona] = useState<string>("")
  const [documentoPersona, setDocumentoPersona] = useState<string>("")
  const [empresaPersona, setEmpresaPersona] = useState<string>("")
  const [correoPersona, setCorreoPersona] = useState<string>("")
  const [telefonoPersona, setTelefonoPersona] = useState<string>("")
  const [esResponsable, setEsResponsable] = useState<boolean>(false)

  // Estados para vehículos - inicializar con datos precargados
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(datosPrecargados?.vehiculos || [])
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<string>("")
  // Inputs simples para agregar vehículo (Patente, Tipo, Marca, Modelo)
  const [patenteInput, setPatenteInput] = useState<string>("")
  const [tipoVehiculoInput, setTipoVehiculoInput] = useState<string>("")
  const [marcaInput, setMarcaInput] = useState<string>("")
  const [modeloInput, setModeloInput] = useState<string>("")

  // Estados para conductores
  const [conductorSeleccionado, setConductorSeleccionado] = useState<string>("")

  // Estados para documentos
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [tipoDocumento, setTipoDocumento] = useState<string>("")
  const [archivoDocumento, setArchivoDocumento] = useState<File | null>(null)

  // Estados para modales
  const [isNewVehiculoModalOpen, setIsNewVehiculoModalOpen] = useState(false)
  const [isNewConductorModalOpen, setIsNewConductorModalOpen] = useState(false)

  // Estados para formularios de modales
  const [tipoVehiculo, setTipoVehiculo] = useState<string>("")
  const [patenteVehiculo, setPatenteVehiculo] = useState<string>("")
  const [marcaVehiculo, setMarcaVehiculo] = useState<string>("")
  const [modeloVehiculo, setModeloVehiculo] = useState<string>("")
  const [titularVehiculo, setTitularVehiculo] = useState<string>("")
  const [seguroVehiculo, setSeguroVehiculo] = useState<File | null>(null)
  const [cedulaVerde, setCedulaVerde] = useState<File | null>(null)
  const [certificadoSeguridadVehicular, setCertificadoSeguridadVehicular] = useState<File | null>(null)
  const [conductorNoTitular, setConductorNoTitular] = useState<boolean>(false)
  const [cedulaAzul, setCedulaAzul] = useState<File | null>(null)
  const [fechaVencimientoSeguro, setFechaVencimientoSeguro] = useState<Date | undefined>(undefined)

  // Estados para conductor modal
  const [nombreConductor, setNombreConductor] = useState<string>("")
  const [dniConductor, setDniConductor] = useState<string>("")
  const [telefonoConductor, setTelefonoConductor] = useState<string>("")
  const [emailConductor, setEmailConductor] = useState<string>("")
  const [numeroLicencia, setNumeroLicencia] = useState<string>("")
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([])
  const [licenciaConducir, setLicenciaConducir] = useState<File | null>(null)
  const [fechaVencimientoLicencia, setFechaVencimientoLicencia] = useState<Date | undefined>(undefined)
  const [errorCategorias, setErrorCategorias] = useState<string>("")


  // Estados para autocompletado (solo proveedor)
  const [nombreSugerencias, setNombreSugerencias] = useState<PersonalCargado[]>([])
  const [showSugerencias, setShowSugerencias] = useState(false)

  const autocompletadoRef = useRef<HTMLDivElement>(null)
  const proveedorSuggestionsRef = useRef<HTMLDivElement>(null)

  // Estados para validación
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // Estado para observaciones - inicializar con datos precargados
  const [observaciones, setObservaciones] = useState<string>(datosPrecargados?.observaciones || "")

  // Estados empleado-compras: destinos múltiples, acceso muelle, proveedor
  const [destinosSeleccionados, setDestinosSeleccionados] = useState<string[]>(
    datosPrecargados?.destinosSeleccionados || []
  )
  const [accesoAMuelle, setAccesoAMuelle] = useState<boolean>(datosPrecargados?.accesoAMuelle ?? false)
  const [razonSocial, setRazonSocial] = useState<string>(datosPrecargados?.razonSocial || "")
  const [cuitProveedor, setCuitProveedor] = useState<string>(datosPrecargados?.cuitProveedor || "")
  const [emailProveedor, setEmailProveedor] = useState<string>(datosPrecargados?.emailProveedor || "")
  const [telefonoProveedor, setTelefonoProveedor] = useState<string>(
    datosPrecargados?.telefonoProveedor || ""
  )
  const [proveedorNoInscripto, setProveedorNoInscripto] = useState<boolean>(
    datosPrecargados?.proveedorNoInscripto ?? false
  )
  const [departamentoResponsable, setDepartamentoResponsable] = useState<string>(
    datosPrecargados?.departamentoResponsable || ""
  )
  const [proveedorEncontrado, setProveedorEncontrado] = useState<ProveedorRegistrado | null>(null)
  const [camposProveedorDeshabilitados, setCamposProveedorDeshabilitados] = useState(false)
  const [showProveedorSuggestions, setShowProveedorSuggestions] = useState(false)
  const [proveedoresSugeridos, setProveedoresSugeridos] = useState<ProveedorRegistrado[]>([])

  // Destinos que requieren persona responsable (usado en validación y visibilidad)
  const destinosConPersonaResponsable = [
    "PLP - Oficinas Administrativas",
    "PLP - Pañol/Deposito",
    "PLP - Obras e Ingenieria",
    "PLP - Taller de herreria",
    "PLP - Taller de Locomotoras",
  ]

  // Valores resueltos: config tiene prioridad; si no viene, se usan los estáticos (formulario-visita-estaticos)
  const opcionesDestinoResuelto = configuracion.opcionesDestino ?? OPCIONES_DESTINO_MAP_DEFAULT
  const sitiosMuelleResuelto = configuracion.sitiosMuelle ?? SITIOS_MUELLE_DEFAULT
  const tiposOperacionResuelto = configuracion.tiposOperacion ?? TIPOS_OPERACION
  const tiposCargaResuelto = configuracion.tiposCarga ?? TIPOS_CARGA
  const tiposActividadResuelto = configuracion.tiposActividad ?? TIPOS_ACTIVIDAD
  const actividadesObrasResuelto = configuracion.actividadesObras ?? ACTIVIDADES_OBRAS
  const actividadesMantenimientoResuelto = configuracion.actividadesMantenimiento ?? ACTIVIDADES_MANTENIMIENTO
  const tiposContratacionResuelto = configuracion.tiposContratacion ?? TIPOS_CONTRATACION
  const personasResponsablesResuelto = configuracion.personasResponsables ?? PERSONAS_RESPONSABLES
  const tiposVehiculoResuelto = configuracion.tiposVehiculo ?? TIPOS_VEHICULO
  const categoriasLicenciaResuelto = configuracion.categoriasLicencia ?? CATEGORIAS_LICENCIA
  const departamentosResponsablesResuelto = configuracion.departamentosResponsables ?? DEPARTAMENTOS_RESPONSABLES

  const getOpcionesDestino = () => {
    if (!tipoVisita) return []
    return opcionesDestinoResuelto[tipoVisita] ?? opcionesDestinoResuelto.default ?? OPCIONES_DESTINO_DEFAULT
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompletadoRef.current && !autocompletadoRef.current.contains(event.target as Node)) {
        setShowSugerencias(false)
      }
      if (proveedorSuggestionsRef.current && !proveedorSuggestionsRef.current.contains(event.target as Node)) {
        setShowProveedorSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Función para autocompletar fechas cuando se selecciona un evento (usuario-basico)
  const handleEventoChange = (eventoId: string) => {
    setEventoSeleccionado(eventoId)
    const evento = configuracion.eventosDisponibles?.find((e) => e.id === eventoId)
    if (evento) {
      setFechaDesde(evento.fechaDesde)
      setFechaHasta(evento.fechaHasta)
      setHoraDesde(evento.horaDesde)
      setHoraHasta(evento.horaHasta)
    }
  }

  // Función para filtrar sugerencias de personal (solo proveedor)
  const filtrarSugerencias = (texto: string) => {
    if (!configuracion.autocompletadoPersonal || !configuracion.personalCargado) {
      return
    }
    if (texto.length < 2) {
      setNombreSugerencias([])
      setShowSugerencias(false)
      return
    }
    const sugerencias = configuracion.personalCargado.filter((persona) =>
      persona.nombreCompleto.toLowerCase().includes(texto.toLowerCase()),
    )
    setNombreSugerencias(sugerencias)
    setShowSugerencias(sugerencias.length > 0)
  }

  // Función para seleccionar una sugerencia
  const seleccionarSugerencia = (persona: PersonalCargado) => {
    setNombrePersona(persona.nombreCompleto)
    setDocumentoPersona(persona.dni)
    setTelefonoPersona(persona.telefono || "")
    setShowSugerencias(false)
    setNombreSugerencias([])
  }

  // Al cambiar tipo de visita, limpiar campos que ya no aplican
  const handleTipoVisitaChange = (value: string) => {
    setTipoVisita(value)
    if (value !== "Servicio a buques") setDestinosSeleccionados([])
    else setDestino("")
    if (value !== "Transporte Cargas" && value !== "Servicio a buques") {
      setOperacion("")
      setTipoCarga("")
      setOtroTipoCarga("")
      setEmpresaTransporte("")
      setTransporteTerciarizado(false)
    }
    if (value !== "Transporte Cargas" && value !== "Obras/Mantenimiento" && value !== "Guiada") {
      setAccesoAMuelle(false)
    }
    if (value !== "Obras/Mantenimiento") {
      setTipoActividad("")
      setActividad("")
      setTipoContratacion("")
      setNumeroExpediente("")
      setNumeroOrdenCompra("")
    }
  }

  // Handlers proveedor (empleado-compras)
  const buscarProveedorPorRazonSocial = (texto: string) => {
    if (
      !configuracion.proveedoresRegistrados ||
      texto.length < 3 ||
      proveedorNoInscripto
    ) {
      setProveedoresSugeridos([])
      setShowProveedorSuggestions(false)
      return
    }
    const sugerencias = configuracion.proveedoresRegistrados.filter(
      (p) => p.razonSocial.toLowerCase().includes(texto.toLowerCase()) && p.activo
    )
    setProveedoresSugeridos(sugerencias)
    setShowProveedorSuggestions(sugerencias.length > 0)
  }

  const buscarProveedorPorCuit = (cuit: string) => {
    if (
      !configuracion.proveedoresRegistrados ||
      cuit.length < 5 ||
      proveedorNoInscripto
    )
      return
    const found = configuracion.proveedoresRegistrados.find(
      (p) => p.cuit === cuit && p.activo
    )
    if (found) autocompletarProveedor(found)
  }

  const autocompletarProveedor = (prov: ProveedorRegistrado) => {
    setProveedorEncontrado(prov)
    setRazonSocial(prov.razonSocial)
    setCuitProveedor(prov.cuit)
    setEmailProveedor(prov.email)
    setTelefonoProveedor(prov.telefono)
    setCamposProveedorDeshabilitados(true)
    setShowProveedorSuggestions(false)
  }

  const limpiarDatosProveedor = () => {
    setProveedorEncontrado(null)
    setRazonSocial("")
    setCuitProveedor("")
    setEmailProveedor("")
    setTelefonoProveedor("")
    setCamposProveedorDeshabilitados(false)
    setShowProveedorSuggestions(false)
  }

  const handleProveedorNoInscriptoChange = (checked: boolean) => {
    setProveedorNoInscripto(checked)
    if (checked) limpiarDatosProveedor()
  }

  const getActividadesDisponibles = () => {
    if (tipoActividad === "Obras") return actividadesObrasResuelto
    if (tipoActividad === "Mantenimiento") return actividadesMantenimientoResuelto
    return []
  }

  // Función para agregar persona
  const agregarPersona = () => {
    if (nombrePersona && documentoPersona) {
      const nuevaPersona: Persona = {
        id: Date.now().toString(),
        nombre: nombrePersona,
        documento: documentoPersona,
        empresa: empresaPersona || "",
        correo: correoPersona,
        telefono: telefonoPersona,
        responsable: esResponsable,
      }
      setPersonas([...personas, nuevaPersona])
      setNombrePersona("")
      setDocumentoPersona("")
      setEmpresaPersona("")
      setCorreoPersona("")
      setTelefonoPersona("")
      setEsResponsable(false)
    }
  }

  // Función para eliminar persona
  const eliminarPersona = (id: string) => {
    setPersonas(personas.filter((persona) => persona.id !== id))
  }

  // Función para agregar conductor (desde conductores cargados)
  const agregarConductor = () => {
    if (!conductorSeleccionado || !configuracion.conductoresCargados) return
    const conductor = configuracion.conductoresCargados.find(
      (c) => c.id.toString() === conductorSeleccionado,
    )
    if (conductor) {
      const nuevaPersona: Persona = {
        id: Date.now().toString(),
        nombre: conductor.nombre,
        documento: conductor.dni,
        empresa: empresaTransporte || "",
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

  // Función para agregar vehículo (desde vehículos cargados)
  const agregarVehiculo = () => {
    if (!vehiculoSeleccionado || !configuracion.vehiculosCargados) return
    const vehiculo = configuracion.vehiculosCargados.find((v) => v.id.toString() === vehiculoSeleccionado)
    if (vehiculo) {
      const nuevoVehiculo: Vehiculo = {
        id: Date.now().toString(),
        tipo: vehiculo.tipo.toLowerCase(),
        patente: vehiculo.patente,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        seguro: null,
        fechaVencimientoSeguro: vehiculo.fechaVencimientoSeguro
          ? new Date(vehiculo.fechaVencimientoSeguro)
          : undefined,
      }
      setVehiculos([...vehiculos, nuevoVehiculo])
      setVehiculoSeleccionado("")
    }
  }

  // Agregar vehículo desde inputs simples (Patente, Tipo, Marca, Modelo)
  const agregarVehiculoDesdeForm = () => {
    if (!patenteInput.trim() || !tipoVehiculoInput) return
    const nuevoVehiculo: Vehiculo = {
      id: Date.now().toString(),
      patente: patenteInput.trim(),
      tipo: tipoVehiculoInput,
      marca: marcaInput.trim() || undefined,
      modelo: modeloInput.trim() || undefined,
    }
    setVehiculos([...vehiculos, nuevoVehiculo])
    setPatenteInput("")
    setTipoVehiculoInput("")
    setMarcaInput("")
    setModeloInput("")
  }

  // Función para eliminar vehículo
  const eliminarVehiculo = (id: string) => {
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id))
  }

  // Función para agregar documento
  const agregarDocumento = () => {
    if (archivoDocumento && tipoDocumento) {
      const nuevoDocumento: Documento = {
        id: Date.now().toString(),
        nombre: archivoDocumento.name,
        archivo: archivoDocumento,
        tipo: tipoDocumento,
      }
      setDocumentos([...documentos, nuevoDocumento])
      setArchivoDocumento(null)
      setTipoDocumento("")
      const fileInput = document.getElementById("documentoInput") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    }
  }

  // Función para eliminar documento
  const eliminarDocumento = (id: string) => {
    setDocumentos(documentos.filter((doc) => doc.id !== id))
  }

  // Función para manejar carga de archivos
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  // Función para procesar archivo xlsx (simulación)
  const handleXlsxUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Simulación de carga desde Excel
    const personasSimuladas: Persona[] = [
      {
        id: Date.now().toString(),
        nombre: "Juan Pérez",
        documento: "12345678",
        empresa: "",
        correo: "juan@ejemplo.com",
        telefono: "1234567890",
      },
      {
        id: (Date.now() + 1).toString(),
        nombre: "María González",
        documento: "87654321",
        empresa: "",
        correo: "maria@ejemplo.com",
        telefono: "0987654321",
      },
    ]
    setPersonas([...personas, ...personasSimuladas])
    alert(`Se cargaron ${personasSimuladas.length} personas desde el archivo`)
  }

  // Función para manejar cambio en categorías
  const handleCategoriaChange = (categoria: string) => {
    setCategoriasSeleccionadas((prev) => {
      if (prev.includes(categoria)) {
        return prev.filter((c) => c !== categoria)
      } else {
        return [...prev, categoria]
      }
    })
  }

  // Validar el formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar tipo de visita
    if (!tipoVisita) {
      newErrors.tipoVisita = "El tipo de visita es obligatorio"
    }

    // Validación guiada solo por config y tipoVisita (reutilizable para cualquier rol)
    const necesitaProveedorVal =
      !!configuracion.permiteSeccionProveedor &&
      (configuracion.tiposVisitaConProveedor?.includes(tipoVisita) ||
        (!!configuracion.mostrarProveedorConAccesoAMuelle && accesoAMuelle))
    const isServicioBuques = tipoVisita === "Servicio a buques"

    if (tipoVisita === "Evento" && configuracion.permiteEventos) {
      if (!eventoSeleccionado) newErrors.evento = "El evento es obligatorio"
    } else if (tipoVisita && tipoVisita !== "Obras/Mantenimiento" && !isServicioBuques) {
      if (!destino) newErrors.destino = "El destino es obligatorio"
    }

    if (tipoVisita === "Obras/Mantenimiento" && configuracion.permiteObrasMantenimiento) {
      if (!tipoActividad) newErrors.tipoActividad = "El tipo de actividad es obligatorio"
      if (!actividad) newErrors.actividad = "La actividad es obligatoria"
      if (!tipoContratacion) newErrors.tipoContratacion = "El tipo de contratación es obligatorio"
      if (tipoContratacion === "Licitación" && !numeroExpediente)
        newErrors.numeroExpediente = "El número de expediente es obligatorio"
      if (tipoContratacion === "Directa" && !numeroOrdenCompra)
        newErrors.numeroOrdenCompra = "El número de orden de compra es obligatorio"
    }

    if (
      (tipoVisita === "Transporte Cargas" || isServicioBuques) &&
      (configuracion.permiteTransporteCargas || tiposOperacionResuelto.length > 0)
    ) {
      if (!operacion) newErrors.operacion = "La operación es obligatoria"
      if (!tipoCarga) newErrors.tipoCarga = "El tipo de carga es obligatorio"
      if (tipoCarga === "Otro" && !otroTipoCarga)
        newErrors.otroTipoCarga = "Debe especificar el tipo de carga"
      if (transporteTerciarizado && !empresaTransporte)
        newErrors.empresaTransporte = "La empresa de transporte es obligatoria"
      if (!transporteTerciarizado) {
        if (personas.length === 0) newErrors.conductor = "Debe agregar al menos un conductor"
        if (vehiculos.length === 0) newErrors.vehiculos = "Debe agregar al menos un vehículo"
      }
    }

    if (isServicioBuques && configuracion.permiteDestinosMultiples && destinosSeleccionados.length === 0)
      newErrors.destinos = "Debe seleccionar al menos un destino"

    if (necesitaProveedorVal) {
      if (!razonSocial) newErrors.razonSocial = "La razón social es obligatoria"
      if (!cuitProveedor) newErrors.cuitProveedor = "El CUIT es obligatorio"
      if (!emailProveedor) newErrors.emailProveedor = "El email es obligatorio"
      if (!telefonoProveedor) newErrors.telefonoProveedor = "El teléfono es obligatorio"
    }

    if (tipoVisita === "Laboral" && !personalVisita)
      newErrors.personalVisita = "El personal a visitar es obligatorio"

    const exigePersonas =
      tipoVisita !== "Transporte Cargas" ||
      (tipoVisita === "Transporte Cargas" && !transporteTerciarizado)
    if (exigePersonas && tipoVisita !== "Servicio a buques") {
      if (!necesitaProveedorVal && personas.length === 0)
        newErrors.personas = "Debe agregar al menos una persona"
    }
    if (
      (necesitaProveedorVal || isServicioBuques) &&
      !transporteTerciarizado &&
      vehiculos.length === 0
    )
      newErrors.vehiculos = "Debe agregar al menos un vehículo"

    if (
      configuracion.muestraPersonaResponsable &&
      (destinosConPersonaResponsable.includes(destino) ||
        (configuracion.permiteAccesoAMuelleCheckbox && accesoAMuelle)) &&
      !personaResponsable
    ) {
      newErrors.personaResponsable = "La persona responsable es obligatoria"
    }

    // Validar fechas y horarios
    if (!fechaDesde) {
      newErrors.fechaDesde = "La fecha desde es obligatoria"
    }
    if (!horaDesde) {
      newErrors.horaDesde = "La hora desde es obligatoria"
    }
    if (!fechaHasta) {
      newErrors.fechaHasta = "La fecha hasta es obligatoria"
    }
    if (!horaHasta) {
      newErrors.horaHasta = "La hora hasta es obligatoria"
    }

    // Validar días de la semana para visitas recurrentes
    if (visitaRecurrente && configuracion.permiteVisitaRecurrente && diasSemana.length === 0) {
      newErrors.diasSemana = "Debe seleccionar al menos un día de la semana"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (!validateForm()) {
      return
    }

    const datos: DatosFormularioVisita = {
      tipoVisita,
      destino,
      eventoSeleccionado: configuracion.permiteEventos ? eventoSeleccionado : undefined,
      personalVisita,
      operacion: configuracion.permiteTransporteCargas || tiposOperacionResuelto.length > 0 ? operacion : undefined,
      tipoCarga: configuracion.permiteTransporteCargas || tiposCargaResuelto.length > 0 ? tipoCarga : undefined,
      otroTipoCarga: configuracion.permiteTransporteCargas || tiposCargaResuelto.length > 0 ? otroTipoCarga : undefined,
      empresaTransporte: configuracion.permiteTransporteCargas || tiposOperacionResuelto.length > 0 ? empresaTransporte : undefined,
      transporteTerciarizado: configuracion.permiteTransporteCargas || tiposOperacionResuelto.length > 0 ? transporteTerciarizado : undefined,
      tipoActividad: configuracion.permiteObrasMantenimiento ? tipoActividad : undefined,
      actividad: configuracion.permiteObrasMantenimiento ? actividad : undefined,
      tipoContratacion: configuracion.permiteObrasMantenimiento ? tipoContratacion : undefined,
      numeroExpediente: configuracion.permiteObrasMantenimiento ? numeroExpediente : undefined,
      numeroOrdenCompra: configuracion.permiteObrasMantenimiento ? numeroOrdenCompra : undefined,
      personaResponsable: configuracion.muestraPersonaResponsable ? personaResponsable : undefined,
      fechaDesde,
      horaDesde,
      fechaHasta,
      horaHasta,
      visitaRecurrente: configuracion.permiteVisitaRecurrente ? visitaRecurrente : undefined,
      diasSemana: configuracion.permiteVisitaRecurrente ? diasSemana : undefined,
      personas,
      vehiculos,
      documentos: configuracion.muestraDocumentacion ? documentos : undefined,
      observaciones,
    }
    if (configuracion.permiteDestinosMultiples)
      datos.destinosSeleccionados = destinosSeleccionados.length ? destinosSeleccionados : undefined
    if (configuracion.permiteAccesoAMuelleCheckbox) datos.accesoAMuelle = accesoAMuelle
    if (configuracion.permiteSeccionProveedor) {
      datos.razonSocial = razonSocial || undefined
      datos.cuitProveedor = cuitProveedor || undefined
      datos.emailProveedor = emailProveedor || undefined
      datos.telefonoProveedor = telefonoProveedor || undefined
      datos.proveedorNoInscripto = proveedorNoInscripto
    }
    if (departamentosResponsablesResuelto.length)
      datos.departamentoResponsable = departamentoResponsable || undefined

    await onSubmit(datos)
  }

  // Mostrar/exigir sección proveedor según config (tiposVisitaConProveedor + mostrarProveedorConAccesoAMuelle)
  const necesitaProveedor =
    !!configuracion.permiteSeccionProveedor &&
    (configuracion.tiposVisitaConProveedor?.includes(tipoVisita) ||
      (!!configuracion.mostrarProveedorConAccesoAMuelle && accesoAMuelle))

  // Con acceso a muelle se muestran sitios; si no, destinos por tipo de visita
  const getOpcionesDestinoSegunMuelle = () => {
    if (accesoAMuelle && sitiosMuelleResuelto.length) return sitiosMuelleResuelto
    return getOpcionesDestino()
  }

  // Grid de información de la visita: máx 4 campos por fila, ancho uniforme llenando el contenedor
  const infoVisitaGridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full"
  const infoVisitaFieldClass = "min-w-0"

  // Renderizar sección de información básica (por tipo de visita; reutilizable para cualquier rol)
  const renderInformacionBasica = () => {
    const opcionesDestino = getOpcionesDestino()
    const opcionesDestinoConMuelle = getOpcionesDestinoSegunMuelle()
    const err = (key: string) => submitted && errors[key] ? "border-red-500 focus:ring-red-500" : ""

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Información de la visita</h2>

        {/* Sin tipo: solo select de tipo de visita */}
        {!tipoVisita && (
          <div className={infoVisitaGridClass}>
            <div className={infoVisitaFieldClass}>
              <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
                Tipo de visita
              </Label>
              <Select value={tipoVisita} onValueChange={handleTipoVisitaChange}>
                <SelectTrigger id="tipoVisita" className={err("tipoVisita")}>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {configuracion.tiposVisita.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
            </div>
          </div>
        )}

        {/* Laboral: Tipo, Destino, Persona a visitar */}
        {tipoVisita === "Laboral" && (
          <div className={infoVisitaGridClass}>
            <div className={infoVisitaFieldClass}>
              <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">Tipo de visita</Label>
              <Select value={tipoVisita} onValueChange={handleTipoVisitaChange}>
                <SelectTrigger id="tipoVisita" className={err("tipoVisita")}>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {configuracion.tiposVisita.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label htmlFor="destino" className="text-sm font-medium text-gray-700 mb-1 block">Destino</Label>
              <Select value={destino} onValueChange={setDestino}>
                <SelectTrigger id="destino" className={err("destino")}>
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  {opcionesDestino.map((opcion) => (
                    <SelectItem key={opcion} value={opcion}>{opcion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.destino && <p className="text-red-500 text-xs mt-1">{errors.destino}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label htmlFor="personalVisita" className="text-sm font-medium text-gray-700 mb-1 block">Persona a visitar</Label>
              <Input
                id="personalVisita"
                value={personalVisita}
                onChange={(e) => setPersonalVisita(e.target.value)}
                placeholder="Nombre y apellido"
                className={err("personalVisita")}
              />
              {submitted && errors.personalVisita && <p className="text-red-500 text-xs mt-1">{errors.personalVisita}</p>}
            </div>
          </div>
        )}

        {/* Transporte Cargas: máx 4 por fila */}
        {tipoVisita === "Transporte Cargas" && (
          <div className={infoVisitaGridClass}>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de visita</Label>
              <Select value={tipoVisita} onValueChange={handleTipoVisitaChange}>
                <SelectTrigger id="tipoVisita" className={err("tipoVisita")}>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {configuracion.tiposVisita.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Acceso a muelle</Label>
              <Select value={accesoAMuelle ? "Sí" : "No"} onValueChange={(v) => setAccesoAMuelle(v === "Sí")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sí">Sí</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Destino</Label>
              <Select value={destino} onValueChange={setDestino}>
                <SelectTrigger id="destino" className={err("destino")}>
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  {opcionesDestinoConMuelle.map((opcion) => (
                    <SelectItem key={opcion} value={opcion}>{opcion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.destino && <p className="text-red-500 text-xs mt-1">{errors.destino}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Departamento responsable</Label>
              <Select value={departamentoResponsable} onValueChange={setDepartamentoResponsable}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {departamentosResponsablesResuelto.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Visita recurrente</Label>
              <Select value={visitaRecurrente ? "Sí" : "No"} onValueChange={(v) => setVisitaRecurrente(v === "Sí")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sí">Sí</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Obras/Mantenimiento: máx 4 por fila */}
        {tipoVisita === "Obras/Mantenimiento" && (
          <div className={infoVisitaGridClass}>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de visita</Label>
              <Select value={tipoVisita} onValueChange={handleTipoVisitaChange}>
                <SelectTrigger id="tipoVisita" className={err("tipoVisita")}>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {configuracion.tiposVisita.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de actividad</Label>
              <Select value={tipoActividad} onValueChange={(v) => { setTipoActividad(v); setActividad("") }}>
                <SelectTrigger id="tipoActividad" className={err("tipoActividad")}>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {tiposActividadResuelto.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoActividad && <p className="text-red-500 text-xs mt-1">{errors.tipoActividad}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Actividad</Label>
              <Select value={actividad} onValueChange={setActividad} disabled={!tipoActividad}>
                <SelectTrigger id="actividad" className={err("actividad")}>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {getActividadesDisponibles().map((a) => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.actividad && <p className="text-red-500 text-xs mt-1">{errors.actividad}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Acceso a muelle</Label>
              <Select value={accesoAMuelle ? "Sí" : "No"} onValueChange={(v) => setAccesoAMuelle(v === "Sí")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sí">Sí</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Destino</Label>
              <Select value={destino} onValueChange={setDestino}>
                <SelectTrigger id="destino" className={err("destino")}>
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  {opcionesDestinoConMuelle.map((opcion) => (
                    <SelectItem key={opcion} value={opcion}>{opcion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.destino && <p className="text-red-500 text-xs mt-1">{errors.destino}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Visita recurrente</Label>
              <Select value={visitaRecurrente ? "Sí" : "No"} onValueChange={(v) => setVisitaRecurrente(v === "Sí")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sí">Sí</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Servicio a buques: Tipo y Visita recurrente (máx 4); Destinos ancho completo abajo */}
        {tipoVisita === "Servicio a buques" && (
          <>
            <div className={infoVisitaGridClass}>
              <div className={infoVisitaFieldClass}>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de visita</Label>
                <Select value={tipoVisita} onValueChange={handleTipoVisitaChange}>
                  <SelectTrigger id="tipoVisita" className={err("tipoVisita")}>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {configuracion.tiposVisita.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
              </div>
              <div className={infoVisitaFieldClass}>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Visita recurrente</Label>
                <Select value={visitaRecurrente ? "Sí" : "No"} onValueChange={(v) => setVisitaRecurrente(v === "Sí")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sí">Sí</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Destinos (sitios)</Label>
              <div className={`bg-gray-50 p-4 rounded-lg border ${submitted && errors.destinos ? "border-red-500" : "border-gray-200"}`}>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {sitiosMuelleResuelto.map((sitio) => (
                    <div key={sitio} className="flex items-center space-x-2">
                      <Checkbox
                        id={`destino-${sitio}`}
                        checked={destinosSeleccionados.includes(sitio)}
                        onCheckedChange={(c) => {
                          if (c) setDestinosSeleccionados([...destinosSeleccionados, sitio])
                          else setDestinosSeleccionados(destinosSeleccionados.filter((d) => d !== sitio))
                        }}
                      />
                      <Label htmlFor={`destino-${sitio}`} className="text-sm cursor-pointer">{sitio}</Label>
                    </div>
                  ))}
                </div>
              </div>
              {submitted && errors.destinos && <p className="text-red-500 text-xs mt-2">{errors.destinos}</p>}
            </div>
          </>
        )}

        {/* Guiada: Tipo, Acceso muelle, Destino */}
        {tipoVisita === "Guiada" && (
          <div className={infoVisitaGridClass}>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de visita</Label>
              <Select value={tipoVisita} onValueChange={handleTipoVisitaChange}>
                <SelectTrigger id="tipoVisita" className={err("tipoVisita")}>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {configuracion.tiposVisita.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Acceso a muelle</Label>
              <Select value={accesoAMuelle ? "Sí" : "No"} onValueChange={(v) => setAccesoAMuelle(v === "Sí")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sí">Sí</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Destino</Label>
              <Select value={destino} onValueChange={setDestino}>
                <SelectTrigger id="destino" className={err("destino")}>
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  {opcionesDestinoConMuelle.map((opcion) => (
                    <SelectItem key={opcion} value={opcion}>{opcion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.destino && <p className="text-red-500 text-xs mt-1">{errors.destino}</p>}
            </div>
          </div>
        )}

        {/* Evento (si la config lo incluye) */}
        {configuracion.permiteEventos && tipoVisita === "Evento" && (
          <div className={infoVisitaGridClass}>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de visita</Label>
              <Select value={tipoVisita} onValueChange={setTipoVisita}>
                <SelectTrigger id="tipoVisita" className={err("tipoVisita")}>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {configuracion.tiposVisita.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
            </div>
            <div className={infoVisitaFieldClass}>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Evento</Label>
              <Select value={eventoSeleccionado} onValueChange={handleEventoChange}>
                <SelectTrigger id="evento" className={err("evento")}>
                  <SelectValue placeholder="Seleccionar evento" />
                </SelectTrigger>
                <SelectContent>
                  {(configuracion.eventosDisponibles || []).map((ev) => (
                    <SelectItem key={ev.id} value={ev.id}>{ev.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.evento && <p className="text-red-500 text-xs mt-1">{errors.evento}</p>}
            </div>
          </div>
        )}
      </div>
    )
  }

  const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  // Visibilidad de secciones según tipo de visita
  const showSeccionPersonas = !tipoVisita || tipoVisita === "Laboral" || tipoVisita === "Guiada"
  const showSeccionVehiculos = Boolean(tipoVisita)
  const showSeccionConductor = Boolean(tipoVisita && tipoVisita !== "Laboral")
  const showSeccionDocumentacion = !!tipoVisita
  const showInfoTransporte =
    tipoVisita === "Transporte Cargas" || tipoVisita === "Servicio a buques"
  const showDatosContratacion = tipoVisita === "Obras/Mantenimiento"
  const showProveedorSeccion =
    necesitaProveedor && !!configuracion.proveedoresRegistrados?.length

  // Renderizar sección de fechas y horarios (solo cuando hay tipo de visita; inputs nativos)
  const renderFechasHorarios = () => {
    if (!tipoVisita) return null
    const camposDeshabilitados =
      modoEdicion ||
      (configuracion.camposFechaEventosDeshabilitados && tipoVisita === "Evento")

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          {configuracion.permiteVisitaRecurrente ? "Fechas y Horarios" : "Fechas y horarios"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">
              {visitaRecurrente ? "Fecha de inicio" : "Desde"}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={toDateInputValue(fechaDesde)}
                onChange={(e) => setFechaDesde(e.target.value ? new Date(e.target.value) : undefined)}
                disabled={camposDeshabilitados}
                className={submitted && errors.fechaDesde ? "border-red-500 focus:ring-red-500" : ""}
              />
              <Input
                id="horaDesde"
                type="time"
                value={horaDesde}
                onChange={(e) => setHoraDesde(e.target.value)}
                disabled={camposDeshabilitados}
                className={submitted && errors.horaDesde ? "border-red-500 focus:ring-red-500" : ""}
              />
            </div>
            {(submitted && errors.fechaDesde) && <p className="text-red-500 text-xs mt-1">{errors.fechaDesde}</p>}
            {(submitted && errors.horaDesde) && <p className="text-red-500 text-xs mt-1">{errors.horaDesde}</p>}
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">
              {visitaRecurrente ? "Fecha de fin" : "Hasta"}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={toDateInputValue(fechaHasta)}
                onChange={(e) => setFechaHasta(e.target.value ? new Date(e.target.value) : undefined)}
                disabled={camposDeshabilitados}
                className={submitted && errors.fechaHasta ? "border-red-500 focus:ring-red-500" : ""}
              />
              <Input
                id="horaHasta"
                type="time"
                value={horaHasta}
                onChange={(e) => setHoraHasta(e.target.value)}
                disabled={camposDeshabilitados}
                className={submitted && errors.horaHasta ? "border-red-500 focus:ring-red-500" : ""}
              />
            </div>
            {(submitted && errors.fechaHasta) && <p className="text-red-500 text-xs mt-1">{errors.fechaHasta}</p>}
            {(submitted && errors.horaHasta) && <p className="text-red-500 text-xs mt-1">{errors.horaHasta}</p>}
          </div>
        </div>

        {visitaRecurrente && configuracion.permiteVisitaRecurrente && (
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">Días de la semana</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-7 gap-4">
                {diasDeLaSemana.map((dia) => (
                  <div key={dia} className="flex items-center justify-center space-x-2">
                    <Checkbox
                      id={`dia-${dia}`}
                      checked={diasSemana.includes(dia)}
                      onCheckedChange={(checked) => {
                        if (checked) setDiasSemana([...diasSemana, dia])
                        else setDiasSemana(diasSemana.filter((d) => d !== dia))
                      }}
                    />
                    <Label htmlFor={`dia-${dia}`} className="text-sm font-normal text-center">{dia}</Label>
                  </div>
                ))}
              </div>
              {submitted && diasSemana.length === 0 && (
                <p className="text-red-500 text-xs mt-2">Debe seleccionar al menos un día de la semana</p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href={backUrl}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">{modoEdicion ? "Completar Visita" : "Nueva Visita"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderInformacionBasica()}
        {renderFechasHorarios()}

        {/* Datos de contratación (Obras/Mantenimiento) */}
        {showDatosContratacion && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Datos de contratación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="tipoContratacion" className="text-sm font-medium text-gray-700 mb-1 block">
                  Tipo de contratación
                </Label>
                <Select
                  value={tipoContratacion}
                  onValueChange={(value) => {
                    setTipoContratacion(value)
                    setNumeroExpediente("")
                    setNumeroOrdenCompra("")
                  }}
                >
                  <SelectTrigger
                    id="tipoContratacion"
                    className={`w-full ${submitted && errors.tipoContratacion ? "border-red-500 focus:ring-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposContratacionResuelto.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && errors.tipoContratacion && (
                  <p className="text-red-500 text-xs mt-1">{errors.tipoContratacion}</p>
                )}
              </div>

              {tipoContratacion === "Licitación" && (
                <div>
                  <Label htmlFor="numeroExpediente" className="text-sm font-medium text-gray-700 mb-1 block">
                    Número de expediente
                  </Label>
                  <Input
                    id="numeroExpediente"
                    value={numeroExpediente}
                    onChange={(e) => setNumeroExpediente(e.target.value)}
                    placeholder="Ej: EXP-2024-001"
                    className={`w-full ${submitted && errors.numeroExpediente ? "border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {submitted && errors.numeroExpediente && (
                    <p className="text-red-500 text-xs mt-1">{errors.numeroExpediente}</p>
                  )}
                </div>
              )}

              {tipoContratacion === "Directa" && (
                <div>
                  <Label htmlFor="numeroOrdenCompra" className="text-sm font-medium text-gray-700 mb-1 block">
                    Número de orden de compra
                  </Label>
                  <Input
                    id="numeroOrdenCompra"
                    value={numeroOrdenCompra}
                    onChange={(e) => setNumeroOrdenCompra(e.target.value)}
                    placeholder="Ej: OC-2024-001"
                    className={`w-full ${submitted && errors.numeroOrdenCompra ? "border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {submitted && errors.numeroOrdenCompra && (
                    <p className="text-red-500 text-xs mt-1">{errors.numeroOrdenCompra}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Información de transporte (Transporte Cargas y Servicio a buques) */}
        {showInfoTransporte && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Información de transporte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="operacion" className="text-sm font-medium text-gray-700 mb-1 block">Operación</Label>
                <Select value={operacion} onValueChange={setOperacion}>
                  <SelectTrigger id="operacion" className={submitted && errors.operacion ? "border-red-500 focus:ring-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar operación" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposOperacionResuelto.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && errors.operacion && <p className="text-red-500 text-xs mt-1">{errors.operacion}</p>}
              </div>
              <div>
                <Label htmlFor="tipoCarga" className="text-sm font-medium text-gray-700 mb-1 block">Tipo de carga</Label>
                <Select value={tipoCarga} onValueChange={setTipoCarga}>
                  <SelectTrigger id="tipoCarga" className={submitted && errors.tipoCarga ? "border-red-500 focus:ring-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar tipo de carga" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposCargaResuelto.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && errors.tipoCarga && <p className="text-red-500 text-xs mt-1">{errors.tipoCarga}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Transporte terciarizado</Label>
                <Select value={transporteTerciarizado ? "Sí" : "No"} onValueChange={(v) => setTransporteTerciarizado(v === "Sí")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sí">Sí</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {tipoCarga === "Otro" && (
                <div className="col-span-3">
                  <Label htmlFor="otroTipoCarga" className="text-sm font-medium text-gray-700 mb-1 block">Especifique el tipo de carga</Label>
                  <Input
                    id="otroTipoCarga"
                    value={otroTipoCarga}
                    onChange={(e) => setOtroTipoCarga(e.target.value)}
                    placeholder="Describa el tipo de carga"
                    className={submitted && errors.otroTipoCarga ? "border-red-500 focus:ring-red-500" : ""}
                  />
                  {submitted && errors.otroTipoCarga && <p className="text-red-500 text-xs mt-1">{errors.otroTipoCarga}</p>}
                </div>
              )}
            </div>
            {transporteTerciarizado && (
              <div className="mt-4">
                <Label htmlFor="empresaTransporte" className="text-sm font-medium text-gray-700 mb-1 block">Nombre de la empresa</Label>
                <Input
                  id="empresaTransporte"
                  value={empresaTransporte}
                  onChange={(e) => setEmpresaTransporte(e.target.value)}
                  placeholder="Nombre de la empresa"
                  className={`max-w-md ${submitted && errors.empresaTransporte ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {submitted && errors.empresaTransporte && <p className="text-red-500 text-xs mt-1">{errors.empresaTransporte}</p>}
              </div>
            )}
          </div>
        )}

        {/* Persona Responsable del Puerto (según config y destino/acceso muelle) */}
        {configuracion.muestraPersonaResponsable &&
        (destinosConPersonaResponsable.includes(destino) ||
          (configuracion.permiteAccesoAMuelleCheckbox && accesoAMuelle)) ? (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Persona Responsable</h2>
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
                    {personasResponsablesResuelto.map((persona) => (
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
            </div>
          ) : null}

        {/* Sección Proveedor */}
        {showProveedorSeccion && (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" ref={proveedorSuggestionsRef}>
              <div className="relative">
                <Label htmlFor="razonSocial" className="text-sm font-medium text-gray-700 mb-1 block">
                  Razón Social
                </Label>
                <Input
                  id="razonSocial"
                  value={razonSocial}
                  onChange={(e) => {
                    setRazonSocial(e.target.value)
                    if (!proveedorNoInscripto && !camposProveedorDeshabilitados) {
                      buscarProveedorPorRazonSocial(e.target.value)
                    }
                  }}
                  placeholder="Nombre de la empresa"
                  disabled={camposProveedorDeshabilitados && !proveedorNoInscripto}
                  className={`w-full ${submitted && errors.razonSocial ? "border-red-500 focus:ring-red-500" : ""} ${
                    camposProveedorDeshabilitados && !proveedorNoInscripto ? "bg-gray-100 text-gray-500" : ""
                  }`}
                />
                {showProveedorSuggestions && !camposProveedorDeshabilitados && (
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
                {submitted && errors.razonSocial && (
                  <p className="text-red-500 text-xs mt-1">{errors.razonSocial}</p>
                )}
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
                    if (!camposProveedorDeshabilitados && !proveedorNoInscripto) {
                      buscarProveedorPorCuit(e.target.value)
                    }
                  }}
                  placeholder="XX-XXXXXXXX-X"
                  disabled={camposProveedorDeshabilitados && !proveedorNoInscripto}
                  className={`w-full ${submitted && errors.cuitProveedor ? "border-red-500 focus:ring-red-500" : ""} ${
                    camposProveedorDeshabilitados && !proveedorNoInscripto ? "bg-gray-100 text-gray-500" : ""
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
                  disabled={camposProveedorDeshabilitados && !proveedorNoInscripto}
                  className={`w-full ${submitted && errors.emailProveedor ? "border-red-500 focus:ring-red-500" : ""} ${
                    camposProveedorDeshabilitados && !proveedorNoInscripto ? "bg-gray-100 text-gray-500" : ""
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
                  disabled={camposProveedorDeshabilitados && !proveedorNoInscripto}
                  className={`w-full ${submitted && errors.telefonoProveedor ? "border-red-500 focus:ring-red-500" : ""} ${
                    camposProveedorDeshabilitados && !proveedorNoInscripto ? "bg-gray-100 text-gray-500" : ""
                  }`}
                />
                {submitted && errors.telefonoProveedor && (
                  <p className="text-red-500 text-xs mt-1">{errors.telefonoProveedor}</p>
                )}
              </div>
            </div>
            {camposProveedorDeshabilitados && (
              <Button type="button" variant="outline" onClick={limpiarDatosProveedor} className="text-sm">
                Limpiar datos
              </Button>
            )}
            {proveedorEncontrado && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  ✓ Proveedor encontrado: <strong>{proveedorEncontrado.razonSocial}</strong>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sección de conductor (oculta por defecto; mostrar solo si showSeccionConductor) */}
        {showSeccionConductor && configuracion.conductoresCargados && (
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
                      {configuracion.conductoresCargados.map((conductor) => (
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
                    onClick={agregarConductor}
                    disabled={!conductorSeleccionado}
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white"
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
              {submitted && errors.conductor && (
                <p className="text-red-500 text-sm mt-2">{errors.conductor}</p>
              )}
            </div>
          )}

        {/* Sección Personas que asistirán (sin tipo, Laboral, Guiada) */}
        {showSeccionPersonas && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Personas que asistirán</h2>
              <div className="flex space-x-2">
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
                {tipoVisita === "Guiada" && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center"
                    onClick={() => document.getElementById("xlsx-upload")?.click()}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Cargar listado
                  </Button>
                )}
                <input
                  id="xlsx-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleXlsxUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className={configuracion.autocompletadoPersonal ? "relative" : ""}>
                <Label htmlFor="nombrePersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Nombre completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombrePersona"
                  value={nombrePersona}
                  onChange={(e) => {
                    setNombrePersona(e.target.value)
                    if (configuracion.autocompletadoPersonal) {
                      filtrarSugerencias(e.target.value)
                    }
                  }}
                  placeholder="Nombre completo"
                  required
                />
                {configuracion.autocompletadoPersonal && showSugerencias && nombreSugerencias.length > 0 && (
                  <div
                    ref={autocompletadoRef}
                    className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto"
                  >
                    {nombreSugerencias.map((persona) => (
                      <div
                        key={persona.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => seleccionarSugerencia(persona)}
                      >
                        {persona.nombreCompleto} - {persona.dni}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="documentoPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  DNI <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="documentoPersona"
                  value={documentoPersona}
                  onChange={(e) => setDocumentoPersona(e.target.value)}
                  placeholder="Número de documento"
                  required
                />
              </div>
              {configuracion.muestraCampoEmpresaPersona && (
                <div>
                  <Label htmlFor="empresaPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                    Empresa
                  </Label>
                  <Input
                    id="empresaPersona"
                    value={empresaPersona}
                    onChange={(e) => setEmpresaPersona(e.target.value)}
                    placeholder="Nombre de la empresa"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="correoPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Correo
                </Label>
                <Input
                  id="correoPersona"
                  type="email"
                  value={correoPersona}
                  onChange={(e) => setCorreoPersona(e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              {configuracion.muestraCampoTelefonoPersona !== false && (
                <div>
                  <Label htmlFor="telefonoPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                    Teléfono
                  </Label>
                  <Input
                    id="telefonoPersona"
                    value={telefonoPersona}
                    onChange={(e) => setTelefonoPersona(e.target.value)}
                    placeholder="Número de teléfono"
                  />
                </div>
              )}
            </div>

            {/* Checkbox Responsable (coordinador del grupo) solo para Guiada */}
            {tipoVisita === "Guiada" && (
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="esResponsable"
                    checked={esResponsable}
                    onCheckedChange={(checked) => setEsResponsable(checked as boolean)}
                  />
                  <Label htmlFor="esResponsable" className="text-sm font-medium text-gray-700">
                    Responsable (Coordinador del grupo)
                  </Label>
                </div>
              </div>
            )}

            {personas.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre completo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">DNI</th>
                      {configuracion.muestraCampoEmpresaPersona && (
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Empresa</th>
                      )}
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Correo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Teléfono</th>
                      {tipoVisita === "Guiada" && (
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Responsable</th>
                      )}
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((persona) => (
                      <tr key={persona.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{persona.nombre}</td>
                        <td className="py-3 px-4">{persona.documento}</td>
                        {configuracion.muestraCampoEmpresaPersona && (
                          <td className="py-3 px-4">{persona.empresa || "-"}</td>
                        )}
                        <td className="py-3 px-4">{persona.correo || "-"}</td>
                        <td className="py-3 px-4">{persona.telefono || "-"}</td>
                        {tipoVisita === "Guiada" && (
                          <td className="py-3 px-4 text-center">
                            {persona.responsable ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Sí
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        )}
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
              submitted && errors.personas && (
                <p className="text-red-500 text-sm mt-2">{errors.personas}</p>
              )
            )}
          </div>
        )}

        {/* Sección Vehículos (externos: selector de cargados + Nuevo Vehículo; solo si hay tipo y no es Laboral) */}
        {showSeccionVehiculos && configuracion.vehiculosCargados && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
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
                    {configuracion.vehiculosCargados.map((v) => (
                      <SelectItem key={v.id} value={v.id.toString()}>
                        {v.patente} - {v.tipo}{v.marca ? ` - ${v.marca}` : ""}{v.modelo ? ` ${v.modelo}` : ""}
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
                  onClick={agregarVehiculo}
                  disabled={!vehiculoSeleccionado}
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white"
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
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Patente</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tipo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Marca</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Modelo</th>
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
            ) : null}
            {submitted && errors.vehiculos && <p className="text-red-500 text-sm mt-2">{errors.vehiculos}</p>}
          </div>
        )}

        {/* Documentación (visible cuando hay tipo de visita y la config lo permite) */}
        {showSeccionDocumentacion && configuracion.muestraDocumentacion && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Documentación</h2>
              <Button
                type="button"
                variant="outline"
                onClick={agregarDocumento}
                className="flex items-center"
                disabled={!archivoDocumento || !tipoDocumento}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Documento
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label
                  htmlFor="tipoDocumento"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Tipo de Documento
                </Label>
                <Select value={tipoDocumento} onValueChange={setTipoDocumento}>
                  <SelectTrigger id="tipoDocumento">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ART">ART</SelectItem>
                    <SelectItem value="Seguro">Seguro</SelectItem>
                    <SelectItem value="Certificado">Certificado</SelectItem>
                    <SelectItem value="Permiso">Permiso</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="documentoInput" className="text-sm font-medium text-gray-700 mb-1 block">
                  Archivo
                </Label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                  <label htmlFor="documentoInput" className="flex items-center cursor-pointer w-full">
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">
                      {archivoDocumento ? archivoDocumento.name : "Seleccionar archivo"}
                    </span>
                  </label>
                  <input
                    id="documentoInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setArchivoDocumento(e.target.files[0])
                      }
                    }}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
              </div>
            </div>

            {documentos.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tipo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentos.map((documento) => (
                      <tr key={documento.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{documento.tipo}</td>
                        <td className="py-3 px-4">{documento.nombre}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarDocumento(documento.id)}
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
              <p className="text-gray-500 text-sm italic">
                No hay documentos cargados. Agregue documentos como ART, seguros, certificados u otros permisos
                necesarios.
              </p>
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
            className="w-full"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => onCancel?.()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white">
            Enviar Solicitud
          </Button>
        </div>
      </form>

      {/* Modal para agregar nuevo conductor */}
      {configuracion.conductoresCargados && (
        <Dialog open={isNewConductorModalOpen} onOpenChange={setIsNewConductorModalOpen}>
          <DialogContent className="sm:max-w-md">
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
                  id: (configuracion.conductoresCargados?.length || 0) + 1,
                  nombre: nombreConductor,
                  dni: dniConductor,
                  telefono: telefonoConductor,
                  email: emailConductor || "",
                  numeroLicencia: numeroLicencia,
                  categorias: categoriasSeleccionadas,
                  licencia: licenciaConducir ? licenciaConducir.name : "sin_licencia.pdf",
                  fechaVencimientoLicencia: fechaVencimientoLicencia
                    ? fechaVencimientoLicencia.toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0],
                }

                // Actualizar la lista de conductores (esto debería ir al estado global o a la configuración)
                // Por ahora, solo agregamos a la lista local
                if (configuracion.conductoresCargados) {
                  configuracion.conductoresCargados.push(nuevoConductor)
                }

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
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="nombreConductor">Nombre Completo</Label>
                  <Input
                    id="nombreConductor"
                    value={nombreConductor}
                    onChange={(e) => setNombreConductor(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dniConductor">DNI</Label>
                  <Input
                    id="dniConductor"
                    value={dniConductor}
                    onChange={(e) => setDniConductor(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefonoConductor">Teléfono</Label>
                  <Input
                    id="telefonoConductor"
                    value={telefonoConductor}
                    onChange={(e) => setTelefonoConductor(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="numeroLicencia">N° de Licencia</Label>
                  <Input
                    id="numeroLicencia"
                    value={numeroLicencia}
                    onChange={(e) => setNumeroLicencia(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Categorías de Licencia</Label>
                <div className="border border-gray-300 rounded-md p-4 mt-1">
                  <p className="text-sm text-gray-500 mb-2">Seleccione todas las categorías que apliquen:</p>
                  <div className="grid grid-cols-7 gap-2">
                    {categoriasLicenciaResuelto.map((categoria) => (
                      <div key={categoria} className="flex items-center space-x-2">
                        <Checkbox
                          id={`categoria-${categoria}`}
                          checked={categoriasSeleccionadas.includes(categoria)}
                          onCheckedChange={() => handleCategoriaChange(categoria)}
                        />
                        <Label htmlFor={`categoria-${categoria}`} className="text-sm">
                          {categoria}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {(categoriasSeleccionadas.length === 0 || errorCategorias) && (
                    <p className="text-red-500 text-xs mt-2">
                      {errorCategorias || "Seleccione al menos una categoría"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="fecha-vencimiento-licencia">Fecha Vencimiento Licencia</Label>
                <Input
                  id="fecha-vencimiento-licencia"
                  type="date"
                  value={toDateInputValue(fechaVencimientoLicencia)}
                  onChange={(e) =>
                    setFechaVencimientoLicencia(e.target.value ? new Date(e.target.value) : undefined)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="licencia">Licencia de Conducir</Label>
                <div className="flex items-center">
                  <label
                    htmlFor="licencia"
                    className="flex items-center justify-center w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Seleccionar archivo</span>
                  </label>
                  <input
                    id="licencia"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setLicenciaConducir)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {licenciaConducir ? licenciaConducir.name : "Ningún archivo seleccionado"}
                </p>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewConductorModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 text-white"
                  disabled={categoriasSeleccionadas.length === 0}
                >
                  Guardar Conductor
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal para agregar nuevo vehículo */}
      <Dialog open={isNewVehiculoModalOpen} onOpenChange={setIsNewVehiculoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nuevo Vehículo</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              const nuevoVehiculo = {
                id: (configuracion.vehiculosCargados?.length || 0) + 1,
                tipo: tipoVehiculo || "Auto",
                patente: patenteVehiculo,
                marca: marcaVehiculo || "",
                modelo: modeloVehiculo || "",
                titular: titularVehiculo,
                seguro: seguroVehiculo ? seguroVehiculo.name : "sin_seguro.pdf",
                fechaVencimientoSeguro: fechaVencimientoSeguro
                  ? fechaVencimientoSeguro.toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0],
              }

              // Actualizar la lista de vehículos (esto debería ir al estado global o a la configuración)
              // Por ahora, solo agregamos a la lista local
              if (configuracion.vehiculosCargados) {
                configuracion.vehiculosCargados.push(nuevoVehiculo)
              }

              // Limpiar campos
              setTipoVehiculo("")
              setPatenteVehiculo("")
              setMarcaVehiculo("")
              setModeloVehiculo("")
              setTitularVehiculo("")
              setSeguroVehiculo(null)
              setCedulaVerde(null)
              setFechaVencimientoSeguro(undefined)
              setConductorNoTitular(false)

              setIsNewVehiculoModalOpen(false)
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipoVehiculo">Tipo</Label>
                <Select value={tipoVehiculo} onValueChange={setTipoVehiculo}>
                  <SelectTrigger id="tipoVehiculo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposVehiculoResuelto.map((tipo) => (
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
                <Input
                  id="marcaVehiculo"
                  value={marcaVehiculo}
                  onChange={(e) => setMarcaVehiculo(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="modeloVehiculo">Modelo</Label>
                <Input
                  id="modeloVehiculo"
                  value={modeloVehiculo}
                  onChange={(e) => setModeloVehiculo(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="titularVehiculo">Nombre completo del titular</Label>
              <Input
                id="titularVehiculo"
                value={titularVehiculo}
                onChange={(e) => setTitularVehiculo(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="cedulaVerde">Cédula Verde</Label>
              <div className="flex items-center">
                <label
                  htmlFor="cedulaVerde"
                  className="flex items-center justify-center w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Seleccionar archivo</span>
                </label>
                <input
                  id="cedulaVerde"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setCedulaVerde)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {cedulaVerde ? cedulaVerde.name : "Ningún archivo seleccionado"}
              </p>
            </div>

            <div>
              <Label htmlFor="seguroVehiculo">Seguro</Label>
              <div className="flex items-center">
                <label
                  htmlFor="seguroVehiculo"
                  className="flex items-center justify-center w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Seleccionar archivo</span>
                </label>
                <input
                  id="seguroVehiculo"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setSeguroVehiculo)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {seguroVehiculo ? seguroVehiculo.name : "Ningún archivo seleccionado"}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="conductorNoTitular"
                checked={conductorNoTitular}
                onCheckedChange={(checked) => setConductorNoTitular(checked as boolean)}
              />
              <Label htmlFor="conductorNoTitular">El vehículo lo conduce alguien que no es el titular</Label>
            </div>

            <div>
              <Label htmlFor="fecha-vencimiento-seguro">Fecha Vencimiento Seguro</Label>
              <Input
                id="fecha-vencimiento-seguro"
                type="date"
                value={toDateInputValue(fechaVencimientoSeguro)}
                onChange={(e) =>
                  setFechaVencimientoSeguro(e.target.value ? new Date(e.target.value) : undefined)
                }
                className="w-full"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsNewVehiculoModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white">
                Guardar Vehículo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

