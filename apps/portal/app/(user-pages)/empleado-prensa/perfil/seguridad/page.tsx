import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SeguridadPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-plp-dark">Seguridad</h1>
      <p className="text-gray-600">Gestiona la seguridad de tu cuenta y preferencias de acceso.</p>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cambiar Contraseña</CardTitle>
            <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" />
                <p className="text-xs text-gray-500 mt-1">
                  La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter
                  especial.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button className="bg-plp-primary hover:bg-plp-dark">Actualizar Contraseña</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Seguridad</CardTitle>
            <CardDescription>Configura opciones adicionales de seguridad para tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Autenticación de dos factores</h4>
                  <p className="text-sm text-gray-500">Añade una capa adicional de seguridad a tu cuenta</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Notificaciones de inicio de sesión</h4>
                  <p className="text-sm text-gray-500">
                    Recibe alertas cuando se acceda a tu cuenta desde un nuevo dispositivo
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Sesiones activas</h4>
                  <p className="text-sm text-gray-500">Gestiona los dispositivos donde has iniciado sesión</p>
                </div>
                <Button variant="outline">Ver sesiones</Button>
              </div>

              <div className="pt-4 border-t">
                <Button variant="destructive">Cerrar todas las sesiones</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
