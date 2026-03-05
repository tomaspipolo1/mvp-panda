"use client"

import { useState } from "react"
import { FiltrosFacturasCompras, type FiltrosFacturasCompras as FiltrosType } from "@/components/proveedores/filtros-facturas-compras"
import { TablaFacturasCompras, type FacturaCompras } from "@/components/proveedores/tabla-facturas-compras"
import { DetalleFacturaModalCompras } from "@/components/proveedores/detalle-factura-modal-compras"

interface FacturasProveedorProps {
  proveedorId: number
  proveedorNombre: string
  esVistaEmpleado?: boolean
}

// Datos de ejemplo - en una app real vendrían del backend filtrados por proveedorId
const facturasData: FacturaCompras[] = [
  {
    id: 1,
    numeroFactura: "FC-A-0001-00012345",
    proveedor: "Suministros Industriales S.A.",
    fecha: "10/05/2024",
    fechaVencimiento: "09/06/2024",
    ordenCompra: "013201",
    monto: "$145,780.00",
    estado: "Cargada",
  },
  {
    id: 2,
    numeroFactura: "FC-B-0002-00054321",
    proveedor: "Suministros Industriales S.A.",
    fecha: "09/05/2024",
    fechaVencimiento: "08/06/2024",
    ordenCompra: "013205",
    monto: "$87,500.00",
    estado: "En proceso",
  },
  {
    id: 3,
    numeroFactura: "FC-A-0003-00098765",
    proveedor: "Logística Portuaria SRL",
    fecha: "08/05/2024",
    fechaVencimiento: "07/06/2024",
    ordenCompra: "013210",
    monto: "$230,450.00",
    estado: "Paga",
  },
  {
    id: 4,
    numeroFactura: "FC-C-0001-00012346",
    proveedor: "Suministros Industriales S.A.",
    fecha: "07/05/2024",
    fechaVencimiento: "06/06/2024",
    ordenCompra: "013215",
    monto: "$56,780.00",
    estado: "Cargada",
  },
  {
    id: 5,
    numeroFactura: "FC-B-0002-00054322",
    proveedor: "Tecnología Naval Argentina",
    fecha: "06/05/2024",
    fechaVencimiento: "05/06/2024",
    ordenCompra: "013220",
    monto: "$178,900.00",
    estado: "En proceso",
  },
  {
    id: 6,
    numeroFactura: "FC-A-0001-00012340",
    proveedor: "Suministros Industriales S.A.",
    fecha: "05/05/2024",
    fechaVencimiento: "04/06/2024",
    ordenCompra: "013225",
    monto: "$98,450.00",
    estado: "Paga",
  },
  {
    id: 7,
    numeroFactura: "FC-C-0002-00054320",
    proveedor: "Logística Portuaria SRL",
    fecha: "04/05/2024",
    fechaVencimiento: "03/06/2024",
    ordenCompra: "013230",
    monto: "$45,780.00",
    estado: "Anulada",
  },
  {
    id: 8,
    numeroFactura: "FC-A-0003-00098760",
    proveedor: "Suministros Industriales S.A.",
    fecha: "03/05/2024",
    fechaVencimiento: "02/06/2024",
    ordenCompra: "013235",
    monto: "$123,670.00",
    estado: "Paga",
  },
]

export function FacturasProveedor({ proveedorId, proveedorNombre, esVistaEmpleado = false }: FacturasProveedorProps) {
  // Filtrar facturas solo del proveedor actual
  const facturasDelProveedor = facturasData.filter((factura) => factura.proveedor === proveedorNombre)
  
  const [facturasFiltradas, setFacturasFiltradas] = useState<FacturaCompras[]>(facturasDelProveedor)
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false)
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<FacturaCompras | null>(null)

  const handleFilter = (filtros: FiltrosType) => {
    let facturasFiltradas = [...facturasDelProveedor]

    // Filtro de búsqueda por número de factura
    if (filtros.busqueda) {
      facturasFiltradas = facturasFiltradas.filter((factura) =>
        factura.numeroFactura.toLowerCase().includes(filtros.busqueda.toLowerCase())
      )
    }

    // Filtro de estado
    if (filtros.estado !== "Todos") {
      facturasFiltradas = facturasFiltradas.filter((factura) => factura.estado === filtros.estado)
    }

    // Filtro de fecha desde
    if (filtros.fechaDesde) {
      facturasFiltradas = facturasFiltradas.filter((factura) => {
        const [dia, mes, anio] = factura.fecha.split("/")
        const fechaFactura = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia))
        const fechaDesde = new Date(filtros.fechaDesde)
        return fechaFactura >= fechaDesde
      })
    }

    // Filtro de fecha hasta
    if (filtros.fechaHasta) {
      facturasFiltradas = facturasFiltradas.filter((factura) => {
        const [dia, mes, anio] = factura.fecha.split("/")
        const fechaFactura = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia))
        const fechaHasta = new Date(filtros.fechaHasta)
        return fechaFactura <= fechaHasta
      })
    }

    setFacturasFiltradas(facturasFiltradas)
  }

  const handleVerDetalle = (factura: FacturaCompras) => {
    // Pequeño delay para evitar problemas de estado
    setTimeout(() => {
      setFacturaSeleccionada(factura)
      setModalDetalleOpen(true)
    }, 0)
  }

  const handleDescargar = (factura: FacturaCompras) => {
    console.log("Descargar factura:", factura)
    alert(`Descargando ${factura.numeroFactura}.pdf`)
  }

  const handleCloseModal = () => {
    setModalDetalleOpen(false)
    // Limpiar la factura seleccionada después de cerrar el modal
    setTimeout(() => {
      setFacturaSeleccionada(null)
    }, 100)
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <FiltrosFacturasCompras onFilter={handleFilter} />

      {/* Tabla de facturas */}
      <TablaFacturasCompras
        facturas={facturasFiltradas}
        onVerDetalle={handleVerDetalle}
        onDescargar={handleDescargar}
      />

      {/* Modal de detalle */}
      <DetalleFacturaModalCompras
        isOpen={modalDetalleOpen}
        onClose={handleCloseModal}
        factura={facturaSeleccionada}
      />
    </div>
  )
}

