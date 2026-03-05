import { FormularioCambioPassword } from "@/components/perfil/formulario-cambio-password"

export default function SeguridadPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Seguridad</h1>
        <p className="text-sm text-gray-500">Gestiona la seguridad de tu cuenta modificando tu contraseña</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Cambiar contraseña</h2>
        <FormularioCambioPassword />
      </div>
    </div>
  )
}
