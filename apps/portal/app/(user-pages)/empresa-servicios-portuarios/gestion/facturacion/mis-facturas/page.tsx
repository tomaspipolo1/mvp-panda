"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TabsDocumentos } from "@/components/facturas/tabs-documentos"
import { FiltrosFacturas } from "@/components/facturas/filtros-facturas"
import { TablaDocumentos } from "@/components/facturas/tabla-documentos-cliente"
import { NuevaFacturaModal } from "@/components/facturas/nueva-factura-modal"
import { DetalleDocumentoModal } from "@/components/facturas/detalle-documento-modal"

// Datos de ejemplo para facturas
const facturasData = [
  {
    id: "1",
    fecha: "15/04/2023",
    numero: "00000789",
    puntoVenta: "0001",
    fechaVencimiento: "28/04/2023",
    tipoComprobante: "Factura A",
    ordenCompra: "0000245",
    expediente: "EXP-2023-SP-001",
    cliente: "Puerto La Plata",
    concepto: "Servicios de carga y descarga",
    monto: 125430.0,
    estado: "Emitida",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga factura",
        fecha: "15/04/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "28/04/2023",
      ordenCompra: "OC-2023-0245",
      formaPago: "Transferencia bancaria",
      observaciones: "Servicio de carga de contenedores",
      items: [
        {
          codigo: "SERV-001",
          descripcion: "Carga de contenedores",
          cantidad: 50,
          precioUnitario: 1800.0,
          subtotal: 90000.0,
        },
        {
          codigo: "SERV-002",
          descripcion: "Descarga de contenedores",
          cantidad: 20,
          precioUnitario: 1771.5,
          subtotal: 35430.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "05/04/2023",
    numero: "00000765",
    puntoVenta: "0001",
    fechaVencimiento: "20/04/2023",
    tipoComprobante: "Factura C",
    ordenCompra: "0000230",
    cliente: "Puerto La Plata",
    concepto: "Servicios de almacenaje",
    monto: 78500.0,
    estado: "Cobrada",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga factura",
        fecha: "05/04/2023 09:15",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "06/04/2023 14:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Pago realizado",
        fecha: "18/04/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "20/04/2023",
      ordenCompra: "OC-2023-0230",
      formaPago: "Cheque a 30 días",
      observaciones: "Almacenaje mensual en terminal 3",
      items: [
        {
          codigo: "SERV-003",
          descripcion: "Almacenaje mensual",
          cantidad: 1,
          precioUnitario: 78500.0,
          subtotal: 78500.0,
        },
      ],
    },
  },
  {
    id: "3",
    fecha: "20/03/2023",
    numero: "00000742",
    puntoVenta: "0002",
    fechaVencimiento: "05/04/2023",
    tipoComprobante: "Factura A",
    ordenCompra: "0000215",
    expediente: "EXP-2023-SP-002",
    cliente: "Puerto La Plata",
    concepto: "Servicios de operación portuaria",
    monto: 345820.0,
    estado: "Cobrada",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga factura",
        fecha: "20/03/2023 11:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "21/03/2023 10:30",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "25/03/2023 16:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Pago realizado",
        fecha: "02/04/2023 14:15",
      },
    ],
    detalles: {
      fechaVencimiento: "05/04/2023",
      ordenCompra: "OC-2023-0215",
      formaPago: "Transferencia bancaria",
      observaciones: "Operación de grúa y personal especializado",
      items: [
        {
          codigo: "SERV-004",
          descripcion: "Operación de grúa",
          cantidad: 80,
          precioUnitario: 2500.0,
          subtotal: 200000.0,
        },
        {
          codigo: "SERV-005",
          descripcion: "Personal especializado",
          cantidad: 1,
          precioUnitario: 145820.0,
          subtotal: 145820.0,
        },
      ],
    },
  },
  {
    id: "4",
    fecha: "10/03/2023",
    numero: "00000720",
    puntoVenta: "0003",
    fechaVencimiento: "25/03/2023",
    tipoComprobante: "Ticket",
    ordenCompra: "0000200",
    cliente: "Puerto La Plata",
    concepto: "Servicios varios",
    monto: 56000.0,
    estado: "Anulada",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga factura",
        fecha: "10/03/2023 15:30",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "11/03/2023 09:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Anulación",
        fecha: "15/03/2023 11:20",
      },
    ],
    detalles: {
      fechaVencimiento: "25/03/2023",
      ordenCompra: "OC-2023-0200",
      formaPago: "Transferencia bancaria",
      observaciones: "Factura anulada por error en datos",
      items: [
        {
          codigo: "SERV-006",
          descripcion: "Servicios varios",
          cantidad: 1,
          precioUnitario: 56000.0,
          subtotal: 56000.0,
        },
      ],
    },
  },
]

// Datos de ejemplo para notas de crédito
const notasCreditoData = [
  {
    id: "1",
    fecha: "28/03/2023",
    numero: "00000112",
    puntoVenta: "0001",
    fechaVencimiento: "28/04/2023",
    tipoComprobante: "Nota Crédito A",
    ordenCompra: "0000215",
    expediente: "EXP-2023-NC-SP-001",
    cliente: "Puerto La Plata",
    concepto: "Ajuste por servicio no realizado",
    monto: 22000.0,
    estado: "Emitida",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga nota de crédito",
        fecha: "28/03/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "28/04/2023",
      ordenCompra: "OC-2023-0215",
      formaPago: "Transferencia bancaria",
      observaciones: "Ajuste por servicio de grúa no realizado",
      items: [
        {
          codigo: "SERV-004",
          descripcion: "Operación de grúa",
          cantidad: 10,
          precioUnitario: 2200.0,
          subtotal: 22000.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "15/03/2023",
    numero: "00000108",
    puntoVenta: "0001",
    fechaVencimiento: "15/04/2023",
    tipoComprobante: "Nota Crédito C",
    ordenCompra: "0000200",
    cliente: "Puerto La Plata",
    concepto: "Descuento por volumen",
    monto: 8500.0,
    estado: "Cobrada",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga nota de crédito",
        fecha: "15/03/2023 09:15",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "16/03/2023 14:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "18/03/2023 16:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Procesamiento completado",
        fecha: "20/03/2023 14:15",
      },
    ],
    detalles: {
      fechaVencimiento: "15/04/2023",
      ordenCompra: "OC-2023-0200",
      formaPago: "Cheque a 30 días",
      observaciones: "Descuento por volumen según acuerdo comercial",
      items: [
        {
          codigo: "DESC-001",
          descripcion: "Descuento por volumen",
          cantidad: 1,
          precioUnitario: 8500.0,
          subtotal: 8500.0,
        },
      ],
    },
  },
  {
    id: "3",
    fecha: "05/03/2023",
    numero: "00000105",
    puntoVenta: "0002",
    fechaVencimiento: "20/03/2023",
    tipoComprobante: "Nota Crédito A",
    ordenCompra: "0000190",
    expediente: "EXP-2023-NC-SP-002",
    cliente: "Puerto La Plata",
    concepto: "Ajuste de precios",
    monto: 12500.0,
    estado: "Vencida",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga nota de crédito",
        fecha: "05/03/2023 11:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "06/03/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "20/03/2023",
      ordenCompra: "OC-2023-0190",
      formaPago: "Transferencia bancaria",
      observaciones: "Ajuste de precios según contrato",
      items: [
        {
          codigo: "SERV-001",
          descripcion: "Carga de contenedores",
          cantidad: 7,
          precioUnitario: 1785.71,
          subtotal: 12500.0,
        },
      ],
    },
  },
]

// Datos de ejemplo para notas de débito
const notasDebitoData = [
  {
    id: "1",
    fecha: "15/03/2023",
    numero: "00000067",
    puntoVenta: "0001",
    fechaVencimiento: "30/03/2023",
    tipoComprobante: "Nota Débito A",
    ordenCompra: "0000200",
    cliente: "Puerto La Plata",
    concepto: "Recargo por servicio fuera de horario",
    monto: 8500.0,
    estado: "Emitida",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga nota de débito",
        fecha: "15/03/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "30/03/2023",
      ordenCompra: "OC-2023-0200",
      formaPago: "Transferencia bancaria",
      observaciones: "Recargo por servicio fuera de horario habitual",
      items: [
        {
          codigo: "RECARGO-001",
          descripcion: "Recargo fuera de horario",
          cantidad: 1,
          precioUnitario: 8500.0,
          subtotal: 8500.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "08/03/2023",
    numero: "00000065",
    puntoVenta: "0001",
    fechaVencimiento: "23/03/2023",
    tipoComprobante: "Nota Débito C",
    ordenCompra: "0000190",
    expediente: "EXP-2023-ND-SP-001",
    cliente: "Puerto La Plata",
    concepto: "Intereses por pago tardío",
    monto: 4200.0,
    estado: "Cobrada",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga nota de débito",
        fecha: "08/03/2023 09:15",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "09/03/2023 14:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "10/03/2023 16:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Procesamiento completado",
        fecha: "12/03/2023 14:15",
      },
    ],
    detalles: {
      fechaVencimiento: "23/03/2023",
      ordenCompra: "OC-2023-0190",
      formaPago: "Cheque a 30 días",
      observaciones: "Intereses por pago fuera de término",
      items: [
        {
          codigo: "INT-001",
          descripcion: "Intereses por mora",
          cantidad: 1,
          precioUnitario: 4200.0,
          subtotal: 4200.0,
        },
      ],
    },
  },
  {
    id: "3",
    fecha: "01/03/2023",
    numero: "00000062",
    puntoVenta: "0002",
    fechaVencimiento: "16/03/2023",
    tipoComprobante: "Nota Débito A",
    ordenCompra: "0000180",
    cliente: "Puerto La Plata",
    concepto: "Cargo por servicio adicional",
    monto: 6800.0,
    estado: "Anulada",
    historial: [
      {
        usuario: "Servicios Portuarios del Sur",
        accion: "Carga nota de débito",
        fecha: "01/03/2023 11:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "02/03/2023 10:30",
      },
      {
        usuario: "Sistema SAP",
        accion: "Anulación",
        fecha: "05/03/2023 16:20",
      },
    ],
    detalles: {
      fechaVencimiento: "16/03/2023",
      ordenCompra: "OC-2023-0180",
      formaPago: "Transferencia bancaria",
      observaciones: "Cargo anulado por acuerdo comercial",
      items: [
        {
          codigo: "CARGO-001",
          descripcion: "Servicio adicional",
          cantidad: 1,
          precioUnitario: 6800.0,
          subtotal: 6800.0,
        },
      ],
    },
  },
]

export default function FacturasPage() {
  const [activeTab, setActiveTab] = useState("facturas")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<any>(null)
  const [documentosFiltrados, setDocumentosFiltrados] = useState<any[]>(facturasData)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Actualizar documentos filtrados según la tab activa
    if (tab === "facturas") {
      setDocumentosFiltrados(facturasData)
    } else if (tab === "notasCredito") {
      setDocumentosFiltrados(notasCreditoData)
    } else if (tab === "notasDebito") {
      setDocumentosFiltrados(notasDebitoData)
    }
  }

  const handleFilter = (filtros: any) => {
    console.log("Aplicando filtros:", filtros)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo mostramos los documentos según la tab activa
    if (activeTab === "facturas") {
      setDocumentosFiltrados(facturasData)
    } else if (activeTab === "notasCredito") {
      setDocumentosFiltrados(notasCreditoData)
    } else if (activeTab === "notasDebito") {
      setDocumentosFiltrados(notasDebitoData)
    }
  }

  const handleVerDetalle = (documento: any) => {
    setDocumentoSeleccionado(documento)
    setIsDetalleModalOpen(true)
  }

  const handleDescargarPDF = (documento: any) => {
    console.log(`Descargando PDF para ${documento.numero}`)
    alert(`Descargando PDF para ${documento.numero}`)
  }

  const handleAnular = (documento: any) => {
    console.log(`Anulando documento ${documento.numero}`)
    alert(`¿Está seguro que desea anular ${documento.numero}?`)
  }

  const getButtonText = () => {
    switch (activeTab) {
      case "notasCredito":
        return "Nueva Nota de Crédito"
      case "notasDebito":
        return "Nueva Nota de Débito"
      default:
        return "Nuevo Documento"
    }
  }

  const getTipoDocumento = () => {
    switch (activeTab) {
      case "facturas":
        return "facturas"
      case "notasCredito":
        return "notasCredito"
      case "notasDebito":
        return "notasDebito"
      default:
        return "facturas"
    }
  }

  return (
    <div className="p-6">
      {/* Fila 1: Tabs + Botón contextual (solo para notas de crédito y débito) */}
      <div className="flex justify-between items-end mb-6">
        <TabsDocumentos activeTab={activeTab} onTabChange={handleTabChange} />
        {activeTab !== "facturas" && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-plp-primary hover:bg-plp-dark text-white px-4 py-2 rounded-md"
            style={{ backgroundColor: '#0a2472' }}
          >
            <Plus className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>
        )}
      </div>

      {/* Contenedor 1: Filtros */}
      <FiltrosFacturas onFilter={handleFilter} />

      {/* Contenedor 2: Tabla */}
      <TablaDocumentos
        documentos={documentosFiltrados}
        tipo={getTipoDocumento() as "facturas" | "notasCredito" | "notasDebito"}
        onVerDetalle={handleVerDetalle}
        onDescargarPDF={handleDescargarPDF}
        onAnular={handleAnular}
      />

      {/* Modales */}
      {activeTab !== "facturas" && <NuevaFacturaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

      <DetalleDocumentoModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        tipo={getTipoDocumento() as "facturas" | "notasCredito" | "notasDebito"}
        documento={documentoSeleccionado}
      />
    </div>
  )
}
