"use client"

import type React from "react"

import { useState } from "react"
import { Eye, Trash2, Plus, FileText, Filter, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Clases y subclases de vehículos según licencias argentinas oficiales
const clasesVehiculo = {
  A: {
    nombre: "Motocicletas, ciclomotores y similares",
    subclases: {
      "A1.1": "Ciclomotores hasta 50cc o 4kW",
      "A1.2": "Motocicletas hasta 150cc u 11kW",
      "A1.3": "Motocicletas hasta 300cc o 20kW",
      "A1.4": "Motocicletas de más de 300cc o más de 20kW",
      "A2.1": "Triciclos y cuatriciclos sin cabina hasta 300cc o 20kW",
      "A2.2": "Triciclos y cuatriciclos sin cabina de más de 300cc o más de 20kW",
      A3: "Triciclos y cuatriciclos cabinados con volante",
    },
  },
  B: {
    nombre: "Autos, utilitarios y camionetas",
    subclases: {
      B1: "Autos, utilitarios, camionetas, vans, casas rodantes hasta 3.500 kg (incluye A3)",
      B2: "Los mismos con remolque de hasta 750 kg (incluye A3)",
    },
  },
  C: {
    nombre: "Camiones",
    subclases: {
      C1: "Camiones y casas rodantes motorizadas de más de 3.500 kg y hasta 12.000 kg",
      C2: "Más de 12.000 kg y hasta 24.000 kg",
      C3: "Más de 24.000 kg",
    },
  },
  D: {
    nombre: "Transporte de pasajeros",
    subclases: {
      D1: "Transporte de pasajeros hasta 8 plazas",
      D2: "Hasta 20 plazas",
      D3: "Más de 20 plazas",
      D4: "Vehículos de emergencia (debe ir acompañada de la clase correspondiente)",
    },
  },
  E: {
    nombre: "Vehículos pesados con remolques y maquinaria",
    subclases: {
      E1: "Vehículos de clase C o D con remolques o articulaciones",
      E2: "Maquinaria especial no agrícola",
    },
  },
  F: {
    nombre: "Vehículos adaptados",
    subclases: {
      F: "Vehículos adaptados a personas con discapacidad (debe acompañarse de la clase correspondiente)",
    },
  },
  G: {
    nombre: "Vehículos agrícolas",
    subclases: {
      G1: "Tractores agrícolas",
      G2: "Maquinaria agrícola especial",
      G3: "Tren agrícola (acompañada de B1 o G1)",
    },
  },
}

// Datos de ejemplo para la tabla
const vehiculosData = [
  {
    id: 1,
    claseVehiculo: "B",
    subclase: "B1",
    patente: "AB123CD",
    marca: "Toyota",
    modelo: "Corolla",
    seguro: "seguro_auto_1.pdf",
    fechaVencimientoSeguro: "2025-05-15",
    cedulaVerde: "cedula_verde_1.pdf",
    titularVehiculo: "Juan Pérez",
    certificadoSeguridad: null as string | null,
    conductorNoTitular: true,
    cedulaAzul: "cedula_azul_1.pdf" as string | null,
  },
  {
    id: 2,
    claseVehiculo: "B",
    subclase: "B2",
    patente: "XY456ZW",
    marca: "Ford",
    modelo: "Ranger",
    seguro: "seguro_camioneta_1.pdf",
    fechaVencimientoSeguro: "2025-06-20",
    cedulaVerde: "cedula_verde_2.pdf",
    titularVehiculo: "María González",
    certificadoSeguridad: null as string | null,
    conductorNoTitular: false,
    cedulaAzul: null as string | null,
  },
  {
    id: 3,
    claseVehiculo: "C",
    subclase: "C2",
    patente: "CD789EF",
    marca: "Mercedes-Benz",
    modelo: "Actros",
    seguro: "seguro_camion_1.pdf",
    fechaVencimientoSeguro: "2025-07-10",
    cedulaVerde: "cedula_verde_3.pdf",
    titularVehiculo: "Carlos Rodríguez",
    certificadoSeguridad: null as string | null,
    conductorNoTitular: false,
    cedulaAzul: null as string | null,
  },
  {
    id: 4,
    claseVehiculo: "A",
    subclase: "A1.2",
    patente: "GH012IJ",
    marca: "Honda",
    modelo: "CB125F",
    seguro: "seguro_moto_1.pdf",
    fechaVencimientoSeguro: "2025-04-30",
    cedulaVerde: "cedula_verde_4.pdf",
    titularVehiculo: "Ana Martínez",
    certificadoSeguridad: null as string | null,
    conductorNoTitular: false,
    cedulaAzul: null as string | null,
  },
  {
    id: 5,
    claseVehiculo: "G",
    subclase: "G1",
    patente: "KL345MN",
    marca: "John Deere",
    modelo: "6110M",
    seguro: "seguro_tractor_1.pdf",
    fechaVencimientoSeguro: "2025-08-05",
    cedulaVerde: "cedula_verde_5.pdf",
    titularVehiculo: "Roberto López",
    certificadoSeguridad: null as string | null,
    conductorNoTitular: false,
    cedulaAzul: null as string | null,
  },
]

// Tipos de vehículos disponibles
// const tiposVehiculo = ["Auto", "Camioneta", "Moto", "Camion", "Acoplado", "Utilitario"]

export default function MisTransportesComponent() {
  const [vehiculos, setVehiculos] = useState(vehiculosData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [currentVehiculo, setCurrentVehiculo] = useState<any>(null)
  const [newSeguro, setNewSeguro] = useState<File | null>(null)
  const [fechaVencimientoSeguro, setFechaVencimientoSeguro] = useState<Date | undefined>(undefined)
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("")
  const [newCedulaVerde, setNewCedulaVerde] = useState<File | null>(null)
  const [newCertificadoSeguridad, setNewCertificadoSeguridad] = useState<File | null>(null)
  const [titularVehiculo, setTitularVehiculo] = useState<string>("")
  const [conductorNoTitular, setConductorNoTitular] = useState<boolean>(false)
  const [newCedulaAzul, setNewCedulaAzul] = useState<File | null>(null)
  const [claseSeleccionada, setClaseSeleccionada] = useState<string>("")
  const [subclaseSeleccionada, setSubclaseSeleccionada] = useState<string>("")

  // Función para descargar archivo
  const handleDownload = (filename: string) => {
    // Simular descarga de archivo
    const link = document.createElement('a')
    link.href = `#` // Aquí iría la URL real del archivo
    link.download = filename
    link.click()
    console.log("Descargando archivo:", filename)
  }

  // Función para eliminar archivo
  const handleDeleteDocument = (documentType: string, filename: string) => {
    if (confirm(`¿Está seguro que desea eliminar el archivo ${filename}?`)) {
      // Actualizar el estado local
      const updatedVehiculos = vehiculos.map((v) => {
        if (v.id === currentVehiculo.id) {
          const updatedVehiculo = { ...v }
          switch (documentType) {
            case 'seguro':
              updatedVehiculo.seguro = "sin_seguro.pdf"
              break
            case 'cedulaVerde':
              updatedVehiculo.cedulaVerde = "sin_cedula.pdf"
              break
            case 'certificadoSeguridad':
              updatedVehiculo.certificadoSeguridad = null
              break
            case 'cedulaAzul':
              updatedVehiculo.cedulaAzul = null
              break
          }
          return updatedVehiculo
        }
        return v
      })
      setVehiculos(updatedVehiculos)
      setCurrentVehiculo(updatedVehiculos.find(v => v.id === currentVehiculo.id))
      console.log("Archivo eliminado:", filename)
    }
  }

  // Función para manejar la visualización/edición de un vehículo
  const handleEdit = (vehiculo: any) => {
    setCurrentVehiculo(vehiculo)
    // Convertir la fecha de string a Date para el DatePicker
    setFechaVencimientoSeguro(vehiculo.fechaVencimientoSeguro ? new Date(vehiculo.fechaVencimientoSeguro) : undefined)
    setIsEditModalOpen(true)
  }

  // Función para manejar la eliminación de un vehículo
  const handleDelete = (vehiculo: any) => {
    setCurrentVehiculo(vehiculo)
    setIsDeleteModalOpen(true)
  }

  // Función para confirmar la eliminación
  const confirmDelete = () => {
    setVehiculos(vehiculos.filter((v) => v.id !== currentVehiculo.id))
    setIsDeleteModalOpen(false)
  }

  // Función para agregar un nuevo seguro
  const handleAddSeguro = () => {
    if (newSeguro) {
      // Aquí iría la lógica para subir el archivo al servidor
      // Por ahora solo actualizamos el estado local
      const updatedVehiculos = vehiculos.map((v) => {
        if (v.id === currentVehiculo.id) {
          return {
            ...v,
            seguro: newSeguro.name,
            fechaVencimientoSeguro: fechaVencimientoSeguro
              ? fechaVencimientoSeguro.toISOString().split("T")[0]
              : v.fechaVencimientoSeguro,
          }
        }
        return v
      })
      setVehiculos(updatedVehiculos)
      setNewSeguro(null)
      setFechaVencimientoSeguro(undefined)
      setIsEditModalOpen(false)
    }
  }

  const handleAddVehiculo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const nuevoVehiculo = {
      id: vehiculos.length + 1,
      claseVehiculo: claseSeleccionada || "B",
      subclase: subclaseSeleccionada || "B1",
      patente: (formData.get("patente") as string) || "",
      marca: (formData.get("marca") as string) || "",
      modelo: (formData.get("modelo") as string) || "",
      seguro: formData.get("seguro") ? (formData.get("seguro") as File).name : "sin_seguro.pdf",
      fechaVencimientoSeguro: fechaVencimientoSeguro
        ? fechaVencimientoSeguro.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      cedulaVerde: formData.get("cedula-verde") ? (formData.get("cedula-verde") as File).name : "sin_cedula.pdf",
      titularVehiculo: (formData.get("titular-vehiculo") as string) || "",
      certificadoSeguridad:
        tipoSeleccionado === "Acoplado" && formData.get("certificado-seguridad")
          ? (formData.get("certificado-seguridad") as File).name
          : null,
      conductorNoTitular: conductorNoTitular,
      cedulaAzul: conductorNoTitular && formData.get("cedula-azul") ? (formData.get("cedula-azul") as File).name : null,
    }

    setVehiculos([...vehiculos, nuevoVehiculo])
    setTipoSeleccionado("")
    setFechaVencimientoSeguro(undefined)
    setTitularVehiculo("")
    setNewCedulaVerde(null)
    setNewCertificadoSeguridad(null)
    setConductorNoTitular(false)
    setNewCedulaAzul(null)
    setIsNewModalOpen(false)
    setClaseSeleccionada("")
    setSubclaseSeleccionada("")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Vehículos</h1>
        <Button
          onClick={() => setIsNewModalOpen(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
        >
          <Plus className="mr-2 h-4 w-4 inline" /> Nuevo Vehículo
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tipo-filter">Tipo de Vehículo</Label>
              <Select>
                <SelectTrigger id="clase-filter">
                  <SelectValue placeholder="Todas las clases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las clases</SelectItem>
                  {Object.entries(clasesVehiculo).map(([clase, info]) => (
                    <SelectItem key={clase} value={clase.toLowerCase()}>
                      {clase} - {info.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="patente-filter">Patente</Label>
              <Input id="patente-filter" placeholder="Buscar por patente" />
            </div>
            <div className="flex items-end">
              <Button className="bg-plp-primary hover:bg-plp-dark text-white">
                <Filter className="mr-2 h-4 w-4" /> Aplicar Filtros
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clase/Subclase
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titular
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documentos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehiculos.map((vehiculo) => (
                <tr key={vehiculo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehiculo.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mb-1">
                        {vehiculo.claseVehiculo}
                      </Badge>
                      <span className="text-xs text-gray-600">{vehiculo.subclase}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehiculo.patente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehiculo.marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehiculo.modelo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehiculo.titularVehiculo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="text-plp-primary hover:text-plp-dark p-0 h-auto justify-start">
                        <FileText className="h-4 w-4 mr-1" /> {vehiculo.seguro}
                      </Button>
                      <Button variant="ghost" className="text-plp-primary hover:text-plp-dark p-0 h-auto justify-start">
                        <FileText className="h-4 w-4 mr-1" /> {vehiculo.cedulaVerde}
                      </Button>
                      {vehiculo.certificadoSeguridad && (
                        <Button
                          variant="ghost"
                          className="text-plp-primary hover:text-plp-dark p-0 h-auto justify-start"
                        >
                          <FileText className="h-4 w-4 mr-1" /> {vehiculo.certificadoSeguridad}
                        </Button>
                      )}
                      {vehiculo.cedulaAzul && (
                        <Button
                          variant="ghost"
                          className="text-plp-primary hover:text-plp-dark p-0 h-auto justify-start"
                        >
                          <FileText className="h-4 w-4 mr-1" /> {vehiculo.cedulaAzul}
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(vehiculo.fechaVencimientoSeguro).toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(vehiculo)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(vehiculo)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para ver/editar vehículo */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Vehículo</DialogTitle>
          </DialogHeader>
          {currentVehiculo && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="clase-edit">Clase</Label>
                  <Input
                    id="clase-edit"
                    value={`${currentVehiculo.claseVehiculo} - ${
                      clasesVehiculo[currentVehiculo.claseVehiculo as keyof typeof clasesVehiculo]?.nombre
                    }`}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="subclase-edit">Subclase</Label>
                  <Input
                    id="subclase-edit"
                    value={`${currentVehiculo.subclase} - ${
                      clasesVehiculo[currentVehiculo.claseVehiculo as keyof typeof clasesVehiculo]?.subclases[
                        currentVehiculo.subclase as keyof typeof clasesVehiculo[keyof typeof clasesVehiculo]['subclases']
                      ]
                    }`}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="patente">Patente</Label>
                  <Input id="patente" value={currentVehiculo.patente} disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="marca">Marca</Label>
                  <Input id="marca" value={currentVehiculo.marca} disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="modelo">Modelo</Label>
                  <Input id="modelo" value={currentVehiculo.modelo} disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="titular">Titular</Label>
                  <Input id="titular" value={currentVehiculo.titularVehiculo} disabled className="bg-gray-100" />
                </div>
              </div>
              <div>
                <Label>Documentos</Label>
                <div className="mt-2">
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Tipo Documento
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Nombre Archivo
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Fecha Vencimiento
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Seguro */}
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-plp-primary" />
                              Seguro
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">{currentVehiculo.seguro}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            {new Date(currentVehiculo.fechaVencimientoSeguro).toLocaleDateString("es-AR")}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                                onClick={() => handleDownload(currentVehiculo.seguro)}
                                title="Descargar"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-800 p-1 h-auto"
                                onClick={() => handleDeleteDocument('seguro', currentVehiculo.seguro)}
                                title="Eliminar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        {/* Cédula Verde */}
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-plp-primary" />
                              Cédula Verde
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">{currentVehiculo.cedulaVerde}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">-</td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                                onClick={() => handleDownload(currentVehiculo.cedulaVerde)}
                                title="Descargar"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-800 p-1 h-auto"
                                onClick={() => handleDeleteDocument('cedulaVerde', currentVehiculo.cedulaVerde)}
                                title="Eliminar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        {/* Certificado de Seguridad (si existe) */}
                        {currentVehiculo.certificadoSeguridad && (
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-plp-primary" />
                                Certificado de Seguridad
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">{currentVehiculo.certificadoSeguridad}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">-</td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                                  onClick={() => handleDownload(currentVehiculo.certificadoSeguridad)}
                                  title="Descargar"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 p-1 h-auto"
                                  onClick={() => handleDeleteDocument('certificadoSeguridad', currentVehiculo.certificadoSeguridad)}
                                  title="Eliminar"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )}
                        {/* Cédula Azul (si existe) */}
                        {currentVehiculo.cedulaAzul && (
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-plp-primary" />
                                Cédula Azul
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">{currentVehiculo.cedulaAzul}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">-</td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                                  onClick={() => handleDownload(currentVehiculo.cedulaAzul)}
                                  title="Descargar"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 p-1 h-auto"
                                  onClick={() => handleDeleteDocument('cedulaAzul', currentVehiculo.cedulaAzul)}
                                  title="Eliminar"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nuevo-seguro">Agregar Nuevo Seguro</Label>
                    <Input
                      id="nuevo-seguro"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => setNewSeguro(e.target.files?.[0] || null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nueva-fecha-vencimiento">Nueva Fecha Vencimiento</Label>
                    <div className="relative mt-1">
                      <Input
                        id="nueva-fecha-vencimiento"
                        type="date"
                        value={fechaVencimientoSeguro ? fechaVencimientoSeguro.toISOString().split('T')[0] : ''}
                        onChange={(e) => setFechaVencimientoSeguro(e.target.value ? new Date(e.target.value) : undefined)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
               
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  className="border border-gray-300 bg-white text-black hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleAddSeguro}
                  disabled={!newSeguro}
                  className="bg-blue-900 hover:bg-blue-800 text-white"
                >
                  Guardar Seguro
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para confirmar eliminación */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          {currentVehiculo && (
            <div>
              <p className="mb-4">
                ¿Está seguro que desea eliminar el vehículo {currentVehiculo.marca} {currentVehiculo.modelo} con patente{" "}
                {currentVehiculo.patente}?
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="border border-gray-300 bg-white text-black hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button type="button" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para agregar nuevo vehículo */}
      <Dialog open={isNewModalOpen} onOpenChange={setIsNewModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Vehículo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddVehiculo} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="clase">Clase de Vehículo</Label>
                <Select
                  value={claseSeleccionada}
                  onValueChange={(value) => {
                    setClaseSeleccionada(value)
                    setSubclaseSeleccionada("") // Reset subclase cuando cambia la clase
                  }}
                >
                  <SelectTrigger id="clase">
                    <SelectValue placeholder="Seleccionar clase" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(clasesVehiculo).map(([clase, info]) => (
                      <SelectItem key={clase} value={clase}>
                        {clase} - {info.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subclase">Subclase</Label>
                <Select
                  value={subclaseSeleccionada}
                  onValueChange={setSubclaseSeleccionada}
                  disabled={!claseSeleccionada}
                >
                  <SelectTrigger id="subclase">
                    <SelectValue placeholder="Seleccionar subclase" />
                  </SelectTrigger>
                  <SelectContent>
                    {claseSeleccionada &&
                      Object.entries(clasesVehiculo[claseSeleccionada as keyof typeof clasesVehiculo].subclases).map(
                        ([subclase, descripcion]) => (
                          <SelectItem key={subclase} value={subclase}>
                            {subclase} - {descripcion}
                          </SelectItem>
                        ),
                      )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="patente">Patente</Label>
                <Input id="patente" name="patente" required />
              </div>
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Input id="marca" name="marca" required />
              </div>
              <div>
                <Label htmlFor="modelo">Modelo</Label>
                <Input id="modelo" name="modelo" required />
              </div>
              <div>
                <Label htmlFor="titular-vehiculo">Nombre completo del titular</Label>
                <Input
                  id="titular-vehiculo"
                  name="titular-vehiculo"
                  value={titularVehiculo}
                  onChange={(e) => setTitularVehiculo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cedula-verde">Cédula Verde</Label>
                <Input
                  id="cedula-verde"
                  name="cedula-verde"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => setNewCedulaVerde(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="seguro">Seguro</Label>
                <Input id="seguro" name="seguro" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required />
              </div>
            </div>

            {tipoSeleccionado === "Acoplado" && (
              <div>
                <Label htmlFor="certificado-seguridad">Certificado de Seguridad Vehicular</Label>
                <Input
                  id="certificado-seguridad"
                  name="certificado-seguridad"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => setNewCertificadoSeguridad(e.target.files?.[0] || null)}
                  required
                />
              </div>
            )}

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="conductor-no-titular"
                checked={conductorNoTitular}
                onChange={(e) => setConductorNoTitular(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="conductor-no-titular" className="text-sm font-medium text-gray-700">
                El vehículo lo conduce alguien que no es el titular
              </Label>
            </div>

            {conductorNoTitular && (
              <div className="mt-4">
                <Label htmlFor="cedula-azul">Cédula Azul</Label>
                <Input
                  id="cedula-azul"
                  name="cedula-azul"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => setNewCedulaAzul(e.target.files?.[0] || null)}
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="fecha-vencimiento-seguro">Fecha Vencimiento Seguro</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="fecha-vencimiento-seguro"
                  name="fecha-vencimiento-seguro"
                  type="date"
                  value={fechaVencimientoSeguro ? fechaVencimientoSeguro.toISOString().split('T')[0] : ''}
                  onChange={(e) => setFechaVencimientoSeguro(e.target.value ? new Date(e.target.value) : undefined)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewModalOpen(false)}
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
    </div>
  )
}
