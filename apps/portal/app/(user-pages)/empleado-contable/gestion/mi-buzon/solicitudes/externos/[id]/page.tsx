import DetallesSolicitudMiBuzon from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Datos de ejemplo para solicitudes externas del departamento contable
const solicitudesExternas = [
  {
    id: 1,
    numero: "SOL-2024-4001",
    tipo: "Reclamo",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por pago atrasado - Factura 4567",
    descripcion:
      "Presentamos reclamo por el pago atrasado de la factura 4567 correspondiente a la entrega de insumos de enero.",
    fecha: "10/02/2024",
    estado: "Resuelta",
    ultimaActualizacion: "15/02/2024",
    solicitante: "Proveedora Industrial S.A.",
    departamento: "Contable",
    correo: "contacto@proveedoraindustrial.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "10/02/2024 - Sistema: Solicitud creada",
      "10/02/2024 - Proveedora Industrial: Adjunta documentación de costos",
    ],
    adjuntos: ["factura_4567.pdf", "comprobante_entrega.pdf"],
    firmantes: [],
  },
  {
    id: 2,
    numero: "SOL-2024-4002",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Consulta sobre proceso de facturación",
    descripcion:
      "Solicito información sobre el proceso de facturación para servicios contratados.",
    fecha: "11/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "11/02/2024",
    solicitante: "Empresa IT Solutions",
    departamento: "Contable",
    correo: "contacto@itsolutions.com",
    asignacion: "Carlos López",
    comentarios: [
      "11/02/2024 - Sistema: Solicitud creada",
    ],
    adjuntos: ["consulta_facturacion.pdf"],
    firmantes: [],
  },
  {
    id: 3,
    numero: "SOL-2024-4003",
    tipo: "Tramite",
    tipoSolicitante: "Proveedor",
    asunto: "Actualización de datos bancarios",
    descripcion:
      "Solicitamos la actualización de los datos bancarios para futuros pagos. Adjuntamos nueva constancia de CBU.",
    fecha: "12/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "12/02/2024",
    solicitante: "Suministros del Sur",
    departamento: "Contable",
    correo: "administracion@suministrosdelsur.com",
    asignacion: "Ana Martínez",
    comentarios: [
      "12/02/2024 - Sistema: Solicitud creada",
      "12/02/2024 - Ana Martínez: Rechazada - Documentación incompleta",
    ],
    adjuntos: ["cbu_nuevo.pdf"],
    firmantes: [],
  },
]

export default async function DetalleSolicitudExternaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const solicitudId = parseInt(id)
  const solicitud = solicitudesExternas.find(s => s.id === solicitudId)

  if (!solicitud) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800">Solicitud no encontrada</h2>
          <p className="text-red-600">La solicitud con ID {solicitudId} no existe.</p>
        </div>
      </div>
    )
  }

  return (
    <DetallesSolicitudMiBuzon
      solicitud={solicitud}
      urlRetorno="/empleado-contable/gestion/mi-buzon/solicitudes"
      usuarioActual="Laura Pérez"
      tituloModulo="Detalle de Solicitud Externa - Contable"
    />
  )
}

