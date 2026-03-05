import { notFound } from "next/navigation"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Array de solicitudes externas (Proveedores, Clientes, etc.)
const solicitudesExternas: SolicitudEmpleado[] = [
  {
    id: 1,
    numero: "SOL-2024-3001",
    tipo: "Reclamo",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por pago atrasado - Factura 4567",
    descripcion:
      "Presentamos reclamo por el pago atrasado de la factura 4567 correspondiente a la entrega de insumos de enero.",
    fecha: "10/02/2024",
    estado: "Resuelta",
    ultimaActualizacion: "15/02/2024",
    solicitante: "Proveedora Industrial S.A.",
    departamento: "RRHH",
    correo: "contacto@proveedoraindustrial.com",
    asignacion: "Laura Pérez",
    firmantes: [],
  },
  {
    id: 2,
    numero: "SOL-2024-3002",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Consulta sobre proceso de licitación",
    descripcion:
      "Solicito información sobre el proceso de licitación para la compra de equipos informáticos.",
    fecha: "11/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "11/02/2024",
    solicitante: "Empresa IT Solutions",
    departamento: "RRHH",
    correo: "contacto@itsolutions.com",
    asignacion: "Carlos López",
    firmantes: [],
  },
  {
    id: 3,
    numero: "SOL-2024-3003",
    tipo: "Tramite",
    tipoSolicitante: "Proveedor",
    asunto: "Actualización de datos bancarios",
    descripcion:
      "Solicitamos la actualización de los datos bancarios para futuros pagos. Adjuntamos nueva constancia de CBU.",
    fecha: "12/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "12/02/2024",
    solicitante: "Suministros del Sur",
    departamento: "RRHH",
    correo: "administracion@suministrosdelsur.com",
    asignacion: "Ana Martínez",
    firmantes: [],
  },
  {
    id: 4,
    numero: "SOL-2024-3004",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Solicitud de información sobre servicios portuarios",
    descripcion:
      "Necesito información detallada sobre los servicios portuarios disponibles y tarifas vigentes.",
    fecha: "13/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "13/02/2024",
    solicitante: "Naviera del Atlántico",
    departamento: "RRHH",
    correo: "info@navieraatlantico.com",
    asignacion: "Roberto Silva",
    firmantes: [],
  },
  {
    id: 5,
    numero: "SOL-2024-3005",
    tipo: "Reclamo",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por estado de mercadería",
    descripcion:
      "Presentamos reclamo por el estado en que fue recibida la mercadería en el último envío. Se encontraron daños en varios paquetes.",
    fecha: "14/02/2024",
    estado: "Pendiente",
    ultimaActualizacion: "14/02/2024",
    solicitante: "Logística Express S.R.L.",
    departamento: "RRHH",
    correo: "reclamos@logisticaexpress.com",
    asignacion: "Laura Pérez",
    firmantes: [],
  },
]

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function DetalleExternaPage({ params }: Props) {
  const { id } = await params
  const solicitudId = parseInt(id)
  const solicitud = solicitudesExternas.find((s) => s.id === solicitudId)

  if (!solicitud) {
    notFound()
  }

  return (
    <DetallesSolicitudMiBuzon
      solicitud={solicitud}
      urlRetorno="/empleado-rrhh/gestion/mi-buzon/solicitudes"
      usuarioActual="Laura Pérez"
      tituloModulo="Detalle de Solicitud Externa"
    />
  )
}

