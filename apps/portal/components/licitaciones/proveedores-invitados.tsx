"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Mail, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search } from "lucide-react"

export interface Proveedor {
  id: string
  razonSocial: string
  cuit: string
  email: string
  personaContacto: string
}

// Simulación de proveedores registrados en el sistema
const proveedoresRegistrados = [
  { id: "1", razonSocial: "Constructora ABC", cuit: "20-12345678-9", email: "contacto@constructoraabc.com", personaContacto: "Juan Pérez" },
  { id: "2", razonSocial: "Suministros XYZ", cuit: "30-23456789-0", email: "info@suministrosxyz.com", personaContacto: "María López" },
  { id: "3", razonSocial: "TecnoServicios", cuit: "20-34567890-1", email: "ventas@tecnoservicios.com", personaContacto: "Carlos Rodríguez" },
  { id: "4", razonSocial: "Logística Rápida", cuit: "30-45678901-2", email: "contacto@logisticarapida.com", personaContacto: "Ana Martínez" },
  {
    id: "5",
    razonSocial: "Insumos Industriales",
    cuit: "20-56789012-3",
    email: "ventas@insumosindustriales.com",
    personaContacto: "Roberto Sánchez",
  },
]

interface ProveedoresInvitadosProps {
  proveedores: Proveedor[]
  onAddProveedor: (proveedor: Omit<Proveedor, "id">) => void
  onRemoveProveedor: (id: string) => void
  titulo?: string
  descripcion?: string
  mostrarCard?: boolean
  resetOnMount?: boolean
}

export function ProveedoresInvitados({ 
  proveedores, 
  onAddProveedor, 
  onRemoveProveedor,
  titulo = "Proveedores a Invitar",
  descripcion = "Seleccione o agregue los proveedores que participarán en la licitación",
  mostrarCard = true,
  resetOnMount = false
}: ProveedoresInvitadosProps) {
  const [nuevoProveedor, setNuevoProveedor] = useState({
    razonSocial: "",
    cuit: "",
    email: "",
    personaContacto: "",
  })
  const [showNoEncontradoModal, setShowNoEncontradoModal] = useState(false)
  const [enviandoInvitacion, setEnviandoInvitacion] = useState(false)
  const [invitacionEnviada, setInvitacionEnviada] = useState(false)
  const [busquedaProveedor, setBusquedaProveedor] = useState("")
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const contenedorRef = useRef<HTMLDivElement>(null)

  const handleAddProveedor = () => {
    if (nuevoProveedor.email) {
      // Verificar si el proveedor existe en el sistema
      const proveedorExistente = proveedoresRegistrados.find(
        (p) => p.email.toLowerCase() === nuevoProveedor.email.toLowerCase(),
      )

      if (proveedorExistente) {
        // Si existe, usamos sus datos
        onAddProveedor({
          razonSocial: proveedorExistente.razonSocial,
          cuit: proveedorExistente.cuit,
          email: proveedorExistente.email,
          personaContacto: proveedorExistente.personaContacto,
        })

        // Limpiar el formulario
        setNuevoProveedor({
          razonSocial: "",
          cuit: "",
          email: "",
          personaContacto: "",
        })
        setBusquedaProveedor("")
        setMostrarSugerencias(false)
      } else if (nuevoProveedor.razonSocial && nuevoProveedor.cuit && nuevoProveedor.email && nuevoProveedor.personaContacto) {
        // Si no existe pero tenemos todos los datos, lo agregamos
        onAddProveedor(nuevoProveedor)

        // Limpiar el formulario
        setNuevoProveedor({
          razonSocial: "",
          cuit: "",
          email: "",
          personaContacto: "",
        })
        setBusquedaProveedor("")
        setMostrarSugerencias(false)
      } else {
        // Si no existe y faltan datos, mostramos el modal
        setShowNoEncontradoModal(true)
      }
    }
  }

  const enviarInvitacion = () => {
    setShowNoEncontradoModal(false)
    setEnviandoInvitacion(true)

    // Simulamos el envío de la invitación (2 segundos)
    setTimeout(() => {
      setEnviandoInvitacion(false)
      setInvitacionEnviada(true)
    }, 2000)
  }

  // Función para filtrar proveedores según el término de búsqueda
  const filtrarProveedores = (termino: string) => {
    if (!termino.trim()) return []
    
    const terminoLower = termino.toLowerCase()
    return proveedoresRegistrados.filter(
      (proveedor) =>
        proveedor.razonSocial.toLowerCase().includes(terminoLower) ||
        proveedor.cuit.includes(terminoLower) ||
        proveedor.email.toLowerCase().includes(terminoLower)
    )
  }

  const proveedoresFiltrados = filtrarProveedores(busquedaProveedor)

  const handleSeleccionarProveedor = (proveedor: typeof proveedoresRegistrados[0]) => {
    setNuevoProveedor({
      razonSocial: proveedor.razonSocial,
      cuit: proveedor.cuit,
      email: proveedor.email,
      personaContacto: proveedor.personaContacto,
    })
    setBusquedaProveedor("")
    setMostrarSugerencias(false)
  }

  // Cerrar sugerencias al hacer clic fuera o cuando el componente se desmonte
  useEffect(() => {
    if (!mostrarSugerencias) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(event.target as Node)
      ) {
        setMostrarSugerencias(false)
      }
    }

    // Usar timeout para evitar que se cierre inmediatamente al hacer click
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside, true)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("mousedown", handleClickOutside, true)
    }
  }, [mostrarSugerencias])

  // Resetear estado cuando resetOnMount cambie (modal se abre/cierra)
  useEffect(() => {
    if (resetOnMount) {
      setBusquedaProveedor("")
      setMostrarSugerencias(false)
    }
  }, [resetOnMount])

  // Cerrar sugerencias cuando el componente se desmonte
  useEffect(() => {
    return () => {
      setMostrarSugerencias(false)
    }
  }, [])

  const contenido = (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-base font-medium">Seleccionar proveedor existente</Label>
        </div>

        <div className="relative w-1/2" ref={contenedorRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por Razón Social, CUIT o Correo electrónico..."
              value={busquedaProveedor}
              onChange={(e) => {
                setBusquedaProveedor(e.target.value)
                setMostrarSugerencias(e.target.value.length > 0)
              }}
              onFocus={() => {
                if (busquedaProveedor.length > 0) {
                  setMostrarSugerencias(true)
                }
              }}
              className="pl-10"
            />
          </div>
          
          {mostrarSugerencias && proveedoresFiltrados.length > 0 && (
            <div 
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {proveedoresFiltrados.map((proveedor) => (
                <div
                  key={proveedor.id}
                  onClick={() => handleSeleccionarProveedor(proveedor)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="font-medium text-sm">{proveedor.razonSocial}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span>CUIT: {proveedor.cuit}</span>
                    <span className="ml-3">Email: {proveedor.email}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {mostrarSugerencias && busquedaProveedor.length > 0 && proveedoresFiltrados.length === 0 && (
            <div 
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
            >
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No se encontraron proveedores
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Label className="text-base font-medium">O ingrese un nuevo proveedor</Label>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="razon-social">Razón Social</Label>
            <Input
              id="razon-social"
              value={nuevoProveedor.razonSocial}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, razonSocial: e.target.value })}
              placeholder="Ingrese la razón social"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuit">CUIT</Label>
            <Input
              id="cuit"
              value={nuevoProveedor.cuit}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, cuit: e.target.value })}
              placeholder="XX-XXXXXXXX-X"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-proveedor">Correo electrónico</Label>
            <div className="flex space-x-2">
              <Input
                id="email-proveedor"
                type="email"
                value={nuevoProveedor.email}
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, email: e.target.value })}
                placeholder="Ingrese el correo electrónico"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="persona-contacto">Persona Contacto</Label>
            <Input
              id="persona-contacto"
              value={nuevoProveedor.personaContacto}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, personaContacto: e.target.value })}
              placeholder="Ingrese la persona de contacto"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleAddProveedor} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </div>

      {proveedores.length > 0 && (
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Razón Social</TableHead>
                <TableHead>CUIT</TableHead>
                <TableHead>Correo electrónico</TableHead>
                <TableHead>Persona Contacto</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proveedores.map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell>{proveedor.razonSocial}</TableCell>
                  <TableCell>{proveedor.cuit}</TableCell>
                  <TableCell>{proveedor.email}</TableCell>
                  <TableCell>{proveedor.personaContacto}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveProveedor(proveedor.id)}
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )

  return (
    <>
      {mostrarCard ? (
        <Card className="border rounded-md">
          {(titulo || descripcion) && (
            <CardHeader>
              {titulo && <CardTitle>{titulo}</CardTitle>}
              {descripcion && <CardDescription>{descripcion}</CardDescription>}
            </CardHeader>
          )}
          <CardContent className="p-4">
            {contenido}
          </CardContent>
        </Card>
      ) : (
        contenido
      )}

      {/* Modal de proveedor no encontrado */}
      <Dialog open={showNoEncontradoModal} onOpenChange={setShowNoEncontradoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Proveedor no encontrado
            </DialogTitle>
            <DialogDescription>
              El proveedor con correo <span className="font-medium">{nuevoProveedor.email}</span> no está registrado en
              el sistema. Por favor complete todos los campos o envíe una invitación.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="outline" onClick={() => setShowNoEncontradoModal(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={enviarInvitacion}>
              <Mail className="h-4 w-4 mr-2" />
              Enviar invitación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de enviando invitación */}
      <Dialog open={enviandoInvitacion} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <h3 className="text-lg font-medium">Enviando invitación</h3>
            <p className="text-sm text-muted-foreground mt-2">Enviando correo a {nuevoProveedor.email}...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de invitación enviada */}
      <Dialog open={invitacionEnviada} onOpenChange={setInvitacionEnviada}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invitación enviada</DialogTitle>
            <DialogDescription>
              Se ha enviado una invitación a <span className="font-medium">{nuevoProveedor.email}</span> exitosamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => setInvitacionEnviada(false)}>
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
