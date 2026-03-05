import { FormularioDatosPersonalesUsuarioBasico } from "@/components/perfil/formulario-datos-personales-usuario-basico"

export default function DatosPersonalesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-plp-darkest">Datos Personales</h1>
      <FormularioDatosPersonalesUsuarioBasico />
    </div>
  )
}
