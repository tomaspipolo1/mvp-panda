"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, User, Building, MapPin, Phone, CreditCard, Users, Truck, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Interfaces for document structure
interface DocumentoConFechas {
  id: string
  nombre: string
  archivo?: File
  fechaEmision?: string
  fechaVencimiento?: string
  requerido: boolean
  condicional?: boolean // Para documentos que solo aparecen bajo ciertas condiciones
  estado?: 'pendiente' | 'completado' | 'rechazado'
  fechaCarga?: string
}

interface DocumentacionSeccion {
  personal: DocumentoConFechas[]
  general: DocumentoConFechas[]
  seguros: DocumentoConFechas[]
  facturacion: DocumentoConFechas[]
}

export function FormularioNuevaSolicitudEmpresaServiciosPortuarios() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("datos-personales")
  const [personalSeleccionado, setPersonalSeleccionado] = useState<string[]>([])
  const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState<string[]>([])
  const [busquedaPersonal, setBusquedaPersonal] = useState("")
  const [busquedaVehiculos, setBusquedaVehiculos] = useState("")
  
  // Definir los documentos requeridos
  const documentosRequeridos: DocumentacionSeccion = {
    personal: [
      { id: "copia-dni", nombre: "Copia DNI *", requerido: true, estado: 'pendiente' },
      { id: "certificado-apoderado", nombre: "Certificado apoderado *", requerido: false, condicional: true, estado: 'pendiente' },
      { id: "declaracion-jurada", nombre: "Declaración jurada copia fiel (del apoderado) *", requerido: false, condicional: true, estado: 'pendiente' },
    ],
    general: [
      { id: "arca", nombre: "Régimen tributario ARCA *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' },
      { id: "arba", nombre: "Régimen tributario ARBA *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' },
      { id: "convenio-multilateral", nombre: "Convenio multilateral *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' },
      { id: "exenciones-impositivas", nombre: "Exenciones impositivas *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' },
      { id: "sistema-cuenta-tributaria", nombre: "Sistema cuenta tributaria (Estado de cumplimiento) *", requerido: true, fechaEmision: "", estado: 'pendiente' },
      { id: "constancia-inscripcion", nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' },
      { id: "certificado-anotaciones", nombre: "Certificado de Anotaciones Personales *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' },
      { id: "informe-juicio-universales", nombre: "Informe Juicio Universales *", requerido: true, fechaEmision: "", estado: 'pendiente' },
    ],
    seguros: [
      { id: "art-personal", nombre: "ART Personal *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' },
      { id: "responsable-seguridad", nombre: "Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo *", requerido: true, estado: 'pendiente' },
    ],
    facturacion: [
      { id: "factura-inscripcion", nombre: "Factura Inscripción *", requerido: true, estado: 'pendiente' },
      { id: "comprobante-pago-factura", nombre: "Comprobante de Pago factura *", requerido: true, estado: 'pendiente' },
    ],
  }

  // Función para obtener documentos generales según la naturaleza de la organización
  const getDocumentosGenerales = (naturalezaOrganizacion: string, tipoSocietario: string = ""): DocumentoConFechas[] => {
    const documentosBase = [
      { id: "arca", nombre: "Régimen tributario ARCA *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
      { id: "arba", nombre: "Régimen tributario ARBA *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
      { id: "convenio-multilateral", nombre: "Convenio multilateral *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
      { id: "exenciones-impositivas", nombre: "Exenciones impositivas *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
      { id: "sistema-cuenta-tributaria", nombre: "Sistema cuenta tributaria (Estado de cumplimiento) *", requerido: true, fechaEmision: "", estado: 'pendiente' as const },
      { id: "constancia-inscripcion", nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
      { id: "certificado-anotaciones", nombre: "Certificado de Anotaciones Personales *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
      { id: "informe-juicio-universales", nombre: "Informe Juicio Universales *", requerido: true, fechaEmision: "", estado: 'pendiente' as const },
    ]

    if (naturalezaOrganizacion === "Sociedades legalmente Constituidas") {
      // Para sociedades legalmente constituidas, agregar documentos específicos
      const documentosSociedades = [
        ...documentosBase,
        { id: "contrato-social", nombre: "Contrato Social y modificaciones *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
        { id: "nota-modificacion-contrato", nombre: "Nota en caso de modificación de contrato *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
        { id: "acta-conformacion-organo-directivo", nombre: "Acta conformación Organo Directivo, Designación de autoridades y distribución de cargos *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
        { id: "ultimos-2-balances", nombre: "Ultimos 2 balances *", requerido: true, fechaEmision: "", fechaVencimiento: "", estado: 'pendiente' as const },
      ]

      // Si además es Cooperativa, agregar documentos específicos de cooperativa
      if (tipoSocietario === "Cooperativa") {
        return [
          ...documentosSociedades,
          { id: "nomina-autoridades", nombre: "Nomina de autoridades *", requerido: true, fechaEmision: "", estado: 'pendiente' as const },
          { id: "nomina-todos-asociados", nombre: "Nomina de todos los asociados *", requerido: true, fechaEmision: "", estado: 'pendiente' as const },
          { id: "constancia-inscripcion-inaes", nombre: "Constancia inscripcion a INAES *", requerido: true, fechaEmision: "", estado: 'pendiente' as const },
          { id: "reglamento-interno-inaes", nombre: "Reglamento interno presentado ante INAES *", requerido: true, fechaEmision: "", estado: 'pendiente' as const },
        ]
      }

      return documentosSociedades
    } else {
      // Para persona física y sociedad de hecho, solo incluir documentos base
      return documentosBase
    }
  }

  // Función para obtener documentos personales según la naturaleza de la organización
  const getDocumentosPersonales = (naturalezaOrganizacion: string): DocumentoConFechas[] => {
    const documentosBase = [
      { id: "certificado-apoderado", nombre: "Certificado apoderado *", requerido: false, condicional: true, estado: 'pendiente' as const },
      { id: "declaracion-jurada", nombre: "Declaración jurada copia fiel (del apoderado) *", requerido: false, condicional: true, estado: 'pendiente' as const },
    ]

    if (naturalezaOrganizacion === "Sociedades legalmente Constituidas") {
      // Para sociedades legalmente constituidas, no incluir "Copia DNI" en documentos personales
      return documentosBase
    } else {
      // Para persona física y sociedad de hecho, incluir "Copia DNI" en documentos personales
      return [
        { id: "copia-dni", nombre: "Copia DNI *", requerido: true, estado: 'pendiente' as const },
        ...documentosBase,
      ]
    }
  }

  const [formData, setFormData] = useState({
    tipo: "",
    asunto: "",
    descripcion: "",
    de: "",
    tipoDato: "",
    naturalezaOrganizacion: "",
    tipoSocietario: "",
    archivos: [] as File[],
    // Datos Personales
    nombre: "",
    apellido: "",
    dni: "",
    apoderado: "",
    apoderadoNombre: "",
    apoderadoApellido: "",
    apoderadoDni: "",
    // Datos Generales
    razonSocial: "",
    cuit: "",
    nombreFantasia: "",
    ultimaActividad: "",
    convenioMultilateral: "",
    exencionesImpositivas: "",
    // Domicilios
    domicilioFiscal: "",
    domicilioComercial: "",
    // Contacto Comercial
    nombreCompleto: "",
    cargo: "",
    telefono: "",
    email: "",
    // Información Bancaria
    banco: "",
    tipoCuenta: "",
    numeroCuenta: "",
    cbu: "",
    // Personal
    personalSeleccionado: [] as string[],
    // Vehículos
    vehiculosSeleccionados: [] as string[],
    // Documentación
    documentacion: [] as File[],
    documentacionPersonal: [] as File[],
    documentacionGeneral: [] as File[],
    documentacionSeguros: [] as File[],
    // Nueva estructura de documentación con fechas
    documentacionPersonalDetallada: documentosRequeridos.personal.map(doc => ({ ...doc })),
    documentacionGeneralDetallada: getDocumentosGenerales("", "").map(doc => ({ ...doc })),
    documentacionSegurosDetallada: documentosRequeridos.seguros.map(doc => ({ ...doc })),
    documentacionFacturacionDetallada: documentosRequeridos.facturacion.map(doc => ({ ...doc })),
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (field === "naturalezaOrganizacion") {
        // Resetear tipoSocietario cuando cambie la naturaleza de la organización
        let tipoSocietarioDefault = ""
        if (value === "Persona fisica") {
          tipoSocietarioDefault = "Persona Fisica"
        } else if (value === "Sociedad de hecho") {
          tipoSocietarioDefault = "Sociedad de hecho"
        }
        
        // Actualizar documentos según la naturaleza de la organización
        const nuevosDocumentosPersonales = getDocumentosPersonales(value)
        const nuevosDocumentosGenerales = getDocumentosGenerales(value, tipoSocietarioDefault)
        
        return {
          ...prev,
          [field]: value,
          tipoSocietario: tipoSocietarioDefault,
          documentacionPersonalDetallada: nuevosDocumentosPersonales.map(doc => ({ ...doc })),
          documentacionGeneralDetallada: nuevosDocumentosGenerales.map(doc => ({ ...doc })),
        }
      } else if (field === "tipoSocietario") {
        // Actualizar documentos cuando cambie el tipo societario
        const nuevosDocumentosGenerales = getDocumentosGenerales(prev.naturalezaOrganizacion, value)
        
        return {
          ...prev,
          [field]: value,
          documentacionGeneralDetallada: nuevosDocumentosGenerales.map(doc => ({ ...doc })),
        }
      }
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        archivos: [...prev.archivos, ...filesArray],
      }))
    }
  }

  const handleDocumentacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        documentacion: [...prev.documentacion, ...filesArray],
      }))
    }
  }

  const handleDocumentacionPersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        documentacionPersonal: [...prev.documentacionPersonal, ...filesArray],
      }))
    }
  }

  const handleDocumentacionGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        documentacionGeneral: [...prev.documentacionGeneral, ...filesArray],
      }))
    }
  }

  const handleDocumentacionSegurosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        documentacionSeguros: [...prev.documentacionSeguros, ...filesArray],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      archivos: prev.archivos.filter((_, i) => i !== index),
    }))
  }

  const removeDocumentacion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documentacion: prev.documentacion.filter((_, i) => i !== index),
    }))
  }

  const removeDocumentacionPersonal = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documentacionPersonal: prev.documentacionPersonal.filter((_, i) => i !== index),
    }))
  }

  const removeDocumentacionGeneral = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documentacionGeneral: prev.documentacionGeneral.filter((_, i) => i !== index),
    }))
  }

  const removeDocumentacionSeguros = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documentacionSeguros: prev.documentacionSeguros.filter((_, i) => i !== index),
    }))
  }

  // Nuevos handlers para la documentación detallada
  const handleDocumentoPersonalChange = (documentoId: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documentacionPersonalDetallada: prev.documentacionPersonalDetallada.map(doc =>
        doc.id === documentoId ? { 
          ...doc, 
          archivo: file, 
          estado: 'completado',
          fechaCarga: new Date().toISOString().split('T')[0]
        } : doc
      ),
    }))
  }

  const handleDocumentoGeneralChange = (documentoId: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documentacionGeneralDetallada: prev.documentacionGeneralDetallada.map(doc =>
        doc.id === documentoId ? { 
          ...doc, 
          archivo: file, 
          estado: 'completado',
          fechaCarga: new Date().toISOString().split('T')[0]
        } : doc
      ),
    }))
  }

  const handleDocumentoSegurosChange = (documentoId: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documentacionSegurosDetallada: prev.documentacionSegurosDetallada.map(doc =>
        doc.id === documentoId ? { 
          ...doc, 
          archivo: file, 
          estado: 'completado',
          fechaCarga: new Date().toISOString().split('T')[0]
        } : doc
      ),
    }))
  }

  const handleDocumentoFacturacionChange = (documentoId: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documentacionFacturacionDetallada: prev.documentacionFacturacionDetallada.map(doc =>
        doc.id === documentoId ? { 
          ...doc, 
          archivo: file, 
          estado: 'completado',
          fechaCarga: new Date().toISOString().split('T')[0]
        } : doc
      ),
    }))
  }

  const handleDocumentoFechaChange = (seccion: 'personal' | 'general' | 'seguros' | 'facturacion', documentoId: string, campo: 'fechaEmision' | 'fechaVencimiento', valor: string) => {
    setFormData((prev) => {
      if (seccion === 'personal') {
        return {
          ...prev,
          documentacionPersonalDetallada: prev.documentacionPersonalDetallada.map(doc =>
            doc.id === documentoId ? { ...doc, [campo]: valor } : doc
          ),
        }
      } else if (seccion === 'general') {
        return {
          ...prev,
          documentacionGeneralDetallada: prev.documentacionGeneralDetallada.map(doc =>
            doc.id === documentoId ? { ...doc, [campo]: valor } : doc
          ),
        }
      } else if (seccion === 'seguros') {
        return {
          ...prev,
          documentacionSegurosDetallada: prev.documentacionSegurosDetallada.map(doc =>
            doc.id === documentoId ? { ...doc, [campo]: valor } : doc
          ),
        }
      } else if (seccion === 'facturacion') {
        return {
          ...prev,
          documentacionFacturacionDetallada: prev.documentacionFacturacionDetallada.map(doc =>
            doc.id === documentoId ? { ...doc, [campo]: valor } : doc
          ),
        }
      }
      return prev
    })
  }

  const removeDocumentoPersonal = (documentoId: string) => {
    setFormData((prev) => ({
      ...prev,
      documentacionPersonalDetallada: prev.documentacionPersonalDetallada.map(doc =>
        doc.id === documentoId ? { 
          ...doc, 
          archivo: undefined, 
          estado: 'pendiente',
          fechaCarga: undefined
        } : doc
      ),
    }))
  }

  const removeDocumentoGeneral = (documentoId: string) => {
    setFormData((prev) => ({
      ...prev,
      documentacionGeneralDetallada: prev.documentacionGeneralDetallada.map(doc =>
        doc.id === documentoId ? { 
          ...doc, 
          archivo: undefined, 
          estado: 'pendiente',
          fechaCarga: undefined
        } : doc
      ),
    }))
  }

  const removeDocumentoSeguros = (documentoId: string) => {
    setFormData((prev) => ({
      ...prev,
      documentacionSegurosDetallada: prev.documentacionSegurosDetallada.map(doc =>
        doc.id === documentoId ? { 
          ...doc, 
          archivo: undefined, 
          estado: 'pendiente',
          fechaCarga: undefined
        } : doc
      ),
    }))
  }

  const removeDocumentoFacturacion = (documentoId: string) => {
    setFormData((prev) => ({
      ...prev,
      documentacionFacturacionDetallada: prev.documentacionFacturacionDetallada.map(doc =>
        doc.id === documentoId ? { 
          ...doc, 
          archivo: undefined, 
          estado: 'pendiente',
          fechaCarga: undefined
        } : doc
      ),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.tipo) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    // Validación adicional para cambio de datos
    if (formData.tipo === "cambio_datos" && (!formData.de || !formData.tipoDato)) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos para el cambio de datos.",
        variant: "destructive",
      })
      return
    }

    // Validación adicional para inscripción y reinscripción
    if ((formData.tipo === "inscripcion" || formData.tipo === "reinscripcion") && 
        (!formData.naturalezaOrganizacion || !formData.tipoSocietario)) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos para la inscripción/reinscripción.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar la solicitud al backend
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulación de envío

      toast({
        title: "Solicitud enviada",
        description: "Su solicitud ha sido enviada correctamente.",
      })

      // Redireccionar a la página de mis solicitudes
      router.push("/empresa-servicios-portuarios/gestion/solicitudes/mis-solicitudes")
    } catch (error) {
      console.error("Error al enviar solicitud:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al enviar la solicitud. Por favor intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Funciones para manejar selección de personal
  const handlePersonalSeleccionar = (dni: string) => {
    setPersonalSeleccionado(prev => 
      prev.includes(dni) 
        ? prev.filter(p => p !== dni)
        : [...prev, dni]
    )
  }

  const handlePersonalSeleccionarTodos = () => {
    const dnisFiltrados = personalFiltrado.map(persona => persona.dni)
    const todosSeleccionados = dnisFiltrados.every(dni => personalSeleccionado.includes(dni))
    
    if (todosSeleccionados) {
      // Deseleccionar todos los filtrados
      setPersonalSeleccionado(prev => prev.filter(dni => !dnisFiltrados.includes(dni)))
    } else {
      // Seleccionar todos los filtrados
      setPersonalSeleccionado(prev => [...new Set([...prev, ...dnisFiltrados])])
    }
  }

  // Funciones para manejar selección de vehículos
  const handleVehiculoSeleccionar = (patente: string) => {
    setVehiculosSeleccionados(prev => 
      prev.includes(patente) 
        ? prev.filter(v => v !== patente)
        : [...prev, patente]
    )
  }

  const handleVehiculoSeleccionarTodos = () => {
    const patentesFiltradas = vehiculosFiltrados.map(vehiculo => vehiculo.patente)
    const todosSeleccionados = patentesFiltradas.every(patente => vehiculosSeleccionados.includes(patente))
    
    if (todosSeleccionados) {
      // Deseleccionar todos los filtrados
      setVehiculosSeleccionados(prev => prev.filter(patente => !patentesFiltradas.includes(patente)))
    } else {
      // Seleccionar todos los filtrados
      setVehiculosSeleccionados(prev => [...new Set([...prev, ...patentesFiltradas])])
    }
  }

  // Datos de ejemplo para personal y vehículos
  const datosPersonal = [
    { nombre: "Juan Pérez", dni: "12345678", telefono: "+54 11 1234-5678" },
    { nombre: "María González", dni: "87654321", telefono: "+54 11 8765-4321" },
    { nombre: "Carlos Rodríguez", dni: "11223344", telefono: "+54 11 1122-3344" },
    { nombre: "Ana Martínez", dni: "55667788", telefono: "+54 11 5566-7788" },
    { nombre: "Luis Fernández", dni: "99887766", telefono: "+54 11 9988-7766" },
  ]

  const datosVehiculos = [
    { tipo: "Camión", patente: "ABC123", marca: "Mercedes-Benz" },
    { tipo: "Furgón", patente: "XYZ789", marca: "Ford" },
    { tipo: "Camioneta", patente: "DEF456", marca: "Toyota" },
    { tipo: "Camión", patente: "GHI789", marca: "Volvo" },
    { tipo: "Furgón", patente: "JKL012", marca: "Renault" },
  ]

  // Filtrar datos según la búsqueda
  const personalFiltrado = datosPersonal.filter(persona =>
    persona.nombre.toLowerCase().includes(busquedaPersonal.toLowerCase())
  )

  const vehiculosFiltrados = datosVehiculos.filter(vehiculo =>
    vehiculo.tipo.toLowerCase().includes(busquedaVehiculos.toLowerCase()) ||
    vehiculo.marca.toLowerCase().includes(busquedaVehiculos.toLowerCase()) ||
    vehiculo.patente.toLowerCase().includes(busquedaVehiculos.toLowerCase())
  )

  const isInscripcionOrReinscripcion = formData.tipo === "inscripcion" || formData.tipo === "reinscripcion"
  const isPersonaFisica = formData.naturalezaOrganizacion === "Persona fisica"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <p className="text-gray-600">Complete los datos para generar una nueva solicitud</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="tipo" className="text-base font-medium">
              Tipo de Solicitud
            </Label>
            <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
              <SelectTrigger id="tipo" className="w-full mt-1">
                <SelectValue placeholder="Seleccionar tipo de solicitud" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inscripcion">Inscripción</SelectItem>
                <SelectItem value="reinscripcion">Reinscripción</SelectItem>
                <SelectItem value="cambio_datos">Cambio de datos</SelectItem>
                <SelectItem value="reclamo">Reclamo</SelectItem>
                <SelectItem value="consulta">Consulta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campos específicos para Inscripción y Reinscripción */}
          {isInscripcionOrReinscripcion && (
            <>
              <div>
                <Label htmlFor="naturalezaOrganizacion" className="text-base font-medium">
                  Naturaleza de la Organización
                </Label>
                <Select value={formData.naturalezaOrganizacion} onValueChange={(value) => handleChange("naturalezaOrganizacion", value)}>
                  <SelectTrigger id="naturalezaOrganizacion" className="w-full mt-1">
                    <SelectValue placeholder="Seleccionar naturaleza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Persona fisica">Persona física</SelectItem>
                    <SelectItem value="Sociedad de hecho">Sociedad de hecho</SelectItem>
                    <SelectItem value="Sociedades legalmente Constituidas">Sociedades legalmente constituidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tipoSocietario" className="text-base font-medium">
                  Tipo Societario
                </Label>
                <Select value={formData.tipoSocietario} onValueChange={(value) => handleChange("tipoSocietario", value)}>
                  <SelectTrigger id="tipoSocietario" className="w-full mt-1">
                    <SelectValue placeholder="Seleccionar tipo societario" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.naturalezaOrganizacion === "Persona fisica" ? (
                      <SelectItem value="Persona Fisica">Persona Fisica</SelectItem>
                    ) : formData.naturalezaOrganizacion === "Sociedad de hecho" ? (
                      <SelectItem value="Sociedad de hecho">Sociedad de hecho</SelectItem>
                    ) : formData.naturalezaOrganizacion === "Sociedades legalmente Constituidas" ? (
                      <>
                        <SelectItem value="SRL">SRL</SelectItem>
                        <SelectItem value="SA">SA</SelectItem>
                        <SelectItem value="Sociedad por Acciones Simplificadas (S.A.S.)">Sociedad por Acciones Simplificadas (S.A.S.)</SelectItem>
                        <SelectItem value="Sociedad de Capital e Industria">Sociedad de Capital e Industria</SelectItem>
                        <SelectItem value="Sociedad Colectiva (S.C.)">Sociedad Colectiva (S.C.)</SelectItem>
                        <SelectItem value="Sociedad en Comandita Simple (S.C.S.)">Sociedad en Comandita Simple (S.C.S.)</SelectItem>
                        <SelectItem value="Sociedad en Comandita por Acciones (S.C.A.)">Sociedad en Comandita por Acciones (S.C.A.)</SelectItem>
                        <SelectItem value="Sociedad de Hecho">Sociedad de Hecho</SelectItem>
                        <SelectItem value="Uniones Transitorias (U.T.)">Uniones Transitorias (U.T.)</SelectItem>
                        <SelectItem value="Cooperativa">Cooperativa</SelectItem>
                      </>
                    ) : null}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        {formData.tipo === "cambio_datos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="de" className="text-base font-medium">
                De
              </Label>
              <Select value={formData.de} onValueChange={(value) => handleChange("de", value)}>
                <SelectTrigger id="de" className="w-full mt-1">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usuario">Usuario</SelectItem>
                  <SelectItem value="entidad">Entidad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tipoDato" className="text-base font-medium">
                Tipo de dato
              </Label>
              <Input
                id="tipoDato"
                value={formData.tipoDato}
                onChange={(e) => handleChange("tipoDato", e.target.value)}
                className="mt-1"
                placeholder="Ingrese el dato que desea modificar"
              />
            </div>
          </div>
        )}

        {/* Mostrar campos básicos solo si NO es Inscripción o Reinscripción */}
        {!isInscripcionOrReinscripcion && (
          <>
            <div>
              <Label htmlFor="asunto" className="text-base font-medium">
                Asunto
              </Label>
              <Input
                id="asunto"
                value={formData.asunto}
                onChange={(e) => handleChange("asunto", e.target.value)}
                className="mt-1"
                placeholder="Ingrese el asunto de su solicitud"
              />
            </div>

            <div>
              <Label htmlFor="descripcion" className="text-base font-medium">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                rows={6}
                className="mt-1 resize-none"
                placeholder="Describa detalladamente el motivo de su solicitud..."
              />
            </div>
          </>
        )}

        {/* Mostrar pestañas solo si es Inscripción o Reinscripción */}
        {isInscripcionOrReinscripcion && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="datos-personales" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Datos Personales
              </TabsTrigger>
              <TabsTrigger value="informacion-comercial" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Información Comercial
              </TabsTrigger>
              <TabsTrigger value="personal-vehiculos" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Personal/Vehículos
              </TabsTrigger>
              <TabsTrigger value="documentacion" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentación
              </TabsTrigger>
            </TabsList>

            <TabsContent value="datos-personales" className="space-y-8">
              {/* Datos Personales */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Datos Personales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nombre" className="text-base font-medium text-gray-500">
                      Nombre
                    </Label>
                    <Input
                      id="nombre"
                      value="Juan Carlos"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="apellido" className="text-base font-medium text-gray-500">
                      Apellido
                    </Label>
                    <Input
                      id="apellido"
                      value="González"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                </div>
                <div className={`grid gap-6 mt-6 ${formData.naturalezaOrganizacion !== "Sociedades legalmente Constituidas" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-1"}`}>
                  {/* Mostrar DNI solo si NO es "Sociedades legalmente Constituidas" */}
                  {formData.naturalezaOrganizacion !== "Sociedades legalmente Constituidas" && (
                    <div>
                      <Label htmlFor="dni" className="text-base font-medium text-gray-500">
                        DNI
                      </Label>
                      <Input
                        id="dni"
                        value="12345678"
                        className="mt-1 bg-gray-100 text-gray-500"
                        placeholder="Datos ya cargados"
                        disabled
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="apoderado" className="text-base font-medium">
                      Apoderado
                    </Label>
                    <Select value={formData.apoderado} onValueChange={(value) => handleChange("apoderado", value)}>
                      <SelectTrigger id="apoderado" className="w-full mt-1">
                        <SelectValue placeholder="Seleccionar apoderado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formData.apoderado === "si" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <Label htmlFor="apoderadoNombre" className="text-base font-medium">
                        Nombre del Apoderado
                      </Label>
                      <Input
                        id="apoderadoNombre"
                        value={formData.apoderadoNombre}
                        onChange={(e) => handleChange("apoderadoNombre", e.target.value)}
                        className="mt-1"
                        placeholder="Ingrese el nombre del apoderado"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apoderadoApellido" className="text-base font-medium">
                        Apellido del Apoderado
                      </Label>
                      <Input
                        id="apoderadoApellido"
                        value={formData.apoderadoApellido}
                        onChange={(e) => handleChange("apoderadoApellido", e.target.value)}
                        className="mt-1"
                        placeholder="Ingrese el apellido del apoderado"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apoderadoDni" className="text-base font-medium">
                        DNI del Apoderado
                      </Label>
                      <Input
                        id="apoderadoDni"
                        value={formData.apoderadoDni}
                        onChange={(e) => handleChange("apoderadoDni", e.target.value)}
                        className="mt-1"
                        placeholder="Ingrese el DNI del apoderado"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Datos Generales */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Datos Generales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="razonSocial" className="text-base font-medium text-gray-500">
                      Razón Social
                    </Label>
                    <Input
                      id="razonSocial"
                      value="Servicios Portuarios del Sur S.A."
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="cuit" className="text-base font-medium text-gray-500">
                      CUIT
                    </Label>
                    <Input
                      id="cuit"
                      value="30-12345678-9"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label htmlFor="nombreFantasia" className="text-base font-medium text-gray-500">
                      Nombre Fantasía
                    </Label>
                    <Input
                      id="nombreFantasia"
                      value="PuertoSur"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="ultimaActividad" className="text-base font-medium text-gray-500">
                      Última Actividad Realizada con el Puerto
                    </Label>
                    <Select value="empresa_actividad" disabled>
                      <SelectTrigger id="ultimaActividad" className="w-full mt-1 bg-gray-100 text-gray-500">
                        <SelectValue>Empresa ya en actividad</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nueva_empresa">Nueva empresa</SelectItem>
                        <SelectItem value="empresa_actividad">Empresa ya en actividad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label htmlFor="convenioMultilateral" className="text-base font-medium text-gray-500">
                      Convenio Multilateral
                    </Label>
                    <Select value="si" disabled>
                      <SelectTrigger id="convenioMultilateral" className="w-full mt-1 bg-gray-100 text-gray-500">
                        <SelectValue>Sí</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="exencionesImpositivas" className="text-base font-medium text-gray-500">
                      Exenciones Impositivas
                    </Label>
                    <Select value="no" disabled>
                      <SelectTrigger id="exencionesImpositivas" className="w-full mt-1 bg-gray-100 text-gray-500">
                        <SelectValue>No</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Categorías Seleccionadas */}
                <div className="mt-8">
                  <Label className="text-base font-medium text-gray-500">
                    Categorías Seleccionadas
                  </Label>
                  <div className="mt-4 space-y-4">
                    {/* Grupo 2 */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-3">Grupo 2</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-sm">Conexionado, carga y/o descarga de hidrocarburos inflamables, productos químicos y/o agroquímicos</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-sm">Provisión de Combustible a buques y/o derivados de hidrocarburos</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-sm">Tareas de Estiba (movimiento de mercaderías de cualquier tipo) a buques u otros medios de transporte y/o plazoleta</span>
                        </li>
                      </ul>
                    </div>

                    {/* Grupo 1 */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-3">Grupo 1</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-sm">Tareas de Remolque de Buques</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Domicilios */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Domicilios
                </h3>
                <div className="space-y-4">
                  {/* Domicilio Fiscal */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">Calle 59 412</span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                            Legal
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Cod. Postal: 1900 - La Plata - Buenos Aires
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Domicilio Comercial */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">Av. San Martín 1234</span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                            Comercial
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Cod. Postal: 1900 - La Plata - Buenos Aires
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="informacion-comercial" className="space-y-8">
              {/* Contacto Comercial */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contacto Comercial
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nombreCompleto" className="text-base font-medium text-gray-500">
                      Nombre Completo
                    </Label>
                    <Input
                      id="nombreCompleto"
                      value="María Elena Rodríguez"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="cargo" className="text-base font-medium text-gray-500">
                      Cargo
                    </Label>
                    <Input
                      id="cargo"
                      value="Gerente Comercial"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label htmlFor="telefono" className="text-base font-medium text-gray-500">
                      Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      value="+54 221 456-7890"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-medium text-gray-500">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value="maria.rodriguez@puertosur.com"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Información Bancaria (Opcional) */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Información Bancaria (Opcional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="banco" className="text-base font-medium text-gray-500">
                      Banco
                    </Label>
                    <Input
                      id="banco"
                      value="Banco de la Nación Argentina"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="tipoCuenta" className="text-base font-medium text-gray-500">
                      Tipo de Cuenta
                    </Label>
                    <Select value="corriente" disabled>
                      <SelectTrigger id="tipoCuenta" className="w-full mt-1 bg-gray-100 text-gray-500">
                        <SelectValue>Cuenta Corriente</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corriente">Cuenta Corriente</SelectItem>
                        <SelectItem value="ahorro">Caja de Ahorro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label htmlFor="numeroCuenta" className="text-base font-medium text-gray-500">
                      Número de Cuenta
                    </Label>
                    <Input
                      id="numeroCuenta"
                      value="1234567890"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="cbu" className="text-base font-medium text-gray-500">
                      CBU
                    </Label>
                    <Input
                      id="cbu"
                      value="0110123456789012345678"
                      className="mt-1 bg-gray-100 text-gray-500"
                      placeholder="Datos ya cargados"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="personal-vehiculos" className="space-y-8">
              {/* Personal */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personal
                </h3>
                
                {/* Barra de búsqueda y seleccionar todos */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar personal..."
                      className="w-full"
                      value={busquedaPersonal}
                      onChange={(e) => setBusquedaPersonal(e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handlePersonalSeleccionarTodos}
                  >
                    <input 
                      type="checkbox" 
                      className="w-4 h-4"
                      checked={personalFiltrado.length > 0 && personalFiltrado.every(persona => personalSeleccionado.includes(persona.dni))}
                      readOnly
                    />
                    Seleccionar Todos
                  </Button>
                </div>

                {/* Tabla de Personal */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nombre Completo</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">DNI</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Teléfono</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4"
                            checked={personalFiltrado.length > 0 && personalFiltrado.every(persona => personalSeleccionado.includes(persona.dni))}
                            onChange={handlePersonalSeleccionarTodos}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {personalFiltrado.map((persona, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{persona.nombre}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{persona.dni}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{persona.telefono}</td>
                          <td className="px-4 py-3">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4"
                              checked={personalSeleccionado.includes(persona.dni)}
                              onChange={() => handlePersonalSeleccionar(persona.dni)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vehículos */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Vehículos
                </h3>
                
                {/* Barra de búsqueda y seleccionar todos */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar vehículos..."
                      className="w-full"
                      value={busquedaVehiculos}
                      onChange={(e) => setBusquedaVehiculos(e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleVehiculoSeleccionarTodos}
                  >
                    <input 
                      type="checkbox" 
                      className="w-4 h-4"
                      checked={vehiculosFiltrados.length > 0 && vehiculosFiltrados.every(vehiculo => vehiculosSeleccionados.includes(vehiculo.patente))}
                      readOnly
                    />
                    Seleccionar Todos
                  </Button>
                </div>

                {/* Tabla de Vehículos */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tipo Vehículo</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Patente</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Marca</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4"
                            checked={vehiculosFiltrados.length > 0 && vehiculosFiltrados.every(vehiculo => vehiculosSeleccionados.includes(vehiculo.patente))}
                            onChange={handleVehiculoSeleccionarTodos}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {vehiculosFiltrados.map((vehiculo, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{vehiculo.tipo}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{vehiculo.patente}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{vehiculo.marca}</td>
                          <td className="px-4 py-3">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4"
                              checked={vehiculosSeleccionados.includes(vehiculo.patente)}
                              onChange={() => handleVehiculoSeleccionar(vehiculo.patente)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentacion" className="space-y-8">
              {/* Documentación Personal */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Documentación Personal
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="mb-4">
                    <h4 className="text-base font-medium text-gray-900">Documentación Personal Requerida</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
                    </p>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-900">
                      <div className="col-span-4">Tipo de Documento</div>
                      <div className="col-span-2">Estado</div>
                      <div className="col-span-3">Fecha de Carga</div>
                      <div className="col-span-3 text-right">Acciones</div>
                    </div>

                    {formData.documentacionPersonalDetallada
                      .filter(doc => !doc.condicional || (doc.condicional && formData.apoderado === "si"))
                      .map((documento) => (
                        <div key={documento.id} className="grid grid-cols-12 gap-4 p-4 border-b text-sm items-center">
                          <div className="col-span-4">
                            <span className="font-medium text-gray-900">{documento.nombre}</span>
                          </div>
                          <div className="col-span-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              documento.estado === 'completado' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {documento.estado === 'completado' ? 'Completado' : 'Pendiente'}
                            </span>
                          </div>
                          <div className="col-span-3 text-gray-600">
                            {documento.fechaCarga || '-'}
                          </div>
                          <div className="col-span-3 text-right">
                            {documento.archivo ? (
                              <div className="flex items-center gap-2 justify-end">
                                <span className="text-sm text-gray-600">{documento.archivo.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDocumentoPersonal(documento.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-transparent p-0"
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            ) : (
                              <label htmlFor={`documento-personal-${documento.id}`} className="cursor-pointer">
                                <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm hover:bg-gray-50">
                                  <Upload size={14} />
                                  <span>Seleccionar Archivo</span>
                                </div>
                                <input
                                  id={`documento-personal-${documento.id}`}
                                  type="file"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleDocumentoPersonalChange(documento.id, e.target.files[0])
                                    }
                                  }}
                                  className="hidden"
                                  accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Documentación General */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Documentación General
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="mb-4">
                    <h4 className="text-base font-medium text-gray-900">Documentación General Requerida</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
                    </p>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-900">
                      <div className="col-span-3">Tipo de Documento</div>
                      <div className="col-span-2">Estado</div>
                      <div className="col-span-2">Fecha de Emisión</div>
                      <div className="col-span-2">Fecha de Vencimiento</div>
                      <div className="col-span-3 text-right">Acciones</div>
                    </div>

                    {formData.documentacionGeneralDetallada.map((documento) => (
                      <div key={documento.id} className="grid grid-cols-12 gap-4 p-4 border-b text-sm items-center">
                        <div className="col-span-3">
                          <span className="font-medium text-gray-900">{documento.nombre}</span>
                        </div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            documento.estado === 'completado' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {documento.estado === 'completado' ? 'Completado' : 'Pendiente'}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="date"
                            value={documento.fechaEmision || ''}
                            onChange={(e) => handleDocumentoFechaChange('general', documento.id, 'fechaEmision', e.target.value)}
                            className="h-8 text-xs"
                          />
                        </div>
                        <div className="col-span-2">
                          {documento.fechaVencimiento !== undefined && (
                            <Input
                              type="date"
                              value={documento.fechaVencimiento || ''}
                              onChange={(e) => handleDocumentoFechaChange('general', documento.id, 'fechaVencimiento', e.target.value)}
                              className="h-8 text-xs"
                            />
                          )}
                        </div>
                        <div className="col-span-3 text-right">
                          {documento.archivo ? (
                            <div className="flex items-center gap-2 justify-end">
                              <span className="text-sm text-gray-600">{documento.archivo.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDocumentoGeneral(documento.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-transparent p-0"
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          ) : (
                            <label htmlFor={`documento-general-${documento.id}`} className="cursor-pointer">
                              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm hover:bg-gray-50">
                                <Upload size={14} />
                                <span>Seleccionar Archivo</span>
                              </div>
                              <input
                                id={`documento-general-${documento.id}`}
                                type="file"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleDocumentoGeneralChange(documento.id, e.target.files[0])
                                  }
                                }}
                                className="hidden"
                                accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documentación de Seguros */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Documentación de Seguros
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="mb-4">
                    <h4 className="text-base font-medium text-gray-900">Documentación de Seguros Requerida</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
                    </p>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-900">
                      <div className="col-span-3">Tipo de Documento</div>
                      <div className="col-span-2">Estado</div>
                      <div className="col-span-2">Fecha de Emisión</div>
                      <div className="col-span-2">Fecha de Vencimiento</div>
                      <div className="col-span-3 text-right">Acciones</div>
                    </div>

                    {formData.documentacionSegurosDetallada.map((documento) => (
                      <div key={documento.id} className="grid grid-cols-12 gap-4 p-4 border-b text-sm items-center">
                        <div className="col-span-3">
                          <span className="font-medium text-gray-900">{documento.nombre}</span>
                        </div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            documento.estado === 'completado' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {documento.estado === 'completado' ? 'Completado' : 'Pendiente'}
                          </span>
                        </div>
                        <div className="col-span-2">
                          {documento.fechaEmision !== undefined && (
                            <Input
                              type="date"
                              value={documento.fechaEmision || ''}
                              onChange={(e) => handleDocumentoFechaChange('seguros', documento.id, 'fechaEmision', e.target.value)}
                              className="h-8 text-xs"
                            />
                          )}
                        </div>
                        <div className="col-span-2">
                          {documento.fechaVencimiento !== undefined && (
                            <Input
                              type="date"
                              value={documento.fechaVencimiento || ''}
                              onChange={(e) => handleDocumentoFechaChange('seguros', documento.id, 'fechaVencimiento', e.target.value)}
                              className="h-8 text-xs"
                            />
                          )}
                        </div>
                        <div className="col-span-3 text-right">
                          {documento.archivo ? (
                            <div className="flex items-center gap-2 justify-end">
                              <span className="text-sm text-gray-600">{documento.archivo.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDocumentoSeguros(documento.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-transparent p-0"
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          ) : (
                            <label htmlFor={`documento-seguros-${documento.id}`} className="cursor-pointer">
                              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm hover:bg-gray-50">
                                <Upload size={14} />
                                <span>Seleccionar Archivo</span>
                              </div>
                              <input
                                id={`documento-seguros-${documento.id}`}
                                type="file"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleDocumentoSegurosChange(documento.id, e.target.files[0])
                                  }
                                }}
                                className="hidden"
                                accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documentación de Facturación */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentación de Facturación
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="mb-4">
                    <h4 className="text-base font-medium text-gray-900">Documentación de Facturación Requerida</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
                    </p>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-900">
                      <div className="col-span-4">Tipo de Documento</div>
                      <div className="col-span-2">Estado</div>
                      <div className="col-span-3">Fecha de Carga</div>
                      <div className="col-span-3 text-right">Acciones</div>
                    </div>

                    {formData.documentacionFacturacionDetallada.map((documento) => (
                      <div key={documento.id} className="grid grid-cols-12 gap-4 p-4 border-b text-sm items-center">
                        <div className="col-span-4">
                          <span className="font-medium text-gray-900">{documento.nombre}</span>
                        </div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            documento.estado === 'completado' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {documento.estado === 'completado' ? 'Completado' : 'Pendiente'}
                          </span>
                        </div>
                        <div className="col-span-3 text-gray-600">
                          {documento.fechaCarga || '-'}
                        </div>
                        <div className="col-span-3 text-right">
                          {documento.archivo ? (
                            <div className="flex items-center gap-2 justify-end">
                              <span className="text-sm text-gray-600">{documento.archivo.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDocumentoFacturacion(documento.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-transparent p-0"
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          ) : (
                            <label htmlFor={`documento-facturacion-${documento.id}`} className="cursor-pointer">
                              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm hover:bg-gray-50">
                                <Upload size={14} />
                                <span>Seleccionar Archivo</span>
                              </div>
                              <input
                                id={`documento-facturacion-${documento.id}`}
                                type="file"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleDocumentoFacturacionChange(documento.id, e.target.files[0])
                                  }
                                }}
                                className="hidden"
                                accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advertencia */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-yellow-800">
                      <strong>Importante:</strong> Los documentos marcados con * son obligatorios. La falta de presentación de estos documentos será motivo de rechazo de la oferta.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Mostrar documentación adjunta solo si NO es Inscripción o Reinscripción */}
        {!isInscripcionOrReinscripcion && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Documentación Adjunta</h3>
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50">
                    <Upload size={16} />
                    <span>Adjuntar Archivo</span>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </div>

            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium">
                <div className="col-span-5">Nombre del Archivo</div>
                <div className="col-span-3">Tipo</div>
                <div className="col-span-2">Tamaño</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>

              {formData.archivos.length === 0 ? (
                <div className="p-6 text-center text-gray-500 italic">No hay archivos adjuntos</div>
              ) : (
                <div>
                  {formData.archivos.map((file, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b text-sm items-center">
                      <div className="col-span-5 truncate">{file.name}</div>
                      <div className="col-span-3">{file.type || "Desconocido"}</div>
                      <div className="col-span-2">{formatFileSize(file.size)}</div>
                      <div className="col-span-2 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
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
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/empresa-servicios-portuarios/gestion/solicitudes/mis-solicitudes")}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-plp-dark hover:bg-plp-medium">
          {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
        </Button>
      </div>
    </form>
  )
}
