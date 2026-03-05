"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, Trash2, Plus, FileText, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DatePickerModal } from "@/components/ui/date-picker-modal"

// Datos de ejemplo para la tabla
const conductoresData = [
  {
    id: 1,
    nombre: "Juan Pérez",
    dni: "25456789",
    telefono: "11-2345-6789",
    email: "juan.perez@email.com",
    numeroLicencia: "A-12345678",
    licencia: "licencia_juan.pdf",
    fechaVencimientoLicencia: "2025-05-15",
    categorias: ["A.1", "B.1"],
  },
  {
    id: 2,
    nombre: "María González",
    dni: "30123456",
    telefono: "11-8765-4321",
    email: "maria.gonzalez@email.com",
    numeroLicencia: "B-87654321",
    licencia: "licencia_maria.pdf",
    fechaVencimientoLicencia: "2025-06-20",
    categorias: ["C.1", "D.1"],
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    dni: "28901234",
    telefono: "11-5678-1234",
    email: "", // Email vacío para mostrar que es opcional
    numeroLicencia: "C-23456789",
    licencia: "licencia_carlos.pdf",
    fechaVencimientoLicencia: "2025-07-10",
    categorias: ["E.1"],
  },
  {
    id: 4,
    nombre: "Laura Martínez",
    dni: "32567890",
    telefono: "11-4321-8765",
    email: "laura.martinez@email.com",
    numeroLicencia: "D-34567890",
    licencia: "licencia_laura.pdf",
    fechaVencimientoLicencia: "2025-04-30",
    categorias: ["B.2", "F"],
  },
  {
    id: 5,
    nombre: "Roberto Sánchez",
    dni: "27345678",
    telefono: "11-9876-5432",
    email: "roberto.sanchez@email.com",
    numeroLicencia: "E-45678901",
    licencia: "licencia_roberto.pdf",
    fechaVencimientoLicencia: "2025-08-05",
    categorias: ["D.2", "G.1"],
  },
]

// Datos de ejemplo para Mi Personal
const personalData = [
  {
    id: 1,
    nombre: "Juan Pérez",
    dni: "25456789",
    telefono: "11-2345-6789",
  },
  {
    id: 2,
    nombre: "María González",
    dni: "30123456",
    telefono: "11-8765-4321",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    dni: "28901234",
    telefono: "11-5678-1234",
  },
  {
    id: 4,
    nombre: "Laura Martínez",
    dni: "32567890",
    telefono: "11-4321-8765",
  },
  {
    id: 5,
    nombre: "Roberto Sánchez",
    dni: "27345678",
    telefono: "11-9876-5432",
  },
  {
    id: 6,
    nombre: "Ana López",
    dni: "29876543",
    telefono: "11-2233-4455",
  },
  {
    id: 7,
    nombre: "Pedro Gómez",
    dni: "31234567",
    telefono: "11-6677-8899",
  },
]

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

export default function MisConductoresComponent() {
  const [conductores, setConductores] = useState(conductoresData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [currentConductor, setCurrentConductor] = useState<any>(null)
  const [newLicencia, setNewLicencia] = useState<File | null>(null)
  const [fechaVencimientoLicencia, setFechaVencimientoLicencia] = useState<Date | undefined>(undefined)
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([])

  // Nuevo estado para el formulario de nuevo conductor
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    email: "",
    numeroLicencia: "",
  })

  // Estado para el autocompletado
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedPersonal, setSelectedPersonal] = useState<any>(null)

  // Función para manejar la visualización/edición de un conductor
  const handleEdit = (conductor: any) => {
    setCurrentConductor(conductor)
    // Convertir la fecha de string a Date para el DatePicker
    setFechaVencimientoLicencia(
      conductor.fechaVencimientoLicencia ? new Date(conductor.fechaVencimientoLicencia) : undefined,
    )
    setCategoriasSeleccionadas(conductor.categorias || [])
    setIsEditModalOpen(true)
  }

  // Función para manejar la eliminación de un conductor
  const handleDelete = (conductor: any) => {
    setCurrentConductor(conductor)
    setIsDeleteModalOpen(true)
  }

  // Función para confirmar la eliminación
  const confirmDelete = () => {
    setConductores(conductores.filter((c) => c.id !== currentConductor.id))
    setIsDeleteModalOpen(false)
  }

  // Función para agregar una nueva licencia
  const handleAddLicencia = () => {
    if (newLicencia) {
      // Aquí iría la lógica para subir el archivo al servidor
      // Por ahora solo actualizamos el estado local
      const updatedConductores = conductores.map((c) => {
        if (c.id === currentConductor.id) {
          return {
            ...c,
            licencia: newLicencia.name,
            fechaVencimientoLicencia: fechaVencimientoLicencia
              ? fechaVencimientoLicencia.toISOString().split("T")[0]
              : c.fechaVencimientoLicencia,
            categorias: categoriasSeleccionadas.length > 0 ? categoriasSeleccionadas : c.categorias,
          }
        }
        return c
      })
      setConductores(updatedConductores)
      setNewLicencia(null)
      setFechaVencimientoLicencia(undefined)
      setCategoriasSeleccionadas([])
      setIsEditModalOpen(false)
    }
  }

  // Función para buscar personal al escribir en el campo de nombre
  const handleSearchPersonal = (value: string) => {
    setSearchTerm(value)
    setFormData({
      ...formData,
      nombre: value,
    })

    if (value.length > 1) {
      const filtered = personalData.filter((person) => person.nombre.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Función para seleccionar una persona de las sugerencias
  const handleSelectPersonal = (person: any) => {
    setSelectedPersonal(person)
    setFormData({
      ...formData,
      nombre: person.nombre,
      dni: person.dni,
      telefono: person.telefono,
    })
    setShowSuggestions(false)
  }

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "nombre") {
      handleSearchPersonal(value)
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Función para agregar un nuevo conductor
  const handleAddConductor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nuevoConductor = {
      id: conductores.length + 1,
      nombre: formData.nombre,
      dni: formData.dni,
      telefono: formData.telefono,
      email: formData.email,
      numeroLicencia: formData.numeroLicencia,
      licencia: newLicencia ? newLicencia.name : "sin_licencia.pdf",
      fechaVencimientoLicencia: fechaVencimientoLicencia
        ? fechaVencimientoLicencia.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      categorias: categoriasSeleccionadas.length > 0 ? categoriasSeleccionadas : ["B"],
    }

    setConductores([...conductores, nuevoConductor])

    // Resetear el formulario
    setFormData({
      nombre: "",
      dni: "",
      telefono: "",
      email: "",
      numeroLicencia: "",
    })
    setSelectedPersonal(null)
    setCategoriasSeleccionadas([])
    setFechaVencimientoLicencia(undefined)
    setNewLicencia(null)
    setIsNewModalOpen(false)
  }

  // Resetear el formulario al abrir el modal
  useEffect(() => {
    if (isNewModalOpen) {
      setFormData({
        nombre: "",
        dni: "",
        telefono: "",
        email: "",
        numeroLicencia: "",
      })
      setSelectedPersonal(null)
      setCategoriasSeleccionadas([])
      setFechaVencimientoLicencia(undefined)
      setNewLicencia(null)
    }
  }, [isNewModalOpen])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Conductores</h1>
        <Button
          onClick={() => setIsNewModalOpen(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
        >
          <Plus className="mr-2 h-4 w-4 inline" /> Nuevo Conductor
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="categoria-filter">Categoría de Licencia</Label>
              <Select>
                <SelectTrigger id="categoria-filter">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  {categoriasLicencia.map((categoria) => (
                    <SelectItem key={categoria} value={categoria.toLowerCase()}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nombre-filter">Nombre o DNI</Label>
              <Input id="nombre-filter" placeholder="Buscar por nombre o DNI" />
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
                  N° 
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Licencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Licencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
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
              {conductores.map((conductor) => (
                <tr key={conductor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{conductor.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conductor.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conductor.dni}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conductor.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {conductor.email || "No especificado"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conductor.numeroLicencia}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" className="text-plp-primary hover:text-plp-dark p-0">
                      <FileText className="h-4 w-4 mr-1" /> {conductor.licencia}
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {conductor.categorias.map((cat) => (
                        <Badge key={cat} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(conductor.fechaVencimientoLicencia).toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(conductor)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(conductor)}
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

      {/* Modal para ver/editar conductor */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Conductor</DialogTitle>
          </DialogHeader>
          {currentConductor && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" value={currentConductor.nombre} disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="dni">DNI</Label>
                  <Input id="dni" value={currentConductor.dni} disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" value={currentConductor.telefono} disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={currentConductor.email || ""} disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="numeroLicencia">N° Licencia</Label>
                  <Input id="numeroLicencia" value={currentConductor.numeroLicencia} disabled className="bg-gray-100" />
                </div>
              </div>
              <div>
                <Label htmlFor="licencia-actual">Licencia Actual</Label>
                <div className="flex items-center mt-1">
                  <FileText className="h-4 w-4 mr-2 text-plp-primary" />
                  <span className="text-sm">{currentConductor.licencia}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categorias-actual">Categorías Actuales</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentConductor.categorias.map((cat) => (
                      <Badge key={cat} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="fecha-vencimiento-actual">Fecha Vencimiento Actual</Label>
                  <Input
                    id="fecha-vencimiento-actual"
                    value={new Date(currentConductor.fechaVencimientoLicencia).toLocaleDateString("es-AR")}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="nuevas-categorias">Nuevas Categorías</Label>
                <div className="border rounded-md p-4">
                  <p className="text-sm text-gray-500 mb-3">Seleccione todas las categorías que apliquen:</p>
                  <div className="grid grid-cols-6 gap-3">
                    {categoriasLicencia.map((categoria) => (
                      <div key={categoria} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`nueva-categoria-${categoria}`}
                          checked={categoriasSeleccionadas.includes(categoria)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria])
                            } else {
                              setCategoriasSeleccionadas(categoriasSeleccionadas.filter((cat) => cat !== categoria))
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-plp-primary focus:ring-plp-primary"
                        />
                        <label htmlFor={`nueva-categoria-${categoria}`} className="text-sm font-medium text-gray-700">
                          {categoria}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="nueva-licencia">Agregar Nueva Licencia</Label>
                <Input
                  id="nueva-licencia"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => setNewLicencia(e.target.files?.[0] || null)}
                  className="mt-1"
                />
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
                  onClick={handleAddLicencia}
                  disabled={!newLicencia}
                  className="bg-blue-900 hover:bg-blue-800 text-white"
                >
                  Guardar Licencia
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
          {currentConductor && (
            <div>
              <p className="mb-4">
                ¿Está seguro que desea eliminar al conductor {currentConductor.nombre} con DNI {currentConductor.dni}?
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

      {/* Modal para agregar nuevo conductor */}
      <Dialog open={isNewModalOpen} onOpenChange={setIsNewModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Conductor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddConductor} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <div className="relative">
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Comience a escribir para buscar en Mi Personal..."
                    className="pr-10"
                    required
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

                  {/* Sugerencias de autocompletado */}
                  {showSuggestions && (
                    <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                      {suggestions.map((person) => (
                        <div
                          key={person.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectPersonal(person)}
                        >
                          <div className="font-medium">{person.nombre}</div>
                          <div className="text-sm text-gray-500">DNI: {person.dni}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedPersonal && (
                  <p className="text-sm text-green-600 mt-1">Personal seleccionado: {selectedPersonal.nombre}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  className={selectedPersonal ? "bg-gray-50" : ""}
                  readOnly={!!selectedPersonal}
                  required
                />
              </div>

              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className={selectedPersonal ? "bg-gray-50" : ""}
                  readOnly={!!selectedPersonal}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email (Opcional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="numeroLicencia">N° de Licencia</Label>
                <Input
                  id="numeroLicencia"
                  name="numeroLicencia"
                  value={formData.numeroLicencia}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="fecha-vencimiento-licencia">Fecha Vencimiento Licencia</Label>
                <DatePickerModal date={fechaVencimientoLicencia} setDate={setFechaVencimientoLicencia} />
                <input
                  type="hidden"
                  name="fecha-vencimiento-licencia"
                  value={fechaVencimientoLicencia ? fechaVencimientoLicencia.toISOString().split("T")[0] : ""}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="categorias">Categorías de Licencia</Label>
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500 mb-3">Seleccione todas las categorías que apliquen:</p>
                <div className="grid grid-cols-6 gap-3">
                  {categoriasLicencia.map((categoria) => (
                    <div key={categoria} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`categoria-${categoria}`}
                        checked={categoriasSeleccionadas.includes(categoria)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria])
                          } else {
                            setCategoriasSeleccionadas(categoriasSeleccionadas.filter((cat) => cat !== categoria))
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-plp-primary focus:ring-plp-primary"
                      />
                      <label htmlFor={`categoria-${categoria}`} className="text-sm font-medium text-gray-700">
                        {categoria}
                      </label>
                    </div>
                  ))}
                </div>
                {categoriasSeleccionadas.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">Seleccione al menos una categoría</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="licencia">Licencia de Conducir</Label>
              <Input
                id="licencia"
                name="licencia"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setNewLicencia(e.target.files?.[0] || null)}
                required
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewModalOpen(false)}
                className="border border-gray-300 bg-white text-black hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white"
                disabled={
                  !formData.nombre ||
                  !formData.dni ||
                  !formData.telefono ||
                  !formData.numeroLicencia ||
                  categoriasSeleccionadas.length === 0 ||
                  !newLicencia
                }
              >
                Guardar Conductor
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
