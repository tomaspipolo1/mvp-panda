"use client"

import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FacturasProveedor } from "@/components/proveedores/facturas-proveedor"

// Datos de proveedores de ejemplo (en una app real vendría del backend)
const proveedoresData = [
  { id: 1, razonSocial: "Suministros Industriales S.A.", nombre: "Juan Pérez" },
  { id: 2, razonSocial: "Logística Portuaria SRL", nombre: "María González" },
  { id: 3, razonSocial: "Tecnología Naval Argentina", nombre: "Carlos Rodríguez" },
  { id: 4, razonSocial: "Seguridad Marítima SA", nombre: "Ana López" },
  { id: 5, razonSocial: "Construcciones Portuarias", nombre: "Roberto García" },
  { id: 6, razonSocial: "Servicios Marítimos del Sur", nombre: "Laura Martínez" },
  { id: 7, razonSocial: "Importadora Atlántica", nombre: "Diego Fernández" },
]

export default function FacturasProveedorPage() {
  const router = useRouter()
  const params = useParams()
  const proveedorId = parseInt(params.id as string)

  // Buscar el proveedor por ID
  const proveedor = proveedoresData.find((p) => p.id === proveedorId)

  if (!proveedor) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Proveedor no encontrado</h1>
          <Button onClick={() => router.push("/admin/admin/proveedores/listado")}>
            Volver al listado
          </Button>
        </div>
      </div>
    )
  }

  const handleExportar = () => {
    console.log("Exportando facturas del proveedor")
    alert("Exportando facturas... (Funcionalidad simulada)")
  }

  return (
    <div className="container mx-auto py-6">
      {/* Header: Botón volver - Título - Botón exportar en la misma línea */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/admin/proveedores/listado")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al listado
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Facturas - {proveedor.razonSocial}</h1>
        </div>
        <Button variant="outline" className="flex items-center" onClick={handleExportar}>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      {/* Componente de Facturas */}
      <FacturasProveedor 
        proveedorId={proveedor.id} 
        proveedorNombre={proveedor.razonSocial}
        esVistaEmpleado={true}
      />
    </div>
  )
}

