"use client"
import { useParams, useRouter } from "next/navigation"
import { DetalleSolicitudCamionContent } from "@/components/camiones/detalle-solicitud-camion-content"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Aquí deberías importar tus datos reales de solicitudes de camiones, por ejemplo:
// import { useSolicitudesCamiones } from "@/hooks/useSolicitudesCamiones"
// O recibirlos por props si usas server components arriba

export default function DetalleSolicitudCamionPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Aquí deberías obtener la solicitud real por id
  // Por ejemplo, si tienes un hook o contexto:
  // const { solicitudes } = useSolicitudesCamiones()
  // const solicitud = solicitudes.find((s) => s.id === id)
  // Por ahora, solo muestro un placeholder:
  const solicitud = undefined // <-- Reemplaza esto por tu lógica real

  if (!solicitud) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver
        </Button>
        <h2 className="text-xl font-bold mb-4">Solicitud no encontrada</h2>
        <p>No se encontró la solicitud de camión solicitada.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex items-center mb-6 gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver
        </Button>
        <h1 className="text-2xl font-bold">Detalle de Solicitud de Camión</h1>
      </div>
      <Card>
        <CardContent className="p-6">
          <DetalleSolicitudCamionContent solicitud={solicitud} />
        </CardContent>
      </Card>
    </div>
  )
} 