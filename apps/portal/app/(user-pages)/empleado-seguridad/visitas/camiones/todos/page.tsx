"use client"

import { useState } from "react"
import { Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DetalleSolicitudModal } from "@/components/camiones/detalle-solicitud-modal"
import { TablaSolicitudesCamiones, SolicitudCamion } from "@/components/camiones/tabla-solicitudes-camiones"
import { ConfirmarAccionModal } from "@/components/camiones/confirmar-accion-modal"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function CamionesTodosPage() {
  const router = useRouter()
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedSolicitud, setSelectedSolicitud] = useState<any>(null)
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")
  const [busqueda, setBusqueda] = useState("")
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [solicitudCancelar, setSolicitudCancelar] = useState<SolicitudCamion | null>(null)

  const destinosValidos = [
    'Areneras',
    'Terminal TEC Plata',
    'Copetro',
    'Deposito Fiscal',
    'PLP - Oficinas Administrativas',
    'Zona Operativa/Muelles',
    'PLP - Pañol/Deposito',
    'PLP - Obras e Ingenieria',
    'PLP - Taller de herreria',
    'PLP - Taller de Locomotoras',
  ]

  const solicitudes = [
    {
      id: "SOL-2023-001",
      numero: "SOL-2023-001",
      tipoVisita: "Transporte de Carga",
      operacion: "Carga",
      tipoCarga: "Materiales",
      destino: destinosValidos[0],
      fechaIngreso: "2023-05-15",
      horaIngreso: "09:30",
      fechaEgreso: "2023-05-15",
      horaEgreso: "18:00",
      solicitante: "Roberto Gómez",
      empresa: "Logística ABC",
      conductor: {
        nombre: "Carlos Rodríguez",
        dni: "28456789",
        telefono: "",
        nroLicencia: "LIC-2023-001"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "AB123CD",
        marca: "Mercedes-Benz",
        modelo: "Actros 2042"
      },
      documentos: [
        { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir" },
        { nombre: "cedula_verde.pdf", tipo: "Cédula Verde" },
        { nombre: "seguro_vehiculo.pdf", tipo: "Seguro del Vehículo" }
      ],
      observaciones: "Carga de materiales a granel.",
      estado: "aprobado"
    },
    {
      id: "SOL-2023-002",
      numero: "SOL-2023-002",
      tipoVisita: "Transporte de Carga",
      operacion: "Descarga",
      tipoCarga: "Maquinaria",
      destino: destinosValidos[1],
      fechaIngreso: "2023-05-16",
      horaIngreso: "14:45",
      fechaEgreso: "2023-05-16",
      horaEgreso: "20:00",
      solicitante: "Ana Torres",
      empresa: "Transporte Sur S.A.",
      conductor: {
        nombre: "María González",
        dni: "30987654",
        telefono: "",
        nroLicencia: "LIC-2023-002"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "XY456ZW",
        marca: "Volvo",
        modelo: "FH 540"
      },
      documentos: [
        { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir" },
        { nombre: "cedula_azul.pdf", tipo: "Cédula Azul" }
      ],
      observaciones: "Descarga de maquinaria pesada.",
      estado: "rechazado"
    },
    {
      id: "SOL-2023-003",
      numero: "SOL-2023-003",
      tipoVisita: "Transporte de Carga",
      operacion: "Carga",
      tipoCarga: "Líquidos",
      destino: destinosValidos[2],
      fechaIngreso: "2023-05-17",
      horaIngreso: "11:15",
      fechaEgreso: "2023-05-17",
      horaEgreso: "17:30",
      solicitante: "Esteban Ruiz",
      empresa: "Químicos del Sur",
      conductor: {
        nombre: "Juan Pérez",
        dni: "25678901",
        telefono: "",
        nroLicencia: "LIC-2023-003"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "CD789EF",
        marca: "Scania",
        modelo: "R450"
      },
      documentos: [
        { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir" }
      ],
      observaciones: "Carga de líquidos peligrosos.",
      estado: "pendiente"
    },
    {
      id: "SOL-2023-004",
      numero: "SOL-2023-004",
      tipoVisita: "Transporte de Carga",
      operacion: "Carga",
      tipoCarga: "Contenedores",
      destino: destinosValidos[7],
      fechaIngreso: "2023-05-18",
      horaIngreso: "08:00",
      fechaEgreso: "2023-05-18",
      horaEgreso: "15:00",
      solicitante: "Valeria López",
      empresa: "Contenedores Express",
      responsableRecibir: "Juan Portuario",
      conductor: {
        nombre: "Laura Martínez",
        dni: "32456123",
        telefono: "",
        nroLicencia: "LIC-2023-004"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "GH012IJ",
        marca: "Iveco",
        modelo: "Stralis"
      },
      acompanantes: [
        { nombre: "Juan Pérez", dni: "23456789", telefono: "123456789" },
        { nombre: "Ana Torres", dni: "34567890", telefono: "" }
      ],
      documentos: [
        { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir" }
      ],
      observaciones: "Carga de contenedores refrigerados.",
      estado: "aprobado"
    },
    {
      id: "SOL-2023-005",
      numero: "SOL-2023-005",
      tipoVisita: "Transporte de Carga",
      operacion: "Descarga",
      tipoCarga: "Granos",
      destino: destinosValidos[6],
      fechaIngreso: "2023-05-19",
      horaIngreso: "16:30",
      fechaEgreso: "2023-05-19",
      horaEgreso: "22:00",
      solicitante: "Miguel Herrera",
      empresa: "Agroexport S.A.",
      responsableRecibir: "María Encargada",
      conductor: {
        nombre: "Roberto Sánchez",
        dni: "27890345",
        telefono: "",
        nroLicencia: "LIC-2023-005"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "KL345MN",
        marca: "MAN",
        modelo: "TGX"
      },
      documentos: [
        { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir" }
      ],
      observaciones: "Descarga de granos.",
      estado: "rechazado"
    },
    {
      id: "SOL-2023-006",
      numero: "SOL-2023-006",
      tipoVisita: "Transporte de Carga",
      operacion: "Carga y Descarga",
      tipoCarga: "Electrodomésticos",
      destino: "Deposito Fiscal",
      fechaIngreso: "2023-05-20",
      horaIngreso: "07:45",
      fechaEgreso: "2023-05-20",
      horaEgreso: "18:30",
      solicitante: "Sofía Martínez",
      empresa: "ElectroSur S.A.",
      conductor: {
        nombre: "Pedro López",
        dni: "31234567",
        telefono: "",
        nroLicencia: "LIC-2023-006"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "MN456OP",
        marca: "Renault",
        modelo: "Premium"
      },
      documentos: [
        { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir", grupo: "conductor", vencimiento: "31/12/2025" },
        { nombre: "cedula_verde.pdf", tipo: "Cédula Verde", grupo: "vehiculo", vencimiento: "15/08/2024" },
        { nombre: "cedula_azul.pdf", tipo: "Cédula Azul", grupo: "vehiculo", vencimiento: "15/08/2024" },
        { nombre: "seguro_vehiculo.pdf", tipo: "Seguro del Vehículo", grupo: "vehiculo", vencimiento: "30/11/2024" }
      ],
      observaciones: "Carga y descarga de electrodomésticos.",
      estado: "en curso"
    },
    {
      id: "SOL-2023-007",
      numero: "SOL-2023-007",
      tipoVisita: "Transporte de Carga",
      operacion: "Descarga",
      tipoCarga: "Muebles",
      destino: "Zona Operativa/Muelles",
      fechaIngreso: "2023-05-21",
      horaIngreso: "10:00",
      fechaEgreso: "2023-05-21",
      horaEgreso: "17:00",
      solicitante: "Lucas Fernández",
      empresa: "Muebles del Sur",
      conductor: {
        nombre: "Andrea Torres",
        dni: "29876543",
        telefono: "",
        nroLicencia: "LIC-2023-007"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "QR789ST",
        marca: "DAF",
        modelo: "XF"
      },
      documentos: [
        { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir", grupo: "conductor", vencimiento: "31/12/2025" },
        { nombre: "cedula_verde.pdf", tipo: "Cédula Verde", grupo: "vehiculo", vencimiento: "15/08/2024" },
        { nombre: "cedula_azul.pdf", tipo: "Cédula Azul", grupo: "vehiculo", vencimiento: "15/08/2024" },
        { nombre: "seguro_vehiculo.pdf", tipo: "Seguro del Vehículo", grupo: "vehiculo", vencimiento: "30/11/2024" }
      ],
      observaciones: "Descarga de muebles importados.",
      estado: "finalizada"
    },
    {
      id: "SOL-2023-008",
      numero: "SOL-2023-008",
      tipoVisita: "Transporte de Carga",
      operacion: "Carga",
      tipoCarga: "Alimentos",
      destino: "PLP - Taller de Locomotoras",
      fechaIngreso: "2023-05-22",
      horaIngreso: "12:00",
      fechaEgreso: "2023-05-22",
      horaEgreso: "19:00",
      solicitante: "Martina Gómez",
      empresa: "Alimentos Express",
      responsableRecibir: "Carlos Supervisor",
      conductor: {
        nombre: "Jorge Ramírez",
        dni: "33445566",
        telefono: "",
        nroLicencia: "LIC-2023-008"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "UV123WX",
        marca: "Mercedes-Benz",
        modelo: "Atego"
      },
      documentos: [
        { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir", grupo: "conductor", vencimiento: "31/12/2025" },
        { nombre: "cedula_verde.pdf", tipo: "Cédula Verde", grupo: "vehiculo", vencimiento: "15/08/2024" },
        { nombre: "cedula_azul.pdf", tipo: "Cédula Azul", grupo: "vehiculo", vencimiento: "15/08/2024" },
        { nombre: "seguro_vehiculo.pdf", tipo: "Seguro del Vehículo", grupo: "vehiculo", vencimiento: "30/11/2024" }
      ],
      observaciones: "Carga de alimentos perecederos.",
      estado: "cancelada"
    }
  ]

  const solicitudesTabla = solicitudes.map((s) => ({
    id: s.id,
    persona: s.solicitante,
    dni: s.conductor?.dni || '',
    patente: s.vehiculo?.patente || '',
    fecha: s.fechaIngreso,
    hora: s.horaIngreso,
    estado: s.estado,
    tipoCarga: s.tipoCarga,
    destino: s.destino,
  }))

  // Filtrado
  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const estadoOk = estado === "todos" || solicitud.estado === estado
    const desdeOk = !fechaDesde || solicitud.fechaIngreso >= fechaDesde
    const hastaOk = !fechaHasta || solicitud.fechaIngreso <= fechaHasta
    const textoBusqueda = busqueda.trim().toLowerCase()
    const matchBusqueda =
      !textoBusqueda ||
      [
        solicitud.id,
        solicitud.solicitante,
        solicitud.vehiculo?.patente
      ]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(textoBusqueda))
    return estadoOk && desdeOk && hastaOk && matchBusqueda
  })

  const handleViewDetail = (solicitud: any) => {
    router.push(`/empleado-seguridad/visitas/camiones/todos/${solicitud.id}`)
  }

  const handleCancelar = (solicitud: SolicitudCamion) => {
    setSolicitudCancelar(solicitud)
    setIsCancelModalOpen(true)
  }

  const handleConfirmCancelar = (motivo: string) => {
    // Aquí va la lógica real de cancelación (API, etc.)
    alert(`Solicitud ${solicitudCancelar?.id} cancelada. Motivo: ${motivo}`)
    setSolicitudCancelar(null)
    setIsCancelModalOpen(false)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 rounded-full px-4 py-1 font-semibold">Pendiente</Badge>
      case "aprobado":
      case "aprobada":
        return <Badge className="bg-green-100 text-green-800 rounded-full px-4 py-1 font-semibold">Aprobada</Badge>
      case "rechazado":
      case "rechazada":
        return <Badge className="bg-red-100 text-red-800 rounded-full px-4 py-1 font-semibold">Rechazada</Badge>
      case "finalizada":
        return <Badge className="bg-purple-100 text-purple-800 rounded-full px-4 py-1 font-semibold">Finalizada</Badge>
      case "en curso":
        return <Badge className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-semibold">En Curso</Badge>
      default:
        return <Badge className="bg-gray-200 text-gray-800 rounded-full px-4 py-1 font-semibold">{estado}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Solicitudes de Acceso</h1>
      {/* Filtros: Card separado */}
      <div className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 px-6 py-6">
          <h3 className="text-xl font-bold mb-4">Filtros</h3>
          <form
            className="flex flex-col md:flex-row md:items-end md:gap-6 gap-4"
            onSubmit={e => { e.preventDefault() }}
          >
            {/* Estado */}
            <div className="flex flex-col w-full md:w-1/5 min-w-[10rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="aprobado">Aprobado</SelectItem>
                  <SelectItem value="rechazado">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Fecha Desde */}
            <div className="flex flex-col w-40 min-w-[5rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
              <input
                type="date"
                className="w-40 border rounded px-3 py-2"
                value={fechaDesde}
                onChange={e => setFechaDesde(e.target.value)}
              />
            </div>
            {/* Fecha Hasta */}
            <div className="flex flex-col w-40 min-w-[10rem]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
              <input
                type="date"
                className="w-40 border rounded px-3 py-2"
                value={fechaHasta}
                onChange={e => setFechaHasta(e.target.value)}
              />
            </div>
            {/* Botones */}
            <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
              <button
                type="button"
                className="border rounded px-4 py-2 text-sm"
                onClick={() => {
                  setEstado("todos");
                  setFechaDesde("");
                  setFechaHasta("");
                }}
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="bg-[#002366] hover:bg-[#001a4d] text-white rounded px-4 py-2 text-sm flex items-center gap-2 font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 6v12m6-12v12" /></svg>
                Aplicar Filtros
              </button>
            </div>
          </form>
        </div>
      </div>
      <Card className="mb-6 shadow-md">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <CardTitle>Solicitudes de Transporte de cargas</CardTitle>
        <Input
          placeholder="Buscar por número, persona o patente..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="w-full md:w-80"
        />
      </CardHeader>
      <CardContent className="p-8">
          <TablaSolicitudesCamiones
            solicitudes={solicitudesTabla.filter((solicitud) => {
              const estadoOk = estado === "todos" || solicitud.estado === estado
              const desdeOk = !fechaDesde || solicitud.fecha >= fechaDesde
              const hastaOk = !fechaHasta || solicitud.fecha <= fechaHasta
              const textoBusqueda = busqueda.trim().toLowerCase()
              const matchBusqueda =
                !textoBusqueda ||
                [
                  solicitud.id,
                  solicitud.persona,
                  solicitud.patente
                ]
                  .filter(Boolean)
                  .some((campo) => campo.toLowerCase().includes(textoBusqueda))
              return estadoOk && desdeOk && hastaOk && matchBusqueda
            })}
            onVerDetalle={handleViewDetail}
            showCancelar={true}
            onCancelar={handleCancelar}
          />
          </CardContent>
        </Card>
      <ConfirmarAccionModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancelar}
        title="Cancelar solicitud"
        description="¿Está seguro que desea cancelar esta solicitud? Puede ingresar un motivo (opcional)."
        confirmText="Cancelar"
        confirmVariant="destructive"
      />
      {/* Eliminar el modal de detalle */}
    </div>
  )
}

