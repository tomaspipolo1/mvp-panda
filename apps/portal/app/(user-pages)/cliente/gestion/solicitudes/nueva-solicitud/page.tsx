import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FormularioNuevaSolicitudCliente } from "@/components/solicitudes/formulario-nueva-solicitud-cliente"

export default function NuevaSolicitudClientePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/cliente/gestion/solicitudes/mis-solicitudes"
          className="flex items-center text-plp-dark hover:text-plp-medium"
        >
          <ArrowLeft className="mr-1" size={20} />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold text-plp-darkest">Nueva Solicitud</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-plp-darkest mb-4">Formulario de Solicitud</h2>
        <FormularioNuevaSolicitudCliente />
      </div>
    </div>
  )
}
