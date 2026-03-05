import { FormularioCambioPasswordUsuarioBasico } from "@/components/perfil/formulario-cambio-password-usuario-basico"

export default function SeguridadPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900">Seguridad</h1>
      <p className="text-gray-600 mb-6">Gestiona la seguridad de tu cuenta modificando tu contraseña</p>

      <div className="bg-white rounded-lg shadow p-6">
        <FormularioCambioPasswordUsuarioBasico />
      </div>
    </div>
  )
}
