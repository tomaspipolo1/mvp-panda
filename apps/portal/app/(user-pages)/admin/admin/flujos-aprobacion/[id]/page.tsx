"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { SelectorAprobadores } from "@/components/flujos-aprobacion/selector-aprobadores"
import { FlujoAprobacion } from "../types"

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

export default function VerFlujoPage({ params }: { params: any }) {
  const router = useRouter()
  const [flujoId, setFlujoId] = useState<string | null>(null)
  const [flujo, setFlujo] = useState<FlujoAprobacion | null>(null)

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
      setFlujo(flujoEncontrado)
    } else {
      router.push("/admin/admin/flujos-aprobacion")
    }
  }, [flujoId, router])

  if (!flujo) {
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
            <h1 className="text-3xl font-bold tracking-tight">{flujo.nombre}</h1>
            <p className="text-muted-foreground">Detalles del flujo de aprobación</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Flujo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Nombre</Label>
                <p className="font-medium">{flujo.nombre}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Categoría</Label>
                <div className="mt-1">
                  <Badge
                    variant={flujo.tipo.categoria === "SOLICITUDES" ? "default" : "secondary"}
                    className={
                      flujo.tipo.categoria === "SOLICITUDES"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : "bg-green-100 text-green-800 hover:bg-green-100"
                    }
                  >
                    {flujo.tipo.categoria === "SOLICITUDES" ? "Solicitud" : "Visita"}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Tipo</Label>
                <p className="font-medium">{flujo.tipo.nombre}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                <div className="mt-1">
                  <Badge
                    variant={flujo.activo ? "default" : "secondary"}
                    className={flujo.activo ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {flujo.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>
              {flujo.descripcion && (
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">Descripción</Label>
                  <p>{flujo.descripcion}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Aprobadores */}
        <Card>
          <CardHeader>
            <CardTitle>Orden de Aprobación</CardTitle>
            <CardDescription>Secuencia de aprobadores configurada para este flujo</CardDescription>
          </CardHeader>
          <CardContent>
            <SelectorAprobadores aprobadores={flujo.aprobadores} onAprobadoresChange={() => {}} disabled={true} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

