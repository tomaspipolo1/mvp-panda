"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TablaVisitas, type Visita } from "@/components/visitas/tabla-visitas"
import { FiltrosVisitas } from "@/components/visitas/filtros-visitas"
import { visitasUsuarioBasico } from "./[id]/page"
import Swal from "sweetalert2"
import { showSuccess, showConfirm } from "@/lib/sweetalert"

export default function MisVisitasPage() {
  const router = useRouter()
  const [filtros, setFiltros] = useState<any>({
    tipoVisita: "todos",
    estado: "todos",
    fechaDesde: "",
    fechaHasta: "",
  })

  // Opciones de tipo de visita específicas para usuario-basico (solo Laboral, Guiada, Evento)
  const tipoVisitaOptions = [
    { value: "todos", label: "Todos" },
    { value: "laboral", label: "Laboral" },
    { value: "guiada", label: "Guiada" },
    { value: "evento", label: "Evento" },
  ]

  const handleFiltros = (newFiltros: any) => {
    setFiltros(newFiltros)
    console.log("Filtros aplicados:", newFiltros)
    // Aquí se aplicarán los filtros a las visitas
  }

  const handleAceptar = async (visita: Visita) => {
    const result = await showConfirm(
      "¿Aceptar visita?",
      `¿Desea aceptar la visita del ${visita.fecha} a las ${visita.hora}?`,
      "Sí, aceptar",
      "Cancelar"
    )

    if (result.isConfirmed) {
      console.log("Aceptando visita:", visita.id)
      await showSuccess("Visita aceptada", "La visita ha sido aceptada correctamente.")
      // Aquí se puede hacer la llamada a la API o actualizar el estado
    }
  }

  const handleRechazar = async (visita: Visita) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Rechazar visita?",
      html: `
        <div style="text-align: left;">
          <p style="margin-bottom: 16px; color: #374151;">
            ¿Desea rechazar la visita del <strong>${visita.fecha}</strong> a las <strong>${visita.hora}</strong>?
          </p>
          <label for="swal-motivo-rechazo" style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
            Motivo del rechazo <span style="color: #DC2626;">*</span>
          </label>
          <textarea
            id="swal-motivo-rechazo"
            class="swal2-input"
            placeholder="Ingrese el motivo del rechazo..."
            rows="4"
            style="width: 100%; min-height: 100px; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; resize: vertical; font-size: 14px;"
          ></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Sí, rechazar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      reverseButtons: true,
      customClass: {
        popup: "rounded-lg shadow-xl",
        title: "text-lg font-semibold",
        htmlContainer: "text-sm",
        confirmButton: "rounded-md px-4 py-2 font-medium",
        cancelButton: "rounded-md px-4 py-2 font-medium",
      },
      preConfirm: () => {
        const motivo = (document.getElementById("swal-motivo-rechazo") as HTMLTextAreaElement)?.value
        if (!motivo || motivo.trim() === "") {
          Swal.showValidationMessage("Debe ingresar un motivo para rechazar la visita")
          return false
        }
        return motivo.trim()
      },
    })

    if (result.isConfirmed) {
      console.log("Rechazando visita:", visita.id, "Motivo:", result.value)
      await showSuccess("Visita rechazada", "La visita ha sido rechazada correctamente.")
      // Aquí se puede hacer la llamada a la API o actualizar el estado
    }
  }

  const handleCompletar = async (visita: Visita) => {
    // Si la visita es Pendiente, navegar a completar (modo edición)
    if (visita.estado === "Pendiente") {
      router.push(`/usuario-basico/visitas/mis-visitas/${visita.id}/completar`)
      return
    }

    // Si es Aceptada/Aprobada/En curso, es completar/finalizar la visita
    const result = await showConfirm(
      "¿Completar visita?",
      `¿Desea marcar como completada la visita del ${visita.fecha}?`,
      "Sí, completar",
      "Cancelar"
    )

    if (result.isConfirmed) {
      console.log("Completando visita:", visita.id)
      await showSuccess("Visita completada", "La visita ha sido marcada como completada.")
      // Aquí se puede hacer la llamada a la API o actualizar el estado
    }
  }

  const handleCancelar = async (visita: Visita) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Cancelar visita?",
      html: `
        <div style="text-align: left;">
          <p style="margin-bottom: 16px; color: #374151;">
            ¿Desea cancelar la visita del <strong>${visita.fecha}</strong> a las <strong>${visita.hora}</strong>? Esta acción no se puede deshacer.
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
      customClass: {
        popup: "rounded-lg shadow-xl",
        title: "text-lg font-semibold",
        htmlContainer: "text-sm",
        confirmButton: "rounded-md px-4 py-2 font-medium",
        cancelButton: "rounded-md px-4 py-2 font-medium",
      },
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
      console.log("Cancelando visita:", visita.id, "Motivo:", result.value)
      await showSuccess("Visita cancelada", "La visita ha sido cancelada correctamente.")
      // Aquí se puede hacer la llamada a la API o actualizar el estado
    }
  }

  // Función para navegar al detalle de la visita
  const handleOpenDetails = (visita: Visita) => {
    router.push(`/usuario-basico/visitas/mis-visitas/${visita.id}`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Visitas</h1>
        <Link
          href="/usuario-basico/visitas/nueva-visita"
          className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Visita
        </Link>
      </div>

      {/* Filtros */}
      <FiltrosVisitas 
        onFilter={handleFiltros}
        tipoOptions={tipoVisitaOptions}
        showEstado={true}
      />

      {/* Tabla de visitas */}
      <TablaVisitas
        visitas={visitasUsuarioBasico.map((v) => ({
          id: v.id,
          fecha: v.fecha,
          hora: v.hora,
          tipo: v.tipo,
          destino: v.destino,
          personas: v.personas,
          estado: v.estado,
        }))}
        tipoUsuario="usuario-basico"
        onVerDetalle={handleOpenDetails}
        onAceptar={handleAceptar}
        onRechazar={handleRechazar}
        onCompletar={handleCompletar}
        onCancelar={handleCancelar}
      />

    </div>
  )
}

