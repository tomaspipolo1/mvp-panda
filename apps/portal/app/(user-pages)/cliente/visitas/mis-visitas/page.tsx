"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TablaVisitas, type Visita } from "@/components/visitas/tabla-visitas"
import { FiltrosVisitas } from "@/components/visitas/filtros-visitas"
import { visitasCliente } from "./[id]/page"
import Swal from "sweetalert2"
import { showSuccess } from "@/lib/sweetalert"

export default function MisVisitasClientePage() {
  const router = useRouter()
  const [filtros, setFiltros] = useState<any>({
    tipoVisita: "todos",
    estado: "todos",
    fechaDesde: "",
    fechaHasta: "",
  })

  // Opciones de tipo de visita específicas para cliente
  const tipoVisitaOptions = [
    { value: "todos", label: "Todos" },
    { value: "laboral", label: "Laboral" },
    { value: "guiada", label: "Guiada" },
    { value: "evento", label: "Evento" },
    { value: "materiales", label: "Materiales" },
    { value: "acceso-obra", label: "Acceso a Obra" },
    { value: "acceso-muelle", label: "Acceso a Muelle" },
  ]

  const handleFiltros = (newFiltros: any) => {
    setFiltros(newFiltros)
    console.log("Filtros aplicados:", newFiltros)
    // Aquí se aplicarán los filtros a las visitas
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
    router.push(`/cliente/visitas/mis-visitas/${visita.id}`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Visitas</h1>
        <Link
          href="/cliente/visitas/nueva-visita"
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center transition-colors"
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
        visitas={visitasCliente.map((v) => ({
          id: v.id,
          fecha: v.fecha,
          hora: v.hora,
          tipo: v.tipo,
          destino: v.destino || v.sitio || "",
          personas: v.personas,
          estado: v.estado,
        }))}
        tipoUsuario="cliente"
        onVerDetalle={handleOpenDetails}
        onCancelar={handleCancelar}
      />

    </div>
  )
}
