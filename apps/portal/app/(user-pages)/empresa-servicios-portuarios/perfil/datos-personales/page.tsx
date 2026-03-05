"use client"

import { FormularioDatosPersonalesCliente } from "@/components/perfil/formulario-datos-personales-cliente"

export default function DatosPersonalesPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-1">Datos Personales</h1>
      <p className="text-gray-600 mb-6">Información personal y de contacto del usuario</p>

      <FormularioDatosPersonalesCliente />
    </div>
  )
}
