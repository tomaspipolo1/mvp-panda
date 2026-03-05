"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosDocumentosCliente } from "./filtros-documentos-cliente"
import { TablaDocumentosCliente } from "./tabla-documentos-cliente"
import { DetalleDocumentoModalCliente } from "./detalle-documento-modal-cliente"

interface PanelDocumentosClienteProps {
  tipo: "facturas" | "notasCredito" | "notasDebito"
  documentos: any[]
}

export function PanelDocumentosCliente({ tipo, documentos }: PanelDocumentosClienteProps) {
  const [filteredDocumentos, setFilteredDocumentos] = useState(documentos)
  const [selectedDocumento, setSelectedDocumento] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)

  const getTitulo = () => {
    switch (tipo) {
      case "facturas":
        return "Gestión de Facturas"
      case "notasCredito":
        return "Gestión de Notas de Crédito"
      case "notasDebito":
        return "Gestión de Notas de Débito"
      default:
        return ""
    }
  }

  const getDescripcion = () => {
    switch (tipo) {
      case "facturas":
        return "Cree, visualice y gestione sus facturas. Puede anular facturas existentes o crear nuevas."
      case "notasCredito":
        return "Cree, visualice y gestione sus notas de crédito. Puede anular notas existentes o crear nuevas."
      case "notasDebito":
        return "Cree, visualice y gestione sus notas de débito. Puede anular notas existentes o crear nuevas."
      default:
        return ""
    }
  }

  const getBotonNuevo = () => {
    switch (tipo) {
      case "facturas":
        return "Nueva Factura"
      case "notasCredito":
        return "Nueva Nota de Crédito"
      case "notasDebito":
        return "Nueva Nota de Débito"
      default:
        return ""
    }
  }

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredDocumentos(documentos)
  }

  const handleVerDetalle = (documento: any) => {
    // Añadir datos de ejemplo para el detalle
    const documentoConDetalle = {
      ...documento,
      detalles: {
        fechaVencimiento: documento.estado === "Vencida" ? "01/04/2023" : "30/04/2023",
        ordenCompra: "OC-2023-0123",
        formaPago: documento.estado === "Pagada" ? "Transferencia Bancaria" : "Crédito 30 días",
        observaciones:
          documento.estado === "Anulada"
            ? "Documento anulado por error en los datos"
            : "Entrega realizada en depósito central.",
        items: [
          {
            codigo: "PROD-001",
            descripcion: "Cemento Portland x 50kg",
            cantidad: 50,
            precioUnitario: 1200,
            subtotal: 60000,
          },
          {
            codigo: "PROD-002",
            descripcion: "Arena fina x m³",
            cantidad: 10,
            precioUnitario: 2543,
            subtotal: 25430,
          },
        ],
      },
    }
    setSelectedDocumento(documentoConDetalle)
    setIsDetalleModalOpen(true)
  }

  const handleDescargarPDF = (documento: any) => {
    console.log(`Descargando PDF para ${documento.numero}`)
    // Aquí iría la lógica real para descargar el PDF
    alert(`Descargando PDF para ${documento.numero}`)
  }

  const handleAnular = (documento: any) => {
    console.log(`Anulando ${documento.numero}`)
    // Aquí iría la lógica real para anular el documento
    alert(`Documento ${documento.numero} anulado correctamente`)
    // Actualizar el estado del documento en la lista
    const updatedDocumentos = filteredDocumentos.map((doc) =>
      doc.id === documento.id ? { ...doc, estado: "Anulada" } : doc,
    )
    setFilteredDocumentos(updatedDocumentos)
  }

  const handleNuevoDocumento = () => {
    console.log(`Crear nuevo documento de tipo: ${tipo}`)
    // Aquí iría la lógica para crear un nuevo documento
    alert(`Crear nuevo documento de tipo: ${tipo}`)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-plp-darkest">{getTitulo()}</h2>
          <p className="text-gray-600 mt-1">{getDescripcion()}</p>
        </div>
        <Button onClick={handleNuevoDocumento} className="bg-plp-dark hover:bg-plp-medium">
          <Plus className="mr-2 h-4 w-4" />
          {getBotonNuevo()}
        </Button>
      </div>

      <FiltrosDocumentosCliente tipo={tipo} onFilter={handleFilter} />

      <TablaDocumentosCliente
        tipo={tipo}
        documentos={filteredDocumentos}
        onVerDetalle={handleVerDetalle}
        onDescargarPDF={handleDescargarPDF}
        onAnular={handleAnular}
      />

      <DetalleDocumentoModalCliente
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        tipo={tipo}
        documento={selectedDocumento}
      />
    </div>
  )
}
