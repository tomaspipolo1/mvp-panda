import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Shield, AlertTriangle } from "lucide-react"

export default function SeguridadEmpleadoCompras() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Seguridad</h1>

        <div className="space-y-8">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Cambiar contraseña</CardTitle>
              <CardDescription>Actualiza tu contraseña periódicamente para mayor seguridad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña actual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="bg-yellow-50 p-4 rounded-md flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="text-sm text-yellow-700">
                    <p className="font-medium">Recomendaciones para una contraseña segura:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>Utiliza al menos 8 caracteres</li>
                      <li>Combina letras mayúsculas y minúsculas</li>
                      <li>Incluye números y símbolos</li>
                      <li>Evita información personal obvia</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Cancelar</Button>
              <Button>Actualizar contraseña</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl flex items-center">
                <Shield className="h-5 w-5 mr-2 text-plp-accent" />
                Opciones de seguridad adicionales
              </CardTitle>
              <CardDescription>Configura opciones adicionales para proteger tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <p className="font-medium">Autenticación de dos factores</p>
                    <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <p className="font-medium">Historial de inicios de sesión</p>
                    <p className="text-sm text-gray-500">Revisa la actividad reciente de tu cuenta</p>
                  </div>
                  <Button variant="outline">Ver historial</Button>
                </div>

                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <p className="font-medium">Dispositivos conectados</p>
                    <p className="text-sm text-gray-500">Administra los dispositivos vinculados a tu cuenta</p>
                  </div>
                  <Button variant="outline">Administrar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
