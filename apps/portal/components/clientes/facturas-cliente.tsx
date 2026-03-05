"use client"

import { useState } from "react"
import { FiltrosDocumentosCliente } from "@/components/facturas/filtros-documentos-cliente"
import { TablaDocumentos as TablaDocumentosCliente } from "@/components/facturas/tabla-documentos-cliente"
import { DetalleDocumentoModalCliente } from "@/components/facturas/detalle-documento-modal-cliente"

interface FacturasClienteProps {
  clienteId: number
  clienteNombre: string
  esVistaEmpleado?: boolean
}

interface Documento {
  id: string
  fecha: string
  numero: string
  puntoVenta: string
  fechaVencimiento: string
  tipoComprobante: string
  ordenCompra?: string
  expediente?: string
  concepto: string
  monto: number
  estado: string
}

// Datos de ejemplo - en una app real vendrían del backend filtrados por clienteId
const documentosData: Documento[] = [
  {
    id: "1",
    fecha: "10/05/2024",
    numero: "00012345",
    puntoVenta: "0001",
    fechaVencimiento: "09/06/2024",
    tipoComprobante: "Factura A",
    ordenCompra: "OS-2024-001",
    concepto: "Servicios portuarios",
    monto: 145780.0,
    estado: "Cargada",
  },
  {
    id: "2",
    fecha: "09/05/2024",
    numero: "00054321",
    puntoVenta: "0002",
    fechaVencimiento: "08/06/2024",
    tipoComprobante: "Factura B",
    ordenCompra: "OS-2024-002",
    concepto: "Almacenamiento",
    monto: 87500.0,
    estado: "En proceso",
  },
  {
    id: "3",
    fecha: "08/05/2024",
    numero: "00098765",
    puntoVenta: "0001",
    fechaVencimiento: "07/06/2024",
    tipoComprobante: "Factura A",
    ordenCompra: "OS-2024-003",
    concepto: "Servicios de carga",
    monto: 230450.0,
    estado: "Pagada",
  },
  {
    id: "4",
    fecha: "07/05/2024",
    numero: "00012346",
    puntoVenta: "0001",
    fechaVencimiento: "06/06/2024",
    tipoComprobante: "Factura C",
    ordenCompra: "OS-2024-004",
    concepto: "Servicios varios",
    monto: 56780.0,
    estado: "Cargada",
  },
  {
    id: "5",
    fecha: "06/05/2024",
    numero: "00054322",
    puntoVenta: "0002",
    fechaVencimiento: "05/06/2024",
    tipoComprobante: "Factura B",
    ordenCompra: "OS-2024-005",
    concepto: "Servicios de descarga",
    monto: 178900.0,
    estado: "En proceso",
  },
]

export function FacturasCliente({ clienteId, clienteNombre, esVistaEmpleado = true }: FacturasClienteProps) {
  // Filtrar documentos solo del cliente actual
  const documentosDelCliente = documentosData
  
  const [documentosFiltrados, setDocumentosFiltrados] = useState<Documento[]>(documentosDelCliente)
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false)
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<Documento | null>(null)

  const handleFilter = (filtros: any) => {
    let documentosFiltrados = [...documentosDelCliente]

    // Filtro de búsqueda por número de factura
    if (filtros.busqueda) {
      documentosFiltrados = documentosFiltrados.filter((doc) =>
        doc.numero.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        doc.concepto.toLowerCase().includes(filtros.busqueda.toLowerCase())
      )
    }

    // Filtro de estado
    if (filtros.estado && filtros.estado !== "Todos") {
      documentosFiltrados = documentosFiltrados.filter((doc) => doc.estado === filtros.estado)
    }

    // Filtro de fecha desde
    if (filtros.fechaDesde) {
      documentosFiltrados = documentosFiltrados.filter((doc) => {
        const [dia, mes, anio] = doc.fecha.split("/")
        const fechaDoc = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia))
        const fechaDesde = new Date(filtros.fechaDesde)
        return fechaDoc >= fechaDesde
      })
    }

    // Filtro de fecha hasta
    if (filtros.fechaHasta) {
      documentosFiltrados = documentosFiltrados.filter((doc) => {
        const [dia, mes, anio] = doc.fecha.split("/")
        const fechaDoc = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia))
        const fechaHasta = new Date(filtros.fechaHasta)
        return fechaDoc <= fechaHasta
      })
    }

    setDocumentosFiltrados(documentosFiltrados)
  }

  const handleVerDetalle = (documento: Documento) => {
    // Pequeño delay para evitar problemas de estado
    setTimeout(() => {
      setDocumentoSeleccionado(documento)
      setModalDetalleOpen(true)
    }, 0)
  }

  const handleDescargar = (documento: Documento) => {
    console.log("Descargar documento:", documento)
    alert(`Descargando ${documento.numero}.pdf`)
  }

  const handleAnular = (documento: Documento) => {
    console.log("Anular documento:", documento)
    alert(`Documento ${documento.numero} anulado correctamente`)
    // Actualizar el estado del documento en la lista
    const updatedDocumentos = documentosFiltrados.map((doc) =>
      doc.id === documento.id ? { ...doc, estado: "Anulada" } : doc,
    )
    setDocumentosFiltrados(updatedDocumentos)
  }

  const handleCloseModal = () => {
    setModalDetalleOpen(false)
    // Limpiar el documento seleccionado después de cerrar el modal
    setTimeout(() => {
      setDocumentoSeleccionado(null)
    }, 100)
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <FiltrosDocumentosCliente tipo="facturas" onFilter={handleFilter} />

      {/* Tabla de documentos */}
      <TablaDocumentosCliente
        tipo="facturas"
        documentos={documentosFiltrados}
        onVerDetalle={handleVerDetalle}
        onDescargarPDF={handleDescargar}
        onAnular={handleAnular}
      />

      {/* Modal de detalle */}
      <DetalleDocumentoModalCliente
        isOpen={modalDetalleOpen}
        onClose={handleCloseModal}
        tipo="facturas"
        documento={documentoSeleccionado}
      />
    </div>
  )
}

