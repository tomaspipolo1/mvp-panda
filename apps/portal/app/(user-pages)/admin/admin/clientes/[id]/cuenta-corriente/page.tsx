"use client"

import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CuentaCorrienteCliente } from "@/components/clientes/cuenta-corriente-cliente"

// Datos de clientes de ejemplo (en una app real vendría del backend)
const clientesData = [
  { id: 1, razonSocial: "Distribuidora Marítima S.A.", nombre: "Pedro Fernández" },
  { id: 2, razonSocial: "Transportes Rápidos SRL", nombre: "Laura Sánchez" },
  { id: 3, razonSocial: "Tecnología Avanzada Argentina", nombre: "Martín Gómez" },
  { id: 4, razonSocial: "Seguridad Integral SA", nombre: "Carolina Ruiz" },
  { id: 5, razonSocial: "Constructora del Sur", nombre: "Javier Torres" },
  { id: 6, razonSocial: "Servicios Portuarios del Sur", nombre: "Ana María Castro" },
  { id: 7, razonSocial: "Exportadora Atlántica", nombre: "Roberto Díaz" },
]

export default function CuentaCorrienteClientePage() {
  const router = useRouter()
  const params = useParams()
  const clienteId = parseInt(params.id as string)

  // Buscar el cliente por ID
  const cliente = clientesData.find((c) => c.id === clienteId)

  if (!cliente) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cliente no encontrado</h1>
          <Button onClick={() => router.push("/admin/admin/clientes/listado")}>
            Volver al listado
          </Button>
        </div>
      </div>
    )
  }

  const handleExportar = () => {
    console.log("Exportando cuenta corriente")
    alert("Exportando cuenta corriente... (Funcionalidad simulada)")
  }

  return (
    <div className="container mx-auto py-6">
      {/* Header: Botón volver - Título - Botón exportar en la misma línea */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/admin/clientes/listado")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al listado
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Cuenta Corriente - {cliente.razonSocial}</h1>
        </div>
        <Button variant="outline" className="flex items-center" onClick={handleExportar}>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      {/* Componente de Cuenta Corriente */}
      <CuentaCorrienteCliente 
        clienteId={cliente.id} 
        clienteNombre={cliente.razonSocial}
        esVistaEmpleado={true}
      />
    </div>
  )
}

