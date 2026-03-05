"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Upload, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModalNuevoPersonal } from "@/components/personal/modal-nuevo-personal"
import { ModalCargarArchivoPersonal } from "@/components/personal/modal-cargar-archivo-personal"
import { ModalEditarPersonal } from "@/components/personal/modal-editar-personal"
import { ModalEliminarPersonal } from "@/components/personal/modal-eliminar-personal"

interface PersonalData {
  id: number
  nombreCompleto: string
  dni: string
  telefono: string
}

const initialPersonalData: PersonalData[] = [
  {
    id: 1,
    nombreCompleto: "Juan Carlos Pérez",
    dni: "12.345.678",
    telefono: "+54 11 1234-5678",
  },
  {
    id: 2,
    nombreCompleto: "María Elena González",
    dni: "23.456.789",
    telefono: "+54 11 2345-6789",
  },
  {
    id: 3,
    nombreCompleto: "Roberto Silva",
    dni: "34.567.890",
    telefono: "+54 11 3456-7890",
  },
]

export default function MiPersonalPage() {
  const [personalData, setPersonalData] = useState<PersonalData[]>(initialPersonalData)
  const [searchTerm, setSearchTerm] = useState("")
  const [modals, setModals] = useState({
    nuevo: false,
    cargarArchivo: false,
    editar: false,
    eliminar: false,
  })
  const [selectedPersonal, setSelectedPersonal] = useState<PersonalData | null>(null)

  const filteredPersonal = personalData.filter(
    (person) =>
      person.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.dni.includes(searchTerm) ||
      person.telefono.includes(searchTerm),
  )

  const openModal = (modalName: keyof typeof modals, personal?: PersonalData) => {
    if (personal) setSelectedPersonal(personal)
    setModals((prev) => ({ ...prev, [modalName]: true }))
  }

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }))
    setSelectedPersonal(null)
  }

  const handleSaveNuevo = (data: { nombreCompleto: string; dni: string; telefono: string }) => {
    const newId = Math.max(...personalData.map((p) => p.id), 0) + 1
    const newPersonal = { id: newId, ...data }
    setPersonalData((prev) => [...prev, newPersonal])
  }

  const handleSaveEditar = (data: PersonalData) => {
    setPersonalData((prev) => prev.map((p) => (p.id === data.id ? data : p)))
  }

  const handleConfirmDelete = (id: number) => {
    setPersonalData((prev) => prev.filter((p) => p.id !== id))
  }

  const handleFileUpload = (file: File) => {
    console.log("Archivo cargado:", file.name)
    // Simulación de carga de archivo
    const mockData: PersonalData[] = [
      {
        id: Math.max(...personalData.map((p) => p.id), 0) + 1,
        nombreCompleto: "Jorge Luis Borges",
        dni: "67.890.123",
        telefono: "+54 11 6789-0123",
      },
    ]
    setPersonalData((prev) => [...prev, ...mockData])
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mi Personal</h1>
          <p className="text-muted-foreground">Gestiona la información de tu personal</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => openModal("cargarArchivo")} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Cargar Archivo de Personal
          </Button>
          <Button onClick={() => openModal("nuevo")}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Personal
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Personal</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar personal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPersonal.length > 0 ? (
                  filteredPersonal.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">{person.nombreCompleto}</TableCell>
                      <TableCell>{person.dni}</TableCell>
                      <TableCell>{person.telefono}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openModal("editar", person)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openModal("eliminar", person)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm ? "No se encontraron resultados" : "No hay personal registrado"}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modales */}
      <ModalNuevoPersonal isOpen={modals.nuevo} onClose={() => closeModal("nuevo")} onSave={handleSaveNuevo} />

      <ModalCargarArchivoPersonal
        isOpen={modals.cargarArchivo}
        onClose={() => closeModal("cargarArchivo")}
        onUpload={handleFileUpload}
      />

      <ModalEditarPersonal
        isOpen={modals.editar}
        onClose={() => closeModal("editar")}
        onSave={handleSaveEditar}
        personalData={selectedPersonal}
      />

      <ModalEliminarPersonal
        isOpen={modals.eliminar}
        onClose={() => closeModal("eliminar")}
        onConfirm={handleConfirmDelete}
        personalData={selectedPersonal}
      />
    </div>
  )
}
