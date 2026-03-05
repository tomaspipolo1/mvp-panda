"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, UserX, FileText, User, Briefcase, Phone, MapPin, Calendar, Hash, Building, Mail, X } from "lucide-react"
import { useState } from "react"
import { ConfirmarBajaEmpleadoModal } from "./confirmar-baja-empleado-modal"

interface Direccion {
  id: number
  tipo: string
  calle: string
  numero: string
  piso?: string
  departamento?: string
  codigoPostal: string
  localidad: string
  provincia: string
  comentarios?: string
}

interface Empleado {
  id: number
  nombre: string
  apellido: string
  dni: string
  cuil: string
  fechaNacimiento: string
  sexo: string
  legajo: string
  fechaIngreso: string
  gerencia: string
  departamento: string
  cargo: string
  estado: string
  email: string
  telefono: string
  direcciones: Direccion[]
}

interface PerfilEmpleadoModalProps {
  empleado: Empleado | null
  isOpen: boolean
  onClose: () => void
  onEdit: (empleado: Empleado) => void
  onDarDeBaja: (empleado: Empleado) => void
  onGenerarPDF: (empleado: Empleado) => void
}

export function PerfilEmpleadoModal({
  empleado,
  isOpen,
  onClose,
  onEdit,
  onDarDeBaja,
  onGenerarPDF,
}: PerfilEmpleadoModalProps) {
  const [mostrarModalBaja, setMostrarModalBaja] = useState(false)

  if (!empleado) return null

  // Calcular edad
  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  // Formatear fecha
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const manejarBajaEmpleado = async (empleadoId: number, motivo: string, observaciones: string) => {
    try {
      console.log("Dando de baja empleado:", { empleadoId, motivo, observaciones })
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert(`Empleado ${empleado?.nombre} ${empleado?.apellido} dado de baja exitosamente`)

      // Cerrar ambos modales
      setMostrarModalBaja(false)
      onClose()
    } catch (error) {
      console.error("Error al dar de baja empleado:", error)
      alert("Error al dar de baja el empleado")
    }
  }

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Activo: { variant: "default" as const, color: "bg-green-500" },
      Inactivo: { variant: "secondary" as const, color: "bg-red-500" },
      Licencia: { variant: "outline" as const, color: "bg-yellow-500" },
      Vacaciones: { variant: "destructive" as const, color: "bg-blue-500" },
    }
    return variants[estado as keyof typeof variants] || variants.Activo
  }

  const estadoBadge = getEstadoBadge(empleado.estado)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold">Perfil del Empleado</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(empleado)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar empleado
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onGenerarPDF(empleado)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Ver legajo PDF
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setMostrarModalBaja(true)}
              className="flex items-center gap-2"
            >
              <UserX className="h-4 w-4" />
              Dar de baja
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Datos Personales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Datos Personales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      {empleado.nombre} {empleado.apellido}
                    </h3>
                    <Badge variant={estadoBadge.variant} className="mt-2">
                      {empleado.estado}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">DNI</p>
                        <p className="font-medium">{empleado.dni}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">CUIL</p>
                        <p className="font-medium">{empleado.cuil}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Fecha de Nacimiento</p>
                      <p className="font-medium">
                        {formatearFecha(empleado.fechaNacimiento)} ({calcularEdad(empleado.fechaNacimiento)} años)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Sexo</p>
                      <p className="font-medium">{empleado.sexo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datos Laborales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Datos Laborales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Legajo</p>
                      <p className="font-medium">{empleado.legajo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Fecha de Ingreso</p>
                      <p className="font-medium">{formatearFecha(empleado.fechaIngreso)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Gerencia</p>
                      <p className="font-medium">{empleado.gerencia}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Departamento</p>
                      <p className="font-medium">{empleado.departamento}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cargo</p>
                      <p className="font-medium">{empleado.cargo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datos de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Datos de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{empleado.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                    <p className="font-medium">{empleado.telefono}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Direcciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Direcciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {empleado.direcciones && empleado.direcciones.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {empleado.direcciones.map((direccion) => (
                    <Card key={direccion.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{direccion.tipo}</Badge>
                          </div>

                          <div>
                            <p className="font-medium">
                              {direccion.calle} {direccion.numero}
                              {direccion.piso && `, Piso ${direccion.piso}`}
                              {direccion.departamento && `, Depto ${direccion.departamento}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              CP {direccion.codigoPostal}, {direccion.localidad}, {direccion.provincia}
                            </p>
                            {direccion.comentarios && (
                              <p className="text-sm text-muted-foreground mt-2">{direccion.comentarios}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Este empleado no tiene direcciones cargadas.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Modal de confirmación de baja */}
        <ConfirmarBajaEmpleadoModal
          empleado={empleado}
          isOpen={mostrarModalBaja}
          onClose={() => setMostrarModalBaja(false)}
          onConfirm={manejarBajaEmpleado}
        />
      </DialogContent>
    </Dialog>
  )
}
