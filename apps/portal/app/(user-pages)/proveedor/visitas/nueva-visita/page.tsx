"use client"

import { FormularioNuevaVisitaExternosReutilizable } from "@/components/visitas/formulario-nueva-visita-externos-reutilizable"
import type { ConfiguracionFormularioVisita, DatosFormularioVisita } from "@/components/visitas/types"
import {
  vehiculosCargadosData,
  conductoresCargadosData,
  personalCargadoData,
} from "@/components/visitas/mock-data"

const configProveedor: ConfiguracionFormularioVisita = {
  tipoUsuario: "proveedor",
  tiposVisita: ["Laboral", "Transporte Cargas", "Obras/Mantenimiento", "Servicio a buques"],
  vehiculosCargados: vehiculosCargadosData,
  conductoresCargados: conductoresCargadosData,
  personalCargado: personalCargadoData,
  permiteTransporteCargas: true,
  permiteObrasMantenimiento: true,
  permiteVisitaRecurrente: true,
  permiteAccesoMuelle: true,
  permiteAccesoAMuelleCheckbox: true,
  permiteDestinosMultiples: true,
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
    // Aquí iría la lógica para enviar los datos al servidor
    console.log("Formulario enviado correctamente", datos)
    alert("Solicitud enviada correctamente")
  }

  return (
    <FormularioNuevaVisitaExternosReutilizable
      configuracion={configProveedor}
      backUrl="/proveedor/visitas/mis-visitas"
      onSubmit={handleSubmit}
    />
  )
}
