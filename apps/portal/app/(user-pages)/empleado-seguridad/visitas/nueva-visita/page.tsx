"use client"

import { useRouter } from "next/navigation"
import { FormularioNuevaVisitaReutilizable } from "@/components/visitas/formulario-nueva-visita-reutilizable"
import type { ConfiguracionFormularioVisita, DatosFormularioVisita } from "@/components/visitas/types"

const proveedoresRegistrados = [
  { id: 1, razonSocial: "Transportes Marítimos del Plata S.A.", cuit: "30-12345678-9", email: "contacto@tmpsa.com.ar", telefono: "11-4567-8901", activo: true },
  { id: 2, razonSocial: "Logística Portuaria Internacional", cuit: "30-23456789-0", email: "info@lpi.com.ar", telefono: "11-5678-9012", activo: true },
  { id: 3, razonSocial: "Servicios Portuarios Unidos", cuit: "30-34567890-1", email: "ventas@spu.com.ar", telefono: "11-6789-0123", activo: true },
  { id: 4, razonSocial: "Carga Express Argentina", cuit: "30-45678901-2", email: "operaciones@cea.com.ar", telefono: "11-7890-1234", activo: true },
  { id: 5, razonSocial: "Terminal de Contenedores SA", cuit: "30-56789012-3", email: "comercial@tcsa.com.ar", telefono: "11-8901-2345", activo: true },
]

const configSeguridad: ConfiguracionFormularioVisita = {
  tipoUsuario: "empleado-seguridad",
  tiposVisita: [
    "Laboral",
    "Guiada",
    "Transporte Cargas",
    "Obras/Mantenimiento",
    "Servicio a buques",
    "Evento",
  ],
  permiteTransporteCargas: true,
  permiteObrasMantenimiento: true,
  permiteVisitaRecurrente: true,
  muestraDocumentacion: true,
  muestraPersonaResponsable: true,
  permiteEventos: true,
  eventosDisponibles: [],
  permiteSeccionProveedor: true,
  tiposVisitaConProveedor: ["Transporte Cargas"],
  proveedoresRegistrados,
  muestraCampoTelefonoPersona: true,
}

export default function NuevaVisitaPage() {
  const router = useRouter()

  const handleSubmit = (datos: DatosFormularioVisita) => {
    // En producción aquí se enviarían los datos al backend
    console.log("Visita registrada:", datos)
    alert("Visita registrada correctamente")
    router.push("/empleado-seguridad/visitas/pendientes")
  }

  return (
    <FormularioNuevaVisitaReutilizable
      configuracion={configSeguridad}
      backUrl="/empleado-seguridad/visitas/pendientes"
      onSubmit={handleSubmit}
      onCancel={() => router.push("/empleado-seguridad/visitas/pendientes")}
    />
  )
}
