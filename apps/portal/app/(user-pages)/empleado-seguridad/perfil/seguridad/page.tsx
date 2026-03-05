import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormularioCambioPassword } from "@/components/perfil/formulario-cambio-password"

export default function SeguridadPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Seguridad</h1>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Cambiar Contraseña</CardTitle>
          </CardHeader>
          <CardContent>
            <FormularioCambioPassword />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
