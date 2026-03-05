import type { Metadata } from "next"
import FormularioCambioPasswordCliente from "@/components/perfil/formulario-cambio-password-cliente"

export const metadata: Metadata = {
  title: "Seguridad - Cliente",
  description: "Gestiona la seguridad de tu cuenta modificando tu contraseña",
}

export default function SeguridadClientePage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold">Seguridad</h1>
      <p className="text-gray-600 mb-6">Gestiona la seguridad de tu cuenta modificando tu contraseña</p>

      <FormularioCambioPasswordCliente />
    </div>
  )
}
