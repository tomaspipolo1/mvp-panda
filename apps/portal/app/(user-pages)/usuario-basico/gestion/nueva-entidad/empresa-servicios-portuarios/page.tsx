import AltaEmpresaServiciosPortuarios from "@/components/empresa-servicios-portuarios/alta-empresa-servicios-portuarios"

export default function NuevaEmpresaServiciosPortuariosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Nueva Empresa de Servicios Portuarios</h1>
        <p className="text-gray-600 mt-2">Complete los datos para registrar una nueva empresa de servicios portuarios</p>
      </div>
      <AltaEmpresaServiciosPortuarios />
    </div>
  )
} 