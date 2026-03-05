"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Usuario } from "./tabla-usuarios"

interface ModalNuevoUsuarioProps {
  isOpen: boolean
  onClose: () => void
  onCrear: (usuario: Omit<Usuario, "id" | "estado" | "roles"> & { roles?: string[] }) => void
}

export function ModalNuevoUsuario({ isOpen, onClose, onCrear }: ModalNuevoUsuarioProps) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    password: "",
    confirmarPassword: "",
    dni: "",
    telefono: "",
    fechaNacimiento: "",
    noRobot: false,
    aceptaTerminos: false,
  })

  const resetForm = () =>
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      username: "",
      password: "",
      confirmarPassword: "",
      dni: "",
      telefono: "",
      fechaNacimiento: "",
      noRobot: false,
      aceptaTerminos: false,
    })

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const puedeCrear =
    form.nombre.trim() &&
    form.apellido.trim() &&
    form.email.trim() &&
    form.username.trim() &&
    form.password.trim() &&
    form.confirmarPassword.trim() &&
    form.password === form.confirmarPassword &&
    form.dni.trim() &&
    form.telefono.trim() &&
    form.fechaNacimiento &&
    form.noRobot &&
    form.aceptaTerminos

  const handleCrear = () => {
    if (!puedeCrear) return
    onCrear({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim(),
      dni: form.dni.trim(),
      telefono: form.telefono.trim(),
      fechaNacimiento: form.fechaNacimiento,
      // Passwords no se guardan en el mock; solo se mostraría en un flujo real de backend
    })
    resetForm()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Nuevo usuario</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Completa los datos para crear la cuenta (mock).
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Nombre</Label>
            <Input
              placeholder="Ingrese su nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div>
            <Label>Apellido</Label>
            <Input
              placeholder="Ingrese su apellido"
              value={form.apellido}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            />
          </div>
          <div>
            <Label>Correo electrónico</Label>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <Label>Nombre de usuario</Label>
            <Input
              placeholder="Elija un nombre de usuario"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div>
            <Label>Contraseña</Label>
            <Input
              type="password"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div>
            <Label>Confirmar contraseña</Label>
            <Input
              type="password"
              placeholder="********"
              value={form.confirmarPassword}
              onChange={(e) => setForm({ ...form, confirmarPassword: e.target.value })}
            />
          </div>
          <div>
            <Label>DNI</Label>
            <Input
              placeholder="Ingrese su DNI"
              value={form.dni}
              onChange={(e) => setForm({ ...form, dni: e.target.value })}
            />
          </div>
          <div>
            <Label>Teléfono</Label>
            <Input
              placeholder="Ingrese su teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
          </div>
          <div>
            <Label>Fecha de nacimiento</Label>
            <Input
              type="date"
              value={form.fechaNacimiento}
              onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
            />
          </div>
          
        </div>


        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <div className="flex items-center gap-3">
            
            <Button className="bg-blue-600 hover:bg-blue-700" disabled={!puedeCrear} onClick={handleCrear}>
              Crear cuenta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
