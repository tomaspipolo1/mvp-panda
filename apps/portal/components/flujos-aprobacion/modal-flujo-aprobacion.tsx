"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlujoAprobacion, TipoFlujo, TIPOS_FLUJOS } from "@/app/(user-pages)/admin/admin/flujos-aprobacion/page"
import { SelectorAprobadores } from "@/components/flujos-aprobacion/selector-aprobadores"

interface ModalFlujoAprobacionProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (flujoData: Partial<FlujoAprobacion>) => void
  modo: "create" | "edit" | "view"
  flujo?: FlujoAprobacion | null
}

export function ModalFlujoAprobacion({ isOpen, onClose, onConfirm, modo, flujo }: ModalFlujoAprobacionProps) {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [categoria, setCategoria] = useState<"SOLICITUDES" | "VISITAS">("SOLICITUDES")
  const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null)
  const [activo, setActivo] = useState(true)
  const [aprobadores, setAprobadores] = useState<any[]>([])

  useEffect(() => {
    if (flujo && modo !== "create") {
      setNombre(flujo.nombre)
      setDescripcion(flujo.descripcion || "")
      setCategoria(flujo.tipo.categoria)
      setTipoFlujo(flujo.tipo)
      setActivo(flujo.activo)
      setAprobadores(flujo.aprobadores || [])
    } else {
      setNombre("")
      setDescripcion("")
      setCategoria("SOLICITUDES")
      setTipoFlujo(null)
      setActivo(true)
      setAprobadores([])
    }
  }, [flujo, modo, isOpen])

  const tiposDisponibles = categoria === "SOLICITUDES" ? TIPOS_FLUJOS.SOLICITUDES : TIPOS_FLUJOS.VISITAS

  const handleTipoChange = (tipoId: string) => {
    const tipo = tiposDisponibles.find((t) => t.id === tipoId)
    if (tipo) {
      setTipoFlujo({ categoria, id: tipo.id, nombre: tipo.nombre })
    }
  }

  const handleCategoriaChange = (cat: "SOLICITUDES" | "VISITAS") => {
    setCategoria(cat)
    setTipoFlujo(null)
  }

  const handleSubmit = () => {
    if (!nombre || !tipoFlujo) {
      return
    }

    const flujoData: Partial<FlujoAprobacion> = {
      nombre,
      descripcion,
      tipo: tipoFlujo,
      activo,
      aprobadores: aprobadores.map((ap, idx) => ({ ...ap, orden: idx + 1 })),
    }

    if (flujo) {
      flujoData.id = flujo.id
    }

    onConfirm(flujoData)
  }

  const isDisabled = modo === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {modo === "create" ? "Nuevo Flujo de Aprobación" : modo === "edit" ? "Editar Flujo de Aprobación" : "Ver Flujo de Aprobación"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Flujo *</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={isDisabled}
                placeholder="Ej: Flujo de Inscripción de Proveedores"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría *</Label>
              <Select value={categoria} onValueChange={handleCategoriaChange} disabled={isDisabled}>
                <SelectTrigger id="categoria">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOLICITUDES">Solicitudes</SelectItem>
                  <SelectItem value="VISITAS">Visitas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tipo">Tipo de Flujo *</Label>
              <Select
                value={tipoFlujo?.id || ""}
                onValueChange={handleTipoChange}
                disabled={isDisabled || !categoria}
              >
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposDisponibles.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                disabled={isDisabled}
                placeholder="Descripción opcional del flujo"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <Switch id="activo" checked={activo} onCheckedChange={setActivo} disabled={isDisabled} />
              <Label htmlFor="activo">Flujo activo</Label>
            </div>
          </div>

          {/* Selector de aprobadores */}
          {tipoFlujo && (
            <Card>
              <CardHeader>
                <CardTitle>Configurar Aprobadores</CardTitle>
              </CardHeader>
              <CardContent>
                <SelectorAprobadores
                  aprobadores={aprobadores}
                  onAprobadoresChange={setAprobadores}
                  disabled={isDisabled}
                />
              </CardContent>
            </Card>
          )}

          {/* Botones */}
          {!isDisabled && (
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={!nombre || !tipoFlujo || aprobadores.length === 0}>
                {modo === "create" ? "Crear Flujo" : "Guardar Cambios"}
              </Button>
            </div>
          )}

          {isDisabled && (
            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

