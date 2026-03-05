"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface DireccionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (direccion: any) => void
  direccion?: {
    tipo: string
    nombre: string
    calle: string
    adicional?: string
    ciudad: string
    codigoPostal: string
    pais: string
  }
  isEditing?: boolean
}

export function AgregarDireccionModal({
  open,
  onOpenChange,
  onSave,
  direccion,
  isEditing = false,
}: DireccionModalProps) {
  const [formData, setFormData] = useState(
    direccion || {
      tipo: "",
      nombre: "",
      calle: "",
      adicional: "",
      ciudad: "",
      codigoPostal: "",
      pais: "Argentina",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    toast({
      title: isEditing ? "Dirección actualizada" : "Dirección agregada",
      description: isEditing
        ? "La dirección ha sido actualizada correctamente."
        : "La dirección ha sido agregada correctamente.",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Dirección" : "Agregar Dirección"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Domicilio</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleSelectChange(value, "tipo")} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Fiscal">Fiscal</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Secundaria">Secundaria</SelectItem>
                    <SelectItem value="Sucursal">Sucursal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la Dirección</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Oficina Central"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calle">Dirección</Label>
              <Input
                id="calle"
                name="calle"
                value={formData.calle}
                onChange={handleChange}
                placeholder="Calle, número, piso, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adicional">Información Adicional (opcional)</Label>
              <Input
                id="adicional"
                name="adicional"
                value={formData.adicional}
                onChange={handleChange}
                placeholder="Ej: Parque Industrial, Edificio B"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigoPostal">Código Postal</Label>
                <Input
                  id="codigoPostal"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pais">País</Label>
              <Select value={formData.pais} onValueChange={(value) => handleSelectChange(value, "pais")} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Argentina">Argentina</SelectItem>
                  <SelectItem value="Brasil">Brasil</SelectItem>
                  <SelectItem value="Chile">Chile</SelectItem>
                  <SelectItem value="Uruguay">Uruguay</SelectItem>
                  <SelectItem value="Paraguay">Paraguay</SelectItem>
                  <SelectItem value="Bolivia">Bolivia</SelectItem>
                  <SelectItem value="Perú">Perú</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Actualizar" : "Guardar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
