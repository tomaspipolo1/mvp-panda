"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { SelectorAprobadores } from "@/components/flujos-aprobacion/selector-aprobadores"
import { TIPOS_FLUJOS, TipoFlujo, Aprobador, FlujoAprobacion, CategoriaFlujo } from "../types"
import { useToast } from "@/components/ui/use-toast"

export default function NuevoFlujoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [categoria, setCategoria] = useState<CategoriaFlujo>("SOLICITUDES")
  const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null)
  const [activo, setActivo] = useState(true)
  const [aprobadores, setAprobadores] = useState<Aprobador[]>([])
  const [modoSeleccion, setModoSeleccion] = useState<"persona" | "departamento">("persona")

  const tiposDisponibles = TIPOS_FLUJOS[categoria]

  const handleTipoChange = (tipoId: string) => {
    const tipo = tiposDisponibles.find((t) => t.id === tipoId)
    if (tipo) {
      setTipoFlujo({ categoria, id: tipo.id, nombre: tipo.nombre })
    }
  }

  const handleModoSeleccionChange = (value: "persona" | "departamento") => {
    setModoSeleccion(value)
    setAprobadores([])
  }

  const handleCategoriaChange = (cat: CategoriaFlujo) => {
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

    console.log("Creando flujo:", flujoData)

    toast({
      title: "Flujo creado",
      description: `El flujo "${nombre}" ha sido creado exitosamente.`,
    })

    router.push("/admin/admin/flujos-aprobacion")
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
            <h1 className="text-3xl font-bold tracking-tight">Nuevo Flujo de Aprobaci?n</h1>
            <p className="text-muted-foreground">Configure un nuevo flujo de aprobaci?n</p>
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
                <Select value={categoria} onValueChange={(value: CategoriaFlujo) => handleCategoriaChange(value)}>
                  <SelectTrigger id="categoria">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOLICITUDES">Solicitudes</SelectItem>
                    <SelectItem value="VISITAS">Visitas</SelectItem>
                    <SelectItem value="ALTAS">Altas</SelectItem>
                    <SelectItem value="EVENTOS">Eventos</SelectItem>
                    <SelectItem value="TRAMITES">Trámites</SelectItem>
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
            <CardTitle className="flex items-center justify-between gap-4">
              <span>Configurar Aprobadores</span>
              <RadioGroup
                value={modoSeleccion}
                onValueChange={(val) => handleModoSeleccionChange(val as "persona" | "departamento")}
                className="flex items-center gap-4"
              >
                <label htmlFor="modo-departamento" className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RadioGroupItem id="modo-departamento" value="departamento" />
                  <span>Departamento</span>
                </label>
                <label htmlFor="modo-persona" className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RadioGroupItem id="modo-persona" value="persona" />
                  <span>Persona</span>
                </label>
              </RadioGroup>
            </CardTitle>
            <CardDescription>
              Arrastre usuarios desde la columna izquierda a la derecha para definir el orden de aprobaci?n
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SelectorAprobadores
              aprobadores={aprobadores}
              onAprobadoresChange={setAprobadores}
              modoSeleccion={modoSeleccion}
            />
          </CardContent>
        </Card>

        {/* Botones */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => router.push("/admin/admin/flujos-aprobacion")}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!nombre || !tipoFlujo || aprobadores.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            Crear Flujo
          </Button>
        </div>
      </div>
    </div>
  )
}

