"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Upload, X, User, Building, MapPin, Phone, CreditCard, Users, Truck, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Interfaces
interface DocumentoConFechas {
  id: string
  nombre: string
  archivo?: File
  fechaEmision?: string
  fechaVencimiento?: string
  requerido: boolean
  condicional?: boolean
  estado?: 'pendiente' | 'completado' | 'rechazado'
  fechaCarga?: string
}

interface Personal {
  nombre: string
  dni: string
  telefono: string
}

interface Vehiculo {
  tipo: string
  patente: string
  marca: string
}

interface InformacionBancaria {
  banco: string
  tipoCuenta: string
  numeroCuenta: string
  cbu: string
}

interface Solicitud {
  id: string
  numero: string
  tipo: string
  asunto: string
  estado: string
  personal: Personal[]
  vehiculos: Vehiculo[]
  informacionBancaria: InformacionBancaria
}

export default function EditarSolicitudPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("datos-personales")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Estado para los datos editables
  const [personalSeleccionado, setPersonalSeleccionado] = useState<string[]>([])
  const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState<string[]>([])
  const [busquedaPersonal, setBusquedaPersonal] = useState("")
  const [busquedaVehiculos, setBusquedaVehiculos] = useState("")
  
  // Estado para información bancaria
  const [informacionBancaria, setInformacionBancaria] = useState<InformacionBancaria>({
    banco: "Banco de la Nación Argentina",
    tipoCuenta: "corriente",
    numeroCuenta: "1234567890",
    cbu: "0110123456789012345678",
  })

  // Simular datos de la solicitud (en un caso real vendrían del backend)
  const [solicitud, setSolicitud] = useState<Solicitud>({
    id: params.id as string,
    numero: "SOL-2023-0121",
    tipo: "Inscripción",
    asunto: "Nueva inscripción de empresa de servicios portuarios",
    estado: "Aprobada",
    personal: [],
    vehiculos: [],
    informacionBancaria: {
      banco: "Banco de la Nación Argentina",
      tipoCuenta: "corriente",
      numeroCuenta: "1234567890",
      cbu: "0110123456789012345678",
    }
  })

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
      setPersonalSeleccionado(prev => prev.filter(dni => !dnisFiltrados.includes(dni)))
    } else {
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
      setVehiculosSeleccionados(prev => prev.filter(patente => !patentesFiltradas.includes(patente)))
    } else {
      setVehiculosSeleccionados(prev => [...new Set([...prev, ...patentesFiltradas])])
    }
  }

  // Función para enviar modificación
  const handleEnviarModificacion = async () => {
    setIsSubmitting(true)
    
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Modificación enviada",
        description: "Su solicitud de modificación ha sido enviada. El estado cambiará a 'Pendiente'.",
      })
      
      // Redireccionar de vuelta a mis solicitudes
      router.push("/empresa-servicios-portuarios/gestion/solicitudes/mis-solicitudes")
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al enviar la modificación.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función para cancelar edición
  const handleCancelar = () => {
    router.push("/empresa-servicios-portuarios/gestion/solicitudes/mis-solicitudes")
  }

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancelar}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-plp-darkest">
            Editar Solicitud {solicitud.numero}
          </h1>
          <p className="text-gray-600">
            {solicitud.tipo} - {solicitud.asunto}
          </p>
        </div>
      </div>

      {/* Información de la solicitud */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-blue-800">
              <strong>Estado actual:</strong> {solicitud.estado}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Solo se pueden editar: Personal, Vehículos, Información Bancaria y Documentación. Los demás campos están bloqueados.
            </p>
            <p className="text-sm text-blue-600 mt-1">
              <strong>Nota:</strong> Al enviar la modificación, el estado cambiará a "Pendiente".
            </p>
          </div>
        </div>
      </div>

      {/* Pestañas */}
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
          {/* Datos Personales - NO EDITABLES */}
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
            <div className="grid gap-6 mt-6 grid-cols-1 md:grid-cols-2">
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
              <div>
                <Label htmlFor="apoderado" className="text-base font-medium text-gray-500">
                  Apoderado
                </Label>
                <Select value="si" disabled>
                  <SelectTrigger id="apoderado" className="w-full mt-1 bg-gray-100 text-gray-500">
                    <SelectValue>Sí</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="si">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Datos Generales - NO EDITABLES */}
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
          </div>

          {/* Domicilios - NO EDITABLES */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Domicilios
            </h3>
            <div className="space-y-4">
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="informacion-comercial" className="space-y-8">
          {/* Contacto Comercial - NO EDITABLE */}
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

          {/* Información Bancaria - EDITABLE */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Información Bancaria (Editable)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="banco" className="text-base font-medium">
                  Banco
                </Label>
                <Input
                  id="banco"
                  value={informacionBancaria.banco}
                  onChange={(e) => setInformacionBancaria(prev => ({ ...prev, banco: e.target.value }))}
                  className="mt-1"
                  placeholder="Ingrese el nombre del banco"
                />
              </div>
              <div>
                <Label htmlFor="tipoCuenta" className="text-base font-medium">
                  Tipo de Cuenta
                </Label>
                <Select 
                  value={informacionBancaria.tipoCuenta} 
                  onValueChange={(value) => setInformacionBancaria(prev => ({ ...prev, tipoCuenta: value }))}
                >
                  <SelectTrigger id="tipoCuenta" className="w-full mt-1">
                    <SelectValue placeholder="Seleccionar tipo de cuenta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corriente">Cuenta Corriente</SelectItem>
                    <SelectItem value="ahorro">Caja de Ahorro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numeroCuenta" className="text-base font-medium">
                  Número de Cuenta
                </Label>
                <Input
                  id="numeroCuenta"
                  value={informacionBancaria.numeroCuenta}
                  onChange={(e) => setInformacionBancaria(prev => ({ ...prev, numeroCuenta: e.target.value }))}
                  className="mt-1"
                  placeholder="Ingrese el número de cuenta"
                />
              </div>
              <div>
                <Label htmlFor="cbu" className="text-base font-medium">
                  CBU
                </Label>
                <Input
                  id="cbu"
                  value={informacionBancaria.cbu}
                  onChange={(e) => setInformacionBancaria(prev => ({ ...prev, cbu: e.target.value }))}
                  className="mt-1"
                  placeholder="Ingrese el CBU"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personal-vehiculos" className="space-y-8">
          {/* Personal - EDITABLE */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Personal (Editable)
            </h3>
            
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
                onClick={handlePersonalSeleccionarTodos}
              >
                Seleccionar Todos
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nombre Completo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">DNI</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Teléfono</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Seleccionar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {personalFiltrado.map((persona, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{persona.nombre}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{persona.dni}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{persona.telefono}</td>
                      <td className="px-4 py-3 text-center">
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

          {/* Vehículos - EDITABLE */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Vehículos (Editable)
            </h3>
            
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
                onClick={handleVehiculoSeleccionarTodos}
              >
                Seleccionar Todos
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tipo Vehículo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Patente</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Marca</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Seleccionar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {vehiculosFiltrados.map((vehiculo, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{vehiculo.tipo}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{vehiculo.patente}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{vehiculo.marca}</td>
                      <td className="px-4 py-3 text-center">
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
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Documentación Personal
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/3">Tipo de Documento</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-20">Estado</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Emisión</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Vencimiento</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Copia DNI *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Certificado apoderado *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Declaración jurada copia fiel (del apoderado) *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

                       {/* Documentación General */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentación General
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/3">Tipo de Documento</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-20">Estado</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Emisión</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Vencimiento</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Régimen tributario ARCA *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Régimen tributario ARBA *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Convenio multilateral *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Exenciones impositivas *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Sistema cuenta tributaria (Estado de cumplimiento) *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Constancia inscripción Proveedor de Abordo / Constancia de DNA *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Certificado de Anotaciones Personales *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Informe Juicio Universales *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

                       {/* Documentación de Seguros */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Documentación de Seguros
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/3">Tipo de Documento</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-20">Estado</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Emisión</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Vencimiento</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">ART Personal *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

                       {/* Documentación de Facturación */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Documentación de Facturación
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/2">Tipo de Documento</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-20">Estado</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha de Carga</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Factura Inscripción *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Comprobante de Pago factura *</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Input type="date" className="w-full text-center text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
         </TabsContent>
      </Tabs>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button
          variant="outline"
          onClick={handleCancelar}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleEnviarModificacion}
          disabled={isSubmitting}
          className="bg-plp-dark hover:bg-plp-medium"
        >
          {isSubmitting ? "Enviando..." : "Enviar Modificación"}
        </Button>
      </div>
    </div>
  )
}
