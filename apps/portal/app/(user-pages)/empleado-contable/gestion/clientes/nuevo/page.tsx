"use client"

import AltaClienteForm from "@/components/clientes/alta-cliente-form"

export default function NuevoClientePage() {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nuevo Cliente</h1>
        <p className="text-gray-500 mt-2">Complete el formulario para registrar un nuevo cliente</p>
      </div>

      <AltaClienteForm />
    </div>
  )
}
