"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosSolicitudesUsuarioBasico } from "@/components/solicitudes/filtros-solicitudes-usuario-basico"
import { TablaSolicitudesUsuarioBasico } from "@/components/solicitudes/tabla-solicitudes-usuario-basico"
import { solicitudesUsuarioBasico } from "./[id]/page"

export default function MisSolicitudesUsuarioBasicoPage() {
  const router = useRouter()
  const [filtros, setFiltros] = useState({})

  const handleFiltrar = (nuevosFiltros: any) => {
    setFiltros(nuevosFiltros)
  }

  const goToDetalle = (solicitud: { id: string }) => {
    router.push(`/usuario-basico/gestion/solicitudes/mis-solicitudes/${solicitud.id}`)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Solicitudes</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Link href="/usuario-basico/gestion/solicitudes/nueva-solicitud">
            <Button size="sm" className="bg-plp-dark hover:bg-plp-medium">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Solicitud
            </Button>
          </Link>
        </div>
      </div>

      <FiltrosSolicitudesUsuarioBasico onFilter={handleFiltrar} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaSolicitudesUsuarioBasico
          solicitudes={solicitudesUsuarioBasico.map((solicitud) => ({
            id: solicitud.id.toString(),
            fecha: solicitud.fecha,
            numero: solicitud.numero,
            tipo: solicitud.tipo,
            clase: solicitud.clase,
            asunto: solicitud.asunto,
            estado: solicitud.estado,
            ultimaActualizacion: solicitud.ultimaActualizacion,
          }))}
          onVerDetalle={goToDetalle}
          onAgregarComentario={goToDetalle}
          onCancelarSolicitud={goToDetalle}
        />
      </div>
    </div>
  )
}
