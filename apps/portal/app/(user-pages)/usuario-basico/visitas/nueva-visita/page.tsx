"use client"

import { FormularioNuevaVisitaExternosReutilizable } from "@/components/visitas/formulario-nueva-visita-externos-reutilizable"
import type { ConfiguracionFormularioVisita, DatosFormularioVisita } from "@/components/visitas/types"
import {
  vehiculosCargadosData,
  conductoresCargadosData,
  personalCargadoData,
} from "@/components/visitas/mock-data"

const configUsuarioBasico: ConfiguracionFormularioVisita = {
  tipoUsuario: "usuario-basico",
  tiposVisita: ["Laboral", "Guiada", "Evento"],
  vehiculosCargados: vehiculosCargadosData,
  conductoresCargados: conductoresCargadosData,
  personalCargado: personalCargadoData,
  permiteEventos: true,
  eventosDisponibles: [],
  permiteVisitaRecurrente: true,
  requierePersonalVisitaLaboral: true,
  muestraDocumentacion: true,
  muestraPersonaResponsable: true,
  autocompletadoPersonal: true,
  departamentosResponsables: ["Contable", "Compras", "Obras", "Seguridad", "Operaciones", "Sistemas"],
  muestraCampoTelefonoPersona: true,
  muestraCampoEmpresaPersona: false,
}

export default function NuevaVisitaPage() {
  const handleSubmit = (datos: DatosFormularioVisita) => {
    console.log("Formulario enviado correctamente", datos)
    alert("Solicitud enviada correctamente")
  }

  return (
    <FormularioNuevaVisitaExternosReutilizable
      configuracion={configUsuarioBasico}
      backUrl="/usuario-basico/visitas/mis-visitas"
      onSubmit={handleSubmit}
    />
  )
}
