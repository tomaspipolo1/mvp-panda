import { FormularioCambioPassword } from "@/components/perfil/formulario-cambio-password"

export default function SeguridadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-plp-dark">Seguridad</h1>
        <p className="text-muted-foreground">Gestiona tu contraseña y configuración de seguridad</p>
      </div>
      <div className="grid gap-6">
        <FormularioCambioPassword />
      </div>
    </div>
  )
}
