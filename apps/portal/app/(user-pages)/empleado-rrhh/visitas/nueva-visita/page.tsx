"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FormularioNuevaVisitaReutilizable } from "@/components/visitas/formulario-nueva-visita-reutilizable"
import { ModalInvitacionVisita } from "@/components/visitas/modal-invitacion-visita"
import type { ConfiguracionFormularioVisita, DatosFormularioVisita } from "@/components/visitas/types"

const configRrhh: ConfiguracionFormularioVisita = {
  tipoUsuario: "empleado-rrhh",
  tiposVisita: ["Laboral", "Transporte Cargas", "Obras/Mantenimiento"],
  permiteTransporteCargas: true,
  permiteObrasMantenimiento: true,
  permiteVisitaRecurrente: true,
  requierePersonalVisitaLaboral: true,
  muestraDocumentacion: true,
  muestraPersonaResponsable: true,
  muestraCampoTelefonoPersona: true,
}

export default function NuevaVisitaPage() {
  const router = useRouter()
  const [modalAbierto, setModalAbierto] = useState(false)
  const [datosVisitaActual, setDatosVisitaActual] = useState<DatosFormularioVisita & { id: string } | null>(null)

  const handleSubmit = (datos: DatosFormularioVisita) => {
    const visitaConId = {
      ...datos,
      id: `VIS-${Math.floor(Math.random() * 100000)}`,
    }
    setDatosVisitaActual(visitaConId)
    setModalAbierto(true)
  }

  const cerrarModalYRedirigir = () => {
    setModalAbierto(false)
    router.push("/empleado-rrhh/visitas/mis-visitas")
  }

  return (
    <>
      <FormularioNuevaVisitaReutilizable
        configuracion={configRrhh}
        backUrl="/empleado-rrhh/visitas/mis-visitas"
        onSubmit={handleSubmit}
      />
      {modalAbierto && datosVisitaActual && (
        <ModalInvitacionVisita
          isOpen={modalAbierto}
          onClose={cerrarModalYRedirigir}
          datosVisita={datosVisitaActual}
        />
      )}
    </>
  )
}
