"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, FileText, Clock, User, Mail, Download, Printer, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AnunciarAdjudicacionModal } from "@/components/licitaciones/anunciar-adjudicacion-modal"
import { CancelarLicitacionModal } from "@/components/licitaciones/cancelar-licitacion-modal"
import { ProveedoresRegistradosModal } from "@/components/licitaciones/proveedores-registrados-modal"
import { toast } from "@/components/ui/use-toast"

// Tipo para las licitaciones
type Licitacion = {
  id: number
  numero: string
  tipoLicitacion: string
  objeto: string
  categoria: string
  descripcion: string
  montosPresupuestados: Array<{
    moneda: string
    monto: string
  }>
  fechaCierre: string
  horaCierre: string
  fechaApertura: string
  horaApertura: string
  lugarApertura: string
  publicarEnWeb: string
  responsableTecnico: string
  nombreResponsableTecnico: string
  visitaTecnica: string
  lugarVisita?: string
  fechaVisitaDesde?: string
  fechaVisitaHasta?: string
  estado: string
  fechaPublicacion: string
  ultimaActualizacion: string
  adjudicado?: string
  proveedores?: Array<{
    razonSocial: string
    cuit: string
    email: string
    personaContacto: string
  }>
  documentos?: Array<{
    nombre: string
    tipo: string
    fechaSubida: string
  }>
}

// Tipo para los archivos adjuntos
type ArchivoAdjunto = {
  nombre: string
  archivo: string
  tipo: string
}

export default function DetalleLicitacionPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  // Datos de ejemplo para licitaciones
  const licitaciones: Licitacion[] = [
    {
      id: 1,
      numero: "LIC-2024-0001",
      tipoLicitacion: "Publica",
      objeto: "Servicio de mantenimiento de edificios",
      categoria: "Mantenimiento",
      descripcion: "Contratación de servicios de mantenimiento preventivo y correctivo para los edificios administrativos y operativos del Puerto La Plata. Incluye servicios de electricidad, plomería, carpintería, pintura y reparaciones generales.",
      montosPresupuestados: [
        { moneda: "ARS", monto: "3,500,000" },
        { moneda: "USD", monto: "15,000" }
      ],
      fechaCierre: "15/03/2024",
      horaCierre: "14:00",
      fechaApertura: "16/03/2024",
      horaApertura: "10:00",
      lugarApertura: "Sala de Reuniones - Puerto La Plata",
      publicarEnWeb: "Sí",
      responsableTecnico: "tecnico@puertolaplata.gob.ar",
      nombreResponsableTecnico: "Juan Pérez",
      visitaTecnica: "Sí",
      lugarVisita: "Puerto La Plata - Edificio Administrativo",
      fechaVisitaDesde: "10/03/2024",
      fechaVisitaHasta: "12/03/2024",
      estado: "Abierta",
      fechaPublicacion: "01/03/2024",
      ultimaActualizacion: "01/03/2024",
      adjudicado: "-",
      proveedores: [
        {
          razonSocial: "Constructora ABC",
          cuit: "20-12345678-9",
          email: "contacto@constructoraabc.com",
          personaContacto: "Juan Pérez"
        },
        {
          razonSocial: "Suministros XYZ",
          cuit: "30-23456789-0",
          email: "info@suministrosxyz.com",
          personaContacto: "María López"
        }
      ],
      documentos: [
        { nombre: "Pliego de Bases y Condiciones", tipo: "PDF", fechaSubida: "01/03/2024" },
        { nombre: "Circular N°1", tipo: "PDF", fechaSubida: "01/03/2024" },
        { nombre: "Especificaciones Técnicas", tipo: "PDF", fechaSubida: "01/03/2024" }
      ]
    },
    {
      id: 2,
      numero: "LIC-2024-0002",
      tipoLicitacion: "Privada",
      objeto: "Adquisición de equipos de seguridad",
      categoria: "Seguridad",
      descripcion: "Compra de equipos de seguridad para el personal del puerto, incluyendo cascos, chalecos reflectivos, guantes de protección y calzado de seguridad.",
      montosPresupuestados: [
        { moneda: "ARS", monto: "850,000" }
      ],
      fechaCierre: "20/03/2024",
      horaCierre: "16:00",
      fechaApertura: "21/03/2024",
      horaApertura: "11:00",
      lugarApertura: "Oficina de Compras - Puerto La Plata",
      publicarEnWeb: "No",
      responsableTecnico: "seguridad@puertolaplata.gob.ar",
      nombreResponsableTecnico: "María González",
      visitaTecnica: "No",
      estado: "Cerrada",
      fechaPublicacion: "05/03/2024",
      ultimaActualizacion: "20/03/2024",
      adjudicado: "-",
      proveedores: [
        {
          razonSocial: "Seguridad Total SA",
          cuit: "30-98765432-1",
          email: "ventas@seguridadtotal.com",
          personaContacto: "Roberto García"
        }
      ],
      documentos: [
        { nombre: "Pliego de Bases y Condiciones", tipo: "PDF", fechaSubida: "05/03/2024" },
        { nombre: "Circular N°1", tipo: "PDF", fechaSubida: "05/03/2024" }
      ]
    }
  ]

  // Buscar la licitación según el ID
  const licitacion = licitaciones.find(l => l.id === parseInt(resolvedParams.id)) || licitaciones[0]

  // Estados para el modal de adjudicación
  const [openAdjudicacionDialog, setOpenAdjudicacionDialog] = useState(false)

  // Estados para el modal de cancelación
  const [openCancelacionDialog, setOpenCancelacionDialog] = useState(false)

  // Estados para el modal de proveedores registrados
  const [openProveedoresDialog, setOpenProveedoresDialog] = useState(false)

  // Función para manejar la acción de anunciar adjudicación
  const handleAnunciarAdjudicacion = () => {
    setOpenAdjudicacionDialog(true)
  }

  // Función para manejar la visualización de proveedores registrados
  const handleVerProveedoresRegistrados = () => {
    setOpenProveedoresDialog(true)
  }

  // Función para manejar la acción de cancelar licitación
  const handleCancelarLicitacion = () => {
    setOpenCancelacionDialog(true)
  }

  // Función para manejar la adjudicación
  const handleAdjudicar = (ofertaId: string, proveedorNombre: string, montoOferta: number) => {
    // Mostrar notificación de éxito
    toast({
      title: "Licitación adjudicada",
      description: `Se ha adjudicado la licitación ${licitacion.numero} a ${proveedorNombre} por un monto de $${montoOferta.toLocaleString()}.`,
    })

    // Simular envío de notificaciones
    console.log(`Enviando notificación de adjudicación a ${proveedorNombre}`)
    console.log("Enviando notificaciones de no selección a los demás proveedores")

    // Cerrar el modal
    setOpenAdjudicacionDialog(false)

    // Redirigir de vuelta al listado
    setTimeout(() => {
      router.push("/admin/gestion/licitaciones/listado")
    }, 1000)
  }

  const handleCloseAdjudicacionModal = () => {
    setOpenAdjudicacionDialog(false)
  }

  // Función para manejar la cancelación
  const handleCancelar = (motivo: string) => {
    // Mostrar notificación de éxito
    toast({
      title: "Licitación cancelada",
      description: `Se ha cancelado la licitación ${licitacion.numero}. Motivo: ${motivo}`,
    })

    // Simular envío de notificaciones
    console.log(`Enviando notificación de cancelación a todos los proveedores inscritos`)
    console.log(`Motivo de cancelación: ${motivo}`)

    // Cerrar el modal
    setOpenCancelacionDialog(false)

    // Redirigir de vuelta al listado
    setTimeout(() => {
      router.push("/admin/gestion/licitaciones/listado")
    }, 1000)
  }

  const handleCloseCancelacionModal = () => {
    setOpenCancelacionDialog(false)
  }

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Abierta":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Abierta</Badge>
      case "Cerrada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cerrada</Badge>
      case "En evaluación":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Evaluación</Badge>
      case "Adjudicada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Adjudicada</Badge>
      case "Finalizada":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">Finalizada</Badge>
      case "Cancelada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre}`)
  }

  const formatearMoneda = (moneda: string) => {
    switch (moneda) {
      case "ARS":
        return "Peso Argentino (ARS)"
      case "USD":
        return "Dólar Estadounidense (USD)"
      case "EUR":
        return "Euro (EUR)"
      default:
        return moneda
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/gestion/licitaciones/listado">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Licitación</h1>
            <p className="text-gray-600">{licitacion.numero} - {licitacion.objeto}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información básica */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detalle licitación */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Detalle Licitación</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Número:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.numero}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Fecha publicación:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.fechaPublicacion}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Tipo:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.tipoLicitacion}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                </div>
                <div>{renderEstadoBadge(licitacion.estado)}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Categoría:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.categoria}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Adjudicado:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.adjudicado}</p>
              </div>
            </div>
          </div>

          {/* Objeto y Descripción */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Objeto y Descripción</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Objeto:</span>
                <p className="text-sm font-medium">{licitacion.objeto}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Descripción:</span>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{licitacion.descripcion}</p>
              </div>
            </div>
          </div>

          {/* Montos Presupuestados */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Montos Presupuestados</h2>
            <div className="space-y-3">
              {licitacion.montosPresupuestados.map((monto, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-md">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-gray-500">Moneda:</span>
                    <p className="text-sm font-medium">{formatearMoneda(monto.moneda)}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-gray-500">Monto:</span>
                    <p className="text-sm font-medium">${monto.monto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fecha y Horarios */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Fecha y Horarios</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha Cierre:</span>
                <p className="text-sm font-medium">{licitacion.fechaCierre}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Hora de Cierre:</span>
                <p className="text-sm font-medium">{licitacion.horaCierre}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha Apertura:</span>
                <p className="text-sm font-medium">{licitacion.fechaApertura}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Hora de Apertura:</span>
                <p className="text-sm font-medium">{licitacion.horaApertura}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Lugar de Apertura:</span>
                <p className="text-sm font-medium">{licitacion.lugarApertura}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Publicar en la Web:</span>
                <p className="text-sm font-medium">{licitacion.publicarEnWeb}</p>
              </div>
            </div>
          </div>

          {/* Datos Técnicos */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Datos Técnicos</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Responsable Técnico (Email):</span>
                <p className="text-sm font-medium">{licitacion.responsableTecnico}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Nombre:</span>
                <p className="text-sm font-medium">{licitacion.nombreResponsableTecnico}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Visita Técnica:</span>
                <p className="text-sm font-medium">{licitacion.visitaTecnica}</p>
              </div>
              {licitacion.visitaTecnica === "Sí" && (
                <>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Lugar Visita Técnica:</span>
                    <p className="text-sm font-medium">{licitacion.lugarVisita}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Fecha Visita Desde:</span>
                    <p className="text-sm font-medium">{licitacion.fechaVisitaDesde}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Fecha Visita Hasta:</span>
                    <p className="text-sm font-medium">{licitacion.fechaVisitaHasta}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Proveedores Invitados */}
          {licitacion.proveedores && licitacion.proveedores.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Proveedores Invitados</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Razón Social
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CUIT
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Persona Contacto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {licitacion.proveedores.map((proveedor, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm text-gray-900">{proveedor.razonSocial}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{proveedor.cuit}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{proveedor.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{proveedor.personaContacto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Documentación */}
          {licitacion.documentos && licitacion.documentos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Documentación</h2>
              <div className="space-y-3">
                {licitacion.documentos.map((documento, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                    <div className="flex items-center flex-1">
                      <FileText className="h-4 w-4 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">
                          {documento.nombre}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Tipo: {documento.tipo} - Fecha de carga: {documento.fechaSubida}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerDocumento(documento.nombre, documento.nombre)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha - Información adicional */}
        <div className="space-y-6">
          {/* Acciones rápidas */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Acciones</h2>
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => router.push(`/admin/gestion/licitaciones/editar/${licitacion.id}`)}
              >
                Editar Licitación
              </Button>
              <Button
                variant="outline"
                className="w-full"
              >
                Ver Ofertas
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleVerProveedoresRegistrados}
              >
                Proveedores Registrados
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleAnunciarAdjudicacion}
              >
                Adjudicar
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleCancelarLicitacion}
              >
                Cancelar Licitación
              </Button>
            </div>
          </div>

          {/* Información de seguimiento */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Información de Seguimiento</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Fecha Publicación:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.fechaPublicacion}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Última Actualización:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.ultimaActualizacion}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Responsable:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.nombreResponsableTecnico}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.responsableTecnico}</p>
              </div>
            </div>
          </div>

          {/* Estado actual */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Estado Actual</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Estado:</span>
                {renderEstadoBadge(licitacion.estado)}
              </div>
              <div className="pt-3 border-t">
                <div className="text-xs text-gray-500 space-y-2">
                  <p>• La licitación fue publicada el {licitacion.fechaPublicacion}</p>
                  <p>• Cierre de inscripciones: {licitacion.fechaCierre} a las {licitacion.horaCierre}</p>
                  <p>• Apertura: {licitacion.fechaApertura} a las {licitacion.horaApertura}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Anunciar Adjudicación */}
      <AnunciarAdjudicacionModal
        isOpen={openAdjudicacionDialog}
        onClose={handleCloseAdjudicacionModal}
        licitacionId={licitacion.id.toString()}
        licitacionTitulo={licitacion.objeto}
        licitacionNumero={licitacion.numero}
        onAdjudicar={handleAdjudicar}
      />

      {/* Modal de Cancelar Licitación */}
      <CancelarLicitacionModal
        isOpen={openCancelacionDialog}
        onClose={handleCloseCancelacionModal}
        licitacionId={licitacion.id.toString()}
        licitacionTitulo={licitacion.objeto}
        licitacionNumero={licitacion.numero}
        onCancelar={handleCancelar}
      />

      {/* Modal de Proveedores Registrados */}
      <ProveedoresRegistradosModal
        isOpen={openProveedoresDialog}
        onClose={() => setOpenProveedoresDialog(false)}
        licitacionId={licitacion.id.toString()}
        licitacionTitulo={licitacion.objeto}
        licitacionNumero={licitacion.numero}
      />
    </div>
  )
}

