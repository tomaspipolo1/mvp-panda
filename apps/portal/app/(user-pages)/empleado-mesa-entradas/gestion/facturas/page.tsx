"use client"

import { useState } from "react"
import { FiltrosFacturasMesaEntradas, type FiltrosFacturas } from "@/components/facturas/filtros-facturas-mesa-entradas"
import { TablaFacturasMesaEntradas, type Factura } from "@/components/facturas/tabla-facturas-mesa-entradas"
import { IngresoFacturaModal, type IngresoFacturaData } from "@/components/facturas/ingreso-factura-modal"
import { confirmarAnulacionFactura } from "@/components/facturas/factura-confirmations"

// Datos de ejemplo
const facturasData: Factura[] = [
  {
    id: 1,
    numeroFactura: "FC-A-0001-00012345",
    proveedor: "Suministros Navales S.A.",
    fecha: "10/05/2024",
    fechaVencimiento: "09/06/2024",
    ordenCompra: "012345",
    monto: "$145,780.00",
    estado: "Cargada",
  },
  {
    id: 2,
    numeroFactura: "FC-B-0002-00054321",
    proveedor: "Logística Portuaria",
    fecha: "09/05/2024",
    fechaVencimiento: "08/06/2024",
    ordenCompra: "012399",
    monto: "$87,500.00",
    estado: "En proceso",
  },
  {
    id: 3,
    numeroFactura: "FC-A-0003-00098765",
    proveedor: "Servicios Marítimos del Sur",
    fecha: "08/05/2024",
    fechaVencimiento: "07/06/2024",
    ordenCompra: "012401",
    monto: "$230,450.00",
    estado: "Paga",
  },
  {
    id: 4,
    numeroFactura: "FC-C-0001-00012346",
    proveedor: "Transportes Atlánticos",
    fecha: "07/05/2024",
    fechaVencimiento: "06/06/2024",
    ordenCompra: "012405",
    monto: "$56,780.00",
    estado: "Cargada",
  },
  {
    id: 5,
    numeroFactura: "FC-B-0002-00054322",
    proveedor: "Astilleros Unidos",
    fecha: "06/05/2024",
    fechaVencimiento: "05/06/2024",
    ordenCompra: "012410",
    monto: "$178,900.00",
    estado: "En proceso",
  },
  {
    id: 6,
    numeroFactura: "FC-A-0001-00012340",
    proveedor: "Suministros Navales S.A.",
    fecha: "05/05/2024",
    fechaVencimiento: "04/06/2024",
    ordenCompra: "012415",
    monto: "$98,450.00",
    estado: "Paga",
  },
  {
    id: 7,
    numeroFactura: "FC-C-0002-00054320",
    proveedor: "Logística Portuaria",
    fecha: "04/05/2024",
    fechaVencimiento: "03/06/2024",
    ordenCompra: "012420",
    monto: "$45,780.00",
    estado: "Anulada",
  },
  {
    id: 8,
    numeroFactura: "FC-A-0003-00098760",
    proveedor: "Servicios Marítimos del Sur",
    fecha: "03/05/2024",
    fechaVencimiento: "02/06/2024",
    ordenCompra: "012425",
    monto: "$123,670.00",
    estado: "Paga",
  },
]

export default function FacturasPage() {
  const [facturasFiltradas, setFacturasFiltradas] = useState<Factura[]>(facturasData)
  const [modalIngresoOpen, setModalIngresoOpen] = useState(false)
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null)

  const handleFilter = (filtros: FiltrosFacturas) => {
    let resultado = [...facturasData]

    // Filtrar por búsqueda (número de factura o proveedor)
    if (filtros.busqueda) {
      resultado = resultado.filter(
        (factura) =>
          factura.numeroFactura.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          factura.proveedor.toLowerCase().includes(filtros.busqueda.toLowerCase())
      )
    }

    // Filtrar por estado
    if (filtros.estado && filtros.estado !== "Todos") {
      resultado = resultado.filter((factura) => factura.estado === filtros.estado)
    }

    // Filtrar por fecha desde
    if (filtros.fechaDesde) {
      resultado = resultado.filter((factura) => {
        const [dia, mes, anio] = factura.fecha.split("/")
        const fechaFactura = new Date(`${anio}-${mes}-${dia}`)
        const fechaDesde = new Date(filtros.fechaDesde)
        return fechaFactura >= fechaDesde
      })
    }

    // Filtrar por fecha hasta
    if (filtros.fechaHasta) {
      resultado = resultado.filter((factura) => {
        const [dia, mes, anio] = factura.fecha.split("/")
        const fechaFactura = new Date(`${anio}-${mes}-${dia}`)
        const fechaHasta = new Date(filtros.fechaHasta)
        return fechaFactura <= fechaHasta
      })
    }

    setFacturasFiltradas(resultado)
  }

  const handleIngresar = (factura: Factura) => {
    setFacturaSeleccionada(factura)
    setModalIngresoOpen(true)
  }

  const handleIngresarSubmit = (data: IngresoFacturaData) => {
    console.log("Ingresando factura:", facturaSeleccionada, "con datos:", data)
    // TODO: Implementar lógica de ingreso de factura con los datos
    setModalIngresoOpen(false)
    setFacturaSeleccionada(null)
  }

  const handleAnularFromModal = async () => {
    if (!facturaSeleccionada) return
    
    // Usar la confirmación reutilizable
    const result = await confirmarAnulacionFactura(facturaSeleccionada.numeroFactura)
    
    if (result.isConfirmed) {
      const comentario = result.value
      console.log("Anulando factura desde modal:", facturaSeleccionada, "con comentario:", comentario)
      // TODO: Implementar lógica de anulación de factura
      // El comentario se enviará al proveedor: comentario
      setModalIngresoOpen(false)
      setFacturaSeleccionada(null)
    }
  }

  const handleAnular = async (factura: Factura) => {
    // Usar la confirmación reutilizable
    const result = await confirmarAnulacionFactura(factura.numeroFactura)
    
    if (result.isConfirmed) {
      const comentario = result.value
      console.log("Anular factura:", factura, "con comentario:", comentario)
      // TODO: Implementar lógica de anulación de factura
      // El comentario se enviará al proveedor: comentario
    }
  }

  const handleDescargar = (factura: Factura) => {
    console.log("Descargar factura:", factura)
    // TODO: Implementar lógica de descarga de factura
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Facturas</h1>
        <p className="text-gray-500 mt-1">Administra las facturas recibidas en Mesa de Entradas.</p>
      </div>

      {/* Filtros */}
      <FiltrosFacturasMesaEntradas onFilter={handleFilter} />

      {/* Tabla */}
      <TablaFacturasMesaEntradas
        facturas={facturasFiltradas}
        onIngresar={handleIngresar}
        onAnular={handleAnular}
        onDescargar={handleDescargar}
      />

      {/* Modal de Ingreso de Factura */}
      <IngresoFacturaModal
        isOpen={modalIngresoOpen}
        onClose={() => setModalIngresoOpen(false)}
        factura={facturaSeleccionada}
        onIngresar={handleIngresarSubmit}
        onAnular={handleAnularFromModal}
      />
    </div>
  )
}
