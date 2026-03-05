"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { DetalleVisitaComponent, type Visita, type ArchivoAdjunto } from "@/components/visitas/detalle-visita-component"
import Swal from "sweetalert2"
import { showSuccess } from "@/lib/sweetalert"
import { buildHistorialEventos, type VisitaEmpresaServicios, visitasEmpresaServicios } from "../data"

const documentosEjemplo: ArchivoAdjunto[] = [
  { nombre: "ART.pdf", archivo: "art.pdf", tipo: "ART" },
  { nombre: "Seguro_Vehiculo.pdf", archivo: "seguro-vehiculo.pdf", tipo: "Seguro del vehículo" },
  { nombre: "Permiso_Acceso.pdf", archivo: "permiso-acceso.pdf", tipo: "Permiso" },
  { nombre: "Certificado_Capacitacion.pdf", archivo: "certificado-capacitacion.pdf", tipo: "Certificado" },
]

const convertirVisitaParaComponente = (visitaEmpresa: VisitaEmpresaServicios): Visita => ({
  id: visitaEmpresa.id.toString(),
  numero: visitaEmpresa.numero || `VIS-ESP-${visitaEmpresa.id}`,
  visitante: visitaEmpresa.personasDetalle?.[0]?.nombre || "Servicios Portuarios",
  empresa: visitaEmpresa.personasDetalle?.[0]?.empresa || "Servicios Portuarios",
  fechaVisita: visitaEmpresa.fecha,
  horaVisita: visitaEmpresa.hora,
  estado: visitaEmpresa.estado,
  motivo: visitaEmpresa.motivo || "",
  tipo: visitaEmpresa.tipo,
  sitio: visitaEmpresa.destino,
  personas: visitaEmpresa.personas,
  vehiculos: visitaEmpresa.vehiculos || visitaEmpresa.vehiculosDetalle?.length || 0,
  personasDetalle: visitaEmpresa.personasDetalle || [],
  vehiculosDetalle: visitaEmpresa.vehiculosDetalle || [],
  fechaInicio: visitaEmpresa.fechaInicio,
  fechaFin: visitaEmpresa.fechaFin,
  horaInicio: visitaEmpresa.horaInicio,
  horaFin: visitaEmpresa.horaFin,
  observaciones: visitaEmpresa.observaciones,
  descripcion: visitaEmpresa.motivo,
})

export default function DetalleVisitaEmpresaServiciosPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  const visitaEmpresa = visitasEmpresaServicios.find((v) => v.id.toString() === resolvedParams.id) || visitasEmpresaServicios[0]
  const visita = convertirVisitaParaComponente(visitaEmpresa)
  const historialEventos = buildHistorialEventos(visita)

  const handleCancelar = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Cancelar visita?",
      html: `
        <div style="text-align: left;">
          <p style="margin-bottom: 16px; color: #374151;">
            ¿Desea cancelar la visita <strong>${visita.numero}</strong>? Esta acción no se puede deshacer.
          </p>
          <label for="swal-motivo-cancelacion" style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
            Motivo de la cancelación <span style="color: #DC2626;">*</span>
          </label>
          <textarea
            id="swal-motivo-cancelacion"
            class="swal2-input"
            placeholder="Ingrese el motivo de la cancelación..."
            rows="4"
            style="width: 100%; min-height: 100px; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; resize: vertical; font-size: 14px;"
          ></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      reverseButtons: true,
      preConfirm: () => {
        const motivo = (document.getElementById("swal-motivo-cancelacion") as HTMLTextAreaElement)?.value
        if (!motivo || motivo.trim() === "") {
          Swal.showValidationMessage("Debe ingresar un motivo para cancelar la visita")
          return false
        }
        return motivo.trim()
      },
    })

    if (result.isConfirmed) {
      await showSuccess("Visita cancelada", `La visita ${visita.numero} ha sido cancelada correctamente.`)
      router.push("/empresa-servicios-portuarios/visitas/mis-visitas")
    }
  }

  return (
    <DetalleVisitaComponent
      visita={visita}
      documentos={documentosEjemplo}
      acciones={{
        canCancel: visita.estado === "Pendiente" || visita.estado === "Aprobada",
        onCancel: handleCancelar,
      }}
      backUrl="/empresa-servicios-portuarios/visitas/mis-visitas"
      userType="cliente"
      historialEventos={historialEventos}
    />
  )
}


