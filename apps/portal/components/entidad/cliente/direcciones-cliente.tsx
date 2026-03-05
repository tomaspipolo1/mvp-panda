"use client"

import { useState } from "react"
import { MapPin, PenLine, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

type Direccion = {
  id: string
  tipo: string
  nombre: string
  calle: string
  ciudad: string
  codigoPostal: string
  pais: string
}

export default function DireccionesCliente() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentDireccion, setCurrentDireccion] = useState<Direccion | null>(null)
  const { toast } = useToast()

  const direcciones: Direccion[] = [
    {
      id: "1",
      tipo: "Principal",
      nombre: "Oficina Central",
      calle: "Av. Libertador 1234, Piso 5, Oficina 501",
      ciudad: "Ciudad Autónoma de Buenos Aires",
      codigoPostal: "C1123AAB",
      pais: "Argentina",
    },
    {
      id: "2",
      tipo: "Secundaria",
      nombre: "Centro de Distribución",
      calle: "Ruta Provincial 6, Km 5.5",
      ciudad: "Córdoba",
      codigoPostal: "X5000",
      pais: "Argentina",
    },
    {
      id: "3",
      tipo: "Sucursal",
      nombre: "Sucursal Rosario",
      calle: "Av. Corrientes 2345",
      ciudad: "Rosario",
      codigoPostal: "S2000",
      pais: "Argentina",
    },
  ]

  const handleEditDireccion = (direccion: Direccion) => {
    setCurrentDireccion(direccion)
    setIsEditModalOpen(true)
  }

  const handleSaveDireccion = () => {
    // Aquí iría la lógica para guardar los cambios
    setIsEditModalOpen(false)
    toast({
      title: "Dirección actualizada",
      description: "La dirección ha sido actualizada correctamente.",
    })
  }

  const handleAddDireccion = () => {
    // Aquí iría la lógica para agregar una nueva dirección
    setIsAddModalOpen(false)
    toast({
      title: "Dirección agregada",
      description: "La nueva dirección ha sido agregada correctamente.",
    })
  }

  return (
    <>
      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-semibold">Direcciones</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Contraer" : "Expandir"}
              <svg
                className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{direcciones[0].tipo}</Badge>
                <span className="font-medium">{direcciones[0].nombre}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleEditDireccion(direcciones[0])}
              >
                <PenLine className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-gray-700">
              <p>{direcciones[0].calle}</p>
              <p>
                {direcciones[0].ciudad}, {direcciones[0].codigoPostal}
              </p>
              <p>{direcciones[0].pais}</p>
            </div>
          </div>

          {isExpanded &&
            direcciones.slice(1).map((direccion) => (
              <div key={direccion.id} className="border rounded-lg p-4 mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{direccion.tipo}</Badge>
                    <span className="font-medium">{direccion.nombre}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditDireccion(direccion)}
                  >
                    <PenLine className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-gray-700">
                  <p>{direccion.calle}</p>
                  <p>
                    {direccion.ciudad}, {direccion.codigoPostal}
                  </p>
                  <p>{direccion.pais}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal para Agregar Dirección */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Dirección</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Input id="tipo" placeholder="Principal, Secundaria, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Oficina Central, Depósito, etc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calle">Dirección</Label>
              <Input id="calle" placeholder="Calle, número, piso, etc." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input id="ciudad" placeholder="Ciudad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigoPostal">Código Postal</Label>
                <Input id="codigoPostal" placeholder="Código Postal" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pais">País</Label>
              <Input id="pais" placeholder="País" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddDireccion}>Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Editar Dirección */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Dirección</DialogTitle>
          </DialogHeader>
          {currentDireccion && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-tipo">Tipo</Label>
                  <Input id="edit-tipo" defaultValue={currentDireccion.tipo} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nombre">Nombre</Label>
                  <Input id="edit-nombre" defaultValue={currentDireccion.nombre} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-calle">Dirección</Label>
                <Input id="edit-calle" defaultValue={currentDireccion.calle} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-ciudad">Ciudad</Label>
                  <Input id="edit-ciudad" defaultValue={currentDireccion.ciudad} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-codigoPostal">Código Postal</Label>
                  <Input id="edit-codigoPostal" defaultValue={currentDireccion.codigoPostal} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-pais">País</Label>
                <Input id="edit-pais" defaultValue={currentDireccion.pais} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveDireccion}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
