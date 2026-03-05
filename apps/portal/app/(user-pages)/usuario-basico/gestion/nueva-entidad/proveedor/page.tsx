import AltaProveedorForm from "@/components/proveedores/alta-proveedor-form"

export const metadata = {
  title: "Nuevo Proveedor | Portal PLP",
  description: "Formulario para registrar un nuevo proveedor en el sistema",
}

export default function NuevoProveedorPage() {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nuevo Proveedor</h1>
        <p className="text-gray-500 mt-2">Complete el formulario para registrar un nuevo proveedor</p>
      </div>

      <AltaProveedorForm />
    </div>
  )
}
