"use client"

import { useRouter, useParams } from "next/navigation"
import { FormularioNuevaVisitaReutilizable } from "@/components/visitas/formulario-nueva-visita-reutilizable"
import type { ConfiguracionFormularioVisita, DatosFormularioVisita } from "@/components/visitas/types"
import { visitasUsuarioBasico, type VisitaUsuarioBasico } from "../page"
import { parse } from "date-fns"

export default function CompletarVisitaPage() {
  const params = useParams()
  const router = useRouter()
  const visitaId = params.id as string

  // Buscar la visita en el array
  const visita = visitasUsuarioBasico.find((v) => v.id.toString() === visitaId)

  if (!visita) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <p className="text-red-500">Visita no encontrada</p>
      </div>
    )
  }

  // Configuración para usuario-basico
  const configuracion: ConfiguracionFormularioVisita = {
    tipoUsuario: "usuario-basico",
    tiposVisita: ["Laboral", "Guiada", "Evento"],
    opcionesDestino: {
      Laboral: ["Oficinas administrativas", "TecPlata", "Museo", "Deposito Fiscal"],
      Guiada: ["Museo", "Terminal TEC Plata", "Zona Operativa/Muelles"],
      Evento: ["Museo", "Terminal TEC Plata", "Oficinas administrativas"],
      default: ["Oficinas administrativas", "TecPlata", "Museo"],
    },
    tiposVehiculo: ["Auto", "Camioneta", "Camión", "Utilitario", "Moto"],
    categoriasLicencia: ["A", "B", "C", "D", "E", "F", "G"],
    permiteEventos: true,
    camposFechaEventosDeshabilitados: true,
    permiteTransporteCargas: false,
    permiteObrasMantenimiento: false,
    mostrarPersonalVisita: true,
  }

  // Convertir datos de la visita a DatosFormularioVisita
  const parseDate = (dateStr?: string): Date | undefined => {
    if (!dateStr) return undefined
    try {
      // Formato: DD/MM/YYYY
      return parse(dateStr, "dd/MM/yyyy", new Date())
    } catch {
      return undefined
    }
  }

  const datosPrecargados: Partial<DatosFormularioVisita> = {
    tipoVisita: visita.tipo,
    destino: visita.destino,
    personalVisita: visita.personalVisita || "",
    fechaDesde: parseDate(visita.fechaInicio),
    fechaHasta: parseDate(visita.fechaFin),
    horaDesde: visita.horaInicio || "",
    horaHasta: visita.horaFin || "",
    observaciones: visita.observaciones || "",
    // Convertir personasDetalle a Persona[]
    personas:
      visita.personasDetalle?.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        documento: p.documento,
        empresa: p.empresa || "",
        correo: p.mail,
        telefono: p.telefono,
      })) || [],
    // Convertir vehiculosDetalle a Vehiculo[]
    vehiculos:
      visita.vehiculosDetalle?.map((v) => ({
        id: v.id,
        tipo: v.tipo,
        patente: v.patente,
        marca: v.marca || "",
        modelo: v.modelo || "",
      })) || [],
  }

  const handleSubmit = async (datos: DatosFormularioVisita) => {
    // Aquí se puede hacer la llamada a la API para actualizar la visita
    console.log("Datos completados:", datos)
    // Después de guardar, redirigir a la página de detalle
    router.push(`/usuario-basico/visitas/mis-visitas/${visitaId}`)
  }

  const handleCancel = () => {
    router.push(`/usuario-basico/visitas/mis-visitas/${visitaId}`)
  }

  return (
    <FormularioNuevaVisitaReutilizable
      configuracion={configuracion}
      backUrl={`/usuario-basico/visitas/mis-visitas/${visitaId}`}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      modoEdicion={true}
      datosPrecargados={datosPrecargados}
    />
  )
}

