"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

interface ContactoInfo {
  nombre: string
  cargo: string
  email: string
  telefono: string
}

interface BancoInfo {
  numeroCuenta: string
  banco: string
  cbu: string
  alias: string
}

interface InfoFiscal {
  convenioMultilateral: string
  exencionesImpositivas: string
  condicionIVA: string
}

interface DatosGeneralesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  datos: {
    naturalezaOrganizacion: string
    tipoSocietario: string
    razonSocial: string
    cuitCuil: string
    nombreFantasia: string
    estado: "Activo" | "Inactivo" | "Pendiente"
    contacto: ContactoInfo
    banco: BancoInfo
    fiscal: InfoFiscal
  }
  onSave: (datos: any) => void
}

export function EditarDatosModal({ open, onOpenChange, datos, onSave }: DatosGeneralesModalProps) {
  const [formData, setFormData] = useState(datos)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [section, field] = name.split(".")
      setFormData({
        ...formData,
        [section]: {
          ...(formData[section as keyof typeof formData] as any),
          [field]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (value: string, name: string) => {
    if (name.includes(".")) {
      const [section, field] = name.split(".")
      setFormData({
        ...formData,
        [section]: {
          ...(formData[section as keyof typeof formData] as any),
          [field]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    toast({
      title: "Datos actualizados",
      description: "Los datos del proveedor han sido actualizados correctamente.",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Datos Generales</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Información sobre campos no editables */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Información sobre la edición</h3>
              <p className="text-sm text-blue-700">
                Los campos como <strong>Naturaleza de la organización, Tipo societario, Razón Social, CUIT/CUIL, Nombre fantasía y Estado</strong> se modifican através de solicitudes o son administrados por el sistema.
              </p>
              <p className="text-sm text-blue-700 mt-2">
                Puede editar la información de contacto, bancaria y fiscal desde este formulario.
              </p>
            </div>

            {/* Información de contacto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contacto.nombre">Nombre de Contacto</Label>
                  <Input
                    id="contacto.nombre"
                    name="contacto.nombre"
                    value={formData.contacto.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto.cargo">Cargo</Label>
                  <Input
                    id="contacto.cargo"
                    name="contacto.cargo"
                    value={formData.contacto.cargo}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto.email">Email</Label>
                  <Input
                    id="contacto.email"
                    name="contacto.email"
                    type="email"
                    value={formData.contacto.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto.telefono">Teléfono</Label>
                  <Input
                    id="contacto.telefono"
                    name="contacto.telefono"
                    value={formData.contacto.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Información bancaria */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Bancaria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="banco.numeroCuenta">Número de cuenta</Label>
                  <Input
                    id="banco.numeroCuenta"
                    name="banco.numeroCuenta"
                    value={formData.banco.numeroCuenta}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banco.banco">Banco</Label>
                  <Input id="banco.banco" name="banco.banco" value={formData.banco.banco} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banco.cbu">CBU</Label>
                  <Input
                    id="banco.cbu"
                    name="banco.cbu"
                    value={formData.banco.cbu}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banco.alias">Alias</Label>
                  <Input
                    id="banco.alias"
                    name="banco.alias"
                    value={formData.banco.alias}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Información fiscal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Fiscal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fiscal.convenioMultilateral">Convenio multilateral</Label>
                  <Select
                    value={formData.fiscal.convenioMultilateral}
                    onValueChange={(value) => handleSelectChange(value, "fiscal.convenioMultilateral")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sí">Sí</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscal.exencionesImpositivas">Exenciones impositivas</Label>
                  <Select
                    value={formData.fiscal.exencionesImpositivas}
                    onValueChange={(value) => handleSelectChange(value, "fiscal.exencionesImpositivas")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sí">Sí</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscal.condicionIVA">Condición IVA</Label>
                  <Select
                    value={formData.fiscal.condicionIVA}
                    onValueChange={(value) => handleSelectChange(value, "fiscal.condicionIVA")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar condición" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Responsable Inscripto">Responsable Inscripto</SelectItem>
                      <SelectItem value="Monotributista">Monotributista</SelectItem>
                      <SelectItem value="Exento">Exento</SelectItem>
                      <SelectItem value="Consumidor Final">Consumidor Final</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
