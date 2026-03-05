"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientesAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Gestión de Clientes</h3>
        <p className="text-muted-foreground">Administra los clientes del Puerto La Plata.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Página en Construcción</CardTitle>
          <CardDescription>Esta funcionalidad estará disponible próximamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <p className="text-lg font-medium">Estamos trabajando en esta sección</p>
              <p className="text-gray-500 mt-2">
                La gestión de clientes estará disponible en la próxima actualización.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

