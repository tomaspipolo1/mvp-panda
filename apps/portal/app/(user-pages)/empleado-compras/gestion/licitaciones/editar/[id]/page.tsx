"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, PlusCircle, Upload, X, FileText, File, Save } from "lucide-react"
import { ProveedoresInvitados } from "@/components/licitaciones/proveedores-invitados"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, Loader2 } from "lucide-react"

interface Proveedor {
  id: string
  razonSocial: string
  cuit: string
  email: string
  personaContacto: string
}

interface DocumentoAdicional {
  id: string
  nombre: string
  tipo: string
  fechaSubida: string
  tamaño: string
}

interface MontoPresupuestado {
  id: string
  moneda: string
  monto: string
}

// Datos de ejemplo para una licitación existente
const licitacionEjemplo = {
  id: "lic-2023-0118",
  numero: "LIC-2023-0118",
  tipoLicitacion: "Publica",
  objeto: "Servicio de mantenimiento de edificios",
  categoria: "mantenimiento",
  descripcion:
    "Contratación de servicios de mantenimiento preventivo y correctivo para los edificios administrativos y operativos del Puerto La Plata.",
  montosPresupuestados: [
    { id: "1", moneda: "ars", monto: "3500000" }
  ],
  fechaCierre: "2023-03-15",
  horaCierre: "14:00",
  fechaApertura: "2023-03-16",
  horaApertura: "10:00",
  lugarApertura: "Sala de Reuniones - Puerto La Plata",
  publicarEnWeb: "si",
  responsableTecnico: "tecnico@puertolaplata.gob.ar",
  nombreResponsableTecnico: "Juan Pérez",
  visitaTecnica: "si",
  lugarVisita: "Puerto La Plata - Edificio Administrativo",
  fechaVisitaDesde: "2023-03-10",
  fechaVisitaHasta: "2023-03-12",
  proveedores: [
    { id: "1", razonSocial: "Constructora ABC", cuit: "20-12345678-9", email: "juan.perez@empresa.com", personaContacto: "Juan Pérez" },
    { id: "2", razonSocial: "Suministros XYZ", cuit: "30-23456789-0", email: "maria.lopez@suministros.com", personaContacto: "María López" },
  ],
}

export default function EditarLicitacionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [tipoLicitacion, setTipoLicitacion] = useState<string>("")
  const [fechaPublicacion, setFechaPublicacion] = useState<Date | undefined>(undefined)
  const [fechaCierre, setFechaCierre] = useState<Date | undefined>(undefined)
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [visitaTecnica, setVisitaTecnica] = useState<string>("no")
  const [lugarVisita, setLugarVisita] = useState("")
  const [fechaVisitaDesde, setFechaVisitaDesde] = useState<Date | undefined>(undefined)
  const [fechaVisitaHasta, setFechaVisitaHasta] = useState<Date | undefined>(undefined)
  const [horaCierre, setHoraCierre] = useState("")
  const [horaApertura, setHoraApertura] = useState("")
  const [lugarApertura, setLugarApertura] = useState("")
  const [nombreResponsableTecnico, setNombreResponsableTecnico] = useState("")
  const [publicarEnWeb, setPublicarEnWeb] = useState<string>("no")
  const [responsableTecnico, setResponsableTecnico] = useState("")
  const [pliegoFile, setPliegoFile] = useState<File | null>(null)
  const [circularFiles, setCircularFiles] = useState<File[]>([])
  const [documentosAdicionales, setDocumentosAdicionales] = useState<DocumentoAdicional[]>([])
  const [documentoAdicionalFiles, setDocumentoAdicionalFiles] = useState<File[]>([])
  const [showNuevoDocumentoModal, setShowNuevoDocumentoModal] = useState(false)
  const [nuevoNombreDocumento, setNuevoNombreDocumento] = useState("")
  const [montosPresupuestados, setMontosPresupuestados] = useState<MontoPresupuestado[]>([
    { id: "1", moneda: "", monto: "" }
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [showGuardarModal, setShowGuardarModal] = useState(false)
  const [modalEstado, setModalEstado] = useState<"guardando" | "completado" | null>(null)

  // Función para formatear fecha para input type="date"
  const formatDateForInput = (date?: Date): string => {
    if (!date) return ""
    return date.toISOString().split("T")[0]
  }

  // Cargar datos de la licitación
  useEffect(() => {
    // Simulamos una carga de datos
    const timer = setTimeout(() => {
      // Cargar datos de ejemplo
      setTipoLicitacion(licitacionEjemplo.tipoLicitacion)
      setMontosPresupuestados(licitacionEjemplo.montosPresupuestados)
      setFechaCierre(licitacionEjemplo.fechaCierre ? new Date(licitacionEjemplo.fechaCierre) : undefined)
      setHoraCierre(licitacionEjemplo.horaCierre)
      setFechaPublicacion(licitacionEjemplo.fechaApertura ? new Date(licitacionEjemplo.fechaApertura) : undefined)
      setHoraApertura(licitacionEjemplo.horaApertura)
      setLugarApertura(licitacionEjemplo.lugarApertura)
      setPublicarEnWeb(licitacionEjemplo.publicarEnWeb)
      setResponsableTecnico(licitacionEjemplo.responsableTecnico)
      setNombreResponsableTecnico(licitacionEjemplo.nombreResponsableTecnico)
      setVisitaTecnica(licitacionEjemplo.visitaTecnica)
      setLugarVisita(licitacionEjemplo.lugarVisita)
      setFechaVisitaDesde(licitacionEjemplo.fechaVisitaDesde ? new Date(licitacionEjemplo.fechaVisitaDesde) : undefined)
      setFechaVisitaHasta(licitacionEjemplo.fechaVisitaHasta ? new Date(licitacionEjemplo.fechaVisitaHasta) : undefined)
      setProveedores(licitacionEjemplo.proveedores)
      setIsLoading(false)

      // Verificar si la licitación está en estado abierta
      const estadoLicitacion = "abierta" // Simulamos que está abierta
      if (estadoLicitacion !== "abierta") {
        alert("Solo se pueden editar licitaciones en estado ABIERTA")
        router.push("/empleado-compras/gestion/licitaciones/listado")
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [resolvedParams.id, router])

  const handleAddProveedor = (nuevoProveedor: Omit<Proveedor, "id">) => {
    setProveedores([
      ...proveedores,
      {
        id: Date.now().toString(),
        ...nuevoProveedor,
      },
    ])
  }

  const handleRemoveProveedor = (id: string) => {
    setProveedores(proveedores.filter((proveedor) => proveedor.id !== id))
  }

  const handleAddMonto = () => {
    const nuevoMonto: MontoPresupuestado = {
      id: Date.now().toString(),
      moneda: "",
      monto: ""
    }
    setMontosPresupuestados([...montosPresupuestados, nuevoMonto])
  }

  const handleRemoveMonto = (id: string) => {
    if (montosPresupuestados.length > 1) {
      setMontosPresupuestados(montosPresupuestados.filter((monto) => monto.id !== id))
    }
  }

  const handleUpdateMonto = (id: string, field: "moneda" | "monto", value: string) => {
    setMontosPresupuestados(
      montosPresupuestados.map((monto) =>
        monto.id === id ? { ...monto, [field]: value } : monto
      )
    )
  }

  const handleGuardarCambios = () => {
    setModalEstado("guardando")
    setShowGuardarModal(true)

    // Simulamos el guardado
    setTimeout(() => {
      setModalEstado("completado")
    }, 2000)
  }

  const handleCerrarModal = () => {
    if (modalEstado === "completado") {
      setShowGuardarModal(false)
      router.push("/empleado-compras/gestion/licitaciones/listado")
    }
  }

  const handlePliegoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPliegoFile(e.target.files[0])
    }
  }

  const handleCircularFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0]
      setCircularFiles((prev) => [...prev, newFile])
    }
  }

  const handleRemoveCircular = (index: number) => {
    setCircularFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDocumentoAdicionalFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setDocumentoAdicionalFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveDocumentoAdicionalFile = (index: number) => {
    setDocumentoAdicionalFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubirDocumentosAdicionales = () => {
    if (documentoAdicionalFiles.length === 0) return

    // Simulamos la subida de archivos
    const nuevosDocumentos: DocumentoAdicional[] = documentoAdicionalFiles.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      nombre: file.name,
      tipo: file.type.split("/")[1].toUpperCase(),
      fechaSubida: new Date().toLocaleDateString(),
      tamaño: `${(file.size / 1024).toFixed(1)} KB`,
    }))

    setDocumentosAdicionales((prev) => [...prev, ...nuevosDocumentos])
    setDocumentoAdicionalFiles([])

    toast({
      title: "Documentos adicionales subidos",
      description: `Se han subido ${nuevosDocumentos.length} documentos adicionales.`,
    })
  }

  const handleRemoveDocumentoAdicional = (id: string) => {
    setDocumentosAdicionales((prev) => prev.filter((doc) => doc.id !== id))
  }

  const handleAgregarDocumentoModal = () => {
    setShowNuevoDocumentoModal(true)
  }

  const handleGuardarNuevoDocumento = () => {
    if (!nuevoNombreDocumento.trim()) return

    const nuevoDocumento: DocumentoAdicional = {
      id: Date.now().toString(),
      nombre: nuevoNombreDocumento,
      tipo: "PDF",
      fechaSubida: new Date().toLocaleDateString(),
      tamaño: "0 KB",
    }

    setDocumentosAdicionales((prev) => [...prev, nuevoDocumento])
    setNuevoNombreDocumento("")
    setShowNuevoDocumentoModal(false)

    toast({
      title: "Documento agregado",
      description: `Se ha agregado el documento "${nuevoNombreDocumento}".`,
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold">Cargando licitación...</h2>
          <p className="text-gray-500 mt-2">Por favor espere mientras se cargan los datos</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editar Licitación: {licitacionEjemplo.numero}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="proveedores">Proveedores</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          {/* Datos de Licitación */}
          <Card>
            <CardHeader>
              <CardTitle>Datos Licitación</CardTitle>
              <CardDescription>Información básica de la licitación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Licitación</Label>
                  <Select value={tipoLicitacion} onValueChange={setTipoLicitacion}>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Publica">Pública</SelectItem>
                      <SelectItem value="Privada">Privada</SelectItem>
                      <SelectItem value="Concurso de precios">Concurso de Precios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="objeto">Objeto</Label>
                  <Input id="objeto" placeholder="Ingrese el objeto de la licitación" defaultValue={licitacionEjemplo.objeto} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select defaultValue={licitacionEjemplo.categoria}>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seguridad">Seguridad</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="logistica">Logística</SelectItem>
                      <SelectItem value="consultoria">Consultoría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea id="descripcion" placeholder="Ingrese una descripción detallada de la licitación" rows={4} defaultValue={licitacionEjemplo.descripcion} />
              </div>

              {/* Montos Presupuestados */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Montos Presupuestados</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddMonto}
                    className="h-8"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Agregar Monto
                  </Button>
                </div>
                
                {montosPresupuestados.map((monto) => (
                  <div key={monto.id} className="grid grid-cols-2 gap-4 p-4 border rounded-lg relative">
                    {montosPresupuestados.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMonto(monto.id)}
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor={`moneda-${monto.id}`}>Moneda</Label>
                      <Select 
                        value={monto.moneda} 
                        onValueChange={(value) => handleUpdateMonto(monto.id, "moneda", value)}
                      >
                        <SelectTrigger id={`moneda-${monto.id}`}>
                          <SelectValue placeholder="Seleccione una moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ars">Peso Argentino (ARS)</SelectItem>
                          <SelectItem value="usd">Dólar Estadounidense (USD)</SelectItem>
                          <SelectItem value="eur">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`presupuesto-${monto.id}`}>Monto</Label>
                      <Input 
                        id={`presupuesto-${monto.id}`} 
                        placeholder="Ingrese el monto presupuestado"
                        value={monto.monto}
                        onChange={(e) => handleUpdateMonto(monto.id, "monto", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fecha y Horarios */}
          <Card>
            <CardHeader>
              <CardTitle>Fecha y Horarios</CardTitle>
              <CardDescription>Fechas y horarios importantes de la licitación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha-cierre" className="block text-sm font-medium mb-1">
                    Fecha Cierre
                  </Label>
                  <div className="relative">
                    <Input
                      id="fecha-cierre"
                      type="date"
                      value={fechaCierre ? formatDateForInput(fechaCierre) : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFechaCierre(new Date(e.target.value))
                        } else {
                          setFechaCierre(undefined)
                        }
                      }}
                      className="w-full pl-10"
                      placeholder="dd/mm/aaaa"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hora-cierre" className="block text-sm font-medium mb-1">
                    Hora de Cierre
                  </Label>
                  <Input
                    id="hora-cierre"
                    type="time"
                    value={horaCierre}
                    onChange={(e) => setHoraCierre(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha-apertura" className="block text-sm font-medium mb-1">
                    Fecha Apertura
                  </Label>
                  <div className="relative">
                    <Input
                      id="fecha-apertura"
                      type="date"
                      value={fechaPublicacion ? formatDateForInput(fechaPublicacion) : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFechaPublicacion(new Date(e.target.value))
                        } else {
                          setFechaPublicacion(undefined)
                        }
                      }}
                      className="w-full pl-10"
                      placeholder="dd/mm/aaaa"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hora-apertura" className="block text-sm font-medium mb-1">
                    Hora de Apertura
                  </Label>
                  <Input
                    id="hora-apertura"
                    type="time"
                    value={horaApertura}
                    onChange={(e) => setHoraApertura(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lugar-apertura">Lugar de Apertura</Label>
                  <Input
                    id="lugar-apertura"
                    placeholder="Ingrese el lugar de apertura"
                    value={lugarApertura}
                    onChange={(e) => setLugarApertura(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicar-web">Publicar en la Web</Label>
                  <Select value={publicarEnWeb} onValueChange={setPublicarEnWeb}>
                    <SelectTrigger id="publicar-web">
                      <SelectValue placeholder="Seleccione una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datos Técnicos */}
          <Card>
            <CardHeader>
              <CardTitle>Datos Técnicos</CardTitle>
              <CardDescription>Información técnica y responsables de la licitación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsable-tecnico">Responsable Técnico (Email)</Label>
                  <Input
                    id="responsable-tecnico"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={responsableTecnico}
                    onChange={(e) => setResponsableTecnico(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombre-responsable">Nombre</Label>
                  <Input
                    id="nombre-responsable"
                    placeholder="Nombre del responsable técnico"
                    value={nombreResponsableTecnico}
                    onChange={(e) => setNombreResponsableTecnico(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visita-tecnica">Visita Técnica</Label>
                  <Select value={visitaTecnica} onValueChange={setVisitaTecnica}>
                    <SelectTrigger id="visita-tecnica">
                      <SelectValue placeholder="Seleccione una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lugar-visita">Lugar Visita Técnica</Label>
                  <Input
                    id="lugar-visita"
                    placeholder="Ingrese el lugar de la visita"
                    value={lugarVisita}
                    onChange={(e) => setLugarVisita(e.target.value)}
                    disabled={visitaTecnica === "no"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha-visita-desde" className="block text-sm font-medium mb-1">
                    Fecha Visita Desde
                  </Label>
                  <div className="relative">
                    <Input
                      id="fecha-visita-desde"
                      type="date"
                      value={fechaVisitaDesde ? formatDateForInput(fechaVisitaDesde) : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFechaVisitaDesde(new Date(e.target.value))
                        } else {
                          setFechaVisitaDesde(undefined)
                        }
                      }}
                      className="w-full pl-10"
                      placeholder="dd/mm/aaaa"
                      disabled={visitaTecnica === "no"}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fecha-visita-hasta" className="block text-sm font-medium mb-1">
                    Fecha Visita Hasta
                  </Label>
                  <div className="relative">
                    <Input
                      id="fecha-visita-hasta"
                      type="date"
                      value={fechaVisitaHasta ? formatDateForInput(fechaVisitaHasta) : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFechaVisitaHasta(new Date(e.target.value))
                        } else {
                          setFechaVisitaHasta(undefined)
                        }
                      }}
                      className="w-full pl-10"
                      placeholder="dd/mm/aaaa"
                      disabled={visitaTecnica === "no"}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={() => setActiveTab("proveedores")}>Siguiente</Button>
          </div>
        </TabsContent>

        {/* Pestaña de Proveedores */}
        <TabsContent value="proveedores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proveedores a Invitar</CardTitle>
                <CardDescription>Seleccione o agregue los proveedores que participarán en la licitación</CardDescription>
              </CardHeader>
              <CardContent>
                <ProveedoresInvitados
                  proveedores={proveedores}
                  onAddProveedor={handleAddProveedor}
                  onRemoveProveedor={handleRemoveProveedor}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setActiveTab("general")}>
                Anterior
              </Button>
              <Button onClick={() => setActiveTab("documentos")}>Siguiente</Button>
            </div>
        </TabsContent>

        <TabsContent value="documentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Suba los documentos de la licitación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pliego de Bases y Condiciones */}
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="pliego" className="text-base font-medium">
                    PLIEGO DE BASES Y CONDICIONES
                  </Label>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Obligatorio
                  </Badge>
                </div>

                {pliegoFile ? (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mt-2">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">{pliegoFile.name}</p>
                        <p className="text-sm text-gray-500">{(pliegoFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setPliegoFile(null)} className="text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mt-2">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">pliego_condiciones_{licitacionEjemplo.numero}.pdf</p>
                        <p className="text-sm text-gray-500">1.2 MB - Subido el 01/03/2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reemplazar
                    </Button>
                  </div>
                )}
              </div>

              {/* Circulares */}
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="circular" className="text-base font-medium">
                    CIRCULARES
                  </Label>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Obligatorio
                  </Badge>
                </div>

                {circularFiles.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {circularFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-500 mr-2" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveCircular(index)} className="text-red-500">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6 mt-2">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label
                        htmlFor="circular-file"
                        className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                      >
                        Seleccionar archivo
                      </label>
                      <input
                        id="circular-file"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCircularFileChange}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">PDF, DOC, DOCX (máx. 10MB)</p>
                  </div>
                </div>
              </div>

              {/* Documentos Adicionales */}
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <Label htmlFor="documentos-adicionales" className="text-base font-medium">
                    Documentos Adicionales
                  </Label>
                  <Button onClick={handleAgregarDocumentoModal} size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Agregar documento
                  </Button>
                </div>

                {/* Lista de documentos adicionales */}
                {documentosAdicionales.length > 0 && (
                  <div className="mb-4">
                    <div className="bg-gray-50 rounded-md">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nombre
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tipo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fecha
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tamaño
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {documentosAdicionales.map((doc) => (
                            <tr key={doc.id}>
                              <td className="px-4 py-3 text-sm text-gray-900">{doc.nombre}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{doc.tipo}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{doc.fechaSubida}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{doc.tamaño}</td>
                              <td className="px-4 py-3 text-sm text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveDocumentoAdicional(doc.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Subir nuevos documentos adicionales */}
                <div className="mt-4">
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <label
                          htmlFor="documentos-adicionales-file"
                          className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        >
                          Seleccionar archivos
                        </label>
                        <input
                          id="documentos-adicionales-file"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          multiple
                          onChange={handleDocumentoAdicionalFilesChange}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        PDF, DOC, DOCX, JPG, JPEG, PNG (máx. 10MB por archivo)
                      </p>
                    </div>
                  </div>

                  {/* Archivos seleccionados */}
                  {documentoAdicionalFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="text-sm font-medium">Archivos seleccionados:</div>
                      {documentoAdicionalFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <div className="flex items-center">
                            <File className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDocumentoAdicionalFile(index)}
                            className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button onClick={handleSubirDocumentosAdicionales} className="mt-2">
                        Subir archivos seleccionados
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setActiveTab("proveedores")}>
              Anterior
            </Button>
            <Button onClick={handleGuardarCambios} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de guardado */}
      <Dialog open={showGuardarModal} onOpenChange={handleCerrarModal}>
        <DialogContent className="sm:max-w-md">
          {modalEstado === "guardando" && (
            <div className="flex flex-col items-center justify-center py-6">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
              <h3 className="text-lg font-medium">Guardando cambios</h3>
              <p className="text-sm text-muted-foreground mt-2">Por favor espere mientras se guardan los cambios...</p>
            </div>
          )}

          {modalEstado === "completado" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Cambios guardados exitosamente
                </DialogTitle>
                <DialogDescription>
                  Los cambios en la licitación {licitacionEjemplo.numero} han sido guardados correctamente.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="button" onClick={handleCerrarModal}>
                  Aceptar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para agregar nuevo documento */}
      <Dialog open={showNuevoDocumentoModal} onOpenChange={setShowNuevoDocumentoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar nuevo documento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre-documento">Nombre del documento</Label>
              <Input
                id="nombre-documento"
                value={nuevoNombreDocumento}
                onChange={(e) => setNuevoNombreDocumento(e.target.value)}
                placeholder="Ingrese el nombre del documento"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNuevoDocumentoModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGuardarNuevoDocumento} disabled={!nuevoNombreDocumento.trim()}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
