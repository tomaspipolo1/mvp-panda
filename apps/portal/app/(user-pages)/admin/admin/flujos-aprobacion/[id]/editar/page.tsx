"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { SelectorAprobadores } from "@/components/flujos-aprobacion/selector-aprobadores"
import { TIPOS_FLUJOS, TipoFlujo, Aprobador, FlujoAprobacion } from "../../types"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo - En producción vendría de la API
const flujosData: Record<string, FlujoAprobacion> = {
  "1": {
    id: "1",
    nombre: "Flujo de Inscripción de Proveedores",
    tipo: { categoria: "SOLICITUDES", id: "inscripcion", nombre: "Solicitud de Inscripción" },
    descripcion: "Flujo de aprobación para nuevas inscripciones de proveedores",
    activo: true,
    aprobadores: [
      { id: "a1", rol: "Gerente", cargo: "GER", usuarioId: "u1", usuarioNombre: "Carlos Mendoza", orden: 1 },
      { id: "a2", rol: "Director", cargo: "DIR", usuarioId: "u10", usuarioNombre: "Dr. Eduardo Fernández", orden: 2 },
    ],
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-01-20",
  },
}

export default function EditarFlujoPage({ params }: { params: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [flujoId, setFlujoId] = useState<string | null>(null)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [categoria, setCategoria] = useState<"SOLICITUDES" | "VISITAS">("SOLICITUDES")
  const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null)
  const [activo, setActivo] = useState(true)
  const [aprobadores, setAprobadores] = useState<Aprobador[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params
      setFlujoId(resolvedParams.id)
    }
    unwrapParams()
  }, [params])

  useEffect(() => {
    if (!flujoId) return

    // Simular carga de datos
    const flujoEncontrado = flujosData[flujoId]
    if (flujoEncontrado) {
      setNombre(flujoEncontrado.nombre)
      setDescripcion(flujoEncontrado.descripcion || "")
      setCategoria(flujoEncontrado.tipo.categoria)
      setTipoFlujo(flujoEncontrado.tipo)
      setActivo(flujoEncontrado.activo)
      setAprobadores(flujoEncontrado.aprobadores)
      setLoading(false)
    } else {
      router.push("/admin/admin/flujos-aprobacion")
    }
  }, [flujoId, router])

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
      toast({
        title: "Error",
        description: "Debe completar el nombre y seleccionar un tipo de flujo",
        variant: "destructive",
      })
      return
    }

    if (aprobadores.length === 0) {
      toast({
        title: "Error",
        description: "Debe agregar al menos un aprobador",
        variant: "destructive",
      })
      return
    }

    const flujoData: Partial<FlujoAprobacion> = {
      nombre,
      descripcion,
      tipo: tipoFlujo,
      activo,
      aprobadores: aprobadores.map((ap, idx) => ({ ...ap, orden: idx + 1 })),
    }

    console.log("Actualizando flujo:", flujoData)

    toast({
      title: "Flujo actualizado",
      description: `El flujo "${nombre}" ha sido actualizado exitosamente.`,
    })

    router.push("/admin/admin/flujos-aprobacion")
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando flujo...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/admin/flujos-aprobacion")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al listado
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Editar Flujo de Aprobación</h1>
            <p className="text-muted-foreground">Modifique la configuración del flujo de aprobación</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Flujo</CardTitle>
            <CardDescription>Complete los datos básicos del flujo de aprobación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Flujo *</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Flujo de Inscripción de Proveedores"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select value={categoria} onValueChange={handleCategoriaChange}>
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
                <Select value={tipoFlujo?.id || ""} onValueChange={handleTipoChange} disabled={!categoria}>
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
                  placeholder="Descripción opcional del flujo"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2 md:col-span-2">
                <Switch id="activo" checked={activo} onCheckedChange={setActivo} />
                <Label htmlFor="activo">Flujo activo</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selector de aprobadores */}
        <Card>
          <CardHeader>
            <CardTitle>Configurar Aprobadores</CardTitle>
            <CardDescription>
              Arrastre usuarios desde la columna izquierda a la derecha para definir el orden de aprobación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SelectorAprobadores aprobadores={aprobadores} onAprobadoresChange={setAprobadores} />
          </CardContent>
        </Card>

        {/* Botones */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => router.push("/admin/admin/flujos-aprobacion")}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!nombre || !tipoFlujo || aprobadores.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  )
}

