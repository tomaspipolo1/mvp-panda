import { FormularioDatosPersonales } from "@/components/perfil/formulario-datos-personales"

export default function DatosPersonalesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Datos Personales</h1>
        <p className="text-plp-dark mt-1">Información personal y de contacto del usuario</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <FormularioDatosPersonales />
      </div>
    </div>
  )
}
