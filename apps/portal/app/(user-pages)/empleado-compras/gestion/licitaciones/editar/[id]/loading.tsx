import { Loader2 } from "lucide-react"

export default function LoadingEditarLicitacion() {
  return (
    <div className="container mx-auto py-6 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <h2 className="text-xl font-semibold">Cargando licitación...</h2>
        <p className="text-gray-500 mt-2">Por favor espere mientras se cargan los datos</p>
      </div>
    </div>
  )
}
