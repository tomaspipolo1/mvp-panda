"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Usuario } from "./tabla-usuarios"

type ModalMode = "view" | "edit"

interface UsuarioModalProps {
  isOpen: boolean
  mode: ModalMode
  usuario: Usuario | null
  onClose: () => void
  onGuardar?: (usuario: Usuario) => void
}

const estados: Usuario["estado"][] = ["Activo", "Inactivo", "Bloqueado"]

export function UsuarioModal({ isOpen, mode, usuario, onClose, onGuardar }: UsuarioModalProps) {
  const [localUsuario, setLocalUsuario] = useState<Usuario | null>(usuario)

  useEffect(() => {
    setLocalUsuario(usuario)
  }, [usuario, isOpen])

  const isReadOnly = mode === "view"
  const titulo = mode === "view" ? "Detalle del usuario" : "Editar usuario"

  const puedeGuardar = useMemo(() => {
    if (!localUsuario) return false
    return (
      localUsuario.email.trim() &&
      localUsuario.nombre.trim() &&
      localUsuario.apellido.trim() &&
      localUsuario.dni.trim() &&
      localUsuario.telefono.trim() &&
      localUsuario.fechaNacimiento.trim()
    )
  }, [localUsuario])

  const handleGuardar = () => {
    if (!localUsuario || !onGuardar) return
    onGuardar(localUsuario)
  }

  if (!isOpen || !usuario) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{titulo}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Visualiza o edita los datos básicos del usuario.
          </DialogDescription>
        </DialogHeader>

        {localUsuario && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={localUsuario.email}
                  onChange={(e) => setLocalUsuario({ ...localUsuario, email: e.target.value })}
                  disabled={isReadOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  value={localUsuario.dni}
                  onChange={(e) => setLocalUsuario({ ...localUsuario, dni: e.target.value })}
                  disabled={isReadOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={localUsuario.nombre}
                  onChange={(e) => setLocalUsuario({ ...localUsuario, nombre: e.target.value })}
                  disabled={isReadOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={localUsuario.apellido}
                  onChange={(e) => setLocalUsuario({ ...localUsuario, apellido: e.target.value })}
                  disabled={isReadOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={localUsuario.telefono}
                  onChange={(e) => setLocalUsuario({ ...localUsuario, telefono: e.target.value })}
                  disabled={isReadOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={localUsuario.fechaNacimiento}
                  onChange={(e) => setLocalUsuario({ ...localUsuario, fechaNacimiento: e.target.value })}
                  disabled={isReadOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select
                  value={localUsuario.estado}
                  onValueChange={(value: Usuario["estado"]) => setLocalUsuario({ ...localUsuario, estado: value })}
                  disabled={isReadOnly}
                >
                  <SelectTrigger id="estado" className="mt-1">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="roles">Roles (vista rápida)</Label>
                <Textarea
                  id="roles"
                  value={localUsuario.roles.join(", ")}
                  disabled
                  className="mt-1"
                  placeholder="Sin roles"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {mode === "edit" && (
            <Button
              onClick={handleGuardar}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!puedeGuardar}
            >
              Guardar cambios
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
