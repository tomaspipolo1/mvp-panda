import AltaProveedorForm from "@/components/proveedores/alta-proveedor-form"

export default function NuevoProveedorPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Nuevo Proveedor</h1>
      </div>

      <AltaProveedorForm />
    </div>
  )
}
