"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Usuario } from "./tabla-usuarios"

interface RolesUsuarioModalProps {
  isOpen: boolean
  usuario: Usuario | null
  rolesDisponibles: string[]
  onClose: () => void
  onGuardar: (roles: string[]) => void
}

export function RolesUsuarioModal({ isOpen, usuario, rolesDisponibles, onClose, onGuardar }: RolesUsuarioModalProps) {
  const [rolesSeleccionados, setRolesSeleccionados] = useState<string[]>([])

  useEffect(() => {
    if (usuario) {
      setRolesSeleccionados(usuario.roles)
    } else {
      setRolesSeleccionados([])
    }
  }, [usuario, isOpen])

  const toggleRol = (rol: string) => {
    setRolesSeleccionados((prev) =>
      prev.includes(rol) ? prev.filter((r) => r !== rol) : [...prev, rol]
    )
  }

  const handleGuardar = () => {
    onGuardar(rolesSeleccionados)
  }

  if (!isOpen || !usuario) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Roles de {usuario.nombre} {usuario.apellido}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Activa o desactiva los roles disponibles para este usuario.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {rolesDisponibles.map((rol) => (
            <label key={rol} className="flex items-center space-x-3 rounded-md border px-3 py-2 hover:bg-gray-50">
              <Checkbox
                checked={rolesSeleccionados.includes(rol)}
                onCheckedChange={() => toggleRol(rol)}
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{rol}</p>
                <p className="text-xs text-gray-500">Permisos relacionados al rol {rol}.</p>
              </div>
            </label>
          ))}
          {rolesDisponibles.length === 0 && (
            <p className="text-sm text-gray-500">No hay roles configurados.</p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGuardar}>
            Guardar roles
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
