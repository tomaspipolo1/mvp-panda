"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Download, FileText, FileSpreadsheet, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HistorialCalificacionesModal } from "@/components/proveedores/historial-calificaciones-modal"
import { FiltrosProveedores, type FiltrosProveedores as FiltrosProveedoresType } from "@/components/proveedores/filtros-proveedores"
import { TablaProveedores, type Proveedor } from "@/components/proveedores/tabla-proveedores"
import Link from "next/link"

// Datos de ejemplo para proveedores
const proveedoresData: Proveedor[] = [
  {
    id: 1,
    razonSocial: "Suministros Industriales S.A.",
    nombre: "Juan Pérez",
    cuit: "30-12345678-9",
    categorias: ["Materiales", "Construcción"],
    subcategorias: ["Construcción", "Infraestructura"],
    estado: "Activo",
    ultimaActividad: "15/04/2023",
    calificacion: "Proveedor A",
  },
  {
    id: 2,
    razonSocial: "Logística Portuaria SRL",
    nombre: "María González",
    cuit: "30-98765432-1",
    categorias: ["Servicios"],
    subcategorias: ["Transporte"],
    estado: "Activo",
    ultimaActividad: "22/03/2023",
    calificacion: "Proveedor B",
  },
  {
    id: 3,
    razonSocial: "Tecnología Naval Argentina",
    nombre: "Carlos Rodríguez",
    cuit: "30-56789012-3",
    categorias: ["Tecnología", "Materiales", "Seguridad"],
    subcategorias: ["Equipamiento", "Construcción"],
    estado: "Activo",
    ultimaActividad: "05/04/2023",
    calificacion: "Proveedor A",
  },
  {
    id: 4,
    razonSocial: "Seguridad Marítima SA",
    nombre: "Ana López",
    cuit: "30-34567890-1",
    categorias: ["Seguridad"],
    subcategorias: ["Vigilancia"],
    estado: "Inactivo",
    ultimaActividad: "10/01/2023",
    calificacion: "Proveedor B",
  },
  {
    id: 5,
    razonSocial: "Construcciones Portuarias",
    nombre: "Roberto García",
    cuit: "30-23456789-0",
    categorias: ["Construcción", "Servicios"],
    subcategorias: ["Infraestructura", "Mantenimiento"],
    estado: "Activo",
    ultimaActividad: "01/04/2023",
    calificacion: "Proveedor C",
  },
  {
    id: 6,
    razonSocial: "Servicios Marítimos del Sur",
    nombre: "Laura Martínez",
    cuit: "30-87654321-2",
    categorias: ["Servicios"],
    subcategorias: ["Mantenimiento"],
    estado: "Potencial",
    ultimaActividad: "N/A",
    calificacion: "NO APROBADO",
  },
  {
    id: 7,
    razonSocial: "Importadora Atlántica",
    nombre: "Diego Fernández",
    cuit: "30-76543210-3",
    categorias: ["Comercio"],
    subcategorias: ["Importación"],
    estado: "Potencial",
    ultimaActividad: "N/A",
    calificacion: "NO APROBADO",
  },
]

export default function ListadoProveedoresPage() {
  const router = useRouter()
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState<Proveedor[]>(proveedoresData)
  const [isHistorialModalOpen, setIsHistorialModalOpen] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null)

  // Función para manejar el filtrado
  const handleFilter = (filtros: FiltrosProveedoresType) => {
    let proveedoresFiltradosTemp = [...proveedoresData]

    // Filtro de búsqueda por CUIT o Razón Social
    if (filtros.busqueda) {
      proveedoresFiltradosTemp = proveedoresFiltradosTemp.filter(
        (proveedor) =>
          proveedor.cuit.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          proveedor.razonSocial.toLowerCase().includes(filtros.busqueda.toLowerCase())
      )
    }

    // Filtro de categorías (multiselect)
    if (filtros.categorias.length > 0) {
      proveedoresFiltradosTemp = proveedoresFiltradosTemp.filter((proveedor) =>
        proveedor.categorias.some((cat) => filtros.categorias.includes(cat))
      )
    }

    // Filtro de subcategorías (multiselect)
    if (filtros.subcategorias.length > 0) {
      proveedoresFiltradosTemp = proveedoresFiltradosTemp.filter((proveedor) =>
        proveedor.subcategorias.some((subcat) => filtros.subcategorias.includes(subcat))
      )
    }

    // Filtro de estado
    if (filtros.estado !== "Todos") {
      proveedoresFiltradosTemp = proveedoresFiltradosTemp.filter(
        (proveedor) => proveedor.estado === filtros.estado
      )
    }

    setProveedoresFiltrados(proveedoresFiltradosTemp)
  }

  // Función para ver detalle de proveedor
  const handleVerDetalle = (proveedor: Proveedor) => {
    router.push(`/admin/admin/proveedores/detalle/${proveedor.id}`)
  }

  // Función para abrir el modal de calificación
  const handleCalificar = (proveedor: Proveedor) => {
      setSelectedProveedor(proveedor)
      setIsHistorialModalOpen(true)
  }

  // Función para guardar la calificación
  const handleGuardarCalificacion = (data: {
    proveedorId: number
    evaluaciones: Record<string, number>
    promedio: number
    clasificacion: string
    observaciones: string
  }) => {
    console.log("Calificación guardada:", data)
    // Aquí iría la lógica para guardar en la base de datos
  }

  // Función para ver cuenta corriente
  const handleCuentaCorriente = (proveedor: Proveedor) => {
    router.push(`/admin/admin/proveedores/${proveedor.id}/cuenta-corriente`)
  }

  // Función para ver facturas
  const handleFacturas = (proveedor: Proveedor) => {
    router.push(`/admin/admin/proveedores/${proveedor.id}/facturas`)
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
        <h1 className="text-2xl font-bold">Listado de proveedores</h1>
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
            <Link href="/admin/admin/proveedores/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proveedor
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosProveedores onFilter={handleFilter} />

      {/* Tabla de proveedores */}
      <TablaProveedores
        proveedores={proveedoresFiltrados}
        onVerDetalle={handleVerDetalle}
        onCalificar={handleCalificar}
        onCuentaCorriente={handleCuentaCorriente}
        onFacturas={handleFacturas}
      />

      {/* Modal de historial de calificaciones */}
      <HistorialCalificacionesModal
        isOpen={isHistorialModalOpen}
        onClose={() => setIsHistorialModalOpen(false)}
        proveedor={selectedProveedor}
        onNuevaCalificacion={handleGuardarCalificacion}
      />
    </div>
  )
}

