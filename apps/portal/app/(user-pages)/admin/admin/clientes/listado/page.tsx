"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Download, FileText, FileSpreadsheet, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FiltrosClientes, type FiltrosClientes as FiltrosClientesType } from "@/components/clientes/filtros-clientes"
import { TablaClientes, type Cliente } from "@/components/clientes/tabla-clientes"
import Link from "next/link"

// Datos de ejemplo para clientes
const clientesData: Cliente[] = [
  {
    id: 1,
    razonSocial: "Distribuidora Marítima S.A.",
    nombre: "Pedro Fernández",
    cuit: "30-12345678-9",
    tiposCliente: ["Agencia Marítima"],
    subcategorias: ["Mayorista"],
    estado: "Activo",
    ultimaActividad: "15/04/2023",
  },
  {
    id: 2,
    razonSocial: "Transportes Rápidos SRL",
    nombre: "Laura Sánchez",
    cuit: "30-98765432-1",
    tiposCliente: ["Empresa de Servicios Portuarios"],
    subcategorias: ["Transporte"],
    estado: "Activo",
    ultimaActividad: "22/03/2023",
  },
  {
    id: 3,
    razonSocial: "Tecnología Avanzada Argentina",
    nombre: "Martín Gómez",
    cuit: "30-56789012-3",
    tiposCliente: ["Permisionario"],
    subcategorias: ["Equipamiento"],
    estado: "Activo",
    ultimaActividad: "05/04/2023",
  },
  {
    id: 4,
    razonSocial: "Seguridad Integral SA",
    nombre: "Carolina Ruiz",
    cuit: "30-34567890-1",
    tiposCliente: ["Consecionarios"],
    subcategorias: ["Vigilancia"],
    estado: "Inactivo",
    ultimaActividad: "10/01/2023",
  },
  {
    id: 5,
    razonSocial: "Constructora del Sur",
    nombre: "Javier Torres",
    cuit: "30-23456789-0",
    tiposCliente: ["Permisionario"],
    subcategorias: ["Infraestructura"],
    estado: "Activo",
    ultimaActividad: "01/04/2023",
  },
  {
    id: 6,
    razonSocial: "Servicios Portuarios del Sur",
    nombre: "Ana María Castro",
    cuit: "30-87654321-2",
    tiposCliente: ["Empresa de Servicios Portuarios"],
    subcategorias: ["Mantenimiento"],
    estado: "Potencial",
    ultimaActividad: "N/A",
  },
  {
    id: 7,
    razonSocial: "Exportadora Atlántica",
    nombre: "Roberto Díaz",
    cuit: "30-76543210-3",
    tiposCliente: ["Agencia Marítima"],
    subcategorias: ["Exportación"],
    estado: "Potencial",
    ultimaActividad: "N/A",
  },
]

export default function ListadoClientesPage() {
  const router = useRouter()
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>(clientesData)

  // Función para manejar el filtrado
  const handleFilter = (filtros: FiltrosClientesType) => {
    let clientesFiltradosTemp = [...clientesData]

    // Filtro de búsqueda por CUIT o Razón Social
    if (filtros.busqueda) {
      clientesFiltradosTemp = clientesFiltradosTemp.filter(
        (cliente) =>
          cliente.cuit.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          cliente.razonSocial.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          cliente.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase())
      )
    }

    // Filtro de tipos de cliente
    if (filtros.tiposCliente.length > 0) {
      clientesFiltradosTemp = clientesFiltradosTemp.filter((cliente) =>
        cliente.tiposCliente.some((tipo) => filtros.tiposCliente.includes(tipo))
      )
    }

    // Filtro de subcategorías
    if (filtros.subcategorias.length > 0) {
      clientesFiltradosTemp = clientesFiltradosTemp.filter((cliente) =>
        cliente.subcategorias.some((subcat) => filtros.subcategorias.includes(subcat))
      )
    }

    // Filtro de estado
    if (filtros.estado !== "Todos") {
      clientesFiltradosTemp = clientesFiltradosTemp.filter(
        (cliente) => cliente.estado === filtros.estado
      )
    }

    setClientesFiltrados(clientesFiltradosTemp)
  }

  // Función para ver detalle de cliente
  const handleVerDetalle = (cliente: Cliente) => {
    router.push(`/admin/admin/clientes/detalle/${cliente.id}`)
  }

  // Función para ver cuenta corriente
  const handleCuentaCorriente = (cliente: Cliente) => {
    router.push(`/admin/admin/clientes/${cliente.id}/cuenta-corriente`)
  }

  // Función para ver facturas
  const handleFacturas = (cliente: Cliente) => {
    router.push(`/admin/admin/clientes/${cliente.id}/facturas`)
  }

  // Función para exportar a Excel
  const exportToExcel = () => {
    console.log("Exportando a Excel...")
    alert("Exportando a Excel... (Funcionalidad simulada)")
  }

  // Función para exportar a PDF
  const exportToPDF = () => {
    console.log("Exportando a PDF...")
    alert("Exportando a PDF... (Funcionalidad simulada)")
  }

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Listado de Clientes</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToExcel} className="cursor-pointer">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar a Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF} className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Exportar a PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/admin/clientes/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosClientes onFilter={handleFilter} />

      {/* Tabla de clientes */}
      <TablaClientes
        clientes={clientesFiltrados}
        onVerDetalle={handleVerDetalle}
        onCuentaCorriente={handleCuentaCorriente}
        onFacturas={handleFacturas}
      />
    </div>
  )
}

